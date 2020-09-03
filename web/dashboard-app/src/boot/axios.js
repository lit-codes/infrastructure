import Vue from 'vue'
import axios from 'axios'
import { API_URL } from '../config.js'

const axiosInstance = axios.create({
  baseURL: API_URL
})

Vue.prototype.$axios = axiosInstance

export { axiosInstance }
