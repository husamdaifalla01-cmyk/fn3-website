# FN3 Agent Registry

**Total agents:** 55 across 10 departments
**Architecture:** Universal HQ crew — same agents, any venture. Load company context to run any business.
**Execution:** Claude Code SDK + Claude Max subscription
**Brain:** Supabase (fn3_agent_registry, fn3_skill_versions, fn3_agent_state)

---

## Department Map

| Dept | Slug | Scope | Supervisor | Workers | Files |
|---|---|---|---|---|---|
| Executive | `exec` | Per-venture + HQ | Chief of Staff | CPO, CTO, CFO, Strategy | `exec/` |
| Product | `product` | Per-venture | Head of Product | PM, Roadmap, Spec Writer, Idea Validation | `product/` |
| Sales | `sales` | Per-venture | Sales Director | Pipeline, Proposal, Follow-up, CRM | `sales/` |
| Marketing | `marketing` | Per-venture | CMO | Content, SEO, Social, Email, Copywriter | `marketing/` |
| Lead Gen | `leadgen` | Per-venture | Growth Lead | Scraper, Qualifier, ICP Matcher, Outreach | `leadgen/` |
| Acquisition | `acquisition` | Per-venture | Acquisition Director | Paid Ads, Funnel, Landing Page, A/B Test | `acquisition/` |
| Support | `support` | Per-venture | Head of Support | Ticket, FAQ, Escalation, Churn Risk | `support/` |
| Legal | `legal` | Per-venture + HQ | General Counsel | Contract, Compliance, IP, Risk | `legal/` |
| QA | `qa` | Platform-wide | QA Director | Output Validator, Code Reviewer, Brand Checker, Self-Learning Gate | `qa/` |
| Dev | `dev` | Platform-wide | Dev Lead | Frontend/UI, React/Codebase, Backend, Database, Supabase, Platform QA | `dev/` |

---

## All 53 Agents

### exec/ — Executive (5 agents)
| File | Role | Type |
|---|---|---|
| `chief-of-staff.md` | Chief of Staff | Supervisor |
| `cpo-agent.md` | Chief Product Officer | Worker |
| `cto-agent.md` | Chief Technology Officer | Worker |
| `cfo-agent.md` | Chief Financial Officer | Worker |
| `strategy-agent.md` | Strategy & Intelligence | Worker |

### product/ — Product Management (5 agents)
| File | Role | Type |
|---|---|---|
| `head-of-product.md` | Head of Product | Supervisor |
| `pm-agent.md` | Product Manager | Worker |
| `roadmap-agent.md` | Roadmap Keeper | Worker |
| `spec-writer.md` | Specification Writer | Worker |
| `idea-validation.md` | Idea Validation | Worker |

### sales/ — Sales (5 agents)
| File | Role | Type |
|---|---|---|
| `sales-director.md` | Sales Director | Supervisor |
| `pipeline-agent.md` | Pipeline Manager | Worker |
| `proposal-agent.md` | Proposal Writer | Worker |
| `followup-agent.md` | Follow-up Sequencer | Worker |
| `crm-agent.md` | CRM Guardian | Worker |

### marketing/ — Marketing (8 agents)
| File | Role | Type |
|---|---|---|
| `cmo-agent.md` | Chief Marketing Officer | Supervisor |
| `content-agent.md` | Content Writer | Worker |
| `video-content-creator-agent.md` | Video Content Creator (Remotion + nanobanana) | Worker |
| `nanobanana-image-generator-agent.md` | Nanobanana Image Generator | Worker |
| `seo-agent.md` | SEO Specialist | Worker |
| `social-agent.md` | Social Media | Worker |
| `email-agent.md` | Email Marketing | Worker |
| `copywriter-agent.md` | Conversion Copywriter | Worker |

