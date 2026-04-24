import React from 'react'

type Props = {
  heading: string
  body: string
  href: string
  cta?: string
}

export default function InlineCTA({ heading, body, href, cta = 'Check eligibility' }: Props) {
  return (
    <aside className="mb-inlinecta">
      <div className="mb-inlinecta-stripe" aria-hidden />
      <div className="mb-inlinecta-content">
        <p className="mb-inlinecta-head">{heading}</p>
        <p className="mb-inlinecta-body">{body}</p>
        <a href={href} target="_blank" rel="sponsored nofollow noopener" className="mb-inlinecta-link">
          {cta} <span aria-hidden>→</span>
        </a>
      </div>
      <style>{`
        .mb-inlinecta {
          position: relative;
          display: flex;
          gap: 0;
          margin: 36px 0;
          background: #F5EDE5;
          border-radius: 10px;
          overflow: hidden;
        }
        .mb-inlinecta-stripe {
          flex: 0 0 4px;
          background: #1D3A2F;
        }
        .mb-inlinecta-content { padding: 20px 24px; }
        .mb-inlinecta-head {
          margin: 0 0 6px;
          font-weight: 700;
          color: #1D3A2F;
          font-size: 17px;
          line-height: 1.3;
        }
        .mb-inlinecta-body { margin: 0 0 12px; color: #1A1714; font-size: 15px; line-height: 1.55; }
        .mb-inlinecta-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #1D3A2F;
          font-weight: 700;
          text-decoration: none;
          font-size: 15px;
          padding: 4px 0;
          border-bottom: 2px solid transparent;
          transition: border-color 160ms, gap 160ms;
        }
        .mb-inlinecta-link:hover { border-color: #B8955A; gap: 10px; }
      `}</style>
    </aside>
  )
}
