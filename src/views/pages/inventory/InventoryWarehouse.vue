<template>
  <div>
    <b-card>
      <b-row align-h="between">
        <b-col cols="9">
          Warehouse Manager
        </b-col>

        <b-col
          cols="3"
        >
          <b-button
            variant="link"
            @click="Refresh"
          >
            Refresh
            <feather-icon
              icon="RefreshCcwIcon"
            />
          </b-button>
        </b-col>
      </b-row>
      <br>
      <!-- form -->
      <b-form>
        <b-row>
          <b-table
            ref="selectableTable"
            striped
            hover
            small
            bordered
            :selected-variant="$store.state.appConfig.layout.skin === 'dark'?'active':'primary'"
            :items="items"
            :fields="item_field"
            show-empty
            empty-text="No matching records found"
            primary-key="id"
          >
            <template #table-caption>
              <div>
                <span class="text-muted ml-2 mr-4">
                  Rows: {{ totalRows }}
                </span>
              </div>
            </template>
            <template #table-busy>
              <div class="text-center text-primary my-2">
                <b-spinner class="align-middle" />
                <strong>Loading...</strong>
              </div>
            </template>
            <template #cell(show_details)="row">
              <b-button
                size="sm"
                class="mr-2"
                variant="primary"
                block
                @click="row.toggleDetails"
              >
                {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
              </b-button>
            </template>
            <template #row-details="row">
              <b-card>
                <b-row>
                  <b-col
                    v-if="row.item.wh_item.length>0"
                    sm="3"
                    class="text-sm-right"
                  >
                    <h3 class="text-info">
                      Items:
                    </h3>
                  </b-col>
                  <b-col v-if="row.item.wh_item.length>0">
                    <b-row
                      v-for="it in row.item.wh_item"
                      :key="it.items_id"
                    >
                      <h5 style="white-space: pre; font-size:16px;">
                        <b class="text-success"> {{ it.items_name }}</b>: <b class="text-warning">{{ it.quantity }}</b>
                      </h5>
                    </b-row>
                  </b-col>
                  <b-col
                    v-else
                    class="text-danger"
                  >
                    This is new warehouse Please Transfer items.
                  </b-col>
                </b-row>
                <hr>
                <b-row class="mb-2">
                  <b-col
                    sm="3"
                    class="text-sm-right"
                  >
                    <b>Details</b>
                  </b-col>
                  <b-col>
                    <b-row>
                      <p style="white-space: pre">
                        <b>Type:</b> {{ row.item.type_name }}
                      </p>
                    </b-row>
                    <b-row>
                      <p style="white-space: pre">
                        <b>Cadaster:</b> {{ row.item.cadastre_name }}
                      </p>
                    </b-row>
                    <b-row>
                      <p style="white-space: pre">
                        <b>Address:</b> {{ row.item.wh_address }}
                      </p>
                    </b-row>
                    <b-row>
                      <p style="white-space: pre">
                        <b>Comments:</b> {{ row.item.comments }}
                      </p>
                    </b-row>
                    <b-row>

                      <p style="white-space: pre">
                        <b>House keeper Name:</b> {{ row.item.full_name }}
                      </p>
                    </b-row>
                  </b-col>
                </b-row>
              </b-card>
            </template>
            <template #cell(action)="row">
              <b-button
                v-b-tooltip.hover
                variant="gradient-success"
                class="btn-icon"
                title="Transfer kits"
                @click="transfer(row)"
              >
                <feather-icon icon="ArrowRightIcon" />
              </b-button>
              <b-button
                v-show="row.item.wh_req.length>0"
                v-b-tooltip.hover
                variant="gradient-warning"
                class="btn-icon"
                title="Cancel request"
                @click="cancelRequest(row)"
              >
                <feather-icon icon="XIcon" />
              </b-button>
            </template>
            <template #cell(drop)="row">
              <b-dropdown
                v-show="row.item.wh_keeper_userid==null"
                variant="link"
                no-caret
                :right="true"
              >
                <template #button-content>
                  <feather-icon
                    icon="MoreVerticalIcon"
                  />
                </template>
                <b-dropdown-item @click="Edit(row)">
                  <feather-icon icon="EditIcon" />
                  <span class="align-middle">Edit Warehouse</span>
                </b-dropdown-item>
                <b-dropdown-item
                  v-show="row.item.main_warehouse===0"
                  @click="deleteWh(row)"
                >
                  <feather-icon
                    icon="Trash2Icon"
                  />
                  <span class="align-middle">Delete Warehouse</span>
                </b-dropdown-item>
              </b-dropdown>
            </template>
          </b-table>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-button
              v-b-modal.modal-no-backdrop
              variant="primary"
              block
              @click="addmodal"
            >
              <b-icon
                icon="plus-circle-fill"
              />
              Add new
            </b-button>
          </b-col>
          <b-col cols="3">
            <b-button
              v-b-modal.modal-no-backdrop
              variant="info"
              block
              @click="trasnfermodal"
            >
              <b-icon
                icon="arrow-up-left-circle"
              />
              Transfer Kit to Org.
            </b-button>
          </b-col>
          <b-col
            v-if="checkRec.length >0"
            cols="3"
          >
            <b-button
              v-b-modal.modal-no-backdrop
              variant="warning"
              block
              @click="trasnferRecModal"
            >
              <b-icon
                icon="arrow-down-circle"
              />
              Receive Request
            </b-button>
          </b-col>
          <b-col
            v-if="checkTrans.length >0"
            cols="3"
          >
            <b-button
              v-b-modal.modal-no-backdrop
              variant="success"
              block
              @click="trasnferReqModal"
            >
              <b-icon
                icon="arrow-up-circle"
              />
              Transfer Request
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
    <!-- transfer kits modal   -->
    <b-modal
      id="transfermodal"
      v-model="show1"
      ok-only
      no-close-on-backdrop
      class="modal-dialog"
      :title="`Transfer Kits from ${whidfrm_nam}`"
      :header-bg-variant="headerBgVariant"
      :header-border-variant="bodyTextVariant"
      :footer-border-variant="bodyTextVariant"
      data-backdrop="static"
      @close="abortion"
    >
      <b-container fluid>
        <validation-observer
          ref="transferhRules"
          tag="form"
        >
          <b-row>
            <b-col>
              <validation-provider
                v-slot="{ errors }"
                name="Warehouse"
                rules="required"
              >
                <label for="sb-default">Warehouse</label>
                <v-select
                  v-model="wh_idto"
                  placeholder="Select a Warehouse."
                  label="title"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="listt"
                  :state="errors.length > 0 ? false : null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <validation-provider
                v-slot="{ errors }"
                name="Items"
                rules="required"
              >
                <label for="sb-default">Items</label>
                <v-select
                  v-model="wh_item_id_to"
                  placeholder="Select a Items"
                  label="items_name"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="listItems"
                  :state="errors.length > 0 ? false : null"
                  @option:selected="ChangeItemTrans"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <validation-provider
                v-slot="{ errors }"
                :rules="'required|min_value:1|max_value:'+ (wh_item_id_to ==null? 1:wh_item_id_to.quantity)"
                name="items"
              >
                <b-form-group>
                  <label for="sb-default">Kits - Quantity (Max Quantity: {{ (wh_item_id_to ==null? '__':wh_item_id_to.quantity) }})</label>
                  <b-form-input
                    id="sb-default"
                    v-model="quantty"
                    wrap
                    :disabled="wh_item_id_to==null"
                    placeholder="1"
                    class="mb-1"
                    :min="1"
                    :max="wh_item_id_to==null ? 1 :wh_item_id_to.quantity"
                  />
                  <small class="text-danger mb-1">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>
          </b-row>
        </validation-observer>
      </b-container>

      <template #modal-footer>
        <div class="w-100">
          <p class="float-left">
            Are you sure you want to transfer Kits to a {{ wh_idto== null? 'different warehouse' :wh_idto.title }}?
          </p>
          <b-overlay
            :show="show"
            rounded="sm"
          >
            <b-button
              variant="warning"
              size="sm"
              :disabled="show"
              class="float-right"
              @click="confirmtransfer"
            >
              Confirm
            </b-button>
          </b-overlay>
        </div>
      </template>
    </b-modal>
    <!-- end transfer modal   -->
    <!-- Cancel request modal   -->
    <b-modal
      id="transfermodal"
      v-model="show3"
      ok-only
      no-close-on-backdrop
      class="modal-dialog"
      title="Cancel Request"
      :header-bg-variant="headerBgVariant"
      :header-border-variant="bodyTextVariant"
      :footer-border-variant="bodyTextVariant"
      data-backdrop="static"
      @close="abortionCancel"
    >
      <b-container fluid>
        <validation-observer
          ref="cancelRules"
          tag="form"
        >
          <b-row>
            <b-col>
              <validation-provider
                v-slot="{ errors }"
                name="Request"
                rules="required"
              >
                <label for="sb-default">Request</label>
                <v-select
                  v-model="wh_cancel_req"
                  placeholder="Select a Request."
                  label="title"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="listReq"
                  :state="errors.length > 0 ? false : null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>
          </b-row>
        </validation-observer>
      </b-container>

      <template #modal-footer>
        <div class="w-100">
          <p class="float-left">
            Are you sure you want to Cancel this request?
          </p>
          <b-overlay
            :show="show"
            rounded="sm"
          >
            <b-button
              variant="warning"
              size="sm"
              :disabled="show"
              class="float-right"
              @click="confirmCancel"
            >
              Cancel Request
            </b-button>
          </b-overlay>
        </div>
      </template>
    </b-modal>
    <!-- end Cancel request modal   -->
    <!-- add new warehouse modal   -->
    <b-modal
      id="addwarehousemodal"
      v-model="show2"
      ok-only
      no-close-on-backdrop
      class="modal-dialog"
      title="Add New Warehouse"
      :header-bg-variant="headerBgVariant"
      :header-border-variant="bodyTextVariant"
      :footer-border-variant="bodyTextVariant"
      data-backdrop="static"
      @close="abortionadd"
    >
      <b-container fluid>
        <validation-observer
          ref="addWhRules"
          tag="form"
        >

          <b-row>
            <b-col>
              <label for="sb-default">English warehouse Name</label>
              <validation-provider
                v-slot="{ errors }"
                name="English warehouse Name"
                rules="required"
              >
                <b-form-input
                  id="nameeng"
                  v-model="wh_name_eng"
                  :state="errors.length > 0 ? false : null"
                  placeholder="Enter a warehouse name in English"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <label for="sb-default">Arabic warehouse Name</label>
              <validation-provider
                v-slot="{ errors }"
                name="Arabic warehouse Name"
                rules="required"
              >
                <b-form-input
                  id="nameara"
                  v-model="wh_name_ara"
                  dir="rtl"
                  :state="errors.length > 0 ? false : null"
                  placeholder="أدخل اسم المستودع باللغة العربية"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <validation-provider
                v-slot="{ errors }"
                name="Warehouse Type"
                rules="required"
              >
                <label for="sb-default">Warehouse Type</label>
                <v-select
                  v-model="warehousetype"
                  placeholder="Select a Warehouse."
                  label="title"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :state="errors.length > 0 ? false : null"
                  :options="inv_warehouse"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <validation-provider
                v-slot="{ errors }"
                name="Cadaster"
                rules="required"
              >
                <label for="sb-default">Cadaster</label>
                <v-select
                  v-model="municipality"
                  placeholder="Select Cadaster."
                  :state="errors.length > 0 ? false : null"
                  label="title"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="municipalitySelect"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <label for="sb-default">Warehouse Address</label>
              <validation-provider
                v-slot="{ errors }"
                name="Warehouse Address"
                rules="required"
              >
                <b-form-input
                  id="whaddress"
                  v-model="wh_addrss"
                  dir="rtl"
                  :state="errors.length > 0 ? false : null"
                  placeholder="أدخل عنوان المستودع"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <label for="sb-default">Other Commnets</label>
              <b-form-input
                id="whcmnts"
                v-model="wh_cmnts"
                dir="rtl"
                placeholder="أي تعليقات أخرى"
              />
            </b-col>
          </b-row>
        </validation-observer>
      </b-container>

      <template #modal-footer>
        <div class="w-100">
          <p class="float-left">
            Adding new warehouse.
          </p>
          <b-overlay
            :show="show"
            rounded="sm"
          >
            <b-button
              variant="warning"
              size="sm"
              :disabled="show"
              class="float-right"
              @click="confirmsave"
            >
              Confirm
            </b-button>
          </b-overlay>
        </div>
      </template>
    </b-modal>
    <warehouse-edit
      v-if="rowEdit!=null"
      :items="rowEdit"
      @close="Refresh"
    />
    <WarehouseTrasnfer
      @close="abortionCancel"
    />
    <WarehouseTransReq
      @close="abortionCancel"
    />
    <WarehouseRec
      @close="abortionCancel"
    />
  </div>
</template>

<script>
import Ripple from 'vue-ripple-directive'
import { BButton } from 'bootstrap-vue'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'cleave.js/dist/addons/cleave-phone.us'
import { takeState } from 'vuex-dot'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import vSelect from 'vue-select'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import WarehouseEdit from './WarehouseEdit.vue'
import WarehouseTrasnfer from './ModalTransfer.vue'
import WarehouseTransReq from './ModalTransferReq.vue'
import WarehouseRec from './ModalTransferRec.vue'

export default {
  components: {
    vSelect,
    ValidationProvider,
    BButton,
    ValidationObserver,
    WarehouseEdit,
    WarehouseTrasnfer,
    WarehouseTransReq,
    WarehouseRec,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      rowEdit: null,
      rowTrans: null,
      totalRows: null,
      headerBgVariant: 'light-warning',
      headerTextVariant: 'light',
      bodyBgVariant: 'dark',
      bodyTextVariant: 'dark',
      footerBgVariant: 'warning',
      footerTextVariant: 'dark',
      listt: [],
      listItems: [],
      listReq: [],
      whidfrm_nam: null,
      maxx: null,
      fromwhKeep: null,
    }
  },
  computed: {
    // Show
    show: takeState('inventory', 'show').commit('inventory/SET_SHOW').map(),
    showEdit: takeState('inventory', 'showEdit').commit('inventory/SET_SHOW_EDIT').map(),
    municipalityOptions: takeState('global', 'municipality').map(),
    inv_warehouse: takeState('global', 'inv_warehouse').map(),
    orgOption: takeState('inventory', 'orglist').map(),
    // cancel
    wh_cancel_req: takeState('inventory', 'wh_cancel_req').commit('inventory/SET_WH_CNC_REQ').map(),
    // Transfer
    whidfrm: takeState('inventory', 'wh_id_frm').commit('inventory/SET_WH_FRM').map(),
    wh_idto: takeState('inventory', 'wh_id_to').commit('inventory/SET_HW_TO').map(),
    wh_item_id_to: takeState('inventory', 'wh_item_id_to').commit('inventory/SET_HW_TO_ITEM').map(),
    // Table Option
    perPage: takeState('inventory', 'perPage').commit('inventory/SET_PER_PAGE').map(),
    pageOptions: takeState('inventory', 'pageOptions').map(),
    currentPage: takeState('inventory', 'currentPage').commit('inventory/SET_CUR_PAGE').map(),
    sortBy: takeState('inventory', 'sortBy').commit('inventory/SET_SORT_BY').map(),
    sortDesc: takeState('inventory', 'sortDesc').commit('inventory/SET_SORT_DESC').map(),
    sortDirection: takeState('inventory', 'sortDirection').commit('inventory/SET_SORT_DIR').map(),
    filter: takeState('inventory', 'filter').commit('inventory/SET_FILTER').map(),
    filterOn: takeState('inventory', 'filterOn').commit('inventory/SET_FILTER_ON').map(),
    municipality: takeState('inventory', 'wh_cadastre').commit('inventory/SET_CADASTRE').map(),
    orglistselect: takeState('inventory', 'orglistselect').commit('inventory/SET_ORG').map(),
    warehousetype: takeState('inventory', 'wh_type').commit('inventory/SET_WH_TYPE').map(),
    wh_name_eng: takeState('inventory', 'wh_name_eng').commit('inventory/SET_WH_ENG_NAM').map(),
    wh_name_ara: takeState('inventory', 'wh_name_ara').commit('inventory/SET_WH_ARA_NAM').map(),
    wh_addrss: takeState('inventory', 'wh_address').commit('inventory/SET_WH_ADD').map(),
    wh_cmnts: takeState('inventory', 'wh_cmnts').commit('inventory/SET_WH_CMNTS').map(),
    whid: takeState('inventory', 'wh_id').commit('inventory/SET_WH_ID').map(),
    orgfrom: takeState('inventory', 'org_from').commit('inventory/SET_ORG_from').map(),
    quantty: takeState('inventory', 'qntty').commit('inventory/SET_TRNSF_QNTY').map(),
    selecteduser: takeState('inventory', 'selecteduser').commit('inventory/SET_REQ_USR').map(),
    value_qntty: takeState('inventory', 'value_qntty').commit('inventory/SET_REQ_QNTY').map(),

    checkTrans: takeState('inventory', 'checkTrans').map(),
    checkRec: takeState('inventory', 'checkRec').map(),

    municipalitySelect() {
      return this.municipalityOptions
    },
    // Item
    showModalTransfer: takeState('inventory', 'showModalTransfer').commit('inventory/SET_SHOW_TRANS').map(),
    showModalTransferRec: takeState('inventory', 'showModalTransferRec').commit('inventory/SET_SHOW_TRANS_REC').map(),
    showModalTransferReq: takeState('inventory', 'showModalTransferReq').commit('inventory/SET_SHOW_TRANS_REQ').map(),

    items: takeState('inventory', 'itemWar').commit('inventory/SET_ITEM_WAR').map(),
    item_field: takeState('inventory', 'item_field').map(),
    ...takeState('inventory', 'itemWar')
      .expose([
        'wh_name',
        'type_name',
        'org_name',
        'cadastre_name',
        'wh_address',
        'comments',
        'full_name',
        'main_warehouse',
      ])
      .commit('inventory/SET_ITEM_WAR')
      .map(),
  },
  watch: {
    items() {
      this.totalRows = this.items.length
    },
  },
  methods: {
    editModal() {
      console.log('Hi')
      this.showEdit = false
    },
    confirmtransfer() {
      console.log(this.wh_idto.whkeeper)
      console.log(this.fromwhKeep)
      console.log(this.wh_idto.whkeeper == null)
      console.log(this.fromwhKeep == null)
      return new Promise(() => {
        this.$refs.transferhRules.validate().then(success => {
          if (success) {
            this.$swal({
              title: `Are you sure you want to transfer ${this.quantty} Kits from ${this.whidfrm_nam} to ${this.wh_idto.title}?`,
              text: 'Trasnfer Kits',
              icon: 'info',
              showCancelButton: true,
              confirmButtonText: 'Yes!',
              customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-outline-danger ml-1',
              },
              buttonsStyling: false,
            }).then(reslt => {
              console.log('reslt')
              console.log(reslt)
              if (reslt.isConfirmed === true) {
                this.$nextTick(() => {
                  this.show2 = false
                })
                console.log(this.$route.params.prefixPrj)
                this.$store.dispatch('inventory/transfer_kits', {
                  prefix: this.$route.params.prefixPrj,
                  type: this.$route.params.assmnttype,
                }).then(rest => {
                  console.log('res', rest)
                  const res = rest.result
                  if (res === 1) {
                    this.$swal({
                      icon: 'success',
                      title: 'Done!',
                      text: 'Kits transfered successsfully.',
                      customClass: {
                        confirmButton: 'btn btn-success',
                      },
                    })
                    this.$nextTick(() => {
                      this.show1 = false
                      this.show2 = false
                    })
                    this.Refresh()
                  } else if (res === 2) {
                    this.$swal({
                      icon: 'warning',
                      title: 'Attention!',
                      text: rest.stat,
                      customClass: {
                        confirmButton: 'btn btn-success',
                      },
                    })
                  } else {
                    this.$toast({
                      component: ToastificationContent,
                      props: {
                        title: 'Failed!',
                        icon: 'EditIcon',
                        text: 'Operation Failed!',
                        variant: 'danger',
                      },
                    })
                  }
                }).catch(error => {
                  this.$nextTick(() => {
                    this.show1 = false
                    this.show2 = false
                  })
                  this.abortion()
                  this.$toast({
                    component: ToastificationContent,
                    props: {
                      title: 'Contact System administrator',
                      icon: 'EditIcon',
                      text: error,
                      variant: 'danger',
                    },
                  })
                })
              } else {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Transfer Kits is aborted.',
                    icon: 'ClipboardIcon',
                    variant: 'warning',
                  },
                })
              }
            })
          }
        })
      })
      /* if (this.wh_idto.whkeeper == null && this.fromwhKeep == null) {
        console.log('nul dddl')
      } if (this.wh_idto.whkeeper == null && this.fromwhKeep !== null) {
        this.$swal({
          title: `Are you sure you want to request ${this.quantty} kits to be transfered?`,
          text: 'Transfer Request',
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'Yes!',
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-warning ml-1',
          },
          buttonsStyling: false,
        }).then(result => {
          if (result.isConfirmed) {
            this.$nextTick(() => {
              this.show2 = false
            })
            this.selecteduser = this.fromwhKeep
            this.value_qntty = this.quantty
            this.$store.dispatch('inventory/REQUEST_RETURN', {
              prefix: this.$route.params.prefixPrj,
              prefixRole: this.$route.params.prefixRole,
            }).then(res => {
              console.log('res', res)
              if (res === 1) {
                this.$swal({
                  icon: 'success',
                  title: 'Done!',
                  text: 'transfer kit requested successfully.',
                  customClass: {
                    confirmButton: 'btn btn-success',
                  },
                })
                this.$nextTick(() => {
                  this.show1 = false
                  this.show2 = false
                })
                this.quantty = 1
                this.Refresh()
              } else {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Failed!',
                    icon: 'EditIcon',
                    text: 'Operation Failed!',
                    variant: 'danger',
                  },
                })
              }
            }).catch(error => {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Contact System administrator',
                  icon: 'EditIcon',
                  text: error,
                  variant: 'danger',
                },
              })
              this.$nextTick(() => {
                this.show1 = false
                this.show2 = false
              })
            })
          }
        })
      } else if (this.wh_idto.whkeeper !== null && this.fromwhKeep == null) {
        this.$swal({
          title: `Are you sure you want to request a transfer ${this.quantty} kits?`,
          text: 'Transfer Request',
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'Yes!',
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-warning ml-1',
          },
          buttonsStyling: false,
        }).then(result => {
          if (result.value) {
            this.selecteduser = this.wh_idto.whkeeper
            this.value_qntty = this.quantty
            this.$nextTick(() => {
              this.show1 = false
              this.show2 = false
            })
            console.log('///')
            this.$store.dispatch('inventory/REQUEST_HANDIN', {
              prefix: this.$route.params.prefixPrj,
              prefixRole: this.$route.params.prefixRole,
            }).then(res => {
              if (res === 1) {
                this.$swal({
                  icon: 'success',
                  title: 'Done!',
                  text: 'Transfer requested sent successfully.',
                  customClass: {
                    confirmButton: 'btn btn-success',
                  },
                })
                this.$nextTick(() => {
                  this.show1 = false
                  this.show2 = false
                })
                this.Refresh()
              } else {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Failed!',
                    icon: 'EditIcon',
                    text: 'Operation Failed!',
                    variant: 'danger',
                  },
                })
              }
            }).catch(error => {
              this.$nextTick(() => {
                this.show1 = false
                this.show2 = false
              })
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Contact System administrator',
                  icon: 'EditIcon',
                  text: error,
                  variant: 'danger',
                },
              })
            })
          }
        })
      } else if (this.wh_idto.whkeeper !== null && this.fromwhKeep !== null) {
        console.log('nul dddl')
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Transfer not allowed between these warehouses!',
            icon: 'EditIcon',
            text: 'error',
            variant: 'danger',
          },
        })
        this.$nextTick(() => {
          this.show1 = false
          this.show2 = false
        })
      }
      return true */
    },
    ChangeItemTrans() {
      this.quantty = 1
    },
    confirmsave() {
      return new Promise((resolve, reject) => {
        this.$refs.addWhRules.validate().then(success => {
          if (success) {
            this.show2 = false
            this.$swal({
              title: 'Are you sure you want to add new warehouse?',
              text: 'Adding',
              icon: 'info',
              showCancelButton: true,
              confirmButtonText: 'Yes!',
              customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-outline-danger ml-1',
              },
              buttonsStyling: false,
            }).then(() => {
              this.$store.dispatch('inventory/ADD_WAREHOUSE', {
                prefix: this.$route.params.prefixPrj,
                type: this.$route.params.assmnttype,
              }).then(res => {
                if (res === 1) {
                  this.municipality = []
                  this.orglistselect = []
                  this.warehousetype = []
                  this.wh_name_eng = ''
                  this.wh_name_ara = ''
                  this.wh_addrss = ''
                  this.wh_cmnts = ''
                  this.show2 = false
                  this.$swal({
                    icon: 'success',
                    title: 'Done!',
                    text: 'Warehouse added successsfully.',
                    customClass: {
                      confirmButton: 'btn btn-success',
                    },
                  })
                  this.show1 = false
                  this.show2 = false
                  this.Refresh()
                } else {
                  this.$toast({
                    component: ToastificationContent,
                    props: {
                      title: 'Contact System administrator',
                      icon: 'EditIcon',
                      text: 'Error',
                      variant: 'danger',
                    },
                  })
                }
              }).catch(error => {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Contact System administrator',
                    icon: 'EditIcon',
                    text: error,
                    variant: 'danger',
                  },
                })
              })
            })
            resolve(true)
          } else {
            reject()
          }
        })
      })
    },
    transfer(row) {
      console.log('WHlist', this.items, row)
      console.log('id', row.item.wh_keeper_userid)
      this.fromwhKeep = row.item.wh_keeper_userid
      if (row.item.quantity !== (0 || '0')) {
        this.orgfrom = row.item.org_id
        this.whidfrm = row.item.warehouse_id
        this.whidfrm_nam = row.item.wh_name
        this.maxx = row.item.quantity
        this.wh_idto = null
        this.wh_item_id_to = null
        this.listt = []
        this.listItems = row.item.wh_item.filter(el => el.quantity > 0)
        for (let i = 0; i < this.items.length; i += 1) {
          if (row.item.wh_keeper_userid == null) {
            if (this.items[i].warehouse_id !== this.whidfrm) {
              this.listt.push({
                title: this.items[i].wh_name,
                title_ar: this.items[i].wh_name,
                whkeeper: this.items[i].wh_keeper_userid,
                org_id: this.items[i].org_id,
                items: this.items[i].wh_item,
                value: this.items[i].warehouse_id,
              })
            }
          } else {
            // eslint-disable-next-line no-lonely-if
            if (this.items[i].warehouse_id !== this.whidfrm && this.items[i].wh_keeper_userid == null) {
              this.listt.push({
                title: this.items[i].wh_name,
                title_ar: this.items[i].wh_name,
                whkeeper: this.items[i].wh_keeper_userid,
                org_id: this.items[i].org_id,
                items: this.items[i].wh_item,
                value: this.items[i].warehouse_id,
              })
            }
          }
        }
        // this.hw_listto = this.items.filter(it => it.name.indexOf('Fran') !== this.whidfrm)
        console.log(this.listt)
        this.show1 = true
        this.wh_item_idto = null
        this.quantty = 1
      } else {
        this.$swal({
          title: 'Don\'t Have enough Kits to tranfer',
          text: 'Tranfer Kits',
          icon: 'error',
          confirmButtonText: 'ok',
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ml-1',
          },
          buttonsStyling: false,
        })
      }
    },
    confirmCancel() {
      return new Promise(() => {
        this.$refs.cancelRules.validate().then(success => {
          if (success) {
            this.$swal({
              title: 'Cancel Request',
              text: `Are you sure you want to cancel Request ${this.wh_cancel_req.title}?`,
              icon: 'info',
              showCancelButton: true,
              confirmButtonText: 'Yes!',
              customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-outline-danger ml-1',
              },
              buttonsStyling: false,
            }).then(reslt => {
              console.log('reslt')
              console.log(reslt)
              if (reslt.isConfirmed === true) {
                this.$nextTick(() => {
                  this.show3 = false
                })
                console.log(this.$route.params.prefixPrj)
                this.$store.dispatch('inventory/cancel_request', {
                  prefix: this.$route.params.prefixPrj,
                  type: this.$route.params.assmnttype,
                }).then(rest => {
                  console.log('res', rest)
                  const res = rest.result
                  if (res === 1) {
                    this.$swal({
                      icon: 'success',
                      title: 'Done!',
                      text: 'Kits transfered successsfully.',
                      customClass: {
                        confirmButton: 'btn btn-success',
                      },
                    })
                    this.$nextTick(() => {
                      this.show1 = false
                      this.show2 = false
                      this.show3 = false
                    })
                    this.Refresh()
                  } else {
                    this.$toast({
                      component: ToastificationContent,
                      props: {
                        title: 'Failed!',
                        icon: 'EditIcon',
                        text: 'Operation Failed!',
                        variant: 'danger',
                      },
                    })
                  }
                }).catch(error => {
                  this.$nextTick(() => {
                    this.show1 = false
                    this.show2 = false
                    this.show3 = false
                  })
                  this.abortion()
                  this.$toast({
                    component: ToastificationContent,
                    props: {
                      title: 'Contact System administrator',
                      icon: 'EditIcon',
                      text: error,
                      variant: 'danger',
                    },
                  })
                })
              } else {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Transfer Kits is aborted.',
                    icon: 'ClipboardIcon',
                    variant: 'warning',
                  },
                })
              }
            })
          }
        })
      })
    },
    cancelRequest(row) {
      this.show3 = true
      this.listReq = []
      this.wh_cancel_req = null
      this.listReq = row.item.wh_req
    },
    deleteWh(row) {
      this.$swal({
        title: `Are you sure you want to delete the selected warehouse(${row.item.wh_name})?`,
        text: 'Deletion Warehouse',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(reslt => {
        if (reslt.isConfirmed === true) {
          this.whid = row.item.warehouse_id
          this.show2 = false
          this.$store.dispatch('inventory/delete_WareHouse', {
            prefix: this.$route.params.prefixPrj,
            type: this.$route.params.assmnttype,
          }).then(res => {
            this.totalRows = this.items.length
            let titl
            let icn
            if (res[0].result === 0) {
              titl = 'Something went wrong please call system Administrator!'
              icn = 'error'
            } else if (res[0].result === 1) {
              titl = 'Warehouse deleted successfully'
              icn = 'success'
            } else if (res[0].result === 2) {
              titl = 'Warehouse holds transaction it will be just Deactivated!'
              icn = 'warning'
            } else if (res[0].result === 3) {
              titl = "Main-warehouse can't be deleted!"
              icn = 'error'
            } else if (res[0].result === 4) {
              titl = "Warehouse have stock can't be deleted!"
              icn = 'warning'
            }
            this.$swal({
              title: titl,
              text: `Deletion of Warehouse: ${row.item.wh_name}`,
              icon: icn,
              confirmButtonText: 'ok',
              customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-outline-danger ml-1',
              },
              buttonsStyling: false,
            })
            this.Refresh()
          }).catch(error => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Contact System administrator',
                icon: 'EditIcon',
                text: error,
                variant: 'danger',
              },
            })
          })
        }
      })
    },
    abortionadd() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Adding a warehouse is aborted.',
          icon: 'ClipboardIcon',
          variant: 'warning',
        },
      })
      this.municipality = []
      this.orglistselect = []
      this.warehousetype = []
      this.wh_name_eng = ''
      this.wh_name_ara = ''
      this.wh_addrss = ''
      this.wh_cmnts = ''
    },
    abortion() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Transfer Kits is aborted.',
          icon: 'ClipboardIcon',
          variant: 'warning',
        },
      })
      this.wh_idto = null
      this.listt = []
      this.quantty = 1
    },
    abortionCancel() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Cancel Request is aborted.',
          icon: 'ClipboardIcon',
          variant: 'warning',
        },
      })
      this.listReq = []
    },
    addmodal() {
      this.show2 = true
    },
    trasnfermodal() {
      this.showModalTransfer = {
        active: true,
      }
    },
    trasnferReqModal() {
      this.showModalTransferReq = {
        active: true,
      }
    },
    trasnferRecModal() {
      this.showModalTransferRec = {
        active: true,
      }
    },
    Edit(row) {
      this.rowEdit = row.item
      this.showEdit = true
    },
    Refresh() {
      this.$store.dispatch('inventory/GET_INVENTORY_LIST', {
        prefix: this.$route.params.prefixPrj,
        type: this.$route.params.assmnttype,
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
