export default [
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/pages/account-setting/AccountSetting.vue'),
    meta: {
      title: 'Profile',
      resource: 'Profile',
      action: 'read',
      pageTitle: 'Profile',
      breadcrumb: [
        {
          text: 'User Profile',
          active: true,
        },
      ],
    },
  },
]
