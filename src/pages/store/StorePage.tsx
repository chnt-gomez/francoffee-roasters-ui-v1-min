import HeroBanner from '@/components/hero/HeroBanner'
import ProductGrid from '@/components/product/ProductGrid'
import Footer from './components/Footer'
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
      <Footer />
    </div>
  )
}

export default StorePage
