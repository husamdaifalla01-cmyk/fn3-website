import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
  const url = new URL(req.url)
  const path = url.pathname.replace("/fn3-api", "")

  try {
    // GET /status — overall system health
    if (req.method === "GET" && path === "/status") {
      const [venturesResult, agentStatesResult, pendingEscalationsResult, lastTickResult] =
        await Promise.all([
          supabase.from("fn3_ventures").select("id, name, status"),
          supabase.from("fn3_agent_state").select("status"),
          supabase
            .from("fn3_escalations")
            .select("id", { count: "exact" })
            .eq("status", "pending"),
          supabase
            .from("fn3_heartbeat_log")
            .select("*")
            .order("tick_at", { ascending: false })
            .limit(1)
            .maybeSingle(),
        ])

      const agentStates = agentStatesResult.data ?? []
      const statusCounts = agentStates.reduce(
        (acc: Record<string, number>, s: { status: string }) => {
          acc[s.status] = (acc[s.status] ?? 0) + 1
          return acc
        },
        {}
      )

      return new Response(
        JSON.stringify({
          ventures: venturesResult.data,
          agents: statusCounts,
          pending_escalations: pendingEscalationsResult.count ?? 0,
          last_tick: lastTickResult.data,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    // GET /ventures — all ventures with latest metrics
    if (req.method === "GET" && path === "/ventures") {
      const venturesResult = await supabase
        .from("fn3_ventures")
        .select("*")
        .order("name")

      return new Response(
        JSON.stringify(venturesResult.data),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    // GET /ventures/:id/metrics — latest metrics for a venture
    if (req.method === "GET" && path.match(/^\/ventures\/[^/]+\/metrics$/)) {
      const ventureId = path.split("/")[2]
      const metricsResult = await supabase
        .from("fn3_venture_metrics")
        .select("*")
        .eq("venture_id", ventureId)
        .order("metric_date", { ascending: false })
        .limit(30)

      return new Response(
        JSON.stringify(metricsResult.data),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    // GET /agents — all agents with current state
    if (req.method === "GET" && path === "/agents") {
      const result = await supabase
        .from("fn3_agent_registry")
        .select(`
          *,
          fn3_agent_state (status, last_heartbeat, failure_reason)
        `)
        .order("department")
        .order("agent_type")

      return new Response(
        JSON.stringify(result.data),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    // GET /escalations/pending — pending escalations for Husam
    if (req.method === "GET" && path === "/escalations/pending") {
      const result = await supabase
        .from("fn3_escalations")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: true })

      return new Response(
        JSON.stringify(result.data),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    // GET /heartbeat/recent — recent tick history
    if (req.method === "GET" && path === "/heartbeat/recent") {
      const result = await supabase
        .from("fn3_heartbeat_log")
        .select("*")
        .order("tick_at", { ascending: false })
        .limit(20)

      return new Response(
        JSON.stringify(result.data),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    // GET /outputs/recent — recent agent outputs
    if (req.method === "GET" && path === "/outputs/recent") {
      const ventureId = url.searchParams.get("venture_id")
      const department = url.searchParams.get("department")
      const limit = parseInt(url.searchParams.get("limit") ?? "20")

      let query = supabase
        .from("fn3_agent_outputs")
        .select("id, agent_name, venture_id, department, output_type, output_metadata, quality_score, created_at")
        .order("created_at", { ascending: false })
        .limit(Math.min(limit, 100))

      if (ventureId) query = query.eq("venture_id", ventureId)
      if (department) query = query.eq("department", department)

      const result = await query
      return new Response(
        JSON.stringify(result.data),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    // GET /learning/recent — recent self-learning activity
    if (req.method === "GET" && path === "/learning/recent") {
      const result = await supabase
        .from("fn3_learning_log")
        .select(`
          *,
          fn3_skill_proposals (status, confidence_score, approved_at)
        `)
        .order("created_at", { ascending: false })
        .limit(20)

      return new Response(
        JSON.stringify(result.data),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    return new Response(
      JSON.stringify({ error: "Not found", available_routes: [
        "GET /status",
        "GET /ventures",
        "GET /ventures/:id/metrics",
        "GET /agents",
        "GET /escalations/pending",
        "GET /heartbeat/recent",
        "GET /outputs/recent",
        "GET /learning/recent",
      ]}),
      { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  } catch (err) {
    console.error("[fn3-api] Error:", err)
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  }
})
