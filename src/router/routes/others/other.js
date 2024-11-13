export default [
  {
    path: '/soon',
    name: 'soon',
    component: () => import('@/views/miscellaneous/ComingSoon.vue'),
    meta: {
      title: 'Coming Soon',
      diasble: true,
      resource: 'Auth',
      layout: 'full',
    },
  },
  {
    path: '/maintenance',
    name: 'maintenance',
    component: () => import('@/views/miscellaneous/UnderMaintenance.vue'),
    meta: {
      title: 'Maintenance',
      resource: 'Auth',
      diasble: true,
      layout: 'full',
    },
  },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/miscellaneous/Error.vue'),
    meta: {
      title: 'Error 404 :(',
      layout: 'full',
      notAuth: true,
    },
  },
  /// /
  {
    path: '/faq',
    name: 'faq',
    component: () => import('@/views/pages/faq/Faq.vue'),
    meta: {
      title: 'faq',
      resource: 'Home',
      action: 'read',
    },
  },
  {
    path: '/Knowledge-base',
    name: 'knowledge',
    component: () => import('@/views/pages/Knowledge-base/KnowledgeBase.vue'),
    meta: {
      title: 'knowledge',
      resource: 'Home',
      action: 'read',
    },
  },
]
