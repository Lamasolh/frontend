<template>

  <b-card>
    <h1> Notification History</h1>
    <!-- Notifications -->
    <vue-perfect-scrollbar
      v-if="notifications.length>0"
      :settings="perfectScrollbarSettings"
      class="scrollable-container media-list scroll-area"
    >
      <!-- Account Notification -->
      <b-link
        v-for="notification in notifications"
        :key="notification.id"
      >
        <b-media>
          <template #aside>
            <b-avatar
              size="32"
              :variant="notification.priority"
            >
              <span class="d-flex align-items-center">
                <feather-icon
                  :icon="notification.avatar"
                  size="16"
                />
              </span>
            </b-avatar>
          </template>
          <p class="media-heading">
            <span class="">
              {{ notification.title }}
            </span>
          </p>
          <small :class="notification.read?'notification-text': ''">{{ notification.subtitle }}</small>
          <small :class="notification.read?'notification-text': ''">{{ notification.subtitle }}</small>
        </b-media>
        <hr>
      </b-link>
    </vue-perfect-scrollbar>
    <div v-else>
      <br>
      <br>
      <h5 class="text-center text-danger">
        <b>No Notification</b>
      </h5>
      <br>
      <br>
    </div>
  </b-card>
</template>

<script>
import Ripple from 'vue-ripple-directive'
import { takeState } from 'vuex-dot'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  components: {
    VuePerfectScrollbar,
  },
  directives: {
    Ripple,
  },
  computed: {
    notifications: takeState('auth', 'notification').map(),
    perfectScrollbarSettings: {
      get() {
        return this.$store.getters['auth/perfectScrollbarSettings']
      },
    },
  },

}
</script>
