/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'
import SvgImage from '@/libs/markerImage'

export default {
  GET_GEO_SEARCH({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/usermanager/get-role-org-search', {
          params: {
            prefix: payload.prefix,
            gov: state.governorate == null ? null : state.governorate.value,
            dis: state.district == null ? null : state.district.value,
            cad: state.municipality == null ? null : state.municipality.value,
            type: state.type == null ? null : state.type.value,
          },
        })
        .then(resp => {
          console.log('resp', resp)
          state.orgMarker = []
          resp.data.lst.forEach(async el => {
            const org = resp.data.org.filter(it => it.org_id === el.org_id)[0]
            state.orgMarker.push({
              infoText: `<b class="text-success">Org Name:${org.org_name}</b>
              <br><b class="text-info">Governorate:${el.governorate_name}</b>
              <br><b class="text-info">District:${el.district_name_eng}</b>
              <br><b class="text-info">Cadaster:${el.cadastre_name}</b>
              <br><b class="text-info">Settlement type:${el.type_name}</b>
              <br><b class="text-info">Settlement name:${el.is_name == null ? 'None' : el.is_name}</b>
              `,
              icon: {
                url: await SvgImage(org.org_logo), // url
                size: new window.google.maps.Size(50, 50),
                scaledSize: new window.google.maps.Size(50, 50),
                labelOrigin: this.google && new window.google.maps.Point(16, -10),
              },
              id: el.org_id,
              position: {
                lat: parseFloat(el.latitude),
                lng: parseFloat(el.longitude),
              },
            })
          })
          console.log(state.orgMarker)
          state.show = false
          resolve(resp.data.lst)
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },
  GET_TYPE({ state, commit }) {
    state.show = true
    return new Promise(((resolve, reject) => {
      API.apiClient
        .get('/api/manager/get_type', {
          params: {
            district: state.district.value,
          },
        })
        .then(resp => {
          console.log(resp)
          commit('ADD_TYPE', resp.data.result)
          console.log(state.typeOptions)
          state.show = false
          resolve(resp)
        })
        .catch(error => {
          state.show = false
          console.log(error)
          reject(error)
        })
    }))
  },
  GET_CAD({ state, commit }) {
    state.show = true
    return new Promise(((resolve, reject) => {
      API.apiClient
        .get('/api/manager/get_cad', {
          params: {
            district: state.district == null ? null : state.district.value,
            type: state.type.value,
          },
        })
        .then(resp => {
          console.log(resp)
          commit('ADD_CAD', resp.data.result)
          state.show = false
          resolve(resp)
        })
        .catch(error => {
          state.show = false
          console.log(error.response)
          reject(error)
        })
    }))
  },
}
