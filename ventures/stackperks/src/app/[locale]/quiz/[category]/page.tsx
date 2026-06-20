import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import LifestyleNav from '@/components/lifestyle/LifestyleNav'
import LifestyleFooter from '@/components/lifestyle/LifestyleFooter'
import QuizClient from './QuizClient'

const QUIZ_META: Record<string, { title: string; description: string }> = {
  beauty: {
    title: 'Discover Your Skin Story — Beauty Quiz',
    description: 'Three questions to find the skincare ritual that fits exactly who you are. Get personalized product picks from Mintbrooks.',
  },
  'home-decor': {
    title: 'Discover Your Space Personality — Home Decor Quiz',
    description: 'Your home is a self-portrait. Find the aesthetic that reflects who you really are, and shop the pieces that bring it to life.',
  },
  kitchen: {
    title: 'Discover Your Kitchen Personality — Kitchen Quiz',
    description: 'The way you cook says everything about you. Find your kitchen archetype and the tools to match.',
  },
  wellness: {
    title: 'Discover Your Wellness Archetype — Wellness Quiz',
    description: 'Your body knows what it needs. Three questions to find your wellness personality and the picks that support it.',
  },
  finance: {
    title: 'Discover Your Money Personality — Finance Quiz',
    description: 'How you handle credit reveals more than you think. Find your financial archetype and your clearest next steps.',
  },
}

const VALID_CATEGORIES = Object.keys(QUIZ_META)

export function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({ category }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params
  const meta = QUIZ_META[category]
  if (!meta) return {}
  return {
    title: `${meta.title} — Mintbrooks`,
    description: meta.description,
    alternates: { canonical: `https://mintbrooks.com/quiz/${category}` },
    openGraph: {
      title: `${meta.title} — Mintbrooks`,
      description: meta.description,
      type: 'website',
      url: `https://mintbrooks.com/quiz/${category}`,
    },
  }
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  if (!VALID_CATEGORIES.includes(category)) notFound()

  return (
    <div style={{ background: '#FDFAF6', minHeight: '100vh' }}>
      <LifestyleNav />
      <QuizClient category={category} />
      <LifestyleFooter />
    </div>
  )
}
