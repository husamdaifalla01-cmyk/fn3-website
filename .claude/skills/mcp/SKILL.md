---
name: mcp
description: MCP server orchestration - configure and use Supabase, Stripe, GitHub, and Playwright integrations.
argument-hint: [status|setup|supabase|stripe|github|playwright]
---

# /mcp - Model Context Protocol Integration

## Description
The MCP skill provides direct integration with external services through Model Context Protocol servers. Give FN3 instances direct access to your database, payment system, and GitHub repositories.

---

## Architecture

```
╔══════════════════════════════════════════════════════════════════╗
║                    MCP INTEGRATION LAYER                         ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║    ┌─────────────────────────────────────────────────────────┐  ║
║    │                   CLAUDE CODE                            │  ║
║    │              (FN3 / SWARM / Agents)                      │  ║
║    └─────────────────────────┬───────────────────────────────┘  ║
║                              │                                   ║
║                      MCP Protocol                                ║
║                              │                                   ║
║    ┌─────────────────────────┴───────────────────────────────┐  ║
║    │                   MCP SERVERS                            │  ║
║    │                                                          │  ║
║    │  ┌────────────┐  ┌────────────┐  ┌────────────┐        │  ║
║    │  │  SUPABASE  │  │   STRIPE   │  │   GITHUB   │        │  ║
║    │  │    MCP     │  │    MCP     │  │    MCP     │        │  ║
║    │  ├────────────┤  ├────────────┤  ├────────────┤        │  ║
║    │  │ 20+ tools  │  │ 10+ tools  │  │ 15+ tools  │        │  ║
║    │  │ Query      │  │ Checkout   │  │ Issues     │        │  ║
║    │  │ Insert     │  │ Refund     │  │ PRs        │        │  ║
║    │  │ Schema     │  │ Customers  │  │ Commits    │        │  ║
║    │  └────────────┘  └────────────┘  └────────────┘        │  ║
║    │                                                          │  ║
║    │  ┌────────────┐  ┌────────────┐  ┌────────────┐        │  ║
║    │  │ PLAYWRIGHT │  │   NEO4J    │  │   SLACK    │        │  ║
║    │  │    MCP     │  │  MEMORY    │  │    MCP     │        │  ║
║    │  ├────────────┤  ├────────────┤  ├────────────┤        │  ║
║    │  │ Navigate   │  │ Store      │  │ Message    │        │  ║
║    │  │ Screenshot │  │ Query      │  │ Channel    │        │  ║
║    │  │ Interact   │  │ Graph      │  │ Thread     │        │  ║
║    │  └────────────┘  └────────────┘  └────────────┘        │  ║
║    └─────────────────────────────────────────────────────────┘  ║
║                              │                                   ║
║                      External Services                           ║
║                              │                                   ║
║    ┌─────────────────────────┴───────────────────────────────┐  ║
║    │  PostgreSQL │ Stripe API │ GitHub API │ Browser │ Neo4j │  ║
║    └─────────────────────────────────────────────────────────┘  ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## Commands

### `/mcp status`
Check status of all configured MCP servers.

```
User: /mcp status

╔══════════════════════════════════════════════════════════════╗
║                    MCP STATUS                                ║
╚══════════════════════════════════════════════════════════════╝

CONFIGURED SERVERS:

┌─────────────┬──────────┬─────────────────────────────────────┐
│ Server      │ Status   │ Tools Available                     │
├─────────────┼──────────┼─────────────────────────────────────┤
│ Supabase    │ ✓ Active │ query, insert, update, schema...   │
│ Stripe      │ ○ Config │ Setup required in settings.json    │
│ GitHub      │ ✓ Active │ issues, prs, commits, actions...   │
│ Playwright  │ ○ Config │ Run: npx @anthropic/mcp-playwright │
│ Neo4j       │ ✗ None   │ Not configured                      │
└─────────────┴──────────┴─────────────────────────────────────┘

QUICK SETUP:
/mcp setup supabase  - Configure Supabase MCP
/mcp setup stripe    - Configure Stripe MCP
/mcp setup github    - Configure GitHub MCP
/mcp setup all       - Configure all available MCPs

══════════════════════════════════════════════════════════════
```

### `/mcp setup [server]`
Configure an MCP server.

```
User: /mcp setup supabase

╔══════════════════════════════════════════════════════════════╗
║              SUPABASE MCP SETUP                              ║
╚══════════════════════════════════════════════════════════════╝

SUPABASE MCP SERVER
Provides direct database access to Claude agents.

INSTALLATION:
npx @anthropic/mcp-supabase

CONFIGURATION:
Add to ~/.claude/settings.json:

{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-supabase"],
      "env": {
        "SUPABASE_URL": "your-project-url",
        "SUPABASE_SERVICE_KEY": "your-service-key"
      }
    }
  }
}

AVAILABLE TOOLS (20+):
├── mcp__supabase__query - Execute SQL queries
├── mcp__supabase__insert - Insert records
├── mcp__supabase__update - Update records
├── mcp__supabase__delete - Delete records
├── mcp__supabase__schema - Get table schema
├── mcp__supabase__tables - List all tables
├── mcp__supabase__rpc - Call database functions
└── ... and more

SECURITY NOTE:
Uses service key - full database access.
Only configure on trusted machines.

