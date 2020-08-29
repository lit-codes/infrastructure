import { chartColors } from './colors';

export function drawRatingsOverTime(chartjs, teacherRatings) {
  if (teacherRatings !== null) {
    const labels = [];
    const bads = [];
    const goods = [];
    teacherRatings.forEach((r) => {
      labels.push(r.label.substring(0, 4));
      bads.push(r.bad);
      goods.push(r.good);
    });
    const data = {
      labels,
      datasets: [
        {
          label: 'Bad',
          data: bads,
          backgroundColor: chartColors.red,
        },
        {
          label: 'Good',
          data: goods,
          backgroundColor: chartColors.green,
        },
      ],
    };
    const chartType = 'bar';
    const contID = 'teacherBarChart';
    const options = {
      plugins: {
        // Change options for ALL labels of THIS CHART
        datalabels: {
          color: 'white',
        },
      },
      scales: {
        xAxes: [{
          stacked: true,
        }],
        yAxes: [{
          stacked: true,
        }],
      },
      // responsive: true
    };
    chartjs.drawChart(chartType, data, contID, options);
  }
}
