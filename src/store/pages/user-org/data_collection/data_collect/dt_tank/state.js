export default {
  saved: false,
  show: false,
  // Table Options
  perPage: 10, // Default View Pages
  pageOptions: [1, 10, 20, 30, 40, 50, 100, 200, 300, 400, 500], // Number in Page
  currentPage: 1, // Current Page
  totalRows: 0,
  /// Sort
  sortBy: '', // Sort By Referral ...
  sortDesc: false, // Sort desc
  sortDirection: 'asc', // Sort Direction
  /// Filter
  filter: null,
  filterOn: [],

  // Data
  items: [

  ],
  itemsTnkWtr: [

  ],
  exportField: {
    Code: 'code',
    Reference: 'reference',
    'UNHCR Code': 'uncode',
    Status: 'status',
    Capacity: 'capacity',
    'Installed By': 'installed_by',
    'Installed Date': 'received_date',
    'For Cooking': 'forcooking',
    'For Drinking': 'fordrinking',
    'For Domestic': 'fordomestic',
    'For Hygiene': 'forhygiene',
    'created At': 'created_at',
    'Updated At': 'updated_at',
    'In RDMS': 'dispatch',
    Active: 'actv',
  },
  itemsField: [
    // 'show_details',
    { key: 'code', label: 'SystemCode', sortable: true },
    { key: 'reference', label: 'Organization Code', sortable: true },
    { key: 'tank_status_id', label: 'Status', sortable: true },
    { key: 'capacity', label: 'Capacity', sortable: true },
    { key: 'installed_by_id', label: 'Installed By', sortable: true },
    { key: 'received_date', label: 'Installed Date', sortable: true },
    { key: 'for_cooking', label: 'For Cooking', sortable: true },
    { key: 'for_drinking', label: 'For Drinking', sortable: true },
    { key: 'for_domestic', label: 'For Domestic', sortable: true },
    { key: 'for_hygiene', label: 'For Hygiene', sortable: true },
    { key: 'created_at', label: 'Created At', sortable: true },
    { key: 'updated_at', label: 'Updated At', sortable: true },
    { key: 'dispatched', label: 'In RDMS', sortable: true },
    { key: 'active', label: 'Active', sortable: true },
    { key: 'action', label: 'Action' },
  ],
}
