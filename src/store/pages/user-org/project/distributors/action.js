/* eslint-disable prefer-destructuring */
// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  GET_DATA({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/dist/get-data', {
          prefix: payload.prefix,
          prefixRole: payload.prefixRole,
          type: payload.type,
        })
        .then(resp => {
          console.log(resp)
          state.requestItem = []
          state.kits = []
          state.listAssgn = []
          state.listDonors = []
          state.listResons = []

          resp.data.listReq.forEach(el => {
            state.requestItem.push({
              id: el.item_id,
              title: el.items_name,
              qty: el.qnty,
              req_id: el.req_id,
              req_user_id: el.req_user_id,
              warehouse_id: el.warehouse_id,
              wh_name: el.wh_name,

            })
          })

          console.log('/////////////')
          resp.data.ret.forEach(el => {
            const donors = []
            resp.data.dlv.forEach(e => {
              console.log(e.id, el.items_id)
              if (e.id === el.items_id) {
                donors.push(e.itm)
              }
            })
            state.kits.push({
              items_id: el.items_id,
              is_main_item: el.is_main_item,
              items_name: el.items_name,
              max_dist: el.max_dist,
              minim_dist: el.minim_dist,
              quantity: el.quantity,
              ret: el.ret,
              return_reqst: el.return_reqst,
              warehouse_id: el.warehouse_id,
              wh_name: el.wh_name,
              donors,
            })
          })
          console.log('/////////////')
          resp.data.list.forEach(el => {
            console.log(el)
            state.listAssgn.push({
              priority_level: el.priority_level,
              nationality_name: el.nationality_name,
              full_name: el.full_name,
              case_phone: el.case_phone,
              case_id: el.case_id,
              case_code: el.case_code,
              cadastre_name: el.cadastre_name,
              adresstext: el.adresstext,
              lat: el.address_latitude,
              long: el.address_longitude,
            })
          })
          resp.data.donor.forEach(el => {
            state.listDonors.push({
              org_id: el.org_id,
              org_name: el.org_name,
              org_prefix: el.org_prefix,
            })
          })
          resp.data.reason.forEach(el => {
            state.listResons.push({
              id: el.id,
              reason_name: el.reason_name,
              reason_name_ar: el.reason_name_ar,
            })
          })
          state.max_qty = resp.data.max[0].number_kits

          state.saved = false
          state.show = false
          resolve(resp.data)
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },

  ConfirmReject({ state, dispatch }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/dist/confirm-reject', {
          prefix: payload.prefix,
          prefixRole: payload.prefixRole,
          type: payload.type,
          isConfirm: payload.isConfirm,
          item: payload.item,
        })
        .then(resp => {
          console.log(resp)
          dispatch('GET_DATA', {
            prefix: payload.prefix,
            prefixRole: payload.prefixRole,
            type: payload.type,
          })
          state.saved = false
          state.show = false
          resolve(resp.data)
        })
        .catch(error => {
          console.log(error)
          state.show = false
          reject(error)
        })
    })
  },
  Delivery({ state, dispatch }, payload) {
    state.show = true
    const items = []
    state.deliveryKit.forEach(el => {
      if (el.qtyValue == null ? false : el.qtyValue !== '') {
        items.push(el)
      }
    })
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/dist/delivery', {
          prefix: payload.prefix,
          prefixRole: payload.prefixRole,
          type: payload.type,
          items,
          caseSelect: state.caseSelect,
          comment: state.delveryComment,
        })
        .then(resp => {
          console.log(resp)
          dispatch('GET_DATA', {
            prefix: payload.prefix,
            prefixRole: payload.prefixRole,
            type: payload.type,
          })
          state.saved = false
          state.show = false
          resolve(resp.data)
        })
        .catch(error => {
          console.log(error)
          state.show = false
          reject(error)
        })
    })
  },
  NotDelivery({ state, dispatch }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/dist/not_delivery', {
          prefix: payload.prefix,
          prefixRole: payload.prefixRole,
          type: payload.type,
          caseSelect: state.caseSelect,
          notDelverySelectReson: state.notDelverySelectReson,
        })
        .then(resp => {
          console.log(resp)
          dispatch('GET_DATA', {
            prefix: payload.prefix,
            prefixRole: payload.prefixRole,
            type: payload.type,
          })
          state.saved = false
          state.show = false
          resolve(resp.data)
        })
        .catch(error => {
          console.log(error)
          state.show = false
          reject(error)
        })
    })
  },
}
