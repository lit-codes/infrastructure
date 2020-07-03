import cubejs from '@cubejs-client/core';
import { loadTeacher, loadTeacherRatings } from './cubes';
import { drawUI } from './ui';

const API_URL = 'http://localhost:4000/cubejs-api/v1';

function getIdFromSearchString() {
    const searchString = document.location.search;
    const match = searchString.match(/\?tid=(\d+)/);
    if (!match) {
        throw 'Please set tid= in the URL';
    } else {
        return match[1];
    }
}

(async function main() {
    const api = cubejs({ apiUrl: API_URL });
    const teacherId = getIdFromSearchString();
    const teacher = await loadTeacher(api, teacherId);
    const teacherRatings = await loadTeacherRatings(api, teacherId);
    drawUI({
        teacher,
        teacherRatings
    })
})().then(console.log, console.error);
