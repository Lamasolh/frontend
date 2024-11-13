<template>
  <div>
    <b-overlay
      rounded="lg"
      :show="show"
    >
      <DataCollectFilter />
      <DataCollectList @refresh="ResetData" />
    </b-overlay>
  </div>
</template>

<script>
import { takeState } from 'vuex-dot'
import DataCollectList from './DataCollectList.vue'
import DataCollectFilter from './DataCollectFilter.vue'

export default {
  components: {
    DataCollectList,
    DataCollectFilter,
  },
  computed: {
    show: takeState('dataCollectList', 'show').commit('dataCollectList/SET_SHOW').map(),
    saved: takeState('dataCollectList', 'saved').commit('dataCollectList/SET_SAVED').map(),
  },
  mounted() {
    this.ResetData()
  },
  methods: {
    ResetData() {
      this.$store.dispatch('dataCollectList/REFRESH')
    },
  },
}
</script>

<style>

</style>
