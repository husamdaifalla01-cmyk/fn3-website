# Beehiiv Setup Guide — The Operators Brief

Get from zero to a live, monetized newsletter in 10 minutes.

---

## Step 1: Create Your Beehiiv Account (2 minutes)

1. Go to [beehiiv.com](https://beehiiv.com) and click "Get Started Free"
2. Sign up with your email
3. When asked for publication name, enter exactly: **The Operators Brief**
4. Choose "Newsletter" as publication type
5. For audience, select "Business & Entrepreneurship"
6. Skip the import step for now

You're on the free plan by default. You won't need to upgrade until you exceed 2,500 subscribers or want to enable paid subscriptions.

---

## Step 2: Configure Publication Settings (3 minutes)

Go to **Settings → Publication Settings**:

- **Publication Name:** The Operators Brief
- **Tagline:** AI implementation case studies with real numbers. Weekly.
- **Description:** Weekly deep-dives into real AI implementations. What businesses tried, what failed, what worked, and the exact ROI numbers. For COOs, operations directors, and founders building AI systems.
- **Publication Type:** Newsletter
- **Niche:** Business Operations / AI

Go to **Settings → Sender Settings**:
- **From name:** The Operators Brief
- **Reply-to email:** your personal email (you want to get replies)
- **Sending frequency:** Weekly

---

## Step 3: Set Up Paid Subscriptions ($15/month) (2 minutes)

Beehiiv requires their "Grow" plan ($42/month) to enable paid subscriptions. This is worth it when you have paying subscribers — the fee pays back at 3 subscribers.

1. Go to **Settings → Monetization → Premium Subscriptions**
2. Click "Enable Premium"
3. Connect Stripe (you'll need a Stripe account — [stripe.com](https://stripe.com))
4. Set pricing:
   - **Monthly:** $15/month
   - **Annual:** $150/year (save $30 — optional, good for cash flow)
5. Set free tier:
   - Access to: 1 issue per month (use "paywalled posts" feature — see Step 7)
6. Write your upgrade page description:

```
Pro subscribers get:
• Every issue, every week
• Full archive (12+ back issues)
• ROI calculator spreadsheet template
• Implementation checklists
• Cancel any time

Free subscribers get one issue per month.
```

---

## Step 4: Connect Custom Domain (Optional, 2 minutes)

Initially: your newsletter lives at `theoperatorsbrief.beehiiv.com`

When ready to upgrade: go to **Settings → Custom Domain**
- Add: `theoperatorsbrief.com` (buy from Namecheap/Cloudflare for ~$12/year)
- Follow Beehiiv's DNS configuration instructions (3 DNS records to add)
- Propagation takes 15-60 minutes

Until then, use the beehiiv subdomain. It works fine for early growth.

---

## Step 5: Import the 12 Pre-Written Issues (5 minutes)

The 12 issues are written and saved as JSON in `/content/issues/`. You need to create them in Beehiiv manually (no bulk JSON import — Beehiiv's editor is web-based).

For each issue, go to **Create → New Post**:

**Issue creation workflow:**
1. Title: Copy from `issue-XX.json` → `"title"` field
2. Subtitle: Copy from `"summary"` field
3. Body: Format the issue using the JSON content with these sections:
   - The Case Study
   - The Implementation Guide
   - The Numbers (use a table)
   - Tool Stack Used (bulleted list with costs)
   - What Failed First
   - The Takeaway

**Formatting tips:**
- Use Beehiiv's H2 for section headers
- Use their table block for The Numbers section
- Bold the key metrics
- Add a horizontal rule between sections

**Paywall placement:**
- Issues #02-12: Place the paywall after "The Numbers" section
- Free readers see the case study + numbers; paywalled content is the implementation guide + tool stack + what failed
- This is your most valuable content — it's the "how to replicate" material

**Set Issue #01 as fully free** — this is your sample issue and lead magnet.

**Schedule:**
- Issue #01: Publish immediately
- Issues #02-12: Schedule weekly, Tuesdays at 8am ET
- Use Beehiiv's scheduling feature on each post

---

## Step 6: Set Up Welcome Email Automation (3 minutes)

Go to **Automations → New Automation**

**Automation 1: Welcome sequence**
- Trigger: New subscriber
- Step 1 (Send immediately): Welcome email — content in `/content/emails/email-01-welcome.md`
- Step 2 (Wait 3 days → Send): Day 3 email — `/content/emails/email-02-day3.md`
- Step 3 (Wait 7 days → Send): Day 7 email — `/content/emails/email-03-day7.md`
- Step 4 (Wait 14 days → Send): Day 14 email — `/content/emails/email-04-day14.md`
- Step 5 (Wait 21 days → Send): Day 21 email — `/content/emails/email-05-day21.md`

To create each email in the automation: copy the content from the markdown files, removing the header metadata (Subject/Preview lines) — those go in the email subject and preview fields in Beehiiv.

**Automation 2: Upgrade confirmation**
- Trigger: Subscriber upgrades to paid
- Send immediately: "You're now a Pro subscriber" confirmation + link to full archive

---

## Step 7: Configure Free vs. Paid Content (2 minutes)

In Beehiiv, paid posts work with a "paywall" divider in the editor.

For each issue except #01:
1. Open the post in editor
2. After "The Numbers" section, click the `+` block button
3. Add a "Paywall" block
4. Free preview text: "Subscribe to Pro to get the full implementation guide, exact tool stack, what failed, and the step-by-step replication guide."
5. Button text: "Upgrade to Pro — $15/month"

This lets free subscribers read the case study and ROI numbers (enough to see the value) while paywalling the most actionable content (how to actually build it).

---

## Step 8: Set Up Referral Program (2 minutes)

Beehiiv has a built-in referral program.

Go to **Grow → Referral Program**:
- Enable referrals
- Reward at 3 referrals: "1 month of Pro free"
- Reward at 10 referrals: "3 months of Pro free"
- Add referral section to your email footer (Beehiiv does this automatically)

This turns your most engaged free subscribers into growth engines. Expect ~15-20% of subscribers to make at least 1 referral.

---

## Step 9: Landing Page Integration

Your Next.js landing page (in this repo) collects email + tier preference and saves to Supabase. To connect this to Beehiiv:

**Option A (Recommended): Beehiiv embed form**
Replace the Supabase form with Beehiiv's native embed form:
1. Go to **Grow → Subscribe Forms**
2. Create a custom form
3. Copy the embed code
4. Replace `SignupFormInline.tsx` with the Beehiiv embed

**Option B: API integration**
Use the Beehiiv API to create subscribers programmatically from your Next.js form:

```typescript
// In /app/api/subscribe/route.ts, add after Supabase save:
await fetch('https://api.beehiiv.com/v2/publications/YOUR_PUB_ID/subscriptions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.BEEHIIV_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: email,
    reactivate_existing: true,
    send_welcome_email: false, // we handle this in Beehiiv automations
    utm_source: 'landing_page',
  }),
});
```

Add to `.env.local`:
```
BEEHIIV_API_KEY=your_key_here
BEEHIIV_PUBLICATION_ID=your_pub_id_here
```

Find your API key: **Settings → API** in Beehiiv.

---

## Step 10: Launch Checklist

Before going live, verify:

- [ ] Publication name and description set
- [ ] Sender name and reply-to email configured
- [ ] Stripe connected and paid tier active at $15/month
- [ ] Issue #01 published (fully free)
- [ ] Issues #02-12 scheduled (with paywall at The Numbers section)
- [ ] Welcome email sequence active (5-email, 21-day sequence)
- [ ] Free vs. paid content tiers configured
- [ ] Referral program enabled
- [ ] Landing page form connected to Beehiiv
- [ ] Test: Subscribe with a test email, verify welcome email arrives, verify Issue #01 is accessible
- [ ] Test: Upgrade to paid with test Stripe card, verify access to full archive

---

## Key Metrics to Track (Weekly)

| Metric | Target | Where to Find |
|--------|--------|---------------|
| New subscribers/week | 50+ at launch | Beehiiv Dashboard |
| Open rate | 45%+ | Beehiiv Analytics |
| Click rate | 8%+ | Beehiiv Analytics |
| Free-to-paid conversion | 5-10% | Beehiiv Monetization |
| Churn rate (paid) | <3%/month | Beehiiv Monetization |
| MRR | Track weekly | Stripe Dashboard |

---

## Notes on Scaling

- Beehiiv's free plan handles up to 2,500 subscribers. After that, you need Scale ($99/month) or Grow ($42/month).
- At $15/month paid tier with 5% conversion on 2,500 subscribers, that's ~125 paid subscribers = $1,875/month. Well above any platform cost.
- When you hire a writer or editor, add them as a Beehiiv team member (Settings → Team).
- For programmatic issue publishing (using the generate-issue.ts script), use the Beehiiv API — the script is pre-built for this.
