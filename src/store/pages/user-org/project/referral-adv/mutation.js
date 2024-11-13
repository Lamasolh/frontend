/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-cycle
import store from '@/store'
import moment from 'moment'

export default {
  // Global
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
  // Items
  ADD_ITEMS(state, payload) {
    let pri
    if (state.pcr_date !== null && state.pcr_date !== '') {
      const dff = moment(moment()).diff(state.pcr_date, 'days')
      if (dff >= state.priority_period) {
        pri = 5
      } else if (dff > (4 * state.priority_interval - 3)) {
        pri = 1
      } else if (dff > ((2 * state.priority_interval) - 1)) {
        pri = 2
      } else if (dff > state.priority_interval) {
        pri = 3
      } else {
        pri = 4
      }
    } else {
      pri = 5
    }
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
      enable: true,
      edit: false,
    })
    console.log(state.items)
  },
  // Items
  ADD_ITEMS_IMPORT(state, payload) {
    console.log('add', payload)
    let pri
    if (payload.item.pcr_date !== null && payload.item.pcr_date !== '') {
      const dff = moment(moment()).diff(payload.item.pcr_date, 'days')
      if (dff >= state.priority_period) {
        pri = 5
      } else if (dff > (4 * state.priority_interval - 3)) {
        pri = 1
      } else if (dff > ((2 * state.priority_interval) - 1)) {
        pri = 2
      } else if (dff > state.priority_interval) {
        pri = 3
      } else {
        pri = 4
      }
    } else {
      pri = 5
    }
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
    console.log('select')
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
      enable: true,
      edit: payload.item.isEdit,
    })
    console.log(state.items)
  },
  EDIT_ITEMS(state, payload) {
    state.items.forEach(element => {
      if (element.id === payload.id) {
        let pri
        if (state.pcr_date !== null && state.pcr_date !== '') {
          const dff = moment(moment()).diff(state.pcr_date, 'days')
          if (dff >= state.priority_period) {
            pri = 5
          } else if (dff > (4 * state.priority_interval - 3)) {
            pri = 1
          } else if (dff > ((2 * state.priority_interval) - 1)) {
            pri = 2
          } else if (dff > state.priority_interval) {
            pri = 3
          } else {
            pri = 4
          }
        } else {
          pri = 5
        }
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
        if (element._rowVariant === 'danger') {
          element._rowVariant = 'info'
        }
      }
    })
  },
  EDIT_MODE(state, payload) {
    state.items.forEach(element => {
      if (element.id === payload.id) {
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
      }
    })
  },
  REM_ITEMS(state, payload) {
    state.items.forEach((element, index) => {
      if (element.id === payload.index) {
        state.items.splice(index, 1)
      }
    })
    console.log(state.items)
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
  //
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
  ///
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
  SET_CAD_OPT(state, payload) {
    state.cadOptions = payload
  },
  SET_TYPE_OPT(state, payload) {
    state.typeOptions = payload
  },
  SET_ISS_OPT(state, payload) {
    state.issOptions = payload
  },
}
