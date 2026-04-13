import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!

serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 })
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
  const results: Array<{ agent: string; action: string; error?: string }> = []

  try {
    // Get all active agents
    const agentsResult = await supabase
      .from("fn3_agent_registry")
      .select("*")
      .eq("status", "active")

    if (agentsResult.error) throw new Error(agentsResult.error.message)
    const agents = agentsResult.data ?? []

    console.log(`[fn3-learning] Starting learning cycle for ${agents.length} agents`)

    for (const agent of agents) {
      try {
        // Step 1: Get last 7 days of metrics for this agent
        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

        const metricsResult = await supabase
          .from("fn3_agent_metrics")
          .select("*")
          .eq("agent_name", agent.agent_name)
          .gte("metric_date", sevenDaysAgo.toISOString().split("T")[0])
          .order("metric_date", { ascending: false })

        const metrics = metricsResult.data ?? []

        // Skip agents with no metrics yet (not yet operational)
        if (metrics.length === 0) {
          results.push({ agent: agent.agent_name, action: "skipped_no_metrics" })
          continue
        }

        // Step 2: Calculate averages
        const avgQuality =
          metrics.reduce((sum: number, m: { avg_quality_score: number | null }) =>
            sum + (m.avg_quality_score ?? 0), 0) / metrics.length
        const avgCompletion =
          metrics.reduce((sum: number, m: { task_completion_rate: number | null }) =>
            sum + (m.task_completion_rate ?? 0), 0) / metrics.length
        const avgEscalation =
          metrics.reduce((sum: number, m: { escalation_rate: number | null }) =>
            sum + (m.escalation_rate ?? 0), 0) / metrics.length

        // Step 3: Check if learning is needed
        // Triggers: quality below 7.5 average, or high escalation rate, or low completion
        const needsLearning =
          avgQuality < 7.5 || avgCompletion < 0.7 || avgEscalation > 0.2

        if (!needsLearning) {
          // Log that we checked but no change needed
          await supabase.from("fn3_learning_log").insert({
            agent_name: agent.agent_name,
            cycle_date: new Date().toISOString().split("T")[0],
            metrics_summary: {
              avg_quality: avgQuality,
              avg_completion: avgCompletion,
              avg_escalation: avgEscalation,
              days_analyzed: metrics.length,
            },
            patterns_found: `Performance within acceptable range. Quality: ${avgQuality.toFixed(2)}, Completion: ${(avgCompletion * 100).toFixed(1)}%, Escalation: ${(avgEscalation * 100).toFixed(1)}%`,
            action_taken: "no_change_needed",
          })
          results.push({ agent: agent.agent_name, action: "no_change_needed" })
          continue
        }

        // Step 4: Get current skill
        const skillResult = await supabase
          .from("fn3_skill_versions")
          .select("*")
          .eq("agent_name", agent.agent_name)
          .eq("is_active", true)
          .maybeSingle()

        const currentSkill = skillResult.data

        // Step 5: Get recent outputs for pattern analysis
        const outputsResult = await supabase
          .from("fn3_agent_outputs")
          .select("id, output_type, output_metadata, quality_score, created_at")
          .eq("agent_name", agent.agent_name)
          .order("created_at", { ascending: false })
          .limit(20)

        const recentOutputs = outputsResult.data ?? []
        const lowQualityOutputs = recentOutputs.filter(o => (o.quality_score ?? 0) < 6)
        const highQualityOutputs = recentOutputs.filter(o => (o.quality_score ?? 0) >= 8)

        // Step 6: Generate patterns diagnosis
        const patterns = [
          `Quality trend: ${avgQuality.toFixed(2)}/10 avg (${metrics.length} days)`,
          `Task completion: ${(avgCompletion * 100).toFixed(1)}%`,
          `Escalation rate: ${(avgEscalation * 100).toFixed(1)}%`,
          `Recent outputs: ${recentOutputs.length} total, ${lowQualityOutputs.length} below 6.0, ${highQualityOutputs.length} above 8.0`,
          lowQualityOutputs.length > 0
            ? `Low quality output types: ${[...new Set(lowQualityOutputs.map(o => o.output_type))].join(", ")}`
            : "No consistent low-quality output types identified",
        ].join("\n")

        // Step 7: Log the learning cycle (agent will propose improvement separately when dispatched)
        const logResult = await supabase.from("fn3_learning_log").insert({
          agent_name: agent.agent_name,
          cycle_date: new Date().toISOString().split("T")[0],
          metrics_summary: {
            avg_quality: avgQuality,
            avg_completion: avgCompletion,
            avg_escalation: avgEscalation,
            days_analyzed: metrics.length,
            needs_improvement: true,
          },
          patterns_found: patterns,
          action_taken: "proposed_improvement",
        }).select().single()

        if (logResult.error) throw new Error(logResult.error.message)

        // Step 8: Create a skill improvement proposal task
        // The actual improvement will be generated by the agent when it next runs
        // We flag it by creating a pending proposal with the diagnostic data
        if (currentSkill) {
          await supabase.from("fn3_skill_proposals").insert({
            agent_name: agent.agent_name,
            current_skill_version_id: currentSkill.id,
            proposed_skill_diff: "-- To be generated by agent on next dispatch --",
            proposed_skill_full: "-- To be generated by agent on next dispatch --",
            evidence: {
              avg_quality: avgQuality,
              avg_completion: avgCompletion,
              avg_escalation: avgEscalation,
              patterns: patterns,
              low_quality_output_ids: lowQualityOutputs.map(o => o.id),
              high_quality_output_ids: highQualityOutputs.map(o => o.id),
              learning_log_id: logResult.data.id,
            },
            confidence_score: Math.max(0.1, Math.min(0.9, (7.5 - avgQuality) / 7.5)),
            status: "pending",
          })
        }

        results.push({ agent: agent.agent_name, action: "proposed_improvement" })
      } catch (agentErr) {
        const message = agentErr instanceof Error ? agentErr.message : String(agentErr)
        console.error(`[fn3-learning] Error for agent ${agent.agent_name}:`, message)
        results.push({ agent: agent.agent_name, action: "error", error: message })
      }
    }

    // Update agent baseline_quality in metrics (rolling 30-day avg)
    await updateBaselineQuality(supabase)

    console.log(`[fn3-learning] Cycle complete. Results: ${JSON.stringify(results)}`)

    return new Response(
      JSON.stringify({ success: true, agents_processed: agents.length, results }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )
  } catch (err) {
    console.error("[fn3-learning] Fatal error:", err)
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
})

