/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  GET_GOV({ state, commit }, payload) {
    state.show = true
    console.log(payload)
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/get_gov_prj', {
          prefix: payload.prefix,
          type: payload.type,
        })
        .then(resp => {
          console.log(resp)
          commit('ADD_GOV', resp.data.res)
          state.itemsSUP = []
          if (Object.entries(resp.data).length !== 0) {
            resp.data.sup.forEach(element => {
              state.itemsSUP.push({
                id: element.prjsup_id,
                prjId: element.proj_id,
                orgId: element.org_id,
                Name: element.Name,
                contact_person: element.contact_person,
                contact_phone: element.contact_phone,
                desc: element.descpription,
                type: element.type,
                active: element.active,
              })
            })
          }
          state.show = false
          resolve(resp)
        })
        .catch(error => {
          state.show = false
          console.log(error.response)
          reject(error)
        })
    })
  },
  GET_DIS({ state, commit }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/get_dis_prj', {
          prefix: payload.prefix,
          type: payload.type,
          gov: state.governorate == null
            ? null
            : state.governorate.value,
        })
        .then(resp => {
          console.log(resp)
          commit('ADD_DIS', resp.data.res)
          state.show = false
          resolve(resp)
        })
        .catch(error => {
          state.show = false
          console.log(error.response)
          reject(error)
        })
    })
  },
  GET_CAD({ state, commit }, payload) {
    state.show = true
    console.log('sss')
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/get_cad_prj', {
          prefix: payload.prefix,
          district: state.district == null
            ? null
            : state.district.value,
          type: 4,
        })
        .then(resp => {
          console.log(resp)
          commit('ADD_CAD', resp.data.res)
          state.show = false
          resolve(resp)
        })
        .catch(error => {
          state.show = false
          console.log(error.response)
          reject(error)
        })
    })
  },
  GET_ISS({ state }, payload) {
    state.show = true
    console.log('state.cadaster')

    console.log(state.cadaster)
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/get_iss_prj', {
          prefix: payload.prefix,
          cad: state.cadaster,
        })
        .then(resp => {
          console.log(resp)
          state.items = []
          if (Object.entries(resp.data).length !== 0) {
            resp.data.res.forEach(element => {
              console.log(element.result)
              if (element.result !== 2) {
                state.items.push({
                  is_id: element.is_id,
                  is_name: element.is_name,
                  org_id: element.org_id,
                  p_code: element.p_code,
                  proj_id: element.proj_id,
                  quantity: element.qouta_per_per,
                  supplier: state.itemsSUP.filter(ite => ite.id === element.supp_id).length === 0 ? null : state.itemsSUP.filter(ite => ite.id === element.supp_id)[0],
                  note: '',
                })
              }
            })
            console.log(state.items)
          }
          let rs = 0
          if (state.items.length === 0) {
            rs = 0
          } else {
            rs = 1
          }
          state.show = false
          resolve(rs)
        })
        .catch(error => {
          state.show = false
          console.log(error.response)
          reject(error)
        })
    })
  },
  /* FILL_DATA({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/get_iss_prj', {
          prefix: payload.prefix,
          cad: state.cadaster,
        })
        .then(resp => {
          console.log(resp)
          state.show = false
          resolve(resp)
        })
        .catch(error => {
          state.show = false
          console.log(error.response)
          reject(error)
        })
    })
  }, */

  SEND_DATA({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/wtr_send_data', {
          prefix: payload.prefix,
          data: state.items,
          type: payload.type,
        })
        .then(resp => {
          console.log(resp)
          resp.data.res.forEach(element => {
            if (element[0].result === 1) {
              console.log(element[1].issId)
              state.items.splice(state.items.findIndex(e => e.is_id === element[1].issId), 1)
            }
          })
          state.show = false
          resolve(resp)
        })
        .catch(error => {
          state.show = false
          console.log(error.response)
          reject(error)
        })
    })
  },

  ADD_SUPPLIER({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/add_sup', {
          type: payload.type,
          prefix: payload.prefix,
          name: state.supName,
          contact: state.contactName,
          phone: state.contactPhone,
          desc: state.descNote,
          username: state.username,
          natId: state.nationality.value,
        })
        .then(resp => {
          console.log(resp)
          state.show = false
          state.itemsSUP = []
          if (Object.entries(resp.data).length !== 0) {
            resp.data.sup.forEach(element => {
              state.itemsSUP.push({
                id: element.prjsup_id,
                prjId: element.proj_id,
                orgId: element.org_id,
                Name: element.Name,
                contact_person: element.contact_person,
                contact_phone: element.contact_phone,
                desc: element.descpription,
                type: element.type,
                active: element.active,
              })
            })
          }
          resolve(resp)
        })
        .catch(error => {
          state.show = false
          console.log(error.response)
          reject(error)
        })
    })
  },
  DEACTIVE_SUPPLIER({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/deactive_sup', {
          prefix: payload.prefix,
          type: payload.type,
          id: payload.sup,
        })
        .then(resp => {
          console.log(resp)
          state.show = false
          state.itemsSUP = []
          if (Object.entries(resp.data).length !== 0) {
            resp.data.sup.forEach(element => {
              state.itemsSUP.push({
                id: element.prjsup_id,
                prjId: element.proj_id,
                orgId: element.org_id,
                Name: element.Name,
                contact_person: element.contact_person,
                contact_phone: element.contact_phone,
                desc: element.descpription,
                type: element.type,
                active: element.active,
              })
            })
          }

          resolve(resp)
        })
        .catch(error => {
          state.show = false
          console.log(error.response)
          reject(error)
        })
    })
  },
  ACTIVE_SUPPLIER({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/active_sup', {
          prefix: payload.prefix,
          type: payload.type,
          id: payload.sup,
        })
        .then(resp => {
          console.log(resp)
          state.show = false
          state.itemsSUP = []
          if (Object.entries(resp.data).length !== 0) {
            resp.data.sup.forEach(element => {
              state.itemsSUP.push({
                id: element.prjsup_id,
                prjId: element.proj_id,
                orgId: element.org_id,
                Name: element.Name,
                contact_person: element.contact_person,
                contact_phone: element.contact_phone,
                desc: element.descpription,
                type: element.type,
                active: element.active,
              })
            })
          }

          resolve(resp)
        })
        .catch(error => {
          state.show = false
          console.log(error.response)
          reject(error)
        })
    })
  },
}
