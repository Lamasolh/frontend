/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  GET_DATA({ state }, payload) {
    state.show = true
    console.log(payload)
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/get_pm_setting', {
          prefix: payload.prefix,
          type: payload.type,
        })
        .then(resp => {
          console.log(resp)
          state.items = []
          state.itemsSUP = []
          state.itemsDON = []
          state.itemsPD = []
          state.cycleOP = []
          if (Object.entries(resp.data).length !== 0) {
            resp.data.list_cycle.forEach(element => {
              state.cycleOP.push({
                id: element.id,
                name: element.name,
                value: element.value,
              })
            })
            resp.data.list_sup.forEach(element => {
              state.itemsSUP.push({
                id: element.sup_id,
                prjId: element.prj_sup_id,
                prefix: element.sup_prefx,
                name: element.sup_name,
              })
            })

            resp.data.list.forEach(element => {
              const sup = []
              if (element.sup_ids != null) {
                element.sup_ids.split(',').forEach((e, index) => {
                  sup.push({
                    id: parseInt(e, 10),
                    cadId: element.sup_cad_data_id.split(',')[index],
                    ammount: element.amount_per_cbm.split(',')[index],
                    sup: state.itemsSUP.filter(el => el.id === parseInt(e, 10))[0],
                  })
                })
              }

              state.items.push({
                amount_per_cbm: element.amount_per_cbm,
                cadastre_id: element.cadastre_id,
                cadastre_name: element.cadastre_name,
                note: element.note,
                sup_cad_data_id: element.sup_cad_data_id,
                supplier: sup,
              })
            })

            resp.data.list_donor.forEach(element => {
              state.itemsDON.push({
                id: element.donor_id,
                prefix: element.donor_prefix,
                name: element.donor_name,
              })
            })

            resp.data.list_pd.forEach(element => {
              state.itemsPD.push({
                proj_id: element.proj_id,
                org_id: element.org_id,
                code: element.pd_code,
                name: element.name,
                tag: element.tag,
                donor: element.donor,
              })
            })
            if (Object.entries(resp.data.list_setg).length !== 0) {
              console.log(resp.data.list_setg)
              console.log(resp.data.list_setg[0])
              // eslint-disable-next-line prefer-destructuring
              state.cycleduration = state.cycleOP.filter(el => el.id === resp.data.list_setg[0].cycle_id)[0]
              state.modularity = resp.data.list_setg[0].module_per_cd
              state.pd = resp.data.list_setg[0].pd
            }
          }

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
  GET_CAD_SUP({ state, commit }) {
    state.show = true
    return new Promise(((resolve, reject) => {
      API.apiClient
        .get('/api/manager/get_cad', {
          params: {
            district: state.supdisId == null ? null : state.supdisId.value,
            type: 1,
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
  GET_CAD_DON({ state, commit }) {
    state.show = true
    return new Promise(((resolve, reject) => {
      API.apiClient
        .get('/api/manager/get_cad', {
          params: {
            district: state.dondisId == null ? null : state.dondisId.value,
            type: 1,
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
  SEND_DATA({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/save_pm_list', {
          prefix: payload.prefix,
          data: payload.data,
          type: payload.type,
        })
        .then(resp => {
          console.log(resp)
          const getData = resp.data.get
          state.items = []
          state.itemsSUP = []
          state.itemsDON = []
          state.cycleOP = []
          if (Object.entries(getData).length !== 0) {
            /* getData.list_cycle.forEach(element => {
              state.cycleOP.push({
                id: element.id,
                name: element.name,
                value: element.value,
              })
            }) */
            getData.list_sup.forEach(element => {
              state.itemsSUP.push({
                id: element.sup_id,
                prjId: element.prj_sup_id,
                prefix: element.sup_prefx,
                name: element.sup_name,
              })
            })
            getData.list.forEach(element => {
              const sup = []
              if (element.sup_ids != null) {
                element.sup_ids.split(',').forEach((e, index) => {
                  sup.push({
                    id: parseInt(e, 10),
                    cadId: element.sup_cad_data_id.split(',')[index],
                    ammount: element.amount_per_cbm.split(',')[index],
                    sup: state.itemsSUP.filter(el => el.id === parseInt(e, 10))[0],
                  })
                })
              }

              state.items.push({
                amount_per_cbm: element.amount_per_cbm,
                cadastre_id: element.cadastre_id,
                cadastre_name: element.cadastre_name,
                note: element.note,
                sup_cad_data_id: element.sup_cad_data_id,
                supplier: sup,
              })
            })
            getData.list_donor.forEach(element => {
              state.itemsDON.push({
                id: element.donor_id,
                prefix: element.donor_prefix,
                name: element.donor_name,
              })
            })
            /*
            if (Object.entries(getData.list_setg).length !== 0) {
              console.log(getData.list_setg)
              console.log(getData.list_setg[0])
              // eslint-disable-next-line prefer-destructuring
              state.cycleduration = state.cycleOP.filter(el => el.id === getData.list_setg[0].cycle_id)[0]
              state.modularity = getData.list_setg[0].module_per_cd
            } */
          }
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
  SAVE_SETTING({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/save_pm_setting', {
          prefix: payload.prefix,
          type: payload.type,
          cycleduration: state.cycleduration,
          modularity: state.modularity,
          pd: state.pd,
        })
        .then(resp => {
          console.log(resp)
          const getData = resp.data.get
          state.items = []
          state.itemsSUP = []
          state.itemsDON = []
          state.cycleOP = []
          if (Object.entries(getData).length !== 0) {
            getData.list_cycle.forEach(element => {
              state.cycleOP.push({
                id: element.id,
                name: element.name,
                value: element.value,
              })
            })
            getData.list_sup.forEach(element => {
              state.itemsSUP.push({
                id: element.sup_id,
                prjId: element.prj_sup_id,
                prefix: element.sup_prefx,
                name: element.sup_name,
              })
            })
            getData.list.forEach(element => {
              const sup = []
              if (element.sup_ids != null) {
                element.sup_ids.split(',').forEach((e, index) => {
                  sup.push({
                    id: parseInt(e, 10),
                    cadId: element.sup_cad_data_id.split(',')[index],
                    ammount: element.amount_per_cbm.split(',')[index],
                    sup: state.itemsSUP.filter(el => el.id === parseInt(e, 10))[0],
                  })
                })
              }
              state.items.push({
                amount_per_cbm: element.amount_per_cbm,
                cadastre_id: element.cadastre_id,
                cadastre_name: element.cadastre_name,
                note: element.note,
                sup_cad_data_id: element.sup_cad_data_id,
                supplier: sup,
              })
            })
            getData.list_donor.forEach(element => {
              state.itemsDON.push({
                id: element.donor_id,
                prefix: element.donor_prefix,
                name: element.donor_name,
              })
            })
            if (Object.entries(getData.list_setg).length !== 0) {
              console.log(getData.list_setg)
              console.log(getData.list_setg[0])
              // eslint-disable-next-line prefer-destructuring
              state.cycleduration = state.cycleOP.filter(el => el.id === getData.list_setg[0].cycle_id)[0]
              state.modularity = getData.list_setg[0].module_per_cd
            }
          }
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

  ADD_SUPPLIER({ state, dispatch }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/add_pm_sup_don', {
          prefix: payload.prefix,
          supPrefix: state.supPrefix,
          cad_id: state.supCadId,
          name: state.supOrgName,
          phone: state.supPhone,
          email: state.supEmail,
          first_name: state.supFirstName,
          last_name: state.supLastName,
          username: state.supUsername,
          password: state.supPassword,
          type: 4,
        })
        .then(resp => {
          console.log(resp)
          console.log(resp.data.res[0].supp_id)
          if (resp.data.res[0].supp_id != null) {
            dispatch('SAVE_LOOKUP_SUP_DON', {
              id: { sup_id: resp.data.res[0].supp_id },
              orgType: 4,
              prefix: payload.prefix,
              projtype: payload.projtype,
            })
          } else {
            dispatch('GET_DATA', {
              prefix: payload.prefix,
              projtype: payload.projtype,
            })
          }

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
  ADD_Donor({ state, dispatch }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/add_pm_sup_don', {
          prefix: state.donPrefix,
          cad_id: state.donCadId,
          name: state.donOrgName,
          phone: state.donPhone,
          email: state.donEmail,
          first_name: state.donFirstName,
          last_name: state.donLastName,
          username: state.donUsername,
          password: state.donPassword,
          type: 3,
        })
        .then(resp => {
          console.log(resp)
          console.log(resp.data.get)
          console.log(resp.data.res)
          dispatch('SAVE_LOOKUP_SUP_DON', {
            id: { sup_id: resp.data.res[0].supp_id },
            orgType: 3,
            prefix: payload.prefix,
            projtype: payload.projtype,
          })

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

  ADD_PD({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/add_pm_pd', {
          prefix: payload.prefix,
          name: state.PDName,
          code: state.PDCode,
          tag: state.PDtag,
          donor: state.PDDonor,
        })
        .then(resp => {
          console.log(resp)
          state.itemsPD = []
          const getData = resp.data.get
          getData.list_pd.forEach(element => {
            state.itemsPD.push({
              proj_id: element.proj_id,
              org_id: element.org_id,
              code: element.pd_code,
              name: element.name,
              tag: element.tag,
              donor: element.donor,
            })
          })
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
  LOOKUP_SUP_DON({ state }, payload) {
    state.show = true
    console.log('payload', payload)
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/lookup_pm_sup_don', {
          prefix: payload.prefix,
          projtype: payload.type,
          phone: payload.phone,
          type: payload.orgType,
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
  },
  SAVE_LOOKUP_SUP_DON({ state }, payload) {
    console.log(payload)
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/save_lookup_pm_sup_don', {
          prefix: payload.prefix,
          projtype: payload.type,
          sup: payload.id,
          type: payload.orgType,
        })
        .then(resp => {
          console.log(resp)
          state.show = false
          const getData = resp.data.get
          state.items = []
          state.itemsSUP = []
          state.itemsDON = []
          state.cycleOP = []
          if (Object.entries(getData).length !== 0) {
            /* getData.list_cycle.forEach(element => {
              state.cycleOP.push({
                id: element.id,
                name: element.name,
                value: element.value,
              })
            }) */
            getData.list_sup.forEach(element => {
              state.itemsSUP.push({
                id: element.sup_id,
                prjId: element.prj_sup_id,
                prefix: element.sup_prefx,
                name: element.sup_name,
              })
            })
            getData.list.forEach(element => {
              const sup = []
              if (element.sup_ids != null) {
                element.sup_ids.split(',').forEach((e, index) => {
                  sup.push({
                    id: parseInt(e, 10),
                    cadId: element.sup_cad_data_id.split(',')[index],
                    ammount: element.amount_per_cbm.split(',')[index],
                    sup: state.itemsSUP.filter(el => el.id === parseInt(e, 10))[0],
                  })
                })
              }
              state.items.push({
                amount_per_cbm: element.amount_per_cbm,
                cadastre_id: element.cadastre_id,
                cadastre_name: element.cadastre_name,
                note: element.note,
                sup_cad_data_id: element.sup_cad_data_id,
                supplier: sup,
                supplier_id: element.supplier_id,
                supplier_name: element.supplier_name,
              })
            })
            getData.list_donor.forEach(element => {
              state.itemsDON.push({
                id: element.donor_id,
                prefix: element.donor_prefix,
                name: element.donor_name,
              })
            })
            getData.list_pd.forEach(element => {
              state.itemsPd.push({
                id: element.pd_id,
                code: element.pd_code,
                name: element.pd_name,
                tag: element.pd_tag,
                donor: element.donor,
              })
            })
            /*
            if (Object.entries(getData.list_setg).length !== 0) {
              console.log(getData.list_setg)
              console.log(getData.list_setg[0])
              // eslint-disable-next-line prefer-destructuring
              state.cycleduration = state.cycleOP.filter(el => el.id === getData.list_setg[0].cycle_id)[0]
              state.modularity = getData.list_setg[0].module_per_cd
            } */
          }
          resolve(resp.data)
        })
        .catch(error => {
          state.show = false
          console.log(error.response)
          reject(error)
        })
    })
  },

  /*
  DEACTIVE_SUPPLIER({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/deactive_sup', {
          prefix: payload.prefix,
          id: payload.sup,
          type: payload.type,
        })
        .then(resp => {
          console.log(resp)
          state.show = false
          state.itemsSUP = []
          if (Object.entries(resp.data).length !== 0) {
            resp.data.sup.forEach(element => {
              state.itemsSUP.push({
                id: element.prjsup_id,
                prjId: element.proj_id,
                orgId: element.org_id,
                Name: element.Name,
                contact_person: element.contact_person,
                contact_phone: element.contact_phone,
                desc: element.descpription,
                type: element.type,
                active: element.active,
              })
            })
          }

          resolve(resp)
        })
        .catch(error => {
          state.show = false
          console.log(error.response)
          reject(error)
        })
    })
  },
  ACTIVE_SUPPLIER({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/active_sup', {
          prefix: payload.prefix,
          id: payload.sup,
          type: payload.type,
        })
        .then(resp => {
          console.log(resp)
          state.show = false
          state.itemsSUP = []
          if (Object.entries(resp.data).length !== 0) {
            resp.data.sup.forEach(element => {
              state.itemsSUP.push({
                id: element.prjsup_id,
                prjId: element.proj_id,
                orgId: element.org_id,
                Name: element.Name,
                contact_person: element.contact_person,
                contact_phone: element.contact_phone,
                desc: element.descpription,
                type: element.type,
                active: element.active,
              })
            })
          }

          resolve(resp)
        })
        .catch(error => {
          state.show = false
          console.log(error.response)
          reject(error)
        })
    })
  },

  DEACTIVE_Donor({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/deactive_sup', {
          prefix: payload.prefix,
          id: payload.sup,
          type: payload.type,
        })
        .then(resp => {
          console.log(resp)
          state.show = false
          state.itemsSUP = []
          if (Object.entries(resp.data).length !== 0) {
            resp.data.sup.forEach(element => {
              state.itemsSUP.push({
                id: element.prjsup_id,
                prjId: element.proj_id,
                orgId: element.org_id,
                Name: element.Name,
                contact_person: element.contact_person,
                contact_phone: element.contact_phone,
                desc: element.descpription,
                type: element.type,
                active: element.active,
              })
            })
          }

          resolve(resp)
        })
        .catch(error => {
          state.show = false
          console.log(error.response)
          reject(error)
        })
    })
  },
  ACTIVE_Donor({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/active_sup', {
          prefix: payload.prefix,
          id: payload.sup,
          type: payload.type,
        })
        .then(resp => {
          console.log(resp)
          state.show = false
          state.itemsSUP = []
          if (Object.entries(resp.data).length !== 0) {
            resp.data.sup.forEach(element => {
              state.itemsSUP.push({
                id: element.prjsup_id,
                prjId: element.proj_id,
                orgId: element.org_id,
                Name: element.Name,
                contact_person: element.contact_person,
                contact_phone: element.contact_phone,
                desc: element.descpription,
                type: element.type,
                active: element.active,
              })
            })
          }

          resolve(resp)
        })
        .catch(error => {
          state.show = false
          console.log(error.response)
          reject(error)
        })
    })
  }, */
}
