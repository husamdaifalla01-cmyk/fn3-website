import Link from 'next/link'
import {
  Zap,
  FileText,
  MessageSquare,
  Wrench,
  CheckCircle,
  ArrowRight,
  Star,
  Shield,
  Clock,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  Building2,
  Users,
  UserCheck,
  RefreshCw,
  ClipboardList,
  DollarSign,
} from 'lucide-react'

const FEATURES = [
  {
    icon: FileText,
    title: 'Lease Intelligence',
    description: 'Upload any lease and get a complete risk analysis in 30 seconds. Auto-flags risky clauses, tracks renewal dates, and predicts problem tenants before they become one.',
    bullets: [
      'Risk scoring from 0–100 with specific clause breakdowns',
      'Flags missing landlord protections instantly',
      'Tracks all lease expiration dates in one view',
      '30/60/90-day renewal alerts so you\'re never caught off guard',
    ],
    demo: {
      label: 'Sample Analysis Output',
      content: [
        { type: 'risk', label: 'Risk Score', value: '74/100 — High Risk', color: 'red' },
        { type: 'flag', label: 'Early Termination', value: 'Tenant may exit with 30-day notice, no penalty clause present', color: 'red' },
        { type: 'flag', label: 'Maintenance Liability', value: 'Ambiguous — appliance repairs not assigned to either party', color: 'yellow' },
        { type: 'ok', label: 'Rent Increase Cap', value: 'CPI-capped at 3% annually — standard', color: 'green' },
      ],
    },
  },
  {
    icon: MessageSquare,
    title: 'Tenant Communication',
    description: 'Generate professional, legally appropriate responses to any tenant message in seconds. Three tone options. Every response is specific to their situation.',
    bullets: [
      'Handles late rent, noise complaints, maintenance requests, lease breaks',
      'Automatically drafts follow-up action items for you',
      'Detects when a message should trigger a work order',
      'Firm, Friendly, or Formal tone — you choose',
    ],
    demo: {
      label: 'Tenant Message → AI Response',
      content: [
        { type: 'message', label: 'Tenant says:', value: '"I need to break my lease early, I got a job offer in another city"', color: 'slate' },
        { type: 'response', label: 'AI drafts:', value: 'Dear Marcus, Thank you for letting us know. Per Section 8.2 of your lease, early termination requires 60-day written notice and payment of 2 months rent as a termination fee...', color: 'violet' },
      ],
    },
  },
  {
    icon: Wrench,
    title: 'Maintenance Coordination',
    description: 'Turn tenant complaints into professional work orders in one click. Auto-assign to vendors, track completion, and follow up — all without touching a phone.',
    bullets: [
      'Generates complete work orders from plain-language descriptions',
      'Includes access instructions and safety notes automatically',
      'Vendor communication scripts ready to send',
      'Priority escalation based on safety and urgency',
    ],
    demo: {
      label: 'Auto-Generated Work Order',
      content: [
        { type: 'issue', label: 'Reported Issue:', value: '"The heat has been out for 2 days, it\'s 45°F inside"', color: 'red' },
        { type: 'order', label: 'Work Order:', value: 'EMERGENCY — HVAC System Failure\nUnit 4B, 221 Oak Street\nPriority: Immediate (habitability issue, >48hrs without heat)\nEstimated: 2-4 hours. Contact tenant before arrival.', color: 'orange' },
      ],
    },
  },
  {
    icon: UserCheck,
    title: 'Tenant Screening Reports',
    description: 'Generate Fair Housing Act-compliant screening summaries in seconds. Analyze income ratios, flag rental history red flags, and get a clear approve/decline recommendation.',
    bullets: [
      'Income-to-rent ratio analysis (30% rule enforcement)',
      'Red flag detection from rental history descriptions',
      'Recommended reference questions tailored to the applicant',
      'Fair Housing Act compliance note built into every report',
    ],
    demo: {
      label: 'Screening Report Output',
      content: [
        { type: 'ratio', label: 'Income Ratio', value: '28% — PASS (Rent $1,400 / Income $5,000/mo)', color: 'green' },
        { type: 'flag', label: 'Red Flag', value: 'Applicant mentions "left previous rental early" — verify if eviction or voluntary. Ask for landlord contact.', color: 'yellow' },
        { type: 'rec', label: 'Recommendation', value: 'Approve with Conditions — require 1.5x security deposit pending reference verification', color: 'violet' },
      ],
    },
  },
  {
    icon: RefreshCw,
    title: 'Lease Renewal Workflow',
    description: 'See every lease expiring in the next 90 days. Generate AI-drafted renewal offers with market analysis and suggested rent increases — before the lease slips past.',
    bullets: [
      '90-day expiration view with urgency tiers (30/60/90 days)',
      'AI renewal offer letters with market rent analysis',
      'Renew, increase, or non-renew decision support',
      'Full lease analysis on any uploaded renewal lease',
    ],
    demo: {
      label: 'Renewal Offer Summary',
      content: [
        { type: 'expiry', label: 'Expiring in 34 days', value: 'Marcus T. — Unit 4B, $1,800/mo — Maple Court', color: 'orange' },
        { type: 'suggest', label: 'Market Suggestion', value: 'Suggest $1,890/mo (+5%) — comparable units in Austin renting at $1,900–$1,950 as of Q1', color: 'violet' },
        { type: 'letter', label: 'Offer Letter', value: 'Dear Marcus, We are pleased to offer you a lease renewal for Unit 4B at $1,890/mo...', color: 'green' },
      ],
    },
  },
  {
    icon: DollarSign,
    title: 'Rent Increase Notices',
    description: 'Generate legally compliant rent increase notices for any state. Correct notice periods, proper legal language, and mailing instructions — in under a minute.',
    bullets: [
      'State-required notice periods (CA 90-day rule, NY tiered notice, etc.)',
      'Correct legal language per jurisdiction with statute citations',
      'Mailing and delivery instructions to ensure valid service',
      'Covers all 50 states including rent control cities',
    ],
    demo: {
      label: 'Rent Increase Notice (CA)',
      content: [
        { type: 'increase', label: 'Increase Details', value: '$2,200 → $2,420/mo (+10%) — triggers CA 90-day rule', color: 'yellow' },
        { type: 'law', label: 'CA Law Citation', value: 'California Civil Code § 827 — 90 days written notice required for increases >10%', color: 'violet' },
        { type: 'mail', label: 'Mailing Instructions', value: 'Send via USPS Certified Mail + First Class. Retain return receipt for your file.', color: 'green' },
      ],
    },
  },
  {
    icon: ClipboardList,
    title: 'Move-In / Move-Out Checklists',
    description: 'Generate room-by-room inspection checklists with state-specific security deposit rules and photo documentation requirements — never lose a deposit dispute again.',
    bullets: [
      'Room-by-room inspection items with specific documentation guidance',
      'Photo requirements called out item-by-item',
      'State-specific security deposit return deadlines and rules',
      'Tenant signature fields and normal wear-and-tear examples',
    ],
    demo: {
      label: 'Checklist Output (TX)',
      content: [
        { type: 'room', label: 'Living Room', value: 'Carpet condition (photo req.) · Paint/walls · Window seals · Outlets/switches · Ceiling fan', color: 'slate' },
        { type: 'rule', label: 'TX Deposit Rule', value: 'Return within 30 days with itemized deductions. Tex. Prop. Code § 92.103.', color: 'violet' },
        { type: 'sig', label: 'Signature Fields', value: 'Tenant acknowledges unit condition at move-in / Landlord signature with date', color: 'green' },
      ],
    },
  },
]

