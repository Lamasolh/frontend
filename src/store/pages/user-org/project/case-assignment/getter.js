export default {
  saved: state => state.saved,
  show: state => state.show,
  //
  referral: state => state.referral,
  district: state => state.district,
  municipality: state => state.municipality,
  rangedate: state => state.rangedate,
  // Cases
  caseItem: state => state.caseItem,
  caseField: state => state.caseField,
  selectedCase: state => state.selectedCase,
  // users
  UsersOtions: state => state.UsersOtions,
  userItem: state => state.userItem,
  userField: state => state.userField,
  usersValue: state => state.usersValue,
  // toggle
  isAssignSidebarActive: state => state.isAssignSidebarActive,
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
