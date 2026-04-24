'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getProductsByCategory, type Product } from '@/lib/lifestyle/products'
import { OFFERS, buildAffiliateUrl } from '@/lib/offers'

// ─── Quiz Data ───────────────────────────────────────────────────────────────

type QuizQuestion = {
  question: string
  subtext?: string
  answers: { label: string; value: string }[]
}

type Persona = {
  name: string
  headline: string
  description: string
  productFilter?: (p: Product) => boolean
}

type QuizConfig = {
  title: string
  subtitle: string
  icon: string
  productCategory: string | null
  questions: QuizQuestion[]
  getPersona: (answers: string[]) => Persona
}

const QUIZZES: Record<string, QuizConfig> = {
  beauty: {
    title: 'Discover Your Skin Story',
    subtitle: 'Three questions. A ritual made for exactly who you are.',
    icon: '✦',
    productCategory: 'beauty',
    questions: [
      {
        question: 'How does your skin feel by midday?',
        answers: [
          { label: 'Tight and thirsty — craving moisture all day', value: 'dry' },
          { label: 'Shiny and slick — especially the T-zone', value: 'oily' },
          { label: 'A little of both — it keeps me guessing', value: 'combo' },
          { label: 'Reactive — new products make me nervous', value: 'sensitive' },
        ],
      },
      {
        question: 'What matters most to you right now?',
        answers: [
          { label: 'A lit-from-within, glass-skin glow', value: 'glow' },
          { label: 'Firming, lifting — fighting time gracefully', value: 'antiaging' },
          { label: 'Calm, clear, and balanced', value: 'calm' },
          { label: 'Just clean, healthy skin — nothing fussy', value: 'basics' },
        ],
      },
      {
        question: "What's your relationship with your skincare routine?",
        answers: [
          { label: 'Minimal — three steps, two minutes, done', value: 'minimal' },
          { label: 'A slow ritual I genuinely look forward to', value: 'ritual' },
          { label: 'Intuitive — I listen to what my skin needs', value: 'intuitive' },
          { label: 'Evidence-based — I research every ingredient', value: 'informed' },
        ],
      },
    ],
    getPersona: ([skin, goal]) => {
      if (skin === 'sensitive' || goal === 'calm')
        return {
          name: 'The Sensitive Soul',
          headline: 'You\'re The Sensitive Soul',
          description: 'Your skin is communicative — it tells you exactly what it needs. These picks are chosen for gentle efficacy: calming actives, minimal irritants, and formulas dermatologists trust for reactive skin.',
        }
      if (goal === 'antiaging')
        return {
          name: 'The Timeless',
          headline: 'You\'re The Timeless',
          description: 'You\'re playing the long game. These are the gold-standard anti-aging picks — retinoids, peptides, and SPF that actually move the needle on fine lines and firmness.',
        }
      if (goal === 'glow' || skin === 'dry')
        return {
          name: 'The Luminous',
          headline: 'You\'re The Luminous',
          description: 'You want skin that looks like it glows from within — hydrated, radiant, and alive. These picks are our highest-rated for delivering that lit glass-skin effect.',
        }
      return {
        name: 'The Intentional',
        headline: 'You\'re The Intentional',
        description: 'You know what works and you stick to it. These are our most consistently loved picks — proven performers that deliver clean, healthy skin without drama.',
      }
    },
  },

  'home-decor': {
    title: 'Discover Your Space Personality',
    subtitle: 'Your home is a self-portrait. Let\'s find out who\'s in it.',
    icon: '◈',
    productCategory: 'home-decor',
    questions: [
      {
        question: 'When you walk into a room, what stops you in your tracks?',
        answers: [
          { label: 'Soft textures and layered warmth — it feels like a hug', value: 'cozy' },
          { label: 'Clean lines and open space — breathing room', value: 'minimal' },
          { label: 'Something unexpected — art, color, a story', value: 'eclectic' },
          { label: 'Natural light and earthy materials — grounded', value: 'organic' },
        ],
      },
      {
        question: 'What does your ideal Sunday morning look like?',
        answers: [
          { label: 'Wrapped in a blanket with coffee and a book', value: 'cozy' },
          { label: 'Productive, tidy, calm — everything in its place', value: 'minimal' },
          { label: 'Slow, creative — sketching, playlists, wandering thoughts', value: 'eclectic' },
          { label: 'Outside, or surrounded by plants and natural light', value: 'organic' },
        ],
      },
      {
        question: 'If you had to pick one word for how you want your home to feel:',
        answers: [
          { label: 'Sanctuary', value: 'cozy' },
          { label: 'Serene', value: 'minimal' },
          { label: 'Alive', value: 'eclectic' },
          { label: 'Rooted', value: 'organic' },
        ],
      },
    ],
    getPersona: (answers) => {
      const counts: Record<string, number> = {}
      for (const a of answers) counts[a] = (counts[a] ?? 0) + 1
      const dominant = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]
      const map: Record<string, Persona> = {
        cozy: {
          name: 'The Nester',
          headline: 'You\'re The Nester',
          description: 'Home is your sanctuary, and you build it deliberately. You layer textures, collect comfort, and create spaces that feel like a long exhale. These picks were made for you.',
        },
        minimal: {
          name: 'The Editor',
          headline: 'You\'re The Editor',
          description: 'You know that less is more — and you curate ruthlessly. Clean surfaces, intentional objects, breathing room. These picks favor quiet design that earns its place.',
        },
        eclectic: {
          name: 'The Collector',
          headline: 'You\'re The Collector',
          description: 'Your space has personality because you do. You mix eras, find beauty in the unexpected, and refuse to follow rules. These picks reward a bold, story-driven eye.',
        },
        organic: {
          name: 'The Grounded',
          headline: 'You\'re The Grounded',
          description: 'You bring the outside in — wood, stone, linen, light. Your aesthetic is rooted in the natural world, and your space reflects that quiet, earthy confidence.',
        },
      }
      return map[dominant] ?? map.organic
    },
  },

  kitchen: {
    title: 'Discover Your Kitchen Personality',
    subtitle: 'The way you cook says everything about who you are.',
    icon: '◎',
    productCategory: 'kitchen',
    questions: [
      {
        question: 'When you open the fridge on a weeknight, you:',
        answers: [
          { label: 'Already know exactly what you\'re making', value: 'planner' },
          { label: 'See what\'s there and improvise something decent', value: 'improviser' },
          { label: 'Order delivery — cooking wasn\'t in the plan', value: 'aspirational' },
          { label: 'Make something simple but really, really good', value: 'purist' },
        ],
      },
      {
        question: 'The kitchen tool you\'d take to a desert island:',
        answers: [
          { label: 'A sharp chef\'s knife — the rest is just noise', value: 'purist' },
          { label: 'A cast iron skillet — one pan, infinite meals', value: 'planner' },
          { label: 'Something high-tech that does the work for me', value: 'aspirational' },
          { label: 'Whatever I grab in the moment', value: 'improviser' },
        ],
      },
      {
        question: 'Cooking for you is:',
        answers: [
          { label: 'A daily meditation — you lose yourself in it', value: 'purist' },
          { label: 'A creative outlet — you\'re always riffing', value: 'improviser' },
          { label: 'A mission — you\'re building skills intentionally', value: 'planner' },
          { label: 'A means to an end — you want great food, fast', value: 'aspirational' },
        ],
      },
    ],
    getPersona: ([q1, , q3]) => {
      const signal = q3 === 'purist' || q1 === 'purist' ? 'purist'
        : q3 === 'improviser' || q1 === 'improviser' ? 'improviser'
        : q1 === 'planner' || q3 === 'planner' ? 'planner'
        : 'aspirational'
      const map: Record<string, Persona> = {
        purist: {
          name: 'The Craftsman',
          headline: 'You\'re The Craftsman',
          description: 'Cooking is your craft. You value precision, quality ingredients, and tools that last a lifetime. These picks are built for cooks who don\'t cut corners.',
        },
        improviser: {
          name: 'The Riff Artist',
          headline: 'You\'re The Riff Artist',
          description: 'Recipes are just suggestions. You cook by feel, season by taste, and somehow it always works out. These picks are versatile enough to match your creative chaos.',
        },
        planner: {
          name: 'The Systems Cook',
          headline: 'You\'re The Systems Cook',
          description: 'Sunday meal prep is a sacred ritual. You batch, organize, and optimize your kitchen like a professional. These picks are designed for efficiency and repeatability.',
        },
        aspirational: {
          name: 'The Kitchen Apprentice',
          headline: 'You\'re The Kitchen Apprentice',
          description: 'You want to cook well — you just need the right tools to make it easy. These are the approachable upgrades that make every meal feel intentional, even weeknight pasta.',
        },
      }
      return map[signal]
    },
  },

  wellness: {
    title: 'Discover Your Wellness Archetype',
    subtitle: 'Your body knows things your calendar doesn\'t. Let\'s listen.',
    icon: '◯',
    productCategory: 'wellness',
    questions: [
      {
        question: 'When do you feel most like yourself?',
        answers: [
          { label: 'Early morning — quiet, before the world wakes up', value: 'morning' },
          { label: 'After movement — a run, a stretch, anything physical', value: 'active' },
          { label: 'In stillness — meditative, breathing, slowing down', value: 'stillness' },
          { label: 'Late night — when you finally have time for yourself', value: 'evening' },
        ],
      },
      {
        question: "What's the gap you feel most in your life right now?",
        answers: [
          { label: 'Sleep — I wake up tired no matter what', value: 'sleep' },
          { label: 'Energy — I\'m running on fumes by 3pm', value: 'energy' },
          { label: 'Calm — stress lives in my body, not my head', value: 'stress' },
          { label: 'Recovery — I push hard and don\'t restore', value: 'recovery' },
        ],
      },
      {
        question: 'Your wellness philosophy, honestly:',
        answers: [
          { label: 'Daily consistency beats occasional intensity', value: 'consistent' },
          { label: 'I find what feels good and I lean into it', value: 'intuitive' },
          { label: 'I know what I should do — I\'m working on doing it', value: 'aspirational' },
          { label: 'Evidence and outcomes — I want to know it works', value: 'data' },
        ],
      },
    ],
    getPersona: ([timing, gap]) => {
      if (gap === 'sleep' || timing === 'evening')
        return {
          name: 'The Restorer',
          headline: 'You\'re The Restorer',
          description: 'Your body is asking for recovery. You\'ve been pouring out more than you take in. These picks are chosen for their ability to support deep rest and nervous system repair.',
        }
      if (gap === 'stress' || timing === 'stillness')
        return {
          name: 'The Somatic',
          headline: 'You\'re The Somatic',
          description: 'You hold stress in the body. You need rituals that translate calm from the mind downward. These picks support your parasympathetic system and help you finally exhale.',
        }
      if (gap === 'energy' || timing === 'morning')
        return {
          name: 'The Energizer',
          headline: 'You\'re The Energizer',
          description: 'You want to wake up ready and stay there all day. These picks support clean, sustained energy — no 3pm crash, no dependency, just consistent vitality.',
        }
      return {
        name: 'The Athlete',
        headline: 'You\'re The Athlete',
        description: 'You push your body and expect it to bounce back. These picks are chosen for their recovery and performance credentials — tested by people who actually train hard.',
      }
    },
  },

  finance: {
    title: 'Discover Your Money Personality',
    subtitle: 'How you handle credit reveals more than you think.',
    icon: '◆',
    productCategory: null,
    questions: [
      {
        question: 'When you think about your credit score, you feel:',
        answers: [
          { label: 'Anxious — I\'m not sure where I actually stand', value: 'anxious' },
          { label: 'Determined — I know the number and I\'m improving it', value: 'builder' },
          { label: 'Curious — I understand the basics but want to optimize', value: 'optimizer' },
          { label: 'Strategic — credit is a tool I actively use', value: 'strategic' },
        ],
      },
      {
        question: 'Your relationship with financial goals:',
        answers: [
          { label: 'I have a goal but haven\'t made a real plan yet', value: 'aspirational' },
          { label: 'I\'m in active building mode — consistent habits', value: 'builder' },
          { label: 'I\'ve hit the basics and want the next level', value: 'optimizer' },
          { label: 'I think in terms of leverage and long-term outcomes', value: 'strategic' },
        ],
      },
      {
        question: 'What would change most if your credit was in perfect shape?',
        answers: [
          { label: 'Peace of mind — the stress would lift', value: 'peace' },
          { label: 'Access — better rates, better cards, more doors open', value: 'access' },
          { label: 'Freedom — big purchase, big move, or big investment', value: 'freedom' },
          { label: 'Optionality — I want choices when I need them', value: 'optionality' },
        ],
      },
    ],
    getPersona: ([score, habit]) => {
      if (score === 'anxious' || habit === 'aspirational')
        return {
          name: 'The Starter',
          headline: 'You\'re The Starter',
          description: 'The most important step is knowing where you are. Your credit story isn\'t fixed — it\'s just beginning. The path forward is clear, and small consistent moves compound faster than you think.',
        }
      if (score === 'builder' || habit === 'builder')
        return {
          name: 'The Builder',
          headline: 'You\'re The Builder',
          description: 'You\'re in the most powerful position: you have momentum. You\'ve made the decision and you\'re acting on it. The next milestone is closer than it feels.',
        }
      if (score === 'optimizer' || habit === 'optimizer')
        return {
          name: 'The Optimizer',
          headline: 'You\'re The Optimizer',
          description: 'You\'ve done the basics and now you want the edge. You\'re thinking about utilization ratios, mix, age of accounts. The advanced moves are worth learning now.',
        }
      return {
        name: 'The Strategist',
        headline: 'You\'re The Strategist',
        description: 'Credit is a lever, not a scorecard. You think in terms of return, timing, and positioning. Your focus now is on maximizing the infrastructure you\'ve built.',
      }
    },
  },
}

