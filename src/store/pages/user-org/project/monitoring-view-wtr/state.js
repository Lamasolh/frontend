export default {
  saved: false,
  show: false,
  note: null,
  showEdit: false,
  editItem: null,
  CycleTypeOptions: [],

  CycleStatusOptions: [
    {
      title: 'Pending',
      value: 1,
      variant: '',
    },
    {
      title: 'Rejected',
      value: 2,
      variant: 'warning',
    },
    {
      title: 'Verified',
      value: 3,
      variant: 'success',
    },
  ],
  CaseStatusOptions: [
    {
      title: 'New',
      value: 1,
      variant: 'warning',
    },
    {
      title: 'On Going',
      value: 2,
      variant: 'danger',
    },
    {
      title: 'On Progress',
      value: 3,
      variant: 'info',
    },
    {
      title: 'Verified',
      value: 4,
      variant: 'success',
    },
  ],
  MonitoringStatusOptions: [
    {
      title: 'Pending',
      value: 1,
      variant: 'warning',
    },
    {
      title: 'Approved',
      value: 2,
      variant: 'info',
    },
    {
      title: 'Terminated',
      value: 3,
      variant: 'danger',
    },
    {
      title: 'Published',
      value: 4,
      variant: 'success',
    },
  ],
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
  tentItem: [],
  tentField: [
    {
      key: 'index',
      label: 'index',
      sortable: true,
      json: { index: 'index' },
    },
    {
      key: 'code',
      label: 'code',
      sortable: true,
      json: { code: 'code' },
    },
    {
      key: 'reference',
      label: 'Rounds',
      sortable: true,
      json: { Rounds: 'reference' },
    },
    {
      key: 'rounds',
      label: 'Rounds',
      sortable: true,
      json: { Rounds: 'rounds' },
    },

    {
      key: 'members',
      label: 'members',
      sortable: true,
      json: { members: 'members' },
    },
    {
      key: 'quantity_filled',
      label: 'Quantity Filled',
      sortable: true,
      json: { 'Quantity Filled': 'quantity_filled' },
    },
    {
      key: 'quantity_needed',
      label: 'Quantity Needed',
      sortable: true,
      json: { 'Quantity Needed': 'quantity_needed' },
    },
    {
      key: 'quantity_varified',
      label: 'Quantity Verified',
      sortable: true,
      json: { 'Quantity Verified': 'quantity_varified' },
    },
    {
      key: 'deff',
      label: 'deff',
      sortable: true,
      json: { deff: 'deff' },
    },
  ],
  caseField: [
    {
      key: 'index',
      label: 'index',
      sortable: true,
      json: { index: 'index' },
    },
    {
      key: 'round_status',
      label: 'Status',
      sortable: true,
      json: { Status: 'round_status' },
    },
    {
      key: 'code',
      label: 'Code',
      sortable: true,
      json: { Code: 'code' },
    },
    {
      key: 'reference',
      label: 'Reference',
      sortable: true,
      json: { Reference: 'reference' },
    },
    {
      key: 'round_code',
      label: 'Round Code',
      sortable: true,
      json: { 'Round Code': 'round_code' },
    },

    {
      key: 'created_name',
      label: 'created_name',
      class: 'code_column',
      sortable: true,
      json: { created_name: 'created_name' },
    },
    {
      key: 'qouta_needed',
      label: 'Quota',
      sortable: true,
      json: { Quota: 'qouta_needed' },
    },
    {
      key: 'date_assned',
      label: 'Date Assigned',
      sortable: true,
      json: { 'Date Assigned': 'date_assned' },
    },
    {
      key: 'quantity_filled',
      label: 'Quantity Filled',
      sortable: true,
      json: { 'Quantity Filled': 'quantity_filled' },
    },
    {
      key: 'date_filled',
      label: 'Date Filled',
      sortable: true,
      json: { 'Date Filled': 'date_filled' },
    },

    {
      key: 'tsk_lat',
      label: 'Latitude',
      json: { Latitude: 'tsk_lat' },
    },
    {
      key: 'tsk_lng',
      label: 'Longitude',
      json: { Longitude: 'tsk_lng' },
    },
    {
      key: 'manual',
      label: 'Is Manual',
      json: { 'Is Manual': 'manual' },
    },
    {
      key: 'clorine_value',
      label: 'Chlore',
      json: { Chlore: 'clorine_value' },
    },

    {
      key: 'household_sgn_date',
      label: 'HouseHold Signature Date',
      class: 'notes',
      json: { household_sgn_date: 'household_sgn_date' },
    },

    {
      key: 'household_name',
      label: 'HouseHold Signature Name',
      class: 'notes',
      json: { 'HouseHold Signature Name': 'household_name' },
    },

    {
      key: 'verified_by',
      label: 'Verification By',
      class: 'notes',
      json: { 'Verification By': 'verified_by' },
    },
    {
      key: 'verified_qnty',
      label: 'Verification Quantity',
      class: 'notes',
      json: { 'Verification Quantity': 'verified_qnty' },
    },
    {
      key: 'verified_date',
      label: 'Verification Date',
      class: 'notes',
      json: { 'Verification Date': 'verified_date' },
    },
    {
      key: 'verification_notes',
      label: 'Verification Note',
      class: 'notes',
      json: { Verification: 'verification_notes' },
    },
    {
      key: 'notes',
      label: 'Note',
      class: 'notes',
      json: { Note: 'notes' },
    },
  ],
}
