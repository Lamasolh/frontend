import Vue from 'vue'

export default {
  SET_INFO(state, { key, value }) {
    Vue.set(state.orgDataInfo, key, value)
  },
  SET_ADMIN_INFO(state, { key, value }) {
    Vue.set(state.orgAdminInfo, key, value)
  },
  SET_TAB_INDEX(state, payload) {
    state.tabIndex = payload
  },
  SET_SHOW(state, payload) {
    state.show = payload
  },
  SET_DISB(state, payload) {
    state.disabled = payload
  },
  // Select
  SET_DIS_OP(state, payload) {
    state.disOp = []
    payload.forEach(el => {
      state.disOp.push({
        title: el.district_name_eng,
        title_ar: el.district_name_ar,
        params: el.governorate_id,
        value: el.district_id,
      })
    })
  },
  SET_CAD_OP(state, payload) {
    state.cadOp = []
    payload.forEach(el => {
      state.cadOp.push({
        title: el.cadastre_name,
        title_ar: el.cadastre_name_ar,
        params: el.district_id,
        value: el.cadastre_id,
      })
    })
  },
  SET_TYPE_OP(state, payload) {
    state.typeOp = []
    payload.forEach(el => {
      state.typeOp.push({
        title: el.org_type_name,
        title_ar: el.org_type_name_ar,
        value: el.org_type_id,
      })
    })
  },
  /// Organization values
  /* SET_INFO(state, payload) {
    state.orgDataInfo = payload
  },
  SET_ADMIN(state, payload) {
    state.orgAdminInfo = payload
  }, */
  SET_ORG_LOGO(state, payload) {
    state.orgLogo = payload
  },
  SET_ORG_NAME(state, payload) {
    state.orgName = payload
  },
  SET_ORG_DIS(state, payload) {
    state.orgDisName = payload
  },
  SET_ORG_REG(state, payload) {
    state.orgRegNumber = payload
  },
  SET_ORG_PREF(state, payload) {
    state.orgPrefix = payload.toUpperCase().trim()
  },
  SET_ORG_TYPE(state, payload) {
    state.orgType = payload
    console.log(state.orgType)
  },
  // contact
  SET_ORG_CONT(state, payload) {
    state.orgContact = payload
  },
  SET_ORG_PHO(state, payload) {
    state.orgPhone = payload
  },
  SET_ORG_MAIL(state, payload) {
    state.orgEmail = payload
  },
  SET_ORG_WEB(state, payload) {
    state.orgWebsite = payload
  },
  // location
  SET_GOV(state, payload) {
    state.orgGov = payload
    state.orgDis = null
    state.orgCad = null
  },
  SET_ORG_DIST(state, payload) {
    state.orgCad = null
    state.orgDis = payload
  },
  SET_ORG_CAD(state, payload) {
    state.orgCad = payload
  },
  SET_ORG_ADD(state, payload) {
    state.orgAddress = payload
  },
  // other:
  SET_ORG_DESC(state, payload) {
    state.orgDescription = payload
  },
}