// ─── Finance Offer Cards ─────────────────────────────────────────────────────

const YENDO_QUIZ_URL   = buildAffiliateUrl(OFFERS.yendo.url,    'organic', 'quiz', 'finance-quiz-result')
const SLAM_DUNK_QUIZ_URL = buildAffiliateUrl(OFFERS.slamDunk.url, 'organic', 'quiz', 'finance-quiz-result')

type FinanceOffer = {
  id: string
  badge: string
  name: string
  tagline: string
  bullets: string[]
  cta: string
  href: string
  highlight: boolean
}

const FINANCE_OFFERS: FinanceOffer[] = [
  {
    id: 'yendo',
    badge: '✦ Car Equity Card',
    name: 'Yendo Credit Card',
    tagline: 'Turn your car\'s value into a real Visa credit card — no hard credit pull to check eligibility.',
    bullets: [
      'Credit line based on your car\'s value ($500–$10,000)',
      'No hard pull to see if you qualify',
      'Reports to all 3 bureaus — actively builds your score',
      'Real Visa card, accepted everywhere',
    ],
    cta: 'Check If My Car Qualifies →',
    href: YENDO_QUIZ_URL,
    highlight: true,
  },
  {
    id: 'slam-dunk',
    badge: 'Personal Loans',
    name: 'Slam Dunk Loans',
    tagline: 'Personal loans up to $50,000 — fast decision, any credit welcome.',
    bullets: [
      'Loans from $1,000 to $50,000',
      'Any credit score considered',
      'Instant rate check — no impact on your score',
      'Funds as fast as the next business day',
    ],
    cta: 'Check My Rate in 60 Seconds →',
    href: SLAM_DUNK_QUIZ_URL,
    highlight: false,
  },
]

