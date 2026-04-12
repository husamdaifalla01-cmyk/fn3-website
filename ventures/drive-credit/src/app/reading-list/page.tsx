import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'The Reading List — Mintbrooks',
  description:
    'Books the Mintbrooks editors would press into your hands. 20 essential reads on money, home, wellness, creativity, and living well.',
  openGraph: {
    title: 'The Mintbrooks Reading List',
    description:
      'Books the Mintbrooks editors would press into your hands. 20 essential reads on money, home, wellness, creativity, and living well.',
    type: 'website',
    url: 'https://mintbrooks.com/reading-list',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Mintbrooks Reading List',
    description:
      'Books the Mintbrooks editors would press into your hands.',
  },
}

// ── Book data ─────────────────────────────────────────────────────────────────

type Book = {
  title: string
  author: string
  year: number
  isbn: string
  amazonUrl: string
  coverColor: string
  coverAccent: string
  editorial: string
  shortTake: string
}

const SECTIONS: { label: string; intro: string; books: Book[] }[] = [
  {
    label: 'On Building Wealth',
    intro:
      `Money is the foundation everything else rests on. These books don't talk about stock picks — they talk about behavior, psychology, and systems.`,
    books: [
      {
        title: 'The Psychology of Money',
        author: 'Morgan Housel',
        year: 2020,
        isbn: '9780857197689',
        amazonUrl: 'https://www.amazon.com/dp/B09Q68BXWL?tag=mintbrooks-20',
        coverColor: '#1D3A2F',
        coverAccent: '#B8955A',
        editorial:
          `The most honest book ever written about why smart people make bad financial decisions. Housel's argument is deceptively simple: finance is not a hard science, it's a soft science — and soft sciences are governed by stories, not spreadsheets. Each chapter is a standalone essay you can read in fifteen minutes, and every single one will change how you think about money. We re-read it every year.`,
        shortTake: 'Not about wealth. About wisdom.',
      },
      {
        title: 'I Will Teach You to Be Rich',
        author: 'Ramit Sethi',
        year: 2009,
        isbn: '9781523505746',
        amazonUrl: 'https://www.amazon.com/dp/1523505745?tag=mintbrooks-20',
        coverColor: '#B8955A',
        coverAccent: '#FDFAF6',
        editorial:
          `The no-guilt, systems-first approach to building real financial infrastructure. Sethi is blunt, sometimes brash, always right. The core insight — automate your money so it moves without you having to decide — is worth the whole book. Ignore the title if it makes you wince. The content underneath is serious and practical.`,
        shortTake: 'Automate your financial life.',
      },
      {
        title: 'The Millionaire Next Door',
        author: 'Thomas J. Stanley',
        year: 1996,
        isbn: '9780671015206',
        amazonUrl: 'https://www.amazon.com/dp/1589795474?tag=mintbrooks-20',
        coverColor: '#2D2420',
        coverAccent: '#FDFAF6',
        editorial:
          `A sociological landmark disguised as a personal finance book. Stanley and Danko spent years studying actual wealthy Americans — not the ones on magazine covers, but the ones in modest houses with boring cars and very full brokerage accounts. The gap between how we imagine wealth and how it actually accumulates is the whole story. Quietly radical.`,
        shortTake: 'What wealthy people actually look like.',
      },
    ],
  },
  {
    label: 'On How We Live',
    intro:
      `The spaces we inhabit shape who we become. These books take your home seriously — not as a backdrop, but as a practice.`,
    books: [
      {
        title: 'A Pattern Language',
        author: 'Christopher Alexander',
        year: 1977,
        isbn: '9780195019193',
        amazonUrl: 'https://www.amazon.com/dp/0195019199?tag=mintbrooks-20',
        coverColor: '#4A5240',
        coverAccent: '#E8D5A3',
        editorial:
          `Architects call it a bible. We call it the most useful book ever written about the spaces where human life actually happens. Alexander catalogs 253 "patterns" — from the scale of cities down to the size of a window seat — that make spaces feel alive versus dead. You don't read this front to back. You open it wherever you're stuck about your home, and you find language for what you've been trying to say.`,
        shortTake: `Why some rooms feel alive and others don't.`,
      },
      {
        title: 'The Life-Changing Magic of Tidying Up',
        author: 'Marie Kondo',
        year: 2011,
        isbn: '9781607747307',
        amazonUrl: 'https://www.amazon.com/dp/1607747308?tag=mintbrooks-20',
        coverColor: '#F0EBE1',
        coverAccent: '#1A1714',
        editorial:
          `We know. Everyone has read this. Read it again. Kondo's genius is not the folding technique or the "does it spark joy" question — it's her argument that possessions carry psychological weight, and that releasing them is an act of clarifying who you actually are. Her method works not because it's clever but because it's honest.`,
        shortTake: 'Your stuff is a biography. Edit it.',
      },
      {
        title: 'The Minimalist Home',
        author: 'Joshua Becker',
        year: 2018,
        isbn: '9780525572992',
        amazonUrl: 'https://www.amazon.com/dp/B07KWBRY92?tag=mintbrooks-20',
        coverColor: '#D9C5A0',
        coverAccent: '#1D3A2F',
        editorial:
          `Not austerity — intentionality. Becker makes a careful distinction between minimalism as aesthetic and minimalism as philosophy. His approach is practical and room-by-room, but the underlying argument is more interesting: every object in your home is a claim on your attention, and your home should spend your attention the way a good investor spends capital — deliberately, on things that compound.`,
        shortTake: 'Every object costs you attention. Choose carefully.',
      },
    ],
  },
  {
    label: 'On the Body & Wellbeing',
    intro:
      `The body is the first home. These books are about understanding it without the noise of the wellness industry.`,
    books: [
      {
        title: 'Why We Sleep',
        author: 'Matthew Walker',
        year: 2017,
        isbn: '9781501144318',
        amazonUrl: 'https://www.amazon.com/dp/1501144324?tag=mintbrooks-20',
        coverColor: '#1A2A4A',
        coverAccent: '#9EB8D9',
        editorial:
          `The single most important book about your health that you are probably not reading. Walker, a neuroscience professor at UC Berkeley, builds an airtight scientific case that chronic sleep deprivation is linked to nearly every disease of civilization — cancer, Alzheimer's, diabetes, depression, heart disease. The book will permanently change your relationship to your alarm clock. We do not say that lightly.`,
        shortTake: `Sleep is not a lifestyle choice. It's a health crisis.`,
      },
      {
        title: 'Atomic Habits',
        author: 'James Clear',
        year: 2018,
        isbn: '9780735211292',
        amazonUrl: 'https://www.amazon.com/dp/B07RFSSYBH?tag=mintbrooks-20',
        coverColor: '#B8955A',
        coverAccent: '#1D3A2F',
        editorial:
          `The most practically deployable behavior-change book written. Clear doesn't reinvent habit science — he distills it. The four-law framework (make it obvious, attractive, easy, satisfying) is simple enough to remember and specific enough to use. No filler. Every chapter delivers an actionable model. We've watched it change people's morning routines, exercise habits, and writing practice.`,
        shortTake: '1% better every day. The math is astounding.',
      },
      {
        title: 'In Defense of Food',
        author: 'Michael Pollan',
        year: 2008,
        isbn: '9780143114963',
        amazonUrl: 'https://www.amazon.com/dp/0143114964?tag=mintbrooks-20',
        coverColor: '#3D5A30',
        coverAccent: '#E8D5A3',
        editorial:
          `"Eat food. Not too much. Mostly plants." Seven words. The rest of the book is the evidence. Pollan's argument is that the rise of nutritionism — the ideology that food is merely a delivery vehicle for nutrients — has made us sicker and more confused than we've ever been. This book will make you distrust health claims on packaging and trust your grandmother's cooking advice.`,
        shortTake: 'The food science industry is making us sick.',
      },
    ],
  },
  {
    label: 'On Creativity & Beauty',
    intro:
      `Creativity is not a personality trait — it's a practice. These books are permission slips and operating manuals.`,
    books: [
      {
        title: 'Steal Like an Artist',
        author: 'Austin Kleon',
        year: 2012,
        isbn: '9780761169253',
        amazonUrl: 'https://www.amazon.com/dp/0761169253?tag=mintbrooks-20',
        coverColor: '#1A1714',
        coverAccent: '#FDFAF6',
        editorial:
          `Read it in an afternoon. Keep it forever. Kleon's central argument — that all creative work builds on what came before, and that influence is not theft but tribute — is both true and liberating. The book is short, visually structured, and packed with specific advice about how to build a creative practice when you don't feel like you have anything original to say. Which, of course, is when you most need to work.`,
        shortTake: `You don't need to be original. You need to be curious.`,
      },
      {
        title: 'The Wabi-Sabi House',
        author: 'Robyn Griggs Lawrence',
        year: 2004,
        isbn: '9781400055135',
        amazonUrl: 'https://www.amazon.com/dp/1400050464?tag=mintbrooks-20',
        coverColor: '#C8B89A',
        coverAccent: '#1A1714',
        editorial:
          `Wabi-sabi is the Japanese philosophy of imperfect, impermanent, incomplete beauty. Lawrence applies it to the home with real specificity — how you arrange objects, how you choose materials, how you let things age. It's a quiet book, almost meditative, and it stands as a counterpoint to every glossy magazine that makes you feel your home isn't finished enough. Your home is allowed to be lived in.`,
        shortTake: 'Imperfection is the point.',
      },
      {
        title: 'Big Magic',
        author: 'Elizabeth Gilbert',
        year: 2015,
        isbn: '9781594634727',
        amazonUrl: 'https://www.amazon.com/dp/1594634726?tag=mintbrooks-20',
        coverColor: '#8B4A7A',
        coverAccent: '#F0EBE1',
        editorial:
          `Gilbert's book on creative living is not what you'd expect from the author of *Eat Pray Love*. It's bracingly unsentimental. Her argument: fear will always be present when you create, but it doesn't get to drive. The chapter on the relationship between fear and creativity is worth the whole book. For anyone who has abandoned a creative project because they were waiting to feel ready.`,
        shortTake: `Fear is not a stop sign. It's a companion.`,
      },
    ],
  },
  {
    label: 'On Big Ideas',
    intro:
      `The books that gave us the mental models we return to again and again. Dense, essential, worth the effort.`,
    books: [
      {
        title: 'Thinking, Fast and Slow',
        author: 'Daniel Kahneman',
        year: 2011,
        isbn: '9780374533557',
        amazonUrl: 'https://www.amazon.com/dp/0374533555?tag=mintbrooks-20',
        coverColor: '#2A3A5A',
        coverAccent: '#FDFAF6',
        editorial:
          `The foundational text for understanding your own mind. Kahneman, a Nobel laureate, spent decades studying the two systems of human cognition — the fast, intuitive System 1 and the slow, deliberate System 2. His central finding: we trust System 1 far more than we should, and our biases are not bugs but features of minds designed for a very different world. Dense, but no chapter is wasted.`,
        shortTake: `You think you're rational. You're not.`,
      },
      {
        title: 'Range',
        author: 'David Epstein',
        year: 2019,
        isbn: '9780735214484',
        amazonUrl: 'https://www.amazon.com/dp/0735214506?tag=mintbrooks-20',
        coverColor: '#5A3A1A',
        coverAccent: '#E8D5A3',
        editorial:
          `A rigorous case for being a generalist in a world obsessed with specialization. Epstein's research shows that the "10,000 hours" model of expertise is real in "kind" learning environments (chess, golf) but fails completely in "wicked" environments (medicine, business, creative work) — which is most of life. The people who eventually excel have often tried many things first. Permission to be a late bloomer.`,
        shortTake: 'Breadth before depth. The research agrees.',
      },
      {
        title: 'The Power of Habit',
        author: 'Charles Duhigg',
        year: 2012,
        isbn: '9780812981605',
        amazonUrl: 'https://www.amazon.com/dp/B0FD49GYHN?tag=mintbrooks-20',
        coverColor: '#3A1A2A',
        coverAccent: '#D9C5A0',
        editorial:
          `Duhigg's central contribution — the habit loop of cue, routine, reward — is now part of the cultural vocabulary. But the book goes further, exploring how habits operate at organizational and societal levels, not just individual ones. The stories are excellent (how Alcoa's CEO transformed a company by focusing only on safety habits; how the civil rights movement used social habits as infrastructure). A serious book wearing popular clothes.`,
        shortTake: `You don't change behavior. You change the loop.`,
      },
    ],
  },
  {
    label: 'On the Good Life',
    intro:
      `The question underneath everything Mintbrooks publishes: what makes a life worth living? These are our best answers.`,
    books: [
      {
        title: 'The Almanack of Naval Ravikant',
        author: 'Eric Jorgenson',
        year: 2020,
        isbn: '9781544514222',
        amazonUrl: 'https://www.amazon.com/dp/B0FBCVCC7M?tag=mintbrooks-20',
        coverColor: '#1D3A2F',
        coverAccent: '#B8955A',
        editorial:
          `Naval Ravikant is one of the clearest thinkers alive on wealth, health, and happiness — and this book is a careful distillation of his public writing and interviews. Free online at navalmanack.com. No filler, no warm-up. Every page is quotable. His distinction between earning via judgment and earning via time (wealth is assets that earn while you sleep) changed how we think about building anything.`,
        shortTake: 'Wealth, happiness, and clarity. Free online too.',
      },
      {
        title: 'When Breath Becomes Air',
        author: 'Paul Kalanithi',
        year: 2016,
        isbn: '9780812988406',
        amazonUrl: 'https://www.amazon.com/dp/081298840X?tag=mintbrooks-20',
        coverColor: '#4A3A2A',
        coverAccent: '#F0EBE1',
        editorial:
          `A neurosurgeon at 36 is diagnosed with terminal lung cancer. This is the book he wrote before he died. It is about medicine, about identity, about what a life means when you know it's ending. We include it not to be dark but because it is the best articulation we've read of why the quality of the life you build matters more than its length. Devastating and luminous in equal measure.`,
        shortTake: `The most honest book about life we've read.`,
      },
      {
        title: 'Essentialism',
        author: 'Greg McKeown',
        year: 2014,
        isbn: '9780804137386',
        amazonUrl: 'https://www.amazon.com/dp/B00IWYP5NI?tag=mintbrooks-20',
        coverColor: '#F0EBE1',
        coverAccent: '#1D3A2F',
        editorial:
          `The disciplined pursuit of less. McKeown's argument: if you try to do everything, you will be everywhere and feel like you're nowhere. Essentialism is not about getting more done — it's about getting the right things done by making the trade-offs explicit. The word "no" is an act of discernment, not rejection. The book Mintbrooks runs on.`,
        shortTake: 'The word "no" is a form of wisdom.',
      },
      {
        title: 'Deep Work',
        author: 'Cal Newport',
        year: 2016,
        isbn: '9781455586691',
        amazonUrl: 'https://www.amazon.com/dp/B0189PVAWY?tag=mintbrooks-20',
        coverColor: '#1A1714',
        coverAccent: '#B8955A',
        editorial:
          `The ability to focus deeply on cognitively demanding work, without distraction, is increasingly rare and increasingly valuable. Newport's argument is that this skill — which he calls "deep work" — is the competitive advantage of the 21st century, and that most knowledge workers have allowed it to atrophy. The first half is the case. The second half is the system. Both are excellent.`,
        shortTake: 'Focus is the new rare resource.',
      },
      {
        title: 'The Tipping Point',
        author: 'Malcolm Gladwell',
        year: 2000,
        isbn: '9780316346627',
        amazonUrl: 'https://www.amazon.com/dp/B000OYD8T2?tag=mintbrooks-20',
        coverColor: '#2D4A3A',
        coverAccent: '#E8D5A3',
        editorial:
          `Still the best mental model for understanding how ideas move through populations. Gladwell's three rules — the Law of the Few, the Stickiness Factor, the Power of Context — remain remarkably useful for anyone thinking about marketing, culture, or why some things catch and others don't. Written in 2000, reads like it was written last year.`,
        shortTake: 'Why some ideas spread and others die.',
      },
    ],
  },
]

