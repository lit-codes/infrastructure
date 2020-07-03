/* jshint esversion: 8 */
/* jshint undef:true */

import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import cubejs, { ResultSet } from '@cubejs-client/core';

// let apiTokenPromise;

// const cubejsApi = cubejs(() => {
//   if (!apiTokenPromise) {
//     apiTokenPromise = fetch(`${API_URL}/auth/cubejs-token`)
//       .then(res => res.json()).then(r => r.token)
//   }
//   return apiTokenPromise;
// }, {
//   apiUrl: `${API_URL}/cubejs-api/v1`
// });

// initialize cubejs instance with API Token and API URL
const API_URL = 'http://localhost:4000/cubejs-api/v1';
const cubejsApi = cubejs(
  // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1Ijp7InVzZXIiOiJhZG1pbiJ9LCJpYXQiOjE1OTM1MTQ3MjMsImV4cCI6MTU5MzYwMTEyM30.0J4KzOolijaosMbW44t_Gq5LJZZBmWRoFwv4q6yG4mI',
  // fetch(`${API_URL}/auth/cubejs-token`)
  //   .then(res => res.json()).then(r => {
  //     console.log(r.token);
  //     return r.token
  //   }),
  { apiUrl: `${API_URL}` },
);

let googleChartsLoaded = false;
(async function () {
  // setTimeout(() => {
  google.charts.load('current'); // Don't need to specify chart libraries!
  google.charts.setOnLoadCallback(() => {
    googleChartsLoaded = true;
    console.log('google charts loaded');
  });
  // google.charts.setOnLoadCallback(drawVisualization);
  // cubejsApi.load(generateJSONQueryForTeacher('Gerald', 'Baydo')).then(resultSet => {
  //   rst = resultSet;
  //   console.log(rst.loadResponse.data);
  // });
  // let rs = await cubejsApi.load({ measures: ['Department.count'] });
  // console.log(rs);
  //   .then(resultSet => {
  //   alert('Done');
  // });
  // }, 8000);
}());

class Rating {
  constructor(bad, good, neutral, label) {
    this.bad = bad;
    this.good = good;
    this.neutral = neutral;
    this.label = label || '';
  }
}

class Teacher {
  constructor(name, ratings) {
    this.name = name;
    // this.bad = bad;
    // this.good = good;
    // this.neutral = neutral;
    this.ratings = ratings || [];
  }
}

// var teacher = new Teacher('Teacher1', 7, 3, 13);
function generateJSONQueryForTeacher(firstName, lastName) {
  const q = {
    filters: [{ dimension: 'Teacher.firstName', operator: 'equals', values: [firstName] }, { dimension: 'Teacher.lastName', operator: 'equals', values: [lastName] }], measures: ['TeacherRatings.badRatingCount', 'TeacherRatings.count', 'TeacherRatings.badRatingPercentage'], timeDimensions: [{ dimension: 'TeacherRatings.timestamp' }], dimensions: ['Teacher.firstName', 'Teacher.lastName'], timezone: 'UTC',
  };
  return q;
}

function generateJSONQueryForTeacherRatingOverTime(firstName, lastName) {
  const q = {
    filters: [{ dimension: 'Teacher.firstName', operator: 'equals', values: [firstName] }, { dimension: 'Teacher.lastName', operator: 'equals', values: [lastName] }], timeDimensions: [{ dimension: 'TeacherRatings.timestamp', granularity: 'year' }], measures: ['TeacherRatings.badRatingCount', 'TeacherRatings.count'], timezone: 'UTC', dimensions: [],
  };
  return q;
}

// function generateQueryForTeacher(firstName, lastName) {
//   const t = generateJSONQueryForTeacher(firstName, lastName);
//   return `https://rmp.lit.codes/cubejs-api/v1/load?query=${JSON.stringify(t)}`;
// }

