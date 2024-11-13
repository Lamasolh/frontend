export default {
  show: false,
  saved: false,
  ///
  govOptions: [],
  disOptions: [],
  cadOptions: [],
  district: null,
  governorate: null,
  cadaster: null,
  ///
  isAssignSidebarActive: false,
  isAssignSidebarActiveADD: false,

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
      key: 'supplier', label: 'Supplier', sortable: true, class: 'sup',
    },
    {
      key: 'iss', label: 'ISs', sortable: true, class: 'iss',
    },
    { key: 'quantity', label: 'Quantity', sortable: true },
    { key: 'note', label: 'Note', sortable: true },
    { key: 'delete', label: 'Delete', class: 'action' },

  ],
  items: [],
  /// Supplier List
  itemFieldSUP: [
    { key: 'Name', label: 'Supplier', sortable: true },
    { key: 'contact_person', label: 'Contact Person', sortable: true },
    { key: 'contact_phone', label: 'Contact Phone', sortable: true },
    { key: 'deactive', label: 'Actions' },
  ],
  itemsSUP: [],
  /// Supplier Add
  supName: null,
  contactName: null,
  contactPhone: null,
  descNote: null,
  username: null,
  password: null,
  nationality: null,

}
