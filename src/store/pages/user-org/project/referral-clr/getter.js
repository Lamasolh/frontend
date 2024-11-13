export default {
  referral: state => state.referral,
  district: state => state.district,
  municipality: state => state.municipality,
  priority: state => state.priority,
  items: state => state.items,
  lastId(state) {
    if (state.items == null || state.items.length === 0) {
      return 0
    }
    const op = [...state.items]
    return op.slice(-1).pop().id
  },
  phone: state => state.phone,
  saved: state => state.saved,
  lastIdField(state) {
    if (state.filedOptions == null || state.filedOptions.length === 0) {
      return 0
    }
    const op = [...state.filedOptions]
    return op.slice(-1).pop().id
  },
}
