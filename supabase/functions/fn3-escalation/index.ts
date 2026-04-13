import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN")!
const TELEGRAM_CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID")!
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!

interface EscalationRecord {
  id: string
  agent_name: string
  venture_id: string | null
  department: string
  decision_required: string
  context: string
  options: Array<{ label: string; description: string }>
  status: string
  created_at: string
}

interface WebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE"
  table: string
  record: EscalationRecord
  schema: string
}

serve(async (req: Request) => {
  try {
    // Verify this is a POST from Supabase
    if (req.method !== "POST") {
      return new Response("Method not allowed", { status: 405 })
    }

    const payload: WebhookPayload = await req.json()

    // Only handle new escalations
    if (payload.type !== "INSERT" || payload.table !== "fn3_escalations") {
      return new Response("Not an escalation insert", { status: 200 })
    }

    const escalation = payload.record

    // Format the Telegram message
    const optionsText = escalation.options
      .map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt.label}: ${opt.description}`)
      .join("\n")

    const message = [
      `🚨 *FN3 ESCALATION*`,
      ``,
      `*Agent:* ${escalation.agent_name}`,
      `*Department:* ${escalation.department}`,
      escalation.venture_id ? `*Venture ID:* ${escalation.venture_id}` : `*Scope:* HQ / Platform`,
      ``,
      `*Decision Required:*`,
      escalation.decision_required,
      ``,
      `*Context:*`,
      escalation.context,
      ``,
      `*Your Options:*`,
      optionsText,
      ``,
      `*Reply with the letter* (A, B, C...) to resolve.`,
      `*Escalation ID:* \`${escalation.id}\``,
    ].join("\n")

    // Send Telegram message
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }),
      }
    )

    if (!telegramResponse.ok) {
      const error = await telegramResponse.text()
      throw new Error(`Telegram API error: ${error}`)
    }

    const telegramData = await telegramResponse.json()
    const messageId = String(telegramData.result?.message_id ?? "")

    // Store the telegram_message_id in the escalation record
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
    await supabase
      .from("fn3_escalations")
      .update({ telegram_message_id: messageId })
      .eq("id", escalation.id)

    console.log(`[fn3-escalation] Sent Telegram message ${messageId} for escalation ${escalation.id}`)

    return new Response(
      JSON.stringify({ success: true, telegram_message_id: messageId }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )
  } catch (err) {
    console.error("[fn3-escalation] Error:", err)
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
})
