export default [
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/pages/admin/Admin.vue'),
    meta: {
      title: 'Admin',
      pageTitle: 'Admin',
      resource: 'Admin',
      action: 'read',
      breadcrumb: [
        {
          text: 'Admin',
          active: true,
        },
      ],
    },
  },
  {
    path: '/user-sys',
    name: 'usermanager-sys',
    component: () => import('@/views/pages/admin/Admin.vue'),
    meta: {
      title: 'User Manager',
      pageTitle: 'User Manager',
      resource: 'user-manager',
      action: 'read',
      breadcrumb: [
        {
          text: 'User Manager',
          active: true,
        },
      ],
    },
  },
  {
    path: '/setting-sys',
    name: 'setting-sys',
    component: () => import('@/views/pages/admin/Admin.vue'),
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
  {
    path: '/add-org',
    name: 'add-org',
    component: () => import('@/views/pages/admin/Admin.vue'),
    meta: {
      title: 'Add Organization',
      pageTitle: 'Add Organization',
      resource: 'add-org',
      action: 'read',
      breadcrumb: [
        {
          text: 'Add Organization',
          active: true,
        },
      ],
    },
  },
  {
    path: '/add-project',
    name: 'add-project',
    component: () => import('@/views/pages/admin/Admin.vue'),
    meta: {
      title: 'Add Project',
      pageTitle: 'Add Project',
      resource: 'add-project',
      action: 'read',
      breadcrumb: [
        {
          text: 'Add Project',
          active: true,
        },
      ],
    },
  },
  /* {
    path: '/addeditproject/',
    name: 'addeditproject',
    component: () => import('@/views/pages/admin/project/project-wizard/projectwizards.vue'),
    meta: {
      title: 'addeditproject',
      resource: 'addeditproject',
      action: 'read',
      isRTL: false,
    },
  }, */
  {
    path: '/projectslist/',
    name: 'projectslist',
    component: () => import('@/views/pages/admin/project/projects.vue'),
    meta: {
      title: 'projectslist',
      pageTitle: 'projectslist',
      resource: 'projectslist',
      action: 'read',
      breadcrumb: [
        {
          text: 'projectslist',
          active: true,
        },
      ],
    },
  },
  {
    path: '/manageproject/',
    name: 'manageproject',
    component: () => import('@/views/pages/admin/project/project-manage/ManageProject.vue'),
    meta: {
      title: 'manageproject',
      resource: 'manageproject',
      action: 'read',
      isRTL: false,
    },
  },
  {
    path: '/prj-setting',
    name: 'prj-setting',
    component: () => import('@/views/pages/admin/Admin.vue'),
    meta: {
      title: 'Project Settings',
      pageTitle: 'Project Settings',
      resource: 'prj-setting',
      action: 'read',
      breadcrumb: [
        {
          text: 'Project Settings',
          active: true,
        },
      ],
    },
  },
  {
    path: '/monit-sec',
    name: 'monit-sec',
    component: () => import('@/views/pages/admin/Admin.vue'),
    meta: {
      title: 'Monitoring',
      pageTitle: 'Monitoring',
      resource: 'monit-sec',
      action: 'read',
      breadcrumb: [
        {
          text: 'Monitoring',
          active: true,
        },
      ],
    },
  },
  {
    path: '/report-sec',
    name: 'report-sec',
    component: () => import('@/views/pages/admin/Admin.vue'),
    meta: {
      title: 'Reports',
      pageTitle: 'Reports',
      resource: 'report-sec',
      action: 'read',
      breadcrumb: [
        {
          text: 'Reports',
          active: true,
        },
      ],
    },
  },
  {
    path: '/usermanager-sec',
    name: 'usermanager-sec',
    component: () => import('@/views/pages/admin/Admin.vue'),
    meta: {
      title: 'User Manager',
      pageTitle: 'User Manager',
      resource: 'usermanager-sec',
      action: 'read',
      breadcrumb: [
        {
          text: 'User Manager',
          active: true,
        },
      ],
    },
  },
  {
    path: '/usermanager-org',
    name: 'usermanager-org',
    component: () => import('@/views/pages/admin/Admin.vue'),
    meta: {
      title: 'User Manager',
      pageTitle: 'User Manager',
      resource: 'usermanager-org',
      action: 'read',
      breadcrumb: [
        {
          text: 'User Manager',
          active: true,
        },
      ],
    },
  },
  {
    path: '/setting-org',
    name: 'setting-org',
    component: () => import('@/views/pages/admin/Admin.vue'),
    meta: {
      title: 'Settings',
      pageTitle: 'Settings',
      resource: 'setting-org',
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
