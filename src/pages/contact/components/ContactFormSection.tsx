import { MapPin } from 'lucide-react'
import ContactForm from './ContactForm'
import { Button } from '@/components/ui/button'

const CONTACT_INFO = {
  email: "hello@francofee.com",
  phone: "+1 (555) 234-5678",
  address: {
    street: "142 Artisan Lane",
    city: "Brooklyn",
    state: "NY",
    zip: "11201",
    country: "United States",
  },
  hours: {
    weekday: "Mon - Fri: 9:00 AM - 6:00 PM EST",
    weekend: "Sat: 10:00 AM - 4:00 PM EST",
    closed: "Sun: Closed",
  },
}

const ContactFormSection = () => {
  return (
    <section className="border-y border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Form */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                Send a Message
              </p>
              <h3 className="mt-2 font-serif text-2xl tracking-tight text-foreground md:text-3xl">
                Contact our team
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Fill out the form below and we will get back to you as soon as possible.
              </p>
            </div>
            <ContactForm />
          </div>

          {/* Map / Location Visual */}
          <div className="flex flex-col gap-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-secondary">
              <img
                src="/images/contact-team.jpg"
                alt="The Francofee team"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-semibold text-foreground">Our Studio</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Located in the heart of Brooklyn, our studio and showroom is open for appointments. 
                Stop by to see our collection in person and meet the team behind Francofee.
              </p>
              <Button variant="outline" size="sm" className="w-fit gap-2">
                <a
                  href={`https://maps.google.com/?q=${CONTACT_INFO.address.street}, ${CONTACT_INFO.address.city}, ${CONTACT_INFO.address.state}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin className="h-4 w-4" />
                  Get Directions
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactFormSection
