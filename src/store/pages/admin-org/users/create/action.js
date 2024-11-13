// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  GET_DATA({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/usermanager/get-add-org-role', {
          params: {
            userid: payload,
          },
        })
        .then(resp => {
          console.log('data', resp)
          if (Object.entries(resp.data).length !== 0) {
            // state.rolesField = []
            state.rolesItem = []
            state.rolesItemLoop = []
            const arr = []
            resp.data.me.forEach((element, index) => {
              console.log(element)
              if (element.role_value === 1) {
                /* state.rolesField.push({
                  key: element.prefix,
                  label: element.role_name,
                }) */
                if (payload != null) {
                  const us = resp.data.user
                  console.log(us[index].prefix)
                  console.log(us[index].role_value == null ? false : us[index].role_value === 1)
                  arr[us[index].prefix] = us[index].role_value == null ? false : us[index].role_value === 1
                  state.rolesItemLoop.push({
                    key: us[index].prefix,
                    value: us[index].role_value == null ? false : us[index].role_value === 1,
                  })
                } else {
                  state.rolesItemLoop.push({
                    key: element.prefix,
                    value: false,
                  })
                  arr[element.prefix] = false
                }
              }
            })
            state.rolesItem.push(arr)
            console.log('role', state.rolesItem)
            // console.log('feild', state.rolesField)
            console.log('Loop', state.rolesItemLoop)
            /* const jsonObject = Array
            state.rolesItem.forEach((value, key) => {
              jsonObject[key] = value
            })
            console.log('stat', state.rolesItem)
            console.log('js', SON.stringify(jsonObject)jsonObject))
            console.log('Json', jsonObject)
            console.log('Json', Object.entries(jsonObject))
            console.log('stat', Object.fromEntries(state.rolesItem))
            console.log('stat', Object.entries(state.rolesItem))
            console.log('stat', JSON.stringify([...state.rolesItem])) */
            // eslint-disable-next-line prefer-destructuring
          }
          state.show = false
          resolve(resp.data)
        })
        .catch(error => {
          console.log('error', error)
          state.show = false
          reject(error)
        })
    })
  },
  Save_DATA({ state }) {
    state.show = true
    const cnt = state.userPhone.id === 1 ? '961' : '963'
    const phone = cnt + state.userPhone.number
    const map = new Map()
    Object.entries(state.rolesItem[0]).forEach(el => {
      map.set(el[0], el[1])
    })
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/usermanager/add-user-org', {
          userLogo: state.userLogo,
          userName: state.userName,
          userFN: state.userFN,
          userLN: state.userLN,
          userFNAR: state.userFNAR,
          userLNAR: state.userLNAR,
          userGender: state.userGender.value,
          userNat: state.userNat.value,
          userDOB: state.userDOB,
          userEmail: state.userEmail,
          userPhone: phone,
          userJob: state.userJob.value,
          userBio: state.userBio,
          userAddress: state.userAddress,
          perm: JSON.stringify(Object.fromEntries(map)),
          userList: state.rolesItem[0].USRLST,
          userAdd: state.rolesItem[0].ADUSR,
          monitoring: state.rolesItem[0].MNTRM,
          reporting: state.rolesItem[0].RPRTM,
          projects: state.rolesItem[0].PRJKTS,
          editOrg: state.rolesItem[0].EDTORG,
          prjList: state.rolesItem[0].PRJLST,
          prjAdd: state.rolesItem[0].ADPRJ,
          orgList: state.rolesItem[0].ORLST,
          dt: state.rolesItem[0].DTCLS,
          orgAdd: state.rolesItem[0].ADORG,
          news: state.rolesItem[0].NWSMSG,
        })
        .then(resp => {
          console.log(resp)
          let res
          if (resp.data.errorInfo != null) {
            if (resp.data.errorInfo[1] === 1062) {
              res = { result: 4 }
            } else {
              res = { result: 0 }
            }
          } else {
            // eslint-disable-next-line prefer-destructuring
            res = resp.data.user[0]
          }
          state.show = false
          resolve(res)
        })
        .catch(error => {
          console.log('err', error)
          state.show = false
          reject(error)
        })
    })
  },
  EDIT_DATA({ state }, payload) {
    console.log(payload, state.rolesItem)
    state.show = true
    const map = new Map()
    Object.entries(state.rolesItem[0]).forEach(el => {
      map.set(el[0], el[1])
    })
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/usermanager/update-user-org', {
          userid: payload.id,
          perm: JSON.stringify(Object.fromEntries(map)),
          userJob: state.userJob.value,
          userList: state.rolesItem[0].USRLST,
          userAdd: state.rolesItem[0].ADUSR,
          monitoring: state.rolesItem[0].MNTRM,
          reporting: state.rolesItem[0].RPRTM,
          projects: state.rolesItem[0].PRJKTS,
          editOrg: state.rolesItem[0].EDTORG,
          news: state.rolesItem[0].NWSMSG,
          dt: state.rolesItem[0].DTCLS,
          prjList: state.rolesItem[0].PRJLST,
          prjAdd: state.rolesItem[0].ADPRJ,
          orgList: state.rolesItem[0].ORLST,
          orgAdd: state.rolesItem[0].ADORG,

          send: payload.send,
        })
        .then(resp => {
          console.log('res', resp)
          state.show = false
          resolve(resp.data.user[0])
        })
        .catch(error => {
          console.log(error.response)
          state.show = false
          reject(error)
        })
    })
  },
  RESET_PASS({ state }, payload) {
    state.show = true

    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/usermanager/update-user-pass', {
          userid: payload.id,
          password: state.userPassword,
        })
        .then(resp => {
          console.log('res', resp)
          state.show = false
          resolve(resp.data)
        })
        .catch(error => {
          console.log(error.response)
          state.show = false
          reject(error)
        })
    })
  },
  DE_ACTIVE({ state }, payload) {
    console.log(payload)
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/usermanager/active-deactive-user-org', { userid: payload.id, deact: payload.deact })
        .then(resp => {
          console.log('res', resp)
          state.show = false
          resolve(resp.data.result[0])
        })
        .catch(error => {
          console.log(error.response)
          state.show = false
          reject(error)
        })
    })
  },
  DELETE_USER({ state }, payload) {
    console.log(payload)
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/usermanager/delete-user-org', { userid: payload.id })
        .then(resp => {
          console.log('res', resp)
          state.show = false
          resolve(resp.data[0][0])
        })
        .catch(error => {
          console.log(error.response)
          state.show = false
          reject(error)
        })
    })
  },
}
