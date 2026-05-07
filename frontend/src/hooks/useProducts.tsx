import { useMemo, useState } from 'react'
import { categories } from '../constants/categories'
import type { Product } from '../types/product'
import { filterProducts } from '../utils/filterProducts'

export function useProducts(products: Product[]) {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const visibleProducts = useMemo(() => {
    const categoryFiltered =
      selectedCategory === 'Todas'
        ? products
        : products.filter((product) => product.category === selectedCategory)

    return filterProducts(categoryFiltered, query)
  }, [products, query, selectedCategory])

  const featuredProducts = products
  const relatedProducts = selectedProduct
    ? products.filter(
        (product) =>
          product.id !== selectedProduct.id &&
          product.category === selectedProduct.category
      )
    : []

  return {
    featuredProducts,
    query,
    relatedProducts,
    selectedCategory,
    selectedProduct,
    setQuery,
    setSelectedCategory,
    setSelectedProduct,
    visibleProducts,
  }
}