// const tfr = {
//   query: {
//     filters: [{ dimension: 'Teacher.firstName', operator: 'equals', values: ['Gerald'] }, { dimension: 'Teacher.lastName', operator: 'equals', values: ['Baydo'] }], measures: ['TeacherRatings.badRatingCount', 'TeacherRatings.count', 'TeacherRatings.badRatingPercentage'], timeDimensions: [{ dimension: 'TeacherRatings.timestamp' }], dimensions: ['Teacher.firstName', 'Teacher.lastName'], timezone: 'UTC',
//   },
//   data: [{
//     'Teacher.firstName': 'Gerald', 'Teacher.lastName': 'Baydo', 'TeacherRatings.badRatingCount': '169', 'TeacherRatings.count': '169', 'TeacherRatings.badRatingPercentage': '1',
//   }],
//   lastRefreshTime: '2020-06-21T15:17:33.811Z',
//   annotation: {
//     measures: {
//       'TeacherRatings.badRatingCount': { title: 'Teacher Ratings Bad Rating Count', shortTitle: 'Bad Rating Count', type: 'number' },
//       'TeacherRatings.count': { title: 'Teacher Ratings Count', shortTitle: 'Count', type: 'number' },
//       'TeacherRatings.badRatingPercentage': {
//         title: 'Teacher Ratings Bad Rating Percentage', shortTitle: 'Bad Rating Percentage', type: 'number', format: 'percent',
//       },
//     },
//     dimensions: { 'Teacher.firstName': { title: 'Teacher First Name', shortTitle: 'First Name', type: 'string' }, 'Teacher.lastName': { title: 'Teacher Last Name', shortTitle: 'Last Name', type: 'string' } },
//     segments: {},
//     timeDimensions: {},
//   },
// };

