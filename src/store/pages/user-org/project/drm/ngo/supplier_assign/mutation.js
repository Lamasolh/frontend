export default {
  SET_SHOW(state, payload) {
    state.show = payload
  },
  SET_SAVED(state, payload) {
    state.saved = payload
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
  SET_FILTER_EDIT(state, payload) {
    state.filter = payload
  },
  SET_FILTER_ON(state, payload) {
    state.filterOn.push(payload)
  },

  SET_ASS_TO(state, payload) {
    state.isAssignSidebarActive = payload
  },
  SET_ADD_SIDE(state, payload) {
    state.isAssignSidebarActiveADD = payload
  },
  Clear(state) {
    state.govOptions = []
    state.disOptions = []
    state.cadOptions = []
    state.pdList = []
    state.pd = null
    state.listCycle = []
    state.cycleType = null
    state.district = null
    state.governorate = null
    state.cadaster = null
    state.items = []
    state.ongoing_iss = null
    state.total_iss = null
  },
  REM_ITEM(state, payload) {
    state.items.splice(payload, 1)
  },
  ///
  SET_SUP_NAME(state, payload) {
    state.supName = payload
  },
  SET_SUP_CON_NAME(state, payload) {
    state.contactName = payload
  },
  SET_SUP_CON_PHONE(state, payload) {
    state.contactPhone = payload
  },
  SET_SUP_DESC(state, payload) {
    state.descNote = payload
  },
  SET_SUP_USERNAME(state, payload) {
    state.username = payload
  },

  SET_MOD_URG(state, payload) {
    state.showModalUrgent = payload
  },
  SET_MOD_SUP(state, payload) {
    state.supplier = payload
  },
  SET_MOD_DON(state, payload) {
    state.donor = payload
  },
  SET_MOD_AMNT(state, payload) {
    state.amount = payload
  },
  SET_MOD_QTY(state, payload) {
    state.quantity = payload
  },
  SET_MOD_PD(state, payload) {
    state.pd = payload
  },
  SET_MOD_CYCLE_TYPE(state, payload) {
    state.cycleType = payload
  },

  SET_MOD_NOTE(state, payload) {
    state.note = payload
  },

  SET_MOD_ID(state, payload) {
    state.selectedUrgentId = payload
  },
  /// Create Referral
  // Options
  ADD_TYPE(state, payload) {
    state.typeOptions = []
    payload.forEach(el => {
      state.typeOptions.push({
        title: el.name,
        title_ar: el.name_ar,
        value: el.st_id,
      })
    })
  },
  ADD_CAD(state, payload) {
    state.cadOptions = []
    payload.forEach(el => {
      state.cadOptions.push({
        title: el.cadastre_name,
        title_ar: el.cadastre_name_ar,
        value: el.cadastre_id,
      })
    })
  },
  ADD_ISS(state, payload) {
    state.issOptions = []
    payload.forEach(el => {
      state.issOptions.push({
        title: el.is_name,
        title_ar: el.is_name_ar,
        value: el.is_id,
        parms: el.cad_id,
      })
    })
  },
  SET_CAD_OPT(state, payload) {
    state.cadOptions = payload
  },
  /// select
  SET_REF(state, payload) {
    state.referral = payload
  },
  SET_GOV(state, payload) {
    state.governorate = payload
    state.district = null
    state.cadaster = null
    state.iss = null
    state.saved = true
    state.cadOptions = []
    state.issOptions = []
  },
  SET_DIS(state, payload) {
    state.district = payload
    state.cadaster = null
    state.iss = null
    state.cadOptions = []
    state.issOptions = []
  },
  SET_TYPE(state, payload) {
    state.type = payload
    state.cadaster = null
    state.iss = null
    state.saved = true
    state.cadOptions = []
    state.issOptions = []
  },
  SET_CAD(state, payload) {
    state.cadaster = payload
    state.iss = null
    state.issOptions = []
  },
  SET_ISS(state, payload) {
    state.iss = payload
  },
  SET_SHOW_FILTER(state, payload) {
    console.log('////////////')
    console.log(payload)
    state.showFilter = payload
    if (payload === false) {
      state.typeOptions = []
      state.cadOptions = []
      state.issOptions = []
      state.referral = null
      state.district = null
      state.governorate = null
      state.type = null
      state.iss = null
      state.cadaster = null
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
    }
  },
  SET_SHOW_FILTER_EDIT(state, payload) {
    console.log('////////////')
    console.log(payload)
    state.showFilter = payload
    if (payload === false) {
      state.typeOptions = []
      state.cadOptions = []
      state.issOptions = []
      state.referral = null
      state.district = null
      state.governorate = null
      state.type = null
      state.iss = null
      state.cadaster = null
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
    }
  },
  SET_PCODE(state, payload) {
    state.pcode = payload
  },
  SET_NOIDP(state, payload) {
    state.noidp = payload
  },
  SET_CAP(state, payload) {
    state.capacity = payload
  },
  SET_UNIT(state, payload) {
    state.unit = payload
  },
  SET_DEADLINE(state, payload) {
    state.deadline = payload
  },
  SET_DUR(state, payload) {
    state.duration = payload
  },

  SET_AMOUNT(state, payload) {
    state.amount = payload
  },
  SET_FC(state, payload) {
    state.focal_point = payload
  },
  SET_FC_PH(state, payload) {
    state.focal_point_ph = payload
  },
  SET_QOTA(state, payload) {
    state.quota = payload
  },
  SET_STATUS(state, payload) {
    state.status = payload
  },

  SET_QTY_ND(state, payload) {
    state.qtyNeeded = payload
  },
  SET_PER_DAY(state, payload) {
    state.qty_perDay = payload
  },
}
