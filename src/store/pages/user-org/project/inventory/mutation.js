import Vue from 'vue'

export default {
  /// // Global
  SET_SAVED(state, payload) {
    state.saved = payload
  },
  SET_SHOW(state, payload) {
    state.show = payload
  },
  SET_SHOW_EDIT(state, payload) {
    state.showEdit = payload
  },
  SET_CUR_ORG(state, payload) {
    state.currentOrg = payload
  },
  /// / Distributor
  SET_ITEM_DIS(state, payload) {
    state.itmdis = payload
    console.log('dddddit', payload)
  },
  SET_ITEMS(state, { key, value }) {
    Vue.set(state.items, key, value)
  },
  SET_SHOW_REQ_ADV(state, { key, value }) {
    Vue.set(state.showModalReq, key, value)
  },
  SET_SHOW_REQ(state, payload) {
    state.showModalReq = payload
  },
  SET_SHOW_TRANS(state, payload) {
    state.showModalTransfer = payload
  },
  SET_SHOW_TRANS_ADV(state, { key, value }) {
    Vue.set(state.showModalTransfer, key, value)
  },
  SET_SHOW_RETURN_ADV(state, { key, value }) {
    Vue.set(state.showModalReturn, key, value)
  },
  SET_SHOW_RET(state, payload) {
    state.showModalReturn = payload
  },
  SET_SHOW_REQ_CANCEL(state, payload) {
    state.showModalCancelReq = payload
  },
  ///
  SET_SHOW_TRANS_REQ(state, payload) {
    state.showModalTransferReq = payload
  },
  SET_SHOW_TRANS_REC(state, payload) {
    state.showModalTransferRec = payload
  },

  /// /
  SET_SHOW_MODL_REQ(state, payload) {
    state.selectCheckTrans = payload
  },
  SET_SHOW_MODL_REC(state, payload) {
    state.selectCheckRec = payload
  },
  /// //Manage
  SET_ITEM_WAR(state, payload) {
    state.itemWar = payload
  },
  SET_LIST_ORG_WAR(state, payload) {
    state.warOrgListTrans = payload
  },
  SET_ITEM_MAINWAR(state, payload) {
    state.itemMwar = payload
  },
  // Options
  SET_PER_PAGE(state, payload) {
    state.perPage = payload
  },
  SET_CUR_PAGE(state, payload) {
    state.currentPage = payload
  },
  SET_SORT_BY(state, payload) {
    state.sortBy = payload
  },
  SET_SORT_DESC(state, payload) {
    state.sortDesc = payload
  },
  SET_SORT_DIR(state, payload) {
    state.sortDirection = payload
  },
  SET_FILTER(state, payload) {
    state.filter = payload
  },
  SET_FILTER_ON(state, payload) {
    state.filterOn.push(payload)
  },
  SET_CADASTRE(state, payload) {
    state.wh_cadastre = payload
  },
  SET_ORG(state, payload) {
    state.orglistselect = payload
  },
  ADD_ORG_LIST(state, payload) {
    state.orglist = []
    payload.forEach(el => {
      state.orglist.push({
        title: el.org_name,
        title_ar: el.org_name_ar,
        value: el.org_id,
      })
    })
  },
  SET_WH_TYPE(state, payload) {
    state.wh_type = payload
  },
  SET_WH_ENG_NAM(state, payload) {
    state.wh_name_eng = payload
  },
  SET_WH_ARA_NAM(state, payload) {
    state.wh_name_ara = payload
  },
  SET_WH_ADD(state, payload) {
    state.wh_address = payload
  },
  SET_WH_CMNTS(state, payload) {
    if (payload.trim() !== '') {
      state.wh_cmnts = payload
    } else {
      state.wh_cmnts = 'None'
    }
  },
  SET_WH_ID(state, payload) {
    state.wh_id = payload
  },
  SET_ORG_from(state, payload) {
    state.org_from = payload
  },
  SET_WH_FRM(state, payload) {
    state.wh_id_frm = payload
  },
  SET_WH_CNC_REQ(state, payload) {
    state.wh_cancel_req = payload
  },
  SET_HW_TO(state, payload) {
    console.log(payload)
    state.wh_id_to = payload
    if (payload !== null) {
      state.org_to = payload.org_id
    } else {
      state.org_to = null
    }
    console.log(state.org_to)
  },
  SET_HW_TO_ITEM(state, payload) {
    state.wh_item_id_to = payload
  },
  SET_TRNSF_QNTY(state, payload) {
    state.qntty = payload
  },
  SET_REQ_QNTY(state, payload) {
    state.value_qntty = payload
  },
  SET_RET_QNTY(state, payload) {
    state.value_ret_qntty = payload
  },
  SET_REQ_USR(state, payload) {
    state.selecteduser = payload
    console.log('payload', payload, 'store', state.selecteduser)
  },
  SET_TRANS_ORG(state, payload) {
    state.selectedOrg = payload
  },
  SET_TRANS_ORG_WAR(state, payload) {
    state.selectedOrgWar = payload
  },
  ///
  SET_VALUE_WAREHOUSE(state, payload) {
    state.value_Warehouse = payload
  },
  /// //ADD
  SET_ITEM_SEL(state, payload) {
    state.item_select = payload
  },
  SET_SUP_SEL(state, payload) {
    state.supplier_select = payload
  },
  SET_WAR_SEL(state, payload) {
    state.warehouse_select = payload
    console.log('selected warehouse', state.warehouse_select)
  },
  SET_WAY_BILL(state, payload) {
    state.waybill = payload
  },
  SET_QNTTY_ITEM(state, payload) {
    state.qntty_item = payload
  },
  SET_INV_DATE(state, payload) {
    state.inv_date = payload
  },
  SET_INV_CMMNTS(state, payload) {
    state.inv_comments = payload
  },
  SET_ISINV(state, payload) {
    state.isinv = payload
  },
  /// Rep
  SET_ITEM_REP(state, payload) {
    state.selectItemRep = payload
  },
  SET_WAR_REP(state, payload) {
    state.selectWarehouseRep = payload
  },
  SET_RNG_CASE(state, payload) {
    state.range_rep_case = payload
  },
}
