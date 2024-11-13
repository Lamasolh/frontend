<template>
  <b-card no-body>
    <b-card-header>
      <h3>
        Filters
      </h3>
    </b-card-header>
    <b-card-body>
      <b-row>
        <!-- Gov -->
        <b-col cols="4">
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
        <b-col cols="4">
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
        <b-col cols="4">
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
  </b-card>
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

    governorateOption: takeState('global', 'governorate').map(),
    districtOptions: takeState('global', 'district').map(),
    municipalityOptions: takeState('global', 'municipality').map(),
    // Filter Values

    district: takeState('drmSecGeo', 'district').commit('drmSecGeo/SET_DIS').map(),
    governorate: takeState('drmSecGeo', 'governorate').commit('drmSecGeo/SET_GOV').map(),
    municipality: takeState('drmSecGeo', 'municipality').commit('drmSecGeo/SET_MUN').map(),
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

  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
