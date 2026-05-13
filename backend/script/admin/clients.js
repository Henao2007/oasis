(function () {
    const app = window.AdminApp;
    const { dom, state, helpers } = app;
    const CLIENTS_PER_PAGE = 50;

    app.showClientsListView = function showClientsListView() {
        dom.clientsListView.classList.remove('hidden');
        dom.clientsExportView.classList.add('hidden');
    };

    app.showClientsExportView = function showClientsExportView() {
        dom.clientsListView.classList.add('hidden');
        dom.clientsExportView.classList.remove('hidden');
    };

    app.buildClientsExportValue = function buildClientsExportValue(type) {
        if (type === 'phones') {
            return state.clients.map((client) => client.phone).join('\n');
        }
        return state.clients.map((client) => client.email).join('\n');
    };

    app.renderClients = function renderClients() {
        const query = String(dom.clientSearchInput.value || '').trim().toLowerCase();
        const sortValue = dom.clientSortSelect.value;
        const visibleClients = [...state.clients]
            .sort((a, b) => sortValue === 'oldest'
                ? helpers.getItemTimestamp(a) - helpers.getItemTimestamp(b)
                : helpers.getItemTimestamp(b) - helpers.getItemTimestamp(a))
            .filter((client) => {
                if (!query) return true;
                return [client.id, client.name, client.email, client.phone]
                    .join(' ')
                    .toLowerCase()
                    .includes(query);
            });
        const totalPages = Math.max(1, Math.ceil(visibleClients.length / CLIENTS_PER_PAGE));
        state.clientsPage = Math.min(state.clientsPage, totalPages - 1);
        const pageStart = state.clientsPage * CLIENTS_PER_PAGE;
        const paginatedClients = visibleClients.slice(pageStart, pageStart + CLIENTS_PER_PAGE);

        if (!visibleClients.length) {
            dom.clientsList.innerHTML = '';
            dom.clientsEmpty.classList.remove('hidden');
            dom.clientsPagination.innerHTML = '';
            dom.clientsPagination.classList.add('hidden');
            return;
        }

        dom.clientsEmpty.classList.add('hidden');
        dom.clientsList.innerHTML = `
            <div class="clients-table__head">
                <span>ID</span>
                <span>Nombre</span>
                <span>Correo</span>
                <span>Numero</span>
            </div>
            ${paginatedClients.map((client) => `
                <article class="clients-row">
                    <span class="clients-row__label">ID</span>
                    <p>${helpers.escapeHtml(client.id)}</p>
                    <span class="clients-row__label">Nombre</span>
                    <p>${helpers.escapeHtml(client.name)}</p>
                    <span class="clients-row__label">Correo</span>
                    <p>${helpers.escapeHtml(client.email)}</p>
                    <span class="clients-row__label">Numero</span>
                    <p>${helpers.escapeHtml(client.phone)}</p>
                </article>
            `).join('')}
        `;

        if (visibleClients.length <= CLIENTS_PER_PAGE) {
            dom.clientsPagination.innerHTML = '';
            dom.clientsPagination.classList.add('hidden');
            return;
        }

        dom.clientsPagination.classList.remove('hidden');
        dom.clientsPagination.innerHTML = Array.from({ length: totalPages }, (_, index) => {
            const label = (index + 1) * CLIENTS_PER_PAGE;
            const activeClass = index === state.clientsPage ? ' clients-pagination__button--active' : '';
            return `<button type="button" class="clients-pagination__button${activeClass}" data-page="${index}">${label}</button>`;
        }).join('');
    };

    dom.clientSearchInput.addEventListener('input', () => {
        state.clientsPage = 0;
        app.renderClients();
    });
    dom.clientSortSelect.addEventListener('change', () => {
        state.clientsPage = 0;
        app.renderClients();
    });
    dom.clientsPagination.addEventListener('click', (event) => {
        const button = event.target.closest('[data-page]');
        if (!button) return;
        state.clientsPage = Number(button.dataset.page || 0);
        app.renderClients();
    });

    dom.openClientsExportButton.addEventListener('click', app.showClientsExportView);
    dom.backToClientsListButton.addEventListener('click', app.showClientsListView);
    dom.exportClientEmailsButton.addEventListener('click', () => {
        dom.clientsExportOutput.value = app.buildClientsExportValue('emails');
    });
    dom.exportClientPhonesButton.addEventListener('click', () => {
        dom.clientsExportOutput.value = app.buildClientsExportValue('phones');
    });
    dom.copyClientsExportButton.addEventListener('click', async () => {
        if (!dom.clientsExportOutput.value.trim()) return;
        try {
            await navigator.clipboard.writeText(dom.clientsExportOutput.value);
        } catch {
            dom.clientsExportOutput.select();
            document.execCommand('copy');
        }
    });
})();
