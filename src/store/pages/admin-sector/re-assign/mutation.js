export default {
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
    state.cadOptions = []
    state.issOptions = []
    state.saved = true
  },
  SET_DIS(state, payload) {
    state.district = payload
    state.cadaster = null
    state.iss = null
    state.cadOptions = []
    state.issOptions = []
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
    state.issOptions = []
    state.cadaster = payload
    state.iss = null
  },
  SET_ISS(state, payload) {
    state.iss = payload
  },
  SET_CAD_OPT(state, payload) {
    state.cadOptions = payload
  },
  SET_RANG_DAT(state, payload) {
    state.rangedate = payload
  },
  // Data
  SET_ITEM(state, payload) {
    state.caseItem = payload
    state.saved = false
  },
  SET_FIELD(state, payload) {
    state.caseField = payload
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
  SET_SELECT_ITEM(state, payload) {
    state.selectedCase = payload
    state.saved = true
  },
  SET_SAVED(state, payload) {
    state.saved = payload
  },
  SET_SHOW(state, payload) {
    state.show = payload
  },
  SET_SHOW_REF(state, payload) {
    state.showModalRef = payload
  },
  SET_REF_ORG(state, payload) {
    state.selectedOrgRef = payload
  },
  SET_ORG_LIST(state, payload) {
    state.orgList = payload
  },
  SET_MAP_CENTER(state, payload) {
    state.centerMap = payload
  },
}
