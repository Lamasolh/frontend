export default {
  saved: false,
  show: false,

  // Table Options
  perPage: 10, // Default View Pages
  pageOptions: [1, 10, 20, 30, 40, 50, 100, 200, 300, 400, 500, 1000], // Number in Page
  currentPage: 1, // Current Page
  totalRows: 0,

  tab: 0,
  /// Sort
  sortBy: '', // Sort By Referral ...
  sortDesc: false, // Sort desc
  sortDirection: 'asc', // Sort Direction
  /// Filter
  filter: null,
  filterOn: [],
  filterTent: null,
  filterOnTent: [],
  // Item
  caseItem: [],

  caseField: [
    {
      key: 'statuss',
      label: 'Status',
      sortable: true,
      json: { Status: 'statuss' },
    },
    {
      key: 'approval_notes',
      label: 'Approval notes',
      sortable: true,
      json: { 'Approval notes': 'approval_notes' },
    },
    {
      key: 'approve_date',
      label: 'Approve date',
      sortable: true,
      json: { 'Approve date': 'approve_date' },
    },
    {
      key: 'aprvd_by_nm',
      label: 'Approved By',
      sortable: true,
      json: { 'Approved By': 'aprvd_by_nm' },
    },

    {
      key: 'assgnd_by_nm',
      label: 'Assign By',
      class: 'code_column',
      sortable: true,
      json: { 'Assign By': 'assgnd_by_nm' },
    },
    {
      key: 'cycle_code',
      label: 'Cycle Code',
      sortable: true,
      json: { 'Cycle Code': 'cycle_code' },
    },
    {
      key: 'cycle_date',
      label: 'Cycle Date',
      sortable: true,
      json: { 'Cycle Date': 'cycle_date' },
    },
    {
      key: 'cycle_deadline',
      label: 'Cycle Deadline',
      sortable: true,
      json: { 'Cycle Deadline': 'cycle_deadline' },
    },
    {
      key: 'cycle_donor',
      label: 'Cycle Donor',
      sortable: true,
      json: { 'Cycle Donor': 'cycle_donor' },
    },

    {
      key: 'cycle_type',
      label: 'Cycle Type',
      json: { 'Cycle Type': 'cycle_type' },
    },
    {
      key: 'def_cycl_durat',
      label: 'Cycle Duration',
      json: { 'Cycle Duration': 'def_cycl_durat' },
    },
    {
      key: 'def_module_qcd',
      label: 'def_module_qcd',
      json: { def_module_qcd: 'def_module_qcd' },
    },
    {
      key: 'def_sup_amount_cbm',
      label: 'def_sup_amount_cbm',
      json: { def_sup_amount_cbm: 'def_sup_amount_cbm' },
    },

    {
      key: 'description',
      label: 'description',
      class: 'notes',
      json: { description: 'description' },
    },

    {
      key: 'dwnldd_by_nm',
      label: 'Downloaded By',
      class: 'notes',
      json: { 'Downloaded By': 'dwnldd_by_nm' },
    },

    {
      key: 'downloaded_date',
      label: 'Downloaded Date',
      class: 'notes',
      json: { 'Downloaded Date': 'downloaded_date' },
    },
    {
      key: 'idps_count',
      label: 'Number of Individual',
      class: 'notes',
      json: { 'Number of Individual': 'idps_count' },
    },

    {
      key: 'name',
      label: 'name',
      class: 'notes',
      json: { name: 'name' },
    },
    {
      key: 'org_prefix',
      label: 'org_prefix',
      class: 'notes',
      json: { org_prefix: 'org_prefix' },
    },
    {
      key: 'pblshd_by_nm',
      label: 'pblshd_by_nm',
      class: 'notes',
      json: { pblshd_by_nm: 'pblshd_by_nm' },
    },

    {
      key: 'published_date',
      label: 'Published date',
      class: 'notes',
      json: { published_date: 'pd_copublished_datede' },
    },
    {
      key: 'published_notes',
      label: 'Published notes',
      class: 'notes',
      json: { published_notes: 'published_notes' },
    },
    {
      key: 'qouta_cd',
      label: 'qouta_cd',
      class: 'notes',
      json: { qouta_cd: 'qouta_cd' },
    },
    {
      key: 'quantity_needed',
      label: 'quantity_needed',
      class: 'notes',
      json: { quantity_needed: 'quantity_needed' },
    },
    {
      key: 'supp_prefix',
      label: 'Supplier',
      class: 'notes',
      json: { Supplier: 'supp_prefix' },
    },
    {
      key: 'total_filled',
      label: 'Total Filled',
      class: 'notes',
      json: { 'Total Filled': 'total_filled' },
    },
    {
      key: 'total_rounds',
      label: 'Total Rounds',
      class: 'notes',
      json: { 'Total Rounds': 'total_rounds' },
    },

  ],
  noidp: null,
  capacity: null,
  unit: {
    id: 1,
    title: 'Litre',
  },
  units: [{
    id: 1,
    title: 'Litre',
  }],
  deadline: null,
  duration: null,
  amount: null,
  focal_point: null,
  focal_point_ph: null,
  quota: null,
  status: null,
  qtyNeeded: null,
  qty_perDay: null,
  org: null,
  orgList: [

  ],

}
