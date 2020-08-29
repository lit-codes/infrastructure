import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default class Chartjs {
  drawChart(type, data, contId, options) {
    const ctx = document.getElementById(contId).getContext('2d');
    return new Chart(ctx, {
      plugins: [ChartDataLabels],
      type,
      data,
      options,
    });
  }
}
