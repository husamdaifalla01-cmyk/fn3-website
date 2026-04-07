import { ARTICLES } from './articles'

export interface EditorialArticle {
  slug: string
  title: string
  category: string
  categorySlug: string
  readTime: string
  date?: string
  image: string
  accent: string
  bg: string
  excerpt: string
  featured: boolean
}

const EXCERPTS: Record<string, string> = {
  'bedroom-feel-expensive':
    "There's a reason some rooms read as hotels and others read as apartments — and it has nothing to do with price. The seven shifts that consistently fool the eye are simpler than you think.",
  'shelf-decor-321-rule':
    "Interior designers follow one rule when styling shelves and almost never explain it. The 3-2-1 system takes ten minutes to learn and makes every shelf look intentional.",
  'linen-vs-cotton-bedding':
    "Linen costs more, washes better, and gets softer every year — but it's not right for everyone. Here's the honest comparison that saves you from a $200 regret.",
  'coffee-table-styling':
    "A coffee table that looks designed isn't styled randomly. There's a geometry to it that designers use every time, and it works with anything you already own.",
  'affordable-art-prints':
    "The art world's best-kept secret: some of the most compelling prints available right now cost under $30 and are indistinguishable from gallery pieces at scale. Here's where to find them.",
  'cotton-throw-blankets':
    "We bought, washed, and lived with six organic cotton throw blankets for three months. Two of them survived the test. The others you can skip.",
  'candle-warmer-lamp':
    "This $40 lamp made my entire evening routine feel different — and I didn't expect that from a piece of home hardware. Here's exactly why it works.",
  'morning-rituals':
    "The best morning routines take under ten minutes, cost nothing, and don't require waking up earlier. What they require is sequence — and these five rituals deliver it.",
  'weighted-blankets-guide':
    "Weighted blankets went from medical device to mainstream in three years. The science behind them is real, but who actually benefits from them (and who doesn't) is rarely explained honestly.",
  'diffuser-oil-combinations':
    "Most diffuser combinations smell fine. A few of them change the feeling of a room. These are the ones worth trying — and the ones to skip.",
  'sleep-routine-vs-supplements':
    "Melatonin, magnesium, ashwagandha — the supplement industry built a $3B category on a problem that often has a free solution. Here's what the research actually says.",
  'hatch-alarm-clock-review':
    "The Hatch costs $169 and competes with your phone as a sleep tool. After six months, here's an honest verdict on whether it's worth displacing everything else on your nightstand.",
  'glass-skin-routine':
    "Glass skin isn't a filter. It's the result of four boring, unglamorous decisions done consistently — and Korean skincare figured them out a decade before the rest of the world caught up.",
  'vitamin-c-serum-review':
    "We tested six vitamin C serums across three skin types, tracked results for eight weeks, and found that price had almost no correlation to performance. Two stood out.",
  'retinol-mistakes':
    "The biggest retinol mistake isn't using it wrong — it's the second thing most people do after they start. Here's the full picture before you add it to your routine.",
  'spf-moisturizer-vs-sunscreen':
    "The SPF number in your moisturizer isn't lying to you — it's just not telling you the whole story. Here's how real protection actually works.",
  'clean-beauty-explained':
    "Clean beauty labels are everywhere and regulated almost nowhere. Here's what the terminology actually means, what to look for, and what's marketing.",
  'skincare-routine-sensitive-skin':
    "Sensitive skin doesn't need fewer products — it needs the right sequence and the right ingredients. This five-step routine was designed specifically for skin that reacts to everything.",
  'coffee-bar-setup':
    "A home coffee setup that reads like a café costs a fraction of what you'd expect — if you know which three pieces actually matter and which eight you can skip.",
  'cast-iron-skillet-guide':
    "Cast iron is the most forgiving, most durable, and most misunderstood piece of kitchen equipment you'll ever own. Here's everything you need to know to use it well.",
  'kitchen-organization':
    "Aesthetic kitchen organization isn't about buying more containers — it's about a visual logic that makes cooking feel easier. Here's the system that actually holds up.",
  'kitchen-knives-guide':
    "Most home cooks own six knives and need one. The right one — properly maintained — will outlast everything else in your kitchen by decades.",
  'pour-over-vs-french-press':
    "Pour-over and French press produce completely different cups from the same beans. The better choice depends on one thing: what you actually want from your coffee.",
  'meal-prep-containers':
    "Most meal prep containers are either efficient or attractive. These are the ones that are both — tested over four months of actual weekly prep.",
  'what-is-credit-score':
    "Your credit score is a number that determines what things cost you — from apartments to car loans to credit cards. Here's what it actually measures and why it matters more than most people realize.",
  'build-credit-from-scratch':
    "Building credit with no credit history used to require knowing the right moves. The fastest paths now are more accessible than they've ever been — and one of them takes less than a week to start.",
  'use-credit-card-responsibly':
    "A credit card used correctly is one of the most valuable financial tools available. The difference between building wealth and building debt comes down to one habit.",
  'secured-vs-unsecured-cards':
    "Secured cards and unsecured cards look identical in your wallet. The difference in how they work — and which one you should get first — matters a lot more than most guides admit.",
  'credit-utilization-explained':
    "Payment history matters, but credit utilization can move your score faster in both directions. Here's how to use it strategically instead of letting it work against you.",
  'build-credit-bad-credit':
    "Bad credit isn't permanent — it's a starting point. The fastest paths to meaningful improvement don't require a credit repair agency, a secured card, or waiting years.",

  // ── Affiliate articles ───────────────────────────────────────────────────────
  'best-anti-aging-serum':
    "Retinol firms. Vitamin C brightens. Niacinamide evens. Knowing which one your skin actually needs — and in which order — is what separates results from frustration.",
  'best-anti-aging-serum-beginners-budget':
    "You don't need a $200 serum to start reversing the signs of aging. The most effective beginner picks are affordable, gentle, and already trusted by tens of thousands of reviewers.",
  'best-serum-for-dark-spots':
    "Dark spots are one of the most treatable skin concerns — with the right active ingredients. These serums target hyperpigmentation with clinical-grade precision at consumer prices.",
  'la-roche-posay-vitamin-c-vs-retinol':
    "La Roche-Posay makes the best drugstore versions of both. The question isn't which is better — it's which problem you're solving, and whether your skin can handle both at once.",
  'best-clean-liquid-foundation':
    "Clean beauty foundations have finally caught up to conventional formulas in coverage and longevity — without the ingredient list that reads like a chemistry exam.",
  'clean-foundation-for-beginners':
    "The cleanest foundations are also some of the most forgiving. These picks blend easily, build naturally, and won't require a tutorial to look polished.",
  'harvest-natural-beauty-vs-jerome-alexander-foundation-beginners':
    "Both are beloved by clean beauty newcomers. Both perform well. But they feel completely different on skin — and choosing the wrong one makes all the difference.",
  'best-neutral-eyeshadow-palette':
    "A great neutral palette handles every look from a five-minute morning routine to a full evening edit. These are the ones that deliver on pigment, blend, and longevity without drama.",
  'best-eyeshadow-palette-under-50':
    "Sub-$50 eyeshadow palettes used to mean compromise. These picks prove that formula, pigment, and shade range don't require a luxury price tag.",
  'too-faced-born-this-way-vs-tarte-tartelette-in-bloom':
    "Two of the most recommended neutral palettes in makeup — compared honestly on pigment intensity, fallout, blendability, and who each one actually works best for.",
  'best-hair-bonding-oil-olaplex-7-review':
    "Olaplex No. 7 has earned its cult status — but it's not the only bonding oil worth considering. Here's how it stacks up against the competition on damaged and color-treated hair.",
  'kerastase-kenra-glass-hair-showdown':
    "Glass hair requires the right gloss treatment. We tested Kerastase Gloss Absolu and Kenra Platinum side by side — the results at two very different price points were surprising.",
  'kerastase-nutritive-8h-magic-night-serum-review':
    "An overnight hair treatment that promises to repair while you sleep. Four weeks of testing on dry, brittle hair revealed what actually changes — and what stays the same.",
  'best-linen-duvet-cover-sets-luxury-budget':
    "French linen bedding is one of the few home investments that genuinely improves with age. These picks span every budget — and we explain exactly what you're paying for at each tier.",
  'best-chunky-knit-throw-blanket-under-50':
    "The right throw blanket does three things: adds texture, provides real warmth, and holds its shape after washing. These picks under $50 do all three without looking like a craft project.",
  'best-waffle-duvet-cover-queen':
    "Waffle weave has become the go-to texture for elevated, minimalist bedrooms. These queen-size covers deliver the look, the breathability, and the durability to back it up.",
  'best-drip-irrigation-kits':
    "A drip irrigation kit pays for itself in the first season — in saved water, healthier roots, and fewer hours spent with a hose. Here's which setup to actually buy.",
  'best-drip-irrigation-system':
    "Not all drip irrigation systems are created equal. The right one depends on your garden size, plant types, and how much time you want to spend on setup.",
  'best-garden-tool-set-for-women-gifts':
    "The best garden tools are ergonomic, durable, and sized for the hand that holds them. These sets make a genuinely useful gift — not a decorative one that collects dust.",
  'best-garden-tool-sets-for-women':
    "Quality tools make gardening less effort and more enjoyment. These sets are built for real use, sized thoughtfully, and priced for people who actually garden.",
  'drip-irrigation-kit-comparison':
    "We compared the leading drip irrigation kits side by side on coverage, ease of install, and long-term durability. The best pick depends on one thing — your garden's footprint.",
  'best-sous-vide-machine-review':
    "Sous vide transforms home cooking — if you pick the right circulator. We compare power, app connectivity, and value across the machines that actually belong in a home kitchen.",
  'best-air-fryer-small-spaces':
    "A compact air fryer changes the way a small kitchen operates. These picks deliver full-size crispness in a countertop footprint that won't crowd out everything else.",
  'sous-vide-accessories-large-batches':
    "Sous vide scales better than almost any cooking method — but only if your container, racks, and bags can keep up. Here's the gear that makes bulk cooking effortless.",
  'best-self-care-gift-baskets-women':
    "A thoughtfully curated self-care basket says more than any single product could. These sets are the ones worth actually giving — assembled with intention, not just filler.",
  'best-birthday-gifts-women-under-40':
    "The best birthday gifts feel considered without being over-the-top. These picks under $40 land somewhere between luxurious and practical — which is exactly where the best gifts live.",
  'best-vintage-self-care-gift-basket':
    "Self-care gifts don't have to look utilitarian. These vintage-inspired baskets combine genuine wellness value with an aesthetic that makes the unwrapping feel like an event.",
  'best-get-well-soon-gift-baskets':
    "A get-well basket should be comforting, practical, and genuinely useful — not just flowers with a card attached. These picks are the ones that recipients actually reach for.",
}

