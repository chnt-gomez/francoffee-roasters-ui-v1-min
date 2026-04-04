import { ArrowRight, ShoppingBag } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet"
import { Button } from "../ui/button"
import type { CartItem } from "@/types/cart.interface"
import CartItemRow from "./CartItemRow"

interface Props {
  open: boolean,
  onOpenChange: (open: boolean) => void,
  items: CartItem[],
  onIncrement: (id: string) => void,
  onDecrement: (id: string) => void,
  onRemove: (id: string) => void
}

const CartSheet = ({ open, onOpenChange, items, onIncrement, onDecrement, onRemove }: Props) => {

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-serif text-xl">Your Cart</SheetTitle>
        </SheetHeader>
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">Your cart is empty</p>
            <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4">
              <div className="flex flex-col gap-6">
                {items.map((item) => (
                  <CartItemRow
                    key={item.product.id}
                    item={item}
                    onIncrement={() => onIncrement(item.product.id)}
                    onDecrement={() => onDecrement(item.product.id)}
                    onRemove={() => onRemove(item.product.id)}
                  />
                ))}
              </div>
            </div>
            <div className="border-t border-border pt-4">
              <div className="flex items-center justify-between pb-4">
                <span className="text-sm font-medium text-muted-foreground">Subtotal</span>
                <span className="text-lg font-semibold text-foreground">${subtotal.toFixed(2)}</span>
              </div>
              <Button className="w-full gap-2" size="lg">
                Checkout
                <ArrowRight className="h-4 w-4" />
              </Button>
              <p className="pt-3 text-center text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout.
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default CartSheet
