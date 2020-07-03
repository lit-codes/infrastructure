export default class GoogleCharts {
    async load() {
        if (this.googleChartsPromise) {
            return this.googleChartsPromise;
        }
        google.charts.load('current'); // Don't need to specify chart libraries!
        return this.googleChartsPromise = new Promise((resolve, reject) => {
            google.charts.setOnLoadCallback(() => {
                console.log('google charts loaded');
                resolve();
            });
        });
    }
    drawChart(type, dataTable, contId, options) {
        const wrapper = new google.visualization.ChartWrapper({
            options,
            dataTable: google.visualization.arrayToDataTable(dataTable),
            chartType: type,
            // options: {'title': 'Countries'},
            containerId: contId,
        });
        wrapper.draw();
    }
}
