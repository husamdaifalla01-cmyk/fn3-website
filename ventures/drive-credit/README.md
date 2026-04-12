# mintbrooks — drive-credit

Next.js 14 App Router site deployed on **Cloudflare Pages** via `@cloudflare/next-on-pages`.

## Dev

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

```bash
# Build for Cloudflare Pages
npx @cloudflare/next-on-pages

# Deploy via Wrangler
wrangler pages deploy .vercel/output/static --project-name=drive-credit
```

Or push to `main` — Cloudflare Pages auto-deploys on every push.

## Stack

- **Hosting:** Cloudflare Pages
- **Edge functions:** Cloudflare Workers (via next-on-pages)
- **Webhook handler:** Cloudflare Worker (`product_engine/webhook/`)
- **Email:** Resend
- **Payments:** Stripe (live mode)
- **DNS:** Cloudflare (mintbrooks.com)
