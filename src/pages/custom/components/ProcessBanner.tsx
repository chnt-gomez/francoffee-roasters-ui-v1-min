const ProcessBanner = () => {
  const steps = [
    {
      number: "01",
      title: "Initial Contact",
      description: "Reach out through our inquiry form with your ideas and requirements.",
    },
    {
      number: "02",
      title: "Consultation",
      description: "We schedule a personalized session to understand your vision in depth.",
    },
    {
      number: "03",
      title: "Proposal",
      description: "Receive a detailed plan with timeline, materials, and pricing.",
    },
    {
      number: "04",
      title: "Creation",
      description: "Watch your vision come to life with regular updates throughout.",
    },
  ]

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          How It Works
        </p>
        <h3 className="font-serif text-2xl tracking-tight text-foreground md:text-4xl">
          Our process
        </h3>
        <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
          From first contact to final delivery, we ensure a seamless and enjoyable experience.
        </p>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col gap-3">
            <span className="font-serif text-4xl text-accent/60">{step.number}</span>
            <h4 className="text-lg font-semibold text-foreground">{step.title}</h4>
            <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProcessBanner
