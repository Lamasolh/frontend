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
  exportField: {
    Code: 'code',
    Reference: 'reference',
    'UNHCR Code': 'unhcr_code',
    Status: 'status',
    Type: 'type',
    'created At': 'created_at',
    'Updated At': 'updated_at',
    'In RDMS': 'dispatch',
    Active: 'actv',
  },
  itemsField: [
    // 'show_details',
    {
      key: 'code', label: 'SystemCode', stickyColumn: true,
    },
    { key: 'reference', label: 'Organization Code', sortable: true },
    { key: 'un_code', label: 'UNHCR Code', sortable: true },
    { key: 'status_id', label: 'Status', sortable: true },
    { key: 'water_source_type_id', label: 'Type', sortable: true },

    { key: 'dispatched', label: 'In RDMS', sortable: true },
    { key: 'created_at', label: 'Created Date', sortable: true },
    { key: 'updated_at', label: 'Updated Date', sortable: true },
    { key: 'active', label: 'Active', sortable: true },

    { key: 'action', label: 'Action' },
  ],
}
