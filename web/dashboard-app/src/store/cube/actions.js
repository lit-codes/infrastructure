import cubejs from '@cubejs-client/core'
import { API_URL } from '../../config'
import { axiosInstance } from '../../boot/axios'

export function someAction (/* context */) {
}

export async function authenticate ({ commit, dispatch }) {
  try {
    const { data } = await axiosInstance.get('/auth/cubejs-token')

    const { token } = data

    dispatch('createCubejsApi', token)
    commit('setToken', token)
  } catch (e) {
    console.log('Authentication failed with error:', e)
  }
}

export async function createCubejsApi ({ commit }, token) {
  const cubejsApi = cubejs(
    token,
    { apiUrl: API_URL + '/cubejs-api/v1' }
  )
  commit('setCubejsApi', cubejsApi)
}
