<template>
  <b-modal
    id="transfermodal"
    v-model="active"
    ok-only
    no-close-on-backdrop
    class="modal-dialog"
    title="Hand In to User"
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
      ><p> HandIn Kits from <b class="text-danger">{{ currentorg ==null ?' ': currentorg.title }}</b> warehouse(<b class="text-danger">{{ itmdis==null ?' ':itmdis.itemName }}</b>) </p>
        <b-row>
          <b-col>
            <validation-provider
              v-slot="{ errors }"
              name="Warehouse"
              rules="required"
            >
              <label for="sb-default">Warehouse</label>
              <v-select
                v-model="value_Warehouse"
                placeholder="Select a Warehouse."
                label="wh_name"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="listt"
                :state="errors.length > 0 ? false : null"
                @option:selected="ChangeWarehouse"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <validation-provider
              v-slot="{ errors }"
              :rules="'required|min_value:1|max_value:'+maxquantity"
              name="Quantity"
            >
              <b-form-group>
                <label for="sb-default">Kits - Quantity (Max Quantity:{{ maxquantity==null?'__ ':maxquantity }})</label>
                <b-form-input
                  id="sb-default"
                  v-model="value_qntty"
                  placeholder="__"
                  class="mb-1"
                  :disabled="value_Warehouse == null"
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
          Are you sure you want to Handin Kits from <b class="text-danger">{{ currentorg == null? 0:currentorg.title }}</b> warehouse to a distributor (<b class="text-danger">{{ showModalReq.item == null ?' ': showModalReq.item.subtitle }}</b>)?
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
    }
  },
  computed: {
    ///
    ...takeState('inventory', 'showModalReq')
      .expose([
        'active',
        'item',
        'index',
      ])
      .commit('inventory/SET_SHOW_REQ_ADV')
      .map(),
    show: takeState('inventory', 'show').map(),
    showModalReq: takeState('inventory', 'showModalReq').commit('inventory/SET_SHOW_REQ').map(),
    currentorg: takeState('inventory', 'currentOrg').map(),
    total_kits: takeState('inventory', 'total_kits').map(),
    value_qntty: takeState('inventory', 'value_qntty').commit('inventory/SET_REQ_QNTY').map(),
    selecteduser: takeState('inventory', 'selecteduser').commit('inventory/SET_REQ_USR').map(),
    value_Warehouse: takeState('inventory', 'value_Warehouse').commit('inventory/SET_VALUE_WAREHOUSE').map(),
    items: takeState('inventory', 'itemWar').commit('inventory/SET_ITEM_WAR').map(),
    itmdis: takeState('inventory', 'itmdis').commit('inventory/SET_ITEM_DIS').map(),

    currentOrg: takeState('inventory', 'currentOrg').map(),
    whidfrm: takeState('inventory', 'wh_id_frm').commit('inventory/SET_WH_FRM').map(),
    wh_idto: takeState('inventory', 'wh_id_to').commit('inventory/SET_HW_TO').map(),
    wh_item_id_to: takeState('inventory', 'wh_item_id_to').commit('inventory/SET_HW_TO_ITEM').map(),
    listt() {
      console.log(this.items.filter(el => el.wh_keeper_userid == null))
      return this.items.filter(el => el.wh_keeper_userid == null)
    },
    maxquantity() {
      if (this.value_Warehouse == null) {
        return 0
      }
      const p1 = this.listt.filter(el => el.warehouse_id === this.value_Warehouse.warehouse_id)[0]
        .wh_item.filter(el => el.items_id === this.itmdis.itemId)
      if (p1.length === 0) {
        return 0
      }
      const b = parseInt(p1[0].quantity, 10)
      if (this.showModalReq.item == null) {
        return 0
      }
      console.log('d', this.showModalReq.item)
      console.log('b', b)
      let c
      if (this.itmdis.itemId === 1) {
        c = this.showModalReq.item.total_assignment <= b ? this.showModalReq.item.total_assignment - parseInt(this.showModalReq.item.total_kits, 10) : b
      } else {
        c = b
      }
      console.log('c', c)
      return p1.length === 0 ? 0 : c
    },
  },
  mounted() {
    this.value_qntty = 0
    this.value_Warehouse = null
  },
  methods: {
    ChangeWarehouse() {
      console.log('cahnge')
      this.value_qntty = 0
    },
    confirmRequest() {
      this.selecteduser = this.showModalReq.item.id
      this.$refs.ModalRequestRules.validate().then(success => {
        if (success) {
          this.$swal({
            title: `Are you sure you want to handIn ${this.value_qntty} kits?`,
            text: 'HandIn Request',
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
              this.$store.dispatch('inventory/REQUEST_HANDIN', {
                type: this.$route.params.assmnttype,
                prefix: this.$route.params.prefixPrj,
                prefixRole: this.$route.params.prefixRole,
                item_id: this.itmdis.itemId,
              }).then(res => {
                if (res === 1) {
                  this.showModalReq = {
                    active: false,
                  }
                  this.$swal({
                    icon: 'success',
                    title: 'Done!',
                    text: `${this.value_qntty} Kits requested successfully to HandIn from ${this.currentorg.title} warehouse.`,
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
    abortion() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Request is aborted.',
          icon: 'ClipboardIcon',
          variant: 'warning',
        },
      })
      this.value_qntty = 0
      this.value_Warehouse = null
      this.showModalReq = {
        active: false,
        index: this.index,
        item: this.item,
      }
    },
  },
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