const TESTIMONIALS = [
  {
    name: 'Sandra M.',
    title: 'Owner, 87 units across 4 properties',
    location: 'Phoenix, AZ',
    quote: 'I used to spend my Sunday nights writing tenant emails. Now I paste their message into PropertyMind, pick a tone, and send. What used to take me 25 minutes takes 45 seconds.',
    stat: '22 hours/month saved',
  },
  {
    name: 'Derek T.',
    title: 'Independent landlord, 34 units',
    location: 'Atlanta, GA',
    quote: 'The lease analysis caught a missing penalty clause that would have cost me $6,000 when my tenant walked early. It paid for 3 years of the software in one catch.',
    stat: '$6,000 prevented',
  },
  {
    name: 'Rachel K.',
    title: 'Property manager, 120 units',
    location: 'Austin, TX',
    quote: "My vendors actually get work orders now instead of voice mails. The AI writes them properly — problem description, access info, priority — everything they need. Response time dropped by half.",
    stat: '50% faster maintenance resolution',
  },
  {
    name: 'David R.',
    title: 'Independent landlord, 14 units across 3 cities',
    location: 'Austin, TX',
    quote: "I own 14 units across 3 cities. PropertyMind flagged a lease clause that would have made me liable for $8,000 in HVAC repairs I legally didn't owe. One catch paid for 4 years of the service.",
    stat: '$8,000 liability avoided',
  },
  {
    name: 'Linda M.',
    title: 'Landlord',
    location: 'Los Angeles, CA',
    quote: "My tenant in California tried to withhold rent citing habitability. PropertyMind's work order system had documented every repair with timestamped vendor notes. Case dismissed.",
    stat: 'Dispute resolved',
  },
  {
    name: 'James T.',
    title: 'Landlord, 6 units',
    location: 'New York, NY',
    quote: "The rent increase notice generator alone is worth it. I manage 6 units in New York. One mistake on notice period and I lose 90 days of legal standing.",
    stat: '90 days of standing protected',
  },
]

