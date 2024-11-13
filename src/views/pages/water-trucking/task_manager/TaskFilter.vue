<template>
  <validation-observer ref="simpleRules">
    <b-card
      id="bcard"
      no-body
    >
      <b-card-header class="pb-50">
        <h4>Filters</h4>
      </b-card-header>
      <b-card-body>
        <b-form
          ref="form"
          class="repeater-form"
          @submit.prevent
        >
          <div>
            <!-- Gov/ Dis/Type/Cadaster -->
            <b-row>
              <!-- Gov -->
              <b-col cols="4">
                <validation-provider
                  v-slot="{ errors }"
                  rules="required"
                  name="Governorate"
                >
                  <b-form-group label="Governorate">
                    <v-select
                      v-model="governorate"
                      label="title"
                      placeholder="ALL"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :options="governorateOption"
                      :state="errors.length > 0 ? false : null"
                      @input="(value) => ChangeGovItem(value)"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                </validation-provider>
              </b-col>
              <!-- District -->
              <b-col cols="4">
                <validation-provider
                  v-slot="{ errors }"
                  rules="required"
                  name="District"
                >
                  <b-form-group label="District">
                    <v-select
                      v-model="district"
                      placeholder="ALL"
                      label="title"
                      :dir="
                        $store.state.appConfig.isRTL ? 'rtl' : 'ltr'
                      "
                      :options="districtOptions"
                      :state="errors.length > 0 ? false : null"
                      @input="(value) => ChangeDistrict(value)"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                </validation-provider>

              </b-col>
              <!-- Cadaster -->
              <b-col cols="4">
                <validation-provider
                  v-slot="{ errors }"
                  rules="required"
                  name="Cadaster"
                >
                  <b-form-group label="Cadaster">
                    <v-select
                      v-model="cadaster"
                      placeholder="ALL"
                      label="title"
                      taggable
                      :close-on-select="false"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :options="cadOptions"
                      :state="errors.length > 0 ? false : null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                </validation-provider>
              </b-col>

            </b-row>
            <b-row align-h="between">
              <b-col cols="4" />
              <b-col cols="4">
                <b-row>
                  <b-col cols="6">
                    <b-button
                      class="ml-1 mr-1"
                      style="margin-top:24px;"
                      variant="primary"
                      block
                      @click="AddItem"
                    >
                      <feather-icon
                        icon="PlusIcon"
                        class="mr-1"
                      />
                      <span>Fill</span>
                    </b-button>
                  </b-col>
                  <!-- Add -->
                  <b-col cols="6">
                    <b-button
                      style="margin-top:24px;"
                      variant="danger"
                      block
                      @click="Clear"
                    >
                      <feather-icon
                        icon="XIcon"
                        class="mr-1"
                      />
                      <span>Clear</span>
                    </b-button>
                  </b-col>
                </b-row>

              </b-col>
            </b-row>
          </div>

        </b-form>
        <b-row>
          <b-col cols="3">
            <p> On Going Iss: {{ ongoing_iss }}</p>

          </b-col>
          <b-col cols="3">
            <p> Total Iss: {{ total_iss }}</p>
          </b-col>
        </b-row>
      </b-card-body>

    </b-card>
  </validation-observer>
</template>
<script>
import vSelect from 'vue-select'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { takeState } from 'vuex-dot'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    vSelect,
    ValidationProvider,
    ValidationObserver,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,

  },
  computed: {
    saved: takeState('truckingTaskmanager', 'saved').commit('truckingTaskmanager/SET_SAVED').map(),
    show: takeState('truckingTaskmanager', 'show').commit('truckingTaskmanager/SET_SHOW').map(),
    // governorateOption: takeState('global', 'governorate').map(),
    // districtOptions: takeState('global', 'district').map(),
    governorateOption: takeState('truckingTaskmanager', 'govOptions').commit('truckingTaskmanager/SET_GOV_OPT').map(),
    districtOptions: takeState('truckingTaskmanager', 'disOptions').commit('truckingTaskmanager/SET_DIS_OPT').map(),
    cadOptions: takeState('truckingTaskmanager', 'cadOptions').commit('truckingTaskmanager/SET_CAD_OPT').map(),
    ///
    governorate: takeState('truckingTaskmanager', 'governorate').commit('truckingTaskmanager/SET_GOV').map(),
    district: takeState('truckingTaskmanager', 'district').commit('truckingTaskmanager/SET_DIS').map(),
    cadaster: takeState('truckingTaskmanager', 'cadaster').commit('truckingTaskmanager/SET_CAD').map(),

    ongoing_iss: takeState('truckingTaskmanager', 'ongoing_iss').map(),
    total_iss: takeState('truckingTaskmanager', 'total_iss').map(),

  },
  methods: {
    ChangeGovItem(value) {
      this.district = null
      this.cadaster = null
      console.log(value)
      if (value != null) {
        this.$store.dispatch('truckingTaskmanager/GET_DIS', {
          prefix: this.$route.params.prefixPrj,
          prefixRole: this.$route.params.prefixRole,
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
      } else {
        this.districtOptions = []
        this.cadOptions = []
      }
    },
    ChangeDistrict(value) {
      console.log(value)
      if (value != null) {
        this.$store.dispatch('truckingTaskmanager/GET_CAD', {
          prefix: this.$route.params.prefixPrj,
          prefixRole: this.$route.params.prefixRole,
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
      } else {
        this.cadOptions = []
      }
    },
    Clear() {
      this.governorate = null
      this.district = null
      this.cadaster = null
      this.districtOptions = []
      this.cadOptions = []
      this.$store.commit('truckingTaskmanager/Clear')
      this.$store.dispatch('truckingTaskmanager/GET_GOV', {
        prefix: this.$route.params.prefixPrj,
        prefixRole: this.$route.params.prefixRole,
      })
    },
    AddItem() {
      console.log(this.cadaster)
      if (this.cadaster != null) {
        this.$store.dispatch('truckingTaskmanager/GET_ISS', {
          prefix: this.$route.params.prefixPrj,
          prefixRole: this.$route.params.prefixRole,
        }).then(val => {
          console.log('val', val)
          if (val === 0) {
            this.$swal({
              title: 'Alert!',
              text: 'All ISs is assigned for these cadastars or still no data yet',
              icon: 'warning',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          }
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
          title: 'Warning!',
          text: 'Please Select Cadaster',
          icon: 'warning',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
      }
    },
  },
}
</script>
