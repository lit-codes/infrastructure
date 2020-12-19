export const API_URL = document.location.origin
  .replace('ui', 'api') // Theia dev servers
  .replace('3000', '8080') // Local development

export default class API {
    async fetch(endpoint, query) {
        const queryStr = Object.keys(query).reduce((str, item) => `${str}&${item}=${query[item]}`, '');
        return fetch(`${API_URL}${endpoint}?${queryStr}`).then(resp => resp.json());
    }
    async query(query) {
        const response = await fetch(`${API_URL}/v1/graphql`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
        });
        const json = await response.json();
        return json.data;
    }
}
