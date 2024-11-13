export default {
  SET_SAVED(state, payload) {
    state.saved = payload
  },
  SET_SHOW(state, payload) {
    state.show = payload
  },
  SET_SHOW_FILTER(state, payload) {
    state.showFilter = payload
  },
  SET_SHOW_COLUMN(state, payload) {
    state.showColumn = payload
  },
  SET_PERC(state, payload) {
    state.percentage = payload
  },
  SET_SHOW_END(state, payload) {
    state.showEnd = payload
  },
  SET_END_ITEM(state, payload) {
    state.endItem = payload
  },
  SET_JSON(state, payload) {
    state.json_fields = payload
  },
  // Options
  ADD_TYPE(state, payload) {
    console.log(payload)
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
  SET_RANG_DAT(state, payload) {
    state.rangedate = payload
  },
  SET_RANG_DAT_ME(state, payload) {
    state.rangedateME = payload
  },
  SET_DLV_STATUS(state, payload) {
    state.dlv_status = payload
  },
  SET_CASE_STATUS(state, payload) {
    state.case_status = payload
  },
  SET_CUR_STATUS(state, payload) {
    state.case_status = payload
  },
  SET_AWRN(state, payload) {
    state.awareness = payload
  },
  SET_MONI(state, payload) {
    state.monitoring = payload
  },
  SET_FEED(state, payload) {
    state.feedback = payload
  },
  // Data
  SET_ITEM(state, payload) {
    state.caseItem = payload
    state.saved = false
  },
  SET_ITEM_ME(state, payload) {
    state.caseItemME = payload
  },
  SET_FIELD(state, payload) {
    state.caseField = payload
  },
  SET_FIELD_ADD(state, payload) {
    state.fieldsSelect = payload
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
  ADD_ITEMS_FILED(state, payload) {
    state.filedOptions.push({
      id: payload.id,
      name: payload.name,
      desc: payload.desc,
      type: payload.type,
      value: payload.value,
      active: true,
    })
  },
  ADD_IND_FILED(state, payload) {
    state.filedOptions = []
    payload.forEach(el => {
      state.filedOptions.push({
        id: el.id,
        inPages: JSON.parse(el.in_pages.toString().replace(/\\/g, '')),
        name: el.name,
        require: el.ind_require,
        desc: el.ind_desc,
        type: el.type,
      })
    })
  },
}
