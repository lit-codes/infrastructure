import { chartColors } from './colors'

export function drawOverallRatings (teacher) {
  if (teacher !== null) {
    const chartdata = {
      datasets: [{
        data: [teacher.badRatingCount, teacher.goodRatingCount],
        backgroundColor: [
          chartColors.red,
          chartColors.purple
        ],
        label: 'Teacher'
      }],
      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: [
        'Bad',
        'Good'
      ]
    }
    const options = {
      plugins: {
        // Change options for ALL labels of THIS CHART
        datalabels: {
          color: 'white'
        }
      }
      // responsive: true
    }
    return {
      chartdata,
      options
    }
  }
}
