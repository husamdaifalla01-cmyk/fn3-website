-- FN3 Realtime Configuration
-- Enables Supabase Realtime on tables that agents subscribe to

-- Supervisors subscribe to fn3_dispatch_queue filtered by their supervisor_agent name
-- Orchestrator subscribes to fn3_agent_state to monitor acknowledgements
-- Escalation Edge Function subscribes to fn3_escalations for instant Telegram delivery

ALTER PUBLICATION supabase_realtime ADD TABLE fn3_dispatch_queue;
ALTER PUBLICATION supabase_realtime ADD TABLE fn3_agent_state;
ALTER PUBLICATION supabase_realtime ADD TABLE fn3_escalations;
ALTER PUBLICATION supabase_realtime ADD TABLE fn3_heartbeat_log;

-- Trigger-based notification for escalations (backup to Realtime)
-- Edge Function fn3-escalation subscribes via Realtime, but this webhook is a safety net

CREATE OR REPLACE FUNCTION fn3_notify_escalation()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  PERFORM pg_notify(
    'fn3_escalation',
    json_build_object(
      'id', NEW.id,
      'agent_name', NEW.agent_name,
      'venture_id', NEW.venture_id,
      'department', NEW.department,
      'decision_required', NEW.decision_required,
      'options', NEW.options
    )::text
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER fn3_escalation_notify
  AFTER INSERT ON fn3_escalations
  FOR EACH ROW
  EXECUTE FUNCTION fn3_notify_escalation();

-- Auto-update updated_at timestamps
CREATE OR REPLACE FUNCTION fn3_set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER fn3_prd_updated_at
  BEFORE UPDATE ON fn3_prd
  FOR EACH ROW EXECUTE FUNCTION fn3_set_updated_at();

CREATE TRIGGER fn3_agent_state_updated_at
  BEFORE UPDATE ON fn3_agent_state
  FOR EACH ROW EXECUTE FUNCTION fn3_set_updated_at();

CREATE TRIGGER fn3_conversations_updated_at
  BEFORE UPDATE ON fn3_conversations
  FOR EACH ROW EXECUTE FUNCTION fn3_set_updated_at();
