export default {
  saved: false,
  show: false,
  // Table Options
  perPage: 10, // Default View Pages
  pageOptions: [1, 10, 20, 30, 40, 50, 100, 200, 300, 400, 500, 1000], // Number in Page
  currentPage: 1, // Current Page
  totalRows: 0,
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
      key: 'created_nm',
      label: 'Created Name',
      class: 'notes',
      json: { 'Created Name': 'created_nm' },
    },
    {
      key: 'date_assned',
      label: 'Date Assign',
      json: { 'Date Assign': 'date_assned' },
    },
    {
      key: 'date_filled',
      label: 'Date Filled',
      json: { 'Date Filled': 'date_filled' },
    },
    {
      key: 'driver_name',
      label: 'Driver Name',
      json: { 'Driver Name': 'driver_name' },
    },
    {
      key: 'notes',
      label: 'Note',
      class: 'code_column',

      json: { Note: 'notes' },
    },
    {
      key: 'qouta_needed',
      label: 'Quota Needed',
      json: { 'Quota Needed': 'qouta_needed' },
    },
    {
      key: 'quantity_filled',
      label: 'Quota Filled',
      json: { 'Quota Filled': 'quantity_filled' },
    },
    {
      key: 'round_code',
      label: 'Round Code',

      json: { 'Round Code': 'round_code' },
    },
    {
      key: 'location',
      label: 'Location',
      sortable: true,
      json: { Location: 'location' },
    },
    {
      key: 'signature',
      label: 'Signature',
      sortable: true,
      json: { Signature: 'signature' },
    },
    {
      key: 'verified_by',
      label: 'Verified By',
      json: { 'Verified By': 'verified_by' },
    },
    {
      key: 'verified_date',
      label: 'Verified Date',
      json: { 'Verified Date': 'verified_date' },
    },
    {
      key: 'verified_phone',
      label: 'Verified Phone',
      json: { 'Verified Phone': 'verified_phone' },
    },
    {
      key: 'verified_qnty',
      label: 'Verified Qnty',
      json: { 'Verified Qnty': 'verified_qnty' },
    },

  ],

}
