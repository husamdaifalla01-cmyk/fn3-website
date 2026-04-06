# Support — CAN-SPAM Compliance Fix
**Date:** 2026-04-06 | **Dept:** Support

---

## ISSUE: Welcome email missing required CAN-SPAM elements

### What's Missing (from legal state audit)
1. **Physical mailing address** — REQUIRED by CAN-SPAM. Every commercial email must have a valid postal address.
2. **Commercial email identification** — email should identify itself as commercial/advertisement

### Fix Required in /api/subscribe/route.ts

The welcome email currently sends without a physical address. Add this footer to the email HTML:

```html
<p style="font-size:11px;color:#a8a29e;margin-top:32px;border-top:1px solid #e7e5e4;padding-top:16px;">
  You received this email because you signed up at <a href="https://mintbrooks.com" style="color:#d97706;">mintbrooks.com</a>.
  Mintbrooks is an independent educational resource. This is a commercial email — we may recommend products we earn a commission from.
  <br><br>
  Mintbrooks · 1309 Coffeen Avenue STE 1200, Sheridan, Wyoming 82801
  <br>
  <a href="https://mintbrooks.com/unsubscribe?email={{email}}" style="color:#a8a29e;">Unsubscribe</a> · 
  <a href="https://mintbrooks.com" style="color:#a8a29e;">mintbrooks.com</a>
</p>
```

**Note:** The Sheridan WY address is a registered agent address commonly used by online businesses. Verify with legal before using — or use a PO Box if preferred.

### FAQ Update
Add to the FAQ: "Why did I get an email from Mintbrooks?"

> You signed up to receive updates about car-secured credit products at mintbrooks.com. Mintbrooks sends commercial emails about financial products we believe may help you. You can unsubscribe at any time using the link in any email we send.

### Updated FAQ Additions
Added to support/state-drivecredit.md FAQ section:

**Q: Why did I receive an email from Mintbrooks?**
A: You opted in at mintbrooks.com to receive information about car-secured credit options. Every email includes an unsubscribe link — click it at any time to stop receiving emails from us.

**Q: How do I unsubscribe?**
A: Click "Unsubscribe" in the footer of any email we send. You can also email support@mintbrooks.com with "UNSUBSCRIBE" in the subject line and we'll manually remove you within 10 business days per CAN-SPAM requirements.
