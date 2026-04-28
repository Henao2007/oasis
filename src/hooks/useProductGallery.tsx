import { useEffect, useMemo, useState } from 'react'
import type { Product } from '../types/product'

export function useProductGallery(product: Product) {
  const images = useMemo(
    () => (product.images?.length ? product.images : [product.image]),
    [product.image, product.images]
  )
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const activeImage =
    selectedImage && images.includes(selectedImage) ? selectedImage : images[0]
  const activeIndex = Math.max(images.indexOf(activeImage), 0)

  useEffect(() => {
    setSelectedImage(null)
    setIsPreviewOpen(false)
  }, [product.id])

  const showNextImage = () => {
    const nextIndex = (activeIndex + 1) % images.length

    setSelectedImage(images[nextIndex])
  }

  const showPreviousImage = () => {
    const previousIndex = (activeIndex - 1 + images.length) % images.length

    setSelectedImage(images[previousIndex])
  }

  return {
    activeImage,
    activeIndex,
    images,
    isPreviewOpen,
    openPreview: () => setIsPreviewOpen(true),
    setActiveImage: setSelectedImage,
    closePreview: () => setIsPreviewOpen(false),
    showNextImage,
    showPreviousImage,
  }
}
