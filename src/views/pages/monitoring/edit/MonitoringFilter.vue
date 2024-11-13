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
        <!-- Percentage -->
        <b-col
          cols="2"
        >
          <label>Percentage %</label>
          <b-form-spinbutton
            v-model.number="percentage"
            type="number"
            min="1"
            max="100"
            placeholder="Enter Percentage"
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
            :disabled="items.length === 0"
            @click="clearAll"
          >
            <feather-icon
              icon="XIcon"
            />
            Clear All Filter
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
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    flatPickr,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  directives: {
    Ripple,
  },

  computed: {
    showFilter: takeState('monitoring', 'showFilter').commit('monitoring/SET_SHOW_FILTER').map(),
    showColumn: takeState('monitoring', 'showColumn').commit('monitoring/SET_SHOW_COLUMN').map(),
    percentage: takeState('monitoring', 'percentage').commit('monitoring/SET_PERC').map(),

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
    items: takeState('monitoring', 'caseItemME').commit('monitoring/SET_ITEM_ME').map(),

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
      this.ClearME()
    },
    ClearME() {
      this.$swal({
        title: 'Clear M&E List',
        text: 'Are you sure you want to clear list',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Yes!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.$store.dispatch('monitoring/MECLEAR', {
            prefix: this.$route.params.prefixPrj,
            prefixRole: this.$route.params.prefixRole,
            type: this.$route.params.assmnttype,
          }).then(() => {
            this.$swal({
              icon: 'success',
              title: 'Done!',
              text: 'The cases hase been cleared!',
              customClass: {
                confirmButton: 'btn btn-success',
              },
            })
          }).catch(error => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Operation Failed',
                icon: 'EditIcon',
                text: error.toString,
                variant: 'danger',
              },
            })
          })
        }
      })
    },
    Search() {
      const rg = this.rangeDate
      if (this.rangeDate != null) {
        this.$store.dispatch('monitoring/GET_DATA_ME', {
          prefix: this.$route.params.prefixPrj,
          prefixRole: this.$route.params.prefixRole,
          type: this.$route.params.assmnttype,
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
