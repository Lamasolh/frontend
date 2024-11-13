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
    localStorage.setItem('caseAssignment:TypeOptions', JSON.stringify(state.typeOptions))
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
    localStorage.setItem('caseAssignment:CadOptions', JSON.stringify(state.cadOptions))
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
    localStorage.setItem('caseAssignment:IssOptions', JSON.stringify(state.issOptions))
  },
  ///
  SET_REF(state, payload) {
    state.referral = payload
    localStorage.setItem('caseAssignment:Referral', JSON.stringify(payload))
  },
  SET_GOV(state, payload) {
    state.governorate = payload
    localStorage.setItem('caseAssignment:Gov', JSON.stringify(payload))
    state.district = null
    state.cadOptions = []
    state.issOptions = []
    state.cadaster = null
    state.iss = null
    state.saved = true
  },
  SET_DIS(state, payload) {
    state.district = payload
    localStorage.setItem('caseAssignment:Dis', JSON.stringify(payload))
    state.cadOptions = []
    state.issOptions = []
    state.cadaster = null
    state.iss = null
  },
  SET_TYPE(state, payload) {
    state.type = payload
    localStorage.setItem('caseAssignment:Type', JSON.stringify(payload))
    state.cadaster = null
    state.iss = null
    state.saved = true
  },
  SET_CAD(state, payload) {
    state.cadaster = payload
    localStorage.setItem('caseAssignment:Cadaster', JSON.stringify(payload))
    state.issOptions = []
    state.iss = null
  },
  SET_ISS(state, payload) {
    state.iss = payload
    localStorage.setItem('caseAssignment:ISS', JSON.stringify(payload))
  },
  SET_RANG_DAT(state, payload) {
    state.rangedate = payload
    localStorage.setItem('caseAssignment:RangeDate', JSON.stringify(payload))
  },
  SET_CAD_OPT(state, payload) {
    state.cadOptions = payload
    localStorage.setItem('caseAssignment:CadOptions', JSON.stringify(payload))
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
    localStorage.setItem('caseAssignment:PerPage', JSON.stringify(payload))
  },
  SET_CUR_PAGE(state, payload) {
    state.currentPage = payload
  },
  SET_SORT_BY(state, payload) {
    state.sortBy = payload
    localStorage.setItem('caseAssignment:sortBy', JSON.stringify(payload))
  },
  SET_SORT_DESC(state, payload) {
    state.sortDesc = payload
    localStorage.setItem('caseAssignment:sortDesc', JSON.stringify(payload))
  },
  SET_SORT_DIR(state, payload) {
    state.sortDirection = payload
    localStorage.setItem('caseAssignment:sortDirection', JSON.stringify(payload))
  },
  SET_FILTER(state, payload) {
    state.filter = payload
  },
  SET_FILTER_ON(state, payload) {
    state.filterOn.push(payload)
    localStorage.setItem('caseAssignment:filterOn', JSON.stringify(payload))
  },

  SET_ASS_TO(state, payload) {
    state.isAssignSidebarActive = payload
  },
  SET_USER(state, payload) {
    state.usersValue = payload
    state.saved = true
  },
  SET_SELECT_ITEM(state, payload) {
    state.selectedCase = payload
    state.saved = true
  },
  SET_SELECT_USER_ITEM(state, payload) {
    state.selectedUserCase = payload
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
}
