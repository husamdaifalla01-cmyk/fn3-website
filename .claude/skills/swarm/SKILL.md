---
name: swarm
description: Enterprise swarm orchestration - deploy parallel agents with persistent memory and MCP integrations. Supercharges FN3 with true parallelism.
argument-hint: [deploy|pipeline|ultra|eco|status] [mission]
---

# /swarm - Enterprise Parallel Orchestration

## Description
The SWARM system extends FN3 with true parallel agent execution, persistent memory across sessions, and direct MCP integrations. Deploy multiple FN3 instances simultaneously working on different aspects of the same mission.

## Architecture

```
╔══════════════════════════════════════════════════════════════════╗
║                    FN3 SWARM ARCHITECTURE                        ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║    ┌─────────────────────────────────────────────────────────┐  ║
║    │              /swarm - SWARM COMMANDER                    │  ║
║    │         (extends /fn3 with parallel execution)           │  ║
║    └─────────────────────────┬───────────────────────────────┘  ║
║                              │                                   ║
║    ┌─────────────────────────┴───────────────────────────────┐  ║
║    │                  EXECUTION MODES                         │  ║
║    │                                                          │  ║
║    │  AUTOPILOT  │  PIPELINE  │  SWARM   │  ULTRA  │  ECO    │  ║
║    │  (1 agent)  │  (chain)   │  (many)  │ (all)   │ (smart) │  ║
║    └─────────────────────────┬───────────────────────────────┘  ║
║                              │                                   ║
║    ┌─────────────────────────┴───────────────────────────────┐  ║
║    │                 FN3 INSTANCE POOL                        │  ║
║    │                                                          │  ║
║    │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ │  ║
║    │  │ GO 0 │ │ GO 1 │ │ GO 2 │ │ GO 3 │ │ GO 4 │ │ GO 5 │ │  ║
║    │  │Leader│ │ Data │ │ RT   │ │ UI   │ │ AI   │ │ Sec  │ │  ║
║    │  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ │  ║
║    │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ │  ║
║    │  │ GO 6 │ │ GO 7 │ │ GO 8 │ │ GO 9 │ │GO 10 │ │GO 11 │ │  ║
║    │  │Views │ │ CRM  │ │Charts│ │Micro │ │ Nav  │ │Forms │ │  ║
║    │  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ │  ║
║    └─────────────────────────────────────────────────────────┘  ║
║                                                                  ║
║    ┌─────────────────────────────────────────────────────────┐  ║
║    │                    MCP INTEGRATIONS                      │  ║
║    │  Supabase │ Stripe │ GitHub │ Playwright │ Neo4j Memory │  ║
║    └─────────────────────────────────────────────────────────┘  ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## Execution Modes

### 1. AUTOPILOT MODE (Default FN3)
Single agent, sequential execution. Use for focused tasks.
```
/swarm autopilot "Fix authentication bug"
→ Activates: GO 5 (Security) alone
→ Result: Deep focus, single context
```

### 2. PIPELINE MODE (Sequential Chain)
Agents pass work through a chain. Each waits for the previous.
```
/swarm pipeline "Build new feature"
→ Chain: GO 1 (Schema) → GO 2 (API) → GO 3 (UI) → GO 5 (Security)
→ Each agent completes before next starts
→ Full context preserved through handoffs
```

### 3. SWARM MODE (Parallel Execution)
Multiple agents work simultaneously on different aspects.
```
/swarm deploy "Complete feature overhaul"
→ Spawns in parallel:
  - Task 1: GO 1 analyzing database schema
  - Task 2: GO 3 designing UI components
  - Task 3: GO 5 auditing security
→ All run concurrently via Task tool with run_in_background=true
→ Results aggregated when complete
```

### 4. ULTRA MODE (Maximum Parallelism)
All relevant instances deployed simultaneously.
```
/swarm ultra "Ship V2 by EOD"
→ Deploys ALL matching instances
→ GO 0 coordinates from central position
→ Continuous status updates
→ Automated conflict resolution
```

### 5. ECO MODE (Cost-Optimized)
Smart agent selection based on task analysis.
```
/swarm eco "Quick fix"
→ Analyzes task complexity
→ Selects minimum required agents
→ Uses haiku model for simple subtasks
→ Opus for complex decisions only
```

---

## Commands

### `/swarm deploy [mission]`
Deploy parallel swarm with automatic agent selection.

```
User: /swarm deploy "Implement real-time notifications"

