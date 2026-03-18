export interface NicheData {
  id: string
  name: string
  tagline: string
  description: string
  painPoints: string[]
  solutions: string[]
  metrics: {
    label: string
    value: string
    description: string
  }[]
  testimonial?: {
    quote: string
    author: string
    role: string
    company: string
  }
  cta: {
    primary: string
    secondary: string
  }
  color: {
    primary: string
    secondary: string
    gradient: string
  }
  icon: string
  industry: string
  targetAudience: string[]
}

export const niches: NicheData[] = [
  {
    id: 'dental',
    name: 'DENTAL',
    tagline: 'The Chair-Time Recovery Engine',
    description: 'AI-powered operational intelligence that maximizes chair utilization, reduces no-shows, and optimizes patient flow for dental practices.',
    industry: 'Dental Care',
    targetAudience: ['Dental Practice Owners', 'Oral Surgeons', 'Orthodontists', 'Practice Managers'],
    painPoints: [
      'High no-show rates eating into daily revenue',
      'Inefficient scheduling leading to chair downtime',
      'Manual insurance verification consuming staff hours',
      'Patient communication gaps causing dissatisfaction',
      'Inventory management creating cash flow issues'
    ],
    solutions: [
      'Intelligent scheduling optimization with predictive no-show modeling',
      'Automated patient communication and reminder systems',
      'Real-time insurance verification and benefits checking',
      'Smart inventory management with automated reordering',
      'Performance analytics and practice efficiency metrics'
    ],
    metrics: [
      {
        label: 'Chair Utilization',
        value: '+35%',
        description: 'Average increase in productive chair time'
      },
      {
        label: 'No-Show Rate',
        value: '-60%',
        description: 'Reduction in missed appointments'
      },
      {
        label: 'Admin Time',
        value: '-8hrs/week',
        description: 'Staff time savings per week'
      }
    ],
    cta: {
      primary: 'Schedule Practice Assessment',
      secondary: 'View Case Studies'
    },
    color: {
      primary: 'from-teal-500 to-cyan-600',
      secondary: 'from-teal-50 to-cyan-50',
      gradient: 'bg-gradient-to-br from-teal-500 to-cyan-600'
    },
    icon: 'Tooth',
    testimonial: {
      quote: "FN3 Hive transformed our practice efficiency. We're seeing 35% more patients with the same staff.",
      author: "Dr. Sarah Chen",
      role: "Practice Owner",
      company: "Elite Dental Care"
    }
  },
  {
    id: 'wealth',
    name: 'WEALTH',
    tagline: 'The Advisor Liberation System',
    description: 'Advanced AI that handles client onboarding, compliance monitoring, and portfolio optimization, freeing advisors to focus on high-value relationship building.',
    industry: 'Wealth Management',
    targetAudience: ['Financial Advisors', 'RIA Firms', 'Wealth Managers', 'Financial Planners'],
    painPoints: [
      'Endless compliance documentation consuming billable hours',
      'Client onboarding taking weeks instead of days',
      'Manual portfolio rebalancing across hundreds of accounts',
      'Risk assessment and reporting eating into client time',
      'Regulatory updates requiring constant process changes'
    ],
    solutions: [
      'Automated compliance monitoring and documentation',
      'Streamlined client onboarding with digital workflows',
      'AI-driven portfolio optimization and rebalancing',
      'Intelligent risk assessment and reporting automation',
      'Regulatory change management and process updates'
    ],
    metrics: [
      {
        label: 'Client Capacity',
        value: '+150%',
        description: 'More clients per advisor without burnout'
      },
      {
        label: 'Onboarding Time',
        value: '-80%',
        description: 'Faster client onboarding process'
      },
      {
        label: 'Compliance Cost',
        value: '-70%',
        description: 'Reduction in compliance overhead'
      }
    ],
    cta: {
      primary: 'Book Strategy Session',
      secondary: 'Download ROI Calculator'
    },
    color: {
      primary: 'from-emerald-500 to-green-600',
      secondary: 'from-emerald-50 to-green-50',
      gradient: 'bg-gradient-to-br from-emerald-500 to-green-600'
    },
    icon: 'TrendingUp',
    testimonial: {
      quote: "Our AUM grew 150% in 18 months thanks to FN3's automation. I can finally focus on my clients.",
      author: "Michael Rodriguez",
      role: "Senior Advisor",
      company: "Summit Wealth Partners"
    }
  },
  {
    id: 'law',
    name: 'LAW',
    tagline: 'The Matter Velocity Accelerator',
    description: 'Legal AI that streamlines case management, automates document review, and optimizes billing processes for maximum matter velocity and profitability.',
    industry: 'Legal Services',
    targetAudience: ['Law Firm Partners', 'Solo Practitioners', 'Legal Operations', 'Paralegals'],
    painPoints: [
      'Document review consuming 60% of billable hours',
      'Manual time tracking creating billing disputes',
      'Case management scattered across multiple systems',
      'Client communication delays hurting satisfaction',
      'Deadline management causing missed opportunities'
    ],
    solutions: [
      'AI-powered document review and analysis automation',
      'Intelligent time tracking and billing optimization',
      'Unified case management with workflow automation',
      'Automated client communication and status updates',
      'Smart deadline management and conflict checking'
    ],
    metrics: [
      {
        label: 'Document Review',
        value: '+400%',
        description: 'Faster document processing speed'
      },
      {
        label: 'Billing Accuracy',
        value: '+95%',
        description: 'Automated time capture accuracy'
      },
      {
        label: 'Matter Velocity',
        value: '+65%',
        description: 'Faster case resolution'
      }
    ],
    cta: {
      primary: 'Request Firm Demo',
      secondary: 'View Success Stories'
    },
    color: {
      primary: 'from-blue-500 to-indigo-600',
      secondary: 'from-blue-50 to-indigo-50',
      gradient: 'bg-gradient-to-br from-blue-500 to-indigo-600'
    },
    icon: 'Scale',
    testimonial: {
      quote: "FN3 Hive reduced our document review time by 75%. We're closing cases faster than ever.",
      author: "Jennifer Walsh",
      role: "Managing Partner",
      company: "Walsh & Associates"
    }
  },
  {
    id: 'clinics',
    name: 'CLINICS',
    tagline: 'The Patient Flow Optimizer',
    description: 'Medical AI that optimizes patient scheduling, automates clinical workflows, and enhances care coordination for urgent care and walk-in clinics.',
    industry: 'Healthcare',
    targetAudience: ['Clinic Directors', 'Medical Practice Owners', 'Healthcare Administrators', 'Nurse Managers'],
    painPoints: [
      'Unpredictable patient volumes causing wait time spikes',
      'Manual triage and intake slowing patient flow',
      'Insurance verification delays at point of care',
      'Staff scheduling mismatched to patient demand',
      'Clinical documentation consuming physician time'
    ],
    solutions: [
      'Predictive patient volume modeling and staff optimization',
      'Automated triage and digital intake processes',
      'Real-time insurance verification and pre-authorization',
      'AI-powered staff scheduling based on demand patterns',
      'Clinical documentation assistance and workflow automation'
    ],
    metrics: [
      {
        label: 'Wait Time',
        value: '-45%',
        description: 'Average patient wait time reduction'
      },
      {
        label: 'Patient Volume',
        value: '+60%',
        description: 'More patients served per day'
      },
      {
        label: 'Documentation Time',
        value: '-50%',
        description: 'Less time on paperwork per patient'
      }
    ],
    cta: {
      primary: 'Schedule Clinic Walkthrough',
      secondary: 'Download Patient Flow Guide'
    },
    color: {
      primary: 'from-purple-500 to-violet-600',
      secondary: 'from-purple-50 to-violet-50',
      gradient: 'bg-gradient-to-br from-purple-500 to-violet-600'
    },
    icon: 'Heart',
    testimonial: {
      quote: "Patient satisfaction scores increased 40% after implementing FN3. Flow is everything in urgent care.",
      author: "Dr. Amanda Foster",
      role: "Medical Director",
      company: "CityMed Urgent Care"
    }
  },
  {
    id: 'trades',
    name: 'TRADES/AUTO',
    tagline: 'The Parts & Labor Profit Protector',
    description: 'Intelligent operations AI that optimizes parts inventory, automates job scheduling, and maximizes labor efficiency for automotive and trade businesses.',
    industry: 'Automotive & Trades',
    targetAudience: ['Shop Owners', 'Service Managers', 'Fleet Managers', 'Trade Contractors'],
    painPoints: [
      'Parts ordering tied up in cash with frequent stockouts',
      'Job scheduling inefficiencies causing customer delays',
      'Manual estimate creation taking too long',
      'Technician productivity varying wildly by day',
      'Customer communication gaps hurting retention'
    ],
    solutions: [
      'Predictive parts inventory management and just-in-time ordering',
      'Intelligent job scheduling and bay optimization',
      'Automated estimate generation with dynamic pricing',
      'Technician performance tracking and productivity optimization',
      'Customer communication automation and job status updates'
    ],
    metrics: [
      {
        label: 'Parts Efficiency',
        value: '+85%',
        description: 'Better inventory turns, less cash tied up'
      },
      {
        label: 'Labor Utilization',
        value: '+40%',
        description: 'More billable hours per technician'
      },
      {
        label: 'Customer Retention',
        value: '+30%',
        description: 'Higher repeat customer rate'
      }
    ],
    cta: {
      primary: 'Book Shop Assessment',
      secondary: 'View ROI Calculator'
    },
    color: {
      primary: 'from-orange-500 to-red-600',
      secondary: 'from-orange-50 to-red-50',
      gradient: 'bg-gradient-to-br from-orange-500 to-red-600'
    },
    icon: 'Wrench',
    testimonial: {
      quote: "FN3 helped us increase revenue per bay by 40% while cutting parts costs. Game-changing results.",
      author: "Carlos Mendez",
      role: "Shop Owner",
      company: "Elite Auto Service"
    }
  }
]

export function getNicheById(id: string): NicheData | undefined {
  return niches.find(niche => niche.id === id)
}

export function getAllNicheIds(): string[] {
  return niches.map(niche => niche.id)
}