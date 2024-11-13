export default {
  // Data
  SET_ITEM(state, payload) {
    state.items = payload
  },
  SET_ITEM_FAM(state, payload) {
    state.itemsFam = payload
  },
  SET_ITEM_TANK(state, payload) {
    state.itemsTank = payload
  },
  SET_ITEM_LAT(state, payload) {
    state.itemsLat = payload
  },
  SET_ITEM_PIT(state, payload) {
    state.itemsPit = payload
  },

  // Options
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

  SET_SAVED(state, payload) {
    state.saved = payload
  },
  SET_SHOW(state, payload) {
    state.show = payload
  },
}
