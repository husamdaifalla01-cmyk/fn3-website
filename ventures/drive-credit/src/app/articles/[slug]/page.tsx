export const runtime = 'edge'

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ArticleNewsletter from './ArticleNewsletter'
import ArticleSidebar from './ArticleSidebar'
import { EDITORIAL_CONTENT } from '@/lib/editorial-content'

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
]

async function getAffiliateBodyHtml(slug: string, siteUrl: string): Promise<string | null> {
  // 1. Check bundled editorial content (no network fetch needed)
  if (EDITORIAL_CONTENT[slug]) {
    return injectLinkAttrs(EDITORIAL_CONTENT[slug])
  }

  // 2. Try affiliate article (still fetched at runtime)
  try {
    const res = await fetch(`${siteUrl}/articles/affiliate/${slug}/index.html`, { cache: 'no-store' })
    if (res.ok) {
      const raw = await res.text()
      const match = raw.match(/<article>([\s\S]*?)<\/article>/)
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
}

/**
 * Parse the first .article-product-box from publisher.py-generated HTML.
 * Runs server-side at edge — zero bundle cost.
 */
function extractTopProduct(html: string): TopProduct | null {
  const nameMatch = html.match(/<h4[^>]*class="product-name"[^>]*>([\s\S]*?)<\/h4>/i)
  const priceMatch = html.match(/<span[^>]*class="product-price"[^>]*>([\s\S]*?)<\/span>/i)
  const anchorMatch = html.match(/<a[^>]*class="product-link"[^>]*>/)
  const linkMatch = anchorMatch ? anchorMatch[0].match(/href="([^"]*)"/) : null
  if (!nameMatch || !linkMatch) return null
  return {
    name: nameMatch[1].replace(/<[^>]+>/g, '').trim(),
    price: priceMatch ? priceMatch[1].replace(/<[^>]+>/g, '').trim() : '',
    link: linkMatch[1],
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getArticle(slug: string): Article | undefined {
  return ALL_ARTICLES.find((a) => a.slug === slug)
}

function getRelated(article: Article): Article[] {
  return ALL_ARTICLES.filter(
    (a) => a.category === article.category && a.slug !== article.slug
  ).slice(0, 3)
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
  const ogImage = `https://mintbrooks.com${article.image}`
  const canonical = `https://mintbrooks.com/lifestyle/articles/${slug}`
  return {
    title: article.title,
    description: excerpt,
    alternates: { canonical },
    openGraph: {
      title: article.title,
      description: excerpt,
      type: 'article',
      url: canonical,
      images: [{ url: ogImage, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: excerpt,
      images: [ogImage],
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
  const topProduct = affiliateBodyHtml ? extractTopProduct(affiliateBodyHtml) : null

  return (
    <div style={{ background: '#FDFAF6', color: '#1A1714', overflowX: 'hidden' }}>

      {/* ── Article Header ────────────────────────────────────────────── */}
      <header
        style={{
          background: '#FDFAF6',
          padding: 'clamp(120px, 14vw, 180px) clamp(20px, 5vw, 80px) 0',
        }}
      >
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          {/* Breadcrumb */}
          <nav
            style={{
              fontSize: '12px',
              color: '#9B9388',
              marginBottom: '28px',
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
              marginBottom: '24px',
            }}
          >
            {article.category}
          </span>

          {/* Title */}
          <h1
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(32px, 5vw, 58px)',
              fontWeight: 700,
              color: '#1A1714',
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              margin: '0 0 24px',
            }}
          >
            {article.title}
          </h1>

          {/* Author / meta line */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              color: '#9B9388',
              flexWrap: 'wrap',
              marginBottom: '28px',
            }}
          >
            <span>By The Mintbrooks Team</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime} read</span>
            <span aria-hidden="true">·</span>
            <span>{article.date}</span>
          </div>

          {/* Affiliate disclosure */}
          <div
            style={{
              background: '#F7F4EF',
              borderRadius: '10px',
              padding: '12px 18px',
              fontSize: '12px',
              color: '#9B9388',
              lineHeight: 1.5,
              marginBottom: '40px',
            }}
          >
            This article may contain affiliate links. We earn a small commission at no extra cost
            to you. We only recommend products we&apos;d genuinely use.
          </div>
        </div>
      </header>

      {/* ── Article Hero Image ────────────────────────────────────────── */}
      <div
        style={{
          padding: '0 clamp(20px, 5vw, 80px)',
          marginBottom: 'clamp(48px, 6vw, 80px)',
        }}
      >
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            position: 'relative',
            height: 'clamp(280px, 40vw, 480px)',
            borderRadius: '16px',
            overflow: 'hidden',
          }}
        >
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1100px"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>

      {/* ── Article Body + Sidebar ─────────────────────────────────────── */}
      <div className="article-layout-wrapper">
        <main className="article-main">
          {affiliateBodyHtml ? (
            <div
              className="article-body affiliate-body"
              dangerouslySetInnerHTML={{ __html: affiliateBodyHtml }}
            />
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
                  href={`/lifestyle/articles/${rel.slug}`}
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
        @keyframes ls-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

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
          grid-template-columns: minmax(0, 1fr) 260px;
          gap: clamp(28px, 4vw, 52px);
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 48px) clamp(60px, 8vw, 100px);
          align-items: start;
        }

        .article-main {
          min-width: 0;
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
          gap: 12px;
        }

        .sb-card {
          background: #fff;
          border: 1px solid #EEE9E2;
          border-radius: 12px;
          padding: 16px;
        }

        .sb-label {
          display: block;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: #B8955A;
          margin-bottom: 10px;
          font-family: sans-serif;
        }

        .sb-product-name {
          font-size: 14px;
          font-weight: 700;
          color: #1A1714;
          line-height: 1.3;
          margin: 0 0 4px;
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
          background: #F7F4EF;
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

        /* Sidebar quiz */
        .sb-quiz {
          background: linear-gradient(135deg, #1D3A2F, #2c5a47);
          border-radius: 12px;
          padding: 16px;
          font-family: sans-serif;
          color: #FDFAF6;
        }

        .sb-quiz-title {
          font-size: 13px;
          font-weight: 700;
          line-height: 1.35;
          margin: 0 0 4px;
        }

        .sb-quiz-sub {
          font-size: 11px;
          opacity: 0.75;
          margin: 0 0 10px;
        }

        .sb-quiz-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #B8955A;
          color: #fff;
          text-align: center;
          font-size: 12px;
          font-weight: 700;
          padding: 8px 12px;
          border-radius: 8px;
          text-decoration: none;
          min-height: 44px;
          transition: opacity 0.2s;
        }

        .sb-quiz-cta:hover { opacity: 0.88; }

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
      `}</style>
    </div>
  )
}
