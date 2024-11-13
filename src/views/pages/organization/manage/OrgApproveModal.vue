<template>
  <b-modal
    id="approvemodal"
    v-model="active"
    ok-only
    no-close-on-backdrop
    class="modal-dialog"
    title="Approve this Organization"
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
            <b-form-group
              label="Type"
              label-for="type"
            >
              <validation-provider
                #default="{ errors }"
                name="Type"
                rules="required"
              >
                <v-select
                  id="type"
                  v-model="orgType"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :state="errors.length > 0 ? false : null"
                  :options="tp"
                  placeholder="Select Type"
                  label="title"
                  :clearable="false"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>
      </validation-observer>
    </b-container>

    <template #modal-footer>
      <div class="w-100">
        <p class="float-left">
          Are you sure you want to decline this organization?
        </p>
        <b-button
          variant="success"
          size="sm"
          class="float-right"
          @click="confirmRequest"
        >
          Confirm
        </b-button>
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
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
    vSelect,
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
    ...takeState('manageOrg', 'showModalApr')
      .expose([
        'active',
        'item',
        'index',
      ])
      .commit('manageOrg/SET_SHOW_REAS_ADV')
      .map(),
    showModalApr: takeState('manageOrg', 'showModalApr').commit('manageOrg/SET_SHOW_APR').map(),
    orgType: takeState('manageOrg', 'orgType').commit('manageOrg/SET_ORG_TYPE').map(),
    typeOp: takeState('global', 'org_type').commit('manageOrg/SET_TYPE_OP').map(),
    tp() {
      const b = this.typeOp
      b.shift()
      return b
    },
  },
  mounted() {
    this.reason = null
  },
  methods: {
    confirmRequest() {
      this.showModalApr = {
        active: false,
        index: null,
        item: null,
      }
      this.$refs.ModalRequestRules.validate().then(success => {
        if (success) {
          this.$store.dispatch('manageOrg/orgApprove').then(res => {
            console.log('red', res)
            if (res != null) {
              if (res.result === 0) {
                this.$swal({
                  title: 'Error!',
                  text: 'Approved failed',
                  icon: 'error',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                })
              } else {
                this.RouteView()
                this.$swal({
                  title: 'Success!',
                  text: 'Organization is Approve',
                  icon: 'success',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                })
              }
            } else {
              this.$swal({
                title: 'Error!',
                text: 'Approved failed',
                icon: 'error',
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
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
      this.value_qntty = 1
      this.showModalApr = {
        active: false,
        index: null,
        item: null,
      }
    },
    RouteView() {
      this.$router.replace({
        name: 'menu',
        params: {
          action: 'read',
          breadcrumb: [
            {
              text: 'Organizations Mng.',
              active: false,
            },
            {
              text: 'Organization List',
              active: true,
            },
          ],
          active: true,
          prefixPrj: 'ORGMNG',
          prefixRole: 'ORLST',
          title: 'Organization List',
          resource: 'ORLST',
        },
      })
    },
  },
}
</script>

<style lang="scss" >
@import "@core/scss/vue/libs/vue-select.scss";
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
