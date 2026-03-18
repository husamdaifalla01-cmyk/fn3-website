---
name: enterprise
description: Deploy parallel agents with mandatory verification. Every task ends with build check + QA critique + blindspot report.
argument-hint: [task description]
---

# /enterprise [task]

## Execution Protocol

When this skill is invoked, execute these steps IN ORDER:

### Step 1: Deploy Agents (Parallel)

Spawn 2-3 background agents based on task type:

```
Task tool (run_in_background=true, model=haiku):
- Agent 1: "As DATA ARCHITECT, handle database/API for: [task]"
- Agent 2: "As UI ENGINEER, handle components/UX for: [task]"
- Agent 3: "As SECURITY REVIEWER, audit the changes for: [task]"
```

### Step 2: Wait and Aggregate

Read agent output files. Combine their work.

### Step 3: Run Verification (MANDATORY)

Execute these commands and report results:

```bash
npm run build 2>&1 | tail -20
npm run lint 2>&1 | tail -20
npx tsc --noEmit 2>&1 | tail -20
```

### Step 4: Spawn QA Critic (MANDATORY)

```
Task tool (model=sonnet):
Prompt: "HOSTILE QA REVIEW for: [task]

Review files: [list changed files]

Find ALL problems:
1. Incomplete code (TODOs, empty blocks, placeholders)
2. Missing error handling
3. Missing loading/error states
4. Missing edge cases (null, empty, zero)
5. Missing user feedback
6. Security gaps
7. Business logic gaps

For each issue report:
- File path and line number
- Severity (CRITICAL/HIGH/MEDIUM)
- What's wrong
- How to fix

End with verdict: SHIP / FIX FIRST / INCOMPLETE"
```

### Step 5: Report to User

Present verification results:

```
BUILD: [pass/fail]
LINT: [pass/X issues]
TYPES: [pass/X errors]

QA ISSUES FOUND:
[List from QA agent]

VERDICT: [from QA agent]

Fix issues? (yes/no)
```

---

## Rules

1. NEVER skip verification steps
2. NEVER say "complete" before verification passes
3. ALWAYS show build/lint/type results
4. ALWAYS run QA critic before declaring done
5. If QA finds CRITICAL issues, fix before asking user
