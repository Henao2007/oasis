(function () {
    const app = window.AdminApp = window.AdminApp || {};

    app.state = {
        categories: [],
        clients: [],
        orders: { pending: [], confirmed: [] },
        sales: [],
        activeSalesPeriod: 'day',
        clientsPage: 0,
        ordersPendingPage: 0,
        ordersConfirmedPage: 0,
        selectedCategoryId: null,
        editingProductImages: { image1: '', image2: '', image3: '' },
        activeViewerImages: [],
        activeViewerIndex: 0,
        storageKey: 'oasis_admin_categories',
        ordersStorageKey: 'oasis_orders',
        salesStorageKey: 'oasis_admin_sales',
        adminProfileKey: 'oasis_admin_profile',
        adminProfile: null,
        activeOrdersTab: 'pending',
        ordersActionDraft: null
    };

    app.dom = {
        content: document.querySelector('.content'),
        buttons: document.querySelectorAll('.nav-button'),
        menuToggle: document.getElementById('menuToggle'),
        mobileTopbarIcon: document.getElementById('mobileTopbarIcon'),
        mobileTopbarTitle: document.getElementById('mobileTopbarTitle'),
        scrollToTopButton: document.getElementById('scrollToTopButton'),
        scrollToBottomButton: document.getElementById('scrollToBottomButton'),
        sidebar: document.querySelector('.sidebar'),
        sidebarOverlay: document.getElementById('sidebarOverlay'),
        viewTitle: document.getElementById('viewTitle'),
        defaultView: document.getElementById('defaultView'),
        clientsView: document.getElementById('clientsView'),
        clientsListView: document.getElementById('clientsListView'),
        clientsExportView: document.getElementById('clientsExportView'),
        clientsList: document.getElementById('clientsList'),
        clientsEmpty: document.getElementById('clientsEmpty'),
        clientsPagination: document.getElementById('clientsPagination'),
        openClientsExportButton: document.getElementById('openClientsExport'),
        backToClientsListButton: document.getElementById('backToClientsList'),
        exportClientEmailsButton: document.getElementById('exportClientEmails'),
        exportClientPhonesButton: document.getElementById('exportClientPhones'),
        clientsExportOutput: document.getElementById('clientsExportOutput'),
        copyClientsExportButton: document.getElementById('copyClientsExport'),
        clientSearchInput: document.getElementById('clientSearch'),
        clientSortSelect: document.getElementById('clientSort'),
        ordersView: document.getElementById('ordersView'),
        ordersPendingTab: document.getElementById('ordersPendingTab'),
        ordersConfirmedTab: document.getElementById('ordersConfirmedTab'),
        ordersPendingPanel: document.getElementById('ordersPendingPanel'),
        ordersConfirmedPanel: document.getElementById('ordersConfirmedPanel'),
        ordersPendingList: document.getElementById('ordersPendingList'),
        ordersConfirmedList: document.getElementById('ordersConfirmedList'),
        ordersPendingEmpty: document.getElementById('ordersPendingEmpty'),
        ordersConfirmedEmpty: document.getElementById('ordersConfirmedEmpty'),
        ordersPendingPagination: document.getElementById('ordersPendingPagination'),
        ordersConfirmedPagination: document.getElementById('ordersConfirmedPagination'),
        ordersActionModal: document.getElementById('ordersActionModal'),
        ordersActionModalBackdrop: document.getElementById('ordersActionModalBackdrop'),
        closeOrdersActionModalButton: document.getElementById('closeOrdersActionModal'),
        cancelOrdersActionButton: document.getElementById('cancelOrdersActionButton'),
        confirmOrdersActionButton: document.getElementById('confirmOrdersActionButton'),
        ordersActionModalTitle: document.getElementById('ordersActionModalTitle'),
        ordersActionModalText: document.getElementById('ordersActionModalText'),
        ordersActionModalSummary: document.getElementById('ordersActionModalSummary'),
        salesView: document.getElementById('salesView'),
        salesSummaryGrid: document.getElementById('salesSummaryGrid'),
        salesActiveTitle: document.getElementById('salesActiveTitle'),
        salesActiveCount: document.getElementById('salesActiveCount'),
        salesActiveValue: document.getElementById('salesActiveValue'),
        salesTable: document.getElementById('salesTable'),
        salesTableEmpty: document.getElementById('salesTableEmpty'),
        exportSalesPdfButton: document.getElementById('exportSalesPdf'),
        settingsView: document.getElementById('settingsView'),
        settingsForm: document.getElementById('settingsForm'),
        saveSettingsButton: document.getElementById('saveSettingsButton'),
        settingsImageInput: document.getElementById('settingsImage'),
        settingsNameInput: document.getElementById('settingsName'),
        settingsEmailInput: document.getElementById('settingsEmail'),
        settingsAvatarPreview: document.getElementById('settingsAvatarPreview'),
        settingsImageViewer: document.getElementById('settingsImageViewer'),
        settingsImageViewerBackdrop: document.getElementById('settingsImageViewerBackdrop'),
        settingsImageViewerImage: document.getElementById('settingsImageViewerImage'),
        closeSettingsImageViewerButton: document.getElementById('closeSettingsImageViewer'),
        settingsProfileName: document.getElementById('settingsProfileName'),
        settingsProfileEmail: document.getElementById('settingsProfileEmail'),
        settingsToast: document.getElementById('settingsToast'),
        closeSettingsToastButton: document.getElementById('closeSettingsToast'),
        logoutButton: document.getElementById('logoutButton'),
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
        getDefaultAdminProfile() {
            const avatarSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect width="120" height="120" rx="28" fill="#fbe5ef"/><circle cx="60" cy="44" r="22" fill="#8a4b68"/><path d="M28 100c4-18 18-28 32-28s28 10 32 28" fill="#8a4b68"/></svg>`;
            return {
                name: 'Administrador Oasis',
                email: 'admin@oasis.com',
                image: `data:image/svg+xml;utf8,${encodeURIComponent(avatarSvg)}`
            };
        },
        getDefaultClients() {
            const names = [
                'Laura Martinez', 'Daniel Rojas', 'Camila Torres', 'Santiago Perez', 'Valentina Gomez',
                'Mateo Herrera', 'Sara Castillo', 'Juan Ramirez', 'Mariana Lopez', 'Andres Vega',
                'Paula Moreno', 'Nicolas Cruz', 'Juliana Vargas', 'Felipe Castro', 'Ana Pineda',
                'Sebastian Ruiz', 'Gabriela Arias', 'David Mendoza', 'Isabella Silva', 'Tomas Duarte'
            ];
            const baseTimestamp = 1715341200000;

            return Array.from({ length: 100 }, (_, index) => {
                const idNumber = index + 1;
                const name = names[index % names.length];
                const slug = name.toLowerCase().replace(/\s+/g, '.');
                return {
                    id: `CL-${String(1001 + index)}`,
                    name,
                    email: `${slug}${idNumber}@email.com`,
                    phone: `3${String(100000000 + idNumber).slice(0, 9)}`,
                    createdAt: baseTimestamp + (index * 86400000)
                };
            });
        },
        loadCategories() {
            const saved = localStorage.getItem(app.state.storageKey);
            if (!saved) return [];
            try { return Array.isArray(JSON.parse(saved)) ? JSON.parse(saved) : []; } catch { return []; }
        },
        getDefaultOrders() {
            const now = Date.now();
            return {
                pending: [
                    {
                        id: 'PD-01',
                        source: 'cart',
                        createdAt: now - (1000 * 60 * 90),
                        items: [
                            { productId: 1, name: 'Bolso clasico', quantity: 1, unitPrice: 120000, subtotal: 120000 },
                            { productId: 2, name: 'Bolso mini', quantity: 2, unitPrice: 98000, subtotal: 196000 }
                        ]
                    },
                    {
                        id: 'PD-02',
                        source: 'cart',
                        createdAt: now - (1000 * 60 * 45),
                        items: [
                            { productId: 3, name: 'Mochila urbana', quantity: 1, unitPrice: 165000, subtotal: 165000 },
                            { productId: 4, name: 'Cartera nude', quantity: 1, unitPrice: 87000, subtotal: 87000 },
                            { productId: 7, name: 'Tote canvas', quantity: 1, unitPrice: 76000, subtotal: 76000 }
                        ]
                    }
                ],
                confirmed: [
                    {
                        id: 'PD-03',
                        source: 'cart',
                        createdAt: now - (1000 * 60 * 60 * 8),
                        confirmedAt: now - (1000 * 60 * 60 * 6),
                        items: [
                            { productId: 5, name: 'Set ejecutivo', quantity: 1, unitPrice: 210000, subtotal: 210000 },
                            { productId: 8, name: 'Bandolera soft', quantity: 2, unitPrice: 112000, subtotal: 224000 }
                        ]
                    }
                ]
            };
        },
        loadOrders() {
            const saved = localStorage.getItem(app.state.ordersStorageKey);
            if (!saved) return app.helpers.getDefaultOrders();

            try {
                const parsed = JSON.parse(saved);
                const normalized = {
                    pending: Array.isArray(parsed?.pending) ? parsed.pending : [],
                    confirmed: Array.isArray(parsed?.confirmed) ? parsed.confirmed : []
                };
                if (!normalized.pending.length && !normalized.confirmed.length) {
                    return app.helpers.getDefaultOrders();
                }
                return normalized;
            } catch {
                return app.helpers.getDefaultOrders();
            }
        },
        loadSales() {
            const saved = localStorage.getItem(app.state.salesStorageKey);
            if (!saved) return app.helpers.getDefaultSales();
            try {
                const parsed = JSON.parse(saved);
                return Array.isArray(parsed) && parsed.length ? parsed : app.helpers.getDefaultSales();
            } catch {
                return app.helpers.getDefaultSales();
            }
        },
        saveCategories() {
            localStorage.setItem(app.state.storageKey, JSON.stringify(app.state.categories));
        },
        saveOrders() {
            localStorage.setItem(app.state.ordersStorageKey, JSON.stringify(app.state.orders));
        },
        saveSales() {
            localStorage.setItem(app.state.salesStorageKey, JSON.stringify(app.state.sales));
        },
        loadAdminProfile() {
            const defaults = app.helpers.getDefaultAdminProfile();
            const saved = localStorage.getItem(app.state.adminProfileKey);
            if (!saved) return defaults;
            try {
                const parsed = JSON.parse(saved);
                return {
                    name: String(parsed.name || defaults.name),
                    email: defaults.email,
                    image: String(parsed.image || defaults.image)
                };
            } catch {
                return defaults;
            }
        },
        saveAdminProfile() {
            localStorage.setItem(app.state.adminProfileKey, JSON.stringify(app.state.adminProfile));
        },
        createId() {
            return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
        },
        getItemTimestamp(item) {
            if (item.createdAt) return item.createdAt;
            const numeric = Number(String(item.id || '').split('-')[0]);
            return Number.isFinite(numeric) ? numeric : 0;
        },
        getDefaultSales() {
            const products = [
                { name: 'Bolso clasico', price: 120000 },
                { name: 'Bolso mini', price: 98000 },
                { name: 'Mochila urbana', price: 165000 },
                { name: 'Cartera nude', price: 87000 },
                { name: 'Set ejecutivo', price: 210000 },
                { name: 'Bolso premium', price: 245000 },
                { name: 'Tote canvas', price: 76000 },
                { name: 'Bandolera soft', price: 112000 }
            ];
            const now = new Date();
            const records = [];

            for (let offset = 0; offset < 380; offset += 1) {
                const baseDate = new Date(now);
                baseDate.setHours(10, 0, 0, 0);
                baseDate.setDate(now.getDate() - offset);
                const daySalesCount = offset === 0 ? 6 : ((offset % 4) + 2);

                for (let saleIndex = 0; saleIndex < daySalesCount; saleIndex += 1) {
                    const product = products[(offset + saleIndex) % products.length];
                    const quantity = ((offset + saleIndex) % 3) + 1;
                    const createdAt = new Date(baseDate);
                    createdAt.setHours(9 + ((saleIndex * 2) % 9), 15 * (saleIndex % 4), 0, 0);
                    records.push({
                        id: `SALE-${offset}-${saleIndex}-${product.name.toLowerCase().replace(/\s+/g, '-')}`,
                        productName: product.name,
                        quantity,
                        unitPrice: product.price,
                        totalValue: product.price * quantity,
                        createdAt: createdAt.getTime()
                    });
                }
            }

            return records.sort((a, b) => b.createdAt - a.createdAt);
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
        formatDateTime(value) {
            if (!value) return 'Sin fecha';
            return new Date(value).toLocaleString('es-CO', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
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
        updateMobileScrollButtons() {
            if (!app.dom.content || !app.dom.scrollToTopButton || !app.dom.scrollToBottomButton) return;
            const { scrollTop, clientHeight, scrollHeight } = app.dom.content;
            const canScrollUp = scrollTop > 20;
            const canScrollDown = scrollTop + clientHeight < scrollHeight - 20;

            app.dom.scrollToTopButton.classList.toggle('hidden', !canScrollUp);
            app.dom.scrollToBottomButton.classList.toggle('hidden', !canScrollDown);
        },
        syncMobileTopbar(button) {
            if (!button || !app.dom.mobileTopbarTitle || !app.dom.mobileTopbarIcon) return;
            const label = button.querySelector('.nav-button__label')?.textContent?.trim() || button.dataset.title || 'Panel Administrativo';
            const iconMarkup = button.querySelector('.nav-button__icon')?.innerHTML || '';
            app.dom.mobileTopbarTitle.textContent = label;
            app.dom.mobileTopbarIcon.innerHTML = iconMarkup;
        },
        showDefaultView(title) {
            app.dom.defaultView.classList.remove('hidden');
            app.dom.defaultView.classList.remove('content-home--detail');
            app.dom.categoriesView.classList.add('hidden');
            app.dom.clientsView.classList.add('hidden');
            app.dom.ordersView.classList.add('hidden');
            app.dom.salesView.classList.add('hidden');
            app.dom.settingsView.classList.add('hidden');
            app.dom.viewTitle.textContent = title;
            app.dom.viewTitle.classList.remove('hidden');
        },
        showClientsView() {
            app.dom.defaultView.classList.remove('hidden');
            app.dom.defaultView.classList.add('content-home--detail');
            app.dom.categoriesView.classList.add('hidden');
            app.dom.viewTitle.classList.add('hidden');
            app.dom.settingsView.classList.add('hidden');
            app.dom.ordersView.classList.add('hidden');
            app.dom.salesView.classList.add('hidden');
            app.dom.clientsView.classList.remove('hidden');
            app.showClientsListView();
            app.renderClients();
            app.dom.content?.scrollTo({ top: 0, behavior: 'auto' });
        },
        showOrdersView() {
            app.dom.defaultView.classList.remove('hidden');
            app.dom.defaultView.classList.add('content-home--detail');
            app.dom.categoriesView.classList.add('hidden');
            app.dom.viewTitle.classList.add('hidden');
            app.dom.clientsView.classList.add('hidden');
            app.dom.salesView.classList.add('hidden');
            app.dom.settingsView.classList.add('hidden');
            app.dom.ordersView.classList.remove('hidden');
            if (typeof app.renderOrders === 'function') app.renderOrders();
            app.dom.content?.scrollTo({ top: 0, behavior: 'auto' });
        },
        showCategoriesView() {
            app.dom.defaultView.classList.add('hidden');
            app.dom.categoriesView.classList.remove('hidden');
            app.dom.categoriesScreen.classList.remove('hidden');
            app.dom.productsScreen.classList.add('hidden');
            app.renderCategories();
        },
        showSalesView() {
            app.dom.defaultView.classList.remove('hidden');
            app.dom.defaultView.classList.add('content-home--detail');
            app.dom.categoriesView.classList.add('hidden');
            app.dom.viewTitle.classList.add('hidden');
            app.dom.clientsView.classList.add('hidden');
            app.dom.ordersView.classList.add('hidden');
            app.dom.settingsView.classList.add('hidden');
            app.dom.salesView.classList.remove('hidden');
            if (typeof app.renderSales === 'function') app.renderSales();
            app.dom.content?.scrollTo({ top: 0, behavior: 'auto' });
        },
        showSettingsView() {
            app.dom.defaultView.classList.remove('hidden');
            app.dom.defaultView.classList.add('content-home--detail');
            app.dom.categoriesView.classList.add('hidden');
            app.dom.viewTitle.classList.add('hidden');
            app.dom.settingsView.classList.remove('hidden');
            app.dom.clientsView.classList.add('hidden');
            app.dom.ordersView.classList.add('hidden');
            app.dom.salesView.classList.add('hidden');
            app.renderSettings();
            app.dom.content?.scrollTo({ top: 0, behavior: 'auto' });
        }
    };

    app.state.categories = app.helpers.loadCategories();
    app.state.clients = app.helpers.getDefaultClients();
    app.state.orders = app.helpers.loadOrders();
    app.state.sales = app.helpers.loadSales();
    app.state.adminProfile = app.helpers.loadAdminProfile();

    app.dom.buttons.forEach((button) => {
        button.addEventListener('click', () => {
            app.dom.buttons.forEach((item) => item.classList.remove('active'));
            button.classList.add('active');
            app.helpers.syncMobileTopbar(button);
            if (window.innerWidth < 960) app.helpers.closeSidebar();
            if (button.dataset.title === 'Categorias') {
                app.helpers.showCategoriesView();
                return;
            }
            if (button.dataset.title === 'Clientes') {
                app.helpers.showClientsView();
                return;
            }
            if (button.dataset.title === 'Pedidos') {
                app.helpers.showOrdersView();
                return;
            }
            if (button.dataset.title === 'Ventas') {
                app.helpers.showSalesView();
                return;
            }
            if (button.dataset.title === 'Configuracion') {
                app.helpers.showSettingsView();
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

    app.dom.scrollToTopButton?.addEventListener('click', () => {
        app.dom.content?.scrollTo({ top: 0, behavior: 'smooth' });
    });
    app.dom.scrollToBottomButton?.addEventListener('click', () => {
        app.dom.content?.scrollTo({ top: app.dom.content.scrollHeight, behavior: 'smooth' });
    });

    app.dom.sidebarOverlay.addEventListener('click', app.helpers.closeSidebar);
    window.addEventListener('resize', app.helpers.handleSidebarByViewport);
    window.addEventListener('resize', app.helpers.updateMobileScrollButtons);
    app.dom.content?.addEventListener('scroll', app.helpers.updateMobileScrollButtons);
    app.helpers.handleSidebarByViewport();
    app.helpers.syncMobileTopbar(document.querySelector('.nav-button.active'));
    app.helpers.updateMobileScrollButtons();
})();
