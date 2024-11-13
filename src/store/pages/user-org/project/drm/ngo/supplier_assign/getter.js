export default {
  show: state => state.show,
  saved: state => state.saved,
  //
  // Option
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
  ///
  isAssignSidebarActive: state => state.isAssignSidebarActive,

}
