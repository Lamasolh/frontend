/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  GET_GOV({ state, commit }, payload) {
    state.show = true
    console.log(payload)
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/get_gov_prj', {
          prefix: payload.prefix,
          type: payload.type,
        })
        .then(resp => {
          console.log(resp)
          commit('ADD_GOV', resp.data.res)
          state.show = false
          resolve(resp)
        })
        .catch(error => {
          state.show = false
          console.log(error.response)
          reject(error)
        })
    })
  },
  GET_DIS({ state, commit }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/get_dis_prj', {
          prefix: payload.prefix,
          type: payload.type,
          gov: state.governorate == null
            ? null
            : state.governorate.value,
        })
        .then(resp => {
          console.log(resp)
          commit('ADD_DIS', resp.data.res)
          state.show = false
          resolve(resp)
        })
        .catch(error => {
          state.show = false
          console.log(error.response)
          reject(error)
        })
    })
  },
  GET_CAD({ state, commit }, payload) {
    state.show = true
    console.log('sss')
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/get_cad_prj', {
          prefix: payload.prefix,
          district: state.district == null
            ? null
            : state.district.value,
          type: 4,
        })
        .then(resp => {
          console.log(resp)
          commit('ADD_CAD', resp.data.res)
          state.show = false
          resolve(resp)
        })
        .catch(error => {
          state.show = false
          console.log(error.response)
          reject(error)
        })
    })
  },
  GET_SCH_DATA({ state }, payload) {
    state.show = true
    console.log('sss')
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/wtr_sch_data', {
          issId: payload.issId,
          prefix: payload.prefix,
        })
        .then(resp => {
          console.log(resp)
          state.show = false
          resolve(resp.data)
        })
        .catch(error => {
          state.show = false
          console.log(error.response)
          reject(error)
        })
    })
  },
  GET_ISS({ state }, payload) {
    state.show = true
    console.log('state.cadaster')

    console.log(state.cadaster)
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/get_iss_prj', {
          prefix: payload.prefix,
          cad: state.cadaster,
        })
        .then(resp => {
          console.log(resp)
          state.items = []
          state.listDonors = []
          state.listSupplier = []
          state.listCycle = []
          state.pdList = []
          if (Object.entries(resp.data).length !== 0) {
            console.log(resp.data.res)
            console.log(resp.data.cycle)
            resp.data.cycle.forEach(element => {
              state.listCycle.push({
                id: element.type_id,
                title: element.name,
              })
            })
            resp.data.pd.forEach(element => {
              state.pdList.push({
                title: `${element.donor} (${element.pd_code})`,
                proj_id: element.proj_id,
                org_id: element.org_id,
                code: element.pd_code,
                name: element.name,
                tag: element.tag,
                donor: element.donor,
                donor_id: element.donor_id,
              })
            })
            console.log(resp.data.don)
            resp.data.don.forEach(element => {
              state.listDonors.push({
                id: element.donor_id,
                title: element.donor_name,
                prefix: element.donor_prefix,
              })
            })
            console.log('donor', state.listDonors)
            resp.data.sup.forEach(element => {
              state.listSupplier.push({
                id: element.sup_id,
                prj_sup_id: element.prj_sup_id,
                title: element.sup_name,
                prefix: element.sup_prefix,
              })
            })
            resp.data.res.filter(el => el.status_id === 1).forEach(element => {
              state.items.push({
                is_id: element.is_id,
                is_name: element.is_name,
                p_code: element.p_code,
                proj_id: element.proj_id,
                quantity: element.def_qouta,
                amount: element.supp_amount,
                supplier: state.listSupplier.filter(ite => ite.id === element.supp_id).length === 0 ? null : state.listSupplier.filter(ite => ite.id === element.supp_id)[0],
                donor: state.listDonors.filter(ite => ite.id === element.donor_id).length === 0 ? null : state.listDonors.filter(ite => ite.id === element.donor_id)[0],
                cycle: state.listCycle.filter(ite => ite.id === element.cycle_type).length === 0 ? null : state.listCycle.filter(ite => ite.id === element.cycle_type)[0],
                note: '',
                pd: state.pdList.filter(ite => ite.donor_id === element.donor_id).length === 0 ? null : state.pdList.filter(ite => ite.donor_id === element.donor_id)[0],
              })
            })

            state.ongoing_iss = resp.data.going[0].ongoing_iss
            state.total_iss = resp.data.going[0].total_iss
          }
          let rs = 0
          if (state.items.length === 0) {
            rs = 0
          } else {
            rs = 1
          }
          state.show = false
          resolve(rs)
        })
        .catch(error => {
          state.show = false
          console.log(error.response)
          reject(error)
        })
    })
  },
  /* FILL_DATA({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/get_iss_prj', {
          prefix: payload.prefix,
          cad: state.cadaster,
        })
        .then(resp => {
          console.log(resp)
          state.show = false
          resolve(resp)
        })
        .catch(error => {
          state.show = false
          console.log(error.response)
          reject(error)
        })
    })
  }, */
  SEND_DATA({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/wtr_send_data', {
          prefix: payload.prefix,
          data: state.items,
          cycle: 1,
          type: payload.type,
        })
        .then(resp => {
          console.log(resp)
          resp.data.res.forEach(element => {
            console.log('//// Start')
            console.log(element)
            console.log(element[0])
            if (element[0].result === 1) {
              console.log(element[1].issId)
              state.items.splice(state.items.findIndex(e => e.is_id === element[1].issId), 1)
            }
          })
          state.show = false
          resolve(resp)
        })
        .catch(error => {
          state.show = false
          console.log(error.response)
          reject(error)
        })
    })
  },
  SEND_DATA_URG({ state }, payload) {
    const item = state.items.filter(e => e.is_id === state.selectedUrgentId)[0]

    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/wtr_send_data', {
          prefix: payload.prefix,
          data: [
            {
              is_id: item.is_id,
              is_name: item.is_name,
              p_code: item.p_code,
              proj_id: item.proj_id,
              quantity: state.quantity,
              amount: state.amount,
              supplier: state.supplier,
              donor: state.donor,
              note: state.note,
              pd: state.pd,
              schedule: payload.item.schedule,
            },
          ],
          cycle: state.cycleType.id,
          type: payload.type,
        })
        .then(resp => {
          console.log(resp)
          resp.data.res.forEach(element => {
            console.log('//// Start')
            console.log(element)
            console.log(element[0])
            if (element[0].result === 1 || element[0].result === 2) {
              console.log(element[1].result.is_id)
              state.items.splice(state.items.findIndex(e => e.is_id === element[1].result.is_id), 1)
            }
          })
          state.show = false
          resolve(resp)
        })
        .catch(error => {
          state.show = false
          console.log(error.response)
          reject(error)
        })
    })
  },

}
