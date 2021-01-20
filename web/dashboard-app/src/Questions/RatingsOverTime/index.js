import ChartData from '../../ChartData';

export default class RatingsOverTime {
    constructor(api, teacher) {
        this.api = api;
        this.teacher = teacher;
    }
    get charts() {
        return [
            new ChartData({
                config: {
                    type: 'bar',
                },
                api: this.api,
                title: `# Ratings over time - ${this.teacher.name}`,
                query: `
query ($teacher_id: Int) {
  teacher(
    where: {id: {_eq: $teacher_id}}
  ) {
    difficulty: teacher_ratings(order_by: {timestamp: asc}) {
      x: timestamp
      y: difficulty
    }
  }
}
                `,
                variables: {teacher_id: this.teacher.id}
            }),
            new ChartData({
                api: this.api,
                config: {
                    isStacked: true,
                    type: 'bar',
                },
                title: `# Ratings good vs. bad - ${this.teacher.name}`,
                query: `
query ($teacher_id: Int) {
  hard: teacher_ratings(
    order_by: {timestamp: asc}
    where: {_and: [{teacher_id: {_eq: $teacher_id}}, {difficulty: {_gt: 3}}]}
  ) {
    x: timestamp
  }
  easy: teacher_ratings(
    order_by: {timestamp: asc}
    where: {_and: [{teacher_id: {_eq: $teacher_id}}, {difficulty: {_lte: 3}}]}
  ) {
    x: timestamp
  }
}
                `,
            variables: { teacher_id: this.teacher.id}
            }),
        ];
    }
};
