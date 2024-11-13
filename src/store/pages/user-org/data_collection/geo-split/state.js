export default {
  saved: false,
  show: true,

  ///
  typeOptions: [],
  cadOptions: [],
  issOptions: [],
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
}
