<template>
  <b-modal
    id="transfermodal"
    v-model="active"
    ok-only
    no-close-on-backdrop
    class="modal-dialog"
    title="Recived Kits from another organization"
    :header-bg-variant="headerBgVariant"
    :header-border-variant="bodyTextVariant"
    :footer-border-variant="bodyTextVariant"
    data-backdrop="static"
    size="lg"
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
              name="Recived Request"
              rules="required"
            >
              <label>Recived Request</label>
              <v-select
                v-model="selectCheckRec"
                placeholder="Select a Recived Request."
                label="title"
                :options="checkRecOp"
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
          Are you sure you want to Accept {{ selectCheckRec == null? 'None':selectCheckRec.title }}?
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
    ...takeState('inventory', 'showModalTransferRec')
      .expose([
        'active',
      ])
      .commit('inventory/SET_SHOW_TRANS_ADV')
      .map(),
    show: takeState('inventory', 'show').map(),

    checkRecOp: takeState('inventory', 'checkRec').map(),
    showModalTransferRec: takeState('inventory', 'showModalTransferRec').commit('inventory/SET_SHOW_TRANS_REC').map(),
    selectCheckRec: takeState('inventory', 'selectCheckRec').commit('inventory/SET_SHOW_MODL_REC').map(),
    //

  },
  watch: {
    active() {
      this.selectCheckRec = null
    },
  },
  mounted() {
    this.active = null
    this.selectCheckRec = null
  },
  methods: {
    confirmRequest() {
      this.$refs.ModalRequestRules.validate().then(success => {
        if (success) {
          this.$swal({
            title: 'Accept Request?',
            html: `Are you sure you want to Accept this request<b class="text-danger">${this.selectCheckRec.title}</b>`,
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
              this.$store.dispatch('inventory/TRANS_REC', {
                type: this.$route.params.assmnttype,
                prefix: this.$route.params.prefixPrj,
                prefixRole: this.$route.params.prefixRole,
              }).then(res => {
                if (res === 1) {
                  this.showModalTransferRec = {
                    active: false,
                  }
                  this.Refresh()
                  this.$swal({
                    icon: 'success',
                    title: 'Done!',
                    text: ' warehouse.',
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
      this.value_qntty = 1
      this.showModalTransferRec = {
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
