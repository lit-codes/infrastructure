export function generateQuery (id) {
  return {
    filters: [
      {
        dimension: 'Teacher.id',
        operator: 'equals',
        values: [id]
      }
    ],
    measures: ['TeacherRatings.badRatingCount', 'TeacherRatings.count'],
    timeDimensions: [{ dimension: 'TeacherRatings.timestamp' }],
    dimensions: ['Teacher.firstName', 'Teacher.lastName'],
    timezone: 'UTC'
  }
}
