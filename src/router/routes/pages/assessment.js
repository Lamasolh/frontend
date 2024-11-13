export default [
  {
    path: '/:prefixPrj/entry',
    name: 'assessment',
    component: () => import('@/views/pages/project/Entry.vue'), // import('@/views/pages/assessment/Assmnt.vue'),
    meta: {
      title: 'Assessment',
      resource: 'notAuth',
      notAuth: true,
      action: 'read',
      layout: 'full',
      isRTL: true,
    },
  },
  {
    path: '/:prefixPrj/:prefixRole/importExcel',
    name: 'EntryimportExcel',
    component: () => import('@/views/pages/referral-max/ImportExcel.vue'),
    meta: route => ({
      title: 'Import Excel',
      resource: route.params.resource,
      action: 'read',
      action: route.params.action,
      breadcrumb: route.params.breadcrumb,
      active: route.params.active,
      value: route.params.value,
    }),
  },
  {
    path: '/excel',
    name: 'excel',
    component: () => import('@/views/pages/upload/Upload.vue'), // import('@/views/pages/assessment/Assmnt.vue'),
    meta: {
      title: 'Assessment',
      resource: 'notAuth',
      notAuth: true,
      action: 'read',
      layout: 'full',
    },
  },
  {
    path: '/excelClr',
    name: 'excelClr',
    component: () => import('@/views/pages/upload/UploadCLR.vue'), // import('@/views/pages/assessment/Assmnt.vue'),
    meta: {
      title: 'Assessment',
      resource: 'notAuth',
      notAuth: true,
      action: 'read',
      layout: 'full',
    },
  },
]
