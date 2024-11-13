export default {
  saved: false,
  show: true,
  ///
  govOptions: [],
  disOptions: [],
  cadOptions: [],
  // Filters
  referral: null,
  district: null,
  governorate: null,
  type: 4,
  iss: null,
  cadaster: null,
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
  itemsField: [
    // 'show_details',
    {
      key: 'p_code', label: 'P-Code', sortable: true, class: 'medium',
    },
    {
      key: 'is_name', label: 'ISs Name', stickyColumn: true, class: 'large',
    },
    { key: 'family_count', label: 'Family Count', sortable: true },
    { key: 'latren_count', label: 'Latrine Count', sortable: true },
    { key: 'member_count', label: 'Memnber Count', sortable: true },
    { key: 'pit_count', label: 'Pit Count', sortable: true },
    { key: 'tanks_count', label: 'Tank Count', sortable: true },
    { key: 'tent_count', label: 'Tent Count', sortable: true },
    { key: 'water_source_count', label: 'WaterSource Count', sortable: true },
    { key: 'rdms', label: 'TO RDMS' },
    { key: 'edit', label: 'Edit' },
    // { key: 'status', label: 'Status', sortable: true },

  ],
}
