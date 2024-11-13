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
  SET_GOV(state, payload) {
    state.governorate = payload
    state.district = null
    state.municipality = null
  },
  SET_DIS(state, payload) {
    state.district = payload
    state.municipality = null
  },
  SET_MUN(state, payload) {
    state.municipality = payload
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
