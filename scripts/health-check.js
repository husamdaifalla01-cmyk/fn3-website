#!/usr/bin/env node
// Quick health check — run anytime to see system status

import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"
import { join } from "path"

config({ path: join(process.cwd(), "orchestrator/.env") })

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function healthCheck() {
  console.log("\n🔍 FN3 HEALTH CHECK\n")

  // Ventures
  const ventures = await supabase.from("fn3_ventures").select("name, status")
  const active = ventures.data?.filter(v => v.status === "active") ?? []
  console.log(`📊 Ventures: ${ventures.data?.length ?? 0} total, ${active.length} active`)
  active.forEach(v => console.log(`   ✅ ${v.name}`))

  // Agent states
  const states = await supabase.from("fn3_agent_state").select("status")
  const stateCounts = (states.data ?? []).reduce((acc, s) => {
    acc[s.status] = (acc[s.status] ?? 0) + 1
    return acc
  }, {})
  console.log(`\n🤖 Agents:`)
  Object.entries(stateCounts).forEach(([status, count]) => {
    const emoji = status === "idle" ? "💤" : status === "busy" ? "⚡" : status === "failed" ? "❌" : "📚"
    console.log(`   ${emoji} ${status}: ${count}`)
  })

  // Last heartbeat
  const lastTick = await supabase
    .from("fn3_heartbeat_log")
    .select("*")
    .order("tick_at", { ascending: false })
    .limit(1)
    .maybeSingle()

  if (lastTick.data) {
    const tickAge = Math.round((Date.now() - new Date(lastTick.data.tick_at).getTime()) / 1000 / 60)
    const tickEmoji = tickAge < 20 ? "✅" : tickAge < 60 ? "⚠️" : "❌"
    console.log(`\n💓 Last heartbeat: ${tickAge} minutes ago ${tickEmoji}`)
    console.log(`   Jobs dispatched: ${lastTick.data.jobs_dispatched}`)
    console.log(`   Jobs failed: ${lastTick.data.jobs_failed}`)
    console.log(`   Duration: ${lastTick.data.tick_duration_ms}ms`)
  } else {
    console.log("\n💓 No heartbeat ticks recorded yet")
  }

  // Pending escalations
  const escalations = await supabase
    .from("fn3_escalations")
    .select("id, agent_name, department, decision_required")
    .eq("status", "pending")

  const pendingCount = escalations.data?.length ?? 0
  console.log(`\n🚨 Pending escalations: ${pendingCount}`)
  if (pendingCount > 0) {
    escalations.data?.forEach(e => {
      console.log(`   ⚠️  [${e.department}] ${e.agent_name}: ${e.decision_required.slice(0, 60)}...`)
    })
  }

  // Skills coverage
  const skillsCount = await supabase
    .from("fn3_skill_versions")
    .select("id", { count: "exact" })
    .eq("is_active", true)

  const agentsCount = await supabase
    .from("fn3_agent_registry")
    .select("id", { count: "exact" })
    .eq("status", "active")

  console.log(`\n📚 Skills loaded: ${skillsCount.count ?? 0} / ${agentsCount.count ?? 0} agents`)

  console.log("\n")
}

healthCheck().catch(console.error)
