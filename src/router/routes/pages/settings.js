export default [
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/pages/settings/Settings.vue'),
    meta: {
      title: 'Settings',
      pageTitle: 'Settings',
      resource: 'Settings',
      action: 'read',
      breadcrumb: [
        {
          text: 'Settings',
          active: true,
        },
      ],
    },
  },
]
