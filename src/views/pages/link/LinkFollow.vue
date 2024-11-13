<template>
  <div>
    <b-overlay
      rounded="lg"
      :show="show"
    >
      <LinkFollowFilter />
      <LinkFollowList />
    </b-overlay>
  </div>
</template>

<script>
import { takeState } from 'vuex-dot'
import LinkFollowFilter from './LinkFollowFilter.vue'
import LinkFollowList from './LinkFollowList.vue'

export default {
  components: {
    LinkFollowFilter,
    LinkFollowList,
  },
  computed: {
    show: takeState('link', 'show').commit('link/SET_SHOW').map(),
    saved: takeState('link', 'saved').commit('link/SET_SAVED').map(),
  },
  mounted() {
    this.ResetData()
  },
  methods: {
    ResetData() {
      this.$store.dispatch('link/REFRESH', {
        prefix: this.$route.params.prefixPrj,
        prefixRole: this.$route.params.prefixRole,
        type: this.$route.params.assmnttype,
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
