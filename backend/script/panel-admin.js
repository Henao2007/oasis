const buttons = document.querySelectorAll('.nav-button');
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.querySelector('.sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const viewTitle = document.getElementById('viewTitle');
const defaultView = document.getElementById('defaultView');
const categoriesView = document.getElementById('categoriesView');
const categoriesScreen = document.getElementById('categoriesScreen');
const productsScreen = document.getElementById('productsScreen');

const categoryForm = document.getElementById('categoryForm');
const categoryIdInput = document.getElementById('categoryId');
const categoryNameInput = document.getElementById('categoryName');
const categorySubmit = document.getElementById('categorySubmit');
const cancelCategoryEdit = document.getElementById('cancelCategoryEdit');
const categoriesList = document.getElementById('categoriesList');
const categoriesEmpty = document.getElementById('categoriesEmpty');
const categorySearchInput = document.getElementById('categorySearch');
const categorySortSelect = document.getElementById('categorySort');

const selectedCategoryTitle = document.getElementById('selectedCategoryTitle');
const backToCategories = document.getElementById('backToCategories');
const openProductModalButton = document.getElementById('openProductModal');
const productModal = document.getElementById('productModal');
const productModalBackdrop = document.getElementById('productModalBackdrop');
const closeProductModalButton = document.getElementById('closeProductModal');
const productModalTitle = document.getElementById('productModalTitle');
const productForm = document.getElementById('productForm');
const productIdInput = document.getElementById('productId');
const productNameInput = document.getElementById('productName');
const productPriceInput = document.getElementById('productPrice');
const productQuantityInput = document.getElementById('productQuantity');
const productImage1Input = document.getElementById('productImage1');
const productImage2Input = document.getElementById('productImage2');
const productImage3Input = document.getElementById('productImage3');
const previewImage1 = document.getElementById('previewImage1');
const previewImage2 = document.getElementById('previewImage2');
const previewImage3 = document.getElementById('previewImage3');
const productDescriptionInput = document.getElementById('productDescription');
const productSubmit = document.getElementById('productSubmit');
const cancelProductEdit = document.getElementById('cancelProductEdit');
const productsList = document.getElementById('productsList');
const productsEmpty = document.getElementById('productsEmpty');
const productSearchInput = document.getElementById('productSearch');
const productSortSelect = document.getElementById('productSort');
const imageViewer = document.getElementById('imageViewer');
const imageViewerBackdrop = document.getElementById('imageViewerBackdrop');
const closeImageViewerButton = document.getElementById('closeImageViewer');
const viewerPrevButton = document.getElementById('viewerPrev');
const viewerNextButton = document.getElementById('viewerNext');
const viewerImage = document.getElementById('viewerImage');

const storageKey = 'oasis_admin_categories';

let categories = loadCategories();
let selectedCategoryId = null;
let editingProductImages = {
    image1: '',
    image2: '',
    image3: ''
};
let activeViewerImages = [];
let activeViewerIndex = 0;

function openSidebar() {
    sidebar.classList.add('sidebar--open');
    sidebarOverlay.classList.remove('hidden');
}

function closeSidebar() {
    sidebar.classList.remove('sidebar--open');
    sidebarOverlay.classList.add('hidden');
}

function handleSidebarByViewport() {
    if (window.innerWidth >= 960) {
        sidebarOverlay.classList.add('hidden');
        sidebar.classList.remove('sidebar--open');
    }
}

function loadCategories() {
    const saved = localStorage.getItem(storageKey);

    if (!saved) {
        return [];
    }

    try {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        return [];
    }
}

function saveCategories() {
    localStorage.setItem(storageKey, JSON.stringify(categories));
}

function createId() {
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getItemTimestamp(item) {
    if (item.createdAt) {
        return item.createdAt;
    }

    const fromId = String(item.id || '').split('-')[0];
    const numeric = Number(fromId);

    return Number.isFinite(numeric) ? numeric : 0;
}

function applySearchAndSort(items, searchValue, sortValue, field) {
    const normalizedSearch = String(searchValue || '').trim().toLowerCase();

    const filtered = items.filter((item) => {
        if (!normalizedSearch) {
            return true;
        }

        return String(item[field] || '').toLowerCase().includes(normalizedSearch);
    });

    return filtered.sort((first, second) => {
        const firstTime = getItemTimestamp(first);
        const secondTime = getItemTimestamp(second);

        return sortValue === 'oldest' ? firstTime - secondTime : secondTime - firstTime;
    });
}

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };

        return map[char];
    });
}

