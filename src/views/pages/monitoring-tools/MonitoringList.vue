<template>
  <b-card
    ref="CAST"
    title="Case Row"
    no-body
  >
    <!-- context -->
    <vue-context ref="menu">
      <li>
        <b-link
          v-for="data in menuData"
          :key="data.text"
          class="d-flex align-items-center"
          @click="
            optionClicked(
              data.text,
              data.icon,
              data.item,
              data.variant,
              data.type
            )
          "
        >
          <feather-icon
            :icon="data.icon"
            size="16"
          />
          <span class="ml-75">{{ data.text }}</span>
        </b-link>
      </li>
    </vue-context>
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
              <!-- Refresh
            <b-button
              variant="primary"
              size="sm"
              class="ml-2"
              @click="$parent.$parent.ResetData()"
            >
              <b-icon icon="arrow-repeat" />
            </b-button>-->
            </b-input-group>
          </b-form-group>
        </b-col>
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
        </b-col>
        <b-col
          cols="2"
          class="mt-1"
        >
          <b-button
            block
            disabled
            variant="info"
            @click="Export"
          >
            Export Indicators
          </b-button>
        </b-col>
        <b-col
          cols="2"
          class="mt-1"
        >
          <download-excel
            :data="ExportTable"
            :fields="json_fields"
            worksheet="Sheet1"
            type="xls"
            name="monitoringTools.xls"
            :meta="json_meta"
          >
            <b-button
              variant="success"
              block
            >
              Export
            </b-button>
          </download-excel>
        </b-col>
      </b-row>
    </b-card-body>
    <end-case v-if="showEnd" />
    <EndCaseADV v-if="showEndADV" />
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
      style="max-height: 500px"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      :selected-variant="
        $store.state.appConfig.layout.skin === 'dark' ? 'active' : 'primary'
      "
      show-empty
      selectable
      empty-text="No matching records found"
      primary-key="id"
      :filter="filter"
      :filter-included-fields="filterOn"
      @filtered="onFiltered"
      @row-contextmenu="RightClick"
      @row-selected="onSelect"
      @row-dblclicked="gotToView"
    >
      <template #table-busy>
        <div class="text-center text-primary my-2">
          <b-spinner class="align-middle" />
          <strong>Loading...</strong>
        </div>
      </template>
      <template #cell(delivery_status)="data">
        <b-badge
          pill
          :variant="
            $store.getters['global/delivery_status'].filter(
              (it) => it.value === data.value
            )[0].variant
          "
        >
          {{
            $store.getters['global/delivery_status'].filter(
              (it) => it.value === data.value
            )[0].title
          }}
        </b-badge>
      </template>
      <template #cell(priority_level)="data">
        <b-badge
          pill
          :variant="data.item.variant"
        >
          {{ data.item.priority }}
        </b-badge>
      </template>
      <template #cell(case_phone)="data">
        <p>+{{ data.value }}</p>
      </template>
      <template #cell(active)="data">
        <b-badge
          pill
          :variant="data.value === 1 ? 'success' : 'danger'"
        >
          {{ data.value === 1 ? 'Active' : 'Not Active' }}
        </b-badge>
      </template>
      <template #cell(case_status)="data">
        <b-badge
          pill
          :variant="
            $store.getters['monitoringTools/CaseStatusOptions'].filter(
              (it) => it.title === data.value
            )[0].variant
          "
        >
          {{ data.value }}
        </b-badge>
      </template>
      <template #cell(awareness_status)="data">
        <b-badge
          pill
          :variant="
            data.value === 0 ? 'danger' : data.value === 2 ? 'success' : 'info'
          "
        >
          {{
            data.value === 0
              ? 'Not Awarened'
              : data.value === 2
                ? 'Awarened'
                : 'Pending'
          }}
        </b-badge>
      </template>
      <template #cell(monitoring_done)="data">
        <b-badge
          pill
          :variant="data.value === 1 ? 'success' : 'danger'"
        >
          {{ data.value === 1 ? 'Done' : 'None' }}
        </b-badge>
      </template>
      <template #cell(show_details)="row">
        <b-button
          size="sm"
          class="mr-2"
          variant="primary"
          @click="row.toggleDetails"
        >
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
        </b-button>
      </template>
      <template #cell(delivery_date)="data">
        <p>
          {{ data.value == null || data.value === '' ? 'None' : data.value }}
        </p>
      </template>
      <template #cell(com_user_name)="data">
        <p>
          {{ data.value == null || data.value === '' ? 'None' : data.value }}
        </p>
      </template>
      <template #cell(case_feedback)="data">
        <p>
          {{ data.value == null || data.value === '' ? 'None' : data.value }}
        </p>
      </template>
      <template #cell(com_user_org)="data">
        <p>
          {{ data.value == null || data.value === '' ? 'None' : data.value }}
        </p>
      </template>
      <template #cell(dlvry_user_name)="data">
        <p>
          {{ data.value == null || data.value === '' ? 'None' : data.value }}
        </p>
      </template>
      <template #cell(reason_comments)="data">
        <p>
          {{ data.value == null || data.value === '' ? 'None' : data.value }}
        </p>
      </template>
      <template #cell(dlvry_user_org)="data">
        <p>
          {{ data.value == null || data.value === '' ? 'None' : data.value }}
        </p>
      </template>
      <template #cell(delivery_latitiude)="data">
        <p>
          {{ data.value == null || data.value === '' ? 'None' : data.value }}
        </p>
      </template>
      <template #cell(delivery_longtitude)="data">
        <p>
          {{ data.value == null || data.value === '' ? 'None' : data.value }}
        </p>
      </template>
      <template #cell(dlvry_comments)="data">
        <p>
          {{ data.value == null || data.value === '' ? 'None' : data.value }}
        </p>
      </template>
      <template #cell(ditrib_kits)="data">
        <p>
          {{ data.value == null || data.value === '' ? 'None' : data.value }}
        </p>
      </template>
      <template #row-details="row">
        <b-card>
          <b-row align-h="end">
            <b-col
              cols="2"
              class="text-sm-right"
            >
              <b>Indicators:</b>
            </b-col>
            <b-col cols="2">
              <p
                v-for="item in JSON.parse(row.item.extra_fields)"
                v-show="item.value != null"
                :key="item.id"
              >
                {{ item.name }}:
                {{
                  item.type === 4
                    ? item.value == null
                      ? ''
                      : JSON.parse(item.value).title
                    : item.value
                }}
              </p>
            </b-col>
          </b-row>
          <b-row align-h="end">
            <b-col
              cols="2"
              class="text-sm-right"
            >
              <b>Current Full Info:</b>
            </b-col>
            <b-col cols="2">
              <p style="white-space: pre">
                {{ row.item.case_full_info }}
              </p>
            </b-col>
          </b-row>
        </b-card>
      </template>
      <!-- Column: Actions
      <template #cell(actions)="data">
        <b-dropdown
          variant="link"
          no-caret
          :right="$store.state.appConfig.isRTL"
        >

          <template #button-content>
            <feather-icon
              icon="MoreVerticalIcon"
              size="16"
              class="align-middle text-body"
            />
          </template>
          <b-dropdown-item @click="EditCase(data.item)">
            <feather-icon icon="EditIcon" />
            <span class="align-middle ml-50">Edit Basic Info</span>
          </b-dropdown-item>
          <b-dropdown-item @click="BeforeDeliver(data.item)">
            <feather-icon icon="ArrowLeftCircleIcon" />
            <span class="align-middle ml-50">To Geosplit</span>
          </b-dropdown-item>
        </b-dropdown>
      </template> -->
    </b-table>
    <div>
      <span class="text-muted ml-2 mr-4"> Total Cases: {{ totalRows }} </span>
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
        style="margin-top: 16px"
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
    <b-row class="m-2">
      <b-col cols="3">
        <b-button
          variant="danger"
          block
          :disabled="deleteItem.length <= 0"
          @click="EndCase"
        >
          <feather-icon icon="XIcon" />
          End Case
        </b-button>
      </b-col>
    </b-row>
    <MonitoringModalRefer />
  </b-card>