// Persona-specific positioning copy for each offer
const PERSONA_OFFER_COPY: Record<string, Record<string, { headline: string; sub: string }>> = {
  yendo: {
    'The Starter':    { headline: 'No credit score required', sub: 'Yendo qualifies you on your car\'s value, not your credit history. Perfect for starting fresh.' },
    'The Builder':    { headline: 'Build credit while using credit', sub: 'Every on-time payment reports to all 3 bureaus. The right card can do the heavy lifting.' },
    'The Optimizer':  { headline: 'Higher limits without a hard pull', sub: 'Use your car\'s equity to unlock a credit line that improves your utilization ratio.' },
    'The Strategist': { headline: 'Leverage an asset you already own', sub: 'Your car\'s equity is sitting idle. Yendo lets you deploy it as working credit.' },
  },
  'slam-dunk': {
    'The Starter':    { headline: 'Cash when you need it most', sub: 'If you need a bridge while building credit, Slam Dunk loans accept all credit scores.' },
    'The Builder':    { headline: 'Short-term cash, no credit barriers', sub: 'Keep momentum going — Slam Dunk gets you funds fast without stalling your progress.' },
    'The Optimizer':  { headline: 'Pay down balances strategically', sub: 'A personal loan to consolidate high-utilization balances can meaningfully lift your score.' },
    'The Strategist': { headline: 'Flexible capital on demand', sub: 'Up to $50,000 with instant rate checks — no score impact until you decide to move forward.' },
  },
}

