---
name: memory
description: Persistent knowledge management - record decisions, recall context, build knowledge graphs across sessions.
argument-hint: [record|recall|graph|search|export]
---

# /memory - Persistent Knowledge System

## Description
The MEMORY system provides persistent context across sessions. Record architectural decisions, recall previous reasoning, build queryable knowledge graphs. Never lose context again.

---

## Architecture

```
╔══════════════════════════════════════════════════════════════════╗
║                    MEMORY ARCHITECTURE                           ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║    ┌─────────────────────────────────────────────────────────┐  ║
║    │                SESSION MEMORY (Active)                   │  ║
║    │  Current context, decisions, reasoning chains            │  ║
║    └─────────────────────────┬───────────────────────────────┘  ║
║                              │ /memory record                    ║
║                              ▼                                   ║
║    ┌─────────────────────────────────────────────────────────┐  ║
║    │              PERSISTENT MEMORY STORE                     │  ║
║    │                                                          │  ║
║    │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │  ║
║    │  │   DECISIONS  │  │   PATTERNS   │  │  KNOWLEDGE   │  │  ║
║    │  │              │  │              │  │              │  │  ║
║    │  │ Architecture │  │ Code style   │  │ Business     │  │  ║
║    │  │ Tech choices │  │ Conventions  │  │ Domain rules │  │  ║
║    │  │ Trade-offs   │  │ Preferences  │  │ API behavior │  │  ║
║    │  └──────────────┘  └──────────────┘  └──────────────┘  │  ║
║    │                                                          │  ║
║    │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │  ║
║    │  │   ENTITIES   │  │    LINKS     │  │   CONTEXT    │  │  ║
║    │  │              │  │              │  │              │  ║
║    │  │ Files        │  │ Dependencies │  │ Why we did   │  │  ║
║    │  │ Components   │  │ Relationships│  │ what we did  │  │  ║
║    │  │ Functions    │  │ Impacts      │  │              │  │  ║
║    │  └──────────────┘  └──────────────┘  └──────────────┘  │  ║
║    └─────────────────────────────────────────────────────────┘  ║
║                                                                  ║
║    Storage: .claude/memory/                                      ║
║    Format: JSON + Markdown                                       ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## Commands

### `/memory record [type] [content]`
Record important decisions, patterns, or knowledge.

```
User: /memory record decision "Using destination charges for Stripe"

╔══════════════════════════════════════════════════════════════╗
║                    MEMORY RECORDED                           ║
╚══════════════════════════════════════════════════════════════╝

TYPE: Decision
CONTENT: Using destination charges for Stripe

EXTRACTING CONTEXT...
├── Related files: stripe-webhook/index.ts, checkout-session/index.ts
├── Category: Payments
├── Impact: High (affects all transactions)
└── Reasoning: Platform takes 5% fee via application_fee_amount

MEMORY ENTRY CREATED:
{
  "id": "dec_2024_001",
  "type": "decision",
  "content": "Using destination charges for Stripe",
  "context": {
    "files": ["supabase/functions/stripe-webhook/index.ts"],
    "category": "payments",
    "reasoning": "Enables platform fee collection while paying organizers directly"
  },
  "timestamp": "2024-02-04T10:30:00Z",
  "related": ["dec_2023_045", "pat_stripe_001"]
}

✓ Saved to .claude/memory/decisions/dec_2024_001.json
✓ Indexed for search
✓ Linked to related entries

══════════════════════════════════════════════════════════════
```

### `/memory recall [topic]`
Retrieve relevant context from memory.

```
User: /memory recall "commission system"

╔══════════════════════════════════════════════════════════════╗
║                    MEMORY RECALL                             ║
╚══════════════════════════════════════════════════════════════╝

SEARCHING: commission system

FOUND 12 RELEVANT ENTRIES:

DECISIONS:
├── dec_2023_089: Tiered commission structure (5%, 7%, 10%)
├── dec_2023_102: Commission paid by organizer, not buyer
├── dec_2024_001: Using destination charges for Stripe
└── dec_2024_015: 5% platform fee on commission transfers

PATTERNS:
├── pat_comm_001: Calculate commission at checkout time
├── pat_comm_002: Store commission in ticket_sales table
└── pat_comm_003: Process payouts 48h post-event

KNOWLEDGE:
├── know_stripe_001: Stripe Connect account requirements
├── know_comm_001: Commission calculation formula
└── know_payout_001: Payout eligibility rules

FILES:
├── src/hooks/useStripeConnect.ts
├── supabase/functions/process-payouts/index.ts
└── src/pages/Earnings.tsx

LOADING FULL CONTEXT...

══════════════════════════════════════════════════════════════
```

### `/memory graph [entity]`
Visualize relationships around an entity.

```
User: /memory graph "ticket_sales table"

╔══════════════════════════════════════════════════════════════╗
║                 KNOWLEDGE GRAPH                              ║
╚══════════════════════════════════════════════════════════════╝

                     ┌──────────────┐
                     │ ticket_sales │
                     │    TABLE     │
                     └──────┬───────┘
                            │
      ┌─────────────────────┼─────────────────────┐
      │                     │                     │
      ▼                     ▼                     ▼
