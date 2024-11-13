<template>
  <b-card
    ref="filter"
    no-body
  >
    <b-card-header class="pb-50">
      <h5>
        Filters
      </h5>
    </b-card-header>
    <b-card-body>
      <b-row>
        <!-- Range Date -->
        <b-col
          cols="4"
          class="mb-md-0 mb-2"
        >
          <label>Range</label>
          <flat-pickr
            v-model="rangeDate"
            class="form-control"
            placeholder="ALL"
            :config="{ mode: 'range',
                       dateFormat: 'Y-m-d'}"
          />
        </b-col>
        <!-- Search -->
        <b-col
          cols="2"
        >
          <b-button
            class="mt-2"
            variant="primary"
            block
            @click="Search"
          >
            Search
          </b-button>
        </b-col>
        <!-- clear -->
        <b-col
          cols="2"
          class="mb-md-0 mt-2"
        >
          <b-button
            variant="danger"
            class="btn-icon"
            block
            style=" margin-top: 3px;"
            @click="clearAll"
          >
            <feather-icon
              icon="XIcon"
            />
            Clear All Filter
          </b-button>

        </b-col>
        <!-- Show Columns -->
        <b-col
          cols="2"
          style=" margin-top: 3px;"
        >
          <b-button
            variant="warning"
            class="btn-icon mt-2"
            block
            @click="showColumn =true"
          >
            <feather-icon
              icon="ColumnsIcon"
            />
            Columns
          </b-button>
        </b-col>
        <!--  Show Filter -->
        <b-col
          cols="2"
          style=" margin-top: 3px;"
        >
          <b-button
            class="btn-icon mt-2"
            variant="info"
            block
            @click="showFilter = true"
          >
            <feather-icon
              icon="FilterIcon"
            />
            Filters
          </b-button>
        </b-col>
      </b-row>

    </b-card-body>
  </b-card>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import { takeState } from 'vuex-dot'
import Ripple from 'vue-ripple-directive'
// eslint-disable-next-line no-unused-vars
import moment from 'moment'

export default {
  components: {
    flatPickr,
  },
  directives: {
    Ripple,
  },

  computed: {
    showFilter: takeState('monitoringTools', 'showFilter').commit('monitoringTools/SET_SHOW_FILTER').map(),
    showColumn: takeState('monitoringTools', 'showColumn').commit('monitoringTools/SET_SHOW_COLUMN').map(),

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
    monitoringTools: takeState('monitoringTools', 'monitoring').commit('monitoringTools/SET_MONI').map(),
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
      this.$nextTick(() => {
        const a = moment(Date.now() - 7 * 24 * 3600 * 1000).format('YYYY-MM-DD')
        this.rangeDate = `${a} to ${moment(Date.now()).format('YYYY-MM-DD')}`
      })
      this.awareness = null
      this.monitoringTools = null
      this.feedback = null
      this.dlv_status = null
      //
      this.perPage = 10
      this.sortBy = ''
      this.sortDesc = false
      this.sortDirection = 'asc'
      this.filter = null
      this.filterOn = []
      /* localStorage.removeItem('monitoringTools:referralOptions')
      localStorage.removeItem('monitoringTools:TypeOptions')
      localStorage.removeItem('monitoringTools:CadOptions')
      localStorage.removeItem('monitoringTools:IssOptions')
      localStorage.removeItem('monitoringTools:Referral')
      localStorage.removeItem('monitoringTools:Gov')
      localStorage.removeItem('monitoringTools:Dis')
      localStorage.removeItem('monitoringTools:Type')
      localStorage.removeItem('monitoringTools:Cadaster')
      localStorage.removeItem('monitoringTools:ISS')
      localStorage.removeItem('monitoringTools:RangeDate')
      localStorage.removeItem('monitoringTools:PerPage')
      localStorage.removeItem('monitoringTools:sortBy')
      localStorage.removeItem('monitoringTools:sortDesc')
      localStorage.removeItem('monitoringTools:sortDirection')
      localStorage.removeItem('monitoringTools:filterOn') */
    },
    Search() {
      const rg = this.rangeDate
      if (this.rangeDate != null) {
        this.$store.dispatch('monitoringTools/GET_DATA', {
          prefix: this.$route.params.prefixPrj,
          prefixRole: this.$route.params.prefixRole,
          startDate: rg.split('to')[0],
          type: this.$route.params.assmnttype,
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
