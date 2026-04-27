import { useEffect, useState } from 'react'
import type { Product } from '../types/product'

export function useProductGallery(product: Product) {
  const images = product.images?.length ? product.images : [product.image]
  const [activeImage, setActiveImage] = useState(images[0])

  useEffect(() => {
    setActiveImage(images[0])
  }, [product.id, images])

  return {
    activeImage,
    images,
    setActiveImage,
  }
}
