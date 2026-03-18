# FN3 Main Company & Niche Landing Pages

A Figma-level, programmatically generated landing page system for FlowNexis3 and its AI-powered vertical solutions.

## 🎯 Project Overview

This is a dual-purpose website system:

1. **Main FN3 Company Page** - Showcasing FlowNexis3 as a "Platform of Platforms" holding company
2. **Programmatic Niche Pages** - Automatically generated landing pages for each AI automation vertical

## 🏗️ Architecture

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS 4 + shadcn/ui components
- **Animations**: Framer Motion for professional-grade interactions
- **Type Safety**: Full TypeScript with strict mode
- **Performance**: Optimized for Core Web Vitals

## 🎨 Design System

Inspired by professional sites like React.dev and shadcn/ui:

- **Clean, modular component architecture**
- **Consistent design tokens and color system**
- **Professional typography and spacing**
- **Subtle animations that enhance UX**
- **Mobile-first responsive design**

## 🚀 Niche Verticals

Programmatically generated landing pages for:

1. **DENTAL** (`/dental`) - The Chair-Time Recovery Engine
2. **WEALTH** (`/wealth`) - The Advisor Liberation System
3. **LAW** (`/law`) - The Matter Velocity Accelerator
4. **CLINICS** (`/clinics`) - The Patient Flow Optimizer
5. **TRADES** (`/trades`) - The Parts & Labor Profit Protector

Each niche page includes:
- Industry-specific hero section with metrics
- Pain points vs. AI solutions comparison
- Tailored testimonials and CTAs
- Custom color schemes and iconography

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Type check
npm run typecheck
```

## 📁 Project Structure

```
fn3-main/
├── app/
│   ├── [niche]/          # Dynamic niche pages
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Main FN3 homepage
│   └── globals.css       # Global styles
├── components/
│   ├── ui/               # Reusable UI components
│   ├── hero-section.tsx  # Main homepage hero
│   ├── portfolio-section.tsx
│   ├── architecture-section.tsx
│   ├── niche-hero.tsx    # Niche page hero
│   └── pain-points-section.tsx
├── lib/
│   ├── niches.ts         # Niche data configuration
│   └── utils.ts          # Utility functions
└── README.md
```

## 🎨 Design Principles

- **Logic + Magic**: Technical sophistication with emotional appeal
- **AI-First**: Showcase intelligent automation capabilities
- **Business Results**: Focus on measurable outcomes and ROI
- **Professional Trust**: Enterprise-grade design and messaging

## 🔧 Customization

### Adding New Niches

1. Add niche data to `lib/niches.ts`
2. Pages are automatically generated via dynamic routing
3. Customize colors, icons, and messaging per vertical

### Styling

- Tailwind configuration in `tailwind.config.js`
- Design tokens and custom utilities in `globals.css`
- Component-specific styles using Tailwind classes

## 🚀 Deployment

Built for static export and optimized for:

- Vercel (recommended)
- Netlify
- Any static hosting provider

The site uses Next.js static generation for optimal performance and SEO.

---

Built with ❤️ for the AI era by FlowNexis3