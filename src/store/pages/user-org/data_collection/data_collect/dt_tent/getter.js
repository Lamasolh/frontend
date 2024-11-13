export default {
  saved: state => state.saved,
  show: state => state.show,
  //
  // Cases
  items: state => state.items,
  itemField: state => state.itemField,
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
}
