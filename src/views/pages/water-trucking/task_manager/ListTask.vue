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
        <template #cell(note)="data">
          <b-form-input
            :id="'Note ' +( data.index +1)"
            v-model="data.item.note"
            placeholder="Enter Note"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          />
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
        <!-- <template #cell(cycle)="data">
          {{ data.item.cycle.title }}
          <validation-provider
            v-slot="{ errors }"
            rules="required"
            :name="'Cycle ' + (data.index +1)"
          >
            <v-select
              :id="'donor' + data.index"
              v-model="data.item.cycle"
              label="title"
              :clearable="false"

              :append-to-body="true"
              :state="errors.length > 0 ? false : null"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="cycleL"
            />
            <small class="text-danger mb-1">{{
              errors[0]
            }}</small>
          </validation-provider>
        </template>-->
        <template #cell(iss)="row">
          <h4>{{ row.item.is_name }}</h4>
          <p>{{ row.item.p_code }}</p>
        </template>
        <template #cell(delete)="row">
          <div>
            <b-button
              size="sm"
              variant="danger"
              @click="deleteItem(row)"
            >
              <feather-icon
                icon="XIcon"
              />
            </b-button>

          </div>
        </template>

        <template #cell(schedule)="row">
          <div>
            <b-button
              size="sm"
              variant="info"
              @click="urgentItem(row)"
            >
              <feather-icon
                icon="AlertOctagonIcon"
              />
            </b-button>
          </div>
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
    <b-row
      align-h="end"
      class="m-1"
    >
      <b-col
        cols="4"
        md="auto"
      >
        <b-button
          variant="primary"
          block
          @click="AssignToSuppliers"
        >
          <b-icon
            icon="person"
            class="mr-1"
          />
          Assign To Suppliers
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
import moment from 'moment'

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
    show: takeState('truckingTaskmanager', 'show').commit('truckingTaskmanager/SET_SHOW').map(),

    perPage: takeState('truckingTaskmanager', 'perPage').commit('truckingTaskmanager/SET_PER_PAGE').map(),
    pageOptions: takeState('truckingTaskmanager', 'pageOptions').map(),
    currentPage: takeState('truckingTaskmanager', 'currentPage').commit('truckingTaskmanager/SET_CUR_PAGE').map(),
    sortBy: takeState('truckingTaskmanager', 'sortBy').commit('truckingTaskmanager/SET_SORT_BY').map(),
    sortDesc: takeState('truckingTaskmanager', 'sortDesc').commit('truckingTaskmanager/SET_SORT_DESC').map(),
    sortDirection: takeState('truckingTaskmanager', 'sortDirection').commit('truckingTaskmanager/SET_SORT_DIR').map(),
    filter: takeState('truckingTaskmanager', 'filter').commit('truckingTaskmanager/SET_FILTER').map(),
    filterOn: takeState('truckingTaskmanager', 'filterOn').commit('truckingTaskmanager/SET_FILTER_ON').map(),
    showModalUrgent: takeState('truckingTaskmanager', 'showModalUrgent').commit('truckingTaskmanager/SET_MOD_URG').map(),

    supplier: takeState('truckingTaskmanager', 'supplier').commit('truckingTaskmanager/SET_MOD_SUP').map(),
    donor: takeState('truckingTaskmanager', 'donor').commit('truckingTaskmanager/SET_MOD_DON').map(),
    amount: takeState('truckingTaskmanager', 'amount').commit('truckingTaskmanager/SET_MOD_AMNT').map(),
    quantity: takeState('truckingTaskmanager', 'quantity').commit('truckingTaskmanager/SET_MOD_QTY').map(),
    note: takeState('truckingTaskmanager', 'note').commit('truckingTaskmanager/SET_MOD_NOTE').map(),
    selectedUrgentId: takeState('truckingTaskmanager', 'selectedUrgentId').commit('truckingTaskmanager/SET_MOD_ID').map(),

    supL: takeState('truckingTaskmanager', 'listSupplier').map(),
    donL: takeState('truckingTaskmanager', 'listDonors').map(),
    cycleL: takeState('truckingTaskmanager', 'listCycle').map(),
    pdL: takeState('truckingTaskmanager', 'pdList').map(),
    pd: takeState('truckingTaskmanager', 'pd').commit('truckingTaskmanager/SET_MOD_PD').map(),
    cycleType: takeState('truckingTaskmanager', 'cycleType').commit('truckingTaskmanager/SET_MOD_CYCLE_TYPE').map(),

    itemField: takeState('truckingTaskmanager', 'itemField').map(),
    items: takeState('truckingTaskmanager', 'items').map(),
    sortOptions() {
      // Create an options list from our fields
      return this.itemField
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },

    itemTable() {
      /* const gov = this.items.filter(itemgov => (this.governorate == null ? itemgov : itemgov.governorate_id === this.governorate.value))
        const dis = gov.filter(itemdis => (this.district == null ? itemdis : itemdis.district_id === this.district.value))
        const st = dis.filter(itemtype => (this.type == null ? itemtype : itemtype.st_id === this.type.value))
        const cd = st.filter(itemcad => (this.cadaster == null ? itemcad : itemcad.cadastre_id === this.cadaster.value))
        const iss = cd.filter(itemiss => (this.iss == null ? itemiss : itemiss.is_id === this.iss.value)) */
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
    AssignToSuppliers() {
      console.log(this.items)
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          console.log('success')
          this.$store.dispatch('truckingTaskmanager/SEND_DATA', {
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
        }
      })
    },
    deleteItem(row) {
      console.log(row)
      this.$store.commit('truckingTaskmanager/REM_ITEM', row.index)
    },
    urgentItem(row) {
      this.$store
        .dispatch('truckingTaskmanager/GET_SCH_DATA', {
          prefix: this.$route.params.prefixPrj,
          issId: row.item.is_id,
        }).then(val => {
          if (val.status === 1) {
            this.supplier = row.item.supplier
            this.donor = row.item.donor
            this.amount = row.item.amount
            this.quantity = row.item.quantity
            this.pd = row.item.pd
            this.note = row.item.note
            this.cycleType = {
              id: 1,
              name: 'Perdioc',
            }
            this.selectedUrgentId = row.item.is_id
            this.showModalUrgent = {
              active: true,
              schedule: [
                {
                  date: moment(Date.now()).toDate(),
                  amount: val.res[0].total_qouta,
                },
              ],
              row,
              dataOut: {
                members: val.res[0].members,
                tanks: val.res[0].tanks,
                tents: val.res[0].tents,
                cycl_dur: val.res[0].cycl_dur,
                total_qouta: val.res[0].total_qouta,
              },
            }
          } else {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Task Submited Failed',
                icon: 'EditIcon',
                variant: 'dander',
              },
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
    min-width: 200px;
  }
  .qty {
    min-width: 50px;
  }
  .action {
    min-width: 100px;
  }
  </style>
