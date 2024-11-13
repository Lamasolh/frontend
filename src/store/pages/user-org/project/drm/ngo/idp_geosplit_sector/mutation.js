import Vue from 'vue'

export default {
  //
  SET_SHOW_END(state, payload) {
    state.showEnd = payload
  },
  SET_END_ITEM(state, payload) {
    state.endItem = payload
  },
  SET_SHOW_EDIT(state, payload) {
    state.showEdit = payload
  },
  SET_EDIT_ITEM(state, payload) {
    state.editItem = payload
  },
  SET_MOD_SIDE(state, { key, value }) {
    Vue.set(state.showModalRef, key, value)
  },
  SET_MOD_SIDE_P(state, payload) {
    state.showModalRef = payload
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
    localStorage.setItem('TaskManager:TypeOptions', JSON.stringify(state.typeOptions))
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
    localStorage.setItem('TaskManager:CadOptions', JSON.stringify(state.cadOptions))
  },
  SET_CASE_ITEM(state, items) {
    state.caseItem = items
  },
  SET_TOTAL_ROWS(state, total) {
    state.totalRows = total
  },
  SET_CURRENT_PAGE(state, page) {
    state.currentPage = page
  },
  SET_PER_PAGE(state, perPage) {
    state.perPage = perPage
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
  SET_CAD_OPT(state, payload) {
    state.cadOptions = payload
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
    state.cadOptions = []
    state.issOptions = []
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
    state.cadOptions = []
    state.issOptions = []
  },
  SET_CAD(state, payload) {
    state.cadaster = payload
    state.iss = null
    state.issOptions = []
  },
  SET_ISS(state, payload) {
    state.iss = payload
  },
  SET_RANG_DAT(state, payload) {
    state.rangedate = payload
  },
  // Data
  SET_ITEM(state, data) {
    console.log(data)
    state.caseItem = data
  },
  SET_FIELD(state, payload) {
    state.caseField = payload
  },
  // Options
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
  SET_MAP_CENTER(state, payload) {
    state.centerMap = payload
  },
  SET_TABLE_FILTERED(state, payload) {
    state.itemTable = payload
  },
  SET_SHOW_REF(state, payload) {
    state.showModalRef = payload
  },
  SET_SEL_USER(state, payload) {
    state.selecteduser = payload
  },
  SET_USER_LIST(state, payload) {
    state.userList = []
    console.log('users', state.userList)
    payload.forEach(el => {
      state.userList.push(
        {
          title: el.full_name,
          value: el.id,
        },
      )
    })
    console.log('s', state.userList)
  },

  SET_SEL_NGO(state, payload) {
    state.selectNgo = payload
  },
  SET_SEL_DRM(state, payload) {
    state.selectedDRM = payload
  },
}
