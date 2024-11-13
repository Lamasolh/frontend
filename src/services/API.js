/* eslint-disable import/no-cycle */
import axios from 'axios'
import store from '@/store'
import router from '@/router'

// eslint-disable-next-line import/prefer-default-export
export const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true, // required to handle the CSRF token
  timeout: 180000,
})

/*
 * Add a response interceptor
 */
apiClient.interceptors.response.use(
  response => response,
  error => {
    /* console.log(error.response.status) */

    if ((error.response.status === 401 || error.response.status === 419)
      && store.getters['auth/authUser'] != null) {
      store.dispatch('auth/logout').then(() => {
        router.go('/login')
      })
      return Promise.resolve()
    }
    return Promise.reject(error)
  },
)
