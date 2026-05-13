(function () {
    const app = window.AdminApp = window.AdminApp || {};

    app.state = {
        categories: [],
        selectedCategoryId: null,
        editingProductImages: { image1: '', image2: '', image3: '' },
        activeViewerImages: [],
        activeViewerIndex: 0,
        storageKey: 'oasis_admin_categories'
    };

    app.dom = {
        content: document.querySelector('.content'),
        buttons: document.querySelectorAll('.nav-button'),
        menuToggle: document.getElementById('menuToggle'),
        sidebar: document.querySelector('.sidebar'),
        sidebarOverlay: document.getElementById('sidebarOverlay'),
        viewTitle: document.getElementById('viewTitle'),
        defaultView: document.getElementById('defaultView'),
        categoriesView: document.getElementById('categoriesView'),
        categoriesScreen: document.getElementById('categoriesScreen'),
        productsScreen: document.getElementById('productsScreen'),
        categoryForm: document.getElementById('categoryForm'),
        categoryIdInput: document.getElementById('categoryId'),
        categoryNameInput: document.getElementById('categoryName'),
        categorySubmit: document.getElementById('categorySubmit'),
        cancelCategoryEdit: document.getElementById('cancelCategoryEdit'),
        categoriesList: document.getElementById('categoriesList'),
        categoriesEmpty: document.getElementById('categoriesEmpty'),
        categorySearchInput: document.getElementById('categorySearch'),
        categorySortSelect: document.getElementById('categorySort'),
        selectedCategoryTitle: document.getElementById('selectedCategoryTitle'),
        backToCategories: document.getElementById('backToCategories'),
        openProductModalButton: document.getElementById('openProductModal'),
        productModal: document.getElementById('productModal'),
        productModalBackdrop: document.getElementById('productModalBackdrop'),
        closeProductModalButton: document.getElementById('closeProductModal'),
        productModalTitle: document.getElementById('productModalTitle'),
        productForm: document.getElementById('productForm'),
        productIdInput: document.getElementById('productId'),
        productNameInput: document.getElementById('productName'),
        productPriceInput: document.getElementById('productPrice'),
        productQuantityInput: document.getElementById('productQuantity'),
        productImage1Input: document.getElementById('productImage1'),
        productImage2Input: document.getElementById('productImage2'),
        productImage3Input: document.getElementById('productImage3'),
        previewImage1: document.getElementById('previewImage1'),
        previewImage2: document.getElementById('previewImage2'),
        previewImage3: document.getElementById('previewImage3'),
        productDescriptionInput: document.getElementById('productDescription'),
        productSubmit: document.getElementById('productSubmit'),
        cancelProductEdit: document.getElementById('cancelProductEdit'),
        productsList: document.getElementById('productsList'),
        productsEmpty: document.getElementById('productsEmpty'),
        productSearchInput: document.getElementById('productSearch'),
        productSortSelect: document.getElementById('productSort'),
        imageViewer: document.getElementById('imageViewer'),
        imageViewerBackdrop: document.getElementById('imageViewerBackdrop'),
        closeImageViewerButton: document.getElementById('closeImageViewer'),
        viewerPrevButton: document.getElementById('viewerPrev'),
        viewerNextButton: document.getElementById('viewerNext'),
        viewerImage: document.getElementById('viewerImage')
    };

    app.helpers = {
        loadCategories() {
            const saved = localStorage.getItem(app.state.storageKey);
            if (!saved) return [];
            try { return Array.isArray(JSON.parse(saved)) ? JSON.parse(saved) : []; } catch { return []; }
        },
        saveCategories() {
            localStorage.setItem(app.state.storageKey, JSON.stringify(app.state.categories));
        },
        createId() {
            return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
        },
        getItemTimestamp(item) {
            if (item.createdAt) return item.createdAt;
            const numeric = Number(String(item.id || '').split('-')[0]);
            return Number.isFinite(numeric) ? numeric : 0;
        },
        getItemNumberMap(items) {
            return new Map(
                [...items]
                    .sort((a, b) => app.helpers.getItemTimestamp(a) - app.helpers.getItemTimestamp(b))
                    .map((item, index) => [item.id, index + 1])
            );
        },
        applySearchAndSort(items, searchValue, sortValue, field, labelPrefix = '') {
            const query = String(searchValue || '').trim().toLowerCase();
            const itemNumberMap = app.helpers.getItemNumberMap(items);
            const sortedItems = [...items].sort((a, b) => sortValue === 'oldest'
                ? app.helpers.getItemTimestamp(a) - app.helpers.getItemTimestamp(b)
                : app.helpers.getItemTimestamp(b) - app.helpers.getItemTimestamp(a));

            return sortedItems.filter((item) => {
                if (!query) return true;
                const itemName = String(item[field] || '').toLowerCase();
                const itemNumber = String(itemNumberMap.get(item.id) || '');
                const itemLabel = labelPrefix ? `${labelPrefix} ${itemNumber}`.toLowerCase() : itemNumber;
                return itemName.includes(query) || itemNumber === query || itemLabel.includes(query);
            });
        },
        escapeHtml(value) {
            return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
        },
        formatPriceInput(value) {
            const digits = String(value).replace(/\D/g, '');
            return digits ? digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.') : '';
        },
        getSelectedCategory() {
            return app.state.categories.find((category) => category.id === app.state.selectedCategoryId) || null;
        },
        openSidebar() {
            app.dom.sidebar.classList.add('sidebar--open');
            app.dom.sidebarOverlay.classList.remove('hidden');
        },
        closeSidebar() {
            app.dom.sidebar.classList.remove('sidebar--open');
            app.dom.sidebarOverlay.classList.add('hidden');
        },
        handleSidebarByViewport() {
            if (window.innerWidth >= 960) {
                app.dom.sidebarOverlay.classList.add('hidden');
                app.dom.sidebar.classList.remove('sidebar--open');
            }
        },
        showDefaultView(title) {
            app.dom.defaultView.classList.remove('hidden');
            app.dom.categoriesView.classList.add('hidden');
            app.dom.viewTitle.textContent = title;
        },
        showCategoriesView() {
            app.dom.defaultView.classList.add('hidden');
            app.dom.categoriesView.classList.remove('hidden');
            app.dom.categoriesScreen.classList.remove('hidden');
            app.dom.productsScreen.classList.add('hidden');
            app.renderCategories();
        }
    };

    app.state.categories = app.helpers.loadCategories();

    app.dom.buttons.forEach((button) => {
        button.addEventListener('click', () => {
            app.dom.buttons.forEach((item) => item.classList.remove('active'));
            button.classList.add('active');
            if (window.innerWidth < 960) app.helpers.closeSidebar();
            if (button.dataset.title === 'Categorias') {
                app.helpers.showCategoriesView();
                return;
            }
            app.helpers.showDefaultView(button.dataset.title);
        });
    });

    app.dom.menuToggle.addEventListener('click', () => {
        if (app.dom.sidebar.classList.contains('sidebar--open')) {
            app.helpers.closeSidebar();
            return;
        }
        app.helpers.openSidebar();
    });

    app.dom.sidebarOverlay.addEventListener('click', app.helpers.closeSidebar);
    window.addEventListener('resize', app.helpers.handleSidebarByViewport);
    app.helpers.handleSidebarByViewport();
})();
