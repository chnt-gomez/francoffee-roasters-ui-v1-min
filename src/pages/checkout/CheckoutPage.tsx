"use client"

import CheckoutHeader from "./components/CheckoutHeader"
import ProgressSteps from "./components/ProgressSteps"
import GuestInformationCard from "./components/GuestInformationCard"
import DeliveryMap from "./components/DeliveryMap"
import CheckoutForm from "./components/CheckoutForm"
import CheckoutFooter from "./components/CheckoutFooter"
import OrderSummary from "./components/OrderSummary"
import { CheckoutProvider } from "./context/CheckoutContext"

export default function CheckoutPage() {

  return (
    <CheckoutProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <CheckoutHeader />
        <main className="flex-1 py-8">
          <div className="mx-auto max-w-7xl px-6">
            {/* Progress Steps */}
            <ProgressSteps />
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Main Form */}
              <div className="flex flex-col gap-8 lg:col-span-2">
                {/* Guest Information */}
                <GuestInformationCard />
                <DeliveryMap />
                <CheckoutForm />
              </div>
              <OrderSummary />
            </div>
          </div>
        </main>
        <CheckoutFooter />
      </div>
    </CheckoutProvider>
  )
}