══════════════════════════════════════════════════════════════
```

---

## Supabase MCP Tools

When Supabase MCP is active, agents get these tools:

### Query
```typescript
// Direct SQL execution
mcp__supabase__query({
  sql: "SELECT * FROM profiles WHERE account_type = 'promoter'"
})
```

### Schema Introspection
```typescript
// Get table structure
mcp__supabase__schema({ table: "ticket_sales" })
// Returns columns, types, constraints, indexes
```

### Data Manipulation
```typescript
// Insert
mcp__supabase__insert({
  table: "events",
  data: { title: "New Event", creator_id: "..." }
})

// Update
mcp__supabase__update({
  table: "profiles",
  match: { id: "user-id" },
  data: { total_commission_earned: 500 }
})
```

### RPC Calls
```typescript
// Call database functions
mcp__supabase__rpc({
  function: "get_promoter_earnings",
  args: { p_promoter_id: "..." }
})
```

---

## Stripe MCP Tools

When Stripe MCP is active:

### Checkout
```typescript
mcp__stripe__create_checkout({
  line_items: [...],
  success_url: "...",
  cancel_url: "..."
})
```

### Customers
```typescript
mcp__stripe__list_customers({ limit: 10 })
mcp__stripe__get_customer({ id: "cus_xxx" })
```

### Refunds
```typescript
mcp__stripe__create_refund({
  payment_intent: "pi_xxx",
  amount: 1000 // cents
})
```

### Connect
```typescript
mcp__stripe__create_transfer({
  amount: 1000,
  destination: "acct_xxx"
})
```

---

## GitHub MCP Tools

When GitHub MCP is active:

### Issues
```typescript
mcp__github__list_issues({ repo: "owner/repo", state: "open" })
mcp__github__create_issue({ repo: "...", title: "...", body: "..." })
```

### Pull Requests
```typescript
mcp__github__create_pr({
  repo: "owner/repo",
  title: "Feature: X",
  head: "feature-branch",
  base: "main"
})
```

### Repository
```typescript
mcp__github__get_file({ repo: "...", path: "src/index.ts" })
mcp__github__commit({ repo: "...", message: "...", files: [...] })
```

---

## Playwright MCP Tools

When Playwright MCP is active (for E2E testing):

### Navigation
```typescript
mcp__playwright__navigate({ url: "http://localhost:8080" })
mcp__playwright__screenshot({ path: "test.png" })
```

### Interaction
```typescript
mcp__playwright__click({ selector: "button.submit" })
mcp__playwright__fill({ selector: "input[name=email]", value: "test@test.com" })
```

### Assertions
```typescript
mcp__playwright__expect_visible({ selector: ".success-message" })
mcp__playwright__expect_text({ selector: "h1", text: "Welcome" })
```

---

## FN3 + MCP Integration

MCP tools are automatically available to all FN3 instances:

```
/go 1 (The Wizard) + Supabase MCP
→ Direct schema queries
→ Can inspect real data
→ Validate migrations instantly

/go 5 (The Guardian) + Stripe MCP
→ Direct payment verification
→ Can audit transactions
→ Test refund flows

/swarm deploy + All MCPs
→ Each agent has full service access
→ No context-passing needed
→ Real data, real operations
```

---

## Configuration File

Full MCP configuration in `~/.claude/settings.json`:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-supabase"],
      "env": {
        "SUPABASE_URL": "https://xxx.supabase.co",
        "SUPABASE_SERVICE_KEY": "eyJ..."
      }
    },
    "stripe": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-stripe"],
      "env": {
        "STRIPE_SECRET_KEY": "sk_test_..."
      }
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_..."
      }
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-playwright"]
    }
  }
}
```

---

## Security Considerations

```
╔══════════════════════════════════════════════════════════════╗
║                    MCP SECURITY                              ║
╚══════════════════════════════════════════════════════════════╝

⚠️  MCP servers have FULL ACCESS to configured services

RECOMMENDATIONS:
├── Use test/sandbox keys during development
├── Never commit settings.json with real keys
├── Rotate keys if machine is compromised
├── Audit MCP tool usage in logs
└── Use read-only keys where possible

SUPABASE:
└── Service key bypasses RLS - use carefully

STRIPE:
└── Test mode keys only until production ready

GITHUB:
└── Fine-grained PAT with minimal scopes

══════════════════════════════════════════════════════════════
```

---

## Example: Full Stack with MCP

```
User: /swarm deploy "Debug commission calculation bug"

AGENTS DEPLOYED WITH MCP ACCESS:

GO 1 (Wizard) + Supabase MCP:
├── Querying ticket_sales for affected records
├── Checking commission_tiers configuration
└── Validating tier thresholds

GO 5 (Guardian) + Stripe MCP:
├── Fetching actual Stripe transactions
├── Comparing with database records
└── Identifying discrepancies

Result:
"Found mismatch: Stripe shows $10 commission,
 database shows $9.50. Platform fee was
 double-applied. Fixing in stripe-webhook..."

Time saved: Direct data access vs. manual queries
```

---

## The MCP Philosophy

```
Claude is powerful.
Claude with tools is unstoppable.
Claude with MCP is omniscient.

No more "can you check the database?"
No more "what does Stripe show?"
No more guessing at state.

Direct access. Real data. Instant answers.

This is how championship teams
eliminate friction and
ship with confidence.
```

---

**Version**: 1.0.0
**Requires**: Claude Code with MCP support
**Servers**: Supabase, Stripe, GitHub, Playwright, Neo4j
