<template>
  <div ref="CAST">
    <b-overlay
      rounded="lg"
      :show="show"
    >
      <ReAssignFilter />
      <ReAssignList />
    </b-overlay>
  </div>
</template>

<script>
import { takeState } from 'vuex-dot'
import ReAssignFilter from './ReAssignFilter.vue'
import ReAssignList from './ReAssignList.vue'

export default {
  components: {
    ReAssignFilter,
    ReAssignList,
  },
  computed: {
    show: takeState('reAssign', 'show').commit('reAssign/SET_SHOW').map(),
    saved: takeState('reAssign', 'saved').commit('reAssign/SET_SAVED').map(),
  },
  mounted() {
    this.ResetData()
  },
  methods: {
    ResetData() {
      this.$store.dispatch('reAssign/REFRESH', {
        prefix: this.$route.params.prefixPrj,
        prefixRole: this.$route.params.prefixRole,
      }).then(() => {
      })
    },
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
