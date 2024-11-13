/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

export default {
  SET_SAVED(state, payload) {
    state.saved = payload
  },
  SET_SHOW(state, payload) {
    state.show = payload
  },
  // Filter
  SET_ORG(state, payload) {
    state.orginizataion = payload
    state.markers = []
    state.markersOrigin = []
    state.selectedCase = []
  },
  SET_GOV(state, payload) {
    state.governorate = payload
    state.district = null
    state.type = null
    state.cadaster = null
    state.iss = null
    state.typeOptions = []
    state.markers = []
    state.markersOrigin = []
    state.selectedCase = []
  },
  SET_DIS(state, payload) {
    state.district = payload
    state.type = null
    state.cadaster = null
    state.iss = null
    state.typeOptions = []
    state.markers = []
    state.markersOrigin = []
    state.selectedCase = []
  },
  SET_TYPE(state, payload) {
    state.type = payload
    if (payload == null ? false : payload.value > 1) {
      state.cadaster = null
    }
    state.cadaster = null
    state.iss = null
    state.markers = []
    state.markersOrigin = []
    state.selectedCase = []
  },
  SET_CAD(state, payload) {
    state.cadaster = payload
    state.iss = null
    state.markers = []
    state.markersOrigin = []
    state.selectedCase = []
  },
  SET_ISS(state, payload) {
    state.iss = payload
    state.markers = []
    state.markersOrigin = []
    state.selectedCase = []
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
  ADD_ISS(state, payload) {
    state.issOptions = []
    payload.forEach(el => {
      state.issOptions.push({
        title: el.is_name,
        title_ar: el.is_name_ar,
        value: el.is_id,
        parms: el.cad_id,
      })
    })
  },
  ADD_TYPE(state, payload) {
    state.typeOptions = []
    payload.forEach(el => {
      state.typeOptions.push({
        title: el.name,
        title_ar: el.name_ar,
        value: el.st_id,
      })
    })
  },
  ADD_ALL_ORGData(state, payload) {
    state.orgOptions = []
    payload.data.forEach(el => {
      state.orgOptions.push({
        title: el.org_name,
        title_ar: el.org_disp_name,
        value: el.org_id,
      })
    })
  },
  SET_PUSH_MARKER(state, payload) {
    console.log(payload)
    state.markers.push({
      id: payload.marker_id,
      type: payload.type,
      color: payload.marker_color,
      infoText: `<b>${payload.name} ${payload.marker_color === 3 ? `<b class="text-danger">(Reserved by ${payload.org_assigned})</b>` : ''}</b>`,
      org_name: payload.org_assigned,
      org_id: payload.org_id,
      name: payload.name,
      icon: {
        url: require(`@/assets/images/markers/marker_${payload.type}_${payload.marker_color}.png`), // url
        // scaledSize: this.google && new window.google.maps.Size(28, 28),
        size: {
          width: 50, height: 60, f: 'px', b: 'px',
        },
        scaledSize: {
          width: 40, height: 50, f: 'px', b: 'px',
        },
      },
      position: {
        lat: payload.marker_latitude,
        lng: payload.marker_longitude,
      },
    })
  },
  EDIT_MARKER(state, payload) {
    // eslint-disable-next-line no-nested-ternary
    const newColor = payload.color === 1 ? 2 : (payload.color === 3 ? 2 : 1)
    state.markers.filter(x => x.id === payload.id)[0].color = newColor
    state.markers.filter(x => x.id === payload.id)[0].icon.url = require(`@/assets/images/markers/marker_${payload.type}_${newColor}.png`)
    if (payload.color !== 3) {
      if (state.markers.filter(it => it.id === payload.id)[0].color === state.markersOrigin.filter(it => it.id === payload.id)[0].color) {
        for (let i = 0; i < state.selectedCase.length; i += 1) {
          console.log('state.selectedCase[0]')
          console.log(state.selectedCase)
          if (state.selectedCase[i].id === payload.id) {
            state.selectedCase.splice(i, 1)
          }
        }
      } else {
        state.selectedCase.push(state.markers.filter(it => it.id === payload.id)[0])
      }
    }
  },
  EDIT_DEL_MARKER(state, payload) {
    // eslint-disable-next-line no-nested-ternary
    const newColor = payload.color === 1 ? 2 : (payload.color === 3 ? 2 : 1)
    state.markers.filter(x => x.id === payload.id)[0].color = newColor
    state.markers.filter(x => x.id === payload.id)[0].icon.url = require(`@/assets/images/markers/marker_${payload.type}_${newColor}.png`)
  },
  ///
  SET_MARKER(state, payload) {
    state.markerRow = payload
  },
  SET_MARKER_ORIGIN(state, payload) {
    state.markerOriginal = payload
  },
  SET_SELECT_ITEM(state, payload) {
    state.selectedCase = payload
    state.saved = true
  },
  /// /
  SET_MAP_CENTER(state, payload) {
    console.log(payload)
    state.centerMap = payload
    console.log(state.centerMap)
  },
}
