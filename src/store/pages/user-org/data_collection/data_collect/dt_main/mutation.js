import Vue from 'vue'

export default {
  SET_SAVED(state, payload) {
    state.saved = payload
  },
  SET_SHOW(state, payload) {
    state.show = payload
  },
  /// lIST
  SET_WTR(state, payload) {
    state.showModalWTR = payload
  },

  /// Modal
  SET_MOD_WTR(state, payload) {
    state.showModalWTR = payload
  },
  SET_MOD_TNT(state, payload) {
    state.showModalTNT = payload
  },
  SET_MOD_TNK(state, payload) {
    state.showModalTNK = payload
  },
  SET_MOD_FAM(state, payload) {
    state.showModalFAM = payload
  },
  SET_MOD_MEM(state, payload) {
    state.showModalMEM = payload
  },
  SET_MOD_PIT(state, payload) {
    state.showModalPIT = payload
  },
  SET_MOD_LAT(state, payload) {
    state.showModalLAT = payload
  },
  SET_MOD_LAT_EXP(state, { key, value }) {
    Vue.set(state.showModalLAT, key, value)
  },
  SET_MOD_FAM_EXP(state, { key, value }) {
    Vue.set(state.showModalFAM, key, value)
  },
  SET_MOD_TNK_EXP(state, { key, value }) {
    Vue.set(state.showModalTNK, key, value)
  },
  SET_MOD_MEM_EXP(state, { key, value }) {
    Vue.set(state.showModalMEM, key, value)
  },
  SET_MOD_MEM_FAM(state, payload) {
    state.showModalFamMEM = payload
  },
  SET_MOD_MEM_FAM_GEN(state, payload) {
    state.showModalFAMGen = payload
  },
  SET_MOD_MEM_FAM_GEN_EXP(state, { key, value }) {
    Vue.set(state.showModalFAMGen, key, value)
  },
  SET_MOD_MEM_FAM_EXP(state, { key, value }) {
    Vue.set(state.showModalFamMEM, key, value)
  },

  SET_MOD_TNT_EXP(state, { key, value }) {
    Vue.set(state.showModalTNT, key, value)
  },
}
