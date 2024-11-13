<template>
  <b-sidebar
    id="sidebar"
    ref="add"
    :visible="isAssignSidebarActiveADDDon"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @change="(val) => clear(val)"
  >
    <template #default="{ hide }">
      <b-overlay
        rounded="lg"
        :show="show"
        style="height: 100%"
      >
        <!-- Header -->
        <div
          class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1"
        >
          <h5 class="mb-0">
            Add Donors
          </h5>

          <feather-icon
            class="ml-1 cursor-pointer"
            icon="XIcon"
            size="16"
            @click="hide"
          />
        </div>
        <!-- BODY -->
        <validation-observer ref="refFormObserverAdd">
          <!-- Form -->
          <b-form class="p-2">
            <!-- Donor-->
            <b-row>
              <b-col>
                <validation-observer ref="addDonnor">
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required"
                    name="Organization Name"
                  >
                    <b-form-group label="Organization Name">
                      <b-form-input
                        id="donOrgName"
                        v-model="donOrgName"
                        :state="errors.length > 0 ? false : null"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        type="text"
                        placeholder="Enter Organization Name"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required|max:10|min:3|alpha"
                    name="Prefix"
                  >
                    <b-form-group label="Prefix">
                      <b-form-input
                        id="donPrefix"
                        v-model="donPrefix"
                        :state="errors.length > 0 ? false : null"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        type="text"
                        placeholder="Enter Prefix"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    name="Governorate"
                    rules="required"
                  >
                    <b-form-group label="Governorate">
                      <v-select
                        v-model="donGovId"
                        label="title"
                        placeholder="Select Governorate"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        :options="governorateOption"
                        :state="errors.length > 0 ? false : null"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    name="District"
                    rules="required"
                  >
                    <b-form-group label="District">
                      <v-select
                        v-model="dondisId"
                        label="title"
                        placeholder="Select District"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        :options="districtSelect"
                        :state="errors.length > 0 ? false : null"
                        @input="(value) => ChangeDistrict(value)"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    name="Cadaster"
                    rules="required"
                  >
                    <b-form-group label="Cadaster">
                      <v-select
                        v-model="donCadId"
                        label="title"
                        placeholder="Select Cadaster"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        :options="cadOptions"
                        :state="errors.length > 0 ? false : null"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required|email"
                    name="Email"
                  >
                    <b-form-group label="Email">
                      <b-form-input
                        id="donEmail"
                        v-model="donEmail"
                        :state="errors.length > 0 ? false : null"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        type="text"
                        placeholder="Enter Contact Email"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required|phonelbed"
                    name="Phone"
                  >
                    <b-form-group label="Phone">
                      <b-form-input
                        id="donPhone"
                        v-model="donPhone"
                        :state="errors.length > 0 ? false : null"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        type="text"
                        placeholder="Enter Contact Phone"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required"
                    name="first name"
                  >
                    <b-form-group label="First Name">
                      <b-form-input
                        id="donFirstName"
                        v-model="donFirstName"
                        :state="errors.length > 0 ? false : null"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        type="text"
                        placeholder="Enter First Name"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required"
                    name="donLastName"
                  >
                    <b-form-group label="Last Name">
                      <b-form-input
                        id="donLastName"
                        v-model="donLastName"
                        :state="errors.length > 0 ? false : null"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        type="text"
                        placeholder="Enter Last Name"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required|alpha_dash|min:4"
                    name="username"
                  >
                    <b-form-group label="Username">
                      <b-form-input
                        id="donUsername"
                        v-model="donUsername"
                        :state="errors.length > 0 ? false : null"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        type="text"
                        placeholder="Enter Username"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required"
                    name="Password"
                  >
                    <b-form-group label="Password">
                      <b-form-input
                        id="donPassword"
                        v-model="donPassword"
                        :state="errors.length > 0 ? false : null"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        type="text"
                        placeholder="Enter Password"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                  <!--<validation-provider
                    v-slot="{ errors }"
                    name="Nationality"
                    rules="required"
                  >
                    <b-form-group label="Nationality">
                      <v-select
                        id="Nationality"
                        v-model="nationality"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        :options="nationalityOp"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Enter Nationality"
                        :clearable="false"
                        label="title"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider> -->
                </validation-observer>
              </b-col>
            </b-row>

            <br>
            <br>
            <b-row align-h="end">
              <b-col cols="4">
                <b-button
                  variant="success"
                  block
                  @click="AddDonnor"
                >
                  <b-icon
                    icon="plus"
                    class="mr-1"
                  />
                  Add Donor
                </b-button>
              </b-col>
            </b-row>
          </b-form>
        </validation-observer>
      </b-overlay>
    </template>
  </b-sidebar>
