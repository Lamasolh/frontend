export default [
  {
    path: '/sector',
    name: 'sector',
    component: () => import('@/views/pages/admin/sector/Sector.vue'),
    meta: {
      title: 'Sector',
      pageTitle: 'Sector',
      resource: 'Sector',
      action: 'read',
      breadcrumb: [
        {
          text: 'Sector',
          active: true,
        },
      ],
    },
  },
]
