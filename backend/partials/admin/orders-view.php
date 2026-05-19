<section class="admin-card orders-card hidden" id="ordersView">
    <div class="card-heading">
        <div>
            <h3>Pedidos</h3>
            <p>Revisa los pedidos enviados por WhatsApp y confirma los que ya fueron vendidos.</p>
        </div>
    </div>

    <div class="orders-tabs" role="tablist" aria-label="Estados de pedidos">
        <button type="button" class="orders-tab orders-tab--active" id="ordersPendingTab" data-orders-tab="pending" aria-selected="true">
            Pedidos pendientes
        </button>
        <button type="button" class="orders-tab" id="ordersConfirmedTab" data-orders-tab="confirmed" aria-selected="false">
            Pedidos confirmados
        </button>
    </div>

    <section class="orders-panel" id="ordersPendingPanel">
        <div class="orders-list" id="ordersPendingList"></div>
        <p class="empty-state hidden" id="ordersPendingEmpty">Todavia no hay pedidos pendientes.</p>
        <div class="clients-pagination hidden" id="ordersPendingPagination"></div>
    </section>

    <section class="orders-panel hidden" id="ordersConfirmedPanel">
        <div class="orders-list" id="ordersConfirmedList"></div>
        <p class="empty-state hidden" id="ordersConfirmedEmpty">Todavia no hay pedidos confirmados.</p>
        <div class="clients-pagination hidden" id="ordersConfirmedPagination"></div>
    </section>

    <div class="product-modal hidden" id="ordersActionModal">
        <div class="product-modal__backdrop" id="ordersActionModalBackdrop"></div>
        <div class="product-modal__dialog orders-action-modal__dialog">
            <button type="button" class="product-modal__close" id="closeOrdersActionModal" aria-label="Cerrar confirmacion">X</button>
            <div class="product-modal__header">
                <div>
                    <p class="panel-kicker">Confirmacion</p>
                    <h3 id="ordersActionModalTitle">Confirmar pedido</h3>
                    <p id="ordersActionModalText">Estas a punto de confirmar este pedido.</p>
                </div>
            </div>

            <div class="orders-action-modal__summary" id="ordersActionModalSummary"></div>

            <div class="form-actions">
                <button type="button" class="action-button action-button--ghost" id="cancelOrdersActionButton">Cerrar</button>
                <button type="button" class="action-button action-button--primary" id="confirmOrdersActionButton">Confirmar</button>
            </div>
        </div>
    </div>
</section>
