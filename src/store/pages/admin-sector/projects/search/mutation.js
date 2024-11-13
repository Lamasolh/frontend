export default {
  SET_SAVED(state, payload) {
    state.saved = payload
  },
  SET_SHOW(state, payload) {
    state.show = payload
  },
  /// Search
  SET_MARKER_ITEM(state, payload) {
    state.orgMarker = payload
  },
  CLEAR_MARKER_ITEM(state) {
    state.orgMarker = []
  },
  SET_ORG_ITEM(state, payload) {
    state.orgMarker.push(payload)
  },
  REM_ORG_ITEM(state, payload) {
    state.orgMarker.splice(payload, 1)
  },
  SET_GOV(state, payload) {
    state.governorate = payload
    state.district = null
    state.municipality = null
    state.orgMarker = []
  },
  SET_DIS(state, payload) {
    state.district = payload
    state.municipality = null
    state.orgMarker = []
  },
  SET_MUN(state, payload) {
    state.municipality = payload
    state.orgMarker = []
  },
  SET_TYPE(state, payload) {
    state.type = payload
    state.municipality = null
    state.orgMarker = []
  },
  ADD_TYPE(state, payload) {
    console.log(payload)
    state.typeOptions = []
    payload.forEach(el => {
      state.typeOptions.push({
        title: el.name,
        title_ar: el.name_ar,
        value: el.st_id,
      })
    })
  },
  ADD_CAD(state, payload) {
    state.cadOptions = []
    payload.forEach(el => {
      state.cadOptions.push({
        title: el.cadastre_name,
        title_ar: el.cadastre_name_ar,
        value: el.cadastre_id,
      })
    })
  },
  TOGGLE(state, payload) {
    state.infoWinOpen = payload
  },

}
