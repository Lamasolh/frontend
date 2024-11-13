<template>
  <b-sidebar
    id="sidebar"
    ref="add"
    :visible="isAssignSidebarActiveADDPD"
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
            Add PD
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
            <!-- PD-->
            <b-row>
              <b-col>
                <validation-observer ref="addDonnor">
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required"
                    name="PD Name"
                  >
                    <b-form-group label="PD Name">
                      <b-form-input
                        id="pdName"
                        v-model="pdName"
                        :state="errors.length > 0 ? false : null"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        type="text"
                        placeholder="Enter PD Name"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required"
                    name="PD Code"
                  >
                    <b-form-group label="PD Code">
                      <b-form-input
                        id="pdCode"
                        v-model="pdCode"
                        :state="errors.length > 0 ? false : null"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        type="text"
                        placeholder="Enter PD Code"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required"
                    name="PD Tag"
                  >
                    <b-form-group label="PD Tag">
                      <b-form-input
                        id="pdTag"
                        v-model="pdTag"
                        :state="errors.length > 0 ? false : null"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        type="text"
                        placeholder="Enter PD Tag"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required"
                    name="Donor"
                  >
                    <b-form-group label="Donor">
                      <v-select
                        id="donor"
                        v-model="pdDonor"
                        placeholder="Select Donor"
                        label="name"
                        :options="donorL"
                        :state="errors.length > 0 ? false : null"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
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
                  @click="AddPd"
                >
                  <b-icon
                    icon="plus"
                    class="mr-1"
                  />
                  Add PD
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
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import vSelect from 'vue-select'

export default {
  components: {
    vSelect,

    ValidationObserver,
    ValidationProvider,
  },
  directives: {
    Ripple,
  },
  computed: {
    show: takeState('listPMSetPrj', 'show').commit('listPMSetPrj/SET_SHOW').map(),
    pdName: takeState('listPMSetPrj', 'PDName').commit('listPMSetPrj/SET_PD_NAME').map(),
    pdCode: takeState('listPMSetPrj', 'PDCode').commit('listPMSetPrj/SET_PD_CODE').map(),
    pdTag: takeState('listPMSetPrj', 'PDtag').commit('listPMSetPrj/SET_PD_TAG').map(),
    pdDonor: takeState('listPMSetPrj', 'PDDonor').commit('listPMSetPrj/SET_PD_DONOR').map(),
    donorL: takeState('listPMSetPrj', 'itemsDON').map(),

    isAssignSidebarActiveADDPD: takeState(
      'listPMSetPrj',
      'isAssignSidebarActiveADDPD',
    ).commit('listPMSetPrj/SET_ADD_SIDE_PD').map(),
  },
  methods: {
    AddPd() {
      this.$refs.refFormObserverAdd.validate().then(success => {
        if (success) {
          this.$store
            .dispatch('listPMSetPrj/ADD_PD', {
              prefixRole: this.$route.params.prefixRole,
              prefix: this.$route.params.value.proj_prefix,
            })
            .then(val => {
              console.log('val', val.res[0])

              console.log('val', val.res[0].result)
              if (val.res[0].result === 1) {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'PD added successfully',
                    icon: 'EditIcon',
                    variant: 'success',
                  },
                })
                this.isAssignSidebarActiveADDPD = false
              } else {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'PD added Failed Check information',
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
      this.isAssignSidebarActiveADDPD = val
      this.$store.commit('listPMSetPrj/RESET_PD')
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
