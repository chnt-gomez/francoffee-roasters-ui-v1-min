const HeroBanner = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <div className="flex flex-col items-start gap-6">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Curated Essentials
        </p>
        <h2 className="max-w-2xl font-serif text-4xl leading-tight tracking-tight text-foreground md:text-6xl md:leading-tight">
          Thoughtfully made for everyday living
        </h2>
        <p className="max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
          A curated collection of handcrafted goods designed to bring warmth, function, and beauty into your daily routine.
        </p>
      </div>
    </section>
  )
}

export default HeroBanner
