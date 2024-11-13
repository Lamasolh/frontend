<template>
  <div ref="CAST">
    <b-overlay
      rounded="lg"
      :show="show"
    >
      <!-- <MonitoringFilter /> -->
      <MonitoringList />
      <!--  <MonitoringFilterSide :is-add-new-user-sidebar-active.sync="showFilter" />
      <MonitoringColumnSide :is-add-new-user-sidebar-active.sync="showColumn" /> -->
    </b-overlay>
  </div>
</template>

<script>
import { takeState } from 'vuex-dot'
// import MonitoringFilter from './MonitoringFilter.vue'
import MonitoringList from './MonitoringList.vue'
// import MonitoringFilterSide from './MonitoringFilterSide.vue'
// import MonitoringColumnSide from './MonitoringColumnSide.vue'

export default {
  components: {
    // MonitoringFilter,
    MonitoringList,
    // MonitoringFilterSide,
    // MonitoringColumnSide,

  },
  computed: {
    show: takeState('drmNGOMn', 'show').commit('drmNGOMn/SET_SHOW').map(),
    saved: takeState('drmNGOMn', 'saved').commit('drmNGOMn/SET_SAVED').map(),
    /* showFilter: takeState('drmNGOMn', 'showFilter').commit('drmNGOMn/SET_SHOW_FILTER').map(),
    showColumn: takeState('drmNGOMn', 'showColumn').commit('drmNGOMn/SET_SHOW_COLUMN').map(), */
  },

}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