// const tfrot = {
//   query: {
//     filters: [{ dimension: 'Teacher.firstName', operator: 'equals', values: ['Gerald'] }, { dimension: 'Teacher.lastName', operator: 'equals', values: ['Baydo'] }], timeDimensions: [{ dimension: 'TeacherRatings.timestamp', granularity: 'year' }], measures: ['TeacherRatings.badRatingCount', 'TeacherRatings.count'], timezone: 'UTC', dimensions: [],
//   },
//   data: [{
//     'TeacherRatings.timestamp.year': '2001-01-01T00:00:00.000', 'TeacherRatings.timestamp': '2001-01-01T00:00:00.000', 'TeacherRatings.badRatingCount': '3', 'TeacherRatings.count': '3',
//   }, {
//     'TeacherRatings.timestamp.year': '2002-01-01T00:00:00.000', 'TeacherRatings.timestamp': '2002-01-01T00:00:00.000', 'TeacherRatings.badRatingCount': '13', 'TeacherRatings.count': '13',
//   }, {
//     'TeacherRatings.timestamp.year': '2003-01-01T00:00:00.000', 'TeacherRatings.timestamp': '2003-01-01T00:00:00.000', 'TeacherRatings.badRatingCount': '27', 'TeacherRatings.count': '27',
//   }, {
//     'TeacherRatings.timestamp.year': '2004-01-01T00:00:00.000', 'TeacherRatings.timestamp': '2004-01-01T00:00:00.000', 'TeacherRatings.badRatingCount': '14', 'TeacherRatings.count': '14',
//   }, {
//     'TeacherRatings.timestamp.year': '2005-01-01T00:00:00.000', 'TeacherRatings.timestamp': '2005-01-01T00:00:00.000', 'TeacherRatings.badRatingCount': '22', 'TeacherRatings.count': '22',
//   }, {
//     'TeacherRatings.timestamp.year': '2006-01-01T00:00:00.000', 'TeacherRatings.timestamp': '2006-01-01T00:00:00.000', 'TeacherRatings.badRatingCount': '15', 'TeacherRatings.count': '15',
//   }, {
//     'TeacherRatings.timestamp.year': '2007-01-01T00:00:00.000', 'TeacherRatings.timestamp': '2007-01-01T00:00:00.000', 'TeacherRatings.badRatingCount': '13', 'TeacherRatings.count': '13',
//   }, {
//     'TeacherRatings.timestamp.year': '2008-01-01T00:00:00.000', 'TeacherRatings.timestamp': '2008-01-01T00:00:00.000', 'TeacherRatings.badRatingCount': '7', 'TeacherRatings.count': '7',
//   }, {
//     'TeacherRatings.timestamp.year': '2009-01-01T00:00:00.000', 'TeacherRatings.timestamp': '2009-01-01T00:00:00.000', 'TeacherRatings.badRatingCount': '4', 'TeacherRatings.count': '4',
//   }, {
//     'TeacherRatings.timestamp.year': '2010-01-01T00:00:00.000', 'TeacherRatings.timestamp': '2010-01-01T00:00:00.000', 'TeacherRatings.badRatingCount': '3', 'TeacherRatings.count': '3',
//   }, {
//     'TeacherRatings.timestamp.year': '2011-01-01T00:00:00.000', 'TeacherRatings.timestamp': '2011-01-01T00:00:00.000', 'TeacherRatings.badRatingCount': '6', 'TeacherRatings.count': '6',
//   }, {
//     'TeacherRatings.timestamp.year': '2012-01-01T00:00:00.000', 'TeacherRatings.timestamp': '2012-01-01T00:00:00.000', 'TeacherRatings.badRatingCount': '3', 'TeacherRatings.count': '3',
//   }, {
//     'TeacherRatings.timestamp.year': '2014-01-01T00:00:00.000', 'TeacherRatings.timestamp': '2014-01-01T00:00:00.000', 'TeacherRatings.badRatingCount': '6', 'TeacherRatings.count': '6',
//   }, {
//     'TeacherRatings.timestamp.year': '2015-01-01T00:00:00.000', 'TeacherRatings.timestamp': '2015-01-01T00:00:00.000', 'TeacherRatings.badRatingCount': '3', 'TeacherRatings.count': '3',
//   }, {
//     'TeacherRatings.timestamp.year': '2016-01-01T00:00:00.000', 'TeacherRatings.timestamp': '2016-01-01T00:00:00.000', 'TeacherRatings.badRatingCount': '8', 'TeacherRatings.count': '8',
//   }, {
//     'TeacherRatings.timestamp.year': '2017-01-01T00:00:00.000', 'TeacherRatings.timestamp': '2017-01-01T00:00:00.000', 'TeacherRatings.badRatingCount': '4', 'TeacherRatings.count': '4',
//   }, {
//     'TeacherRatings.timestamp.year': '2018-01-01T00:00:00.000', 'TeacherRatings.timestamp': '2018-01-01T00:00:00.000', 'TeacherRatings.badRatingCount': '7', 'TeacherRatings.count': '7',
//   }, {
//     'TeacherRatings.timestamp.year': '2019-01-01T00:00:00.000', 'TeacherRatings.timestamp': '2019-01-01T00:00:00.000', 'TeacherRatings.badRatingCount': '9', 'TeacherRatings.count': '9',
//   }, {
//     'TeacherRatings.timestamp.year': '2020-01-01T00:00:00.000', 'TeacherRatings.timestamp': '2020-01-01T00:00:00.000', 'TeacherRatings.badRatingCount': '2', 'TeacherRatings.count': '2',
//   }],
//   lastRefreshTime: '2020-06-22T13:29:23.950Z',
//   annotation: {
//     measures: { 'TeacherRatings.badRatingCount': { title: 'Teacher Ratings Bad Rating Count', shortTitle: 'Bad Rating Count', type: 'number' }, 'TeacherRatings.count': { title: 'Teacher Ratings Count', shortTitle: 'Count', type: 'number' } }, dimensions: {}, segments: {}, timeDimensions: { 'TeacherRatings.timestamp.year': { title: 'Teacher Ratings Timestamp', shortTitle: 'Timestamp', type: 'time' }, 'TeacherRatings.timestamp': { title: 'Teacher Ratings Timestamp', shortTitle: 'Timestamp', type: 'time' } },
//   },
// };

