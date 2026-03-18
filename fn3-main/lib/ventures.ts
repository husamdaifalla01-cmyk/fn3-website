export interface Venture {
  slug: string
  name: string
  sector: string
  tagline: string
  heroDescription: string
  dotColor: string
  status: string
  problem: string
  howFN3OperatesIt: string[]
  metrics: { label: string; value: string }[]
  ctaLine: string
}

export const ventures: Venture[] = [
  {
    slug: 'subzii',
    name: 'SUBZII',
    sector: 'Event Ticketing',
    tagline: 'Live entertainment, intelligently operated.',
    heroDescription: 'AI-optimized pricing, inventory management, and demand forecasting for live entertainment. The FN3 agent layer runs operational workflows end-to-end.',
    dotColor: '#4ade80',
    status: 'Growth',
    problem: 'Live event ticketing is operationally fragile. Pricing is manual, inventory decisions are reactive, and demand signals are ignored until it\'s too late. The result: unsold inventory, underpriced seats, and lost revenue at every event.',
    howFN3OperatesIt: [
      'AI-driven demand forecasting models — predicting sell-through rates before tickets go on sale',
      'Dynamic pricing agents — adjusting price floors and ceilings in real time based on velocity and remaining inventory',
      'Inventory allocation automation — distributing across channels based on historical conversion data',
      'Operational dashboards — giving the team full visibility without manual reporting overhead',
    ],
    metrics: [
      { label: 'Operational Layer', value: 'FN3 Agents' },
      { label: 'Stage', value: 'Growth' },
      { label: 'Sector', value: 'Live Entertainment' },
    ],
    ctaLine: 'Want this kind of operational intelligence in your business?',
  },
  {
    slug: 'detailmaps',
    name: 'DETAILMAPS',
    sector: 'Auto-Care',
    tagline: 'Vehicle maintenance, connected and automated.',
    heroDescription: 'Connecting auto-care providers with customers through intelligent scheduling, route optimization, and service automation.',
    dotColor: '#60a5fa',
    status: 'Active',
    problem: 'Auto-care is a fragmented, scheduling-heavy industry where most providers lose revenue to no-shows, inefficient routing, and manual follow-up. Customer retention is low because the experience is unreliable.',
    howFN3OperatesIt: [
      'Automated appointment scheduling — customers book online, providers get optimized calendars',
      'Route optimization for mobile service providers — reducing dead miles between jobs',
      'Automated follow-up sequences — reminders, re-engagement, and review collection without staff intervention',
      'Service history agents — giving customers a single view of their vehicle\'s maintenance record',
    ],
    metrics: [
      { label: 'Operational Layer', value: 'FN3 Agents' },
      { label: 'Stage', value: 'Active' },
      { label: 'Sector', value: 'Auto-Care' },
    ],
    ctaLine: 'Bring this operational model into your service business.',
  },
  {
    slug: 'dryjets',
    name: 'DRYJETS',
    sector: 'On-Demand Services',
    tagline: 'On-demand coordination, systems-first.',
    heroDescription: 'Resource matching, real-time dispatch, and contractor management — operational complexity handled by systems, not headcount.',
    dotColor: '#fbbf24',
    status: 'Contracting',
    problem: 'On-demand service platforms collapse under operational weight. Matching, dispatch, contractor onboarding, quality control — each one is a full-time coordination problem. Most platforms solve this by hiring. FN3 solves it with systems.',
    howFN3OperatesIt: [
      'Real-time matching agents — pairing service requests with available contractors based on location, skill, and availability',
      'Automated contractor onboarding — document collection, background check coordination, and activation without manual review',
      'Dispatch optimization — routing and job assignment logic that maximizes utilization',
      'Quality control workflows — automated post-job follow-up, scoring, and issue escalation',
    ],
    metrics: [
      { label: 'Operational Layer', value: 'FN3 Agents' },
      { label: 'Stage', value: 'Contracting' },
      { label: 'Sector', value: 'On-Demand Services' },
    ],
    ctaLine: 'Building a marketplace or on-demand platform? Let\'s talk.',
  },
  {
    slug: 'dawa',
    name: 'DAWA',
    sector: 'Healthcare Infrastructure',
    tagline: 'Public sector operations, AI-first.',
    heroDescription: 'Morocco healthcare infrastructure modernization through AI-driven workflow optimization and patient coordination systems.',
    dotColor: '#a78bfa',
    status: 'Concept',
    problem: 'Public healthcare systems in emerging markets are constrained by paper workflows, disconnected data systems, and coordination overhead that consumes staff time better spent on patient care. The operational gap is the healthcare gap.',
    howFN3OperatesIt: [
      'Patient coordination automation — appointment scheduling, reminders, and routing across facilities',
      'Workflow digitization — replacing paper-based processes with structured digital workflows',
      'Interoperability layer — connecting disconnected data systems without requiring full platform replacements',
      'Operational dashboards — giving administrators real-time visibility into throughput, bottlenecks, and capacity',
    ],
    metrics: [
      { label: 'Operational Layer', value: 'FN3 Systems' },
      { label: 'Stage', value: 'Concept' },
      { label: 'Sector', value: 'Healthcare Infrastructure' },
    ],
    ctaLine: 'Working on public sector operational transformation? Reach out.',
  },
  {
    slug: 'bio',
    name: 'BIO',
    sector: 'To Be Announced',
    tagline: 'New vertical. Same operating model.',
    heroDescription: 'Early concept stage. The FN3 operating model is being applied to a new vertical. Details to follow.',
    dotColor: '#374151',
    status: 'Concept',
    problem: 'Every new FN3 venture starts with the same question: where is the operational gap that technology hasn\'t closed yet? BIO is the answer to that question in a new sector. Details will be released when the build begins.',
    howFN3OperatesIt: [
      'The FN3 agent infrastructure — deployed from day one',
      'The FN3 operating model — applied before the first hire',
      'The FN3 decision frameworks — guiding build vs. buy, staff vs. automate from the start',
    ],
    metrics: [
      { label: 'Operational Layer', value: 'FN3 Model' },
      { label: 'Stage', value: 'Concept' },
      { label: 'Sector', value: 'To Be Announced' },
    ],
    ctaLine: 'Interested in what\'s coming? Follow along.',
  },
]

export function getVentureBySlug(slug: string): Venture | undefined {
  return ventures.find((v) => v.slug === slug)
}
