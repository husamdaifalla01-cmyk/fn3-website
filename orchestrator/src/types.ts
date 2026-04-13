// FN3 Orchestrator — Core Types

export type VentureStatus = 'active' | 'concept' | 'paused' | 'exited'
export type AgentType = 'supervisor' | 'worker'
export type AgentStatus = 'idle' | 'busy' | 'failed' | 'learning'
export type JobStatus = 'queued' | 'picked_up' | 'completed' | 'failed'
export type PRDStatus = 'active' | 'paused' | 'completed' | 'blocked'
export type Department = 'exec' | 'product' | 'sales' | 'marketing' | 'leadgen' | 'acquisition' | 'support' | 'legal' | 'qa' | 'dev'
export type OutputType = 'content' | 'report' | 'email' | 'proposal' | 'code' | 'analysis' | 'decision' | 'lead' | 'ticket' | 'ad_copy' | 'misc'
export type EscalationStatus = 'pending' | 'resolved' | 'expired'

export interface Venture {
  id: string
  name: string
  status: VentureStatus
  departments_enabled: Department[]
  created_at: string
  auto_provisioned: boolean
}

export interface PRDObjective {
  id: string
  venture_id: string | null
  department: Department
  priority: number
  objective: string
  kpis: Record<string, unknown>
  constraints: Record<string, unknown>
  status: PRDStatus
  last_reviewed_at: string | null
  owner_agent: string | null
  created_at: string
  updated_at: string
}

export interface AgentRegistry {
  id: string
  agent_name: string
  agent_type: AgentType
  department: Department
  venture_id: string | null
  skill_version_id: string | null
  status: 'active' | 'paused' | 'deprecated'
  created_at: string
  last_run_at: string | null
}

export interface AgentState {
  id: string
  agent_name: string
  status: AgentStatus
  current_job_id: string | null
  last_heartbeat: string
  failure_reason: string | null
  updated_at: string
}

export interface DispatchJob {
  id: string
  venture_id: string
  department: Department
  supervisor_agent: string
  task_payload: TaskPayload
  priority: number
  status: JobStatus
  created_at: string
  picked_up_at: string | null
  completed_at: string | null
  tick_id: string | null
}

export interface TaskPayload {
  venture_name: string
  venture_status: VentureStatus
  objectives: PRDObjective[]
  agent_context: string
  skill_content: string
  constraints: Record<string, unknown>
}

export interface HeartbeatLog {
  id: string
  tick_at: string
  ventures_active: number
  jobs_dispatched: number
  jobs_failed: number
  agents_busy: number
  agents_failed: number
  tick_duration_ms: number | null
  notes: string | null
  created_at: string
}

export interface VentureMetrics {
  venture_id: string
  metric_date: string
  mrr: number
  new_mrr: number
  churned_mrr: number
  expansion_mrr: number
  active_customers: number
  new_customers: number
  churned_customers: number
  leads_generated: number
  trials_started: number
  cac: number | null
  ltv: number | null
}

export interface SkillVersion {
  id: string
  agent_name: string
  version: number
  skill_content: string
  is_active: boolean
  deployed_at: string | null
  rolled_back_at: string | null
  created_at: string
}

export interface DispatchPlan {
  venture: Venture
  department: Department
  supervisor: AgentRegistry
  objectives: PRDObjective[]
  metrics: VentureMetrics | null
  priority: number
}
