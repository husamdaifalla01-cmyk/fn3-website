'use client'

import { useState } from 'react'

type TopProduct = {
  name: string
  price: string
  link: string
}

const QUIZ_COPY: Record<string, { title: string; sub: string; url: string }> = {
  'Beauty': {
    title: 'What skincare routine fits your skin?',
    sub: '2 min quiz → personalized product list',
    url: '/quiz/beauty',
  },
  'Home & Decor': {
    title: 'What bedroom style fits you?',
    sub: '2 min quiz → personalized picks',
    url: '/quiz/home-decor',
  },
  'Kitchen': {
    title: 'What kind of home cook are you?',
    sub: '2 min quiz → gear matched to you',
    url: '/quiz/kitchen',
  },
  'Wellness': {
    title: 'What does your wellness routine need?',
    sub: '2 min quiz → your personalized plan',
    url: '/quiz/wellness',
  },
  'Finance': {
    title: "What's your credit-building style?",
    sub: '2 min quiz → tailored next steps',
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
          <span className="sb-label">⭐ Top Pick from This Article</span>
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
        <p className="sb-nl-title">The weekly edit →</p>
        <p className="sb-nl-sub">
          Best finds in {category}, curated weekly. No fluff.
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

      {/* ── Quiz widget ── */}
      {quiz && (
        <div className="sb-quiz">
          <p className="sb-quiz-title">{quiz.title}</p>
          <p className="sb-quiz-sub">{quiz.sub}</p>
          <a href={quiz.url} className="sb-quiz-cta">
            Take the Quiz →
          </a>
        </div>
      )}

    </aside>
  )
}
