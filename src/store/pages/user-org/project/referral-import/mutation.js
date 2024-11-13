/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
// import store from '@/store'
// import moment from 'moment'

export default {
  /// //// Global
  SET_SAVED(state, payload) {
    state.saved = payload
  },
  SET_SHOW(state, payload) {
    state.show = payload
  },
  TOGGLE_EDIT_CHNG(state, payload) {
    state.editToggle = payload
  },
  TOGGLE_EDIT(state, payload) {
    state.editToggle = true
    state.itemEdit = payload
    state.itemId = payload.item.id
    state.fullname = payload.item.Name
    state.country = payload.item.CountryPhone
    state.countryid = payload.item.CountryPhone === 'LB(961)' ? 1 : 2
    state.phone = payload.item.Phone
    state.pcr_date = payload.item.PCRDate
    state.referral = payload.item.Referral == null ? null : state.referralOp.filter(
      it => it.title === payload.item.Referral,
    )[0]

    state.type = payload.item.ResidentialType == null ? null : state.typeOp.filter(
      it => it.title === payload.item.ResidentialType,
    )[0]
    state.cadaster = payload.item.Cadaster == null ? null : state.cadOp.filter(
      it => it.title === payload.item.Cadaster,
    )[0]
    state.district = state.cadaster == null ? null : state.disOp.filter(
      it => it.value === state.cadaster.disId,
    )[0]
    state.governorate = state.district == null ? null : state.govOp.filter(
      it => it.value === state.district.govId,
    )[0]
    if (state.cadaster == null) {
      state.iss = null
    } else {
      const iss = payload.item.Settlement == null ? null : state.issOp.filter(
        it => it.title === payload.item.Settlement,
      )[0]
      if (iss !== null) {
        if (iss.cadId === state.cadaster.value) {
          state.iss = payload.item.Settlement == null ? null : state.issOp.filter(
            it => it.title === payload.item.Settlement,
          )[0]
        }
      }
    }

    /* state.indOp.filter(
      it => it.title === nat,
    )[0] */
    state.gender = payload.item.Gender == null ? null : state.genderOp.filter(
      it => it.title === payload.item.Gender,
    )[0]
    state.pcres = payload.item.PCRResult == null ? null : state.pcrOp.filter(
      it => it.title === payload.item.PCRResult,
    )[0]

    /// Family
    state.infected_count = payload.item.InfectedCount
    state.male_count = payload.item.MaleCount
    state.female_count = payload.item.FemaleCount
    state.child_count = payload.item.BabiesCount
    state.yng_child_count = payload.item.ChildCount
    state.young_count = payload.item.YoungCount
    state.teenager_count = payload.item.TeeanagerCount
    state.adult_count = payload.item.AdultCount
    state.elderly_count = payload.item.ElderlyCount
    /// other

    state.pregnant = payload.item.IsPregnant === 'Yes'
    state.house_hold = payload.item.IsHouseHold === 'Yes'
    state.isolation_room = payload.item.IsIsolation === 'Yes'
    state.monthly_payments = payload.item.MonthlyPayment === 'Yes'

    state.caregiver = payload.item.Caregiver == null ? null : state.carOp.filter(
      it => it.title === payload.item.Caregiver,
    )[0]
    state.employment = payload.item.Emplyment == null ? null : state.empOp.filter(
      it => it.title === payload.item.Emplyment,
    )[0]
    state.adresstext = payload.item.Address

    Object.entries(payload.item).forEach(element => {
      const s = state.indOp.findIndex(
        it => it.name === element[0],
      )
      if (s !== -1) {
        // eslint-disable-next-line prefer-destructuring
        state.indOp[s].value = element[1]
      }
    })
    state.exportTable = JSON.parse(JSON.stringify(state.items.filter(el => el._rowVariant !== 'success')))
  },
  EDIT(state) {
    state.editToggle = false
    const item = {}
    item.id = state.itemId
    item.Name = state.fullname
    item.CountryPhone = state.countryid === 1 ? 'LB(961)' : 'SY(963)'
    item.Phone = state.phone
    item.PCRDate = state.pcr_date
    item.fullname = state.fullname
    item.Referral = state.referral.title
    item.ResidentialType = state.type.title
    item.Cadaster = state.cadaster.title
    if (state.type.value > 3) {
      item.Settlement = state.iss.title
    }
    item.Gender = state.gender == null ? null : state.gender.title
    item.PCRResult = state.pcres == null ? null : state.pcres.title
    console.log('fam', state.infected_count)
    /// Family
    item.InfectedCount = state.infected_count == null ? 0 : state.infected_count
    item.MaleCount = state.male_count == null ? 0 : state.male_count
    item.FemaleCount = state.female_count == null ? 0 : state.female_count
    item.BabiesCount = state.child_count == null ? 0 : state.child_count
    item.ChildCountt = state.yng_child_count == null ? 0 : state.yng_child_count
    item.YoungCount = state.young_count == null ? 0 : state.young_count
    item.TeeanagerCount = state.teenager_count == null ? 0 : state.teenager_count
    item.AdultCount = state.adult_count == null ? 0 : state.adult_count
    item.ElderlyCount = state.elderly_count == null ? 0 : state.elderly_count

    /// other
    item.IsPregnant = state.pregnant == null ? null : (state.pregnant ? 'Yes' : 'NO')
    item.IsHouseHold = state.house_hold == null ? null : (state.house_hold ? 'Yes' : 'NO')
    item.IsIsolation = state.isolation_room == null ? null : (state.isolation_room ? 'Yes' : 'NO')
    item.MonthlyPayment = state.monthly_payments == null ? null : (state.monthly_payments ? 'Yes' : 'NO')

    /// other
    item.Caregiver = state.caregiver == null ? null : state.caregiver == null ? null : state.caregiver.title
    item.Emplyment = state.employment == null ? null : state.employment == null ? null : state.employment.title
    item.Address = state.adresstext

    state.indOp.forEach(el => {
      item[el.name] = el.value
    })
    console.log('state.item')
    console.log(state.items)
    console.log(item)
    console.log(state.itemEdit.index)
    state.items[state.itemEdit.index] = item
    console.log(state.items)
    state.exportTable = JSON.parse(JSON.stringify(state.items.filter(el => el._rowVariant !== 'success')))
  },

  ///
  SET_EXP_TABLE(state, payload) {
    state.exportTable = payload
  },
  ITEM_EDIT_CHNG(state, payload) {
    state.editToggle = payload
  },
  REM_ITEM_BY_INDEX(state, payload) {
    console.log(payload.index)
    console.log(state.items)
    state.items.splice(payload.index, 1)
    state.items.forEach(el => {
      // eslint-disable-next-line no-param-reassign
      el._rowVariant = null
    })
    state.items.filter(el => state.items.filter(e => e.Phone === el.Phone).length > 1).forEach(s => {
      if (state.items.indexOf(s) !== -1) {
        state.items[state.items.indexOf(s)]._rowVariant = 'warning'
      }
    })
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
  },
  SET_DIS(state, payload) {
    state.district = payload
    state.cadaster = null
    state.iss = null
    state.type = null
  },
  SET_TYPE(state, payload) {
    state.type = payload
    state.cadaster = null
    state.iss = null
    state.saved = true
  },
  SET_CAD(state, payload) {
    state.cadaster = payload
    state.iss = null
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
}
