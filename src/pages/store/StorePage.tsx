import { useEffect, useState } from 'react'
import HeroBanner from '@/pages/store/components/HeroBanner'
import ProductGrid from '@/components/product/ProductGrid'
import InfoSection from './components/InfoSection'
import { getItems } from '@/actions/items/get-items.action'
import type { Product } from '@/types/product.interface'
import { useCart } from '@/context/CartContext'

const StorePage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const { addToCart } = useCart();

  useEffect(() => {
    getItems('').then((items) => {
      setProducts(items.map((item) => ({
        id: item.itemId,
        name: item.name,
        price: item.price,
        image: item.img_src,
        category: item.type,
        description: item.description,
      })))
    })
  }, [])

  return (
    <div>
      <main className="flex-1">
        <HeroBanner />
        <ProductGrid products={products} onAddToCart={addToCart}/>
        <InfoSection />
      </main>
    </div>
  )
}

export default StorePage
