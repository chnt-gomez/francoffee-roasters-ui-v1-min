import { Separator } from '@/components/ui/separator'

const faqs = [
    {
      question: "What are your shipping times?",
      answer:
        "Domestic orders typically ship within 2-3 business days. International shipping times vary by location, usually 7-14 business days.",
    },
    {
      question: "Do you offer returns or exchanges?",
      answer:
        "Yes! We offer free returns within 30 days of purchase for items in original condition. Custom orders are final sale.",
    },
    {
      question: "Can I visit your studio?",
      answer:
        "Absolutely! Our Brooklyn studio is open by appointment. Please email us or call to schedule a visit.",
    },
    {
      question: "Do you offer wholesale pricing?",
      answer:
        "Yes, we work with select retailers and designers. Please reach out via the contact form with subject 'Wholesale Inquiry' for more information.",
    },
  ]

const FAQSection = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          FAQ
        </p>
        <h3 className="font-serif text-2xl tracking-tight text-foreground md:text-3xl">
          Frequently asked questions
        </h3>
      </div>

      <div className="mx-auto mt-10 grid max-w-3xl gap-6">
        {faqs.map((faq, index) => (
          <div key={index} className="flex flex-col gap-2">
            <h4 className="text-base font-semibold text-foreground">{faq.question}</h4>
            <p className="text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
            {index < faqs.length - 1 && <Separator className="mt-4" />}
          </div>
        ))}
      </div>
    </section>
  )
}

export default FAQSection
