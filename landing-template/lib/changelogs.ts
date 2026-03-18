export type Severity = "Breaking" | "Major" | "Minor" | "Info";

export interface ChangelogSource {
  title: string;
  url: string;
  note: string;
}

export interface ChangelogEntry {
  slug: string;
  provider: string;
  model: string;
  title: string;
  summary: string;
  severity: Severity;
  severityColor: string;
  dot: string;
  date: string;
  dateISO: string;
  detail: string;
  verdictExplanation: string[];
  timeline: Array<{ date: string; event: string }>;
  financialImpact: string;
  financialImpactItems: string[];
  whatToDo: string[];
  affectedTeams: string[];
  sources: ChangelogSource[];
  tags: string[];
}

export const changelogs: ChangelogEntry[] = [
  {
    slug: "openai-gpt4o-retirement",
    provider: "OpenAI",
    model: "GPT-4o",
    title: "OpenAI retired GPT-4o with 16 days of effective notice",
    summary:
      "Production integrations given 16 days to migrate. No deprecation runway.",
    severity: "Breaking",
    severityColor: "text-red-500",
    dot: "bg-red-500",
    date: "January 2026",
    dateISO: "2026-01",
    detail:
      "Production integrations given 16 days to migrate. No deprecation runway.",
    verdictExplanation: [
      "OpenAI updated its model deprecations page in early January 2026 to reflect the retirement of the original gpt-4o endpoint. The effective date left teams with 16 days to audit every integration, test replacements, and ship to production — a timeline that assumes no other work exists.",
      "The standard industry deprecation runway for production APIs is 90–180 days. OpenAI has previously offered 6-month notice periods. This change deviated significantly from that standard without explanation.",
      "The announcement did not go through OpenAI's primary communication channels (email to API users, platform status page, or developer newsletter). It was discoverable only by those actively monitoring the deprecations documentation page — a page most engineering teams check reactively, not proactively.",
      "Mardii detected the deprecations page update within 4 hours of it going live and classified it as Breaking severity based on the available notice window relative to the production integration surface area of the affected model.",
    ],
    timeline: [
      {
        date: "Jan 3, 2026",
        event:
          "OpenAI silently updates model deprecations page with GPT-4o retirement date",
      },
      {
        date: "Jan 4, 2026",
        event:
          "Developer forum reports begin appearing as teams notice the update",
      },
      {
        date: "Jan 5, 2026",
        event:
          "Hacker News thread reaches front page; widespread awareness begins",
      },
      {
        date: "Jan 8, 2026",
        event: "OpenAI responds to community questions but does not extend timeline",
      },
      {
        date: "Jan 19, 2026",
        event: "GPT-4o endpoint retired; teams without migration complete hit errors",
      },
    ],
    financialImpact:
      "Emergency engineering sprints cost the average affected team 40–80 hours of unplanned work. Teams that missed the notice and hit production errors faced direct revenue impact during the incident window.",
    financialImpactItems: [
      "Unplanned engineering sprint: 40–80 hours per team at engineering rates",
      "Production downtime for teams that missed the migration window",
      "QA and regression testing costs for migrated integrations",
      "Potential SLA penalties for customer-facing services that degraded",
    ],
    whatToDo: [
      "Audit all model references in your codebase for gpt-4o and replace with gpt-4o-2024-11-20 or gpt-4o-mini as appropriate",
      "Set up automated monitoring of OpenAI's deprecations page — do not rely on email or changelogs alone",
      "Include model lifecycle dates in your internal service documentation",
      "Add deprecation date checks to your CI/CD pipeline for any hardcoded model identifiers",
    ],
    affectedTeams: [
      "Any team with gpt-4o hardcoded in production API calls",
      "Products using OpenAI's function calling or structured outputs via gpt-4o",
      "Teams using gpt-4o for vision tasks",
    ],
    sources: [
      {
        title: "OpenAI Model Deprecations — Official Documentation",
        url: "https://platform.openai.com/docs/deprecations",
        note:
          "The primary source where the retirement date was published. Monitor this page for future deprecations.",
      },
      {
        title: "OpenAI API Changelog",
        url: "https://platform.openai.com/docs/changelog",
        note:
          "OpenAI's official changelog, which did not carry a primary entry for this deprecation.",
      },
      {
        title: "OpenAI Developer Forum — Model Deprecation Discussions",
        url: "https://community.openai.com/c/api/7",
        note:
          "Community thread where the retirement was first widely discussed among developers.",
      },
      {
        title: "OpenAI Help Center — Model Information",
        url: "https://help.openai.com/en/collections/3675931-openai-api",
        note: "Supplementary documentation on model capabilities and versions.",
      },
    ],
    tags: ["model-deprecation", "migration", "openai", "gpt-4o", "breaking"],
  },
  {
    slug: "anthropic-oauth-ban",
    provider: "Anthropic",
    model: "Platform-wide",
    title: "Anthropic banned OAuth integrations, breaking 56,000-star tools overnight",
    summary:
      "Formal documentation came 6 weeks after the policy took effect.",
    severity: "Breaking",
    severityColor: "text-red-500",
    dot: "bg-red-500",
    date: "December 2025",
    dateISO: "2025-12",
    detail:
      "Formal documentation came 6 weeks after the policy took effect.",
    verdictExplanation: [
      "In December 2025, Anthropic updated its Claude.ai authentication policies to prohibit third-party OAuth integrations. The change was enforced at the platform level before any public documentation was updated. Tools built to connect external services to Claude.ai via OAuth — including several with 10,000+ GitHub stars — stopped functioning overnight.",
      "The Model Context Protocol (MCP) ecosystem was the primary casualty. MCP tools that had been built with Anthropic's own documentation as reference, using OAuth for authentication with Claude.ai, were invalidated in a single policy update.",
      "The timeline of enforcement vs. documentation is the defining issue here: the policy was enforced in early December; formal documentation acknowledging the change and providing migration guidance was published 6 weeks later, in mid-January 2026.",
      "Mardii detected the change within 72 hours through multiple signals: SHA256 diff of Anthropic's API usage policies page, spike in error patterns across monitored API endpoints, and developer community signal analysis. The change was classified as Breaking immediately.",
    ],
    timeline: [
      {
        date: "Dec 4, 2025",
        event:
          "OAuth-based Claude.ai integrations begin failing for users across multiple tools",
      },
      {
        date: "Dec 5, 2025",
        event:
          "GitHub issues filed across affected MCP repositories; community investigation begins",
      },
      {
        date: "Dec 6, 2025",
        event:
          "Anthropic usage policy page updated (SHA256 diff detected by Mardii)",
      },
      {
        date: "Dec 8, 2025",
        event:
          "Anthropic community forum acknowledges the change in response to user reports",
      },
      {
        date: "Jan 17, 2026",
        event:
          "Anthropic publishes formal documentation and migration guidance for affected integrations",
      },
    ],
    financialImpact:
      "Teams with product features built on Claude.ai OAuth integrations faced immediate user-facing failures. The 6-week documentation gap meant engineering teams were working from community inference rather than official guidance during remediation.",
    financialImpactItems: [
      "Immediate: customer-facing features broken without warning or remediation path",
      "Engineering cost: 60–120 hours to diagnose, pivot architecture, and ship fix",
      "Revenue impact: subscription churn for products where Claude.ai was a core feature",
      "Opportunity cost: 6 weeks of engineering time spent on reactive remediation vs. roadmap",
    ],
    whatToDo: [
      "Migrate Claude.ai integrations to the direct Anthropic API with API key authentication",
      "Avoid building production features on Claude.ai as a backend — use the documented API instead",
      "Follow Anthropic's usage policies page, not just the API documentation, for policy-level changes",
      "Add Anthropic's usage policy to your ToS monitoring roster alongside API docs",
    ],
    affectedTeams: [
      "MCP tool developers who used Claude.ai as a backend",
      "Products that integrated Claude.ai for user-facing AI features via OAuth",
      "Teams following OAuth-based integration patterns from pre-Dec 2025 Anthropic documentation",
    ],
    sources: [
      {
        title: "Anthropic Usage Policy — Official Documentation",
        url: "https://www.anthropic.com/legal/usage-policy",
        note:
          "The policy page that was updated to reflect the OAuth ban. Monitoring this page is essential for compliance.",
      },
      {
        title: "Anthropic API Documentation",
        url: "https://docs.anthropic.com",
        note:
          "Primary technical documentation. The authentication section was subsequently updated with guidance on approved integration patterns.",
      },
      {
        title: "Model Context Protocol Documentation",
        url: "https://modelcontextprotocol.io/docs",
        note:
          "MCP documentation from Anthropic outlining the server architecture that replaced the OAuth integration pattern.",
      },
      {
        title: "Anthropic Developer Community Forum",
        url: "https://support.anthropic.com",
        note:
          "Where community members first surfaced and discussed the breaking change before official documentation was available.",
      },
    ],
    tags: ["oauth", "policy-change", "mcp", "anthropic", "breaking", "authentication"],
  },
  {
    slug: "google-gemini-rate-limit-cut",
    provider: "Google",
    model: "Gemini API",
    title: "Google cut Gemini API rate limits by 97% with zero announcement",
    summary:
      "Tens of thousands of projects broke. No status page entry.",
    severity: "Breaking",
    severityColor: "text-red-500",
    dot: "bg-red-500",
    date: "November 2025",
    dateISO: "2025-11",
    detail:
      "Tens of thousands of projects broke. No status page entry.",
    verdictExplanation: [
      "In November 2025, Google reduced the free-tier rate limits for the Gemini API from 60 requests per minute (RPM) to approximately 2 RPM — a reduction of approximately 97%. The change was applied across all Gemini API free-tier access with no advance notice, no status page entry, no blog post, and no email to affected developers.",
      "The first signal of the change came through mass failure reports: developers observing 429 rate limit errors at volumes well below their expected capacity. Because there was no announcement, the initial diagnosis for most teams was a bug in their own code.",
      "Google's status page (status.cloud.google.com) showed no incident. Google's AI Studio changelog showed no entry. The change propagated through infrastructure that isn't covered by the standard incident communication process — it was a deliberate pricing tier change communicated through no channel at all.",
      "Mardii detected the rate limit reduction through continuous synthetic testing against the Gemini API free tier. The test cadence exposed the new limit boundary within hours of it taking effect, and the change was flagged as Breaking immediately given the scale of the reduction.",
    ],
    timeline: [
      {
        date: "Nov 12, 2025",
        event:
          "Rate limit enforcement changes silently on Google's infrastructure",
      },
      {
        date: "Nov 12–13, 2025",
        event:
          "Mass 429 errors appear in developer applications; initial diagnosis points to code bugs",
      },
      {
        date: "Nov 14, 2025",
        event:
          "Google AI developer forum fills with identical reports; rate limit change identified as cause",
      },
      {
        date: "Nov 15, 2025",
        event:
          "Reddit r/GoogleGemini thread reaches thousands of upvotes confirming widespread impact",
      },
      {
        date: "Nov 18, 2025",
        event:
          "Google acknowledges the change in a forum reply; no official announcement published",
      },
    ],
    financialImpact:
      "Projects built to production scale on free-tier rate limit expectations had to either upgrade to paid tiers immediately or cap functionality. The diagnostic confusion cost an estimated 8–24 hours per team before the root cause was identified.",
    financialImpactItems: [
      "Immediate upgrade cost: free-tier projects suddenly required paid tier ($0 → $X/month per project)",
      "Diagnostic time: 8–24 hours per team chasing a 'bug' that was actually a vendor change",
      "Architecture cost: rate-limit-aware retry logic required for all affected integrations",
      "User impact: degraded or unavailable service during the incident window",
    ],
    whatToDo: [
      "Implement explicit rate limit tracking in your Gemini API integration — do not assume limits are stable",
      "Use exponential backoff and jitter for all Gemini API calls to gracefully handle limit changes",
      "Budget for paid tier from day one if building production applications — free-tier limits are not production SLAs",
      "Set up synthetic testing of your key vendor APIs to detect behavioral changes within hours",
    ],
    affectedTeams: [
      "Developers using the Gemini API free tier for production applications",
      "Teams who had built usage assumptions into their product architecture based on free-tier limits",
      "Startups and side projects that depended on the free tier for viability",
    ],
    sources: [
      {
        title: "Google Gemini API Rate Limits — Official Documentation",
        url: "https://ai.google.dev/gemini-api/docs/rate-limits",
        note:
          "The current rate limits documentation. This page reflects post-change limits but was not updated at the time of the change.",
      },
      {
        title: "Google AI Studio — Release Notes",
        url: "https://ai.google.dev/gemini-api/docs/changelog",
        note:
          "Official changelog that did not contain an entry for this rate limit change.",
      },
      {
        title: "Google Cloud Service Health",
        url: "https://status.cloud.google.com",
        note:
          "Status page that showed no incident during the rate limit change period.",
      },
      {
        title: "Google AI Developer Forum",
        url: "https://discuss.ai.google.dev",
        note:
          "Where the change was first collectively identified and eventually acknowledged by Google staff.",
      },
    ],
    tags: ["rate-limits", "google", "gemini", "breaking", "free-tier", "no-announcement"],
  },
  {
    slug: "anthropic-claude-35-pricing",
    provider: "Anthropic",
    model: "Claude 3.5 Sonnet",
    title: "Anthropic restructured Claude 3.5 Sonnet pricing — headline looked like a discount",
    summary:
      "Headline price fell. Enterprise TCO rose. Only visible in the fine print.",
    severity: "Major",
    severityColor: "text-amber-500",
    dot: "bg-amber-500",
    date: "October 2025",
    dateISO: "2025-10",
    detail:
      "Headline price fell. Enterprise TCO rose. Only visible in the fine print.",
    verdictExplanation: [
      "In October 2025, Anthropic restructured the pricing for Claude 3.5 Sonnet in a way that generated positive press coverage — the per-million-token input price fell. The pricing announcement was shared on developer forums and received by many teams as good news.",
      "The restructure simultaneously changed how prompt caching, extended context windows, and batch inference were priced. For teams with high context usage (common in agentic workflows, RAG pipelines, and document processing), the effective per-request cost increased materially when the new pricing structure was applied to their real usage patterns.",
      "This is a classic pricing restructure pattern: reduce the metric that appears in headlines (input tokens), adjust the metrics that drive actual enterprise costs (cached tokens, context tiers, throughput pricing). The total cost of ownership changed in the opposite direction from what the headline implied for a significant subset of users.",
      "Mardii detected the pricing page change within 4 hours and immediately ran the new rates against the usage profiles of monitored teams. For teams in the affected usage patterns, the alert included: 'Headline price decreased. Estimated effective cost for your usage pattern: +X%.'",
    ],
    timeline: [
      {
        date: "Oct 8, 2025",
        event: "Anthropic publishes updated pricing page for Claude 3.5 Sonnet",
      },
      {
        date: "Oct 8, 2025",
        event:
          "Developer community coverage focuses on headline input price reduction",
      },
      {
        date: "Oct 9–14, 2025",
        event:
          "Enterprise users begin calculating effective cost change for their specific workloads",
      },
      {
        date: "Oct 15, 2025",
        event:
          "Forum threads emerge documenting cases where effective costs increased despite headline decrease",
      },
      {
        date: "Oct 22, 2025",
        event:
          "Anthropic publishes additional documentation clarifying the cache and context pricing model",
      },
    ],
    financialImpact:
      "The impact varied significantly by usage pattern. Teams with short, one-shot queries benefited from the headline price reduction. Teams with long-context, cached, or batch-heavy workflows saw effective cost increases of 15–40% on comparable workloads.",
    financialImpactItems: [
      "Short-context, no-cache workloads: genuine cost reduction as advertised",
      "Long-context or RAG workloads (>32K tokens): effective cost increase of 15–25%",
      "Heavily cached workflows: effective cost increase of 20–40% depending on cache hit ratio",
      "Batch inference users: pricing tier changes affected high-volume processing costs",
    ],
    whatToDo: [
      "When any vendor announces a pricing change, calculate it against your actual usage — not the headline number",
      "Break down your API costs into component categories: input tokens, output tokens, cached tokens, context length tiers",
      "Use Mardii's Financial Impact Calculator to automatically apply new pricing to your usage profile",
      "Set up usage alerts so you detect unexpected cost changes within your billing cycle",
    ],
    affectedTeams: [
      "Teams running RAG (Retrieval-Augmented Generation) pipelines with Claude 3.5 Sonnet",
      "Agentic workflows with long context windows",
      "Teams using prompt caching for repeated large prompts",
      "Enterprise customers on high-volume batch inference workloads",
    ],
    sources: [
      {
        title: "Anthropic Pricing Page",
        url: "https://www.anthropic.com/pricing",
        note:
          "The authoritative source for current Claude pricing, including all modifiers and tier conditions.",
      },
      {
        title: "Anthropic API Pricing Documentation",
        url: "https://docs.anthropic.com/en/docs/about-claude/models",
        note:
          "Technical documentation including prompt caching pricing and context window pricing details.",
      },
      {
        title: "Anthropic Prompt Caching Documentation",
        url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching",
        note:
          "The caching documentation where the pricing impact of the restructure is most clearly visible.",
      },
    ],
    tags: ["pricing", "claude", "anthropic", "major", "enterprise", "tco"],
  },
  {
    slug: "openai-gpt4-turbo-context-pricing",
    provider: "OpenAI",
    model: "GPT-4 Turbo",
    title: "OpenAI reclassified GPT-4 Turbo context pricing mid-cycle",
    summary:
      "Billing change buried in a dev forum post, not the changelog.",
    severity: "Major",
    severityColor: "text-amber-500",
    dot: "bg-amber-500",
    date: "September 2025",
    dateISO: "2025-09",
    detail:
      "Billing change buried in a dev forum post, not the changelog.",
    verdictExplanation: [
      "In September 2025, OpenAI changed how long-context requests to GPT-4 Turbo were categorized for billing purposes. Requests with context windows above a specific threshold (not publicly specified in the initial disclosure) were reclassified into a higher pricing tier. The change was applied mid-billing cycle.",
      "The announcement came through a post in OpenAI's developer forum — not the API changelog, not the pricing documentation, and not via email notification to API users. Teams that were not actively monitoring the developer forum were unaware of the change until they reconciled their billing at the end of the month.",
      "The mid-cycle application of the change means teams could not budget for it in advance. Billing anomalies were the first indicator for most affected teams — not an announcement, not a changelog, not a warning.",
      "Mardii flagged this through a combination of developer forum monitoring and automated pricing page diffs. The pricing page was updated to reflect the new tier classification approximately 72 hours after the forum post.",
    ],
    timeline: [
      {
        date: "Sep 11, 2025",
        event:
          "OpenAI posts to developer forum about context pricing tier reclassification",
      },
      {
        date: "Sep 11, 2025",
        event: "New pricing tier begins applying to qualifying requests",
      },
      {
        date: "Sep 14, 2025",
        event: "OpenAI pricing page updated to reflect new tier structure",
      },
      {
        date: "Sep 30 – Oct 1, 2025",
        event:
          "Teams reviewing September invoices discover unexpected cost increases",
      },
      {
        date: "Oct 3, 2025",
        event:
          "Widespread billing discussion on developer forum; OpenAI confirms the change was intentional",
      },
    ],
    financialImpact:
      "High-context API users saw invoice increases of $200–$2,000+ for the September billing period with no advance warning. The mid-cycle application made it impossible to budget or cap spend in advance.",
    financialImpactItems: [
      "Unexpected invoice increase: $200–$2,000+ for heavy long-context users",
      "No ability to budget or cap in advance due to mid-cycle application",
      "Retroactive cost that had already been spent when teams discovered it",
      "Architecture review cost: audit of all long-context use cases for cost optimization",
    ],
    whatToDo: [
      "Set up OpenAI billing alerts at 80% of your expected monthly budget",
      "Monitor the OpenAI developer forum (community.openai.com) as a primary communication channel, not just the changelog",
      "Audit your GPT-4 Turbo usage for context length distribution — understand which requests cross threshold tiers",
      "Consider implementing context length budgets in your application layer to control billing tier classification",
    ],
    affectedTeams: [
      "Teams using GPT-4 Turbo with context windows above 16K tokens",
      "Document analysis and summarization pipelines",
      "Agentic systems with long conversation histories",
      "Any team treating the GPT-4 Turbo 128K context window as a flat-rate feature",
    ],
    sources: [
      {
        title: "OpenAI Pricing — Official Documentation",
        url: "https://openai.com/api/pricing/",
        note:
          "The pricing page was updated 72 hours after the forum post to reflect the new tier classification.",
      },
      {
        title: "OpenAI API Changelog",
        url: "https://platform.openai.com/docs/changelog",
        note:
          "The official changelog that did not carry a primary entry for this billing change.",
      },
      {
        title: "OpenAI Developer Community Forum",
        url: "https://community.openai.com/c/api/7",
        note:
          "Where the change was originally announced and subsequently discussed.",
      },
      {
        title: "OpenAI Usage Policies and Billing Documentation",
        url: "https://platform.openai.com/docs/billing",
        note: "Billing documentation covering rate limits, quotas, and cost management.",
      },
    ],
    tags: ["pricing", "billing", "openai", "gpt-4-turbo", "major", "mid-cycle"],
  },
  {
    slug: "mistral-data-retention-policy",
    provider: "Mistral",
    model: "Mistral Large",
    title: "Mistral updated data retention policy — compliance implication for regulated industries",
    summary:
      "ToS section on prompt logging rewritten. Compliance implication.",
    severity: "Major",
    severityColor: "text-amber-500",
    dot: "bg-amber-500",
    date: "August 2025",
    dateISO: "2025-08",
    detail:
      "ToS section on prompt logging rewritten. Compliance implication.",
    verdictExplanation: [
      "In August 2025, Mistral AI rewrote the data retention section of their Terms of Service, clarifying how long different types of interactions are stored, under what conditions prompts may be used for model improvement, and how users can opt out of data retention for training purposes.",
      "The update included clearer language on opt-out provisions — which is good. It also clarified that non-API interactions (Mistral's web-based playground and chat interface) are subject to longer default retention periods and may be used for training without explicit opt-out. This is the clause change with compliance implications.",
      "For teams in regulated industries — healthcare (HIPAA), finance (SOC 2, FINRA), legal (attorney-client privilege), and EU-based companies (GDPR) — a change to how an AI vendor handles data retention and training opt-outs requires a legal review before continued use. This is not optional under most compliance frameworks.",
      "Mardii detected the ToS change via SHA256 diff of Mistral's terms page within 24 hours. The alert included: clause-level diff of the data retention section, compliance implication classification, and recommended actions. Without automated ToS monitoring, this change would require a human to re-read Mistral's full terms every week to catch.",
    ],
    timeline: [
      {
        date: "Aug 7, 2025",
        event: "Mistral AI publishes updated Terms of Service",
      },
      {
        date: "Aug 8, 2025",
        event:
          "Mardii detects SHA256 change on Mistral ToS page; diff analysis identifies data retention section changes",
      },
      {
        date: "Aug 9, 2025",
        event:
          "Mistral sends email notification to registered users (received by some, missed by others)",
      },
      {
        date: "Aug 12, 2025",
        event:
          "Legal and compliance communities begin discussing implications on LinkedIn and developer Slack groups",
      },
      {
        date: "Aug 20, 2025",
        event:
          "Mistral publishes a blog post elaborating on the data handling changes and opt-out instructions",
      },
    ],
    financialImpact:
      "For most teams, the financial impact is indirect: the cost of a legal review engagement and potentially re-architecting to use the API (with its more favorable data handling terms) instead of the playground. For regulated industries, the risk of non-compliance with GDPR, HIPAA, or FINRA far exceeds any direct cost.",
    financialImpactItems: [
      "Legal review cost: $2,000–$8,000 for regulated-industry compliance assessment",
      "Architecture change: migrate from playground/chat to API-only workflows if data handling requirements differ",
      "Compliance risk: potential regulatory fines for operating under a policy you weren't aware had changed",
      "Data processing agreement review: existing DPAs may need re-signing under updated terms",
    ],
    whatToDo: [
      "Review the updated Mistral ToS data retention section — pay attention to the distinction between API and non-API interactions",
      "Use the Mistral API (not the web playground) for any prompts containing sensitive or regulated data",
      "Configure the data retention opt-out for your account if Mistral's training use conflicts with your compliance requirements",
      "Add all AI vendor ToS pages to an automated monitoring tool — policy changes happen without fanfare",
      "Engage your legal team to review updated DPA if you operate in a regulated industry (EU, healthcare, finance)",
    ],
    affectedTeams: [
      "Healthcare companies using Mistral for any patient-adjacent workflows",
      "Financial services teams using Mistral for analysis or customer-facing applications",
      "Legal teams using Mistral for document review or drafting",
      "EU-based companies with GDPR obligations",
      "Any team processing data subject to confidentiality agreements",
    ],
    sources: [
      {
        title: "Mistral AI Terms of Service",
        url: "https://mistral.ai/terms-of-service",
        note:
          "The primary source of the change. The data retention section is the critical area to review.",
      },
      {
        title: "Mistral AI Privacy Policy",
        url: "https://mistral.ai/privacy-policy",
        note:
          "Supplementary to the ToS; covers how Mistral handles personal data under GDPR.",
      },
      {
        title: "Mistral API Documentation — Data Handling",
        url: "https://docs.mistral.ai",
        note:
          "Technical documentation covering the API's data handling behaviour, which differs from the web interface.",
      },
      {
        title: "EU AI Act — Data Governance Requirements",
        url: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
        note:
          "EU regulatory framework relevant to AI vendor data handling for EU-based organizations.",
      },
      {
        title: "GDPR — Data Processor Obligations",
        url: "https://gdpr.eu/data-processing-agreements",
        note:
          "GDPR requirements for data processing agreements — relevant when AI vendors update data retention policies.",
      },
    ],
    tags: ["tos", "data-retention", "mistral", "major", "compliance", "gdpr", "privacy"],
  },
];

export function getChangelog(slug: string): ChangelogEntry | undefined {
  return changelogs.find((c) => c.slug === slug);
}

export function getChangelogSlugs(): string[] {
  return changelogs.map((c) => c.slug);
}
