import GoogleCharts from './GoogleCharts';
import { drawOverallRatings, drawRatingsOverTime } from './charts';

const googleCharts = new GoogleCharts();
const googleChartsPromise = googleCharts.load();
export async function drawUI({ teacher, teacherRatings }) {
    // Display teacher's name
    teacherName.innerText = teacher.fullName
    teacherLink.href = `https://www.ratemyprofessors.com/ShowRatings.jsp?tid=${teacher.id}`;

    await googleChartsPromise;
    // Draw both charts at the same time
    await Promise.all([
        drawOverallRatings(googleCharts, teacher),
        drawRatingsOverTime(googleCharts, teacherRatings),
    ]);
}
