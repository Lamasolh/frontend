import moment from 'moment'

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
  centerMap: state => state.centerMap,
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
  itemTable: state => {
    const rf = state.items.filter(item => (state.referral == null
      ? item
      : item.referral_id === state.referral.value))
    const cd = rf.filter(itemcad => (state.municipality == null
      ? itemcad
      : itemcad.cadastre_id === state.municipality.value))
    const frm = moment(
      state.rangeDate == null ? null : state.rangeDate.split('to')[0],
    )
    const to = moment(
      state.rangeDate == null ? null : state.rangeDate.split('to')[1],
    )
    const rg = cd.filter(() => {
      if (!frm.isValid() || !to.isValid()) {
        return true
      }
      return moment(state.item.referral_date).isBetween(frm, to)
    })
    /* Date.parse(item.referral_date).getTime() >= this.rangeDate.split('to')[0].getTime()
               && Date.parse(item.referral_date).getTime() <= this.rangeDate.split('to')[1].getTime()) */
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    return rg
  },
}
