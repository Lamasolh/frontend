export default {
  show: false,
  saved: false,
  ///
  govOptions: [],
  disOptions: [],
  cadOptions: [],
  pdList: [],

  district: null,
  governorate: null,
  cadaster: null,
  ///
  ongoing_iss: null,
  total_iss: null,
  showModalUrgent: { active: false, schedule: [] },
  selectedUrgentId: null,
  supplier: null,
  donor: null,
  amount: null,
  quantity: null,
  note: null,
  pd: null,
  cycleType: null,

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
  dataOutput: {
    members: null,
    tank: null,
    tents: null,
    cycl_dur: null,
    total_qouta: null,
  },
  ///
  itemField: [
    {
      key: 'iss', label: 'ISs', sortable: true, class: 'iss',
    },
    {
      key: 'supplier', label: 'Supplier', sortable: true, class: 'sup',
    },
    {
      key: 'pd', label: 'PD', sortable: true, class: 'don',
    },
    /* {
      key: 'donor', label: 'Donor', sortable: true, class: 'don',
    },
     {
      key: 'cycle', label: 'Cycle', sortable: true, class: 'cycle',
    },
     {
      key: 'note', label: 'Note', sortable: true, class: 'note',
    },
    */
    {
      key: 'quantity', label: 'Quantity', sortable: true, class: 'qty',
    },

    { key: 'schedule', label: 'Schedule' },

    { key: 'delete', label: 'Delete' },

  ],
  listDonors: [],
  listSupplier: [],
  listCycle: [],
  items: [],

}
