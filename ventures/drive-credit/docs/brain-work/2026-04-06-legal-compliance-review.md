# Legal — Compliance Review: New Pages Shipped This Week
**Date:** 2026-04-06 | **Dept:** Legal

---

## Pages Reviewed This Cycle
1. /car-title-loan-alternative (shipped Apr 6 12pm)
2. /yendo-states-guide (shipped Apr 6 ~14:00)

---

## /car-title-loan-alternative — COMPLIANT ✅

**FTC affiliate disclosure:** Present — "Mintbrooks may earn a commission"
**Language risk check:**
- No guaranteed approval language ✅
- No misleading "no credit check" without caveats ✅
- "May qualify" framing used ✅
- Yendo not described as Mintbrooks' own product ✅

**One issue flagged:**
- Comparison table should explicitly note that rate/terms listed are "as of [date], verify directly with issuer" — add date last verified note to avoid stale info liability.

---

## /yendo-states-guide — COMPLIANT ✅

**FTC affiliate disclosure:** Present ✅
**State eligibility data:**
- State list should carry "verify current availability at yendo.com before applying" disclaimer
- States change — if Yendo expands/contracts, page becomes misleading
- **Recommended:** Add "Last verified: [date]. Availability may change. Always confirm at yendo.com." to the state table header.

**Article JSON-LD:** Present ✅
**FAQPage JSON-LD:** Present ✅

---

## /qualify — Now With Geo Auto-Fill

**Privacy concern flagged:** The /api/geo endpoint reads the user's IP-based location from Vercel headers. 
- This is processed server-side and NOT stored — route.ts does not persist any IP data
- Response only returns state code (not raw IP)
- No PII logging in current implementation ✅
- **Recommendation:** Add one line to Privacy Policy: "We use your approximate location to show relevant eligibility information. Your IP address is never stored."

---

## Action Items
| Action | Owner | Priority |
|--------|-------|----------|
| Add "Last verified" disclaimer to /yendo-states-guide state table | Dev | Medium |
| Add "verify directly with issuer" to /car-title-loan-alternative comparison table | Dev | Medium |
| Fix welcome email: add physical address + CAN-SPAM footer | Dev | HIGH |
| Add IP geolocation note to Privacy Policy | Dev | Low |
