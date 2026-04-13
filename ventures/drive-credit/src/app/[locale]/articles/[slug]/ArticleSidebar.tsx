'use client'

import { useState } from 'react'

type TopProduct = {
  name: string
  price: string
  link: string
  image?: string
}

// All quizzes — shown in sidebar regardless of article category
const ALL_QUIZZES = [
  { category: 'Beauty',      title: 'Who is your skin, really?',          url: '/quiz/beauty' },
  { category: 'Home & Decor',title: 'What does your space say about you?', url: '/quiz/home-decor' },
  { category: 'Kitchen',     title: 'What kind of cook lives inside you?', url: '/quiz/kitchen' },
  { category: 'Wellness',    title: 'What does your body actually need?',  url: '/quiz/wellness' },
  { category: 'Finance',     title: "What's your money personality?",      url: '/quiz/finance' },
]

// Map display category → Resend sequence key
const CATEGORY_SOURCE: Record<string, string> = {
  'Beauty':      'beauty',
  'Home & Decor':'home-decor',
  'Kitchen':     'kitchen',
  'Wellness':    'wellness',
  'Finance':     'finance',
}

export default function ArticleSidebar({
  topProduct,
  category,
}: {
  topProduct: TopProduct | null
  category: string
}) {
  const [email, setEmail]       = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    const source = CATEGORY_SOURCE[category] ?? 'articles'
    try {
      const res = await fetch('/api/lifestyle/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source }),
      })
      if (!res.ok) {
        console.error('[sidebar] subscribe failed', res.status, await res.text())
      }
    } catch (err) {
      console.error('[sidebar] subscribe error', err)
    }
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

      {/* ── Discover yourself — all quizzes ── */}
      <div className="sb-quizzes">
        <p className="sb-quizzes-heading">Discover yourself</p>
        <ul className="sb-quizzes-list">
          {ALL_QUIZZES.map((q) => (
            <li key={q.category} className={`sb-quiz-item${q.category === category ? ' sb-quiz-item--active' : ''}`}>
              <a href={q.url} className="sb-quiz-item-link">
                <span className="sb-quiz-item-title">{q.title}</span>
                <span className="sb-quiz-item-arrow">→</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

    </aside>
  )
}
