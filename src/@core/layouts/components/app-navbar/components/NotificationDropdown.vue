<template>
  <b-nav-item-dropdown
    ref="notref"
    class="dropdown-notification"
    menu-class="dropdown-menu-media"
    right
  >

    <template #button-content>
      <feather-icon
        :badge="notifications.filter(it=> !it.read).length"
        badge-classes="bg-danger"
        class="text-body"
        icon="BellIcon"
        size="21"
      />
    </template>

    <!-- Header -->
    <li class="dropdown-menu-header">
      <div class="dropdown-header d-flex">
        <h4 class="notification-title mb-0 mr-auto">
          Notifications
        </h4>
        <b-badge
          v-show="notifications.filter(it=> !it.read).length>0"
          pill
          variant="light-primary"
        >
          {{ notifications.filter(it=> !it.read).length }} New
        </b-badge>
      </div>
    </li>

    <!-- Notifications -->
    <vue-perfect-scrollbar
      :settings="perfectScrollbarSettings"
      class="scrollable-container media-list"
    >
      <!-- Account Notification -->
      <b-list-group
        v-if="notifications.length >0"
        flush
      >
        <b-list-group-item
          v-for="notification in notifications"
          :key="notification.id"
          active-class="text-muted"
          :active="$store.state.appConfig.layout.skin === 'dark' && notification.read===false "
          :variant="notification.read?null: notification.color"
          :to="notification.action"
          @click="action(notification.id)"
        >
          <b-row>
            <b-col
              cols="2"
              class="mt-1"
            >
              <b-avatar
                size="45"
                :variant="notification.variant"
                :badge="notification.badge == null? false :true"
              >
                <template
                  v-if="notification.badge == null? false :true"
                  slot="badge"
                >
                  <feather-icon
                    :variant="notification.variant"
                    :icon="notification.badge"
                    size="12"
                  />
                </template>
                <span>
                  <feather-icon
                    :icon="notification.avatar"
                    size="26"
                  />
                </span>
              </b-avatar>
            </b-col>
            <b-col
              cols="6"
            >
              <p>{{ notification.title }}</p>
              <p>
                {{ notification.subtitle }}
              </p>
            </b-col>
            <b-col
              cols="2"
              align-self="center"
            >
              <b-badge
                :variant="notification.variant"
                class="text-center"
              >
                <small> {{ notification.priority }} </small>
              </b-badge>
              <b-badge
                class="mt-1"
              >
                <small>
                  {{ notification.ago }}
                </small>
              </b-badge>
            </b-col>
          </b-row>
        </b-list-group-item>
      </b-list-group>
      <div v-else>
        <h6
          class="media d-flex align-items-center text-center font-weight-bolder mr-auto mb-0"
        >
          You don't have a notification
        </h6>
      </div>
      <!-- System Notification Toggler -->
      <div v-show="systemNotifications.length>0">
        <h6
          v-show="systemNotifications.length>0"
          class="media d-flex align-items-center font-weight-bolder mr-auto mb-0"
        >
          System Notifications
        </h6>
      </div>

      <!-- System Notifications -->
      <b-link
        v-for="notification in systemNotifications"
        :key="notification.subtitle"
      >
        <b-media>
          <template #aside>
            <b-avatar
              size="32"
              :variant="notification.type"
            >
              <feather-icon :icon="notification.icon" />
            </b-avatar>
          </template>
          <b>
            <p class="">
              <span>
                {{ notification.title }}
              </span>
            </p>
          </b>
          <small class="notification-text">{{ notification.subtitle }}</small>
        </b-media>
      </b-link>
    </vue-perfect-scrollbar>

    <!-- Cart Footer -->
    <li class="dropdown-menu-footer">
      <b-row>
        <b-col>
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            block
            @click="readAll"
          >Read all
          </b-button>
        </b-col>
        <b-col>
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="danger"
            block
            @click="clearAll"
          >Clear all
          </b-button>
        </b-col>
      </b-row>
    </li>
  </b-nav-item-dropdown>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import Ripple from 'vue-ripple-directive'
import { takeState } from 'vuex-dot'

export default {
  components: {
    VuePerfectScrollbar,
  },
  directives: {
    Ripple,
  },
  computed: {
    notifications: takeState('notify', 'notification').map(),
    systemNotifications: {
      get() {
        return this.$store.getters['notify/systemNotifications']
      },
    },
    perfectScrollbarSettings: {
      get() {
        return this.$store.getters['notify/perfectScrollbarSettings']
      },
    },
  },
  methods: {
    readAll() {
      this.$store.dispatch('notify/READ_ALL')
    },
    clearAll() {
      this.$store.dispatch('notify/CLEAR_ALL')
    },
    action(id) {
      this.$refs.notref.hide()
      this.$store.dispatch('notify/READ', id)
    },
  },
}
</script>

<style>
.sticky-top { top: 0.8em; }
</style>
