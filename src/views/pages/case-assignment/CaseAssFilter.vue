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
        <!-- Referral -->
        <b-col
          cols="6"
          class="mb-2"
        >
          <label>Referral</label>
          <v-select
            v-model="referral"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="title"
            placeholder="ALL"
            :options="referralOptions"
          />
        </b-col>
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
            :config="{ mode: 'range'}"
          />
        </b-col>
        <!-- clear -->
        <b-col
          cols="2"
          class="mb-md-0 mt-2"
        >
          <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="primary"
            class="btn-icon"
            block
            style=" margin-top: 3px;"
            @click="clear"
          >
            <feather-icon
              icon="XIcon"
            />
            Clear Range
          </b-button>

        </b-col>
      </b-row>
      <b-row>
        <!-- Gov -->
        <b-col
          cols="4"
        >
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
        <b-col cols="4">
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
        <b-col cols="4">
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
        <b-col cols="4">
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
        <b-col
          cols="4"
        >
          <b-form-group
            v-show="type ==null? false: type.value >3"
            label="Settlement"
          >
            <v-select
              v-model="iss"
              placeholder="ALL"
              label="title"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="issOptions"
            />
          </b-form-group>
        </b-col>
        <!-- clear -->
        <b-col
          cols="4"
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
      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import { takeState } from 'vuex-dot'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    vSelect,
    flatPickr,
  },
  directives: {
    Ripple,
  },
  computed: {
    // referralOptions: takeState('global', 'referral').map(),
    referralOptions() {
      return this.$store.getters['global/referral'].filter(el => el.isEnable === 1)
    },
    governorateOption: takeState('global', 'governorate').map(),
    districtOptions: takeState('global', 'district').map(),
    cadOptions: takeState('caseAssignment', 'cadOptions').commit('caseAssignment/SET_CAD_OPT').map(),
    typeOptions: takeState('global', 'type').map(),
    issOptions: takeState('caseAssignment', 'issOptions').map(),
    // Filter Values
    referral: takeState('caseAssignment', 'referral').commit('caseAssignment/SET_REF').map(),
    governorate: takeState('caseAssignment', 'governorate').commit('caseAssignment/SET_GOV').map(),
    district: takeState('caseAssignment', 'district').commit('caseAssignment/SET_DIS').map(),
    cadaster: takeState('caseAssignment', 'cadaster').commit('caseAssignment/SET_CAD').map(),
    type: takeState('caseAssignment', 'type').commit('caseAssignment/SET_TYPE').map(),
    iss: takeState('caseAssignment', 'iss').commit('caseAssignment/SET_ISS').map(),
    rangeDate: takeState('caseAssignment', 'rangedate').commit('caseAssignment/SET_RANG_DAT').map(),
    //
    perPage: takeState('caseAssignment', 'perPage').commit('caseAssignment/SET_PER_PAGE').map(),
    sortBy: takeState('caseAssignment', 'sortBy').commit('caseAssignment/SET_SORT_BY').map(),
    sortDesc: takeState('caseAssignment', 'sortDesc').commit('caseAssignment/SET_SORT_DESC').map(),
    sortDirection: takeState('caseAssignment', 'sortDirection').commit('caseAssignment/SET_SORT_DIR').map(),
    filter: takeState('caseAssignment', 'filter').commit('caseAssignment/SET_FILTER').map(),
    filterOn: takeState('caseAssignment', 'filterOn').commit('caseAssignment/SET_FILTER_ON').map(),
    districtSelect() {
      return this.districtOptions.filter(item => item.params
      === (this.governorate != null ? this.governorate.value : null))
    },
  },
  methods: {
    clear() {
      this.rangeDate = null
    },
    clearAll() {
      this.referral = null
      this.governorate = null
      this.district = null
      this.type = null
      this.cadaster = null
      this.iss = null
      this.rangeDate = null
      //
      this.perPage = 10
      this.sortBy = ''
      this.sortDesc = false
      this.sortDirection = 'asc'
      this.filter = null
      this.filterOn = []
      localStorage.removeItem('caseAssignment:TypeOptions')
      localStorage.removeItem('caseAssignment:CadOptions')
      localStorage.removeItem('caseAssignment:IssOptions')
      localStorage.removeItem('caseAssignment:Referral')
      localStorage.removeItem('caseAssignment:Gov')
      localStorage.removeItem('caseAssignment:Dis')
      localStorage.removeItem('caseAssignment:Type')
      localStorage.removeItem('caseAssignment:Cadaster')
      localStorage.removeItem('caseAssignment:ISS')
      localStorage.removeItem('caseAssignment:RangeDate')
      localStorage.removeItem('caseAssignment:PerPage')
      localStorage.removeItem('caseAssignment:sortBy')
      localStorage.removeItem('caseAssignment:sortDesc')
      localStorage.removeItem('caseAssignment:sortDirection')
      localStorage.removeItem('caseAssignment:filterOn')
    },
    ChangeDistrict(value) {
      if (value != null) {
        if (this.type != null) {
          this.$store.dispatch('caseAssignment/GET_CAD').catch(() => {
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
        }
      } else {
        this.cadOptions = []
      }
    },
    ChangeType(value) {
      if (value != null) {
        if (this.district != null) {
          this.$store.dispatch('caseAssignment/GET_CAD').catch(() => {
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
        }
      } else {
        this.cadOptions = []
      }
    },
    ChangeCAD(value) {
      if (value != null) {
        this.$store.dispatch('caseAssignment/GET_ISS').catch(() => {
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
      }
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
