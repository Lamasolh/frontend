<template>
  <div>
    <b-overlay
      rounded="lg"
      :show="show"
    >
      <b-row>
        <b-col cols="12">
          <b-card>
            <b-row align-h="between">
              <b-col cols="4">
                <p>Case Code: {{ case_code ==null ? "": case_code }}</p>
                <p>Created Date: {{ created_date ==null ? "": created_date }}</p>
                <p>Governorate: {{ governorate }}</p>
                <p>Type: {{ type }}</p>
                <p v-if="iss!=null">
                  Settlement Name: {{ iss }}
                </p>
              </b-col>
              <b-col cols="4">
                <p :style="progress_scoring== null ? 'color : black' :progress_scoring >= 20 ?'color : green' : 'color : red'">
                  Case Score: {{ progress_scoring ==null ? "0": progress_scoring }}
                </p>
                <p>
                  Case Decision: {{ final_decision ==null ? "": decision.filter(it=> it.value ===final_decision)[0].title }}
                </p>
                <p>District: {{ district }}</p>
                <p>Cadaster: {{ cadaster }}</p>
              </b-col>
              <b-col cols="4">
                <b-img
                  v-b-tooltip.hover
                  title="Location"
                  :src="loc_src"
                  class="w-25"
                />
                <b-img
                  v-b-tooltip.hover
                  title="PCR TEST"
                  :src="pcr_src"
                  class="w-25"
                />
                <b-img
                  v-b-tooltip.hover
                  title="PCR DATE"
                  :src="date_src"
                  class="w-25"
                />
                <br>
                <br>
                <br>
                <br>
                <b-row>
                  <b-col>
                    <p class="text-danger">
                      N.B: {{ com_status }}
                    </p>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>

    </b-overlay>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { takeState } from 'vuex-dot'
// import moment from 'moment'

export default {
  props: {
    governorate: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    cadaster: {
      type: String,
      required: true,
    },
    iss: {
      type: String,
      default: null,
      required: false,
    },
    type: {
      type: String,
      required: true,
    },
  },
  computed: {
    show: takeState('followUpWizClr', 'show').map(),
    decision: takeState('global', 'decision').map(),
    priority_period: takeState('followUpWizClr', 'priority_period').map(),
    priority_interval: takeState('followUpWizClr', 'priority_interval').map(),
    ...takeState('followUpWizClr', 'items')
      .expose([
        'case_code',
        'case_id',
        'full_name',
        'district_id',
        'cadastre_id',
        'case_phone',
        'created_date',
        'progress_scoring',
        'final_decision',
        'priority_level',
        'address_latitude',
        'address_longitude',
      ])
      .commit('followUpWizClr/SET_ITEM')
      .map(),
    ...takeState('followUpWizClr', 'itemsrec')
      .expose([
        'pcr_date',
        'pcr_photo_aprv',
        'com_status',
        'pcr_photo',
        'pcr_result'])
      .commit('followUpWizClr/SET_ITEM_REC')
      .map(),
    loc_src() {
      if ((this.address_latitude === 0 && this.address_longitude === 0)
      || (this.address_latitude === null && this.address_longitude === null)
      || this.address_latitude < 33 || this.address_longitude < 33 || this.address_latitude > 37 || this.address_longitude > 37
      ) {
        return require('@/assets/images/resources/location_no.png')
      }
      return require('@/assets/images/resources/location_1.png')
    },
    pcr_src() {
      console.log('pcr_result', this.pcr_result)
      if (this.pcr_result == null || this.pcr_result === 0) {
        return require('@/assets/images/resources/PCR_test_na.png')
      }
      return require('@/assets/images/resources/PCRTestav.png')
    },
    date_src() {
      if (this.pcr_date !== null && this.pcr_date !== '') {
        /* const dff = moment(moment()).diff(this.pcr_date, 'days')
        if (dff >= this.priority_period) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.priority_level = 5
          return require('@/assets/images/resources/outdate.png')
        } if (dff > (4 * this.priority_interval - 3)) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.priority_level = 1
          return require('@/assets/images/resources/Urgent.png')
        } if (dff > ((2 * this.priority_interval) - 1)) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.priority_level = 2
          return require('@/assets/images/resources/medium.png')
        } if (dff > this.priority_interval) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.priority_level = 3
          return require('@/assets/images/resources/low.png')
        }
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.priority_level = 4 */
        return require('@/assets/images/resources/date_nor_test.png')
      } if (this.pcr_date === '') {
        return require('@/assets/images/resources/outdate.png')
      }
      return require('@/assets/images/resources/outdate.png')
    },
    finaldec() {
      if (this.progress_scoring >= 20) {
        return 'Approved'
      }
      return 'Rejected'
    },
  },
}

</script>

<style>
.status[data-status = "Approved"]:after {

 color : green
}
.status[data-status = "Rejected"]:after {

 color : red
}

  </style>
