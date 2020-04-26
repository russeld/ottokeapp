import Vue from 'vue'
import qs from 'qs'
import axios from 'axios'

axios.defaults.baseURL = process.env.DEV ? 'http://localhost:8000/' : process.env.BASE_URL

axios.defaults.paramsSerializer = params => {
  return qs.stringify(params, { arrayFormat: 'repeat' })
}

Vue.prototype.$axios = axios
