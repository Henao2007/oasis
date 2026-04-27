import { useState } from 'react'
import type { CartItem } from '../types/cart'
import type { Product } from '../types/product'

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (product: Product) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.product.id === product.id)

      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
            : item
        )
      }

      return [...currentItems, { product, quantity: 1 }]
    })
  }

  const removeItem = (productId: number) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId)
    )
  }

  const increaseQuantity = (productId: number) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity: Math.min(item.quantity + 1, item.product.stock),
            }
          : item
      )
    )
  }

  const decreaseQuantity = (productId: number) => {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  const count = items.reduce((sum, item) => sum + item.quantity, 0)

  return {
    addItem,
    clearCart,
    count,
    decreaseQuantity,
    increaseQuantity,
    items,
    removeItem,
    total,
  }
}
