# Landing Page Template

This template contains only the main landing page components from the x402 landing project, excluding all dashboard/authentication functionality.

## What's Included

### Main Page
- `app/page.tsx` - Main landing page with hero, features, pricing, etc.
- `app/layout.tsx` - Root layout
- `app/globals.css` - Global styles

### Components
- `components/sections/` - Landing page sections (hero, cta, faq, items, logos, stats)
- `components/ui/` - UI components (badges, buttons, sections, etc.)
- `components/layout/` - Layout components (navbar, footer)
- `components/logos/` - Brand logo components

### Utilities
- `lib/utils.ts` - Utility functions
- `lib/use-live-data.ts` - Data hook (may need modification for your use case)
- `lib/changelogs.ts` - Changelog utilities

### Configuration
- `package.json` - Dependencies (you may want to remove auth/database deps)
- `tsconfig.json` - TypeScript config
- `next.config.ts` - Next.js config
- `components.json` - shadcn/ui config
- `eslint.config.mjs` - ESLint config
- `postcss.config.mjs` - PostCSS config
- `vercel.json` - Vercel deployment config

## Usage

1. Install dependencies:
   ```bash
   npm install
   ```

2. Remove unnecessary dependencies from package.json:
   - Remove Supabase packages
   - Remove auth packages
   - Remove database packages
   - Keep UI/component packages

3. Update `lib/use-live-data.ts` to return mock data or remove the dependency

4. Customize the content in `app/page.tsx` for your use case

5. Run development server:
   ```bash
   npm run dev
   ```

## Notes

- This template focuses only on the landing page presentation layer
- You'll need to remove/modify any dependencies on authentication or backend services
- The `use-live-data` hook may need to be replaced with static data or your own data source
- All dashboard-related components and routes have been excluded