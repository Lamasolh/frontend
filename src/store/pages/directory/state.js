export default {
  saved: false,
  show: false,
  /// Options
  typeOptions: [],
  cadOptions: [],
  issOptions: [],
  // Filters
  referral: null,
  district: null,
  governorate: null,
  type: null,
  iss: null,
  cadaster: null,
  orgType: null,
  orgStatus: null,
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
  /// List
  orgList: [],
  orgField: [
    {
      key: 'org',
      label: 'Organization',
    },
    { key: 'org_email', label: 'Email', sortable: true },
    { key: 'org_phone', label: 'Phone', sortable: true },
    { key: 'cad_id', label: 'Main Location', sortable: true },
    { key: 'org_type', label: 'Type', sortable: true },
    {
      key: 'show_details',
      label: 'Details',
    },
  ],
}
