(function () {
    const app = window.AdminApp;
    const { dom, state, helpers } = app;

    app.renderInputPreview = function renderInputPreview(container, imageSrc, emptyText) {
        container.innerHTML = imageSrc
            ? `<img src="${helpers.escapeHtml(imageSrc)}" alt="Vista previa">`
            : `<span>${emptyText}</span>`;
    };

    app.readFileAsDataUrl = function readFileAsDataUrl(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result || ''));
            reader.onerror = () => reject(new Error('No se pudo leer la imagen'));
            reader.readAsDataURL(file);
        });
    };

    app.resolveImageValue = async function resolveImageValue(input, existingValue) {
        const [file] = input.files || [];
        return file ? app.readFileAsDataUrl(file) : (existingValue || '');
    };

    app.resetProductForm = function resetProductForm() {
        dom.productForm.reset();
        dom.productIdInput.value = '';
        dom.productSubmit.textContent = 'Crear producto';
        dom.productModalTitle.textContent = 'Nuevo producto';
        dom.cancelProductEdit.classList.add('hidden');
        dom.productImage1Input.required = true;
        dom.productImage2Input.required = true;
        dom.productImage3Input.required = true;
        state.editingProductImages = { image1: '', image2: '', image3: '' };
        app.renderInputPreview(dom.previewImage1, '', 'Selecciona la imagen principal');
        app.renderInputPreview(dom.previewImage2, '', 'Selecciona la segunda imagen');
        app.renderInputPreview(dom.previewImage3, '', 'Selecciona la tercera imagen');
    };

    app.openProductModal = function openProductModal(editing) {
        dom.productModal.classList.remove('hidden');
        dom.productModalTitle.textContent = editing ? 'Editar producto' : 'Nuevo producto';
        dom.productSubmit.textContent = editing ? 'Actualizar producto' : 'Crear producto';
        requestAnimationFrame(() => {
            dom.productModal.querySelector('.product-modal__dialog')?.scrollTo({ top: 0, behavior: 'auto' });
        });
    };

    app.closeProductModal = function closeProductModal() {
        dom.productModal.classList.add('hidden');
        app.resetProductForm();
    };

    app.openProductsScreen = function openProductsScreen(categoryId) {
        state.selectedCategoryId = categoryId;
        dom.categoriesScreen.classList.add('hidden');
        dom.productsScreen.classList.remove('hidden');
        app.resetProductForm();
        app.renderProducts();
        if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
        requestAnimationFrame(() => {
            dom.content?.scrollTo({ top: 0, behavior: 'auto' });
            dom.productsScreen.scrollIntoView({ block: 'start', behavior: 'auto' });
        });
    };

    app.renderProducts = function renderProducts() {
        const category = helpers.getSelectedCategory();
        if (!category) return;

        dom.selectedCategoryTitle.textContent = category.name;
        const productNumberMap = helpers.getItemNumberMap(category.products);
        const visibleProducts = helpers.applySearchAndSort(
            category.products,
            dom.productSearchInput.value,
            dom.productSortSelect.value,
            'name',
            'Producto'
        );

        if (!visibleProducts.length) {
            dom.productsList.innerHTML = '';
            dom.productsEmpty.classList.remove('hidden');
            return;
        }

        dom.productsEmpty.classList.add('hidden');
        dom.productsList.innerHTML = visibleProducts.map((product) => `
            <article class="product-card-admin ${product.available === false ? 'product-card-admin--unavailable' : ''}">
                <p class="card-enumerator">Producto ${productNumberMap.get(product.id) || ''}</p>
                <button type="button" class="product-card-admin__status ${product.available === false ? 'product-card-admin__status--unavailable' : 'product-card-admin__status--available'}" data-action="toggle-product-status" data-category-id="${category.id}" data-id="${product.id}">
                    ${product.available === false ? 'No disponible' : 'Disponible'}
                </button>
                <div class="product-card-admin__gallery">
                    <img src="${helpers.escapeHtml(product.image1)}" alt="${helpers.escapeHtml(product.name)} imagen 1" data-action="open-image-viewer" data-category-id="${category.id}" data-id="${product.id}" data-image-index="0">
                    <img src="${helpers.escapeHtml(product.image2)}" alt="${helpers.escapeHtml(product.name)} imagen 2" data-action="open-image-viewer" data-category-id="${category.id}" data-id="${product.id}" data-image-index="1">
                    <img src="${helpers.escapeHtml(product.image3)}" alt="${helpers.escapeHtml(product.name)} imagen 3" data-action="open-image-viewer" data-category-id="${category.id}" data-id="${product.id}" data-image-index="2">
                </div>
                <h4>${helpers.escapeHtml(product.name)}</h4>
                <p class="product-card-admin__price">${helpers.escapeHtml(product.price)}</p>
                <p class="product-card-admin__description">${helpers.escapeHtml(product.description || 'Sin descripcion')}</p>
                <p class="product-card-admin__quantity">Cantidad: ${helpers.escapeHtml(product.quantity)}</p>
                <div class="product-card-admin__actions">
                    <button type="button" class="mini-button" data-action="edit-product" data-category-id="${category.id}" data-id="${product.id}">Editar</button>
                    <button type="button" class="mini-button mini-button--danger" data-action="delete-product" data-category-id="${category.id}" data-id="${product.id}">Eliminar</button>
                </div>
            </article>
        `).join('');
    };

    function bindImagePreview(input, preview, key, emptyText) {
        input.addEventListener('change', async () => {
            const [file] = input.files || [];
            if (!file) {
                app.renderInputPreview(preview, state.editingProductImages[key], emptyText);
                return;
            }
            const imageValue = await app.readFileAsDataUrl(file);
            state.editingProductImages[key] = imageValue;
            app.renderInputPreview(preview, imageValue, emptyText);
        });
    }

    dom.productForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const category = helpers.getSelectedCategory();
        if (!category) return;

        const payload = {
            id: dom.productIdInput.value || helpers.createId(),
            name: dom.productNameInput.value.trim(),
            price: helpers.formatPriceInput(dom.productPriceInput.value),
            quantity: dom.productQuantityInput.value.trim(),
            image1: await app.resolveImageValue(dom.productImage1Input, state.editingProductImages.image1),
            image2: await app.resolveImageValue(dom.productImage2Input, state.editingProductImages.image2),
            image3: await app.resolveImageValue(dom.productImage3Input, state.editingProductImages.image3),
            description: dom.productDescriptionInput.value.trim()
        };

        if (!payload.name || !payload.price || !payload.quantity || !payload.image1 || !payload.image2 || !payload.image3) return;

        state.categories = state.categories.map((item) => {
            if (item.id !== category.id) return item;
            if (dom.productIdInput.value) {
                return { ...item, products: item.products.map((product) => product.id === payload.id ? { ...product, ...payload } : product) };
            }
            return { ...item, products: [{ ...payload, createdAt: Date.now(), available: true }, ...item.products] };
        });

        helpers.saveCategories();
        app.closeProductModal();
        app.renderProducts();
    });

    dom.productsList.addEventListener('click', (event) => {
        const target = event.target.closest('[data-action]');
        if (!target) return;
        const category = state.categories.find((item) => item.id === target.dataset.categoryId);
        if (!category) return;
        const product = category.products.find((item) => item.id === target.dataset.id);
        if (!product) return;

        if (target.dataset.action === 'edit-product') {
            dom.productIdInput.value = product.id;
            dom.productNameInput.value = product.name;
            dom.productPriceInput.value = product.price;
            dom.productQuantityInput.value = product.quantity || '';
            dom.productDescriptionInput.value = product.description || '';
            dom.productImage1Input.required = false;
            dom.productImage2Input.required = false;
            dom.productImage3Input.required = false;
            state.editingProductImages = { image1: product.image1 || '', image2: product.image2 || '', image3: product.image3 || '' };
            app.renderInputPreview(dom.previewImage1, state.editingProductImages.image1, 'Selecciona la imagen principal');
            app.renderInputPreview(dom.previewImage2, state.editingProductImages.image2, 'Selecciona la segunda imagen');
            app.renderInputPreview(dom.previewImage3, state.editingProductImages.image3, 'Selecciona la tercera imagen');
            dom.cancelProductEdit.classList.remove('hidden');
            app.openProductModal(true);
            return;
        }

        if (target.dataset.action === 'toggle-product-status') {
            state.categories = state.categories.map((item) => item.id === category.id
                ? { ...item, products: item.products.map((productItem) => productItem.id === product.id ? { ...productItem, available: productItem.available === false } : productItem) }
                : item);
            helpers.saveCategories();
            app.renderProducts();
            return;
        }

        if (target.dataset.action === 'delete-product' && window.confirm(`Eliminar el producto "${product.name}"?`)) {
            state.categories = state.categories.map((item) => item.id === category.id
                ? { ...item, products: item.products.filter((productItem) => productItem.id !== product.id) }
                : item);
            helpers.saveCategories();
            app.renderProducts();
            return;
        }

        if (target.dataset.action === 'open-image-viewer') {
            app.openImageViewer([product.image1, product.image2, product.image3], Number(target.dataset.imageIndex || 0));
        }
    });

    dom.backToCategories.addEventListener('click', () => {
        state.selectedCategoryId = null;
        dom.productsScreen.classList.add('hidden');
        dom.categoriesScreen.classList.remove('hidden');
        app.closeProductModal();
        app.renderCategories();
        if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
        requestAnimationFrame(() => {
            dom.content?.scrollTo({ top: 0, behavior: 'auto' });
            dom.categoriesScreen.scrollIntoView({ block: 'start', behavior: 'auto' });
        });
    });

    dom.openProductModalButton.addEventListener('click', () => {
        app.resetProductForm();
        app.openProductModal(false);
    });
    dom.closeProductModalButton.addEventListener('click', app.closeProductModal);
    dom.productModalBackdrop.addEventListener('click', app.closeProductModal);
    dom.cancelProductEdit.addEventListener('click', app.closeProductModal);
    dom.productSearchInput.addEventListener('input', app.renderProducts);
    dom.productSortSelect.addEventListener('change', app.renderProducts);
    dom.productPriceInput.addEventListener('input', () => {
        dom.productPriceInput.value = helpers.formatPriceInput(dom.productPriceInput.value);
    });

    bindImagePreview(dom.productImage1Input, dom.previewImage1, 'image1', 'Selecciona la imagen principal');
    bindImagePreview(dom.productImage2Input, dom.previewImage2, 'image2', 'Selecciona la segunda imagen');
    bindImagePreview(dom.productImage3Input, dom.previewImage3, 'image3', 'Selecciona la tercera imagen');
    app.resetProductForm();
})();
