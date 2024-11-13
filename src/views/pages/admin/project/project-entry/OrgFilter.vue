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
          <label>Organization  Status</label>
          <v-select
            v-model="orgstatus"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="title"
            placeholder="ALL"
            :options="orgStatusOptions"
          />
        </b-col>
        <!-- Gov -->
        <b-col
          cols="3"
        >
          <label>Governorate</label>
          <v-select
            v-model="governorate"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="title"
            placeholder="ALL"
            :options="governorateOption"
          />
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
        <!-- Cadaster -->
        <b-col
          cols="3"
        >
          <label>Cadaster</label>
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
    orgStatusOptions: takeState('global', 'org_status').map(),
    governorateOption: takeState('global', 'governorate').map(),
    districtOptions: takeState('global', 'district').map(),
    municipalityOptions: takeState('global', 'municipality').map(),
    // Filter Values
    orgstatus: takeState('entryOrg', 'orgstatus').commit('entryOrg/SET_ORG_STATUS').map(),
    district: takeState('entryOrg', 'district').commit('entryOrg/SET_DIS').map(),
    governorate: takeState('entryOrg', 'governorate').commit('entryOrg/SET_GOV').map(),
    municipality: takeState('entryOrg', 'municipality').commit('entryOrg/SET_MUN').map(),
    referral: takeState('entryOrg', 'referral').commit('entryOrg/SET_REF').map(),
    districtSelect() {
      return this.districtOptions.filter(item => item.params
      === (this.governorate != null ? this.governorate.value : null))
    },
    // Select Municipality
    municipalitySelect() {
      return this.municipalityOptions.filter(item => item.params
      === (this.district != null ? this.district.value : null))
    },
  },
  methods: {
    clear() {
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
