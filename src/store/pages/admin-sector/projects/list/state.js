export default {
  saved: false,
  show: true,
  // Table Options
  perPage: 10, // Default View Pages
  pageOptions: [1, 10, 20, 30, 40, 50], // Number in Page
  currentPage: 1, // Current Page
  totalRows: 0,
  /// Sort
  sortBy: '', // Sort By  ...
  sortDesc: false, // Sort desc
  sortDirection: 'asc', // Sort Direction
  /// Filter
  filter: null,

  filterOn: [],
  // Data
  caseProject: [],
  caseField: [
    { key: 'proj_name', label: 'Name', sortable: true },
    { key: 'proj_type', label: 'Type', sortable: true },
    { key: 'proj_date', label: 'Date', sortable: true },
    { key: 'proj_deadline', label: 'Deadline', sortable: true },
    { key: 'org_name', label: 'Orgnization', sortable: true },
    { key: 'proj_status', label: 'Active', sortable: true },
    { key: 'actions', label: 'Action' },
  ],
}
