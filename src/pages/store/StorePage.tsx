import HeroBanner from '@/pages/store/components/HeroBanner'
import ProductGrid from '@/components/product/ProductGrid'
import InfoSection from './components/InfoSection'

const StorePage = () => {

  const addToCart = () => {}

  return (
    <div>
      <main className="flex-1">
        <HeroBanner />
        <ProductGrid onAddToCart={addToCart}/>
        <InfoSection />
      </main>
    </div>
  )
}

export default StorePage
