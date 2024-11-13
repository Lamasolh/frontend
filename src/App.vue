<template>
  <div>
    <vue-topprogress ref="topProgress" />
    <div
      id="app"
      class="h-100"
      :class="[skinClasses]"
    >
      <loading
        :load="load"
      >
        <component
          :is="layout"
          v-show="!load"
        >
          <router-view />
        </component>
      </loading>

    </div>
  </div>
</template>

<script>

// This will be populated in `beforeCreate` hook
import { $themeColors, $themeBreakpoints, $themeConfig } from '@themeConfig'
import { provideToast } from 'vue-toastification/composition'
import { watch } from '@vue/composition-api'
import useAppConfig from '@core/app-config/useAppConfig'

import { useWindowSize, useCssVar } from '@vueuse/core'

import store from '@/store'
import ToastNotificationContent from '@core/components/toastification/ToastificationContent.vue'

const LayoutVertical = () => import('@/layouts/vertical/LayoutVertical.vue')
const LayoutHorizontal = () => import('@/layouts/horizontal/LayoutHorizontal.vue')
const LayoutFull = () => import('@/layouts/full/LayoutFull.vue')
const loading = () => import('@/views/component/loading/Loading.vue')

export default {
  components: {
    // Layouts
    LayoutFull,
    LayoutHorizontal,
    LayoutVertical,
    loading,
    ToastNotificationContent,
  },
  setup() {
    const { skin, skinClasses } = useAppConfig()

    // If skin is dark when initialized => Add class to body
    if (skin.value === 'dark') document.body.classList.add('dark-layout')

    // Provide toast for Composition API usage
    // This for those apps/components which uses composition API
    // Demos will still use Options API for ease
    provideToast({
      hideProgressBar: true,
      closeOnClick: false,
      closeButton: false,
      icon: false,
      timeout: 3000,
      transition: 'Vue-Ratification__fade',
    })
    // Set Window Width in store
    store.commit('app/UPDATE_WINDOW_WIDTH', window.innerWidth)
    const { width: windowWidth } = useWindowSize()
    watch(windowWidth, val => {
      store.commit('app/UPDATE_WINDOW_WIDTH', val)
    })
    return {
      skinClasses,
    }
  },
  // ! We can move this computed: layout & contentLayoutType once we get to use Vue 3
  // Currently, router.currentRoute is not reactive and doesn't trigger any change
  computed: {
    load() {
      return this.$store.state.app.loading
    },
    isNav() {
      return this.$store.state.app.isNav
    },
    layout() {
      if (this.$route.meta.layout === 'full') {
        return 'layout-full'
      }
      if (this.$route.name == null) {
        return 'layout-full'
      }
      return `layout-${this.contentLayoutType}`
    },
    contentLayoutType() {
      return this.$store.state.appConfig.layout.type
    },
    auth() {
      const user = this.$store.getters['auth/authUser']
      return user == null ? 0 : user.user_id
    },
  },
  watch: {
    auth(val) {
      if (val != null) {
        window.Echo.private(`App.Models.User.${val}`)
          .notification(notification => {
            console.log('not', notification)
            this.$store.commit('notify/SET_NOT', {
              id: notification.id,
              title: notification.data.title,
              subtitle: notification.data.subtitle,
              title_ar: notification.title_ar,
              subtitle_ar: notification.subtitle_ar,
              avatar: notification.data.action == null ? 'InfoIcon' : 'FramerIcon',
              type: notification.type,
              priority: notification.data.priority,
              badge: notification.data.badge,
              action: notification.data.action,
              read: notification.read_at != null,
              time: notification.created_at,
            })
            this.showToast(notification.data.title, notification.data.subtitle, this.resolveVariant(notification.data.priority))
            this.notifyMe(notification.data.title, notification.data.subtitle)
          })
      }
    },
    isNav(value) {
      if (value) {
        this.$refs.topProgress.start()
      } else {
        this.$refs.topProgress.done()
      }
    },
  },
  beforeCreate() {
    const Production = false// set to false to disable debugging
    if (Production) {
      console.log.apply(this)
    }

    // Set colors in theme
    const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark']

    // eslint-disable-next-line no-plusplus
    for (let i = 0, len = colors.length; i < len; i++) {
      $themeColors[colors[i]] = useCssVar(`--${colors[i]}`, document.documentElement).value.trim()
    }

    // Set Theme Breakpoints
    const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl']

    // eslint-disable-next-line no-plusplus
    for (let i = 0, len = breakpoints.length; i < len; i++) {
      $themeBreakpoints[breakpoints[i]] = Number(useCssVar(`--breakpoint-${breakpoints[i]}`, document.documentElement).value.slice(0, -2))
    }
    // Set RTL
    const { isRTL } = $themeConfig.layout
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr')
    // Use setTimeout for demo
  },
  methods: {
    showToast(title, subtitle, variant) {
      this.$toast({
        component: ToastNotificationContent,
        props: {
          title,
          icon: 'BellIcon',
          text: subtitle,
          variant,
        },
      })
    },
    resolveVariant(pr) {
      switch (Number(pr)) {
        case 1:
          return 'success'
        case 2:
          return 'info'
        case 3:
          return 'warning'
        case 4:
          return 'danger'
        default:
          return 'info'
      }
    },
    notifyMe(title, subtitle) {
      if (!('Notification' in window)) {
        // eslint-disable-next-line no-alert
      } else if (Notification.permission === 'granted') {
        // eslint-disable-next-line no-new
        new Notification(`RDMS:${title}`, {
          body: subtitle,
          icon: '/notification.png',
        })
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            // eslint-disable-next-line no-new
            new Notification(`RDMS:${title}`, {
              body: subtitle,
              icon: '/notification.png',
            })
          }
        })
      }
    },
  },
}
</script>
