<template>
  <b-sidebar
    id="sidebar"
    ref="assign"
    :visible="showFilter"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @change="(val) => (showFilter = val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div
        class="
            d-flex
            justify-content-between
            align-items-center
            content-sidebar-header
            px-2
            py-1
          "
      >
        <h5 class="mb-0">
          <feather-icon
            icon="FilterIcon"
            size="1.5x"
          />
          Filters
        </h5>

        <feather-icon
          class="ml-1 cursor-pointer"
          icon="XIcon"
          size="16"
          @click="hide"
        />
      </div>

      <b-row class="m-1">
        <!-- Referral -->
        <b-col cols="6">
          <label>Referral</label>
          <v-select
            v-model="referral"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="title"
            placeholder="ALL"
            :options="referralOptions"
          />
        </b-col>
        <!-- Gov -->
        <b-col cols="6">
          <b-form-group label="Governorate">
            <v-select
              v-model="governorate"
              label="title"
              placeholder="ALL"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="governorateOption"
            />
          </b-form-group>
        </b-col>
        <!-- District -->
        <b-col cols="6">
          <b-form-group label="District">
            <v-select
              v-model="district"
              placeholder="ALL"
              label="title"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="districtSelect"
              @input="(value) => ChangeDistrict(value)"
            />
          </b-form-group>
        </b-col>
        <!-- Type -->
        <b-col cols="6">
          <b-form-group label="Residential Type">
            <v-select
              v-model="type"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="title"
              placeholder="ALL"
              :options="typeOptions"
              @input="value=>ChangeType(value)"
            />
          </b-form-group>
        </b-col>
        <!-- Cadaster -->
        <b-col cols="6">
          <b-form-group label="Cadaster">
            <v-select
              v-model="cadaster"
              placeholder="ALL"
              label="title"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="cadOptions"
              @input="value=>ChangeCAD(value)"
            />
          </b-form-group>
        </b-col>
        <!-- Settlement -->
        <b-col cols="6">
          <b-form-group label="Settlement">
            <v-select
              v-model="iss"
              placeholder="ALL"
              label="title"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="issOptions"
            />
          </b-form-group>
        </b-col>
        <!-- Delivery Status -->
        <b-col
          cols="6"
        >
          <b-form-group label="Case Status">
            <v-select
              v-model="case_status"
              label="title"
              placeholder="ALL"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="CaseStatusOptions"
            />
          </b-form-group>
        </b-col>
        <!-- Awearness -->
        <b-col cols="6">
          <b-form-group label="Awearned">
            <v-select
              v-model="awareness"
              placeholder="ALL"
              label="title"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="awarenessOptions"
            />
          </b-form-group>
        </b-col>
        <!-- FeedBack-->
        <b-col cols="6">
          <b-form-group label="FeedBack">
            <v-select
              v-model="feedback"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="title"
              placeholder="ALL"
              :options="FeedBackOptions"
            />
          </b-form-group>
        </b-col>
        <!-- Monitored -->
        <b-col cols="6">
          <b-form-group label="Monitored">
            <v-select
              v-model="monitoring"
              placeholder="ALL"
              label="title"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="monitoringdOptions"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </template>
  </b-sidebar>
</template>

<script>
import vSelect from 'vue-select'
import { takeState } from 'vuex-dot'
import Ripple from 'vue-ripple-directive'
// eslint-disable-next-line no-unused-vars
import moment from 'moment'

