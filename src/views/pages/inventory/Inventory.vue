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
        <b-card v-show="orgList.length>1">
          <b-form-group
            label="Current Organization"
          >
            <v-select
              :value="currentOrg"
              placeholder="Select a Organization"
              label="title"
              :options="orgList"
              :clearable="false"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              @input="currentOrgInput"
            />
          </b-form-group>
        </b-card>
        <!-- general tab -->
        <b-tab active>

          <!-- title -->
          <template #title>
            <feather-icon
              icon="CodesandboxIcon"
              size="18"
              class="mr-50"
            />
            <span class="font-weight-bold">General Info.</span>
          </template>

          <Inventory-General-Tab />
        </b-tab>
        <!--/ general tab -->

        <!-- Inventory WareHouse -->
        <b-tab>

          <!-- title -->
          <template #title>
            <feather-icon
              icon="HomeIcon"
              size="18"
              class="mr-50"
            />
            <span class="font-weight-bold">Manage Warehouse</span>
          </template>

          <Inventory-Warehouse />
        </b-tab>
        <!--/ Inventory WareHouse -->
        <!-- Inventory Add Item -->
        <b-tab>

          <template #title>
            <feather-icon
              icon="FilePlusIcon"
              size="18"
              class="mr-50"
            />
            <span class="font-weight-bold">Add Items</span>
          </template>

          <Inventory-Add-Items />
        </b-tab>
        <!--/ Inventory Add Item -->

        <!-- Distributor-->
        <b-tab>

          <!-- title -->
          <template #title>
            <feather-icon
              icon="TruckIcon"
              size="18"
              class="mr-50"
            />
            <span class="font-weight-bold">Distributors</span>
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
            <span class="font-weight-bold">Reports</span>
          </template>

          <Inventory-Reports />
        </b-tab>
        <!--/ Report -->
      </b-tabs>
    </b-overlay>
  </div>

</template>

<script>
import { takeState } from 'vuex-dot'
import vSelect from 'vue-select'
import InventoryGeneralTab from './InventoryGeneralTab.vue'
import InventoryAddItems from './InventoryAddItems.vue'
import InventoryWarehouse from './InventoryWarehouse.vue'
import InentoryDistributor from './InentoryDistributor.vue'
import InventoryReports from './InventoryReports.vue'

export default {
  components: {
    InventoryGeneralTab,
    InventoryAddItems,
    InventoryWarehouse,
    InentoryDistributor,
    InventoryReports,
    vSelect,
  },
  computed: {
    show: takeState('inventory', 'show').commit('inventory/SET_SHOW').map(),
    orgList: takeState('inventory', 'orgList').map(),
    currentOrg: takeState('inventory', 'currentOrg').map(),

    /* currentOrg: {
      get() {
        return this.$store.getters['inventory/currentOrg']
      },
      set(value) {
        /// Change Organization
        this.$store.commit('inventory/SET_CUR_ORG', value)
        return this.$store.getters['inventory/currentOrg']
      },
    }, */
  },
  mounted() {
    this.ResetData()
    console.log('this.$route.params')
    console.log(this.$route.params)
  },
  methods: {
    currentOrgInput(value) {
      console.log(value)
      /// Change Organization
      this.$store.commit('inventory/SET_CUR_ORG', value)
      this.ResetData()
    },
    ResetData() {
      this.$store.dispatch('inventory/GET_INVENTORY_LIST', {
        prefix: this.$route.params.prefixPrj,
        type: this.$route.params.assmnttype,
      })
    },
  },

}
</script>
