export default [
  {
    path: '/phone-directory',
    name: 'phonedirectory',
    component: () => import('@/views/pages/phone-directory/PhoneDirectory.vue'),
    meta: {
      title: 'Phone Directory',
      action: 'read',
      resource: 'Home',
    },
  },
]
