export default {
  saved: false,
  show: false,
  isInView: false,
  /// Filter
  orgStatus: null,
  governorate: null,
  district: null,
  municipality: null,
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
  filter: '',
  filterOn: [],
  /// List
  selectItem: [],
  orgList: [],
  orgField: [
    {
      key: 'org',
      label: 'Organization',
    },
    { key: 'orgType', label: 'Type', sortable: true },
    { key: 'data_entry', label: 'Is Entry', sortable: true },

  ],
}
