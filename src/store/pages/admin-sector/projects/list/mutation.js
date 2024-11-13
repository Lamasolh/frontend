export default {
  SET_NAME(state, payload) {
    state.district = payload
  },
  SET_PREF(state, payload) {
    state.proj_prefix = payload
  },
  SET_TYPE(state, payload) {
    state.proj_type = payload
  },
  // Data
  SET_DATE(state, payload) {
    state.proj_date = payload
    state.saved = false
  },
  SET_FILTER(state, payload) {
    state.filter = payload
  },
  SET_FILTER_ON(state, payload) {
    state.filterOn.push(payload)
  },
  SET_ITEM(state, payload) {
    state.caseProject = payload
    state.saved = false
  },
  SET_SELECT_ITEM(state, payload) {
    state.selectedCase = payload
    state.saved = true
  },
  SET_SELECT_PROJ_ITEM(state, payload) {
    state.selectedProjCase = payload
    state.saved = true
  },
  SET_DEAD(state, payload) {
    state.proj_deadline = payload
  },
  // Options
  SET_PER_PAGE(state, payload) {
    state.perPage = payload
  },
  SET_CUR_PAGE(state, payload) {
    state.currentPage = payload
  },
  SET_ORG(state, payload) {
    state.proj_org = payload
  },
  SET_ACT(state, payload) {
    state.proj_active = payload
  },
  SET_SORT_BY(state, payload) {
    state.sortBy = payload
  },
  SET_SORT_DESC(state, payload) {
    state.sortDesc = payload
  },
  SET_SAVED(state, payload) {
    state.saved = payload
  },
  SET_SHOW(state, payload) {
    state.show = payload
  },
}
