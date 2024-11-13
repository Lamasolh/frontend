export default {
  SET_SHOW(state, payload) {
    state.show = payload
  },
  SET_SAVED(state, payload) {
    state.saved = payload
  },
  /// Select
  ADD_PROJ_TYPE(state, payload) {
    state.typeOptions = []
    payload.forEach(el => {
      state.typeOptions.push({
        title: el.proj_type_name,
        value: el.proj_type_id,
      })
    })
  },
  /// Select
  ADD_Unit(state, payload) {
    state.unitOptions = []
    payload.forEach(el => {
      state.unitOptions.push({
        title: el.proj_type_name,
        title_ar: el.proj_type_name_ar,
        value: el.proj_type_id,
      })
    })
  },
  ADD_ICONS(state, payload) {
    state.iconOptions = []
    console.log(payload)
    payload.forEach(el => {
      state.iconOptions.push({
        title: el.name,
        display_name: el.display_name,
        value: el.id,
      })
    })
  },
  ADD_TYPE_IND(state, payload) {
    state.typeIndOptions = []
    console.log(payload)
    payload.forEach(el => {
      state.typeIndOptions.push({
        title: el.type_name,
        value: el.typ_id,
      })
    })
  },
  ADD_ASSMNT(state, payload) {
    state.assmntOptions = []
    console.log(payload)
    payload.forEach(el => {
      state.assmntOptions.push({
        title: el.name,
        value: el.ass_typ_id,
      })
    })
  },
  // General
  SET_NAME(state, payload) {
    state.name = payload
  },
  SET_PREF(state, payload) {
    console.log(payload)
    state.prefix = payload != null ? payload.toUpperCase().trim() : null
  },
  SET_DESC(state, payload) {
    state.description = payload
  },
  SET_ICON(state, payload) {
    state.iconValue = payload
  },
  /// Project Setting
  SET_SETTING_VALID_NAME(state, payload) {
    state.validationName = payload
  },
  SET_SETTING_PERI_DUP(state, payload) {
    state.periodDuplicate = payload
  },
  SET_SETTING_PERI_DUR(state, payload) {
    state.periodDuration = payload
  },
  SET_SETTING_ASSM_TYPE(state, payload) {
    state.assmntType = payload
  },
  /// Type
  SET_TYPE(state, payload) {
    state.projecttype = payload
  },
  SET_SETTING_GRC_DUR(state, payload) {
    state.graceDuration = payload
  },
  /// Tangible
  // Item
  SET_ITEM_NAME(state, payload) {
    state.itemname = payload
  },
  SET_ITEM_DESC(state, payload) {
    state.itemdesc = payload
  },
  REM_ITEMS(state, payload) {
    state.items.splice(payload.index, 1)
  },
  REM_ALL_ITEMS(state) {
    state.items = []
  },
  REM_ITEMS_IND(state, payload) {
    console.log('Remove')
    console.log(payload)
    console.log('Before')
    console.log(state.itemsIndicators.filter(f => f.id !== payload.index))
    state.itemsIndicators = state.itemsIndicators.filter(f => f.id !== payload.index)
    console.log('After')
    console.log(state.itemsIndicators)
  },
  REM_ALL_ITEMS_IND(state) {
    state.itemsIndicators = []
  },
  ADD_ITEMS(state, payload) {
    state.items.push({
      id: payload.id,
      active: payload.active,
      main: payload.main,
      inId: payload.inId,
      name: payload.name,
      name_ar: payload.name_ar,
      desc: payload.desc,
      minim_dist: payload.minim_dist,
      max_dist: payload.max_dist,
    })
  },
  ADD_ITEMS_IND(state, payload) {
    state.itemsIndicators.push({
      id: payload.id,
      inId: payload.inId,
      active: payload.active,
      type: payload.type,
      require: payload.require,
      name: payload.name,
      desc: payload.desc,
      isInd: payload.isInd,
    })
  },
  SET_NAME_ITEM(state, payload) {
    state.items.filter(it => it.id === payload.index)[0].name = payload.value
  },

  /// SRC
  SET_SRC_UNIT(state, payload) {
    state.srcUnit = payload
  },
  SET_SRC_TYPE(state, payload) {
    state.srcType = payload
  },
  SET_SRC_MIN(state, payload) {
    state.srcMin = payload
  },
  SET_SRC_MAX(state, payload) {
    state.srcMax = payload
  },
}
