export default {
  show: false,
  saved: false,
  ///
  range_rep_case: null,
  caseExportField: {
    Nationality: 'nationality_name',
    'PCR Date': 'pcr_date',
    Month: 'month',
    District: 'district',
    Cadaster: 'municipality',
    'Created Date': 'date_of_referral',
    'Case Code': 'code',
    'Case Status': 'case_status',
    'Full Name': 'full_name',
    Phone: 'contact_number',
    'Male Count': 'male_count',
    'Female Count': 'female_count',
    'Number of members between 0 and 5 years old': 'children_count',
    'Number of members between 6 and 11 years old': 'youg_count',
    'Number of members between 12 and 17 years old': 'young_count',
    'Number of members between 18 and 25 years old': 'teenager_count',
    'Number of members between 26 and 64 years old': 'adult_count',
    'Number of members above 65': 'elderly_count',
    'Family Member': 'total_umber_oF_individuals',
    'Infected Count': 'no_of_infected_individuals',
    Referral: 'referred_via',
    'Delivery Status': 'delivery_status',
    'Delivery Date': 'delivery_date',
    'Delivery Kits': 'ditrib_kits',
    'Reson Not Delivery': 'reason_for_not_deilvered',
  },
  caseField: [
    // Info
    /* {
      key: 'org_prefix',
      label: 'Organization Prefix',
      class: 'largeWidth',
    },
    {
      key: 'org_name', label: 'Organization Name',
    }, */
    {
      key: 'nationality_name',
      label: 'Nationality',
    },
    {
      key: 'pcr_date',
      label: 'PCR Date',
      class: 'mediumWidth',
    },
    {
      key: 'month',
      label: 'Month',
      class: 'mediumWidth',
    },

    {
      key: 'district',
      label: 'District',
      class: 'mediumWidth',
    },
    {
      key: 'municipality',
      label: 'Cadaster',
      class: 'mediumWidth',
    },
    {
      key: 'date_of_referral',
      label: 'Created Date',
      class: 'mediumWidth',
    },

    {
      key: 'code',
      label: 'Case Code',
      class: 'mediumWidth',
    },
    {
      key: 'case_status',
      label: 'Case Status',
      class: 'mediumWidth',
    },

    {
      key: 'full_name',
      label: 'Full Name',
      class: 'mediumWidth',
    },
    {
      key: 'contact_number',
      label: 'Phone',
    },

    // Family
    {
      key: 'male_count',
      label: 'Male Count',
    },
    {
      key: 'female_count',
      label: 'Female Count',
    },

    {
      key: 'children_count',
      label: 'Number of members between 0 and 5 years old',
    },
    {
      key: 'youg_count',
      label: 'Number of members between 6 and 11 years old',
    },
    {
      key: 'young_count',
      label: 'Number of members between 12 and 17 years old',
    },
    {
      key: 'teenager_count',
      label: 'Number of members between 18 and 25 years old',
    },
    {
      key: 'adult_count',
      label: 'Number of members between 26 and 64 years old',
    },
    {
      key: 'elderly_count',
      label: 'Number of members above 65',
    },
    {
      key: 'total_umber_oF_individuals',
      label: 'Family Member',
    },
    {
      key: 'no_of_infected_individuals',
      label: 'Infected Count',
    },
    {
      key: 'referred_via',
      label: 'Referred Via',
      class: 'mediumWidth',
    },

    {
      key: 'delivery_status',
      label: 'Delivery Status',
      class: 'mediumWidth',
    },
    {
      key: 'delivery_date',
      label: 'Delivery Date',
      class: 'mediumWidth',
    },
    {
      key: 'ditrib_kits',
      label: 'Delivery Kits',
      class: 'mediumWidth',
    },
    {
      key: 'reason_for_not_deilvered',
      label: 'Reson Not Delivery',
      class: 'mediumWidth',
    },
    // Details
  ],
  caseItem: [],
  /// Activiy
  indOp: [],
  range_rep_activity: null,
  activityExportField: {
    'Referral received by': 'referral_name',
    'Case Code': 'case_code',
    'Partner Name': 'org_prefix',
    Month: 'month',
    'Location Cadaster': 'cadastre_name',
    'Type of gateway': 'sat_name',
    'Informal settlement': 'iss_name',
    '# of Cholera disinfection kits': 'Cholera_Disinfection_Kit',
    'Donor of Cholera disinfection kits': 'Cholera_Disinfection_Kit_Donor',
    '# of Cholera hygiene Kits': 'Cholera_Hygiene_Kit',
    'Donor of Cholera hygiene Kits': 'Cholera_Hygiene_Kit_Donor',
    '# of Oral Rehydration Solution units distributed for the case': 'Cholera_ORS_Kit',
    'Donor of Oral Rehydration Solution units distributed for the case': 'Cholera_ORS_Kit_Donor',
    // '# of Cholera Sanitation Kit units distributed for the case': 'Cholera_Sanitation_Kit',
    'Number of males reached with cholera awareness sessions': 'awareness_male_count',
    'Number of females reached with cholera awareness sessions': 'awareness_female_count',
    'Number of household reached with cholera awareness sessions': 'awareness_household_count',
  },
  activityField: [
    // Info
    {
      key: 'referral_name',
      label: 'Referral received by',
      class: 'mediumWidth',
    },
    {
      key: 'case_code',
      label: 'Case Code',
      class: 'mediumWidth',

    },
    {
      key: 'org_prefix',
      label: 'Partner Name',
      class: 'mediumWidth',
    },
    {
      key: 'month',
      label: 'Month',
      class: 'mediumWidth',
    },
    {
      key: 'cadastre_name',
      label: 'Location Cadaster',
      class: 'mediumWidth',
    },
    {
      key: 'iss_name',
      label: 'Informal settlement',
      class: 'mediumWidth',
    },
    {
      key: 'sat_name',
      label: 'Type of gateway',
      class: 'mediumWidth',
    },
    {
      key: 'Cholera_Disinfection_Kit',
      label: '# of Cholera disinfection kits',
      class: 'mediumWidth',
    },
    {
      key: 'Cholera_Disinfection_Kit_Donor',
      label: 'Donor of Cholera disinfection kits',
      class: 'mediumWidth',
    },
    {
      key: 'Cholera_Hygiene_Kit',
      label: '# of Cholera hygiene Kits',
      class: 'mediumWidth',
    },
    {
      key: 'Cholera_Hygiene_Kit_Donor',
      label: 'Donor of Cholera hygiene Kits',
      class: 'mediumWidth',
    },
    {
      key: 'Cholera_ORS_Kit',
      label: '# of Oral Rehydration Solution units distributed for the case',
      class: 'mediumWidth',
    },
    {
      key: 'Cholera_ORS_Kit_Donor',
      label: 'Donor of Oral Rehydration Solution units distributed for the case',
      class: 'mediumWidth',
    },

    {
      key: 'awareness_male_count',
      label: 'Number of males reached with cholera awareness sessions',
      class: 'mediumWidth',
    },
    {
      key: 'awareness_female_count',
      label: 'Number of females reached with cholera awareness sessions',
      class: 'mediumWidth',
    },
    {
      key: 'awareness_household_count',
      label: 'Number of household reached with cholera awareness sessions',
      class: 'mediumWidth',
    },
    /* {
      key: 'Cholera_Sanitation_Kit',
      label: '# of Cholera Sanitation Kit units distributed for the case',
      class: 'mediumWidth',
    }, */
    // Details
  ],
  activityItem: [],
  //
  invExportField: {},
  invField: [],
  invItem: [],
  //
  cadExportField: {
    'Cadaster Name': 'cadastre_name',
    January: 'jan_kits',
    February: 'feb_kits',
    March: 'mar_kits',
    April: 'aprl_kits',
    May: 'may_kits',
    June: 'jun_kits',
    July: 'jul_kits',
    August: 'aug_kits',
    September: 'sep_kits',
    October: 'oct_kits',
    November: 'nov_kits',
    December: 'dec_kits',
  },
  cadField: [
    {
      key: 'cadastre_name',
      label: 'Cadaster Name',
    },
    {
      key: 'jan_kits',
      label: 'January',
      tdClass: 'smallheight',
    },
    {
      key: 'feb_kits',
      label: 'February',
      tdClass: 'smallheight',
    },
    {
      key: 'mar_kits',
      label: 'March',
      tdClass: 'smallheight',
    },
    {
      key: 'aprl_kits',
      label: 'April',
      tdClass: 'smallheight',
    },
    {
      key: 'may_kits',
      label: 'May',
      tdClass: 'smallheight',
    },
    {
      key: 'jun_kits',
      label: 'June',
      tdClass: 'smallheight',
    },
    {
      key: 'jul_kits',
      label: 'July',
      tdClass: 'smallheight',
    },
    {
      key: 'aug_kits',
      label: 'August',
      tdClass: 'smallheight',
    },
    {
      key: 'sep_kits',
      label: 'September',
      tdClass: 'smallheight',
    },
    {
      key: 'oct_kits',
      label: 'October',
      tdClass: 'smallheight',
    },
    {
      key: 'nov_kits',
      label: 'November',
      tdClass: 'smallheight',
    },
    {
      key: 'dec_kits',
      label: 'December',
      tdClass: 'smallheight',
    },
  ],
  cadItem: [],
  year: { title: 2022, value: 2022 },
  yearOptions: [
    { title: '2021', value: 2021 },
    { title: '2022', value: 2022 },
    { title: '2023', value: 2023 },
  ],
}
