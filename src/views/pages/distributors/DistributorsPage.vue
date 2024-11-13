<template>
  <div ref="INVNT">
    <b-overlay
      rounded="lg"
      :show="show"
    >
      <b-tabs
        vertical
        content-class="col-12 col-md-9 mt-1 mt-md-0"
        pills
        nav-wrapper-class="col-md-3 col-12"
        nav-class="nav-left"
      >
        <!-- Distributor-->
        <b-tab>

          <!-- title -->
          <template #title>
            <feather-icon
              icon="TruckIcon"
              size="18"
              class="mr-50"
            />
            <span class="font-weight-bold">Inventory</span>
          </template>

          <Inentory-Distributor />
        </b-tab>
        <!--/ Distributor-->
        <!-- Report -->
        <b-tab>

          <!-- title -->
          <template #title>
            <feather-icon
              icon="BarChart2Icon"
              size="18"
              class="mr-50"
            />
            <span class="font-weight-bold">Assignment</span>
          </template>

          <AssignmentDistributor />
        </b-tab>
        <!--/ Report -->
      </b-tabs>
    </b-overlay>
  </div>

</template>
<script>
import { takeState } from 'vuex-dot'
import InentoryDistributor from './InventoryDistributor.vue'
import AssignmentDistributor from './AssignmentDistributor.vue'

export default {
  components: {
    InentoryDistributor,
    AssignmentDistributor,

  },
  computed: {
    show: takeState('distributor', 'show').map(),
    saved: takeState('distributor', 'saved').commit('distributor/SET_SAVED').map(),
  },
  mounted() {
    this.ResetData()
  },
  methods: {
    ResetData() {
      console.log('check')
      this.$store.dispatch('distributor/GET_DATA', {
        prefix: this.$route.params.prefixPrj,
        prefixRole: this.$route.params.prefixRole,
        type: this.$route.params.assmnttype,
      })
    },
  },
}
</script>

<style>

</style>
