function teacherToDataTable(teacher) {
  return [
    ['Bad', teacher.badRatingCount],
    ['Good', teacher.goodRatingCount],
    ['Neutral', teacher.neutralRatingCount],
  ];
}

export function drawOverallRatings(googleCharts, teacher) {
    const PieChartOptions = { is3D: false, pieSliceText: 'value', slices: { 0: { color: 'darkGreen' }, 1: { color: 'green' }, 2: { color: 'blue' } } };
    if (teacher !== null) {
        const dt = teacherToDataTable(teacher);
        dt.unshift(['Rating', 'Count']);
        googleCharts.drawChart('PieChart', dt, 'chart_div', PieChartOptions);
    }
}

