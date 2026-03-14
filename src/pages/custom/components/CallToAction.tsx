import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface Props{
    onInquiryClick: () => void
}

const CallToAction = ({onInquiryClick} : Props) => {
  return (
    <section className="border-t border-border bg-foreground">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-16 text-center md:py-20">
        <h3 className="max-w-2xl font-serif text-2xl leading-snug tracking-tight text-background md:text-4xl">
          Ready to create something special?
        </h3>
        <p className="max-w-lg text-base leading-relaxed text-background/70">
          Whether you are looking to learn a new craft, commission a custom piece, or transform your space, we are here to help.
        </p>
        <Button
          size="lg"
          variant="secondary"
          className="mt-2 gap-2"
          onClick={onInquiryClick}
        >
          Start Your Journey
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  )
}

export default CallToAction
