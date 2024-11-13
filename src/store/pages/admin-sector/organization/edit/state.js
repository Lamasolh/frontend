export default {
  show: false,
  tabIndex: 1,
  disabled: true,
  // Select
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
}
