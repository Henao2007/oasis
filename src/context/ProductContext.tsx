/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  type PropsWithChildren,
} from 'react'
import { mockProducts } from '../data/products'
import { useProducts } from '../hooks/useProducts'

type ProductContextValue = ReturnType<typeof useProducts>

const ProductContext = createContext<ProductContextValue | null>(null)

export function ProductProvider({ children }: PropsWithChildren) {
  const value = useProducts(mockProducts)

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  )
}

export function useProductContext() {
  const context = useContext(ProductContext)

  if (!context) {
    throw new Error('useProductContext must be used within ProductProvider')
  }

  return context
}
