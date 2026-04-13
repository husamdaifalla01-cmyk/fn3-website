// Premium PDF HTML template generator — v4
// Scrolling progress: chapter map strip, progress rings, "In This Chapter" mini-map, chapter-complete cards

export interface PDFSection {
  number: number
  title: string
  content: string
  frameworks?: string[]
  action_steps?: string[]
  warnings?: string[]
}

export interface PDFProduct {
  title: string
  subtitle: string
  tagline: string
  price: number
  sections: PDFSection[]
  quick_start?: string
  about_author?: string
  [key: string]: unknown
}

// ─── Accent palette ────────────────────────────────────────────────────────────
const CHAPTER_COLORS = [
  { main: '#7c5cfc', light: '#a07fff', rgb: '124,92,252' },
  { main: '#3b82f6', light: '#6ba3f8', rgb: '59,130,246' },
  { main: '#10b981', light: '#34d399', rgb: '16,185,129' },
  { main: '#f59e0b', light: '#fbbf24', rgb: '245,158,11' },
  { main: '#ef4444', light: '#f87171', rgb: '239,68,68' },
  { main: '#8b5cf6', light: '#a78bfa', rgb: '139,92,246' },
  { main: '#06b6d4', light: '#22d3ee', rgb: '6,182,212' },
  { main: '#ec4899', light: '#f472b6', rgb: '236,72,153' },
]

