import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { CreditCard, Package, Truck } from 'lucide-react'
import { Link } from 'react-router'
import { useCheckout } from '../context/CheckoutContext'



const OrderSummary = () => {

  const { handleConfirmCheckout, isSubmitting, cartItems, subtotal, tax, shipping, errors, total } = useCheckout();

  return (

    <div className="hidden lg:block">

      <Card className="sticky top-24">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 font-serif text-xl">
            <Package className="h-5 w-5" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <Package className="h-12 w-12 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">No items in your order</p>
              <Button variant="outline" size="sm">
                <Link to="/">Browse Products</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="flex max-h-64 flex-col gap-3 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-secondary">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="object-cover"
                        sizes="64px"
                      />
                      <Badge className="absolute -right-1 -top-1 h-5 w-5 items-center justify-center rounded-full p-0 text-[10px]">
                        {item.quantity}
                      </Badge>
                    </div>
                    <div className="flex flex-1 flex-col justify-center">
                      <p className="text-sm font-medium text-foreground line-clamp-1">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ${item.product.price} x {item.quantity}
                      </p>
                    </div>
                    <p className="self-center text-sm font-semibold text-foreground">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Truck className="h-4 w-4" />
                    Shipping
                  </span>
                  <span className="text-foreground">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span className="text-foreground">${tax.toFixed(2)}</span>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-foreground">Total</span>
                <span className="text-xl font-bold text-foreground">${total.toFixed(2)}</span>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <div className="mt-4">
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
              Confirm & Pay
            </>
          )}
        </Button>
        {errors.cart && (
          <p className="mt-2 text-center text-sm text-destructive">{errors.cart}</p>
        )}
        <p className="mt-3 text-center text-xs text-muted-foreground">
          You will be redirected to our secure payment processor
        </p>
      </div>
    </div>



  )
}

export default OrderSummary
