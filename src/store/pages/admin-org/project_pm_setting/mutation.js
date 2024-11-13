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
  SET_FILTER_ON(state, payload) {
    state.filterOn.push(payload)
  },
  ///
  SET_ASS_TO(state, payload) {
    state.isAssignSidebarActive = payload
  },
  SET_ADD_SIDE(state, payload) {
    state.isAssignSidebarActiveADD = payload
  },
  SET_ASS_TO_DON(state, payload) {
    state.isAssignSidebarActiveDon = payload
  },
  SET_ADD_SIDE_DON(state, payload) {
    state.isAssignSidebarActiveADDDon = payload
  },
  SET_MOD_SUP_LOOK(state, payload) {
    state.showModalSupLook = payload
  },
  SET_MOD_SUP_ISS(state, payload) {
    state.showModalIss = payload
  },
  SET_MOD_DONOR_LOOK(state, payload) {
    state.showModalDonorLook = payload
  },
  SET_MOD_SUP_ACPT_LOOK(state, payload) {
    state.showModalSupAcceptLook = payload
  },
  SET_MOD_DONOR_ACPT_LOOK(state, payload) {
    state.showModalDonorAcceptLook = payload
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
  SET_CAD_OPT(state, payload) {
    state.cadOptions = payload
  },
  SET_GOV(state, payload) {
    state.governorate = payload
    state.district = null
    state.cadaster = null
    state.saved = true
    state.cadOptions = []
  },
  SET_DIS(state, payload) {
    state.district = payload
    state.cadaster = null
    state.cadOptions = []
  },
  SET_CAD(state, payload) {
    state.cadaster = payload
  },
  ///
  Clear(state) {
    state.cycleduration = null
    state.modularity = null
  },
  REM_ITEM(state, payload) {
    state.items[payload].amount_per_cbm = null
    state.items[payload].supplier = null
    state.items[payload].note = null
  },
  ///
  SET_CYCLE(state, payload) {
    state.cycleduration = payload
  },
  SET_MODULE(state, payload) {
    state.modularity = payload
  },
  SET_PD(state, payload) {
    state.pd = payload
  },
  RESET_SUP(state) {
    state.supOrgName = null
    state.supPrefix = null
    state.supGovId = null
    state.supdisId = null
    state.supCadId = null
    state.supEmail = null
    state.supPhone = null
    state.supFirstName = null
    state.supLastName = null
    state.supUsername = null
    state.supPassword = '123456789'
  },
  RESET_DON(state) {
    state.donOrgName = null
    state.donPrefix = null
    state.donGovId = null
    state.dondisId = null
    state.donCadId = null
    state.donEmail = null
    state.donPhone = null
    state.donFirstName = null
    state.donLastName = null
    state.donUsername = null
    state.donPassword = '123456789'
  },
  RESET_PD(state) {
    state.PDName = null
    state.PDCode = null
    state.PDtag = null
    state.PDDonor = null
  },
  ///
  SET_SUP_ORG_NAME(state, payload) {
    state.supOrgName = payload
  },
  SET_SUP_ORG_PREFIX(state, payload) {
    state.supPrefix = payload
  },
  SET_SUP_GOV(state, payload) {
    state.supGovId = payload
  },

  SET_SUP_DIS(state, payload) {
    state.supdisId = payload
  },
  SET_SUP_CAD(state, payload) {
    state.supCadId = payload
  },
  SET_SUP_EMAIL(state, payload) {
    state.supEmail = payload
  },
  SET_SUP_PHONE(state, payload) {
    state.supPhone = payload
  },
  SET_SUP_FIRST_NAME(state, payload) {
    state.supFirstName = payload
  },
  SET_SUP_LAST_NAME(state, payload) {
    state.supLastName = payload
  },

  SET_SUP_USER_NAME(state, payload) {
    state.supUsername = payload
  },

  SET_SUP_PASSOWRD(state, payload) {
    state.supPassword = payload
  },

  SET_PHONE_SUP_LOOK(state, payload) {
    state.lookupSupPhone = payload
  },

  SET_ID_SUP_LOOK(state, payload) {
    state.lookupSupId = payload
  },
  SET_PHONE_DON_LOOK(state, payload) {
    state.lookupDonorPhone = payload
  },

  SET_ID_DON_LOOK(state, payload) {
    state.lookupDonorId = payload
  },
  ///
  SET_DON_ORG_NAME(state, payload) {
    state.donOrgName = payload
  },
  SET_DON_ORG_PREFIX(state, payload) {
    state.donPrefix = payload
  },
  SET_DON_GOV(state, payload) {
    state.donGovId = payload
  },

  SET_DON_DIS(state, payload) {
    state.dondisId = payload
  },
  SET_DON_CAD(state, payload) {
    state.donCadId = payload
  },

  SET_DON_EMAIL(state, payload) {
    state.donEmail = payload
  },
  SET_DON_PHONE(state, payload) {
    state.donPhone = payload
  },
  SET_DON_FIRST_NAME(state, payload) {
    state.donFirstName = payload
  },
  SET_DON_LAST_NAME(state, payload) {
    state.donLastName = payload
  },

  SET_DON_USER_NAME(state, payload) {
    state.donUsername = payload
  },

  SET_DON_PASSOWRD(state, payload) {
    state.donPassword = payload
  },

  ///
  SET_ASS_TO_PD(state, payload) {
    state.isAssignSidebarActivePD = payload
  },
  SET_ADD_SIDE_PD(state, payload) {
    state.isAssignSidebarActiveADDPD = payload
  },
  SET_PD_NAME(state, payload) {
    state.PDName = payload
  },
  SET_PD_CODE(state, payload) {
    state.PDCode = payload
  },
  SET_PD_TAG(state, payload) {
    state.PDtag = payload
  },
  SET_PD_DONOR(state, payload) {
    state.PDDonor = payload
  },
}
