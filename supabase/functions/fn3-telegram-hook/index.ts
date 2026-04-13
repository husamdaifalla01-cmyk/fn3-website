import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN")!
const TELEGRAM_CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID")!
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!

interface TelegramUpdate {
  update_id: number
  message?: {
    message_id: number
    from: { id: number; username?: string }
    chat: { id: number }
    text?: string
    reply_to_message?: { message_id: number }
    date: number
  }
}

serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 })
  }

  try {
    const update: TelegramUpdate = await req.json()
    const message = update.message

    // Only process messages from the configured chat
    if (!message || String(message.chat.id) !== TELEGRAM_CHAT_ID) {
      return new Response("Ignored", { status: 200 })
    }

    const text = message.text?.trim()
    if (!text) {
      return new Response("No text", { status: 200 })
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    // Strategy 1: Reply to an escalation message → find by telegram_message_id
    if (message.reply_to_message) {
      const replyToId = String(message.reply_to_message.message_id)
      const escalationResult = await supabase
        .from("fn3_escalations")
        .select("*")
        .eq("telegram_message_id", replyToId)
        .eq("status", "pending")
        .maybeSingle()

      if (escalationResult.data) {
        const resolved = await resolveEscalation(supabase, escalationResult.data.id, text)
        if (resolved) {
          await sendTelegramAck(message.chat.id, escalationResult.data.id, text)
          return new Response("Resolved via reply", { status: 200 })
        }
      }
    }

    // Strategy 2: Text starts with escalation ID (copy-paste resolution)
    // Format: "<escalation-id> A" or just "A" if only one pending escalation
    const uuidPattern = /^([0-9a-f-]{36})\s+([A-Za-z]+)/i
    const uuidMatch = text.match(uuidPattern)
    if (uuidMatch) {
      const [, escalationId, choice] = uuidMatch
      const resolved = await resolveEscalation(supabase, escalationId, choice)
      if (resolved) {
        await sendTelegramAck(message.chat.id, escalationId, choice)
        return new Response("Resolved via ID", { status: 200 })
      }
    }

    // Strategy 3: Single letter reply → find the oldest pending escalation
    if (/^[A-Za-z]$/.test(text)) {
      const oldestResult = await supabase
        .from("fn3_escalations")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: true })
        .limit(1)
        .maybeSingle()

      if (oldestResult.data) {
        const resolved = await resolveEscalation(supabase, oldestResult.data.id, text)
        if (resolved) {
          await sendTelegramAck(message.chat.id, oldestResult.data.id, text)
          return new Response("Resolved oldest pending", { status: 200 })
        }
      }
    }

    // List pending escalations if user sends "list" or "?"
    if (text.toLowerCase() === "list" || text === "?") {
      const pendingResult = await supabase
        .from("fn3_escalations")
        .select("id, agent_name, department, decision_required, created_at")
        .eq("status", "pending")
        .order("created_at", { ascending: true })

      const pending = pendingResult.data ?? []
      const listText = pending.length === 0
        ? "✅ No pending escalations."
        : pending.map((e, i) =>
            `${i + 1}. [${e.department}] ${e.agent_name}\n   ${e.decision_required.slice(0, 80)}...\n   ID: \`${e.id}\``
          ).join("\n\n")

      await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: message.chat.id,
            text: `*Pending Escalations (${pending.length}):*\n\n${listText}`,
            parse_mode: "Markdown",
          }),
        }
      )
    }

    return new Response("Processed", { status: 200 })
  } catch (err) {
    console.error("[fn3-telegram-hook] Error:", err)
    return new Response("Error", { status: 500 })
  }
})

async function resolveEscalation(
  supabase: ReturnType<typeof createClient>,
  escalationId: string,
  resolvedAction: string
): Promise<boolean> {
  const result = await supabase
    .from("fn3_escalations")
    .update({
      status: "resolved",
      resolved_action: resolvedAction.toUpperCase(),
      resolved_at: new Date().toISOString(),
    })
    .eq("id", escalationId)
    .eq("status", "pending")

  return !result.error
}

async function sendTelegramAck(
  chatId: number,
  escalationId: string,
  choice: string
): Promise<void> {
  await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: `✅ Escalation resolved with choice: *${choice.toUpperCase()}*\nID: \`${escalationId}\``,
        parse_mode: "Markdown",
      }),
    }
  )
}
