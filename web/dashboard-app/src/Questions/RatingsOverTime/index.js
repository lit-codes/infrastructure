import ChartData from '../../ChartData';

export default class RatingsOverTime {
    constructor(api) {
        this.api = api;
    }
    get charts() {
        return [
            new ChartData({
                config: {
                    type: 'bar',
                },
                api: this.api,
                title: '# Ratings over time',
                query: `
{
  difficulty: teacher_ratings(
    where: {teacher_id: {_eq: 407}}
    order_by: {timestamp: asc}
  ) {
    x: timestamp
    y: difficulty
  }
}
                `,
            }),
            new ChartData({
                api: this.api,
                config: {
                    isStacked: true,
                    type: 'bar',
                },
                title: '# Ratings good vs. bad',
                query: `
{
  hard: teacher_ratings(
    order_by: {timestamp: asc}
    where: {_and: [{teacher_id: {_eq: 407}}, {difficulty: {_gt: 3}}]}
  ) {
    x: timestamp
  }
  easy: teacher_ratings(
    order_by: {timestamp: asc}
    where: {_and: [{teacher_id: {_eq: 407}}, {difficulty: {_lte: 3}}]}
  ) {
    x: timestamp
  }
}
                `,
            }),
        ];
    }
};
