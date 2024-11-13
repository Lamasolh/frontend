/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-cycle
import store from '@/store'
// import moment from 'moment'

export default {
  /// //// Global
  SET_SAVED(state, payload) {
    state.saved = payload
  },
  SET_SHOW(state, payload) {
    state.show = payload
  },
  RESET_ALL(state) {
    state.saved = false
    state.items = []
    state.fullname = null
    state.country = 'LB(961)'
    state.countryid = 1
    state.phone = null
    state.pcr_date = null
    state.referral = null
    state.district = null
    state.governorate = null
    state.type = null
    state.iss = null
    state.cadaster = null
    state.typeOptions = []
    state.cadOptions = []
    state.issOptions = []
  },
  /// //// Items
  ADD_ITEMS(state, payload) {
    const pri = 5
    let nat
    switch (state.type.value) {
      case 1:
        nat = 2
        break
      case 2:
        nat = 3
        break
      case 3:
        nat = 5
        break
      case 4:
        nat = 3
        break
      case 5:
        nat = 3
        break
      case 6:
        nat = 4
        break
      case 7:
        nat = 4
        break
      default:
        nat = 2
    }
    // eslint-disable-next-line prefer-destructuring
    const nationality = store.getters['global/nationality'].filter(
      it => it.value === nat,
    )[0]
    state.items.push({
      id: payload.id,
      name: state.fullname,
      country: store.getters['global/phoneOptions'].filter(
        op => op.value === state.countryid,
      )[0].text,
      countryid: state.countryid,
      phone: state.phone,
      referral: state.referral,
      district: state.district,
      governorate: state.governorate,
      type: state.type,
      iss: state.iss,
      nationality,
      cadaster: state.cadaster,
      pcr_date: state.pcr_date,
      priority: pri,
      districtOptions: payload.rootState.global.district.filter(item => item.params
        === (state.governorate != null ? state.governorate.value : null)),
      typeOptions: state.typeOptions,
      cadOptions: state.cadOptions,
      issOptions: state.issOptions,
      gender: state.gender,
      pcres: state.pcres,
      infected_count: state.infected_count == null || state.infected_count === '' ? 1 : state.infected_count,
      male_count: state.male_count == null || state.male_count === '' ? 0 : state.male_count,
      female_count: state.female_count == null || state.female_count === '' ? 0 : state.female_count,
      child_count: state.child_count == null || state.child_count === '' ? 0 : state.child_count,
      yng_child_count: state.yng_child_count == null || state.yng_child_count === '' ? 0 : state.yng_child_count,
      young_count: state.young_count == null || state.young_count === '' ? 0 : state.young_count,
      teenager_count: state.teenager_count == null || state.teenager_count === '' ? 0 : state.teenager_count,
      adult_count: state.adult_count == null || state.adult_count === '' ? 0 : state.adult_count,
      elderly_count: state.elderly_count == null || state.elderly_count === '' ? 0 : state.elderly_count,
      family_members: state.family_members == null || state.family_members === '' ? 0 : state.family_members,
      pregnant: state.pregnant,
      house_hold: state.house_hold,
      isolation_room: state.isolation_room,
      monthly_payments: state.monthly_payments,
      caregiver: state.caregiver,
      employment: state.employment,
      adresstext: state.adresstext,
      multiField: state.filedOptions,
      enable: true,
      edit: false,
    })
    state.filedOptions = state.indOptions
    console.log(state.items)
  },
  ADD_ITEMS_IMPORT(state, payload) {
    console.log('add', payload)
    const pri = 5
    let nat = null
    let nationality = null
    if (payload.item.type != null) {
      switch (payload.item.type.value) {
        case 1:
          nat = 2
          break
        case 2:
          nat = 3
          break
        case 3:
          nat = 5
          break
        case 4:
          nat = 3
          break
        case 5:
          nat = 3
          break
        case 6:
          nat = 4
          break
        case 7:
          nat = 4
          break
        default:
          nat = 2
      }
      nationality = store.getters['global/nationality'].filter(
        it => it.value === nat,
      )[0]
    }
    console.log('nat')
    // eslint-disable-next-line prefer-destructuring
    const typOp = []
    const cadOp = []
    const issOp = []
    payload.item.typeOp.forEach(el => {
      typOp.push({
        title: el.name,
        title_ar: el.name_ar,
        value: el.st_id,
      })
    })
    payload.item.cadOP.forEach(el => {
      cadOp.push({
        title: el.cadastre_name,
        title_ar: el.cadastre_name_ar,
        value: el.cadastre_id,
      })
    })
    payload.item.issOp.forEach(el => {
      issOp.push({
        title: el.is_name,
        title_ar: el.is_name_ar,
        value: el.is_id,
        parms: el.cad_id,
      })
    })
    console.log('select', payload)
    state.items.push({
      id: payload.item.id,
      name: payload.item.name,
      country: payload.item.countryText,
      countryid: payload.item.country != null ? payload.item.country.value : null,
      phone: payload.item.phone,
      referral: payload.item.referral,
      district: payload.item.dis,
      governorate: payload.item.gov,
      type: payload.item.type,
      iss: payload.item.iss,
      nationality,
      cadaster: payload.item.cad,
      pcr_date: payload.item.pcr_date,
      priority: pri,
      districtOptions: payload.item.gov != null ? payload.rootState.global.district.filter(item => item.params
        === (payload.item.gov != null ? payload.item.gov.value : null)) : [],
      typeOptions: typOp,
      cadOptions: cadOp,
      issOptions: issOp,
      gender: payload.item.gender,
      pcres: payload.item.pcres,
      infected_count: payload.item.infected_count,
      male_count: payload.item.male_count,
      female_count: payload.item.female_count,
      child_count: payload.item.child_count,
      yng_child_count: payload.item.yng_child_count,
      young_count: payload.item.young_count,
      teenager_count: payload.item.teenager_count,
      adult_count: payload.item.adult_count,
      elderly_count: payload.item.elderly_count,
      family_members: payload.item.family_members,
      pregnant: payload.item.pregnant,
      house_hold: payload.item.house_hold,
      isolation_room: payload.item.isolation_room,
      monthly_payments: payload.item.monthly_payments,
      caregiver: payload.item.caregiver,
      employment: payload.item.employment,
      adresstext: payload.item.adresstext,
      multiField: state.filedOptions,
      enable: true,
      edit: payload.item.isEdit,
    })
    state.filedOptions = state.indOptions
    console.log(state.items)
  },
  EDIT_ITEMS(state, payload) {
    const element = state.items.filter(el => el.id === payload.id)[0]
    const pri = 5
    let nat
    switch (state.type) {
      case 1:
        nat = 2
        break
      case 2:
        nat = 3
        break
      case 3:
        nat = 5
        break
      case 4:
        nat = 3
        break
      case 5:
        nat = 3
        break
      case 6:
        nat = 4
        break
      case 7:
        nat = 4
        break
      default:
        nat = 2
    }
    // eslint-disable-next-line prefer-destructuring
    const nationality = store.getters['global/nationality'].filter(
      it => it.value === nat,
    )[0]
    element.name = state.fullname
    element.country = store.getters['global/phoneOptions'].filter(
      op => op.value === state.countryid,
    )[0].text
    element.countryid = state.countryid
    element.phone = state.phone
    element.referral = state.referral
    element.district = state.district
    element.governorate = state.governorate
    element.type = state.type
    element.iss = state.iss
    element.nationality = nationality
    element.cadaster = state.cadaster
    element.pcr_date = state.pcr_date
    element.priority = pri
    element.typeOptions = state.typeOptions
    element.cadOptions = state.cadOptions
    element.enable = true
    element.edit = false
    element.issOptions = state.issOptions
    element.infected_count = state.infected_count ?? 1
    element.gender = state.gender
    element.pcres = state.pcres
    element.male_count = state.male_count ?? 0
    element.female_count = state.female_count ?? 0
    element.child_count = state.child_count ?? 0
    element.yng_child_count = state.yng_child_count ?? 0
    element.young_count = state.young_count ?? 0
    element.teenager_count = state.teenager_count ?? 0
    element.adult_count = state.adult_count ?? 0
    element.elderly_count = state.elderly_count ?? 0
    element.family_members = state.family_members
    // other
    element.pregnant = state.pregnant
    element.house_hold = state.house_hold

    element.isolation_room = state.isolation_room
    element.monthly_payments = state.monthly_payments

    element.caregiver = state.caregiver
    element.employment = state.employment
    element.multiField = state.filedOptions
    element.adresstext = state.adresstext
    if (element._rowVariant === 'danger') {
      element._rowVariant = 'info'
    }
    state.filedOptions = state.indOptions
  },
  EDIT_MODE(state, payload) {
    const element = state.items[payload]
    state.fullname = element.name.toString()
    state.phone = element.phone.toString()
    state.country = element.country
    state.countryid = element.countryid
    state.referral = element.referral
    state.district = element.district
    state.governorate = element.governorate
    state.type = element.type
    state.iss = element.iss
    state.typeOptions = element.typeOptions
    state.cadOptions = element.cadOptions
    state.issOptions = element.issOptions
    state.cadaster = element.cadaster
    state.pcr_date = element.pcr_date
    //
    state.gender = element.gender
    state.pcres = element.pcres

    //
    state.infected_count = element.infected_count ?? 1
    state.male_count = element.male_count ?? 0
    state.female_count = element.female_count ?? 0
    state.child_count = element.child_count ?? 0
    state.yng_child_count = element.yng_child_count ?? 0
    state.young_count = element.young_count ?? 0
    state.teenager_count = element.teenager_count ?? 0
    state.adult_count = element.adult_count ?? 0
    state.elderly_count = element.elderly_count ?? 0
    state.family_members = element.family_members
    // other
    state.pregnant = element.pregnant
    state.house_hold = element.house_hold

    state.isolation_room = element.isolation_room
    state.monthly_payments = element.monthly_payments

    state.caregiver = element.caregiver
    state.employment = element.employment
    state.filedOptions = element.multiField
    state.adresstext = element.adresstext
  },
  REM_ITEMS(state, payload) {
    state.items.splice(payload.index, 1)
  },
  ADD_ITEMS_IMPORT_BLC(state, payload) {
    state.items_blc.push({
      id: payload.id,
      resdtype: payload.resdtype,
      cadaster: payload.cadaster,
      nof: payload.nof,
      husband: payload.husband,
      wife: payload.wife,
      nor: payload.nor,
      pcode: payload.pcode,
      phone: payload.phone,
      latitude: payload.latitude,
      longitude: payload.longitude,
      address: payload.address,
      error: payload.error,
      enable: payload.enable,
      resdtypeID: payload.resdtypeID,
      _rowVariant: payload.enable ? null : 'danger',
    })
  },
  RESET_ITEM_BLC(state) { state.items_blc = [] },
  /// ///////////// Options
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
  SET_TYPE_OPT(state, payload) {
    state.typeOptions = payload
  },
  SET_ISS_OPT(state, payload) {
    state.issOptions = payload
  },
  /// ///////// Basic
  SET_NAME(state, payload) {
    state.fullname = payload
  },
  SET_PHONE(state, payload) {
    state.phone = payload
  },
  SET_CTR(state, payload) {
    state.country = payload
  },
  SET_CTR_ID(state, payload) {
    state.countryid = payload
  },
  SET_PCR_DATE(state, payload) {
    state.pcr_date = payload
  },
  SET_REF(state, payload) {
    state.referral = payload
  },
  SET_GOV(state, payload) {
    state.governorate = payload
    state.district = null
    state.cadaster = null
    state.iss = null
    state.saved = true
    state.type = null
    state.cadOptions = []
    state.issOptions = []
    state.typeOptions = []
  },
  SET_DIS(state, payload) {
    state.district = payload
    state.cadaster = null
    state.iss = null
    state.type = null
    state.cadOptions = []
    state.issOptions = []
    state.typeOptions = []
  },
  SET_TYPE(state, payload) {
    state.type = payload
    state.cadaster = null
    state.iss = null
    state.saved = true
    if (payload == null) {
      state.cadOptions = []
      state.issOptions = []
    }
  },
  SET_CAD(state, payload) {
    state.cadaster = payload
    state.iss = null
    state.issOptions = []
  },
  SET_ISS(state, payload) {
    state.iss = payload
  },
  SET_PCR_RES(state, payload) {
    state.pcres = payload
  },
  SET_GEN(state, payload) {
    state.gender = payload
  },
  /// ////////// Family
  SET_FALMILY(state, payload) {
    state.family_members = payload
  },
  SET_MALE(state, payload) {
    state.male_count = payload
  },
  SET_FEMALE(state, payload) {
    state.female_count = payload
  },
  SET_INFECTED(state, payload) {
    state.infected_count = payload
  },
  SET_YNG_CHILD(state, payload) {
    state.yng_child_count = payload
  },
  SET_CHILD(state, payload) {
    state.child_count = payload
  },
  SET_YOUNG(state, payload) {
    state.young_count = payload
  },
  SET_TEENAGER(state, payload) {
    state.teenager_count = payload
  },
  SET_ADULT(state, payload) {
    state.adult_count = payload
  },
  SET_ELDERLY(state, payload) {
    state.elderly_count = payload
  },

  /// /////// Other  Info
  SET_EMPL(state, payload) {
    state.employment = payload
  },
  SET_GVR(state, payload) {
    state.caregiver = payload
  },
  SET_HOUSEHOLD(state, payload) {
    state.house_hold = payload
  },
  SET_PREGNANT(state, payload) {
    state.pregnant = payload
  },
  SET_DUEPAY(state, payload) {
    state.monthly_payments = payload
  },
  SET_ISOL(state, payload) {
    state.isolation_room = payload
  },
  SET_ADDRESS(state, payload) {
    state.adresstext = payload
  },
  /// //////////// Filed
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
    state.indOptions = []
    console.log('paysload', payload)
    payload.filter(el => el.DataEntry === 'true').forEach(el => {
      console.log('payload', el)
      state.filedOptions.push({
        id: el.id,
        inPages: JSON.parse(el.in_pages.toString().replace(/\\/g, '')),
        name: el.name,
        isInd: JSON.parse(el.in_pages.toString().replace(/\\/g, '')).isInd ?? false,
        require: el.ind_require,
        desc: el.ind_desc,
        type: el.type,
      })
      state.indOptions.push({
        id: el.id,
        inPages: JSON.parse(el.in_pages.toString().replace(/\\/g, '')),
        name: el.name,
        require: el.ind_require,
        desc: el.ind_desc,
        type: el.type,

      })
    })
  },
  REM_ITEMS_IND(state, payload) {
    state.filedOptions.splice(payload.index, 1)
  },
  RESET_ITEMS_IND(state) {
    state.filedOptions = [...state.indOptions]
  },
}
