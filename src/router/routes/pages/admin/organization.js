export default [
  {
    path: '/organization',
    name: 'organization',
    component: () => import('@/views/pages/admin/org/Organization.vue'),
    meta: {
      title: 'Organization',
      pageTitle: 'Organization',
      resource: 'Organization',
      action: 'read',
      breadcrumb: [
        {
          text: 'Organization',
          active: true,
        },
      ],
    },
  },
]