function formatPriceInput(value) {
    const digits = String(value).replace(/\D/g, '');

    if (!digits) {
        return '';
    }

    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function resetCategoryForm() {
    categoryForm.reset();
    categoryIdInput.value = '';
    categorySubmit.textContent = 'Guardar categoria';
    cancelCategoryEdit.classList.add('hidden');
}

function resetProductForm() {
    productForm.reset();
    productIdInput.value = '';
    productSubmit.textContent = 'Crear producto';
    productModalTitle.textContent = 'Nuevo producto';
    cancelProductEdit.classList.add('hidden');
    editingProductImages = {
        image1: '',
        image2: '',
        image3: ''
    };
    renderInputPreview(previewImage1, '', 'Selecciona la imagen principal');
    renderInputPreview(previewImage2, '', 'Selecciona la segunda imagen');
    renderInputPreview(previewImage3, '', 'Selecciona la tercera imagen');
}

function openProductModal(editing = false) {
    productModal.classList.remove('hidden');
    productModalTitle.textContent = editing ? 'Editar producto' : 'Nuevo producto';
    productSubmit.textContent = editing ? 'Actualizar producto' : 'Crear producto';
}

function closeProductModal() {
    productModal.classList.add('hidden');
    resetProductForm();
}

function updateImageViewer() {
    if (!activeViewerImages.length) {
        return;
    }

    viewerImage.src = activeViewerImages[activeViewerIndex];
}

function openImageViewer(images, startIndex = 0) {
    activeViewerImages = images.filter(Boolean);
    activeViewerIndex = startIndex;

    if (!activeViewerImages.length) {
        return;
    }

    updateImageViewer();
    imageViewer.classList.remove('hidden');
}

function closeImageViewer() {
    imageViewer.classList.add('hidden');
    activeViewerImages = [];
    activeViewerIndex = 0;
    viewerImage.src = '';
}

function showPreviousImage() {
    if (!activeViewerImages.length) {
        return;
    }

    activeViewerIndex = (activeViewerIndex - 1 + activeViewerImages.length) % activeViewerImages.length;
    updateImageViewer();
}

function showNextImage() {
    if (!activeViewerImages.length) {
        return;
    }

    activeViewerIndex = (activeViewerIndex + 1) % activeViewerImages.length;
    updateImageViewer();
}

function renderInputPreview(container, imageSrc, emptyText) {
    if (!container) {
        return;
    }

    if (!imageSrc) {
        container.innerHTML = `<span>${emptyText}</span>`;
        return;
    }

    container.innerHTML = `<img src="${escapeHtml(imageSrc)}" alt="Vista previa">`;
}

function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => resolve(String(reader.result || ''));
        reader.onerror = () => reject(new Error('No se pudo leer la imagen'));
        reader.readAsDataURL(file);
    });
}

async function resolveImageValue(input, existingValue) {
    const [file] = input.files || [];

    if (file) {
        return readFileAsDataUrl(file);
    }

    return existingValue || '';
}

function getSelectedCategory() {
    return categories.find((category) => category.id === selectedCategoryId) || null;
}

