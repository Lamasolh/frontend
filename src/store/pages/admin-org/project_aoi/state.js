export default {
  saved: false,
  show: true,
  // Table Options
  typeOptions: [],
  cadOptions: [],
  /// Search
  governorate: null,
  district: null,
  municipality: null,
  type: {
    prefix: 'RSDNTL',
    title: 'Residential Lebanese',
    title_ar: 'سكني لبناني',
    value: 1,
  },
  orgMarker: [],
  infoWinOpen: false,

  /// AOI
  /// Setting /// Supplier List
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
