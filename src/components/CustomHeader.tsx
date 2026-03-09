import { useState } from 'react'
import { Button } from './ui/button';
import { ShoppingBag } from 'lucide-react';



export const CustomHeader = () => {

    const [cartCount, setCartCount] = useState(0);
    const onCartOpen = () => {}


  return (
    <div>
        <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="font-serif text-2xl tracking-tight text-foreground">
          Francofee
        </h1>
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#products" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Shop
          </a>
          <a href="#about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            About
          </a>
          <a href="#contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Contact
          </a>
        </nav>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={onCartOpen}
          aria-label="Open shopping cart"
        >
          <ShoppingBag className="h-5 w-5" />
          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background">
              {cartCount}
            </span>
          )}
        </Button>
      </div>
    </header>
      
    </div>
  )
}

export default CustomHeader
