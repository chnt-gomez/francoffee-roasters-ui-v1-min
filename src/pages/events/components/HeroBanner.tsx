const HeroBanner = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
      <div className="flex flex-col items-start gap-4">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Community Events
        </p>
        <h2 className="max-w-2xl font-serif text-3xl leading-tight tracking-tight text-foreground md:text-5xl md:leading-tight">
          Workshops, tastings, and gatherings
        </h2>
        <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
          Join us for hands-on experiences, exclusive previews, and community events. Select a date to schedule your next visit.
        </p>
      </div>
    </section>
  )
}

export default HeroBanner
