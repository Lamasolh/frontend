export default {
  saved: false,
  show: false,

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
  // Data
  caseItem: [],

  caseField: [
    {
      key: 'stats',
      label: 'Status',
      sortable: true,
      json: { Status: 'stats' },
    },
    {
      key: 'is_name',
      label: 'Settlement ISs',
      class: 'notes',
      json: { 'Settlement ISs': 'is_name' },
    },
    {
      key: 'is_name_ar',
      label: 'Settlement ISs Arabic',
      class: 'notes',
      json: { 'Settlement ISs Arabic': 'is_name_ar' },
    },
    {
      key: 'p_code',
      label: 'P-Code',
      class: 'notes',
      json: { 'P-Code': 'p_code' },
    },
    {
      key: 'org_prefix',
      label: 'Organization',
      class: 'notes',
      json: { Organization: 'org_prefix' },
    },
    {
      key: 'aprvd__nm',
      label: 'Approved By',
      sortable: true,
      json: { 'Approved By': 'aprvd__nm' },
    },
    {
      key: 'approve_date',
      label: 'Approve date',
      sortable: true,
      json: { 'Approve date': 'approve_date' },
    },
    {
      key: 'approval_notes',
      label: 'Approval notes',
      sortable: true,
      json: { 'Approval notes': 'approval_notes' },
    },
    {
      key: 'assgnd__nm',
      label: 'Assign By',
      class: 'code_column',
      sortable: true,
      json: { 'Assign By': 'assgnd__nm' },
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
      key: 'donor_nm',
      label: 'Donor',
      sortable: true,
      json: { Donor: 'donor_nm' },
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
      key: 'dwnld_nm',
      label: 'Downloaded By',
      class: 'notes',
      json: { 'Downloaded By': 'dwnld_nm' },
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
      key: 'pd_code',
      label: 'PD Code',
      class: 'notes',
      json: { 'PD Code': 'pd_code' },
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
      key: 'supp_nm',
      label: 'Supplier',
      class: 'Supplier Name',
      json: { 'Supplier Name': 'supp_nm' },
    },
    {
      key: 'round_count',
      label: 'Round Count',
      class: 'notes',
      json: { 'Round Count': 'round_count' },
    },
    {
      key: 'remaing_qnty',
      label: 'Remaing Quantity',
      class: 'notes',
      json: { 'Remaing Quantity': 'remaing_qnty' },
    },
    {
      key: 'round_count',
      label: 'Round Count',
      class: 'notes',
      json: { 'Round Count': 'round_count' },
    },

  ],

  json_fields: {},
}