function parseTeacher(response) {
  const ratings = [];
  response.data.forEach((d) => {
    ratings.push(new Rating(
      Number(d['TeacherRatings.badRatingCount']),
      Number(d['TeacherRatings.count']) - Number(d['TeacherRatings.badRatingCount']),
      0,
      d['TeacherRatings.timestamp'] || ratings.length.toString(),
    ));
  });
  return new Teacher(`${response.query.filters[0].values[0]} ${response.query.filters[1].values[0]}`, ratings);
}

// let teacher1 = null;
// let teacher2 = null;

function loadTeacherDataFromCube() {
  (async () => {
    console.log('Req 4 ratings distribution');
    const rs1 = await cubejsApi.load(generateJSONQueryForTeacher('Gerald', 'Baydo'));
    {
      console.log('Resp 4 ratings');
      const teacher1 = parseTeacher(rs1.loadResponse);
      // drawPieChartForTeacher(teacher1);
      drawPieChartForTeacherChartJS(teacher1);
    }
  })();
  (async () => {
    console.log('Req 4 ratings distribution over time');
    const rs2 = await cubejsApi.load(generateJSONQueryForTeacherRatingOverTime('Gerald', 'Baydo'));
    {
      console.log('Resp 4 ratings over time');
      const teacher2 = parseTeacher(rs2.loadResponse);
      // drawBarCHartForTeacher(teacher2);
      drawBarChartForTeacherChartJS(teacher2);
    }
  })();
}

loadTeacherDataFromCube();

// function loadTeacherData() {
//   const xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function () {
//     if (this.readyState === 4 && this.status === 200) {
//       // Typical action to be performed when the document is ready:
//       // document.getElementById("demo").innerHTML = xhttp.responseText;
//       teacher1 = parseTeacher(xhttp.responseText);
//       drawVisualization();
//     }
//   };
//   const q = generateQueryForTeacher('Gerald', 'Baydo');
//   xhttp.open('GET', q, true);
//   xhttp.send();
// }

function teacherRatingsToDataTable(teacher) {
  return [
    ['Bad', teacher.ratings[0].bad],
    ['Good', teacher.ratings[0].good],
    ['Neutral', teacher.ratings[0].neutral],
  ];
}

function teacherRatingsOverTimeToDataTable(teacher) {
  const data = [['Quality', 'Bad', 'Good', 'Neutral']];
  teacher.ratings.forEach((r) => {
    data.push([r.label.substring(0, 4), r.bad, r.good, r.neutral]);
  });
  // ['Bad', teacher.bad],
  // ['Good', teacher.good],
  // ['Neutral', teacher.neutral],
  return data;
}

// var tfr = { "query": { "filters": [{ "dimension": "Teacher.firstName", "operator": "equals", "values": ["Danielle"] }, { "dimension": "Teacher.lastName", "operator": "equals", "values": ["Brown"] }], "measures": ["TeacherRatings.badRatingCount", "TeacherRatings.count"], "timeDimensions": [{ "dimension": "TeacherRatings.timestamp" }], "dimensions": ["Teacher.firstName", "Teacher.lastName"], "timezone": "UTC" }, "data": [{ "Teacher.firstName": "Danielle", "Teacher.lastName": "Brown", "TeacherRatings.badRatingCount": "103", "TeacherRatings.count": "103" }], "lastRefreshTime": "2020-06-21T13:48:28.835Z", "annotation": { "measures": { "TeacherRatings.badRatingCount": { "title": "Teacher Ratings Bad Rating Count", "shortTitle": "Bad Rating Count", "type": "number" }, "TeacherRatings.count": { "title": "Teacher Ratings Count", "shortTitle": "Count", "type": "number" } }, "dimensions": { "Teacher.firstName": { "title": "Teacher First Name", "shortTitle": "First Name", "type": "string" }, "Teacher.lastName": { "title": "Teacher Last Name", "shortTitle": "Last Name", "type": "string" } }, "segments": {}, "timeDimensions": {} } };

