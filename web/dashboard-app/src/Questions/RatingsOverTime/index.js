export default class RatingsOverTime {
    constructor(api) {
        this.api = api;
    }
    async getRatingsOverTime() {
        const ratings = await this.api.fetch('/RatingsOverTime', {teacher: 407});
        return {
            xAxis: {
                type: 'time',
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                type: 'line',
                data: ratings.map(t => [t.t, t.count]),
            }],
        };
    }
    async getRatingsOverTimeDetailed() {
        const ratings = await this.api.fetch('/RatingsOverTimeDetailed', {teacher: 407});
        console.log(ratings);
        return {
            xAxis: {
                type: 'time',
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                type: 'bar',
                stack: 'one',
                data: ratings.map(t => [t.t, t.easy]),
            }, {
                type: 'bar',
                stack: 'one',
                data: ratings.map(t => [t.t, t.hard]),
            }],
        };
    }
    get charts() {
        return [{
            title: '# Ratings over time',
            loadPromise: this.getRatingsOverTime(),
        }, {
            title: '# Ratings good vs. bad',
            loadPromise: this.getRatingsOverTimeDetailed(),
        }]
    }
};
