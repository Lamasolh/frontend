<template>
  <div>
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-centercontent-sidebar-header">
      <h5 class="mb-1">
        Assign To User
      </h5>
    </div>
    <!-- BODY -->
    <validation-observer
      #default="{ handleSubmit }"
      ref="refFormObserver"
    >
      <!-- Form -->
      <b-form
        style="margin-top: 14px;"
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
              <b-form-group>
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
            <b-table
              ref="assignTable"
              striped
              responsive
              fixed
              hover
              :busy="show"
              bordered
              select-mode="multi"
              selectable
              small
              :selected-variant="$store.state.appConfig.layout.skin === 'dark'?'active':'primary'"
              :items="UsersItem"
              :fields="UsersField"
              empty-text="No matching records were found"
              show-empty
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
              <template #cell(show_details)="row">
                <b-button
                  size="sm"
                  class="mr-2"
                  variant="primary"
                  @click="row.toggleDetails"
                >
                  {{ row.detailsShowing ? 'Hide' : 'Show' }} Address
                </b-button>
              </template>

              <template #row-details="row">
                <b-card>
                  <b-row class="mb-1">
                    <b-col>
                      <p>{{ row.item.adresstext }}</p>
                    </b-col>
                  </b-row>
                </b-card>
              </template>
              <template #table-caption>
                <div>
                  <span class="text-muted ml-2 mr-4">
                    Total Cases: {{ UsersItem == null ? 0 : UsersItem.length }}
                  </span>
                  <span class="text-muted">
                    Selected Cases:
                    {{ selectedUserCase == null ? 0 : selectedUserCase.length }}
                  </span>
                </div>
              </template>
            </b-table>
          </b-col>
        </b-row>
        <b-row class="justify-content-md-center">
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
      </b-form>
    </validation-observer>
  </div>
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
    UsersOtions: takeState('geoSplit', 'UsersOtions').map(),
    // Table
    UsersItem: takeState('geoSplit', 'userItem').map(),
    UsersField: takeState('geoSplit', 'userField').map(),
    // show
    show: takeState('geoSplit', 'show')
      .commit('geoSplit/SET_SHOW')
      .map(),
    saved: takeState('geoSplit', 'saved')
      .commit('geoSplit/SET_SAVED')
      .map(),
    selectedCase: takeState('geoSplit', 'selectedCase')
      .commit('geoSplit/SET_SELECT_ITEM')
      .map(),
    selectedUserCase: takeState('geoSplit', 'selectedUserCase')
      .commit('geoSplit/SET_SELECT_USER_ITEM')
      .map(),

    UserValue: {
      get() {
        return store.getters['geoSplit/usersValue']
      },
      set(value) {
        this.$store
          .dispatch('geoSplit/GET_USER', {
            prefix: this.$route.params.prefixPrj,
            value,
            type: this.$route.params.assmnttype,

          })
      },
    },
  },
  methods: {
    onRowSelected(items) {
      this.selectedUserCase = items
      this.$store.commit('geoSplit/SET_MAP_CENTER',
        {
          lat: items[items.length - 1].address_latitude,
          lng: items[items.length - 1].address_longitude,
          zoom: 16,
        })
    },
    selectAllRows() {
      this.$refs.assignTable.selectAllRows()
    },
    unselectAllRows() {
      this.$refs.assignTable.clearSelected()
    },
    DeleteAllAssing() {
      store
        .dispatch('geoSplit/DELETE_ALL_TO_USER', {
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
              resData += `<b>Case ${res[i][1].name},</br> Cadstre: ${res[i][1].cad}</b></br> <span class="text-success">Success</span></br></br>`
            } else if (res[i][0].result === 2) {
              resData += `<b>Case ${res[i][1].name},</br> Cadstre: ${res[i][1].cad}</b></br> is <span class="text-danger">duplicated</span> </br></br>`
            } else {
              resData += `<b>Case ${res[i][1].name},</br> Cadstre: ${res[i][1].cad}</b></br> Please call system administrator</br></br>`
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
        .dispatch('geoSplit/DELETE_TO_USER', {
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
