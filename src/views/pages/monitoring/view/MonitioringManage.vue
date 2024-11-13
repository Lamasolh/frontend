<template>
  <div>
    <b-row>
      <b-col cols="12">
        <b-overlay
          rounded="lg"
          :show="show"
        >
          <b-card>
            <b-row>
              <b-col cols="3">
                <p>
                  <b>Case Code:</b> <b class="text-danger">{{ case_code }}</b>
                </p>
                <p>
                  <b>Full Name:</b>  <b>{{ fullname }}</b>
                </p>
                <p>
                  <b>Phone:</b>  <b>+{{ phone }}</b>
                </p>
                <p>
                  <b>Case Info:</b> <b class="text-primary">{{ info }}</b>
                </p>
                <h4 :class="percentage > 50 ?'text-success' : 'text-danger'">
                  Verified: {{ percentage }}%
                </h4>
              </b-col>
              <b-col>
                <b-img
                  v-b-tooltip.hover
                  :src="info_img"
                  title="Info Status"
                  class="w-100"
                />
              </b-col>
              <b-col>
                <b-img
                  v-b-tooltip.hover
                  :src="family_img"
                  title="Family Status"
                  class="w-100"
                />
              </b-col>
              <b-col>
                <b-img
                  v-b-tooltip.hover
                  :src="pcr_photo_img"
                  title="PCR Photo Status"
                  class="w-100"
                />
              </b-col>
              <b-col>
                <b-img
                  v-b-tooltip.hover
                  :src="pcr_date_img"
                  title="PCR Date Status"
                  class="w-100"
                />
              </b-col>
              <b-col>
                <b-img
                  v-b-tooltip.hover
                  :src="acco_img"
                  title=" Accommodation / Socioeconomic Status"
                  class="w-100"
                />
              </b-col>
              <b-col>
                <b-img
                  v-b-tooltip.hover
                  :src="address_img"
                  title="Address Status"
                  class="w-100"
                />
              </b-col>
              <b-col>
                <b-img
                  v-b-tooltip.hover
                  :src="delivery_img"
                  title="Delivery Status"
                  class="w-100"
                />
              </b-col>
              <b-col>
                <b-img
                  v-b-tooltip.hover
                  :src="awrns_img"
                  title="Awareness Status"
                  class="w-100"
                />
              </b-col>
            </b-row>

          </b-card>
          <div>
            <form-wizard
              ref="wizard"
              tab="active"
              color="#7367F0"
              :title="null"
              :subtitle="null"
              shape="squara"
              back-button-text="Previous"
              class="mb-3"
              @on-complete="Finish"
            >
              <!-- basic information tab -->
              <tab-content
                title="Basic Information"
                active
              >

                <MonitoringInfo />
              </tab-content>
              <!-- More  information tab-->
              <tab-content
                title="Addressing Information"
                active
              >

                <MonitoringMore />
              </tab-content>
              <!-- More  information tab-->
              <tab-content
                title="Awerness\Feedback Information"
                active
              >

                <MonitoringFeed />
              </tab-content>
              <!-- More  information tab-->
              <tab-content
                title="Sumary"
                active
              >

                <MonitoringSumary />
              </tab-content>
            </form-wizard>
          </div>
          <b-card>
            <b class="text-danger">Note:</b>
            <b-textarea
              v-model="note"
              rows="3"
              :readonly="true"
              max-rows="6"
            />
          </b-card>
        </b-overlay>
      </b-col>
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import Ripple from 'vue-ripple-directive'
import { takeState } from 'vuex-dot'
// eslint-disable-next-line import/order
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
// eslint-disable-next-line import/order
import { FormWizard, TabContent } from 'vue-form-wizard'
import MonitoringInfo from './MonitoringInfo.vue'
import MonitoringMore from './MonitoringMore.vue'
import MonitoringFeed from './MonitoringFeed.vue'
import MonitoringSumary from './MonitoringOthers.vue'

