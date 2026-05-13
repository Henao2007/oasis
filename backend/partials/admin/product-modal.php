<div class="product-modal hidden" id="productModal">
    <div class="product-modal__backdrop" id="productModalBackdrop"></div>
    <div class="product-modal__dialog">
        <div class="product-modal__header">
            <h3 id="productModalTitle">Nuevo producto</h3>
            <button type="button" class="product-modal__close" id="closeProductModal" aria-label="Cerrar modal">X</button>
        </div>

        <form id="productForm" class="admin-form admin-form--products">
            <input type="hidden" id="productId">
            <label class="form-field">
                <span>Nombre del producto</span>
                <input type="text" id="productName" placeholder="Ejemplo: Bolso clasico" required>
            </label>
            <label class="form-field">
                <span>Precio</span>
                <input type="text" id="productPrice" placeholder="$ 120.000" required>
            </label>
            <label class="form-field">
                <span>Cantidad</span>
                <input type="number" id="productQuantity" placeholder="10" min="0" required>
            </label>
            <label class="form-field">
                <span>Imagen 1</span>
                <input type="file" id="productImage1" accept="image/*" required>
                <div class="image-preview-input" id="previewImage1"></div>
            </label>
            <label class="form-field">
                <span>Imagen 2</span>
                <input type="file" id="productImage2" accept="image/*" required>
                <div class="image-preview-input" id="previewImage2"></div>
            </label>
            <label class="form-field">
                <span>Imagen 3</span>
                <input type="file" id="productImage3" accept="image/*" required>
                <div class="image-preview-input" id="previewImage3"></div>
            </label>
            <label class="form-field form-field--full">
                <span>Descripcion</span>
                <textarea id="productDescription" rows="3" placeholder="Describe el producto"></textarea>
            </label>
            <div class="form-actions form-actions--full">
                <button type="submit" class="action-button action-button--primary" id="productSubmit">Crear producto</button>
                <button type="button" class="action-button action-button--ghost hidden" id="cancelProductEdit">Cancelar edicion</button>
            </div>
        </form>
    </div>
</div>
