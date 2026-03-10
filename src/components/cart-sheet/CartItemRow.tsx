import type { CartItem } from "@/types/cart.interface"
import { Minus, Plus, X } from "lucide-react"

interface Props {
    item: CartItem,
    onIncrement: () => void,
    onDecrement: () => void,
    onRemove: () => void
}

const CartItemRow = ({item, onIncrement, onDecrement, onRemove} : Props) => {
  return (
    <div className="flex gap-4">
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-secondary">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="object-cover"
          sizes="80px"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">{item.product.name}</p>
            <p className="text-sm text-muted-foreground">${item.product.price}</p>
          </div>
          <button
            onClick={onRemove}
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label={`Remove ${item.product.name}`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onDecrement}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-secondary"
            aria-label="Decrease quantity"
          >
            <Minus className="h-3 w-3" />
          </button>
          <span className="w-6 text-center text-sm font-medium text-foreground">
            {item.quantity}
          </span>
          <button
            onClick={onIncrement}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-secondary"
            aria-label="Increase quantity"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItemRow
