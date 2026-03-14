import { Badge } from '@/components/ui/badge'
import { Sparkles } from 'lucide-react'

const HeroBanner = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
      <div className="flex flex-col items-center gap-4 text-center">
        <Badge variant="secondary" className="gap-1.5">
          <Sparkles className="h-3 w-3" />
          Personalized Services
        </Badge>
        <h2 className="max-w-3xl font-serif text-3xl leading-tight tracking-tight text-foreground md:text-5xl md:leading-tight">
          Crafted just for you
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Beyond our curated collection, we offer personalized experiences tailored to your unique needs. From hands-on training to bespoke creations.
        </p>
      </div>
    </section>
  )
}

export default HeroBanner