// ── Pull quotes between sections ──────────────────────────────────────────────

const PULL_QUOTES = [
  {
    quote: 'The best investment you can make is in yourself.',
    attribution: '— Warren Buffett',
  },
  {
    quote: 'A reader lives a thousand lives before he dies. The man who never reads lives only one.',
    attribution: '— George R.R. Martin',
  },
  {
    quote: 'Your home should tell the story of who you are and be a collection of what you love.',
    attribution: '— Nate Berkus',
  },
]

// ── Sub-components ────────────────────────────────────────────────────────────

function BookCover({
  book,
  coverUrl,
}: {
  book: Book
  coverUrl: string
}) {
  return (
    <div
      style={{
        aspectRatio: '2/3',
        width: '100%',
        overflow: 'hidden',
        background: book.coverColor,
        boxShadow: '0 8px 32px rgba(0,0,0,0.22)',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={coverUrl}
        alt={`${book.title} by ${book.author}`}
        loading="lazy"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center top',
          display: 'block',
        }}
      />
    </div>
  )
}

function FeaturedBook({ book, coverUrl }: { book: Book; coverUrl: string }) {
  return (
    <article className="rl-featured-book">
      <a
        href={book.amazonUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="rl-featured-cover"
        style={{ display: 'block' }}
      >
        <BookCover book={book} coverUrl={coverUrl} />
      </a>
      <div className="rl-featured-content">
        <div
          style={{
            fontSize: '11px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#B8955A',
            fontWeight: 700,
            marginBottom: '16px',
          }}
        >
          Editor's Pick
        </div>
        <h3
          style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(24px,3vw,38px)',
            fontWeight: 700,
            color: '#1A1714',
            lineHeight: 1.1,
            margin: '0 0 8px 0',
            letterSpacing: '-0.02em',
          }}
        >
          {book.title}
        </h3>
        <div
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '14px',
            color: '#6B6557',
            marginBottom: '24px',
          }}
        >
          {book.author} · {book.year}
        </div>
        <p
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: 'clamp(15px,1.2vw,17px)',
            lineHeight: 1.75,
            color: '#1A1714',
            margin: '0 0 24px 0',
            maxWidth: '540px',
          }}
        >
          {book.editorial}
        </p>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div
            style={{
              display: 'inline-block',
              padding: '8px 20px',
              background: 'transparent',
              border: '1.5px solid #1D3A2F',
              borderRadius: '100px',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#1D3A2F',
            }}
          >
            {book.shortTake}
          </div>
          <a
            href={book.amazonUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 20px',
              background: '#FF9900',
              borderRadius: '100px',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.06em',
              color: '#1A1714',
              textDecoration: 'none',
            }}
          >
            Buy on Amazon ↗
          </a>
        </div>
      </div>
    </article>
  )
}

function SmallBookCard({ book, coverUrl }: { book: Book; coverUrl: string }) {
  return (
    <article className="rl-small-book">
      {/* Column 1: cover */}
      <a
        href={book.amazonUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        style={{ display: 'block' }}
      >
        <BookCover book={book} coverUrl={coverUrl} />
      </a>
      {/* Column 2: all text — single wrapper so grid stays 2-column */}
      <div>
        <h4
          style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(16px,1.5vw,20px)',
            fontWeight: 700,
            color: '#1A1714',
            lineHeight: 1.2,
            margin: '0 0 6px 0',
          }}
        >
          {book.title}
        </h4>
        <div
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '12px',
            color: '#6B6557',
            marginBottom: '12px',
          }}
        >
          {book.author} · {book.year}
        </div>
        <p
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '14px',
            lineHeight: 1.7,
            color: '#3A3430',
            margin: '0 0 14px 0',
          }}
        >
          {book.editorial}
        </p>
        <a
          href={book.amazonUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.06em',
            color: '#B8955A',
            textDecoration: 'none',
            textTransform: 'uppercase',
          }}
        >
          Buy on Amazon ↗
        </a>
      </div>
    </article>
  )
}

// ── Trending books (scraped from Amazon bestsellers, curated to MB audience) ───

type TrendingBook = {
  title: string
  author: string
  isbn: string
  amazonUrl: string
  tag: string
}