function renderCategories() {
    if (!categoriesList) {
        return;
    }

    const visibleCategories = applySearchAndSort(
        categories,
        categorySearchInput.value,
        categorySortSelect.value,
        'name'
    );

    if (!visibleCategories.length) {
        categoriesList.innerHTML = '';
        categoriesEmpty.classList.remove('hidden');
        return;
    }

    categoriesEmpty.classList.add('hidden');

    categoriesList.innerHTML = visibleCategories.map((category) => `
        <article class="folder-card ${category.available === false ? 'folder-card--unavailable' : ''}">
            <button
                type="button"
                class="category-status ${category.available === false ? 'category-status--unavailable' : 'category-status--available'}"
                data-action="toggle-category-status"
                data-id="${category.id}"
            >
                ${category.available === false ? 'No disponible' : 'Disponible'}
            </button>
            <div class="folder-card__top">
                <span class="folder-card__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                        <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H10l2 2h6.5A2.5 2.5 0 0 1 21 9.5v7a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 16.5v-9Z" fill="currentColor" opacity=".24"/>
                        <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H10l2 2h6.5A2.5 2.5 0 0 1 21 9.5v7a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 16.5v-9Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
                    </svg>
                </span>
                <div>
                    <p class="folder-card__name">${escapeHtml(category.name)}</p>
                    <p class="folder-card__meta">${category.products.length} producto(s)</p>
                </div>
            </div>
            <div class="folder-card__actions">
                <button type="button" class="folder-link" data-action="open-category" data-id="${category.id}">Abrir carpeta</button>
                <button type="button" class="mini-button" data-action="edit-category" data-id="${category.id}">Editar</button>
                <button type="button" class="mini-button mini-button--danger" data-action="delete-category" data-id="${category.id}">Eliminar</button>
            </div>
        </article>
    `).join('');

    const selectedCategory = getSelectedCategory();

    if (selectedCategory) {
        renderProducts();
    }
}

function renderProducts() {
    const selectedCategory = getSelectedCategory();

    if (!selectedCategory) {
        return;
    }

    selectedCategoryTitle.textContent = selectedCategory.name;

    const visibleProducts = applySearchAndSort(
        selectedCategory.products,
        productSearchInput.value,
        productSortSelect.value,
        'name'
    );

    if (!visibleProducts.length) {
        productsList.innerHTML = '';
        productsEmpty.classList.remove('hidden');
        return;
    }

    productsEmpty.classList.add('hidden');

    productsList.innerHTML = visibleProducts.map((product) => `
        <article class="product-card-admin ${product.available === false ? 'product-card-admin--unavailable' : ''}">
            <button
                type="button"
                class="product-card-admin__status ${product.available === false ? 'product-card-admin__status--unavailable' : 'product-card-admin__status--available'}"
                data-action="toggle-product-status"
                data-category-id="${selectedCategory.id}"
                data-id="${product.id}"
            >
                ${product.available === false ? 'No disponible' : 'Disponible'}
            </button>
            <div class="product-card-admin__gallery">
                <img src="${escapeHtml(product.image1)}" alt="${escapeHtml(product.name)} imagen 1" data-action="open-image-viewer" data-category-id="${selectedCategory.id}" data-id="${product.id}" data-image-index="0">
                <img src="${escapeHtml(product.image2)}" alt="${escapeHtml(product.name)} imagen 2" data-action="open-image-viewer" data-category-id="${selectedCategory.id}" data-id="${product.id}" data-image-index="1">
                <img src="${escapeHtml(product.image3)}" alt="${escapeHtml(product.name)} imagen 3" data-action="open-image-viewer" data-category-id="${selectedCategory.id}" data-id="${product.id}" data-image-index="2">
            </div>
            <h4>${escapeHtml(product.name)}</h4>
            <p class="product-card-admin__price">${escapeHtml(product.price)}</p>
            <p class="product-card-admin__description">${escapeHtml(product.description || 'Sin descripcion')}</p>
            <p class="product-card-admin__quantity">Cantidad: ${escapeHtml(product.quantity)}</p>
            <div class="product-card-admin__actions">
                <button type="button" class="mini-button" data-action="edit-product" data-category-id="${selectedCategory.id}" data-id="${product.id}">Editar</button>
                <button type="button" class="mini-button mini-button--danger" data-action="delete-product" data-category-id="${selectedCategory.id}" data-id="${product.id}">Eliminar</button>
            </div>
        </article>
    `).join('');
}

function bindImagePreview(input, container, key, emptyText) {
    input.addEventListener('change', async () => {
        const [file] = input.files || [];

        if (!file) {
            renderInputPreview(container, editingProductImages[key], emptyText);
            return;
        }

        const imageValue = await readFileAsDataUrl(file);
        editingProductImages[key] = imageValue;
        renderInputPreview(container, imageValue, emptyText);
    });
}

function showDefaultView(title) {
    defaultView.classList.remove('hidden');
    categoriesView.classList.add('hidden');
    viewTitle.textContent = title;
}

