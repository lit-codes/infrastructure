import Chartjs from './Chartjs';
import { drawOverallRatings, drawRatingsOverTime } from './charts';

const chartjs = new Chartjs();

export async function drawUI({ teacher, teacherRatings }) {
  // Display teacher's name
  const $teacherName = document.querySelector('#teacherName');
  const $teacherLink = document.querySelector('#teacherLink');
  $teacherName.innerText = teacher.fullName;
  $teacherLink.href = `https://www.ratemyprofessors.com/ShowRatings.jsp?tid=${teacher.id}`;

  // Draw both charts at the same time
  await Promise.all([
    drawOverallRatings(chartjs, teacher),
    drawRatingsOverTime(chartjs, teacherRatings),
  ]);
}
