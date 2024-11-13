<template>
  <div>
    <b-overlay
      rounded="lg"
      :show="show"
    >
      <FollowUpFilter />
      <FollowUpList />
    </b-overlay>
  </div>
</template>

<script>
import { takeState } from 'vuex-dot'
import FollowUpFilter from './FollowUpFilter.vue'
import FollowUpList from './FollowUpList.vue'

export default {
  components: {
    FollowUpFilter,
    FollowUpList,
  },
  computed: {
    show: takeState('followUp', 'show').commit('followUp/SET_SHOW').map(),
    saved: takeState('followUp', 'saved').commit('followUp/SET_SAVED').map(),
  },
  mounted() {
    this.ResetData()
  },
  methods: {
    ResetData() {
      this.$store.dispatch('followUp/REFRESH', {
        prefix: this.$route.params.prefixPrj,
        prefixRole: this.$route.params.prefixRole,
        type: this.$route.params.assmnttype,
      })
    },
  },
}
</script>

<style>

</style>
