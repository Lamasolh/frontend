<template>
  <div>
    <b-overlay
      rounded="lg"
      :show="show"
    >
      <ProjectAOIFilter />
      <ProjectAOIList />
    </b-overlay>
  </div>
</template>

<script>
import { takeState } from 'vuex-dot'
import ProjectAOIFilter from './ProjectAOIFilter.vue'
import ProjectAOIList from './ProjectAOIList.vue'

export default {
  components: {
    ProjectAOIFilter,
    ProjectAOIList,
  },
  computed: {
    show: takeState('listOrgPrj', 'show').commit('listOrgPrj/SET_SHOW').map(),
    saved: takeState('listOrgPrj', 'saved').commit('listOrgPrj/SET_SAVED').map(),
  },
  mounted() {
  },
  methods: {
    ResetData() {

    },
  },
}
</script>

<style>

</style>
