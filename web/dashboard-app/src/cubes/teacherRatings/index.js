import { generateQuery } from './teacherRatings';

class Rating {
  constructor(params) {
      Object.assign(this, params);
      this.label = this.label || '';
  }
}

function parseRatings(id, data) {
  const ratings = [];
  data.forEach((d) => {
    ratings.push(new Rating({
        bad: Number(d['TeacherRatings.badRatingCount']),
        good: Number(d['TeacherRatings.count']) - Number(d['TeacherRatings.badRatingCount']),
        neutral: 0,
        label: d['TeacherRatings.timestamp'] || ratings.length.toString(),
    }));
  });
  return ratings;
}

export async function loadTeacherRatings(api, teacherId) {
    const response = await api.load(generateQuery(teacherId));
    const data = response.loadResponse.data;
    if (!data.length) {
      throw 'Teacher not found!'
    }
    return parseRatings(teacherId, data);
}
