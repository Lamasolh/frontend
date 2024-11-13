/* eslint-disable import/no-cycle */

export default {
  // Global
  SET_SAVED(state, payload) {
    state.saved = payload
  },
  SET_SHOW(state, payload) {
    state.show = payload
  },
  SET_NOTE(state, payload) {
    state.note = payload
  },
  SET_SHOW_EDIT(state, payload) {
    state.showEdit = payload
  },
  SET_EDIT_ITEM(state, payload) {
    state.editItem = payload
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
  SET_TAB(state, payload) {
    state.tab = payload
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
  SET_FILTER_TNT(state, payload) {
    state.filterTent = payload
  },
  SET_FILTER_ON_TNT(state, payload) {
    state.filterOnTent.push(payload)
  },
}
