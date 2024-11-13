/* eslint-disable import/no-cycle */
import * as API from '@/services/API'
import store from '@/store'

export default {
  GET_DATA({ state }, payload) {
    return API.apiClient
      .get('/api/dt_collect/getDataCollectionData', {
        params: {
          iss: payload.iss,
        },
      })
      .then(resp => {
        console.log(resp)
        state.waterSourceType = []
        state.waterSourceStatus = []
        state.pitType = []
        state.pitStatus = []
        state.installedBy = []
        state.latType = []
        state.latLocation = []
        state.latStatus = []
        state.altPit = []
        state.tankStatus = []
        state.tentStatus = []
        state.tentType = []
        state.famRelation = []
        state.gender = []
        state.nationality = []
        state.disability = []
        state.marital_status = []
        /// /
        state.listWTR = []
        state.listTNT = []
        state.listTNK = []
        state.listFAM = []
        state.listMEM = []
        state.listPIT = []
        state.istLAT = []
        if (Object.entries(resp.data).length !== 0) {
          resp.data.options.wtrSourceType.forEach(element => {
            state.waterSourceType.push(element)
          })
          resp.data.options.wtrSourceStatus.forEach(element => {
            state.waterSourceStatus.push(element)
          })

          resp.data.options.pitType.forEach(element => {
            state.pitType.push(element)
          })
          resp.data.options.pitStatus.forEach(element => {
            state.pitStatus.push(element)
          })
          resp.data.options.installedBy.forEach(element => {
            state.installedBy.push(element)
          })

          resp.data.options.latType.forEach(element => {
            state.latType.push(element)
          })
          resp.data.options.latLocation.forEach(element => {
            state.latLocation.push(element)
          })
          resp.data.options.latStatus.forEach(element => {
            state.latStatus.push(element)
          })
          resp.data.options.altPit.forEach(element => {
            state.altPit.push(element)
          })
          resp.data.options.tankStatus.forEach(element => {
            state.tankStatus.push(element)
          })
          resp.data.options.tentStatus.forEach(element => {
            state.tentStatus.push(element)
          })
          resp.data.options.tentType.forEach(element => {
            state.tentType.push(element)
          })
          resp.data.options.famRelation.forEach(element => {
            state.famRelation.push(element)
          })

          resp.data.options.gender.forEach(element => {
            state.gender.push(element)
          })
          resp.data.options.nationality.forEach(element => {
            state.nationality.push(element)
          })
          resp.data.options.disability.forEach(element => {
            state.disability.push(element)
          })
          resp.data.options.maritalStatus.forEach(element => {
            state.maritalStatus.push(element)
          })
          /// //
          store.commit('dtWTR/SET_ITEM', resp.data.list.water_sources)
          store.commit('dtTNT/SET_ITEM', resp.data.list.tents)
          store.commit('dtTNK/SET_ITEM', resp.data.list.tanks)
          store.commit('dtTNK/SET_ITEM_WTR', resp.data.list.tank_water_source)
          store.commit('dtFAM/SET_ITEM', resp.data.list.family)
          store.commit('dtMEM/SET_ITEM', resp.data.list.member)
          store.commit('dtPIT/SET_ITEM', resp.data.list.pits)
          store.commit('dtLAT/SET_ITEM', resp.data.list.latrine)
          store.commit('dtFAM/SET_ITEM_REC', resp.data.list.family_record)

          store.commit('dtFAM/SET_ITEM', resp.data.list.family)
          store.commit('dtLAT/SET_ITEM_PIT', resp.data.list.latrine_pit)
          store.commit('dtTNT/SET_ITEM_FAM', resp.data.list.tent_family)
          store.commit('dtTNT/SET_ITEM_TANK', resp.data.list.tent_tank)
          store.commit('dtTNT/SET_ITEM_LAT', resp.data.list.tent_latrines)
          store.commit('dtTNT/SET_ITEM_PIT', resp.data.list.tent_pit)
        }
        state.show = false
        return resp
      })
      .catch(error => {
        state.show = false
        throw Error(error)
      })
  },
  REFRESH({ state, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      state.show = true
      state.saved = false
      state.waterSourceType = []
      state.waterSourceStatus = []
      dispatch('GET_DATA', {
        iss: payload.iss,
      })
        .then(res => {
          state.show = false
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
}
