<section id="categoriesScreen">
    <section class="admin-card admin-card--full">
        <div class="card-heading">
            <h3>Nueva categoria</h3>
            <p>Agrega una categoria y se mostrara como carpeta en esta vista.</p>
        </div>

        <form id="categoryForm" class="admin-form">
            <input type="hidden" id="categoryId">
            <label class="form-field">
                <span>Nombre de la categoria</span>
                <input type="text" id="categoryName" placeholder="Ejemplo: Bolsos" required>
            </label>
            <div class="form-actions">
                <button type="submit" class="action-button action-button--primary" id="categorySubmit">Guardar categoria</button>
                <button type="button" class="action-button action-button--ghost hidden" id="cancelCategoryEdit">Cancelar</button>
            </div>
        </form>
    </section>

    <section class="admin-card categories-list-card">
        <div class="card-heading">
            <h3>Carpetas de categorias</h3>
            <p>Haz clic en una carpeta para ver y administrar sus productos.</p>
        </div>
        <div class="filter-bar">
            <input type="search" id="categorySearch" class="filter-input" placeholder="Buscar categoria">
            <select id="categorySort" class="filter-select">
                <option value="recent">Mas reciente</option>
                <option value="oldest">Mas antiguo</option>
            </select>
        </div>
        <div class="folder-grid" id="categoriesList"></div>
        <p class="empty-state" id="categoriesEmpty">Todavia no hay categorias creadas.</p>
    </section>
</section>
