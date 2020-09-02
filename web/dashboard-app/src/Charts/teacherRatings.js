import { chartColors } from './colors'

export function drawRatingsOverTime (teacherRatings) {
  if (teacherRatings !== null) {
    const labels = []
    const bads = []
    const goods = []
    teacherRatings.forEach((r) => {
      labels.push(r.label.substring(0, 4))
      bads.push(r.bad)
      goods.push(r.good)
    })
    const chartdata = {
      labels,
      datasets: [
        {
          label: 'Bad',
          data: bads,
          backgroundColor: chartColors.red
        },
        {
          label: 'Good',
          data: goods,
          backgroundColor: chartColors.purple
        }
      ]
    }
    const options = {
      plugins: {
        // Change options for ALL labels of THIS CHART
        datalabels: {
          color: 'white'
        }
      },
      scales: {
        xAxes: [{
          stacked: true
        }],
        yAxes: [{
          stacked: true
        }]
      },
      responsive: true
    }
    return {
      chartdata,
      options
    }
  }
}
