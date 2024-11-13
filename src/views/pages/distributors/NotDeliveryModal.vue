<template>
  <!-- modal   -->
  <b-modal
    id="notDelivery"
    v-model="showNotDelivery"
    ok-only
    size="xl"
    no-close-on-backdrop
    class="modal-dialog"
    title="Not Delivery"
    :header-bg-variant="headerBgVariant"
    :header-border-variant="bodyTextVariant"
    :footer-border-variant="bodyTextVariant"
    data-backdrop="static"
    @close="showNotDelivery=false"
  >
    <b-container fluid>
      <b-overlay
        rounded="lg"
        :show="show"
      >
        <validation-observer
          ref="InfoRules"
          tag="form"
        >
          <validation-provider
            v-slot="{ errors }"
            rules="required"
            name="Reason"
          >
            <b-form-group label="Reason">
              <v-select
                v-model="notDelverySelectReson"
                placeholder="Select the reason of terminition."
                label="reason_name"
                :disabled="show"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="listResons"
                :state="errors.length > 0 ? false : null"
              />

              <small class="text-danger">{{ errors[0] }}</small>
            </b-form-group>
          </validation-provider>
          <!--<validation-provider
            v-slot="{ errors }"
            name="Comment"
          >
          <b-form-group label="Comment">
              <b-textarea
                v-model="notDelveryComment"
                placeholder="Enter Comment"
                :state="errors.length > 0 ? false : null"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </b-form-group>
          </validation-provider>-->
        </validation-observer>
      </b-overlay>
    </b-container>

    <template #modal-footer>
      <div class="w-100">
        <p class="float-left">
          Are you sure you want to Not Delivery this case <br>({{ caseSelect.case_code }}:{{ caseSelect.full_name }})?
        </p>
        <b-button
          variant="warning"
          size="sm"
          :disabled="show"
          class="float-right"
          @click="NotDelivery"
        >
          NotDelivery
        </b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
/* eslint-disable prefer-destructuring */
import { takeState } from 'vuex-dot'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
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
      headerBgVariant: 'warning',
      headerTextVariant: 'light',
      bodyBgVariant: 'light',
      bodyTextVariant: 'dark',
      footerBgVariant: 'warning',
      footerTextVariant: 'dark',
    }
  },
  computed: {
    show: takeState('distributor', 'show').commit('distributor/SET_SHOW').map(),
    caseSelect: takeState('distributor', 'caseSelect').commit('distributor/SET_SELECT_CASE').map(),
    showNotDelivery: takeState('distributor', 'showNotDelivery').commit('distributor/SET_SHOW_NOT_DELIVERY').map(),

    notDelverySelectReson: takeState('distributor', 'notDelverySelectReson').commit('distributor/SET_NOT_DEV_Reason').map(),

    listResons: takeState('distributor', 'listResons').map(),
  },
  watch: {

  },
  mounted() {
  },
  methods: {
    NotDelivery() {
      console.log('done', this.notDelveryComment, this.notDelverySelectReson)
      this.$refs.InfoRules.validate().then(success => {
        if (success) {
          this.$store.dispatch('distributor/NotDelivery', {
            prefix: this.$route.params.prefixPrj,
            prefixRole: this.$route.params.prefixRole,
            type: this.$route.params.assmnttype,
          }).then(() => {
            console.log('ss')
            this.showNotDelivery = false
            this.$swal({
              title: 'Success!',
              text: 'Operation Successfully!',
              icon: 'sucess',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          }).catch(() => {
            this.$swal({
              title: 'Error!',
              text: 'Please Check internet and try again',
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          })
        } else {
          this.$swal({
            title: 'Attention!',
            text: 'Missing',
            icon: 'warning',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        }
      })
    },
  },
}
</script>
