<template>
  <validation-observer ref="simpleRules">
    <b-card
      id="bcard"
      no-body
    >
      <b-card-header class="pb-50">
        <h4>Setting</h4>
      </b-card-header>
      <b-card-body>
        <b-form
          ref="form"
          class="repeater-form"
          @submit.prevent
        >
          <div>
            <b-row>
              <!-- Cycle Duration -->
              <b-col cols="4">
                <validation-provider
                  v-slot="{ errors }"
                  rules="required"
                  name="Cycle Duration"
                >
                  <b-form-group label="Cycle Duration">
                    <v-select
                      id="cycle"
                      v-model="cycleduration"
                      placeholder="Select Cycle duration"
                      label="name"
                      :append-to-body="true"
                      :options="cycleOP"
                      :state="errors.length > 0 ? false : null"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                </validation-provider>
              </b-col>
              <!-- Modularity
              <b-col cols="4">
                <validation-provider
                  v-slot="{ errors }"
                  rules="required"
                  name="Modularity"
                >
                  <b-form-group label="Modularity">
                    <b-input
                      v-model="modularity"
                      type="number"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :state="errors.length > 0 ? false : null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                </validation-provider>
              </b-col> -->
              <!-- PD -->
              <!--<b-col cols="4">
                <validation-provider
                  v-slot="{ errors }"
                  rules="required"
                  name="PD"
                >
                  <b-form-group label="PD">
                    <b-input
                      v-model="pd"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :state="errors.length > 0 ? false : null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                </validation-provider>
              </b-col>-->
              <b-col cols="2">
                <b-button
                  class="ml-1 mr-1"
                  style="margin-top: 24px"
                  variant="primary"
                  block
                  @click="Save"
                >
                  <feather-icon
                    icon="PlusIcon"
                    class="mr-1"
                  />
                  <span>Save</span>
                </b-button>
              </b-col>
              <!-- Add
              <b-col cols="2">
                <b-button
                  style="margin-top: 24px"
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
              </b-col>-->
              <b-col cols="4" />
              <b-col cols="2">
                <b-button
                  style="margin-top: 24px"
                  variant="info"
                  block
                  @click="sidePD"
                >
                  <span>PD's</span>
                </b-button>
              </b-col>
            </b-row>

          </div>
        </b-form>
      </b-card-body>
    </b-card>
  </validation-observer>
</template>
<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { takeState } from 'vuex-dot'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import vSelect from 'vue-select'

export default {
  components: {
    vSelect,

    ValidationProvider,
    ValidationObserver,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  computed: {
    saved: takeState('listPMSetPrj', 'saved')
      .commit('listPMSetPrj/SET_SAVED')
      .map(),
    show: takeState('listPMSetPrj', 'show')
      .commit('listPMSetPrj/SET_SHOW')
      .map(),

    cycleOP: takeState('listPMSetPrj', 'cycleOP').map(),

    cycleduration: takeState('listPMSetPrj', 'cycleduration')
      .commit('listPMSetPrj/SET_CYCLE')
      .map(),
    modularity: takeState('listPMSetPrj', 'modularity')
      .commit('listPMSetPrj/SET_MODULE')
      .map(),

    pd: takeState('listPMSetPrj', 'pd')
      .commit('listPMSetPrj/SET_PD')
      .map(),

    isAssignSidebarActivePD: takeState('listPMSetPrj', 'isAssignSidebarActivePD')
      .commit('listPMSetPrj/SET_ASS_TO_PD')
      .map(),
    isAssignSidebarActiveADDPD: takeState('listPMSetPrj', 'isAssignSidebarActiveADDPD')
      .commit('listPMSetPrj/SET_ADD_SIDE_PD')
      .map(),
  },
  methods: {
    Clear() {
      this.cycleduration = null
      this.modularity = null
      this.pd = null
      this.$store.commit('listPMSetPrj/Clear')
    },
    Save() {
      console.log(this.cadaster)
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          this.$store
            .dispatch('listPMSetPrj/SAVE_SETTING', {
              prefix: this.$route.params.value.proj_prefix,
              prefixRole: this.$route.params.prefixRole,
            })
            .then(val => {
              console.log('val', val.res[0].result)
              if (val.res[0].result === 1) {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Setting Save Successfully',
                    icon: 'EditIcon',
                    variant: 'success',
                  },
                })
              } else {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Setting Save Failed',
                    icon: 'EditIcon',
                    variant: 'danger',
                  },
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
        } else {
          this.$swal({
            title: 'Warning!',
            text: 'Please Add Data Missing',
            icon: 'warning',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        }
      })
    },

    sidePD() {
      this.isAssignSidebarActivePD = true
    },
  },
}
</script>
