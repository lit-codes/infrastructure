export function drawRatingsOverTime(chartjs, teacherRatings) {
  if (teacherRatings !== null) {
    const labels = [];
    const bads = [];
    const goods = [];
    const neutrals = [];
    teacherRatings.forEach((r) => {
      labels.push(r.label.substring(0, 4));
      bads.push(r.bad);
      goods.push(r.good);
      neutrals.push(r.neutral);
    });
    const data = {
      labels,
      datasets: [
        // [
        {
          // type:'bar',
          label: 'Bad',
          data: bads,
          // stack: 2010,
          backgroundColor: 'darkgreen',
        },
        {
          // type: 'bar',
          label: 'Good',
          data: goods,
          // stack: 2011,
          backgroundColor: 'green',
        },
        {
          // type: 'bar',
          label: 'Neutral',
          data: neutrals,
          // stack: 2011,
          backgroundColor: 'skyblue',
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
