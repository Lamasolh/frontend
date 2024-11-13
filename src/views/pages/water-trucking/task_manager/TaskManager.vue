<template>
  <div ref="GSPLTADV">
    <b-overlay
      rounded="lg"
      :show="show"
    >

      <WtrFilter />
      <wtr-list />
      <urgent-modal />
    </b-overlay>
  </div>
</template>
<script>
import { takeState } from 'vuex-dot'
import WtrFilter from './TaskFilter.vue'
import WtrList from './ListTask.vue'
import UrgentModal from './UrgentModal.vue'

export default {
  components: {
    WtrFilter,
    WtrList,
    UrgentModal,
  },
  computed: {
    saved: takeState('truckingTaskmanager', 'saved').commit('truckingTaskmanager/SET_SAVED').map(),
    show: takeState('truckingTaskmanager', 'show').commit('truckingTaskmanager/SET_SHOW').map(),

  },
  mounted() {
    this.ResetData()
  },
  methods: {
    ResetData() {
      this.$store.commit('truckingTaskmanager/Clear')
      this.$store.dispatch('truckingTaskmanager/GET_GOV', {
        prefix: this.$route.params.prefixPrj,
        prefixRole: this.$route.params.prefixRole,
      })
    },
  },
}
</script>
