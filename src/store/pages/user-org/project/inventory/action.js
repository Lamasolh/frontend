/* eslint-disable prefer-destructuring */
/* eslint-disable no-array-constructor */
/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  /// Distributor
  GET_INVENTORY_LIST({ state, commit }, payload) {
    state.show = true
    state.orgList = []
    state.items = []
    state.dis_total_kits = 0
    state.total_assignment = 0
    state.listWH = []
    state.item = []
    state.total_request = 0
    state.total_return = 0
    state.project_items = []
    // console.log(state.currentOrg)
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/project/get_inventor', {
          params: {
            prefix: payload.prefix,
            org_id: state.currentOrg != null
              ? state.currentOrg.value
              : null,
            type: payload.type,

          },
        })
        .then(resp => {
          console.log(resp)
          if (Object.entries(resp.data).length !== 0) {
            // Inventory List
            state.itemWar = []
            resp.data.warehouse.forEach(element => {
              const itm = resp.data.itmlist.filter(it => it.warehouse_id === element.warehouse_id)
              const itemReq = resp.data.reqlist.filter(it => it.warehouse_id === element.warehouse_id)
              itemReq.forEach(el => {
                el.title = `${el.items_name}(${el.qnty})`
              })
              state.itemWar.push({
                warehouse_id: element.warehouse_id,
                wh_name: element.wh_name,
                wh_name_ar: element.wh_name_ar,
                full_name: element.full_name,
                cadastre_name: element.cadastre_name,
                comments: element.comments,
                main_warehouse: element.main_warehouse,
                org_id: element.org_id,
                org_name: element.org_name,
                type_name: element.type_name,
                wh_address: element.wh_address,
                wh_keeper_userid: element.wh_keeper_userid,
                wh_item: itm,
                wh_req: itemReq,
              })
            })

            resp.data.warehouse2.forEach(element => {
              console.log('ELment 2')
              console.log(element)

              const itm = resp.data.itmlist.filter(
                it => it.warehouse_id === element.warehouse_id,
              )
              const itemReq = resp.data.reqlist.filter(
                it => it.warehouse_id === element.warehouse_id,
              )
              itemReq.forEach(el => {
                el.title = `${el.items_name}(${el.qnty})`
              })
              state.itemWar.push({
                warehouse_id: element.warehouse_id,
                wh_name: element.wh_name,
                wh_name_ar: element.wh_name_ar,
                full_name: element.full_name,
                cadastre_name: element.cadastre_name,
                comments: element.comments,
                main_warehouse: element.main_warehouse,
                org_id: element.org_id,
                org_name: element.org_name,
                type_name: element.type_name,
                wh_address: element.wh_address,
                wh_keeper_userid: element.wh_keeper_userid,
                wh_item: itm,
                wh_req: itemReq,
              })
            })
            console.log('itList', state.itemWar)
            /// Org List
            state.orgList = []
            console.log(resp.data)
            resp.data.orglist.forEach(element => {
              state.orgList.push({
                title: element.org_name,
                value: element.org_id,
                disp: element.org_disp_name,
                cad_id: element.cad_id,
                address: element.address,
                cadastre_name: element.cadastre_name,
                prefix: element.org_prefix,
              })
            })
            commit(
              'SET_CUR_ORG',
              state.orgList.filter(
                // eslint-disable-next-line radix
                item => item.value === parseInt(resp.data.curOrg.toString()),
                10,
              )[0],
            )
            state.orgListTrans = []
            resp.data.orglistrans.forEach(el => {
              state.orgListTrans.push({
                title: el.org_name,
                value: el.org_id,
                prefix: el.org_prefix,
              })
            })

            /// Org List
            state.items = []
            let res = 0
            let ret = 0
            state.total_kits_request = 0
            state.total_kits_return = 0

            state.itemMwar = []
            state.itemMwar = resp.data.mainwarehouse
            /// Item
            state.project_items = []
            resp.data.project_items.forEach(element => {
              state.project_items.push({
                title: element.items_name,
                title_ar: element.items_name_ar,
                value: element.items_id,
              })
            })
            /// supplier
            state.supplier_from = []
            resp.data.supplier.forEach(element => {
              state.supplier_from.push({
                title: element.org_name,
                prefix: element.org_prefix,
                display: element.org_disp_name,
                value: element.org_id,
              })
            })
            /// warehous
            state.mainwarehouse = []
            resp.data.mainwarehouse.forEach(element => {
              state.mainwarehouse.push({
                title: element.wh_name,
                title_ar: element.org_name,
                value: element.warehouse_id,
              })
            })
            // ٍ stasticItem
            state.stasticItem = []
            resp.data.itmStatlist.forEach(element => {
              state.stasticItem.push({
                itemId: element.items_id,
                itemName: element.items_name,
                total_kits: element.total_kits,
                dis_total_kits: element.Dis_total_kits,
                request: element.hand_in_reqsts,
                return: element.return_reqsts,
                listStat: [
                  {
                    icon: 'BoxIcon',
                    color: 'light-danger',
                    title: `${element.total_kits} Kit`,
                    subtitle: 'Warehouse',
                    customClass: 'mb-2 mb-xl-0',
                  },
                  {
                    icon: 'TruckIcon',
                    color: 'light-info',
                    title: `${element.Dis_total_kits} Kit`,
                    subtitle: 'Distributors',
                    customClass: 'mb-2 mb-xl-0',
                  },
                  {
                    icon: 'ArrowUpRightIcon',
                    color: 'light-success',
                    title: `${element.hand_in_reqsts} Kit`,
                    subtitle: 'Request HandIn',
                    customClass: 'mb-2 mb-sm-0',
                  },
                  {
                    icon: 'ArrowDownLeftIcon',
                    color: 'light-danger',
                    title: `${element.return_reqsts} Kit`,
                    subtitle: 'Request Return',
                    customClass: 'mb-2 mb-sm-0',
                  },
                ],
              })
            })
            if (state.itmdis != null) {
              state.itmdis = state.stasticItem.filter(
                el => el.itemId === state.itmdis.itemId,
              )[0]
              console.log('ids', state.itmdis)
            }

            let valueToPush = []
            resp.data.driverlist.forEach(elb => {
              const itemId = elb.id
              delete elb.id
              const dd = Object.values(
                elb,
              )
              const arr = []
              dd.forEach(element => {
                let res1 = 0
                let ret1 = 0
                valueToPush = []
                if (
                  element.request > 0
                ) {
                  res += 1
                  res1 += 1
                  state.total_kits_request = Number(state.total_kits_request) + Number(element.request)
                }
                if (
                  element.return > 0
                ) {
                  ret += 1
                  ret1 += 1
                  state.total_kits_return = Number(state.total_kits_return) + Number(element.return)
                }
                state.total_request = res
                state.total_return = ret
                arr.push({
                  id: element.id,
                  title: `${
                    element.total_kits
                  } ${
                    element.total_kits < 1 ? 'kit/' : 'kits/'
                  } ${
                    element.total_assignment
                  } ${
                    element.total_assignment < 1 ? 'Assignment' : 'Assignments'
                  } ${
                    res1 === 1
                      ? `/ ${element.request} HandIn`
                      : ret1 === 1
                        ? `/ ${element.return} Return`
                        : ''
                  }`,
                  subtitle: element.user_name,
                  subtitle_ar: element.user_name_ar,
                  total_assignment: element.total_assignment,
                  total_kits: element.total_kits,
                  request: element.request,
                  rqst_id: element.rqst_id,
                  return: element.return,
                  res,
                })

                valueToPush.push(arr)
              })
              valueToPush.push(itemId)
              console.log(
                'itval',
                valueToPush,
              )
              state.items.push(
                valueToPush,
              )
            })
            console.log('item', state.items)
            /// ///////////////////////////////////////////////////
            state.total_assignment = parseInt(
              resp.data.kits[0].total_assignment,
              10,
            )

            state.total_kits = parseInt(
              resp.data.kits[0].total_kits,
              10,
            )
            state.dis_total_kits = parseInt(
              resp.data.kits[0].Dis_total_kits,
              10,
            )
            /// /////////////////////////////////////

            state.checkTrans = []
            resp.data.checkTrans.forEach(el => {
              state.checkTrans.push({
                title: `${el.items_name}:${el.req_quantity} To ${el.org_name}:${el.wh_name} `,
                value: el.req_id,
              })
            })
            state.checkRec = []
            resp.data.checkRec.forEach(el => {
              state.checkRec.push({
                title: `${el.items_name}:${el.req_quantity} From ${el.org_name}:${el.wh_name} `,
                value: el.req_id,
              })
            })
          }
          state.saved = false
          state.show = false
          // console.log(state.item, resp.data)
          resolve(resp.data)
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },
  /// Manage Warehouse
  ADD_WAREHOUSE({ state }, payload) {
    state.show = true
    console.log(
      'add WH',
      state.currentOrg.value,
      state.wh_name_eng,
      state.wh_name_ara,
      state.wh_type.value,
      state.wh_keeper,
      state.wh_cadastre.value,
      state.wh_address,
      state.wh_cmnts,
    )
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/addwarehouse', {
          prefix: payload.prefix,
          type: payload.type,

          name: state.wh_name_eng,
          namear: state.wh_name_ara,
          wtype: state.wh_type.value,
          keeper: state.wh_keeper,
          cad: state.wh_cadastre.value,
          org: state.currentOrg.value,
          address: state.wh_address,
          cmmnts: state.wh_cmnts,
        })
        .then(resp => {
          console.log(resp.data.res[0].result)
          state.saved = false
          state.show = false
          resolve(resp.data.res[0].result)
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },
  EDIT_WAREHOUSE({ state }, payload) {
    state.show = true
    console.log(payload)
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/editwarehouse', {
          prefix: payload.prefix,
          type: payload.type,
          whId: payload.items.warehouse_id,
          name: payload.whNameEng,
          namear: payload.whNameAr,
          wtype: payload.whType.value,
          cad: payload.whMunicipality.value,
          address: payload.wh_addrss,
          cmmnts: payload.whCmnts,
        })
        .then(resp => {
          console.log(resp.data)
          state.saved = false
          state.show = false
          resolve(resp.data.res[0].result)
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },
  delete_WareHouse({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/deleteWareHouse', {
          prefix: payload.prefix,
          type: payload.type,
          warehouse_id: state.wh_id,
        })
        .then(resp => {
          console.log('delet warehouse', resp)
          state.saved = false
          state.show = false
          resolve(resp.data.res)
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },
  transfer_kits({ state, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      state.show = true
      console.log(
        payload.prefix,
        state.wh_id_frm,
        state.wh_id_to.value,
        state.qntty,
        state.org_from,
        state.org_to,
        state.wh_item_id_to,
      )
      API.apiClient
        .post('/api/project/transferkits', {
          prefix: payload.prefix,
          type: payload.type,
          warehouse_id_from: state.wh_id_frm,
          warehouse_id_to: state.wh_id_to.value,
          quantity: state.qntty,
          orgfrom: state.org_from,
          orgto: state.org_to,
          item_id: state.wh_item_id_to.items_id,
        })
        .then(resp => {
          console.log('resp')
          console.log(resp)
          state.saved = false
          state.show = false
          dispatch('GET_INVENTORY_LIST', { prefix: payload.prefix, type: payload.type })
          resolve(resp.data.res[0])
        })
        .catch(error => {
          console.log('error')
          console.log(error)
          console.log(error.response)
          state.show = false
          reject(error)
        })
    })
  },
  cancel_request({ state, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      state.show = true
      API.apiClient
        .post('/api/project/cancel_request', {
          prefix: payload.prefix,
          type: payload.type,
          req_id: state.wh_cancel_req.req_id,
          current_Org: state.currentOrg.value,
          user_id: state.wh_cancel_req.req_user_id,
          item_id: state.wh_cancel_req.item_id,
        })
        .then(resp => {
          console.log('resp')
          console.log(resp)
          state.saved = false
          state.show = false
          dispatch('GET_INVENTORY_LIST', { prefix: payload.prefix, type: payload.type })
          resolve(resp.data.res[0])
        })
        .catch(error => {
          console.log('error')
          console.log(error)
          console.log(error.response)
          state.show = false
          reject(error)
        })
    })
  },
  GET_LIST({ state, commit }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/project/getwarehouse', {
          params: {
            prefix: payload.prefix,
            type: payload.type,
          },
        })
        .then(resp => {
          if (Object.entries(resp.data).length !== 0) {
            state.item = []
            resp.data.res.forEach(element => {
              state.item.push(element)
            })
            commit('ADD_ORG_LIST', resp.data.org)
          }
          state.saved = false
          state.show = false
          resolve(resp.data[0])
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },
  REQUEST_HANDIN({ state, dispatch }, payload) {
    state.show = true
    console.log('payload')
    console.log(payload)
    console.log(state.currentOrg)
    console.log(state.selecteduser)
    console.log(state.value_qntty)
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/request_handin', {
          prefix: payload.prefix,
          type: payload.type,
          current_Org: state.currentOrg.value,
          user_id: state.selecteduser,
          quantity: state.value_qntty,
          warehouseId: state.value_Warehouse,
          item_id: payload.item_id,
        })
        .then(resp => {
          console.log(resp)
          dispatch('GET_INVENTORY_LIST', { prefix: payload.prefix, type: payload.type })
          state.saved = false
          state.show = false
          resolve(resp.data.result[0].result)
        })
        .catch(error => {
          console.log(error.response)
          state.show = false
          reject(error)
        })
    })
  },
  REQUEST_RETURN({ state, dispatch }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/return_request', {
          prefix: payload.prefix,
          current_Org: state.currentOrg.value,
          user_id: state.selecteduser,
          quantity: state.value_qntty,
          type: payload.type,

        })
        .then(resp => {
          console.log(resp)
          dispatch('GET_INVENTORY_LIST', { prefix: payload.prefix, type: payload.type })
          state.saved = false
          state.show = false
          resolve(resp.data.result[0].result)
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },
  REQUEST_RETURN_APPROVE({ state, dispatch }, payload) {
    state.show = true
    console.log(payload)
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/request_return_approved', {
          prefix: payload.prefix,
          current_Org: state.currentOrg.value,
          user_id: payload.item.id,
          type: payload.type,

          rqst_id: payload.item.rqst_id,
        })
        .then(resp => {
          console.log(resp)
          dispatch('GET_INVENTORY_LIST', { prefix: payload.prefix, type: payload.type })
          state.saved = false
          state.show = false
          resolve(resp.data.result[0].result)
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },
  REQUEST_CANCELLATION({ state, dispatch }, payload) {
    state.show = true
    console.log('selected user', state.selecteduser)
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/cancel_all_requests', {
          prefix: payload.prefix,
          current_Org: state.currentOrg.value,
          user_id: state.selecteduser,
          type: payload.type,
          req_id: payload.req_id,
        })
        .then(resp => {
          console.log(resp)
          dispatch('GET_INVENTORY_LIST', { prefix: payload.prefix, type: payload.type })
          state.saved = false
          state.show = false
          resolve(resp.data.result[0].result)
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },
  ADD_WAREHOUSE_ITEMS({ state, dispatch }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/add_inevtory_items', {
          prefix: payload.prefix,
          org_id: state.currentOrg.value,
          wh_id: state.warehouse_select.value,
          item_id: state.item_select.value,
          supp_id: state.supplier_select.value,
          way_bill: state.waybill,
          inv_date: state.inv_date,
          item_quantity: state.qntty_item,
          inv_comments: state.inv_comments,
          isinv: state.isinv,
          type: payload.type,

        })
        .then(resp => {
          console.log('resp', resp.data.result[0].result)
          dispatch('GET_INVENTORY_LIST', { prefix: payload.prefix, type: payload.type })
          state.saved = false
          state.show = false
          resolve(resp.data.result[0].result)
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },
  SEND_NOTIFICATION({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/send-notify-dis', {
          id: payload.id,
          prefix: payload.prefix,
          type: payload.type,
        }).then(res => {
          console.log(res)
          state.show = false
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },
  GetOrgWarehouse({ state }, payload) {
    state.show = true
    console.log(payload.org.value)
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/project/get-org-warehouse', {
          params: {
            prefix: payload.prefix,
            orgId: payload.org.value,
            type: payload.type,
          },
        }).then(res => {
          console.log(res)
          state.warOrgListTrans = []
          res.data.list.forEach(element => {
            state.warOrgListTrans.push({
              value: element.warehouse_id,
              title: element.wh_name,
              title_ar: element.wh_name_ar,
            })
          })
          state.show = false
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },
  TRANS_TO_ANOTHER_ORG({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/trans-to-another-org', {
          prefix: payload.prefix,
          type: payload.type,
          // from_org: state.value_Warehouse.value,
          from_wh: state.value_Warehouse.warehouse_id,

          to_org: state.selectedOrg.value,
          to_wh: state.selectedOrgWar.value,

          itmid: state.wh_item_id_to.items_id,
          qnty: state.value_qntty,
          cmmnts: state.wh_cmnts,
        })
        .then(resp => {
          console.log(resp)
          state.saved = false
          state.show = false
          resolve(resp.data.res[0].result)
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },
  TRANS_REQ({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/trans-to-another-org-cancel', {
          prefix: payload.prefix,
          type: payload.type,
          reqId: state.selectCheckTrans.value,
        })
        .then(resp => {
          console.log(resp)
          state.saved = false
          state.show = false
          resolve(resp.data.res[0].result)
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },
  TRANS_REC({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/trans-to-another-org-accept', {
          prefix: payload.prefix,
          type: payload.type,
          reqId: state.selectCheckRec.value,
          cmmnts: '',
        })
        .then(resp => {
          console.log(resp)
          state.saved = false
          state.show = false
          resolve(resp.data.res[0].result)
        })
        .catch(error => {
          state.show = false
          reject(error)
        })
    })
  },
  GET_REPORT_CASE({ state }, payload) {
    state.show = true
    return new Promise(((resolve, reject) => {
      const rg = state.range_rep_case
      console.log(rg)
      const startDate = rg.split('to')[0]
      const endDate = rg.split('to')[1] == null ? rg.split('to')[0] : rg.split('to')[1]
      console.log(startDate)
      console.log(startDate)
      API.apiClient
        .post('/api/project/report_case_tools_inv', {
          prjprefix: payload.prefix,
          type: payload.type,
          from: startDate,
          to: endDate,
          wh: state.selectWarehouseRep.warehouse_id,
          item: state.selectItemRep.value,
        })
        .then(resp => {
          console.log(resp)
          state.caseItem = resp.data.res
          state.saved = false
          state.show = false
          resolve(resp.data.result)
        })
        .catch(error => {
          console.log('error')
          console.log(error.response)
          state.show = false
          reject(error)
        })
    }))
  },
}
