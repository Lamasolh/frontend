<template>
  <b-modal
    id="transfermodal"
    v-model="active"
    ok-only
    no-close-on-backdrop
    class="modal-dialog"
    title="Transfer to another organization"
    :header-bg-variant="headerBgVariant"
    :header-border-variant="bodyTextVariant"
    :footer-border-variant="bodyTextVariant"
    data-backdrop="static"
    @close="abortion"
  >

    <b-container fluid>
      <validation-observer
        ref="ModalRequestRules"
        tag="form"
      >
        <p> Transfer from <b class="text-danger">{{ currentorg ==null ?' ': currentorg.title }}</b> warehouse </p>
        <b-row>
          <b-col>
            <validation-provider
              v-slot="{ errors }"
              name="My Warehouse"
              rules="required"
            >
              <label>Warehouse</label>
              <v-select
                v-model="value_Warehouse"
                placeholder="Select a Warehouse."
                label="wh_name"
                :options="listt"
                :state="errors.length > 0 ? false : null"
                @input="ChangeWarehouse"
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
              <label>Items</label>
              <v-select
                v-model="wh_item_id_to"
                placeholder="Select a Items"
                label="items_name"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="listItems"
                :state="errors.length > 0 ? false : null"
                @input="ChangeItemTrans"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <validation-provider
              v-slot="{ errors }"
              rules="required|min_value:1"
              name="Quantity"
            >
              <b-form-group>
                <label for="sb-default">Kits - Quantity</label>
                <b-form-spinbutton
                  id="sb-default"
                  v-model="value_qntty"
                  wrap
                  :disabled="wh_item_id_to==null"
                  placeholder="1"
                  class="mb-1"
                  :min="0"
                  :max="wh_item_id_to==null ? 1 :wh_item_id_to.quantity"
                />
                <small class="text-danger mb-1">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <validation-provider
              v-slot="{ errors }"
              rules="required"
              name="Organization"
            >
              <b-form-group>
                <label for="sb-default">Organization</label>
                <v-select
                  v-model="selectedOrg"
                  placeholder="Select a Organization."
                  label="title"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="orgListTrans"
                  :state="errors.length > 0 ? false : null"
                  @option:selected="ChangeOrganization"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <validation-provider
              v-slot="{ errors }"
              name="Warehouse"
              rules="required"
            >
              <label for="sb-default">Organization Warehouse</label>
              <v-select
                v-model="selectedOrgWar"
                placeholder="Select a Warehouse."
                label="title"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="warOrgListTrans"
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
          Are you sure you want to Transfer {{ wh_item_id_to == null ?' Kits': wh_item_id_to.items_name }}
          from <b class="text-danger">{{ value_Warehouse == null ?' ': value_Warehouse.wh_name }}</b>
          warehouse to Another organization (
          <b class="text-danger">{{ selectedOrg == null ?' ': selectedOrg.title }}:
            {{ selectedOrgWar == null ?' ': selectedOrgWar.title }}</b>)?
        </p>
        <b-overlay
          :show="show"
          rounded="sm"
        >
          <b-button
            variant="success"
            size="sm"
            class="float-right"
            @click="confirmRequest"
          >
            Confirm
          </b-button>
        </b-overlay>
      </div>
    </template>

  </b-modal>
</template>

