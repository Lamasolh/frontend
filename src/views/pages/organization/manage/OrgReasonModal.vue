<template>
  <b-modal
    id="reasonmodal"
    v-model="active"
    ok-only
    no-close-on-backdrop
    class="modal-dialog"
    title="Decline this Organization"
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
              #default="{ errors }"
              rules="required"
              name="reason"
            >
              <b-form-group>
                <label for="sb-default">Reason</label>
                <b-form-input
                  id="reason"
                  v-model="reason"
                  :state="errors.length > 0 ? false : null"
                  placeholder="Enter your reason"
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
    ...takeState('manageOrg', 'showModalReas')
      .expose([
        'active',
        'item',
        'index',
      ])
      .commit('manageOrg/SET_SHOW_REAS_ADV')
      .map(),
    showModalReas: takeState('manageOrg', 'showModalReas').commit('manageOrg/SET_SHOW_REAS').map(),
    reason: takeState('manageOrg', 'reason').commit('manageOrg/SET_RES').map(),

  },
  mounted() {
    this.reason = null
  },
  methods: {
    confirmRequest() {
      this.showModalReas = {
        active: false,
        index: null,
        item: null,
      }
      this.$store.dispatch('manageOrg/orgNotActive').then(res => {
        console.log(res)
        if (res != null) {
          if (res === 0) {
            this.$swal({
              title: 'Failed!',
              text: 'Operation failed',
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
              text: 'Operation Successfully',
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
            text: 'Operation failed',
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
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
      this.showModalReas = {
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