// ─── SVG chapter art ──────────────────────────────────────────────────────────
function generateChapterArt(sectionNum: number, color: typeof CHAPTER_COLORS[0]): string {
  const p = sectionNum % 8
  if (p === 0) return `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="rg0" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="${color.main}" stop-opacity=".3"/><stop offset="100%" stop-color="${color.main}" stop-opacity="0"/></radialGradient></defs>
    <rect width="400" height="220" fill="url(#rg0)"/>
    ${[120,90,60,35,18].map((r,i)=>`<circle cx="200" cy="110" r="${r}" fill="none" stroke="${color.main}" stroke-width="${i===4?2:1}" stroke-opacity="${.15+i*.08}"/>`).join('')}
    ${Array.from({length:12},(_,i)=>{const a=i*30*Math.PI/180;return `<line x1="${200+22*Math.cos(a)}" y1="${110+22*Math.sin(a)}" x2="${200+125*Math.cos(a)}" y2="${110+125*Math.sin(a)}" stroke="${color.main}" stroke-width=".5" stroke-opacity=".2"/>`}).join('')}
    <circle cx="200" cy="110" r="10" fill="${color.main}" fill-opacity=".8"/>
    <circle cx="200" cy="110" r="5" fill="white" fill-opacity=".9"/>
    ${Array.from({length:6},(_,i)=>{const a=i*60*Math.PI/180;return `<circle cx="${200+90*Math.cos(a)}" cy="${110+90*Math.sin(a)}" r="3" fill="${color.light}" fill-opacity=".5"/>`}).join('')}
  </svg>`
  if (p === 1) return `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="rg1" cx="50%" cy="50%" r="60%"><stop offset="0%" stop-color="${color.main}" stop-opacity=".2"/><stop offset="100%" stop-color="${color.main}" stop-opacity="0"/></radialGradient></defs>
    <rect width="400" height="220" fill="url(#rg1)"/>
    ${[[200,110],[80,55],[320,55],[80,165],[320,165],[200,20],[200,200],[40,110],[360,110]].map(([x,y],i,all)=>
      all.filter((_,j)=>j!==i&&Math.hypot(all[j][0]-x,all[j][1]-y)<200).map(([x2,y2])=>`<line x1="${x}" y1="${y}" x2="${x2}" y2="${y2}" stroke="${color.main}" stroke-width=".8" stroke-opacity=".2"/>`).join('')
    ).join('')}
    ${[[200,110,7],[80,55,5],[320,55,5],[80,165,5],[320,165,5],[200,20,3],[200,200,3],[40,110,3],[360,110,3]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${color.main}" fill-opacity="${r===7?.9:.5}"/>`).join('')}
  </svg>`
  if (p === 2) return `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="rg2" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="${color.main}" stop-opacity=".05"/><stop offset="50%" stop-color="${color.main}" stop-opacity=".2"/><stop offset="100%" stop-color="${color.main}" stop-opacity=".05"/></linearGradient></defs>
    <rect width="400" height="220" fill="url(#rg2)"/>
    ${[{w:320,y:18,l:'Awareness'},{w:240,y:58,l:'Interest'},{w:170,y:98,l:'Decision'},{w:110,y:138,l:'Action'},{w:60,y:178,l:'Revenue'}].map(({w,y,l},i)=>`
      <rect x="${200-w/2}" y="${y}" width="${w}" height="28" rx="4" fill="${color.main}" fill-opacity="${.06+i*.05}" stroke="${color.main}" stroke-width=".5" stroke-opacity=".3"/>
      <text x="200" y="${y+18}" text-anchor="middle" fill="${color.light}" font-size="10" font-family="Inter,sans-serif" font-weight="600" opacity=".8">${l}</text>`).join('')}
  </svg>`
  if (p === 3) return `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="rg3" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="${color.main}" stop-opacity=".25"/><stop offset="100%" stop-color="${color.main}" stop-opacity="0"/></radialGradient></defs>
    <rect width="400" height="220" fill="url(#rg3)"/>
    ${Array.from({length:7},(_,col)=>Array.from({length:4},(_,row)=>{const x=col*66+(row%2)*33,y=row*55+28;return `<polygon points="${x},${y-18} ${x+18},${y} ${x},${y+18} ${x-18},${y}" fill="${color.main}" fill-opacity=".06" stroke="${color.main}" stroke-width=".5" stroke-opacity=".25"/>`;}).join('')).join('')}
    <polygon points="200,80 226,110 200,140 174,110" fill="${color.main}" fill-opacity=".5" stroke="${color.light}" stroke-width="1.5"/>
    <polygon points="200,95 212,110 200,125 188,110" fill="${color.light}" fill-opacity=".8"/>
  </svg>`
  if (p === 4) return `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="rg4" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="${color.main}" stop-opacity=".15"/><stop offset="100%" stop-color="${color.main}" stop-opacity="0"/></linearGradient></defs>
    <rect width="400" height="220" fill="url(#rg4)"/>
    <line x1="60" y1="30" x2="60" y2="185" stroke="${color.main}" stroke-width="1" stroke-opacity=".3"/>
    <line x1="60" y1="185" x2="370" y2="185" stroke="${color.main}" stroke-width="1" stroke-opacity=".3"/>
    ${[{h:120,x:90},{h:85,x:150},{h:145,x:210},{h:100,x:270},{h:160,x:330}].map(({h,x},i)=>`
      <rect x="${x-18}" y="${185-h}" width="36" height="${h}" rx="3" fill="${color.main}" fill-opacity="${.2+i*.07}" stroke="${color.main}" stroke-width=".5" stroke-opacity=".4"/>
      <text x="${x}" y="200" text-anchor="middle" fill="${color.light}" font-size="9" font-family="Inter,sans-serif" opacity=".6">Q${i+1}</text>`).join('')}
    ${[0,.25,.5,.75,1].map(v=>`<line x1="55" y1="${185-v*155}" x2="370" y2="${185-v*155}" stroke="${color.main}" stroke-width=".4" stroke-opacity=".15" stroke-dasharray="4,4"/>`).join('')}
  </svg>`
  if (p === 5) return `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="rg5" cx="30%" cy="50%" r="60%"><stop offset="0%" stop-color="${color.main}" stop-opacity=".2"/><stop offset="100%" stop-color="${color.main}" stop-opacity="0"/></radialGradient></defs>
    <rect width="400" height="220" fill="url(#rg5)"/>
    <line x1="50" y1="110" x2="370" y2="110" stroke="${color.main}" stroke-width="1.5" stroke-opacity=".3"/>
    ${[{x:80,l:'Start'},{x:148,l:'Week 1'},{x:216,l:'Week 2'},{x:284,l:'Week 3'},{x:352,l:'Launch'}].map(({x,l},i)=>`
      <circle cx="${x}" cy="110" r="${i===4?12:8}" fill="${color.main}" fill-opacity="${.25+i*.12}" stroke="${color.light}" stroke-width="1.5" stroke-opacity=".5"/>
      <circle cx="${x}" cy="110" r="${i===4?5:3}" fill="${color.light}" fill-opacity=".8"/>
      <text x="${x}" y="${i%2===0?94:134}" text-anchor="middle" fill="${color.light}" font-size="9" font-family="Inter,sans-serif" font-weight="600" opacity=".7">${l}</text>`).join('')}
  </svg>`
  if (p === 6) {
    const segs=[{p:.35,op:.7},{p:.25,op:.5},{p:.2,op:.35},{p:.12,op:.25},{p:.08,op:.15}]
    let ang=-Math.PI/2
    const paths=segs.map(({p,op})=>{
      const a1=ang,a2=ang+p*2*Math.PI; ang=a2
      const [cx,cy,r,inn]=[200,110,80,45]
      const x1=cx+r*Math.cos(a1),y1=cy+r*Math.sin(a1),x2=cx+r*Math.cos(a2),y2=cy+r*Math.sin(a2)
      const ix1=cx+inn*Math.cos(a1),iy1=cy+inn*Math.sin(a1),ix2=cx+inn*Math.cos(a2),iy2=cy+inn*Math.sin(a2)
      return `<path d="M${ix1},${iy1} L${x1},${y1} A${r},${r} 0 ${p>.5?1:0} 1 ${x2},${y2} L${ix2},${iy2} A${inn},${inn} 0 ${p>.5?1:0} 0 ${ix1},${iy1}" fill="${color.main}" fill-opacity="${op}" stroke="rgba(0,0,0,.4)" stroke-width="1"/>`
    }).join('')
    return `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
      <defs><radialGradient id="rg6" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="${color.main}" stop-opacity=".2"/><stop offset="100%" stop-color="${color.main}" stop-opacity="0"/></radialGradient></defs>
      <rect width="400" height="220" fill="url(#rg6)"/>${paths}
      <circle cx="200" cy="110" r="32" fill="#0e0e1c"/>
      <text x="200" y="115" text-anchor="middle" fill="${color.light}" font-size="11" font-weight="700" font-family="Inter,sans-serif">Focus</text>
    </svg>`
  }
  return `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="rg7" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${color.main}" stop-opacity=".1"/><stop offset="100%" stop-color="${color.main}" stop-opacity=".04"/></linearGradient></defs>
    <rect width="400" height="220" fill="url(#rg7)"/>
    ${Array.from({length:8},(_,col)=>Array.from({length:5},(_,row)=>`<rect x="${52+col*40}" y="${20+row*38}" width="32" height="28" rx="4" fill="${color.main}" fill-opacity="${(Math.sin(col*1.3+row*0.9)+1)*0.27}" stroke="${color.main}" stroke-width=".3" stroke-opacity=".3"/>`).join('')).join('')}
  </svg>`
}

// ─── SVG progress ring ─────────────────────────────────────────────────────────
function progressRing(current: number, total: number, color: string, size = 80): string {
  const r = size / 2 - 7
  const circ = 2 * Math.PI * r
  const pct = current / total
  const dash = pct * circ
  const cx = size / 2, cy = size / 2
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="5"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="5"
      stroke-dasharray="${dash} ${circ}" stroke-dashoffset="${circ * 0.25}"
      stroke-linecap="round"/>
    <text x="${cx}" y="${cy - 5}" text-anchor="middle" fill="${color}" font-size="${size < 60 ? 9 : 12}" font-weight="800" font-family="Inter,sans-serif">${current}</text>
    <text x="${cx}" y="${cy + 9}" text-anchor="middle" fill="rgba(255,255,255,0.35)" font-size="8" font-family="Inter,sans-serif">of ${total}</text>
  </svg>`
}

