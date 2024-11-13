// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'
import Echo from 'laravel-echo'
import axios from 'axios'

export default {
  logout() {
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/logout')
        .then(() => {
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  getAuthUser(context) {
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('api/users/auth')
        .then(resp => {
          console.log(resp)
          if (resp.status === 200) {
            context.commit('SET_USER', resp.data.data)
            // eslint-disable-next-line global-require
            // Navigation list
            JSON.parse(resp.data.data.nav[0].outtext).forEach(
              element => {
                context.commit(
                  'nav/ADD_NAVLIST',
                  { data: element },
                  { root: true },
                )
              },
            )
            // Refferral
            context.commit(
              'global/ADD_ALL_REF',
              { data: resp.data.data.referralOption },
              { root: true },
            )
            // Governorate
            const gov = resp.data.data.governorateOption
            context.commit(
              'global/ADD_ALL_GOV',
              { data: gov },
              { root: true },
            )
            // District
            context.commit(
              'global/ADD_ALL_DIS',
              { data: resp.data.data.districtOption },
              { root: true },
            )
            // Municipality
            context.commit(
              'global/ADD_ALL_MUN',
              { data: resp.data.data.municipalityOption },
              { root: true },
            )
            // Type
            context.commit(
              'global/ADD_ALL_TYPE',
              { data: resp.data.data.typeOption },
              { root: true },
            )
            // Nationality
            context.commit(
              'global/ADD_ALL_NAT',
              { data: resp.data.data.nationalityOption },
              { root: true },
            )
            // Priority
            context.commit(
              'global/ADD_ALL_PRI',
              { data: resp.data.data.priority },
              { root: true },
            )
            // Gender
            context.commit(
              'global/ADD_ALL_GEN',
              { data: resp.data.data.genderOp },
              { root: true },
            )
            // Gender
            context.commit(
              'global/ADD_ALL_CAR',
              { data: resp.data.data.caregiverOp },
              { root: true },
            )
            context.commit(
              'global/ADD_ALL_DLV_STATUS',
              { data: resp.data.data.delivery_statusOp },
              { root: true },
            )
            context.commit(
              'global/ADD_ALL_DEC',
              { data: resp.data.data.decisionOp },
              { root: true },
            )
            context.commit(
              'global/ADD_ALL_JOB',
              { data: resp.data.data.job_titleOp },
              { root: true },
            )
            context.commit(
              'global/ADD_ALL_PCR_RES',
              { data: resp.data.data.pcr_resultOp },
              { root: true },
            )
            context.commit(
              'global/ADD_ALL_FAM_REL',
              { data: resp.data.data.family_relation },
              { root: true },
            )
            context.commit(
              'global/ADD_ALL_INV_WAR',
              { data: resp.data.data.inv_warehouseOp },
              { root: true },
            )
            context.commit(
              'global/ADD_ALL_EMP_TYP',
              { data: resp.data.data.employmentOp },
              { root: true },
            )
            context.commit(
              'global/ADD_ALL_PHON_ISSU',
              { data: resp.data.data.phn_issues },
              { root: true },
            )
            context.commit(
              'global/ADD_ALL_STATUS',
              { data: resp.data.data.user_status },
              { root: true },
            )
            // Org Type & status
            context.commit(
              'global/ADD_ALL_ORG_TYPE',
              { data: resp.data.data.organizationOp },
              { root: true },
            )
            context.commit(
              'global/ADD_ALL_ORG_STATUS',
              { data: resp.data.data.organizationSt },
              { root: true },
            )
            // context.commit('global/ADD_ICONS', { data: resp.data.data.icons }, { root: true })
            // context.commit('global/ADD_PRO_TYPE', { data: resp.data.data.proj_type }, { root: true })
            context.commit(
              'global/ADD_ALL_FEEDBACK',
              { data: resp.data.data.feedback },
              { root: true },
            )
            context.commit(
              'global/ADD_ALL_ROLE_PRJ',
              { data: resp.data.data.rolesProject },
              { root: true },
            )
            context.commit(
              'global/ADD_ALL_CHECK',
              { data: resp.data.data.check },
              { root: true },
            )

            const b = resp.data.data.notification.reverse()
            b.forEach(element => {
              const el = JSON.parse(element.data)
              context.commit(
                'notify/SET_NOT',
                {
                  id: element.id,
                  title: el.data.title,
                  subtitle: el.data.subtitle,
                  title_ar: el.data.title_ar,
                  subtitle_ar: el.data.subtitle_ar,
                  type: el.data.type,
                  avatar:
                                        el.data.action == null
                                          ? 'InfoIcon'
                                          : 'FramerIcon',
                  priority: el.data.priority,
                  action: el.data.action,
                  badge: el.data.badge,
                  read: element.read_at != null,
                  time: element.created_at,
                },
                { root: true },
              )
            })
            context.commit(
              'global/ADD_ALL_ORGData',
              { data: resp.data.data.organization_data },
              { root: true },
            )
            context.commit('ADD_NEWS', resp.data.data.news)
            // eslint-disable-next-line global-require
            window.Pusher = require('pusher-js')
            /**/
            window.Echo = new Echo({
              broadcaster: 'pusher',
              key: 'rdmsKey2',
              cluster: 'mt1',
              wsHost: window.location.hostname,
              wsPort: 6001,
              disableStats: true,
              forceTLS: false,
              authorizer: channel => ({
                authorize: (socketId, callback) => {
                  axios
                    .post('/api/broadcasting/auth', {
                      socket_id: socketId,
                      channel_name: channel.name,
                    })
                    .then(response => {
                      callback(false, response.data)
                    })
                    .catch(error => {
                      callback(true, error)
                    })
                },
              }),
            }) /*
            /*
            window.Echo = new Echo({
              broadcaster: 'pusher',
              key: 'rdmsKey2',
              cluster: 'mt1',
              wsHost: window.location.hostname,
              wsPort: 6001,
              disableStats: true,
              forceTLS: true,
              wssPort: 6001,
              authorizer: channel => ({
                authorize: (socketId, callback) => {
                  axios
                    .post('/api/broadcasting/auth', {
                      socket_id: socketId,
                      channel_name: channel.name,
                    })
                    .then(response => {
                      callback(false, response.data)
                    })
                    .catch(error => {
                      callback(true, error)
                    })
                },
              }),
            }) /* */
            // reject()
            resolve(resp.data.data)
          } else {
            // Response Error
            context.commit('SET_USER', null)
            reject()
          }
        })
        .catch(error => {
          console.log('error')
          console.log(error.response)
          reject(error)
        })
    })
  },
  forgotpassword({ state }, payload) {
    state.showloading = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/sanctum/csrf-cookie')
        .then(res => {
          console.log('res1', res)
          console.log(payload)
          API.apiClient
            .post('/forgot-password', payload)
            .then(rss => {
              console.log('res2', rss)
              state.showloading = false
              resolve(rss)
            })
            .catch(error => {
              console.log('error2', error)
              state.showloading = false
              reject(error)
            })
        })
        .catch(error => {
          console.log('error1', error)
          state.showloading = false
          resolve(error)
        })
    })
  },
  resetpassword({ state }, payload) {
    state.showloading = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/sanctum/csrf-cookie')
        .then(res => {
          console.log('res1', res)
          console.log(payload)
          API.apiClient
            .post('/reset-password', payload)
            .then(rss => {
              console.log('res2', rss)
              state.showloading = false
              resolve(rss)
            })
            .catch(error => {
              console.log('error2', error)
              state.showloading = false
              reject(error)
            })
        })
        .catch(error => {
          console.log('error1', error)
          state.showloading = false
          resolve(error)
        })
    })
  },
  /* READ_ALL({ state, commit }) {
    state.notification.forEach((element, index) => {
      // eslint-disable-next-line no-param-reassign
      commit('UPDATE_NOTIFICATION', index)
    })
    return new Promise((resolve, reject) => {
      API.apiClient.post('api/read-all').then(res => {
        console.log(res)
        console.log(state.notification)
        resolve()
      })
        .catch(error => reject(error))
    })
  }, */
}
