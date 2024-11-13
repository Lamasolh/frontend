<template>
  <div>
    <b-overlay
      rounded="lg"
      :show="show"
    >
      <GeoDataCollectFilter />
      <GeoDataCollectList @refresh="ResetData" />
    </b-overlay>
  </div>
</template>

<script>
import { takeState } from 'vuex-dot'
import GeoDataCollectList from './GeoDataCollectList.vue'
import GeoDataCollectFilter from './GeoDataCollectFilter.vue'

export default {
  components: {
    GeoDataCollectList,
    GeoDataCollectFilter,
  },
  computed: {
    show: takeState('dataCollectGeo', 'show').commit('dataCollectGeo/SET_SHOW').map(),
    saved: takeState('dataCollectGeo', 'saved').commit('dataCollectGeo/SET_SAVED').map(),
  },
  mounted() {
    this.ResetData()
  },
  methods: {
    ResetData() {
      this.$store.dispatch('dataCollectGeo/REFRESH', {
        prefix: this.$route.params.prefixPrj,
        prefixRole: this.$route.params.prefixRole,
        type: this.$route.params.assmnttype,
      }).then(() => {
      })
    },
  },
}
</script>

<style>

</style>
