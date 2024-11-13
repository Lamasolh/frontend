/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'
import moment from 'moment'

export default {
  GET_DATA({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/project/org/getListTask', {
          params: {
            prefix: payload.prefix,
          },
        })
        .then(resp => {
          console.log(resp)
          state.items = []
          state.listDonors = []
          state.listSupplier = []
          state.listCycle = []
          state.pdList = []

          if (Object.entries(resp.data).length !== 0) {
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
            resp.data.data.forEach(element => {
              state.items.push({
                iss_id: element.iss_id,
                is_name: element.is_name,
                p_code: element.p_code,
                proj_id: element.proj_id,

                amount: element.supp_amount,
                supplier: state.listSupplier.filter(ite => ite.id === element.supp_id).length === 0 ? null : state.listSupplier.filter(ite => ite.id === element.supp_id)[0],
                donor: state.listDonors.filter(ite => ite.id === element.cycle_donor).length === 0 ? null : state.listDonors.filter(ite => ite.id === element.cycle_donor)[0],
                cycle: state.listCycle.filter(ite => ite.id === element.cycle_type).length === 0 ? null : state.listCycle.filter(ite => ite.id === element.cycle_type)[0],
                note: '',
                pd: state.pdList.filter(ite => ite.donor_id === element.cycle_donor).length === 0 ? null : state.pdList.filter(ite => ite.donor_id === element.cycle_donor)[0],
                cycle_code: element.cycle_code,
                cycle_date: element.cycle_date,
                cycle_deadline: element.cycle_deadline,
                cycle_donor: element.cycle_donor,
                cycle_id: element.cycle_id,
                cycle_type: element.cycle_type,
                def_cycl_durat: element.def_cycl_durat,
                def_module_qcd: element.def_module_qcd,
                idps_count: element.idps_count,
                is_name_ar: element.is_name_ar,
                pd_code: element.pd_code,
                qouta_cd: element.qouta_cd,
                quantity_needed: element.quantity_needed,
                srvc_capacity: element.srvc_capacity,
                supp_id: element.supp_id,
                quantity: element.quantity_needed,
                quota: element.qouta_cd,
                duration: element.def_cycl_durat,
              })
            })
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
  SEND_DATA({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/org/submitTask', {
          prefix: payload.prefix,
          item: payload.item,

        })
        .then(resp => {
          console.log(resp)

          state.items = []
          state.listDonors = []
          state.listSupplier = []
          state.listCycle = []
          state.pdList = []

          if (Object.entries(resp.data).length !== 0) {
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
            resp.data.data.forEach(element => {
              state.items.push({
                iss_id: element.iss_id,
                is_name: element.is_name,
                p_code: element.p_code,
                proj_id: element.proj_id,

                amount: element.supp_amount,
                supplier: state.listSupplier.filter(ite => ite.id === element.supp_id).length === 0 ? null : state.listSupplier.filter(ite => ite.id === element.supp_id)[0],
                donor: state.listDonors.filter(ite => ite.id === element.cycle_donor).length === 0 ? null : state.listDonors.filter(ite => ite.id === element.cycle_donor)[0],
                cycle: state.listCycle.filter(ite => ite.id === element.cycle_type).length === 0 ? null : state.listCycle.filter(ite => ite.id === element.cycle_type)[0],
                note: '',
                pd: state.pdList.filter(ite => ite.donor_id === element.cycle_donor).length === 0 ? null : state.pdList.filter(ite => ite.donor_id === element.cycle_donor)[0],
                cycle_code: element.cycle_code,
                cycle_date: element.cycle_date,
                cycle_deadline: element.cycle_deadline,
                cycle_donor: element.cycle_donor,
                cycle_id: element.cycle_id,
                cycle_type: element.cycle_type,
                def_cycl_durat: element.def_cycl_durat,
                def_module_qcd: element.def_module_qcd,
                idps_count: element.idps_count,
                is_name_ar: element.is_name_ar,
                pd_code: element.pd_code,
                qouta_cd: element.qouta_cd,
                quantity_needed: element.quantity_needed,
                srvc_capacity: element.srvc_capacity,
                supp_id: element.supp_id,
                quantity: element.quantity_needed,
                quota: element.qouta_cd,
                duration: element.def_cycl_durat,
              })
            })
          }
          state.show = false
          resolve(resp.data.res[0].result)
        })
        .catch(error => {
          state.show = false
          console.log(error.response)
          reject(error)
        })
    })
  },
  TERM_DATA({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/org/terminateTask', {
          prefix: payload.prefix,
          item: payload.item,
        })
        .then(resp => {
          console.log(resp)

          state.items = []
          state.listDonors = []
          state.listSupplier = []
          state.listCycle = []
          state.pdList = []

          if (Object.entries(resp.data).length !== 0) {
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
            resp.data.data.forEach(element => {
              state.items.push({
                iss_id: element.iss_id,
                is_name: element.is_name,
                p_code: element.p_code,
                proj_id: element.proj_id,

                amount: element.supp_amount,
                supplier: state.listSupplier.filter(ite => ite.id === element.supp_id).length === 0 ? null : state.listSupplier.filter(ite => ite.id === element.supp_id)[0],
                donor: state.listDonors.filter(ite => ite.id === element.cycle_donor).length === 0 ? null : state.listDonors.filter(ite => ite.id === element.cycle_donor)[0],
                cycle: state.listCycle.filter(ite => ite.id === element.cycle_type).length === 0 ? null : state.listCycle.filter(ite => ite.id === element.cycle_type)[0],
                note: '',
                pd: state.pdList.filter(ite => ite.donor_id === element.cycle_donor).length === 0 ? null : state.pdList.filter(ite => ite.donor_id === element.cycle_donor)[0],
                cycle_code: element.cycle_code,
                cycle_date: element.cycle_date,
                cycle_deadline: element.cycle_deadline,
                cycle_donor: element.cycle_donor,
                cycle_id: element.cycle_id,
                cycle_type: element.cycle_type,
                def_cycl_durat: element.def_cycl_durat,
                def_module_qcd: element.def_module_qcd,
                idps_count: element.idps_count,
                is_name_ar: element.is_name_ar,
                pd_code: element.pd_code,
                qouta_cd: element.qouta_cd,
                quantity_needed: element.quantity_needed,
                srvc_capacity: element.srvc_capacity,
                supp_id: element.supp_id,
                quantity: element.quantity_needed,
                quota: element.qouta_cd,
                duration: element.def_cycl_durat,
              })
            })
          }
          state.show = false
          resolve(resp.data.res[0].result)
        })
        .catch(error => {
          state.show = false
          console.log(error.response)
          reject(error)
        })
    })
  },

  SEND_WASH({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/org/submitTaskWash', {
          prefix: payload.prefix,
          item: payload.item,
        })
        .then(resp => {
          console.log(resp)

          state.items = []
          state.listDonors = []
          state.listSupplier = []
          state.listCycle = []
          state.pdList = []

          if (Object.entries(resp.data).length !== 0) {
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
            resp.data.data.forEach(element => {
              state.items.push({
                iss_id: element.iss_id,
                is_name: element.is_name,
                p_code: element.p_code,
                proj_id: element.proj_id,

                amount: element.supp_amount,
                supplier: state.listSupplier.filter(ite => ite.id === element.supp_id).length === 0 ? null : state.listSupplier.filter(ite => ite.id === element.supp_id)[0],
                donor: state.listDonors.filter(ite => ite.id === element.cycle_donor).length === 0 ? null : state.listDonors.filter(ite => ite.id === element.cycle_donor)[0],
                cycle: state.listCycle.filter(ite => ite.id === element.cycle_type).length === 0 ? null : state.listCycle.filter(ite => ite.id === element.cycle_type)[0],
                note: '',
                pd: state.pdList.filter(ite => ite.donor_id === element.cycle_donor).length === 0 ? null : state.pdList.filter(ite => ite.donor_id === element.cycle_donor)[0],
                cycle_code: element.cycle_code,
                cycle_date: element.cycle_date,
                cycle_deadline: element.cycle_deadline,
                cycle_donor: element.cycle_donor,
                cycle_id: element.cycle_id,
                cycle_type: element.cycle_type,
                def_cycl_durat: element.def_cycl_durat,
                def_module_qcd: element.def_module_qcd,
                idps_count: element.idps_count,
                is_name_ar: element.is_name_ar,
                pd_code: element.pd_code,
                qouta_cd: element.qouta_cd,
                quantity_needed: element.quantity_needed,
                srvc_capacity: element.srvc_capacity,
                supp_id: element.supp_id,
                quantity: element.quantity_needed,
                quota: element.qouta_cd,
                duration: element.def_cycl_durat,
              })
            })
          }
          state.show = false
          resolve(resp.data.res[0].result)
        })
        .catch(error => {
          state.show = false
          console.log(error.response)
          reject(error)
        })
    })
  },

  /// Create Referral
  /// Get Options
  GET_TYPE({ state, commit }) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/manager/get_type', {
          params: {
            district: state.district == null ? null : state.district.value,
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
    })
  },
  GET_CAD({ state, commit }) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/manager/get_cad', {
          params: {
            district: state.district == null
              ? null
              : state.district.value,
            type: 4,
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
    })
  },
  GET_ISS({ state, commit }) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/manager/get_iss', {
          params: {
            type: 40,
            cad: state.cadaster == null ? null : state.cadaster.value,
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
    })
  },
  GET_DETAILS({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/project/drm/getMonitoringDetails', {
          params: {
            issId: payload.issId,
            prefix: payload.prefix,
            prefixRole: payload.prefixRole,
          },
        })
        .then(resp => {
          console.log('res', resp)
          state.noidp = null
          state.capacity = null
          state.deadline = null
          state.duration = null
          state.amount = null
          state.focal_point = null
          state.focal_point_ph = null
          state.quota = null
          state.status = null
          state.qtyNeeded = null
          state.qty_perDay = null

          const item = resp.data.data[0]
          state.noidp = item.no_idps
          state.capacity = item.srvc_capacity
          state.deadline = item.deadline
          state.duration = item.duration
          state.amount = item.amount_needed
          state.focal_point = item.focal_name
          state.focal_point_ph = item.focal_phone
          state.status = item.stat
          state.quota = item.qouta
          if (state.quota == null) {
            state.quota = resp.data.qota[0].def_module_qcd
          }
          state.qty_perDay = (state.noidp == null || state.quota == null ? 0 : state.quota * state.noidp)
          state.qtyNeeded = state.duration * state.qty_perDay
          state.deadline = moment().add(state.duration, 'days').format('YYYY-MM-DD')
          if (Object.entries(resp.data).length !== 0) {
            resp.data.info.forEach(element => {
              if (element.statuss === 'Pending') {
                // eslint-disable-next-line no-underscore-dangle, no-param-reassign
                element._rowVariant = 'warning'
              } else if (element.statuss === 'In Progress') {
                // eslint-disable-next-line no-underscore-dangle, no-param-reassign
                element._rowVariant = 'info'
              } else if (element.statuss === 'Done') {
                // eslint-disable-next-line no-underscore-dangle, no-param-reassign
                element._rowVariant = 'success'
              }
              state.caseItem.push(element)
            })
          }

          state.show = false
          resolve(resp)
        })
        .catch(error => {
          state.show = false
          console.log(error)
          reject(error)
        })
    })
  },

  SRCH_PCODE({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/project/org/searchPcode', {
          params: {
            prefix: payload.prefix,
            pcode: state.pcode,
          },

        })
        .then(resp => {
          console.log(resp)

          state.iss = null
          state.cadaster = null
          state.district = null
          state.governorate = null

          state.typeOptions = []
          state.cadOptions = []
          state.issOptions = []
          console.log(resp)
          const el = resp.data.res[0]
          state.iss = {
            title: el.iss.is_name,
            title_ar: el.iss.is_name_ar,
            value: el.iss.is_id,
          }

          state.noidp = el.data.noidp
          state.capacity = el.data.capacity
          state.deadline = el.data.deadline
          state.duration = el.data.duration
          state.focal_point = el.data.focal_point
          state.focal_point_ph = el.data.focal_point_ph
          state.quota = el.data.quota
          state.qtyNeeded = el.data.qtyNeeded
          state.qty_perDay = el.data.qty_perDay
          state.show = false
          resolve(el.result)
        })
        .catch(error => {
          state.show = false
          console.log(error.response)
          reject(error)
        })
    })
  },

  SUBMIT_REF({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/org/addRefferal', {
          prefix: payload.prefix,
          iss: state.iss,
          noidp: state.noidp,
          capacity: state.capacity,
          deadline: state.deadline,
          duration: state.duration,
          focal_point: state.focal_point,
          focal_point_ph: state.focal_point_ph,
          quota: state.quota,
          qtyNeeded: state.qtyNeeded,
          qty_perDay: state.qty_perDay,
        })
        .then(resp => {
          console.log(resp)
          if (resp.data.res[0].result === 1) {
            state.iss = null
            state.cadaster = null
            state.district = null
            state.governorate = null
            state.typeOptions = []
            state.cadOptions = []
            state.issOptions = []
            state.noidp = null
            state.capacity = null
            state.deadline = null
            state.duration = null
            state.focal_point = null
            state.focal_point_ph = null
            state.quota = null
            state.qtyNeeded = null
            state.qty_perDay = null
          }

          state.items = []
          state.listDonors = []
          state.listSupplier = []
          state.listCycle = []
          state.pdList = []

          if (Object.entries(resp.data).length !== 0) {
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
            resp.data.data.forEach(element => {
              state.items.push({
                iss_id: element.iss_id,
                is_name: element.is_name,
                p_code: element.p_code,
                proj_id: element.proj_id,

                amount: element.supp_amount,
                supplier: state.listSupplier.filter(ite => ite.id === element.supp_id).length === 0 ? null : state.listSupplier.filter(ite => ite.id === element.supp_id)[0],
                donor: state.listDonors.filter(ite => ite.id === element.cycle_donor).length === 0 ? null : state.listDonors.filter(ite => ite.id === element.cycle_donor)[0],
                cycle: state.listCycle.filter(ite => ite.id === element.cycle_type).length === 0 ? null : state.listCycle.filter(ite => ite.id === element.cycle_type)[0],
                note: '',
                pd: state.pdList.filter(ite => ite.donor_id === element.cycle_donor).length === 0 ? null : state.pdList.filter(ite => ite.donor_id === element.cycle_donor)[0],
                cycle_code: element.cycle_code,
                cycle_date: element.cycle_date,
                cycle_deadline: element.cycle_deadline,
                cycle_donor: element.cycle_donor,
                cycle_id: element.cycle_id,
                cycle_type: element.cycle_type,
                def_cycl_durat: element.def_cycl_durat,
                def_module_qcd: element.def_module_qcd,
                idps_count: element.idps_count,
                is_name_ar: element.is_name_ar,
                pd_code: element.pd_code,
                qouta_cd: element.qouta_cd,
                quantity_needed: element.quantity_needed,
                srvc_capacity: element.srvc_capacity,
                supp_id: element.supp_id,
                quantity: element.quantity_needed,
                quota: element.qouta_cd,
                duration: element.def_cycl_durat,
              })
            })
          }
          state.show = false
          resolve(resp.data.res[0].result)
        })
        .catch(error => {
          state.show = false
          console.log(error.response)
          reject(error)
        })
    })
  },
}
