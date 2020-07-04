import { generateQuery } from './teacher';

class Teacher {
  constructor(options) {
    Object.assign(this, options);
    this.fullName = `${this.firstName} ${this.lastName}`;
  }
}

function parseTeacher(id, data) {
  const { 'Teacher.firstName': firstName, 'Teacher.lastName': lastName } = data[0];
  const {
    'TeacherRatings.badRatingCount': badRatingCount,
    'TeacherRatings.count': ratingCount,
  } = data[0];
  return new Teacher({
    firstName,
    lastName,
    id,
    badRatingCount,
    goodRatingCount: ratingCount - badRatingCount,
    neutralRatingCount: 0,
  });
}

export async function loadTeacher(api, teacherId) {
  console.log('Req 4 ratings distribution');
  const response = await api.load(generateQuery(teacherId));
  console.log('Resp 4 ratings');
  const { data } = response.loadResponse;
  if (!data.length) {
    throw 'Teacher not found!';
  }
  return parseTeacher(teacherId, data);
}
