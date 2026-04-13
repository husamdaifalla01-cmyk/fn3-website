/**
 * FN3 Worker Pool Spawner
 *
 * Launches N worker processes in parallel, each polling fn3_dispatch_queue.
 * Workers are restarted automatically if they exit unexpectedly.
 *
 * Usage: npx tsx src/spawn-workers.ts [count]
 * Default: 5 workers
 */

import 'dotenv/config'
import { spawn, ChildProcess } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const WORKER_COUNT = parseInt(process.argv[2] ?? process.env.WORKER_COUNT ?? '5', 10)
const RESTART_DELAY_MS = 3000

interface WorkerHandle {
  id: number
  process: ChildProcess | null
  restarts: number
}

const workers: WorkerHandle[] = []
let shutting_down = false

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))

function shutdown(signal: string) {
  if (shutting_down) return
  shutting_down = true
  console.log(`[Supervisor] ${signal} received — terminating all workers`)
  for (const w of workers) {
    w.process?.kill('SIGTERM')
  }
  setTimeout(() => process.exit(0), 5000)
}

function spawnWorker(handle: WorkerHandle): void {
  if (shutting_down) return

  const workerId = `worker-${handle.id}`
  console.log(`[Supervisor] Starting ${workerId} (restart #${handle.restarts})`)

  const proc = spawn(
    'npx',
    ['tsx', join(__dirname, 'worker.ts')],
    {
      env: {
        ...process.env,
        WORKER_ID: workerId,
      },
      stdio: 'inherit',
    }
  )

  handle.process = proc

  proc.on('exit', (code, signal) => {
    if (shutting_down) return

    console.warn(
      `[Supervisor] ${workerId} exited (code: ${code}, signal: ${signal}) — restarting in ${RESTART_DELAY_MS}ms`
    )
    handle.restarts++
    handle.process = null

    setTimeout(() => spawnWorker(handle), RESTART_DELAY_MS)
  })
}

// Spawn all workers
console.log(`[Supervisor] FN3 Worker Pool starting — ${WORKER_COUNT} workers`)

for (let i = 1; i <= WORKER_COUNT; i++) {
  const handle: WorkerHandle = { id: i, process: null, restarts: 0 }
  workers.push(handle)
  // Stagger starts slightly to avoid thundering herd on the job queue
  setTimeout(() => spawnWorker(handle), (i - 1) * 500)
}