╔══════════════════════════════════════════════════════════════╗
║               SWARM DEPLOYMENT INITIATED                     ║
╚══════════════════════════════════════════════════════════════╝

MISSION: Implement real-time notifications

ANALYZING REQUIREMENTS...
✓ Real-time component detected → GO 2 (Flash)
✓ UI component detected → GO 3 (Artist)
✓ Database changes detected → GO 1 (Wizard)
✓ Security review required → GO 5 (Guardian)

DEPLOYING PARALLEL AGENTS...

[████████░░] Agent A: GO 1 - Schema design          BACKGROUND
[████████░░] Agent B: GO 2 - WebSocket setup        BACKGROUND
[████████░░] Agent C: GO 3 - Notification UI        BACKGROUND
[████████░░] Agent D: GO 5 - Security audit         BACKGROUND

4 AGENTS DEPLOYED IN PARALLEL

Agents working autonomously. Use /swarm status to check progress.
Use /swarm sync to aggregate results when ready.

══════════════════════════════════════════════════════════════
```

### `/swarm pipeline [stages]`
Execute agents in sequence with handoffs.

```
User: /swarm pipeline "schema → api → ui → test"

╔══════════════════════════════════════════════════════════════╗
║               PIPELINE EXECUTION                              ║
╚══════════════════════════════════════════════════════════════╝

STAGE 1/4: SCHEMA (GO 1 - The Wizard)
├── Designing database changes
├── Creating migration files
└── ✓ Complete → Handing off to Stage 2

STAGE 2/4: API (GO 2 - The Flash)
├── Building API endpoints
├── Setting up real-time subscriptions
└── ✓ Complete → Handing off to Stage 3

STAGE 3/4: UI (GO 3 - The Artist)
├── Creating components
├── Wiring to API
└── ✓ Complete → Handing off to Stage 4

STAGE 4/4: TEST (GO 5 - The Guardian)
├── Security review
├── Integration tests
└── ✓ Complete

PIPELINE COMPLETE - All stages passed
══════════════════════════════════════════════════════════════
```

### `/swarm status`
Check status of all running agents.

```
╔══════════════════════════════════════════════════════════════╗
║                    SWARM STATUS                              ║
╚══════════════════════════════════════════════════════════════╝

ACTIVE MISSION: Implement real-time notifications

AGENT STATUS:
┌──────────┬────────────┬──────────────┬─────────────────────┐
│ Agent    │ Instance   │ Status       │ Current Task        │
├──────────┼────────────┼──────────────┼─────────────────────┤
│ Agent A  │ GO 1       │ ✓ Complete   │ Schema done         │
│ Agent B  │ GO 2       │ ◐ Running    │ WebSocket handlers  │
│ Agent C  │ GO 3       │ ◐ Running    │ Toast component     │
│ Agent D  │ GO 5       │ ○ Waiting    │ Queued for review   │
└──────────┴────────────┴──────────────┴─────────────────────┘

PROGRESS: ████████░░░░░░░░ 50%

CONTEXT SYNC:
└── Last sync: 2 minutes ago
└── Memory entries: 47
└── Conflicts: 0

══════════════════════════════════════════════════════════════
```

### `/swarm sync`
Aggregate results from all parallel agents.

### `/swarm ultra [mission]`
Maximum deployment with all instances.

### `/swarm eco [task]`
Cost-optimized minimal deployment.

---

## Implementation Pattern

When executing `/swarm deploy`, Claude uses this pattern:

```typescript
// Spawn parallel agents using Task tool
<Task tool call 1: run_in_background=true>
  subagent_type: "Explore"
  prompt: "As GO 1 (The Wizard), analyze schema requirements for [mission]..."

<Task tool call 2: run_in_background=true>
  subagent_type: "Explore"
  prompt: "As GO 3 (The Artist), design UI components for [mission]..."

