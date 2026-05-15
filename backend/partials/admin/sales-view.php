<section class="admin-card sales-card hidden" id="salesView">
    <div class="card-heading sales-card__heading">
        <div>
            <h3>Resumen de ventas</h3>
            <p>Consulta el comportamiento de hoy, esta semana, este mes y este ano.</p>
        </div>
        <button type="button" class="action-button action-button--primary" id="exportSalesPdf">
            Exportar PDF
        </button>
    </div>

    <div class="sales-summary-grid" id="salesSummaryGrid">
        <button type="button" class="sales-summary-card active" data-period="day">
            <span class="sales-summary-card__label">Hoy</span>
        </button>
        <button type="button" class="sales-summary-card" data-period="week">
            <span class="sales-summary-card__label">Semana</span>
        </button>
        <button type="button" class="sales-summary-card" data-period="month">
            <span class="sales-summary-card__label">Mes</span>
        </button>
        <button type="button" class="sales-summary-card" data-period="year">
            <span class="sales-summary-card__label">Año</span>
        </button>
    </div>

    <div class="sales-detail-print" id="salesPrintArea">
        <div class="sales-detail-head">
            <div>
                <p class="panel-kicker">Periodo activo</p>
                <h4 class="sales-detail-title" id="salesActiveTitle">Ventas de hoy</h4>
            </div>
            <div class="sales-detail-metrics">
                <article class="sales-metric">
                    <span>Total de ventas</span>
                    <strong id="salesActiveCount">0</strong>
                </article>
                <article class="sales-metric">
                    <span>Valor total</span>
                    <strong id="salesActiveValue">$ 0</strong>
                </article>
            </div>
        </div>

        <section class="sales-table-card">
            <div class="card-heading">
                <h4>Detalle de productos vendidos</h4>
            </div>
            <div class="sales-table" id="salesTable"></div>
            <p class="empty-state hidden" id="salesTableEmpty">No hay ventas registradas para este periodo.</p>
        </section>
    </div>
</section>
