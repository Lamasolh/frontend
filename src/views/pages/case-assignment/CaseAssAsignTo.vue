<template>
  <b-sidebar
    id="sidebar"
    ref="assign"
    :visible="isAssignSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @change="(val) => (isAssignSidebarActive = val)"
  >
    <template #default="{ hide }">
      <b-overlay
        rounded="lg"
        :show="show"
        style="height: 100%"
      >
        <!-- Header -->
        <div
          class="
            d-flex
            justify-content-between
            align-items-center
            content-sidebar-header
            px-2
            py-1
          "
        >
          <h5 class="mb-0">
            Assign To
          </h5>

          <feather-icon
            class="ml-1 cursor-pointer"
            icon="XIcon"
            size="16"
            @click="hide"
          />
        </div>
        <!-- BODY -->
        <validation-observer
          #default="{ handleSubmit }"
          ref="refFormObserver"
        >
          <!-- Form -->
          <b-form
            class="p-2"
            @submit.prevent="handleSubmit(onSubmit)"
          >
            <!-- Users -->
            <b-row>
              <b-col>
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="users"
                  slim
                >
                  <b-form-group label="Users">
                    <v-select
                      v-model="UserValue"
                      placeholder="Select User"
                      label="user_name"
                      :clearable="false"
                      :state="errors.length > 0 ? false : null"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :options="UsersOtions"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                </validation-provider>
                <span class="text-muted">
                  Total Cases: {{ UsersItem == null ? 0 : UsersItem.length }}
                </span>
                <b-table
                  ref="assignTable"
                  striped
                  hover
                  :busy="show"
                  bordered
                  select-mode="multi"
                  selectable
                  small
                  :selected-variant="$store.state.appConfig.layout.skin === 'dark'?'active':'primary'"
                  :items="UsersItem"
                  :fields="UsersField"
                  empty-text="No matching records found"
                  show-empty
                  responsive="lg"
                  @row-selected="onRowSelected"
                >
                  <template #table-busy>
                    <div class="text-center text-primary my-2">
                      <b-spinner class="align-middle" />
                      <strong>Loading...</strong>
                    </div>
                  </template>
                  <template #cell(delete)="data">
                    <b-button
                      pill
                      variant="danger"
                      @click="DeleteAssing(data)"
                    >
                      Delete
                    </b-button>
                  </template>
                </b-table>
              </b-col>
            </b-row>
            <b-row class="justify-content-md-center">
              <b-col>
                <span class="text-muted">
                  Selected Cases:
                  {{ selectedUserCase == null ? 0 : selectedUserCase.length }}
                </span>
              </b-col>
              <b-col align-h="between">
                <b-button
                  v-if="selectedUserCase.length !== UsersItem.length"
                  pill
                  variant="info"
                  :disabled="UsersItem.length === 0"
                  @click="selectAllRows"
                >
                  Select All
                </b-button>
                <b-button
                  v-else
                  pill
                  variant="info"
                  :disabled="UsersItem.length === 0"
                  @click="unselectAllRows"
                >
                  Unselect All
                </b-button>
              </b-col>
              <b-col>
                <b-button
                  pill
                  variant="danger"
                  :disabled="selectedUserCase.length === 0"
                  @click="DeleteAllAssing"
                >
                  Delete
                </b-button>
              </b-col>
            </b-row>
            <br>
            <br>
            <b-row class="justify-content-md-center">
              <b-button
                pill
                variant="primary"
                @click="AssignToUser"
              >
                Assign Selected
              </b-button>
            </b-row>
          </b-form>
        </validation-observer>
      </b-overlay>
    </template>
  </b-sidebar>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Ripple from 'vue-ripple-directive'
