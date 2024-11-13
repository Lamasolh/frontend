import Vue from 'vue'

export default {
  SET_ITEM(state, { key, value }) {
    Vue.set(state.item, key, value)
  },
  SET_SHOW(state, payload) {
    state.show = payload
  },
}
