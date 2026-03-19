import ContactInfoCard from './ContactInfoCard'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'

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

const ContractInfoSection = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <ContactInfoCard icon={Mail} title="Email Us">
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="text-foreground transition-colors hover:text-accent"
          >
            {CONTACT_INFO.email}
          </a>
          <p className="mt-1">We respond within 24 hours</p>
        </ContactInfoCard>

        <ContactInfoCard icon={Phone} title="Call Us">
          <a
            href={`tel:${CONTACT_INFO.phone}`}
            className="text-foreground transition-colors hover:text-accent"
          >
            {CONTACT_INFO.phone}
          </a>
          <p className="mt-1">Mon-Fri 9am-6pm EST</p>
        </ContactInfoCard>

        <ContactInfoCard icon={MapPin} title="Visit Us">
          <address className="not-italic">
            {CONTACT_INFO.address.street}
            <br />
            {CONTACT_INFO.address.city}, {CONTACT_INFO.address.state} {CONTACT_INFO.address.zip}
          </address>
        </ContactInfoCard>

        <ContactInfoCard icon={Clock} title="Business Hours">
          <p>{CONTACT_INFO.hours.weekday}</p>
          <p>{CONTACT_INFO.hours.weekend}</p>
          <p>{CONTACT_INFO.hours.closed}</p>
        </ContactInfoCard>
      </div>
    </section>
  )
}

export default ContractInfoSection
