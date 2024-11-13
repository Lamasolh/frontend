<template>
  <b-card
    ref="filter"
    no-body
  >
    <b-card-header class="pb-50">
      <h5>
        Filters
      </h5>
    </b-card-header>
    <b-card-body>
      <b-row>
        <!-- Job Title -->
        <b-col
          cols="6"
          class="mb-md-0 mb-2"
        >
          <label>Job</label>
          <v-select
            v-model="job"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="title"
            placeholder="ALL"
            :options="jobOptions"
          />
        </b-col>
        <!-- District -->
        <b-col
          cols="6"
          class="mb-md-0 mb-2"
        >
          <label>Status</label>
          <v-select
            v-model="status"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="title"
            placeholder="ALL"
            :options="statusOptions"
          />
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
import vSelect from 'vue-select'
import { takeState } from 'vuex-dot'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    vSelect,
  },
  directives: {
    Ripple,
  },
  computed: {
    jobOption: takeState('global', 'job_title').map(),
    statusOptions: takeState('global', 'user_status').map(),
    jobOptions() {
      const job = this.jobOption.filter(it => it.value !== 1)
      return job
    },
    // Filter Values
    job: takeState('listUser', 'job').commit('listUser/SET_JOB').map(),
    status: takeState('listUser', 'status').commit('listUser/SET_STATUS').map(),
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
