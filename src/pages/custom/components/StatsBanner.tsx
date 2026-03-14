const StatsBanner = () => {
  return (
    <section className="border-y border-border bg-secondary/50">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="font-serif text-3xl text-foreground md:text-4xl">200+</p>
          <p className="text-sm text-muted-foreground">Students Trained</p>
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="font-serif text-3xl text-foreground md:text-4xl">150+</p>
          <p className="text-sm text-muted-foreground">Custom Pieces</p>
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="font-serif text-3xl text-foreground md:text-4xl">98%</p>
          <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="font-serif text-3xl text-foreground md:text-4xl">5+</p>
          <p className="text-sm text-muted-foreground">Years Experience</p>
        </div>
      </div>
    </section>
  )
}

export default StatsBanner
