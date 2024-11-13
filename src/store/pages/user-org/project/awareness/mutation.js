export default {
  SET_SAVED(state, payload) {
    state.saved = payload
  },
  SET_SHOW(state, payload) {
    state.show = payload
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
    localStorage.setItem('Awareness:TypeOptions', JSON.stringify(state.typeOptions))
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
    localStorage.setItem('Awareness:CadOptions', JSON.stringify(state.cadOptions))
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
    localStorage.setItem('Awareness:IssOptions', JSON.stringify(state.issOptions))
  },
  ///
  SET_REF(state, payload) {
    state.referral = payload
    localStorage.setItem('Awareness:Referral', JSON.stringify(payload))
  },
  SET_GOV(state, payload) {
    state.governorate = payload
    localStorage.setItem('Awareness:Gov', JSON.stringify(payload))
    state.district = null
    state.cadaster = null
    state.iss = null
    state.saved = true
    state.cadOptions = []
    state.issOptions = []
  },
  SET_DIS(state, payload) {
    state.district = payload
    localStorage.setItem('Awareness:Dis', JSON.stringify(payload))
    state.cadaster = null
    state.iss = null
    state.cadOptions = []
    state.issOptions = []
  },
  SET_TYPE(state, payload) {
    state.type = payload
    localStorage.setItem('Awareness:Type', JSON.stringify(payload))
    state.cadaster = null
    state.iss = null
    state.saved = true
    state.cadOptions = []
    state.issOptions = []
  },
  SET_CAD(state, payload) {
    state.cadaster = payload
    localStorage.setItem('Awareness:Cadaster', JSON.stringify(payload))
    state.iss = null
    state.issOptions = []
  },
  SET_ISS(state, payload) {
    state.iss = payload
    localStorage.setItem('Awareness:ISS', JSON.stringify(payload))
  },
  SET_RANG_DAT(state, payload) {
    state.rangedate = payload
    localStorage.setItem('Awareness:RangeDate', JSON.stringify(payload))
  },
  // Cases
  SET_ITEM(state, payload) {
    state.caseItem = payload
  },
  SET_FIELD(state, payload) {
    state.caseField = payload
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
  ///
  SET_COMMENTS(state, payload) {
    state.comments = payload
  },
  SET_FEEDBACK(state, payload) {
    state.feedback = payload
  },
  SET_MALE_COUNT(state, payload) {
    state.malecount = payload
  },
  SET_FEMALE_COUNT(state, payload) {
    state.femalecount = payload
  },
  SET_HOUSEHOLD_COUNT(state, payload) {
    state.household = payload
  },
}
