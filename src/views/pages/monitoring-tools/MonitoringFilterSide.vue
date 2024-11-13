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
        <!-- Organization-->
        <b-col cols="6">
          <b-form-group label="Organization">
            <v-select
              v-model="organization"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="title"
              placeholder="ALL"
              :options="organization_data"
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
    showFilter: takeState('monitoringTools', 'showFilter').commit('monitoringTools/SET_SHOW_FILTER').map(),

    referralOptions: takeState('global', 'referral').map(),
    governorateOption: takeState('global', 'governorate').map(),
    districtOptions: takeState('global', 'district').map(),
    cadOptions: takeState('monitoringTools', 'cadOptions').commit('monitoringTools/SET_CAD_OPT').map(),
    typeOptions: takeState('global', 'type').map(),
    issOptions: takeState('monitoringTools', 'issOptions').map(),
    awarenessOptions: takeState('monitoringTools', 'awarenessOptions').map(),
    monitoringdOptions: takeState('monitoringTools', 'monitoringdOptions').map(),
    FeedBackOptions: takeState('monitoringTools', 'FeedBackOptions').map(),
    deliveryOptions: takeState('global', 'delivery_status').map(),
    CaseStatusOptions: takeState('monitoringTools', 'CaseStatusOptions').map(),
    organization_data: takeState('global', 'organization_data').map(),

    // Filter Values
    organization: takeState('monitoringTools', 'organization').commit('monitoringTools/SET_ORG').map(),
    referral: takeState('monitoringTools', 'referral').commit('monitoringTools/SET_REF').map(),
    governorate: takeState('monitoringTools', 'governorate').commit('monitoringTools/SET_GOV').map(),
    district: takeState('monitoringTools', 'district').commit('monitoringTools/SET_DIS').map(),
    cadaster: takeState('monitoringTools', 'cadaster').commit('monitoringTools/SET_CAD').map(),
    dlv_status: takeState('monitoringTools', 'dlv_status').commit('monitoringTools/SET_DLV_STATUS').map(),
    case_status: takeState('monitoringTools', 'case_status').commit('monitoringTools/SET_CASE_STATUS').map(),
    type: takeState('monitoringTools', 'type').commit('monitoringTools/SET_TYPE').map(),
    iss: takeState('monitoringTools', 'iss').commit('monitoringTools/SET_ISS').map(),
    rangeDate: takeState('monitoringTools', 'rangedate').commit('monitoringTools/SET_RANG_DAT').map(),
    awareness: takeState('monitoringTools', 'awareness').commit('monitoringTools/SET_AWRN').map(),
    monitoring: takeState('monitoringTools', 'monitoring').commit('monmonitoringToolsitoring/SET_MONI').map(),
    current_status: takeState('monitoringTools', 'current_status').commit('monitoringTools/SET_CUR_STATUS').map(),

    feedback: takeState('monitoringTools', 'feedback').commit('monitoringTools/SET_FEED').map(),
    //
    perPage: takeState('monitoringTools', 'perPage').commit('monitoringTools/SET_PER_PAGE').map(),
    sortBy: takeState('monitoringTools', 'sortBy').commit('monitoringTools/SET_SORT_BY').map(),
    sortDesc: takeState('monitoringTools', 'sortDesc').commit('monitoringTools/SET_SORT_DESC').map(),
    sortDirection: takeState('monitoringTools', 'sortDirection').commit('monitoringTools/SET_SORT_DIR').map(),
    filter: takeState('monitoringTools', 'filter').commit('monitoringTools/SET_FILTER').map(),
    filterOn: takeState('monitoringTools', 'filterOn').commit('monitoringTools/SET_FILTER_ON').map(),
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
    },
    Search() {
      const rg = this.rangeDate
      if (this.rangeDate != null) {
        this.$store.dispatch('monitoringTools/GET_DATA', {
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
          this.$store.dispatch('monitoringTools/GET_CAD')
        }
      } else {
        this.cadOptions = []
      }
    },
    ChangeType(value) {
      if (value != null) {
        if (this.district != null) {
          this.$store.dispatch('monitoringTools/GET_CAD')
        }
      } else {
        this.cadOptions = []
      }
    },
    ChangeCAD(value) {
      if (value != null) {
        this.$store.dispatch('monitoringTools/GET_ISS')
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
