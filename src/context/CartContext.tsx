import React, { createContext, useContext, useState } from 'react'
import type { CartItem } from '@/types/cart.interface'
import type { Product } from '@/types/product.interface'

interface CartContextType {
  cartItems: CartItem[]
  cartCount: number
  addToCart: (product: Product) => void
  incrementItem: (id: string) => void
  decrementItem: (id: string) => void
  removeItem: (id: string) => void
}

const CartContext = createContext<CartContextType | null>(null)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartCount, setCartCount] = useState(0)

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
    setCartCount((prev) => prev + 1)
  }

  const incrementItem = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
    setCartCount((prev) => prev + 1)
  }

  const decrementItem = (id: string) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    )
    setCartCount((prev) => prev - 1)
  }

  const removeItem = (id: string) => {
    setCartItems((prev) => {
      const item = prev.find((i) => i.product.id === id)
      if (item) setCartCount((count) => count - item.quantity)
      return prev.filter((i) => i.product.id !== id)
    })
  }

  return (
    <CartContext.Provider value={{ cartItems, cartCount, addToCart, incrementItem, decrementItem, removeItem }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}
