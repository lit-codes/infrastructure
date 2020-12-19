export async function lineChart(query, api) {
}

export async function stackedBarChart(query, api) {
}

class ChartData {
    constructor({title, query, api}) {
        this.title = title;
        this.query = query;
        this.api = api;
    }
    onQueryChange(query) {
        return query => {
            this.query = query;
        };
    }
    async load() {
        return {};
    }
}

export class StackedBarChart extends ChartData {
    async load() {
        const queryResult = await this.api.query(this.query);
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
}

export class LineChart extends ChartData {
    async load() {
        const queryResult = await this.api.query(this.query);
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
}
