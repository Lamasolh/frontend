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
  itemsTank: [

  ],
  itemsFam: [

  ],
  itemsLat: [

  ],
  itemsPit: [

  ],
  exportField: {
    Code: 'code',
    Reference: 'reference',
    'UNHCR Code': 'unhcr_code',
    Status: 'status',
    Type: 'type',
    MaxCap: 'max_cap',
    Address: 'address',
    'Tank Codes': 'tank_code_ex',
    'Tank Ref': 'tank_ref_ex',
    'No Tank': 'no_tank',
    'Latrines Codes': 'latrine_code_ex',
    'Latrines Ref': 'latrine_ref_ex',
    'Pits Codes': 'pit_code_ex',
    'Pits Ref': 'pit_ref_ex',
    'Family Codes': 'family_code_ex',
    'Family Ref': 'family_ref_ex',
    'created At': 'created_at',
    'Updated At': 'updated_at',
    'In RDMS': 'dispatch',
    Active: 'actv',
  },
  itemsField: [
    // 'show_details',
    { key: 'code', label: 'SystemCode', stickyColumn: true },
    { key: 'reference', label: 'Organization Code', sortable: true },
    { key: 'unhcr_code', label: 'UNHCR Code', sortable: true },
    { key: 'tent_status_id', label: 'Status', sortable: true },
    { key: 'tent_type', label: 'Type', sortable: true },
    { key: 'size', label: 'Size', sortable: true },
    { key: 'max_cap', label: 'MaxCapacity', sortable: true },
    { key: 'location', label: 'Location', sortable: true },
    { key: 'address', label: 'Address', sortable: true },
    { key: 'tank_code', label: 'Tank Codes', sortable: true },
    { key: 'tank_ref', label: 'Tank Ref', sortable: true },
    { key: 'no_tank', label: 'No tank', sortable: true },
    { key: 'latrine_code', label: 'Latrines Codes', sortable: true },
    { key: 'latrine_ref', label: 'Latrines Ref', sortable: true },
    { key: 'pit_code', label: 'Pits Codes', sortable: true },
    { key: 'pit_ref', label: 'Pits Ref', sortable: true },
    { key: 'family_code', label: 'Family Codes', sortable: true },
    { key: 'family_ref', label: 'Family Ref', sortable: true },
    { key: 'created_at', label: 'Created At', sortable: true },
    { key: 'updated_at', label: 'Updated At', sortable: true },
    { key: 'dispatched', label: 'In RDMS', sortable: true },
    { key: 'active', label: 'Active', sortable: true },
    { key: 'action', label: 'Action' },
  ],

}
