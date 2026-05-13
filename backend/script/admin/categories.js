(function () {
    const app = window.AdminApp;
    const { dom, state, helpers } = app;

    app.resetCategoryForm = function resetCategoryForm() {
        dom.categoryForm.reset();
        dom.categoryIdInput.value = '';
        dom.categorySubmit.textContent = 'Guardar categoria';
        dom.cancelCategoryEdit.classList.add('hidden');
    };

    app.renderCategories = function renderCategories() {
        const categoryNumberMap = helpers.getItemNumberMap(state.categories);
        const visibleCategories = helpers.applySearchAndSort(
            state.categories,
            dom.categorySearchInput.value,
            dom.categorySortSelect.value,
            'name',
            'Carpeta'
        );

        if (!visibleCategories.length) {
            dom.categoriesList.innerHTML = '';
            dom.categoriesEmpty.classList.remove('hidden');
            return;
        }

        dom.categoriesEmpty.classList.add('hidden');
        dom.categoriesList.innerHTML = visibleCategories.map((category) => `
            <article class="folder-card ${category.available === false ? 'folder-card--unavailable' : ''}">
                <p class="card-enumerator">Carpeta ${categoryNumberMap.get(category.id) || ''}</p>
                <button type="button" class="category-status ${category.available === false ? 'category-status--unavailable' : 'category-status--available'}" data-action="toggle-category-status" data-id="${category.id}">
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
                        <p class="folder-card__name">${helpers.escapeHtml(category.name)}</p>
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

        if (helpers.getSelectedCategory()) app.renderProducts();
    };

    dom.categoryForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = dom.categoryNameInput.value.trim();
        if (!name) return;

        if (dom.categoryIdInput.value) {
            state.categories = state.categories.map((category) =>
                category.id === dom.categoryIdInput.value ? { ...category, name } : category
            );
        } else {
            state.categories.unshift({
                id: helpers.createId(),
                name,
                createdAt: Date.now(),
                available: true,
                products: []
            });
        }

        helpers.saveCategories();
        app.resetCategoryForm();
        app.renderCategories();
    });

    dom.cancelCategoryEdit.addEventListener('click', app.resetCategoryForm);
    dom.categorySearchInput.addEventListener('input', app.renderCategories);
    dom.categorySortSelect.addEventListener('change', app.renderCategories);

    dom.categoriesList.addEventListener('click', (event) => {
        const target = event.target.closest('[data-action]');
        if (!target) return;
        const category = state.categories.find((item) => item.id === target.dataset.id);
        if (!category) return;

        if (target.dataset.action === 'toggle-category-status') {
            state.categories = state.categories.map((item) => item.id === category.id ? { ...item, available: item.available === false } : item);
            helpers.saveCategories();
            app.renderCategories();
            return;
        }

        if (target.dataset.action === 'open-category') {
            app.openProductsScreen(category.id);
            return;
        }

        if (target.dataset.action === 'edit-category') {
            dom.categoryIdInput.value = category.id;
            dom.categoryNameInput.value = category.name;
            dom.categorySubmit.textContent = 'Actualizar categoria';
            dom.cancelCategoryEdit.classList.remove('hidden');
            dom.categoryNameInput.focus();
            return;
        }

        if (target.dataset.action === 'delete-category' && window.confirm(`Eliminar la categoria "${category.name}"?`)) {
            state.categories = state.categories.filter((item) => item.id !== category.id);
            if (state.selectedCategoryId === category.id) state.selectedCategoryId = null;
            helpers.saveCategories();
            app.renderCategories();
        }
    });

    app.resetCategoryForm();
})();
