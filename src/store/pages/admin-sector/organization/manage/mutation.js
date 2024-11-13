import Vue from 'vue'

export default {
  createOrganization() {
  },
  SET_INFO(state, { key, value }) {
    Vue.set(state.orgDataInfo, key, value)
  },
  SET_ADMIN_INFO(state, { key, value }) {
    Vue.set(state.orgAdminInfo, key, value)
  },

  SET_RES(state, payload) {
    state.reason = payload
  },
  SET_SHOW_REAS_ADV(state, { key, value }) {
    Vue.set(state.showModalReas, key, value)
  },
  SET_SHOW_REAS(state, payload) {
    state.showModalReas = payload
  },
  SET_SHOW_APR_ADV(state, { key, value }) {
    Vue.set(state.showModalApr, key, value)
  },
  SET_SHOW_APR(state, payload) {
    state.showModalApr = payload
  },
  SET_ORG_ID(state, payload) {
    state.orgID = payload
  },
  SET_ORG_TYPE(state, payload) {
    state.orgType = payload
  },
}
