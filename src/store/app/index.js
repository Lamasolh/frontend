import { $themeBreakpoints } from '@themeConfig'

export default {
  namespaced: true,
  state: {
    windowWidth: 0,
    shallShowOverlay: false,
    loading: true,
    isNav: false,
    title: 'RDMS - Referral System',
  },
  getters: {
    currentBreakPoint: state => {
      const { windowWidth } = state
      if (windowWidth >= $themeBreakpoints.xl) return 'xl'
      if (windowWidth >= $themeBreakpoints.lg) return 'lg'
      if (windowWidth >= $themeBreakpoints.md) return 'md'
      if (windowWidth >= $themeBreakpoints.sm) return 'sm'
      return 'xs'
    },
    DEFAULT_TITLE: state => state.title,
    IS_NAV: state => state.isNav,

  },
  mutations: {
    UPDATE_WINDOW_WIDTH(state, val) {
      state.windowWidth = val
    },
    TOGGLE_OVERLAY(state, val) {
      state.shallShowOverlay = val !== undefined ? val : !state.shallShowOverlay
    },
    LOADING_DISABLE(state) {
      state.loading = false
    },
    LOADING_SHOW(state) {
      state.loading = true
    },
    LOAD_START(state) {
      state.isNav = true
    },
    LOAD_STOP(state) {
      state.isNav = false
    },
  },
  actions: {},
}
