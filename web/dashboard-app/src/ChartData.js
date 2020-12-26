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

const transformers = {
    default({data: result}, {type, isStacked}) {
        const data = Object.keys(result).reduce((output, key) => {
            const x = extract(result[key], 'x');
            const y = extract(result[key], 'y');
            if (!(x instanceof Array)) return { [key]: [] };
            if (y && x.length === y.length) return {
                ...output,
                [key]: x.map((d, i) => {
                    return [d, y[i]];
                }),
            };
            return {
                ...output,
                [key]: x.map((d) => {
                    return [d, 1];
                }),
            };
        }, {});
        return {
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'time',
            },
            yAxis: {
                type: 'value'
            },
            dataZoom: [
                {
                    type: 'inside'
                }
            ],
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                top: '5%',
                containLabel: true
            },
            series: Object.keys(data).map(key => {
                const output =  {
                    name: key,
                    type,
                    data: data[key],
                };
                if (isStacked) {
                    output.stack = 'yes';
                }
                return output;
            }),
        };
    },
    pie({data: result}, config) {
        const data = Object.keys(result).map((key) => {
            const x = extract(result[key], 'x');
            if (x instanceof Array || x instanceof Object) return {};

            return { name: key, value: x };
        });
        return {
            series: [
                {
                    type: 'pie',
                    data,
                },
            ],
        };
    },
};

export default class ChartData {
    constructor({config, title, query, api}) {
        this.config = config;
        this.title = title;
        this.query = query;
        this.api = api;
    }
    update({config, query}) {
        this.config = {
            ...this.config,
            ...config
        };
        this.query = query || this.query;
        this.updateChart();
    }
    onQueryChange(query) {
        this.query = query;
    }
    onDataChange(callback) {
        this.callback = callback;
        this.requestData().then(result => this.updateData(result)).catch(console.error);
    }
    requestData() {
        return this.api.query({query: this.query});
    }
    reload() {
        this.onDataChange(this.callback);
    }
    updateData(result) {
        this.queryResult = result;
        this.updateChart();
    }
    updateChart() {
        const transformer = transformers[this.config.type] || transformers.default;
        this.data = transformer(this.queryResult, this.config);
        this.callback(this.data);
    }
}

