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
          <b-row>

            <!-- Search -->
            <b-col
              cols="6"
            >
              <b-button
                class="mt-2"
                variant="success"
                block
                @click="Search"
              >
                <feather-icon
                  icon="SearchIcon"
                />
                Search
              </b-button>
            </b-col>
            <!-- clear -->
            <b-col
              cols="6"
              class="mt-2"
            >
              <b-button
                variant="warning"
                class="btn-icon"
                block
                style="margin-top: 2px;"

                @click="clearAll"
              >
                <feather-icon
                  icon="XIcon"
                />
                Clear All Filter
              </b-button>

            </b-col>
          </b-row>
        </b-col>
        <b-col cols="1" />
        <!--  Show M&E -->
        <b-col
          cols="3"
          style=" margin-top: 64px;"
        />
        <b-col cols="1" />
        <!--  Show Filter -->
        <b-col
          cols="3"
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
            <span class="mr-2" />
            <feather-icon
              icon="ArrowRightIcon"
              size="16"
            />
          </b-button>
          <!-- Show Columns -->

          <b-button
            variant="primary"
            class="btn-icon mt-2"
            block
            @click="showColumn =true"
          >
            <feather-icon
              icon="ColumnsIcon"
            />
            Columns
            <span class="mr-2" />
            <feather-icon
              icon="ArrowRightIcon"
              size="16"
            />
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
    showFilter: takeState('monitoringwtr', 'showFilter').commit('monitoringwtr/SET_SHOW_FILTER').map(),
    showColumn: takeState('monitoringwtr', 'showColumn').commit('monitoringwtr/SET_SHOW_COLUMN').map(),

    // Filter Values
    referral: takeState('monitoringwtr', 'referral').commit('monitoringwtr/SET_REF').map(),
    governorate: takeState('monitoringwtr', 'governorate').commit('monitoringwtr/SET_GOV').map(),
    district: takeState('monitoringwtr', 'district').commit('monitoringwtr/SET_DIS').map(),
    cadaster: takeState('monitoringwtr', 'cadaster').commit('monitoringwtr/SET_CAD').map(),
    dlv_status: takeState('monitoringwtr', 'dlv_status').commit('monitoringwtr/SET_DLV_STATUS').map(),
    case_status: takeState('monitoringwtr', 'case_status').commit('monitoringwtr/SET_CASE_STATUS').map(),
    type: takeState('monitoringwtr', 'type').commit('monitoringwtr/SET_TYPE').map(),
    iss: takeState('monitoringwtr', 'iss').commit('monitoringwtr/SET_ISS').map(),
    rangeDate: takeState('monitoringwtr', 'rangedate').commit('monitoringwtr/SET_RANG_DAT').map(),
    awareness: takeState('monitoringwtr', 'awareness').commit('monitoringwtr/SET_AWRN').map(),
    monitoring: takeState('monitoringwtr', 'monitoring').commit('monitoringwtr/SET_MONI').map(),
    current_status: takeState('monitoringwtr', 'current_status').commit('monitoringwtr/SET_CUR_STATUS').map(),

    feedback: takeState('monitoringwtr', 'feedback').commit('monitoringwtr/SET_FEED').map(),
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
      this.$nextTick(() => {
        const a = moment(Date.now() - 7 * 24 * 3600 * 1000).format('YYYY-MM-DD')
        this.rangeDate = `${a} to ${moment(Date.now()).format('YYYY-MM-DD')}`
      })
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
        if (this.type != null) {
          this.$store.dispatch('monitoringwtr/GET_CAD')
        }
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
    gotToView(item) {
      const nav = []
      nav.push(
        {
          active: false,
          text: this.$route.params.breadcrumb[0].text,
        },
        {
          active: false,
          text: this.$route.params.title,
        },
        {
          active: true,
          text: 'M & E Tools',
        },
      )
      this.$router.replace({
        name: 'projectTools',
        params: {
          action: 'read',
          breadcrumb: nav,
          active: true,
          prefix: this.$route.params.prefixPrj,
          prefixRole: this.$route.params.prefixRole,
          tools: true,
          title: 'M & E Tools',
          resource: 'MNTR',
          value: item,
        },
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
