import { generateQuery } from './teacherRatings'

class Rating {
  constructor (params) {
    Object.assign(this, params)
    this.label = this.label || ''
  }
}

function parseRatings (id, data) {
  const ratings = []
  data.forEach((d) => {
    ratings.push(new Rating({
      bad: Number(d['TeacherRatings.badRatingCount']),
      good: Number(d['TeacherRatings.count']) - Number(d['TeacherRatings.badRatingCount']),
      neutral: 0,
      label: d['TeacherRatings.timestamp'] || ratings.length.toString()
    }))
  })
  return ratings
}

export async function loadTeacherRatings (api, teacherId) {
  console.log('Req 4 ratings distribution over time')
  const response = await api.load(generateQuery(teacherId))
  console.log('Resp 4 ratings over time')
  const { data } = response.loadResponse
  if (!data.length) {
    console.error('Teacher not found!')
  }
  return parseRatings(teacherId, data)
}
