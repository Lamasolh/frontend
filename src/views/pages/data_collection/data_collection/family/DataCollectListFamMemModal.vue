<template>
  <div>
    <b-modal
      id="form"
      v-model="showModalMEM.active"
      ok-only
      size="xl"

      no-close-on-esc
      no-close-on-backdrop
      class="modal-dialog"
      title="Add Member"
      :header-bg-variant="headerBgVariant"
      :header-border-variant="bodyTextVariant"
      :footer-border-variant="bodyTextVariant"
      data-backdrop="static"
      @close="abortion"
    >
      <b-overlay :show="show">
        <b-container fluid>
          <validation-observer
            ref="formMEM"
            tag="form"
          >
            <b-row>
              <b-col>
                <b-form>
                  <b-row>
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
                          <label>System Code
                            <span class="text-danger"><strong>*</strong></span></label>
                          <b-form-input
                            v-model="item.code"
                            class="form-control"
                            :disabled="true"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter System Code"
                          />
                          <small class="text-danger mb-1">{{
                            errors[0]
                          }}</small>
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
                          <label>Organization Code
                            <span class="text-danger"><strong>*</strong></span></label>
                          <b-form-input
                            v-model="item.reference"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Organization Code"
                          />
                          <small class="text-danger mb-1">{{
                            errors[0]
                          }}</small>
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
                        name="Gender"
                      >
                        <b-form-group>
                          <label>Gender
                            <span class="text-danger"><strong>*</strong></span></label>
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
                      lg="4"
                      xl="4"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="UNHCR Member Code"
                      >
                        <b-form-group>
                          <label>UNHCR Member Code </label>
                          <b-form-input
                            v-model="item.unhcr_code"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter UNHCR Member Code"
                          />
                          <small class="text-danger mb-1">{{
                            errors[0]
                          }}</small>
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
                            v-model="item.national_code"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter National Code"
                          />
                          <small class="text-danger mb-1">{{
                            errors[0]
                          }}</small>
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
                          <label>Phone </label>
                          <b-form-input
                            v-model="item.phone"
                            class="form-control"
                            type="number"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Phone"
                          />
                          <small class="text-danger mb-1">{{
                            errors[0]
                          }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                  </b-row>
                  <b-row align-h="end">
                    <b-col
                      sm="12"
                      md="12"
                      lg="4"
                      xl="4"
                    >
                      <b-button
                        block
                        variant="success"
                        @click="getHouseholdName"
                      >
                        Fetch Household Name
                      </b-button>
                    </b-col>

                  </b-row>
                  <br>
                  <b-row>
                    <b-col
                      sm="12"
                      md="12"
                      lg="3"
                      xl="3"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="name"
                        name="First Name (Arabic)"
                      >
                        <b-form-group>
                          <label>First Name (Arabic)</label>
                          <b-form-input
                            v-model="item.first_name_ar"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter First Name (Arabic)"
                            @input="(input) => toFirst(input)"
                          />
                          <small class="text-danger mb-1">{{
                            errors[0]
                          }}</small>
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
                        rules="name"
                        name="Father Name (Arabic)"
                      >
                        <b-form-group>
                          <label>Father Name (Arabic)</label>
                          <b-form-input
                            v-model="item.father_name_ar"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Father Name (Arabic)"
                            @input="(input) => toFather(input)"
                          />
                          <small class="text-danger mb-1">{{
                            errors[0]
                          }}</small>
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
                        rules="name"
                        name="Last Name (Arabic)"
                      >
                        <b-form-group>
                          <label>Last Name (Arabic)</label>
                          <b-form-input
                            v-model="item.last_name_ar"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Last Name (Arabic)"
                            @input="(input) => toLast(input)"
                          />
                          <small class="text-danger mb-1">{{
                            errors[0]
                          }}</small>
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
                        rules="name"
                        name="Mother Name (Arabic)"
                      >
                        <b-form-group>
                          <label>Mother Name (Arabic)</label>
                          <b-form-input
                            v-model="item.mother_name_ar"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Mother Name (Arabic)"
                            @input="(input) => toMother(input)"
                          />
                          <small class="text-danger mb-1">{{
                            errors[0]
                          }}</small>
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
                          <small class="text-danger mb-1">{{
                            errors[0]
                          }}</small>
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
                          <small class="text-danger mb-1">{{
                            errors[0]
                          }}</small>
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
                          <small class="text-danger mb-1">{{
                            errors[0]
                          }}</small>
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
                          <small class="text-danger mb-1">{{
                            errors[0]
                          }}</small>
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

                          <small class="text-danger mb-1">{{
                            errors[0]
                          }}</small>
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
                          <small class="text-danger mb-1">{{
                            errors[0]
                          }}</small>
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
                        <b-form-group>
                          <label>Disability
                            <span class="text-danger"><strong>*</strong></span></label>
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
                        rules="required"
                        name="Nationality"
                      >
                        <b-form-group>
                          <label>Nationality
                            <span class="text-danger"><strong>*</strong></span></label>
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
                        <b-form-group>
                          <label> Marital Status</label>
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
import flatPickr from 'vue-flatpickr-component'
import toEnName from 'arabic-name-to-en'

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
    ...takeState('dtMAIN', 'showModalFamMEM')
      .expose(['active', 'item'])
      .commit('dtMAIN/SET_MOD_MEM_FAM_EXP')
      .map(),
    ...takeState('dtMAIN', 'showModalFAM')
      .expose(['listMember'])
      .commit('dtMAIN/SET_MOD_FAM_EXP')
      .map(),
    ///
    show: takeState('dtMEM', 'show').commit('dtMEM/SET_SHOW').map(),
    gender: takeState('dtMAIN', 'gender').map(),
    maritalStatus: takeState('dtMAIN', 'maritalStatus').map(),
    disbality: takeState('dtMAIN', 'disability').map(),
    nationality: takeState('dtMAIN', 'nationality').map(),
    showModalMEM: takeState('dtMAIN', 'showModalFamMEM')
      .commit('dtMAIN/SET_MOD_MEM_FAM')
      .map(),
  },
  methods: {
    getHouseholdName() {
      console.log(this.item)
      console.log(this.$refs.formMEM)
      this.$nextTick(() => {
        this.item.father_name = this.item.hoh.name
        this.item.father_name_ar = this.item.hoh.name_ar

        this.item.last_name = this.item.hoh.last_name
        this.item.last_name_ar = this.item.hoh.last_name_ar
      })
      this.$refs.formMEM.validate()
    },
    toLast(e) {
      this.$nextTick(() => {
        this.item.last_name = toEnName(e)
        this.$refs.formMEM.validate()
      })
    },
    toFirst(e) {
      this.$nextTick(() => {
        this.item.first_name = toEnName(e)
        this.$refs.formMEM.validate()
      })
    },
    toFather(e) {
      this.$nextTick(() => {
        this.item.father_name = toEnName(e)
        this.$refs.formMEM.validate()
      })
    },
    toMother(e) {
      this.$nextTick(() => {
        this.item.mother_name = toEnName(e)
        this.$refs.formMEM.validate()
      })
    },
    submit() {
      this.$refs.formMEM
        .validate()
        .then(success => {
          if (success) {
            console.log(this.item)
            if (
              this.listMember.filter(el => el.code === this.item.code)
                .length > 0
            ) {
              const index = this.listMember.findIndex(
                x => x.code === this.item.code,
              )
              this.listMember[index] = this.item
            } else {
              this.listMember.push(this.item)
            }
            this.abortion()
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
        })
        .catch(() => {
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
