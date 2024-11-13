export default {
  show: state => state.show,
  tabIndex: state => state.tabIndex,
  disabled: state => state.disabled,
  // Select
  disOp: state => state.disOp,
  cadOp: state => state.cadOp,
  typeOp: state => state.typeOp,
  phoneOp: state => state.phoneOp,
  phoneProps: state => state.phoneProps,
  /// Organization values
  orgDataInfo: state => state.orgDataInfo,
  orgAdminInfo: state => state.orgAdminInfo,
  orgLogo: state => state.orgLogo,
  orgName: state => state.orgName,
  orgDisName: state => state.orgDisName,
  orgRegNumber: state => state.orgRegNumber,
  orgPrefix: state => state.orgPrefix,
  orgType: state => state.orgType,
  // contact
  orgContact: state => state.orgContact,
  orgPhone: state => state.orgPhone,
  orgEmail: state => state.orgEmail,
  orgWebsite: state => state.orgWebsite,
  // location
  orgDis: state => state.orgDis,
  orgCad: state => state.orgCad,
  orgAddress: state => state.orgAddress,
  // other:
  orgDescription: state => state.orgDescription,
}
