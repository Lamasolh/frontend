<template>
  <b-card>
    <b-card-body>
      <div class="d-flex justify-content-between  flex-wrap">
        <!-- sorting  -->
        <b-form-group
          label="Sort"
          label-size="sm"
          label-align-sm="left"
          label-cols-sm="2"
          label-for="sortBySelect"
          class="mr-1 mb-md-0"
        >
          <b-input-group
            size="sm"
          >
            <b-form-select
              id="sortBySelect"
              v-model="sortBy"
              :options="sortOptions"
            >
              <template #first>
                <option value="">
                  none
                </option>
              </template>
            </b-form-select>
            <b-form-select
              v-model="sortDesc"
              size="sm"
              :disabled="!sortBy"
            >
              <option :value="false">
                Asc
              </option>
              <option :value="true">
                Desc
              </option>
            </b-form-select>
            <!-- Refresh -->
            <b-button
              variant="primary"
              size="sm"
              class="ml-2"
              @click=" $parent.$parent.ResetData()"
            >
              <b-icon
                icon="arrow-repeat"
              />
            </b-button>
          </b-input-group>
        </b-form-group>

        <!-- filter -->
        <b-form-group
          label="Filter"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filterInput"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            />
            <b-input-group-append>
              <b-button
                :disabled="!filter"
                @click="filter = ''"
              >
                Clear
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </div>
    </b-card-body>
    <validation-observer ref="simpleRules">
      <b-table
        ref="selectableTable"
        bordered
        responsive
        show-empty
        empty-text="No matching records found"
        :items="itemTable"
        :selected-variant="
          $store.state.appConfig.layout.skin === 'dark'
            ? 'active'
            : 'primary'
        "
        sticky-header
        :per-page="perPage"
        :current-page="currentPage"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        data-boundary="window"
        style="max-height: 450px"
        :filter="filter"
        :filter-included-fields="filterOn"
        :fields="itemField"
      >

        <template #cell(id)="data">
          <p>{{ data.index + 1 }}</p>
        </template>
        <template #cell(quantity)="data">
          <validation-provider
            v-slot="{ errors }"
            rules="required|min_value:1"
            :name="'Quantity ' +( data.index +1)"
          >
            <b-form-input
              :id="'Quantity ' +( data.index +1)"
              v-model="data.item.quantity"
              :state="errors.length > 0 ? false : null"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              type="number"
            />
            <small class="text-danger mb-1">{{
              errors[0]
            }}</small>
          </validation-provider>

        </template>
        <template #cell(quota)="data">
          <validation-provider
            v-slot="{ errors }"
            rules="required|min_value:1"
            :name="'Quota ' +( data.index +1)"
          >
            <b-form-input
              :id="'Quota ' +( data.index +1)"
              v-model="data.item.quota"
              :state="errors.length > 0 ? false : null"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              type="number"
              @input="(value)=>chngQuota(value,data.index)"
            />
            <small class="text-danger mb-1">{{
              errors[0]
            }}</small>
          </validation-provider>

        </template>
        <template #cell(duration)="data">
          <validation-provider
            v-slot="{ errors }"
            rules="required|min_value:1"
            :name="'Duration ' +( data.index +1)"
          >
            <b-form-input
              :id="'Duration ' +( data.index +1)"
              v-model="data.item.duration"
              :state="errors.length > 0 ? false : null"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              type="number"
              @input="(value)=>chngDur(value,data.index)"
            />
            <small class="text-danger mb-1">{{
              errors[0]
            }}</small>
          </validation-provider>

        </template>
        <template #cell(supplier)="data">
          <validation-provider
            v-slot="{ errors }"
            rules="required"
            :name="'Supplier ' + (data.index +1)"
          >
            <v-select
              :id="'supplier' + data.index"
              v-model="data.item.supplier"
              label="title"
              :clearable="false"
              :append-to-body="true"
              :state="errors.length > 0 ? false : null"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="supL"
            />
            <small class="text-danger mb-1">{{
              errors[0]
            }}</small>
          </validation-provider>
        </template>

        <template #cell(pd)="data">
          <validation-provider
            v-slot="{ errors }"
            rules="required"
            :name="'Pd ' + (data.index +1)"
          >
            <v-select
              :id="'pd' + data.index"
              v-model="data.item.pd"
              label="title"
              :clearable="false"
              :append-to-body="true"
              :state="errors.length > 0 ? false : null"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="pdL"
            />
            <small class="text-danger mb-1">{{
              errors[0]
            }}</small>
          </validation-provider>
        </template>
        <template #cell(show_details)="row">
          <b-button
            size="sm"
            class="mr-2"
            block
            variant="primary"
            @click="row.toggleDetails"
          >
            Details
          </b-button>
        </template>
        <template #row-details="row">
          <b-row>
            <b-col>
              <p> Cycle Code: {{ row.item.cycle_code }}</p>
              <p> Cycle Date: {{ row.item.cycle_date }}</p>
              <b-button
                block
                variant="success"
                @click="sendToWash"
              >
                Assign To WASH Sector
              </b-button>
            </b-col>
            <b-col>
              <p> Cycle Deadline: {{ row.item.cycle_deadline }}</p>
              <p> Number of individual:</p>
              <validation-provider
                v-slot="{ errors }"
                rules="required|min_value:1"
                :name="'Number of individual ' +( row.index +1)"
              >
                <b-form-input
                  :id="'Number of individual ' +( row.index +1)"
                  v-model="row.item.idps_count "
                  :state="errors.length > 0 ? false : null"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  type="number"
                  @input="(value)=>chngNDps(value,row.index)"
                />
                <small class="text-danger mb-1">{{
                  errors[0]
                }}</small>
              </validation-provider>

              <p> Number of capcity:</p>
              <validation-provider
                v-slot="{ errors }"
                rules="required|min_value:1"
                :name="'Number of capcity' +( row.index +1)"
              >
                <b-form-input
                  :id="'Number of capcity ' +( row.index +1)"
                  v-model="row.item.srvc_capacity"
                  :state="errors.length > 0 ? false : null"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  type="number"
                  @input="(value)=>chngNDps(value,row.index)"
                />
                <small class="text-danger mb-1">{{
                  errors[0]
                }}</small>
              </validation-provider>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <p>Note: {{ row.note }}</p>
            </b-col>
          </b-row>

        </template>
        <template #cell(iss)="row">
          <h4>{{ row.item.is_name_ar }}</h4>
          <p>{{ row.item.p_code }}</p>
        </template>
        <template #cell(action)="row">
          <b-row>
            <b-col cols="6">
              <b-button
                size="sm"

                variant="success"
                @click="submitItem(row)"
              >
                <feather-icon
                  icon="ThumbsUpIcon"
                />
              </b-button>
            </b-col>
            <b-col cols="6">
              <b-button
                size="sm"
                variant="danger"
                @click="deleteItem(row)"
              >
                <feather-icon
                  icon="XIcon"
                />
              </b-button>

            </b-col>

          </b-row>

        </template>
      </b-table>
      <p><span class="text-muted ml-2 mr-4">Total Cases: {{ itemTable.length }}</span></p>
    </validation-observer>
    <b-row
      class="m-1"
      align-h="between"
    >
      <b-col
        cols="3"
        class="mt-2"
      >
        <!-- page length -->
        <b-form-group
          label="Per Page"
          label-cols="4"
          label-align="left"
          class="text-nowrap"
        >
          <b-form-select
            id="perPageSelect"
            v-model="perPage"
            :options="pageOptions"
          />

        </b-form-group>

      </b-col>

      <b-col
        cols="auto"
        offset-md="4"
        align="right"
        style="margin-top: 16px;"
      >
        <!-- pagination -->
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          first-number
          last-number
          prev-class="prev-item"
          next-class="next-item"
          class="mt-2"
        >
          <template #prev-text>
            <feather-icon
              icon="ChevronLeftIcon"
              size="18"
            />
          </template>
          <template #next-text>
            <feather-icon
              icon="ChevronRightIcon"
              size="18"
            />
          </template>
        </b-pagination>
      </b-col>

    </b-row>
    <b-row align-h="end">
      <b-col cols="2">
        <b-button
          block
          variant="info"
          @click="showFilter = true"
        >
          Create Referral
        </b-button>
      </b-col>
    </b-row>
  </b-card>

