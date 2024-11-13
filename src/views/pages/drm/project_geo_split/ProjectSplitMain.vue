<template>
  <div>
    <b-overlay
      rounded="lg"
      :show="show"
    >
      <ProjectFilter />
      <ProjectSplitList />
    </b-overlay>
  </div>
</template>

<script>
import { takeState } from 'vuex-dot'
import ProjectFilter from './Filter/ProjectFilter.vue'
import ProjectSplitList from './ProjectSplitList.vue'

export default {
  components: {
    ProjectFilter,
    ProjectSplitList,
  },

  computed: {
    show: takeState('drmSecGeo', 'show').commit('drmSecGeo/SET_SHOW').map(),

  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.$store.dispatch('drmSecGeo/GET_DATA', { prefix: 'DRM', type: 'school' })
        .then(() => {
          if (this.caseItem && Array.isArray(this.caseItem)) {
            this.totalRows = this.caseItem.length
            console.log('Total rows:', this.totalRows)
          } else {
            console.error('No data found in caseItem', this.caseItem)
          }
        })
        .catch(error => {
          console.error('Failed to load data:', error)
        })
    },
  },
}
</script>
