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
  famMem: [

  ],
  exportField: {
    Code: 'code',
    Reference: 'reference',
    'UNHCR Code': 'unhcr_code',
    'National Code': 'national_code',
    Phone: 'phone',
    'House Hold': 'house_hold',
    'Previous Location': 'previous_location',
    'First Move': 'first_move',
    'created At': 'created_at',
    'Updated At': 'updated_at',
    'In RDMS': 'dispatch',
    active: 'actv',
  },
  itemsField: [
    // 'show_details',
    { key: 'code', label: 'SystemCode', sortable: true },
    { key: 'reference', label: 'Organization Code', sortable: true },
    { key: 'unhcr_code', label: 'UNHCR Code', sortable: true },
    { key: 'national_code', label: 'National Code', sortable: true },
    { key: 'phone', label: 'Phone', sortable: true },

    { key: 'house_hold_id', label: 'House Hold', sortable: true },
    { key: 'previous_location', label: 'Previous Location', sortable: true },
    { key: 'first_move', label: 'First Move', sortable: true },

    {
      key: 'tent', label: 'Tent', sortable: true, class: 'xlarge',
    },
    { key: 'created_at', label: 'Created At', sortable: true },
    { key: 'updated_at', label: 'Updated At', sortable: true },
    { key: 'dispatch', label: 'In RDMS', sortable: true },
    { key: 'active', label: 'Active', sortable: true },

    { key: 'action', label: 'Action' },
  ],
}