async function waitForGoogleCharts() {
  while (true) {
    if (googleChartsLoaded) {
      return;
    }
    // console.log('not ready');
    // await null; // prevents app from hanging
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
}

async function drawChart(type, dataTable, contId, options) {
  await waitForGoogleCharts();
  const wrapper = new google.visualization.ChartWrapper({
    options,
    dataTable: google.visualization.arrayToDataTable(dataTable),
    chartType: type,
    // options: {'title': 'Countries'},
    containerId: contId,
  });
  wrapper.draw();
}

function drawPieChartForTeacher(teacher1) {
  const PieChartOptions = { is3D: false, pieSliceText: 'value', slices: { 0: { color: 'darkGreen' }, 1: { color: 'green' }, 2: { color: 'blue' } } };
  if (teacher1 !== null) {
    const dt = teacherRatingsToDataTable(teacher1);
    dt.unshift(['Rating', 'Count']);
    drawChart('PieChart', dt, 'chart_div', PieChartOptions);
  }
}

function drawBarCHartForTeacher(teacher2) {
  const ColumnChartOptions = { is3D: false, isStacked: true, slices: { 0: { color: 'darkGreen' }, 1: { color: 'green' }, 2: { color: 'blue' } } };
  if (teacher2 !== null) {
    const dt2 = teacherRatingsOverTimeToDataTable(teacher2);
    // dt2.unshift(['Rating', 'Count']);
    drawChart('ColumnChart', dt2, 'chart_div2', ColumnChartOptions);
  }
}

window.chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'green',
  darkgreen: 'darkgreen',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
};

function drawPieChartForTeacherChartJS(teacher) {
  const data = {
    datasets: [{
      data: [teacher.ratings[0].bad, teacher.ratings[0].good, teacher.ratings[0].neutral],

      backgroundColor: [
        window.chartColors.darkgreen,
        window.chartColors.green,
        window.chartColors.blue,
      ],
      label: 'Teacher1'
    }],
    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
      'Bad',
      'Good',
      'Neutral'
    ]
  };

  const ctx = document.getElementById('teacherPieChart').getContext('2d');

  const myChart = new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: 'pie',
    data,
    options: {
      plugins: {
        // Change options for ALL labels of THIS CHART
        datalabels: {
          color: 'white',
        },
      },
      // responsive: true
    },
  });
}

function drawBarChartForTeacherChartJS(teacher) {
  const ctx = document.getElementById('teacherBarChart').getContext('2d');
  let labels = [];
  let bads = [];
  let goods = [];
  let neutrals = [];
  teacher.ratings.forEach((r) => {
    labels.push(r.label.substring(0, 4));
    bads.push(r.bad);
    goods.push(r.good);
    neutrals.push(r.neutral);
    // data.push([r.label.substring(0, 4), r.bad, r.good, r.neutral]);
  });
  const myChart = new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: 'bar',
    // data: [[5, 6], [7, 8]],
    data: {
      labels: labels,
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
          backgroundColor: 'green'
        },
        {
          // type: 'bar',
          label: 'Neutral',
          data: neutrals,
          // stack: 2011,
          backgroundColor: 'skyblue'
        },
      ]
    },
    options: {
      plugins: {
        // Change options for ALL labels of THIS CHART
        datalabels: {
          color: 'white',
        },
      },
      scales: {
        xAxes: [{
          stacked: true
        }],
        yAxes: [{
          stacked: true
        }]
      }
      // responsive: true
    },
  });
}
