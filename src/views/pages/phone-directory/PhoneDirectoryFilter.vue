<template>
  <div>
    <b-card-header class="pb-50">
      <h5>
        Filters
      </h5>
    </b-card-header>
    <b-card-body>
      <b-row>
        <!-- Referral -->
        <b-col
          cols="3"
        >
          <label>Organization  Job</label>
          <v-select
            v-model="orgjob"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="title"
            placeholder="ALL"
            :options="orgJobOptions"
          />
        </b-col>
        <!-- Gov -->
        <b-col
          cols="3"
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
        <b-col
          cols="3"
        >
          <label>District</label>
          <v-select
            v-model="district"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="title"
            placeholder="ALL"
            :options="districtSelect"
          />
        </b-col>
        <!-- Cadastral -->
        <b-col
          cols="3"
        >
          <label>Cadastral</label>
          <v-select
            v-model="municipality"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="title"
            placeholder="ALL"
            :options="municipalitySelect"
          />
        </b-col>
      </b-row>
    </b-card-body>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import { takeState } from 'vuex-dot'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    vSelect,
  },
  directives: {
    Ripple,
  },
  computed: {
    orgJobOptions: takeState('global', 'orgJobOptions').map(),
    governorateOption: takeState('global', 'governorate').map(),
    districtOptions: takeState('global', 'district').map(),
    municipalityOptions: takeState('global', 'municipality').map(),
    // Filter Values
    orgjob: takeState('directory', 'orgjob').commit('directory/SET_ORG_STATUS').map(),
    governorate: takeState('directory', 'governorate').commit('directory/SET_GOV').map(),
    district: takeState('directory', 'district').commit('directory/SET_DIS').map(),
    municipality: takeState('directory', 'cadaster').commit('directory/SET_CAD').map(),
    referral: takeState('caseAssignment', 'referral').commit('caseAssignment/SET_REF').map(),
    // Select Municipality
    municipalitySelect() {
      return this.municipalityOptions.filter(item => item.params
      === (this.district != null ? this.district.value : null))
    },
    districtSelect() {
      return this.districtOptions.filter(item => item.params
      === (this.governorate != null ? this.governorate.value : null))
    },
  },
  methods: {
    clear() {
      this.rangeDate = null
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
