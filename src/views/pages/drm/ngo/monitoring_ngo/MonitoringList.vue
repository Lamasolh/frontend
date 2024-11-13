<template>
  <b-card
    ref="CAST"
    title="Case Row"
    no-body
  >
    <b-card-body>
      <b-row>
        <!--  <b-col cols="4">
           sorting
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
        </b-col>-->
        <b-col cols="2">
          <b-button
            variant="info"
            block
            style=" margin-top: 25px;"
            @click="Search"
          >
            Refresh
          </b-button>
        </b-col>
        <b-col cols="4" />
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

      <template #cell(monitoring_status)="data">
        <b-badge
          pill
          :variant="
            $store.getters['drmNGOMn/MonitoringStatusOptions'].filter(
              (it) => it.value === data.value
            )[0].variant
          "
        >
          {{
            $store.getters['drmNGOMn/MonitoringStatusOptions'].filter(
              (it) => it.value === data.value
            )[0].title
          }}
        </b-badge>

      </template>
      <template #cell(cycle_status)="data">
        <b-badge
          pill
          :variant="
            $store.getters['drmNGOMn/CaseStatusOptions'].filter(
              (it) => it.value === data.value
            )[0].variant
          "
        >
          {{
            $store.getters['drmNGOMn/CaseStatusOptions'].filter(
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

    json_fields: takeState('drmNGOMn', 'json_fields').map(),
    header() {
      return moment().toString
    },
    ///
    show: takeState('drmNGOMn', 'show').commit('drmNGOMn/SET_SHOW').map(),
    // Table Data
    items: takeState('drmNGOMn', 'caseItem').commit('drmNGOMn/SET_ITEM').map(),
    fields: takeState('drmNGOMn', 'caseField').commit('drmNGOMn/SET_FIELD').map(),
    // Table Option
    perPage: takeState('drmNGOMn', 'perPage').commit('drmNGOMn/SET_PER_PAGE').map(),
    pageOptions: takeState('drmNGOMn', 'pageOptions').map(),
    currentPage: takeState('drmNGOMn', 'currentPage').commit('drmNGOMn/SET_CUR_PAGE').map(),
    sortBy: takeState('drmNGOMn', 'sortBy').commit('drmNGOMn/SET_SORT_BY').map(),
    sortDesc: takeState('drmNGOMn', 'sortDesc').commit('drmNGOMn/SET_SORT_DESC').map(),
    sortDirection: takeState('drmNGOMn', 'sortDirection').commit('drmNGOMn/SET_SORT_DIR').map(),
    filter: takeState('drmNGOMn', 'filter').commit('drmNGOMn/SET_FILTER').map(),
    filterOn: takeState('drmNGOMn', 'filterOn').commit('drmNGOMn/SET_FILTER_ON').map(),
    sortOptions() {
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
      const it = JSON.parse(JSON.stringify(this.itemTable))
      return it
    },
  },
  mounted() {
    this.Search()
    this.perPage = 10
    // Set the initial number of items
    this.totalRows = this.itemTable.length
    // this.items = []
  },
  methods: {
    Search() {
      this.$store.dispatch('drmNGOMn/GET_DATA', {
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
    getDay(date) {
      console.log(date)
      const differenceInTime = Date.now() - Date.parse(date)
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
        name: 'drm_monitoring_details_ngo',
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
