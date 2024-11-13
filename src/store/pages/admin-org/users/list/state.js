export default {
  saved: false,
  show: true,
  // Filters
  job: null,
  status: null,
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
  // Table Data
  userItem: [],
  userField: [
    // 'show_details',
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'phone', label: 'Phone', sortable: true },
    { key: 'nationality_name', label: 'Nationality', sortable: true },
    { key: 'date_of_birth', label: 'DOB', sortable: true },
    { key: 'job_title_en', label: 'Job', sortable: true },
    { key: 'usr_stat_name', label: 'Status', sortable: true },
    {
      key: 'show_details',
      label: 'Show Details',
    },
  ],
}
