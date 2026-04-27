import { useMemo, useState } from 'react'
import type { Product } from '../types/product'

export function useProductGallery(product: Product) {
  const images = useMemo(
    () => (product.images?.length ? product.images : [product.image]),
    [product.image, product.images]
  )
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const activeImage =
    selectedImage && images.includes(selectedImage) ? selectedImage : images[0]

  return {
    activeImage,
    images,
    setActiveImage: setSelectedImage,
  }
}