</template>
<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import Ripple from 'vue-ripple-directive'
import { takeState } from 'vuex-dot'
import vSelect from 'vue-select'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    vSelect,
  },
  directives: {
    Ripple,
  },
  computed: {
    show: takeState('listPMSetPrj', 'show').commit('listPMSetPrj/SET_SHOW').map(),
    donOrgName: takeState('listPMSetPrj', 'donOrgName').commit('listPMSetPrj/SET_DON_ORG_NAME').map(),
    donPrefix: takeState('listPMSetPrj', 'donPrefix').commit('listPMSetPrj/SET_DON_ORG_PREFIX').map(),
    donGovId: takeState('listPMSetPrj', 'donGovId').commit('listPMSetPrj/SET_DON_GOV').map(),
    dondisId: takeState('listPMSetPrj', 'dondisId').commit('listPMSetPrj/SET_DON_DIS').map(),
    donCadId: takeState('listPMSetPrj', 'donCadId').commit('listPMSetPrj/SET_DON_CAD').map(),
    donPhone: takeState('listPMSetPrj', 'donPhone').commit('listPMSetPrj/SET_DON_PHONE').map(),
    donEmail: takeState('listPMSetPrj', 'donEmail').commit('listPMSetPrj/SET_DON_EMAIL').map(),
    donFirstName: takeState('listPMSetPrj', 'donFirstName').commit('listPMSetPrj/SET_DON_FIRST_NAME').map(),
    donLastName: takeState('listPMSetPrj', 'donLastName').commit('listPMSetPrj/SET_DON_LAST_NAME').map(),
    donUsername: takeState('listPMSetPrj', 'donUsername').commit('listPMSetPrj/SET_DON_USER_NAME').map(),
    donPassword: takeState('listPMSetPrj', 'donPassword').commit('listPMSetPrj/SET_DON_PASSOWRD').map(),
    governorateOption: takeState('global', 'governorate').map(),
    districtOptions: takeState('global', 'district').map(),
    cadOptions: takeState('listPMSetPrj', 'cadOptions').map(),
    isAssignSidebarActiveADDDon: takeState(
      'listPMSetPrj',
      'isAssignSidebarActiveADDDon',
    ).commit('listPMSetPrj/SET_ADD_SIDE_DON').map(),

    districtSelect() {
      return this.districtOptions.filter(item => item.params
      === (this.donGovId != null ? this.donGovId.value : null))
    },
  },
  methods: {
    ChangeDistrict(value) {
      if (value != null) {
        this.$store.dispatch('listPMSetPrj/GET_CAD_DON')
      } else {
        this.cadOptions = []
      }
    },
    AddDonnor() {
      this.$refs.refFormObserverAdd.validate().then(success => {
        if (success) {
          this.$store
            .dispatch('listPMSetPrj/ADD_Donor', {
              prefixRole: this.$route.params.prefixRole,
              prefix: this.$route.params.value.proj_prefix,
            })
            .then(val => {
              console.log('val', val.res[0].result)

              console.log('val', val.res[0].result)
              if (val.res[0].result === 1) {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Donor added successfully',
                    icon: 'EditIcon',
                    variant: 'success',
                  },
                })
                this.isAssignSidebarActiveADDDon = false
              } else {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Donor added Failed Check information',
                    icon: 'EditIcon',
                    variant: 'danger',
                  },
                })
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
    clear(val) {
      this.isAssignSidebarActiveADDDon = val
      this.$store.commit('listPMSetPrj/RESET_DON')
      this.$refs.refFormObserverAdd.reset()
    },
    onRowSelected(items) {
      this.selectedUserCase = items
    },
    selectAllRows() {
      this.$refs.assignTable.selectAllRows()
    },
    unselectAllRows() {
      this.$refs.assignTable.clearSelected()
    },
  },
}
</script>

  <style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

#sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
  width: 45em;
}
</style>
