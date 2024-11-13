export default {
  SET_SAVED(state, payload) {
    state.saved = payload
  },
  SET_SHOW(state, payload) {
    state.show = payload
  },
  /// Filter
  SET_ORG_STATUS(state, payload) {
    state.orgStatus = payload
  },
  SET_ORG_TYPE(state, payload) {
    state.orgType = payload
  },
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
    state.type = null
    state.cadOptions = []
    state.issOptions = []
    state.cadaster = null
    state.iss = null
    state.saved = true
  },
  SET_DIS(state, payload) {
    state.district = payload
    state.cadOptions = []
    state.issOptions = []
    state.cadaster = null
    state.iss = null
  },
  SET_TYPE(state, payload) {
    state.type = payload
    state.cadaster = null
    state.iss = null
    state.saved = true
  },
  SET_CAD(state, payload) {
    state.cadaster = payload
    state.iss = null
  },
  SET_ISS(state, payload) {
    state.iss = payload
  },
  SET_CAD_OPT(state, payload) {
    state.cadOptions = payload
  },
  // Cases
  SET_ITEM(state, payload) {
    state.orgList = payload
  },
  SET_FIELD(state, payload) {
    state.orgField = payload
  },
  // Option Table
  SET_PER_PAGE(state, payload) {
    state.perPage = payload
  },
  SET_CUR_PAGE(state, payload) {
    state.currentPage = payload
  },
  /// Sort
  SET_SORT_BY(state, payload) {
    state.sortBy = payload
  },
  SET_SORT_DESC(state, payload) {
    state.sortDesc = payload
  },
  SET_SORT_DIR(state, payload) {
    state.sortDirection = payload
  },
  /// Filter
  SET_FILTER(state, payload) {
    state.filter = payload
  },
  SET_FILTER_ON(state, payload) {
    state.filterOn.push(payload)
  },
}
