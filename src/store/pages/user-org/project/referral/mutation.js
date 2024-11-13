// eslint-disable-next-line import/no-cycle
import store from '@/store'

export default {
  SET_SAVED(state, payload) {
    state.saved = payload
  },
  SET_SHOW(state, payload) {
    state.show = payload
  },
  // Items
  ADD_ITEMS(state, payload) {
    state.items.push({
      id: payload.id,
      name: payload.name,
      country: store.getters['global/phoneOptions'].filter(
        op => op.value === payload.country,
      )[0].text,
      countryid: payload.country,
      phone: payload.phone,
      pcr_date: payload.pcr_date,
    })
  },
  REM_ITEMS(state, payload) {
    state.items.splice(payload.index, 1)
  },
  REM_ALL_ITEMS(state, payload) {
    state.saved = false
    if (payload.all === true) {
      state.items = []
    } else {
      state.items = [
        {
          id: payload.id,
          name: payload.name,
          phone: payload.phone,
          country: 'LB(961)',
          countryid: 1,
          pcr_date: payload.pcr_date,
        },
      ]
    }
    state.referral = null
    state.district = null
    state.municipality = null
    state.priority = null
  },
  SET_NAME_ITEM(state, payload) {
    state.items.filter(it => it.id === payload.index)[0].name = payload.value
    state.saved = true
  },
  SET_PHONE_ITEM(state, payload) {
    state.items.filter(it => it.id === payload.index)[0].phone = payload.value
    state.saved = true
  },
  SET_CON_ITEM(state, payload) {
    state.items.filter(it => it.id === payload.index)[0].countryid = payload.value
    state.saved = true
  },
  SET_DATE_ITEM(state, payload) {
    state.items.filter(it => it.id === payload.index)[0].pcr_date = payload.value
    state.saved = true
  },
  // options
  //
  ADD_TYPE(state, payload) {
    console.log(payload)
    state.typeOptions = []
    payload.forEach(el => {
      state.typeOptions.push({
        title: el.name,
        title_ar: el.name_ar,
        value: el.st_id,
      })
    })
  },
  ADD_CAD(state, payload) {
    state.cadOptions = []
    payload.forEach(el => {
      state.cadOptions.push({
        title: el.cadastre_name,
        title_ar: el.cadastre_name_ar,
        value: el.cadastre_id,
      })
    })
  },
  ADD_ISS(state, payload) {
    state.issOptions = []
    payload.forEach(el => {
      state.issOptions.push({
        title: el.is_name,
        title_ar: el.is_name_ar,
        value: el.is_id,
        parms: el.cad_id,
      })
    })
  },
  ///
  SET_REF(state, payload) {
    state.referral = payload
  },
  SET_GOV(state, payload) {
    state.governorate = payload
    state.district = null
    state.cadaster = null
    state.iss = null
    state.saved = true
    state.type = null
    state.cadOptions = []
    state.issOptions = []
    state.typeOptions = []
  },
  SET_DIS(state, payload) {
    state.district = payload
    state.cadaster = null
    state.iss = null
    state.type = null
    state.cadOptions = []
    state.issOptions = []
    state.typeOptions = []
  },
  SET_TYPE(state, payload) {
    state.type = payload
    state.cadaster = null
    state.iss = null
    state.saved = true
    if (payload == null) {
      state.cadOptions = []
      state.issOptions = []
    }
  },
  SET_CAD(state, payload) {
    state.cadaster = payload
    state.iss = null
    state.issOptions = []
  },
  SET_ISS(state, payload) {
    state.iss = payload
  },
  SET_PRI(state, payload) {
    state.priority = payload
  },
  SET_CAD_OPT(state, payload) {
    state.cadOptions = payload
  },
  // Global
  RESET_ALL(state) {
    state.items = [
      {
        id: 1,
        name: null,
        country: 'LB(961)',
        countryid: 1,
        phone: null,
        pcr_date: null,
      },
    ]
    state.saved = false
  },

}