export default {
  components: {
    vSelect,
  },
  directives: {
    Ripple,
  },

  computed: {
    showFilter: takeState('monitoring', 'showFilter').commit('monitoring/SET_SHOW_FILTER').map(),

    referralOptions: takeState('global', 'referral').map(),
    governorateOption: takeState('global', 'governorate').map(),
    districtOptions: takeState('global', 'district').map(),
    cadOptions: takeState('monitoring', 'cadOptions').commit('monitoring/SET_CAD_OPT').map(),
    typeOptions: takeState('global', 'type').map(),
    issOptions: takeState('monitoring', 'issOptions').map(),
    awarenessOptions: takeState('monitoring', 'awarenessOptions').map(),
    monitoringdOptions: takeState('monitoring', 'monitoringdOptions').map(),
    FeedBackOptions: takeState('monitoring', 'FeedBackOptions').map(),
    deliveryOptions: takeState('global', 'delivery_status').map(),
    CaseStatusOptions: takeState('monitoring', 'CaseStatusOptions').map(),

    // Filter Values
    referral: takeState('monitoring', 'referral').commit('monitoring/SET_REF').map(),
    governorate: takeState('monitoring', 'governorate').commit('monitoring/SET_GOV').map(),
    district: takeState('monitoring', 'district').commit('monitoring/SET_DIS').map(),
    cadaster: takeState('monitoring', 'cadaster').commit('monitoring/SET_CAD').map(),
    dlv_status: takeState('monitoring', 'dlv_status').commit('monitoring/SET_DLV_STATUS').map(),
    case_status: takeState('monitoring', 'case_status').commit('monitoring/SET_CASE_STATUS').map(),
    type: takeState('monitoring', 'type').commit('monitoring/SET_TYPE').map(),
    iss: takeState('monitoring', 'iss').commit('monitoring/SET_ISS').map(),
    rangeDate: takeState('monitoring', 'rangedate').commit('monitoring/SET_RANG_DAT').map(),
    awareness: takeState('monitoring', 'awareness').commit('monitoring/SET_AWRN').map(),
    monitoring: takeState('monitoring', 'monitoring').commit('monitoring/SET_MONI').map(),
    current_status: takeState('monitoring', 'current_status').commit('monitoring/SET_CUR_STATUS').map(),

    feedback: takeState('monitoring', 'feedback').commit('monitoring/SET_FEED').map(),
    //
    perPage: takeState('monitoring', 'perPage').commit('monitoring/SET_PER_PAGE').map(),
    sortBy: takeState('monitoring', 'sortBy').commit('monitoring/SET_SORT_BY').map(),
    sortDesc: takeState('monitoring', 'sortDesc').commit('monitoring/SET_SORT_DESC').map(),
    sortDirection: takeState('monitoring', 'sortDirection').commit('monitoring/SET_SORT_DIR').map(),
    filter: takeState('monitoring', 'filter').commit('monitoring/SET_FILTER').map(),
    filterOn: takeState('monitoring', 'filterOn').commit('monitoring/SET_FILTER_ON').map(),
    districtSelect() {
      return this.districtOptions.filter(item => item.params
      === (this.governorate != null ? this.governorate.value : null))
    },
  },
  mounted() {
    this.$nextTick(() => {
      const a = moment(Date.now() - 7 * 24 * 3600 * 1000).format('YYYY-MM-DD')
      this.rangeDate = `${a} to ${moment(Date.now()).format('YYYY-MM-DD')}`
    })
  },
  methods: {
    clearAll() {
      this.referral = null
      this.governorate = null
      this.district = null
      this.type = null
      this.cadaster = null
      this.iss = null
      this.rangeDate = null
      this.awareness = null
      this.monitoring = null
      this.feedback = null
      this.dlv_status = null
      //
      this.perPage = 10
      this.sortBy = ''
      this.sortDesc = false
      this.sortDirection = 'asc'
      this.filter = null
      this.filterOn = []
      /* localStorage.removeItem('monitoring:referralOptions')
      localStorage.removeItem('monitoring:TypeOptions')
      localStorage.removeItem('monitoring:CadOptions')
      localStorage.removeItem('monitoring:IssOptions')
      localStorage.removeItem('monitoring:Referral')
      localStorage.removeItem('monitoring:Gov')
      localStorage.removeItem('monitoring:Dis')
      localStorage.removeItem('monitoring:Type')
      localStorage.removeItem('monitoring:Cadaster')
      localStorage.removeItem('monitoring:ISS')
      localStorage.removeItem('monitoring:RangeDate')
      localStorage.removeItem('monitoring:PerPage')
      localStorage.removeItem('monitoring:sortBy')
      localStorage.removeItem('monitoring:sortDesc')
      localStorage.removeItem('monitoring:sortDirection')
      localStorage.removeItem('monitoring:filterOn') */
    },
    Search() {
      const rg = this.rangeDate
      if (this.rangeDate != null) {
        this.$store.dispatch('monitoring/GET_DATA', {
          prefix: this.$route.params.prefixPrj,
          prefixRole: this.$route.params.prefixRole,
          startDate: rg.split('to')[0],
          endDate: rg.split('to')[1] == null ? rg.split('to')[0] : rg.split('to')[1],
        }).catch(() => {
          this.$swal({
            title: 'Error!',
            text: 'Please Check internet and try again',
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        })
      } else {
        this.$swal({
          title: 'Attention!',
          text: 'Please select range date!',
          icon: 'warning',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
      }
    },
    clear() {
      this.rangeDate = null
    },
    ChangeDistrict(value) {
      if (value != null) {
        if (this.type != null) {
          this.$store.dispatch('monitoring/GET_CAD')
        }
      } else {
        this.cadOptions = []
      }
    },
    ChangeType(value) {
      if (value != null) {
        if (this.district != null) {
          this.$store.dispatch('monitoring/GET_CAD')
        }
      } else {
        this.cadOptions = []
      }
    },
    ChangeCAD(value) {
      if (value != null) {
        this.$store.dispatch('monitoring/GET_ISS')
      }
    },
    ChangeRange() {
      console.log('this.rangeDate')
      console.log(this.rangeDate)
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
