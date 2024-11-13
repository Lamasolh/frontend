<template>
  <div>
    <b-overlay
      rounded="lg"
      :show="show"
    >
      <projectslist />
    </b-overlay>
  </div>
</template>

<script>
import { takeState } from 'vuex-dot'
import projectslist from './projectslist.vue'

export default {
  components: {
    projectslist,
  },
  computed: {
    show: takeState('listPrj', 'show').commit('listPrj/SET_SHOW').map(),
    saved: takeState('listPrj', 'saved').commit('listPrj/SET_SAVED').map(),
  },
  mounted() {
    this.ResetData()
  },
  methods: {
    ResetData() {
      this.$store.dispatch('listPrj/REFRESH').catch(() => {
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

<style>

</style>