</template>
<script>
import { takeState } from 'vuex-dot'
import vSelect from 'vue-select'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    vSelect,
    ValidationProvider,
    ValidationObserver,

  },
  data() {
    return {
      totalRows: null,
    }
  },
  computed: {
    show: takeState('drmNGOSup', 'show').commit('drmNGOSup/SET_SHOW').map(),

    perPage: takeState('drmNGOSup', 'perPage').commit('drmNGOSup/SET_PER_PAGE').map(),
    pageOptions: takeState('drmNGOSup', 'pageOptions').map(),
    currentPage: takeState('drmNGOSup', 'currentPage').commit('drmNGOSup/SET_CUR_PAGE').map(),
    sortBy: takeState('drmNGOSup', 'sortBy').commit('drmNGOSup/SET_SORT_BY').map(),
    sortDesc: takeState('drmNGOSup', 'sortDesc').commit('drmNGOSup/SET_SORT_DESC').map(),
    sortDirection: takeState('drmNGOSup', 'sortDirection').commit('drmNGOSup/SET_SORT_DIR').map(),
    filter: takeState('drmNGOSup', 'filter').commit('drmNGOSup/SET_FILTER').map(),
    filterOn: takeState('drmNGOSup', 'filterOn').commit('drmNGOSup/SET_FILTER_ON').map(),

    supplier: takeState('drmNGOSup', 'supplier').commit('drmNGOSup/SET_MOD_SUP').map(),
    donor: takeState('drmNGOSup', 'donor').commit('drmNGOSup/SET_MOD_DON').map(),
    amount: takeState('drmNGOSup', 'amount').commit('drmNGOSup/SET_MOD_AMNT').map(),
    quantity: takeState('drmNGOSup', 'quantity').commit('drmNGOSup/SET_MOD_QTY').map(),
    note: takeState('drmNGOSup', 'note').commit('drmNGOSup/SET_MOD_NOTE').map(),
    selectedUrgentId: takeState('drmNGOSup', 'selectedUrgentId').commit('drmNGOSup/SET_MOD_ID').map(),

    supL: takeState('drmNGOSup', 'listSupplier').map(),
    donL: takeState('drmNGOSup', 'listDonors').map(),
    pdL: takeState('drmNGOSup', 'pdList').map(),
    pd: takeState('drmNGOSup', 'pd').commit('drmNGOSup/SET_MOD_PD').map(),
    cycleType: takeState('drmNGOSup', 'cycleType').commit('drmNGOSup/SET_MOD_CYCLE_TYPE').map(),
    showFilter: takeState('drmNGOSup', 'showFilter').commit('drmNGOSup/SET_SHOW_FILTER').map(),

    itemField: takeState('drmNGOSup', 'itemField').map(),
    items: takeState('drmNGOSup', 'items').map(),
    sortOptions() {
      // Create an options list from our fields
      return this.itemField
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },

    itemTable() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.totalRows = this.items.length
      return this.items
    },

  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.itemTable.length
  },
  methods: {
    onRowSelected(items) {
      this.selectedCase = items
    },
    sideSup() {
      this.isAssignSidebarActive = true
    },
    chngQuota(qto, index) {
      console.log(this.items[index], index)
      this.items[index].quantity = this.items[index].idps_count * this.items[index].duration * qto
    },
    chngNDps(ndp, index) {
      console.log(this.items[index], index)
      this.items[index].quantity = ndp * this.items[index].duration * this.items[index].quota
    },
    chngDur(dur, index) {
      console.log(this.items[index], index)
      this.items[index].quantity = this.items[index].idps_count * this.items[index].quota * dur
    },
    submitItem(row) {
      console.log(row, row.item.supplier, row.item.pd, row.item.quantity)
      console.log(row, row.item.supplier == null, row.item.pd == null, row.item.quantity == null)
      if (row.item.supplier == null || row.item.pd == null || row.item.quantity == null) {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Missing Data',
            icon: 'EditIcon',
            variant: 'warning',
          },
        })
      } else {
        this.$store.dispatch('drmNGOSup/SEND_DATA', {
          prefix: this.$route.params.prefixPrj,
          prefixRole: this.$route.params.prefixRole,
          item: row.item,
        }).then(val => {
          if (val === 1) {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Supplier Assign successfully',
                icon: 'EditIcon',
                variant: 'success',
              },
            })
          } else {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Supplier Assign Failed Check information',
                icon: 'EditIcon',
                variant: 'danger',
              },
            })
          }
        })
      }
      /* if (success) {
        console.log('success')
        this.$store.dispatch('drmNGOSup/SEND_DATA', {
          prefix: this.$route.params.prefixPrj,
          prefixRole: this.$route.params.prefixRole,
        }).then(val => {
          console.log(val.data.res[0][0].result)
          if (val.data.res[0][0].result === 1) {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Supplier Assign successfully',
                icon: 'EditIcon',
                variant: 'success',
              },
            })
          } else {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Supplier Assign Failed Check information',
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
      } */
    },
    sendToWash(row) {
      this.$store.dispatch('drmNGOSup/SEND_WASH', {
        prefix: this.$route.params.prefixPrj,
        prefixRole: this.$route.params.prefixRole,
        item: row.item,
      }).then(val => {
        if (val === 1) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Supplier Assign successfully',
              icon: 'EditIcon',
              variant: 'success',
            },
          })
        } else {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Supplier Assign Failed Check information',
              icon: 'EditIcon',
              variant: 'danger',
            },
          })
        }
      })
    },
    deleteItem(row) {
      console.log(row)

      this.$swal({
        title: 'Case Termination',
        text: `Do you want terminate the case \n(${row.item.p_code})\n\n${row.item.is_name_ar}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ok',
        cancelButtonText: 'Cancel',
        input: 'text',
        buttonsStyling: false,
        inputAttributes: {
          autocapitalize: 'off',

        },
        // eslint-disable-next-line consistent-return
        inputValidator: value => {
          if (!value) {
            return 'You need to write something!'
          }
        },
        showLoaderOnConfirm: true,
        inputLabel: 'Reason',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
      }).then(result => {
        if (result.value) {
          this.$store.dispatch('drmNGOSup/TERM_DATA', {
            prefix: this.$route.params.prefixPrj,
            prefixRole: this.$route.params.prefixRole,
            item: row.item,
            result: result.value,
          }).then(val => {
            if (val === 1) {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Case Terminated successfully',
                  icon: 'EditIcon',
                  variant: 'success',
                },
              })
            } else {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Case Terminated Failed Check information',
                  icon: 'EditIcon',
                  variant: 'danger',
                },
              })
            }
          })
        }
      })
    },

  },

}
</script>

  <style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  .sup {
    min-width: 230px;
  }
  .don {
    min-width: 250px;
  }
  .cycle {
    min-width: 180px;
  }
  .note {
    min-width: 150px;
  }
  .iss {
    min-width: 150px;
  }
  .qty {
    min-width: 100px;
  }

  .action {
    min-width: 100px;
  }
  </style>
