export default {
  saved: false,
  show: false,

  showFilter: false,
  showColumn: false,
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
  // Data
  deleteItem: [],
  fieldsSelect: [],
  caseItem: [],

  caseField: [
    {
      key: 'Status',
      label: 'Status',
      class: 'code_column',
      sortable: true,
      json: { Status: 'Status' },
    },
    {
      key: 'p_code',
      label: 'P_Code',
      class: 'p_code',
      json: { P_Code: 'p_code' },
    },

    {
      key: 'is_name',
      label: 'Settlement',
      sortable: true,
      json: { Adddress: 'is_name' },
    },
    {
      key: 'is_name_ar',
      label: 'Settlement Arabic',
      sortable: true,
      json: { 'Settlement Arabic': 'is_name_ar' },
    },
    {
      key: 'governorate_name_ar',
      label: 'Governorate',
      class: 'code_column',
      sortable: true,
      json: { Governorate: 'governorate_name_ar' },
    },

    {
      key: 'district_name_ar',
      label: 'District',
      class: 'code_column',
      sortable: true,
      json: { District: 'district_name_ar' },
    },
    {
      key: 'cadastre_name_ar',
      label: 'Cadastre',
      sortable: true,
      json: { Cadastre: 'cadastre_name_ar' },
    },
  ],
  showModalRef: { active: false },
  selectedOrgRef: [],
  orgList: [],
  json_fields: {},
}
