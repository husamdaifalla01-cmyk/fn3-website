-- FN3 pg_cron jobs
-- Self-learning cycle: every day at 3am UTC
SELECT cron.schedule(
  'fn3-learning',
  '0 3 * * *',
  $$SELECT net.http_post(
    url := 'https://cetrxwtmzrogbbrblkys.supabase.co/functions/v1/fn3-learning',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer REDACTED_SERVICE_ROLE_KEY"}'::jsonb,
    body := '{}'::jsonb
  )$$
);
