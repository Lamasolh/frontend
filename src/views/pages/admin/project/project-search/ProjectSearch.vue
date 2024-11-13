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
    show: takeState('searchPrj', 'show').commit('searchPrj/SET_SHOW').map(),
    saved: takeState('searchPrj', 'saved').commit('searchPrj/SET_SAVED').map(),
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
