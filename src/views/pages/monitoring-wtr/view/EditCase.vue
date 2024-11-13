<template>
  <!-- modal   -->
  <b-modal
    id="Editmodal"
    v-model="showEdit"
    ok-only
    no-close-on-backdrop
    class="modal-dialog"
    :title="'Edit ('+ editItem.tnt_code+')'"
    :header-bg-variant="headerBgVariant"
    :header-border-variant="bodyTextVariant"
    :footer-border-variant="bodyTextVariant"
    data-backdrop="static"
    @close="showEdit=false"
  >
    <b-container fluid>
      <b-overlay
        rounded="lg"
        :show="show"
      >
        <validation-observer ref="simpleRules">

          <h3> Information</h3>
          <b-row>
            <b-col>
              <p>
                Tent Code: {{ editItem.tnt_code }}
              </p>
              <p>
                Tent description: {{ editItem.tnt_description }}
              </p>

              <p>
                Quantity Needed: {{ editItem.qouta_needed }}
              </p>
              <p>
                Filled Lat: {{ editItem.tsk_lat }}
              </p>
            </b-col>
            <b-col>
              <p>
                Status: {{ editItem.line_status }}
              </p>

              <p>
                Date Assigned: {{ editItem.date_assned }}
              </p>

              <p>
                isManual: {{ editItem.manual ==null?'Yes': editItem.manual }}
              </p>

              <p>
                Filled Lng: {{ editItem.tsk_lng }}
              </p>
            </b-col>
          </b-row>
          <h4> Notes:</h4>
          <p
            style="white-space: pre;"
            class="text-danger"
          >
            {{ editItem.notes }}
          </p>

          <b-row class="mb-1">
            <b-col cols="3">
              Quantity
            </b-col>
            <b-col>
              <validation-provider
                #default="{ errors }"
                :rules="'required|max_value:'+parseInt(editItem.qouta_needed)"
                name="Quantity"
              >
                <b-form-input
                  id="Quantity"
                  v-model="editItem.quantity_filled"
                  :state="errors.length > 0 ? false : null"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  type="number"
                  placeholder="Enter Quantity"
                />
                <small class="text-danger mb-1">{{
                  errors[0]
                }}</small>
              </validation-provider>
            </b-col>

          </b-row>
          <b-row class="mb-1">
            <b-col cols="3">
              Chlorine
            </b-col>
            <b-col>
              <validation-provider
                #default="{ errors }"
                rules="required"
                name="Chlorine"
              >
                <b-form-input
                  id="Chlorine"
                  v-model="editItem.clorine_value"
                  :state="errors.length > 0 ? false : null"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  type="number"
                  placeholder="Enter Chlorine"
                />
                <small class="text-danger mb-1">{{
                  errors[0]
                }}</small>
              </validation-provider>
            </b-col>
          </b-row>
          <b-row class="mb-1">
            <b-col cols="3">
              Note:
            </b-col>
            <b-col>

              <b-textarea
                v-model="note"
                rows="3"
                max-rows="6"
              />
            </b-col>

          </b-row>
        </validation-observer>
      </b-overlay>
    </b-container>

    <template #modal-footer>
      <div class="w-100">
        <p class="float-left">
          Are you sure you want to Update this Information For ({{ editItem.tnt_code }})?
        </p>
        <b-button
          variant="success"
          size="sm"
          :disabled="show"
          class="float-right"
          @click="EditCase"
        >
          Edit Case
        </b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
import { takeState } from 'vuex-dot'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      headerBgVariant: 'success',
      headerTextVariant: 'dark',
      bodyBgVariant: 'dark',
      bodyTextVariant: 'dark',
      footerBgVariant: 'warning',
      footerTextVariant: 'dark',
      note: null,
      qty: 0,
      chlorine: 0,
    }
  },
  computed: {
    show: takeState('monitoringViewWtr', 'show').map(),
    showEdit: takeState('monitoringViewWtr', 'showEdit').commit('monitoringViewWtr/SET_SHOW_EDIT').map(),
    editItem: takeState('monitoringViewWtr', 'editItem').commit('monitoringViewWtr/SET_EDIT_ITEM').map(),
  },
  methods: {
    EditCase() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          this.$swal({
            title: 'Edit',
            text: `Are you sure you want to edit This case (${this.editItem.tnt_code})`,
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Yes!',
            customClass: {
              confirmButton: 'btn btn-primary',
              cancelButton: 'btn btn-outline-danger ml-1',
            },
            buttonsStyling: false,
          }).then(result => {
            if (result.value) {
              console.log(this.editItem)
              console.log(result.value)

              this.$store.dispatch('monitoringViewWtr/EditCase', {
                prefix: this.$route.params.prefixPrj,
                prefixRole: this.$route.params.prefixRole,
                note: this.note,
                qty: parseInt(this.editItem.quantity_filled, 10),
                chlorine: parseFloat(this.editItem.clorine_value, 10),
                wtt_id: parseInt(this.editItem.wtts_id, 10),
                issId: this.$route.params.value.wtt_id,
              }).then(res => {
                console.log('res', res)
                if (res[0].result === 1) {
                  this.showEdit = false
                  this.$swal({
                    icon: 'success',
                    title: 'Done!',
                    text: 'The case hase been edited!',
                    customClass: {
                      confirmButton: 'btn btn-success',
                    },
                  })
                } else {
                  this.$swal({
                    icon: 'danger',
                    title: 'Failed!',
                    text: 'Contact System administrator!',
                    customClass: {
                      confirmButton: 'btn btn-success',
                    },
                  })
                }
              }).catch(error => {
                console.log(error)
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Operation Failed ',
                    icon: 'EditIcon',
                    variant: 'danger',
                  },
                })
              })
            }
          })
        } else {
          console.log('no')
        }
      })
    },
  },
}
</script>
