-- FN3 Heartbeat Cron Job
-- Fires fn3-orchestrator Edge Function every 15 minutes
-- Requires pg_cron and pg_net extensions (enabled in 20260317000000_fn3_extensions.sql)

SELECT cron.schedule(
  'fn3-heartbeat',
  '*/15 * * * *',
  $$SELECT net.http_post(
    url := 'https://cetrxwtmzrogbbrblkys.supabase.co/functions/v1/fn3-orchestrator',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer REDACTED_SERVICE_ROLE_KEY"}'::jsonb,
    body := '{}'::jsonb
  )$$
);
