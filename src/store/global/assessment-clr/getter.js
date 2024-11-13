export default {
  show: state => state.show,
  title: state => state.title,
  description: state => state.description,
  res: state => state.res,
  case: state => state.case,
  des_code: state => state.des_code,
  des_rep: state => state.des_rep,
  //
  governorateOption: state => state.governorateOption,
  disOption: state => state.disOption,
  typeOptions: state => state.typeOptions,
  cadOptions: state => state.cadOptions,
  issOptions: state => state.issOptions,
  orgOptions: state => state.orgOptions,

  selectedItem: state => state.selectedItem,
  items: state => state.items,
  itemsrec: state => state.itemsrec,
  itemsfamily: state => state.itemsfamily,
  itemsfamilyField: state => state.itemsfamilyField,
  //
  referral: state => state.referral,
  district: state => state.district,
  municipality: state => state.municipality,
  nationality: state => state.nationality,
  //
  resp: state => state.resp,
  photo: state => state.photo,
}
