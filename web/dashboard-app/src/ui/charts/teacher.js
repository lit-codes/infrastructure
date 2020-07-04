import { chartColors } from './colors';

export function drawOverallRatings(chartjs, teacher) {
  if (teacher !== null) {
    const chartType = 'pie';
    const data = {
      datasets: [{
        data: [teacher.badRatingCount, teacher.goodRatingCount, teacher.neutralRatingCount],
        backgroundColor: [
          chartColors.darkgreen,
          chartColors.green,
          chartColors.blue,
        ],
        label: 'Teacher1',
      }],
      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: [
        'Bad',
        'Good',
        'Neutral',
      ],
    };
    const contID = 'teacherPieChart';
    const options = {
      plugins: {
        // Change options for ALL labels of THIS CHART
        datalabels: {
          color: 'white',
        },
      },
      // responsive: true
    };
    chartjs.drawChart(chartType, data, contID, options);
  }
}
