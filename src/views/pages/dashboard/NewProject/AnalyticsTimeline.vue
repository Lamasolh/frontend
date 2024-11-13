<template>
  <b-card
    v-if="data"
    no-body
  >

    <!-- timeline -->
    <b-card-body>
      <app-timeline>
        <app-timeline-item variant="primary">
          <div class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1">
            <h6>Organization Register</h6>
          </div>
          <p>This link to register organization</p>
          <b-button
            variant="success"
            @click="goToReg"
          >
            Go now
          </b-button>
        </app-timeline-item>
        <app-timeline-item variant="primary">
          <div class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1">
            <h6>IPC entry</h6>
          </div>
          <p>this link for people</p>
          <b-button
            variant="success"
            @click="goToIPC"
          >
            Go now
          </b-button>
        </app-timeline-item>
      </app-timeline>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  VBTooltip,
} from 'bootstrap-vue'
import AppTimeline from '@core/components/app-timeline/AppTimeline.vue'
import AppTimelineItem from '@core/components/app-timeline/AppTimelineItem.vue'
/* eslint-disable global-require */
export default {
  components: {
    AppTimeline,
    AppTimelineItem,
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    goToReg() {
      const routeData = this.$router.resolve({ path: '/register' })
      window.open(routeData.href, '_blank')
    },
    goToIPC() {
      const routeData = this.$router.resolve({ path: '/IPC/entry' })
      window.open(routeData.href, '_blank')
    },
  },
}
</script>
