<template>
  <b-card
    ref="CAST"
    title="Case Row"
    no-body
  >
    <b-card-body>
      <b-row>
        <b-col cols="4">
          <!-- sorting  -->
          <b-form-group
            label="Sort"
            label-size="sm"
            label-align-sm="left"
            label-cols-sm="2"
            label-for="sortBySelect"
            class="mr-1 mb-md-0 mt-2"
          >
            <b-input-group size="sm">
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
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col cols="2" />
        <b-col cols="4">
          <!-- filter -->
          <b-form-group
            label="Filter"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            label-for="filterInput"
            class="mt-2"
          >
            <b-input-group
              size="sm"
            >
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
        </b-col>
        <b-col cols="1">
          <download-excel
            class="btn btn-default"
            :data="ExportTable"
            :fields="json_fields"
            worksheet="Sheet1"
            type="xls"
            name="Monitoring.xls"
            :meta="json_meta"
          >
            <b-button
              variant="success"
              block
              style=" margin-top: 5px;"
            >
              Export
            </b-button>
          </download-excel>
        </b-col>
      </b-row>
    </b-card-body>

    <b-table
      ref="selectableTable"
      hover
      :busy="show"
      responsive
      bordered
      :per-page="perPage"
      :current-page="currentPage"
      :items="itemTable"
      :fields="fields"
      sticky-header
      style="max-height: 500px;"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      :selected-variant="$store.state.appConfig.layout.skin === 'dark'? 'active': 'primary'"
      show-empty
      empty-text="No matching records found"
      primary-key="id"
      :filter="filter"
      :filter-included-fields="filterOn"
      @filtered="onFiltered"
      @row-dblclicked="gotToView"
    >
      <!--  -->
      <template #table-busy>
        <div class="text-center text-primary my-2">
          <b-spinner class="align-middle" />
          <strong>Loading...</strong>
        </div>
      </template>

      <template #cell(approved)="data">
        {{ data.value =='1'?'Yes':'No' }}
      </template>

      <template #cell(published)="data">
        {{ data.value =='1'?'Yes':'No' }}
      </template>

      <template #cell(downloaded)="data">
        {{ data.value =='1'?'Yes':'No' }}
      </template>

      <template #cell(cycle_deadline_day)="data">
        {{ getDay(data.item.cycle_deadline) }}
      </template>
      <template #cell(cycle_type)="data">

        <b-badge
          pill
          :variant="
            $store.getters['monitoringwtr/CycleTypeOptions'].filter(
              (it) => it.value === data.value
            )[0].variant
          "
        >
          {{
            $store.getters['monitoringwtr/CycleTypeOptions'].filter(
              (it) => it.value === data.value
            )[0].title
          }}
        </b-badge>

      </template>
      <template #cell(monitoring_status)="data">
        <b-badge
          pill
          :variant="
            $store.getters['monitoringwtr/MonitoringStatusOptions'].filter(
              (it) => it.value === data.value
            )[0].variant
          "
        >
          {{
            $store.getters['monitoringwtr/MonitoringStatusOptions'].filter(
              (it) => it.value === data.value
            )[0].title
          }}
        </b-badge>

      </template>
      <template #cell(cycle_status)="data">
        <b-badge
          pill
          :variant="
            $store.getters['monitoringwtr/CaseStatusOptions'].filter(
              (it) => it.value === data.value
            )[0].variant
          "
        >
          {{
            $store.getters['monitoringwtr/CaseStatusOptions'].filter(
              (it) => it.value === data.value
            )[0].title
          }}
        </b-badge>

      </template>
    </b-table>
    <div>
      <span class="text-muted ml-2 mr-4">
        Total Cases: {{ totalRows }}
      </span>
    </div>
    <b-row
      class="m-1"
      align-h="between"
    >
      <b-col cols="3">
        <!-- page length -->
        <b-form-group
          label="Per Page"
          label-cols="8"
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
  </b-card>
</template>

<script>
/* eslint-disable no-param-reassign */

