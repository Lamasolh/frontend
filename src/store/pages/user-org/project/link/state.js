export default {
  saved: false,
  show: true,
  //
  referralOptions: [],
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
  rangedate: null,
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
  // Table Data
  caseItem: [],
  caseField: [
    {
      key: 'show_map',
      label: 'Show Map',
    },
    // 'show_details',
    { key: 'case_code', label: 'C-Code', sortable: true },
    { key: 'referral_name', label: 'Referral', sortable: true },
    { key: 'cadastre_name', label: 'Cad.', sortable: true },
    { key: 'full_name', label: 'Name', sortable: true },
    { key: 'case_phone', label: 'Phone', sortable: true },
    { key: 'nationality_name', label: 'NAT', sortable: true },
    { key: 'pcr_duration', label: 'Duration', sortable: true },
    {
      key: 'show_details',
      label: 'Status',
    },
    { key: 'com_status', label: 'FollowUp Comment', sortable: true },
    { key: 'priority_level', label: 'Priority', sortable: true },
    { key: 'com_inprogress', label: 'Progress', sortable: true },
    { key: 'active', label: 'Link', sortable: true },
  ],
  centerMap: { lat: 33.8547, lng: 35.8623, zoom: 8 },
}
