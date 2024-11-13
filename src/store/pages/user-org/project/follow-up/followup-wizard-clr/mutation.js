/* eslint-disable import/no-cycle */
/* eslint-disable prefer-destructuring */
import Vue from 'vue'
import store from '@/store'

export default {
    SET_SAVED(state, payload) {
        state.saved = payload
    },
    SET_SHOW(state, payload) {
        state.show = payload
    },
    SET_SHOW_NOTE(state, payload) {
        state.showNote = payload
    },
    SET_SHOW_NOTE_SUB(state, payload) {
        state.showNoteSubmit = payload
    },
    ACTIVE_SIDEBAR(state, payload) {
        state.isSidebarActive = payload
    },
    CALC_SCORE(state) {
        let scr = 0
        // eslint-disable-next-line no-unused-vars
        const ad = 0
        let cnt = 1
        let fmcnt = 0
        let stt = 'The Case needs:'
        state.validated = false
        if (
            state.items.adresstext == null ||
            state.items.adresstext === '' ||
            state.items.adresstext === 'None'
        ) {
            stt = `\n${cnt}. Missing text address`
            cnt += 1
        }
        if (
            state.items.address_latitude !== 0 ||
            state.items.address_longitude !== 0
        ) {
            // scr += 5
        } else {
            stt = `${stt}\n${cnt}. Missing Exact location`
            cnt += 1
        }
        if (
            state.items.address_latitude != null ||
            state.items.address_longitude != null
        ) {
            // scr += 5
        } else {
            stt = `${stt}\n${cnt}. Missing Exact location`
            cnt += 1
        }
        if (state.items.family_members >= 5) {
            // scr = 5
        }
        fmcnt =
            state.items.family_members -
            state.itemsfamily.male_count -
            state.itemsfamily.female_count
        if (
            state.items.family_members === 0 ||
            state.items.family_members === '0' ||
            state.itemsfamily.infected_count === 0 ||
            state.itemsfamily.infected_count === '0' ||
            fmcnt !== 0
        ) {
            stt = `${stt}\n${cnt}. Missing family details`
            cnt += 1
        }
        /* if (state.items.caregiver === 1) {
      stt = `${stt}\n${cnt}. Missing socio-economic info`
      cnt += 1
      stt = `${stt}\n${cnt}. Missing Accommodation info`
      cnt += 1
    } */
        if (state.items.iss != null) {
            scr += 10
        }
        /* if (state.items.Head_hhold === 1 || state.items.Head_hhold === '1') {
      scr += 15
    } */
        if (
            state.itemsfamily.pregnant === 1 ||
            state.itemsfamily.pregnant === '1'
        ) {
            scr += 10
        }
        if (
            state.items.monthly_payments === 1 ||
            state.items.monthly_payments === '1'
        ) {
            scr += 30
        }
        if (
            state.items.isolation_room === 0 ||
            state.items.isolation_room === '0' ||
            state.items.isolation_room == null
        ) {
            scr += 10
        }
        if (state.items.caregiver === 1) {
            scr += 10
        }
        /// Employments
        if (state.items.empl_type === 1) {
            scr += 10
        }
        /* else if (
      state.items.empl_type === 4
            || state.items.empl_type === '4'
    ) {
      scr += 25
    } else if (
      state.items.empl_type === 2
            || state.items.empl_type === '2'
    ) {
      scr += 10
    } */

        /*  if (state.itemsrec.pcr_date !== null) {
      const dff = moment(moment()).diff(state.itemsrec.pcr_date, 'days')
      if (dff < state.priority_period && dff >= 0) {
        if (
          state.itemsrec.pcr_photo !== null
                    && state.itemsrec.pcr_photo_aprv
        ) {
          scr += 10
        }
      }
    }
    if (
      state.itemsfamily.yng_child_count >= 3
            || state.itemsfamily.yng_child_count >= '3'
    ) {
      scr += 5
    }
    if (
      state.itemsfamily.child_count >= 3
            || state.itemsfamily.child_count >= '3'
    ) {
      scr += 2
    }
    if (
      state.itemsfamily.young_count >= 3
            || state.itemsfamily.young_count >= '3'
    ) {
      scr += 2
    }
    if (
      state.itemsfamily.teenager_count >= 3
            || state.itemsfamily.teenager_count >= '3'
    ) {
      scr += 2
    }
    if (
      state.itemsfamily.adult_count >= 3
            || state.itemsfamily.adult_count >= '3'
    ) {
      scr += 2
    }
    if (
      state.itemsfamily.elderly_count >= 3
            || state.itemsfamily.elderly_count >= '3'
    ) {
      scr += 10
    } */
        state.items.progress_scoring = scr

        if (cnt === 1) {
            if (state.items.progress_scoring >= 20) {
                stt = `The case is considered \nApproved with score of (${state.items.progress_scoring})`
                state.validated = true
            } else {
                const str = ''
                if (str === '') {
                    stt = `The case is considered Rejected\n with score of (${state.items.progress_scoring})`
                } else {
                    stt = `${str}\nwith score of (${state.items.progress_scoring})`
                }
                state.validated = true
            }
        }
        if (state.items.final_decision !== 3) {
            state.items.current_status = stt
        }
    },
    SET_ITEM(state, { key, value }) {
        Vue.set(state.items, key, value)
        store.commit('followUpWizClr/CALC_SCORE')
    },
    SET_ITEM_FAM(state, { key, value }) {
        Vue.set(state.itemsfamily, key, value)
        store.commit('followUpWizClr/CALC_SCORE')
    },
    SET_ITEM_REC(state, { key, value }) {
        Vue.set(state.itemsrec, key, value)
        store.commit('followUpWizClr/CALC_SCORE')
    },
    SET_ITEM_FAM_FIELD(state, payload) {
        state.itemsfamilyField = payload
    },
    SET_SELECT(state, { items, family, rec, getters }) {
        state.referral = state.referralOptions.filter(
            (it) => it.value === items.referral_id
        )
        state.governorate = getters['global/governorate'].filter(
            (it) => it.value === items.governorate_id
        )[0]
        state.district = getters['global/district'].filter(
            (it) => it.value === items.district_id
        )[0]
        state.type = state.typeOptions.filter(
            (it) => it.value === items.satl_type
        )[0]
        state.cadaster = state.cadOptions.filter(
            (it) => it.value === items.cadastre_id
        )[0]
        state.iss = state.issOptions.filter((it) => it.value === items.is_id)[0]
        console.log('/////////////////////////////////////////////////')
        console.log(getters['global/pcr_result'])
        console.log(rec)
        state.pcres = getters['global/pcr_result'].filter(
            (it) => it.value === rec.pcr_result
        )[0]
        console.log(state.pcres)
        state.munChange = false
        state.nationality = getters['global/nationality'].filter(
            (it) => it.value === items.nationality_id
        )
        if (family.result === 0) {
            state.gender = getters['global/gender'].filter(
                (it) => it.value === items.gender
            )
        } else {
            state.gender = getters['global/gender'].filter(
                (it) => it.value === family.gender
            )
            state.employment = getters['global/employment'].filter(
                (it) => it.value === items.empl_type
            )
            state.caregiver = getters['global/caregiver'].filter(
                (it) => it.value === items.caregiver
            )
        }
        console.log('ex', family.extra_fields)

        console.log('sssssssss', JSON.parse(family.extra_fields))

        state.filedOptions.forEach((el) => {
            if (JSON.parse(family.extra_fields) != null) {
                if (
                    JSON.parse(family.extra_fields).filter(
                        (e) => e[0] === el.id
                    ).length > 0
                ) {
                    console.log('el', el)
                    console.log(
                        'st',
                        state.filedOptions.filter((f) => f.id === el.id)[0]
                    )
                    console.log(
                        'st',
                        JSON.parse(family.extra_fields).filter(
                            (e) => e[0] === el.id
                        )[0]
                    )
                    state.filedOptions.filter((f) => f.id === el.id)[0].value =
                        JSON.parse(family.extra_fields).filter(
                            (e) => e[0] === el.id
                        )[0][1]
                }
            }
        })
        console.log('st', state.filedOptions)
        // phone
        const str = items.case_phone.toString()
        let cnt = null
        if (str.substring(0, 3) === '961') {
            cnt = 1
        } else if (str.substring(0, 3) === '963') {
            cnt = 2
        }
        state.country.id = cnt
        state.country.text = getters['global/phoneOptions'].filter(
            (it) => it.value === cnt
        )[0].text
        state.country.number = str.substring(3, str.length)
        store.commit('followUpWizClr/CALC_SCORE')
    },
    ADD_ALL_REF(state, payload) {
        state.referralOptions = []
        payload.data.forEach((el) => {
            state.referralOptions.push({
                title: el.referral_name,
                title_ar: el.referral_name_ar,
                value: el.referral_id
            })
        })
    },
    //
    //
    ADD_TYPE(state, payload) {
        console.log(payload)
        state.typeOptions = []
        payload.forEach((el) => {
            state.typeOptions.push({
                title: el.name,
                title_ar: el.name_ar,
                value: el.st_id
            })
        })
    },
    ADD_CAD(state, payload) {
        state.cadOptions = []
        payload.forEach((el) => {
            state.cadOptions.push({
                title: el.cadastre_name,
                title_ar: el.cadastre_name_ar,
                value: el.cadastre_id
            })
        })
    },
    ADD_ISS(state, payload) {
        state.issOptions = []
        payload.forEach((el) => {
            state.issOptions.push({
                title: el.is_name,
                title_ar: el.is_name_ar,
                value: el.is_id,
                parms: el.cad_id
            })
        })
    },
    SET_CAD_OPT(state, payload) {
        state.cadOptions = payload
    },
    /// Selected
    SET_REF(state, payload) {
        state.referral = payload
        // state.items.referral_id = payload.value
        store.commit('followUpWizClr/SET_ITEM', {
            key: 'referral_id',
            value: payload.value
        })
    },
    SET_GOV(state, payload) {
        state.governorate = payload
        state.district = null
        state.type = null
        state.cadaster = null
        state.iss = null
        state.saved = true
        state.typeOptions = []
        state.cadOptions = []
        state.issOptions = []
    },
    SET_DIS(state, payload) {
        state.district = payload
        state.type = null
        state.cadaster = null
        state.iss = null
        state.cadOptions = []
        state.issOptions = []
        state.typeOptions = []
        store.commit('followUpWizClr/SET_ITEM', {
            key: 'district_id',
            value: payload.value
        })
    },
    SET_TYPE(state, payload) {
        if (state.type != null) {
            if (state.type.value <= 3) {
                if (
                    payload.value !== 1 &&
                    payload.value !== 2 &&
                    payload.value !== 3
                ) {
                    state.cadaster = null
                    state.iss = null
                    store.commit('followUpWizClr/SET_ITEM', {
                        key: 'iss',
                        value: null
                    })
                    state.saved = true
                }
            } else {
                state.cadaster = null
                state.iss = null
                store.commit('followUpWizClr/SET_ITEM', {
                    key: 'iss',
                    value: null
                })
                state.saved = true
            }
        } else {
            state.cadaster = null
            state.iss = null
            store.commit('followUpWizClr/SET_ITEM', {
                key: 'iss',
                value: null
            })
            state.saved = true
        }
        state.type = payload
    },
    SET_CAD(state, payload) {
        state.cadaster = payload
        state.iss = null
        store.commit('followUpWizClr/SET_ITEM', {
            key: 'iss',
            value: null
        })
        state.issOptions = []
        store.commit('followUpWizClr/SET_ITEM', {
            key: 'cadastre_id',
            value: payload == null ? null : payload.value
        })
    },
    SET_ISS(state, payload) {
        state.iss = payload
        state.munChange = true
        store.commit('followUpWizClr/SET_ITEM', {
            key: 'iss',
            value: payload == null ? null : payload.value
        })
    },
    MUN_CHNG(state) {
        state.munChange = true
    },
    SET_MUN(state, payload) {
        state.municipality = payload
        store.commit('followUpWizClr/SET_ITEM', {
            key: 'cadastre_id',
            value: payload.value
        })
        store.commit('followUpWizClr/MUN_CHNG')
    },
    SET_NAT(state, payload) {
        state.nationality = payload
        store.commit('followUpWizClr/SET_ITEM', {
            key: 'nationality_id',
            value: payload.value
        })
    },
    SET_GEN(state, payload) {
        state.gender = payload
        // state.itemsfamily[0].gender = payload.value
        store.commit('followUpWizClr/SET_ITEM_FAM', {
            key: 'gender',
            value: payload.value
        })
    },
    SET_EMPL(state, payload) {
        state.employment = payload
        store.commit('followUpWizClr/SET_ITEM', {
            key: 'empl_type',
            value: payload.value
        })
    },
    SET_GVR(state, payload) {
        state.caregiver = payload
        store.commit('followUpWizClr/SET_ITEM', {
            key: 'caregiver',
            value: payload.value
        })
    },
    SET_PTRY(state, payload) {
        state.priority = payload
        store.commit('followUpWizClr/SET_ITEM', {
            key: 'priority_level',
            value: payload.value
        })
    },
    /* SET_PHN_ISS(state, payload) {
    // phnss = store.state.phn_issues.find(it => it.value === payload.value)[0].title
    store.commit('followUpWizClr/phoneissue', { value: payload.title }
    //state.phoneissue = payload.title
  },
  // store.commit('followUpWizClr/SET_ITEM', { key: 'priority_level', value: payload.value } */
    SET_PHN_ISS(state, payload) {
        state.phoneissue = payload.title
    },
    ADD_ORG_LIST(state, payload) {
        state.orglist = []
        payload.forEach((el) => {
            state.orglist.push({
                title: el.org_name,
                value: el.org_id
            })
        })
    },
    SET_PCR_RES(state, payload) {
        state.pcres = payload
        store.commit('followUpWizClr/SET_ITEM_REC', {
            key: 'pcr_result',
            value: payload.value
        })
    },
    SET_ORG_CHANGE(state, payload) {
        state.orglist = payload
    },
    Save_ORG_CHANGE(state) {
        store.commit('followUpWizClr/SET_ITEM', {
            key: 'org_id',
            value: state.orglist.value
        })
    },
    SET_SELECTD_VAL_ORG(state, payload) {
        state.orglistselect = payload.title
    },
    RESET(state) {
        state.saved = false
        state.show = true
        state.showNote = false
        state.showNoteSubmit = false
        ///
        state.referralOptions = []
        state.typeOptions = []
        state.cadOptions = []
        state.issOptions = []
        // Filters
        state.referral = null
        state.governorate = null
        state.district = null
        state.type = null
        state.iss = null
        state.cadaster = null
        state.nationality = null
        state.gender = null
        state.employment = null
        state.caregiver = null
        state.priority = null
        state.validated = null
        state.phoneissue = null
        //
        state.priority_period = 0
        state.priority_interval = 0
        //
        state.items = []
        state.itemsrec = []
        state.itemsfamily = []
        state.caseItem = []
        state.country = {
            id: null,
            text: null,
            number: null
        }
        state.orglist = []
        state.orglistselect = null
        state.isInView = false
        /// ///
        state.isSidebarActive = false
    },
    /// //////////// Filed
    ADD_ITEMS_FILED(state, payload) {
        state.filedOptions.push({
            id: payload.id,
            name: payload.name,
            desc: payload.desc,
            type: payload.type,
            value: payload.value,
            active: true
        })
    },
    ADD_IND_FILED(state, payload) {
        state.filedOptions = []
        state.indOptions = []
        console.log(payload)
        payload
            .filter((el) => el.DataEntry === 'true')
            .forEach((el) => {
                console.log('payload', el)
                state.filedOptions.push({
                    id: el.id,
                    isInd:
                        JSON.parse(el.in_pages.toString().replace(/\\/g, ''))
                            .isInd ?? false,
                    inPages: JSON.parse(
                        el.in_pages.toString().replace(/\\/g, '')
                    ),
                    name: el.name,
                    require: el.ind_require,
                    desc: el.ind_desc,
                    type: el.type
                })
            })
    },
    REM_ITEMS_IND(state, payload) {
        state.filedOptions.splice(payload.index, 1)
    },
    RESET_ITEMS_IND(state) {
        state.filedOptions = [...state.indOptions]
    }
}
