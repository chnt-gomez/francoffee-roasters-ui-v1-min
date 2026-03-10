const InfoSection = () => {
  return (
    <section id="about" className="border-t border-border bg-secondary/50">
          <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 py-20 md:flex-row md:items-center md:gap-16">
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Our Story</p>
              <h3 className="mt-3 font-serif text-3xl tracking-tight text-foreground md:text-4xl">
                Made with intention
              </h3>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
                Every item in our collection is chosen for its craftsmanship, sustainability, and the quiet joy it brings to daily life. We partner directly with makers who share our values.
              </p>
            </div>
            <div className="grid flex-1 grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 rounded-lg bg-background p-6">
                <p className="font-serif text-3xl text-foreground">50+</p>
                <p className="text-sm text-muted-foreground">Artisan Partners</p>
              </div>
              <div className="flex flex-col gap-1 rounded-lg bg-background p-6">
                <p className="font-serif text-3xl text-foreground">12</p>
                <p className="text-sm text-muted-foreground">Countries</p>
              </div>
              <div className="flex flex-col gap-1 rounded-lg bg-background p-6">
                <p className="font-serif text-3xl text-foreground">100%</p>
                <p className="text-sm text-muted-foreground">Sustainable</p>
              </div>
              <div className="flex flex-col gap-1 rounded-lg bg-background p-6">
                <p className="font-serif text-3xl text-foreground">5K+</p>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>
            </div>
          </div>
        </section>
  )
}

export default InfoSection
