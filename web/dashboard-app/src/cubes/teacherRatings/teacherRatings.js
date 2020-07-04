export function generateQuery(id) {
  return {
    filters: [{ dimension: 'Teacher.id', operator: 'equals', values: [id] }], timeDimensions: [{ dimension: 'TeacherRatings.timestamp', granularity: 'year' }], measures: ['TeacherRatings.badRatingCount', 'TeacherRatings.count'], timezone: 'UTC', dimensions: [],
  };
}
