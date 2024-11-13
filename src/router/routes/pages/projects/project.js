export default [
  {
    path: '/:prefixPrj/feedback',
    name: 'feedback',
    component: () => import('@/views/pages/feedback/FeedBack.vue'),
    meta: {
      title: 'Feedback',
      resource: 'Auth',
      notAuth: true,
      action: 'read',
      layout: 'full',
      isRTL: true,
    },
  },
  // Prj
  {
    path: '/:prefixPrj/:prefixRole',
    name: 'project',
    component: () => import('@/views/pages/project/ProjectMain.vue'),
    meta: route => ({
      title: route.params.title,
      resource: route.params.resource,
      action: route.params.action,
      breadcrumb: route.params.breadcrumb,
      active: route.params.active,
    }),
  },
  {
    path: '/:prefixPrj/:prefixRole/Tools',
    name: 'projectTools',
    component: () => import('@/views/pages/project/ProjectTools.vue'),
    meta: route => ({
      title: route.params.title,
      resource: route.params.resource,
      action: route.params.action,
      breadcrumb: route.params.breadcrumb,
      active: route.params.active,
      tools: route.params.tools,
    }),
  },
  {
    path: '/:prefixPrj/:prefixRole/View',
    name: 'projectViews',
    component: () => import('@/views/pages/follow-up/follow-up-wiz/FollowUpWizard.vue'),
    meta: route => ({
      action: route.params.action,
      breadcrumb: route.params.breadcrumb,
      active: route.params.active,
      title: route.params.title,
      resource: route.params.resource,
      value: route.params.value,
    }),
  },
  {
    path: '/:prefixPrj/:prefixRole/View',
    name: 'projectViewsCLR',
    component: () => import(
      '@/views/pages/follow-up-clr/follow-up-wiz/FollowUpWizard.vue'
    ),
    meta: route => ({
      action: route.params.action,
      breadcrumb: route.params.breadcrumb,
      active: route.params.active,
      title: route.params.title,
      resource: route.params.resource,
      value: route.params.value,
    }),
  },
  {
    path: '/:prefixPrj/:prefixRole/ViewConf',
    name: 'projectViewsConf',
    component: () => import(
      '@/views/pages/follow-up-conf/follow-up-wiz/FollowUpWizard.vue'
    ),
    meta: route => ({
      action: route.params.action,
      breadcrumb: route.params.breadcrumb,
      active: route.params.active,
      title: route.params.title,
      resource: route.params.resource,
      value: route.params.value,
    }),
  },
  // Prj
  {
    path: '/:prefixPrj/:prefixRole/Edit',
    name: 'projectEdit',
    component: () => import('@/views/pages/project/ProjectEdit.vue'),
    meta: route => ({
      action: route.params.action,
      breadcrumb: route.params.breadcrumb,
      active: route.params.active,
      title: route.params.title,
      resource: route.params.resource,
      value: route.params.value,
    }),
  },
  {
    path: '/:prefixPrj/:prefixRole/View',
    name: 'LinkViews',
    component: () => import('@/views/pages/link/LinkFollow.vue'),
    meta: route => ({
      action: route.params.action,
      breadcrumb: route.params.breadcrumb,
      active: route.params.active,
      title: route.params.title,
      resource: route.params.resource,
      value: route.params.value,
    }),
  },
  {
    path: '/:prefixPrj/:prefixRole/Indicator',
    name: 'projectIndicatorsList',
    component: () => import('@/views/pages/indicators/IndicatorsPage.vue'),
    meta: route => ({
      action: route.params.action,
      breadcrumb: route.params.breadcrumb,
      active: route.params.active,
      title: route.params.title,
      resource: route.params.resource,
      value: route.params.value,
    }),
  },
  {
    path: '/:prefixPrj/:prefixRole/IndicatorView',
    name: 'projectIndicators',
    component: () => import(
      '@/views/pages/indicators/indicators-view/IndicatorsView.vue'
    ),
    meta: route => ({
      action: route.params.action,
      breadcrumb: route.params.breadcrumb,
      active: route.params.active,
      title: route.params.title,
      resource: route.params.resource,
      value: route.params.value,
    }),
  },

  {
    path: '/:prefixPrj/:prefixRole/Awareness',
    name: 'projectAwareness',
    component: () => import('@/views/pages/awareness/awareness-view/AwarenessView.vue'),
    meta: route => ({
      action: route.params.action,
      breadcrumb: route.params.breadcrumb,
      active: route.params.active,
      title: route.params.title,
      resource: route.params.resource,
      value: route.params.value,
    }),
  },
  {
    path: '/:prefixPrj/:prefixRole/data-entry',
    name: 'projectFullData',
    component: () => import('@/views/pages/project/ProjectFull.vue'),
    meta: route => ({
      action: route.params.action,
      breadcrumb: route.params.breadcrumb,
      active: route.params.active,
      title: route.params.title,
      resource: route.params.resource,
      value: route.params.value,
    }),
  },
  /// Menu
  {
    path: '/:prefixPrj/:prefixRole',
    name: 'menu',
    component: () => import('@/views/pages/project/MenuMain.vue'),
    meta: {
      action: 'read',
    },
    /* meta: route => ({
      title: route.params.title,
      resource: route.params.resource,
      action: route.params.action,
      breadcrumb: route.params.breadcrumb,
      active: route.params.active,
    }), */
  },
  {
    path: '/:prefixPrj/:prefixRole',
    name: 'dtxmenu',
    component: () => import('@/views/pages/project/MenuDTX.vue'),
    meta: {
      action: 'read',
    },
    /* meta: route => ({
      title: route.params.title,
      resource: route.params.resource,
      action: route.params.action,
      breadcrumb: route.params.breadcrumb,
      active: route.params.active,
    }), */
  },
  {
    path: '/:prefixPrj/:prefixRole/View',
    name: 'menuViews',
    component: () => import('@/views/pages/project/MenuView.vue'),
    meta: route => ({
      action: route.params.action,
      breadcrumb: route.params.breadcrumb,
      active: route.params.active,
      title: route.params.title,
      resource: route.params.resource,
      value: route.params.value,
    }),
  },
  {
    path: '/:prefixPrj/:prefixRole/AOI',
    name: 'menuAOI',
    component: () => import('@/views/pages/project/MenuAOI.vue'),
    meta: route => ({
      action: route.params.action,
      breadcrumb: route.params.breadcrumb,
      active: route.params.active,
      title: route.params.title,
      resource: route.params.resource,
      value: route.params.value,
    }),
  },
  {
    path: '/:prefixPrj/:prefixRole/PMSetting',
    name: 'menuPM',
    component: () => import('@/views/pages/project/MenuPM.vue'),
    meta: route => ({
      action: route.params.action,
      breadcrumb: route.params.breadcrumb,
      active: route.params.active,
      title: route.params.title,
      resource: route.params.resource,
      value: route.params.value,
    }),
  },
  {
    path: '/:prefixPrj/:prefixRole/Settings',
    name: 'menuSetting',
    component: () => import('@/views/pages/project/MenuSetting.vue'),
    meta: route => ({
      action: route.params.action,
      breadcrumb: route.params.breadcrumb,
      active: route.params.active,
      title: route.params.title,
      resource: route.params.resource,
      value: route.params.value,
    }),
  },
  {
    path: '/:prefixPrj/:prefixRole/Add',
    name: 'menuAdd',
    component: () => import('@/views/pages/project/MenuView.vue'),
    meta: route => ({
      action: route.params.action,
      breadcrumb: route.params.breadcrumb,
      active: route.params.active,
      title: route.params.title,
      resource: route.params.resource,
      value: route.params.value,
    }),
  },
  {
    path: '/:prefixPrj/:prefixRole/Edit',
    name: 'menuEdit',
    component: () => import('@/views/pages/project/MenuEdit.vue'),
    meta: route => ({
      action: route.params.action,
      breadcrumb: route.params.breadcrumb,
      active: route.params.active,
      title: route.params.title,
      resource: route.params.resource,
      value: route.params.value,
    }),
  },
  {
    path: '/:prefixPrj/:prefixRole/Entry',
    name: 'menuEntry',
    component: () => import('@/views/pages/admin/project/project-entry/OrgList.vue'),
    meta: route => ({
      action: route.params.action,
      breadcrumb: route.params.breadcrumb,
      active: route.params.active,
      title: route.params.title,
      resource: route.params.resource,
      value: route.params.value,
    }),
  },
  {
    path: '/:prefixPrj/:prefixRole/Search',
    name: 'menuSearch',
    component: () => import('@/views/pages/project/MenuSearch.vue'),
    meta: route => ({
      action: route.params.action,
      breadcrumb: route.params.breadcrumb,
      active: route.params.active,
      title: route.params.title,
      resource: route.params.resource,
      value: route.params.value,
    }),
  },
  {
    path: '/:prefixPrj/:prefixRole/Import',
    name: 'importGeosplit',
    component: () => import(
      '@/views/pages/admin/project/project_import/project_import.vue'
    ),
    meta: route => ({
      action: route.params.action,
      breadcrumb: route.params.breadcrumb,
      active: route.params.active,
      title: route.params.title,
      resource: route.params.resource,
      value: route.params.value,
    }),
  },
  {
    path: '/:prefixPrj/:prefixRole/ImportWtr',
    name: 'importGeosplitWtr',
    component: () => import(
      '@/views/pages/admin/project/project_import_wtr/project_import.vue'
    ),
    meta: route => ({
      action: route.params.action,
      breadcrumb: route.params.breadcrumb,
      active: route.params.active,
      title: route.params.title,
      resource: route.params.resource,
      value: route.params.value,
    }),
  },
  {
    path: '/:prefixPrj/:prefixRole/GeoSplit',
    name: 'menuCad',
    component: () => import(
      '@/views/pages/admin/project/project-manage/ManageProject.vue'
    ),
    meta: route => ({
      action: route.params.action,
      breadcrumb: route.params.breadcrumb,
      active: route.params.active,
      title: route.params.title,
      resource: route.params.resource,
      value: route.params.value,
    }),
  },
  {
    path: '/:prefixPrj/:prefixRole/:step',
    name: 'menuWizard',
    component: () => import('@/views/pages/project/MenuView.vue'),
    meta: route => ({
      action: route.params.action,
      breadcrumb: route.params.breadcrumb,
      active: route.params.active,
      title: route.params.title,
      resource: route.params.resource,
      value: route.params.value,
    }),
  },
]
