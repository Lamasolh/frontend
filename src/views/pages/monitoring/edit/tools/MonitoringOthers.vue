<template>
  <div>
    <b-overlay
      rounded="lg"
      :show="show"
    >
      <b-card>
        <b-row>
          <b-col cols="3">
            <p>
              <b>Case Code:</b> <b class="text-danger">{{ case_code }}</b>
            </p>
            <p>
              <b>Full Name:</b>  <b>{{ fullname }}</b>
            </p>
            <p>
              <b>Phone:</b>  <b>+{{ phone }}</b>
            </p>
            <p>
              <b>Case Info:</b> <b class="text-primary">{{ info }}</b>
            </p>
            <p>
              <b class="text-primary">Decision: </b><b>{{ decision_name }}</b>
            </p>
            <h3 :class="percentage > 50 ?'text-success' : 'text-danger'">
              Verified: {{ percentage }}%
            </h3>
          </b-col>
          <b-col>
            <p class="text-primary">
              Current Status:  </p>
            <pre>{{ current_status }} </pre>

            <p class="text-primary">
              Case Notes :
            </p>
            <pre> {{ case_notes }}</pre>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="4">
            <label>Over All Case</label>
            <br>
            <v-select
              v-model="over"
              :disabled="!monitored"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="title"
              placeholder="ALL"
              :options="overOp"
            />
          </b-col>

        </b-row>
      </b-card>
    </b-overlay>

  </div>
</template>

<script>
import Ripple from 'vue-ripple-directive'
import { takeState } from 'vuex-dot'
import vSelect from 'vue-select'

// eslint-disable-next-line import/order
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
    vSelect,
  },
  directives: {
    Ripple,
  },

  computed: {
    show: takeState('monitoringView', 'show').map(),
    note: takeState('monitoringView', 'note').commit('monitoringView/SET_NOTE').map(),
    case_code: takeState('monitoringView', 'case_code').map(),
    fullname: takeState('monitoringView', 'fullname').map(),
    phone: takeState('monitoringView', 'phone').map(),
    referral: takeState('monitoringView', 'referral').map(),
    percentage: takeState('monitoringView', 'percentage').map(),

    case_notes: takeState('monitoringView', 'case_notes').map(),
    current_status: takeState('monitoringView', 'current_status').map(),
    decision_name: takeState('monitoringView', 'decision_name').map(),
    over: takeState('monitoringView', 'over').commit('monitoringView/SET_OVER').map(),
    overOp: takeState('monitoringView', 'overOption').map(),
    monitored: takeState('monitoringView', 'monitored').map(),

    info() {
      console.log('info', this.$route.params.value.case_status)
      return this.$route.params.value.case_status
    },
  },
  methods: {

  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-wizard.scss';
@import '@core/scss/vue/libs/vue-select.scss';
.sticky-top { top: 0.8em; }
</style>
