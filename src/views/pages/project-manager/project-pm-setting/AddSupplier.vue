<template>
  <b-sidebar
    id="sidebar"
    ref="add"
    :visible="isAssignSidebarActiveADD"
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
            Add Suppliers
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
            <!-- Supplier-->
            <b-row>
              <b-col>
                <validation-observer ref="addsupplier">
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required"
                    name="Supplier Name"
                  >
                    <b-form-group label="Supplier Name">
                      <b-form-input
                        id="supOrgName"
                        v-model="supOrgName"
                        :state="errors.length > 0 ? false : null"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        type="text"
                        placeholder="Enter Supplier Name"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required|max:10|min:3|alpha"
                    name="Supplier abbreviation"
                  >
                    <b-form-group label="Supplier abbreviation">
                      <b-form-input
                        id="supPrefix"
                        v-model="supPrefix"
                        :state="errors.length > 0 ? false : null"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        type="text"
                        placeholder="Enter Supplier abbreviation"
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
                        v-model="supGovId"
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
                        v-model="supdisId"
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
                        v-model="supCadId"
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
                        id="supEmail"
                        v-model="supEmail"
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
                        id="supPhone"
                        v-model="supPhone"
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
                        id="supFirstName"
                        v-model="supFirstName"
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
                    name="supLastName"
                  >
                    <b-form-group label="Last Name">
                      <b-form-input
                        id="supLastName"
                        v-model="supLastName"
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
                        id="supUsername"
                        v-model="supUsername"
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
                        id="supPassword"
                        v-model="supPassword"
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
                  @click="AddSupllier"
                >
                  <b-icon
                    icon="plus"
                    class="mr-1"
                  />
                  Add Supplier
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
    show: takeState('listPMSetPrj', 'show')
      .commit('listPMSetPrj/SET_SHOW')
      .map(),
    supList: takeState('listPMSetPrj', 'itemsSUP').map(),
    supField: takeState('listPMSetPrj', 'itemFieldSUP').map(),
    nationalityOp: takeState('global', 'nationality').map(),

    supOrgName: takeState('listPMSetPrj', 'supOrgName')
      .commit('listPMSetPrj/SET_SUP_ORG_NAME')
      .map(),
    supPrefix: takeState('listPMSetPrj', 'supPrefix')
      .commit('listPMSetPrj/SET_SUP_ORG_PREFIX')
      .map(),
    supGovId: takeState('listPMSetPrj', 'supGovId')
      .commit('listPMSetPrj/SET_SUP_GOV')
      .map(),
    supdisId: takeState('listPMSetPrj', 'supdisId')
      .commit('listPMSetPrj/SET_SUP_DIS')
      .map(),
    supCadId: takeState('listPMSetPrj', 'supCadId')
      .commit('listPMSetPrj/SET_SUP_CAD')
      .map(),
    supPhone: takeState('listPMSetPrj', 'supPhone')
      .commit('listPMSetPrj/SET_SUP_PHONE')
      .map(),
    supEmail: takeState('listPMSetPrj', 'supEmail')
      .commit('listPMSetPrj/SET_SUP_EMAIL')
      .map(),
    supFirstName: takeState('listPMSetPrj', 'supFirstName')
      .commit('listPMSetPrj/SET_SUP_FIRST_NAME')
      .map(),
    supLastName: takeState('listPMSetPrj', 'supLastName')
      .commit('listPMSetPrj/SET_SUP_LAST_NAME')
      .map(),
    supUsername: takeState('listPMSetPrj', 'supUsername')
      .commit('listPMSetPrj/SET_SUP_USER_NAME')
      .map(),
    supPassword: takeState('listPMSetPrj', 'supPassword')
      .commit('listPMSetPrj/SET_SUP_PASSOWRD')
      .map(),
    governorateOption: takeState('global', 'governorate').map(),
    districtOptions: takeState('global', 'district').map(),

    cadOptions: takeState('listPMSetPrj', 'cadOptions').map(),

    isAssignSidebarActiveADD: takeState(
      'listPMSetPrj',
      'isAssignSidebarActiveADD',
    ).commit('listPMSetPrj/SET_ADD_SIDE')
      .map(),

    districtSelect() {
      return this.districtOptions.filter(item => item.params
      === (this.supGovId != null ? this.supGovId.value : null))
    },
  },
  methods: {
    ChangeDistrict(value) {
      if (value != null) {
        this.$store.dispatch('listPMSetPrj/GET_CAD_SUP')
      } else {
        this.cadOptions = []
      }
    },
    AddSupllier() {
      this.$refs.refFormObserverAdd.validate().then(success => {
        if (success) {
          this.$store
            .dispatch('listPMSetPrj/ADD_SUPPLIER', {
              prefix: this.$route.params.value.proj_prefix,
              prefixRole: this.$route.params.prefixRole,
            })
            .then(val => {
              console.log('val', val.res[0].result)
              console.log('val', val.res[0].result)
              if (val.res[0].result === 1) {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Supplier added successfully',
                    icon: 'EditIcon',
                    variant: 'success',
                  },
                })
                this.isAssignSidebarActiveADD = false
              } else {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Supplier added Failed Check information',
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
      this.isAssignSidebarActiveADD = val
      this.$store.commit('listPMSetPrj/RESET_SUP')
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
