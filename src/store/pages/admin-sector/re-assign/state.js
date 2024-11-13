export default {
  saved: false,
  show: true,
  //
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
  //
  isAssignSidebarActive: false,
  // Data
  caseItem: [],
  caseField: [
    // 'show_details',
    { key: 'selected', label: 'Selected' },
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
    {
      key: 'show_map',
      label: 'Show Map',
    },
    { key: 'priority_level', label: 'Priority', sortable: true },
  ],
  selectedCase: [],
  /// Send to org
  showModalRef: { active: false },
  selectedOrgRef: [],
  orgList: [],
  centerMap: { lat: 33.8547, lng: 35.8623, zoom: 8 },

}
