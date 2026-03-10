import { useMemo, useState } from "react"
import CategoryFilter from "../category-filter/CategoryFilter"
import { Search } from "lucide-react"
import { Input } from "../ui/input"
import { Separator } from "../ui/separator"
import type { Product } from "@/types/product.interface"
import ProductCard from "./ProductCard"
import { Button } from "../ui/button"

interface Props {
    onAddToCart: (product: Product) => void
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

const ProductGrid = ({onAddToCart} : Props) => {

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

  return (
     <section id="products" className="mx-auto max-w-7xl px-6 pb-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <CategoryFilter categories={CATEGORIES} active={activeCategory} onChange={setActiveCategory} />
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
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
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
  )
}

export default ProductGrid
