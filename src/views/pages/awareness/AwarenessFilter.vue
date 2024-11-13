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
    referralOptions: takeState('global', 'referral').map(),
    governorateOption: takeState('global', 'governorate').map(),
    districtOptions: takeState('global', 'district').map(),
    cadOptions: takeState('awareness', 'cadOptions').commit('awareness/SET_CAD_OPT').map(),
    typeOptions: takeState('global', 'type').map(),
    issOptions: takeState('awareness', 'issOptions').map(),
    // Filter Values
    referral: takeState('awareness', 'referral').commit('awareness/SET_REF').map(),
    governorate: takeState('awareness', 'governorate').commit('awareness/SET_GOV').map(),
    district: takeState('awareness', 'district').commit('awareness/SET_DIS').map(),
    cadaster: takeState('awareness', 'cadaster').commit('awareness/SET_CAD').map(),
    type: takeState('awareness', 'type').commit('awareness/SET_TYPE').map(),
    iss: takeState('awareness', 'iss').commit('awareness/SET_ISS').map(),
    rangeDate: takeState('awareness', 'rangedate').commit('awareness/SET_RANG_DAT').map(),
    //
    perPage: takeState('awareness', 'perPage').commit('awareness/SET_PER_PAGE').map(),
    sortBy: takeState('awareness', 'sortBy').commit('awareness/SET_SORT_BY').map(),
    sortDesc: takeState('awareness', 'sortDesc').commit('awareness/SET_SORT_DESC').map(),
    sortDirection: takeState('awareness', 'sortDirection').commit('awareness/SET_SORT_DIR').map(),
    filter: takeState('awareness', 'filter').commit('awareness/SET_FILTER').map(),
    filterOn: takeState('awareness', 'filterOn').commit('awareness/SET_FILTER_ON').map(),
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
      localStorage.removeItem('Awareness:TypeOptions')
      localStorage.removeItem('Awareness:CadOptions')
      localStorage.removeItem('Awareness:IssOptions')
      localStorage.removeItem('Awareness:Referral')
      localStorage.removeItem('Awareness:Gov')
      localStorage.removeItem('Awareness:Dis')
      localStorage.removeItem('Awareness:Type')
      localStorage.removeItem('Awareness:Cadaster')
      localStorage.removeItem('Awareness:ISS')
      localStorage.removeItem('Awareness:RangeDate')
      localStorage.removeItem('Awareness:PerPage')
      localStorage.removeItem('Awareness:sortBy')
      localStorage.removeItem('Awareness:sortDesc')
      localStorage.removeItem('Awareness:sortDirection')
      localStorage.removeItem('Awareness:filterOn')
    },
    ChangeDistrict(value) {
      if (value != null) {
        if (this.type != null) {
          this.$store.dispatch('awareness/GET_CAD').catch(() => {
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
      }
    },
    ChangeType(value) {
      if (value != null) {
        if (this.district != null) {
          this.$store.dispatch('awareness/GET_CAD').catch(() => {
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
      }
    },
    ChangeCAD(value) {
      if (value != null) {
        this.$store.dispatch('awareness/GET_ISS').catch(() => {
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
