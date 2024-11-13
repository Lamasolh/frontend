export default {
  ADD_NAVLIST(state, payload) {
    state.nav.push(payload.data)
  },
  RESET_NAVLIST(state) {
    state.nav = [
      {
        title: 'Dashboard',
        route: 'dashboard',
        icon: 'HomeIcon',
        resource: 'Home',
        action: 'read',
      },
    ]
  },
}
