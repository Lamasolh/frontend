export default {
  SET_SAVED(state, payload) {
    state.saved = payload
  },
  SET_SHOW(state, payload) {
    state.show = payload
  },
  //
  ADD_ALL_REF(state, payload) {
    state.referralOptions = []
    payload.data.forEach(el => {
      state.referralOptions.push({
        title: el.referral_name,
        title_ar: el.referral_name_ar,
        value: el.referral_id,
      })
    })
    localStorage.setItem('followUP:referralOptions', JSON.stringify(state.referralOptions))
  },
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
    localStorage.setItem('followUP:TypeOptions', JSON.stringify(state.typeOptions))
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
    localStorage.setItem('followUP:CadOptions', JSON.stringify(state.cadOptions))
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
    localStorage.setItem('followUP:IssOptions', JSON.stringify(state.issOptions))
  },
  SET_CAD_OPT(state, payload) {
    state.cadOptions = payload
    localStorage.setItem('followUP:CadOptions', JSON.stringify(payload))
  },
  /* RESET_STATE(state) {
    Object.assign(state, getDefaultState())
  }, */
  // Filters
  SET_REF(state, payload) {
    state.referral = payload
    localStorage.setItem('followUP:Referral', JSON.stringify(payload))
  },
  SET_GOV(state, payload) {
    state.governorate = payload
    localStorage.setItem('followUP:Gov', JSON.stringify(payload))
    state.district = null
    state.cadaster = null
    state.iss = null
    state.cadOptions = []
    state.issOptions = []
    state.saved = true
  },
  SET_DIS(state, payload) {
    state.district = payload
    localStorage.setItem('followUP:Dis', JSON.stringify(payload))
    state.type = null
    state.cadaster = null
    state.iss = null
    state.cadOptions = []
    state.issOptions = []
  },
  SET_TYPE(state, payload) {
    state.type = payload
    localStorage.setItem('followUP:Type', JSON.stringify(payload))
    state.cadaster = null
    state.iss = null
    state.saved = true
  },
  SET_CAD(state, payload) {
    state.cadaster = payload
    localStorage.setItem('followUP:Cadaster', JSON.stringify(payload))
    state.iss = null
    state.issOptions = []
  },
  SET_ISS(state, payload) {
    state.iss = payload
    localStorage.setItem('followUP:ISS', JSON.stringify(payload))
  },
  SET_RANG_DAT(state, payload) {
    state.rangedate = payload
    localStorage.setItem('followUP:RangeDate', JSON.stringify(payload))
  },
  // Cases
  SET_ITEM(state, payload) {
    state.caseItem = payload
  },
  SET_FIELD(state, payload) {
    state.caseField = payload
  },
  // Options
  SET_PER_PAGE(state, payload) {
    state.perPage = payload
    localStorage.setItem('followUP:PerPage', JSON.stringify(payload))
  },
  SET_CUR_PAGE(state, payload) {
    state.currentPage = payload
  },
  /// Sort
  SET_SORT_BY(state, payload) {
    state.sortBy = payload
    localStorage.setItem('followUP:sortBy', JSON.stringify(payload))
  },
  SET_SORT_DESC(state, payload) {
    state.sortDesc = payload
    localStorage.setItem('followUP:sortDesc', JSON.stringify(payload))
  },
  SET_SORT_DIR(state, payload) {
    state.sortDirection = payload
    localStorage.setItem('followUP:sortDirection', JSON.stringify(payload))
  },
  /// Filter
  SET_FILTER(state, payload) {
    state.filter = payload
  },
  SET_FILTER_ON(state, payload) {
    state.filterOn.push(payload)
    localStorage.setItem('followUP:filterOn', JSON.stringify(payload))
  },

  SET_CON() {
    console.log('Hiii')
  },
}
