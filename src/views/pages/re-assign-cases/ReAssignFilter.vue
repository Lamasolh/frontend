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
          v-show="type ==null? false: type.value >3"
          cols="4"
        >
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
    cadOptions: takeState('reAssign', 'cadOptions').commit('reAssign/SET_CAD_OPT').map(),
    typeOptions: takeState('global', 'type').map(),
    issOptions: takeState('reAssign', 'issOptions').map(),
    // Filter Values
    referral: takeState('reAssign', 'referral').commit('reAssign/SET_REF').map(),
    governorate: takeState('reAssign', 'governorate').commit('reAssign/SET_GOV').map(),
    district: takeState('reAssign', 'district').commit('reAssign/SET_DIS').map(),
    cadaster: takeState('reAssign', 'cadaster').commit('reAssign/SET_CAD').map(),
    type: takeState('reAssign', 'type').commit('reAssign/SET_TYPE').map(),
    iss: takeState('reAssign', 'iss').commit('reAssign/SET_ISS').map(),
    rangeDate: takeState('reAssign', 'rangedate').commit('reAssign/SET_RANG_DAT').map(),
    districtSelect() {
      return this.districtOptions.filter(item => item.params
      === (this.governorate != null ? this.governorate.value : null))
    },
  },
  methods: {
    clear() {
      this.rangeDate = null
    },
    ChangeDistrict(value) {
      if (value != null) {
        if (this.type != null) {
          this.$store.dispatch('reAssign/GET_CAD')
        }
      } else {
        this.cadOptions = []
      }
    },
    ChangeType(value) {
      if (value != null) {
        if (this.district != null) {
          this.$store.dispatch('reAssign/GET_CAD')
        }
      } else {
        this.cadOptions = []
      }
    },
    ChangeCAD(value) {
      if (value != null) {
        this.$store.dispatch('reAssign/GET_ISS')
      }
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
