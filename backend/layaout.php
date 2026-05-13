<div class="dashboard">
    <?php include __DIR__ . '/partials/admin/mobile-topbar.php'; ?>
    <?php include __DIR__ . '/partials/admin/sidebar.php'; ?>

    <main class="content">
        <?php include __DIR__ . '/partials/admin/default-view.php'; ?>

        <section class="categories-view hidden" id="categoriesView">
            <?php include __DIR__ . '/partials/admin/categories-screen.php'; ?>
            <?php include __DIR__ . '/partials/admin/products-screen.php'; ?>
        </section>
    </main>

    <div class="mobile-scroll-controls">
        <button type="button" class="mobile-scroll-button hidden" id="scrollToTopButton" aria-label="Subir al inicio">&#8593;</button>
        <button type="button" class="mobile-scroll-button hidden" id="scrollToBottomButton" aria-label="Bajar al final">&#8595;</button>
    </div>
</div>
