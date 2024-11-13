export default {
  saved: false,
  show: true,
  showEnd: false,
  endItem: null,
  showEdit: false,
  editItem: null,
  ///
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

    { key: 'p_code', label: 'Code', sortable: true },
    { key: 'is_name_ar', label: 'Arabic Name', sortable: true },
    { key: 'is_name', label: 'School Name', sortable: true },
    { key: 'show_details', label: 'ShowDetails' },
    { key: 'delete', label: 'End Case', sortable: true },

  ],
  selectedCase: [],
  // Case User
  selectedUserCase: [],
  ///
  /// Send to org
  showModalRef: { active: false, items: null },
  selecteduser: [],
  userList: [],
  //
  centerMap: { lat: 33.8547, lng: 35.8623, zoom: 8 },
  usersValue: null,
  UsersOtions: [],
  // table
  userItem: [],
  userField: [
    // 'show_details',
    { key: 'p_code', label: 'Code', sortable: true },
    { key: 'is_name_ar', label: 'Arabic Name', sortable: true },
    { key: 'is_name', label: 'School Name', sortable: true },
    {
      key: 'show_details',
      label: 'ShowDetails',
    },
    {
      key: 'delete',
      label: 'Del',
    },
  ],
  /// / Table Filtered
  itemTable: [],

  optionsngo: [],
  optionsdrm: [],
  selectNgo: null,
  selectedDRM: null,

}
