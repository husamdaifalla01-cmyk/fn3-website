# FN3 Ventures — Live Status
Last updated: 2026-03-21

## LIVE SITES (verified 200 OK)

### SaaS Apps
| Venture | URL | Revenue Model | AI Key Needed | QA Version |
|---------|-----|---------------|---------------|------------|
| LexiKit | https://lexikit.vercel.app | $29-79/month | YES | v5 |
| PropertyMind | https://propertymind.vercel.app | $149-499/month | YES | v5 |
| ComplianceAI | https://compliance-ai-tau.vercel.app | $199-799/month | YES | v5 |
| InvoiceFlow | https://invoice-flow-two-blush.vercel.app | $149-499/month | YES | v5 |
| E-commerce Ops Brain | https://ecommerce-ops-brain.vercel.app | $199-399/month | YES | v5 |
| MeetingMind | https://meetingmind-acw9q8mv0-fn3s-projects.vercel.app | $49-149/month | YES | v2 |
| HRMind | (deploying) | $149-499/month | YES | building |
| GrantWriter AI | (deploying) | $99-299/month | YES | building |

### Agency / Service
| Venture | URL | Revenue Model | AI Key Needed | QA Version |
|---------|-----|---------------|---------------|------------|
| FN3 Agency | https://fn3-agency.vercel.app | $2K-5K setup + $500-1,500/mo | No | v5 |
| Agency AI OS Landing | https://landing-one-lac.vercel.app | $297-997 one-time | No | v4 |
| Agency AI OS Calculator | https://pricing-calculator-bay.vercel.app | Lead gen → Agency AI OS | No | improved |

### Content / Affiliate
| Venture | URL | Revenue Model | AI Key Needed | QA Version |
|---------|-----|---------------|---------------|------------|
| Operators Brief | https://operators-brief.vercel.app | $15-49/month newsletter | No | v6 |
| AI Tools Compass — Accountants | https://ai-for-accountants.vercel.app | Affiliate commissions | No | v3 |
| AI Tools Compass — Real Estate | https://ai-for-real-estate.vercel.app | Affiliate commissions | No | v3 |
| AI Tools Compass — Healthcare | https://ai-for-healthcare-pied.vercel.app | Affiliate commissions | No | v3 |

⚠️  All AI-powered apps need real ANTHROPIC_API_KEY set in Vercel dashboard.
Go to: vercel.com/fn3s-projects → each project → Settings → Environment Variables

## QA VERSIONS — WHAT CHANGED

### LexiKit (v5)
- Hero: "That contract has 3 traps. Find them."
- Tiers: Scout / Shield / Fortress
- 10 trap categories in Claude prompt, max_tokens 16K
- File upload (.pdf/.docx/.txt), Grade A-F badge
- Contract history dashboard, PDF export (Pro-gated)
- Grade F upgrade nudge with blurred fix preview
- Email capture → lexi_leads table
- 7 SEO guide pages: red flags, work-for-hire, non-compete, template, negotiation, client red flags, glossary
- Sitemap, BreadcrumbList JSON-LD, internal linking

### PropertyMind (v5)
- Hero: "Stop losing Sundays to tenant emails"
- 15-clause lease analysis, jurisdiction-aware (50 states)
- Tenant screening (Fair Housing compliant)
- Rent increase notice generator (state-specific notice periods)
- Lease renewal workflow (90-day expiry radar)
- Move-in/out inspection checklist
- Portfolio dashboard mockup, 3-step onboarding
- State law quick reference tool (dropdown → statutes)
- 5 SEO guides: lease clauses, rent increase by state, tenant screening, landlord-tenant laws, how to screen tenants
- Sitemap, BreadcrumbList JSON-LD

### ComplianceAI (v5)
- Hero: "Solo Practitioners & Therapists: HIPAA Without the $300/Hour Consultant"
- Practice-type customization (8 types: Solo Therapist, Group, Medical Spa, Telehealth, Dental, Chiro, Psychiatry)
- Employee training module (5 HIPAA modules + completion certificates)
- OCR Phase 2 audit simulation (20 questions)
- Vendor/BAA tracker with 3-year staleness alerts
- Breach incident response module (OCR/patient letters with CFR citations)
- 5 SEO guides: solo practice, BAA, OCR penalties, security rule checklist, violation examples
- Free policy preview on landing page
- Sitemap, JSON-LD

### InvoiceFlow (v5)
- Multi-format extraction (Stripe/AWS/general PDFs), 30 vendor GL rules
- Batch processing (50 files, concurrency 5)
- Xero support + QuickBooks export preview with sample CSV
- Multi-client portal (GL mappings per client)
- Approval workflow with audit trail
- Monthly reconciliation reports (AI-generated)
- Rules engine (vendor/amount/flag conditions)
- AWS invoice free demo on landing page
- 2 SEO guides: invoice processing automation, GL coding best practices
- Integration logos, testimonials, sitemap, JSON-LD

