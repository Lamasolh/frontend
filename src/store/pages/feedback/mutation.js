export default {
  SET_SAVED(state, payload) {
    state.saved = payload
  },
  SET_SHOW(state, payload) {
    state.show = payload
  },
  /// Filter
  SET_FULL_NAME(state, payload) {
    state.fullname = payload
  },
  SET_CODE(state, payload) {
    state.code = payload
  },
  SET_REC_ITEM(state, payload) {
    state.receiveItem = payload
  },
  SET_REC_INC(state, payload) {
    state.reciveInclude = payload
  },
  SET_REC_DATE(state, payload) {
    state.receiveItemDate = payload
  },
  SET_REC_ITEM_ACC(state, payload) {
    state.receiveItemAccept = payload
  },
  SET_NOT_ACC(state, payload) {
    state.notAccept = payload
  },
  SET_REC_ITEM_ACC_FAM(state, payload) {
    state.receiveItemAcceptFam = payload
  },
  SET_NOT_ACC_FAM(state, payload) {
    state.notAcceptFam = payload
  },
  SET_REC_AWR(state, payload) {
    state.ReciveAwerness = payload
  },
  SET_REC_AWR_USFULL(state, payload) {
    state.ReciveAwernessuseful = payload
  },
  SET_REC_AW_ACC(state, payload) {
    state.ReciveAwernessAccept = payload
  },
  SET_OTH_INFO(state, payload) {
    state.OtherInfo = payload
  },
  SET_OTH_ITEM(state, payload) {
    state.OtherItem = payload
  },
  SET_TAKE_OTH(state, payload) {
    state.TakeToOther = payload
  },
  SET_OTH_COM(state, payload) {
    state.OtherComment = payload
  },
  SET_TEAM_REAT(state, payload) {
    state.TeamReat = payload
  },
  SET_VALUE(state, payload) {
    state.value = payload
  },
}
