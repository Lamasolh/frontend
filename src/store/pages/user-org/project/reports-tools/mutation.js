export default {
  SET_SHOW(state, payload) {
    state.show = payload
  },
  SET_SAVED(state, payload) {
    state.saved = payload
  },
  /// Activity
  SET_RNG_SECTOR(state, payload) {
    state.range_rep_sector = payload
  },
  /// Activity
  SET_RNG_ACTIVITY(state, payload) {
    state.range_rep_activity = payload
  },
  SET_ACTIVITY_FIELD(state, payload) {
    state.activityField = payload
  },
  SET_ACTIVITY_ITEM(state, payload) {
    state.activityItem = payload
  },
  ///
  SET_RNG_CASE(state, payload) {
    state.range_rep_case = payload
  },
  ///
  SET_INV_FIELD(state, payload) {
    state.invField = payload
  },
  SET_INV_ITEM(state, payload) {
    state.invItem = payload
  },
  // cad
  SET_CAD_FIELD(state, payload) {
    state.cadField = payload
  },
  SET_CAD_ITEM(state, payload) {
    state.cadItem = payload
  },
  SET_YEAR(state, payload) {
    state.year = payload
  },
}
