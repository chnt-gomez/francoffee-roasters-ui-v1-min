import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router'

const CheckoutHeader = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            <Link to="/" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Shop</span>
            </Link>
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <h1 className="font-serif text-xl text-foreground">Checkout</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            Secure Checkout
          </div>
        </div>
      </div>
    </header>
  )
}

export default CheckoutHeader
