<template>
  <div>
    <b-overlay
      rounded="lg"
      :show="show"
    >
      <list />
    </b-overlay>
  </div>
</template>

<script>
import { takeState } from 'vuex-dot'
import List from './ListSetting.vue'

export default {
  components: {
    List,
  },
  computed: {
    show: takeState('settingPrj', 'show').commit('settingPrj/SET_SHOW').map(),
    saved: takeState('settingPrj', 'saved').commit('settingPrj/SET_SAVED').map(),
  },
  mounted() {
    this.ResetData()
  },
  methods: {
    ResetData() {
      console.log(this.$route.params.value.proj_prefix)
      this.$store.dispatch('settingPrj/GET_DATA', {
        prefix: this.$route.params.value.proj_prefix,
        prefixRole: this.$route.params.prefixRole,
      })
    },

  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

</style>
