export default {
  saved: false,
  show: true,

  perPage: 10, // Default View Pages
  pageOptions: [1, 10, 20, 30, 40, 50, 100, 200, 300, 400, 500], // Number in Page
  currentPage: 1, // Current Page
  totalRows: 0,
  /// Sort
  sortBy: '', // Sort By Referral ...
  sortDesc: false, // Sort desc
  sortDirection: 'asc', // Sort Direction
  filter: null,
  filterOn: [],
  itemField: [
    { key: 'info', label: 'Status' },
    {
      key: 'cad', label: 'Cadastre', sortable: true, class: 'iss',
    },
    /* {
      key: 'comMob', label: 'community mobalizer', sortable: true, class: 'sup',
    }, */
    {
      key: 'stafMon', label: 'Staff monitor', sortable: true, class: 'sup',
    },
    {
      key: 'quantity', label: 'Quantity', sortable: true, class: 'sup',
    },
    // { key: 'note', label: 'Note', sortable: true },

  ],

  items: [],
  itemsIssField: [
    { key: 'id', label: 'Index', sortable: true },
    { key: 'iss_name', label: 'ISs', sortable: true },
    { key: 'modality_changed', label: 'Modality Status', sortable: true },
    { key: 'staff_cahnged', label: 'Staff Status', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ],
  comOption: [],
  staffOption: [],

}
