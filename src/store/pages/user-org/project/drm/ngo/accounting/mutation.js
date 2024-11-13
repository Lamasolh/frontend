export default {
  SET_SHOW(state, payload) {
    state.show = payload
  },
  SET_SAVED(state, payload) {
    state.saved = payload
  },
  SET_RANGE(state, payload) {
    state.range = payload
  },
  Clear(state) {
    state.govOptions = []
    state.disOptions = []
    state.cadOptions = []
    state.pdList = []
    state.pd = null
    state.district = null
    state.governorate = null
    state.cadaster = null
    // state.itemGRN = []
    state.supL = []
    state.supplier = null
    state.range = Date.now()
  },
  ADD_GOV(state, payload) {
    state.govOptions = []
    payload.forEach(el => {
      state.govOptions.push({
        title: el.governorate_name,
        title_ar: el.governorate_name_ar,
        params: el.country_id,
        value: el.governorate_id,
      })
    })
  },

  ADD_DIS(state, payload) {
    state.disOptions = []
    payload.forEach(el => {
      state.disOptions.push({
        title: el.district_name_eng,
        title_ar: el.district_name_ar,
        params: el.governorate_id,
        value: el.district_id,
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
  ADD_SUP(state, payload) {
    state.supL = []
    console.log('payload', payload)
    payload.forEach(el => {
      console.log('el', el)
      state.supL.push({
        title: el.sup_name,
        value: el.sup_id,
      })
    })
  },
  ADD_PD(state, payload) {
    state.pdList = []
    payload.forEach(el => {
      state.pdList.push({
        title: `${el.pd_code} - ${el.name} (${el.tag})`,
        value: el.pd_code,
      })
    })
  },
  SET_CAD_OPT(state, payload) {
    state.cadOptions = payload
  },
  SET_GOV(state, payload) {
    state.governorate = payload
    state.district = null
    state.cadaster = null
    state.cadOptions = []
  },
  SET_DIS(state, payload) {
    state.district = payload
    state.cadaster = null
    state.cadOptions = []
  },
  SET_CAD(state, payload) {
    state.cadaster = payload
  },

  SET_MOD_SUP(state, payload) {
    state.supplier = payload
  },
  SET_MOD_PD(state, payload) {
    state.pd = payload
  },
}
