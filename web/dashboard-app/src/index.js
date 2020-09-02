import cubejs from '@cubejs-client/core';
import { loadTeacher, loadTeacherRatings } from './cubes';
import { drawUI } from './ui';

// Hack for development, change UI address to API
const API_URL = document.location.origin
    .replace('ui', 'api')     // Theia dev servers
    .replace('3000', '4000'); // Local development
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

// Initialize cubejs instance with API Token and API URL
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
    // Default to Andrew Ng
    document.location.search = 'tid=545784';
    return undefined;
  }
  return match[1];
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
