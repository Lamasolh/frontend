<template>
  <div>
    <b-overlay
      rounded="lg"
      :show="show"
    >
      <UserManagerFilter />
      <UserManagerList @refresh="ResetData" />
    </b-overlay>
  </div>
</template>

<script>
import { takeState } from 'vuex-dot'
import UserManagerFilter from './UserManagerFilter.vue'
import UserManagerList from './UserManagerList.vue'

export default {
  components: {
    UserManagerFilter,
    UserManagerList,
  },
  computed: {
    show: takeState('listUser', 'show').commit('listUser/SET_SHOW').map(),
    saved: takeState('listUser', 'saved').commit('listUser/SET_SAVED').map(),
  },
  mounted() {
    this.ResetData()
  },
  methods: {
    ResetData() {
      this.$store.dispatch('listUser/REFRESH', {
        prefix: this.$route.params.prefixPrj,
        prefixRole: this.$route.params.prefixRole,
      }).catch(() => {
        this.$swal({
          title: 'Attention!',
          text: 'Please check intenrnet and try again!',
          icon: 'warning',
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
