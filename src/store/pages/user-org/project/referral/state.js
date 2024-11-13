export default {
  saved: false,
  show: false,
  //
  typeOptions: [],
  cadOptions: [],
  issOptions: [],
  // Filters
  referral: null,
  district: null,
  governorate: null,
  type: null,
  iss: null,
  cadaster: null,
  priority: null,

  phone: {
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
  //
  items: [
    {
      id: 1,
      name: null,
      country: 'LB(961)',
      countryid: 1,
      phone: null,
      pcr_date: null,
    },
  ],
}
