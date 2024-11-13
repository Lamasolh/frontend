<template>
  <div>
    <b-overlay
      rounded="lg"
      :show="show"
    >
      <AwarenessFilter />
      <AwarenessList />
    </b-overlay>
  </div>
</template>

<script>
import { takeState } from 'vuex-dot'
import AwarenessFilter from './AwarenessFilter.vue'
import AwarenessList from './AwarenessList.vue'

export default {
  components: {
    AwarenessFilter,
    AwarenessList,
  },
  computed: {
    show: takeState('awareness', 'show').commit('awareness/SET_SHOW').map(),
    saved: takeState('awareness', 'saved').commit('awareness/SET_SAVED').map(),
  },
  mounted() {
    this.ResetData()
  },
  methods: {
    ResetData() {
      this.$store.dispatch('awareness/REFRESH', {
        prefix: this.$route.params.prefixPrj,
        prefixRole: this.$route.params.prefixRole,
      }).catch(() => {
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
