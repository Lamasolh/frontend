<template>
  <div>
    <b-overlay
      rounded="lg"
      :show="show"
    >
      <ProjectSearchFilter />
      <ProjectSearchList @refresh="ResetData" />
    </b-overlay>
  </div>
</template>

<script>
import { takeState } from 'vuex-dot'
import ProjectSearchList from './ProjectSearchList.vue'
import ProjectSearchFilter from './ProjectSearchFilter.vue'

export default {
  components: {
    ProjectSearchList,
    ProjectSearchFilter,
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
