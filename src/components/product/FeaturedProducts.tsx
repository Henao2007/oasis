import type { Product } from '../../types/product'
import { ProductCard } from './ProductCard'

type FeaturedProductsProps = {
  products: Product[]
  onSelectProduct: (product: Product) => void
}

export function FeaturedProducts({
  products,
  onSelectProduct,
}: FeaturedProductsProps) {
  return (
    <section className="panel" id="inicio">
      <h2>Productos destacados</h2>
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
