export default {
  show: false,
  saved: false,
  ///
  cycleduration: null,
  modularity: null,
  pd: null,
  cycleOP: [],
  ///
  isAssignSidebarActive: false,
  isAssignSidebarActiveADD: false,

  showModalIss: { active: false },

  showModalSupLook: { active: false },
  showModalSupAcceptLook: { active: false },

  showModalDonorLook: { active: false },
  showModalDonorAcceptLook: { active: false },

  ///
  cadOptions: [],
  district: null,
  governorate: null,
  ///
  isAssignSidebarActiveDon: false,
  isAssignSidebarActiveADDDon: false,

  ///
  isAssignSidebarActivePD: false,
  isAssignSidebarActiveADDPD: false,

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
  ///
  itemField: [
    {
      key: 'cadastre_name', label: 'Cadaster', sortable: true, class: 'iss',
    },
    {
      key: 'info', label: 'Info', sortable: true, class: 'sup',
    },
    { key: 'edit', label: 'Edit', class: 'action' },

  ],
  items: [],

  /// Supplier List
  itemFieldSUP: [
    { key: 'prefix', label: 'Supplier Prefix', sortable: true },
    { key: 'name', label: 'Supplier Name', sortable: true },
  ],

  itemsSUP: [],

  /// Supplier Add
  supOrgName: null,
  supPrefix: null,
  supGovId: null,
  supdisId: null,
  supCadId: null,
  supPhone: null,
  supEmail: null,
  supFirstName: null,
  supLastName: null,
  supUsername: null,
  supPassword: '123456789',
  lookupSupId: null,
  lookupSupPhone: null,

  /// Donor List
  itemFieldDON: [
    { key: 'prefix', label: 'Donor Prefix', sortable: true },
    { key: 'name', label: 'Donor Name', sortable: true },
  ],
  itemsDON: [],

  /// Donor Add
  donOrgName: null,
  donPrefix: null,
  donGovId: null,
  dondisId: null,
  donCadId: null,
  donPhone: null,
  donEmail: null,
  donFirstName: null,
  donLastName: null,
  donUsername: null,
  donPassword: null,

  lookupDonorId: null,
  lookupDonorPhone: null,
  /// PD List
  itemFieldPD: [
    { key: 'name', label: 'PD Name', sortable: true },
    { key: 'code', label: 'PD Code', sortable: true },
    { key: 'donor', label: 'Donor', sortable: true },
    { key: 'tag', label: 'PD Tag', sortable: true },
  ],
  itemsPD: [],

  /// PD Add
  PDName: null,
  PDCode: null,
  PDtag: null,
  PDDonor: null,
}
