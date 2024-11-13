<template>
  <div ref="CAST">
    <b-overlay
      rounded="lg"
      :show="show"
    >
      <CaseAssTo
        :is-add-new-user-sidebar-active.sync="isAssignSidebarActive"
      />
      <case-ass-filter />
      <case-ass-list />
    </b-overlay>
  </div>
</template>

<script>
import store from '@/store'
import { takeState } from 'vuex-dot'
import CaseAssFilter from './CaseAssFilter.vue'
import CaseAssList from './CaseAssList.vue'
import CaseAssTo from './CaseAssAsignTo.vue'

export default {
  components: {
    CaseAssFilter,
    CaseAssList,
    CaseAssTo,
  },
  computed: {
    show: takeState('caseAssignment', 'show').commit('caseAssignment/SET_SHOW').map(),
    saved: takeState('caseAssignment', 'saved').commit('caseAssignment/SET_SAVED').map(),

    isAssignSidebarActive: {
      get() {
        return store.getters['caseAssignment/isAssignSidebarActive']
      },
      set(value) {
        return this.$store.commit('caseAssignment/SET_ASS_TO', value)
      },
    },
  },
  mounted() {
    this.ResetData()
  },
  methods: {
    ResetData() {
      console.log('sss')
      this.$store.dispatch('caseAssignment/REFRESH', {
        prefix: this.$route.params.prefixPrj,
        prefixRole: this.$route.params.prefixRole,
        type: this.$route.params.assmnttype,
      }).catch(() => {
        this.show = false
        this.$swal({
          title: 'Error!',
          text: 'Please Check internet and try again',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
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