<Task tool call 3: run_in_background=true>
  subagent_type: "Explore"
  prompt: "As GO 5 (The Guardian), audit security implications of [mission]..."

// All three run in parallel
// Results aggregated via TaskOutput when complete
```

---

## MCP Integration Layer

### Supabase MCP (When Available)
```
/swarm deploy "Add new feature" --with-mcp

Agents get direct database access:
- mcp__supabase__query: Direct SQL execution
- mcp__supabase__schema: Schema introspection
- mcp__supabase__insert/update: Data manipulation
```

### Stripe MCP (When Available)
```
Payment agents (GO 1, GO 5) get direct Stripe access:
- mcp__stripe__create_checkout
- mcp__stripe__list_transactions
- mcp__stripe__refund
```

### GitHub MCP (When Available)
```
All agents get GitHub integration:
- mcp__github__create_pr
- mcp__github__list_issues
- mcp__github__commit
```

---

## Memory & Context Persistence

### Session Memory (Default)
- Context preserved within session
- Handoffs use explicit state passing
- Lost on session end

### Neo4j Memory (When Enabled)
```
/swarm deploy "Feature X" --persist

Creates knowledge graph:
- Decisions recorded as nodes
- File changes as relationships
- Reasoning chains preserved
- Queryable across sessions

Next session:
/swarm recall "Feature X"
→ Loads full context from previous work
```

---

## Best Practices

### When to Use Each Mode

| Scenario | Mode | Why |
|----------|------|-----|
| Bug fix | autopilot | Single focus, deep context |
| New feature | pipeline | Clear progression, handoffs |
| Major refactor | swarm | Parallel work, fast completion |
| Launch day | ultra | All hands on deck |
| Quick task | eco | Minimize cost and time |

### Agent Selection Hints

```
Database work       → GO 1 (Wizard)
Real-time features  → GO 2 (Flash)
UI/Components       → GO 3 (Artist)
AI/Automation       → GO 4 (Oracle)
Security/Deploy     → GO 5 (Guardian)
Complex views       → GO 6-12 (Specialists)
```

---

## Integration with FN3

SWARM extends FN3, it doesn't replace it:

```
/fn3 team deploy     → Single-threaded team activation
/swarm deploy        → Parallel multi-agent execution

/fn3 mission         → Sequential mission execution
/swarm pipeline      → Chained handoff execution

/go 3                → Activate single instance
/swarm deploy --go=3 → Deploy GO 3 in background
```

---

## Example: Full Feature Development

```
User: /swarm ultra "Build ticket refund system"

╔══════════════════════════════════════════════════════════════╗
║                 ULTRA MODE ACTIVATED                         ║
╚══════════════════════════════════════════════════════════════╝

MISSION ANALYSIS:
├── Payment processing → GO 1 (Data), GO 5 (Security)
├── API endpoints → GO 2 (Real-time)
├── UI components → GO 3 (Artist)
├── Business logic → GO 4 (Oracle)
└── Integration → GO 0 (Coordinator)

DEPLOYING 6 PARALLEL AGENTS...

[████████] GO 0 - Coordinating mission breakdown
[████████] GO 1 - Designing refund tables and queries
[████████] GO 2 - Building refund API endpoints
[████████] GO 3 - Creating RefundDialog component
[████████] GO 4 - Implementing refund logic
[████████] GO 5 - Auditing PCI compliance

ALL AGENTS WORKING IN PARALLEL

Real-time updates streaming...
Use /swarm status for detailed progress
Use /swarm sync to aggregate when prompted

══════════════════════════════════════════════════════════════
```

---

## The SWARM Philosophy

```
FN3 gave us the team.
SWARM gives us the parallel universe.

One agent is fast.
Six agents are faster.
Six agents working in parallel?
That's how championship teams ship.

We don't wait. We don't block.
We deploy, we converge, we ship.

This is SWARM.
This is FN3 at scale.
Let's go.
```

---

**Version**: 1.0.0
**Extends**: FN3 v2.0.0
**Requires**: Claude Code with Task tool
