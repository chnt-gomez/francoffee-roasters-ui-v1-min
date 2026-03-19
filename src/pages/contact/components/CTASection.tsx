import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'

const CTASection = () => {
  return (
    <section className="border-t border-border bg-foreground">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-16 text-center md:py-20">
        <h3 className="max-w-2xl font-serif text-2xl leading-snug tracking-tight text-background md:text-4xl">
          Ready to explore our collection?
        </h3>
        <p className="max-w-lg text-base leading-relaxed text-background/70">
          Discover our curated selection of handcrafted goods designed to bring beauty and function to your everyday life.
        </p>
        <Button size="lg" variant="secondary" className="mt-2 gap-2">
          <Link to="/">
            Browse Shop
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}

export default CTASection