// ─── Chapter map strip ────────────────────────────────────────────────────────
function chapterMapStrip(sections: PDFSection[], currentIdx: number): string {
  return `<div class="chmap">
    <span class="chmap-label">Guide Map</span>
    <div class="chmap-dots">
      ${sections.map((s, i) => {
        const col = CHAPTER_COLORS[i % CHAPTER_COLORS.length]
        const isCurrent = i === currentIdx
        const isPast = i < currentIdx
        if (isCurrent) {
          return `<a href="#section-${s.number}" class="chmap-dot chmap-current" style="background:${col.main};border-color:${col.main};color:#fff;" title="Ch.${s.number}: ${s.title}">
            ${s.number}
            <span class="chmap-tooltip">${escapeHtml(s.title)}</span>
          </a>`
        }
        if (isPast) {
          return `<a href="#section-${s.number}" class="chmap-dot chmap-past" style="background:rgba(${col.rgb},.18);border-color:rgba(${col.rgb},.4);color:${col.main};" title="Ch.${s.number}">✓</a>`
        }
        return `<a href="#section-${s.number}" class="chmap-dot chmap-future" title="Ch.${s.number}: ${s.title}">${s.number}</a>`
      }).join('')}
    </div>
    <span class="chmap-pct">${Math.round((currentIdx / sections.length) * 100)}%</span>
  </div>`
}

