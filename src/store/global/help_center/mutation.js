export default {
  SET_SHOW(state, payload) {
    state.show = payload
  },
  // FLoat
  /// Direct Message
  SET_EMAIL(state, payload) {
    state.email = payload
  },
  SET_SUBJECT(state, payload) {
    state.subject = payload
  },
  SET_MESSAGE(state, payload) {
    state.message = payload
  },
  // Change Admin
  SET_CHANGE_ADMIN(state, payload) {
    state.orgadmin = payload
  },
  // Change org email
  SET_CHANGE_ORG_EMAIL(state, payload) {
    state.emaiLadmin = payload
  },
  // Change org admin email
  SET_CHANGE_ORG_ADMIN(state, payload) {
    state.emaiLorg = payload
  },

  /// //////// links
  ADD_USERS_OPTIONS(state, payload) {
    state.userOptions = []
    console.log(payload)
    payload.data.forEach(el => {
      state.userOptions.push({
        title: `${el.first_name} ${el.last_name}`,
        value: el.id,
      })
    })
  },
  // Change Admin
  SET_CHANGE_ADMIN_LINK(state, payload) {
    state.userAdminChange = payload
  },
  // Change org email
  SET_CHANGE_ORG_EMAIL_LINK(state, payload) {
    state.changeOrgEmail = payload
  },
  // Change org admin email
  SET_CHANGE_ORG_ADMIN_LINK(state, payload) {
    state.changeAdminEmail = payload
  },
}
