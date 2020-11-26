import { lineChart, stackedBarChart } from '../Charts';

export default class RatingsOverTime {
    constructor(api) {
        this.api = api;
    }
    get charts() {
        return [{
            title: '# Ratings over time',
            loadPromise: lineChart`
{
  values: teacher_ratings (where: {teacher_id: {_eq: 407}}){
    x: timestamp
  }
}
${this.api}
            `,
        }, {
            title: '# Ratings good vs. bad',
            loadPromise: stackedBarChart`
{
  hard: teacher_ratings(where: {_and:[{teacher_id:{_eq: 407}},{difficulty:{_gt:3}}] }) {
    x: timestamp
  }
  easy: teacher_ratings(where: {_and:[{teacher_id:{_eq: 407}},{difficulty:{_lte:3}}] }) {
    x: timestamp
  }
}
${this.api}
            `,
        }]
    }
};
