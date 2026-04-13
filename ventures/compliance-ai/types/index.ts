export type PracticeType =
  | 'medical'
  | 'dental'
  | 'mental_health'
  | 'chiropractic'
  | 'optometry'
  | 'physical_therapy'
  | 'urgent_care'
  | 'other'

export type ComplianceStatus = 'compliant' | 'partial' | 'non_compliant' | 'not_started'

export type SafeguardArea = 'administrative' | 'physical' | 'technical' | 'organizational'

export type IncidentSeverity = 'low' | 'medium' | 'high' | 'critical'

export type IncidentStatus = 'open' | 'investigating' | 'resolved' | 'reported'

export type DocumentType =
  | 'privacy_policy'
  | 'security_policy'
  | 'workforce_training'
  | 'baa_template'
  | 'risk_assessment'
  | 'sanctions_policy'

export interface Practice {
  id: string
  user_id: string
  name: string
  practice_type: PracticeType
  provider_count: number
  state: string
  created_at: string
}

export interface ComplianceArea {
  id: string
  practice_id: string
  area: SafeguardArea
  category: string
  status: ComplianceStatus
  notes: string | null
  last_reviewed: string | null
  updated_at: string
}

export interface PolicyDocument {
  id: string
  practice_id: string
  document_type: DocumentType
  title: string
  content: string
  generated_at: string
  version: number
}

export interface Incident {
  id: string
  practice_id: string
  incident_type: string
  description: string | null
  severity: IncidentSeverity | null
  status: IncidentStatus
  response_steps: ResponseStep[] | null
  created_at: string
}

export interface ResponseStep {
  step: number
  title: string
  description: string
  deadline?: string
  completed?: boolean
}

export interface AuditReport {
  id: string
  practice_id: string
  report_type: string
  compliance_score: number
  findings: Finding[]
  recommendations: Recommendation[]
  generated_at: string
}

export interface Finding {
  area: SafeguardArea
  category: string
  status: ComplianceStatus
  details: string
}

export interface Recommendation {
  priority: 'high' | 'medium' | 'low'
  action: string
  rationale: string
  deadline?: string
}

export interface ComplianceScoreBreakdown {
  overall: number
  administrative: number
  physical: number
  technical: number
  organizational: number
}

export const HIPAA_REQUIREMENTS: Record<SafeguardArea, string[]> = {
  administrative: [
    'Risk Analysis & Management',
    'Sanction Policy',
    'Information System Activity Review',
    'Assigned Security Responsibility',
    'Workforce Training & Management',
    'Evaluation Procedures',
    'Business Associate Contracts',
    'Contingency Plan',
    'Emergency Mode Operation Plan',
  ],
  physical: [
    'Facility Access Controls',
    'Workstation Use Policy',
    'Workstation Security',
    'Device & Media Controls',
    'Disposal Procedures',
    'Media Re-use Procedures',
    'Accountability Controls',
  ],
  technical: [
    'Unique User Identification',
    'Emergency Access Procedure',
    'Automatic Logoff',
    'Encryption & Decryption',
    'Audit Controls',
    'Integrity Controls',
    'Transmission Security',
    'Authentication Procedures',
  ],
  organizational: [
    'Business Associate Agreements',
    'Group Health Plan Requirements',
    'Policies & Procedures Documentation',
    'Documentation Retention',
    'Privacy Officer Designation',
    'Workforce Sanctions Policy',
  ],
}

export const DOCUMENT_TYPES: Record<DocumentType, string> = {
  privacy_policy: 'Notice of Privacy Practices',
  security_policy: 'HIPAA Security Policy',
  workforce_training: 'Workforce Training Policy',
  baa_template: 'Business Associate Agreement Template',
  risk_assessment: 'Annual Risk Assessment',
  sanctions_policy: 'Workforce Sanctions Policy',
}

export const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'DC',
]
