import type { Product } from '@/types/product.interface'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

interface Props {
    product: Product
    onAddToCart: (product: Product) => void
}

const ProductCard = ({product, onAddToCart} : Props) => {
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

export default ProductCard
