export default {
  show: false,
  saved: false,
  ///
  showFilter: false,
  showEditProject: false,
  pdList: [],

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

  ///
  itemField: [
    {
      key: 'iss', label: 'ISs',
    },
    {
      key: 'supplier', label: 'Supplier',
    },
    {
      key: 'pd', label: 'PD',
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
      key: 'duration', label: 'Duration',
    },
    {
      key: 'quantity', label: 'Quantity',
    },
    {
      key: 'quota', label: 'Quota',
    },

    {
      key: 'show_details', label: 'Details',
    },
    { key: 'action', label: 'Action' },

  ],
  listDonors: [],
  listSupplier: [],
  listCycle: [],
  items: [],

  // Create Referral
  referral: null,
  district: null,
  governorate: null,
  type: null,
  iss: null,
  cadaster: null,

  showModalRef: { active: false },

  typeOptions: [],
  cadOptions: [],
  issOptions: [],

  pcode: null,
  noidp: null,
  capacity: null,
  deadline: null,
  duration: null,
  focal_point: null,
  focal_point_ph: null,
  quota: null,
  status: null,
  qtyNeeded: null,
  qty_perDay: null,
}