import store from '@/store'
import vSelect from 'vue-select'
import { takeState } from 'vuex-dot'

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
    // combo box
    UsersOtions: takeState('caseAssignment', 'UsersOtions').map(),
    // Table
    UsersItem: takeState('caseAssignment', 'userItem').map(),
    UsersField: takeState('caseAssignment', 'userField').map(),
    // show
    show: takeState('caseAssignment', 'show')
      .commit('caseAssignment/SET_SHOW')
      .map(),
    saved: takeState('caseAssignment', 'saved')
      .commit('caseAssignment/SET_SAVED')
      .map(),
    selectedCase: takeState('caseAssignment', 'selectedCase')
      .commit('caseAssignment/SET_SELECT_ITEM')
      .map(),
    selectedUserCase: takeState('caseAssignment', 'selectedUserCase')
      .commit('caseAssignment/SET_SELECT_USER_ITEM')
      .map(),

    UserValue: {
      get() {
        return store.getters['caseAssignment/usersValue']
      },
      set(value) {
        this.$store
          .commit('caseAssignment/SET_USER',
            value)
        this.$store
          .dispatch('caseAssignment/GET_USER', {
            prefix: this.$route.params.prefixPrj,
            value,
            type: this.$route.params.assmnttype,
          })
      },
    },
    isAssignSidebarActive: {
      get() {
        return store.getters['caseAssignment/isAssignSidebarActive']
      },
      set(value) {
        return this.$store.commit('caseAssignment/SET_ASS_TO', value)
      },
    },
  },
  methods: {
    AssignToUser() {
      if (this.UserValue === null) {
        this.$swal({
          title: 'Attention!',
          text: 'Please select user!',
          icon: 'warning',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
      } else if (this.selectedCase.length === 0) {
        this.$swal({
          title: 'Attention!',
          text: 'Please select cases!',
          icon: 'warning',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
      } else {
        store
          .dispatch('caseAssignment/SEND_TO_USER', {
            prefix: this.$route.params.prefixPrj,
            prefixRole: this.$route.params.prefixRole,
            type: this.$route.params.assmnttype,
          })
          .then(resu => {
            const res = resu
            let resData = ''
            for (let i = 0; i < res.length; i += 1) {
              if (res[i][0].result === 1) {
                resData += `<b>Case ${res[i][1].name}, +${res[i][1].phone}:</b></br> <b class="text-success">Success</b><b>CaseCode: ${res[i][0].ccd}</b></br></br>`
              } else if (res[i][0].result === 2) {
                resData += `<b>Case ${res[i][1].name}, +${res[i][1].phone}:</b></br><b class="text-danger"> is duplicated</b> <b>CaseCode: ${res[i][0].ccd}</b></br></br>`
              } else {
                resData += `<b>Case ${res[i][1].name}, +${res[i][1].phone}:</b></br> <b class="text-danger">Please call system administrator</b></br></br>`
              }
            }
            this.isAssignSidebarActive = false
            this.$swal({
              title: 'Result!',
              html: resData,
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          })
          .catch(() => {
            this.$swal({
              title: 'Attention!',
              text: 'Please check intenrnet and try again!',
              icon: 'warning',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          })
      }
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
    DeleteAllAssing() {
      store
        .dispatch('caseAssignment/DELETE_ALL_TO_USER', {
          val: this.selectedUserCase,
          prefix: this.$route.params.prefixPrj,
          prefixRole: this.$route.params.prefixRole,
          type: this.$route.params.assmnttype,
        })
        .then(resu => {
          const res = resu
          let resData = ''
          for (let i = 0; i < res.length; i += 1) {
            if (res[i][0].result === 1) {
              resData += `<b>Case ${res[i][1].name}, Referral: ${res[i][1].phone}:</b></br><b class="text-success"> Success</b>  </br></br>`
            } else if (res[i][0].result === 2) {
              resData += `<b>Case ${res[i][1].name}, Referral: ${res[i][1].phone}:</b></br> <b class="text-danger">is  duplicated</b></br></br>`
            } else {
              resData += `<b>Case ${res[i][1].name}, Referral: ${res[i][1].phone}:</b></br> <b class="text-danger">Please call system administrator</b></br></br>`
            }
          }
          this.$swal({
            title: 'Result!',
            html: resData,
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        })
        .catch(() => {
          this.$swal({
            title: 'Attention!',
            text: 'Please check intenrnet and try again!',
            icon: 'warning',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        })
    },
    DeleteAssing(val) {
      store
        .dispatch('caseAssignment/DELETE_TO_USER', {
          val: val.item,
          prefix: this.$route.params.prefixPrj,
          prefixRole: this.$route.params.prefixRole,
          type: this.$route.params.assmnttype,
        })
        .then(res => {
          if (res[0].result === 1) {
            this.$swal({
              title: 'Success!',
              text: 'You delete case successfully!',
              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          } else {
            this.$swal({
              title: 'Error!',
              text: 'You delete case failed!',
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
            title: 'Attention!',
            text: 'Please check intenrnet and try again!',
            icon: 'warning',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        })
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
