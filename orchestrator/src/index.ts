import 'dotenv/config'
import cron from 'node-cron'
import { runHeartbeatTick } from './orchestrator.js'

console.log('[FN3 Orchestrator] Starting up...')
console.log(`[FN3 Orchestrator] Supabase URL: ${process.env.SUPABASE_URL ? '✅ Set' : '❌ MISSING'}`)
console.log(`[FN3 Orchestrator] Service Role Key: ${process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Set' : '❌ MISSING'}`)

// Heartbeat: every 15 minutes
cron.schedule('*/15 * * * *', async () => {
  try {
    await runHeartbeatTick()
  } catch (err) {
    console.error('[FN3 Orchestrator] Unhandled heartbeat error:', err)
  }
})

// Run immediately on startup
console.log('[FN3 Orchestrator] Running initial tick...')
runHeartbeatTick().catch(err => {
  console.error('[FN3 Orchestrator] Initial tick failed:', err)
})

console.log('[FN3 Orchestrator] Heartbeat scheduled — firing every 15 minutes')
