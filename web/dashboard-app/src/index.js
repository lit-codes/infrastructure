import cubejs from '@cubejs-client/core';
import { loadTeacher, loadTeacherRatings } from './cubes';
import { drawUI } from './ui';

// initialize cubejs instance with API Token and API URL
const API_URL = 'http://localhost:4000';
let authPromise;

async function authenticate(url) {
  const response = await fetch(url);
  if (response.ok) {
    console.log('Authenticated!');
  } else {
    throw `Authentication failed with error: ${response.statusText}`;
  }
  const json = await response.json();
  return json.token;
}

const api = cubejs(async () => {
  // Only authenticate once
  // TODO: May need JWT token renewal
  if (authPromise) return authPromise;

  authPromise = authenticate(`${API_URL}/auth/cubejs-token`);
  return authPromise;
}, {
  apiUrl: `${API_URL}/cubejs-api/v1`,
});

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
  const teacherId = getIdFromSearchString();
  // Load teacher and ratings in parallel
  const [teacher, teacherRatings] = await Promise.all([
    loadTeacher(api, teacherId), loadTeacherRatings(api, teacherId),
  ]);
  drawUI({
    teacher,
    teacherRatings,
  });
}()).then(console.log, console.error);