const TRENDING: TrendingBook[] = [
  {
    title: 'Zero to One',
    author: 'Peter Thiel',
    isbn: '9780804139021',
    amazonUrl: 'https://www.amazon.com/dp/B00M284NY2?tag=mintbrooks-20',
    tag: 'Business',
  },
  {
    title: 'Poor Charlie\'s Almanack',
    author: 'Charlie Munger',
    isbn: '9781953953247',
    amazonUrl: 'https://www.amazon.com/dp/B0CMDK1ZHD?tag=mintbrooks-20',
    tag: 'Investing',
  },
  {
    title: 'Principles',
    author: 'Ray Dalio',
    isbn: '9781501124020',
    amazonUrl: 'https://www.amazon.com/dp/1982160276?tag=mintbrooks-20',
    tag: 'Business',
  },
  {
    title: 'The Creative Act',
    author: 'Rick Rubin',
    isbn: '9780593652886',
    amazonUrl: 'https://www.amazon.com/dp/0593652886?tag=mintbrooks-20',
    tag: 'Creativity',
  },
  {
    title: 'Same as Ever',
    author: 'Morgan Housel',
    isbn: '9780593332702',
    amazonUrl: 'https://www.amazon.com/dp/0593332709?tag=mintbrooks-20',
    tag: 'Money',
  },
  {
    title: 'Die with Zero',
    author: 'Bill Perkins',
    isbn: '9780358099765',
    amazonUrl: 'https://www.amazon.com/dp/0358099765?tag=mintbrooks-20',
    tag: 'Life',
  },
  {
    title: 'The Anxious Generation',
    author: 'Jonathan Haidt',
    isbn: '9780593655030',
    amazonUrl: 'https://www.amazon.com/dp/0593655036?tag=mintbrooks-20',
    tag: 'Culture',
  },
  {
    title: 'Abundance',
    author: 'Ezra Klein & Derek Thompson',
    isbn: '9781668089552',
    amazonUrl: 'https://www.amazon.com/dp/B0C7Y68VWT?tag=mintbrooks-20',
    tag: 'Ideas',
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    isbn: '9780735211292',
    amazonUrl: 'https://www.amazon.com/dp/0735211299?tag=mintbrooks-20',
    tag: 'Habits',
  },
  {
    title: 'Greenlights',
    author: 'Matthew McConaughey',
    isbn: '9780593139134',
    amazonUrl: 'https://www.amazon.com/dp/0593139135?tag=mintbrooks-20',
    tag: 'Life',
  },
  {
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    isbn: '9780062316097',
    amazonUrl: 'https://www.amazon.com/dp/0062316095?tag=mintbrooks-20',
    tag: 'History',
  },
  {
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    isbn: '9780374533557',
    amazonUrl: 'https://www.amazon.com/dp/0374533555?tag=mintbrooks-20',
    tag: 'Psychology',
  },
  {
    title: 'Essentialism',
    author: 'Greg McKeown',
    isbn: '9780804137386',
    amazonUrl: 'https://www.amazon.com/dp/0804137382?tag=mintbrooks-20',
    tag: 'Focus',
  },
  {
    title: 'Never Split the Difference',
    author: 'Chris Voss',
    isbn: '9780062407801',
    amazonUrl: 'https://www.amazon.com/dp/0062407805?tag=mintbrooks-20',
    tag: 'Negotiation',
  },
  {
    title: 'Big Magic',
    author: 'Elizabeth Gilbert',
    isbn: '9781594634727',
    amazonUrl: 'https://www.amazon.com/dp/1594634726?tag=mintbrooks-20',
    tag: 'Creativity',
  },
  {
    title: 'The 48 Laws of Power',
    author: 'Robert Greene',
    isbn: '9780140280197',
    amazonUrl: 'https://www.amazon.com/dp/0140280197?tag=mintbrooks-20',
    tag: 'Power',
  },
  {
    title: 'Untamed',
    author: 'Glennon Doyle',
    isbn: '9781984801258',
    amazonUrl: 'https://www.amazon.com/dp/1984801252?tag=mintbrooks-20',
    tag: 'Women',
  },
  {
    title: 'Meditations',
    author: 'Marcus Aurelius',
    isbn: '9780812968255',
    amazonUrl: 'https://www.amazon.com/dp/0812968255?tag=mintbrooks-20',
    tag: 'Stoicism',
  },
  {
    title: 'Start with Why',
    author: 'Simon Sinek',
    isbn: '9781591846444',
    amazonUrl: 'https://www.amazon.com/dp/1591846447?tag=mintbrooks-20',
    tag: 'Leadership',
  },
  {
    title: 'The Midnight Library',
    author: 'Matt Haig',
    isbn: '9780525559474',
    amazonUrl: 'https://www.amazon.com/dp/0525559477?tag=mintbrooks-20',
    tag: 'Fiction',
  },
]