### leadgen/ — Lead Generation (5 agents)
| File | Role | Type |
|---|---|---|
| `growth-lead.md` | Growth Lead | Supervisor |
| `scraper-agent.md` | Prospect Scraper | Worker |
| `qualifier-agent.md` | Lead Qualifier | Worker |
| `icp-matcher.md` | ICP Analyst | Worker |
| `outreach-agent.md` | Outreach Sender | Worker |

### acquisition/ — Customer Acquisition (5 agents)
| File | Role | Type |
|---|---|---|
| `acquisition-director.md` | Acquisition Director | Supervisor |
| `paid-ads.md` | Paid Ads Manager | Worker |
| `funnel-agent.md` | Funnel Optimizer | Worker |
| `landing-page.md` | Landing Page Builder | Worker |
| `ab-test-agent.md` | A/B Test Manager | Worker |

### support/ — Customer Support (5 agents)
| File | Role | Type |
|---|---|---|
| `head-of-support.md` | Head of Support | Supervisor |
| `ticket-agent.md` | Ticket Resolver | Worker |
| `faq-agent.md` | Knowledge Base | Worker |
| `escalation-agent.md` | Escalation Handler | Worker |
| `churn-risk.md` | Churn Prevention | Worker |

### legal/ — Legal (5 agents)
| File | Role | Type |
|---|---|---|
| `general-counsel.md` | General Counsel | Supervisor |
| `contract-agent.md` | Contract Reviewer | Worker |
| `compliance-agent.md` | Compliance Monitor | Worker |
| `ip-agent.md` | IP Protection | Worker |
| `risk-agent.md` | Risk Assessor | Worker |

### qa/ — Quality Assurance (5 agents, platform-wide)
| File | Role | Type |
|---|---|---|
| `qa-director.md` | QA Director | Supervisor |
| `output-validator.md` | Output Validator | Worker |
| `code-reviewer.md` | Code Reviewer | Worker |
| `brand-checker.md` | Brand Checker | Worker |
| `self-learning-gate.md` | Self-Learning Gate | Worker |

### dev/ — Engineering (7 agents, platform-wide)
| File | Role | Type |
|---|---|---|
| `dev-lead.md` | Dev Lead | Supervisor |
| `frontend-ui.md` | Frontend / UI | Worker |
| `react-codebase.md` | React / Codebase | Worker |
| `backend-agent.md` | Backend | Worker |
| `database-agent.md` | Database | Worker |
| `supabase-agent.md` | Supabase | Worker |
| `platform-qa.md` | Platform QA | Worker |

---

## How Agents Load Venture Context

Every agent receives a Company Context Document at runtime. The orchestrator prepends this to each agent's system prompt:

```
VENTURE CONTEXT
Venture: [name]
Status: [active/concept]
MRR: $[amount]
ICP: [description]
Current top 3 objectives (from fn3_prd):
  1. [objective] — priority [n] — owner [agent]
  2. [objective] — priority [n] — owner [agent]
  3. [objective] — priority [n] — owner [agent]
Active constraints:
  - [budget limit]
  - [brand rule]
  - [legal guardrail]
```

This is how 53 universal agents become the operating team for any venture.

---

## The $50K MRR Path

Each department's role in getting to $50K MRR:

| Department | Revenue contribution | How |
|---|---|---|
| Lead Gen + Acquisition | Top-of-funnel volume | Consistent qualified prospects → paid CAC below LTV/3 |
| Sales | Conversion | MEDDIC qualification → proposals that close → follow-up that converts |
| Marketing | Inbound + brand | Content that ranks → email that converts → copy that sells |
| Product | Retention + expansion | Features that solve real problems → NPS → referrals |
| Support | Churn protection | NRR >100% (expansion > churn) → customers stay longer |
| Exec | Portfolio allocation | Resources go to highest-leverage ventures → compound growth |
| Legal | Risk protection | Contracts that protect → compliance that prevents fines |
| QA | Output quality | Every touchpoint builds trust → trust compounds to revenue |
| Dev | Platform reliability | Infrastructure that never fails → agents that never stop working |
