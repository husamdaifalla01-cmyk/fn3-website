/**
 * FN3 Job Runner — reads fn3_dispatch_queue, executes Claude sessions
 *
 * Run: npx tsx src/worker.ts
 *
 * Each worker process:
 *   1. Polls fn3_dispatch_queue for queued jobs
 *   2. Claims a job (status → picked_up) with an atomic update
 *   3. Spawns `claude -p` with the task payload as system prompt
 *   4. Streams output, writes to fn3_agent_outputs
 *   5. Marks job completed/failed
 *   6. Loops to next job
 */

import 'dotenv/config'
import { spawn } from 'child_process'
import { supabase } from './supabase.js'
import type { DispatchJob, TaskPayload } from './types.js'

const POLL_INTERVAL_MS = parseInt(process.env.POLL_INTERVAL_MS ?? '5000', 10)
const MAX_JOB_DURATION_MS = parseInt(process.env.MAX_JOB_DURATION_MS ?? '600000', 10) // 10 min
const WORKER_ID = process.env.WORKER_ID ?? `worker-${process.pid}`
const CLAUDE_MODEL = process.env.CLAUDE_MODEL ?? 'claude-sonnet-4-6'

let running = true

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log(`[${WORKER_ID}] SIGTERM received — finishing current job and shutting down`)
  running = false
})
process.on('SIGINT', () => {
  console.log(`[${WORKER_ID}] SIGINT received — shutting down`)
  running = false
  process.exit(0)
})

// ============================================================
// MAIN LOOP
// ============================================================

async function runWorkerLoop(): Promise<void> {
  console.log(`[${WORKER_ID}] Started — model: ${CLAUDE_MODEL}`)

  while (running) {
    const job = await claimNextJob()

    if (!job) {
      await sleep(POLL_INTERVAL_MS)
      continue
    }

    console.log(
      `[${WORKER_ID}] Claimed job ${job.id} — agent: ${job.supervisor_agent} venture: ${job.venture_id}`
    )

    try {
      const output = await executeJob(job)
      await completeJob(job, output)
      console.log(`[${WORKER_ID}] Job ${job.id} completed`)
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      await failJob(job, message)
      console.error(`[${WORKER_ID}] Job ${job.id} failed: ${message}`)
    }
  }

  console.log(`[${WORKER_ID}] Worker loop exited`)
}

// ============================================================
// JOB CLAIMING (atomic — prevents double-pickup across workers)
// ============================================================

async function claimNextJob(): Promise<DispatchJob | null> {
  // Use Postgres-side atomic claim: update WHERE status = 'queued', RETURNING
  // Supabase doesn't expose FOR UPDATE SKIP LOCKED directly, but we can
  // do a two-step: select + update with status check. Race condition window
  // is small and subsequent picks simply won't find the row.
  const { data: jobs, error } = await supabase
    .from('fn3_dispatch_queue')
    .select('*')
    .eq('status', 'queued')
    .order('priority', { ascending: false })
    .order('created_at', { ascending: true })
    .limit(1)

  if (error || !jobs || jobs.length === 0) return null

  const candidate = jobs[0] as DispatchJob

  // Atomic claim: only update if still queued
  const { data: claimed, error: claimError } = await supabase
    .from('fn3_dispatch_queue')
    .update({
      status: 'picked_up',
      picked_up_at: new Date().toISOString(),
    })
    .eq('id', candidate.id)
    .eq('status', 'queued') // guard against race
    .select()
    .single()

  if (claimError || !claimed) return null

  return claimed as DispatchJob
}

// ============================================================
// JOB EXECUTION (spawns claude -p)
// ============================================================