// ─── Quiz Component ───────────────────────────────────────────────────────────

export default function QuizClient({ category }: { category: string }) {
  const quiz = QUIZZES[category]
  const [step, setStep] = useState<'quiz' | 'results'>('quiz')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [selected, setSelected] = useState<string | null>(null)

  if (!quiz) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <p style={{ fontSize: '18px', color: '#6B6460' }}>Quiz not found.</p>
        <Link href="/" style={{ color: '#1D3A2F', fontWeight: 700 }}>← Back to Mintbrooks</Link>
      </div>
    )
  }

  const products = quiz.productCategory
    ? getProductsByCategory(quiz.productCategory, 6)
    : []
  const persona = step === 'results' ? quiz.getPersona(answers) : null

  function handleSelect(value: string) {
    setSelected(value)
  }

  function handleNext() {
    if (!selected) return
    const newAnswers = [...answers, selected]
    if (currentQ < quiz.questions.length - 1) {
      setAnswers(newAnswers)
      setCurrentQ(currentQ + 1)
      setSelected(null)
    } else {
      setAnswers(newAnswers)
      setStep('results')
    }
  }

  const progress = ((currentQ + (selected ? 1 : 0)) / quiz.questions.length) * 100
  const question = quiz.questions[currentQ]

  // ── Results view ─────────────────────────────────────────────────────────
  if (step === 'results' && persona) {
    return (
      <>
        <style>{QUIZ_CSS}</style>
        <div className="quiz-results-hero">
          <span className="quiz-icon">{quiz.icon}</span>
          <p className="quiz-results-type">{persona.name}</p>
          <h1 className="quiz-results-headline">{persona.headline}</h1>
          <p className="quiz-results-desc">{persona.description}</p>
          <button
            className="quiz-retake"
            onClick={() => { setStep('quiz'); setCurrentQ(0); setAnswers([]); setSelected(null) }}
          >
            Retake quiz
          </button>
        </div>

        {quiz.productCategory && products.length > 0 && (
          <section className="quiz-picks">
            <h2 className="quiz-picks-heading">Your Curated Picks</h2>
            <p className="quiz-picks-sub">Chosen for {persona.name.toLowerCase().replace('the ', '')}s who know what they want.</p>
            <div className="quiz-product-grid">
              {products.map((p) => (
                <a
                  key={p.asin}
                  href={p.affiliate_url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="quiz-product-card"
                >
                  <div className="quiz-product-img-wrap">
                    <Image
                      src={p.primary_image_url || p.image_url || `/${p.category}.jpg`}
                      alt={p.name}
                      fill
                      sizes="(max-width: 480px) 50vw, 200px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="quiz-product-body">
                    <p className="quiz-product-name">{p.name}</p>
                    {p.price != null && (
                      <span className="quiz-product-price">${p.price.toFixed(2)}</span>
                    )}
                    <span className="quiz-product-cta">Shop →</span>
                  </div>
                </a>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <Link
                href={`/${quiz.productCategory}`}
                className="quiz-explore-btn"
              >
                Explore all {quiz.productCategory.replace('-', ' ')} picks →
              </Link>
            </div>
          </section>
        )}

        {!quiz.productCategory && (
          <section className="quiz-picks">
            <h2 className="quiz-picks-heading">Your Matched Offers</h2>
            <p className="quiz-picks-sub">Chosen for where you are right now — not where the average person is.</p>
            <div className="quiz-offer-grid">
              {FINANCE_OFFERS.map((offer) => {
                const copy = PERSONA_OFFER_COPY[offer.id]?.[persona!.name]
                return (
                  <a
                    key={offer.id}
                    href={offer.href}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className={`quiz-offer-card${offer.highlight ? ' quiz-offer-card--featured' : ''}`}
                  >
                    <span className="quiz-offer-badge">{offer.badge}</span>
                    <p className="quiz-offer-name">{offer.name}</p>
                    {copy ? (
                      <>
                        <p className="quiz-offer-headline">{copy.headline}</p>
                        <p className="quiz-offer-tagline">{copy.sub}</p>
                      </>
                    ) : (
                      <p className="quiz-offer-tagline">{offer.tagline}</p>
                    )}
                    <ul className="quiz-offer-bullets">
                      {offer.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                    <span className="quiz-offer-cta">{offer.cta}</span>
                  </a>
                )
              })}
            </div>
            {/* Affiliate disclosure lives once in the global site footer */}
          </section>
        )}
      </>
    )
  }

  // ── Quiz view ─────────────────────────────────────────────────────────────
  return (
    <>
      <style>{QUIZ_CSS}</style>
      <div className="quiz-shell">
        {/* Progress bar */}
        <div className="quiz-progress-track">
          <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        {/* Step counter */}
        <p className="quiz-step-label">
          Question {currentQ + 1} of {quiz.questions.length}
        </p>

        {/* Icon + title */}
        <span className="quiz-icon">{quiz.icon}</span>
        <h1 className="quiz-title">{quiz.title}</h1>

        {/* Question */}
        <h2 className="quiz-question">{question.question}</h2>
        {question.subtext && (
          <p className="quiz-question-sub">{question.subtext}</p>
        )}

        {/* Answer options */}
        <div className="quiz-options">
          {question.answers.map((answer) => (
            <button
              key={answer.value}
              className={`quiz-option${selected === answer.value ? ' quiz-option--selected' : ''}`}
              onClick={() => handleSelect(answer.value)}
            >
              {answer.label}
            </button>
          ))}
        </div>

        {/* Next button */}
        <button
          className={`quiz-next${selected ? ' quiz-next--active' : ''}`}
          onClick={handleNext}
          disabled={!selected}
        >
          {currentQ < quiz.questions.length - 1 ? 'Next question →' : 'See my results →'}
        </button>
      </div>
    </>
  )
}

// ─── CSS ─────────────────────────────────────────────────────────────────────

const QUIZ_CSS = `
  .quiz-shell {
    max-width: 640px;
    margin: 0 auto;
    padding: clamp(40px, 6vw, 80px) clamp(20px, 5vw, 40px) 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .quiz-progress-track {
    width: 100%;
    height: 3px;
    background: #EEE9E2;
    border-radius: 100px;
    margin-bottom: 28px;
    overflow: hidden;
  }

  .quiz-progress-fill {
    height: 100%;
    background: #B8955A;
    border-radius: 100px;
    transition: width 0.4s ease;
  }

  .quiz-step-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #B8955A;
    margin: 0 0 20px;
    font-family: sans-serif;
  }

  .quiz-icon {
    font-size: 28px;
    color: #B8955A;
    display: block;
    margin-bottom: 12px;
  }

  .quiz-title {
    font-family: "Playfair Display", Georgia, serif;
    font-size: clamp(22px, 4vw, 30px);
    font-weight: 700;
    color: #1A1714;
    letter-spacing: -0.02em;
    margin: 0 0 32px;
    line-height: 1.2;
  }

  .quiz-question {
    font-family: "Playfair Display", Georgia, serif;
    font-size: clamp(20px, 3.5vw, 26px);
    font-weight: 700;
    color: #1A1714;
    letter-spacing: -0.01em;
    line-height: 1.3;
    margin: 0 0 10px;
  }

  .quiz-question-sub {
    font-size: 14px;
    color: #9B9388;
    margin: 0 0 28px;
    font-family: sans-serif;
  }

  .quiz-options {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 28px 0 36px;
  }

  .quiz-option {
    width: 100%;
    padding: 18px 24px;
    text-align: left;
    background: #FFFFFF;
    border: 1.5px solid #EEE9E2;
    border-radius: 12px;
    font-size: 15px;
    color: #1A1714;
    font-family: sans-serif;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
    line-height: 1.4;
  }

  .quiz-option:hover {
    border-color: #B8955A;
    background: #FDFAF6;
  }

  .quiz-option--selected {
    border-color: #1D3A2F;
    background: #1D3A2F;
    color: #FDFAF6;
  }

  .quiz-next {
    padding: 16px 40px;
    border-radius: 100px;
    background: #EEE9E2;
    color: #9B9388;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border: none;
    cursor: not-allowed;
    font-family: sans-serif;
    transition: background 0.2s, color 0.2s;
  }

  .quiz-next--active {
    background: #1D3A2F;
    color: #FDFAF6;
    cursor: pointer;
  }

  .quiz-next--active:hover { background: #0D1F18; }

  /* ── Results ── */

  .quiz-results-hero {
    max-width: 640px;
    margin: 0 auto;
    padding: clamp(48px, 8vw, 90px) clamp(20px, 5vw, 40px) 48px;
    text-align: center;
  }

  .quiz-results-type {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #B8955A;
    margin: 0 0 12px;
    font-family: sans-serif;
  }

  .quiz-results-headline {
    font-family: "Playfair Display", Georgia, serif;
    font-size: clamp(32px, 6vw, 48px);
    font-weight: 700;
    color: #1A1714;
    letter-spacing: -0.02em;
    line-height: 1.15;
    margin: 0 0 20px;
  }

  .quiz-results-desc {
    font-size: 16px;
    color: #5A534E;
    line-height: 1.7;
    max-width: 500px;
    margin: 0 auto 28px;
    font-family: sans-serif;
  }

  .quiz-retake {
    background: none;
    border: 1.5px solid #EEE9E2;
    border-radius: 100px;
    padding: 10px 24px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #9B9388;
    cursor: pointer;
    font-family: sans-serif;
    transition: border-color 0.2s, color 0.2s;
  }

  .quiz-retake:hover { border-color: #B8955A; color: #B8955A; }

  .quiz-picks {
    background: #FDFAF6;
    padding: clamp(40px, 6vw, 72px) clamp(20px, 5vw, 80px);
    border-top: 1px solid #EEE9E2;
  }

  .quiz-picks-heading {
    font-family: "Playfair Display", Georgia, serif;
    font-size: clamp(24px, 4vw, 34px);
    font-weight: 700;
    color: #1A1714;
    letter-spacing: -0.02em;
    text-align: center;
    margin: 0 0 10px;
  }

  .quiz-picks-sub {
    font-size: 15px;
    color: #9B9388;
    text-align: center;
    margin: 0 0 40px;
    font-family: sans-serif;
  }

  .quiz-product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    max-width: 1100px;
    margin: 0 auto;
  }

  .quiz-product-card {
    background: #fff;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }

  .quiz-product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 48px rgba(0,0,0,0.12);
  }

  .quiz-product-img-wrap {
    position: relative;
    height: 200px;
    width: 100%;
  }

  .quiz-product-body {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
  }

  .quiz-product-name {
    font-size: 14px;
    font-weight: 700;
    color: #1A1714;
    font-family: sans-serif;
    line-height: 1.35;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .quiz-product-price {
    font-size: 15px;
    font-weight: 700;
    color: #B8955A;
    font-family: sans-serif;
  }

  .quiz-product-cta {
    margin-top: auto;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #1D3A2F;
    font-family: sans-serif;
  }

  .quiz-explore-btn {
    display: inline-block;
    padding: 14px 32px;
    background: #1D3A2F;
    color: #FDFAF6;
    border-radius: 100px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
    font-family: sans-serif;
    transition: background 0.2s;
  }

  .quiz-explore-btn:hover { background: #0D1F18; }

  /* Offer cards — Yendo + Slam Dunk */
  .quiz-offer-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    max-width: 860px;
    margin: 0 auto 24px;
  }

  .quiz-offer-card {
    background: #fff;
    border: 1.5px solid #EEE9E2;
    border-radius: 20px;
    padding: 28px 24px;
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    gap: 10px;
    transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
  }

  .quiz-offer-card:hover {
    border-color: #B8955A;
    box-shadow: 0 12px 40px rgba(0,0,0,0.10);
    transform: translateY(-3px);
  }

  .quiz-offer-card--featured {
    border-color: #1D3A2F;
    background: #1D3A2F;
    color: #FDFAF6;
  }

  .quiz-offer-card--featured:hover {
    border-color: #1D3A2F;
    box-shadow: 0 16px 48px rgba(29,58,47,0.30);
  }

  .quiz-offer-badge {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #B8955A;
    font-family: sans-serif;
    display: block;
  }

  .quiz-offer-card--featured .quiz-offer-badge {
    color: rgba(184,149,90,0.85);
  }

  .quiz-offer-name {
    font-family: "Playfair Display", Georgia, serif;
    font-size: 22px;
    font-weight: 700;
    color: #1A1714;
    margin: 0;
    line-height: 1.2;
  }

  .quiz-offer-card--featured .quiz-offer-name {
    color: #FDFAF6;
  }

  .quiz-offer-headline {
    font-size: 14px;
    font-weight: 700;
    color: #1A1714;
    margin: 0;
    font-family: sans-serif;
    line-height: 1.4;
  }

  .quiz-offer-card--featured .quiz-offer-headline {
    color: #FDFAF6;
  }

  .quiz-offer-tagline {
    font-size: 14px;
    color: #5A534E;
    margin: 0;
    line-height: 1.6;
    font-family: sans-serif;
  }

  .quiz-offer-card--featured .quiz-offer-tagline {
    color: rgba(253,250,246,0.70);
  }

  .quiz-offer-bullets {
    list-style: none;
    padding: 0;
    margin: 6px 0 0;
    display: flex;
    flex-direction: column;
    gap: 7px;
    flex: 1;
  }

  .quiz-offer-bullets li {
    font-size: 13px;
    color: #5A534E;
    padding-left: 18px;
    position: relative;
    font-family: sans-serif;
    line-height: 1.5;
  }

  .quiz-offer-bullets li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #B8955A;
    font-weight: 700;
  }

  .quiz-offer-card--featured .quiz-offer-bullets li {
    color: rgba(253,250,246,0.75);
  }

  .quiz-offer-card--featured .quiz-offer-bullets li::before {
    color: #B8955A;
  }

  .quiz-offer-cta {
    display: block;
    margin-top: 16px;
    padding: 14px 20px;
    background: #B8955A;
    color: #fff;
    border-radius: 100px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-align: center;
    font-family: sans-serif;
    transition: background 0.2s;
  }

  .quiz-offer-card--featured .quiz-offer-cta {
    background: #FDFAF6;
    color: #1D3A2F;
  }

  .quiz-offer-card:hover .quiz-offer-cta {
    background: #9A7A47;
  }

  .quiz-offer-card--featured:hover .quiz-offer-cta {
    background: #EEE9E2;
  }

  .quiz-offer-disclosure {
    font-size: 11px;
    color: #B0A99E;
    text-align: center;
    margin: 8px 0 0;
    font-family: sans-serif;
    font-style: italic;
    max-width: 560px;
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 480px) {
    .quiz-product-grid {
      grid-template-columns: 1fr 1fr;
    }
    .quiz-offer-grid {
      grid-template-columns: 1fr;
    }
  }
`
