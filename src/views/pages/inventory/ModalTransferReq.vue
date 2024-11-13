<template>
  <b-modal
    id="transfermodal"
    v-model="active"
    ok-only
    size="lg"
    no-close-on-backdrop
    class="modal-dialog"
    title="Reuest to another organization"
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
        <b-row>
          <b-col>
            <validation-provider
              v-slot="{ errors }"
              name="Sending Request"
              rules="required"
            >
              <label>Transfer Request</label>
              <v-select
                v-model="selectCheckTrans"
                placeholder="Select a Request"
                label="title"
                :options="checkTransOp"
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
          Are you sure you want to Cancel Request?
        </p>
        <b-overlay
          :show="show"
          rounded="sm"
        >
          <b-button
            variant="danger"
            size="sm"
            class="float-right"
            @click="confirmRequest"
          >
            Cancel Request
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
      headerBgVariant: 'light-danger',
      headerTextVariant: 'light',
      bodyBgVariant: 'dark',
      bodyTextVariant: 'dark',
      footerBgVariant: 'danger',
      footerTextVariant: 'dark',
    }
  },
  computed: {
    ///
    ...takeState('inventory', 'showModalTransferReq')
      .expose([
        'active',
      ])
      .commit('inventory/SET_SHOW_TRANS_ADV')
      .map(),
    show: takeState('inventory', 'show').map(),
    showModalTransferReq: takeState('inventory', 'showModalTransferReq').commit('inventory/SET_SHOW_TRANS_REQ').map(),
    checkTransOp: takeState('inventory', 'checkTrans').map(),

    selectCheckTrans: takeState('inventory', 'selectCheckTrans').commit('inventory/SET_SHOW_MODL_REQ').map(),
  },
  watch: {
    active() {
      this.selectCheckTrans = null
    },
  },
  mounted() {
    this.active = null
    this.selectCheckTrans = null
  },
  methods: {
    confirmRequest() {
      this.$refs.ModalRequestRules.validate().then(success => {
        if (success) {
          this.$swal({
            title: 'Cancel Request?',
            html: `Are you sure you want to Cancel this request<b class="text-danger">${this.selectCheckTrans.title}</b>`,
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
              this.$store.dispatch('inventory/TRANS_REQ', {
                prefix: this.$route.params.prefixPrj,
                type: this.$route.params.assmnttype,
                prefixRole: this.$route.params.prefixRole,
              }).then(res => {
                if (res === 1) {
                  this.showModalTransferReq = {
                    active: false,
                  }
                  this.Refresh()
                  this.$swal({
                    icon: 'success',
                    title: 'Done!',
                    text: ' requested successfully to warehouse.',
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
        prefix: this.$route.params.prefixPrj,
        type: this.$route.params.assmnttype,
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
      this.showModalTransferReq = {
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
