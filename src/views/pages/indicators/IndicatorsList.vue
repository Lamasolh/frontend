<template>
  <b-card
    ref="list"
    title="Case Row"
    no-body
  >

    <b-card-body>
      <div class="d-flex justify-content-between flex-wrap">
        <!-- sorting  -->
        <b-form-group
          label="Sort"
          label-size="sm"
          label-align-sm="left"
          label-cols-sm="2"
          label-for="sortBySelect"
          class="mr-1 mb-md-0"
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
            <!-- Refresh -->
            <b-button
              variant="primary"
              size="sm"
              class="ml-2"
              @click="refresh"
            >
              <b-icon icon="arrow-repeat" />
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
    <b-row align-h="between">

      <b-col cols="6">
        <p class="text-warning ml-2">
          Hint: Double click to open an Case
        </p>
      </b-col>
      <b-col
        v-if="showExport"
        cols="2"
      >
        <b-button
          variant="success"
          @click="Export"
        >
          Export
        </b-button>
      </b-col>
    </b-row>
    <br>
    <b-table
      ref="selectableTable"
      striped
      hover
      small
      bordered
      :per-page="perPage"
      :current-page="currentPage"
      :items="itemTable"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      :selected-variant="$store.state.appConfig.layout.skin === 'dark'?'active':'primary'"
      show-empty
      empty-text="No matching records found"
      primary-key="id"
      :filter="filter"
      :filter-included-fields="filterOn"
      @row-dblclicked="onRowSelected"
      @filtered="onFiltered"
    >
      <template #table-caption>
        <div>
          <span class="text-muted ml-2 mr-4">
            Total Cases: {{ totalRows }}
          </span>
        </div>
      </template>

      <template #cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <span aria-hidden="true"><b>&check;</b></span>
          <span class="sr-only">Selected</span>
        </template>
        <template v-else>
          <span aria-hidden="true">&nbsp;</span>
          <span class="sr-only">Not selected</span>
        </template>
      </template>
      <template #cell(priority_level)="data">
        <b-badge
          pill
          :variant="
            $store.getters['global/priority'].filter(
              (it) => it.value === data.value
            )[0].variant
          "
        >
          {{
            $store.getters['global/priority'].filter(
              (it) => it.value === data.value
            )[0].title
          }}
        </b-badge>
      </template>
      <template #cell(indicators_done)="data">
        <b-badge
          pill
          :variant="data.value ===1 ? 'success' : 'warning'"
        >
          {{ data.value ===1 ? 'In progress':'Pending' }}
        </b-badge>
      </template>
    </b-table>
    <b-row
      class="m-1"
      align-h="between"
    >
      <b-col cols="3">
        <!-- page length -->
        <b-form-group
          label="Per Page"
          label-cols="5"
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
import { takeState } from 'vuex-dot'
import moment from 'moment'
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'

export default {
  components: {
  },
  data() {
    return {
      totalRows: null,
    }
  },
  computed: {
    referral: takeState('indicators', 'referral').commit('indicators/SET_REF').map(),
    governorate: takeState('indicators', 'governorate').commit('indicators/SET_GOV').map(),
    district: takeState('indicators', 'district').commit('indicators/SET_DIS').map(),
    cadaster: takeState('indicators', 'cadaster').commit('indicators/SET_CAD').map(),
    type: takeState('indicators', 'type').commit('indicators/SET_TYPE').map(),
    iss: takeState('indicators', 'iss').commit('indicators/SET_ISS').map(),
    rangeDate: takeState('indicators', 'rangedate').commit('indicators/SET_RANG_DAT').map(),
    show: takeState('indicators', 'show').commit('indicators/SET_SHOW').map(),

    indicators: takeState('indicators', 'indicators').map(),
    showExport: takeState('indicators', 'showExport').map(),

    // Table Data
    items: takeState('indicators', 'caseItem').commit('indicators/SET_ITEM').map(),
    fields: takeState('indicators', 'caseField').commit('indicators/SET_FIELD').map(),
    // Table Option
    perPage: takeState('indicators', 'perPage').commit('indicators/SET_PER_PAGE').map(),
    pageOptions: takeState('indicators', 'pageOptions').map(),
    currentPage: takeState('indicators', 'currentPage').commit('indicators/SET_CUR_PAGE').map(),
    sortBy: takeState('indicators', 'sortBy').commit('indicators/SET_SORT_BY').map(),
    sortDesc: takeState('indicators', 'sortDesc').commit('indicators/SET_SORT_DESC').map(),
    sortDirection: takeState('indicators', 'sortDirection').commit('indicators/SET_SORT_DIR').map(),
    filter: takeState('indicators', 'filter').commit('indicators/SET_FILTER').map(),
    filterOn: takeState('indicators', 'filterOn').commit('indicators/SET_FILTER_ON').map(),
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
        return moment(item.referral_date).isBetween(frm, to)
      })
      const gov = rg.filter(itemgov => (this.governorate == null ? itemgov : itemgov.governorate_id === this.governorate.value))
      const dis = gov.filter(itemdis => (this.district == null ? itemdis : itemdis.district_id === this.district.value))
      const st = dis.filter(itemtype => (this.type == null ? itemtype : itemtype.st_id === this.type.value))
      const cd = st.filter(itemcad => (this.cadaster == null ? itemcad : itemcad.cadastre_id === this.cadaster.value))
      const iss = cd.filter(itemiss => (this.iss == null ? itemiss : itemiss.is_id === this.iss.value))
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.totalRows = iss.length
      return iss
    },
  },
  mounted() {
    if (this.$store.getters['indicators/isInView'] === false) {
      // Set the initial number of items
      this.totalRows = this.itemTable.length
    } else {
      this.items = this.$store.getters['indicators/items']
    }
    this.refresh()
  },
  methods: {
    refresh() {
      this.$store.dispatch('indicators/REFRESH', {
        prefix: this.$route.params.prefixPrj,
        prefixRole: this.$route.params.prefixRole,
      }).catch(() => {
        this.$swal({
          title: 'Error!',
          text: 'Please Check internet and try again',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
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
    RouteView(items) {
      const nav = []
      nav.push(
        {
          active: false,
          text: this.$route.params.breadcrumb[0].text,
        },
        {
          active: false,
          text: 'Indicators View',
        },
        {
          active: true,
          text: items.case_code,
        },
      )
      this.$router.replace({
        name: 'projectIndicators',
        params: {
          action: 'read',
          breadcrumb: nav,
          active: true,
          prefix: this.$route.params.prefixPrj,
          prefixRole: this.$route.params.prefixRole,
          title: 'Indicators View',
          resource: 'AWRNS',
          value: items,
        },
      })
    },
    onRowSelected(items) {
      this.RouteView(items)
    },
    onFiltered(_, ind) {
      this.totalRows = ind
      this.currentPage = 1
    },
  },
}
</script>
