// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  SAVE_DATA({ state }, payload) {
    state.show = true
    console.log('state.selectedCase')
    console.log(state.selectedCase)
    return new Promise(((resolve, reject) => {
      API.apiClient
        .post('/api/manager/savemanageproject', {
          items: state.selectedCase,
          district: state.district.value,
          type: state.type.value,
          org: state.orginizataion.value,
          prj: payload.prj,
        })
        .then(res => {
          console.log(res)
          if (res.data.valid) {
            state.selectedCase = []
            state.markersOrigin = JSON.parse(JSON.stringify(state.markers))
          }
          state.show = false
          resolve(res.data)
        })
        .catch(error => {
          console.log('error')
          console.log(error)
          state.show = false
          reject(error)
        })

      return payload
    }))
  },
  GET_DATA({ state }, payload) {
    state.show = true
    return new Promise(((resolve, reject) => {
      API.apiClient
        .post('/api/manager/manageproject', {
          params: payload,
        })
        .then(resp => {
          console.log(resp)
          if (Object.entries(resp.data).length !== 0) {
            state.items = []
          // resp.data[0].forEach(element => {
          //   state.items.push(element)
          // })
          }
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
    console.log(state.district.value, state.type.value)
    return new Promise(((resolve, reject) => {
      API.apiClient
        .get('/api/manager/get_cad', {
          params: {
            district: state.district.value,
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
  GET_ISS({ state, commit }) {
    state.show = true
    console.log(state.district.value, state.type.value)
    return new Promise(((resolve, reject) => {
      API.apiClient
        .get('/api/manager/get_iss', {
          params: {
            type: state.type.value,
            cad: state.cadaster.value,
          },
        })
        .then(resp => {
          console.log(resp)
          commit('ADD_ISS', resp.data.result)
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
  GET_MARKER({ state, commit }, payload) {
    state.show = true
    return new Promise(((resolve, reject) => {
      API.apiClient
        .get('/api/manager/get_marker', {
          params: {
            district: state.district.value == null ? null : state.district.value,
            type: state.type == null ? null : state.type.value,
            org: state.orginizataion == null ? null : state.orginizataion.value,
            cad: state.cadaster == null ? null : state.cadaster.value,
            prj: payload,
          },
        })
        .then(resp => {
          console.log(resp)
          if (resp.data.result != null) {
            state.markers = []
            resp.data.result.forEach(el => {
              commit('SET_PUSH_MARKER', el)
            })
            state.markersOrigin = JSON.parse(JSON.stringify(state.markers))
            console.log('Origin', state.markersOrigin)
            console.log('Normal', state.markers)
          }
          state.show = false
          resolve(resp.data.result)
        })
        .catch(error => {
          state.show = false
          console.log(error)
          reject(error)
        })
    }))
  },
  DEL_MARKER({ state, commit }, payload) {
    state.show = true
    return new Promise(((resolve, reject) => {
      API.apiClient
        .post('/api/manager/delete_marker', {
          id: payload.marker.id,
          district: state.district.value,
          type: state.type.value,
          org: payload.marker.org_id,
          prj: payload.prj,
        })
        .then(resp => {
          console.log(resp)
          if (resp.data.result[0].result === 1) {
            const marks = payload.marker
            marks.color = 2
            commit('EDIT_DEL_MARKER', marks)
            state.markersOrigin = JSON.parse(JSON.stringify(state.markers))
            console.log(state.selectedCase)
          }
          state.show = false
          resolve(resp.data.result[0].result)
        })
        .catch(error => {
          console.log('error')
          console.log(error)
          state.show = false
          console.log(error.response)
          reject(error)
        })
    }))
  },
  CHECK_DELETE({ state }, payload) {
    state.show = true
    return new Promise(((resolve, reject) => {
      API.apiClient
        .get('/api/manager/check_all_geosplit', {
          params: {
            org: state.orginizataion == null ? null : state.orginizataion.value,
            prj: payload,
          },
        })
        .then(resp => {
          console.log(resp)
          state.show = false
          resolve(resp.data.result[0])
        })
        .catch(error => {
          state.show = false
          console.log(error)
          reject(error)
        })
    }))
  },
  DEL_ALL({ state }, payload) {
    console.log('DEL_ALL')
    console.log(payload)
    state.show = true
    return new Promise(((resolve, reject) => {
      API.apiClient
        .post('/api/manager/delete_all_geosplit', {
          prj: payload,
          org: state.orginizataion == null ? null : state.orginizataion.value,
        })
        .then(resp => {
          console.log(resp)
          console.log(state.markers)
          console.log(state.markers.length)
          state.district = null
          state.governorate = null
          state.district = null
          state.type = null
          state.cadaster = null
          state.markers = []
          state.markersOrigin = []
          state.selectedCase = []
          state.show = false
          resolve(resp.data.result[0])
        })
        .catch(error => {
          state.show = false
          console.log(error)
          reject(error)
        })
    }))
  },
}
