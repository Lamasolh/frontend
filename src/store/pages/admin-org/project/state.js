export default {
  saved: false,
  show: true,
  // Table Options
  perPage: 10, // Default View Pages
  pageOptions: [1, 10, 20, 30, 40, 50], // Number in Page
  currentPage: 1, // Current Page
  totalRows: 0,
  /// Sort
  sortBy: '', // Sort By Referral ...
  sortDesc: false, // Sort desc
  sortDirection: 'asc', // Sort Direction
  /// Filter
  filter: null,
  filterOn: [],
  // Table
  roleCategory: [],
  rolesItemOriginal: [],
  rolesItem: [],
  rolesField: [
    /* {
      key: 'user_name', label: 'Full Name ss', tdClass: 'full_name', stickyColumn: true,
    },

     { key: 'category', label: 'Role Category', class: 'role_category' },
    { key: 'referral_entry', label: 'Referral' },
    { key: 'case_assignment', label: 'Case Assignment' },
    { key: 'assessment', label: 'Assessment' },
    { key: 'link_assessment', label: 'Link Assessment' },
    { key: 'geo_split', label: 'Task Manager' },
    { key: 'inventory', label: 'Inventory' },
    { key: 'distributor', label: 'Distributor' },
    { key: 'awareness', label: 'Awareness' },
    { key: 'indicators', label: 'Indicators' },
    { key: 'monitoring', label: 'Monitoring' },
    { key: 'reporting', label: 'Reporting' }, */
  ],
  selectItem: [],
  // Table Data
  projectItem: [],
  projectField: [
    // 'show_details',
    { key: 'proj_name', label: 'Name', sortable: true },
    { key: 'proj_type_name', label: 'Type', sortable: true },
    { key: 'proj_status_name', label: 'Status', sortable: true },
    { key: 'org_name', label: 'Sector', sortable: true },
    { key: 'proj_date', label: 'Create Date', sortable: true },
    {
      key: 'show_details',
      label: 'Show Details',
    },
    {
      key: 'actions',
      label: 'Actions',
    },
  ],
  /// Search
  //
  typeOptions: [],
  cadOptions: [],
  /// Search
  governorate: null,
  district: null,
  municipality: null,
  type: {
    prefix: 'RSDNTL',
    title: 'Residential Lebanese',
    title_ar: 'سكني لبناني',
    value: 1,
  },
  orgMarker: [],
  infoWinOpen: false,

  /// AOI
  /// Setting

}
