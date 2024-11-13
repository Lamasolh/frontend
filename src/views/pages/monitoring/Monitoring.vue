<template>
  <div ref="CAST">
    <b-overlay
      rounded="lg"
      :show="show"
    >
      <MonitoringFilter />
      <MonitoringList />
      <MonitoringFilterSide :is-add-new-user-sidebar-active.sync="showFilter" />
      <MonitoringColumnSide :is-add-new-user-sidebar-active.sync="showColumn" />
    </b-overlay>
  </div>
</template>

<script>
import { takeState } from 'vuex-dot'
import MonitoringFilter from './MonitoringFilter.vue'
import MonitoringList from './MonitoringList.vue'
import MonitoringFilterSide from './MonitoringFilterSide.vue'
import MonitoringColumnSide from './MonitoringColumnSide.vue'

export default {
  components: {
    MonitoringFilter,
    MonitoringList,
    MonitoringFilterSide,
    MonitoringColumnSide,

  },
  computed: {
    show: takeState('monitoring', 'show').commit('monitoring/SET_SHOW').map(),
    saved: takeState('monitoring', 'saved').commit('monitoring/SET_SAVED').map(),
    showFilter: takeState('monitoring', 'showFilter').commit('monitoring/SET_SHOW_FILTER').map(),
    showColumn: takeState('monitoring', 'showColumn').commit('monitoring/SET_SHOW_COLUMN').map(),

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
