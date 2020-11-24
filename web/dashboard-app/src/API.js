export const API_URL = document.location.origin
  .replace('ui', 'api') // Theia dev servers
  .replace('3000', '4000') // Local development

export default class API {
    async fetch(endpoint, query) {
        const queryStr = Object.keys(query).reduce((str, item) => `${str}&${item}=${query[item]}`, '');
        return fetch(`${API_URL}${endpoint}?${queryStr}`).then(resp => resp.json());
    }
}