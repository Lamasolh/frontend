<template>
  <!-- modal   -->
  <b-modal
    id="terminationmodal"
    v-model="showDelivery"
    ok-only
    size="xl"
    no-close-on-backdrop
    class="modal-dialog"
    title="Delivery"
    :header-bg-variant="headerBgVariant"
    :header-border-variant="bodyTextVariant"
    :footer-border-variant="bodyTextVariant"
    data-backdrop="static"
    @close="showDelivery=false"
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
          <div
            v-for="(kit,index) in deliveryKit"
            :key="kit.items_id"
          >
            <b-row>
              <b-col>
                <h5>Name: {{ kit.items_name }} </h5>
                <h5>Qty: {{ kit.quantity }} </h5>
              </b-col>
              <b-col>
                <validation-provider
                  v-slot="{ errors }"
                  :rules="`min_value:${kit.minim_dist}|max_value:${kit.quantity < kit.max_dist? kit.quantity: kit.max_dist}`"
                  :name="'Quantity'+index"
                >
                  <b-form-group label="Quantity">
                    <b-input
                      v-model="kit.qtyValue"
                      placeholder="Enter Quantity"
                      :disabled="show"
                      type="number"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :state="errors.length > 0 ? false : null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                </validation-provider>
              </b-col>
              <b-col>
                <validation-provider
                  v-slot="{ errors }"
                  :rules="kit.qtyValue >0 ?'required':''"
                  :name="'donor'+index"
                >

                  <b-form-group label="Donors">
                    <v-select
                      v-model="kit.donorvalue"
                      placeholder="Select donor"
                      label="org_name"
                      :disabled="show"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :options="kit.donors[0]"
                      :state="errors.length > 0 ? false : null"
                    />

                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                </validation-provider>
              </b-col>
            </b-row>
            <hr>
          </div>
          <validation-provider
            v-slot="{ errors }"
            name="Comment"
          >
            <b-form-group label="Comment">
              <b-textarea
                v-model="delveryComment"
                placeholder="Enter Comment"
                :state="errors.length > 0 ? false : null"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </b-form-group>
          </validation-provider>
        </validation-observer>
      </b-overlay>
    </b-container>

    <template #modal-footer>
      <div class="w-100">
        <p class="float-left">
          Are you sure you want to Delivery this case <br>({{ caseSelect.case_code }}:{{ caseSelect.full_name }})?
        </p>
        <b-button
          variant="warning"
          size="sm"
          :disabled="show"
          class="float-right"
          @click="Delivery"
        >
          Delivery
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
    vSelect,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  data() {
    return {
      headerBgVariant: 'success',
      headerTextVariant: 'light',
      bodyBgVariant: 'light',
      bodyTextVariant: 'dark',
      footerBgVariant: 'success',
      footerTextVariant: 'dark',
    }
  },
  computed: {
    show: takeState('distributor', 'show').commit('distributor/SET_SHOW').map(),
    deliveryKit: takeState('distributor', 'deliveryKit').commit('distributor/SET_DELV_KIT').map(),
    delveryComment: takeState('distributor', 'delveryComment').commit('distributor/SET_DEV_COMMENT').map(),
    caseSelect: takeState('distributor', 'caseSelect').commit('distributor/SET_SELECT_CASE').map(),
    showDelivery: takeState('distributor', 'showDelivery').commit('distributor/SET_SHOW_DELIVERY').map(),
  },
  watch: {

  },
  mounted() {
  },
  methods: {
    Delivery() {
      let values = 0
      this.$refs.InfoRules.validate().then(success => {
        if (success) {
          this.deliveryKit.forEach(element => {
            // eslint-disable-next-line no-nested-ternary
            values += parseInt(element.qtyValue == null ? 0 : (element.qtyValue === '') ? 0 : element.qtyValue, 10)
          })
          console.log(values)
          if (values > 0) {
            this.$store.dispatch('distributor/Delivery', {
              prefix: this.$route.params.prefixPrj,
              prefixRole: this.$route.params.prefixRole,
              type: this.$route.params.assmnttype,
            }).then(() => {
              console.log('ss')
              this.showDelivery = false
              this.$swal({
                title: 'Success!',
                text: 'Operation Successfully!',
                icon: 'success',
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
