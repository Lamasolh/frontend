export default {
  referral: state => state.referral,
  district: state => state.district,
  municipality: state => state.municipality,
  priority: state => state.priority,
  items: state => state.items,
  lastId(state) {
    if (state.items == null || state.item === []) {
      return 0
    }
    return state.items.slice(-1).pop()
  },
  phone: state => state.phone,
  saved: state => state.saved,
}
