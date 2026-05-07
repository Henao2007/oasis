import type { Product } from '../../types/product'
import { ProductCarousel } from './ProductCarousel'

type RelatedProductsProps = {
  products: Product[]
  onSelectProduct: (product: Product) => void
}

export function RelatedProducts({
  products,
  onSelectProduct,
}: RelatedProductsProps) {
  if (products.length === 0) {
    return null
  }

  return (
    <ProductCarousel
      products={products}
      title="Productos relacionados"
      onSelectProduct={onSelectProduct}
    />
  )
}
