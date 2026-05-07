import type { PropsWithChildren } from 'react'
import { CartProvider } from '../../context/CartContext'
import { ProductProvider } from '../../context/ProductContext'

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ProductProvider>
      <CartProvider>{children}</CartProvider>
    </ProductProvider>
  )
}
