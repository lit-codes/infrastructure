export async function lineChart([query], api) {
    const queryResult = await api.query(query);
    return {
            xAxis: {
                type: 'time',
            },
            yAxis: {
                type: 'value'
            },
            series: [
        {
                type: 'line',
                data: queryResult[Object.keys(queryResult)[0]].map(t => [t.x, t.y || 1]),
            }],
        };
}

export async function stackedBarChart([query], api) {
    const queryResult = await api.query(query);
    return {
        xAxis: {
            type: 'time',
        },
        yAxis: {
            type: 'value'
        },
        series: Object.keys(queryResult).map(key => {
            return {
                type: 'bar',
                stack: 'one',
                data: queryResult[key].map(t => [t.x, t.y || 1]),
            };
        })
    };
}
