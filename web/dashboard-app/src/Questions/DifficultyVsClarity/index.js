import ChartData from '../../ChartData';

export default class DifficultyVsClarity {
    constructor(api, teacher) {
        this.api = api;
        this.teacher = teacher;
    }
    get charts() {
        return [
            new ChartData({
                config: {
                    type: 'pie',
                },
                api: this.api,
                title: `# Difficulty vs Clarity - ${this.teacher.name}`,
                query: `
                query ($teacher_id: Int) {
                  difficulty: teacher_ratings_aggregate(
                    order_by: {timestamp: asc}
                    where: {teacher_id: {_eq: $teacher_id}}
                  ) {
                    aggregate {
                      sum {
                        x: difficulty
                      }
                    }
                  }
                  clarity: teacher_ratings_aggregate(
                    order_by: {timestamp: asc}
                    where: {teacher_id: {_eq: $teacher_id}}
                  ) {
                    aggregate {
                      sum {
                        x: clarity
                      }
                    }
                  }
                }
                
                `,
                variables: { teacher_id: this.teacher.id }
            }),
        ];
    }
};
