"use client"

import { useState, useMemo } from "react"
import { ShoppingBag, Plus, Minus, X, Search, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import CustomHeader from "./components/CustomHeader"

// --- Data ---

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  description: string
  badge?: string
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Leather Tote Bag",
    price: 189,
    image: "/images/product-1.jpg",
    category: "Accessories",
    description: "Premium full-grain leather tote with brass hardware. Built to age beautifully.",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Ceramic Pour-Over",
    price: 64,
    image: "/images/product-2.jpg",
    category: "Kitchen",
    description: "Hand-thrown matte black ceramic dripper for the perfect morning ritual.",
  },
  {
    id: 3,
    name: "Walnut Desk Organizer",
    price: 112,
    image: "/images/product-3.jpg",
    category: "Office",
    description: "Solid walnut organizer with divided compartments. Handcrafted in small batches.",
    badge: "New",
  },
  {
    id: 4,
    name: "Linen Throw Blanket",
    price: 95,
    image: "/images/product-4.jpg",
    category: "Home",
    description: "Stonewashed European linen in a warm oatmeal hue. Softens with every wash.",
  },
  {
    id: 5,
    name: "Geometric Candle Holder",
    price: 48,
    image: "/images/product-5.jpg",
    category: "Home",
    description: "Brass and glass candle holder with a modern geometric silhouette.",
  },
  {
    id: 6,
    name: "Stoneware Mug Set",
    price: 72,
    image: "/images/product-6.jpg",
    category: "Kitchen",
    description: "Set of two hand-glazed stoneware mugs in earthy sage green.",
    badge: "Popular",
  },
]

const CATEGORIES = ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))]

// --- Types ---

interface CartItem {
  product: Product
  quantity: number
}

// --- Components ---

function HeroBanner() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <div className="flex flex-col items-start gap-6">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Curated Essentials
        </p>
        <h2 className="max-w-2xl font-serif text-4xl leading-tight tracking-tight text-foreground md:text-6xl md:leading-tight">
          Thoughtfully made for everyday living
        </h2>
        <p className="max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
          A curated collection of handcrafted goods designed to bring warmth, function, and beauty into your daily routine.
        </p>
        <Button size="lg" className="mt-2 gap-2" asChild>
          <a href="#products">
            Browse Collection
            <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </section>
  )
}

function CategoryFilter({
  active,
  onChange,
}: {
  active: string
  onChange: (cat: string) => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            active === cat
              ? "bg-foreground text-background"
              : "bg-secondary text-secondary-foreground hover:bg-border"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}

function ProductCard({
  product,
  onAddToCart,
}: {
  product: Product
  onAddToCart: (product: Product) => void
}) {
  return (
    <div className="group flex flex-col">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {product.badge && (
          <Badge
            variant="secondary"
            className="absolute left-3 top-3 bg-background/90 text-foreground backdrop-blur-sm"
          >
            {product.badge}
          </Badge>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 pt-4">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {product.category}
        </p>
        <h3 className="text-base font-semibold text-foreground">{product.name}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {product.description}
        </p>
      </div>
      <div className="flex items-center justify-between pt-4">
        <p className="text-lg font-semibold text-foreground">${product.price}</p>
        <Button size="sm" onClick={() => onAddToCart(product)}>
          Add to Cart
        </Button>
      </div>
    </div>
  )
}

function ProductGrid({
  products,
  onAddToCart,
}: {
  products: Product[]
  onAddToCart: (product: Product) => void
}) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  )
}

function CartItemRow({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}: {
  item: CartItem
  onIncrement: () => void
  onDecrement: () => void
  onRemove: () => void
}) {
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

function CartSheet({
  open,
  onOpenChange,
  items,
  onIncrement,
  onDecrement,
  onRemove,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: CartItem[]
  onIncrement: (id: number) => void
  onDecrement: (id: number) => void
  onRemove: (id: number) => void
}) {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

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

function Footer() {
  return (
    <footer id="contact" className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-2">
          <h3 className="font-serif text-xl text-foreground">Francofee</h3>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Curated goods for the modern home. Thoughtfully sourced, beautifully made.
          </p>
        </div>
        <div className="flex gap-16">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Shop</p>
            <a href="#products" className="text-sm text-foreground transition-colors hover:text-muted-foreground">All Products</a>
            <a href="#products" className="text-sm text-foreground transition-colors hover:text-muted-foreground">Kitchen</a>
            <a href="#products" className="text-sm text-foreground transition-colors hover:text-muted-foreground">Home</a>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Company</p>
            <a href="#about" className="text-sm text-foreground transition-colors hover:text-muted-foreground">About</a>
            <a href="#contact" className="text-sm text-foreground transition-colors hover:text-muted-foreground">Contact</a>
            <a href="#" className="text-sm text-foreground transition-colors hover:text-muted-foreground">Shipping</a>
          </div>
        </div>
      </div>
      <Separator />
      <div className="mx-auto max-w-7xl px-6 py-6">
        <p className="text-xs text-muted-foreground">
          {'2026 Francofee. All rights reserved.'}
        </p>
      </div>
    </footer>
  )
}

// --- Main Page ---

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory = activeCategory === "All" || p.category === activeCategory
      const matchesSearch =
        searchQuery === "" ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  function addToCart(product: Product) {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
    setCartOpen(true)
  }

  function incrementItem(id: number) {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  function decrementItem(id: number) {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  function removeItem(id: number) {
    setCartItems((prev) => prev.filter((item) => item.product.id !== id))
  }

  return (
    <div className="flex min-h-screen flex-col">

        <CustomHeader />
      

      <main className="flex-1">
        <HeroBanner />

        <section id="products" className="mx-auto max-w-7xl px-6 pb-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Separator className="my-8" />
          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} onAddToCart={addToCart} />
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
              <Search className="h-10 w-10 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">No products found matching your criteria.</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setActiveCategory("All")
                  setSearchQuery("")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </section>

        <section id="about" className="border-t border-border bg-secondary/50">
          <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 py-20 md:flex-row md:items-center md:gap-16">
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Our Story</p>
              <h3 className="mt-3 font-serif text-3xl tracking-tight text-foreground md:text-4xl">
                Made with intention
              </h3>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
                Every item in our collection is chosen for its craftsmanship, sustainability, and the quiet joy it brings to daily life. We partner directly with makers who share our values.
              </p>
            </div>
            <div className="grid flex-1 grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 rounded-lg bg-background p-6">
                <p className="font-serif text-3xl text-foreground">50+</p>
                <p className="text-sm text-muted-foreground">Artisan Partners</p>
              </div>
              <div className="flex flex-col gap-1 rounded-lg bg-background p-6">
                <p className="font-serif text-3xl text-foreground">12</p>
                <p className="text-sm text-muted-foreground">Countries</p>
              </div>
              <div className="flex flex-col gap-1 rounded-lg bg-background p-6">
                <p className="font-serif text-3xl text-foreground">100%</p>
                <p className="text-sm text-muted-foreground">Sustainable</p>
              </div>
              <div className="flex flex-col gap-1 rounded-lg bg-background p-6">
                <p className="font-serif text-3xl text-foreground">5K+</p>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>
            </div>
          </div>
        </section>
      </main>

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
