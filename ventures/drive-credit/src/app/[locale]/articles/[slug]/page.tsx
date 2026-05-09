import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ArticleNewsletter from './ArticleNewsletter'
import ArticleSidebar from './ArticleSidebar'
import ArticleConversionBody from '@/components/cpa/ArticleConversionBody'
import AuthorBox from '@/components/cpa/AuthorBox'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import { getProducts, getProductsByCategory } from '@/lib/lifestyle/products'

// ─── Article Data ─────────────────────────────────────────────────────────────

type Article = {
  title: string
  slug: string
  readTime: string
  category: string
  categorySlug: string
  bg: string
  accent: string
  image: string
  date: string
  excerpt?: string
}

const ALL_ARTICLES: Article[] = [
  // Home & Decor
  { title: 'The 7 things that actually make a bedroom feel expensive', slug: 'bedroom-feel-expensive', readTime: '4 min', category: 'Home & Decor', categorySlug: 'home-decor', bg: '#EEF3F1', accent: '#2C4A3E', image: '/home-decor.jpg', date: 'March 18, 2026' },
  { title: 'Aesthetic shelf decor: the 3-2-1 rule designers use', slug: 'shelf-decor-321-rule', readTime: '4 min', category: 'Home & Decor', categorySlug: 'home-decor', bg: '#EEF3F1', accent: '#2C4A3E', image: '/home-decor.jpg', date: 'March 12, 2026' },
  { title: 'Linen vs cotton bedding: which is worth it?', slug: 'linen-vs-cotton-bedding', readTime: '5 min', category: 'Home & Decor', categorySlug: 'home-decor', bg: '#EEF3F1', accent: '#2C4A3E', image: '/home-decor.jpg', date: 'March 5, 2026' },
  { title: 'How to style a coffee table like an interior designer', slug: 'coffee-table-styling', readTime: '3 min', category: 'Home & Decor', categorySlug: 'home-decor', bg: '#EEF3F1', accent: '#2C4A3E', image: '/home-decor.jpg', date: 'February 28, 2026' },
  { title: 'The best affordable art prints that look high-end', slug: 'affordable-art-prints', readTime: '6 min', category: 'Home & Decor', categorySlug: 'home-decor', bg: '#EEF3F1', accent: '#2C4A3E', image: '/editorial.jpg', date: 'February 20, 2026' },
  { title: 'Organic cotton throw blankets we actually tested', slug: 'cotton-throw-blankets', readTime: '4 min', category: 'Home & Decor', categorySlug: 'home-decor', bg: '#EEF3F1', accent: '#2C4A3E', image: '/home-decor.jpg', date: 'February 14, 2026' },

  // Wellness
  { title: 'The candle warmer lamp that changed my evening routine', slug: 'candle-warmer-lamp', readTime: '3 min', category: 'Wellness', categorySlug: 'wellness', bg: '#F5EDE5', accent: '#7B5E4A', image: '/wellness.jpg', date: 'March 22, 2026' },
  { title: '5 morning rituals that take under 10 minutes', slug: 'morning-rituals', readTime: '5 min', category: 'Wellness', categorySlug: 'wellness', bg: '#F5EDE5', accent: '#7B5E4A', image: '/wellness.jpg', date: 'March 15, 2026' },
  { title: 'Weighted blankets: who actually needs one?', slug: 'weighted-blankets-guide', readTime: '6 min', category: 'Wellness', categorySlug: 'wellness', bg: '#F5EDE5', accent: '#7B5E4A', image: '/wellness.jpg', date: 'March 8, 2026' },
  { title: 'The diffuser oil combinations worth trying', slug: 'diffuser-oil-combinations', readTime: '4 min', category: 'Wellness', categorySlug: 'wellness', bg: '#F5EDE5', accent: '#7B5E4A', image: '/wellness.jpg', date: 'February 29, 2026' },
  { title: 'Why your sleep routine matters more than supplements', slug: 'sleep-routine-vs-supplements', readTime: '7 min', category: 'Wellness', categorySlug: 'wellness', bg: '#F5EDE5', accent: '#7B5E4A', image: '/wellness.jpg', date: 'February 22, 2026' },
  { title: 'An honest review of the Hatch alarm clock', slug: 'hatch-alarm-clock-review', readTime: '5 min', category: 'Wellness', categorySlug: 'wellness', bg: '#F5EDE5', accent: '#7B5E4A', image: '/wellness.jpg', date: 'February 15, 2026' },

  // Beauty
  { title: 'Glass skin routine: the Korean steps worth adding', slug: 'glass-skin-routine', readTime: '7 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 1, 2026' },
  { title: 'Is a vitamin C serum actually worth it? We tested 6.', slug: 'vitamin-c-serum-review', readTime: '6 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'March 25, 2026' },
  { title: 'The retinol mistake almost everyone makes', slug: 'retinol-mistakes', readTime: '5 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'March 18, 2026' },
  { title: 'SPF in your moisturizer vs. a separate sunscreen', slug: 'spf-moisturizer-vs-sunscreen', readTime: '4 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'March 10, 2026' },
  { title: 'Clean beauty: what the label actually means', slug: 'clean-beauty-explained', readTime: '6 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'March 3, 2026' },
  { title: 'The 5-step skincare routine for sensitive skin', slug: 'skincare-routine-sensitive-skin', readTime: '5 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'February 24, 2026' },

  // Kitchen
  { title: 'Coffee bar setup: looks like $2,000 (costs $200)', slug: 'coffee-bar-setup', readTime: '5 min', category: 'Kitchen', categorySlug: 'kitchen', bg: '#EDF2E5', accent: '#4A5E2C', image: '/kitchen.jpg', date: 'March 28, 2026' },
  { title: 'The cast iron skillet guide', slug: 'cast-iron-skillet-guide', readTime: '6 min', category: 'Kitchen', categorySlug: 'kitchen', bg: '#EDF2E5', accent: '#4A5E2C', image: '/kitchen.jpg', date: 'March 21, 2026' },
  { title: 'Aesthetic kitchen organization', slug: 'kitchen-organization', readTime: '4 min', category: 'Kitchen', categorySlug: 'kitchen', bg: '#EDF2E5', accent: '#4A5E2C', image: '/kitchen.jpg', date: 'March 14, 2026' },
  { title: 'The only knife you actually need', slug: 'kitchen-knives-guide', readTime: '5 min', category: 'Kitchen', categorySlug: 'kitchen', bg: '#EDF2E5', accent: '#4A5E2C', image: '/kitchen.jpg', date: 'March 7, 2026' },
  { title: 'Pour-over vs. French press: honest comparison', slug: 'pour-over-vs-french-press', readTime: '4 min', category: 'Kitchen', categorySlug: 'kitchen', bg: '#EDF2E5', accent: '#4A5E2C', image: '/kitchen.jpg', date: 'February 28, 2026' },
  { title: "Meal prep containers that don't look depressing", slug: 'meal-prep-containers', readTime: '3 min', category: 'Kitchen', categorySlug: 'kitchen', bg: '#EDF2E5', accent: '#4A5E2C', image: '/kitchen.jpg', date: 'February 20, 2026' },

  // Beauty — Affiliate
  { title: 'Best Anti-Aging Serums for Every Skin Concern & Budget', slug: 'best-anti-aging-serum', readTime: '9 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 6, 2026' },
  { title: 'Best Anti-Aging Serums for Beginners & Beyond Under $100', slug: 'best-anti-aging-serum-beginners-budget', readTime: '8 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 7, 2026' },
  { title: 'The Best Serums for Dark Spots and Hyperpigmentation', slug: 'best-serum-for-dark-spots', readTime: '9 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 7, 2026' },
  { title: 'La Roche-Posay Vitamin C vs. Retinol: Which Is Best for You?', slug: 'la-roche-posay-vitamin-c-vs-retinol', readTime: '8 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 7, 2026' },
  { title: 'The Best Clean Liquid Foundations for a Healthy Glow (Under $40)', slug: 'best-clean-liquid-foundation', readTime: '8 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 7, 2026' },
  { title: 'Top Clean Foundations for Beginners: Effortless Beauty', slug: 'clean-foundation-for-beginners', readTime: '7 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 7, 2026' },
  { title: 'Harvest Natural Beauty vs. Jerome Alexander: Clean Foundation', slug: 'harvest-natural-beauty-vs-jerome-alexander-foundation-beginners', readTime: '8 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 7, 2026' },
  { title: 'The Best Neutral Eyeshadow Palettes for Your Everyday Look', slug: 'best-neutral-eyeshadow-palette', readTime: '9 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 7, 2026' },
  { title: 'Top Eyeshadow Palettes Under $50: Pro Quality, Budget Friendly', slug: 'best-eyeshadow-palette-under-50', readTime: '8 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 7, 2026' },
  { title: 'Too Faced Born This Way vs. Tarte Tartelette In Bloom', slug: 'too-faced-born-this-way-vs-tarte-tartelette-in-bloom', readTime: '8 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 7, 2026' },
  { title: 'Best Bonding Oils for Damaged Hair: Olaplex No. 7 Review', slug: 'best-hair-bonding-oil-olaplex-7-review', readTime: '9 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 7, 2026' },
  { title: 'Glass Hair Showdown: Kerastase Gloss Absolu vs. Kenra Platinum', slug: 'kerastase-kenra-glass-hair-showdown', readTime: '8 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 7, 2026' },
  { title: 'Kerastase Nutritive 8H Magic Night Serum: Honest Review', slug: 'kerastase-nutritive-8h-magic-night-serum-review', readTime: '8 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 7, 2026' },

  // Home & Decor — Affiliate
  { title: 'Best Linen Duvet Cover Sets: Luxury vs. Budget Options', slug: 'best-linen-duvet-cover-sets-luxury-budget', readTime: '8 min', category: 'Home & Decor', categorySlug: 'home-decor', bg: '#EEF3F1', accent: '#2C4A3E', image: '/home-decor.jpg', date: 'April 7, 2026' },
  { title: 'Top Chunky Knit Throw Blankets Under $50 for a Cozier Home', slug: 'best-chunky-knit-throw-blanket-under-50', readTime: '7 min', category: 'Home & Decor', categorySlug: 'home-decor', bg: '#EEF3F1', accent: '#2C4A3E', image: '/home-decor.jpg', date: 'April 7, 2026' },
  { title: 'The Best Waffle Duvet Covers for an Aesthetic Queen Bedroom', slug: 'best-waffle-duvet-cover-queen', readTime: '8 min', category: 'Home & Decor', categorySlug: 'home-decor', bg: '#EEF3F1', accent: '#2C4A3E', image: '/home-decor.jpg', date: 'April 7, 2026' },
  { title: 'Best Drip Irrigation Kits for Smart Garden Watering', slug: 'best-drip-irrigation-kits', readTime: '8 min', category: 'Home & Decor', categorySlug: 'home-decor', bg: '#EEF3F1', accent: '#2C4A3E', image: '/home-decor.jpg', date: 'April 7, 2026' },
  { title: 'Best Drip Irrigation Systems for Every Garden & Skill Level', slug: 'best-drip-irrigation-system', readTime: '8 min', category: 'Home & Decor', categorySlug: 'home-decor', bg: '#EEF3F1', accent: '#2C4A3E', image: '/home-decor.jpg', date: 'April 7, 2026' },
  { title: 'Top Garden Tool Sets for Women: Ideal Gifts for the Female Gardener', slug: 'best-garden-tool-set-for-women-gifts', readTime: '7 min', category: 'Home & Decor', categorySlug: 'home-decor', bg: '#EEF3F1', accent: '#2C4A3E', image: '/home-decor.jpg', date: 'April 7, 2026' },
  { title: 'Best Garden Tool Sets for Women: Gifts & Budget Buys', slug: 'best-garden-tool-sets-for-women', readTime: '7 min', category: 'Home & Decor', categorySlug: 'home-decor', bg: '#EEF3F1', accent: '#2C4A3E', image: '/home-decor.jpg', date: 'April 7, 2026' },
  { title: 'Drip Irrigation Kit Comparison: Find Your Perfect System', slug: 'drip-irrigation-kit-comparison', readTime: '8 min', category: 'Home & Decor', categorySlug: 'home-decor', bg: '#EEF3F1', accent: '#2C4A3E', image: '/home-decor.jpg', date: 'April 7, 2026' },

  // Kitchen — Affiliate
  { title: 'The Best Sous Vide Machines for Every Home Cook: Beginner to Pro', slug: 'best-sous-vide-machine-review', readTime: '9 min', category: 'Kitchen', categorySlug: 'kitchen', bg: '#EDF2E5', accent: '#4A5E2C', image: '/kitchen.jpg', date: 'April 7, 2026' },
  { title: 'Tiny Kitchen, Big Flavor: Best Compact Air Fryers for Small Spaces', slug: 'best-air-fryer-small-spaces', readTime: '8 min', category: 'Kitchen', categorySlug: 'kitchen', bg: '#EDF2E5', accent: '#4A5E2C', image: '/kitchen.jpg', date: 'April 7, 2026' },
  { title: 'Mastering Big Batches: Sous Vide Accessories for Large Meals', slug: 'sous-vide-accessories-large-batches', readTime: '8 min', category: 'Kitchen', categorySlug: 'kitchen', bg: '#EDF2E5', accent: '#4A5E2C', image: '/kitchen.jpg', date: 'April 7, 2026' },

  // Wellness — Affiliate
  { title: 'The Best Self-Care Gift Baskets for Women for Every Occasion', slug: 'best-self-care-gift-baskets-women', readTime: '8 min', category: 'Wellness', categorySlug: 'wellness', bg: '#F5EDE5', accent: '#7B5E4A', image: '/wellness.jpg', date: 'April 7, 2026' },
  { title: 'Best Birthday Gifts for Women Under $40: Thoughtful & Pampering', slug: 'best-birthday-gifts-women-under-40', readTime: '7 min', category: 'Wellness', categorySlug: 'wellness', bg: '#F5EDE5', accent: '#7B5E4A', image: '/wellness.jpg', date: 'April 7, 2026' },
  { title: 'Vintage Charm: Best Self-Care Gift Basket for an Aesthetic Touch', slug: 'best-vintage-self-care-gift-basket', readTime: '7 min', category: 'Wellness', categorySlug: 'wellness', bg: '#F5EDE5', accent: '#7B5E4A', image: '/wellness.jpg', date: 'April 7, 2026' },
  { title: 'Top Get Well Soon Gift Baskets for Speedy Recovery & Comfort', slug: 'best-get-well-soon-gift-baskets', readTime: '8 min', category: 'Wellness', categorySlug: 'wellness', bg: '#F5EDE5', accent: '#7B5E4A', image: '/wellness.jpg', date: 'April 7, 2026' },

  // Finance
  { title: 'What is a credit score and why does it actually matter?', slug: 'what-is-credit-score', readTime: '5 min', category: 'Finance', categorySlug: 'finance', bg: '#EEF3F1', accent: '#1D3A2F', image: '/bridge.jpg', date: 'April 2, 2026' },
  { title: 'The fastest ways to build credit from scratch', slug: 'build-credit-from-scratch', readTime: '6 min', category: 'Finance', categorySlug: 'finance', bg: '#EEF3F1', accent: '#1D3A2F', image: '/finance.jpg', date: 'March 26, 2026' },
  { title: 'How to use a credit card without going into debt', slug: 'use-credit-card-responsibly', readTime: '4 min', category: 'Finance', categorySlug: 'finance', bg: '#EEF3F1', accent: '#1D3A2F', image: '/finance.jpg', date: 'March 19, 2026' },
  { title: 'Secured vs. unsecured credit cards', slug: 'secured-vs-unsecured-cards', readTime: '5 min', category: 'Finance', categorySlug: 'finance', bg: '#EEF3F1', accent: '#1D3A2F', image: '/finance.jpg', date: 'March 12, 2026' },
  { title: 'Why credit utilization matters more than payment history', slug: 'credit-utilization-explained', readTime: '4 min', category: 'Finance', categorySlug: 'finance', bg: '#EEF3F1', accent: '#1D3A2F', image: '/finance.jpg', date: 'March 5, 2026' },
  { title: 'Building credit with bad credit', slug: 'build-credit-bad-credit', readTime: '6 min', category: 'Finance', categorySlug: 'finance', bg: '#EEF3F1', accent: '#1D3A2F', image: '/finance.jpg', date: 'February 27, 2026' },
  { title: 'How I actually test affiliate products (and what gets cut)', slug: 'how-we-test-affiliate-products', readTime: '6 min', category: 'Finance', categorySlug: 'finance', bg: '#EEF3F1', accent: '#1D3A2F', image: '/editorial.jpg', date: 'May 9, 2026', excerpt: 'Every product on Mintbrooks goes through a real evaluation before we link to it. Here is the full process — what we check, what fails, and why we publish fewer recommendations than most sites.' },

  { title: 'Best Hair Shine Sprays 2024: Get Mirror-Like Gloss', slug: 'best-hair-shine-spray', readTime: '5 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 12, 2026', excerpt: 'Searching for the best hair shine spray to achieve mirror-like gloss without breaking the bank? Our 2024 guide helps you find the perfect glossing spray for luminous hair.' },

  { title: 'Best Niacinamide Serums for Pores & Skin Tone in 2024', slug: 'best-niacinamide-serum-pores-skin-tone', readTime: '6 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 12, 2026', excerpt: 'Struggling with enlarged pores or uneven skin tone? Discover the best niacinamide serum for you, including our top pick, Paula\'s Choice CLINICAL 20% Niacinamide.' },

  { title: 'Best Sous Vide Containers of 2024: Top Picks for Perfect Cooking', slug: 'best-sous-vide-container', readTime: '7 min', category: 'Kitchen', categorySlug: 'kitchen', bg: '#EDF2E5', accent: '#4A5E2C', image: '/kitchen.jpg', date: 'April 12, 2026', excerpt: 'Discover the best sous vide containers of 2024, including our top 26QT pick for large batch cooking. Achieve perfect results every time with Mintbrooks.' },

  { title: 'Best Duvet Covers of 2024: Top Picks for Comfort & Style', slug: 'best-duvet-covers', readTime: '6 min', category: 'Home & Decor', categorySlug: 'home-decor', bg: '#EEF3F1', accent: '#2C4A3E', image: '/home-decor.jpg', date: 'April 12, 2026', excerpt: 'Transform your bedroom with the best duvet covers of 2024. Our guide helps you find top-rated, comfortable, and stylish options, including the Bedsure Waffle Duvet Cover.' },

  { title: 'Best Eyeshadow Palettes 2024: Top Picks for Every Look', slug: 'best-eyeshadow-palettes', readTime: '8 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 12, 2026', excerpt: 'Discover the best eyeshadow palettes of 2024, including top-rated options for beginners and professional quality alternatives. Find your perfect look with Mintbrooks\' curated picks.' },

  { title: 'Best Clean Beauty Foundations for Flawless Skin (2024)', slug: 'best-clean-beauty-foundation', readTime: '6 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 12, 2026', excerpt: 'Discover the best clean beauty foundations for a flawless, natural look in 2024. Our top pick is Clinique Even Better Makeup for its skin-evening benefits.' },

  { title: 'Best Drip Irrigation Systems of 2024: Top Picks for Every Garden', slug: 'best-drip-irrigation-systems', readTime: '8 min', category: 'Home & Decor', categorySlug: 'home-decor', bg: '#EEF3F1', accent: '#2C4A3E', image: '/home-decor.jpg', date: 'April 12, 2026', excerpt: 'Discover the best drip irrigation system for your garden in 2024. Our guide helps you choose the top-rated kits for efficient, customizable watering.' },

  { title: 'Best Get Well Soon Gifts 2024: Thoughtful Care Packages', slug: 'best-get-well-soon-gifts', readTime: '7 min', category: 'Wellness', categorySlug: 'wellness', bg: '#F5EDE5', accent: '#7B5E4A', image: '/wellness.jpg', date: 'April 12, 2026', excerpt: 'Searching for the best get well soon gifts? Discover thoughtful care packages and our top pick for ultimate comfort to help a loved one recover in 2024.' },

  { title: 'Anova Nano vs Inkbird ISV-100W: Which Sous Vide is Right for You?', slug: 'anova-nano-vs-inkbird-isv-100w-sous-vide-comparison', readTime: '10 min', category: 'Kitchen', categorySlug: 'kitchen', bg: '#EDF2E5', accent: '#4A5E2C', image: '/kitchen.jpg', date: 'April 7, 2026', excerpt: 'Choosing between Anova Nano and Inkbird ISV-100W? Our detailed comparison helps beginners and serious home cooks find the best sous vide cooker for their kitchen.' },

  { title: 'Best Anti-Aging Serums of 2024: Retinol, Vitamin C & Luxury Picks', slug: 'best-anti-aging-serums-2024', readTime: '12 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 6, 2026', excerpt: 'Discover the best anti-aging serum of 2024 for your needs, from beginner-friendly retinol to luxury treatments for fine lines and wrinkles. Honest reviews by Mintbrooks.' },

  { title: 'Best Birthday Self-Care Packages for Women: Thoughtful & Relaxing Gifts', slug: 'best-birthday-self-care-packages-women', readTime: '11 min', category: 'Wellness', categorySlug: 'wellness', bg: '#F5EDE5', accent: '#7B5E4A', image: '/wellness.jpg', date: 'April 7, 2026', excerpt: 'Discover the best birthday self-care packages for women, featuring thoughtful and relaxing gifts tested by real buyers. Find the perfect self-care gift set for her under $50.' },

  { title: 'Best Budget Drip Irrigation Kits: Affordable Garden Watering', slug: 'best-budget-drip-irrigation-kits', readTime: '10 min', category: 'Home & Decor', categorySlug: 'home-decor', bg: '#EEF3F1', accent: '#2C4A3E', image: '/home-decor.jpg', date: 'April 7, 2026', excerpt: 'Looking for an effective drip irrigation kit under $60? Discover Mintbrooks\' top-tested affordable watering systems for your garden, ensuring efficiency without breaking the bank.' },

  { title: 'Best Budget-Friendly Eyeshadow Palettes Under $50', slug: 'best-budget-friendly-eyeshadow-palettes-under-50', readTime: '13 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 7, 2026', excerpt: 'Discover the best affordable eyeshadow palette options under $50. Our editors tested top drugstore and budget-friendly picks for quality, pigment, and value.' },

  { title: 'Top Clean Beauty Finds Under $35: Foundations & Body Care Gifts', slug: 'best-clean-beauty-products-under-35', readTime: '11 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 7, 2026', excerpt: 'Discover the best clean beauty products under $35! Our expert team tested affordable clean foundations and luxurious body care gifts for budget-friendly finds.' },

  { title: 'Best Compact & Budget Air Fryers for Small Kitchens Under $50', slug: 'best-compact-budget-air-fryer-small-kitchen', readTime: '11 min', category: 'Kitchen', categorySlug: 'kitchen', bg: '#EDF2E5', accent: '#4A5E2C', image: '/kitchen.jpg', date: 'April 7, 2026', excerpt: 'Struggling with a tiny kitchen? Discover our top picks for the best compact and budget-friendly air fryers under $50, perfect for apartments, dorms, and single users. Get honest reviews and find the right fit for your space.' },

  { title: 'Top Neutral Eyeshadow Palettes for Effortless Everyday Looks', slug: 'best-everyday-eyeshadow-palette', readTime: '11 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 7, 2026', excerpt: 'Find the best everyday eyeshadow palette for natural, work-appropriate looks. Our team tested top neutral palettes from Too Faced, Tarte, and ColourPop.' },

  { title: 'Top Garden Tool Sets for Women: Gifts & Practical Picks', slug: 'best-garden-tool-set-for-women', readTime: '11 min', category: 'Home & Decor', categorySlug: 'home-decor', bg: '#EEF3F1', accent: '#2C4A3E', image: '/home-decor.jpg', date: 'April 7, 2026', excerpt: 'Discover the best garden tool sets for women, from ergonomic pink tools to comprehensive kits. Find the perfect gift or practical pick for any female gardener.' },

  { title: 'Top Self-Care Gift Baskets for a Speedy Recovery', slug: 'best-get-well-soon-gift-basket', readTime: '10 min', category: 'Wellness', categorySlug: 'wellness', bg: '#F5EDE5', accent: '#7B5E4A', image: '/wellness.jpg', date: 'April 7, 2026', excerpt: 'Discover the best get well soon gift baskets for adults to show you care. Our editorial team tested top self-care packages for a speedy recovery.' },

  { title: 'Best Hair Gloss for Glass Hair: Achieve High-Shine at Home', slug: 'best-hair-gloss-glass-hair-trend', readTime: '8 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 7, 2026', excerpt: 'Discover the best hair gloss for glass hair, from editor-loved Kerastase to budget-friendly options. Get high-shine, frizz-free results at home.' },

  { title: 'The Best Large Sous Vide Containers & Setups for Family Meals', slug: 'best-large-sous-vide-container-family-meal-prep', readTime: '11 min', category: 'Kitchen', categorySlug: 'kitchen', bg: '#EDF2E5', accent: '#4A5E2C', image: '/kitchen.jpg', date: 'April 7, 2026', excerpt: 'Find the best sous vide container for large batches, family meals, and meal prep. Our editors review top sous vide water baths and circulators for big cooks.' },

  { title: 'Best Linen Duvet Covers & Bedding Sets for Luxurious Sleep (2024)', slug: 'best-linen-bedding-sets', readTime: '7 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 7, 2026', excerpt: 'Discover the best linen duvet cover and bedding sets for a luxurious, comfortable sleep in 2024. Our guide covers top picks for overall value, budget, and hot sleepers.' },

  { title: 'Top Premium Hair Treatments Under $40: Luxury for Less', slug: 'best-luxury-hair-products-under-40', readTime: '10 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 7, 2026', excerpt: 'Discover the best luxury hair products under $40, including premium hair oils and top hair serums for shine, tested by our Editorial Team.' },

  { title: 'Best Serums for Dark Spots, Brightening & Enlarged Pores (2024)', slug: 'best-serums-dark-spots-brightening-enlarged-pores-2024', readTime: '11 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 6, 2026', excerpt: 'Discover the best serum for dark spots and hyperpigmentation, plus top picks for brightening dull skin and minimizing enlarged pores in our 2024 guide.' },

  { title: 'Best Skincare Serums Under $50: Affordable Options for Every Concern', slug: 'best-skincare-serums-under-50', readTime: '10 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 6, 2026', excerpt: 'Discover the best skincare serums under $50 that actually work for anti-aging, brightening, and dark spots. Find your perfect affordable serum today.' },

  { title: 'Best Vintage-Aesthetic Self-Care Gift Baskets for Unique Tastes', slug: 'best-vintage-self-care-gift-baskets', readTime: '12 min', category: 'Wellness', categorySlug: 'wellness', bg: '#F5EDE5', accent: '#7B5E4A', image: '/wellness.jpg', date: 'April 7, 2026', excerpt: 'Discover the best vintage self care gift basket options for unique tastes. Our guide helps you find aesthetic gift basket ideas and retro self care gifts under $40.' },

  { title: 'Top Waffle Duvet Covers for a Modern Queen Bedroom Aesthetic', slug: 'best-waffle-duvet-cover-queen-aesthetic', readTime: '10 min', category: 'Home & Decor', categorySlug: 'home-decor', bg: '#EEF3F1', accent: '#2C4A3E', image: '/home-decor.jpg', date: 'April 7, 2026', excerpt: 'Elevate your bedroom with the best waffle duvet cover queen size. Discover top picks for a modern aesthetic and year-round comfort, tested by real buyers.' },

  { title: 'Best Anti-Aging Serums for Beginners: Gentle & Effective Options', slug: 'best-anti-aging-serums-for-beginners', readTime: '11 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 6, 2026', excerpt: 'Starting your anti-aging journey? Discover the best anti-aging serums for beginners, including gentle retinol options and vitamin C, to achieve smoother, brighter skin without irritation.' },

  { title: 'The 5 Best Clean Beauty Foundations for Beginners: Easy & Natural Looks', slug: 'best-clean-beauty-foundation-for-beginners', readTime: '9 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 6, 2026', excerpt: 'Starting with clean beauty? Discover the best clean beauty foundation for beginners, offering easy application and natural looks for new users.' },

  { title: 'The Ultimate Guide to Clean Beauty Gifts Under $50', slug: 'best-clean-beauty-gifts-under-50-travel-luxury', readTime: '11 min', category: 'Wellness', categorySlug: 'wellness', bg: '#F5EDE5', accent: '#7B5E4A', image: '/wellness.jpg', date: 'April 7, 2026', excerpt: 'Discover the best clean beauty gifts under $50, perfect for luxury travel or thoughtful presents. Mintbrooks reviews top natural beauty gift sets.' },

  { title: 'Best Dark Spot Corrector Serums Under $50 for Hyperpigmentation', slug: 'best-dark-spot-corrector-serum-under-50', readTime: '9 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 6, 2026', excerpt: 'Discover the best dark spot corrector serums under $50 to tackle hyperpigmentation and uneven skin tone without overspending. Featuring La Roche-Posay Mela B3.' },

  { title: 'Top 5 Eyeshadow Palettes Under $30: Affordable Quality', slug: 'best-eyeshadow-palette-under-30', readTime: '10 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 7, 2026', excerpt: 'Discover the best eyeshadow palettes under $30 that deliver high-quality, pigmented looks without breaking the bank. Find your next affordable favorite.' },

  { title: 'Clean Beauty Foundation Face-Off: Harvest Natural Beauty vs. Jerome Alexander', slug: 'clean-beauty-foundation-comparison-harvest-natural-beauty-jerome-alexander-clinique-bareminerals', readTime: '9 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 6, 2026', excerpt: 'Comparing Harvest Natural Beauty, Jerome Alexander, Clinique, and bareMinerals to find your ideal clean beauty foundation, whether you need full coverage or an everyday option.' },

  { title: 'Vitamin C vs. Niacinamide: Brighten Skin or Shrink Pores?', slug: 'vitamin-c-vs-niacinamide-for-skin', readTime: '12 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 6, 2026', excerpt: 'Confused about vitamin C vs niacinamide for skin? Discover which serum is best for brightening, large pores, and uneven tone on Mintbrooks.' },

  { title: 'Best Overnight Hair Serum 2024: Kerastase & More for Dry Hair', slug: 'best-overnight-hair-serum', readTime: '7 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 14, 2026', excerpt: 'Discover the best overnight hair serum for deep nourishment and repair. Our 2024 guide, featuring Kerastase, helps you choose the ideal night serum for dry hair.' },

  { title: 'Best Anti-Aging Serum 2024: Expert Guide for Firmer Skin', slug: 'best-anti-aging-serum-guide', readTime: '7 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 14, 2026', excerpt: 'Our 2024 expert guide helps you choose the best anti-aging serum for your specific needs, focusing on effective ingredients for wrinkles and firming.' },

  { title: 'Best Mini Air Fryers 2024: Compact & Mighty Kitchen Gadgets', slug: 'best-mini-air-fryers', readTime: '6 min', category: 'Kitchen', categorySlug: 'kitchen', bg: '#EDF2E5', accent: '#4A5E2C', image: '/kitchen.jpg', date: 'April 14, 2026', excerpt: 'Looking for the best mini air fryers for your tiny kitchen, dorm, or RV? Our 2024 guide reviews compact air fryers, with the CHEFMAN 2Qt as our top pick.' },

  { title: 'Best Chunky Knit Throw Blankets for Cozy Homes (2024)', slug: 'best-chunky-knit-throw-blankets', readTime: '5 min', category: 'Home & Decor', categorySlug: 'home-decor', bg: '#EEF3F1', accent: '#2C4A3E', image: '/home-decor.jpg', date: 'April 14, 2026', excerpt: 'Discover the best chunky knit throw blankets for a cozy and aesthetic home. Our top pick for 2024 is the Cream Chunky Knit Throw Blanket, offering incredible value and style.' },

  { title: 'Best Travel Body Care Kits 2024: Sol de Janeiro & More', slug: 'best-travel-body-care-kit', readTime: '7 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 14, 2026', excerpt: 'Discover the best travel body care kit for your next trip. Our 2024 guide, featuring the luxurious Sol de Janeiro Jet Set, ensures you stay fresh on the go.' },

  { title: 'Best Women\'s Gardening Tool Sets for Every Gardener in 2024', slug: 'best-womens-gardening-tool-set', readTime: '6 min', category: 'Home & Decor', categorySlug: 'home-decor', bg: '#EEF3F1', accent: '#2C4A3E', image: '/home-decor.jpg', date: 'April 14, 2026', excerpt: 'Discover the best women\'s gardening tool sets of 2024, featuring lightweight, durable, and stylish options perfect for every gardener. Find your ideal ladies garden tool set today.' },

  { title: 'Is the Birthday Self-Care Package for Women Worth It? Honest Review', slug: 'birthday-self-care-package-women-worth-it-review', readTime: '7 min', category: 'Wellness', categorySlug: 'wellness', bg: '#F5EDE5', accent: '#7B5E4A', image: '/wellness.jpg', date: 'April 14, 2026', excerpt: 'Wondering if the Birthday Self-Care Package for Women is worth the price? Our honest review breaks down its value, quality, and if it\'s the right gift for her.' },

  { title: 'Olaplex No. 7 vs Kerastase Gloss: Your Best Hair Oil Pick', slug: 'olaplex-no-7-vs-kerastase-gloss-hair-oil', readTime: '6 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 16, 2026', excerpt: 'Struggling to choose between Olaplex No. 7 and Kerastase Gloss? This guide helps you find the best hair oil for shine, repair, and your specific hair needs.' },

  { title: 'La Roche-Posay Retinol vs. Paula\'s Choice: Which is Better?', slug: 'la-roche-posay-retinol-vs-paulas-choice', readTime: '6 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 16, 2026', excerpt: 'Comparing La Roche-Posay Pure Retinol Face Serum and Paula\'s Choice to help you decide which is better for anti-aging and sensitive skin needs.' },

  { title: 'Is Simple&Opulence Linen Duvet Cover Worth It? Honest Review', slug: 'simple-opulence-linen-duvet-cover-review', readTime: '7 min', category: 'Home & Decor', categorySlug: 'home-decor', bg: '#EEF3F1', accent: '#2C4A3E', image: '/home-decor.jpg', date: 'April 16, 2026', excerpt: 'Wondering if the Simple&Opulence linen duvet cover is worth its price? Get an honest, in-depth review of its quality, feel, and value.' },

  { title: 'Too Faced Born This Way Natural Nudes Palette Review', slug: 'too-faced-born-this-way-natural-nudes-palette-review', readTime: '7 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 16, 2026', excerpt: 'An honest Too Faced Born This Way Natural Nudes Palette review covering shades, pigmentation, longevity, and if it\'s worth it for everyday use.' },

  { title: 'Harvest Natural Beauty Foundation Review: 6 Weeks Tested', slug: 'harvest-natural-beauty-foundation-review', readTime: '8 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 16, 2026', excerpt: 'After 6 weeks of testing, get my honest Harvest Natural Beauty Foundation review. Discover its coverage, ingredients, and if it\'s right for you.' },

  { title: 'Is the 66Ft Automatic Drip Irrigation Kit Worth It? Honest Review', slug: '66ft-automatic-drip-irrigation-kit-review', readTime: '7 min', category: 'Home & Decor', categorySlug: 'home-decor', bg: '#EEF3F1', accent: '#2C4A3E', image: '/home-decor.jpg', date: 'April 16, 2026', excerpt: 'Considering the 66Ft Automatic Drip Irrigation Kit? Our honest review assesses its value, ease of use, and performance for your home garden.' },

  { title: 'Is the 14-Piece Vintage Self-Care Gift Basket Worth It? (Honest Review)', slug: '14-piece-vintage-self-care-gift-basket-review-worth-it', readTime: '6 min', category: 'Wellness', categorySlug: 'wellness', bg: '#F5EDE5', accent: '#7B5E4A', image: '/wellness.jpg', date: 'April 16, 2026', excerpt: 'Wondering if the 14-Piece Vintage Self-Care Gift Basket is worth it? Our honest review breaks down its value, contents, and if it\'s the right choice for you.' },

  { title: 'Olaplex No. 7 Bonding Oil Review: 3 Months with Damaged Hair', slug: 'olaplex-no-7-bonding-oil-review-damaged-hair', readTime: '8 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 17, 2026', excerpt: 'After 3 months of use, our in-depth Olaplex No. 7 Bonding Oil review reveals if it\'s worth it for damaged, color-treated hair. See before and after results.' },

  { title: 'La Roche-Posay Pure Retinol Serum Review: 8 Weeks Later', slug: 'la-roche-posay-pure-retinol-serum-review-8-weeks', readTime: '7 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 17, 2026', excerpt: 'Curious about the La Roche-Posay Pure Retinol Serum? Our 8-week review details real results on wrinkles and skin texture. Is LRP retinol good for you?' },

  { title: 'Anova Nano vs Inkbird Sous Vide: Which Cooker is Best?', slug: 'anova-nano-vs-inkbird-sous-vide-comparison', readTime: '7 min', category: 'Kitchen', categorySlug: 'kitchen', bg: '#EDF2E5', accent: '#4A5E2C', image: '/kitchen.jpg', date: 'April 17, 2026', excerpt: 'Trying to decide between the Anova Nano and Inkbird Sous Vide? This comparison helps you pick the best budget sous vide cooker for your kitchen, based on features and value.' },

  { title: 'Simple&Opulence Linen Duvet Review: 6 Months of Use', slug: 'simple-opulence-linen-duvet-review-long-term', readTime: '7 min', category: 'Home & Decor', categorySlug: 'home-decor', bg: '#EEF3F1', accent: '#2C4A3E', image: '/home-decor.jpg', date: 'April 17, 2026', excerpt: 'After 6 months, our detailed Simple&Opulence linen duvet review covers comfort, durability, and how this bedding holds up long-term. Is it worth it?' },

  { title: 'Is the Too Faced Born This Way Natural Nudes Palette Worth It?', slug: 'too-faced-born-this-way-natural-nudes-palette-worth-it', readTime: '7 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 17, 2026', excerpt: 'Wondering if the Too Faced Born This Way Natural Nudes Palette is worth the price? We evaluate its value, performance, and versatility for everyday looks.' },

  { title: 'Is Harvest Natural Beauty Foundation Worth It? An Honest Look', slug: 'is-harvest-natural-beauty-foundation-worth-it', readTime: '5 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 17, 2026', excerpt: 'Wondering if Harvest Natural Beauty Foundation is worth the $29? Get an honest assessment of its price, performance, and clean beauty claims for natural makeup beginners.' },

  { title: 'Best Drip Irrigation Systems for Beginners: Easy Garden Watering', slug: 'best-drip-irrigation-systems-for-beginners', readTime: '6 min', category: 'Home & Decor', categorySlug: 'home-decor', bg: '#EEF3F1', accent: '#2C4A3E', image: '/home-decor.jpg', date: 'April 17, 2026', excerpt: 'New to gardening? Discover the best drip irrigation systems for beginners that are easy to install and use, making garden watering simple and efficient.' },

  { title: 'Self Care Gifts Get Well Soon Basket: Is It Worth The Price?', slug: 'self-care-gifts-get-well-soon-basket-worth-it-review', readTime: '8 min', category: 'Wellness', categorySlug: 'wellness', bg: '#F5EDE5', accent: '#7B5E4A', image: '/wellness.jpg', date: 'April 17, 2026', excerpt: 'Wondering if the Self Care Gifts Get Well Soon Basket is worth the price? We dive deep into its value, quality, and what reviewers say to help you decide.' },

  { title: 'Is Olaplex No. 7 Worth It? An Honest Look at the Price Tag', slug: 'is-olaplex-no-7-worth-it', readTime: '6 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 18, 2026', excerpt: 'Wondering if Olaplex No. 7 Bonding Oil is worth its $32 price tag? We evaluate its value, benefits, and unique technology for damaged hair.' },

  { title: 'Is La Roche-Posay Retinol Serum Worth It? An Honest Take', slug: 'is-la-roche-posay-retinol-serum-worth-it', readTime: '7 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 18, 2026', excerpt: 'Wondering if La Roche-Posay Retinol Serum is worth the price? We break down its effectiveness, ingredients, and user experience to help you decide.' },

  { title: 'Anova Precision Cooker Nano Review: After 3 Months of Use', slug: 'anova-precision-cooker-nano-review-long-term', readTime: '7 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 18, 2026', excerpt: 'Curious about the Anova Precision Cooker Nano? Our honest review after 3 months of use covers its performance, pros, and cons for beginners.' },

  { title: 'Best Linen Duvet Covers for Hot Sleepers: Stay Cool All Night', slug: 'best-linen-duvet-covers-hot-sleepers', readTime: '7 min', category: 'Home & Decor', categorySlug: 'home-decor', bg: '#EEF3F1', accent: '#2C4A3E', image: '/home-decor.jpg', date: 'April 18, 2026', excerpt: 'Tired of night sweats? Discover the best linen duvet covers for hot sleepers designed to keep you cool and comfortable all night long. Find your perfect breathable bedding.' },

  { title: 'Best Natural Foundation for Beginners: Easy & Flawless Start', slug: 'best-natural-foundation-for-beginners', readTime: '6 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 18, 2026', excerpt: 'Starting your clean beauty journey? Discover the best natural foundation for beginners that offers easy application and a flawless finish, curated by Mintbrooks.' },

  { title: 'How to Install a Drip Irrigation System: A Beginner\'s Guide', slug: 'how-to-install-drip-irrigation-beginner-guide', readTime: '6 min', category: 'Home & Decor', categorySlug: 'home-decor', bg: '#EEF3F1', accent: '#2C4A3E', image: '/home-decor.jpg', date: 'April 18, 2026', excerpt: 'Learn how to install a drip irrigation system with this easy DIY guide, perfect for beginners looking to set up their garden drip system effortlessly. Get started today!' },

  { title: 'Glow Recipe Hue Drops Review: Is This Bronzing Serum Worth It?', slug: 'glow-recipe-hue-drops-review-worth-it', readTime: '8 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 18, 2026', excerpt: 'Considering the Glow Recipe Hue Drops Bronzing Serum? Our in-depth review covers performance, ingredients, and if this customizable bronzer is worth it for a natural glow.' },

  { title: 'Best Hair Oils for Damaged & Color-Treated Hair in 2024', slug: 'best-hair-oil-damaged-color-treated-hair', readTime: '7 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 19, 2026', excerpt: 'Revive your damaged or color-treated hair with our top picks for nourishing hair oils. Discover the best hair oil for bleached hair, including Olaplex No. 7.' },

  { title: 'Best Retinol Serums for Sensitive Skin: Gentle & Effective', slug: 'best-retinol-sensitive-skin', readTime: '7 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 19, 2026', excerpt: 'Discover the best retinol for sensitive skin that\'s gentle yet effective. Our top pick, La Roche-Posay Pure Retinol, helps reduce wrinkles without irritation.' },

  { title: 'Is the Anova Nano Worth It? Value for New Sous Vide Users', slug: 'is-anova-nano-worth-it-value-features', readTime: '7 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 19, 2026', excerpt: 'Wondering \'is the Anova Nano worth it?\' We break down its price, features, and performance to help new sous vide users decide if it\'s the best budget-friendly option.' },

  { title: 'Simple&Opulence Alternatives: Cheaper Linen Duvets That Deliver', slug: 'simple-opulence-alternatives-cheaper-linen-duvets', readTime: '5 min', category: 'Home & Decor', categorySlug: 'home-decor', bg: '#EEF3F1', accent: '#2C4A3E', image: '/home-decor.jpg', date: 'April 19, 2026', excerpt: 'Looking for Simple&Opulence alternatives? Discover high-quality, more affordable linen duvet cover options that offer a similar luxurious feel without the premium price tag. Find your perfect budget linen duvet.' },

  { title: 'Too Faced Born This Way Natural Nudes vs Tartelette In Bloom', slug: 'too-faced-born-this-way-natural-nudes-vs-tartelette-in-bloom', readTime: '5 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 19, 2026', excerpt: 'Deciding between Too Faced Born This Way Natural Nudes and Tartelette In Bloom? This guide compares shades, finishes, and performance to help you choose your perfect neutral eyeshadow palette.' },

  { title: 'Harvest Natural Beauty vs Jerome Alexander Foundation: Which is Better?', slug: 'harvest-natural-beauty-vs-jerome-alexander-foundation', readTime: '7 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 19, 2026', excerpt: 'Comparing Harvest Natural Beauty Liquid Foundation vs. Jerome Alexander MagicMinerals AirBrush Foundation for natural ingredients, coverage, and finish. Find your perfect match.' },

  { title: 'Olaplex No. 7 Dupes: Affordable Bonding Oils That Really Work', slug: 'olaplex-no-7-dupes-affordable-bonding-oils', readTime: '6 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 20, 2026', excerpt: 'Searching for effective Olaplex No. 7 dupes? Discover budget-friendly hair bonding oils that deliver shine and repair without the premium price tag. Mintbrooks helps you save.' },

  { title: 'La Roche-Posay Retinol Dupes: Affordable Alternatives', slug: 'la-roche-posay-retinol-dupes-affordable-alternatives', readTime: '7 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 20, 2026', excerpt: 'Looking for a La Roche-Posay Retinol dupe? Discover effective and more affordable retinol serum alternatives for sensitive skin that won\'t break the bank.' },

  { title: 'Best Sous Vide Cookers for Beginners: Easy & Affordable', slug: 'best-sous-vide-for-beginners', readTime: '7 min', category: 'Kitchen', categorySlug: 'kitchen', bg: '#EDF2E5', accent: '#4A5E2C', image: '/kitchen.jpg', date: 'April 20, 2026', excerpt: 'New to sous vide? Discover the best sous vide cookers for beginners, featuring easy-to-use and affordable options to get you started with perfect meals.' },

  { title: 'Top Linen Duvet Covers for Summer: Stay Cool & Comfy', slug: 'best-linen-duvet-cover-summer', readTime: '6 min', category: 'Home & Decor', categorySlug: 'home-decor', bg: '#EEF3F1', accent: '#2C4A3E', image: '/home-decor.jpg', date: 'April 20, 2026', excerpt: 'Find the best linen duvet cover for summer sleeping. Our guide helps you choose a lightweight, breathable, and cooling linen duvet for ultimate comfort.' },

  { title: 'Best Neutral Eyeshadow Palettes for Beginners: Easy & Foolproof', slug: 'best-neutral-eyeshadow-palettes-for-beginners', readTime: '7 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 20, 2026', excerpt: 'Discover the best neutral eyeshadow palettes for beginners, focusing on blendability and ease of use. Our top pick for simple, foolproof looks is the Too Faced Born This Way Natural Nudes Palette.' },

  { title: 'How to Choose Natural Foundation for Your Skin Type: A Guide', slug: 'how-to-choose-natural-foundation', readTime: '9 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 20, 2026', excerpt: 'Struggling to find the right clean foundation? Learn how to choose natural foundation for your skin type, from oily to dry, with our expert guide.' },

  { title: '14-Piece Vintage Self-Care Gift Basket Review: 2 Months Later', slug: '14-piece-vintage-self-care-gift-basket-review-long-term', readTime: '7 min', category: 'Wellness', categorySlug: 'wellness', bg: '#F5EDE5', accent: '#7B5E4A', image: '/wellness.jpg', date: 'April 20, 2026', excerpt: 'Curious about the 14-piece vintage self-care gift basket? We\'ve tested ASIN B0G2RWQ5J5 for two months to give you an honest, buyer-focused review.' },

  { title: 'How to Use Olaplex No. 7 Bonding Oil for Best Results', slug: 'how-to-use-olaplex-no-7-bonding-oil', readTime: '6 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 20, 2026', excerpt: 'Unlock the full potential of Olaplex No. 7 Bonding Oil. Learn how to use Olaplex No. 7 for maximum shine, frizz control, and heat protection for damaged hair.' },

  { title: 'How to Use Retinol Serum for Beginners: A Step-by-Step Guide', slug: 'how-to-use-retinol-serum-for-beginners', readTime: '7 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 20, 2026', excerpt: 'New to retinol? Learn how to use retinol serum for beginners with this easy step-by-step guide, focusing on how to apply retinol without irritation.' },

  { title: 'How to Use Anova Nano: A Beginner\'s Guide to Sous Vide', slug: 'how-to-use-anova-nano-beginner-guide-sous-vide', readTime: '6 min', category: 'Kitchen', categorySlug: 'kitchen', bg: '#EDF2E5', accent: '#4A5E2C', image: '/kitchen.jpg', date: 'April 20, 2026', excerpt: 'First time using your Anova Nano? This beginner\'s guide walks you through setting up, cooking, and enjoying your first sous vide meal with ease. Learn how to use Anova Nano step-by-step.' },

  { title: 'How to Wash & Care for Linen Duvet Covers: Extend Their Life', slug: 'how-to-wash-linen-duvet-cover', readTime: '8 min', category: 'Home & Decor', categorySlug: 'home-decor', bg: '#EEF3F1', accent: '#2C4A3E', image: '/home-decor.jpg', date: 'April 20, 2026', excerpt: 'Learn the step-by-step process of how to wash linen duvet covers to maintain their softness, longevity, and luxurious feel. A complete linen bedding care guide.' },

  { title: 'Too Faced Born This Way Natural Nudes Palette Dupes', slug: 'too-faced-born-this-way-natural-nudes-palette-dupes', readTime: '6 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 20, 2026', excerpt: 'Looking for budget-friendly Too Faced Born This Way Natural Nudes Palette dupes? Discover affordable eyeshadow palettes with similar shades and quality.' },

  { title: 'Self Care Gifts Get Well Soon Basket Review: After 2 Weeks', slug: 'self-care-gifts-get-well-soon-basket-review', readTime: '6 min', category: 'Wellness', categorySlug: 'wellness', bg: '#F5EDE5', accent: '#7B5E4A', image: '/wellness.jpg', date: 'April 20, 2026', excerpt: 'Curious about the Self Care Gifts Get Well Soon Gift Basket? Our detailed review covers the unboxing, contents, and recipient\'s experience after two weeks. Discover if it\'s the right choice for your loved one.' },

  { title: 'Best Spa Gift Baskets for Women 2024: Ultimate Self-Care Sets', slug: 'best-spa-gift-baskets-women', readTime: '7 min', category: 'Wellness', categorySlug: 'wellness', bg: '#F5EDE5', accent: '#7B5E4A', image: '/wellness.jpg', date: 'April 23, 2026', excerpt: 'Discover the best spa gift baskets for women in 2024. Our guide helps you find the perfect self-care set for relaxation and pampering.' },

  { title: 'Top Birthday Gifts for Women Under $50: Thoughtful & Unique', slug: 'best-birthday-gifts-for-women-under-50', readTime: '8 min', category: 'Wellness', categorySlug: 'wellness', bg: '#F5EDE5', accent: '#7B5E4A', image: '/wellness.jpg', date: 'April 24, 2026', excerpt: 'Discover the best birthday gifts for women under $50 that are thoughtful and unique. Find the perfect affordable birthday gift for her, mom, or girlfriend.' },

  { title: 'La Roche-Posay Pure Retinol Serum Review: 8 Weeks Use', slug: 'la-roche-posay-pure-retinol-serum-review', readTime: '9 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 24, 2026', excerpt: 'Considering La Roche-Posay Pure Retinol Serum? Our 8-week review details before and after results, effectiveness, and who it\'s best for. See if it\'s right for you.' },

  { title: 'Best Spa Gift Baskets of 2024: Ultimate Self-Care Sets', slug: 'best-spa-gift-baskets', readTime: '8 min', category: 'Wellness', categorySlug: 'wellness', bg: '#F5EDE5', accent: '#7B5E4A', image: '/wellness.jpg', date: 'April 24, 2026', excerpt: 'Searching for the best spa gift baskets? Our experts review top-rated self-care sets, helping you find the perfect luxury bath gift for any occasion in 2024.' },

  { title: 'Top Birthday Gifts for Women Under $50: Thoughtful & Unique', slug: 'best-birthday-gifts-women-under-50', readTime: '7 min', category: 'Wellness', categorySlug: 'wellness', bg: '#F5EDE5', accent: '#7B5E4A', image: '/wellness.jpg', date: 'April 24, 2026', excerpt: 'Discover the best birthday gifts for women under $50 that are thoughtful, unique, and won\'t break the bank. Find the perfect affordable birthday gift for her.' },

  { title: 'How to Use a Neutral Eyeshadow Palette: Everyday & Glam Looks', slug: 'how-to-use-neutral-eyeshadow-palette', readTime: '7 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 24, 2026', excerpt: 'Learn how to use a neutral eyeshadow palette for everyday looks or glam nights out. Our step-by-step guide helps you master natural eyeshadow application.' },
  { title: 'Yendo Review: Real Approval Odds with Bad Credit (2026)', slug: 'yendo-bad-credit-approval-odds', readTime: '9 min', category: 'Money & Credit', categorySlug: 'finance', bg: '#EEF3F1', accent: '#1D3A2F', image: '/editorial.jpg', date: 'April 24, 2026', excerpt: 'Independent editorial review: yendo credit card bad credit approval — real approval odds, eligibility, and the fastest path through.' },

  { title: 'Debt Consolidation With Bad Credit: What Actually Works (2026 Guide)', slug: 'slamdunk-debt-consolidation-real-options', readTime: '9 min', category: 'Money & Credit', categorySlug: 'finance', bg: '#EEF3F1', accent: '#1D3A2F', image: '/editorial.jpg', date: 'April 24, 2026', excerpt: 'Independent editorial review: debt consolidation bad credit — real approval odds, eligibility, and the fastest path through.' },

  { title: 'Fast Personal Loans for Bad Credit: Funded in 24 Hours (2026)', slug: 'fast-personal-loans-bad-credit-approval', readTime: '9 min', category: 'Money & Credit', categorySlug: 'finance', bg: '#EEF3F1', accent: '#1D3A2F', image: '/editorial.jpg', date: 'April 24, 2026', excerpt: 'Independent editorial review: fast personal loan bad credit — real approval odds, eligibility, and the fastest path through.' },

  { title: 'Emergency Cash Loans With Bad Credit: What Actually Works in 2026', slug: 'emergency-cash-loans-bad-credit', readTime: '9 min', category: 'Money & Credit', categorySlug: 'finance', bg: '#EEF3F1', accent: '#1D3A2F', image: '/editorial.jpg', date: 'April 24, 2026', excerpt: 'Independent editorial review: emergency cash loan bad credit — real approval odds, eligibility, and the fastest path through.' },

  { title: 'Compare Personal Loans for Bad Credit: Real Rates From 20+ Lenders (2026)', slug: 'compare-personal-loans-bad-credit-20-lenders', readTime: '9 min', category: 'Money & Credit', categorySlug: 'finance', bg: '#EEF3F1', accent: '#1D3A2F', image: '/editorial.jpg', date: 'April 24, 2026', excerpt: 'Independent editorial review: compare personal loans bad credit — real approval odds, eligibility, and the fastest path through.' },

  { title: 'Personal Loans Up to $50K With Bad Credit: Real Lenders, Real Terms (2026)', slug: 'personal-loans-up-to-50k-bad-credit', readTime: '9 min', category: 'Money & Credit', categorySlug: 'finance', bg: '#EEF3F1', accent: '#1D3A2F', image: '/editorial.jpg', date: 'April 25, 2026', excerpt: 'Independent editorial review: personal loan bad credit 50k — real approval odds, eligibility, and the fastest path through.' },

  { title: 'The Best Anti-Aging Serums for Beginners Under $50', slug: 'best-anti-aging-serum-for-beginners-under-50', readTime: '11 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 26, 2026', excerpt: 'Starting your anti-aging journey? Discover the best anti-aging serums for beginners, including budget-friendly options under $50, tested by Mintbrooks.' },

  { title: 'The 5 Best Clean Beauty Foundations for Beginners: Easy & Natural Looks', slug: 'best-clean-beauty-foundation-beginners', readTime: '12 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 26, 2026', excerpt: 'Discover the best clean beauty foundation for beginners. Our guide helps you find easy-to-use, natural makeup options for a flawless, non-toxic look.' },

  { title: 'Best Hair Gloss & Oils for Damaged Hair: Repair and Shine', slug: 'best-hair-gloss-oil-damaged-hair', readTime: '12 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 26, 2026', excerpt: 'Discover the best hair gloss and oils for damaged hair to restore shine and health. Our guide covers top picks for repair, frizz control, and a glass-like finish.' },

  { title: 'Best Linen Bedding Sets for Every Budget & Style in 2024', slug: 'best-linen-bedding', readTime: '9 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 26, 2026', excerpt: 'Discover the best linen bedding sets for your budget and style in 2024. Our expert reviews help you find the perfect linen duvet cover set.' },

  { title: 'Best Sous Vide Cookers for Beginners: Start Smart', slug: 'best-sous-vide-cooker-for-beginners', readTime: '9 min', category: 'Kitchen', categorySlug: 'kitchen', bg: '#EDF2E5', accent: '#4A5E2C', image: '/kitchen.jpg', date: 'April 26, 2026', excerpt: 'New to sous vide? Discover the best sous vide cooker for beginners, focusing on ease of use, affordability, and reliable results. Mintbrooks tested and reviewed.' },

  { title: 'Best Anti-Aging Serums for Every Skin Concern & Budget (2024)', slug: 'best-anti-aging-serums', readTime: '11 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 26, 2026', excerpt: 'Discover the best anti-aging serums for your skin concerns and budget in 2024. Our guide features top retinol, Vitamin C, and niacinamide serums.' },

  { title: 'The Best Clean Foundations for Beginners: Easy & Natural', slug: 'best-clean-foundation-for-beginners', readTime: '10 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 26, 2026', excerpt: 'Discover the best clean foundation for beginners with easy, natural coverage. Mintbrooks reviews top picks for a flawless, eco-friendly look.' },

  { title: 'Best Hair Oil for Damaged & Color-Treated Hair: Olaplex vs. Kerastase', slug: 'best-hair-oil-damaged-color-treated-olaplex-kerastase', readTime: '11 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 27, 2026', excerpt: 'Searching for the best hair oil for damaged hair? We compare Olaplex No. 7 and Kerastase options to help you find the perfect serum for color-treated and dry hair.' },

  { title: 'Best Retinol Serum for Beginners: Start Your Anti-Aging Journey Safely', slug: 'best-retinol-serum-for-beginners', readTime: '10 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 27, 2026', excerpt: 'Starting your anti-aging journey? Find the best retinol serum for beginners and sensitive skin, reviewed by real buyers for gentle yet effective results.' },

  { title: 'Best Self-Care Gifts for Mother\'s Day: Pamper Your Mom', slug: 'best-self-care-gifts-mothers-day', readTime: '6 min', category: 'Wellness', categorySlug: 'wellness', bg: '#F5EDE5', accent: '#7B5E4A', image: '/wellness.jpg', date: 'April 28, 2026', excerpt: 'Discover the best self-care gifts for Mother\'s Day that will truly pamper your mom. Find relaxing and thoughtful options she\'ll love.' },

  { title: 'Is La Roche-Posay Pure Retinol Serum Worth It? Honest Take', slug: 'is-la-roche-posay-pure-retinol-worth-it', readTime: '7 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 28, 2026', excerpt: 'Wondering if La Roche-Posay Pure Retinol Serum is worth the investment? Our honest take on its price, ingredients, and value for your skin goals.' },

  { title: 'Self-Care Gifts for Busy Moms: Relaxation & Rejuvenation Ideas', slug: 'self-care-gifts-busy-moms', readTime: '7 min', category: 'Wellness', categorySlug: 'wellness', bg: '#F5EDE5', accent: '#7B5E4A', image: '/wellness.jpg', date: 'April 28, 2026', excerpt: 'Discover the best self-care gifts for busy moms to help them relax and rejuvenate. Find thoughtful gifts for stressed moms and new mothers.' },

  { title: 'Best Retinol Serums for Sensitive Skin: Gentle & Effective', slug: 'best-retinol-for-sensitive-skin', readTime: '6 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'April 28, 2026', excerpt: 'Discover the best retinol serums for sensitive skin that deliver anti-aging benefits without irritation. Our top pick, La Roche-Posay Pure Retinol Face Serum, is gentle yet effective.' },

  { title: 'Best Self-Care Gifts for Your Best Friend: Show You Care', slug: 'best-self-care-gifts-for-best-friend', readTime: '8 min', category: 'Wellness', categorySlug: 'wellness', bg: '#F5EDE5', accent: '#7B5E4A', image: '/wellness.jpg', date: 'April 28, 2026', excerpt: 'Discover the best self-care gifts for your best friend, curated by Mintbrooks. Show you care with a thoughtful self-care package.' },

  { title: 'Best Anti-Aging Serums for Beginners: Your First Step', slug: 'best-anti-aging-serum-for-beginners', readTime: '9 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'May 1, 2026', excerpt: 'Starting your anti-aging journey? Discover the best anti-aging serums for beginners under $50, including top retinol and Vitamin C options. Tested by Mintbrooks.' },

  { title: 'Best Hair Gloss & Bonding Oils for Damaged & Color-Treated Hair: 2024 Review', slug: 'best-hair-gloss-bonding-oils-damaged-color-treated-hair', readTime: '9 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'May 1, 2026', excerpt: 'Revitalize your damaged and color-treated hair with our top picks for the best hair gloss and bonding oils in 2024, tested by real buyers for shine and repair.' },

  { title: 'Best Anti-Aging Serums for Beginners: Smooth Skin Starts Here', slug: 'best-anti-aging-serum-for-beginners-sensitive-skin', readTime: '10 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'May 1, 2026', excerpt: 'Starting your anti-aging journey? Discover the best anti-aging serums for beginners and sensitive skin, featuring dermatologist-tested options for a smooth start.' },

  { title: 'The Best Hair Gloss & Bonding Oils for Damaged & Color-Treated Hair', slug: 'best-hair-gloss-damaged-color-treated-hair', readTime: '10 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'May 1, 2026', excerpt: 'Discover the best hair gloss and bonding oils for damaged and color-treated hair on Mintbrooks. Get salon-quality shine and repair at home.' },

  { title: 'Best Sous Vide Cookers for Every Home Chef: From Beginner to Pro', slug: 'best-sous-vide-cooker-reviews', readTime: '8 min', category: 'Kitchen', categorySlug: 'kitchen', bg: '#EDF2E5', accent: '#4A5E2C', image: '/kitchen.jpg', date: 'May 1, 2026', excerpt: 'Discover the best sous vide cooker for your kitchen, whether you\'re a beginner or a seasoned chef. Honest reviews and buyer-focused recommendations.' },

  { title: 'Best Hair Gloss & Bonding Oils for Damaged Hair: Repair & Shine', slug: 'best-hair-gloss-bonding-oils-damaged-hair', readTime: '12 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'May 4, 2026', excerpt: 'Discover the best hair gloss for damaged hair and bonding oils to repair and add shine. Our team tested top products for color-treated and dry hair.' },

  { title: 'Anova Nano vs. Inkbird ISV-100W: Best Sous Vide Cooker for You?', slug: 'anova-nano-vs-inkbird-isv-100w-sous-vide-cooker-comparison', readTime: '8 min', category: 'Kitchen', categorySlug: 'kitchen', bg: '#EDF2E5', accent: '#4A5E2C', image: '/kitchen.jpg', date: 'May 6, 2026', excerpt: 'Comparing the Anova Nano vs. Inkbird ISV-100W: find the best sous vide cooker for beginners or serious home cooks. Get honest reviews and expert advice.' },

  { title: 'Best Linen Duvet Cover Sets: Luxury vs. Budget Options', slug: 'best-linen-duvet-cover-set', readTime: '10 min', category: 'Home & Decor', categorySlug: 'home-decor', bg: '#EEF3F1', accent: '#2C4A3E', image: '/home-decor.jpg', date: 'May 6, 2026', excerpt: 'Discover the best linen duvet cover sets for luxury or budget-friendly options. We compare top-rated queen linen bedding for every home.' },

  { title: 'The 5 Best Clean Beauty Foundations for Beginners Under $40', slug: 'best-clean-beauty-foundation-for-beginners-under-40', readTime: '10 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'May 6, 2026', excerpt: 'Discover the best clean beauty foundation for beginners under $40. Our expert reviews help you choose an easy-to-use, natural makeup option perfect for everyday wear.' },

  { title: 'Best Hair Gloss & Oils for Damaged Hair: Repair & Shine', slug: 'best-hair-gloss-oils-damaged-hair', readTime: '10 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'May 6, 2026', excerpt: 'Discover the best hair gloss and hair oils for damaged hair to restore shine and repair. Find top picks for all budgets, tested by real buyers.' },

  { title: 'Best Linen Bedding for Luxurious & Comfortable Sleep (2024)', slug: 'best-linen-bedding-luxury-comfort', readTime: '10 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'May 6, 2026', excerpt: 'Discover the best linen bedding for luxurious comfort and a great night\'s sleep in 2024. Our guide helps you choose the perfect linen duvet cover or comforter set.' },

  // Editorial
  { title: 'How I Actually Test Affiliate Products', slug: 'how-i-test-affiliate-products', readTime: '7 min', category: 'Reading List', categorySlug: 'reading-list', bg: '#F0F4F8', accent: '#2D4A6B', image: '/editorial.jpg', date: 'May 8, 2026', excerpt: 'Behind the methodology: how every product recommendation on Mintbrooks gets evaluated before it earns a spot in an article.' },

  { title: 'Best Anti-Aging Serums Under $50 for Beginners: Mintbrooks Review', slug: 'best-anti-aging-serum-under-50-beginners', readTime: '9 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'May 9, 2026', excerpt: 'Discover the best anti-aging serum under $50, perfect for beginners. Our Mintbrooks team reviews affordable, effective serums for youthful skin on a budget.' },

  { title: 'The Best Clean Beauty Foundations for a Flawless Glow (Under $40)', slug: 'best-clean-beauty-foundations-under-40', readTime: '10 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'May 9, 2026', excerpt: 'Discover the best clean beauty foundations under $40 for a flawless, healthy glow. Find natural liquid foundation and options for sensitive skin on Mintbrooks.' },

  { title: 'Best Hair Gloss & Treatments for Damaged Hair: Repair and Shine', slug: 'best-hair-gloss-for-damaged-hair', readTime: '10 min', category: 'Beauty', categorySlug: 'beauty', bg: '#F5EAF0', accent: '#8B4E6B', image: '/beauty.jpg', date: 'May 9, 2026', excerpt: 'Revive your stressed strands! Discover the best hair gloss for damaged hair and treatments that deliver repair, shine, and frizz control, tested by real buyers.' },
]

async function getAffiliateBodyHtml(slug: string, _siteUrl: string): Promise<string | null> {
  // Fetch article HTML from static asset via Cloudflare ASSETS binding (avoids self-referencing HTTP)
  try {
    const { env } = await getCloudflareContext({ async: true })
    const res = await (env as { ASSETS: { fetch: (r: Request) => Promise<Response> } }).ASSETS.fetch(
      new Request(`https://assets.local/articles/affiliate/${slug}/index.html`)
    )
    if (res.ok) {
      const raw = await res.text()
      const match = raw.match(/<article[^>]*>([\s\S]*?)<\/article>/)
      return match ? injectLinkAttrs(match[1].trim()) : null
    }
  } catch { /* fall through */ }

  return null
}

/** Ensure all amazon.com links open in a new tab with proper rel attributes. */
function injectLinkAttrs(html: string): string {
  return html.replace(
    /<a\s([^>]*href="https?:\/\/(?:www\.)?amazon\.com[^"]*"[^>]*)>/gi,
    (match, attrs) => {
      const hasTarget = /target=/i.test(attrs)
      const hasRel = /rel=/i.test(attrs)
      let out = attrs
      if (!hasTarget) out += ' target="_blank"'
      if (!hasRel) out += ' rel="noopener noreferrer nofollow"'
      return `<a ${out}>`
    }
  )
}

// ─── Top Product Extraction ────────────────────────────────────────────────

type TopProduct = {
  name: string
  price: string
  link: string
  image?: string
}

function extractAsin(url: string): string | null {
  const m = url.match(/\/(?:dp|gp\/product)\/([A-Z0-9]{10})(?:[/?]|$)/)
  return m ? m[1] : null
}

// Lookup table built once: ASIN → nano banana image path (Pinterest pipeline products only)
const ASIN_IMAGE_MAP: Record<string, string> = Object.fromEntries(
  getProducts().filter(p => p.primary_image_url).map(p => [p.asin, p.primary_image_url])
)

/**
 * Parse the first product from publisher.py-generated HTML.
 * Two strategies:
 *  1. Structured markup (.product-name / .product-link classes)
 *  2. Fallback: first meaningful Amazon affiliate link
 * Image is only set when the ASIN is in the Pinterest pipeline (has a nano banana file).
 */
function extractTopProduct(html: string): TopProduct | null {
  // Strategy 1: structured product card markup
  const nameMatch = html.match(/<h4[^>]*class="product-name"[^>]*>([\s\S]*?)<\/h4>/i)
  const priceMatch = html.match(/<span[^>]*class="product-price"[^>]*>([\s\S]*?)<\/span>/i)
  const anchorMatch = html.match(/<a[^>]*class="product-link"[^>]*>/)
  const linkMatch = anchorMatch ? anchorMatch[0].match(/href="([^"]*)"/) : null
  if (nameMatch && linkMatch) {
    const link = linkMatch[1]
    const asin = extractAsin(link)
    return {
      name: nameMatch[1].replace(/<[^>]+>/g, '').trim(),
      price: priceMatch ? priceMatch[1].replace(/<[^>]+>/g, '').trim() : '',
      link,
      image: asin ? ASIN_IMAGE_MAP[asin] : undefined,
    }
  }

  // Strategy 2: first meaningful Amazon affiliate link
  const linkRe = /<a[^>]*href="(https?:\/\/(?:www\.)?amazon\.com\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/gi
  let m: RegExpExecArray | null
  while ((m = linkRe.exec(html)) !== null) {
    const href = m[1]
    const text = m[2].replace(/<[^>]+>/g, '').replace(/→/g, '').trim()
    if (text.length > 8 && !/^(buy|shop|check price|get it|view|learn more)/i.test(text)) {
      const asin = extractAsin(href)
      return { name: text, price: '', link: href, image: asin ? ASIN_IMAGE_MAP[asin] : undefined }
    }
  }

  return null
}

/**
 * Always returns a product from our affiliate catalogue for the given category slug.
 * Used when the article's extracted product is not in the Pinterest pipeline.
 */
function getCategoryProduct(categorySlug: string): TopProduct | null {
  const products = getProductsByCategory(categorySlug, 1)
  if (!products.length) return null
  const p = products[0]
  return {
    name: p.name,
    price: `$${p.price.toFixed(2)}`,
    link: p.affiliate_url,
    image: p.primary_image_url,
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Map CPA article slugs → offer_id so ArticleConversionBody renders the
// score-routed quiz + decision matrix (CPA-only surfaces). Non-CPA articles
// get the niche-tuned InlineCTA instead.
const CPA_SLUG_TO_OFFER: Record<string, string> = {
  'yendo-bad-credit-approval-odds': 'yendo',
  'slamdunk-debt-consolidation-real-options': 'slamdunk_finance',
  'fast-personal-loans-bad-credit-approval': 'fastloansgroup',
  'emergency-cash-loans-bad-credit': 'fast_cash_online',
  'compare-personal-loans-bad-credit-20-lenders': 'comparemefunds',
  'personal-loans-up-to-50k-bad-credit': 'lifefunds_net_loans_up_to_50k_revshare_us',
}

function inferOfferIdFromSlug(slug: string): string | undefined {
  return CPA_SLUG_TO_OFFER[slug]
}

function getArticle(slug: string): Article | undefined {
  return ALL_ARTICLES.find((a) => a.slug === slug)
}

function getRelated(article: Article): Article[] {
  const sameCategory = ALL_ARTICLES.filter(
    (a) => a.category === article.category && a.slug !== article.slug
  )
  if (sameCategory.length >= 3) return sameCategory.slice(0, 3)
  // Fill remaining slots with articles from other categories
  const others = ALL_ARTICLES.filter(
    (a) => a.category !== article.category && a.slug !== article.slug
  )
  return [...sameCategory, ...others].slice(0, 3)
}

// ─── generateMetadata ─────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) {
    return { title: 'Article Not Found — Mintbrooks' }
  }
  const excerpt = ALL_ARTICLES.find((a) => a.slug === slug)?.excerpt ?? `${article.readTime} read · ${article.category} · Mintbrooks`
  const canonical = `https://mintbrooks.com/articles/${slug}`
  // Dynamic OG image generated by opengraph-image.tsx — no override needed
  return {
    title: article.title,
    description: excerpt,
    alternates: { canonical },
    openGraph: {
      title: article.title,
      description: excerpt,
      type: 'article',
      url: canonical,
      siteName: 'Mintbrooks',
      publishedTime: article.date,
      authors: ['Mintbrooks Editorial'],
      section: article.category,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: excerpt,
      site: '@mintbrooks',
    },
  }
}

// ─── Glass Skin Article Body ───────────────────────────────────────────────────

function GlassSkinBody() {
  return (
    <div className="article-body">
      <p className="article-lede">
        Glass skin — the dewy, poreless, almost-translucent complexion that has taken over every
        skincare corner of the internet — is not a filter. It&apos;s not genetics. And it&apos;s
        not the result of a twelve-product routine that costs more than your rent. It is, at its
        core, the consequence of one thing: a well-hydrated, well-protected skin barrier.
      </p>

      <h2>What &ldquo;glass skin&rdquo; actually means</h2>
      <p>
        The term originated in Korean beauty culture, where the phrase <em>yuri피부</em> (yuri-pibu)
        describes skin so smooth and clear it resembles glass. It became a global phenomenon around
        2017, propelled by skincare influencers and K-beauty editors, and it hasn&apos;t slowed
        down since.
      </p>
      <p>
        What it describes, clinically, is skin with low transepidermal water loss (TEWL), minimal
        congestion, and high light reflectance. In plain terms: hydrated skin with a strong
        barrier and no visible texture or discoloration. The steps to get there are not magic —
        they are methodical.
      </p>

      {/* Pull quote */}
      <blockquote className="article-pullquote">
        &ldquo;Glass skin is not a filter. It&apos;s not genetics. It is the consequence of
        one thing: a well-hydrated, well-protected skin barrier.&rdquo;
      </blockquote>

      <h2>The core steps — in the order that matters</h2>
      <p>
        Korean skincare is often described as a ten-step routine, but that framing is misleading.
        The steps are not a required sequence — they are a menu. You choose what your skin needs.
        For glass skin specifically, four steps are non-negotiable:
      </p>
      <p>
        <strong>1. Double cleanse.</strong> Oil cleansers dissolve sunscreen, sebum, and
        makeup. A water-based cleanser follows to remove what&apos;s left. Skipping the oil
        cleanser means residue sits on your skin overnight and muffles every product you layer on
        top.
      </p>
      <p>
        <strong>2. Hydrating toner (or &ldquo;skin&rdquo;).</strong> In K-beauty, a toner is not
        an astringent — it&apos;s a lightweight hydration delivery system applied immediately after
        cleansing, before the skin fully dries. The technique is called <em>the 7 skin method</em>:
        pressing thin layers of toner into the skin repeatedly until it looks plump and dewy.
      </p>
      <p>
        <strong>3. Essence.</strong> This is where Western skincare is still catching up. An
        essence is thinner than a serum but denser than a toner — it sits in the middle of the
        routine and delivers active ingredients (typically ferments, niacinamide, or hyaluronic
        acid) into a now-receptive skin surface.
      </p>
      <p>
        <strong>4. Moisturizer + SPF.</strong> Lock in everything with a cream appropriate for
        your skin type, then seal it with broad-spectrum SPF. No amount of actives will produce
        glass skin if you&apos;re undoing them with daily UV damage.
      </p>

      {/* Product recommendation box 1 */}
      <div className="article-product-box">
        <div className="article-product-inner">
          <div>
            <span className="product-label">Editor Pick</span>
            <h4 className="product-name">COSRX Advanced Snail 96 Mucin Power Essence</h4>
            <span className="product-price">$25</span>
            <p className="product-desc">
              The most-recommended K-beauty essence in the West for good reason. 96% snail
              secretion filtrate repairs the barrier and delivers a lit-from-within glow within
              two weeks of consistent use. Non-greasy, fragrance-free, sensitive-skin approved.
            </p>
          </div>
          <a
            href="https://www.amazon.com/dp/B00PBX3L7K?tag=mintbrooks-20"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="product-link"
          >
            Check Price on Amazon
          </a>
        </div>
      </div>

      <h2>The ingredient layer that most people skip</h2>
      <p>
        Ceramides. If glass skin has a secret, it&apos;s not a trendy serum or a jade
        roller — it&apos;s ceramides. These lipid molecules make up about 50% of the skin
        barrier&apos;s composition. When the barrier is compromised (which it is for most people
        who wash with soap, use alcohol-based products, or live in low-humidity environments),
        water escapes. Your moisturizer sits on top. Your actives bounce off. Your skin looks
        dull, tight, or rough regardless of what you apply.
      </p>
      <p>
        Adding a ceramide-rich product — either a serum or a cream — rebuilds the barrier from
        the inside out. Most people see a measurable difference in texture and radiance within
        three to four weeks.
      </p>
      <p>
        Peptides work in a similar way: they signal the skin to produce more collagen and
        elastin, improving structure and firmness over time. Both ingredients are gentle enough
        for daily use and compatible with almost every other active.
      </p>

      {/* Product recommendation box 2 */}
      <div className="article-product-box">
        <div className="article-product-inner">
          <div>
            <span className="product-label">Also Worth It</span>
            <h4 className="product-name">CeraVe Moisturizing Cream</h4>
            <span className="product-price">$18</span>
            <p className="product-desc">
              Three essential ceramides plus hyaluronic acid in a non-comedogenic formula that
              dermatologists have recommended for decades. Unpretentious packaging, exceptional
              barrier repair. The best ceramide product at any price point.
            </p>
          </div>
          <a
            href="https://www.amazon.com/dp/B00TTD9BRC?tag=mintbrooks-20"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="product-link"
          >
            Check Price on Amazon
          </a>
        </div>
      </div>

      <h2>What actually undermines glass skin (and most people don&apos;t know it)</h2>
      <p>
        Over-exfoliation is the silent glass-skin killer. Acids (AHAs, BHAs) and retinoids are
        powerful tools for skin cell turnover, but when used too frequently, they strip the very
        barrier you&apos;re trying to build. The result is skin that alternates between
        over-dry and over-oily, that stays inflamed, that reacts to products it used to tolerate.
      </p>
      <p>
        The glass-skin approach to exfoliation: once or twice per week, maximum, with a gentle
        AHA (lactic acid is the most barrier-friendly). On all other days, focus exclusively on
        hydration and barrier support. Let the skin rest.
      </p>
      <p>
        Similarly, fragrance — even in &ldquo;natural&rdquo; formulas — is one of the most common
        sensitizers in skincare. If your skin is perpetually reactive or dull, eliminating
        fragranced products for four to six weeks is one of the highest-leverage experiments you
        can run.
      </p>
      <p>
        Glass skin is not a sprint. It is the result of consistent, boring, unglamorous
        decisions — the same cleanser every night, sunscreen every morning, ceramides year-round.
        The glow is the compound interest of skin habits done right.
      </p>
    </div>
  )
}

// ─── Fallback Body ────────────────────────────────────────────────────────────

function FallbackBody({ article }: { article: Article }) {
  return (
    <div className="article-body">
      <p className="article-lede">
        This article is being finalized by our editorial team. We&apos;re committed to publishing
        only thoroughly researched, genuinely useful content — so we take the time to get it
        right.
      </p>
      <p>
        <strong>{article.title}</strong> is part of our {article.category} series. It will
        be available shortly. In the meantime, explore our other guides in this category below,
        or sign up to be notified when this piece publishes.
      </p>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getArticle(slug)

  if (!article) notFound()

  const related = getRelated(article)
  const isGlassSkin = slug === 'glass-skin-routine'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mintbrooks.com'
  const affiliateBodyHtml = await getAffiliateBodyHtml(slug, siteUrl)
  // Only use a product if it's in our affiliate catalogue (has a nano banana image).
  // Anything else — external brands, unrecognised ASINs — is replaced with the
  // top product from our catalogue for this category.
  const extracted = affiliateBodyHtml ? extractTopProduct(affiliateBodyHtml) : null
  const topProduct = (extracted?.image) ? extracted : getCategoryProduct(article.categorySlug)

  const articleExcerpt = ALL_ARTICLES.find((a) => a.slug === slug)?.excerpt ?? `${article.readTime} read · ${article.category} · Mintbrooks`
  const canonicalUrl = `https://mintbrooks.com/articles/${slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: articleExcerpt,
    datePublished: article.date,
    dateModified: article.date,
    author: { '@type': 'Organization', name: 'Mintbrooks Editorial', url: 'https://mintbrooks.com' },
    publisher: { '@type': 'Organization', name: 'Mintbrooks', url: 'https://mintbrooks.com', logo: { '@type': 'ImageObject', url: 'https://mintbrooks.com/logo.png' } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    url: canonicalUrl,
    image: `https://mintbrooks.com${article.image}`,
    articleSection: article.category,
  }

  return (
    <div style={{ background: '#FDFAF6', color: '#1A1714' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Article Grid (header + body + sidebar) ────────────────────── */}
      <div className="article-layout-wrapper">
        <main className="article-main">

          {/* Breadcrumb */}
          <nav
            style={{
              fontSize: '12px',
              color: '#9B9388',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              flexWrap: 'wrap',
            }}
            aria-label="Breadcrumb"
          >
            <Link href="/lifestyle" className="breadcrumb-link">
              Mintbrooks
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/articles" className="breadcrumb-link">
              Articles
            </Link>
            <span aria-hidden="true">/</span>
            <span style={{ color: '#6B6557' }}>{article.category}</span>
          </nav>

          {/* Category pill */}
          <span
            style={{
              display: 'inline-block',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: article.accent,
              background: article.bg,
              borderRadius: '100px',
              padding: '6px 16px',
              marginBottom: '20px',
            }}
          >
            {article.category}
          </span>

          {/* Title */}
          <h1
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 700,
              color: '#1A1714',
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              margin: '0 0 16px',
            }}
          >
            {article.title}
          </h1>

          {/* Meta line */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              color: '#9B9388',
              flexWrap: 'wrap',
              marginBottom: '8px',
            }}
          >
            <span>By The Mintbrooks Team</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime} read</span>
            <span aria-hidden="true">·</span>
            <span>{article.date}</span>
          </div>

          {/* Affiliate disclosure lives once in the global site footer — no inline repetition */}

          {/* Hero image — inline figure inside the article column */}
          <figure className="article-hero-figure">
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 900px"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </figure>

          {/* Article body — interactive surfaces render as real React
              components spliced in at <!--MB_*--> marker comments emitted by
              the generators. Prose chunks between markers ship as HTML. */}
          {affiliateBodyHtml ? (
            <>
              <AuthorBox published={article.date} />
              <ArticleConversionBody
                html={affiliateBodyHtml}
                offerId={inferOfferIdFromSlug(slug)}
                categorySlug={article.categorySlug}
              />
            </>
          ) : isGlassSkin ? (
            <GlassSkinBody />
          ) : (
            <FallbackBody article={article} />
          )}
        </main>
        <ArticleSidebar topProduct={topProduct} category={article.category} />
      </div>

      {/* ── Mobile Sticky Bar ─────────────────────────────────────────── */}
      {topProduct && (
        <div className="mobile-sticky-bar">
          <div className="mobile-bar-info">
            <p className="mobile-bar-label">Top Pick</p>
            <p className="mobile-bar-name">{topProduct.name}</p>
          </div>
          <a
            href={topProduct.link}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="mobile-bar-cta"
          >
            Check Price
          </a>
        </div>
      )}

      {/* ── Related Articles ──────────────────────────────────────────── */}
      {related.length > 0 && (
        <section
          style={{
            background: '#F0EDE8',
            padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 80px)',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(24px, 3.5vw, 38px)',
                fontWeight: 700,
                color: '#1A1714',
                letterSpacing: '-0.02em',
                margin: '0 0 40px',
              }}
            >
              You might also like
            </h2>
            <div className="related-grid">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/articles/${rel.slug}`}
                  className="related-card"
                  style={{
                    display: 'block',
                    background: rel.bg,
                    borderRadius: '16px',
                    padding: '28px 24px',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <span
                    style={{
                      display: 'block',
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: rel.accent,
                      marginBottom: '12px',
                      opacity: 0.85,
                    }}
                  >
                    {rel.category}
                  </span>
                  <h3
                    style={{
                      fontFamily: '"Playfair Display", Georgia, serif',
                      fontSize: 'clamp(16px, 1.8vw, 20px)',
                      fontWeight: 700,
                      color: '#1A1714',
                      margin: '0 0 20px',
                      lineHeight: 1.3,
                      letterSpacing: '-0.015em',
                    }}
                  >
                    {rel.title}
                  </h3>
                  <span
                    style={{
                      fontSize: '12px',
                      color: '#6B6557',
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <circle cx="6" cy="6" r="5" stroke="#6B6557" strokeWidth="1.2" />
                      <path
                        d="M6 3.5v2.75l1.5 1.5"
                        stroke="#6B6557"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </svg>
                    {rel.readTime} read
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Newsletter Capture ────────────────────────────────────────── */}
      <ArticleNewsletter />

      <style>{`
        .breadcrumb-link {
          color: #9B9388;
          text-decoration: none;
          transition: color 0.2s;
        }
        .breadcrumb-link:hover { color: #1A1714; }

        html { scroll-behavior: smooth; }

        ::selection {
          background: rgba(184,149,90,0.22);
          color: #1A1714;
        }

        /* ── Article typography ── */
        .article-body {
          font-size: clamp(16px, 1.8vw, 18px);
          line-height: 1.85;
          color: #1A1714;
        }

        .article-lede {
          font-size: clamp(18px, 2.2vw, 22px);
          line-height: 1.7;
          color: #1A1714;
          margin: 0 0 40px;
          font-weight: 400;
        }

        .article-body p {
          margin: 0 0 26px;
          color: #2D2926;
        }

        .article-body h2 {
          font-family: "Playfair Display", Georgia, serif;
          font-size: clamp(22px, 2.8vw, 30px);
          font-weight: 700;
          color: #1A1714;
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin: 52px 0 20px;
        }

        .article-body strong {
          font-weight: 700;
          color: #1A1714;
        }

        .article-body em {
          font-style: italic;
        }

        /* Pull quote */
        .article-pullquote {
          font-family: "Playfair Display", Georgia, serif;
          font-size: clamp(20px, 2.4vw, 26px);
          font-style: italic;
          font-weight: 400;
          color: #1D3A2F;
          line-height: 1.55;
          margin: 48px 0;
          padding: 0 0 0 28px;
          border-left: 3px solid #B8955A;
        }

        /* ── Upgraded Product Box ── */
        .article-product-box {
          border: 1px solid #EEE9E2;
          background: #fff;
          border-radius: 12px;
          padding: 16px 18px;
          margin: 32px 0;
          border-left: 1px solid #EEE9E2;
        }

        .article-product-inner {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .product-image-slot {
          width: 72px;
          height: 72px;
          background: linear-gradient(135deg, #EEF3F1, #c8dcd6);
          border-radius: 8px;
          flex-shrink: 0;
          overflow: hidden;
        }

        .product-image-slot img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .product-label {
          display: block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #B8955A;
          margin-bottom: 4px;
          font-family: sans-serif;
        }

        .product-name {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 16px;
          font-weight: 700;
          color: #1A1714;
          margin: 0 0 4px;
          letter-spacing: -0.01em;
          line-height: 1.3;
        }

        .product-price {
          display: block;
          font-size: 15px;
          font-weight: 700;
          color: #B8955A;
          margin-bottom: 0;
          font-family: sans-serif;
        }

        .product-desc {
          font-size: 13px;
          color: #6B6557;
          line-height: 1.65;
          margin: 0 0 12px;
        }

        /* Full-width 48px CTA — Oli Gardner standard */
        .product-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          background: #1D3A2F;
          color: #FDFAF6 !important;
          text-align: center;
          padding: 13px 20px;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          min-height: 48px;
          border-bottom: none;
          transition: background 0.2s;
          box-sizing: border-box;
        }

        .product-link:hover { background: #0D1F18; border-color: transparent; }

        /* Related grid */
        .related-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .related-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .related-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(26,23,20,0.09);
        }

        @media (max-width: 860px) {
          .related-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 540px) {
          .related-grid {
            grid-template-columns: 1fr !important;
          }
        }

        /* ── Affiliate article body overrides ── */
        .affiliate-body {
          font-size: clamp(15px, 1.7vw, 17px);
          line-height: 1.8;
          color: #2D2926;
        }
        .affiliate-body h1 {
          font-family: "Playfair Display", Georgia, serif;
          font-size: clamp(24px, 3.5vw, 36px);
          font-weight: 700;
          color: #1A1714;
          letter-spacing: -0.02em;
          margin: 0 0 24px;
        }
        .affiliate-body h2 {
          font-family: "Playfair Display", Georgia, serif;
          font-size: clamp(20px, 2.6vw, 28px);
          font-weight: 700;
          color: #1A1714;
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin: 48px 0 18px;
          border-bottom: 1px solid #EEE9E2;
          padding-bottom: 10px;
        }
        .affiliate-body h3 {
          font-family: "Playfair Display", Georgia, serif;
          font-size: clamp(17px, 2vw, 22px);
          font-weight: 700;
          color: #1A1714;
          margin: 32px 0 12px;
        }
        .affiliate-body p { margin: 0 0 22px; }
        .affiliate-body ul, .affiliate-body ol {
          margin: 0 0 22px;
          padding-left: 22px;
        }
        .affiliate-body li { margin-bottom: 8px; }
        .affiliate-body a {
          color: #1D3A2F;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .affiliate-body a.cta-btn {
          display: inline-block;
          background: #1D3A2F;
          color: #FDFAF6 !important;
          padding: 12px 24px;
          border-radius: 100px;
          text-decoration: none;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin: 8px 0;
          transition: background 0.2s;
        }
        .affiliate-body blockquote {
          background: #F7F4EF;
          border-left: 3px solid #B8955A;
          border-radius: 0 10px 10px 0;
          margin: 32px 0;
          padding: 18px 22px;
          font-style: italic;
          color: #1D3A2F;
        }
        .affiliate-body .disclosure {
          background: #F7F4EF;
          border-radius: 10px;
          padding: 12px 18px;
          font-size: 12px;
          color: #9B9388;
          line-height: 1.5;
          margin-bottom: 32px;
          border-left: 3px solid #B8955A;
        }
        .affiliate-body table {
          width: 100%;
          border-collapse: collapse;
          margin: 28px 0;
          font-size: 14px;
          border-radius: 10px;
          overflow: hidden;
        }
        .affiliate-body th {
          background: #1D3A2F;
          color: #FDFAF6;
          text-align: left;
          padding: 12px 14px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .affiliate-body td {
          padding: 11px 14px;
          border-bottom: 1px solid #EEE9E2;
          color: #2D2926;
          vertical-align: top;
        }
        .affiliate-body tr:nth-child(even) td { background: #F7F4EF; }
        .affiliate-body tr:last-child td { border-bottom: none; }

        /* ── 2-Zone Article Layout ── */
        .article-layout-wrapper {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 300px;
          gap: clamp(32px, 4vw, 60px);
          max-width: 1400px;
          margin: 0 auto;
          padding: clamp(80px, 8vw, 110px) clamp(20px, 5vw, 80px) clamp(60px, 8vw, 100px);
          align-items: start;
        }

        .article-main {
          min-width: 0;
        }

        /* ── Article hero figure (inline in article column) ── */
        .article-hero-figure {
          position: relative;
          margin: 24px 0 36px;
          border-radius: 12px;
          overflow: hidden;
          aspect-ratio: 21/9;
          max-height: 320px;
        }

        /* ── Inline disclosure ── */
        .article-disclosure-inline {
          font-size: 11px;
          color: #B0A99E;
          margin: 0 0 28px;
          font-style: italic;
          font-family: sans-serif;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .article-layout-wrapper {
            grid-template-columns: 1fr;
            padding-bottom: 80px;
          }
          .article-sidebar {
            display: none;
          }
        }

        /* ── Sticky Sidebar ── */
        .article-sidebar {
          position: sticky;
          top: 80px;
          align-self: start;
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-height: calc(100vh - 100px);
          overflow-y: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .article-sidebar::-webkit-scrollbar {
          display: none;
        }

        .sb-card {
          background: #fff;
          border: 1px solid #EEE9E2;
          border-radius: 12px;
          overflow: hidden;
          padding: 0;
        }

        .sb-product-img {
          display: block;
          width: 100%;
          height: 180px;
          object-fit: cover;
          border-radius: 0;
        }

        .sb-card .sb-product-name,
        .sb-card .sb-product-price,
        .sb-card .sb-cta {
          margin-left: 16px;
          margin-right: 16px;
        }

        .sb-card .sb-cta {
          margin-bottom: 16px;
        }

        .sb-product-name {
          margin-top: 14px;
          font-size: 15px;
          font-weight: 700;
          color: #1A1714;
          line-height: 1.35;
          margin: 0 0 6px;
          font-family: sans-serif;
        }

        .sb-product-price {
          display: block;
          font-size: 13px;
          font-weight: 700;
          color: #B8955A;
          margin-bottom: 12px;
          font-family: sans-serif;
        }

        .sb-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #1D3A2F;
          color: #FDFAF6;
          text-align: center;
          padding: 13px 16px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          min-height: 48px;
          transition: background 0.2s;
        }

        .sb-cta:hover { background: #0D1F18; }

        /* Sidebar newsletter */
        .sb-newsletter {
          background: #fff;
          border: 1px solid #EEE9E2;
          border-radius: 12px;
          padding: 16px;
          font-family: sans-serif;
        }

        .sb-nl-title {
          font-size: 14px;
          font-weight: 700;
          color: #1A1714;
          margin: 0 0 4px;
        }

        .sb-nl-sub {
          font-size: 12px;
          color: #6B6557;
          line-height: 1.5;
          margin: 0 0 10px;
        }

        .sb-nl-form {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .sb-nl-input {
          width: 100%;
          padding: 9px 12px;
          border: 1px solid #EEE9E2;
          border-radius: 8px;
          font-size: 13px;
          color: #1A1714;
          background: #fff;
          box-sizing: border-box;
          min-height: 44px;
          font-family: inherit;
        }

        .sb-nl-input:focus { outline: none; border-color: #B8955A; }

        .sb-nl-btn {
          background: #1D3A2F;
          color: #FDFAF6;
          font-size: 12px;
          font-weight: 700;
          padding: 10px 14px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          font-family: inherit;
          min-height: 44px;
          letter-spacing: 0.04em;
          transition: background 0.2s;
        }

        .sb-nl-btn:hover { background: #0D1F18; }

        .sb-nl-success {
          font-size: 13px;
          color: #1D3A2F;
          font-weight: 600;
          margin: 0;
        }

        /* ── Sidebar — Discover yourself quizzes ── */
        .sb-quizzes {
          background: #fff;
          border: 1px solid #EEE9E2;
          border-radius: 12px;
          padding: 16px;
          font-family: sans-serif;
        }

        .sb-quizzes-heading {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #B8955A;
          margin: 0 0 12px;
        }

        .sb-quizzes-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .sb-quiz-item {
          border-radius: 8px;
        }

        .sb-quiz-item--active {
          background: #FDFAF6;
        }

        .sb-quiz-item-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding: 10px 10px;
          text-decoration: none;
          border-radius: 8px;
          transition: background 0.15s;
        }

        .sb-quiz-item-link:hover {
          background: #F5F0E8;
        }

        .sb-quiz-item-title {
          font-size: 13px;
          font-weight: 500;
          color: #1A1714;
          line-height: 1.35;
          flex: 1;
        }

        .sb-quiz-item--active .sb-quiz-item-title {
          font-weight: 700;
          color: #1D3A2F;
        }

        .sb-quiz-item-arrow {
          font-size: 13px;
          color: #B8955A;
          flex-shrink: 0;
        }

        /* ── Mobile Sticky Bar ── */
        .mobile-sticky-bar {
          display: none;
        }

        @media (max-width: 768px) {
          .mobile-sticky-bar {
            display: flex;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: #1A1714;
            padding: 10px 16px;
            padding-bottom: calc(10px + env(safe-area-inset-bottom));
            justify-content: space-between;
            align-items: center;
            z-index: 100;
            border-top: 1px solid rgba(255,255,255,0.08);
            min-height: 56px;
          }
        }

        .mobile-bar-info { overflow: hidden; }

        .mobile-bar-label {
          font-size: 10px;
          color: rgba(255,255,255,0.5);
          font-family: sans-serif;
          margin: 0 0 2px;
        }

        .mobile-bar-name {
          font-size: 13px;
          font-weight: 700;
          color: #FDFAF6;
          font-family: sans-serif;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 200px;
        }

        .mobile-bar-cta {
          background: #B8955A;
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          padding: 10px 18px;
          border-radius: 100px;
          text-decoration: none;
          white-space: nowrap;
          min-height: 44px;
          min-width: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-left: 12px;
        }

        /* ── In-Article Figures ── */
        .article-body figure.article-figure,
        .affiliate-body figure.article-figure {
          margin: 32px 0;
          border-radius: 10px;
          overflow: hidden;
        }

        .article-body figure.article-figure img,
        .affiliate-body figure.article-figure img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 10px;
        }

        .article-body figure.article-figure figcaption,
        .affiliate-body figure.article-figure figcaption {
          font-size: 12px;
          color: #9B9388;
          font-style: italic;
          margin-top: 8px;
          padding: 0 4px;
          font-family: sans-serif;
          line-height: 1.5;
        }

        /* ── Stat Callout ── */
        .article-body .stat-callout,
        .affiliate-body .stat-callout {
          background: linear-gradient(135deg, #1D3A2F 0%, #2c5a47 100%);
          border-radius: 12px;
          padding: clamp(20px, 3vw, 32px) clamp(24px, 4vw, 40px);
          margin: 36px 0;
          color: #FDFAF6;
          text-align: center;
        }

        .stat-callout-number {
          font-family: "Playfair Display", Georgia, serif;
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 700;
          color: #B8955A;
          line-height: 1;
          display: block;
          margin-bottom: 10px;
        }

        .stat-callout-label {
          font-size: clamp(13px, 1.6vw, 16px);
          opacity: 0.85;
          line-height: 1.5;
          display: block;
        }

        /* ── Pro/Con Cards ── */
        .article-body .pro-con-grid,
        .affiliate-body .pro-con-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 12px;
          margin: 28px 0;
        }

        .pro-card, .con-card {
          border-radius: 10px;
          padding: 16px 18px;
        }

        .pro-card {
          background: #EEF3F1;
          border: 1px solid #c8dcd6;
        }

        .con-card {
          background: #FDF0F2;
          border: 1px solid #e8c5ca;
        }

        .pro-card-title {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #2C4A3E;
          margin-bottom: 10px;
          font-family: sans-serif;
        }

        .con-card-title {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #8B2A35;
          margin-bottom: 10px;
          font-family: sans-serif;
        }

        .pro-card ul, .con-card ul {
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .pro-card li, .con-card li {
          font-size: 13px;
          margin-bottom: 6px;
          padding-left: 18px;
          position: relative;
          line-height: 1.5;
        }

        .pro-card li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #2C4A3E;
          font-weight: 700;
        }

        .con-card li::before {
          content: '✗';
          position: absolute;
          left: 0;
          color: #8B2A35;
          font-weight: 700;
        }

        /* ── Rating Bars ── */
        .article-body .rating-bar-group,
        .affiliate-body .rating-bar-group {
          background: #F7F4EF;
          border-radius: 10px;
          padding: 16px 20px;
          margin: 24px 0;
        }

        .rating-bar-title {
          font-size: 13px;
          font-weight: 700;
          color: #1A1714;
          margin-bottom: 12px;
          font-family: sans-serif;
        }

        .rating-bar-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }

        .rating-bar-label {
          font-size: 12px;
          color: #6B6557;
          width: 90px;
          flex-shrink: 0;
          font-family: sans-serif;
        }

        .rating-bar-track {
          flex: 1;
          min-width: 0;
          height: 6px;
          background: #EEE9E2;
          border-radius: 100px;
          overflow: hidden;
        }

        .rating-bar-fill {
          height: 100%;
          background: #B8955A;
          border-radius: 100px;
        }

        .rating-bar-score {
          font-size: 11px;
          font-weight: 700;
          color: #1A1714;
          width: 28px;
          text-align: right;
          flex-shrink: 0;
          font-family: sans-serif;
        }

        /* ── Key Takeaway ── */
        .article-body .key-takeaway,
        .affiliate-body .key-takeaway {
          border-left: 4px solid #B8955A;
          background: #F7F4EF;
          border-radius: 0 10px 10px 0;
          padding: 16px 20px;
          margin: 28px 0;
        }

        .key-takeaway-label {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: #B8955A;
          margin-bottom: 8px;
          display: block;
          font-family: sans-serif;
        }

        .key-takeaway p {
          margin: 0;
          font-size: 15px;
          color: #1D3A2F;
          font-weight: 500;
          line-height: 1.6;
        }

        /* ── Table Scroll Wrapper ── */
        .table-wrap {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          margin: 28px 0;
          border-radius: 10px;
          border: 1px solid #EEE9E2;
        }

        .table-wrap table {
          margin: 0;
          border-radius: 0;
          min-width: 480px;
        }

        /* ── Reduced Motion (mandatory) ── */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* ── Table of Contents Card ── */
        .affiliate-body .toc,
        .article-body .toc {
          border: 1px solid #EEE9E2;
          background: #F7F4EF;
          border-radius: 10px;
          padding: 18px 22px;
          margin-bottom: 32px;
        }

        .affiliate-body .toc p,
        .article-body .toc p {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: #6B6557;
          margin: 0 0 10px;
          font-family: sans-serif;
        }

        .affiliate-body .toc ol,
        .affiliate-body .toc ul,
        .article-body .toc ol,
        .article-body .toc ul {
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .affiliate-body .toc li,
        .article-body .toc li {
          margin-bottom: 0;
        }

        .affiliate-body .toc a,
        .article-body .toc a {
          display: block;
          font-size: 14px;
          color: #1D3A2F;
          text-decoration: underline;
          text-underline-offset: 3px;
          padding: 5px 0;
          border-bottom: none;
        }

        .affiliate-body .toc a:hover,
        .article-body .toc a:hover {
          color: #B8955A;
        }

        /* Mobile: publisher.py generates <details class="toc-mobile"> */
        .affiliate-body details.toc-mobile,
        .article-body details.toc-mobile {
          border: 1px solid #EEE9E2;
          background: #F7F4EF;
          border-radius: 10px;
          padding: 12px 16px;
          margin-bottom: 24px;
        }

        .affiliate-body details.toc-mobile summary,
        .article-body details.toc-mobile summary {
          font-size: 13px;
          font-weight: 700;
          color: #1A1714;
          cursor: pointer;
          list-style: none;
          font-family: sans-serif;
        }

        .affiliate-body details.toc-mobile summary::after,
        .article-body details.toc-mobile summary::after {
          content: ' ▾';
          color: #B8955A;
        }

        .affiliate-body details[open].toc-mobile summary::after,
        .article-body details[open].toc-mobile summary::after {
          content: ' ▴';
        }
      `}</style>
    </div>
  )
}
