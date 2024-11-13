/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-cycle */
import store from '@/store'
import Vue from 'vue'
import moment from 'moment'

export default {
  SET_CON(state, { key, value }) {
    Vue.set(state.country, key, value)
    const phone = (state.country.id === 1 ? '961' : '963') + state.country.number
    store.commit('fullData/SET_ITEM', { key: 'case_phone', value: phone })
    store.dispatch('fullData/SaveLocalStorage')
  },
  CALC_SCORE(state) {
    let scr = 0
    // eslint-disable-next-line no-unused-vars
    let cnt = 1
    let fmcnt = 0
    let stt = 'The Case needs:'
    state.validated = false
    if (state.items.adresstext == null || state.items.adresstext === '' || state.items.adresstext === 'None') {
      stt = `\n${cnt}. Missing text address`
      cnt += 1
    }
    if (state.items.address_latitude !== 0 && state.items.address_longitude !== 0) {
      scr += 5
    } else {
      stt = `${stt}\n${cnt}. Missing Exact location`
      cnt += 1
    }
    if (state.items.family_members >= 5) {
      scr = 5
    }
    fmcnt = state.items.family_members - state.itemsfamily.male_count - state.itemsfamily.female_count
    if (state.items.family_members === 0 || state.items.family_members === '0' || state.itemsfamily.infected_count === 0 || state.itemsfamily.infected_count === '0' || fmcnt !== 0) {
      stt = `${stt}\n${cnt}. Missing family details`
      cnt += 1
    }
    if (state.items.caregiver === 1) {
      stt = `${stt}\n${cnt}. Missing socio-economic info`
      cnt += 1
      stt = `${stt}\n${cnt}. Missing Accommodation info`
      cnt += 1
    }
    if (state.items.Head_hhold === 1 || state.items.Head_hhold === '1') {
      scr += 15
    }
    if (state.itemsfamily.pregnant === 1 || state.itemsfamily.pregnant === '1') {
      scr += 10
    }
    if (state.items.monthly_payments === 1 || state.items.monthly_payments === '1') {
      scr += 20
    }
    if (state.items.employed === false || state.items.empl_type === 1) {
      scr += 30
    } else if (state.items.empl_type === 4 || state.items.empl_type === '4') {
      scr += 25
    } else if (state.items.empl_type === 2 || state.items.empl_type === '2') {
      scr += 10
    }
    if (state.items.isolation_room === 0 || state.items.isolation_room === '0') {
      scr += 10
    }
    if (state.itemsrec.pcr_date !== null) {
      const dff = moment(moment()).diff(state.itemsrec.pcr_date, 'days')
      if (dff <= 7) {
        if (state.itemsrec.pcr_photo !== null) {
          scr += 10
          /*    if (ad === 1 && scr >= 60) {
            state.items.final_decision = 2
          } else {
            state.items.final_decision = 3
          } */
        } // else { state.items.final_decision = 1 }
      }
    }
    if (state.itemsfamily.yng_child_count >= 3 || state.itemsfamily.yng_child_count >= '3') {
      scr += 5
    }
    if (state.itemsfamily.child_count >= 3 || state.itemsfamily.child_count >= '3') {
      scr += 2
    }
    if (state.itemsfamily.young_count >= 3 || state.itemsfamily.young_count >= '3') {
      scr += 2
    }
    if (state.itemsfamily.teenager_count >= 3 || state.itemsfamily.teenager_count >= '3') {
      scr += 2
    }
    if (state.itemsfamily.adult_count >= 3 || state.itemsfamily.adult_count >= '3') {
      scr += 2
    }
    if (state.itemsfamily.elderly_count >= 3 || state.itemsfamily.elderly_count >= '3') {
      scr += 10
    }

    state.items.progress_scoring = scr

    if (cnt === 1) {
      if (state.items.progress_scoring >= 60) {
        stt = `The case is considered\nApproved with score of (${state.items.progress_scoring})`
        state.validated = true
      } else {
        stt = `The case is considered\nRejected with score of (${state.items.progress_scoring})`
        state.validated = true
      }
    }
    if (state.items.final_decision !== 3) {
      state.items.current_status = stt
    }
    store.dispatch('fullData/SaveLocalStorage')
  },
  SET_ITEM(state, { key, value }) {
    Vue.set(state.items, key, value)
    store.commit('fullData/CALC_SCORE')
  },
  SET_ITEM_FAM(state, { key, value }) {
    Vue.set(state.itemsfamily, key, value)
    store.commit('fullData/CALC_SCORE')
  },
  SET_ITEM_REC(state, { key, value }) {
    Vue.set(state.itemsrec, key, value)
    store.commit('fullData/CALC_SCORE')
  },
  SET_SELECT(state, { items, family, getters }) {
    try {
      console.log('resp.data.setting')

      state.governorate = getters['fullData/governorateOption'].filter(
        it => it.value === items.governorate_id,
      ).shift()
      state.district = getters['fullData/disOption'].filter(
        it => it.value === items.district_id,
      ).shift()
      state.type = getters['fullData/typeOptions'].filter(
        it => it.value === items.satl_type,
      ).shift()
      state.cadaster = getters['fullData/cadOptions'].filter(
        it => it.value === items.cadastre_id,
      ).shift()
      if (items.is_id == null) {
        state.iss = null
      } else {
        state.iss = getters['fullData/issOptions'].filter(
          it => it.value === items.is_id,
        ).shift()
      }

      state.nationality = getters['global/nationality'].filter(
        it => it.value === items.nationality_id,
      )[0]
      if (family.result === 0) {
        state.gender = getters['global/gender'].filter(
          it => it.value === items.gender,
        ).shift()
      } else {
        state.gender = getters['global/gender'].filter(
          it => it.value === family.gender,
        ).shift()
        state.employment = getters['global/employment'].filter(
          it => it.value === items.empl_type,
        )[0]
        state.caregiver = getters['global/caregiver'].filter(
          it => it.value === items.caregiver,
        )[0]
      }
      console.log(state.gender, state.employment, state.caregiver)
      // phone
      const str = items.case_phone == null ? null : items.case_phone.toString()
      let cnt = null
      if (str == null) {
        cnt = 1
      } else if (str.substring(0, 3) === '961') {
        cnt = 1
      } else if (str.substring(0, 3) === '963') {
        cnt = 2
      }
      state.country.id = cnt
      state.country.text = getters['global/phoneOptions'].filter(
        it => it.value === cnt,
      )[0].text
      state.country.number = str == null ? null : str.substring(3, str.length)
      console.log(state.country)
    } catch (e) {
      console.log('er')
      console.log('er', e)
      throw e
    }
  },
  //
  ADD_ALL_GOV(state, payload) {
    console.log(payload)
    state.governorateOption = []
    payload.data.forEach(el => {
      state.governorateOption.push({
        title: el.governorate_name,
        title_ar: el.governorate_name_ar,
        params: el.country_id,
        value: el.governorate_id,
      })
    })
  },
  ADD_ALL_DIS(state, payload) {
    state.disOption = []
    payload.data.forEach(el => {
      state.disOption.push({
        title: el.district_name_eng,
        title_ar: el.district_name_ar,
        params: el.governorate_id,
        value: el.district_id,
      })
    })
  },
  ADD_TYPE(state, payload) {
    state.typeOptions = []
    payload.data.forEach(el => {
      console.log(el)
      state.typeOptions.push({
        title: el.name,
        title_ar: el.name_ar,
        value: el.st_id,
      })
    })
  },
  ADD_CAD(state, payload) {
    console.log(payload)
    state.cadOptions = []
    payload.data.forEach(el => {
      state.cadOptions.push({
        title: el.cadastre_name,
        title_ar: el.cadastre_name_ar,
        value: el.cadastre_id,
      })
    })
  },
  ADD_ISS(state, payload) {
    state.issOptions = []
    payload.data.forEach(el => {
      state.issOptions.push({
        title: el.is_name,
        title_ar: el.is_name_ar,
        value: el.is_id,
        parms: el.cad_id,
      })
    })
  },
  /// Selected
  SET_REF(state, payload) {
    state.referral = payload
    // state.items.referral_id = payload.value
    store.commit('fullData/SET_ITEM', { key: 'referral_id', value: payload.value })
  },
  SET_PCR_RES(state, payload) {
    state.pcres = payload
    store.commit('fullData/SET_ITEM_REC', { key: 'pcr_result', value: payload.value })
  },
  SET_GOV(state, payload) {
    state.governorate = payload
    state.district = null
    state.type = null
    state.cadaster = null
    state.iss = null
    state.saved = true
    state.typeOptions = []
    state.cadOptions = []
    state.issOptions = []
    store.commit('fullData/SET_ITEM', { key: 'governorate_id', value: payload.value })
  },
  SET_DIS(state, payload) {
    state.district = payload
    state.type = null
    state.cadaster = null
    state.iss = null
    state.cadOptions = []
    state.issOptions = []
    state.typeOptions = []
    store.commit('fullData/SET_ITEM', { key: 'district_id', value: payload.value })
  },
  SET_TYPE(state, payload) {
    state.type = payload
    state.cadaster = null
    state.iss = null
    state.saved = true
    let nat = 2
    switch (payload.value) {
      case 1:
        nat = 2
        break
      case 2:
        nat = 3
        break
      case 3:
        nat = 5
        break
      case 4:
        nat = 3
        break
      case 5:
        nat = 3
        break
      case 6:
        nat = 4
        break
      case 7:
        nat = 4
        break
      default:
        nat = 2
    }
    store.commit('fullData/SET_ITEM', { key: 'satl_type', value: payload.value })
    store.commit('fullData/SET_ITEM', { key: 'nationality_id', value: nat })
    console.log(nat)
    console.log(state.items)
  },
  SET_CAD(state, payload) {
    state.cadaster = payload
    state.iss = null
    state.issOptions = []
    if (state.type.value === 1) {
      state.munChange = true
    }
    store.commit('fullData/SET_ITEM', { key: 'cadastre_id', value: payload.value })
  },
  SET_ISS(state, payload) {
    state.iss = payload
    state.munChange = true
    store.commit('fullData/SET_ITEM', { key: 'is_id', value: payload.value })
  },
  SET_NAT(state, payload) {
    state.nationality = payload
    store.commit('fullData/SET_ITEM', { key: 'nationality_id', value: payload.value })
  },
  SET_GEN(state, payload) {
    state.gender = payload
    store.commit('fullData/SET_ITEM_FAM', { key: 'gender', value: payload.value })
  },
  SET_EMPL(state, payload) {
    state.employment = payload
    if (payload.value === 1) {
      store.commit('fullData/SET_ITEM', { key: 'empl_type', value: 0 })
    } else {
      store.commit('fullData/SET_ITEM', { key: 'empl_type', value: 1 })
    }
    store.commit('fullData/SET_ITEM', { key: 'empl_type', value: payload.value })
  },
  SET_GVR(state, payload) {
    state.caregiver = payload
    store.commit('fullData/SET_ITEM', { key: 'caregiver', value: payload.value })
  },
  SET_PHOTO(state, payload) {
    state.photo = payload
  },
}
