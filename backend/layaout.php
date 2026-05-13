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
</div>
