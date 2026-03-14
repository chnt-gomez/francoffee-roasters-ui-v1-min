"use client"

import HeroBanner from "./hero/HeroBanner"
import InfoSection from "./components/InfoSection"

export default function CustomSupportPage() {


  return (
    <div className="flex min-h-screen flex-col">
      <HeroBanner />

      <main className="flex-1">
        <InfoSection />
    </main>
    </div>
  )
}
