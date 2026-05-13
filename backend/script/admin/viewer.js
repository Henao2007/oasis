(function () {
    const app = window.AdminApp;
    const { dom, state } = app;

    app.updateImageViewer = function updateImageViewer() {
        if (!state.activeViewerImages.length) return;
        dom.viewerImage.src = state.activeViewerImages[state.activeViewerIndex];
    };

    app.openImageViewer = function openImageViewer(images, startIndex) {
        state.activeViewerImages = images.filter(Boolean);
        state.activeViewerIndex = startIndex || 0;
        if (!state.activeViewerImages.length) return;
        app.updateImageViewer();
        dom.imageViewer.classList.remove('hidden');
    };

    app.closeImageViewer = function closeImageViewer() {
        dom.imageViewer.classList.add('hidden');
        state.activeViewerImages = [];
        state.activeViewerIndex = 0;
        dom.viewerImage.src = '';
    };

    app.showPreviousImage = function showPreviousImage() {
        if (!state.activeViewerImages.length) return;
        state.activeViewerIndex = (state.activeViewerIndex - 1 + state.activeViewerImages.length) % state.activeViewerImages.length;
        app.updateImageViewer();
    };

    app.showNextImage = function showNextImage() {
        if (!state.activeViewerImages.length) return;
        state.activeViewerIndex = (state.activeViewerIndex + 1) % state.activeViewerImages.length;
        app.updateImageViewer();
    };

    dom.imageViewerBackdrop.addEventListener('click', app.closeImageViewer);
    dom.closeImageViewerButton.addEventListener('click', app.closeImageViewer);
    dom.viewerPrevButton.addEventListener('click', app.showPreviousImage);
    dom.viewerNextButton.addEventListener('click', app.showNextImage);

    window.addEventListener('keydown', (event) => {
        if (dom.imageViewer.classList.contains('hidden')) return;
        if (event.key === 'Escape') app.closeImageViewer();
        if (event.key === 'ArrowLeft') app.showPreviousImage();
        if (event.key === 'ArrowRight') app.showNextImage();
    });
})();
