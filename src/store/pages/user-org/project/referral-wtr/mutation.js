export default {
  SET_SAVED(state, payload) {
    state.saved = payload
  },
  SET_SHOW(state, payload) {
    state.show = payload
  },
  // Items
  ADD_ITEMS(state, payload) {
    state.items.push({
      id: payload.id,
      name: payload.name,
    })
  },
}