import { takeState } from 'vuex-dot'
import moment from 'moment'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,

  },
  directives: {
    Ripple,
  },
  data() {
    return {
      totalRows: null,
      json_meta: [
        [
          {
            key: 'charset',
            value: 'utf-8',
          },
        ],
      ],
      menuData: [],

    }
  },
  computed: {

    ///
    deliveryOptions: takeState('global', 'delivery_status').map(),
    json_fields: takeState('monitoringwtr', 'json_fields').map(),
    header() {
      return moment().toString
    },
    ///
    priority: takeState('global', 'priority').map(),
    referral: takeState('monitoringwtr', 'referral').commit('monitoringwtr/SET_REF').map(),
    governorate: takeState('monitoringwtr', 'governorate').commit('monitoringwtr/SET_GOV').map(),
    district: takeState('monitoringwtr', 'district').commit('monitoringwtr/SET_DIS').map(),
    cadaster: takeState('monitoringwtr', 'cadaster').commit('monitoringwtr/SET_CAD').map(),
    type: takeState('monitoringwtr', 'type').commit('monitoringwtr/SET_TYPE').map(),
    iss: takeState('monitoringwtr', 'iss').commit('monitoringwtr/SET_ISS').map(),
    rangeDate: takeState('monitoringwtr', 'rangedate').commit('monitoringwtr/SET_RANG_DAT').map(),
    show: takeState('monitoringwtr', 'show').commit('monitoringwtr/SET_SHOW').map(),
    dlv_status: takeState('monitoringwtr', 'dlv_status').commit('monitoringwtr/SET_DLV_STATUS').map(),
    case_status: takeState('monitoringwtr', 'case_status').commit('monitoringwtr/SET_CASE_STATUS').map(),
    // Table Data
    items: takeState('monitoringwtr', 'caseItem').commit('monitoringwtr/SET_ITEM').map(),
    fields: takeState('monitoringwtr', 'caseField').commit('monitoringwtr/SET_FIELD').map(),
    // Table Option
    perPage: takeState('monitoringwtr', 'perPage').commit('monitoringwtr/SET_PER_PAGE').map(),
    pageOptions: takeState('monitoringwtr', 'pageOptions').map(),
    currentPage: takeState('monitoringwtr', 'currentPage').commit('monitoringwtr/SET_CUR_PAGE').map(),
    sortBy: takeState('monitoringwtr', 'sortBy').commit('monitoringwtr/SET_SORT_BY').map(),
    sortDesc: takeState('monitoringwtr', 'sortDesc').commit('monitoringwtr/SET_SORT_DESC').map(),
    sortDirection: takeState('monitoringwtr', 'sortDirection').commit('monitoringwtr/SET_SORT_DIR').map(),
    filter: takeState('monitoringwtr', 'filter').commit('monitoringwtr/SET_FILTER').map(),
    filterOn: takeState('monitoringwtr', 'filterOn').commit('monitoringwtr/SET_FILTER_ON').map(),

    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
    itemTable() {
      const rf = this.items.filter(item => (this.referral == null ? item : item.referral_id === this.referral.value))
      const frm = moment(this.rangeDate == null ? null : this.rangeDate.split('to')[0])
      const to = moment(this.rangeDate == null ? null : this.rangeDate.split('to')[1])
      const rg = rf.filter(item => {
        if (!frm.isValid() || !to.isValid()) { return true }
        return moment(item.created_date).isBetween(frm.add(-2, 'days'), to.add(2, 'days'))
      })
      console.log(this.governorate, this.items)
      const gov = rg.filter(itemgov => (this.governorate == null ? itemgov : itemgov.governorate_id === this.governorate.value))
      const dis = gov.filter(itemdis => (this.district == null ? itemdis : itemdis.district_id === this.district.value))
      const st = dis.filter(itemtype => (this.type == null ? itemtype : itemtype.satl_type === this.type.value))
      const cd = st.filter(itemcad => (this.cadaster == null ? itemcad : itemcad.cad_id === this.cadaster.value))
      const iss = cd.filter(itemiss => (this.iss == null ? itemiss : itemiss.iss_id === this.iss.value))

      const dlv = iss.filter(itemdlv => (this.case_status == null ? itemdlv : itemdlv.status_info === this.case_status.title))
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.totalRows = dlv.length
      return dlv
    },
    ExportTable() {
      const it = JSON.parse(JSON.stringify(this.itemTable))
      it.forEach(el => {
        const st = el.active === 1 ? 'Active' : 'Not Active'
        const st1 = el.awareness_status === 1 ? 'Awarened' : 'Not Awarened'
        const st2 = el.monitoring_done === 1 ? 'Done' : 'None'
        const st3 = el.com_user_name === null ? 'None' : el.com_user_name
        const st4 = el.com_user_org === null ? 'None' : el.com_user_org
        const st5 = el.dlvry_user_name === null ? 'None' : el.dlvry_user_name
        const st6 = el.dlvry_user_org === null ? 'None' : el.dlvry_user_org
        const st7 = el.case_feedback === null ? 'None' : el.case_feedback
        const st8 = el.reason_comments === '' || el.reason_comments === null ? 'None' : el.reason_comments
        const st9 = el.dlvry_comments === '' || el.dlvry_comments === null ? 'None' : el.dlvry_comments

        el.active = st
        el.awareness_status = st1
        el.monitoring_done = st2
        el.com_user_name = st3
        el.com_user_org = st4
        el.dlvry_user_name = st5
        el.dlvry_user_org = st6
        el.case_feedback = st7
        el.reason_comments = st8
        el.dlvry_comments = st9
      })
      return it
    },
  },
  mounted() {
    this.perPage = 10
    // Set the initial number of items
    this.totalRows = this.itemTable.length
    // this.items = []
  },
  methods: {
    getDay(date) {
      console.log(date)
      const differenceInTime = Date.now() - Date.parse(date)

      // To calculate the no. of days between two dates
      const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24))
      return differenceInDays
    },
    onCheck() {
      console.log(this.$route)
    },
    onFiltered(_, ind) {
      this.totalRows = ind
      this.currentPage = 1
    },
    gotToView(item) {
      const nav = []
      nav.push(
        {
          active: false,
          text: this.$route.params.breadcrumb[0].text,
        },
        {
          active: false,
          text: this.$route.params.title,
        },
        {
          active: true,
          text: `${item.p_code}-${item.cadastre_name} `,
        },
      )
      this.$router.replace({
        name: 'projectEdit',
        params: {
          action: 'read',
          breadcrumb: nav,
          active: true,
          prefix: this.$route.params.prefixPrj,
          prefixRole: this.$route.params.prefixRole,
          view: true,
          wtr: true,
          title: 'Monitoring',
          resource: 'MNTR',
          value: item,
        },
      })
    },
  },
}
</script>

<style  lang="scss">
@import '@core/scss/vue/libs/vue-context.scss';
.code_column{
  min-width: 200px;
}
.current_status{
  min-width: 300px;
}
</style>
