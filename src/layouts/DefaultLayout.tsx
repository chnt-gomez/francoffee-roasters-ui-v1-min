import CartSheet from '@/components/cart-sheet/CartSheet';
import Header from '@/components/header/Header'
import type { CartItem } from '@/types/cart.interface';
import { useState } from 'react'
import { Outlet } from 'react-router'

const StoreLayout = () => {

  const [cartCount, setCartCount] = useState(4);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const incrementItem = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  const decrementItem = (id: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== id))
  }

  return (
    <div className="flex min-h-screen flex-col">
       <Header cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
        <Outlet />
        <CartSheet
        open={cartOpen}
        onOpenChange={setCartOpen}
        items={cartItems}
        onIncrement={incrementItem}
        onDecrement={decrementItem}
        onRemove={removeItem}
      />
    </div>
  )
}

export default StoreLayout
