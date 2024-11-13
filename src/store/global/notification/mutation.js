import Vue from 'vue'
import moment from 'moment'

export default {
  SET_NOT(state, payload) {
    let variant = 'light-info'
    let vari = 'info'
    let priority = 'Normal'
    switch (Number(payload.priority)) {
      case 1:
        variant = 'light-success'
        vari = 'success'
        priority = 'Normal'
        break
      case 2:
        variant = 'light-info'
        priority = 'low'
        vari = 'info'
        break
      case 3:
        variant = 'light-warning'
        priority = 'Medium'
        vari = 'warning'

        break
      case 4:
        variant = 'light-danger'
        priority = 'Urgent'
        vari = 'danger'
        break
      default:
        variant = 'light-success'
        priority = 'Normal'
        vari = 'success'
    }
    const nt = {
      id: payload.id, // Id From Database
      title: payload.title,
      subtitle: payload.subtitle,
      title_ar: payload.title_ar,
      subtitle_ar: payload.subtitle_ar,
      avatar: payload.action == null ? 'InfoIcon' : 'PlayIcon',
      badge: payload.badge,
      type: payload.type,
      variant,
      color: vari,
      priority,
      pr: payload.priority,
      action: payload.action,
      read: payload.read, // time of read
      time: payload.time, // Id From Database
      ago: moment(payload.time).fromNow(),
    }
    state.notification.unshift(nt)
    setInterval(() => {
      if (state.notification.filter(ite => ite.id === payload.id)[0] != null) {
        state.notification.filter(ite => ite.id === payload.id)[0].ago = moment(payload.time).fromNow()
      }
    }, 30000)
  },
  UPDATE_NOTIFICATION: (state, id) => {
    Vue.set(state.notification[id], 'read', true)
  },
  UPDATE_NOTIFICATION_ID: (state, id) => {
    state.notification.filter(it => it.id === id)[0].read = Date.now()
  },
}
