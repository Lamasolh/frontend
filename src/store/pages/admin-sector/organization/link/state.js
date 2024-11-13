export default {
  show: false,
  tabIndex: 1,
  disabled: true,
  // Select
  jobOp: [],
  genderOp: [],
  nationalityOp: [],
  orgOp: [],
  disOp: [],
  cadOp: [],
  typeOp: [],
  phoneOp: [
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
  phoneProps: {
    phone: true,
    placeholder: '70123456',
  },
  /// Organization values
  orgLogo: null,
  orgName: null,
  orgDisName: null,
  orgRegNumber: null,
  orgPrefix: null,
  orgType: {
    title: "Local NGO's",
    title_ar: 'جمعيات محلية',
    value: 2,
  },
  // contact
  orgContact: null,
  orgPhone: {
    id: 1,
    text: 'LB(961)',
    number: null,
  },
  orgEmail: null,
  orgWebsite: null,
  // location
  orgGov: null,
  orgDis: null,
  orgCad: null,
  orgAddress: null,
  // other:
  orgDescription: null,
  /// organization administrator
  userLogo: null,
  userName: null,
  userFN: null,
  userLN: null,
  userFNAR: null,
  userLNAR: null,
  userGender: {
    title: 'Male',
    title_ar: 'ذكر',
    value: 2,
  },
  userNat: {
    title: 'Lebanese',
    title_ar: 'لبناني',
    value: 2,
  },
  userDOB: null,
  userEmail: null,
  userPhone: {
    id: 1,
    text: 'LB(961)',
    number: null,
  },
  userJob: {
    title: 'Admin',
    title_ar: 'مسؤول',
    value: 2,
  },
  userBio: null,
  userAddress: null,
}
