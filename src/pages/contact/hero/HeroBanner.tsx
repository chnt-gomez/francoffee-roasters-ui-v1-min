import { Badge } from '@/components/ui/badge'
import { Mail } from 'lucide-react'

const HeroBanner = () => {
  return (
   <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/contact-hero.jpg"
          alt="Francofee studio workspace"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="flex flex-col items-center gap-4 text-center">
          <Badge variant="secondary" className="gap-1.5">
            <Mail className="h-3 w-3" />
            Get in Touch
          </Badge>
          <h2 className="max-w-3xl font-serif text-3xl leading-tight tracking-tight text-foreground md:text-5xl md:leading-tight">
            {"We'd love to hear from you"}
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Questions, feedback, or just want to say hello? Our team is here to help and always happy to connect.
          </p>
        </div>
      </div>
    </section>
  )
}

export default HeroBanner
