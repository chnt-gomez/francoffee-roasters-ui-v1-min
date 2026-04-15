import CartSheet from '@/components/cart-sheet/CartSheet';
import Header from '@/components/header/Header'
import Footer from '@/pages/store/components/Footer';
import { useState } from 'react'
import { Outlet } from 'react-router'
import { useCart } from '@/context/CartContext';

const DefaultLayout = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const { cartItems, cartCount, incrementItem, decrementItem, removeItem } = useCart();

  return (
    <div className="flex min-h-screen flex-col">
      <Header cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      <Outlet />
      <Footer />
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

export default DefaultLayout
