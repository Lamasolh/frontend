/* eslint-disable import/no-cycle */
import store from '@/store'

export default {
  // Global
  SET_SAVED(state, payload) {
    state.saved = payload
  },
  SET_SHOW(state, payload) {
    state.show = payload
  },
  SET_NOTE(state, payload) {
    state.note = payload
  },
  CALC_SCORE(state) {
    let cl = 0
    if (state.info_status === true) {
      cl += 1
    }
    if (state.family_status === true) {
      cl += 1
    }
    if (state.pcr_photo_status === true) {
      cl += 1
    }
    if (state.pcr_date_status === true) {
      cl += 1
    }
    if (state.socio_status === true) {
      cl += 1
    }
    if (state.address_status === true) {
      cl += 1
    }
    if (state.delivery_verify === true) {
      cl += 1
    }
    if (state.awrns_status === true) {
      cl += 1
    }
    console.log('cl', cl)
    state.percentage = (cl / 8) * 100
    console.log('prc', state.percentage)
  },
  //
  SET_INFO_STATUS(state, payload) {
    state.info_status = payload
    store.commit('monitoringView/CALC_SCORE')
  },
  SET_DIS_KIT(state, payload) {
    state.ditrib_kits = payload
  },
  SET_FAMILY_STATUS(state, payload) {
    state.family_status = payload
    store.commit('monitoringView/CALC_SCORE')
  },
  SET_PCR_DATE_STATUS(state, payload) {
    state.pcr_date_status = payload
    store.commit('monitoringView/CALC_SCORE')
  },
  SET_PCR_PHOTO_STATUS(state, payload) {
    state.pcr_photo_status = payload
    store.commit('monitoringView/CALC_SCORE')
  },

  SET_SOCIO_STATUS(state, payload) {
    state.socio_status = payload
    store.commit('monitoringView/CALC_SCORE')
  },

  SET_ADDRESS_STATUS(state, payload) {
    state.address_status = payload
    store.commit('monitoringView/CALC_SCORE')
  },
  SET_DELIVERY_STATUS(state, payload) {
    state.delivery_verify = payload
    store.commit('monitoringView/CALC_SCORE')
  },
  SET_AWRN_STATUS(state, payload) {
    state.awrns_status = payload
    store.commit('monitoringView/CALC_SCORE')
  },
  SET_OVER(state, payload) {
    state.over = payload
  },
}
