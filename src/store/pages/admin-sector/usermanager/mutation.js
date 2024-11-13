export default {
  SET_SAVED(state, payload) {
    state.saved = payload
  },
  SET_SHOW(state, payload) {
    state.show = payload
  },
  /* RESET_STATE(state) {
    Object.assign(state, getDefaultState())
  }, */
  // Filters
  SET_REF(state, payload) {
    state.referral = payload
  },
  SET_DIS(state, payload) {
    state.district = payload
    state.municipality = null
  },
  SET_MUN(state, payload) {
    state.municipality = payload
  },
  SET_RANG_DAT(state, payload) {
    state.rangedate = payload
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
}
