# FN3 Ventures — Deployment Guide

## Quick Deploy All Sites to Vercel

Run from /Users/husamahmed/FN3/ventures/:

```bash
# Deploy each Next.js venture
for dir in fn3-agency ai-tools-compass operators-brief lexikit propertymind agency-ai-os compliance-ai invoice-flow ecommerce-ops-brain; do
  echo "Deploying $dir..."
  cd /Users/husamahmed/FN3/ventures/$dir
  npx vercel --yes --prod 2>&1 | tail -5
  cd ..
done
```

## Environment Variables to Set in Vercel

For each project, set these in the Vercel dashboard or via CLI:

```bash
# Replace values with your actual keys
NEXT_PUBLIC_SUPABASE_URL=https://cetrxwtmzrogbbrblkys.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_anon_key>
ANTHROPIC_API_KEY=<your_anthropic_key>
STRIPE_SECRET_KEY=<your_stripe_secret>
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<your_stripe_publishable>
```

Set via CLI (run for each venture directory):
```bash
vercel env add ANTHROPIC_API_KEY production
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add STRIPE_SECRET_KEY production
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production
```

## Gumroad Digital Products

1. Set your Gumroad access token:
```bash
cd /Users/husamahmed/FN3/ventures/gumroad-empire
cp .env.example .env
# Edit .env and add your GUMROAD_ACCESS_TOKEN
```

2. Build all PDFs:
```bash
npm run build-pdfs
```

3. Publish to Gumroad:
```bash
npm run publish
```

Products and their Gumroad URLs will be saved to `output/gumroad-products.json`.

## Profession Command Centers (additional Gumroad products)

These live at `/ventures/profession-command-centers/products/` and need to be
added to the gumroad-empire pipeline. See that venture's README.md for instructions.

## Job Runner (FN3 Orchestrator)

```bash
cd /Users/husamahmed/FN3/orchestrator

# Single worker (development)
npm run worker

# Production pool (5 workers)
npm run workers

# Custom worker count
npx tsx src/spawn-workers.ts 10
```

Required env vars for orchestrator (.env file):
```
SUPABASE_URL=https://cetrxwtmzrogbbrblkys.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<your_service_role_key>
ANTHROPIC_API_KEY=<your_anthropic_key>
```

## Account Setup Checklist

- [ ] Gumroad: Create account at gumroad.com, get API token from Settings > Advanced
- [ ] Stripe: Create account at stripe.com, get API keys from Dashboard > Developers
- [ ] Vercel: `npm i -g vercel` then `vercel login`
- [ ] Anthropic: Get API key from console.anthropic.com
- [ ] Supabase: Already configured at cetrxwtmzrogbbrblkys.supabase.co
