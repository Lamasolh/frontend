/* eslint-disable no-return-await */
import store from '@/store'

// eslint-disable-next-line import/prefer-default-export
// export const nav = async () =>
export default store.getters['nav/navList']
/* [
  {
    title: 'Dashboard',
    route: 'dashboard',
    icon: 'HomeIcon',
  },
  {
    title: 'IPC',
    icon: 'ArchiveIcon',
    children: [
      {
        title: 'Referral Entry',
        children: [
          {
            title: 'Referral Entry',
            route: 'referral-entry',
          },
          {
            title: 'Urgent Case',
            route: 'referral-entry',
          },
        ],
      },
      {
        title: 'Case Assigment',
        route: 'case-assignment',
      },
      {
        title: 'Follow Up',
        route: 'follow-up',
      },
      {
        title: 'GeoSplit',
        route: 'geo-split',
      },
      {
        title: 'Inventory',
        route: 'inventory',
      },
      {
        title: 'Monitoring',
        route: 'monitoring',
      },
      {
        title: 'Reports',
        route: 'reports',
      },
    ],
  },
  {
    title: 'ER Project',
    icon: 'ArchiveIcon',
    children: [
      {
        title: 'Referral Entry',
        children: [
          {
            title: 'Referral Entry',
          },
          {
            title: 'Urgent Case',
          },
        ],
      },
      {
        title: 'Case Assigment',
      },
      {
        title: 'Follow Up',
      },
      {
        title: 'GeoSplit',
      },
      {
        title: 'Inventory',
      },
      {
        title: 'Monitoring',
      },
      {
        title: 'Reports',
      },
    ],
  },
  {
    title: 'Admin',
    icon: 'UserIcon',
    children: [
      {
        title: 'Sector',
        route: 'sector',
      },
      {
        title: 'Organization',
        route: 'organization',
      },
      {
        title: 'Admin',
        route: 'admin',
      },
    ],
  },
  {
    title: 'Settings',
    route: 'settings',
    icon: 'SettingsIcon',
  },
]
*/
