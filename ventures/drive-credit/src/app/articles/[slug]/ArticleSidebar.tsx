'use client'

import { useState } from 'react'

type TopProduct = {
  name: string
  price: string
  link: string
  image?: string
}

const QUIZ_COPY: Record<string, { title: string; sub: string; url: string }> = {
  'Beauty': {
    title: 'Who is your skin, really?',
    sub: 'Discover your skin story in 3 questions',
    url: '/quiz/beauty',
  },
  'Home & Decor': {
    title: 'What does your space say about you?',
    sub: 'Find the aesthetic that fits who you are',
    url: '/quiz/home-decor',
  },
  'Kitchen': {
    title: 'What kind of cook lives inside you?',
    sub: 'Discover your kitchen personality',
    url: '/quiz/kitchen',
  },
  'Wellness': {
    title: 'What does your body actually need?',
    sub: 'Uncover your wellness archetype',
    url: '/quiz/wellness',
  },
  'Finance': {
    title: 'What\'s your money personality?',
    sub: 'Understand your relationship with credit',
    url: '/quiz/finance',
  },
}

export default function ArticleSidebar({
  topProduct,
  category,
}: {
  topProduct: TopProduct | null
  category: string
}) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const quiz = QUIZ_COPY[category] ?? null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    try {
      await fetch('/api/lifestyle/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source: 'article-sidebar' }),
      })
    } catch { /* silent — still show success */ }
    setSubmitted(true)
  }

  return (
    <aside className="article-sidebar">

      {/* ── Product card ── */}
      {topProduct && (
        <div className="sb-card">
          {topProduct.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={topProduct.image}
              alt={topProduct.name}
              className="sb-product-img"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
            />
          )}
          <p className="sb-product-name">{topProduct.name}</p>
          {topProduct.price && (
            <span className="sb-product-price">{topProduct.price} on Amazon</span>
          )}
          <a
            href={topProduct.link}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="sb-cta"
          >
            Check Price on Amazon
          </a>
        </div>
      )}

      {/* ── Newsletter ── */}
      <div className="sb-newsletter">
        <p className="sb-nl-title">The weekly edit</p>
        <p className="sb-nl-sub">
          Best finds in {category}, curated weekly.
        </p>
        {submitted ? (
          <p className="sb-nl-success">You&apos;re in. Check your inbox soon.</p>
        ) : (
          <form onSubmit={handleSubmit} className="sb-nl-form">
            <label htmlFor="sb-email" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>Email address</label>
            <input
              id="sb-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="sb-nl-input"
            />
            <button type="submit" className="sb-nl-btn">
              Get My Weekly Picks
            </button>
          </form>
        )}
      </div>

      {/* ── Quiz — quiet CTA, no competing gradient ── */}
      {quiz && (
        <div className="sb-quiz">
          <p className="sb-quiz-title">{quiz.title}</p>
          <a href={quiz.url} className="sb-quiz-cta">
            Take the Quiz →
          </a>
        </div>
      )}

    </aside>
  )
}
