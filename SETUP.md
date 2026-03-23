# FN3 Setup Guide

Get FN3 running from scratch in under 2 hours. Follow these steps in order.

---

## Prerequisites

- Node.js 20+ (`node --version`)
- Supabase CLI (`npm install -g supabase`)
- A Supabase account at supabase.com
- A Telegram account + bot token (from @BotFather)
- Claude Max subscription (for agent execution)

---

## Step 1 — Create Supabase Project

1. Go to supabase.com → New Project
2. Name: `fn3-production`
3. Database password: save this securely
4. Region: choose closest to you
5. Wait for project to provision (~2 minutes)

Once ready, grab:
- **Project URL**: Settings → API → Project URL
- **Service Role Key**: Settings → API → service_role secret key (NOT the anon key)

---

## Step 2 — Link Supabase CLI

```bash
cd /Users/husamahmed/FN3
supabase login
supabase link --project-ref <your-project-ref>
```

Your project ref is in your Supabase dashboard URL: `https://app.supabase.com/project/<ref>`

---

## Step 3 — Enable Extensions

In Supabase Dashboard → SQL Editor, run:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";
CREATE EXTENSION IF NOT EXISTS "pg_cron";
CREATE EXTENSION IF NOT EXISTS "pg_net";
```

Then enable pgvector in Dashboard → Database → Extensions → search "vector" → enable.

---

## Step 4 — Run Migrations

```bash
cd /Users/husamahmed/FN3
supabase db push
```

This runs all 4 migrations in order:
- `20260317000001_fn3_core_schema.sql` — All 19 tables + indexes
- `20260317000002_fn3_rls_policies.sql` — Row Level Security
- `20260317000003_fn3_realtime.sql` — Realtime + triggers
- `20260317000004_fn3_seed_data.sql` — Ventures + agents + initial PRD

Verify in Dashboard → Table Editor — you should see all 19 tables.

---

## Step 5 — Configure Supabase Secrets

```bash
supabase secrets set TELEGRAM_BOT_TOKEN=<your-bot-token>
supabase secrets set TELEGRAM_CHAT_ID=<your-chat-id>
supabase secrets set RESEND_API_KEY=<your-resend-key>
supabase secrets set BRAVE_SEARCH_API_KEY=<your-brave-key>
```

To get your Telegram chat ID:
1. Message your bot
2. Visit: `https://api.telegram.org/bot<TOKEN>/getUpdates`
3. Find `"chat":{"id":<number>}` — that's your chat ID

---

## Step 6 — Deploy Edge Functions

```bash
supabase functions deploy fn3-escalation --no-verify-jwt
supabase functions deploy fn3-telegram-hook --no-verify-jwt
supabase functions deploy fn3-api
supabase functions deploy fn3-learning --no-verify-jwt
```

Test the API:
```bash
curl https://<your-project>.supabase.co/functions/v1/fn3-api/status \
  -H "Authorization: Bearer <anon-key>"
```

---

## Step 7 — Configure Telegram Webhook

```bash
curl -X POST "https://api.telegram.org/bot<TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://<your-project>.supabase.co/functions/v1/fn3-telegram-hook",
    "allowed_updates": ["message"]
  }'
```

Test it: send "?" to your bot. It should reply with pending escalations.

---

## Step 8 — Configure pg_cron (Supabase Scheduler)

In Supabase Dashboard → SQL Editor:

```sql
-- Set your Edge Function base URL (replace with your actual URL)
ALTER DATABASE postgres SET app.edge_function_url = 'https://<your-project>.supabase.co/functions/v1';

-- Heartbeat: every 15 minutes
SELECT cron.schedule(
  'fn3-heartbeat',
  '*/15 * * * *',
  $$SELECT net.http_post(
    url := current_setting('app.edge_function_url') || '/fn3-orchestrator',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer <your-service-role-key>"}'::jsonb,
    body := '{}'::jsonb
  )$$
);

-- Self-learning cycle: every day at 3am
SELECT cron.schedule(
  'fn3-learning',
  '0 3 * * *',
  $$SELECT net.http_post(
    url := current_setting('app.edge_function_url') || '/fn3-learning',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer <your-service-role-key>"}'::jsonb,
    body := '{}'::jsonb
  )$$
);

-- Verify schedules are active
SELECT jobname, schedule, active FROM cron.job;
```

---

## Step 9 — Set Up Local Orchestrator (Optional — for local dev)

```bash
cd /Users/husamahmed/FN3/orchestrator
cp .env.example .env
# Edit .env with your Supabase URL and service role key
npm install
npm run dev
```

You should see:
```
[FN3 Orchestrator] Starting up...
[FN3 Orchestrator] Supabase URL: ✅ Set
[FN3 Orchestrator] Service Role Key: ✅ Set
[FN3 Orchestrator] Running initial tick...
[Orchestrator] Tick starting at 2026-...
[Orchestrator] Active ventures: HQ, SUBZII, ...
[Orchestrator] Tick complete in Xms — dispatched: N, failed: 0
```

---

## Step 10 — Upload Agent Skill Files to Supabase

Run this script to seed fn3_skill_versions with all agent skill files:

```bash
cd /Users/husamahmed/FN3
node scripts/seed-skills.js
```

(Script file: `/Users/husamahmed/FN3/scripts/seed-skills.js`)

---

## Step 11 — Verify Everything Works

```bash
# Check system status
curl https://<project>.supabase.co/functions/v1/fn3-api/status \
  -H "Authorization: Bearer <anon-key>" | jq

# Check agents registered
curl https://<project>.supabase.co/functions/v1/fn3-api/agents \
  -H "Authorization: Bearer <anon-key>" | jq '.[0:3]'

# Check heartbeat log (after first tick fires)
curl https://<project>.supabase.co/functions/v1/fn3-api/heartbeat/recent \
  -H "Authorization: Bearer <anon-key>" | jq
```

---

## Ongoing Operations

**Add a new venture:**
```sql
INSERT INTO fn3_ventures (name, status, departments_enabled)
VALUES ('NEWVENTURE', 'concept', '["exec","product","sales","marketing"]'::jsonb);
```
Then insert agent registry entries for the new venture using the same pattern as SUBZII in the seed migration.

**Check agent health:**
Send "list" to your Telegram bot to see all pending escalations.

**Update an agent's skill:**
Edit the appropriate file in `/Users/husamahmed/FN3/agents/`, then re-run `node scripts/seed-skills.js --agent <agent-name>`.

**Monitor:**
- Supabase Dashboard → Table Editor → fn3_heartbeat_log (tick history)
- Supabase Dashboard → Table Editor → fn3_agent_state (live agent status)
- Supabase Dashboard → Logs → Edge Functions (function errors)
