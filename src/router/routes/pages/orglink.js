export default [
  {
    path: '/register',
    name: 'registerOrg',
    component: () => import('@/views/pages/organization/link/OrgLink.vue'),
    meta: {
      title: 'Register Organization',
      resource: 'Auth',
      notAuth: true,
      action: 'read',
      layout: 'full',
    },
  },
  {
    path: '/edit-organization',
    name: 'EditOrg',
    component: () => import('@/views/pages/organization/edit/OrgEdit.vue'),
    meta: {
      title: 'Edit Organization',
      resource: 'EDTORG',
      action: 'read',
    },
  },
]
