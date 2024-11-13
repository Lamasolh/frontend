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
        <!--  Status -->
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
    showFilter: takeState('monitoringwtr', 'showFilter').commit('monitoringwtr/SET_SHOW_FILTER').map(),

    governorateOption: takeState('global', 'governorate').map(),
    districtOptions: takeState('global', 'district').map(),
    cadOptions: takeState('monitoringwtr', 'cadOptions').commit('monitoringwtr/SET_CAD_OPT').map(),
    issOptions: takeState('monitoringwtr', 'issOptions').map(),
    CaseStatusOptions: takeState('monitoringwtr', 'CaseStatusOptions').map(),

    // Filter Values
    governorate: takeState('monitoringwtr', 'governorate').commit('monitoringwtr/SET_GOV').map(),
    district: takeState('monitoringwtr', 'district').commit('monitoringwtr/SET_DIS').map(),
    cadaster: takeState('monitoringwtr', 'cadaster').commit('monitoringwtr/SET_CAD').map(),
    dlv_status: takeState('monitoringwtr', 'dlv_status').commit('monitoringwtr/SET_DLV_STATUS').map(),
    case_status: takeState('monitoringwtr', 'case_status').commit('monitoringwtr/SET_CASE_STATUS').map(),
    iss: takeState('monitoringwtr', 'iss').commit('monitoringwtr/SET_ISS').map(),
    rangeDate: takeState('monitoringwtr', 'rangedate').commit('monitoringwtr/SET_RANG_DAT').map(),
    current_status: takeState('monitoringwtr', 'current_status').commit('monitoringwtr/SET_CUR_STATUS').map(),

    //
    perPage: takeState('monitoringwtr', 'perPage').commit('monitoringwtr/SET_PER_PAGE').map(),
    sortBy: takeState('monitoringwtr', 'sortBy').commit('monitoringwtr/SET_SORT_BY').map(),
    sortDesc: takeState('monitoringwtr', 'sortDesc').commit('monitoringwtr/SET_SORT_DESC').map(),
    sortDirection: takeState('monitoringwtr', 'sortDirection').commit('monitoringwtr/SET_SORT_DIR').map(),
    filter: takeState('monitoringwtr', 'filter').commit('monitoringwtr/SET_FILTER').map(),
    filterOn: takeState('monitoringwtr', 'filterOn').commit('monitoringwtr/SET_FILTER_ON').map(),
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
        this.$store.dispatch('monitoringwtr/GET_DATA', {
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
        this.$store.dispatch('monitoringwtr/GET_CAD')
      } else {
        this.cadOptions = []
      }
    },
    ChangeType(value) {
      if (value != null) {
        if (this.district != null) {
          this.$store.dispatch('monitoringwtr/GET_CAD')
        }
      } else {
        this.cadOptions = []
      }
    },
    ChangeCAD(value) {
      if (value != null) {
        this.$store.dispatch('monitoringwtr/GET_ISS')
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
