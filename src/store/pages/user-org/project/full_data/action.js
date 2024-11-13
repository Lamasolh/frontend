/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  FOLLOWSAVE({ state }, payload) {
    console.log('FOllowUp Save')
    // phone
    const cnt = state.country.id === 1 ? '961' : '963'
    state.items.case_phone = cnt + state.country.number
    console.log({
      prefix: payload.prefix,
      prefixRole: payload.prefixRole,
      items: state.items,
      itemsfam: state.itemsfamily,
      itemsrec: state.itemsrec,
      link: payload.link,
      type: state.type == null ? null : state.type.value,
      iss: state.iss == null ? null : state.iss.value,
    })
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/fulldata', {
          prefix: payload.prefix,
          prefixRole: payload.prefixRole,
          items: state.items,
          itemsfam: state.itemsfamily,
          itemsrec: state.itemsrec,
          link: payload.link,
          projtype: payload.type,
          type: state.type == null ? null : state.type.value,
          iss: state.iss == null ? null : state.iss.value,
        }).then(resp => {
          console.log(resp)
          if (Object.entries(resp.data).length !== 0) {
            // state.saved = false
          }
          state.show = false
          resolve(resp.data[0])
        }).catch(error => {
          console.log(error)
          console.log(error.response)
          state.show = false
          reject(error)
        })
    })
  },
  SaveLocalStorage(context) {
    localStorage.clear()
    localStorage.setItem('save', true)

    const rsp = {
      itm: context.state.items,
      fam: context.state.itemsfamily,
      rec: context.state.itemsrec,
      res: context.state.res,
      ref: context.state.resp.ref,
      nat: context.state.resp.nat,
      gen: context.state.resp.gen,
      gov: context.state.resp.governorate,
      dis: context.state.resp.district,
      cad: context.state.resp.cadaster,
      type: context.state.resp.type,
      iss: context.state.resp.iss,
      emp: context.state.resp.emp,
      cag: context.state.resp.cag,
      govop: context.state.governorateOption,
      disop: context.state.disOption,
      typeop: context.state.typeOptions,
      cadop: context.state.cadOptions,
      issop: context.state.issOptions,
      resp: context.state.resp,
    }
    localStorage.setItem('ass', JSON.stringify(rsp))
  },
  GET_TYPE({ state, commit }) {
    state.show = true
    return new Promise(((resolve, reject) => {
      API.apiClient
        .get('/api/assmnt/get_type', {
          params: {
            district: state.district.value,
          },
        })
        .then(resp => {
          console.log(resp)
          commit('ADD_TYPE', { data: resp.data.result })
          console.log(state.typeOptions)
          state.show = false
          resolve(resp)
        })
        .catch(error => {
          state.show = false
          console.log(error)
          reject(error)
        })
    }))
  },
  GET_CAD({ state, commit }) {
    state.show = true
    return new Promise(((resolve, reject) => {
      API.apiClient
        .get('/api/assmnt/get_cad', {
          params: {
            district: state.district.value,
            type: state.type.value,
          },
        })
        .then(resp => {
          console.log(resp)
          commit('ADD_CAD', { data: resp.data.result })
          state.show = false
          resolve(resp)
        })
        .catch(error => {
          state.show = false
          console.log(error.response)
          reject(error)
        })
    }))
  },
  GET_ISS({ state, commit }) {
    state.show = true
    return new Promise(((resolve, reject) => {
      API.apiClient
        .get('/api/assmnt/get_iss', {
          params: {
            type: state.type.value,
            cad: state.cadaster.value,
          },
        })
        .then(resp => {
          console.log(resp)
          commit('ADD_ISS', { data: resp.data.result })
          state.show = false
          resolve(resp)
        })
        .catch(error => {
          state.show = false
          console.log(error.response)
          reject(error)
        })
    }))
  },
  RESET_DATA({ state }) {
    state.res = null
    state.case = null
    state.show = false
    state.pcres = null
    // Selected
    state.referral = null
    state.district = null
    state.cadaster = null
    state.nationality = null
    state.gender = null
    state.employment = null
    state.caregiver = null
    state.priority = null
    state.validated = null
    state.phoneissue = null
    state.photo = null
    state.items = {
      Head_hhold: null,
      active: null,
      address_latitude: null,
      address_longitude: null,
      adresstext: null,
      cadastre_id: null,
      caregiver: null,
      case_code: null,
      case_id: null,
      case_phone: null,
      casse_duration: null,
      comm_assigned: null,
      created_date: null,
      current_status: null,
      delivery_date: null,
      delivery_status: 1,
      district_id: null,
      dlvry_assigned: null,
      empl_type: null,
      employed: 0,
      family_members: 0,
      final_decision: 1,
      full_name: null,
      isolation_room: 0,
      monthly_payments: 0,
      nationality_id: 1,
      org_id: null,
      priority_level: 1,
      progress_date: null,
      progress_scoring: null,
      proj_id: null,
      referral_date: null,
      referral_id: null,
    }
    state.itemsrec = {
      awareness_done: null,
      awareness_token: null,
      case_date: null,
      case_id: null,
      case_notes: null,
      com_inprogress: null,
      com_status: null,
      monitoring_done: null,
      monitoring_token: null,
      pcr_date: null,
      pcr_photo: null,
      pcr_result: null,
      referral_id: null,
      referral_ref_number: null,
    }
    state.itemsfamily = {
      case_id: null,
      comments: null,
      yng_child_count: 0,
      child_count: 0,
      young_count: 0,
      teenager_count: 0,
      adult_count: 0,
      elderly_count: 0,
      female_count: null,
      gender: null,
      infected_count: 1,
      male_count: null,
      pregnant: 0,
    }
    state.country = {
      id: 1,
      text: 'LB(961)',
      number: null,
    }
    // save
    state.resp = []
    // dispatch('GetCode', payload)
  },
}