function showCategoriesView() {
    defaultView.classList.add('hidden');
    categoriesView.classList.remove('hidden');
    categoriesScreen.classList.remove('hidden');
    productsScreen.classList.add('hidden');
    renderCategories();
}

function openProductsScreen(categoryId) {
    selectedCategoryId = categoryId;
    categoriesScreen.classList.add('hidden');
    productsScreen.classList.remove('hidden');
    resetProductForm();
    renderProducts();
}

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        buttons.forEach((item) => item.classList.remove('active'));
        button.classList.add('active');
        if (window.innerWidth < 960) {
            closeSidebar();
        }

        if (button.dataset.title === 'Categorias') {
            showCategoriesView();
            return;
        }

        showDefaultView(button.dataset.title);
    });
});

categoryForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = categoryNameInput.value.trim();

    if (!name) {
        return;
    }

    const categoryId = categoryIdInput.value;

    if (categoryId) {
        categories = categories.map((category) => (
            category.id === categoryId
                ? { ...category, name }
                : category
        ));
    } else {
        categories.unshift({
            id: createId(),
            name,
            createdAt: Date.now(),
            available: true,
            products: []
        });
    }

    saveCategories();
    resetCategoryForm();
    renderCategories();
});

cancelCategoryEdit.addEventListener('click', () => {
    resetCategoryForm();
});

categoriesList.addEventListener('click', (event) => {
    const actionTarget = event.target.closest('[data-action]');

    if (!actionTarget) {
        return;
    }

    const { action, id } = actionTarget.dataset;
    const category = categories.find((item) => item.id === id);

    if (!category) {
        return;
    }

    if (action === 'open-category') {
        openProductsScreen(id);
        return;
    }

    if (action === 'toggle-category-status') {
        categories = categories.map((item) => (
            item.id === id
                ? { ...item, available: item.available === false }
                : item
        ));

        saveCategories();
        renderCategories();
        return;
    }

    if (action === 'edit-category') {
        categoryIdInput.value = category.id;
        categoryNameInput.value = category.name;
        categorySubmit.textContent = 'Actualizar categoria';
        cancelCategoryEdit.classList.remove('hidden');
        categoryNameInput.focus();
        return;
    }

    if (action === 'delete-category') {
        const confirmed = window.confirm(`Eliminar la categoria "${category.name}"?`);

        if (!confirmed) {
            return;
        }

        categories = categories.filter((item) => item.id !== id);

        if (selectedCategoryId === id) {
            selectedCategoryId = null;
            resetProductForm();
        }

        saveCategories();
        renderCategories();
    }
});

productForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const selectedCategory = getSelectedCategory();

    if (!selectedCategory) {
        return;
    }

    const name = productNameInput.value.trim();
    const price = formatPriceInput(productPriceInput.value);
    const quantity = productQuantityInput.value.trim();
    const image1 = await resolveImageValue(productImage1Input, editingProductImages.image1);
    const image2 = await resolveImageValue(productImage2Input, editingProductImages.image2);
    const image3 = await resolveImageValue(productImage3Input, editingProductImages.image3);
    const description = productDescriptionInput.value.trim();

    if (!name || !price || !quantity || !image1 || !image2 || !image3) {
        return;
    }

    const productId = productIdInput.value;

    categories = categories.map((category) => {
        if (category.id !== selectedCategory.id) {
            return category;
        }

        if (productId) {
            return {
                ...category,
                products: category.products.map((product) => (
                    product.id === productId
                        ? { ...product, name, price, quantity, image1, image2, image3, description }
                        : product
                ))
            };
        }

        return {
            ...category,
            products: [
                {
                    id: createId(),
                    name,
                    price,
                    quantity,
                    image1,
                    image2,
                    image3,
                    description,
                    createdAt: Date.now(),
                    available: true
                },
                ...category.products
            ]
        };
    });

    saveCategories();
    closeProductModal();
    renderProducts();
});

cancelProductEdit.addEventListener('click', () => {
    resetProductForm();
});

