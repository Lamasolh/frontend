export default {
  saved: false,
  show: true,
  // Filters
  referral: null,
  district: null,
  municipality: null,
  rangedate: null,
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
  caseItem: [],
  caseField: [
    // 'show_details',
    { key: 'case_code', label: 'Case Code', sortable: true },
    { key: 'referral_name', label: 'Referral', sortable: true },
    { key: 'cadastre_name', label: 'Cadaster', sortable: true },
    { key: 'full_name', label: 'Full Name', sortable: true },
    { key: 'case_phone', label: 'Phone', sortable: true },
    { key: 'nationality_name', label: 'Nationality', sortable: true },
    { key: 'referral_date', label: 'Referral Date', sortable: true },
    {
      key: 'show_details',
      label: 'Show Details',
    },
    { key: 'priority_level', label: 'Priority', sortable: true },
    { key: 'com_inprogress', label: 'in Progress', sortable: true },
  ],
}
