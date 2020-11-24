export default class RatingsOverTime {
    constructor(...args) {
        console.log(args)
    }
    async getCharts() {
        return [{
            title: 'chart 1',
            config: {
                title: {
                    text: '# of Votes',
                },
                series: [{
                    type: 'line',
                    data: [12, 19, 3, 5, 2, 3],
                }],
            }
        }]
    }
};
