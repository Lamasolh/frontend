/* eslint-disable import/no-cycle */
import store from '@/store'
import Vue from 'vue'

export default {
  SET_DATA(state, { key, value }) {
    Vue.set(state.data, key, value)
    if (key === 'gender') {
      Vue.set(state.data, 'gender_id', value.value)
    }
  },
  SET_CON(state, { key, value }) {
    Vue.set(state.country, key, value)
    const phone = (state.country.id === 1 ? '961' : '963') + state.country.number
    store.commit('profile/SET_DATA', { key: 'phone', value: phone })
  },
  SET_SHOW(state, payload) {
    state.show = payload
  },
}