<script>
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { takeState } from 'vuex-dot'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import vSelect from 'vue-select'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    vSelect,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  data() {
    return {
      headerBgVariant: 'light-success',
      headerTextVariant: 'light',
      bodyBgVariant: 'dark',
      bodyTextVariant: 'dark',
      footerBgVariant: 'success',
      footerTextVariant: 'dark',
      listItems: [],

    }
  },
  computed: {
    ///
    ...takeState('inventory', 'showModalTransfer')
      .expose([
        'active',
        'item',
        'index',
      ])
      .commit('inventory/SET_SHOW_TRANS_ADV')
      .map(),
    show: takeState('inventory', 'show').map(),
    showModalTransfer: takeState('inventory', 'showModalTransfer').commit('inventory/SET_SHOW_TRANS').map(),

    orgOptions: takeState('global', 'organization_data').map(),
    currentorg: takeState('inventory', 'currentOrg').map(),
    orgListTrans: takeState('inventory', 'orgListTrans').map(),
    warOrgListTrans: takeState('inventory', 'warOrgListTrans').commit('inventory/SET_LIST_ORG_WAR').map(),
    selectedOrg: takeState('inventory', 'selectedOrg').commit('inventory/SET_TRANS_ORG').map(),
    selectedOrgWar: takeState('inventory', 'selectedOrgWar').commit('inventory/SET_TRANS_ORG_WAR').map(),
    WarehouseOp: takeState('inventory', 'WarehouseOp').map(),
    wh_item_id_to: takeState('inventory', 'wh_item_id_to').commit('inventory/SET_HW_TO_ITEM').map(),

    value_qntty: takeState('inventory', 'value_qntty').commit('inventory/SET_REQ_QNTY').map(),

    value_Warehouse: takeState('inventory', 'value_Warehouse').commit('inventory/SET_VALUE_WAREHOUSE').map(),
    items: takeState('inventory', 'itemWar').commit('inventory/SET_ITEM_WAR').map(),

    listt() {
      console.log(this.items.filter(el => el.wh_keeper_userid == null))
      return this.items.filter(el => el.wh_keeper_userid == null)
    },
    maxquantity() {
      if (this.value_Warehouse == null) {
        return 0
      }
      const p1 = this.listt.filter(el => el.warehouse_id === this.value_Warehouse.warehouse_id)[0]
        .wh_item.filter(el => el.items_id === 1)
      if (p1.length === 0) {
        return 0
      }
      const b = parseInt(p1[0].quantity, 10)
      if (this.showModalTransfer.item == null) {
        return 0
      }
      console.log('d', this.showModalTransfer.item)

      const c = this.showModalTransfer.item.total_assignment <= b ? this.showModalTransfer.item.total_assignment - parseInt(this.showModalTransfer.item.total_kits, 10) : b

      return p1.length === 0 ? 0 : c
    },
  },
  mounted() {
    this.value_qntty = 1
    this.active = null
  },
  methods: {
    ChangeItemTrans() {
      this.value_qntty = 1
    },
    ChangeWarehouse(val) {
      console.log('cahnge')
      console.log(val)
      if (val !== null) {
        this.listItems = this.items.filter(el => el.warehouse_id === val.warehouse_id)[0].wh_item
        console.log(this.listItems)
        this.wh_item_id_to = null
        this.value_qntty = 0
      } else {
        this.listItems = []
        this.wh_item_id_to = null
        this.value_qntty = 0
      }
    },
    ChangeOrganization(val) {
      console.log('cahnddge')
      console.log(val)
      this.selectedOrgWar = null
      this.warOrgListTrans = []
      if (val != null) {
        this.$store.dispatch('inventory/GetOrgWarehouse', {
          type: this.$route.params.assmnttype,
          prefix: this.$route.params.prefixPrj,
          prefixRole: this.$route.params.prefixRole,
          org: val,
        })
      }
    },
    confirmRequest() {
      this.$refs.ModalRequestRules.validate().then(success => {
        if (success) {
          this.$swal({
            title: 'Transfer Kits to Another Organization?',
            html: `Are you sure you want to Transfer<b class="text-info"> ${this.wh_item_id_to == null ? ' Kits' : this.wh_item_id_to.items_name}:${this.value_qntty == null ? '0' : this.value_qntty}</b></b>
          from <b class="text-danger">${this.value_Warehouse == null ? ' ' : this.value_Warehouse.wh_name}</b>
          warehouse to another organization (
          <b class="text-danger">${this.selectedOrg == null ? ' ' : this.selectedOrg.title}:
            ${this.selectedOrgWar == null ? ' ' : this.selectedOrgWar.title}</b>)?`,
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
              this.$store.dispatch('inventory/TRANS_TO_ANOTHER_ORG', {
                type: this.$route.params.assmnttype,
                prefix: this.$route.params.prefixPrj,
                prefixRole: this.$route.params.prefixRole,
              }).then(res => {
                if (res === 1) {
                  this.showModalTransfer = {
                    active: false,
                  }
                  this.Refresh()
                  this.$swal({
                    icon: 'success',
                    title: 'Done!',
                    text: `${this.value_qntty}:${this.wh_item_id_to == null ? ' Kits' : this.wh_item_id_to.items_name} requested successfully to ${this.selectedOrg == null ? ' ' : this.selectedOrg.title}:${this.selectedOrgWar == null ? ' ' : this.selectedOrgWar.title} from ${this.value_Warehouse == null ? ' ' : this.value_Warehouse.wh_name} warehouse.`,
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
                this.value_qntty = 1
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
        }
      })
    },
    Refresh() {
      this.$store.dispatch('inventory/GET_INVENTORY_LIST', {
        type: this.$route.params.assmnttype,
        prefix: this.$route.params.prefixPrj,
      })
    },
    abortion() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Request is aborted.',
          icon: 'ClipboardIcon',
          variant: 'warning',
        },
      })
      this.value_qntty = 1
      this.wh_item_id_to = null
      this.value_Warehouse = null
      this.selectedOrg = null
      this.selectedOrgWar = null
      this.showModalTransfer = {
        active: false,
      }
    },
  },
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