// ── Google Books cover fetch (build-time, cached forever) ─────────────────────

async function fetchCoverUrl(isbn: string): Promise<string> {
  const fallback = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY
  if (!apiKey) return fallback
  try {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${apiKey}&fields=items/volumeInfo/imageLinks`,
      { cache: 'force-cache' },
    )
    if (!res.ok) return fallback
    const data = await res.json()
    const thumb: string | undefined = data?.items?.[0]?.volumeInfo?.imageLinks?.thumbnail
    if (!thumb) return fallback
    // Upgrade to ~800px wide, remove curl edge artifact, force HTTPS
    return thumb
      .replace('http://', 'https://')
      .replace('zoom=1', 'zoom=1')
      .replace('&edge=curl', '')
      + '&fife=w800-h1200'
  } catch {
    return fallback
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function ReadingListPage() {
  // Fetch curated + trending covers in parallel at build time
  const allBooks = SECTIONS.flatMap((s) => s.books)
  const [curatedUrls, trendingUrls] = await Promise.all([
    Promise.all(allBooks.map((b) => fetchCoverUrl(b.isbn))),
    Promise.all(TRENDING.map((b) => fetchCoverUrl(b.isbn))),
  ])
  const coverMap: Record<string, string> = {}
  allBooks.forEach((book, i) => { coverMap[book.isbn] = curatedUrls[i] })
  TRENDING.forEach((book, i) => { coverMap[book.isbn] = trendingUrls[i] })

  return (
    <div className={playfair.variable} style={{ background: '#FDFAF6', color: '#1A1714' }}>
      <style>{`
        /* ── Opening stamp ───────────────────────────────────── */
        .rl-stamp {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 100vh;
        }
        @media (max-width: 768px) {
          .rl-stamp {
            grid-template-columns: 1fr;
            min-height: auto;
          }
        }

        /* ── Section layout ──────────────────────────────────── */
        .rl-section {
          padding: clamp(60px, 8vw, 120px) clamp(20px, 5vw, 80px);
          max-width: 1280px;
          margin: 0 auto;
        }

        /* ── Featured book: 2-col ────────────────────────────── */
        .rl-featured-book {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: clamp(32px, 5vw, 80px);
          align-items: start;
          margin-bottom: clamp(48px, 6vw, 80px);
        }
        @media (max-width: 768px) {
          .rl-featured-book {
            grid-template-columns: 160px 1fr;
            gap: 24px;
          }
        }
        @media (max-width: 520px) {
          .rl-featured-book {
            grid-template-columns: 1fr;
          }
          .rl-featured-cover {
            max-width: 200px;
          }
        }

        /* ── Supporting books: 2-col grid ────────────────────── */
        .rl-supporting-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(24px, 3vw, 48px);
        }
        @media (max-width: 580px) {
          .rl-supporting-grid {
            grid-template-columns: 1fr;
          }
        }

        /* ── Small book card ─────────────────────────────────── */
        .rl-small-book {
          display: grid;
          grid-template-columns: 100px 1fr;
          gap: 20px;
          align-items: start;
        }
        @media (max-width: 400px) {
          .rl-small-book {
            grid-template-columns: 80px 1fr;
            gap: 14px;
          }
        }

        /* ── Good Life section: 3-col then 2-col ─────────────── */
        .rl-good-life-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(24px, 3vw, 40px);
        }
        @media (max-width: 900px) {
          .rl-good-life-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 560px) {
          .rl-good-life-grid {
            grid-template-columns: 1fr;
          }
        }

        /* ── Pull quote ──────────────────────────────────────── */
        .rl-pull-quote {
          padding: clamp(60px, 8vw, 100px) clamp(20px, 8vw, 140px);
          text-align: center;
        }

        /* ── Section divider ─────────────────────────────────── */
        .rl-divider {
          width: 48px;
          height: 3px;
          background: #B8955A;
          margin: 0 0 clamp(40px, 5vw, 64px) 0;
        }

        /* ── Trending shelf — hide scrollbar ────────────────── */
        div[style*="overflowX: auto"]::-webkit-scrollbar { display: none; }

        /* ── Trending card hover ─────────────────────────────── */
        .rl-trending-card > div:first-child {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .rl-trending-card:hover > div:first-child {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.6) !important;
        }

        /* ── TOC row hover ───────────────────────────────────── */
        .rl-toc-row:hover {
          background: rgba(184,149,90,0.08);
          margin: 0 -12px;
          padding-left: 12px !important;
          padding-right: 12px !important;
          border-radius: 4px;
        }
        .rl-toc-row:hover span:last-child {
          color: #1D3A2F !important;
        }

        /* ── Hover animations ────────────────────────────────── */
        .rl-featured-book:hover .rl-featured-cover > div {
          transform: translateY(-4px);
          transition: transform 0.3s ease;
        }
        .rl-small-book > div:first-child {
          transition: transform 0.25s ease;
        }
        .rl-small-book:hover > div:first-child {
          transform: translateY(-3px);
        }
      `}</style>

      {/* ═══════════════════════════════════════════════════════════════════
          OPENING — Not a hero. A declaration.
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="rl-stamp">
        {/* Left: Forest statement with photo background */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: 'clamp(60px, 8vw, 100px) clamp(32px, 5vw, 72px)',
            overflow: 'hidden',
            background: '#1D3A2F',
          }}
        >
          {/* Background photo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/lifestyle/editorial.jpg"
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              opacity: 0.88,
              zIndex: 0,
            }}
          />
          {/* Forest base — shows behind photo where opacity < 1 */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: '#1D3A2F',
            zIndex: -1,
          }} />
          {/* Gradient — transparent until 55%, then hardens fast to protect text */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 55%, rgba(29,58,47,0.82) 72%, rgba(29,58,47,0.99) 85%, rgba(29,58,47,1) 100%)',
            zIndex: 1,
          }} />
          {/* Content — above overlays */}
          <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '10px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#B8955A',
              marginBottom: '24px',
            }}
          >
            Mintbrooks — The Library
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(40px, 6vw, 80px)',
              fontWeight: 700,
              color: '#FDFAF6',
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              margin: '0 0 32px 0',
              textShadow: '0 2px 16px rgba(0,0,0,0.35)',
            }}
          >
            Books We'd Press Into Your Hands
          </h1>
          <p
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: 'clamp(15px, 1.2vw, 18px)',
              lineHeight: 1.7,
              color: 'rgba(253,250,246,0.65)',
              margin: '0 0 48px 0',
              maxWidth: '420px',
            }}
          >
            A living library, curated for the Mintbrooks reader. Six subjects. One rule: if we wouldn't give it to someone we care about, it doesn't make the list.
          </p>
          <div
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '11px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(253,250,246,0.35)',
            }}
          >
            Updated April 2026
          </div>
          </div>
        </div>

        {/* Right: Classification grid — books as data */}
        <div
          style={{
            background: '#F5EFE4',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(60px, 8vw, 100px) clamp(32px, 5vw, 72px)',
          }}
        >
          <div
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '11px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#6B6557',
              marginBottom: '28px',
            }}
          >
            Reading Sections
          </div>
          {SECTIONS.map((section, i) => (
            <a
              key={i}
              href={`#section-${i + 1}`}
              style={{
                display: 'grid',
                gridTemplateColumns: '20px 1fr auto',
                gap: '16px',
                alignItems: 'baseline',
                padding: '14px 0',
                borderBottom: '1px solid rgba(26,23,20,0.08)',
                textDecoration: 'none',
                transition: 'background 0.15s',
              }}
              className="rl-toc-row"
            >
              <span
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '11px',
                  color: '#B8955A',
                  fontWeight: 700,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: 'clamp(15px, 1.3vw, 19px)',
                  color: '#1A1714',
                  fontWeight: 700,
                }}
              >
                {section.label}
              </span>
              <span
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '12px',
                  color: '#B8955A',
                }}
              >
                → {section.books.length} books
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTIONS — alternating layouts
      ═══════════════════════════════════════════════════════════════════ */}

      {SECTIONS.map((section, sIdx) => {
        const [featured, ...rest] = section.books
        const pullQuote = PULL_QUOTES[Math.floor(sIdx / 2)]
        const isLastSection = sIdx === SECTIONS.length - 1
        const isGoodLife = section.label === 'On the Good Life'

        return (
          <div key={sIdx}>
            {/* ── Pull quote between every 2 sections ── */}
            {sIdx > 0 && sIdx % 2 === 0 && PULL_QUOTES[sIdx / 2 - 1] && (
              <div
                style={{
                  background: sIdx % 4 === 0 ? '#1D3A2F' : '#F5EFE4',
                }}
              >
                <div className="rl-pull-quote">
                  <div
                    style={{
                      fontFamily: 'var(--font-playfair), Georgia, serif',
                      fontSize: 'clamp(22px, 3.5vw, 46px)',
                      fontStyle: 'italic',
                      fontWeight: 700,
                      lineHeight: 1.25,
                      color: sIdx % 4 === 0 ? '#FDFAF6' : '#1A1714',
                      maxWidth: '800px',
                      margin: '0 auto 20px',
                    }}
                  >
                    "{PULL_QUOTES[(sIdx / 2 - 1) % PULL_QUOTES.length].quote}"
                  </div>
                  <div
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontSize: '13px',
                      letterSpacing: '0.08em',
                      color: sIdx % 4 === 0 ? 'rgba(253,250,246,0.5)' : '#6B6557',
                    }}
                  >
                    {PULL_QUOTES[(sIdx / 2 - 1) % PULL_QUOTES.length].attribution}
                  </div>
                </div>
              </div>
            )}

            {/* ── Trending break — inserted after section 0 ── */}
            {sIdx === 0 && (
              <div style={{ background: '#1A1714', overflow: 'hidden' }}>
                {/* Header */}
                <div style={{
                  padding: 'clamp(40px,5vw,64px) clamp(20px,5vw,80px) 0',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '20px',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                }}>
                  <div>
                    <div style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontSize: '10px',
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: '#B8955A',
                      fontWeight: 700,
                      marginBottom: '10px',
                    }}>
                      Right Now
                    </div>
                    <h2 style={{
                      fontFamily: 'var(--font-playfair), Georgia, serif',
                      fontSize: 'clamp(28px,4vw,52px)',
                      fontWeight: 700,
                      color: '#FDFAF6',
                      lineHeight: 1.0,
                      letterSpacing: '-0.02em',
                      margin: 0,
                    }}>
                      What Everyone's Reading
                    </h2>
                  </div>
                  <div style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '13px',
                    color: 'rgba(253,250,246,0.4)',
                    maxWidth: '280px',
                    lineHeight: 1.6,
                  }}>
                    Amazon bestsellers filtered through the Mintbrooks lens. Trending across business, creativity, and the good life.
                  </div>
                </div>

                {/* Horizontal scroll shelf */}
                <div style={{
                  display: 'flex',
                  gap: '20px',
                  overflowX: 'auto',
                  padding: 'clamp(32px,4vw,48px) clamp(20px,5vw,80px)',
                  scrollSnapType: 'x mandatory',
                  WebkitOverflowScrolling: 'touch',
                  msOverflowStyle: 'none',
                  scrollbarWidth: 'none',
                }}>
                  {TRENDING.map((book, idx) => (
                    <a
                      key={idx}
                      href={book.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      style={{
                        flexShrink: 0,
                        width: 'clamp(140px,16vw,180px)',
                        scrollSnapAlign: 'start',
                        textDecoration: 'none',
                        display: 'block',
                      }}
                      className="rl-trending-card"
                    >
                      {/* Cover */}
                      <div style={{
                        aspectRatio: '2/3',
                        overflow: 'hidden',
                        marginBottom: '14px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                      }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={coverMap[book.isbn]}
                          alt={book.title}
                          loading="lazy"
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      </div>
                      {/* Tag */}
                      <div style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontSize: '9px',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: '#B8955A',
                        fontWeight: 700,
                        marginBottom: '4px',
                      }}>
                        {book.tag}
                      </div>
                      {/* Title */}
                      <div style={{
                        fontFamily: 'var(--font-playfair), Georgia, serif',
                        fontSize: 'clamp(13px,1.2vw,15px)',
                        fontWeight: 700,
                        color: '#FDFAF6',
                        lineHeight: 1.2,
                        marginBottom: '4px',
                      }}>
                        {book.title}
                      </div>
                      {/* Author */}
                      <div style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontSize: '11px',
                        color: 'rgba(253,250,246,0.45)',
                      }}>
                        {book.author}
                      </div>
                    </a>
                  ))}
                </div>

                {/* Scroll hint */}
                <div style={{
                  paddingBottom: 'clamp(32px,4vw,48px)',
                  paddingLeft: 'clamp(20px,5vw,80px)',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '11px',
                  color: 'rgba(253,250,246,0.25)',
                  letterSpacing: '0.08em',
                }}>
                  Scroll →
                </div>
              </div>
            )}

            {/* ── Top 10 Trending break — inserted after section 2 ── */}
            {sIdx === 2 && (
              <div style={{ background: '#1D3A2F', overflow: 'hidden' }}>
                {/* Header */}
                <div style={{
                  padding: 'clamp(40px,5vw,64px) clamp(20px,5vw,80px) 0',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '20px',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                }}>
                  <div>
                    <div style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontSize: '10px',
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: '#B8955A',
                      fontWeight: 700,
                      marginBottom: '10px',
                    }}>
                      This Season
                    </div>
                    <h2 style={{
                      fontFamily: 'var(--font-playfair), Georgia, serif',
                      fontSize: 'clamp(28px,4vw,52px)',
                      fontWeight: 700,
                      color: '#FDFAF6',
                      lineHeight: 1.0,
                      letterSpacing: '-0.02em',
                      margin: 0,
                    }}>
                      Top 10 Trending
                    </h2>
                  </div>
                  <div style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '13px',
                    color: 'rgba(253,250,246,0.4)',
                    maxWidth: '280px',
                    lineHeight: 1.6,
                  }}>
                    The books climbing charts right now — ranked by cultural moment, not just sales.
                  </div>
                </div>

                {/* Ranked grid — 2×5 on desktop, horizontal scroll on mobile */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: '24px 32px',
                  padding: 'clamp(32px,4vw,48px) clamp(20px,5vw,80px)',
                  overflowX: 'auto',
                  minWidth: 0,
                }}>
                  {TRENDING.slice(0, 10).map((book, idx) => (
                    <a
                      key={idx}
                      href={book.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      style={{
                        textDecoration: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: '120px',
                      }}
                    >
                      {/* Rank number */}
                      <div style={{
                        fontFamily: 'var(--font-playfair), Georgia, serif',
                        fontSize: 'clamp(32px,3vw,48px)',
                        fontWeight: 700,
                        color: 'rgba(184,149,90,0.25)',
                        lineHeight: 1,
                        marginBottom: '8px',
                      }}>
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                      {/* Cover */}
                      <div style={{
                        aspectRatio: '2/3',
                        overflow: 'hidden',
                        marginBottom: '12px',
                        boxShadow: '0 6px 24px rgba(0,0,0,0.4)',
                      }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={coverMap[book.isbn]}
                          alt={book.title}
                          loading="lazy"
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      </div>
                      {/* Tag */}
                      <div style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontSize: '9px',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: '#B8955A',
                        fontWeight: 700,
                        marginBottom: '4px',
                      }}>
                        {book.tag}
                      </div>
                      {/* Title */}
                      <div style={{
                        fontFamily: 'var(--font-playfair), Georgia, serif',
                        fontSize: 'clamp(13px,1.1vw,15px)',
                        fontWeight: 700,
                        color: '#FDFAF6',
                        lineHeight: 1.2,
                        marginBottom: '4px',
                      }}>
                        {book.title}
                      </div>
                      {/* Author */}
                      <div style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontSize: '11px',
                        color: 'rgba(253,250,246,0.45)',
                      }}>
                        {book.author}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* ── Section ── */}
            <section
              id={`section-${sIdx + 1}`}
              className="rl-section"
              style={{
                background: sIdx % 2 === 1 ? '#F5EFE4' : '#FDFAF6',
                scrollMarginTop: '70px',
              }}
            >
              {/* Section header */}
              <div style={{ marginBottom: 'clamp(32px, 4vw, 56px)' }}>
                <div
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '10px',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: '#B8955A',
                    fontWeight: 700,
                    marginBottom: '12px',
                  }}
                >
                  Section {String(sIdx + 1).padStart(2, '0')}
                </div>
                <h2
                  style={{
                    fontFamily: 'var(--font-playfair), Georgia, serif',
                    fontSize: 'clamp(32px, 5vw, 60px)',
                    fontWeight: 700,
                    color: '#1A1714',
                    lineHeight: 1.0,
                    letterSpacing: '-0.02em',
                    margin: '0 0 20px 0',
                  }}
                >
                  {section.label}
                </h2>
                <p
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: 'clamp(15px, 1.1vw, 17px)',
                    lineHeight: 1.7,
                    color: '#6B6557',
                    margin: 0,
                    maxWidth: '560px',
                  }}
                >
                  {section.intro}
                </p>
              </div>

              <div className="rl-divider" />

              {/* Good Life section: all 5 books in a multi-col grid */}
              {isGoodLife ? (
                <div className="rl-good-life-grid">
                  {section.books.map((book, bIdx) => (
                    <article key={bIdx}>
                      <a
                        href={book.amazonUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        style={{ display: 'block', marginBottom: '16px' }}
                      >
                        <BookCover book={book} coverUrl={coverMap[book.isbn]} />
                      </a>
                      <h4
                        style={{
                          fontFamily: 'var(--font-playfair), Georgia, serif',
                          fontSize: 'clamp(17px,1.5vw,22px)',
                          fontWeight: 700,
                          color: '#1A1714',
                          lineHeight: 1.2,
                          margin: '0 0 6px 0',
                        }}
                      >
                        {book.title}
                      </h4>
                      <div
                        style={{
                          fontFamily: 'Inter, system-ui, sans-serif',
                          fontSize: '12px',
                          color: '#6B6557',
                          marginBottom: '12px',
                        }}
                      >
                        {book.author} · {book.year}
                      </div>
                      <p
                        style={{
                          fontFamily: 'Inter, system-ui, sans-serif',
                          fontSize: '14px',
                          lineHeight: 1.7,
                          color: '#3A3430',
                          margin: 0,
                        }}
                      >
                        {book.editorial}
                      </p>
                    </article>
                  ))}
                </div>
              ) : (
                <>
                  {/* Featured book (first in section) */}
                  <FeaturedBook book={featured} coverUrl={coverMap[featured.isbn]} />

                  {/* Supporting books */}
                  {rest.length > 0 && (
                    <div className="rl-supporting-grid">
                      {rest.map((book, bIdx) => (
                        <SmallBookCard key={bIdx} book={book} coverUrl={coverMap[book.isbn]} />
                      ))}
                    </div>
                  )}
                </>
              )}
            </section>
          </div>
        )
      })}

      {/* ═══════════════════════════════════════════════════════════════════
          CLOSING — Editorial pull + Newsletter
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: '#1D3A2F',
          padding: 'clamp(80px, 10vw, 140px) clamp(20px, 5vw, 80px)',
        }}
      >
        <div
          style={{
            maxWidth: '680px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '10px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#B8955A',
              fontWeight: 700,
              marginBottom: '24px',
            }}
          >
            The List Grows
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 700,
              color: '#FDFAF6',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              margin: '0 0 20px 0',
            }}
          >
            New books, first. Every month.
          </h2>
          <p
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: 'clamp(15px, 1.2vw, 18px)',
              lineHeight: 1.75,
              color: 'rgba(253,250,246,0.65)',
              margin: '0 0 48px 0',
            }}
          >
            We add to the reading list when we find something we can't stop recommending. Subscribers hear about it first — along with the editors' notes on why it made the cut.
          </p>

          {/* Inline subscribe form */}
          <form
            action="/api/lifestyle/subscribe"
            method="POST"
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <input type="hidden" name="source" value="reading-list" />
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              style={{
                flex: '1 1 260px',
                maxWidth: '320px',
                padding: '16px 20px',
                borderRadius: '100px',
                border: '1.5px solid rgba(253,250,246,0.2)',
                background: 'rgba(253,250,246,0.08)',
                color: '#FDFAF6',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '15px',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '16px 32px',
                borderRadius: '100px',
                background: '#B8955A',
                color: '#1A1714',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '0.04em',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Get the next list
            </button>
          </form>

          <div
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '12px',
              color: 'rgba(253,250,246,0.3)',
              marginTop: '16px',
            }}
          >
            No spam. Unsubscribe at any time.
          </div>
        </div>
      </section>
    </div>
  )
}
