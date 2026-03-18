interface PageHeroProps {
  chapterLabel: string
  title: string
  description: string
}

export function PageHero({ chapterLabel, title, description }: PageHeroProps) {
  return (
    <section className="bg-fn3-red px-6 lg:px-12 pt-[72px] pb-[80px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end max-w-[1400px] mx-auto">
        <div>
          <p className="label-mono text-white/30 mb-5">{chapterLabel}</p>
          <h1 className="font-display text-[clamp(40px,5vw,64px)] text-white leading-[1] tracking-[-0.05em]">
            {title}
          </h1>
        </div>
        <p className="text-base text-white/55 leading-[1.75] lg:self-end">
          {description}
        </p>
      </div>
    </section>
  )
}
