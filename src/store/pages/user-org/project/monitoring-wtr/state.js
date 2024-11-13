export default {
  saved: false,
  show: false,

  showFilter: false,
  showColumn: false,
  //
  typeOptions: [],
  cadOptions: [],
  issOptions: [],
  CycleTypeOptions: [
    {
      title: 'Periodic',
      value: 1,
      variant: 'success',
    },
  ],
  CaseStatusOptions: [
    {
      title: 'New',
      value: 1,
      variant: 'warning',
    },
    {
      title: 'On Going',
      value: 2,
      variant: 'danger',
    },
    {
      title: 'On Progress',
      value: 3,
      variant: 'info',
    },
    {
      title: 'Verified',
      value: 4,
      variant: 'success',
    },
  ],
  MonitoringStatusOptions: [
    {
      title: 'Pending',
      value: 1,
      variant: 'warning',
    },
    {
      title: 'Approved',
      value: 2,
      variant: 'info',
    },
    {
      title: 'Terminated',
      value: 3,
      variant: 'danger',
    },
    {
      title: 'Published',
      value: 4,
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
  organization: null,
  rangedate: null,
  case_status: null,
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
  deleteItem: [],
  fieldsSelect: [],
  caseItem: [],

  caseFieldOp: [
    {
      value: {
        key: 'cycle_code',
        label: 'Cycle Code',
        class: 'code_column',
        sortable: true,
        json: { 'Cycle Code': 'cycle_code' },
      },
      label: 'Cycle Code',
      disabled: true,
    },
    {
      value: {
        key: 'cycle_type',
        label: 'Cycle Type',
        class: 'code_column',
        sortable: true,
        json: { 'Cycle Type': 'cycle_type' },
      },
      label: 'Cycle Type',
      disabled: true,
    },
    {
      value: {
        key: 'monitoring_status',
        label: 'Monitoring Status',
        class: 'monitoring_status',
        sortable: true,
        json: { 'Monitoring Status': 'monitoring_status' },
      },
      label: 'Monitoring Status',
      disabled: true,
    },
    {
      value: {
        key: 'cycle_status',
        label: 'Cycle Status',
        class: 'code_column',
        sortable: true,
        json: { 'Cycle Status': 'cycle_status' },
      },
      label: 'Cycle Status',
      disabled: true,
    },
    {
      value: {
        key: 'pd',
        label: 'PD Number',
        class: 'code_column',
        sortable: true,
        json: { 'PD Number': 'pd' },
      },
      label: 'PD Number',
      disabled: true,
    },
    {
      value: {
        key: 'p_code',
        label: 'P_Code',
        class: 'code_column',
        sortable: true,
        json: { P_Code: 'p_code' },
      },
      label: 'P_Code',
      disabled: true,
    },
    {
      value: {
        key: 'is_name',
        label: 'Iss Name',
        class: 'code_column',
        sortable: true,
        json: { 'Iss Name': 'is_name' },
      },
      label: 'Iss Name',
      disabled: true,
    },

    {
      value: {
        key: 'org_prefix',
        label: 'Donor',
        class: 'code_column',
        sortable: true,
        json: { Donor: 'org_prefix' },
      },
      label: 'Donor',
      disabled: true,
    },
    {
      value: {
        key: 'supp_name',
        label: 'Supp Name',
        class: 'code_column',
        sortable: true,
        json: { 'Supp Name': 'supp_name' },
      },
      label: 'Supp Name',
      disabled: true,
    },
    {
      value: {
        key: 'created_date',
        label: 'Created Date',
        class: 'code_column',
        sortable: true,
        json: { 'Created Date': 'created_date' },
      },
      label: 'Created Date',
      disabled: true,
    },
    {
      value: {
        key: 'cycle_deadline',
        label: 'Cycle Deadline',
        class: 'code_column',
        sortable: true,
        json: { 'Cycle Deadline': 'cycle_deadline' },
      },
      label: 'Cycle Deadline',
      disabled: true,
    },

    {
      value: {
        key: 'qouta_cd',
        label: 'Quota C/D',
        class: 'code_column',
        sortable: true,
        json: { 'Quota C/D': 'qouta_cd' },
      },
      label: 'Quota C/D',
      disabled: true,
    },
    {
      value: {
        key: 'description',
        label: 'Description',
        class: 'code_column',
        sortable: true,
        json: { Description: 'description' },
      },
      label: 'Description',
      disabled: true,
    },
    {
      value: {
        key: 'approved',
        label: 'Approved',
        class: 'code_column',
        sortable: true,
        json: { Approved: 'approved' },
      },
      label: 'Approved',
      disabled: true,
    },
    {
      value: {
        key: 'assigned_by_name',
        label: 'Assigned By',
        class: 'code_column',
        sortable: true,
        json: { 'Assigned By': 'assigned_by_name' },
      },
      label: 'Assigned By',
      disabled: true,
    },
    {
      value: {
        key: 'approve_date',
        label: 'Approve Date',
        class: 'code_column',
        sortable: true,
        json: { 'Approve Date': 'approve_date' },
      },
      label: 'Approve Date',
      disabled: true,
    },
    {
      value: {
        key: 'assigned_by_name',
        label: 'Assigned By',
        class: 'code_column',
        sortable: true,
        json: { 'Assigned By': 'assigned_by_name' },
      },
      label: 'Assigned By',
      disabled: true,
    },
    {
      value: {
        key: 'approved_by_name',
        label: 'Approved BY',
        class: 'code_column',
        sortable: true,
        json: { 'Approved BY': 'approved_by_name' },
      },
      label: 'Approved BY',
      disabled: true,
    },
    {
      value: {
        key: 'approval_notes',
        label: 'Approval Notes',
        class: 'code_column',
        sortable: true,
        json: { 'Approval Notes': 'approval_notes' },
      },
      label: 'Approval Notes',
      disabled: true,
    },
    {
      value: {
        key: 'published',
        label: 'Published',
        class: 'code_column',
        sortable: true,
        json: { Published: 'published' },
      },
      label: 'Published',
      disabled: true,
    },

    {
      value: {
        key: 'published_date',
        label: 'Published Date',
        class: 'code_column',
        sortable: true,
        json: { 'Published Date': 'published_date' },
      },
      label: 'Published Date',
      disabled: true,
    },
    {
      value: {
        key: 'published_notes',
        label: 'Published Notes',
        class: 'code_column',
        sortable: true,
        json: { 'Published Notes': 'published_notes' },
      },
      label: 'Published Notes',
      disabled: true,
    },
    {
      value: {
        key: 'published_by_name',
        label: 'Published BY',
        class: 'code_column',
        sortable: true,
        json: { 'Published BY': 'published_by_name' },
      },
      label: 'Published BY',
      disabled: true,
    },

    {
      value: {
        key: 'downloaded',
        label: 'Downloaded',
        class: 'code_column',
        sortable: true,
        json: { Downloaded: 'downloaded' },
      },
      label: 'Downloaded',
      disabled: true,
    },
    {
      value: {
        key: 'downloaded_date',
        label: 'Downloaded Date',
        class: 'code_column',
        sortable: true,
        json: { 'Downloaded Date': 'downloaded_date' },
      },
      label: 'Downloaded Date',
      disabled: true,
    },
    {
      value: {
        key: 'downloaded_by_name',
        label: 'Downloaded By',
        class: 'code_column',
        sortable: true,
        json: { 'Downloaded By': 'downloaded_by_name' },
      },
      label: 'Downloaded By',
      disabled: true,
    },

    {
      value: {
        key: 'quantity_needed',
        label: 'Quantity Needed',
        class: 'code_column',
        sortable: true,
        json: { 'Quantity Needed': 'quantity_needed' },
      },
      label: 'Quantity Needed',
      disabled: true,
    },
    {
      value: {
        key: 'quantity_filled',
        label: 'Quantity Filled',
        class: 'code_column',
        sortable: true,
        json: { 'Quantity Filled': 'quantity_filled' },
      },
      label: 'Quantity Filled',
      disabled: true,
    },

    {
      value: {
        key: 'quantity_varified',
        label: 'Quantity Verfied',
        class: 'code_column',
        sortable: true,
        json: { 'Quantity Verfied': 'quantity_varified' },
      },
      label: 'Quantity Verfied',
      disabled: true,
    },
    {
      value: {
        key: 'deffrnc',
        label: 'Quantity Deffrence',
        class: 'code_column',
        sortable: true,
        json: { 'Quantity Deffrence': 'deffrnc' },
      },
      label: 'Quantity Deffrence',
      disabled: true,
    },
  ],
  caseField: [
    {
      key: 'monitoring_status',
      label: 'Monitoring Status',
      class: 'code_column',
      sortable: true,
      json: { 'Monitoring Status': 'monitoring_status' },
    },
    {
      key: 'cycle_status',
      label: 'Cycle Status',
      sortable: true,
      json: { 'Cycle Status': 'cycle_status' },
    },
    {
      key: 'cycle_code',
      label: 'Cycle Code',
      sortable: true,
      json: { 'Cycle Code': 'cycle_code' },
    },
    {
      key: 'cycle_type',
      label: 'Cycle Type',
      class: 'code_column',
      sortable: true,
      json: { 'Cycle Type': 'cycle_type' },
    },

    {
      key: 'p_code',
      label: 'P_Code',
      class: 'p_code',
      json: { P_Code: 'p_code' },
    },
    {
      key: 'is_name',
      label: 'Iss Name',
      json: { 'Iss Name': 'is_name' },
    },
    {
      key: 'pd',
      label: 'PD Number',
      class: 'p_code',
      json: { 'PD Number': 'pd' },
    },
    {
      key: 'org_prefix',
      label: 'Donor',
      json: { Donor: 'org_prefix' },
    },
    {
      key: 'supp_name',
      label: 'Supp Name',
      json: { 'Supp Name': 'supp_name' },
    },
    {
      key: 'created_date',
      label: 'Created Date',
      json: { 'Created Date': 'created_date' },
    },

    {
      key: 'cycle_deadline',
      label: 'Cycle Deadline',
      json: { 'Cycle Deadline': 'cycle_deadline' },
    },
    /* {
      key: 'cycle_deadline_day',
      label: 'Cycle Deadline Day',
      json: { 'Cycle Deadline Day': 'cycle_deadline_day' },
    }, */

    {
      key: 'qouta_cd',
      label: 'Qouta CD',
      json: { 'Qouta CD': 'qouta_cd' },
    },
    {
      key: 'description',
      label: 'Description',
      json: { description: 'description' },
    },
    {
      key: 'quantity_needed',
      label: 'Quantity Needed',
      json: { 'Quantity Needed': 'quantity_needed' },
    },
    {
      key: 'quantity_filled',
      label: 'Quantity Filled',
      json: { 'Quantity Filled': 'quantity_filled' },
    },

    {
      key: 'quantity_varified',
      label: 'Quantity Verfied',
      json: { 'Quantity Verfied': 'quantity_varified' },
    },

    {
      key: 'deffrnc',
      label: 'Quantity Deffrence',
      json: { 'Quantity Deffrence': 'deffrnc' },
    },

    {
      key: 'approved',
      label: 'Approved',
      json: { Approved: 'approved' },
    },

    {
      key: 'assigned_by_name',
      label: 'Assigned By',
      json: { 'Assigned By': 'assigned_by_name' },
    },

    {
      key: 'approve_date',
      label: 'Approve Date',
      json: { 'Approve Date': 'approve_date' },
    },
    {
      key: 'approved_by_name',
      label: 'Approved BY',
      json: { approved_by_name: 'approved_by_name' },
    },

    {
      key: 'approval_notes',
      label: 'Approval Notes',
      json: { 'Approval Notes': 'approval_notes' },
    },
    {
      key: 'published',
      label: 'Published',
      json: { Published: 'published' },
    },
    {
      key: 'published_date',
      label: 'published_date',
      json: { published_date: 'published_date' },
    },
    {
      key: 'published_notes',
      label: 'Published Notes',
      json: { 'Published Notes': 'published_notes' },
    },

    {
      key: 'published_by_name',
      label: 'Published BY',
      json: { 'Published BY': 'published_by_name' },
    },
    {
      key: 'downloaded',
      label: 'Downloaded',
      json: { Downloaded: 'downloaded' },
    },
    {
      key: 'downloaded_date',
      label: 'Downloaded Date',
      json: { 'Downloaded Date': 'downloaded_date' },
    },
    {
      key: 'downloaded_by_name',
      label: 'Downloaded By',
      json: { downloaded_by_name: 'downloaded_by_name' },
    },

  ],
  showModalRef: { active: false },
  selectedOrgRef: [],
  orgList: [],
  json_fields: {},
}
