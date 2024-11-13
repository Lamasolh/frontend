<template>
  <b-modal
    id="transfermodal"
    v-model="active"
    ok-only
    no-close-on-backdrop
    class="modal-dialog"
    title="Return to User"
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
      ><p> Return Kits to <b class="text-danger">{{ currentorg ==null ?'': currentorg.title }}</b> warehouse from distributor (<b class="text-danger">{{ showModalReturn.item == null?'':showModalReturn.item.subtitle }}</b>)</p>
        <b-row>
          <b-col>
            <validation-provider
              v-slot="{ errors }"
              rules="required"
              name="Quantity"
            >
              <b-form-group>
                <label for="sb-default">Kits - Quantity</label>
                <b-form-spinbutton
                  id="sb-default"
                  v-model="value_qntty"
                  placeholder="1"
                  class="mb-1"
                  :min="1"
                  :max="total_kits ==null ? 1:showModalReturn.item.total_kits"
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
          Are you sure you want to Return the Kits from distributor(<b class="text-danger">{{ showModalReturn.item == null?'':showModalReturn.item.subtitle }}</b>) back to (<b class="text-danger">{{ currentorg ==null ?' ': currentorg.title }} </b>) warehouse?
        </p>
        <b-overlay
          :show="show"
          rounded="sm"
        >
          <b-button
            variant="warning"
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

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  data() {
    return {
      headerBgVariant: 'light-warning',
      headerTextVariant: 'light',
      bodyBgVariant: 'dark',
      bodyTextVariant: 'dark',
      footerBgVariant: 'warning',
      footerTextVariant: 'dark',
    }
  },
  computed: {
    ///
    ...takeState('inventory', 'showModalReturn')
      .expose([
        'active',
        'item',
        'index',
      ])
      .commit('inventory/SET_SHOW_RETURN_ADV')
      .map(),
    show: takeState('inventory', 'show').map(),
    showModalReturn: takeState('inventory', 'showModalReturn').commit('inventory/SET_SHOW_RET').map(),
    currentorg: takeState('inventory', 'currentOrg').map(),
    total_kits: takeState('inventory', 'total_kits').map(),
    value_qntty: takeState('inventory', 'value_ret_qntty').commit('inventory/SET_RET_QNTY').map(),
    selecteduser: takeState('inventory', 'selecteduser').commit('inventory/SET_REQ_USR').map(),
  },
  methods: {
    confirmRequest() {
      console.log(this.showModalReturn.item.id)
      this.selecteduser = this.showModalReturn.item.id
      if (this.total_kits >= 0) {
        this.$swal({
          title: `Are you sure you want to return ${this.value_qntty} kits?`,
          text: 'Return Request',
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
            this.$store.dispatch('inventory/REQUEST_RETURN', {
              type: this.$route.params.assmnttype,
              prefix: this.$route.params.prefixPrj,
              prefixRole: this.$route.params.prefixRole,
            }).then(res => {
              console.log('res', res)
              if (res === 1) {
                this.showModalReturn = {
                  active: false,
                }
                this.$swal({
                  icon: 'success',
                  title: 'Done!',
                  text: `${this.value_qntty} Kits requested successfully to return to ${this.currentorg.title} warehouse from distributor (${this.showModalReturn.item == null ? '' : this.showModalReturn.item.subtitle}).`,
                  customClass: {
                    confirmButton: 'btn btn-success',
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
      } else {
        this.$swal({
          icon: 'warning',
          title: 'HandIn Abored!',
          text: 'Should be enough quantity in warehouse to handIn!.',
          customClass: {
            confirmButton: 'btn btn-warning',
          },
        })
        this.value_qntty = 1
      }
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
      this.showModalReturn = {
        active: false,
        index: this.index,
        item: this.item,
      }
    },
  },
}
</script>
