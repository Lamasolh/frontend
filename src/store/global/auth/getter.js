export default {
  authUser: state => state.userData,
  loading: state => state.loading,
  loggedIn: state => !!state.userData,
  // Notification
  /* notification: state => state.notification,
  systemNotifications: state => state.systemNotifications, */
}
