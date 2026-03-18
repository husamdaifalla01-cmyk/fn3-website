---
name: architect
description: System architecture design - create comprehensive technical designs that scale to $50T operations.
argument-hint: [design|review|scale] [system]
---

# /architect - System Architecture Design

## Description
Design and document system architectures at the CTO level. Creates comprehensive technical designs that scale to $50T operations.

## Commands

### `/architect design [system]`
Create a complete system architecture with:
- System overview and scale targets
- Architecture diagram with all layers
- Data flow documentation
- Component specifications
- Database schema
- Security architecture
- Scaling considerations
- Monitoring & observability
- CTO sign-off and implementation order

### `/architect review [component]`
Review existing architecture: current state, strengths, weaknesses, and recommendations.

### `/architect scale [target]`
Plan architecture for scaling: current capacity, target requirements, scaling strategy, infrastructure changes, migration path, and risk assessment.

---

## Architecture Principles

1. **Simple until proven otherwise** - Start simple, add complexity only when data demands it
2. **Edge-first** - Compute close to users
3. **Event-driven** - Loose coupling, high cohesion
4. **Observable** - If you can't measure it, you can't improve it
5. **Secure by design** - Security is not an afterthought
