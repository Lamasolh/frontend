export default [
  {
    title: 'Home',
    route: 'dashboard',
    icon: 'HomeIcon',
    resource: 'Home',
    action: 'read',
  },
  {
    header: 'IPC',
    icon: 'FileIcon',
    children: [
      {
        title: 'Referral Entry',
        route: 'referral-entry',
        icon: 'FileIcon',
      },
      {
        title: 'Case Assigment',
        route: 'case-assignment',
        icon: 'FileIcon',
      },
      {
        title: 'Follow Up',
        route: 'follow-up',
        icon: 'FileIcon',
      },
      {
        title: 'GeoSplit',
        route: 'geo-split',
        icon: 'MapIcon',
      },
      {
        title: 'Inventory',
        route: 'inventory',
        icon: 'InboxIcon',
      },
      {
        title: 'Monitoring',
        route: 'monitoring',
        icon: 'MonitorIcon',
      },
      {
        title: 'Reports',
        route: 'reports',
        icon: 'ReportsIcon',
      },
    ],
  },
  {
    title: 'Admin',
    route: 'admin',
    icon: 'UserIcon',
  },
  {
    title: 'Settings',
    route: 'settings',
    icon: 'SettingsIcon',
  },
]