async function updateBaselineQuality(supabase: ReturnType<typeof createClient>): Promise<void> {
  // For each agent, compute 30-day rolling avg quality and update baseline_quality
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const metricsResult = await supabase
    .from("fn3_agent_metrics")
    .select("agent_name, avg_quality_score, metric_date")
    .gte("metric_date", thirtyDaysAgo.toISOString().split("T")[0])

  const metrics = metricsResult.data ?? []

  // Group by agent and compute average
  const agentAverages = metrics.reduce(
    (acc: Record<string, { sum: number; count: number }>, m: { agent_name: string; avg_quality_score: number | null }) => {
      if (!acc[m.agent_name]) acc[m.agent_name] = { sum: 0, count: 0 }
      if (m.avg_quality_score !== null) {
        acc[m.agent_name].sum += m.avg_quality_score
        acc[m.agent_name].count += 1
      }
      return acc
    },
    {}
  )

  const today = new Date().toISOString().split("T")[0]
  for (const [agentName, { sum, count }] of Object.entries(agentAverages)) {
    if (count === 0) continue
    const baseline = sum / count

    // Update today's metrics row with new baseline (upsert)
    await supabase.from("fn3_agent_metrics").upsert(
      {
        agent_name: agentName,
        metric_date: today,
        department: "exec", // placeholder — will be updated by actual agent
        baseline_quality: baseline,
      },
      { onConflict: "agent_name,metric_date", ignoreDuplicates: false }
    )
  }
}
