import Vue from 'vue'

export default {
  SET_SHOW(state, payload) {
    state.show = payload
  },
  SET_DISB(state, payload) {
    state.disabled = payload
  },
  SET_USER_LOGO(state, payload) {
    state.userLogo = payload
  },
  SET_USER_NAME(state, payload) {
    state.userName = payload == null ? null : payload.toLowerCase()
  },
  SET_USER_Status(state, payload) {
    state.userStatus = payload
  },
  SET_USER_PASS(state, payload) {
    state.userPassword = payload
  },
  SET_USER_FN(state, payload) {
    state.userFN = payload
  },
  SET_USER_LN(state, payload) {
    state.userLN = payload
  },
  SET_USER_FNAR(state, payload) {
    state.userFNAR = payload
  },
  SET_USER_LNAR(state, payload) {
    state.userLNAR = payload
  },
  SET_USER_GEN(state, payload) {
    state.userGender = payload
    console.log(state.userGender)
  },
  SET_USER_NAT(state, payload) {
    state.userNat = payload
    console.log(state.userNat)
  },
  SET_USER_DOB(state, payload) {
    console.log('DobBef', payload)
    state.userDOB = payload
    console.log('DobAf', payload)
  },
  SET_USER_MAIL(state, payload) {
    state.userEmail = payload
  },
  SET_USER_PHO(state, payload) {
    state.userPhone = payload
  },
  SET_USER_JOB(state, payload) {
    state.userJob = payload
  },
  SET_USER_BIO(state, payload) {
    state.userBio = payload
  },
  SET_USER_ADD(state, payload) {
    state.userAddress = payload
  },
  SET_ITEM(state, payload) {
    console.log(payload)
    state.rolesItem = payload
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
  SET_ITEM_LOOP_ADV(state, { key, value }) {
    Vue.set(state.rolesItemLoop, key, value)
  },
}
