import { supabase, assertNoError } from './supabase.js'
import type {
  Venture,
  PRDObjective,
  AgentRegistry,
  AgentState,
  DispatchJob,
  DispatchPlan,
  VentureMetrics,
  SkillVersion,
  TaskPayload,
  HeartbeatLog,
} from './types.js'

const MAX_CONCURRENT_WORKERS = parseInt(process.env.MAX_CONCURRENT_WORKERS ?? '10', 10)
const ACKNOWLEDGEMENT_TIMEOUT_MS = 2 * 60 * 1000 // 2 minutes

// ============================================================
// MAIN HEARTBEAT TICK
// ============================================================

export async function runHeartbeatTick(): Promise<void> {
  const tickStart = Date.now()
  console.log(`[Orchestrator] Tick starting at ${new Date().toISOString()}`)

  // Create heartbeat log entry first — gets the tick_id
  const heartbeatLogResult = await supabase
    .from('fn3_heartbeat_log')
    .insert({ tick_at: new Date().toISOString() })
    .select()
    .single()

  const tickLog = assertNoError(heartbeatLogResult, 'create heartbeat log entry')
  const tickId = tickLog.id

  let jobsDispatched = 0
  let jobsFailed = 0
  const notes: string[] = []

  try {
    // Step 1: Read active ventures
    const ventures = await getActiveVentures()
    console.log(`[Orchestrator] Active ventures: ${ventures.map(v => v.name).join(', ')}`)

    // Step 2: Read current agent states
    const agentStates = await getAllAgentStates()
    const busyAgents = agentStates.filter(s => s.status === 'busy').length
    const failedAgents = agentStates.filter(s => s.status === 'failed').length

    // Step 3: Re-queue stale acknowledged jobs (unacked for >2 min)
    await requeueStaleJobs(agentStates)

    // Step 4: Read available worker capacity
    const availableSlots = MAX_CONCURRENT_WORKERS - busyAgents
    if (availableSlots <= 0) {
      notes.push('Worker pool saturated — jobs queued for next tick')
      console.log('[Orchestrator] Worker pool saturated, skipping dispatch this tick')
    } else {
      // Step 5: Build dispatch plan
      const dispatchPlans = await buildDispatchPlan(ventures, agentStates)

      // Step 6: Dispatch jobs (up to available slots)
      const toDispatch = dispatchPlans.slice(0, availableSlots)
      for (const plan of toDispatch) {
        try {
          await dispatchJob(plan, tickId)
          jobsDispatched++
        } catch (err) {
          jobsFailed++
          const message = err instanceof Error ? err.message : String(err)
          notes.push(`Dispatch failed for ${plan.supervisor.agent_name}: ${message}`)
          console.error(`[Orchestrator] Dispatch error for ${plan.supervisor.agent_name}:`, err)
        }
      }
    }

    // Step 7: Update heartbeat log
    const tickDuration = Date.now() - tickStart
    await supabase
      .from('fn3_heartbeat_log')
      .update({
        ventures_active: ventures.length,
        jobs_dispatched: jobsDispatched,
        jobs_failed: jobsFailed,
        agents_busy: busyAgents,
        agents_failed: failedAgents,
        tick_duration_ms: tickDuration,
        notes: notes.length > 0 ? notes.join('\n') : null,
      })
      .eq('id', tickId)

    console.log(
      `[Orchestrator] Tick complete in ${tickDuration}ms — dispatched: ${jobsDispatched}, failed: ${jobsFailed}`
    )
  } catch (err) {
    console.error('[Orchestrator] Fatal tick error:', err)
    const message = err instanceof Error ? err.message : String(err)
    await supabase
      .from('fn3_heartbeat_log')
      .update({ notes: `FATAL: ${message}` })
      .eq('id', tickId)
  }
}

// ============================================================
// DATA FETCHING
// ============================================================

async function getActiveVentures(): Promise<Venture[]> {
  const result = await supabase
    .from('fn3_ventures')
    .select('*')
    .eq('status', 'active')
  return assertNoError(result, 'fetch active ventures')
}

async function getAllAgentStates(): Promise<AgentState[]> {
  const result = await supabase
    .from('fn3_agent_state')
    .select('*')
  return assertNoError(result, 'fetch agent states')
}