### E-commerce Ops Brain (v5)
- Hero: "Stop Losing Sales to Stockouts, 3am Ticket Pileups, and Weak Product Copy"
- 6 CS ticket types with AOV > $200 escalation
- BFCM prep dashboard (countdown + 4 modules)
- SKU performance report (Hero/Steady/Fading/Dead)
- Returns intelligence (pattern → description fixes)
- Daily operations briefing
- Product launch toolkit (6 assets in one click)
- Competitive positioning analyzer
- 4 SEO guides: stockout prevention, CS templates, inventory tips, AI CS automation
- Guides index page, sitemap, JSON-LD

### FN3 Agency (v5)
- Fixed ROI calculator math, 48 named agents across 6 departments
- 5-question qualification quiz → custom plan recommendation
- ROI proof table (8 processes with before/after)
- Floating instant quote chatbot
- Industry results (6 sectors), video placeholder
- 2 SEO guides: how to start AI agency, AI agency pricing
- FAQ JSON-LD, /compare page, email capture, sitemap

### Operators Brief (v6)
- 9 free issue pages across 6+ industries
- Best Of page (top 10, locked 4-10)
- What You Get membership breakdown
- Team tier ($49/5 seats)
- Referral program mention
- Workflow library (11 of 12 locked)
- Welcome page + drip sequence preview
- Industry filter on archive
- 3 more pending: agency reporting, inbox zero, SaaS churn
- Sitemap (20+ routes)

### Agency AI OS (v4)
- "$30K/Month in 90 Days" hero + social proof bar
- All 25 templates listed, 6-phase delivery framework
- Interactive ROI calculator
- 3 case studies, "Who this is NOT for" disqualifier
- 1/5th Rule pricing methodology, Week 1 action plan
- Objection handlers, "vs. $2K Course" comparison
- AI tools stack, "Typical Week" section
- Product JSON-LD for Google rich results

### MeetingMind (v2)
- New venture: AI meeting notes, action items, decisions, follow-up email
- Hero: "Your follow-up email should already be written"
- Sample transcript load button
- Claude prompt: owner assignment, deadline extraction, decision confidence
- 3 SEO guides: action items template, meeting notes template, effective meetings
- Meeting types section, JSON-LD, sitemap

## GUMROAD PRODUCTS (ready to publish)

All 9 PDFs built. Run `npm run publish` after adding GUMROAD_ACCESS_TOKEN to .env

```bash
cd /Users/husamahmed/FN3/ventures/gumroad-empire
echo "GUMROAD_ACCESS_TOKEN=your_token" > .env
npm run publish
```

| Product | Price | File |
|---------|-------|------|
| Vibe Coder's Launch Playbook | $97 | output/vibe-coder-launch-playbook.pdf |
| AI Workforce Playbook | $127 | output/ai-workforce-playbook.pdf |
| AI Freelancer Multiplier System | $147 | output/freelancer-multiplier-system.pdf |
| Local Business AI Operations Kit | $97 | output/local-business-ai-kit.pdf |
| Faceless Content Machine: 2026 Edition | $77 | output/faceless-content-machine-2026.pdf |
| Real Estate Agent AI Command Center | $97 | output/real-estate-agent-command-center.pdf |
| Financial Advisor AI Command Center | $127 | output/financial-advisor-command-center.pdf |
| Personal Injury Attorney AI Command Center | $147 | output/personal-injury-attorney-command-center.pdf |
| Executive Coach AI Command Center | $97 | output/executive-coach-command-center.pdf |

**Total addressable per customer: $1,016**

## WHAT NEEDS YOUR 5 MINUTES

1. **Anthropic API key** — add to ALL AI apps in Vercel dashboard (LexiKit, PropertyMind, ComplianceAI, InvoiceFlow, E-commerce Ops Brain, MeetingMind, HRMind, GrantWriter)
2. **Gumroad** — create account → get token → `npm run publish` (9 products go live instantly)
3. **Stripe** — create account → get keys → add to each SaaS app in Vercel dashboard

## PENDING HUMAN ACTIONS (blocks revenue)

### Supabase schemas to run:
Each new venture has a `supabase/schema.sql` — run in Supabase SQL editor at https://supabase.com/dashboard/project/cetrxwtmzrogbbrblkys

### MeetingMind Vercel env:
Add ANTHROPIC_API_KEY to https://vercel.com/fn3s-projects/meetingmind/settings/environment-variables

## ORCHESTRATOR (FN3 Autonomous Loop)
- Heartbeat: `/orchestrator/src/orchestrator.ts` (15-min cron)
- Job runner: `/orchestrator/src/worker.ts` (spawns claude -p sessions)
- Worker pool: `npm run workers` in /orchestrator/ (5 workers, auto-restart)
