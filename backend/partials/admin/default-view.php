<section class="content-home" id="defaultView">
    <h2 class="content-title" id="viewTitle">Panel Administrativo</h2>

    <section class="admin-card settings-card hidden" id="settingsView">
        <div class="card-heading">
            <h3>Configuracion del administrador</h3>
        </div>

        <div class="settings-profile">
            <button type="button" class="settings-avatar" id="settingsAvatarPreview" aria-label="Ver imagen del administrador"></button>
            <div class="settings-profile__info">
                <h4 id="settingsProfileName">Administrador Oasis</h4>
                <p id="settingsProfileEmail">admin@oasis.com</p>
            </div>
        </div>

        <form id="settingsForm" class="admin-form">
            <label class="form-field">
                <span>Imagen del administrador</span>
                <input type="file" id="settingsImage" accept="image/*">
            </label>
            <label class="form-field">
                <span>Nombre del administrador</span>
                <input type="text" id="settingsName" placeholder="Nombre del administrador" required>
            </label>
            <label class="form-field">
                <span>Correo electronico</span>
                <input type="email" id="settingsEmail" value="admin@oasis.com" readonly>
            </label>
            <div class="form-actions">
                <button type="submit" class="action-button action-button--primary" id="saveSettingsButton">Actualizar</button>
                <button type="button" class="action-button action-button--ghost" id="logoutButton">Cerrar sesion</button>
            </div>
        </form>
    </section>

    <section class="admin-card clients-card hidden" id="clientsView">
        <section id="clientsListView">
            <div class="card-heading">
                <h3>Clientes registrados</h3>
                <p>Informacion temporal mientras conectamos esta vista con la API.</p>
            </div>

            <div class="clients-toolbar">
                <button type="button" class="action-button action-button--primary" id="openClientsExport">Exportar informacion</button>
            </div>

            <div class="filter-bar">
                <input type="search" id="clientSearch" class="filter-input" placeholder="Buscar por id, nombre, correo o numero">
                <select id="clientSort" class="filter-select">
                    <option value="recent">Mas reciente</option>
                    <option value="oldest">Mas antiguo</option>
                </select>
            </div>

            <div class="clients-table" id="clientsList"></div>
            <p class="empty-state hidden" id="clientsEmpty">No se encontraron clientes con esos datos.</p>
            <div class="clients-pagination hidden" id="clientsPagination"></div>
        </section>

        <section class="clients-export hidden" id="clientsExportView">
            <div class="clients-export__top">
                <button type="button" class="action-button action-button--ghost" id="backToClientsList">Volver</button>
            </div>

            <div class="card-heading">
                <h3>Exportar informacion</h3>
                <p>Selecciona el tipo de informacion que quieres reunir para copiar.</p>
            </div>

            <div class="clients-export__actions">
                <button type="button" class="action-button action-button--primary" id="exportClientEmails">Correos</button>
                <button type="button" class="action-button action-button--primary" id="exportClientPhones">Numeros</button>
            </div>

            <label class="form-field">
                <span>Informacion lista para copiar</span>
                <textarea id="clientsExportOutput" rows="10" readonly placeholder="Aqui aparecera la informacion seleccionada"></textarea>
            </label>

            <div class="form-actions">
                <button type="button" class="action-button action-button--primary" id="copyClientsExport">Copiar todo</button>
            </div>
        </section>
    </section>

    <div class="settings-toast hidden" id="settingsToast" role="status" aria-live="polite">
        <div class="settings-toast__dialog">
            <button type="button" class="settings-toast__close" id="closeSettingsToast" aria-label="Cerrar aviso">X</button>
            <div class="settings-toast__icon">&#10003;</div>
            <p>Actualizado correctamente</p>
        </div>
    </div>

    <div class="settings-image-viewer hidden" id="settingsImageViewer">
        <div class="settings-image-viewer__backdrop" id="settingsImageViewerBackdrop"></div>
        <div class="settings-image-viewer__dialog">
            <button type="button" class="settings-image-viewer__close" id="closeSettingsImageViewer" aria-label="Cerrar imagen">X</button>
            <img id="settingsImageViewerImage" alt="Imagen del administrador ampliada">
        </div>
    </div>
</section>
