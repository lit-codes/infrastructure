import Vue from 'vue'
import axios from 'axios'

const API_URL = document.location.origin
  .replace('ui', 'api') // Theia dev servers
  .replace('3000', '4000') // Local development

const axiosInstance = axios.create({
  baseURL: API_URL
})

Vue.prototype.$axios = axiosInstance
