(function () {
    const app = window.AdminApp;
    const { dom, state, helpers } = app;
    const ORDERS_PER_PAGE = 50;

    function formatCurrency(value) {
        return `$ ${Number(value || 0).toLocaleString('es-CO')}`;
    }

    function escapeOrderItems(items = []) {
        return items.map((item) => `
            <article class="order-item">
                <div>
                    <strong>${helpers.escapeHtml(item.name || 'Producto')}</strong>
                    <p>Cantidad: ${helpers.escapeHtml(item.quantity || 0)}</p>
                </div>
                <div class="order-item__price">
                    <span>Unitario: ${helpers.escapeHtml(formatCurrency(item.unitPrice || 0))}</span>
                    <strong>Subtotal: ${helpers.escapeHtml(formatCurrency(item.subtotal || 0))}</strong>
                </div>
            </article>
        `).join('');
    }

    function getOrderTotal(order) {
        return (order.items || []).reduce((sum, item) => sum + Number(item.subtotal || 0), 0);
    }

    function getOrderById(orderId) {
        return state.orders.pending.find((order) => order.id === orderId) || null;
    }

    function getConfirmedOrderById(orderId) {
        return state.orders.confirmed.find((order) => order.id === orderId) || null;
    }

    function closeOrdersActionModal() {
        state.ordersActionDraft = null;
        dom.ordersActionModal.classList.add('hidden');
    }

    function openOrdersActionModal(orderId, type) {
        const order = type === 'return' ? getConfirmedOrderById(orderId) : getOrderById(orderId);
        if (!order) return;

        state.ordersActionDraft = { id: orderId, type };
        const isReject = type === 'reject';
        const isReturn = type === 'return';
        dom.ordersActionModalTitle.textContent = isReject
            ? 'Rechazar pedido'
            : isReturn
                ? 'Procesar devolucion'
                : 'Confirmar pedido';
        dom.ordersActionModalText.textContent = isReject
            ? 'Esta accion quitara el pedido de pendientes. Confirma solo si estas seguro.'
            : isReturn
                ? 'Esta accion quitara el pedido de confirmados y revertira su registro en ventas cuando exista.'
                : 'Este pedido se movera a pedidos confirmados. Confirma para continuar.';
        dom.confirmOrdersActionButton.textContent = isReject
            ? 'Confirmar rechazo'
            : isReturn
                ? 'Confirmar devolucion'
                : 'Confirmar pedido';
        dom.confirmOrdersActionButton.classList.toggle('mini-button--danger', isReject || isReturn);
        dom.confirmOrdersActionButton.classList.toggle('action-button--primary', !isReject && !isReturn);
        dom.ordersActionModalSummary.innerHTML = `
            <div class="order-card order-card--modal">
                <div class="order-card__head">
                    <div>
                        <p class="panel-kicker">Pedido</p>
                        <h4>${helpers.escapeHtml(order.id || 'Sin ID')}</h4>
                    </div>
                    <div class="order-card__meta">
                        <span>Creado: ${helpers.escapeHtml(helpers.formatDateTime(order.createdAt))}</span>
                        <strong>Total: ${helpers.escapeHtml(formatCurrency(getOrderTotal(order)))}</strong>
                    </div>
                </div>
                <div class="order-items">
                    ${escapeOrderItems(order.items)}
                </div>
            </div>
        `;
        dom.ordersActionModal.classList.remove('hidden');
    }

    function renderPagination(container, totalItems, currentPage, key) {
        const totalPages = Math.max(1, Math.ceil(totalItems / ORDERS_PER_PAGE));

        if (totalItems <= ORDERS_PER_PAGE) {
            container.innerHTML = '';
            container.classList.add('hidden');
            return currentPage > 0 ? 0 : currentPage;
        }

        const safePage = Math.min(currentPage, totalPages - 1);
        container.classList.remove('hidden');
        container.innerHTML = Array.from({ length: totalPages }, (_, index) => {
            const label = (index + 1) * ORDERS_PER_PAGE;
            const activeClass = index === safePage ? ' clients-pagination__button--active' : '';
            return `<button type="button" class="clients-pagination__button${activeClass}" data-orders-page="${index}" data-orders-page-key="${key}">${label}</button>`;
        }).join('');

        return safePage;
    }

    function renderOrdersList(listElement, emptyElement, paginationElement, orders, isConfirmed, pageStateKey) {
        if (!orders.length) {
            listElement.innerHTML = '';
            emptyElement.classList.remove('hidden');
            paginationElement.innerHTML = '';
            paginationElement.classList.add('hidden');
            return;
        }

        state[pageStateKey] = renderPagination(paginationElement, orders.length, state[pageStateKey], pageStateKey);
        const pageStart = state[pageStateKey] * ORDERS_PER_PAGE;
        const paginatedOrders = orders.slice(pageStart, pageStart + ORDERS_PER_PAGE);

        emptyElement.classList.add('hidden');
        listElement.innerHTML = paginatedOrders.map((order) => `
            <article class="order-card">
                <div class="order-card__head">
                    <div>
                        <p class="panel-kicker">Pedido</p>
                        <h4>${helpers.escapeHtml(order.id || 'Sin ID')}</h4>
                    </div>
                    <div class="order-card__meta">
                        <span>Creado: ${helpers.escapeHtml(helpers.formatDateTime(order.createdAt))}</span>
                        ${isConfirmed ? `<span>Confirmado: ${helpers.escapeHtml(helpers.formatDateTime(order.confirmedAt))}</span>` : ''}
                        <strong>Total: ${helpers.escapeHtml(formatCurrency(getOrderTotal(order)))}</strong>
                    </div>
                </div>

                <div class="order-items">
                    ${escapeOrderItems(order.items)}
                </div>

                ${isConfirmed ? `
                    <div class="form-actions">
                        <button type="button" class="action-button action-button--ghost mini-button--danger" data-return-order="${helpers.escapeHtml(order.id || '')}">
                            Devolucion
                        </button>
                    </div>
                ` : `
                    <div class="form-actions">
                        <button type="button" class="action-button action-button--primary" data-confirm-order="${helpers.escapeHtml(order.id || '')}">
                            Confirmar pedido
                        </button>
                        <button type="button" class="action-button action-button--ghost mini-button--danger" data-reject-order="${helpers.escapeHtml(order.id || '')}">
                            Rechazar
                        </button>
                    </div>
                `}
            </article>
        `).join('');
    }

    app.renderOrders = function renderOrders() {
        const pendingOrders = [...state.orders.pending]
            .sort((a, b) => Number(b.createdAt || 0) - Number(a.createdAt || 0));
        const confirmedOrders = [...state.orders.confirmed]
            .sort((a, b) => Number(b.confirmedAt || b.createdAt || 0) - Number(a.confirmedAt || a.createdAt || 0));

        dom.ordersPendingTab.classList.toggle('orders-tab--active', state.activeOrdersTab === 'pending');
        dom.ordersConfirmedTab.classList.toggle('orders-tab--active', state.activeOrdersTab === 'confirmed');
        dom.ordersPendingTab.setAttribute('aria-selected', String(state.activeOrdersTab === 'pending'));
        dom.ordersConfirmedTab.setAttribute('aria-selected', String(state.activeOrdersTab === 'confirmed'));
        dom.ordersPendingPanel.classList.toggle('hidden', state.activeOrdersTab !== 'pending');
        dom.ordersConfirmedPanel.classList.toggle('hidden', state.activeOrdersTab !== 'confirmed');

        renderOrdersList(
            dom.ordersPendingList,
            dom.ordersPendingEmpty,
            dom.ordersPendingPagination,
            pendingOrders,
            false,
            'ordersPendingPage'
        );
        renderOrdersList(
            dom.ordersConfirmedList,
            dom.ordersConfirmedEmpty,
            dom.ordersConfirmedPagination,
            confirmedOrders,
            true,
            'ordersConfirmedPage'
        );
    };

    app.confirmOrder = function confirmOrder(orderId) {
        const orderIndex = state.orders.pending.findIndex((order) => order.id === orderId);
        if (orderIndex === -1) return;

        const [order] = state.orders.pending.splice(orderIndex, 1);
        state.orders.confirmed.unshift({
            ...order,
            confirmedAt: Date.now()
        });
        helpers.saveOrders();

        if (Array.isArray(state.sales)) {
            const salesRecords = (order.items || []).map((item, itemIndex) => ({
                id: `SALE-${Date.now()}-${itemIndex}-${Math.random().toString(16).slice(2, 8)}`,
                orderId: order.id,
                productName: item.name,
                quantity: Number(item.quantity || 0),
                unitPrice: Number(item.unitPrice || 0),
                totalValue: Number(item.subtotal || 0),
                createdAt: Date.now()
            }));

            state.sales = [...salesRecords, ...state.sales];
            helpers.saveSales();
        }

        state.ordersActionDraft = null;
        state.activeOrdersTab = 'confirmed';
        state.ordersConfirmedPage = 0;
        dom.ordersActionModal.classList.add('hidden');
        app.renderOrders();
        if (typeof app.renderSales === 'function' && !dom.salesView.classList.contains('hidden')) {
            app.renderSales();
        }
    };

    app.rejectOrder = function rejectOrder(orderId) {
        const orderIndex = state.orders.pending.findIndex((order) => order.id === orderId);
        if (orderIndex === -1) return;

        state.orders.pending.splice(orderIndex, 1);
        helpers.saveOrders();
        state.ordersActionDraft = null;
        dom.ordersActionModal.classList.add('hidden');
        app.renderOrders();
    };

    app.returnOrder = function returnOrder(orderId) {
        const orderIndex = state.orders.confirmed.findIndex((order) => order.id === orderId);
        if (orderIndex === -1) return;

        state.orders.confirmed.splice(orderIndex, 1);
        helpers.saveOrders();

        if (Array.isArray(state.sales)) {
            state.sales = state.sales.filter((sale) => sale.orderId !== orderId);
            helpers.saveSales();
        }

        state.ordersActionDraft = null;
        dom.ordersActionModal.classList.add('hidden');
        app.renderOrders();
        if (typeof app.renderSales === 'function' && !dom.salesView.classList.contains('hidden')) {
            app.renderSales();
        }
    };

    dom.ordersPendingTab?.addEventListener('click', () => {
        state.activeOrdersTab = 'pending';
        app.renderOrders();
    });

    dom.ordersConfirmedTab?.addEventListener('click', () => {
        state.activeOrdersTab = 'confirmed';
        app.renderOrders();
    });

    dom.ordersPendingList?.addEventListener('click', (event) => {
        const confirmButton = event.target.closest('[data-confirm-order]');
        if (confirmButton) {
            openOrdersActionModal(confirmButton.dataset.confirmOrder || '', 'confirm');
            return;
        }

        const rejectButton = event.target.closest('[data-reject-order]');
        if (rejectButton) {
            openOrdersActionModal(rejectButton.dataset.rejectOrder || '', 'reject');
        }
    });

    dom.confirmOrdersActionButton?.addEventListener('click', () => {
        if (!state.ordersActionDraft?.id) return;
        if (state.ordersActionDraft.type === 'return') {
            app.returnOrder(state.ordersActionDraft.id);
            return;
        }
        if (state.ordersActionDraft.type === 'reject') {
            app.rejectOrder(state.ordersActionDraft.id);
            return;
        }
        app.confirmOrder(state.ordersActionDraft.id);
    });

    dom.closeOrdersActionModalButton?.addEventListener('click', closeOrdersActionModal);
    dom.cancelOrdersActionButton?.addEventListener('click', closeOrdersActionModal);
    dom.ordersActionModalBackdrop?.addEventListener('click', closeOrdersActionModal);

    dom.ordersPendingPagination?.addEventListener('click', (event) => {
        const button = event.target.closest('[data-orders-page][data-orders-page-key]');
        if (!button) return;
        state[button.dataset.ordersPageKey] = Number(button.dataset.ordersPage || 0);
        app.renderOrders();
    });

    dom.ordersConfirmedPagination?.addEventListener('click', (event) => {
        const button = event.target.closest('[data-orders-page][data-orders-page-key]');
        if (!button) return;
        state[button.dataset.ordersPageKey] = Number(button.dataset.ordersPage || 0);
        app.renderOrders();
    });

    dom.ordersConfirmedList?.addEventListener('click', (event) => {
        const returnButton = event.target.closest('[data-return-order]');
        if (!returnButton) return;
        openOrdersActionModal(returnButton.dataset.returnOrder || '', 'return');
    });
})();
