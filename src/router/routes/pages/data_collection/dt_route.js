export default [
  {
    path: '/:prefixPrj/:prefixRole/GeoSplit',
    name: 'GeoDataCollection',
    component: () => import('@/views/pages/data_collection/geo_spilt_collect/GeoDataCollect.vue'),
    meta: route => ({
      title: route.params.title,
      resource: route.params.resource,
      action: route.params.action,
      breadcrumb: route.params.breadcrumb,
      active: route.params.active,
    }),
  },

  {
    path: '/:prefixPrj/:prefixRole/DataCollect',
    name: 'DataCollection',
    component: () => import('@/views/pages/data_collection/data_collection/DataCollect.vue'),
    meta: route => ({
      title: route.params.title,
      resource: route.params.resource,
      action: route.params.action,
      breadcrumb: route.params.breadcrumb,
      active: route.params.active,
    }),
  },
]
