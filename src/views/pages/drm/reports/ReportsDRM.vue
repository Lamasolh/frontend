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
        <b-tab>
          <!-- title-->
          <template #title>
            <feather-icon
              icon="ActivityIcon"
              size="18"
              class="mr-50"
            />
            <span class="font-weight-bold">Monthly Reporting</span>
          </template>
          <ActivityTab />
        </b-tab>
      </b-tabs>
    </b-overlay>
  </div>
</template>

<script>
import { takeState } from 'vuex-dot'
import ActivityTab from './ActivityTab.vue'

export default {
  components: {
    ActivityTab,
  },
  computed: {
    show: takeState('reportDRM', 'show').commit('reportDRM/SET_SHOW').map(),

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
