---
name: launch
description: Feature deployment protocol - prepare, validate, execute, monitor, and rollback launches.
argument-hint: [prepare|validate|execute|monitor|rollback] [feature]
---

# /launch - Feature Launch Protocol

## Description
Execute a comprehensive feature launch with all quality gates. Ensures championship-level releases that make a dent in the universe.

## Commands

### `/launch prepare [feature]`
Initialize launch checklist with product, technical, security, quality, infrastructure, and documentation checks.

### `/launch validate`
Run all automated checks: build, tests, security, and performance.

### `/launch execute`
Execute the launch sequence with migrations, staging, production deployment, and post-deploy verification.

### `/launch monitor`
Post-launch monitoring with health indicators, alerts, and user feedback.

### `/launch rollback`
Emergency rollback procedure to revert to previous state.

---

## Launch Quality Gates

| Gate | Owner | Override |
|------|-------|----------|
| Product Approval | CPO | Leadership only |
| Technical Approval | CTO | Leadership only |
| Security Clearance | Instance 5 | None (mandatory) |
| Test Pass | Automated | CTO override |
| Performance Pass | Automated | CTO override |

**Security gate cannot be bypassed under any circumstances.**
