export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/pages/auth/Login.vue'),
    meta: {
      title: 'Login',
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },
  /* {
    path: '/test',
    name: 'testMap',
    component: () => import('@/views/pages/testMap/TestMap.vue'),
    meta: {
      title: 'TestMap',
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  }, */
  {
    path: '/forgot-password',
    name: 'forget',
    component: () => import('@/views/pages/auth/ForgotPassword.vue'),
    meta: {
      title: 'Forget',
      layout: 'full',
      resource: 'notAuth',
    },
  },
  {
    path: '/reset-password',
    name: 'reset',
    component: () => import('@/views/pages/auth/ResetPassword.vue'),
    meta: {
      title: 'Reset',
      layout: 'full',
      resource: 'notAuth',
    },
  },
  {
    path: '/not-authorized',
    name: 'not-authorized',
    component: () => import('@/views/miscellaneous/NotAuthorized.vue'),
    meta: {
      resource: 'notAuth',
      layout: 'full',
    },
  },
  {
    path: '/change-admin',
    name: 'change-admin',
    component: () => import('@/views/pages/help-center/link/ChangeAdminLink.vue'),
    meta: {
      title: 'Change Admin',
      layout: 'full',
      resource: 'notAuth',
    },
  },
  {
    path: '/change-admin-email',
    name: 'change-admin-email',
    component: () => import('@/views/pages/help-center/link/ChangeAdminEmailLink.vue'),
    meta: {
      title: 'Change Admin Email',
      layout: 'full',
      resource: 'notAuth',
    },
  },
  {
    path: '/change-org-email',
    name: 'change-org-email',
    component: () => import('@/views/pages/help-center/link/ChangeOrgEmailLink.vue'),
    meta: {
      title: 'Change Org Email',
      layout: 'full',
      resource: 'notAuth',
    },
  },
]
