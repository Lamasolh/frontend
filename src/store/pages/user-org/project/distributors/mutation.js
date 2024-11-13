export default {
  SET_SAVED(state, payload) {
    state.saved = payload
  },
  SET_SHOW(state, payload) {
    state.show = payload
  },
  SET_SELECT_CASE(state, payload) {
    state.caseSelect = payload
  },
  SET_SHOW_DELIVERY(state, payload) {
    state.showDelivery = payload
  },
  SET_SHOW_NOT_DELIVERY(state, payload) {
    state.showNotDelivery = payload
  },
  SET_NOT_DEV_Reason(state, payload) {
    state.notDelverySelectReson = payload
  },
  SET_DEV_COMMENT(state, payload) {
    state.delveryComment = payload
  },

  SET_DELV_KIT(state, payload) {
    state.deliveryKit = payload
  },

}
