export default {
  saved: state => state.saved,
  show: state => state.show,
  // Filters
  job: state => state.job,
  status: state => state.status,
  // Cases
  projectItem: state => state.projectItem,
  projectField: state => state.projectField,
  selectItem: state => state.selectItem,
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
  // Search
  district: state => state.district,
  municipality: state => state.municipality,
  governorate: state => state.governorate,
  type: state => state.type,
  orgMarker: state => state.orgMarker,
  rolesItemOriginal: state => state.rolesItemOriginal,
}
