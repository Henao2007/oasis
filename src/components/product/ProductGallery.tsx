import type { Product } from '../../types/product'
import { useProductGallery } from '../../hooks/useProductGallery'

type ProductGalleryProps = {
  product: Product
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const {
    activeImage,
    activeIndex,
    closePreview,
    images,
    isPreviewOpen,
    openPreview,
    setActiveImage,
    showNextImage,
    showPreviousImage,
  } = useProductGallery(product)

  return (
    <div className="gallery">
      <button
        type="button"
        className="gallery__hero-button"
        onClick={openPreview}
        aria-label={`Ampliar imagen de ${product.name}`}
      >
        <img className="gallery__hero" src={activeImage} alt={product.name} />
      </button>

      <div className="gallery__thumbs">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            className={`gallery__thumb ${activeImage === image ? 'gallery__thumb--active' : ''}`.trim()}
            onClick={() => setActiveImage(image)}
            aria-label={`Ver imagen ${index + 1} de ${product.name}`}
          >
            <img src={image} alt={`${product.name} vista`} />
          </button>
        ))}
      </div>

      {isPreviewOpen ? (
        <div
          className="image-preview"
          role="presentation"
          onClick={closePreview}
        >
          <div
            className="image-preview__dialog image-preview__dialog--gallery"
            role="dialog"
            aria-modal="true"
            aria-label={`Vista ampliada de ${product.name}`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="image-preview__close"
              aria-label="Cerrar imagen"
              onClick={closePreview}
            >
              X
            </button>

            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  className="image-preview__nav image-preview__nav--left"
                  aria-label="Ver imagen anterior"
                  onClick={showPreviousImage}
                >
                  {'<'}
                </button>
                <button
                  type="button"
                  className="image-preview__nav image-preview__nav--right"
                  aria-label="Ver imagen siguiente"
                  onClick={showNextImage}
                >
                  {'>'}
                </button>
              </>
            ) : null}

            <img
              className="image-preview__image"
              src={activeImage}
              alt={product.name}
            />

            {images.length > 1 ? (
              <p className="image-preview__counter">
                Imagen {activeIndex + 1} de {images.length}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}
