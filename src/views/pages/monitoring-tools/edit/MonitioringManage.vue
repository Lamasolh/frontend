<template>
  <div>
    <b-row>
      <b-col cols="12">
        <b-overlay
          rounded="lg"
          :show="show"
        >
          <div>
            <form-wizard
              color="#7367F0"
              :title="null"
              :subtitle="null"
              shape="square"
              back-button-text="Previous"
              class="mb-3"
            >
              <!-- basic information tab -->
              <tab-content
                title="Basic Information"
                :lazy="true"
              >

                <MonitoringInfo />
              </tab-content>
              <!-- More  information tab-->
              <tab-content
                title="More Information"
                :lazy="true"
              >

                <MonitoringMore />
              </tab-content>

            </form-wizard>
          </div>
        </b-overlay>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Ripple from 'vue-ripple-directive'
import { takeState } from 'vuex-dot'
// eslint-disable-next-line import/order
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
// eslint-disable-next-line import/order
import { FormWizard, TabContent } from 'vue-form-wizard'
import MonitoringInfo from './MonitoringInfo.vue'
import MonitoringMore from './MonitoringMore.vue'

export default {
  components: {
    MonitoringInfo,
    MonitoringMore,
    FormWizard,
    TabContent,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  directives: {
    Ripple,
  },

  computed: {
    show: takeState('monitoring', 'show').map(),
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-wizard.scss';
@import '@core/scss/vue/libs/vue-select.scss';
.sticky-top { top: 0.8em; }
</style>