async function executeJob(job: DispatchJob): Promise<string> {
  const payload = job.task_payload as TaskPayload

  const systemPrompt = buildSystemPrompt(payload)
  const userPrompt = buildUserPrompt(payload)

  return new Promise<string>((resolve, reject) => {
    const chunks: string[] = []
    let timedOut = false

    const timeout = setTimeout(() => {
      timedOut = true
      proc.kill('SIGTERM')
      reject(new Error(`Job timed out after ${MAX_JOB_DURATION_MS / 1000}s`))
    }, MAX_JOB_DURATION_MS)

    // claude -p runs a single non-interactive prompt session
    // --output-format json returns structured output
    const args = [
      '-p', userPrompt,
      '--output-format', 'json',
      '--model', CLAUDE_MODEL,
      '--system-prompt', systemPrompt,
      '--max-turns', '20',
    ]

    const proc = spawn('claude', args, {
      env: {
        ...process.env,
        ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    })

    proc.stdout.on('data', (chunk: Buffer) => {
      const text = chunk.toString()
      chunks.push(text)
    })

    proc.stderr.on('data', (chunk: Buffer) => {
      console.error(`[${WORKER_ID}][${job.supervisor_agent}] stderr: ${chunk.toString().trim()}`)
    })

    proc.on('close', (code) => {
      clearTimeout(timeout)
      if (timedOut) return

      const raw = chunks.join('')

      if (code !== 0) {
        reject(new Error(`claude exited with code ${code}. Output: ${raw.slice(0, 500)}`))
        return
      }

      // Parse JSON output from claude -p --output-format json
      try {
        const parsed = JSON.parse(raw)
        // The result field contains the final assistant message
        const result = parsed.result ?? parsed.response ?? raw
        resolve(typeof result === 'string' ? result : JSON.stringify(result))
      } catch {
        // If not valid JSON, return raw output
        resolve(raw)
      }
    })

    proc.on('error', (err) => {
      clearTimeout(timeout)
      reject(new Error(`Failed to spawn claude: ${err.message}`))
    })
  })
}

// ============================================================
// SYSTEM / USER PROMPT BUILDERS
// ============================================================

function buildSystemPrompt(payload: TaskPayload): string {
  return `You are an autonomous AI agent working within FN3, an agentic business operating system.

IDENTITY
Agent: ${payload.agent_context.match(/AGENT NAME: (.+)/)?.[1] ?? 'Unknown'}
Venture: ${payload.venture_name}
Status: ${payload.venture_status}

SKILL
${payload.skill_content}

CONSTRAINTS
${JSON.stringify(payload.constraints, null, 2)}

OPERATING RULES
1. You have full autonomy to execute your objectives
2. Write all substantive outputs to fn3_agent_outputs via Supabase
3. Log your activities to fn3_department_logs
4. Escalate only decisions that require Husam's judgment to fn3_escalations
5. Update fn3_agent_state status to 'idle' when your task is complete
6. Be specific, produce real deliverables — not reports about what you might do

SUPABASE ACCESS
URL: ${process.env.SUPABASE_URL}
Service key is available via environment variable SUPABASE_SERVICE_ROLE_KEY
Use the Bash tool to run SQL queries via the Supabase REST API or psql`.trim()
}

function buildUserPrompt(payload: TaskPayload): string {
  return `CURRENT OBJECTIVES FOR ${payload.venture_name.toUpperCase()} — ${new Date().toISOString()}

${payload.agent_context}

Your objectives:
${payload.objectives.map((o, i) => `${i + 1}. [Priority ${o.priority}] ${o.objective}`).join('\n')}

Execute the highest-priority objective now. Produce concrete, real deliverables. When done, update your agent state to 'idle'.`.trim()
}

// ============================================================
// JOB COMPLETION / FAILURE
// ============================================================

async function completeJob(job: DispatchJob, output: string): Promise<void> {
  const now = new Date().toISOString()

  // Mark job completed
  await supabase
    .from('fn3_dispatch_queue')
    .update({
      status: 'completed',
      completed_at: now,
    })
    .eq('id', job.id)

  // Write output to agent outputs table
  await supabase
    .from('fn3_agent_outputs')
    .insert({
      venture_id: job.venture_id,
      department: job.department,
      agent_name: job.supervisor_agent,
      dispatch_job_id: job.id,
      output_type: 'misc',
      output_body: output,
      created_at: now,
    })

  // Reset agent state to idle
  await supabase
    .from('fn3_agent_state')
    .update({
      status: 'idle',
      current_job_id: null,
      last_heartbeat: now,
      failure_reason: null,
    })
    .eq('agent_name', job.supervisor_agent)
}

async function failJob(job: DispatchJob, reason: string): Promise<void> {
  const now = new Date().toISOString()

  await supabase
    .from('fn3_dispatch_queue')
    .update({
      status: 'failed',
      completed_at: now,
    })
    .eq('id', job.id)

  await supabase
    .from('fn3_agent_state')
    .update({
      status: 'failed',
      current_job_id: null,
      last_heartbeat: now,
      failure_reason: reason,
    })
    .eq('agent_name', job.supervisor_agent)
}

// ============================================================
// HELPERS
// ============================================================

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// ============================================================
// ENTRY POINT
// ============================================================

runWorkerLoop().catch(err => {
  console.error(`[${WORKER_ID}] Fatal error:`, err)
  process.exit(1)
})