const FEATURED_SLUGS = new Set([
  'bedroom-feel-expensive',
  'coffee-table-styling',
  'candle-warmer-lamp',
  'morning-rituals',
  'glass-skin-routine',
  'vitamin-c-serum-review',
  'coffee-bar-setup',
  'cast-iron-skillet-guide',
  'what-is-credit-score',
  'build-credit-from-scratch',
])

const CATEGORY_SLUG_MAP: Record<string, string> = {
  'home-decor': 'home-decor',
  'wellness': 'wellness',
  'beauty': 'beauty',
  'kitchen': 'kitchen',
  'finance': 'finance',
}

const CATEGORY_LABEL_MAP: Record<string, string> = {
  'home-decor': 'Home & Decor',
  'wellness': 'Wellness',
  'beauty': 'Beauty',
  'kitchen': 'Kitchen',
  'finance': 'Money & Credit',
}

export const EDITORIAL_ARTICLES: EditorialArticle[] = ARTICLES.map((article) => ({
  slug: article.slug,
  title: article.title,
  category: CATEGORY_LABEL_MAP[article.category] ?? article.categoryLabel,
  categorySlug: CATEGORY_SLUG_MAP[article.category] ?? article.category,
  readTime: article.readTime,
  image: `/lifestyle/${article.category}.jpg`,
  accent: article.accent,
  bg: article.bg,
  excerpt: EXCERPTS[article.slug] ?? article.excerpt,
  featured: FEATURED_SLUGS.has(article.slug),
}))

export function getEditorialArticle(slug: string): EditorialArticle | undefined {
  return EDITORIAL_ARTICLES.find((a) => a.slug === slug)
}

export function getFeaturedEditorialArticles(categorySlug?: string): EditorialArticle[] {
  const featured = EDITORIAL_ARTICLES.filter((a) => a.featured)
  if (!categorySlug) return featured
  return featured.filter((a) => a.categorySlug === categorySlug)
}