export default {
  components: {
    MonitoringInfo,
    MonitoringMore,
    MonitoringFeed,
    MonitoringSumary,
    FormWizard,
    TabContent,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  directives: {
    Ripple,
  },

  computed: {
    show: takeState('monitoringView', 'show').map(),
    percentage: takeState('monitoringView', 'percentage').map(),
    note: takeState('monitoringView', 'note').map(),
    case_code: takeState('monitoringView', 'case_code').map(),
    fullname: takeState('monitoringView', 'fullname').map(),
    phone: takeState('monitoringView', 'phone').map(),
    referral: takeState('monitoringView', 'referral').map(),
    over: takeState('monitoringView', 'over').map(),
    monitored: takeState('monitoringView', 'monitored').map(),
    info_status: takeState('monitoringView', 'info_status').map(),
    family_status: takeState('monitoringView', 'family_status').map(),
    pcr_date_status: takeState('monitoringView', 'pcr_date_status').map(),
    pcr_photo_status: takeState('monitoringView', 'pcr_photo_status').map(),
    socio_status: takeState('monitoringView', 'socio_status').map(),
    ditrib_kits: takeState('monitoringView', 'ditrib_kits').commit('monitoringView/SET_DIS_KIT').map(),

    address_status: takeState('monitoringView', 'address_status').map(),
    delivery_verify: takeState('monitoringView', 'delivery_verify').map(),
    awrns_status: takeState('monitoringView', 'awrns_status').map(),

    info() {
      console.log('info', this.$route.params.value.case_status)
      return this.$route.params.value.case_status
    },
    info_img() {
      if (this.info_status === true) {
        return require('@/assets/images/monitoring/Basic info true-01.png')
      } if (this.info_status === false) {
        return require('@/assets/images/monitoring/Basic info false-01.png')
      }
      return require('@/assets/images/monitoring/Basic info date-01.png')
    },
    family_img() {
      if (this.family_status === true) {
        return require('@/assets/images/monitoring/Family Info true-01.png')
      } if (this.info_status === false) {
        return require('@/assets/images/monitoring/Family Info false-01.png')
      }
      return require('@/assets/images/monitoring/Family Info date-01.png')
    },
    pcr_photo_img() {
      if (this.pcr_photo_status === true) {
        return require('@/assets/images/monitoring/PCR Photo true-01.png')
      } if (this.pcr_photo_status === false) {
        return require('@/assets/images/monitoring/PCR Photo false-01.png')
      }
      return require('@/assets/images/monitoring/PCR Photo date-01.png')
    },
    pcr_date_img() {
      if (this.pcr_date_status === true) {
        return require('@/assets/images/monitoring/PCR Date true-01.png')
      } if (this.pcr_date_status === false) {
        return require('@/assets/images/monitoring/PCR Date false-01.png')
      }
      return require('@/assets/images/monitoring/PCR Date date-01.png')
    },
    acco_img() {
      if (this.socio_status === true) {
        return require('@/assets/images/monitoring/Accodomation-Socio Information ture-01.png')
      } if (this.socio_status === false) {
        return require('@/assets/images/monitoring/Accodomation-Socio Information false-01.png')
      }
      return require('@/assets/images/monitoring/Accodomation-Socio Information date-01.png')
    },
    address_img() {
      if (this.address_status === true) {
        return require('@/assets/images/monitoring/Addressing Information true-01.png')
      } if (this.address_status === false) {
        return require('@/assets/images/monitoring/Addressing Information false-01.png')
      }
      return require('@/assets/images/monitoring/Addressing Information date-01.png')
    },
    delivery_img() {
      if (this.delivery_verify === true) {
        return require('@/assets/images/monitoring/Delivery Information true-01.png')
      } if (this.delivery_verify === false) {
        return require('@/assets/images/monitoring/Delivery Information false-01.png')
      }
      return require('@/assets/images/monitoring/Delivery Information date-01.png')
    },
    awrns_img() {
      if (this.awrns_status === true) {
        return require('@/assets/images/monitoring/Awareness Information true-01.png')
      } if (this.awrns_status === false) {
        return require('@/assets/images/monitoring/Awareness Information false.png')
      }
      return require('@/assets/images/monitoring/Awareness Information date-01.png')
    },
  },
  mounted() {
    this.$refs.wizard.changeTab(0, 1)
    this.$refs.wizard.changeTab(1, 2)
    this.$refs.wizard.changeTab(2, 3)
    this.$refs.wizard.changeTab(0, 0)
    const dd = this.$route.params.value.ditrib_kits
    console.log('this.$route.params.value')
    console.log(this.$route.params.value)
    console.log(this.$route.params.value.ditrib_kits)
    console.log(dd == null || dd === '')
    this.ditrib_kits = dd == null || dd === '' ? 'None' : dd
    console.log(this.ditrib_kits)
    this.Refresh()
  },
  methods: {
    Refresh() {
      this.$store.dispatch('monitoringView/GET_DATA_VIEW', {
        case_id: this.$route.params.value.case_id,
        info: this.$route.params.value.case_status,
      })
    },
    Finish() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Attention',
          icon: 'EditIcon',
          text: 'This Page is for view Only',
          variant: 'warning',
        },
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-wizard.scss';
@import '@core/scss/vue/libs/vue-select.scss';
.sticky-top { top: 0.8em; }
</style>
