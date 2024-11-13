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
    { key: 'priority_level', label: 'Priority', sortable: true },
  ],
  selectedCase: [],
  // Case User
  selectedUserCase: [],
  /// Send to org
  showModalRef: { active: false },
  selectedOrgRef: [],
  orgList: [],
  ///
  usersValue: null,
  UsersOtions: [],
  // table
  userItem: [],
  userField: [
    // 'show_details',
    { key: 'full_name', label: 'Full Name' },
    { key: 'referral_name', label: 'Referral' },
    { key: 'cadastre_name', label: 'Cadaster' },
    {
      key: 'delete',
      label: 'Delete',
    },
  ],
}
