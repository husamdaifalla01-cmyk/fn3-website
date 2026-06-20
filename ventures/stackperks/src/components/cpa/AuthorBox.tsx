import React from 'react'

export default function AuthorBox({ published }: { published: string }) {
  return (
    <aside className="mb-author">
      <div className="mb-author-avatar" aria-hidden />
      <div className="mb-author-meta">
        <p className="mb-author-name">Mintbrooks Editorial</p>
        <p className="mb-author-sub">
          Updated {published} · Editorially independent · Fact-checked against lender terms
        </p>
      </div>
      <style>{`
        .mb-author {
          display: flex;
          gap: 14px;
          align-items: center;
          padding: 14px 18px;
          background: #FDFAF6;
          border: 1px solid #E7DFD3;
          border-radius: 12px;
          margin: 0 0 36px;
        }
        .mb-author-avatar {
          flex: 0 0 44px; height: 44px; border-radius: 50%;
          background: conic-gradient(from 220deg at 60% 40%, #1D3A2F, #B8955A, #1D3A2F);
          box-shadow: inset 0 -1px 3px rgba(0,0,0,0.2);
        }
        .mb-author-meta { flex: 1; min-width: 0; }
        .mb-author-name { font-weight: 700; color: #1A1714; margin: 0; font-size: 15px; }
        .mb-author-sub { margin: 2px 0 0; color: #6B6557; font-size: 13px; line-height: 1.4; }
      `}</style>
    </aside>
  )
}
