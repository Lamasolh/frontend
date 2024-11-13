<template>
  <div>
    <b-overlay
      rounded="lg"
      :show="show"
    >
      <IndicatorsFilter />
      <IndicatorsList />
    </b-overlay>
  </div>
</template>

<script>
import { takeState } from 'vuex-dot'
import IndicatorsFilter from './IndicatorsFilter.vue'
import IndicatorsList from './IndicatorsList.vue'

export default {
  components: {
    IndicatorsFilter,
    IndicatorsList,
  },
  computed: {
    show: takeState('indicators', 'show').commit('indicators/SET_SHOW').map(),
    saved: takeState('indicators', 'saved').commit('indicators/SET_SAVED').map(),
  },
  mounted() {
    this.ResetData()
  },
  methods: {
    ResetData() {
      this.$store.dispatch('indicators/REFRESH', {
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