┌──────────┐         ┌──────────┐         ┌──────────┐
│  events  │         │ profiles │         │ payouts  │
│  TABLE   │◄────────│  TABLE   │────────►│  TABLE   │
└──────────┘         └──────────┘         └──────────┘
      │                     │                     │
      ▼                     ▼                     ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│stripe-webhook│     │ useEarnings  │     │process-payout│
│  FUNCTION    │     │    HOOK      │     │   FUNCTION   │
└──────────────┘     └──────────────┘     └──────────────┘

CONNECTIONS:
- ticket_sales.event_id → events.id
- ticket_sales.promoter_id → profiles.id
- payouts.ticket_sale_id → ticket_sales.id
- stripe-webhook writes to ticket_sales
- process-payouts reads ticket_sales, writes payouts

══════════════════════════════════════════════════════════════
```

### `/memory search [query]`
Full-text search across all memory.

### `/memory export [format]`
Export memory as markdown or JSON.

---

## Memory Types

### 1. DECISIONS
Architectural and technical decisions with reasoning.

```markdown
# Decision: Use Supabase Edge Functions

## Context
Needed serverless backend for webhook processing

## Options Considered
1. Vercel Functions - Good, but separate from database
2. Supabase Edge Functions - Integrated with database
3. AWS Lambda - Overkill for our scale

## Decision
Supabase Edge Functions

## Reasoning
- Direct database access without network hop
- Same auth context as frontend
- Free tier covers our usage
- Deno runtime is fast and secure

## Consequences
- Must use Deno APIs
- 50MB function size limit
- Limited to Supabase regions

## Status
ACTIVE

## Related
- dec_2023_001: Choose Supabase as backend
- dec_2023_015: Realtime subscription architecture
```

### 2. PATTERNS
Recurring code patterns and conventions.

```markdown
# Pattern: Real-time Query Hook

## Description
Standard pattern for queries that need real-time updates

## Template
```typescript
const { data } = useOptimizedQuery({
  queryKey: ['resource', id],
  queryFn: () => fetchResource(id),
  realtimeTable: 'table_name',
  realtimeFilter: `column=eq.${value}`,
  enabled: !!id,
});
```

## When to Use
- Any data that can change while user is viewing
- Dashboard metrics
- Notification counts
- Earnings data

## Files Using This
- src/hooks/useEarnings.ts
- src/hooks/useNotifications.ts
- src/pages/Dashboard.tsx
```

### 3. KNOWLEDGE
Domain knowledge and business rules.

```markdown
# Knowledge: Commission Calculation

## Rule
commission = ticket_price × tier_percentage

## Tiers
| Sales | Percentage |
|-------|------------|
| 0-10  | 5%        |
| 11-25 | 7%        |
| 26+   | 10%       |

## Important Notes
- Commission calculated at purchase time
- Tier determined by promoter's total sales for that event
- Organizer pays commission (deducted from their share)
- Platform takes 5% of commission on transfer

## Edge Cases
- Free tickets: No commission
- Refunds: Commission reversed
- Upgrades: Difference calculated
```

---

## Storage Structure

```
.claude/memory/
├── decisions/
│   ├── dec_2023_001.json
│   ├── dec_2023_002.json
│   └── index.json
├── patterns/
│   ├── pat_hook_001.json
│   ├── pat_component_001.json
│   └── index.json
├── knowledge/
│   ├── know_stripe_001.json
│   ├── know_commission_001.json
│   └── index.json
├── entities/
│   ├── files.json
│   ├── functions.json
│   └── tables.json
├── graph/
│   └── relationships.json
└── sessions/
    ├── session_2024_001.json
    └── session_2024_002.json
```

---

## Auto-Recording Hooks

When enabled, automatically records:

```yaml
# .claude/hooks/memory-hooks.yaml

on_decision:
  trigger: "Architectural decision made"
  action: /memory record decision

on_pattern:
  trigger: "New reusable pattern created"
  action: /memory record pattern

on_file_create:
  trigger: "New significant file created"
  action: /memory record entity

on_session_end:
  trigger: "Session ending"
  action: /memory export session
```

---

## Integration with FN3

Memory is shared across all FN3 instances:

```
GO 1 (Wizard): /memory recall "database schema"
→ Gets all schema decisions and patterns

GO 3 (Artist): /memory recall "component patterns"
→ Gets UI conventions and standards

GO 5 (Guardian): /memory recall "security decisions"
→ Gets security policies and audit results

/swarm deploy with memory:
→ All agents share same knowledge base
→ Consistent decisions across parallel work
```

---

## Example Workflow

```
# Start of session
/memory recall "current sprint"
→ Load context from previous session

# During development
/memory record decision "Using optimistic updates for better UX"
→ Save reasoning for future reference

# Before deploying
/memory graph "affected components"
→ Understand impact of changes

# End of session
/memory export session
→ Persist all decisions made
```

---

## The Memory Philosophy

```
Context is the enemy of velocity.
Re-learning decisions is waste.
Memory is institutional knowledge.

Record once.
Recall always.
Never forget why.

FN3 instances come and go.
Memory persists.

This is how championship teams
build on their past
instead of repeating it.
```

---

**Version**: 1.0.0
**Storage**: .claude/memory/
**Integrates**: FN3, SWARM
