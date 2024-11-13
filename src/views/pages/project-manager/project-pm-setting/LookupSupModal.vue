<template>

  <div>
    <b-modal
      id="refermodal"
      v-model="active"
      ok-only
      no-close-on-backdrop
      class="modal-dialog"
      title="Lookup Supplier"
      :header-bg-variant="headerBgVariant"
      :header-border-variant="bodyTextVariant"
      :footer-border-variant="bodyTextVariant"
      data-backdrop="static"
      @close="abortion"
    >

      <b-container fluid>
        <validation-observer
          ref="lookupSup"
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
                        v-model="lookupSupPhone"
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
    ...takeState('listPMSetPrj', 'showModalSupLook')
      .expose([
        'active',
      ])
      .commit('listPMSetPrj/SET_MOD_SUP_LOOK')
      .map(),
    showModalSupLook: takeState('listPMSetPrj', 'showModalSupLook').commit('listPMSetPrj/SET_MOD_SUP_LOOK').map(),

    showModalSupAcceptLook: takeState('listPMSetPrj', 'showModalSupAcceptLook').commit('listPMSetPrj/SET_MOD_SUP_ACPT_LOOK').map(),

    lookupSupPhone: takeState('listPMSetPrj', 'lookupSupPhone').commit('listPMSetPrj/SET_PHONE_SUP_LOOK').map(),
    lookupSupId: takeState('listPMSetPrj', 'lookupSupId').commit('listPMSetPrj/SET_ID_SUP_LOOK').map(),

    show: takeState('listPMSetPrj', 'show').commit('listPMSetPrj/SET_SHOW').map(),

  },
  methods: {
    searchLook() {
      this.$refs.lookupSup.validate().then(success => {
        if (success) {
          console.log('success')
          this.$store
            .dispatch('listPMSetPrj/LOOKUP_SUP_DON', {
              prefix: this.$route.params.value.proj_prefix,
              prefixRole: this.$route.params.prefixRole,
              phone: this.lookupSupPhone,
              orgType: 4,
            })
            .then(val => {
              if (val.data.res.length === 0) {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'No Supplier found',
                    icon: 'EditIcon',
                    variant: 'warning',
                  },
                })
              } else {
                this.showModalSupAcceptLook = {
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
      this.showModalSupLook = {
        active: false,
      }
    },
  },
}
</script>
