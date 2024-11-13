export default [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/pages/dashboard/Dashboard.vue'),
    meta: {
      title: 'Welcome to RDMS',
      pageTitle: 'Dashboard',
      resource: 'Home',
      action: 'read',
      breadcrumb: [
        {
          text: 'Dashboard',
          active: false,
          to: '/',
        },
      ],
    },
  },
]
