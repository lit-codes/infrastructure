import ChartData from '../../ChartData';

export default class RatingsOverTime {
    constructor(api) {
        this.api = api;
    }
    get charts() {
        // TODO: Add full name search https://hasura.io/blog/full-text-search-with-hasura-graphql-api-postgres/
        return [
            new ChartData({
                config: {
                    type: 'bar',
                },
                api: this.api,
                title: '# Ratings over time',
                query: `
query ($first_name: String, $last_name: String) {
  teacher(
    where: {_and: [{first_name: {_ilike: $first_name}}, {last_name: {_ilike: $last_name}}]}
  ) {
    difficulty: teacher_ratings(order_by: {timestamp: asc}) {
      x: timestamp
      y: difficulty
    }
  }
}
                `,
                variables: {
                    first_name: 'Penny',
                    last_name: 'Avery',
                },
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
