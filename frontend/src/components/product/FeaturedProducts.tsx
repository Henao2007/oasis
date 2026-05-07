import type { Product } from '../../types/product'
import { ProductCarousel } from './ProductCarousel'

type FeaturedProductsProps = {
  products: Product[]
  onSelectProduct: (product: Product) => void
}

export function FeaturedProducts({
  products,
  onSelectProduct,
}: FeaturedProductsProps) {
  return (
    <ProductCarousel
      id="inicio"
      products={products}
      title="Productos destacados"
      onSelectProduct={onSelectProduct}
    />
  )
}
