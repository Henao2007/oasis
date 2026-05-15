(function () {
    const app = window.AdminApp;
    const { dom, state, helpers } = app;
    const PERIOD_LABELS = {
        day: 'Ventas de hoy',
        week: 'Ventas de esta semana',
        month: 'Ventas de este mes',
        year: 'Ventas de este año'
    };

    function getStartOfDay(date) {
        const start = new Date(date);
        start.setHours(0, 0, 0, 0);
        return start;
    }

    function getStartOfWeek(date) {
        const start = getStartOfDay(date);
        const day = start.getDay();
        const diff = day === 0 ? 6 : day - 1;
        start.setDate(start.getDate() - diff);
        return start;
    }

    function getStartOfMonth(date) {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    }

    function getStartOfYear(date) {
        return new Date(date.getFullYear(), 0, 1);
    }

    function getPeriodRange(period) {
        const now = new Date();
        const end = new Date(now);
        end.setHours(23, 59, 59, 999);

        if (period === 'week') return { start: getStartOfWeek(now), end };
        if (period === 'month') return { start: getStartOfMonth(now), end };
        if (period === 'year') return { start: getStartOfYear(now), end };
        return { start: getStartOfDay(now), end };
    }

    function getSalesByPeriod(period) {
        const { start, end } = getPeriodRange(period);
        return state.sales.filter((sale) => sale.createdAt >= start.getTime() && sale.createdAt <= end.getTime());
    }

    function formatCurrency(value) {
        return `$ ${Number(value || 0).toLocaleString('es-CO')}`;
    }

    function getGroupedSales(period) {
        const grouped = new Map();

        getSalesByPeriod(period).forEach((sale) => {
            const current = grouped.get(sale.productName) || {
                name: sale.productName,
                quantity: 0,
                totalValue: 0
            };
            current.quantity += Number(sale.quantity || 0);
            current.totalValue += Number(sale.totalValue || 0);
            grouped.set(sale.productName, current);
        });

        return [...grouped.values()].sort((a, b) => b.quantity - a.quantity || b.totalValue - a.totalValue);
    }

    function getSummary(period) {
        const sales = getSalesByPeriod(period);
        return {
            count: sales.length,
            totalValue: sales.reduce((sum, sale) => sum + Number(sale.totalValue || 0), 0)
        };
    }

    app.renderSalesSummary = function renderSalesSummary() {
        dom.salesSummaryGrid.querySelectorAll('[data-period]').forEach((button) => {
            button.classList.toggle('active', button.dataset.period === state.activeSalesPeriod);
        });
    };

    app.renderSalesTable = function renderSalesTable(groupedSales) {
        if (!groupedSales.length) {
            dom.salesTable.innerHTML = '';
            dom.salesTableEmpty.classList.remove('hidden');
            return;
        }

        dom.salesTableEmpty.classList.add('hidden');
        dom.salesTable.innerHTML = `
            <div class="sales-table__head">
                <span>Producto</span>
                <span>Cantidad</span>
                <span>Valor</span>
            </div>
            ${groupedSales.map((item) => `
                <article class="sales-table__row">
                    <p>${helpers.escapeHtml(item.name)}</p>
                    <p>${helpers.escapeHtml(item.quantity)}</p>
                    <p>${helpers.escapeHtml(formatCurrency(item.totalValue))}</p>
                </article>
            `).join('')}
        `;
    };

    app.renderSales = function renderSales() {
        const summary = getSummary(state.activeSalesPeriod);
        const groupedSales = getGroupedSales(state.activeSalesPeriod);

        app.renderSalesSummary();
        dom.salesActiveTitle.textContent = PERIOD_LABELS[state.activeSalesPeriod];
        dom.salesActiveCount.textContent = String(summary.count);
        dom.salesActiveValue.textContent = formatCurrency(summary.totalValue);
        app.renderSalesTable(groupedSales);
    };

    dom.salesSummaryGrid?.addEventListener('click', (event) => {
        const target = event.target.closest('[data-period]');
        if (!target) return;
        state.activeSalesPeriod = target.dataset.period || 'day';
        app.renderSales();
    });

    dom.exportSalesPdfButton?.addEventListener('click', () => {
        window.print();
    });
})();
