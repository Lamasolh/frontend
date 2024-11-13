/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'
import moment from 'moment'

export default {
  GetExcelData({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/project/get_excel_data', {
          params: {
            prefix: payload.prefix,
          },
        })
        .then(resp => {
          console.log(resp.data)
          state.referralOp = []
          state.govOp = []
          state.disOp = []
          state.typeOp = []
          state.cadOp = []
          state.issOp = []
          state.pcrOp = []
          state.genderOp = []
          state.empOp = []
          state.carOp = []
          state.indOp = []
          state.items = []
          state.field = []
          state.baseField = [
            { key: 'Referral', label: 'Referral' },
            { key: 'Name', label: 'Name' },
            { key: 'CountryPhone', label: 'CountryPhone' },
            { key: 'Phone', label: 'Phone' },
            { key: 'PCRDate', label: 'PCRDate' },
            { key: 'ResidentialType', label: 'ResidentialType' },
            { key: 'Cadaster', label: 'Cadaster' },
            { key: 'Settlement', label: 'Settlement' },
            { key: 'PCRResult', label: 'PCRResult' },
            { key: 'Gender', label: 'Gender' },
            { key: 'MaleCount', label: 'MaleCount' },
            { key: 'FemaleCount', label: 'FemaleCount' },
            { key: 'InfectedCount', label: 'InfectedCount' },
            { key: 'BabiesCount', label: 'BabiesCount' },
            { key: 'ChildCount', label: 'ChildCount' },
            { key: 'YoungCount', label: 'YoungCount' },
            { key: 'TeeanagerCount', label: 'TeeanagerCount' },
            { key: 'AdultCount', label: 'AdultCount' },
            { key: 'ElderlyCount', label: 'ElderlyCount' },
            { key: 'IsHouseHold', label: 'IsHouseHold' },
            { key: 'IsPregnant', label: 'IsPregnant' },
            { key: 'IsIsolation', label: 'IsIsolation' },
            { key: 'MonthlyPayment', label: 'MonthlyPayment' },
            { key: 'Emplyment', label: 'Emplyment' },
            { key: 'Caregiver', label: 'Caregiver' },
            { key: 'Address', label: 'Address' },
          ]
          resp.data.ind.filter(el => el.DataEntry === 'true' && el.active === 1).forEach(el => {
            state.indOp.push({
              id: el.id,
              inPages: JSON.parse(el.in_pages.toString().replace(/\\/g, '')),
              name: el.name,
              require: el.ind_require,
              desc: el.ind_desc,
              type: el.type,

            })
            state.baseField.push({
              key: el.name, label: el.name,
            })
          })
          resp.data.ref.forEach(el => {
            state.referralOp.push({ title: el.referral_name, title_ar: el.referral_name_ar, value: el.referral_id })
          })
          resp.data.type.forEach(el => {
            state.typeOp.push({ title: el.name, title_ar: el.name_ar, value: el.st_id })
          })
          resp.data.gov.forEach(el => {
            state.govOp.push({ title: el.governorate_name, title_ar: el.governorate_name_ar5, value: el.governorate_id })
          })
          resp.data.dis.forEach(el => {
            state.disOp.push({
              title: el.district_name_eng,
              title_ar: el.district_name_ar,
              value: el.district_id,
              govId: el.governorate_id,
            })
          })
          resp.data.cad.forEach(el => {
            state.cadOp.push({
              title: el.cadastre_name,
              title_ar: el.cadastre_name_ar,
              value: el.cadastre_id,
              disId: el.district_id,
            })
          })
          resp.data.iss.forEach(el => {
            state.issOp.push({
              title: el.is_name, title_ar: el.is_name_ar, value: el.is_id, cadId: el.cad_id,
            })
          })
          resp.data.pcr.forEach(el => {
            state.pcrOp.push({ title: el.pcr_result_name, title_ar: el.pcr_result_name_ar, value: el.pcr_result_id })
          })
          resp.data.gen.forEach(el => {
            state.genderOp.push({ title: el.gender_name, title_ar: el.gender_name_ar, value: el.gender_id })
          })
          resp.data.emp.forEach(el => {
            state.empOp.push({ title: el.employment_type_name, title_ar: el.employment_type_name_ar, value: el.employment_type_id })
          })
          resp.data.car.forEach(el => {
            state.carOp.push({ title: el.caregiver_name, title_ar: el.caregiver_name_ar, value: el.caregiver_id })
          })
          payload.values[0].forEach(el => {
            state.field.push({
              key: el, label: el,
            })
          })
          payload.values.shift()
          payload.values.forEach(row => {
            const arr = {}
            arr.id = state.items.length + 1
            state.field.forEach((fld, index) => {
              if (fld.key === 'PCRDate') {
                arr[fld.key] = moment(row[index]).format('YYYY-MM-DD')
              } else {
                arr[fld.key] = row[index]
              }
            })
            state.items.push(arr)
          })
          /// Check Column
          state.field.forEach((fld, index) => {
            if (state.baseField.findIndex(el => el.key === fld.key) === -1) {
              state.field[index].variant = 'danger'
            } else if (state.baseField.filter(el => el.key === fld.key).length !== 1) {
              state.field[index].variant = 'danger'
            }
          })
          /// Check Cell
          state.items.forEach((fld, index) => {
            const cellCariant = {}
            state.items.filter(el => state.items.filter(e => e.Phone === el.Phone).length > 1).forEach(s => {
              if (state.items.indexOf(s) !== -1) {
                state.items[state.items.indexOf(s)]._rowVariant = 'warning'
              }
            })
            const ref = fld.Referral == null ? true : state.referralOp.filter(
              it => it.title === fld.Referral,
            ).length === 0
            if (ref) {
              cellCariant.Referral = 'danger'
            }
            if ((fld.Name.match(/\d/))) {
              cellCariant.Name = 'danger'
            }

            if (fld.CountryPhone == null ? true : (
              state.phoneOp.options.filter(el => el.text === fld.CountryPhone).length === 0
            )) {
              cellCariant.CountryPhone = 'danger'
            }
            if (fld.Phone == null) {
              cellCariant.Phone = 'danger'
            } else if (!(/^(1|2|3|8|70|71|76|77|78|81)[0-9]{6}$/.test(fld.Phone))) {
              cellCariant.Phone = 'danger'
            }

            if (fld.PCRDate == null) {
              cellCariant.Phone = 'danger'
            } else if (!moment(fld.PCRDate).isValid()) {
              cellCariant.PCRDate = 'danger'
            } else if (!moment(fld.PCRDate).isBefore()) {
              cellCariant.PCRDate = 'danger'
            }

            const type = fld.ResidentialType == null ? null : (
              state.typeOp.filter(it => it.title === fld.ResidentialType)
            )

            const cad = fld.Cadaster == null ? null : (
              state.cadOp.filter(it => it.title === fld.Cadaster)
            )
            if (cad == null ? true : cad.length === 0) {
              cellCariant.Cadaster = 'danger'
            }
            if (type == null ? true : type.length === 0) {
              cellCariant.ResidentialType = 'danger'
            } else if (type[0].value >= 4 && fld.Settlement == null) {
              cellCariant.Settlement = 'danger'
            } else if (type[0].value < 4 && fld.Settlement != null) {
              cellCariant.Settlement = 'danger'
            } else if (type[0].value >= 4) {
              const iss = fld.Settlement == null ? null : state.issOp.filter(
                it => it.title === fld.Settlement,
              )[0]
              if (iss !== null && type[0].value >= 4) {
                if (iss.cadId !== cad[0].value) {
                  cellCariant.Settlement = 'danger'
                }
              } else {
                cellCariant.Settlement = 'danger'
              }
            }
            if (fld.PCRResult == null ? true : (
              state.pcrOp.filter(el => el.title === fld.PCRResult).length === 0
            )) {
              cellCariant.PCRResult = 'danger'
            }
            if (fld.Gender == null ? true : (
              state.genderOp.filter(el => el.title === fld.Gender).length === 0
            )) {
              cellCariant.Gender = 'danger'
            }
            if (fld.MaleCount == null) {
              state.items[index].MaleCount = 0
            }
            if (fld.FemaleCount == null) {
              state.items[index].FemaleCount = 0
            }
            if (fld.InfectedCount == null) {
              state.items[index].InfectedCount = 0
            }
            if (fld.BabiesCount == null) {
              state.items[index].BabiesCount = 0
            }
            if (fld.ChildCount == null) {
              state.items[index].ChildCount = 0
            }
            if (fld.YoungCount == null) {
              state.items[index].YoungCount = 0
            }
            if (fld.TeeanagerCount == null) {
              state.items[index].TeeanagerCount = 0
            }
            if (fld.AdultCount == null) {
              state.items[index].AdultCount = 0
            }
            if (fld.ElderlyCount == null) {
              state.items[index].ElderlyCount = 0
            }
            //
            if (fld.MaleCount != null ? isNaN(String(fld.MaleCount)) : false) {
              cellCariant.MaleCount = 'danger'
            }

            if (fld.FemaleCount != null ? isNaN(String(fld.FemaleCount)) : false) {
              cellCariant.FemaleCount = 'danger'
            }
            if (fld.InfectedCount != null ? isNaN(String(fld.InfectedCount)) : false) {
              cellCariant.InfectedCount = 'danger'
            } if (fld.BabiesCount != null ? isNaN(String(fld.BabiesCount)) : false) {
              cellCariant.BabiesCount = 'danger'
            } if (fld.ChildCount != null ? isNaN(String(fld.ChildCount)) : false) {
              cellCariant.ChildCount = 'danger'
            } if (fld.YoungCount != null ? isNaN(String(fld.YoungCount)) : false) {
              cellCariant.YoungCount = 'danger'
            } if (fld.TeeanagerCount != null ? isNaN(String(fld.TeeanagerCount)) : false) {
              cellCariant.TeeanagerCount = 'danger'
            }
            if (fld.AdultCount != null ? isNaN(String(fld.AdultCount)) : false) {
              cellCariant.AdultCount = 'danger'
            }
            if (fld.ElderlyCount != null ? isNaN(String(fld.ElderlyCount)) : false) {
              cellCariant.ElderlyCount = 'danger'
            }

            if ((fld.IsHouseHold != null)
              ? (fld.IsHouseHold === 'Yes' ? false : (fld.IsHouseHold !== 'No'))
              : false) {
              cellCariant.IsHouseHold = 'danger'
            }
            if ((fld.IsPregnant != null)
              ? (fld.IsPregnant === 'Yes' ? false : (fld.IsPregnant !== 'No'))
              : false) {
              cellCariant.IsPregnant = 'danger'
            }
            if ((fld.IsIsolation != null)
              ? (fld.IsIsolation === 'Yes' ? false : (fld.IsIsolation !== 'No'))
              : false) {
              cellCariant.IsIsolation = 'danger'
            }
            if ((fld.MonthlyPayment != null)
              ? (fld.MonthlyPayment === 'Yes' ? false : (fld.MonthlyPayment !== 'No'))
              : false) {
              cellCariant.MonthlyPayment = 'danger'
            }

            if (fld.Caregiver == null ? false : (
              state.carOp.filter(el => el.title === fld.Caregiver).length === 0
            )) {
              cellCariant.Caregiver = 'danger'
            }

            if (fld.Emplyment == null ? false : (
              state.empOp.filter(el => el.title === fld.Emplyment).length === 0
            )) {
              cellCariant.Emplyment = 'danger'
            }

            state.items[index]._cellVariants = cellCariant
            console.log('cellCariant', cellCariant)
          })
          /// Finish
          state.field.push({ key: 'Action', label: 'Action', class: 'action' })
          state.field.unshift({
            key: 'code', label: 'Code', class: 'code',
          })
          state.field.unshift({
            key: 'id', label: 'ID', class: 'id', stickyColumn: true,
          })
          state.items.forEach((el, index) => {
            if (Object.keys(el._cellVariants).length !== 0) {
              state.items[index]._cellVariants.id = 'warning'
            }
          })
          state.show = false
          console.log('state.field', state.field)
          console.log('state.items', state.items)
          resolve(resp.data)
        })
        .catch(error => {
          state.show = false
          console.log(error)
          reject(error)
        })
    })
  },
  UPDATE({ commit }) {
    commit('EDIT')
  },

  UPLOAD({ state }, payload) {
    state.show = true
    return new Promise((resolve, reject) => {
      API.apiClient
        .post('/api/project/referral-clr-excel', {
          prefix: payload.prefix,
          ind: state.indOp,
          type: payload.type,
          items: state.items,
        })
        .then(resp => {
          console.log(resp)
          resp.data.result.forEach((el, index) => {
            if (el[0].result === 1) {
              state.items.filter(
                it => it.id === el[1].id,
              )[0]._rowVariant = 'success'
              state.items.filter(
                it => it.id === el[1].id,
              )[0].code = `Case Added: ${el[0].case_code}`
              state.items[index].enable = false
            } else if (el[0].result === 2) {
              state.items.filter(
                it => it.id === el[1].id,
              )[0]._rowVariant = 'warning'
              state.items.filter(
                it => it.id === el[1].id,
              )[0].code = `Case Duplication: ${el[0].case_code}`
              state.items[index].enable = true
              console.log(
                `Res2: Case Duplication- ${el[0].case_code}`,
              )
            } else {
              state.items.filter(
                it => it.id === el[1].id,
              )[0]._rowVariant = 'danger'
              state.items.filter(
                it => it.id === el[1].id,
              )[0].code = 'Contact Adminstrator'
              state.items[index].enable = true
              console.log('Res: Error')
            }
          })
          console.log('ups')
          state.exportTable = JSON.parse(JSON.stringify(state.items.filter(el => el._rowVariant !== 'success')))
          console.log(state.exportTable)
          console.log(state.items.filter(el => el._rowVariant !== 'success'))
          state.show = false
          resolve(resp.data.result)
        })
        .catch(error => {
          console.log(error)
          state.show = false
          reject(error.response)
        })
    })
  },
}
