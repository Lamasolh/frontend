import Vue from 'vue'

export default {
  SET_SAVED(state, payload) {
    state.saved = payload
  },
  SET_SHOW(state, payload) {
    state.show = payload
  },
  // Filters
  SET_JOB(state, payload) {
    state.job = payload
  },
  SET_STATUS(state, payload) {
    console.log(payload)
    state.status = payload
  },
  // Cases
  PRJ_Item(state, payload) {
    state.projectItem = payload
  },
  SET_FIELD(state, payload) {
    state.projectField = payload
  },
  // Option Table
  SET_PER_PAGE(state, payload) {
    state.perPage = payload
  },
  SET_CUR_PAGE(state, payload) {
    state.currentPage = payload
  },
  /// Sort
  SET_SORT_BY(state, payload) {
    state.sortBy = payload
  },
  SET_SORT_DESC(state, payload) {
    state.sortDesc = payload
  },
  SET_SORT_DIR(state, payload) {
    state.sortDirection = payload
  },
  /// Filter
  SET_FILTER(state, payload) {
    state.filter = payload
  },
  SET_FILTER_ON(state, payload) {
    state.filterOn.push(payload)
  },
  SET_ITEM(state, payload) {
    state.rolesItem = payload
  },
  SET_SELECT(state, payload) {
    state.selectItem.push(payload)
  },
  SET_ITEM_ADV_orgigin(state, payload) {
    state.rolesItemOriginal = []
    payload.forEach((el, index) => {
      state.rolesItemOriginal.push({})
      Vue.set(state.rolesItemOriginal[index], 'referral_entry', el.referral_entry)
      Vue.set(state.rolesItemOriginal[index], 'case_assignment', el.case_assignment)
      Vue.set(state.rolesItemOriginal[index], 'assessment', el.assessment)
      Vue.set(state.rolesItemOriginal[index], 'link_assessment', el.link_assessment)
      Vue.set(state.rolesItemOriginal[index], 'geo_split', el.geo_split)
      Vue.set(state.rolesItemOriginal[index], 'inventory', el.inventory)
      Vue.set(state.rolesItemOriginal[index], 'distributor', el.distributor)
      Vue.set(state.rolesItemOriginal[index], 'awareness', el.awareness)
      Vue.set(state.rolesItemOriginal[index], 'monitoring', el.monitoring)
      Vue.set(state.rolesItemOriginal[index], 'reporting', el.reporting)
    })
  },
  SET_ITEM_ADV(state, { key, value }) {
    Vue.set(state.rolesItem[0], key, value)
  },
  PUSH_ITEM(state, payload) {
    state.rolesItem = []
    setTimeout(() => {
      state.rolesItem.push(payload)
    }, 10)
  },
  SET_CAT(state, payload) {
    state.roleCategory = payload
  },
  ADD_CAT(state, payload) {
    state.roleCategory = []
    payload.data.forEach(el => {
      state.roleCategory.push({
        title: el.prc_name,
        value: el.prc_id,
        referral_entry: el.referral,
        case_assignment: el.case_assignment,
        assessment: el.assessemnt,
        link_assessment: el.assessement_link,
        geo_split: el.Task_manager,
        inventory: el.inventory,
        distributor: el.distributor,
        awareness: el.awareness,
        monitoring: el.monitoring,
        reporting: el.reporting,
      })
    })
  },
  /// Search
  SET_MARKER_ITEM(state, payload) {
    state.orgMarker = payload
  },
  CLEAR_MARKER_ITEM(state) {
    state.orgMarker = []
  },
  SET_ORG_ITEM(state, payload) {
    state.orgMarker.push(payload)
  },
  REM_ORG_ITEM(state, payload) {
    state.orgMarker.splice(payload, 1)
  },
  SET_GOV(state, payload) {
    state.governorate = payload
    state.district = null
    state.municipality = null
    state.orgMarker = []
  },
  SET_DIS(state, payload) {
    state.district = payload
    state.municipality = null
    state.orgMarker = []
  },
  SET_MUN(state, payload) {
    state.municipality = payload
    state.orgMarker = []
  },
  SET_TYPE(state, payload) {
    state.type = payload
    state.municipality = null
    state.orgMarker = []
  },
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
  TOGGLE(state, payload) {
    state.infoWinOpen = payload
  },

}
