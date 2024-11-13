<template>
  <b-card>
    <b-card-body>
      <b-row>
        Inventory Reports
      </b-row>
      <validation-observer
        ref="ModalRequestRules"
        tag="form"
      >
        <b-row>
          <b-col>
            <validation-provider
              v-slot="{ errors }"
              name="Range"
              rules="required"
            >
              <h5>Select Date Range</h5>
              <flat-pickr
                v-model="range_rep_case"
                class="form-control"
                :config="{ mode: 'range'}"
                :state="errors.length > 0 ? false : null"
              />
              <small class="text-danger">{{ errors[0] }}</small>

            </validation-provider>
          </b-col>
          <b-col>
            <validation-provider
              v-slot="{ errors }"
              name="My Warehouse"
              rules="required"
            >
              <label>Warehouse</label>
              <v-select
                v-model="selectWarehouseRep"
                placeholder="Select a Warehouse."
                label="wh_name"
                :options="listt"
                :state="errors.length > 0 ? false : null"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-col>

          <b-col>
            <validation-provider
              v-slot="{ errors }"
              name="Items"
              rules="required"
            >
              <label>Items</label>
              <v-select
                v-model="selectItemRep"
                placeholder="Select a Items"
                label="title"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="project_items"
                :state="errors.length > 0 ? false : null"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-col>
        </b-row>
        <br>
        <b-row align-h="between">
          <!-- buttons -->
          <b-col cols="4">
            <b-button
              variant="primary"
              block
              @click="GetCaseRep"
            >
              Get Report
            </b-button>
          </b-col>
          <!--/ Export -->
          <!-- Export -->
          <b-col
            cols="4"
            style="margin-right:3px"
          >
            <b-dropdown
              left
              variant="info"
              text="Export"
              block
            >
              <template #button-content>
                <feather-icon
                  icon="FilePlusIcon"
                  class="mr-1"
                />
                <span>Export</span>
              </template>
              <b-dropdown-item>
                <download-excel
                  :data="ExportTable"
                  :fields="caseExportField"
                  worksheet="Sheet1"
                  type="xls"
                  name="Report Inventory.xls"
                  :meta="json_meta"
                >
                  Excel
                </download-excel>
              </b-dropdown-item>
            </b-dropdown>
          </b-col>
          <!--/ buttons -->
        </b-row>
        <br>
        <b-row>
          <p>Total:{{ caseItem.length }}</p>
          <b-table
            ref="selectableTable"
            striped
            hover
            responsive
            small
            bordered
            :items="caseItem"
            :fields="caseField"
            show-empty
            empty-text="No matching records found"
          >
            <!-- A custom formatted data column cell -->
            <template #cell(name)="data">
              {{ data.value.first }} {{ data.value.last }}
            </template>

            <!-- A custom formatted header cell for field 'name' -->
            <template #head(name)="data">
              <span class="text-info">{{ data.label.toUpperCase() }}</span>
            </template>

            <!-- A custom formatted footer cell for field 'name' -->
            <template #foot(name)="data">
              <span class="text-danger">{{ data.label }}</span>
            </template>

            <!-- Default fall-back custom formatted footer cell -->
            <template #foot()="data">
              <i>{{ data.label }}</i>
            </template>
            <template #cell(delivery_date)="data">
              <p>{{ data.value ==null || data.value ==='' ?'None': data.value }}</p>
            </template>
            <template #cell(reason_for_not_deilvered)="data">
              <p>{{ data.value ==null || data.value ==='' ?'None': data.value }}</p>
            </template>
            <template #cell(com_status)="data">
              <p>{{ data.value ==null || data.value ==='' ?'None': data.value }}</p>
            </template>
          </b-table>
        </b-row>
      </validation-observer>
    </b-card-body>

  </b-card>
</template>

<script>
/* eslint-disable no-param-reassign */
import Ripple from 'vue-ripple-directive'
import flatPickr from 'vue-flatpickr-component'
import { takeState } from 'vuex-dot'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import vSelect from 'vue-select'

export default {
  components: {
    flatPickr,
    ValidationObserver,
    ValidationProvider,
    vSelect,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      json_meta: [
        [
          {
            key: 'charset',
            value: 'utf-8',
          },
        ],
      ],
      listItems: [],
    }
  },
  computed: {
    show: takeState('inventory', 'show').commit('inventory/SET_SHOW').map(),
    range_rep_case: takeState('inventory', 'range_rep_case').commit('inventory/SET_RNG_CASE').map(),

    selectItemRep: takeState('inventory', 'selectItemRep').commit('inventory/SET_ITEM_REP').map(),
    selectWarehouseRep: takeState('inventory', 'selectWarehouseRep').commit('inventory/SET_WAR_REP').map(),

    caseField: takeState('inventory', 'caseField').map(),
    caseItem: takeState('inventory', 'caseItem').map(),
    caseExportField: takeState('inventory', 'caseExportField').map(),
    items: takeState('inventory', 'itemWar').commit('inventory/SET_ITEM_WAR').map(),
    project_items: takeState('inventory', 'project_items').map(),

    listt() {
      console.log(this.items.filter(el => el.wh_keeper_userid == null))
      return this.items
    },
    ExportTable() {
      console.log(this.caseItem)
      console.log(JSON.stringify(this.caseItem))
      const it = JSON.parse(JSON.stringify(this.caseItem))
      it.forEach(el => {
        console.log(el)
        const st = el.delivery_date === null ? 'None' : el.delivery_date
        const st1 = el.reason_for_not_deilvered === null ? 'None' : el.reason_for_not_deilvered
        el.delivery_date = st
        el.reason_for_not_deilvered = st1
      })
      return it
    },
  },
  methods: {
    GetCaseRep() {
      console.log('hi')
      this.$refs.ModalRequestRules.validate().then(success => {
        if (success) {
          this.$store.dispatch('inventory/GET_REPORT_CASE', {
            prefix: this.$route.params.prefixPrj,
            type: this.$route.params.assmnttype,
          }).then(val => {
            console.log(val)
          })
        } else {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Warning',
              icon: 'EditIcon',
              text: 'Please Select Range',
              variant: 'warning',
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
@import '@core/scss/vue/libs/vue-flatpicker.scss';
.smallWidth{
  min-width: 100px;
}
.mediumWidth{
  min-width: 200px;
}
.largeWidth{
  min-width: 300px;
}
.xLargeWidth{
  min-width: 400px;
}
</style>
