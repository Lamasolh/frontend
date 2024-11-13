<template>
  <div ref="CAST">
    <b-overlay
      rounded="lg"
      :show="show"
    >

      <MonitoringList />
    </b-overlay>
  </div>
</template>

<script>
import { takeState } from 'vuex-dot'
import MonitoringList from './MonitoringList.vue'

export default {
  components: {
    MonitoringList,
  },
  computed: {
    show: takeState('monitoringDRM', 'show').commit('monitoringDRM/SET_SHOW').map(),
    saved: takeState('monitoringDRM', 'saved').commit('monitoringDRM/SET_SAVED').map(),
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
