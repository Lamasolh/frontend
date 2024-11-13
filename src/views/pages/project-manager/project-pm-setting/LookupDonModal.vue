<template>

  <div>
    <b-modal
      id="refermodal"
      v-model="active"
      ok-only
      no-close-on-backdrop
      class="modal-dialog"
      title="Lookup Donor"
      :header-bg-variant="headerBgVariant"
      :header-border-variant="bodyTextVariant"
      :footer-border-variant="bodyTextVariant"
      data-backdrop="static"
      @close="abortion"
    >

      <b-container fluid>
        <validation-observer
          ref="lookupDon"
          tag="form"
        >
          <b-row>
            <b-col>
              <b-form @submit.prevent="searchLook()">
                <validation-provider
                  v-slot="{ errors }"
                  rules="required|integer"
                  name="Phone"
                  @keydown:enter="searchLook"
                >
                  <b-form-group>
                    <label>Phone</label>
                    <b-overlay
                      :show="show"
                    >
                      <b-form-input
                        v-model="lookupDonorPhone"
                        type="number"
                      />
                      <small class="text-danger mb-1">{{ errors[0] }}</small>
                    </b-overlay>
                  </b-form-group>
                </validation-provider>
              </b-form>
            </b-col>
          </b-row>
        </validation-observer>
      </b-container>

      <template #modal-footer>

        <div class="w-100">

          <b-button
            variant="info"
            size="sm"
            type="button"
            class="float-right"
            :disabled="show"
            @click="searchLook"
          >
            Search
          </b-button>
        </div>

      </template>
    </b-modal>

  </div>

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
      headerBgVariant: 'light-info',
      headerTextVariant: 'light',
      bodyBgVariant: 'light',
      bodyTextVariant: 'light',
      footerBgVariant: 'info',
      footerTextVariant: 'light',
    }
  },
  computed: {
    ///
    ...takeState('listPMSetPrj', 'showModalDonorLook')
      .expose([
        'active',
      ])
      .commit('listPMSetPrj/SET_MOD_DONOR_LOOK')
      .map(),
    showModalDonorAcceptLook: takeState('listPMSetPrj', 'showModalDonorAcceptLook').commit('listPMSetPrj/SET_MOD_DONOR_ACPT_LOOK').map(),
    showModalDonorLook: takeState('listPMSetPrj', 'showModalDonorLook').commit('listPMSetPrj/SET_MOD_DONOR_LOOK').map(),

    lookupDonorPhone: takeState('listPMSetPrj', 'lookupDonorPhone').commit('listPMSetPrj/SET_PHONE_DON_LOOK').map(),
    lookupDonorId: takeState('listPMSetPrj', 'lookupDonorId').commit('listPMSetPrj/SET_ID_DON_LOOK').map(),

    show: takeState('listPMSetPrj', 'show').commit('listPMSetPrj/SET_SHOW').map(),

  },
  methods: {
    searchLook() {
      this.$refs.lookupDon.validate().then(success => {
        if (success) {
          console.log('success')
          this.$store
            .dispatch('listPMSetPrj/LOOKUP_SUP_DON', {
              prefix: this.$route.params.value.proj_prefix,
              prefixRole: this.$route.params.prefixRole,
              phone: this.lookupDonorPhone,
              orgType: 3,
            })
            .then(val => {
              if (val.data.res.length === 0) {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'No Donors found',
                    icon: 'EditIcon',
                    variant: 'warning',
                  },
                })
              } else {
                this.showModalDonorAcceptLook = {
                  active: true,
                  res: val.data.res,
                }
              }
            })
        } else {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Missing Data',
              icon: 'EditIcon',
              variant: 'warning',
            },
          })
        }
      })
    },
    abortion() {
      this.showModalDonorLook = {
        active: false,
      }
    },
  },
}
</script>
