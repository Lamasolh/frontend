import Vue from 'vue'
// eslint-disable-next-line import/no-cycle
import store from '@/store'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  // baseURL: 'http://192.168.38.113:8000',
  baseURL: 'https://rdms.sawagroup.org',
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})
/*
 * Add a response interceptor
 */
axiosIns.defaults.withCredentials = true
axiosIns.interceptors.response.use(
  response => response,
  error => {
    if (
      error.response
            && [401, 419].includes(error.response.status)
            && store.getters['auth/authUser']
    ) {
      store.dispatch('auth/logout')
    }
    return Promise.reject(error)
  },
)
Vue.prototype.$http = axiosIns

export default axiosIns
