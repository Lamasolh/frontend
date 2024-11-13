export default {
  saved: state => state.saved,
  show: state => state.show,
  // Filters
  job: state => state.job,
  status: state => state.status,
  // Cases
  userItem: state => state.userItem,
  caseField: state => state.caseField,
  // Option Table
  perPage: state => state.perPage,
  pageOptions: state => state.pageOptions,
  currentPage: state => state.currentPage,
  /// Sort
  sortBy: state => state.sortBy,
  sortDesc: state => state.sortDesc,
  sortDirection: state => state.sortDirection,
  /// Filter
  filter: state => state.filter,
  filterOn: state => state.filterOn,
}
