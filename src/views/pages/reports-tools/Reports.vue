<template>
  <div ref="INVNT">
    <b-overlay
      rounded="lg"
      :show="show"
    >
      <b-tabs
        horizontal

        pills
        nav-class="nav-left"
      >
        <b-tab v-if="$route.params.prefixPrj ==='CLRA'">
          <!-- title-->
          <template #title>
            <feather-icon
              icon="ActivityIcon"
              size="18"
              class="mr-50"
            />
            <span class="font-weight-bold">ActivityInfo Report</span>
          </template>

          <ActivityTab />
        </b-tab>
        <b-tab v-if="$route.params.prefixPrj ==='CLRA'">
          <!-- title-->
          <template #title>
            <feather-icon
              icon="AirplayIcon"
              size="18"
              class="mr-50"
            />
            <span class="font-weight-bold">Sector Report</span>
          </template>

          <SectorTab />
        </b-tab>
        <b-tab>
          <!-- title-->
          <template #title>
            <feather-icon
              icon="CodesandboxIcon"
              size="18"
              class="mr-50"
            />
            <span class="font-weight-bold">Case Report</span>
          </template>

          <CaseTab />
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
            <span class="font-weight-bold">Inventory Report</span>
          </template>

          <InventoryTab />
        </b-tab>
        <!-- Inventory WareHouse -->
        <b-tab>

          <!-- title -->
          <template #title>
            <feather-icon
              icon="MapIcon"
              size="18"
              class="mr-50"
            />
            <span class="font-weight-bold">Cadaster Report</span>
          </template>

          <CadTab />
        </b-tab>
        <!--/ Inventory WareHouse -->
      </b-tabs>
    </b-overlay>
  </div>
</template>

<script>
import { takeState } from 'vuex-dot'
import InventoryTab from './InventoryTab.vue'
import CadTab from './CadReport.vue'

import CaseTab from './CaseTab.vue'
import ActivityTab from './ActivityTab.vue'
import SectorTab from './SectorTab.vue'

export default {
  components: {
    InventoryTab,
    CaseTab,
    CadTab,
    ActivityTab,
    SectorTab,
  },
  computed: {
    show: takeState('reportsTools', 'show').commit('reportsTools/SET_SHOW').map(),

  },
  mounted() {
    this.ResetData()
  },
  methods: {
    ResetData() {

    },
  },

}
</script>
