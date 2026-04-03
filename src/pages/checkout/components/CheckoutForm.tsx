import { Card, CardContent } from "@/components/ui/card"
import { CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCheckout } from "../context/CheckoutContext";


const CheckoutForm = () => {

  const {
    cartItems,
    errors,
    isSubmitting,
    total,
    handleConfirmCheckout
  } =
    useCheckout();

  return (
    <>

      <div className="lg:hidden">
        <Card>
          <CardContent className="pt-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-base font-medium text-foreground">Total</span>
              <span className="text-xl font-bold text-foreground">
                ${total.toFixed(2)}
              </span>
            </div>
            <Button
              className="w-full gap-2"
              size="lg"
              onClick={handleConfirmCheckout}
              disabled={isSubmitting || cartItems.length === 0 || Object.keys(errors).length > 0}
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4" />
                  Confirm & Pay ${total.toFixed(2)}
                </>
              )}
            </Button>
            {errors.cart && (
              <p className="mt-2 text-center text-sm text-destructive">
                {errors.cart}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

    </>
  )
}

export default CheckoutForm
