export default {
  show: false,
  saved: false,
  range_rep_activity: null,
  activityExportField: {
    'Organization Name': 'org_name',
    'Organization Prefix': 'org_prefix',
    Governorate: 'governorate_name',
    District: 'district_name_eng',
    Cadaster: 'cadastre_name',
    PCode: 'p_code',
    'Emergency Tag': 'emergency_tag',
    'Cycle Date': 'cycle_date',
    Month: 'month',
    'Funded By': 'funded_by',
    'Project Code': 'Project_Code',
    'Project Name': 'proj_name',
    'Project Deadline': 'proj_deadline',
    'Project Plan': 'project_plan',
    Category: 'category',
    'Volume Provied': 'volume_provied',
    'Liter Capital Per Day': 'liter_cpd',
  },
  activityField: [
    {
      key: 'org_name',
      label: 'Organization Name',
      class: 'mediumWidth',
    },
    {
      key: 'org_prefix',
      label: 'Organization Prefix',
      class: 'mediumWidth',

    },
    {
      key: 'governorate_name',
      label: 'Governorate',
      class: 'mediumWidth',
    },
    {
      key: 'district_name_eng',
      label: 'District',
      class: 'mediumWidth',
    },
    {
      key: 'cadastre_name',
      label: 'Cadaster',
      class: 'mediumWidth',
    },
    {
      key: 'p_code',
      label: 'PCode',
      class: 'mediumWidth',
    },
    {
      key: 'is_name',
      label: 'ISs Name',
      class: 'mediumWidth',
    },
    {
      key: 'emergency_tag',
      label: 'Emergency Tag',
      class: 'mediumWidth',
    },
    {
      key: 'cycle_date',
      label: 'Cycle Date',
      class: 'mediumWidth',
    },
    {
      key: 'month',
      label: 'Month',
      class: 'mediumWidth',
    },
    {
      key: 'funded_by',
      label: 'Funded By',
      class: 'mediumWidth',
    },
    {
      key: 'Project_Code',
      label: 'Project Code',
      class: 'mediumWidth',
    },
    {
      key: 'proj_name',
      label: 'Project Name',
      class: 'mediumWidth',
    },
    {
      key: 'proj_deadline',
      label: 'Project Deadline',
      class: 'mediumWidth',
    },
    {
      key: 'project_plan',
      label: 'Project Plan',
      class: 'mediumWidth',
    },
    {
      key: 'category',
      label: 'Category',
      class: 'mediumWidth',
    },
    {
      key: 'volume_provied',
      label: 'Volume Provied',
      class: 'mediumWidth',
    },
    {
      key: 'liter_cpd',
      label: 'Liter Capital Per Day',
      class: 'mediumWidth',
    },
  ],
  activityItem: [],
  //
  invExportField: {},
  invField: [],
  invItem: [],
  year: { title: 2022, value: 2022 },
  yearOptions: [
    { title: '2021', value: 2021 },
    { title: '2022', value: 2022 },
    { title: '2023', value: 2023 },
  ],
}