</template>

<script>
/* eslint-disable no-param-reassign */

import { takeState } from 'vuex-dot'
import moment from 'moment'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import VueContext from 'vue-context'
import Ripple from 'vue-ripple-directive'
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import EndCase from './EndCase.vue'
import EndCaseADV from './EndCaseADV.vue'
import MonitoringModalRefer from './MonitoringModalRefer.vue'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
    VueContext,
    EndCase,
    EndCaseADV,
    MonitoringModalRefer,
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
    json_field: takeState('monitoringTools', 'json_fields').map(),
    indOptions: takeState('monitoringTools', 'filedOptions').map(),

    json_fields() {
      const vs = this.json_field
      this.indOptions.forEach(el => {
        vs[el.name] = el.name
        // vs[]=el
      })
      return vs
    },
    header() {
      return moment().toString
    },
    ///
    deleteItem: takeState('monitoringTools', 'deleteItem')
      .commit('monitoringTools/SET_DELETE_ITEM')
      .map(),
    //
    priority: takeState('global', 'priority').map(),
    referral: takeState('monitoringTools', 'referral')
      .commit('monitoringTools/SET_REF')
      .map(),
    governorate: takeState('monitoringTools', 'governorate')
      .commit('monitoringTools/SET_GOV')
      .map(),
    district: takeState('monitoringTools', 'district')
      .commit('monitoringTools/SET_DIS')
      .map(),
    cadaster: takeState('monitoringTools', 'cadaster')
      .commit('monitoringTools/SET_CAD')
      .map(),
    type: takeState('monitoringTools', 'type')
      .commit('monitoringTools/SET_TYPE')
      .map(),
    iss: takeState('monitoringTools', 'iss')
      .commit('monitoringTools/SET_ISS')
      .map(),
    rangeDate: takeState('monitoringTools', 'rangedate')
      .commit('monitoringTools/SET_RANG_DAT')
      .map(),
    show: takeState('monitoringTools', 'show')
      .commit('monitoringTools/SET_SHOW')
      .map(),
    dlv_status: takeState('monitoringTools', 'dlv_status')
      .commit('monitoringTools/SET_DLV_STATUS')
      .map(),
    case_status: takeState('monitoringTools', 'case_status')
      .commit('monitoringTools/SET_CASE_STATUS')
      .map(),
    awareness: takeState('monitoringTools', 'awareness')
      .commit('monitoringTools/SET_AWRN')
      .map(),
    monitoringTools: takeState('monitoringTools', 'monitoring')
      .commit('monitoringTools/SET_MONI')
      .map(),
    feedback: takeState('monitoringTools', 'feedback')
      .commit('monitoringTools/SET_FEED')
      .map(),
    // Table Data
    items: takeState('monitoringTools', 'caseItem')
      .commit('monitoringTools/SET_ITEM')
      .map(),
    fields: takeState('monitoringTools', 'caseField')
      .commit('monitoringTools/SET_FIELD')
      .map(),
    organization: takeState('monitoringTools', 'organization')
      .commit('monitoringTools/SET_ORG')
      .map(),
    // Table Option
    perPage: takeState('monitoringTools', 'perPage')
      .commit('monitoringTools/SET_PER_PAGE')
      .map(),
    pageOptions: takeState('monitoringTools', 'pageOptions').map(),
    currentPage: takeState('monitoringTools', 'currentPage')
      .commit('monitoringTools/SET_CUR_PAGE')
      .map(),
    sortBy: takeState('monitoringTools', 'sortBy')
      .commit('monitoringTools/SET_SORT_BY')
      .map(),
    sortDesc: takeState('monitoringTools', 'sortDesc')
      .commit('monitoringTools/SET_SORT_DESC')
      .map(),
    sortDirection: takeState('monitoringTools', 'sortDirection')
      .commit('monitoringTools/SET_SORT_DIR')
      .map(),
    filter: takeState('monitoringTools', 'filter')
      .commit('monitoringTools/SET_FILTER')
      .map(),
    filterOn: takeState('monitoringTools', 'filterOn')
      .commit('monitoringTools/SET_FILTER_ON')
      .map(),
    showEnd: takeState('monitoringTools', 'showEnd')
      .commit('monitoringTools/SET_SHOW_END')
      .map(),
    showEndADV: takeState('monitoringTools', 'showEndADV')
      .commit('monitoringTools/SET_SHOW_END_ADV')
      .map(),
    endItem: takeState('monitoringTools', 'endItem')
      .commit('monitoringTools/SET_END_ITEM')
      .map(),
    showModalRef: takeState('monitoringTools', 'showModalRef')
      .commit('monitoringTools/SET_SHOW_REF')
      .map(),

    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
    itemTable() {
      const rf = this.items.filter(item => (this.referral == null ? item : item.referral_id === this.referral.value))
      /* const frm = moment(this.rangeDate == null ? null : this.rangeDate.split('to')[0])
      const to = moment(this.rangeDate == null ? null : this.rangeDate.split('to')[1])
      const rg = rf.filter(item => {
        if (!frm.isValid() || !to.isValid()) { return true }
        return moment(item.created_date).isBetween(frm.add(-1, 'days'), to.add(1, 'days'))
      }) */
      const gov = rf.filter(itemgov => (this.governorate == null
        ? itemgov
        : itemgov.governorate_id === this.governorate.value))
      const dis = gov.filter(itemdis => (this.district == null
        ? itemdis
        : itemdis.district_id === this.district.value))
      const st = dis.filter(itemtype => (this.type == null ? itemtype : itemtype.satl_type === this.type.value))
      const cd = st.filter(itemcad => (this.cadaster == null
        ? itemcad
        : itemcad.cadastre_id === this.cadaster.value))
      const iss = cd.filter(itemiss => (this.iss == null ? itemiss : itemiss.is_id === this.iss.value))

      const dlv = iss.filter(itemdlv => (this.case_status == null
        ? itemdlv
        : itemdlv.case_status === this.case_status.title))
      const feed = dlv.filter(itemfeek => (this.feedback == null
        ? itemfeek
        : itemfeek.case_feedback === this.feedback.title))

      const awrs = feed.filter(itemawrs => (this.awareness == null
        ? itemawrs
        : itemawrs.awareness_status === this.awareness.value))
      const mnt = awrs.filter(itemmnt => (this.monitoringTools == null
        ? itemmnt
        : itemmnt.monitoring_done === this.monitoringTools.value))
      const org = mnt.filter(itemmnt => (this.organization == null
        ? itemmnt
        : itemmnt.org_id === this.organization.value))

      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.totalRows = org.length
      return org
    },
    ExportTable() {
      console.log('export')
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
        const st8 = el.reason_comments === '' ? 'None' : el.reason_comments
        const st9 = el.dlvry_comments === null ? 'None' : el.dlvry_comments

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
        JSON.parse(el.extra_fields).forEach(ll => {
          if (ll.type === 4) {
            el[ll.name] = ll.value == null ? null : JSON.parse(ll.value).title
          } else {
            el[ll.name] = ll.value == null ? null : JSON.parse(ll.value)
          }
        })
        /* this.indOptions.forEach((ll) => {
          const s = JSON.parse(el.extra_fields).filter((e) => e.id === ll.id)

          // eslint-disable-next-line prefer-destructuring
          if (s[0] != null) {
            if (ll.type === 4) {
              el[ll.name] =
                s[0].value == null ? null : JSON.parse(s[0].value).title
            } else {
              el[ll.name] = s[0].value == null ? null : JSON.parse(s[0].value)
            }
          }
        }) */
      })

      console.log(it)
      return it
    },
  },
  mounted() {
    this.perPage = 10
    // Set the initial number of items
    this.totalRows = this.itemTable.length
    this.items = []
  },
  methods: {
    async Export() {
      const workbook = new ExcelJS.Workbook()
      workbook.creator = 'RDMS'
      workbook.lastModifiedBy = 'RDMS'
      workbook.created = new Date()
      workbook.modified = new Date()
      const data = workbook.addWorksheet('Data')
      const columns = [
        { name: 'CaseCode', key: 'case_code', width: 20 },
        { name: 'Organization', key: 'org', width: 20 },
        { name: 'Name', key: 'full_name', width: 20 },
      ]
      this.indicators
        .filter(el => el.isInd === 'true')
        .forEach(el => {
          columns.push({ name: el.name, key: el.name })
        })

      const rows = []
      this.items.forEach(item => {
        const row = []
        columns.forEach((column, index) => {
          row[index] = item[column.key] == null ? null : item[column.key]
        })
        rows.push(row)
      })
      console.log(rows)
      data.addTable({
        name: 'Table1',
        ref: 'A1',
        headerRow: true,
        totalsRow: false,
        style: {
          theme: 'TableStyleMedium23',
          showRowStripes: true,
          showColumnStripes: true,
        },
        columns,
        rows,
      })

      console.log('sseees')
      const dt = new Date()
      await workbook.xlsx
        .writeBuffer()
        .then(buffer => saveAs(
          new Blob([buffer]),
          `${dt.toLocaleDateString()}_Indicators.xlsx`,
        ))
        .catch(err => console.log('Error writing excel export', err))
    },
    optionClicked(text, icon, item, variant, type) {
      const rg = this.rangeDate
      if (type === 0) {
        this.endItem = item
        this.showEnd = true
      }
      if (type === 2) {
        this.showModalRef = {
          active: true,
          caseCode: item.case_code,
          caseId: item.case_id,
          caseName: item.full_name,
          orgId: item.org_id,
        }
      } else {
        this.$swal({
          title: 'Revive Case',
          text: `Are you sure you want to revive This case (${item.case_code}:${item.full_name})`,
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'Yes!',
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ml-1',
          },
          buttonsStyling: false,
        }).then(result => {
          if (result.value) {
            this.show1 = false
            this.$store
              .dispatch('monitoringTools/ReviveCase', {
                prefix: this.$route.params.prefixPrj,
                prefixRole: this.$route.params.prefixRole,
                items: item,
                startDate: rg.split('to')[0],
                endDate:
                  rg.split('to')[1] == null
                    ? rg.split('to')[0]
                    : rg.split('to')[1],
                ph: this.phoneissue,
              })
              .then(res => {
                if (res[0].result === 1) {
                  this.showEnd = false
                  this.$swal({
                    icon: 'success',
                    title: 'Done!',
                    text: 'The case hase been terminated!',
                    customClass: {
                      confirmButton: 'btn btn-success',
                    },
                  })
                } else {
                  this.$swal({
                    icon: 'danger',
                    title: 'Failed!',
                    text: 'Contact System administrator!',
                    customClass: {
                      confirmButton: 'btn btn-success',
                    },
                  })
                }
              })
              .catch(error => {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Operation Failed',
                    icon: 'EditIcon',
                    text: error.toString,
                    variant: 'danger',
                  },
                })
              })
          }
        })
      }
    },
    RightClick(item, index, event) {
      console.log(item, index, event)
      console.log(item.case_status)
      const str = item.case_status.toString()
      console.log(str)
      switch (str) {
        case 'Not Deliverd':
        case 'Terminated':
          this.menuData = [
            {
              icon: 'TrendingUpIcon',
              text: `Revive (${item.case_code})`,
              variant: 'primary',
              item,
              type: 1,
            },
          ]
          event.preventDefault()
          this.$refs.menu.open(event, { index, item })
          break
        case 'New Enrty':
        case 'New Link':
        case 'Assessment':
        case 'Link Assessment':
          this.menuData = [
            {
              icon: 'XIcon',
              text: `End Case (${item.case_code})`,
              variant: 'danger',
              item,
              type: 0,
            },
            {
              icon: 'ArrowUpRightIcon',
              text: `Change Org (${item.case_code})`,
              variant: 'info',
              item,
              type: 2,
            },
          ]
          event.preventDefault()
          this.$refs.menu.open(event, { index, item })
          break
        case 'Task Manager':
          this.menuData = [
            {
              icon: 'XIcon',
              text: `End Case (${item.case_code})`,
              variant: 'danger',
              item,
              type: 0,
            },
          ]
          event.preventDefault()
          this.$refs.menu.open(event, { index, item })
          break
        case 'Uknown':
          this.menuData = [
            {
              icon: 'TrendingUpIcon',
              text: `Revive (${item.case_code})`,
              variant: 'primary',
              item,
              type: 1,
            },
            {
              icon: 'XIcon',
              text: `End Case (${item.case_code})`,
              variant: 'danger',
              item,
              type: 0,
            },
          ]
          event.preventDefault()
          this.$refs.menu.open(event, { index, item })
          break
        default:
          this.menuData = []
          event.preventDefault()
      }
    },
    onFiltered(_, ind) {
      this.totalRows = ind
      this.currentPage = 1
    },
    /* EditCase(item) {
      console.log(item)
    }, */
    BeforeDeliver(item) {
      console.log(item)
    },
    onSelect(rows) {
      console.log(rows)
      this.deleteItem = rows
    },
    EndCase() {
      if (this.deleteItem.length > 0) {
        this.showEndADV = true
      } else {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Atteniom',
            icon: 'EditIcon',
            text: 'Missing Data',
            variant: 'warning',
          },
        })
      }
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
          text: `${item.full_name}`,
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
          title: 'Monitoring Tools View',
          resource: 'SMNTRT',
          view: true,
          value: item,
        },
      })
    },
  },
}
</script>

<style  lang="scss">
@import '@core/scss/vue/libs/vue-context.scss';
.code_column {
  min-width: 200px;
}
.current_status {
  min-width: 300px;
}
</style>
