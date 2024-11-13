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
  items: [
    {
      id: 1,
      name: 'MEM-129323 -(MEM-WF-001)',
      code: 'MEM-129323',
      reference: 'MEM-WF-001',
      uncode: '',
      national_code: 'National code',
      tent: 1,
      previous_location: 'previous_location',
    },
  ],
  exportField: {
    Code: 'code',
    Reference: 'reference',
    'UNHCR Code': 'unhcr_code',
    'National Code': 'national_number',
    Phone: 'phone_number',
    'House Hold': 'house_hold',
    'Previous Location': 'previous_location',
    Disability: 'disability',
    Dob: 'dob',
    'Father Name': 'father_name',
    'Father Name Arabic': 'father_name_ar',
    'First Name': 'first_name',
    'First Name Arabic': 'first_name_ar',
    Gender: 'gender',
    'Last Name': 'last_name',
    'Last Name Arabic': 'last_name_ar',
    'Marital Status': 'marital_status',
    'Mother Name': 'mother_name',
    'Mother Name Arabic': 'mother_name_ar',
    Nationality: 'nationality',
    'Place of birth': 'pob',
    Tent: 'tent',
    Family: 'family',
    'created At': 'created_at',
    'Updated At': 'updated_at',
    'In RDMS': 'dispatch',
    active: 'actv',
  },
  itemsField: [
    // 'show_details',
    { key: 'code', label: 'SystemCode', sortable: true },
    {
      key: 'tent', label: 'Tent', sortable: true, class: 'xlarge',
    },
    {
      key: 'family', label: 'Family', sortable: true, class: 'xlarge',
    },
    { key: 'reference', label: 'Organization Code', sortable: true },
    { key: 'unhcr_code', label: 'UNHCR Code', sortable: true },
    { key: 'national_number', label: 'National Code', sortable: true },
    { key: 'phone_number', label: 'Phone', sortable: true },

    { key: 'family_realtion', label: 'Family Relation', sortable: true },
    { key: 'disability_id', label: 'Disability', sortable: true },
    { key: 'dob', label: 'Dob', sortable: true },
    { key: 'father_name', label: 'Father Name', sortable: true },
    { key: 'father_name_ar', label: 'Father Name Arabic', sortable: true },
    { key: 'first_name', label: 'First Name', sortable: true },
    { key: 'first_name_ar', label: 'First Name Arabic', sortable: true },
    { key: 'gender_id', label: 'Gender', sortable: true },
    { key: 'last_name', label: 'Last Name', sortable: true },
    { key: 'last_name_ar', label: 'Last Name Arabic', sortable: true },

    { key: 'marital_status_id', label: 'Marital Status', sortable: true },
    { key: 'mother_name', label: 'Mother Name', sortable: true },
    { key: 'mother_name_ar', label: 'Mother Name Arabic', sortable: true },
    { key: 'nationality_id', label: 'Nationality', sortable: true },
    { key: 'pob', label: 'Place of birth', sortable: true },

    { key: 'created_at', label: 'Created At', sortable: true },
    { key: 'updated_at', label: 'Updated At', sortable: true },
    { key: 'dispatched', label: 'In RDMS', sortable: true },
    { key: 'active', label: 'Active', sortable: true },
    { key: 'action', label: 'Action' },
  ],
}
