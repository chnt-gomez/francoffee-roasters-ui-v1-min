import { ArrowRight, ShoppingBag } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet"
import { Button } from "../ui/button"
import type { CartItem } from "@/types/cart.interface"
import CartItemRow from "./CartItemRow"
import { useNavigate } from "react-router"

interface Props {
  open: boolean,
  onOpenChange: (open: boolean) => void,
  items: CartItem[],
  onIncrement: (id: string) => void,
  onDecrement: (id: string) => void,
  onRemove: (id: string) => void
}

const CartSheet = ({ open, onOpenChange, items, onIncrement, onDecrement, onRemove }: Props) => {
  const navigate = useNavigate();
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {/* Added p-0 to handle padding manually for a more polished scroll experience */}
      <SheetContent className="flex w-full flex-col p-0 sm:max-w-md">

        {/* Header with explicit padding */}
        <SheetHeader className="px-6 pt-8 pb-4">
          <SheetTitle className="font-serif text-2xl tracking-tight">Your Cart</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground/20" />
            <p className="text-sm text-muted-foreground">Your cart is currently empty.</p>
            <Button variant="outline" size="sm" className="mt-2" onClick={() => onOpenChange(false)}>
              Regresar a la tienda
            </Button>
          </div>
        ) : (
          <>
            {/* Scroll area needs horizontal padding so items don't touch the edges.
                Added 'pr-6' and 'pl-6' for symmetry.
            */}
            <div className="flex-1 overflow-y-auto px-6 py-2">
              <div className="flex flex-col gap-8"> {/* Increased gap for breathability */}
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

            {/* Footer section with a distinct background or border */}
            <div className="border-t border-border bg-background/50 px-6 py-8">
              <div className="flex items-center justify-between pb-6">
                <span className="text-base font-medium text-muted-foreground">Subtotal</span>
                <span className="text-xl font-bold text-foreground">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <Button className="h-12 w-full gap-3 text-base shadow-sm" size="lg" onClick={() => { onOpenChange(false); navigate("/checkout"); }}>
                Checkout
                <ArrowRight className="h-5 w-5" />
              </Button>

              <p className="pt-4 text-center text-xs text-muted-foreground">
                Podrás verificar el precio final antes de finalizar tu orden
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default CartSheet
