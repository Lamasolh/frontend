/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'
import moment from 'moment'

export default {
  GetCode(context, payload) {
    return new Promise((resolve, reject) => {
      context.state.show = true
      API.apiClient
        .get('/api/assmnt/getcode', {
          params: {
            prefix: payload.prefix,
          },
        })
        .then(resp => {
          console.log(resp)
          context.state.resp = resp.data
          if (resp.data.res === 1) {
            context.state.case = resp.data
            context.state.show = false
            context.state.priority_period = resp.data.setting[0].priority_period
            context.state.priority_interval = resp.data.setting[0].priority_internal
            context.state.grace_period = resp.data.setting[0].grace

            resolve(resp.data.res)
          } else if (resp.data.res === 2) {
            context.dispatch('FETCH', { resp: resp.data, isSave: false })

            context.state.items = resp.data.itm[0]
            context.state.itemsfamily = resp.data.fam[0]
            console.log(resp.data.setting)

            context.state.priority_period = resp.data.setting[0].priority_period
            context.state.priority_interval = resp.data.setting[0].priority_internal
            context.state.grace_period = resp.data.setting[0].grace
            try {
              context.commit('SET_SELECT', {
                items: context.state.items,
                family: context.state.itemsfamily,
                getters: context.rootGetters,
              })
            } catch (e) {
              console.log('selecterror', e)
            }
            console.log('ccccddd')
          } else if (resp.data.res === 3) {
            context.state.show = false
            context.state.priority_period = resp.data.setting[0].priority_period
            context.state.priority_interval = resp.data.setting[0].priority_internal
            context.state.grace_period = resp.data.setting[0].grace
            resolve(resp.data.res)
          } else if (resp.data.res === 4) {
            context.dispatch('FETCH', { resp: resp.data, isSave: false })
            context.state.show = false
            context.state.priority_period = resp.data.setting[0].priority_period
            context.state.priority_interval = resp.data.setting[0].priority_internal
            context.state.grace_period = resp.data.setting[0].grace
            resolve(resp.data.res)
          } else {
            console.log('cccc')
            context.state.show = false
            context.state.res = resp.data.res
            throw new Error(resp.data.res)
          }
          console.log('errorddd')
          context.state.res = resp.data.res
          context.state.show = false
          resolve(resp.data[0])
        })
        .catch(e => {
          console.log('edddr')
          console.log('error', e)
          context.state.show = false
          reject(e)
        })
    })
  },
  FETCH(context, { resp }) {
    /* district: state => state.district,
    nationality: state => state.nationality,
    gender: state => state.gender, */
    /* console.log(context)
    console.log(context.rootGetters['global/district']) */
    console.log('payload')
    console.log(resp)
    // District
    if (context.getters.governorateOption.length === 0) {
      context.commit('ADD_ALL_GOV', { data: resp.govop })
    }
    console.log('dis')
    console.log(resp.disop)
    if (context.getters.disOption.length === 0) {
      context.commit('ADD_ALL_DIS', { data: resp.disop })
    }
    if (context.getters.typeOptions.length === 0) {
      console.log('type')
      console.log(resp.typeop)
      context.commit('ADD_TYPE', { data: resp.typeop })
    }
    console.log('cad')
    console.log(resp.cadop)
    if (context.getters.cadOptions.length === 0) {
      context.commit('ADD_CAD', { data: resp.cadop })
    }
    console.log('iss')
    console.log(resp.issop)
    if (context.getters.issOptions.length === 0) {
      context.commit('ADD_ISS', { data: resp.issop })
    }

    /* if (context.rootGetters['global/district'].length === 0) {
      context.commit('global/ADD_ALL_DIS', { data: resp.disop }, { root: true })
    } */
    console.log('payload')

    /* console.log(resp.mun)
    // Cadaster
    if (context.rootGetters['global/municipality'].length === 0) {
      context.commit('ADD_CAD', { data: resp.mun })
    } */
    // Nationality
    if (context.rootGetters['global/nationality'].length === 0) {
      context.commit('global/ADD_ALL_NAT', { data: resp.nat }, { root: true })
    }

    // Gender
    if (context.rootGetters['global/gender'].length === 0) {
      context.commit('global/ADD_ALL_GEN', { data: resp.gen }, { root: true })
    }
    // Employment Type
    if (context.rootGetters['global/employment'].length === 0) {
      context.commit('global/ADD_ALL_EMP_TYP', { data: resp.emp }, { root: true })
    }
    // Caregiver
    if (context.rootGetters['global/caregiver'].length === 0) {
      context.commit('global/ADD_ALL_CAR', { data: resp.cag }, { root: true })
    }
  },
  SubmitAssmnt({ state }, payload) {
    if (state.itemsrec.pcr_date !== null && state.itemsrec.pcr_date !== '') {
      const dff = moment(moment()).diff(state.itemsrec.pcr_date, 'days')
      if (dff >= state.priority_period) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        state.items.priority_level = 5
      }
      if (dff > (4 * state.priority_interval - 3)) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        state.items.priority_level = 1
      }
      if (dff > ((2 * state.priority_interval) - 1)) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        state.items.priority_level = 2
      }
      if (dff > state.priority_interval) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        state.items.priority_level = 3
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      state.items.priority_level = 4
    } else {
      state.items.priority_level = 5
    }
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/assmnt/submit', {
          prefix: payload.prefix === undefined ? 0 : payload.prefix,
          items: state.items,
          itemsfam: state.itemsfamily,
          itemsrec: state.itemsrec,
          type: state.type == null ? null : state.type.value,
          iss: state.iss == null ? null : state.iss.value,
        })
        .then(resp => {
          resp = resp.data
          console.log(resp)
          console.log(resp.data[0].ccd)

          state.items.case_code = resp.data[0].ccd
          state.res = resp.res
          state.show = false
          localStorage.clear()
          resolve(resp.data)
        })
        .catch(error => {
          console.log(error)
          console.log(error.response)
          state.show = false
          reject(error)
        })
    })
  },
  async GetLocalStorage(context, payload) {
    try {
      console.log(payload)
      if (payload.save === true) {
        console.log('hiii')
        await context.dispatch('GetCode', payload)
        console.log('hiii')
        const resp = JSON.parse(localStorage.getItem('ass'))
        context.state.resp = resp.resp
        console.log('payload')

        context.dispatch('FETCH', { resp, isSave: true })
        // context.state.res = resp.res
        context.state.photo = resp.photo
        context.state.items = resp.itm
        context.state.itemsfamily = resp.fam
        context.state.governorateOption = resp.govop
        context.state.disOption = resp.disop
        context.state.typeOptions = resp.typeop
        context.state.cadOptions = resp.cadop
        context.state.issOptions = resp.issop
        context.state.resp.governorate = resp.gov
        context.state.resp.district = resp.dis
        context.state.resp.cadaster = resp.cad
        context.state.resp.type = resp.type
        context.state.resp.iss = resp.iss
        console.log('payload')

        const b = resp.rec
        b.pcr_photo = null
        context.state.itemsrec = b
        context.commit('SET_SELECT', {
          items: context.state.items,
          family: context.state.itemsfamily,
          getters: context.rootGetters,
        })
        console.log('payload')

        context.state.show = false
      } else {
        localStorage.clear()
        context.dispatch('GetCode', payload)
      }
    } catch (e) {
      console.log('errrddddor', e)
    }
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
  RESET_DATA({ state, dispatch }, payload) {
    state.res = null
    state.case = null
    state.show = false
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
      delivery_status: null,
      district_id: null,
      dlvry_assigned: null,
      empl_type: null,
      employed: 0,
      family_members: 0,
      final_decision: null,
      full_name: null,
      isolation_room: 0,
      monthly_payments: 0,
      nationality_id: null,
      org_id: null,
      priority_level: null,
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
    dispatch('GetCode', payload)
  },
}
