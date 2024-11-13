export default [
  {
    path: '/:prefixPrj/:prefixRole/details',
    name: 'drm_monitoring_details',
    component: () => import(
      '@/views/pages/drm/monitoring/details/MonitioringManage.vue'
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
    path: '/:prefixPrj/:prefixRole/projectGeoSPlit',
    name: 'projectGeoSPlit',
    component: () => import(
      '@/views/pages/drm/project_geo_split/ProjectSplitMain.vue'
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
    path: '/:prefixPrj/:prefixRole/details',
    name: 'drm_monitoring_details_ngo',
    component: () => import(
      '@/views/pages/drm/ngo/monitoring_ngo/view/MonitioringManage.vue'
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
]
