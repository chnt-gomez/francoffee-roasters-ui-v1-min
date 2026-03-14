import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle2 } from 'lucide-react'


interface Props {
    title: string,
    subtitle: string | undefined
    description: string,
    image: string,
    features: string[] | undefined,
    ctaText: string | undefined,
    reverse?: boolean | false,
    onCallToAction: () => void
}
const Banner = ({title, subtitle, description, image, features, ctaText, reverse, onCallToAction} : Props) => {
  return (
    <section className={`mx-auto max-w-7xl px-6 py-12 md:py-16 ${reverse ? "bg-secondary/30" : ""}`}>
      <div
        className={`flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16 ${
          reverse ? "lg:flex-row-reverse" : ""
        }`}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl lg:w-1/2">
          <img
            src={image}
            alt={title}
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col items-start gap-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            {subtitle}
          </p>
          <h3 className="font-serif text-2xl leading-snug tracking-tight text-foreground md:text-4xl">
            {title}
          </h3>
          <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
            {description}
          </p>

          {/* Features List */}
          {features && 
          <ul className="flex flex-col gap-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-foreground">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-accent" />
                {feature}
              </li>
            ))}
          </ul>
        }
        
            {ctaText &&
                    <Button size="lg" className="mt-2 gap-2" onClick={onCallToAction}>
                        {ctaText}
                        <ArrowRight className="h-4 w-4" />
                    </Button>
            }
        </div>    
        </div>
    </section>
  )
}

export default Banner
