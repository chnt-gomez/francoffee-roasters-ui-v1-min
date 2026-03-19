"use client"

import HeroBanner from "./hero/HeroBanner"
import ContractInfoSection from "./components/ContractInfoSection"
import ContactFormSection from "./components/ContactFormSection"
import TeamSection from "./components/TeamSection"
import FAQSection from "./components/FAQSection"
import SocialSection from "./components/SocialSection"
import CTASection from "./components/CTASection"

// --- Types ---


// --- Main Page ---

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <HeroBanner />

      <main className="flex-1">
        <ContractInfoSection />
        <ContactFormSection />
        <TeamSection />
        <FAQSection />
        <SocialSection />
        <CTASection />
      </main>
    </div>
  )
}
