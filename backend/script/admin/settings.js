(function () {
    const app = window.AdminApp;
    const { dom, state, helpers } = app;
    let toastTimeoutId = null;
    let initialSettingsName = '';
    let initialSettingsImage = '';

    app.renderSettingsAvatar = function renderSettingsAvatar(imageSrc) {
        dom.settingsAvatarPreview.innerHTML = `<img src="${helpers.escapeHtml(imageSrc)}" alt="Administrador">`;
    };

    app.openSettingsImageViewer = function openSettingsImageViewer() {
        const profile = state.adminProfile || helpers.getDefaultAdminProfile();
        dom.settingsImageViewerImage.src = profile.image;
        dom.settingsImageViewer.classList.remove('hidden');
    };

    app.closeSettingsImageViewer = function closeSettingsImageViewer() {
        dom.settingsImageViewer.classList.add('hidden');
        dom.settingsImageViewerImage.removeAttribute('src');
    };

    app.compressSettingsImage = function compressSettingsImage(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const image = new Image();
                image.onload = () => {
                    const maxSize = 960;
                    const scale = Math.min(maxSize / image.width, maxSize / image.height, 1);
                    const width = Math.max(1, Math.round(image.width * scale));
                    const height = Math.max(1, Math.round(image.height * scale));
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');

                    if (!context) {
                        reject(new Error('No se pudo procesar la imagen'));
                        return;
                    }

                    canvas.width = width;
                    canvas.height = height;
                    context.drawImage(image, 0, 0, width, height);

                    let quality = 0.92;
                    let output = canvas.toDataURL('image/jpeg', quality);

                    while (output.length > 420000 && quality > 0.56) {
                        quality -= 0.06;
                        output = canvas.toDataURL('image/jpeg', quality);
                    }

                    resolve(output);
                };
                image.onerror = () => reject(new Error('No se pudo leer la imagen'));
                image.src = String(reader.result || '');
            };
            reader.onerror = () => reject(new Error('No se pudo leer la imagen'));
            reader.readAsDataURL(file);
        });
    };

    app.renderSettings = function renderSettings() {
        const profile = state.adminProfile || helpers.getDefaultAdminProfile();
        initialSettingsName = profile.name;
        initialSettingsImage = profile.image;
        dom.settingsImageInput.value = '';
        dom.settingsNameInput.value = profile.name;
        dom.settingsEmailInput.value = profile.email;
        dom.settingsProfileName.textContent = profile.name;
        dom.settingsProfileEmail.textContent = profile.email;
        app.renderSettingsAvatar(profile.image);
    };

    app.showSettingsToast = function showSettingsToast() {
        dom.settingsToast.classList.remove('hidden');
        if (toastTimeoutId) window.clearTimeout(toastTimeoutId);
        toastTimeoutId = window.setTimeout(() => {
            app.hideSettingsToast();
        }, 2000);
    };

    app.showSettingsMessage = function showSettingsMessage(message, success) {
        const toastIcon = dom.settingsToast.querySelector('.settings-toast__icon');
        const toastMessage = dom.settingsToast.querySelector('p');
        toastIcon.innerHTML = success ? '&#10003;' : '!';
        toastIcon.classList.toggle('settings-toast__icon--error', !success);
        toastMessage.textContent = message;
        app.showSettingsToast();
    };

    app.hideSettingsToast = function hideSettingsToast() {
        dom.settingsToast.classList.add('hidden');
        if (toastTimeoutId) window.clearTimeout(toastTimeoutId);
        toastTimeoutId = null;
    };

    async function handleSettingsSave(event) {
        event.preventDefault();
        try {
            const nextName = dom.settingsNameInput.value.trim() || helpers.getDefaultAdminProfile().name;
            const [selectedImage] = dom.settingsImageInput.files || [];
            const hasImageSelection = Boolean(selectedImage);
            let nextImage = initialSettingsImage;

            if (hasImageSelection) {
                nextImage = await app.compressSettingsImage(selectedImage);
            }

            const hasChanges = nextName !== initialSettingsName || hasImageSelection;

            if (!hasChanges) {
                app.showSettingsMessage('Debes actualizar algo', false);
                return;
            }

            state.adminProfile = {
                ...(state.adminProfile || helpers.getDefaultAdminProfile()),
                name: nextName,
                image: nextImage
            };
            helpers.saveAdminProfile();
            app.renderSettings();
            app.showSettingsMessage('Actualizado correctamente', true);
        } catch {
            app.showSettingsMessage('La imagen es demasiado pesada o no se pudo actualizar', false);
        }
    }

    dom.settingsForm.addEventListener('submit', handleSettingsSave);
    dom.settingsAvatarPreview.addEventListener('click', app.openSettingsImageViewer);
    dom.closeSettingsImageViewerButton.addEventListener('click', app.closeSettingsImageViewer);
    dom.settingsImageViewerBackdrop.addEventListener('click', app.closeSettingsImageViewer);

    dom.closeSettingsToastButton.addEventListener('click', app.hideSettingsToast);
    dom.settingsToast.addEventListener('click', (event) => {
        if (event.target === dom.settingsToast) app.hideSettingsToast();
    });

    app.renderSettings();
})();
