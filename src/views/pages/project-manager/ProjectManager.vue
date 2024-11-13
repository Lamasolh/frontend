<template>
  <div>
    <b-overlay
      rounded="lg"
      :show="show"
    >
      <ProjectManagerList @refresh="ResetData" />
    </b-overlay>
  </div>
</template>

<script>
import { takeState } from 'vuex-dot'
import ProjectManagerList from './ProjectManagerList.vue'

export default {
  components: {
    ProjectManagerList,
  },
  computed: {
    show: takeState('listOrgPrj', 'show').commit('listOrgPrj/SET_SHOW').map(),
    saved: takeState('listOrgPrj', 'saved').commit('listOrgPrj/SET_SAVED').map(),
  },
  mounted() {
    this.ResetData()
    console.log(this.$store.getters)
  },
  methods: {
    ResetData() {
      this.$store.dispatch('listOrgPrj/REFRESH', {
        prefix: this.$route.params.prefixPrj,
        prefixRole: this.$route.params.prefixRole,
      })
    },
  },
}
</script>

<style>

</style>
