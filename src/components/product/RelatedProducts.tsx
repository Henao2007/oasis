import type { Product } from '../../types/product'
import { ProductCard } from './ProductCard'

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
    <section className="panel">
      <h2>Productos relacionados</h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={onSelectProduct}
          />
        ))}
      </div>
    </section>
  )
}
