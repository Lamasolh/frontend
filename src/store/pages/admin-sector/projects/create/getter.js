export default {
  saved: state => state.saved,
  show: state => state.show,
  showitem: state => state.showitem,
  /// Select
  iconOptions: state => state.iconOptions,
  typeOptions: state => state.typeOptions,
  // General
  name: state => state.name,
  prefix: state => state.prefix,
  description: state => state.description,
  iconValue: state => state.iconValue,
  /// Project Setting
  validationName: state => state.validationName,
  periodDuplicate: state => state.periodDuplicate,
  periodDuration: state => state.periodDuration,
  /// Type
  projecttype: state => state.projecttype,
  /// Tangible
  // Item
  itemname: state => state.itemname,
  itemdesc: state => state.itemdesc,
  items: state => state.items,
  lastId(state) {
    if (state.items == null || state.items === []) {
      return 0
    }
    return state.items.slice(-1).pop()
  },
  lastIdIND(state) {
    if (state.itemsIndicators == null || state.itemsIndicators === []) {
      return 0
    }
    return state.itemsIndicators.slice(-1).pop()
  },
}
