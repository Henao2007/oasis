(function () {
    const app = window.AdminApp;
    const { dom, state, helpers } = app;
    const PERIOD_LABELS = {
        day: 'Ventas de hoy',
        week: 'Ventas de esta semana',
        month: 'Ventas de este mes',
        year: 'Ventas de este año'
    };
    const MONTH_NAMES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

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

    function formatCurrency(value) {
        return `$ ${Number(value || 0).toLocaleString('es-CO')}`;
    }

    function getSalesByPeriod(period) {
        const { start, end } = getPeriodRange(period);
        return state.sales.filter((sale) => sale.createdAt >= start.getTime() && sale.createdAt <= end.getTime());
    }

    function getGroupedSalesFromRecords(sales) {
        const grouped = new Map();

        sales.forEach((sale) => {
            const key = String(sale.productName || 'Producto sin nombre');
            const current = grouped.get(key) || {
                name: key,
                quantity: 0,
                totalValue: 0,
                salesCount: 0
            };

            current.quantity += Number(sale.quantity || 0);
            current.totalValue += Number(sale.totalValue || 0);
            current.salesCount += 1;
            grouped.set(key, current);
        });

        return [...grouped.values()].sort((a, b) => b.quantity - a.quantity || b.totalValue - a.totalValue || a.name.localeCompare(b.name));
    }

    function getGroupedSales(period) {
        return getGroupedSalesFromRecords(getSalesByPeriod(period));
    }

    function getSummaryFromRecords(sales) {
        return {
            count: sales.length,
            totalValue: sales.reduce((sum, sale) => sum + Number(sale.totalValue || 0), 0),
            totalUnits: sales.reduce((sum, sale) => sum + Number(sale.quantity || 0), 0)
        };
    }

    function getSummary(period) {
        return getSummaryFromRecords(getSalesByPeriod(period));
    }

    function formatCompactDateTime(value) {
        if (!value) return 'Sin fecha';
        const date = new Date(value);
        return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    }

    function getMonthKey(timestamp) {
        const date = new Date(timestamp);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    }

    function getMonthDate(monthKey) {
        const [year, month] = String(monthKey || '').split('-').map(Number);
        if (!year || !month) return null;
        return new Date(year, month - 1, 1);
    }

    function getMonthLabel(monthKey) {
        const date = getMonthDate(monthKey);
        if (!date) return 'mes-desconocido';
        return `mes-${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
    }

    function getMonthSales(monthKey) {
        return state.sales.filter((sale) => getMonthKey(sale.createdAt) === monthKey);
    }

    function getMonthlyReportData(monthKey) {
        const sales = getMonthSales(monthKey).sort((a, b) => Number(a.createdAt || 0) - Number(b.createdAt || 0));
        const groupedSales = getGroupedSalesFromRecords(sales);
        const summary = getSummaryFromRecords(sales);
        return {
            monthKey,
            monthLabel: getMonthLabel(monthKey),
            createdAt: sales[sales.length - 1]?.createdAt || Date.now(),
            summary,
            groupedSales
        };
    }

    function escapePdfText(value) {
        return String(value || '')
            .replace(/\\/g, '\\\\')
            .replace(/\(/g, '\\(')
            .replace(/\)/g, '\\)');
    }

    function encodePdfBinary(binary) {
        return `data:application/pdf;base64,${btoa(binary)}`;
    }

    function buildPdfFromLines(lines) {
        const maxLinesPerPage = 42;
        const pages = [];

        for (let index = 0; index < lines.length; index += maxLinesPerPage) {
            pages.push(lines.slice(index, index + maxLinesPerPage));
        }

        if (!pages.length) pages.push(['Reporte sin informacion.']);

        const objects = [];
        const pageObjectNumbers = [];
        const contentObjectNumbers = [];
        const fontObjectNumber = 3;
        let objectNumber = 4;

        pages.forEach(() => {
            pageObjectNumbers.push(objectNumber);
            objectNumber += 1;
            contentObjectNumbers.push(objectNumber);
            objectNumber += 1;
        });

        objects[1] = '<< /Type /Catalog /Pages 2 0 R >>';
        objects[2] = `<< /Type /Pages /Kids [${pageObjectNumbers.map((number) => `${number} 0 R`).join(' ')}] /Count ${pages.length} >>`;
        objects[3] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>';

        pages.forEach((pageLines, pageIndex) => {
            const pageObjectNumber = pageObjectNumbers[pageIndex];
            const contentObjectNumber = contentObjectNumbers[pageIndex];
            const textLines = pageLines.map((line) => `(${escapePdfText(line)}) Tj`).join('\nT*\n');
            const stream = `BT\n/F1 12 Tf\n40 800 Td\n14 TL\n${textLines}\nET`;
            objects[pageObjectNumber] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Resources << /Font << /F1 ${fontObjectNumber} 0 R >> >> /Contents ${contentObjectNumber} 0 R >>`;
            objects[contentObjectNumber] = `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`;
        });

        let pdf = '%PDF-1.4\n';
        const offsets = ['0000000000 65535 f '];

        for (let index = 1; index < objects.length; index += 1) {
            offsets[index] = String(pdf.length).padStart(10, '0') + ' 00000 n ';
            pdf += `${index} 0 obj\n${objects[index]}\nendobj\n`;
        }

        const xrefStart = pdf.length;
        pdf += `xref\n0 ${objects.length}\n${offsets.join('\n')}\n`;
        pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;
        return pdf;
    }

    function buildMonthlyReportLines(report) {
        const lines = [
            'Oasis - Detalle mensual de ventas',
            `Periodo: ${report.monthLabel}`,
            `Fecha de generacion: ${formatCompactDateTime(Date.now())}`,
            '',
            `Total de ventas: ${report.summary.count}`,
            `Unidades vendidas: ${report.summary.totalUnits}`,
            `Valor total: ${formatCurrency(report.summary.totalValue)}`,
            '',
            'Ranking de productos'
        ];

        if (!report.groupedSales.length) {
            lines.push('No hay ventas registradas para este mes.');
            return lines;
        }

        report.groupedSales.forEach((item, index) => {
            lines.push(
                `${index + 1}. ${item.name}`,
                `   Cantidad vendida: ${item.quantity}`,
                `   Total vendido: ${formatCurrency(item.totalValue)}`
            );
        });

        return lines;
    }

    function buildMonthlyReportPdf(monthKey) {
        const report = getMonthlyReportData(monthKey);
        const pdfBinary = buildPdfFromLines(buildMonthlyReportLines(report));
        return {
            monthKey,
            monthLabel: report.monthLabel,
            fileName: `${report.monthLabel.replace(/\s+/g, '_')}.pdf`,
            generatedAt: Date.now(),
            totalSales: report.summary.count,
            totalUnits: report.summary.totalUnits,
            totalValue: report.summary.totalValue,
            pdfDataUrl: encodePdfBinary(pdfBinary)
        };
    }

    function getReportByMonthKey(monthKey) {
        return state.salesReports.find((report) => report.monthKey === monthKey) || null;
    }

    function openReportPdf(monthKey) {
        const report = getReportByMonthKey(monthKey);
        if (!report?.pdfDataUrl) return;
        window.open(report.pdfDataUrl, '_blank', 'noopener');
    }

    function downloadReportPdf(monthKey) {
        const report = getReportByMonthKey(monthKey);
        if (!report?.pdfDataUrl) return;

        const link = document.createElement('a');
        link.href = report.pdfDataUrl;
        link.download = report.fileName || `${monthKey}.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();
    }

    function refreshReportPdf(monthKey) {
        const refreshedReport = buildMonthlyReportPdf(monthKey);
        state.salesReports = state.salesReports
            .filter((report) => report.monthKey !== monthKey)
            .concat(refreshedReport)
            .sort((a, b) => String(b.monthKey || '').localeCompare(String(a.monthKey || '')));
        helpers.saveSalesReports();
        app.renderDashboardSalesReports();
    }

    app.syncSalesReports = function syncSalesReports() {
        const monthKeys = [...new Set(state.sales.map((sale) => getMonthKey(sale.createdAt)))].sort((a, b) => b.localeCompare(a));
        state.salesReports = monthKeys.map((monthKey) => buildMonthlyReportPdf(monthKey));
        helpers.saveSalesReports();
    };

    app.renderDashboardSalesReports = function renderDashboardSalesReports() {
        const reports = [...state.salesReports].sort((a, b) => String(b.monthKey || '').localeCompare(String(a.monthKey || '')));

        if (!dom.dashboardSalesReportsList || !dom.dashboardSalesReportsEmpty) return;

        if (!reports.length) {
            dom.dashboardSalesReportsList.innerHTML = '';
            dom.dashboardSalesReportsEmpty.classList.remove('hidden');
            return;
        }

        dom.dashboardSalesReportsEmpty.classList.add('hidden');
        dom.dashboardSalesReportsList.innerHTML = reports.map((report) => `
            <article class="folder-card">
                <p class="card-enumerator">PDF mensual</p>
                <div class="folder-card__top">
                    <span class="folder-card__icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H10l2 2h6.5A2.5 2.5 0 0 1 21 9.5v7a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 16.5v-9Z" fill="currentColor" opacity=".24"/>
                            <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H10l2 2h6.5A2.5 2.5 0 0 1 21 9.5v7a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 16.5v-9Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
                        </svg>
                    </span>
                    <div>
                        <p class="folder-card__name">${helpers.escapeHtml(report.monthLabel)}</p>
                        <p class="folder-card__meta">${helpers.escapeHtml(report.totalSales)} venta(s) - ${helpers.escapeHtml(report.totalUnits)} unidad(es)</p>
                        <p class="folder-card__meta">Generado: ${helpers.escapeHtml(formatCompactDateTime(report.generatedAt))}</p>
                    </div>
                </div>
                <div class="folder-card__actions">
                    <button type="button" class="folder-link" data-action="open-dashboard-sales-report" data-month-key="${helpers.escapeHtml(report.monthKey)}">Abrir PDF</button>
                    <button type="button" class="mini-button" data-action="download-dashboard-sales-report" data-month-key="${helpers.escapeHtml(report.monthKey)}">Descargar</button>
                    <button type="button" class="mini-button" data-action="refresh-dashboard-sales-report" data-month-key="${helpers.escapeHtml(report.monthKey)}">Regenerar</button>
                </div>
            </article>
        `).join('');
    };

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
                <span>Ranking</span>
                <span>Producto</span>
                <span>Cantidad vendida</span>
                <span>Valor total</span>
            </div>
            ${groupedSales.map((item, index) => `
                <article class="sales-table__row sales-table__row--ranking">
                    <p>#${helpers.escapeHtml(index + 1)}</p>
                    <p>${helpers.escapeHtml(item.name)}</p>
                    <p>${helpers.escapeHtml(item.quantity)}</p>
                    <p>${helpers.escapeHtml(formatCurrency(item.totalValue))}</p>
                </article>
            `).join('')}
        `;
    };

    app.renderSales = function renderSales() {
        if (typeof app.syncSalesReports === 'function') app.syncSalesReports();

        const summary = getSummary(state.activeSalesPeriod);
        const groupedSales = getGroupedSales(state.activeSalesPeriod);

        app.renderSalesSummary();
        dom.salesActiveTitle.textContent = PERIOD_LABELS[state.activeSalesPeriod];
        dom.salesActiveCount.textContent = String(summary.count);
        dom.salesActiveValue.textContent = formatCurrency(summary.totalValue);
        dom.salesActiveUnits.textContent = String(summary.totalUnits);
        app.renderSalesTable(groupedSales);
        app.renderDashboardSalesReports();
    };

    dom.salesSummaryGrid?.addEventListener('click', (event) => {
        const target = event.target.closest('[data-period]');
        if (!target) return;
        state.activeSalesPeriod = target.dataset.period || 'day';
        app.renderSales();
    });

    dom.exportSalesPdfButton?.addEventListener('click', () => {
        const currentMonthReport = buildMonthlyReportPdf(getMonthKey(Date.now()));
        const link = document.createElement('a');
        link.href = currentMonthReport.pdfDataUrl;
        link.download = currentMonthReport.fileName;
        document.body.appendChild(link);
        link.click();
        link.remove();
    });

    dom.dashboardSalesReportsList?.addEventListener('click', (event) => {
        const target = event.target.closest('[data-action][data-month-key]');
        if (!target) return;

        const monthKey = target.dataset.monthKey || '';
        if (target.dataset.action === 'open-dashboard-sales-report') {
            openReportPdf(monthKey);
            return;
        }
        if (target.dataset.action === 'download-dashboard-sales-report') {
            downloadReportPdf(monthKey);
            return;
        }
        if (target.dataset.action === 'refresh-dashboard-sales-report') {
            refreshReportPdf(monthKey);
        }
    });
})();
