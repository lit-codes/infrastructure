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

export function retakeQuery (id) {
  return {
    measures: ['TeacherRatings.retakeWorthyCount'],
    timeDimensions: [
      {
        dimension: 'TeacherRatings.adminReviewTimestamp',
        dateRange: 'Last year'
      }
    ],
    timezone: 'UTC',
    dimensions: [],
    filters: [
      {
        dimension: 'Teacher.teacherId',
        operator: 'equals',
        values: [id]
      }
    ]
  }
}
