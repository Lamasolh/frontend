/* eslint-disable prefer-destructuring */
// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  GET_DATA({ state, commit }, payload) {
    state.show = true
    console.log(payload)
    return new Promise((resolve, reject) => API.apiClient
      .get('/api/manager/getprojectdata', {
        params: {
          proj_id: payload.isValue.proj_id,
        },
      })
      .then(resp => {
        console.log(resp)
        if (Object.entries(resp.data).length !== 0) {
          let isSet = 0
          if (payload.isValue !== '') {
            const sett = resp.data.setting[0]
            state.validationName = sett.proj_set_valid_name
            state.periodDuplicate = sett.proj_set_dup_period
            state.periodDuration = sett.proj_set_priority_dur
            state.graceDuration = sett.link_grace_dur
            isSet = sett.assmnt_type
            // Items
            state.items = []
            state.itemsIndicators = []
            state.unitOptions = []

            resp.data.unit.forEach(element => {
              state.unitOptions.push({
                value: element.id,
                title: element.name,
              })
            })
            let num = 1
            resp.data.item_details.forEach(element => {
              commit('ADD_ITEMS', {
                id: num,
                active: element.active,
                main: element.is_main_item,
                inId: element.items_id,
                name: element.items_name,
                name_ar: element.items_name_ar,
                desc: element.items_description,
                minim_dist: element.minim_dist,
                max_dist: element.max_dist,
              })
              num += 1
            })
            commit('ADD_TYPE_IND', resp.data.typeIndOptions)
            let num1 = 1
            resp.data.ind_details.forEach(element => {
              console.log('eee', element)
              commit('ADD_ITEMS_IND', {
                id: num1,
                inId: element.id,
                active: element.active,
                name: element.name,
                type: state.typeIndOptions.filter(el => el.value === element.type)[0],
                require: element.ind_require === 1,
                desc: element.ind_desc,
                isInd: JSON.parse(element.in_pages).isInd ?? false,
              })
              num1 += 1
            })

            console.log(state.itemsIndicators)
          } else {
            state.validationName = null
            state.periodDuplicate = 0
            state.periodDuration = 0
            state.graceDuration = 0
            ///
            state.items = [
              {
                id: 1,
                active: null,
                main: null,
                inId: null,
                name: null,
                name_ar: null,
                desc: null,
                minim_dist: null,
                max_dist: null,
              },
            ]
            state.itemsIndicators = [
              {
                id: 1,
                inId: null,
                active: null,
                name: null,
                type: null,
                require: false,
                desc: null,
              },
            ]
          }
          commit('ADD_ICONS', resp.data.iconOptions)
          commit('ADD_PROJ_TYPE', resp.data.typeOptions)
          commit('ADD_ASSMNT', resp.data.assmentOption)
          if (isSet !== 0) {
            state.assmntType = state.assmntOptions.filter(
              it => it.value === isSet,
            )[0]
          } else {
            state.assmntType = null
          }
        }
        state.show = false
        resolve(resp)
      })
      .catch(error => {
        console.log(error.response)
        state.show = false
        reject(error)
      }))
  },
  SAVE_DATA({ state }, payload) {
    state.show = true
    console.log(state.name)
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/manager/saveproject', {
          proj_id: payload.proj_id,
          name: state.name,
          prefix: state.prefix,
          description: state.description,
          iconValue: state.iconValue.title,
          //
          validationName: 'interval',
          periodDuplicate: state.periodDuplicate,
          periodDuration: state.periodDuration,
          graceDuration: state.graceDuration,
          /// Type
          projecttype: state.projecttype.value,
          assmntType: state.assmntType.value,
          // Item
          items: state.items,
          itemsIndicators: state.itemsIndicators,
          // Item
          srcMin: state.srcMin,
          srcMax: state.srcMax,
          srcUnit: state.srcUnit,
          srcType: state.srcType,
        })
        .then(resp => {
          console.log(resp)
          state.show = false
          resolve(resp.data[0][0])
        })
        .catch(error => {
          console.log(error.response)
          state.show = false
          reject(error)
        })
    })
  },
  SAVE_ITEM_DATA({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/manager/saveitemproject', {
          proj_prefix: payload.proj_prefix,
          itemname: state.itemname,
          itemdesc: state.itemdesc,
          type: state.projecttype,
        })
        .then(resp => {
          state.show = false
          resolve(resp)
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },
}
