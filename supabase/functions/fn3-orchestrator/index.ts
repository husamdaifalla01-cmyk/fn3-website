import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
const MAX_CONCURRENT_WORKERS = parseInt(Deno.env.get("MAX_CONCURRENT_WORKERS") ?? "10", 10)
const ACKNOWLEDGEMENT_TIMEOUT_MS = 2 * 60 * 1000 // 2 minutes

interface Venture {
  id: string
  name: string
  status: string
  departments_enabled: string[]
  auto_provisioned: boolean
}

interface PRDObjective {
  id: string
  venture_id: string | null
  department: string
  priority: number
  objective: string
  kpis: Record<string, unknown>
  constraints: Record<string, unknown>
  status: string
  owner_agent: string | null
}

interface AgentRegistry {
  id: string
  agent_name: string
  agent_type: string
  department: string
  venture_id: string | null
  skill_version_id: string | null
  status: string
}

interface AgentState {
  id: string
  agent_name: string
  status: string
  current_job_id: string | null
  last_heartbeat: string
  failure_reason: string | null
}

interface VentureMetrics {
  venture_id: string
  metric_date: string
  mrr: number
  active_customers: number
}

interface SkillVersion {
  id: string
  agent_name: string
  skill_content: string
  is_active: boolean
}

serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 })
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
  const tickStart = Date.now()

  // Create heartbeat log entry
  const tickResult = await supabase
    .from("fn3_heartbeat_log")
    .insert({ tick_at: new Date().toISOString() })
    .select()
    .single()

  if (tickResult.error) {
    return new Response(
      JSON.stringify({ error: `Failed to create heartbeat log: ${tickResult.error.message}` }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }

  const tickId = tickResult.data.id
  let jobsDispatched = 0
  let jobsFailed = 0
  const notes: string[] = []

  try {
    // Step 1: Read active ventures
    const venturesResult = await supabase
      .from("fn3_ventures")
      .select("*")
      .eq("status", "active")

    const ventures: Venture[] = venturesResult.data ?? []
    console.log(`[fn3-orchestrator] Active ventures: ${ventures.map((v) => v.name).join(", ")}`)

    // Step 2: Read all agent states
    const statesResult = await supabase.from("fn3_agent_state").select("*")
    const agentStates: AgentState[] = statesResult.data ?? []
    const busyAgents = agentStates.filter((s) => s.status === "busy").length
    const failedAgents = agentStates.filter((s) => s.status === "failed").length

    // Step 3: Re-queue stale agents (busy but no heartbeat for >2 min)
    const staleFailures = await requeueStaleJobs(supabase, agentStates)
    if (staleFailures.length > 0) {
      notes.push(`Stale agents reset: ${staleFailures.join(", ")}`)
    }

    // Step 4: Check available slots
    const availableSlots = MAX_CONCURRENT_WORKERS - busyAgents
    if (availableSlots <= 0) {
      notes.push("Worker pool saturated — jobs queued for next tick")
      console.log("[fn3-orchestrator] Worker pool saturated, skipping dispatch")
    } else {
      // Step 5: Build dispatch plan
      const plans = await buildDispatchPlan(supabase, ventures, agentStates)

      // Step 6: Dispatch up to available slots
      const toDispatch = plans.slice(0, availableSlots)
      for (const plan of toDispatch) {
        try {
          await dispatchJob(supabase, plan, tickId)
          jobsDispatched++
        } catch (err) {
          jobsFailed++
          const msg = err instanceof Error ? err.message : String(err)
          notes.push(`Dispatch failed for ${plan.supervisor.agent_name}: ${msg}`)
          console.error(`[fn3-orchestrator] Dispatch error for ${plan.supervisor.agent_name}:`, msg)
        }
      }
    }

    // Step 7: Finalize heartbeat log
    const tickDuration = Date.now() - tickStart
    await supabase
      .from("fn3_heartbeat_log")
      .update({
        ventures_active: ventures.length,
        jobs_dispatched: jobsDispatched,
        jobs_failed: jobsFailed,
        agents_busy: busyAgents,
        agents_failed: failedAgents,
        tick_duration_ms: tickDuration,
        notes: notes.length > 0 ? notes.join("\n") : null,
      })
      .eq("id", tickId)

    console.log(
      `[fn3-orchestrator] Tick ${tickId} complete in ${tickDuration}ms — dispatched: ${jobsDispatched}, failed: ${jobsFailed}`
    )

    return new Response(
      JSON.stringify({
        success: true,
        tick_id: tickId,
        ventures_active: ventures.length,
        jobs_dispatched: jobsDispatched,
        jobs_failed: jobsFailed,
        tick_duration_ms: tickDuration,
        notes,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error("[fn3-orchestrator] Fatal tick error:", msg)
    await supabase
      .from("fn3_heartbeat_log")
      .update({ notes: `FATAL: ${msg}` })
      .eq("id", tickId)

    return new Response(
      JSON.stringify({ error: msg, tick_id: tickId }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
})

// ============================================================
// STALE JOB RECOVERY
// ============================================================

async function requeueStaleJobs(
  supabase: ReturnType<typeof createClient>,
  agentStates: AgentState[]
): Promise<string[]> {
  const staleThreshold = new Date(Date.now() - ACKNOWLEDGEMENT_TIMEOUT_MS)
  const staleAgents = agentStates.filter(
    (s) =>
      s.status === "busy" &&
      s.last_heartbeat &&
      new Date(s.last_heartbeat) < staleThreshold
  )

  const failed: string[] = []
  for (const agent of staleAgents) {
    console.warn(`[fn3-orchestrator] Stale agent: ${agent.agent_name} — resetting to failed`)

    await supabase
      .from("fn3_agent_state")
      .update({
        status: "failed",
        failure_reason: `Heartbeat timeout — last seen at ${agent.last_heartbeat}`,
        current_job_id: null,
      })
      .eq("agent_name", agent.agent_name)

    if (agent.current_job_id) {
      await supabase
        .from("fn3_dispatch_queue")
        .update({ status: "failed" })
        .eq("id", agent.current_job_id)
    }

    failed.push(agent.agent_name)
  }
  return failed
}

// ============================================================
// DISPATCH PLANNING
// ============================================================

interface DispatchPlan {
  venture: Venture
  department: string
  supervisor: AgentRegistry
  objectives: PRDObjective[]
  metrics: VentureMetrics | null
  priority: number
}

async function buildDispatchPlan(
  supabase: ReturnType<typeof createClient>,
  ventures: Venture[],
  agentStates: AgentState[]
): Promise<DispatchPlan[]> {
  const busyNames = new Set(
    agentStates
      .filter((s) => s.status === "busy" || s.status === "learning")
      .map((s) => s.agent_name)
  )

  const plans: DispatchPlan[] = []

  for (const venture of ventures) {
    const departments = venture.departments_enabled as string[]

    const [objectivesResult, metricsResult, supervisorsResult] = await Promise.all([
      supabase
        .from("fn3_prd")
        .select("*")
        .eq("venture_id", venture.id)
        .eq("status", "active")
        .in("department", departments)
        .order("priority", { ascending: false }),
      supabase
        .from("fn3_venture_metrics")
        .select("*")
        .eq("venture_id", venture.id)
        .order("metric_date", { ascending: false })
        .limit(1)
        .maybeSingle(),
      supabase
        .from("fn3_agent_registry")
        .select("*")
        .eq("venture_id", venture.id)
        .eq("agent_type", "supervisor")
        .eq("status", "active")
        .in("department", departments),
    ])

    const objectives: PRDObjective[] = objectivesResult.data ?? []
    const metrics: VentureMetrics | null = metricsResult.data ?? null
    const supervisors: AgentRegistry[] = supervisorsResult.data ?? []

    for (const supervisor of supervisors) {
      if (busyNames.has(supervisor.agent_name)) continue

      const deptObjectives = objectives.filter((o) => o.department === supervisor.department)
      if (deptObjectives.length === 0) continue

      const topPriority = Math.max(...deptObjectives.map((o) => o.priority))
      plans.push({ venture, department: supervisor.department, supervisor, objectives: deptObjectives, metrics, priority: topPriority })
    }
  }

  // HQ cross-venture objectives (exec, legal, qa, dev)
  const [hqObjectivesResult, platformSupervisorsResult] = await Promise.all([
    supabase
      .from("fn3_prd")
      .select("*")
      .is("venture_id", null)
      .eq("status", "active")
      .order("priority", { ascending: false }),
    supabase
      .from("fn3_agent_registry")
      .select("*")
      .is("venture_id", null)
      .eq("agent_type", "supervisor")
      .eq("status", "active"),
  ])

  const hqObjectives: PRDObjective[] = hqObjectivesResult.data ?? []
  const platformSupervisors: AgentRegistry[] = platformSupervisorsResult.data ?? []

  const hqVenture: Venture = {
    id: "00000000-0000-0000-0000-000000000001",
    name: "HQ",
    status: "active",
    departments_enabled: ["exec", "legal", "qa", "dev"],
    auto_provisioned: false,
  }

  for (const supervisor of platformSupervisors) {
    if (busyNames.has(supervisor.agent_name)) continue

    const deptObjectives = hqObjectives.filter((o) => o.department === supervisor.department)
    if (deptObjectives.length === 0) continue

    plans.push({
      venture: hqVenture,
      department: supervisor.department,
      supervisor,
      objectives: deptObjectives,
      metrics: null,
      priority: Math.max(...deptObjectives.map((o) => o.priority)),
    })
  }

  return plans.sort((a, b) => b.priority - a.priority)
}

// ============================================================
// JOB DISPATCH
// ============================================================

async function dispatchJob(
  supabase: ReturnType<typeof createClient>,
  plan: DispatchPlan,
  tickId: string
): Promise<void> {
  // Get current skill for agent
  const skillResult = await supabase
    .from("fn3_skill_versions")
    .select("*")
    .eq("agent_name", plan.supervisor.agent_name)
    .eq("is_active", true)
    .maybeSingle()

  const skill: SkillVersion | null = skillResult.data

  const agentContext = buildAgentContext(plan)
  const taskPayload = {
    venture_name: plan.venture.name,
    venture_status: plan.venture.status,
    objectives: plan.objectives,
    agent_context: agentContext,
    skill_content: skill?.skill_content ?? "No skill version found — operating on base capabilities",
    constraints: plan.objectives[0]?.constraints ?? {},
  }

  const jobResult = await supabase
    .from("fn3_dispatch_queue")
    .insert({
      venture_id: plan.venture.id,
      department: plan.department,
      supervisor_agent: plan.supervisor.agent_name,
      task_payload: taskPayload,
      priority: plan.priority,
      status: "queued",
      tick_id: tickId,
    })
    .select()
    .single()

  if (jobResult.error) throw new Error(jobResult.error.message)

  const job = jobResult.data

  await Promise.all([
    supabase
      .from("fn3_agent_state")
      .update({
        status: "busy",
        current_job_id: job.id,
        last_heartbeat: new Date().toISOString(),
      })
      .eq("agent_name", plan.supervisor.agent_name),
    supabase
      .from("fn3_agent_registry")
      .update({ last_run_at: new Date().toISOString() })
      .eq("agent_name", plan.supervisor.agent_name),
  ])

  console.log(
    `[fn3-orchestrator] Dispatched job ${job.id} → ${plan.supervisor.agent_name} (${plan.venture.name}/${plan.department})`
  )
}

function buildAgentContext(plan: DispatchPlan): string {
  return [
    `VENTURE CONTEXT`,
    `Venture: ${plan.venture.name}`,
    `Status: ${plan.venture.status}`,
    plan.metrics ? `MRR: $${plan.metrics.mrr}` : "MRR: Not yet measured",
    plan.metrics ? `Active customers: ${plan.metrics.active_customers}` : "",
    ``,
    `CURRENT OBJECTIVES (${plan.objectives.length} active):`,
    ...plan.objectives.map((o, i) => `  ${i + 1}. [P${o.priority}] ${o.objective}`),
    ``,
    `YOUR ROLE: ${plan.supervisor.agent_type} — ${plan.department} department`,
    `AGENT NAME: ${plan.supervisor.agent_name}`,
    ``,
    `INSTRUCTIONS:`,
    `1. Read your objectives above`,
    `2. Check your team's recent outputs in fn3_agent_outputs`,
    `3. Execute your highest-priority objective`,
    `4. Write all outputs to fn3_agent_outputs`,
    `5. Update fn3_agent_state to 'idle' when complete`,
    `6. Write a summary to fn3_department_logs`,
    `7. Escalate to fn3_escalations if you need Husam's decision`,
  ]
    .filter(Boolean)
    .join("\n")
}
