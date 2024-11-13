<template>
  <div>
    <b-modal
      id="form"
      v-model="showModalMEM.active"
      ok-only
      size="xl"
      no-close-on-backdrop
      class="modal-dialog"
      title="Add Member"
      no-close-on-esc

      :header-bg-variant="headerBgVariant"
      :header-border-variant="bodyTextVariant"
      :footer-border-variant="bodyTextVariant"
      data-backdrop="static"
      @close="abortion"
    >
      <b-overlay
        :show="show"
      >
        <b-container fluid>
          <validation-observer
            ref="formMEM"
            tag="form"
          >
            <b-row v-if="item!=null">
              <b-col>
                <b-form>
                  <b-row>
                    <b-col
                      v-if="item.tentInfo!=null"
                      sm="12"
                      md="12"
                      lg="4"
                      xl="4"
                    >
                      <label>Tents/Shelters</label>
                      <b-form-input
                        v-if="item.tentInfo!=null"
                        v-model="item.tentInfo.code"
                        class="form-control"
                        disabled
                      />
                    </b-col>

                    <b-col
                      v-if="item.famInfo!=null"
                      sm="12"
                      md="12"
                      lg="4"
                      xl="4"
                    >
                      <label>Family</label>
                      <b-form-input
                        v-if="item.famInfo!=null"

                        v-model="item.famInfo.code"
                        class="form-control"
                        disabled
                      />
                    </b-col>

                    <b-col
                      v-if="item.family_relation!=null"
                      sm="12"
                      md="12"
                      lg="4"
                      xl="4"
                    >
                      <label>Family Relation</label>
                      <b-form-input
                        v-model="item.family_relation.name"
                        class="form-control"
                        disabled
                      />
                    </b-col>

                    <b-col
                      sm="12"
                      md="12"
                      lg="4"
                      xl="4"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="System Code"
                      >
                        <b-form-group>
                          <label>System Code</label>
                          <b-form-input
                            v-model="item.code"
                            class="form-control"
                            :disabled="true"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter System Code"
                          />
                          <small class="text-danger mb-1">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="4"
                      xl="4"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="Organization Code"
                      >
                        <b-form-group>
                          <label>Organization Code</label>
                          <b-form-input
                            v-model="item.reference"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Organization Code"
                          />
                          <small class="text-danger mb-1">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="4"
                      xl="4"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="UNHCR Code"
                      >
                        <b-form-group>
                          <label>UNHCR Code</label>
                          <b-form-input
                            v-model="item.unhcr_code"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter UNHCR Code"
                          />
                          <small class="text-danger mb-1">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="4"
                      xl="4"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="National Code"
                      >
                        <b-form-group>
                          <label>National Code</label>
                          <b-form-input
                            v-model="item.national_number"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter National Code"
                          />
                          <small class="text-danger mb-1">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="4"
                      xl="4"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="Phone"
                      >
                        <b-form-group>
                          <label>Phone</label>
                          <b-form-input
                            v-model="item.phone_number"
                            class="form-control"
                            type="number"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Phone"
                          />
                          <small class="text-danger mb-1">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="4"
                      xl="4"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="Gender"
                      >
                        <b-form-group label="Gender">
                          <v-select
                            v-model="item.gender"
                            placeholder="Select Gender"
                            label="name"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :options="gender"
                            :state="errors.length > 0 ? false : null"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="3"
                      xl="3"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="First Name"
                      >
                        <b-form-group>
                          <label>First Name</label>
                          <b-form-input
                            v-model="item.first_name"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter First Name"
                          />
                          <small class="text-danger mb-1">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="3"
                      xl="3"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="Father Name"
                      >
                        <b-form-group>
                          <label>Father Name</label>
                          <b-form-input
                            v-model="item.father_name"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Father Name"
                          />
                          <small class="text-danger mb-1">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="3"
                      xl="3"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="Last Name"
                      >
                        <b-form-group>
                          <label>Last Name</label>
                          <b-form-input
                            v-model="item.last_name"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Last Name"
                          />
                          <small class="text-danger mb-1">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="3"
                      xl="3"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="Mother Name"
                      >
                        <b-form-group>
                          <label>Mother Name</label>
                          <b-form-input
                            v-model="item.mother_name"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Mother Name"
                          />
                          <small class="text-danger mb-1">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="3"
                      xl="3"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="First Name (Arabic)"
                      >
                        <b-form-group>
                          <label>First Name (Arabic)</label>
                          <b-form-input
                            v-model="item.first_name_ar"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter First Name (Arabic)"
                          />
                          <small class="text-danger mb-1">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="3"
                      xl="3"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="Father Name (Arabic)"
                      >
                        <b-form-group>
                          <label>Father Name (Arabic)</label>
                          <b-form-input
                            v-model="item.father_name_ar"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Father Name (Arabic)"
                          />
                          <small class="text-danger mb-1">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="3"
                      xl="3"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="Last Name (Arabic)"
                      >
                        <b-form-group>
                          <label>Last Name (Arabic)</label>
                          <b-form-input
                            v-model="item.last_name_ar"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Last Name (Arabic)"
                          />
                          <small class="text-danger mb-1">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="3"
                      xl="3"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="Mother Name (Arabic)"
                      >
                        <b-form-group>
                          <label>Mother Name (Arabic)</label>
                          <b-form-input
                            v-model="item.mother_name_ar"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Mother Name (Arabic)"
                          />
                          <small class="text-danger mb-1">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="3"
                      xl="3"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="Date Of Birth"
                      >
                        <b-form-group>
                          <label>Date Of Birth</label>
                          <flat-pickr
                            v-model="item.dob"
                            class="form-control"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            placeholder="Enter Date Of Birth"
                            :state="errors.length > 0 ? false : null"
                          />

                          <small class="text-danger mb-1">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="3"
                      xl="3"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="Place of birth"
                      >
                        <b-form-group>
                          <label>Place of birth</label>
                          <b-form-input
                            v-model="item.pob"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Place of birth"
                          />
                          <small class="text-danger mb-1">{{ errors[0] }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="3"
                      xl="3"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="Disability"
                      >
                        <b-form-group label="Disability">
                          <v-select
                            v-model="item.disbality"
                            placeholder="Select Disability"
                            label="name"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :options="disbality"
                            :state="errors.length > 0 ? false : null"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="3"
                      xl="3"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="Nationality"
                      >
                        <b-form-group label="Nationality">
                          <v-select
                            v-model="item.nationality"
                            placeholder="Select Nationality"
                            label="name"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :options="nationality"
                            :state="errors.length > 0 ? false : null"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="3"
                      xl="3"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""

                        name="Marital Status"
                      >
                        <b-form-group label="Marital Status">
                          <v-select
                            v-model="item.maritalStatus"
                            placeholder="Select Marital Status"
                            label="name"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :options="maritalStatus"
                            :state="errors.length > 0 ? false : null"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>
                  </b-row>

                </b-form>
              </b-col>
            </b-row>
          </validation-observer>
        </b-container>
      </b-overlay>
      <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="info"
            size="sm"
            type="button"
            class="float-right"
            :disabled="show"
            @click="submit"
          >
            Submit
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
import vSelect from 'vue-select'
import generateUniqueId from '@/libs/unique_id'
import flatPickr from 'vue-flatpickr-component'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
    vSelect,
    flatPickr,
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
    ...takeState('dtMAIN', 'showModalMEM')
      .expose([
        'active',
        'item',
      ])
      .commit('dtMAIN/SET_MOD_MEM_EXP')
      .map(),
    ///
    show: takeState('dtMEM', 'show').commit('dtMEM/SET_SHOW').map(),
    gender: takeState('dtMAIN', 'gender').map(),
    maritalStatus: takeState('dtMAIN', 'maritalStatus').map(),
    disbality: takeState('dtMAIN', 'disability').map(),
    nationality: takeState('dtMAIN', 'nationality').map(),
    showModalMEM: takeState('dtMAIN', 'showModalMEM').commit('dtMAIN/SET_MOD_MEM').map(),
  },
  methods: {
    submit() {
      this.$refs.formMEM.validate().then(success => {
        if (success) {
          this.$store.dispatch('dtMEM/SEND_DATA', {
            item: this.showModalMEM.item,
            issId: this.$route.params.value.iss_id,
          }).then(res => {
            if (res.res === 0) {
              if (res.message != null) {
                this.$swal({
                  title: 'Error!',
                  text: `Operation failed, Because ${res.message}`,
                  icon: 'error',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                })
              } else {
                this.$swal({
                  title: 'Error!',
                  text: 'Operation failed, please check the information you entered',
                  icon: 'error',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                })
              }
            } else if (res.res === 1) {
              this.$swal({
                title: 'Success!',
                text: 'Success Operation',
                icon: 'success',
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              })
              this.abortion()
            } else {
              this.$swal({
                title: 'Error!',
                text: 'Operation failed, please check the information you entered',
                icon: 'error',
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              })
            }
          }).catch(error => {
            console.log(error)
            this.$swal({
              title: 'Error!',
              text: 'Register failed',
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          })
        } else {
          this.$swal({
            title: 'Attention !',
            text: 'Check missing data',
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        }
      }).catch(() => {
        this.show = false
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
    },
    AddHH() {
      this.showModalMEM = {
        active: true,
        item: {
          code: generateUniqueId('MEM_'),
        },
      }
    },
    abortion() {
      this.active = false
      this.item = {}
    },
  },
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';

</style>
