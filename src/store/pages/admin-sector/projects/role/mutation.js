import Vue from 'vue'

export default {
  SET_SAVED(state, payload) {
    state.saved = payload
  },
  SET_SHOW(state, payload) {
    state.show = payload
  },
  SET_ITEM(state, payload) {
    state.rolesItem = payload
  },
  SET_SELECT(state, payload) {
    state.selectItem.push(payload)
  },
  SET_ITEM_ADV(state, { key, value }) {
    Vue.set(state.rolesItem[0], key, value)
  },
  PUSH_ITEM(state, payload) {
    state.rolesItem = []
    setTimeout(() => {
      state.rolesItem.push(payload)
    }, 10)
  },
}
