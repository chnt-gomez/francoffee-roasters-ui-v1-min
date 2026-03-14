import type { ServiceType } from '@/types/serviceType.interface'
import React, { useState } from 'react'
import Banner from './Banner'
import StatsBanner from './StatsBanner'
import ProcessBanner from './ProcessBanner'
import InquiryDialog from './InquiryDialog'

const InfoSection = () => {

    const [inquiryOpen, setInquiryOpen] = useState(false)
      const [selectedService, setSelectedService] = useState<ServiceType>("training")
    
      const openInquiry =(service: ServiceType) => {
        setSelectedService(service)
        setInquiryOpen(true)
      }
  return (
    <>
    <Banner
          title="Master the craft with hands-on training"
          subtitle="Craft Training"
          description="Learn traditional techniques from our master artisans in intimate workshop settings. Whether you're a beginner or looking to refine your skills, our training programs are designed to inspire and educate."
          image="/images/custom-training.jpg"
          features={[
            "Small group or private sessions available",
            "All materials and tools provided",
            "Take home your finished creation",
            "Certificate of completion included",
          ]}
          ctaText="Inquire About Training"
          onCallToAction={() => openInquiry("training")}
        />

        <StatsBanner />

        {/* Hero Banner 2 - Custom Orders */}
        <Banner
          title="Bespoke pieces made to your specifications"
          subtitle="Custom Orders"
          description="From personalized monograms to completely custom designs, we bring your vision to life. Our artisans work closely with you to create one-of-a-kind pieces that reflect your style and story."
          image="/images/custom-orders.jpg"
          features={[
            "Full customization of materials and design",
            "Detailed mockups before production",
            "Premium gift packaging available",
            "Lifetime care and repair services",
          ]}
          ctaText="Start a Custom Order"
          onCallToAction={() => openInquiry("custom-order")}
          reverse
        />

        <ProcessBanner />

        {/* Hero Banner 3 - Design Consultation */}
        <Banner
          title="Expert guidance for your space"
          subtitle="Design Consultation"
          description="Not sure where to start? Our design consultants help you select the perfect pieces for your home or office. We consider your aesthetic preferences, functional needs, and budget to curate a personalized collection."
          image="/images/custom-consultation.jpg"
          features={[
            "In-person or virtual consultations",
            "Personalized product recommendations",
            "3D visualization for large projects",
            "Trade program for design professionals",
          ]}
          ctaText="Book a Consultation"
          onCallToAction={() => openInquiry("consultation")}
        />
        <InquiryDialog
        open={inquiryOpen}
        onOpenChange={setInquiryOpen}
        defaultService={selectedService}
      />
        </>
  )
}

export default InfoSection
