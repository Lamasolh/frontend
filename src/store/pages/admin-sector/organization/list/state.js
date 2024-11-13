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
  orgList: [],
  orgField: [
    {
      key: 'org',
      label: 'Organization',
    },
    { key: 'orgEmail', label: 'Email', sortable: true },
    { key: 'orgCad', label: 'Main Location', sortable: true },
    { key: 'orgType', label: 'Type', sortable: true },
    { key: 'is_donor', label: 'Donor', sortable: true },
    { key: 'orgStatus', label: 'Status', sortable: true },
    {
      key: 'show_details',
      label: 'Details',
    },
    {
      key: 'actions',
      label: 'Actions',
    },
  ],
}
