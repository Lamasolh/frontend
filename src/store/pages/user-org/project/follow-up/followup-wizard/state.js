export default {
  saved: false,
  show: true,
  showNote: false,
  showNoteSubmit: false,
  ///
  referralOptions: [],
  typeOptions: [],
  cadOptions: [],
  issOptions: [],
  // Filters
  referral: null,
  governorate: null,
  district: null,
  type: null,
  iss: null,
  cadaster: null,
  nationality: null,
  gender: null,
  employment: null,
  caregiver: null,
  priority: null,
  validated: null,
  phoneissue: null,
  //
  priority_period: 0,
  priority_interval: 0,
  //
  items: [],
  itemsrec: [],
  itemsfamily: [],
  country: {
    id: null,
    text: null,
    number: null,
  },
  orglist: [],
  orglistselect: null,
  isInView: false,
  /// ///
  isSidebarActive: false,
  caseItem: [],
  caseField: [
    // 'show_details',
    { key: 'case_code', label: 'Case Code', sortable: true },
    { key: 'full_name', label: 'Full Name', sortable: true },
    { key: 'case_phone', label: 'Phone', sortable: true },
    {
      key: 'show_details',
      label: 'Show Details',
    },
    { key: 'dup_percentage', label: 'Percentage', sortable: true },
  ],
}
