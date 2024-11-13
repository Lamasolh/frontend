/* eslint-disable prefer-destructuring */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/no-cycle
import * as API from '@/services/API'

export default {
  GET_DATA({ state }, payload) {
    state.show = true
    return new Promise(((resolve, reject) => {
      API.apiClient
        .get('/api/project/get_monitoring_view', {
          params: {
            prefix: payload.prefix,
            case_id: payload.case_id,
            type: payload.type,
          },
        })
        .then(resp => {
          console.log(resp)
          state.show = false
          resolve(resp)
        })
        .catch(error => {
          state.show = false
          console.log(error)
          reject(error)
        })
    }))
  },
  GET_DATA_VIEW({ state, commit }, payload) {
    state.show = true
    state.info_status = null
    state.family_status = null
    state.pcr_photo_status = null
    state.pcr_date_status = null
    state.socio_status = null
    // add
    state.address_status = null
    state.delivery_verify = null
    //
    state.awrns_status = null
    state.note = null
    return new Promise((resolve, reject) => {
      API.apiClient
        .get('/api/project/get_monitoring_view', {
          params: {
            case_id: payload.case_id,
            type: payload.type,
          },
        })
        .then(resp => {
          console.log('res', resp)
          console.log(resp.data.case[0].full_name)
          state.case_id = resp.data.case[0].case_id
          state.case_status = payload.info
          state.case_code = resp.data.case[0].case_code == null ? 'None' : resp.data.case[0].case_code
          state.fullname = resp.data.case[0].full_name == null ? 'None' : resp.data.case[0].full_name
          state.phone = resp.data.case[0].case_phone == null ? 'None' : resp.data.case[0].case_phone
          state.referral = resp.data.case[0].referral_name == null ? 'None' : resp.data.case[0].referral_name
          state.referral_date = resp.data.case[0].referral_date == null ? 'None' : resp.data.case[0].referral_date
          state.nationality = resp.data.case[0].nationality_name == null ? 'None' : resp.data.case[0].nationality_name
          state.gender = resp.data.case[0].gender_name == null ? 'None' : resp.data.case[0].gender_name
          // state.address_status = resp.data.case[0].info_status == null ? 'None' : resp.data.case[0].info_status
          state.governorate = resp.data.case[0].governorate_name == null ? 'None' : resp.data.case[0].governorate_name
          state.district = resp.data.case[0].district_name_eng == null ? 'None' : resp.data.case[0].district_name_eng
          state.cadaster = resp.data.case[0].cadastre_name == null ? 'None' : resp.data.case[0].cadastre_name
          state.type = resp.data.case[0].sat_name == null ? 'None' : resp.data.case[0].sat_name
          state.iss = resp.data.case[0].iss_name == null || resp.data.case[0].iss_name === '' ? 'None' : resp.data.case[0].iss_name
          state.address = resp.data.case[0].adresstext == null ? 'None' : resp.data.case[0].adresstext
          state.lat = resp.data.case[0].address_latitude == null ? 0 : resp.data.case[0].address_latitude
          state.lng = resp.data.case[0].address_longitude == null ? 0 : resp.data.case[0].address_longitude

          // Delivery
          state.lat_dlv = resp.data.case[0].delivery_latitiude == null ? 0 : resp.data.case[0].delivery_latitiude
          state.lng_dlv = resp.data.case[0].delivery_longtitude == null ? 0 : resp.data.case[0].delivery_longtitude
          state.delivery = resp.data.case[0].dlvry_name == null ? 'None' : resp.data.case[0].dlvry_name
          state.delivery_org = resp.data.case[0].info_status == null ? 'None' : resp.data.case[0].info_status
          state.delivery_comment = resp.data.case[0].dlvry_comments == null ? 'None' : resp.data.case[0].dlvry_comments
          state.delivery_status = resp.data.case[0].delivery_status_name == null ? 'None' : resp.data.case[0].delivery_status_name
          state.delivery_status_id = resp.data.case[0].delivery_status
          state.delivery_time = resp.data.case[0].dlvry_time == null ? 'None' : resp.data.case[0].dlvry_time
          state.delivery_date = resp.data.case[0].dlvry_date == null ? 'None' : resp.data.case[0].dlvry_date

          /// Family
          state.male_count = resp.data.case[0].male_count == null ? 'None' : resp.data.case[0].male_count
          state.female_count = resp.data.case[0].female_count == null ? 'None' : resp.data.case[0].female_count
          state.family_count = resp.data.case[0].family_members == null ? 'None' : resp.data.case[0].family_members
          state.baby_count = resp.data.case[0].yng_child_count == null ? 'None' : resp.data.case[0].yng_child_count
          state.children_count = resp.data.case[0].child_count == null ? 'None' : resp.data.case[0].child_count
          state.young_count = resp.data.case[0].young_count == null ? 'None' : resp.data.case[0].young_count
          state.tenager_count = resp.data.case[0].teenager_count == null ? 'None' : resp.data.case[0].teenager_count
          state.adult_count = resp.data.case[0].adult_count == null ? 'None' : resp.data.case[0].adult_count
          state.eldrly_count = resp.data.case[0].elderly_count == null ? 'None' : resp.data.case[0].elderly_count
          state.is_pregnant = resp.data.case[0].pregnant == null ? 'None' : resp.data.case[0].pregnant === 1 ? 'True' : 'False'
          state.is_household = resp.data.case[0].Head_hhold == null ? 'None' : resp.data.case[0].Head_hhold === 1 ? 'True' : 'False'
          // Criteria
          state.is_paymentdue = resp.data.case[0].monthly_payments == null ? 'None' : resp.data.case[0].monthly_payments === 1 ? 'True' : 'False'
          state.is_isolated = resp.data.case[0].isolation_room == null ? 'None' : resp.data.case[0].isolation_room === 1 ? 'True' : 'False'
          state.employment = resp.data.case[0].employment_type_name == null ? 'None' : resp.data.case[0].employment_type_name
          state.care_giver = resp.data.case[0].caregiver_name == null ? 'None' : resp.data.case[0].caregiver_name
          //
          state.pcr_photo = resp.data.case[0].pcr_photo
          //
          state.pcr_date = resp.data.case[0].pcr_date
          ///
          state.awrns_comments = resp.data.case[0].awrns_comments == null ? 'None' : resp.data.case[0].awrns_comments
          state.awrns_datetime = resp.data.case[0].awrns_datetime == null ? 'None' : resp.data.case[0].awrns_datetime
          state.awrns_feedback = resp.data.case[0].awrns_feedback_name == null ? 'None' : resp.data.case[0].awrns_feedback_name
          state.awrnss_inprgrss = resp.data.case[0].awrnss_inprgrss == null ? 'None' : resp.data.case[0].awrnss_inprgrss === 1 ? 'True' : 'False'

          state.awrns_malecount = resp.data.case[0].awrns_malecount == null ? 'None' : resp.data.case[0].awrns_malecount
          state.awrns_femalecount = resp.data.case[0].awrns_femalecount == null ? 'None' : resp.data.case[0].awrns_femalecount
          state.awrns_householdCount = resp.data.case[0].awrns_householdCount == null ? 'None' : resp.data.case[0].awrns_householdCount

          // Feedback
          state.fdbk_acceptable_on_scheduled = resp.data.case[0].fdbk_acceptable_on_scheduled == null ? 'None' : resp.data.case[0].fdbk_acceptable_on_scheduled === 1 ? 'True' : 'False'
          state.fdbk_additional_information = resp.data.case[0].fdbk_additional_information == null ? 'None' : resp.data.case[0].fdbk_additional_information
          state.fdbk_additional_items = resp.data.case[0].fdbk_additional_items == null ? 'None' : resp.data.case[0].fdbk_additional_items
          state.fdbk_awareness_recieved = resp.data.case[0].fdbk_awareness_recieved == null ? 'None' : resp.data.case[0].fdbk_awareness_recieved === 1 ? 'True' : 'False'
          state.fdbk_awareness_usefull = resp.data.case[0].fdbk_awareness_usefull == null ? 'None' : resp.data.case[0].fdbk_awareness_usefull === 1 ? 'True' : 'False'
          state.fdbk_communication_behaviour = resp.data.case[0].fdbk_communication_behaviour == null ? 'None' : resp.data.case[0].fdbk_communication_behaviour === 1 ? 'True' : 'False'
          state.fdbk_complains_comments = resp.data.case[0].fdbk_complains_comments == null ? 'None' : resp.data.case[0].fdbk_complains_comments
          state.fdbk_feedback_date = resp.data.case[0].fdbk_feedback_date == null ? 'None' : resp.data.case[0].fdbk_feedback_date
          state.fdbk_item_recieved = resp.data.case[0].fdbk_item_recieved == null ? 'None' : resp.data.case[0].fdbk_item_recieved
          state.fdbk_not_acceptable_res = resp.data.case[0].fdbk_not_acceptable_res == null ? 'None' : resp.data.case[0].fdbk_not_acceptable_res
          state.fdbk_number_item_sufficient = resp.data.case[0].fdbk_number_item_sufficient == null ? 'None' : resp.data.case[0].fdbk_number_item_sufficient === 1 ? 'True' : 'False'
          state.fdbk_on_scheduled = resp.data.case[0].fdbk_on_scheduled == null ? 'None' : resp.data.case[0].fdbk_on_scheduled === 1 ? 'True' : 'False'
          state.fdbk_receive_item_q = resp.data.case[0].fdbk_receive_item_q == null ? 'None' : resp.data.case[0].fdbk_receive_item_q === 1 ? 'True' : 'False'
          state.fdbk_score = resp.data.case[0].fdbk_score == null ? 'None' : resp.data.case[0].fdbk_score
          state.fdbk_used_by_you_or_else = resp.data.case[0].fdbk_used_by_you_or_else == null ? 'None' : resp.data.case[0].fdbk_used_by_you_or_else
          state.fdbk_why_not_usefull_awrns = resp.data.case[0].fdbk_why_not_usefull_awrns == null ? 'None' : resp.data.case[0].fdbk_why_not_usefull_awrns
          state.fdbk_why_number_not_sufficient = resp.data.case[0].fdbk_why_number_not_sufficient == null ? 'None' : resp.data.case[0].fdbk_why_number_not_sufficient
          state.show = false

          state.case_notes = resp.data.case[0].case_notes == null ? '' : resp.data.case[0].case_notes
          state.current_status = resp.data.case[0].current_status == null ? '' : resp.data.case[0].current_status
          state.decision_name = resp.data.case[0].decision_name == null ? '' : resp.data.case[0].decision_name
          if (
            resp.data.case[0].monitored_inprogress === 0
              && resp.data.case[0].monitored === 0
          ) {
            state.monitored = true
          } else if (
            resp.data.case[0].monitored_inprogress === 0
                     && resp.data.case[0].monitored === 1
          ) {
            state.monitored = false
          } else if (
            resp.data.case[0].monitored_inprogress === 1
                     && resp.data.case[0].monitored === 1
          ) {
            state.monitored = true
          } else {
            state.monitored = false
          }
          console.log('monitored', state.monitored)
          state.overOption = []
          resp.data.over.forEach(el => {
            state.overOption.push({
              value: el.over_all_id,
              title: el.name,
              title_ar: el.name_ar,
            })
          })
          resp.data.moni.forEach(el => {
            console.log(el)
            state.info_status = el.nm_phn_nat == null ? null : el.nm_phn_nat === 1
            state.family_status = el.family_rec == null ? null : el.family_rec === 1
            state.pcr_photo_status = el.pcr_test == null ? null : el.pcr_test === 1
            state.pcr_date_status = el.test_date == null ? null : el.test_date === 1
            state.socio_status = el.accm == null ? null : el.accm === 1
            // add
            state.address_status = el.addrss_loct == null ? null : el.addrss_loct === 1
            state.delivery_verify = el.delv == null ? null : el.delv === 1
            //
            state.awrns_status = el.awrnss == null ? null : el.awrnss === 1
            state.note = el.notes

            state.over = state.overOption.filter(
              it => it.value === el.over_all_case,
            )[0]
          })
          commit('CALC_SCORE')
          resolve(resp)
        })
        .catch(error => {
          state.show = false
          console.log(error)
          reject(error)
        })
    })
  },
  SAVE_DATA({ state }, payload) {
    state.show = true
    console.log(payload.prefix, state.case_id, payload.later)
    console.log(state.info_status, state.address_status, state.pcr_date_status)

    console.log(
      state.pcr_photo_status,
      state.family_status,
      payload.socio_status,
    )

    return new Promise(((resolve, reject) => {
      API.apiClient
        .post('/api/project/save_monitoring_view', {
          prefix: payload.prefix,
          type: payload.type,
          case_id: state.case_id,
          later: payload.later,
          info: state.info_status,
          address: state.address_status,
          pcr_date: state.pcr_date_status,
          pcr_photo: state.pcr_photo_status,
          family: state.family_status,
          accm: state.socio_status,
          socio: state.socio_status,
          dlvry: state.delivery_verify,
          awrns: state.awrns_status,
          note: state.note,
          overall: state.over == null ? null : state.over.value,
          percentage: state.percentage,
        })
        .then(resp => {
          console.log('resp')
          console.log(resp)
          state.show = false
          if (resp.data.res[0].result === 1 && payload.later === false) {
            state.monitored = false
          }
          resolve(resp.data.res)
        })
        .catch(error => {
          console.log(error.response)
          state.show = false
          reject(error.response)
        })
    }))
  },

}