// ─── "In This Chapter" mini-map ───────────────────────────────────────────────
function inThisChapter(content: string, frameworks: string[] = [], actionSteps: string[] = []): string {
  const headings: string[] = []
  const h2 = [...content.matchAll(/^## (.+)$/gm)].map(m => m[1])
  const h3 = [...content.matchAll(/^### (.+)$/gm)].map(m => m[1])
  headings.push(...h2.slice(0, 4), ...h3.slice(0, 2))
  const items: string[] = []
  if (headings.length) items.push(...headings.slice(0, 4).map(h => escapeHtml(h)))
  if (frameworks.length) items.push(`${frameworks.length} Framework${frameworks.length > 1 ? 's' : ''}`)
  if (actionSteps.length) items.push(`${actionSteps.length} Action Step${actionSteps.length > 1 ? 's' : ''}`)
  if (!items.length) return ''
  return `<div class="itc">
    <div class="itc-label">In This Chapter</div>
    <div class="itc-list">
      ${items.map(it => `<div class="itc-item"><span class="itc-tick">◈</span><span>${it}</span></div>`).join('')}
    </div>
  </div>`
}

// ─── Chapter complete card ─────────────────────────────────────────────────────
function chapterCompleteCard(
  section: PDFSection,
  nextSection: PDFSection | null,
  idx: number,
  total: number,
  color: typeof CHAPTER_COLORS[0]
): string {
  const pctNow = Math.round(((idx + 1) / total) * 100)
  const nextColor = nextSection ? CHAPTER_COLORS[(idx + 1) % CHAPTER_COLORS.length] : null
  return `<div class="ch-complete" style="--cc:${color.main};--cc-rgb:${color.rgb};">
    <div class="ch-complete-left">
      <div class="ch-complete-ring">${progressRing(idx + 1, total, color.main, 88)}</div>
      <div class="ch-complete-meta">
        <div class="ch-complete-badge">✓ Chapter ${section.number} Complete</div>
        <div class="ch-complete-stat">${pctNow}% of this guide done</div>
        <div class="ch-complete-bar-wrap">
          <div class="ch-complete-bar" style="width:${pctNow}%;background:${color.main};"></div>
        </div>
      </div>
    </div>
    ${nextSection && nextColor ? `
    <a href="#section-${nextSection.number}" class="ch-complete-next" style="border-color:rgba(${nextColor.rgb},.3);">
      <div class="ch-complete-next-label" style="color:${nextColor.main};">Up Next →</div>
      <div class="ch-complete-next-title">Chapter ${nextSection.number}: ${escapeHtml(nextSection.title)}</div>
      <div class="ch-complete-next-hint">Click to jump ahead</div>
    </a>` : `
    <div class="ch-complete-last">
      <div style="font-size:24pt;margin-bottom:8px;">🎉</div>
      <div class="ch-complete-badge">Final Chapter Complete</div>
      <div class="ch-complete-stat">You've read the entire guide</div>
    </div>`}
  </div>`
}

// ─── Stat callout ─────────────────────────────────────────────────────────────
function extractStats(content: string): Array<{value: string; label: string}> {
  const stats: Array<{value: string; label: string}> = []
  const pats = [
    /(\d+(?:\.\d+)?[xX])\s+([a-z][a-zA-Z\s]{3,30})/g,
    /(\$[\d,]+[kKmMbB]?)\s+([a-z][a-zA-Z\s]{3,25})/g,
    /(\d+(?:,\d+)?)\+?\s+((?:hours|days|weeks|clients|users|leads|sales|customers|downloads)[a-zA-Z\s]{0,20})/gi,
    /(\d{1,3}%)\s+(?:of\s+)?([a-z][a-zA-Z\s]{3,30})/g,
  ]
  for (const p of pats) {
    let m: RegExpExecArray | null
    while ((m = p.exec(content)) !== null && stats.length < 3) {
      if (!stats.find(s => s.value === m![1]))
        stats.push({ value: m![1], label: m![2].trim().slice(0, 28) })
    }
  }
  return stats.slice(0, 3)
}

function extractPullQuote(content: string): string | null {
  const q = content.match(/"([^"]{45,130})"/)?.[1]
  if (q) return q
  const s = content.split(/\.\s+/).find(s => s.length > 65 && s.length < 120 && !/^(The|In|It|This|When|If)\s/.test(s))
  return s ? s.trim() : null
}

function renderFrameworkCards(frameworks: string[], color: typeof CHAPTER_COLORS[0]): string {
  const icons = ['◈','◉','⬡','◆','⬢','◎','▣','▲']
  return `<div class="vis-block">
    <div class="vis-label"><span style="color:${color.main}">⚙</span> Frameworks &amp; Models</div>
    <div class="framework-grid">
      ${frameworks.map((f, i) => {
        const [name, desc] = f.split(' — ')
        return `<div class="framework-card" style="--fc:${color.main};--fc-rgb:${color.rgb};">
          <div class="fc-icon">${icons[i % icons.length]}</div>
          <div><div class="fc-name">${escapeHtml(name.trim())}</div>${desc ? `<div class="fc-desc">${escapeHtml(desc.trim())}</div>` : ''}</div>
        </div>`
      }).join('')}
    </div>
  </div>`
}

function renderActionPipeline(steps: string[], color: typeof CHAPTER_COLORS[0]): string {
  return `<div class="vis-block">
    <div class="vis-label"><span style="color:${color.main}">✓</span> Your Action Plan</div>
    <div class="pipeline">
      ${steps.map((step, i) => `
        <div class="pipeline-step">
          <div class="p-col">
            <div class="p-node" style="background:rgba(${color.rgb},.14);border-color:rgba(${color.rgb},.45);color:${color.light};">${i + 1}</div>
            ${i < steps.length - 1 ? `<div class="p-line" style="background:linear-gradient(180deg,rgba(${color.rgb},.4),rgba(${color.rgb},.1));"></div>` : ''}
          </div>
          <div class="p-text">${escapeHtml(step)}</div>
        </div>`).join('')}
    </div>
  </div>`
}

function renderWarnings(warnings: string[]): string {
  return `<div class="vis-block">
    <div class="vis-label"><span style="color:#f59e0b">⚠</span> Watch Out For</div>
    ${warnings.map(w => `<div class="warning-card"><span class="warn-icon">⚑</span><span>${escapeHtml(w)}</span></div>`).join('')}
  </div>`
}

function renderStats(stats: Array<{value: string; label: string}>, color: typeof CHAPTER_COLORS[0]): string {
  if (!stats.length) return ''
  return `<div class="stat-band" style="--sc:${color.main};--sc-rgb:${color.rgb};">
    ${stats.map(s => `<div class="stat-item"><div class="stat-v">${escapeHtml(s.value)}</div><div class="stat-l">${escapeHtml(s.label)}</div></div>`).join('<div class="stat-div"></div>')}
  </div>`
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export function generatePDFHTML(product: PDFProduct): string {
  const total = product.sections.length

  const sectionHTML = product.sections.map((section, idx) => {
    const color = CHAPTER_COLORS[idx % CHAPTER_COLORS.length]
    const nextSection = idx < total - 1 ? product.sections[idx + 1] : null
    const prevSection = idx > 0 ? product.sections[idx - 1] : null
    const stats = extractStats(section.content)
    const pullQuote = extractPullQuote(section.content)

    return `
    <div class="section" id="section-${section.number}">

      <!-- top nav -->
      <div class="top-nav">
        ${prevSection ? `<a href="#section-${prevSection.number}" class="tn-link">← Ch.${prevSection.number}</a>` : '<span></span>'}
        <a href="#toc" class="tn-center">☰ Contents</a>
        ${nextSection ? `<a href="#section-${nextSection.number}" class="tn-link">Ch.${nextSection.number} →</a>` : '<span></span>'}
      </div>

      <!-- Chapter map strip — "you are here" across the whole guide -->
      ${chapterMapStrip(product.sections, idx)}

      <!-- chapter splash: art + meta -->
      <div class="ch-splash" style="--sc:${color.main};--sc-rgb:${color.rgb};">
        <div class="ch-art">${generateChapterArt(idx, color)}</div>
        <div class="ch-meta">
          <div class="ch-eyebrow" style="color:${color.main};">Chapter ${section.number} of ${total}</div>
          <h2 class="ch-title">${escapeHtml(section.title)}</h2>
          <div class="ch-progress-row">
            <div class="ch-ring">${progressRing(section.number, total, color.main, 72)}</div>
            <div class="ch-progress-labels">
              <div class="ch-pct" style="color:${color.main};">${Math.round((section.number/total)*100)}%</div>
              <div class="ch-pct-label">through guide</div>
            </div>
          </div>
          <div class="ch-bar-wrap"><div class="ch-bar" style="width:${Math.round((section.number/total)*100)}%;background:${color.main};"></div></div>
        </div>
      </div>

      <!-- in-this-chapter mini-map -->
      ${inThisChapter(section.content, section.frameworks || [], section.action_steps || [])}

      <!-- body -->
      <div class="section-body">
        <div class="section-content">${markdownToHTML(section.content)}</div>
        ${stats.length ? renderStats(stats, color) : ''}
        ${pullQuote ? `<div class="pull-quote" style="border-color:${color.main};"><span class="pq-mark" style="color:${color.main};">"</span><div class="pq-text">${escapeHtml(pullQuote)}</div></div>` : ''}
        ${section.frameworks?.length ? renderFrameworkCards(section.frameworks, color) : ''}
        ${section.action_steps?.length ? renderActionPipeline(section.action_steps, color) : ''}
        ${section.warnings?.length ? renderWarnings(section.warnings) : ''}
      </div>

      <!-- chapter complete card -->
      ${chapterCompleteCard(section, nextSection, idx, total, color)}

    </div>`
  }).join('\n')

  const tocHTML = product.sections.map((s, idx) => {
    const col = CHAPTER_COLORS[idx % CHAPTER_COLORS.length]
    return `<a href="#section-${s.number}" class="toc-item">
      <div class="toc-dot" style="background:rgba(${col.rgb},.14);border-color:rgba(${col.rgb},.4);color:${col.main};">${s.number}</div>
      <div class="toc-text"><div class="toc-ch">Chapter ${s.number}</div><div class="toc-title">${escapeHtml(s.title)}</div></div>
      <div class="toc-arr">→</div>
    </a>`
  }).join('')

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${escapeHtml(product.title)}</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=JetBrains+Mono:wght@400;600&display=swap');
:root{--bg:#07070f;--s1:#0e0e1c;--s2:#151525;--s3:#1c1c30;--b0:rgba(255,255,255,.07);--b1:rgba(255,255,255,.14);--tx:#eeeef5;--mt:#8888aa;--ft:#55556a;--gold:#f59e0b;--green:#10b981;}
*{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--tx);font-size:10.5pt;line-height:1.75;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
a{color:inherit;text-decoration:none;}

/* ── COVER ── */
.cover{min-height:100vh;background:radial-gradient(ellipse at 15% 15%,rgba(124,92,252,.22) 0%,transparent 50%),radial-gradient(ellipse at 85% 85%,rgba(59,130,246,.14) 0%,transparent 50%),#07070f;page-break-after:always;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:72px 56px;position:relative;overflow:hidden;}
.cover-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(124,92,252,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(124,92,252,.035) 1px,transparent 1px);background-size:36px 36px;}
.cover-inner{position:relative;z-index:1;max-width:620px;}
.cover-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(124,92,252,.14);border:1px solid rgba(124,92,252,.32);color:#a07fff;padding:7px 22px;border-radius:100px;font-size:8.5pt;font-weight:700;letter-spacing:.15em;text-transform:uppercase;margin-bottom:40px;}
.cover-badge::before{content:'◆';font-size:7pt;opacity:.7;}
.cover-title{font-family:'Playfair Display',serif;font-size:43pt;font-weight:900;line-height:1.06;margin-bottom:18px;background:linear-gradient(130deg,#fff 0%,#c4b0ff 45%,#a07fff 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.cover-sub{font-size:12.5pt;color:var(--mt);font-weight:300;line-height:1.5;margin-bottom:10px;}
.cover-div{width:90px;height:1px;background:linear-gradient(90deg,transparent,#7c5cfc,transparent);margin:22px auto;}
.cover-tag{font-family:'Playfair Display',serif;font-style:italic;font-size:12pt;color:#a07fff;margin-bottom:44px;}
.cover-stats{display:flex;gap:48px;justify-content:center;margin-bottom:44px;}
.cover-num{font-size:24pt;font-weight:900;color:#a07fff;line-height:1;}
.cover-sl{font-size:8pt;color:var(--ft);text-transform:uppercase;letter-spacing:.1em;margin-top:3px;}
.cover-meta{display:flex;align-items:center;gap:12px;justify-content:center;font-size:8pt;color:var(--ft);}
.cdot{width:3px;height:3px;border-radius:50%;background:var(--ft);}

/* ── TOC ── */
.toc{padding:58px 66px;page-break-after:always;background:var(--s1);min-height:100vh;}
.toc-ey{font-size:8pt;font-weight:700;text-transform:uppercase;letter-spacing:.2em;color:#7c5cfc;margin-bottom:10px;}
.toc h1{font-family:'Playfair Display',serif;font-size:29pt;font-weight:900;}
.toc-sub{font-size:11pt;color:var(--mt);margin-top:6px;}
.toc-rule{height:1px;background:linear-gradient(90deg,#7c5cfc,transparent);margin:22px 0 32px;}
.toc-item{display:flex;align-items:center;gap:13px;padding:12px 13px;border-radius:10px;border:1px solid transparent;margin-bottom:5px;color:var(--tx);}
.toc-dot{width:35px;height:35px;border-radius:50%;border:1px solid;display:flex;align-items:center;justify-content:center;font-size:9pt;font-weight:800;flex-shrink:0;}
.toc-ch{font-size:7.5pt;color:var(--ft);text-transform:uppercase;letter-spacing:.08em;}
.toc-title{font-size:11pt;font-weight:600;line-height:1.3;}
.toc-arr{color:var(--ft);font-size:11pt;flex-shrink:0;}
.toc-bonus{margin-top:14px;background:rgba(245,158,11,.05);border:1px solid rgba(245,158,11,.2);border-radius:10px;padding:12px 13px;display:flex;align-items:center;gap:13px;}
.toc-bi{width:35px;height:35px;border-radius:50%;background:rgba(245,158,11,.12);border:1px solid rgba(245,158,11,.32);display:flex;align-items:center;justify-content:center;color:#f59e0b;font-size:14pt;flex-shrink:0;}

/* ── TOP NAV ── */
.top-nav{display:flex;align-items:center;justify-content:space-between;padding:8px 22px;background:var(--s1);border-bottom:1px solid var(--b0);font-size:8pt;color:var(--mt);}
.tn-link{font-weight:600;color:var(--mt);}
.tn-center{font-weight:700;letter-spacing:.04em;color:#7c5cfc;}

/* ── CHAPTER MAP STRIP ── */
.chmap{display:flex;align-items:center;gap:10px;padding:10px 22px;background:var(--s2);border-bottom:1px solid var(--b0);}
.chmap-label{font-size:7.5pt;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:var(--ft);white-space:nowrap;}
.chmap-dots{display:flex;align-items:center;gap:5px;flex:1;overflow:hidden;}
.chmap-dot{width:26px;height:26px;border-radius:50%;border:1.5px solid rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center;font-size:8pt;font-weight:700;color:var(--ft);flex-shrink:0;position:relative;}
.chmap-current{width:30px;height:30px;font-size:9pt;box-shadow:0 0 0 3px rgba(255,255,255,.08);}
.chmap-past{font-size:8pt;}
.chmap-future{color:var(--ft);}
.chmap-pct{font-size:8pt;font-weight:800;color:var(--mt);white-space:nowrap;min-width:28px;text-align:right;}

/* ── CHAPTER SPLASH ── */
.ch-splash{display:grid;grid-template-columns:1fr 1fr;min-height:240px;page-break-inside:avoid;}
.ch-art{background:var(--s1);overflow:hidden;display:flex;align-items:stretch;}
.ch-art svg{width:100%;height:100%;display:block;}
.ch-meta{display:flex;flex-direction:column;justify-content:center;padding:36px 32px 36px 38px;background:linear-gradient(135deg,var(--s2) 0%,var(--bg) 100%);border-bottom:1px solid var(--b0);}
.ch-eyebrow{font-size:8.5pt;font-weight:700;text-transform:uppercase;letter-spacing:.16em;margin-bottom:12px;}
.ch-title{font-family:'Playfair Display',serif;font-size:20pt;font-weight:900;line-height:1.2;color:var(--tx);margin-bottom:18px;}
.ch-progress-row{display:flex;align-items:center;gap:14px;margin-bottom:10px;}
.ch-ring svg{display:block;}
.ch-pct{font-size:20pt;font-weight:900;line-height:1;}
.ch-pct-label{font-size:8pt;color:var(--ft);margin-top:2px;}
.ch-bar-wrap{height:3px;background:var(--s3);border-radius:100px;overflow:hidden;}
.ch-bar{height:100%;border-radius:100px;}

/* ── IN THIS CHAPTER ── */
.itc{padding:18px 66px 0;background:var(--bg);}
.itc-label{font-size:8pt;font-weight:700;text-transform:uppercase;letter-spacing:.14em;color:var(--ft);margin-bottom:10px;}
.itc-list{display:flex;flex-wrap:wrap;gap:8px;}
.itc-item{display:flex;align-items:center;gap:6px;background:var(--s2);border:1px solid var(--b0);border-radius:100px;padding:5px 12px;font-size:9pt;color:var(--mt);}
.itc-tick{color:#7c5cfc;font-size:9pt;}

/* ── SECTION BODY ── */
.section-body{padding:36px 66px 48px;}

/* ── TYPOGRAPHY ── */
.section-content{font-size:11pt;line-height:1.85;color:rgba(238,238,245,.92);}
.section-content p{margin-bottom:16px;}
.section-content>p:first-child::first-letter{font-family:'Playfair Display',serif;font-size:3em;font-weight:700;float:left;line-height:.72;padding-right:9px;padding-top:6px;color:#a07fff;}
.section-content h2{font-family:'Playfair Display',serif;font-size:18pt;font-weight:700;margin:34px 0 11px;line-height:1.25;}
.section-content h3{font-size:13.5pt;font-weight:700;margin:26px 0 9px;}
.section-content h4{font-size:8.5pt;font-weight:700;color:#a07fff;text-transform:uppercase;letter-spacing:.09em;margin:20px 0 7px;}
.section-content ul{list-style:none;padding:0;margin:12px 0 18px;}
.section-content ul li{padding:4px 0 4px 21px;position:relative;margin-bottom:3px;}
.section-content ul li::before{content:'→';position:absolute;left:0;color:#7c5cfc;font-weight:700;}
.section-content ol{list-style:none;padding:0;counter-reset:oc;margin:12px 0 18px;}
.section-content ol li{padding:4px 0 4px 33px;position:relative;counter-increment:oc;margin-bottom:3px;}
.section-content ol li::before{content:counter(oc);position:absolute;left:0;top:4px;width:22px;height:22px;border-radius:50%;background:rgba(124,92,252,.13);border:1px solid rgba(124,92,252,.3);display:flex;align-items:center;justify-content:center;font-size:7.5pt;font-weight:800;color:#a07fff;line-height:22px;text-align:center;}
.section-content strong{color:var(--tx);font-weight:700;}
.section-content em{color:#a07fff;font-style:normal;font-weight:500;}
.section-content blockquote{border-left:3px solid #7c5cfc;padding:15px 20px;margin:24px 0;background:rgba(124,92,252,.05);border-radius:0 10px 10px 0;font-family:'Playfair Display',serif;font-style:italic;font-size:12pt;color:var(--mt);}
.section-content code{background:var(--s3);padding:2px 7px;border-radius:5px;font-family:'JetBrains Mono',monospace;font-size:9pt;color:#a07fff;border:1px solid var(--b0);}
.section-content pre{background:var(--s2);border:1px solid var(--b1);border-radius:10px;padding:18px 20px;margin:18px 0;}
.section-content pre code{background:none;padding:0;border:none;font-size:8.5pt;}

/* ── STAT BAND ── */
.stat-band{display:flex;align-items:center;background:rgba(var(--sc-rgb),.06);border:1px solid rgba(var(--sc-rgb),.18);border-radius:12px;margin:24px 0;overflow:hidden;}
.stat-item{flex:1;text-align:center;padding:18px 14px;}
.stat-v{font-size:24pt;font-weight:900;color:var(--sc);line-height:1;}
.stat-l{font-size:8pt;color:var(--mt);margin-top:3px;}
.stat-div{width:1px;height:44px;background:rgba(var(--sc-rgb),.18);}

/* ── PULL QUOTE ── */
.pull-quote{border-left:4px solid;padding:16px 26px 16px 22px;margin:24px 0;background:rgba(0,0,0,.2);border-radius:0 12px 12px 0;position:relative;}
.pq-mark{font-family:'Playfair Display',serif;font-size:55pt;line-height:.65;position:absolute;top:8px;left:16px;opacity:.25;}
.pq-text{font-family:'Playfair Display',serif;font-style:italic;font-size:12.5pt;line-height:1.6;padding-left:30px;}

/* ── VIS BLOCKS ── */
.vis-block{margin:26px 0;}
.vis-label{display:flex;align-items:center;gap:8px;font-size:8pt;font-weight:700;text-transform:uppercase;letter-spacing:.14em;color:var(--mt);margin-bottom:12px;}
.framework-grid{display:grid;grid-template-columns:1fr 1fr;gap:9px;}
.framework-card{background:rgba(var(--fc-rgb),.06);border:1px solid rgba(var(--fc-rgb),.18);border-radius:10px;padding:13px 15px;display:flex;gap:11px;align-items:flex-start;}
.fc-icon{font-size:15pt;color:var(--fc);flex-shrink:0;line-height:1.2;}
.fc-name{font-size:9.5pt;font-weight:700;color:var(--tx);margin-bottom:3px;line-height:1.3;}
.fc-desc{font-size:8.5pt;color:var(--mt);line-height:1.5;}
.pipeline{display:flex;flex-direction:column;}
.pipeline-step{display:flex;align-items:flex-start;gap:14px;position:relative;}
.p-col{display:flex;flex-direction:column;align-items:center;flex-shrink:0;}
.p-node{width:30px;height:30px;border-radius:50%;border:2px solid;display:flex;align-items:center;justify-content:center;font-size:9.5pt;font-weight:800;}
.p-line{width:2px;height:22px;border-radius:2px;}
.p-text{font-size:10.5pt;line-height:1.6;color:var(--tx);padding:3px 0 22px;flex:1;}
.warning-card{display:flex;align-items:flex-start;gap:11px;background:rgba(245,158,11,.05);border:1px solid rgba(245,158,11,.2);border-radius:10px;padding:12px 15px;margin-bottom:8px;}
.warn-icon{font-size:12pt;color:var(--gold);flex-shrink:0;margin-top:1px;}

/* ── CHAPTER COMPLETE CARD ── */
.ch-complete{display:flex;align-items:stretch;gap:0;margin:0;background:linear-gradient(135deg,rgba(var(--cc-rgb),.07) 0%,rgba(var(--cc-rgb),.03) 100%);border-top:1px solid rgba(var(--cc-rgb),.2);border-bottom:1px solid var(--b0);}
.ch-complete-left{display:flex;align-items:center;gap:18px;padding:28px 32px;flex:1;}
.ch-complete-ring{flex-shrink:0;}
.ch-complete-badge{font-size:10pt;font-weight:800;color:var(--cc);margin-bottom:6px;}
.ch-complete-stat{font-size:9pt;color:var(--mt);margin-bottom:8px;}
.ch-complete-bar-wrap{height:3px;background:rgba(255,255,255,.08);border-radius:100px;overflow:hidden;width:140px;}
.ch-complete-bar{height:100%;border-radius:100px;}
.ch-complete-next{display:flex;flex-direction:column;justify-content:center;padding:28px 36px;border-left:1px solid var(--b0);min-width:240px;border:1px solid;border-color:inherit;background:rgba(0,0,0,.15);}
.ch-complete-next-label{font-size:8.5pt;font-weight:700;text-transform:uppercase;letter-spacing:.12em;margin-bottom:6px;}
.ch-complete-next-title{font-size:11pt;font-weight:700;line-height:1.35;margin-bottom:4px;}
.ch-complete-next-hint{font-size:8pt;color:var(--ft);}
.ch-complete-last{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:28px 36px;text-align:center;border-left:1px solid var(--b0);}

/* ── QUICK START ── */
.qs{padding:56px 66px;page-break-before:always;}
.qs-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(245,158,11,.1);border:1px solid rgba(245,158,11,.28);color:var(--gold);padding:6px 17px;border-radius:100px;font-size:8pt;font-weight:700;text-transform:uppercase;letter-spacing:.12em;margin-bottom:16px;}
.qs h1{font-family:'Playfair Display',serif;font-size:27pt;font-weight:900;margin-bottom:5px;}
.qs-sub{color:var(--mt);font-size:11pt;}
.qs-rule{height:1px;background:linear-gradient(90deg,var(--gold),transparent);margin:22px 0 30px;}

/* ── AUTHOR ── */
.author-wrap{padding:36px 66px 52px;border-top:1px solid var(--b0);}
.author-box{background:var(--s1);border:1px solid var(--b1);border-radius:15px;padding:28px 32px;display:flex;gap:24px;align-items:flex-start;}
.author-av{width:58px;height:58px;border-radius:50%;background:linear-gradient(135deg,#7c5cfc,#3b82f6);flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:19pt;font-weight:900;color:white;font-family:'Playfair Display',serif;}
.author-name{font-weight:800;font-size:12.5pt;margin-bottom:2px;}
.author-role{color:#a07fff;font-size:9pt;margin-bottom:10px;}
.author-bio{font-size:10.5pt;color:var(--mt);line-height:1.65;}

/* ── BACK COVER ── */
.back-cover{page-break-before:always;min-height:100vh;background:radial-gradient(ellipse at 50% 40%,rgba(124,92,252,.18) 0%,transparent 60%),radial-gradient(ellipse at 20% 80%,rgba(59,130,246,.1) 0%,transparent 50%),#07070f;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:80px 60px;}
.bc-orn{font-size:30pt;margin-bottom:22px;opacity:.4;}
.bc-title{font-family:'Playfair Display',serif;font-size:28pt;font-weight:900;margin-bottom:14px;}
.bc-text{font-size:12pt;color:var(--mt);max-width:420px;line-height:1.65;margin-bottom:32px;}
.bc-cta{background:linear-gradient(135deg,#7c5cfc,#3b82f6);color:white;padding:13px 36px;border-radius:100px;font-size:11pt;font-weight:700;letter-spacing:.04em;display:inline-block;}
.bc-note{font-size:8pt;color:var(--ft);margin-top:18px;}

@page{margin:0;size:A4;}
</style>
</head>
<body>

<!-- COVER -->
<div class="cover">
  <div class="cover-grid"></div>
  <div class="cover-inner">
    <div class="cover-badge">2026 Edition · Premium Guide</div>
    <h1 class="cover-title">${escapeHtml(product.title)}</h1>
    <p class="cover-sub">${escapeHtml(product.subtitle)}</p>
    <div class="cover-div"></div>
    <p class="cover-tag">"${escapeHtml(product.tagline)}"</p>
    <div class="cover-stats">
      <div><div class="cover-num">${total}</div><div class="cover-sl">Chapters</div></div>
      <div><div class="cover-num">${product.sections.reduce((a,s)=>a+(s.action_steps?.length||0),0)}+</div><div class="cover-sl">Action Steps</div></div>
      <div><div class="cover-num">${product.sections.reduce((a,s)=>a+(s.frameworks?.length||0),0)}</div><div class="cover-sl">Frameworks</div></div>
    </div>
    <div class="cover-meta"><span>© 2026</span><div class="cdot"></div><span>Instant Download</span><div class="cdot"></div><span>All Rights Reserved</span></div>
  </div>
</div>

<!-- TOC -->
<div class="toc" id="toc">
  <div class="toc-ey">Navigation</div>
  <h1>Table of Contents</h1>
  <p class="toc-sub">${total} chapters · Click any chapter to jump directly</p>
  <div class="toc-rule"></div>
  ${tocHTML}
  ${product.quick_start ? `<a href="#quick-start" class="toc-bonus">
    <div class="toc-bi">⚡</div>
    <div class="toc-text"><div class="toc-ch">Bonus</div><div class="toc-title">Quick Start Guide — First win in 30 minutes</div></div>
    <div class="toc-arr">→</div>
  </a>` : ''}
</div>

<!-- CHAPTERS -->
${sectionHTML}

<!-- QUICK START -->
${product.quick_start ? `<div class="qs" id="quick-start">
  <div class="qs-badge">⚡ Bonus Section</div>
  <h1>Quick Start Guide</h1>
  <p class="qs-sub">Your first win in 30 minutes</p>
  <div class="qs-rule"></div>
  <div class="section-content">${markdownToHTML(product.quick_start)}</div>
</div>` : ''}

<!-- AUTHOR -->
${product.about_author ? `<div class="author-wrap">
  <div class="author-box">
    <div class="author-av">A</div>
    <div><div class="author-name">About the Author</div><div class="author-role">AI Practitioner &amp; Digital Product Creator</div><div class="author-bio">${escapeHtml(product.about_author)}</div></div>
  </div>
</div>` : ''}

<!-- BACK COVER -->
<div class="back-cover">
  <div class="bc-orn">◆</div>
  <div class="bc-title">You've got this.</div>
  <p class="bc-text">Every framework in this guide is ready to use today. Pick one action step from Chapter 1 and execute it before you close this PDF.</p>
  <a href="#section-1" class="bc-cta">Start with Chapter 1 →</a>
  <div class="bc-note">© 2026 · ${escapeHtml(product.title)}</div>
</div>

</body>
</html>`
}

function escapeHtml(str: string): string {
  if (typeof str !== 'string') return ''
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;')
}

function markdownToHTML(md: string): string {
  if (!md) return ''
  let o = md.replace(/```[\w]*\n([\s\S]*?)```/g,'<pre><code>$1</code></pre>')
  o = o
    .replace(/^### (.+)$/gm,'<h4>$1</h4>')
    .replace(/^## (.+)$/gm,'<h3>$1</h3>')
    .replace(/^# (.+)$/gm,'<h2>$1</h2>')
    .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,'<em>$1</em>')
    .replace(/`(.+?)`/g,'<code>$1</code>')
    .replace(/^> (.+)$/gm,'<blockquote>$1</blockquote>')
    .replace(/(?:^\- .+$\n?)+/gm,m=>`<ul>${m.trim().split('\n').map(l=>`<li>${l.replace(/^\- /,'')}</li>`).join('')}</ul>\n`)
    .replace(/(?:^\d+\. .+$\n?)+/gm,m=>`<ol>${m.trim().split('\n').map(l=>`<li><span>${l.replace(/^\d+\. /,'')}</span></li>`).join('')}</ol>\n`)
  return o.split(/\n\n+/).map(b=>{b=b.trim();if(!b)return '';if(/^<(h[1-6]|ul|ol|pre|blockquote)/.test(b))return b;return `<p>${b.replace(/\n/g,' ')}</p>`;}).filter(Boolean).join('\n')
}
