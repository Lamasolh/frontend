/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-cycle */
import * as API from '@/services/API'
import store from '@/store'

export default {
  GET_DATA({ state, commit }) {
    state.show = true
    return new Promise(((resolve, reject) => {
      API.apiClient
        .get('/api/menu/org-info')
        .then(resp => {
          console.log(resp)
          state.disOp = []
          state.cadOp = []
          state.typeOp = []
          commit('SET_DIS_OP', resp.data.dis)
          commit('SET_CAD_OP', resp.data.cad)
          resp.data.type.shift()
          commit('SET_TYPE_OP', resp.data.type)
          state.orgLogo = resp.data[0][0].orgLogo
          state.orgName = resp.data[0][0].orgName
          state.orgDisName = resp.data[0][0].orgDis
          state.orgRegNumber = resp.data[0][0].orgRegNum
          state.orgPrefix = resp.data[0][0].orgPrefix
          state.orgType = resp.data[0][0].orgType
          // contact
          state.orgPhone = []
          state.orgContact = resp.data[0][0].orgContact
          const str = resp.data[0][0].orgPhone == null ? null : resp.data[0][0].orgPhone.toString()
          let cnt = 1
          if (str == null) {
            cnt = 1
          } else if (str.substring(0, 3) === '961') {
            cnt = 1
          } else if (str.substring(0, 3) === '963') {
            cnt = 2
          }
          state.orgPhone.id = cnt
          state.orgPhone.text = store.getters[
            'global/phoneOptions'
          ].filter(it => it.value === cnt)[0].text
          state.orgPhone.number = str == null ? null : str.substring(3, str.length)
          state.orgEmail = resp.data[0][0].orgEmail
          state.orgWebsite = resp.data[0][0].orgWeb
          // location
          state.orgGov = store.getters['global/governorate'].filter(
            it => it.value === resp.data[0][0].orgId,
          )[0]
          state.orgDis = store.getters['global/district'].filter(
            it => it.value === resp.data[0][0].orgDistrictID,
          )[0]
          state.orgCad = store.getters['global/municipality'].filter(
            it => it.value === resp.data[0][0].orgCadID,
          )[0]
          state.orgAddress = resp.data[0][0].orgAdress
          // other:
          state.orgDescription = resp.data[0][0].orgDescription
          state.show = false
          resolve()
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    }))
  },
  EDIT_ORG({ state }) {
    state.show = true
    const cnt = state.orgPhone.id === 1 ? '961' : '963'
    const phoneOrg = cnt + state.orgPhone.number
    console.log(state.orgAddress)
    return new Promise(((resolve, reject) => {
      API.apiClient
        .post('/api/menu/edit_org', {
          orgLogo: state.orgLogo,
          orgName: state.orgName,
          orgDisName: state.orgDisName,
          orgRegNumber: state.orgRegNumber,
          orgPrefix: state.orgPrefix,
          orgType: state.orgType.value,
          orgContact: state.orgContact,
          orgPhone: phoneOrg,
          orgEmail: state.orgEmail,
          orgWebsite: state.orgWebsite,
          orgCad: state.orgCad.value,
          orgAddress: state.orgAddress,
          orgDescription: state.orgDescription,
        })
        .then(resp => {
          console.log('resp', resp)
          state.show = false
          console.log('result', resp.data[0].result)
          console.log('result', resp.data)
          console.log('result', resp.data[0][0])

          resolve(resp.data[0][0])
        })
        .catch(error => {
          console.log('err', error)
          state.show = false
          reject(error)
        })
    }))
  },
}
