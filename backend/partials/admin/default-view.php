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
