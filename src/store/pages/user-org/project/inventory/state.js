export default {
  saved: false,
  show: true,
  showEdit: false,
  currentOrg: null,
  orgList: [],
  itmdis: null,
  /// Add
  project_items: [],
  item_select: [],
  supplier_from: [],
  supplier_select: [],
  warehouse_to: [],
  warehouse_select: [],
  waybill: null,
  qntty_item: 1,
  inv_date: null,
  inv_comments: null,
  isinv: false,
  qntty: 1,
  mainwarehouse: [],
  /// ////////// info
  stasticItem: [],
  infoItems: [
    {
      icon: 'BoxIcon',
      color: 'light-danger',
      title: '0 Kit',
      subtitle: 'Warehouse',
      customClass: 'mb-2 mb-xl-0',
    },
    {
      icon: 'TruckIcon',
      color: 'light-info',
      title: '0 Kit',
      subtitle: 'Distributors',
      customClass: 'mb-2 mb-xl-0',
    },
    {
      icon: 'ArrowUpRightIcon',
      color: 'light-success',
      title: '0 kit',
      subtitle: 'Request HandIn',
      customClass: 'mb-2 mb-sm-0',
    },
    {
      icon: 'ArrowDownLeftIcon',
      color: 'light-danger',
      title: '0 kit',
      subtitle: 'Request Return',
      customClass: 'mb-2 mb-sm-0',
    },
    {
      icon: 'ClockIcon',
      color: 'light-warning',
      title: ' 0 case',
      subtitle: 'Pending',
      customClass: '',
    },
  ],
  // distributor
  items: [],
  dis_total_kits: null,
  total_assignment: null,
  total_kits: null,
  total_request: null,
  total_return: null,
  total_kits_request: null,
  total_kits_return: null,
  ///
  showModalReq: { active: false, item: null, index: null },
  showModalReturn: { active: false, item: null, index: null },
  showModalCancelReq: { active: false, item: null, index: null },
  showModalTransfer: { active: false, item: null, index: null },

  showModalTransferReq: { active: false },
  showModalTransferRec: { active: false },

  /// \ ManageWare House ///////////////////////////////////////
  orglistselect: null,
  listWH: [],
  itemWar: [],
  itemMwar: [],
  item_field: [
    { key: 'org_name', label: 'Organization Name', sortable: true },
    { key: 'wh_name', label: 'Warehouse Name', sortable: true },
    { key: 'show_details', label: 'Details' },
    { key: 'action', label: 'Actions' },
    { key: 'drop', label: '' },
  ],
  // Table Options
  perPage: 10, // Default View Pages
  pageOptions: [1, 10, 20, 30, 40, 50, 100, 200, 300, 400, 500], // Number in Page
  currentPage: 1, // Current Page
  totalRows: 0,
  /// Sort
  sortBy: '', // Sort By Referral ...
  sortDesc: false, // Sort desc
  sortDirection: 'asc', // Sort Direction
  /// Filter
  filter: null,
  filterOn: [],
  /// transfer
  wh_id_frm: null,
  wh_id_to: null,
  wh_item_id_to: null,
  /// Moda
  ///
  wh_cancel_req: null,
  /// / add warehouse
  wh_name_eng: null,
  wh_name_ara: null,
  wh_type: null,
  wh_keeper: null,
  wh_cadastre: null,
  wh_org: null,
  wh_address: null,
  wh_cmnts: null,
  wh_id: null,
  org_from: null,
  org_to: null,
  selecteduser: null,
  value_qntty: 1,
  value_Warehouse: null,
  value_ret_qntty: 1,
  /// \ Report ///////////////////////////////////////
  selectedOrg: null,
  selectedOrgWar: null,
  WarehouseOp: [],
  orgListTrans: [],
  warOrgListTrans: [],

  /// /
  checkTrans: [],
  checkRec: [],

  selectCheckTrans: null,
  selectCheckRec: null,
  /// //

  range_rep_case: null,
  caseExportField: {
    'Entry Date': 'entry_date',
    'Reference Number': 'entry_ref_number',
    'Is Inventory': 'inv',
    'In Quantity': 'in_quantity',
    'Out Quantity': 'out_quantity',
    'Approved By': 'appoved_by',
    'Donor Name': 'donor_name',
    Notes: 'notes',
  },
  caseField: [
    // Info
    {
      key: 'entry_date',
      label: 'Entry Date',
      class: 'smallWidth',

    },
    {
      key: 'entry_ref_number',
      label: 'Reference Number',
    },
    {
      key: 'inv',
      label: 'Is Inventory',
    },
    {
      key: 'in_quantity',
      label: 'In Quantity',
    },
    {
      key: 'out_quantity',
      label: 'Out Quantity',
    },

    {
      key: 'appoved_by',
      label: 'Approved By',
    },
    {
      key: 'donor_name',
      label: 'Donor Name',
    },
    {
      key: 'notes',
      label: 'Notes',
      class: 'largeWidth',
    },
    // Details
  ],
  caseItem: [],
  selectItemRep: null,
  selectWarehouseRep: null,
}
