import type { Product } from '../types/product'

export function filterProducts(products: Product[], query: string) {
  const normalizedQuery = query.trim().toLowerCase()

  if (!normalizedQuery) {
    return products
  }

  return products.filter((product) => {
    const searchableText = [
      product.name,
      product.category,
      ...(product.keywords ?? []),
    ]
      .join(' ')
      .toLowerCase()

    return searchableText.includes(normalizedQuery)
  })
}
