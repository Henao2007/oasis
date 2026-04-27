import type { Product } from '../../types/product'
import { useProductGallery } from '../../hooks/useProductGallery'

type ProductGalleryProps = {
  product: Product
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const { activeImage, images, setActiveImage } = useProductGallery(product)

  return (
    <div className="gallery">
      <img className="gallery__hero" src={activeImage} alt={product.name} />

      <div className="gallery__thumbs">
        {images.map((image) => (
          <button
            key={image}
            type="button"
            className={`gallery__thumb ${activeImage === image ? 'gallery__thumb--active' : ''}`.trim()}
            onClick={() => setActiveImage(image)}
          >
            <img src={image} alt={`${product.name} vista`} />
          </button>
        ))}
      </div>
    </div>
  )
}
