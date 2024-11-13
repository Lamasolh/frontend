export default {
  SET_SHOW(state, payload) {
    state.show = payload
  },
  SET_SAVED(state, payload) {
    state.saved = payload
  },
  // Options
  SET_PER_PAGE(state, payload) {
    state.perPage = payload
  },
  SET_CUR_PAGE(state, payload) {
    state.currentPage = payload
  },
  SET_SORT_BY(state, payload) {
    state.sortBy = payload
  },
  SET_SORT_DESC(state, payload) {
    state.sortDesc = payload
  },
  SET_SORT_DIR(state, payload) {
    state.sortDirection = payload
  },
  SET_FILTER(state, payload) {
    state.filter = payload
  },
  SET_FILTER_ON(state, payload) {
    state.filterOn.push(payload)
  },

  SET_ASS_TO(state, payload) {
    state.isAssignSidebarActive = payload
  },
  SET_ADD_SIDE(state, payload) {
    state.isAssignSidebarActiveADD = payload
  },
  Clear(state) {
    state.govOptions = []
    state.disOptions = []
    state.cadOptions = []
    state.district = null
    state.governorate = null
    state.cadaster = null
    state.items = []
  },
  REM_ITEM(state, payload) {
    state.items.splice(payload, 1)
  },
  ///
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
  ///
  SET_GOV(state, payload) {
    state.governorate = payload
    state.district = null
    state.cadOptions = []
    state.cadaster = null
    state.saved = true
  },
  SET_DIS(state, payload) {
    state.district = payload
    state.cadOptions = []
    state.cadaster = null
    state.iss = null
  },
  SET_GOV_OPT(state, payload) {
    state.govOptions = payload
  },
  SET_DIS_OPT(state, payload) {
    state.disOptions = payload
  },
  SET_CAD_OPT(state, payload) {
    state.cadOptions = payload
  },
  SET_CAD(state, payload) {
    state.cadaster = payload
  },
  SET_ISS(state, payload) {
    state.iss = payload
  },
  ///
  SET_SUP_NAME(state, payload) {
    state.supName = payload
  },
  SET_SUP_CON_NAME(state, payload) {
    state.contactName = payload
  },
  SET_SUP_CON_PHONE(state, payload) {
    state.contactPhone = payload
  },
  SET_SUP_DESC(state, payload) {
    state.descNote = payload
  },
  SET_SUP_USERNAME(state, payload) {
    state.username = payload
  },

  SET_SUP_NAT(state, payload) {
    state.nationality = payload
  },
}
