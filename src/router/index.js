import Vue from 'vue'
import VueRouter from 'vue-router'

// import { canNavigate } from '@/libs/acl/routeProtection'
// import { isUserLoggedIn, getUserData, getHomeRouteForLoggedInUser } from '@/auth/utils'
// Routes
/// Auth
import auth from '@/router/routes/auth/auth'
import { canNavigate } from '@/libs/acl/routeProtection'
// eslint-disable-next-line import/no-cycle
import {
  isUserLoggedIn,
  getUserData,
  getHomeRouteForLoggedInUser,
} from '@/auth/utils'

/// Dashboard
import home from '@/router/routes/pages/home'
import dashboard from '@/router/routes/pages/dashboard'
// Project
import referral from '@/router/routes/pages/projects/referral'
import caseAssignment from '@/router/routes/pages/projects/case-assignment'
import followUp from '@/router/routes/pages/projects/follow-up'
import inventory from '@/router/routes/pages/projects/inventory'
import geoSplit from '@/router/routes/pages/projects/geo-split'
import monitoring from '@/router/routes/pages/projects/monitoring'
import reports from '@/router/routes/pages/projects/reports'
import assessment from '@/router/routes/pages/assessment'
import phonedirectory from '@/router/routes/pages/phonedirectory'

import project from '@/router/routes/pages/projects/project'
// Admin
import dtcls from '@/router/routes/pages/data_collection/dt_route'

import admin from '@/router/routes/pages/admin/admin'
import sector from '@/router/routes/pages/admin/sector'
import organization from '@/router/routes/pages/admin/organization'
import regOrg from '@/router/routes/pages/orglink'

import settings from '@/router/routes/pages/settings'
// User Details
import profile from '@/router/routes/pages/profile'

// Others
// eslint-disable-next-line import/no-cycle
import store from '@/store'
// import ability from './ability'

import drm from '@/router/routes/pages/projects/drm'
import other from './routes/others/other'

/* router.beforeEach((to, _, next) => {
  const isLoggedIn = isUserLoggedIn()

  if (!canNavigate(to)) {
    // Redirect to login if not logged in
    if (!isLoggedIn) return next({ name: 'login' })

    // If logged in => not authorized
    return next({ name: 'not-authorized' })
  }

  // Redirect if logged in
  if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    const userData = getUserData()
    next(getHomeRouteForLoggedInUser(userData ? userData.role : null))
  }

  return next()
}) */

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    ...assessment,
    ...home,
    ...auth,
    ...admin,
    ...sector,
    ...project,
    ...organization,
    ...caseAssignment,
    ...dashboard,
    ...followUp,
    ...geoSplit,
    ...inventory,
    ...monitoring,
    ...profile,
    ...referral,
    ...reports,
    ...settings,
    ...phonedirectory,
    ...regOrg,
    ...dtcls,
    ...other,
    ...drm,
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})
router.beforeEach(async (to, from, next) => {
  store.commit('app/LOAD_START')
  if (to.meta.resource === 'diasble') {
    return next({ name: 'login' })
  }
  if (to.meta.resource === 'notAuth') {
    return next()
  }
  const isLoggedIn = await isUserLoggedIn().catch(() => { next(false) })
  if (!canNavigate(to)) {
    // Redirect to login if not logged in
    if (!isLoggedIn) return next({ name: 'login' })
    // If logged in => not authorized
    return next({ name: 'dashboard' })
  }
  // Redirect if logged in
  if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    const userData = getUserData()
    return next(getHomeRouteForLoggedInUser(userData ? 'user' : null))
  }
  return next()
})
// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  store.commit('app/LOADING_DISABLE')
  store.commit('app/LOAD_STOP')
  // Remove initial loading
  /* const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  } */
})

export default router
