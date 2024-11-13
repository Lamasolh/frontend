<template>
  <b-card
    ref="CAST"
    title="Case Row"
    no-body
  >
    <b-card-body>
      <b-row align-h="between">
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

      </b-row>
      <b-row align-h="between">
        <b-col
          cols="2"
          class="mt-1"
        >
          <b-button
            block
            variant="info"
            @click="ResetData"
          >
            Refresh

          </b-button>
        </b-col>
        <!--
        <b-col
          cols="2"
          class="mt-1"
        >
          <download-excel
            :data="ExportTable"
            :fields="json_fields"
            worksheet="Sheet1"
            type="xls"
            name="monitoringDRM.xls"
            :meta="json_meta"
          >
            <b-button
              variant="success"
              block
            >
              Export
            </b-button>
          </download-excel>
        </b-col>-->
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
      style="max-height: 500px"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      :selected-variant="
        $store.state.appConfig.layout.skin === 'dark' ? 'active' : 'primary'
      "
      show-empty
      empty-text="No matching records found"
      primary-key="id"
      :filter="filter"
      :filter-included-fields="filterOn"
      @filtered="onFiltered"
      @row-dblclicked="gotToView"
    >
      <template #table-busy>
        <div class="text-center text-primary my-2">
          <b-spinner class="align-middle" />
          <strong>Loading...</strong>
        </div>
      </template>

      <template #cell(action)="data">

        <b-button
          block
          variant="warning"
          @click="gotToView(data.item)"
        >
          View Details

        </b-button>

      </template>
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
  </b-card>
</template>

<script>
/* eslint-disable no-param-reassign */

import { takeState } from 'vuex-dot'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import Ripple from 'vue-ripple-directive'
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'

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
    json_field: takeState('monitoringDRM', 'json_fields').map(),
    indOptions: takeState('monitoringDRM', 'filedOptions').map(),
    json_fields() {
      const vs = this.json_field
      return vs
    },
    //
    show: takeState('monitoringDRM', 'show')
      .commit('monitoringDRM/SET_SHOW')
      .map(),
    // Table Data
    items: takeState('monitoringDRM', 'caseItem')
      .commit('monitoringDRM/SET_ITEM')
      .map(),
    fields: takeState('monitoringDRM', 'caseField')
      .commit('monitoringDRM/SET_FIELD')
      .map(),
    // Table Option
    perPage: takeState('monitoringDRM', 'perPage')
      .commit('monitoringDRM/SET_PER_PAGE')
      .map(),
    pageOptions: takeState('monitoringDRM', 'pageOptions').map(),
    currentPage: takeState('monitoringDRM', 'currentPage')
      .commit('monitoringDRM/SET_CUR_PAGE')
      .map(),
    sortBy: takeState('monitoringDRM', 'sortBy')
      .commit('monitoringDRM/SET_SORT_BY')
      .map(),
    sortDesc: takeState('monitoringDRM', 'sortDesc')
      .commit('monitoringDRM/SET_SORT_DESC')
      .map(),
    sortDirection: takeState('monitoringDRM', 'sortDirection')
      .commit('monitoringDRM/SET_SORT_DIR')
      .map(),
    filter: takeState('monitoringDRM', 'filter')
      .commit('monitoringDRM/SET_FILTER')
      .map(),
    filterOn: takeState('monitoringDRM', 'filterOn')
      .commit('monitoringDRM/SET_FILTER_ON')
      .map(),

    showModalRef: takeState('monitoringDRM', 'showModalRef')
      .commit('monitoringDRM/SET_SHOW_REF')
      .map(),

    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
    itemTable() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.totalRows = this.items.length
      return this.items
    },
    ExportTable() {
      console.log('export')
      const it = JSON.parse(JSON.stringify(this.itemTable))
      return it
    },
  },
  mounted() {
    this.ResetData()
  },
  methods: {
    ResetData() {
      this.$store.dispatch('monitoringDRM/REFRESH', {
        prefix: this.$route.params.prefixPrj,
        prefixRole: this.$route.params.prefixRole,
      })
    },
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
    onFiltered(_, ind) {
      this.totalRows = ind
      this.currentPage = 1
    },
    gotToView(item) {
      console.log(item)
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
          text: `${item.iss_name}`,
        },
      )
      this.$router.replace({
        name: 'drm_monitoring_details',
        params: {
          action: 'read',
          breadcrumb: nav,
          active: true,
          prefix: this.$route.params.prefixPrj,
          prefixRole: this.$route.params.prefixRole,
          title: 'Monitoring Tools View',
          resource: this.$route.params.resource,
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