productsList.addEventListener('click', (event) => {
    const actionTarget = event.target.closest('[data-action]');

    if (!actionTarget) {
        return;
    }

    const { action, id, categoryId } = actionTarget.dataset;
    const category = categories.find((item) => item.id === categoryId);

    if (!category) {
        return;
    }

    const product = category.products.find((item) => item.id === id);

    if (!product) {
        return;
    }

    if (action === 'edit-product') {
        productIdInput.value = product.id;
        productNameInput.value = product.name;
        productPriceInput.value = product.price;
        productQuantityInput.value = product.quantity || '';
        editingProductImages = {
            image1: product.image1 || '',
            image2: product.image2 || '',
            image3: product.image3 || ''
        };
        renderInputPreview(previewImage1, editingProductImages.image1, 'Selecciona la imagen principal');
        renderInputPreview(previewImage2, editingProductImages.image2, 'Selecciona la segunda imagen');
        renderInputPreview(previewImage3, editingProductImages.image3, 'Selecciona la tercera imagen');
        productDescriptionInput.value = product.description || '';
        cancelProductEdit.classList.remove('hidden');
        openProductModal(true);
        productNameInput.focus();
        return;
    }

    if (action === 'open-image-viewer') {
        openImageViewer(
            [product.image1, product.image2, product.image3],
            Number(actionTarget.dataset.imageIndex || 0)
        );
        return;
    }

    if (action === 'toggle-product-status') {
        categories = categories.map((item) => (
            item.id === categoryId
                ? {
                    ...item,
                    products: item.products.map((productItem) => (
                        productItem.id === id
                            ? { ...productItem, available: productItem.available === false }
                            : productItem
                    ))
                }
                : item
        ));

        saveCategories();
        renderProducts();
        return;
    }

    if (action === 'delete-product') {
        const confirmed = window.confirm(`Eliminar el producto "${product.name}"?`);

        if (!confirmed) {
            return;
        }

        categories = categories.map((item) => (
            item.id === categoryId
                ? { ...item, products: item.products.filter((productItem) => productItem.id !== id) }
                : item
        ));

        saveCategories();
        renderProducts();
    }
});

backToCategories.addEventListener('click', () => {
    selectedCategoryId = null;
    productsScreen.classList.add('hidden');
    categoriesScreen.classList.remove('hidden');
    closeProductModal();
    renderCategories();
});

openProductModalButton.addEventListener('click', () => {
    resetProductForm();
    openProductModal(false);
});

closeProductModalButton.addEventListener('click', () => {
    closeProductModal();
});

productModalBackdrop.addEventListener('click', () => {
    closeProductModal();
});
imageViewerBackdrop.addEventListener('click', () => {
    closeImageViewer();
});
closeImageViewerButton.addEventListener('click', () => {
    closeImageViewer();
});
viewerPrevButton.addEventListener('click', () => {
    showPreviousImage();
});
viewerNextButton.addEventListener('click', () => {
    showNextImage();
});

menuToggle.addEventListener('click', () => {
    if (sidebar.classList.contains('sidebar--open')) {
        closeSidebar();
        return;
    }

    openSidebar();
});

sidebarOverlay.addEventListener('click', () => {
    closeSidebar();
});

window.addEventListener('resize', handleSidebarByViewport);
window.addEventListener('keydown', (event) => {
    if (imageViewer.classList.contains('hidden')) {
        return;
    }

    if (event.key === 'Escape') {
        closeImageViewer();
    }

    if (event.key === 'ArrowLeft') {
        showPreviousImage();
    }

    if (event.key === 'ArrowRight') {
        showNextImage();
    }
});

bindImagePreview(productImage1Input, previewImage1, 'image1', 'Selecciona la imagen principal');
bindImagePreview(productImage2Input, previewImage2, 'image2', 'Selecciona la segunda imagen');
bindImagePreview(productImage3Input, previewImage3, 'image3', 'Selecciona la tercera imagen');
productPriceInput.addEventListener('input', () => {
    productPriceInput.value = formatPriceInput(productPriceInput.value);
});
categorySearchInput.addEventListener('input', renderCategories);
categorySortSelect.addEventListener('change', renderCategories);
productSearchInput.addEventListener('input', renderProducts);
productSortSelect.addEventListener('change', renderProducts);
handleSidebarByViewport();
resetProductForm();
