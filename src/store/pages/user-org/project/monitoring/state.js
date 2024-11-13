export default {
  saved: false,
  show: false,
  showEnd: false,
  showEndADV: false,
  endItem: null,

  showFilter: false,
  showColumn: false,
  percentage: 10,
  rangedateME: null,

  //
  typeOptions: [],
  cadOptions: [],
  issOptions: [],
  awarenessOptions: [
    {
      title: 'Not Awarened',
      value: 0,
    },
    {
      title: 'In Progress',
      value: 1,
    },
    {
      title: 'Awarened',
      value: 2,
    },
  ],
  monitoringdOptions: [
    {
      title: 'Monitored',
      value: 1,
    },
    {
      title: 'Not Monitored',
      value: 0,
    },
  ],
  FeedBackOptions: [
    {
      title: 'None',
      value: 1,
    },
    {
      title: 'Pending',
      value: 2,
    },
    {
      title: 'Feedback Received',
      value: 3,
    },
  ],
  CaseStatusOptions: [
    {
      title: 'Uknown',
      value: 0,
      variant: 'warning',
    },
    {
      title: 'New Enrty',
      value: 1,
      variant: 'info',
    },
    {
      title: 'New Link',
      value: 2,
      variant: 'info',
    },
    {
      title: 'Assessment',
      value: 3,
      variant: 'primary',
    },
    {
      title: 'Link Assessment',
      value: 4,
      variant: 'primary',
    },
    {
      title: 'Task Manager',
      value: 5,
      variant: 'warning',
    },
    {
      title: 'Pending to Deliver',
      value: 6,
      variant: 'warning',
    },
    {
      title: 'Not Deliverd',
      value: 7,
      variant: 'danger',
    },
    {
      title: 'Terminated',
      value: 8,
      variant: 'danger',
    },
    {
      title: 'Delivered',
      value: 9,
      variant: 'success',
    },
    {
      title: 'Finished',
      value: 10,
      variant: 'success',
    },
  ],
  // Filters
  referral: null,
  district: null,
  governorate: null,
  type: null,
  iss: null,
  cadaster: null,
  rangedate: null,
  dlv_status: null,
  case_status: null,
  awareness: null,
  monitoring: null,
  feedback: null,
  // Table Options
  perPage: 10, // Default View Pages
  pageOptions: [1, 10, 20, 30, 40, 50, 100, 200, 300, 400, 500, 1000], // Number in Page
  currentPage: 1, // Current Page
  totalRows: 0,
  /// Sort
  sortBy: '', // Sort By Referral ...
  sortDesc: false, // Sort desc
  sortDirection: 'asc', // Sort Direction
  /// Filter
  filter: null,
  filterOn: [],
  // Data
  caseItem: [],
  fieldsSelect: [],
  caseFieldOp: [
    {
      value: {
        key: 'case_status',
        label: 'Case Status',
        sortable: true,
        stickyColumn: true,
        json: { 'Case Status': 'case_status' },
      },
      label: 'Case Status',
      disabled: true,
    },
    {
      value: {
        key: 'reason_comments',
        label: 'Reason Comment',
        sortable: true,
        json: { 'Reason Comment': 'reason_comments' },
      },
      label: 'Reason Comment',
    },
    {
      value: {
        key: 'current_status',
        label: 'Case Info',
        class: 'current_status',
        json: { 'Case Info': 'current_status' },
      },
      label: 'Case Info',
    },
    {
      value: {
        key: 'referral_name',
        label: 'Referral',
        sortable: true,
        json: { Referral: 'referral_name' },
      },
      label: 'Referral',
    },
    {
      value: {
        key: 'case_code',
        label: 'Case Code',
        sortable: true,
        class: 'code_column',
        json: { 'Case Code': 'case_code' },
      },
      label: 'Case Code',
      disabled: true,
    },
    {
      value: {
        key: 'full_name',
        label: 'Full Name',
        sortable: true,
        class: 'code_column',
        json: { 'Case Name': 'full_name' },
      },
      label: 'Full Name',
      disabled: true,
    },
    {
      value: {
        key: 'awareness_status',
        label: 'Awareness',
        sortable: true,
        json: { Awareness: 'awareness_status' },
      },
      label: 'Awareness',
    },
    {
      value: {
        key: 'case_feedback',
        label: 'Feedback',
        sortable: true,
        json: { FeedBack: 'case_feedback' },
      },
      label: 'Feedback',
    },
    {
      value: {
        key: 'pcr_date',
        label: 'PCR Date',
        sortable: true,
        json: { 'PCR Date': 'pcr_date' },
      },
      label: 'PCR Date',
    },

    {
      value: {
        key: 'pcr_result_name',
        label: 'PCR Result',
        sortable: true,
        json: { 'PCR Result': 'pcr_result_name' },
      },
      label: 'PCR Result',
    },

    {
      value: {
        key: 'p_code',
        label: 'P-Code',
        class: 'code_column',
        sortable: true,
        json: { 'P-Code': 'p_code' },
      },
      label: 'P-Code',
    },
    {
      value: {
        key: 'nationality_name',
        label: 'Nationality',
        sortable: true,
        json: { Nationality: 'nationality_name' },
      },
      label: 'Nationality',
    },
    {
      value: {
        key: 'governorate_name',
        label: 'Governorate',
        sortable: true,
        json: { Governorate: 'governorate_name' },
      },
      label: 'Governorate',
    },
    {
      value: {
        key: 'district_name_eng',
        label: 'District',
        sortable: true,
        json: { District: 'district_name_eng' },
      },
      label: 'District',
    },
    {
      value: {
        key: 'cadastre_name',
        label: 'Cadaster',
        sortable: true,
        json: { Cadaster: 'cadastre_name' },
      },
      label: 'Cadaster',
    },
    {
      value: {
        key: 'name',
        label: 'Settlement Type',
        sortable: true,
        json: { 'Settlement Type': 'name' },
      },
      label: 'Settlement Type',
    },
    {
      value: {
        key: 'sattlement_name',
        label: 'Settlement',
        sortable: true,
        json: { Sattlement: 'sattlement_name' },
      },
      label: 'Settlement',
    },
    {
      value: {
        key: 'case_phone',
        label: 'Phone',
        sortable: true,
        json: { Phone: 'case_phone' },
      },
      label: 'Phone',
    },
    {
      value: {
        key: 'com_user_name',
        label: 'Comunication',
        sortable: true,
        json: { Comunication: 'com_user_name' },
      },
      label: 'Comunication',
    },
    {
      value: {
        key: 'com_user_org',
        label: 'Comunication Organization',
        sortable: true,
        json: { 'Comunication Organization': 'com_user_org' },
      },
      label: 'Comunication Organization',
    },
    {
      value: {
        key: 'dlvry_user_name',
        label: 'Delivery',
        sortable: true,
        json: { Delivery: 'dlvry_user_name' },
      },
      label: 'Delivery',
    },
    {
      value: {
        key: 'dlvry_user_org',
        label: 'Delivery Organization',
        sortable: true,
        json: { 'Delivery Organization': 'dlvry_user_org' },
      },
      label: 'Delivery Organization',
    },
    {
      value: {
        key: 'ditrib_kits',
        label: 'Delivery Kits',
        sortable: true,
        json: { 'Delivery Kits': 'ditrib_kits' },
      },
      label: 'Delivery Kits',
    },
    {
      value: {
        key: 'created_date',
        label: 'Created Date',
        sortable: true,
        json: { 'Created Date': 'created_date' },
      },
      label: 'Created Date',
    },
    {
      value: {
        key: 'adresstext',
        label: 'adresstext',
        class: 'code_column',
        json: { Adress: 'adresstext' },
      },
      label: 'adresstext',
    },
    {
      value: {
        key: 'progress_date',
        label: 'Progress Date',
        sortable: true,
        json: { 'Progress Date': 'progress_date' },
      },
      label: 'Progress Date',
    },
    {
      value: {
        key: 'monitoring_done',
        label: 'Monitoring',
        sortable: true,
        json: { Monitoring: 'monitoring_done' },
      },
      label: 'Monitoring',
    },
    {
      value: {
        key: 'priority_level',
        label: 'Priority',
        sortable: true,
        json: { Priority: 'priority' },
      },
      label: 'Priority',
    },
    {
      value: {
        key: 'com_status',
        label: 'Follow-up Comments',
        sortable: true,
        class: 'current_status',
        json: { 'Follow-up Comments': 'com_status' },
      },
      label: 'Follow-up Comments',
    },
    {
      value: {
        key: 'dlvry_comments',
        label: 'Delivery Comments',
        sortable: true,
        class: 'current_status',
        json: { 'Delivery Comments': 'dlvry_comments' },
      },
      label: 'Delivery Comments',
    },
    {
      value: {
        key: 'show_details',
        label: 'Show Details',
        json: { 'Case Full Info': 'case_full_info' },
      },
      label: 'Show Details',
    },

    /* { key: 'decision_name', label: 'Decision Name', sortable: true },
       { key: 'delivery_date', label: 'Delivery Date', sortable: true },
       { key: 'delivery_latitiude', label: 'Delivery Latitiude', sortable: true },
       { key: 'delivery_longtitude', label: 'Delivery Longtitude', sortable: true },
       { key: 'priority_level', label: 'Priority', sortable: true },
       { key: 'actions', stickyColumnRight: true, label: 'Action' },
       */
  ],
  caseField: [
    {
      key: 'case_status',
      label: 'Case Status',
      sortable: true,
      stickyColumn: true,
      json: { 'Case Status': 'case_status' },
    },
    {
      key: 'reason_comments',
      label: 'Reason Comment',
      sortable: true,
      json: { 'Reason Comment': 'reason_comments' },
    },
    {
      key: 'current_status',
      label: 'Case Info',
      class: 'current_status',
      json: { 'Case Info': 'current_status' },
    },
    {
      key: 'referral_name',
      label: 'Referral',
      sortable: true,
      json: { Referral: 'referral_name' },
    },
    {
      key: 'case_code',
      label: 'Case Code',
      sortable: true,
      class: 'code_column',
      json: { 'Case Code': 'case_code' },
    },
    {
      key: 'full_name',
      label: 'Full Name',
      sortable: true,
      class: 'code_column',
      json: { 'Case Name': 'full_name' },
    },
    {
      key: 'awareness_status',
      label: 'Awareness',
      sortable: true,
      json: { Awareness: 'awareness_status' },
    },
    {
      key: 'case_feedback',
      label: 'Feedback',
      sortable: true,
      json: { FeedBack: 'case_feedback' },
    },
    {
      key: 'pcr_date',
      label: 'PCR Date',
      sortable: true,
      json: { 'PCR Date': 'pcr_date' },
    },
    {
      key: 'pcr_result_name',
      label: 'PCR Result',
      sortable: true,
      json: { 'PCR Result': 'pcr_result_name' },
    },

    {
      key: 'p_code',
      label: 'P-Code',
      class: 'code_column',
      sortable: true,
      json: { 'P-Code': 'p_code' },
    },
    {
      key: 'nationality_name',
      label: 'Nationality',
      sortable: true,
      json: { Nationality: 'nationality_name' },
    },
    {
      key: 'governorate_name',
      label: 'Governorate',
      sortable: true,
      json: { Governorate: 'governorate_name' },
    },
    {
      key: 'district_name_eng',
      label: 'District',
      sortable: true,
      json: { District: 'district_name_eng' },
    },
    {
      key: 'cadastre_name',
      label: 'Cadaster',
      sortable: true,
      json: { Cadaster: 'cadastre_name' },
    },
    {
      key: 'name',
      label: 'Settlement Type',
      sortable: true,
      json: { 'Settlement Type': 'name' },
    },
    {
      key: 'sattlement_name',
      label: 'Settlement',
      sortable: true,
      json: { Sattlement: 'sattlement_name' },
    },
    {
      key: 'case_phone',
      label: 'Phone',
      sortable: true,
      json: { Phone: 'case_phone' },
    },
    {
      key: 'com_user_name',
      label: 'Comunication',
      sortable: true,
      json: { Comunication: 'com_user_name' },
    },
    {
      key: 'com_user_org',
      label: 'Comunication Organization',
      sortable: true,
      json: { 'Comunication Organization': 'com_user_org' },
    },
    {
      key: 'dlvry_user_name',
      label: 'Delivery',
      sortable: true,
      json: { Delivery: 'dlvry_user_name' },
    },
    {
      key: 'dlvry_user_org',
      label: 'Delivery Organization',
      sortable: true,
      json: { 'Delivery Organization': 'dlvry_user_org' },
    },
    {
      key: 'ditrib_kits',
      label: 'Delivery Kits',
      sortable: true,
      json: { 'Delivery Kits': 'ditrib_kits' },
    },
    {
      key: 'created_date',
      label: 'Created Date',
      sortable: true,
      json: { 'Created Date': 'created_date' },
    },
    {
      key: 'adresstext',
      label: 'adresstext',
      class: 'code_column',
      json: { Adress: 'adresstext' },
    },
    {
      key: 'progress_date',
      label: 'Progress Date',
      sortable: true,
      json: { 'Progress Date': 'progress_date' },
    },
    {
      key: 'monitoring_done',
      label: 'Monitoring',
      sortable: true,
      json: { Monitoring: 'monitoring_done' },
    },
    {
      key: 'priority_level',
      label: 'Priority',
      sortable: true,
      json: { Priority: 'priority' },
    },
    {
      key: 'com_status',
      label: 'Follow-up Comments',
      sortable: true,
      class: 'current_status',
      json: { 'Follow-up Comments': 'com_status' },
    },
    {
      key: 'dlvry_comments',
      label: 'Delivery Comments',
      sortable: true,
      class: 'current_status',
      json: { 'Delivery Comments': 'dlvry_comments' },
    },
    {
      key: 'show_details',
      label: 'Show Details',
      json: { 'Case Full Info': 'case_full_info' },
    },
    /* { key: 'decision_name', label: 'Decision Name', sortable: true },
       { key: 'delivery_date', label: 'Delivery Date', sortable: true },
       { key: 'delivery_latitiude', label: 'Delivery Latitiude', sortable: true },
       { key: 'delivery_longtitude', label: 'Delivery Longtitude', sortable: true },
       { key: 'priority_level', label: 'Priority', sortable: true },
       { key: 'actions', stickyColumnRight: true, label: 'Action' },
       */
  ],
  json_fields: {},
  caseItemME: [],
}
