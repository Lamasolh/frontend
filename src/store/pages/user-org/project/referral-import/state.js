export default {
  saved: false,
  show: false,
  editToggle: false,
  // Fields
  field: [],
  baseField: [],
  json_fields: {
    code: 'code',
  },
  /// Items
  items: [],
  itemEdit: [],
  exportTable: null,
  /// OOP
  referralOp: [],
  typeOp: [],
  govOp: [],
  disOp: [],
  cadOp: [],
  issOp: [],
  pcrOp: [],
  genderOp: [],
  empOp: [],
  carOp: [],
  indOp: [],
  dataTypeOp: [
    { id: 1, title: 'Text', value: 1 },
    { id: 2, title: 'Number', value: 2 },
    { id: 3, title: 'Date', value: 3 },
    { id: 4, title: 'Yes/No', value: 4 },
  ],
  yesNoOp: [
    { id: 1, title: 'Yes', value: 1 },
    { id: 2, title: 'No', value: 2 },
  ],
  ///
  /// Basic
  itemId: null,
  fullname: null,
  country: 'LB(961)',
  countryid: 1,
  phone: null,
  pcr_date: null,
  referral: null,
  district: null,
  governorate: null,
  type: null,
  iss: null,
  cadaster: null,
  phoneOp: {
    phone: true,
    phoneRegionCode: 'SY',
    placeholder: '70 123 456',
    options: [
      {
        id: 'LB',
        text: 'LB(961)',
        value: 1,
        title: 'Lebanon (961)',
      },
      {
        id: 'SY',
        text: 'SY(963)',
        value: 2,
        title: 'Syria (963)',
      },
    ],
  },
  gender: null,
  pcres: null,

  /// Family
  infected_count: 1,
  male_count: 0,
  female_count: 0,
  child_count: 0,
  yng_child_count: 0,
  young_count: 0,
  teenager_count: 0,
  adult_count: 0,
  elderly_count: 0,
  family_members: 0,
  /// other
  pregnant: false,
  house_hold: false,
  isolation_room: false,
  monthly_payments: false,
  caregiver: null,
  employment: null,
  adresstext: null,
}
