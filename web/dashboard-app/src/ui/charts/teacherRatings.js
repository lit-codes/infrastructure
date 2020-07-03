function teacherRatingsToDataTable(teacherRatings) {
  const data = [['Quality', 'Bad', 'Good', 'Neutral']];
  teacherRatings.forEach((r) => {
    data.push([r.label.substring(0, 4), r.bad, r.good, r.neutral]);
  });
  // ['Bad', teacher.bad],
  // ['Good', teacher.good],
  // ['Neutral', teacher.neutral],
  return data;
}

export function drawRatingsOverTime(googleCharts, teacherRatings) {
  const ColumnChartOptions = { is3D: false, isStacked: true, slices: { 0: { color: 'darkGreen' }, 1: { color: 'green' }, 2: { color: 'blue' } } };
  if (teacherRatings !== null) {
    const dt2 = teacherRatingsToDataTable(teacherRatings);
    // dt2.unshift(['Rating', 'Count']);
    googleCharts.drawChart('ColumnChart', dt2, 'chart_div2', ColumnChartOptions);
  }
}
