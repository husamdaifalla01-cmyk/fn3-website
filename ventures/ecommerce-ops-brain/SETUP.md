# E-commerce Ops Brain — Setup Guide

## Environment Variables

Copy `.env.local` and fill in the values:

```
NEXT_PUBLIC_SUPABASE_URL=https://cetrxwtmzrogbbrblkys.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=    # Supabase project anon key
ANTHROPIC_API_KEY=                 # sk-ant-...
STRIPE_SECRET_KEY=                 # sk_live_... or sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=             # whsec_...
STRIPE_LAUNCH_PRICE_ID=            # price_... for $199/month
STRIPE_SCALE_PRICE_ID=             # price_... for $399/month
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

## Supabase Setup

1. Go to https://supabase.com/dashboard/project/cetrxwtmzrogbbrblkys
2. Open SQL Editor
3. Run the full contents of `supabase/schema.sql`
4. Go to Settings > API to get your anon key
5. Enable Email Auth in Authentication > Providers

## Stripe Setup

1. Create two products in Stripe Dashboard:
   - **Launch**: $199/month recurring → copy Price ID to STRIPE_LAUNCH_PRICE_ID
   - **Scale**: $399/month recurring → copy Price ID to STRIPE_SCALE_PRICE_ID
2. Set up webhook endpoint: `https://yourdomain.com/api/stripe/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.deleted`
3. Copy webhook signing secret to STRIPE_WEBHOOK_SECRET

## Shopify Integration (Mock → Real)

The app currently uses mock data. To connect real Shopify stores:

### Step 1: Create Shopify Partner App
1. Go to https://partners.shopify.com
2. Create a new app
3. Set redirect URL: `https://yourdomain.com/api/shopify/callback`
4. Note your API Key and Secret

### Step 2: Add to .env.local
```
SHOPIFY_API_KEY=your_api_key
SHOPIFY_API_SECRET=your_api_secret
SHOPIFY_SCOPES=read_products,read_inventory,read_orders,read_customers
```

### Step 3: Add OAuth Flow
Create `app/api/shopify/install/route.ts`:
```typescript
export async function GET(req: Request) {
  const shop = new URL(req.url).searchParams.get('shop')
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/shopify/callback`
  const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${process.env.SHOPIFY_API_KEY}&scope=${process.env.SHOPIFY_SCOPES}&redirect_uri=${redirectUri}`
  return Response.redirect(installUrl)
}
```

### Step 4: Replace Mock Data
- `lib/mock-data.ts` functions → Replace with real Shopify API calls
- Products: `GET /admin/api/2024-01/products.json`
- Inventory: `GET /admin/api/2024-01/inventory_levels.json`
- Orders: `GET /admin/api/2024-01/orders.json`

## Running Locally

```bash
npm run dev
```

Open http://localhost:3000

## Deployment

Deploy to Vercel:
```bash
npx vercel --prod
```

Set all environment variables in Vercel dashboard under Project Settings > Environment Variables.

## Revenue Projections

| Month | Customers | MRR |
|-------|-----------|-----|
| 1     | 10        | $1,990 |
| 3     | 50        | $12,950 |
| 6     | 150       | $38,850 |
| 12    | 400       | $103,600 |

Launch target: 50 paying customers within 90 days.