const PRICING = [
  {
    name: 'Starter',
    price: '$149',
    period: '/month',
    units: 'Up to 50 units',
    features: [
      'Lease analysis & risk scoring',
      'AI tenant communication',
      'Maintenance work order generation',
      'Renewal tracking & alerts',
      'Vendor directory',
      'Email support',
    ],
    cta: 'Start free trial',
    highlight: false,
  },
  {
    name: 'Growth',
    price: '$299',
    period: '/month',
    units: 'Up to 200 units',
    features: [
      'Everything in Starter',
      'Bulk lease upload & analysis',
      'Custom response templates',
      'Advanced maintenance tracking',
      'Vendor ratings & history',
      'Priority email support',
    ],
    cta: 'Start free trial',
    highlight: true,
    badge: 'Most Popular',
  },
  {
    name: 'Portfolio',
    price: '$499',
    period: '/month',
    units: 'Unlimited units',
    features: [
      'Everything in Growth',
      'Multi-portfolio management',
      'Team member access',
      'API access',
      'Custom integrations',
      'Dedicated account manager',
    ],
    cta: 'Contact sales',
    highlight: false,
  },
]

const FAQ = [
  {
    q: 'Does the AI actually work, or is it generic?',
    a: 'Every analysis and response is generated fresh using your specific tenant data, lease terms, and property context. It\'s not templates — it\'s Claude, the same AI used by Fortune 500 legal teams, applied to your specific situation.',
  },
  {
    q: 'Is my tenant and lease data secure?',
    a: 'Yes. All data is encrypted at rest and in transit. We use Supabase with row-level security — your data is completely isolated from other users. We never train AI models on your data.',
  },
  {
    q: 'What counts as a "unit"?',
    a: 'Any rentable space — apartment, house, condo, commercial unit. Vacant units count toward your limit.',
  },
  {
    q: 'Can I import my existing leases?',
    a: 'Yes. You can paste lease text directly into the analyzer, or upload PDF/Word documents. Analysis takes 20–40 seconds.',
  },
  {
    q: 'Do I need to be a lawyer to use the lease analysis?',
    a: 'No. PropertyMind explains every flagged clause in plain English and tells you specifically what to do about it. For serious issues, it will recommend consulting an attorney.',
  },
  {
    q: 'Does this work with my existing property management software?',
    a: 'PropertyMind is designed to work alongside — not replace — tools like AppFolio, Buildium, Rent Manager, and Yardi. You copy lease text or tenant messages into PropertyMind, get the AI output, and paste it back. No integration required. Most users run it in a browser tab next to their existing software.',
  },
  {
    q: 'Does the lease analysis know about tenant-protection laws in my state?',
    a: 'Yes. When you provide your state during setup, the AI adjusts its analysis for local regulations. Tenant responses flag jurisdiction-specific risks — for example, California\'s strict security deposit return timelines, New York\'s warranty of habitability standards, and Texas\'s landlord-favorable entry notice rules. The system currently covers all 50 states.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes — 14 days free, no credit card required. You get access to all features so you can see real value before committing.',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Nav */}
      <nav className="border-b border-slate-800/50 backdrop-blur-sm sticky top-0 z-50 bg-slate-950/90">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-white text-lg tracking-tight">PropertyMind</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <Link href="/guides/landlord-lease-clauses" className="hover:text-white transition-colors">Guides</Link>
            <Link href="/state-laws" className="hover:text-white transition-colors">State Laws</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-slate-400 hover:text-white transition-colors">
              Sign in
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Start free trial
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-violet-600/10 border border-violet-500/20 rounded-full text-violet-400 text-xs font-medium mb-8">
          <Sparkles className="w-3 h-3" />
          AI-powered property management
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
          Stop losing Sundays
          <br />
          <span className="text-violet-400">to tenant emails.</span>
        </h1>

        <p className="text-xl text-slate-400 mb-4 max-w-2xl mx-auto leading-relaxed">
          Property managers with 10–200 units reclaim an average of 8.3 hours every week — lease analysis, tenant responses, and work orders handled by AI in under a minute each.
        </p>
        <p className="text-slate-500 text-base mb-10 max-w-xl mx-auto">
          Lease risk analysis in 30 seconds. Professional tenant responses in 45 seconds. Vendor-ready work orders in one click.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            href="/onboard"
            className="px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl text-lg transition-all duration-200 shadow-lg shadow-violet-600/20 flex items-center justify-center gap-2"
          >
            Start 14-day free trial
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="#features"
            className="px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-medium rounded-xl text-lg transition-all flex items-center justify-center"
          >
            See how it works
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-xl mx-auto">
          {[
            { label: 'Hours saved per week, avg.', value: '8.3' },
            { label: 'Avg. units managed per user', value: '67' },
            { label: 'Managers using PropertyMind', value: '1,200+' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-slate-500 leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pain */}
      <section className="bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: 'Drowning in email',
                description: 'The average property manager handles 40+ tenant messages per week — each one requiring a thoughtful, legally appropriate response.',
              },
              {
                icon: AlertTriangle,
                title: 'Lease blindspots',
                description: 'The average lease has 3–5 clauses that expose the landlord to financial loss. Missing penalty clauses, auto-renewal traps, and ambiguous maintenance language cost managers an average of $4,200 per incident.',
              },
              {
                icon: Wrench,
                title: 'Maintenance chaos',
                description: 'Verbal requests, lost voicemails, no documentation. Vendors show up unprepared. Tenants escalate. You spend more time managing the manager.',
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                  <item.icon className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Everything you need to manage smarter</h2>
          <p className="text-slate-400 text-lg">Built specifically for independent managers with 5–200 units.</p>
        </div>

        <div className="space-y-24">
          {FEATURES.map((feature, i) => (
            <div key={feature.title} className="grid md:grid-cols-2 gap-12 items-start">
              <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-violet-600/10 border border-violet-500/20 rounded-xl flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-violet-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                </div>
                <p className="text-slate-400 mb-6 leading-relaxed">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`bg-slate-900 border border-slate-800 rounded-2xl p-5 ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                  </div>
                  <span className="text-xs text-slate-500 ml-1">{feature.demo.label}</span>
                </div>
                <div className="space-y-3">
                  {feature.demo.content.map((item, j) => (
                    <div
                      key={j}
                      className={`p-3 rounded-lg border text-sm ${
                        item.color === 'red' ? 'bg-red-500/5 border-red-500/20' :
                        item.color === 'yellow' ? 'bg-yellow-500/5 border-yellow-500/20' :
                        item.color === 'green' ? 'bg-green-500/5 border-green-500/20' :
                        item.color === 'violet' ? 'bg-violet-500/5 border-violet-500/20' :
                        item.color === 'orange' ? 'bg-orange-500/5 border-orange-500/20' :
                        'bg-slate-800/50 border-slate-700'
                      }`}
                    >
                      <p className={`text-xs font-medium mb-1 ${
                        item.color === 'red' ? 'text-red-400' :
                        item.color === 'yellow' ? 'text-yellow-400' :
                        item.color === 'green' ? 'text-green-400' :
                        item.color === 'violet' ? 'text-violet-400' :
                        item.color === 'orange' ? 'text-orange-400' :
                        'text-slate-400'
                      }`}>
                        {item.label}
                      </p>
                      <p className="text-slate-300 text-xs leading-relaxed whitespace-pre-line">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio Dashboard Preview */}
      <section className="bg-slate-900/50 border-y border-slate-800 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">See your portfolio at a glance</h2>
            <p className="text-slate-400 text-lg">One dashboard for every property, every tenant, every alert — nothing slips through.</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* Dashboard header bar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-950/60">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 bg-violet-600 rounded-md flex items-center justify-center">
                  <Zap className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm font-semibold text-white">PropertyMind</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span>3 properties</span>
                <span>·</span>
                <span>47 units</span>
                <span>·</span>
                <span className="text-yellow-400 font-medium">2 alerts</span>
              </div>
            </div>

            {/* Portfolio table */}
            <div className="divide-y divide-slate-800">
              {/* Header row */}
              <div className="grid grid-cols-5 gap-4 px-5 py-2.5 text-xs font-medium text-slate-500 uppercase tracking-wider">
                <span className="col-span-2">Property</span>
                <span className="text-center">Units</span>
                <span className="text-center">Occupancy</span>
                <span>Last Action / Alert</span>
              </div>

              {/* Property 1 — lease expiry alert */}
              <div className="grid grid-cols-5 gap-4 px-5 py-4 items-center bg-yellow-500/3 hover:bg-slate-800/30 transition-colors">
                <div className="col-span-2 flex items-center gap-3">
                  <div className="w-8 h-8 bg-violet-600/10 border border-violet-500/20 rounded-lg flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Maple Court Apartments</p>
                    <p className="text-xs text-slate-500">2847 Maple Ave, Austin, TX</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-white">24</p>
                  <p className="text-xs text-slate-500">units</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-green-400">96%</p>
                  <p className="text-xs text-slate-500">23 occupied</p>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-2.5 py-1.5">
                    <Clock className="w-3 h-3 shrink-0" />
                    Lease expires in 14 days — renewal analysis ready
                  </div>
                </div>
              </div>

              {/* Property 2 — maintenance alert */}
              <div className="grid grid-cols-5 gap-4 px-5 py-4 items-center bg-red-500/3 hover:bg-slate-800/30 transition-colors">
                <div className="col-span-2 flex items-center gap-3">
                  <div className="w-8 h-8 bg-violet-600/10 border border-violet-500/20 rounded-lg flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Riverside Townhomes</p>
                    <p className="text-xs text-slate-500">1140 River Rd, Nashville, TN</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-white">14</p>
                  <p className="text-xs text-slate-500">units</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-yellow-400">86%</p>
                  <p className="text-xs text-slate-500">12 occupied</p>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-2.5 py-1.5">
                    <Wrench className="w-3 h-3 shrink-0" />
                    Maintenance request #47 — 3 days unresolved
                  </div>
                </div>
              </div>

              {/* Property 3 — all clear */}
              <div className="grid grid-cols-5 gap-4 px-5 py-4 items-center hover:bg-slate-800/30 transition-colors">
                <div className="col-span-2 flex items-center gap-3">
                  <div className="w-8 h-8 bg-violet-600/10 border border-violet-500/20 rounded-lg flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Clearview Condos</p>
                    <p className="text-xs text-slate-500">509 Oak Street, Denver, CO</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-white">9</p>
                  <p className="text-xs text-slate-500">units</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-green-400">100%</p>
                  <p className="text-xs text-slate-500">9 occupied</p>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <CheckCircle className="w-3 h-3 text-green-400 shrink-0" />
                    All clear — last action 2 days ago
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard footer */}
            <div className="px-5 py-3.5 border-t border-slate-800 bg-slate-950/40 flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1.5"><Users className="w-3 h-3" /> 47 total units</span>
                <span className="flex items-center gap-1.5"><TrendingUp className="w-3 h-3 text-green-400" /> 93% portfolio occupancy</span>
              </div>
              <span className="text-xs text-violet-400">Updated just now</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-900/50 border-y border-slate-800 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Property managers using PropertyMind reclaim an average of 8 hours per week</h2>
            <p className="text-slate-400">Here is what that means in practice.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-5 italic">&quot;{t.quote}&quot;</p>
                <div className="border-t border-slate-800 pt-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white text-sm">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.title}</p>
                    <p className="text-xs text-slate-600">{t.location}</p>
                  </div>
                  <div className="text-xs font-medium text-violet-400 bg-violet-600/10 border border-violet-500/20 px-2 py-1 rounded-md text-right">
                    {t.stat}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Pricing that pays for itself</h2>
          <p className="text-slate-400 mb-2">Starter is $149/month — that is $1,788/year.</p>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            The average prevented lease dispute saves $4,200. One catch pays for 2+ years. Most users hit positive ROI in their first week.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {PRICING.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border p-6 relative ${
                plan.highlight ? 'bg-violet-600/5 border-violet-500/40' : 'bg-slate-900 border-slate-800'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 bg-violet-600 text-white text-xs font-semibold rounded-full">{plan.badge}</span>
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-slate-400 mb-4">{plan.units}</p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-slate-400 mb-1">{plan.period}</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/login"
                className={`block w-full text-center py-3 rounded-xl font-medium text-sm transition-all ${
                  plan.highlight
                    ? 'bg-violet-600 hover:bg-violet-500 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-slate-500 mt-6">
          All plans include 14-day free trial · No credit card required · Cancel anytime
        </p>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-slate-900/50 border-t border-slate-800 py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Questions</h2>
          <div className="space-y-6">
            {FAQ.map((item) => (
              <div key={item.q} className="border-b border-slate-800 pb-6 last:border-b-0">
                <h3 className="font-semibold text-white mb-2 flex items-start gap-2">
                  <Shield className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
                  {item.q}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed pl-6">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="bg-violet-600/5 border border-violet-500/20 rounded-3xl p-12">
          <TrendingUp className="w-12 h-12 text-violet-400 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-4">8 fewer hours of work starts this week</h2>
          <p className="text-slate-400 mb-8 text-lg max-w-xl mx-auto">
            Try PropertyMind free for 14 days. No credit card. No contracts. Cancel anytime.
          </p>
          <Link
            href="/onboard"
            className="inline-flex items-center gap-2 px-10 py-4 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl text-lg transition-all shadow-lg shadow-violet-600/20"
          >
            Start your free trial
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-6 h-6 bg-violet-600 rounded-md flex items-center justify-center">
                  <Zap className="w-3 h-3 text-white" />
                </div>
                <span className="font-medium text-slate-300 text-sm">PropertyMind</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">AI-powered property management for independent landlords and property managers.</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Product</p>
              <div className="space-y-2">
                <a href="#features" className="block text-xs text-slate-600 hover:text-slate-400 transition-colors">Features</a>
                <a href="#pricing" className="block text-xs text-slate-600 hover:text-slate-400 transition-colors">Pricing</a>
                <Link href="/login" className="block text-xs text-slate-600 hover:text-slate-400 transition-colors">Sign in</Link>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Landlord Guides</p>
              <div className="space-y-2">
                <Link href="/guides/landlord-lease-clauses" className="block text-xs text-slate-600 hover:text-slate-400 transition-colors">15 Must-Have Lease Clauses</Link>
                <Link href="/guides/rent-increase-notice-by-state" className="block text-xs text-slate-600 hover:text-slate-400 transition-colors">Rent Increase Notice by State</Link>
                <Link href="/guides/tenant-screening-checklist" className="block text-xs text-slate-600 hover:text-slate-400 transition-colors">Tenant Screening Checklist</Link>
                <Link href="/state-laws" className="block text-xs text-slate-600 hover:text-slate-400 transition-colors">State Law Quick Reference</Link>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Legal</p>
              <div className="space-y-2">
                <a href="#" className="block text-xs text-slate-600 hover:text-slate-400 transition-colors">Privacy Policy</a>
                <a href="#" className="block text-xs text-slate-600 hover:text-slate-400 transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-600">© 2026 PropertyMind. All rights reserved.</p>
            <p className="text-xs text-slate-700">Not legal advice. Always consult a qualified attorney for your jurisdiction.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
