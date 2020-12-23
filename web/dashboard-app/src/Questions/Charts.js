export async function lineChart(query, api) {
}

export async function stackedBarChart(query, api) {
}

function extract(result, d) {
    if (result instanceof Array) {
        return result.map(o => extract(o, d)).filter(Boolean).reduce((old, x) => {
            if (x instanceof Array) return [...old, ...x];
            return [...old, x];
        }, []);
    } else if (result instanceof Object) {
        if (d in result) {
            return result[d];
        } else {
            for (let key in result) {
                const x = extract(result[key], d);
                if (x) return x;
            }
        }
    }
    return undefined;
}

function extractXY(result) {
    return Object.keys(result).reduce((output, key) => {
        const x = extract(result[key], 'x');
        const y = extract(result[key], 'y');
        if (y && x.length === y.length) return {
            ...output,
            [key]: x.map((d, i) => {
                return {x: d, y: y[i]};
            }),
        };
        return {
            ...output,
            [key]: x.map((d) => {
                return {x: d};
            }),
        };
    }, {});
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
    onLoad(callback) {
        this.callback = callback;
    }
    reload() {
        this.onLoad(this.callback);
    }
}

export class StackedBarChart extends ChartData {
    onLoad(callback) {
        this.callback = callback;
        this.api.query({query: this.query}).then(({data: result}) => {
            const data = extractXY(result);
            callback({
                xAxis: {
                    type: 'time',
                },
                yAxis: {
                    type: 'value'
                },
                series: Object.keys(data).map(key => {
                    return {
                        type: 'bar',
                        stack: 'one',
                        data: data[key].map(t => [t.x, t.y || 1]),
                    };
                })
            });
        }).catch(console.error);
    }
}

export class LineChart extends ChartData {
    onLoad(callback) {
        this.callback = callback;
        this.api.query({query: this.query}).then(({data: result}) => {
            const data = extractXY(result);
            callback({
                xAxis: {
                    type: 'time',
                },
                yAxis: {
                    type: 'value'
                },
                series: Object.keys(data).map(key => {
                    return {
                        type: 'line',
                        data: data[key].map(t => [t.x, t.y || 1]),
                    };
                })
            });
        }).catch(console.error);
    }
}
