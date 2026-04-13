-- FN3 Heartbeat Cron Job
-- Fires fn3-orchestrator Edge Function every 15 minutes
-- Requires pg_cron and pg_net extensions (enabled in 20260317000000_fn3_extensions.sql)
--
-- NOTE: The Authorization token below must be set to your project's service_role key.
-- Retrieve it from: Supabase Dashboard → Project Settings → API → service_role
-- Never hardcode real keys here — set via Supabase Vault or update after migration runs.

SELECT cron.schedule(
  'fn3-heartbeat',
  '*/15 * * * *',
  $$SELECT net.http_post(
    url := 'https://cetrxwtmzrogbbrblkys.supabase.co/functions/v1/fn3-orchestrator',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer YOUR_SERVICE_ROLE_KEY"}'::jsonb,
    body := '{}'::jsonb
  )$$
);
