<section class="products-screen hidden" id="productsScreen">
    <div class="product-screen-header">
        <button type="button" class="action-button action-button--ghost" id="backToCategories">Volver</button>
    </div>

    <section class="admin-card product-manager">
        <div class="product-panel-head">
            <div>
                <p class="panel-kicker">Categoria abierta</p>
                <h3 id="selectedCategoryTitle">Selecciona una categoria</h3>
            </div>
            <button type="button" class="action-button action-button--primary" id="openProductModal">Agregar nuevo producto</button>
        </div>
        <div class="filter-bar">
            <input type="search" id="productSearch" class="filter-input" placeholder="Buscar producto">
            <select id="productSort" class="filter-select">
                <option value="recent">Mas reciente</option>
                <option value="oldest">Mas antiguo</option>
            </select>
        </div>

        <div class="product-grid-admin" id="productsList"></div>
        <p class="empty-state" id="productsEmpty">Esta categoria aun no tiene productos.</p>
    </section>

    <?php include __DIR__ . '/product-modal.php'; ?>
    <?php include __DIR__ . '/image-viewer.php'; ?>
</section>