async function getActiveObjectivesForVenture(
  ventureId: string,
  departments: string[]
): Promise<PRDObjective[]> {
  const result = await supabase
    .from('fn3_prd')
    .select('*')
    .eq('venture_id', ventureId)
    .eq('status', 'active')
    .in('department', departments)
    .order('priority', { ascending: false })
  return assertNoError(result, `fetch objectives for venture ${ventureId}`)
}

async function getHQObjectives(): Promise<PRDObjective[]> {
  const result = await supabase
    .from('fn3_prd')
    .select('*')
    .is('venture_id', null)
    .eq('status', 'active')
    .order('priority', { ascending: false })
  return assertNoError(result, 'fetch HQ objectives')
}

async function getVentureMetrics(ventureId: string): Promise<VentureMetrics | null> {
  const result = await supabase
    .from('fn3_venture_metrics')
    .select('*')
    .eq('venture_id', ventureId)
    .order('metric_date', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (result.error) {
    console.warn(`[Orchestrator] Could not fetch metrics for venture ${ventureId}: ${result.error.message}`)
    return null
  }
  return result.data
}

async function getSupervisorsForVenture(
  ventureId: string,
  departments: string[]
): Promise<AgentRegistry[]> {
  const result = await supabase
    .from('fn3_agent_registry')
    .select('*')
    .eq('venture_id', ventureId)
    .eq('agent_type', 'supervisor')
    .eq('status', 'active')
    .in('department', departments)
  return assertNoError(result, `fetch supervisors for venture ${ventureId}`)
}

async function getPlatformSupervisors(): Promise<AgentRegistry[]> {
  const result = await supabase
    .from('fn3_agent_registry')
    .select('*')
    .is('venture_id', null)
    .eq('agent_type', 'supervisor')
    .eq('status', 'active')
  return assertNoError(result, 'fetch platform supervisors')
}

async function getActiveSkillForAgent(agentName: string): Promise<SkillVersion | null> {
  const result = await supabase
    .from('fn3_skill_versions')
    .select('*')
    .eq('agent_name', agentName)
    .eq('is_active', true)
    .maybeSingle()

  if (result.error) {
    console.warn(`[Orchestrator] No skill found for ${agentName}: ${result.error.message}`)
    return null
  }
  return result.data
}

// ============================================================
// DISPATCH PLANNING
// ============================================================

async function buildDispatchPlan(
  ventures: Venture[],
  agentStates: AgentState[]
): Promise<DispatchPlan[]> {
  const busyAgentNames = new Set(
    agentStates
      .filter(s => s.status === 'busy' || s.status === 'learning')
      .map(s => s.agent_name)
  )

  const plans: DispatchPlan[] = []

  for (const venture of ventures) {
    const departments = venture.departments_enabled as string[]
    const objectives = await getActiveObjectivesForVenture(venture.id, departments)
    const metrics = await getVentureMetrics(venture.id)
    const supervisors = await getSupervisorsForVenture(venture.id, departments)

    for (const supervisor of supervisors) {
      if (busyAgentNames.has(supervisor.agent_name)) continue

      const deptObjectives = objectives.filter(o => o.department === supervisor.department)
      if (deptObjectives.length === 0) continue

      const topPriority = Math.max(...deptObjectives.map(o => o.priority))
      plans.push({
        venture,
        department: supervisor.department,
        supervisor,
        objectives: deptObjectives,
        metrics,
        priority: topPriority,
      })
    }
  }

  // HQ cross-venture objectives
  const hqObjectives = await getHQObjectives()
  const platformSupervisors = await getPlatformSupervisors()

  for (const supervisor of platformSupervisors) {
    if (busyAgentNames.has(supervisor.agent_name)) continue

    const deptObjectives = hqObjectives.filter(o => o.department === supervisor.department)
    if (deptObjectives.length === 0) continue

    // Create a dummy HQ venture object for context
    const hqVenture: Venture = {
      id: '00000000-0000-0000-0000-000000000001',
      name: 'HQ',
      status: 'active',
      departments_enabled: ['exec', 'legal', 'qa', 'dev'],
      created_at: new Date().toISOString(),
      auto_provisioned: false,
    }

    plans.push({
      venture: hqVenture,
      department: supervisor.department,
      supervisor,
      objectives: deptObjectives,
      metrics: null,
      priority: Math.max(...deptObjectives.map(o => o.priority)),
    })
  }

  // Sort by priority descending
  return plans.sort((a, b) => b.priority - a.priority)
}

// ============================================================
// JOB DISPATCH
// ============================================================

async function dispatchJob(plan: DispatchPlan, tickId: string): Promise<void> {
  const skill = await getActiveSkillForAgent(plan.supervisor.agent_name)

  const taskPayload: TaskPayload = {
    venture_name: plan.venture.name,
    venture_status: plan.venture.status,
    objectives: plan.objectives,
    agent_context: buildAgentContext(plan),
    skill_content: skill?.skill_content ?? 'No skill version found — operating on base capabilities',
    constraints: plan.objectives[0]?.constraints ?? {},
  }

  // Write job to dispatch queue
  const jobResult = await supabase
    .from('fn3_dispatch_queue')
    .insert({
      venture_id: plan.venture.id,
      department: plan.department,
      supervisor_agent: plan.supervisor.agent_name,
      task_payload: taskPayload,
      priority: plan.priority,
      status: 'queued',
      tick_id: tickId,
    })
    .select()
    .single()

  const job = assertNoError(jobResult, `create dispatch job for ${plan.supervisor.agent_name}`)

  // Update agent state to busy
  await supabase
    .from('fn3_agent_state')
    .update({
      status: 'busy',
      current_job_id: job.id,
      last_heartbeat: new Date().toISOString(),
    })
    .eq('agent_name', plan.supervisor.agent_name)

  // Update agent registry last_run_at
  await supabase
    .from('fn3_agent_registry')
    .update({ last_run_at: new Date().toISOString() })
    .eq('agent_name', plan.supervisor.agent_name)

  console.log(
    `[Orchestrator] Dispatched job to ${plan.supervisor.agent_name} (venture: ${plan.venture.name}, dept: ${plan.department})`
  )
}

function buildAgentContext(plan: DispatchPlan): string {
  const lines = [
    `VENTURE CONTEXT`,
    `Venture: ${plan.venture.name}`,
    `Status: ${plan.venture.status}`,
    plan.metrics ? `MRR: $${plan.metrics.mrr}` : 'MRR: Not yet measured',
    plan.metrics ? `Active customers: ${plan.metrics.active_customers}` : '',
    ``,
    `CURRENT OBJECTIVES (${plan.objectives.length} active):`,
    ...plan.objectives.map((o, i) =>
      `  ${i + 1}. [P${o.priority}] ${o.objective}`
    ),
    ``,
    `YOUR ROLE: ${plan.supervisor.agent_type} — ${plan.department} department`,
    `AGENT NAME: ${plan.supervisor.agent_name}`,
    ``,
    `INSTRUCTIONS:`,
    `1. Read your objectives above`,
    `2. Check your team's recent outputs in fn3_agent_outputs (venture_id: ${plan.venture.id}, department: ${plan.department})`,
    `3. Execute your highest-priority objective`,
    `4. Write all outputs to fn3_agent_outputs`,
    `5. Update fn3_agent_state to 'idle' when complete`,
    `6. Write a summary to fn3_department_logs`,
    `7. Escalate to fn3_escalations if you need Husam's decision`,
  ].filter(Boolean)

  return lines.join('\n')
}

// ============================================================
// STALE JOB RECOVERY
// ============================================================

async function requeueStaleJobs(agentStates: AgentState[]): Promise<void> {
  const staleThreshold = new Date(Date.now() - ACKNOWLEDGEMENT_TIMEOUT_MS)

  const staleAgents = agentStates.filter(
    s =>
      s.status === 'busy' &&
      s.last_heartbeat &&
      new Date(s.last_heartbeat) < staleThreshold
  )

  for (const staleAgent of staleAgents) {
    console.warn(`[Orchestrator] Stale agent detected: ${staleAgent.agent_name} — resetting to idle`)

    // Reset agent to idle
    await supabase
      .from('fn3_agent_state')
      .update({
        status: 'failed',
        failure_reason: `Heartbeat timeout — last seen at ${staleAgent.last_heartbeat}`,
        current_job_id: null,
      })
      .eq('agent_name', staleAgent.agent_name)

    // Mark the stale job as failed
    if (staleAgent.current_job_id) {
      await supabase
        .from('fn3_dispatch_queue')
        .update({ status: 'failed' })
        .eq('id', staleAgent.current_job_id)
    }
  }
}
