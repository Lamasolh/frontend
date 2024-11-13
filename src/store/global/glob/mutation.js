export default {
  // district
  ADD_ALL_CHECK(state, payload) {
    state.check = payload
  },
  // Referral
  ADD_ALL_REF(state, payload) {
    state.referral = []
    payload.data.forEach(el => {
      state.referral.push({
        title: el.referral_name,
        title_ar: el.referral_name_ar,
        value: el.referral_id,
        isEnable: el.shwon,
      })
    })
  },
  ADD_ALL_GOV(state, payload) {
    state.governorate = []
    payload.data.forEach(el => {
      state.governorate.push({
        title: el.governorate_name,
        title_ar: el.governorate_name_ar,
        params: el.country_id,
        value: el.governorate_id,
      })
    })
  },
  ADD_ALL_ROLE_PRJ(state, payload) {
    state.rolesProject = []
    payload.data.forEach(el => {
      state.rolesProject.push({
        prjid: el.projid,
        prefix: el.proj_prefix,
        prcid: el.prc_id,
        prc_name: el.prc_name,
      })
    })
  },

  // district
  ADD_ALL_DIS(state, payload) {
    state.district = []
    payload.data.forEach(el => {
      state.district.push({
        title: el.district_name_eng,
        title_ar: el.district_name_ar,
        params: el.governorate_id,
        value: el.district_id,
      })
    })
  },
  // district
  ADD_ALL_TYPE(state, payload) {
    state.type = []
    payload.data.forEach(el => {
      state.type.push({
        title: el.name,
        title_ar: el.name_ar,
        value: el.st_id,
        prefix: el.prfx,
      })
    })
  },
  // feedback
  ADD_ALL_FEEDBACK(state, payload) {
    state.feedback = []
    payload.data.forEach(el => {
      state.feedback.push({
        title: el.feedback_eng,
        title_ar: el.feedback_ar,
        value: el.feed_id,
      })
    })
  },
  ADD_ALL_ORGData(state, payload) {
    payload.data.forEach(el => {
      state.organization_data.push({
        title: el.org_name,
        title_ar: el.org_disp_name,
        params: el.org_id,
        value: el.org_id,
      })
    })
  },
  // Municipality
  ADD_ALL_MUN(state, payload) {
    state.municipality = []
    payload.data.forEach(el => {
      state.municipality.push({
        title: el.cadastre_name,
        title_ar: el.cadastre_name_ar,
        params: el.district_id,
        value: el.cadastre_id,
      })
    })
  },
  // gender
  ADD_ALL_GEN(state, payload) {
    state.gender = []
    payload.data.forEach(el => {
      state.gender.push({
        title: el.gender_name,
        title_ar: el.gender_name_ar,
        value: el.gender_id,
      })
    })
  },
  // Nationality
  ADD_ALL_NAT(state, payload) {
    state.nationality = []
    payload.data.forEach(el => {
      state.nationality.push({
        title: el.nationality_name,
        title_ar: el.nationality_name_ar,
        value: el.nationality_id,
      })
    })
  },
  // Priority
  ADD_ALL_PRI(state, payload) {
    state.priority = []
    payload.data.forEach(el => {
      state.priority.push({
        title: el.name,
        title_ar: el.name_ar,
        value: el.priority_id,
        variant: el.variant,
      })
    })
  },
  // Caregiver
  ADD_ALL_CAR(state, payload) {
    state.caregiver = []
    payload.data.forEach(el => {
      state.caregiver.push({
        title: el.caregiver_name,
        title_ar: el.caregiver_name_ar,
        value: el.caregiver_id,
      })
    })
  },
  ADD_ALL_DLV_STATUS(state, payload) {
    state.delivery_status = []
    console.log(payload)
    payload.data.forEach(el => {
      state.delivery_status.push({
        title: el.delivery_status_name,
        title_ar: el.delivery_status_name_ar,
        value: el.delivery_status_id,
        variant: el.variant,
      })
    })
  },

  ADD_ALL_DEC(state, payload) {
    state.decision = []
    payload.data.forEach(el => {
      state.decision.push({
        title: el.decision_name,
        title_ar: el.decision_name_ar,
        value: el.decision_id,
      })
    })
  },
  ADD_ALL_JOB(state, payload) {
    state.job_title = []
    payload.data.forEach(el => {
      state.job_title.push({
        title: el.job_title_en,
        title_ar: el.job_title_ar,
        value: el.job_title_id,
      })
    })
  },
  ADD_ALL_ORG(state, payload) {
    payload.data.forEach(el => {
      state.organization.push({
        title: el.org_type_name,
        title_ar: el.org_type_name_ar,
        value: el.org_type_id,
      })
    })
  },
  ADD_ALL_STATUS(state, payload) {
    payload.data.forEach(el => {
      state.user_status.push({
        title: el.usr_stat_name,
        title_ar: el.user_stat_name_ar,
        value: el.usr_stat_id,
        variant: el.variant,
      })
    })
  },
  ADD_ALL_PCR_RES(state, payload) {
    state.pcr_result = []
    payload.data.forEach(el => {
      state.pcr_result.push({
        title: el.pcr_result_name,
        title_ar: el.pcr_result_name_ar,
        value: el.pcr_result_id,
      })
    })
  },
  ADD_ALL_FAM_REL(state, payload) {
    state.family_relation = []
    payload.data.forEach(el => {
      state.family_relation.push({
        title: el.family_relation_name,
        title_ar: el.family_relation_name_ar,
        value: el.family_relation_id,
      })
    })
  },
  ADD_ALL_INV_WAR(state, payload) {
    state.inv_warehouse = []
    payload.data.forEach(el => {
      state.inv_warehouse.push({
        title: el.type_name,
        title_ar: el.type_name_ar,
        value: el.wh_type,
      })
    })
  },

  ADD_ALL_EMP_TYP(state, payload) {
    state.employment = []
    payload.data.forEach(el => {
      state.employment.push({
        title: el.employment_type_name,
        title_ar: el.employment_type_name_ar,
        value: el.employment_type_id,
      })
    })
  },
  ADD_ALL_PHON_ISSU(state, payload) {
    state.phn_issues = []
    payload.data.forEach(el => {
      state.phn_issues.push({
        title: el.phone_issues_name,
        title_ar: el.phone_issues_name_ar,
        value: el.phone_issues_id,
      })
    })
  },

  ADD_ALL_ORG_TYPE(state, payload) {
    state.org_type = []
    payload.data.forEach(el => {
      state.org_type.push({
        title: el.org_type_name,
        title_ar: el.org_type_name_ar,
        value: el.org_type_id,
      })
    })
  },
  ADD_ALL_ORG_STATUS(state, payload) {
    state.org_status = []
    payload.data.forEach(el => {
      state.org_status.push({
        title: el.name_eng,
        title_ar: el.name_ara,
        value: el.org_stat_id,
      })
    })
  },
  ADD_ALL_ORG_JOB(state, payload) {
    state.orgJobOptions = []
    payload.data.forEach(el => {
      state.orgJobOptions.push({
        title: el.name_eng,
        title_ar: el.name_ara,
        value: el.id,
      })
    })
  },
}
