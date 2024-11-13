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
    <p class="text-warning ml-2">
      Hint: Double click to go follow up
    </p>
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
      show-empty
      :selected-variant="$store.state.appConfig.layout.skin === 'dark'?'active':'primary'"
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
      <template #cell(com_status)="data">
        <p>{{ data.value ==null || data.value ==='' ?'None': data.value }}</p>
      </template>
      <template #cell(pcr_duration)="data">
        {{ data.value }} {{ data.value >1?'Days':'Day' }}
      </template>
      <template #cell(com_inprogress)="data">
        <b-badge
          pill
          :variant="data.value ===1 ? 'success' : 'warning'"
        >
          {{ data.value ===0 ? 'New Case':'In progress' }}
        </b-badge>
      </template>
      <template #row-details="row">
        <b-card>
          <b-row class="mb-2">
            <b-col
              sm="3"
              class="text-sm-right"
            >
              <b>Current Status:</b>
            </b-col>
            <b-col>
              <p style="white-space: pre">
                {{ row.item.current_status }}
              </p>
            </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col
              sm="3"
              class="text-sm-right"
            >
              <b>Address Details:</b>
            </b-col>
            <b-col>
              <p style="white-space: pre;">
                Cadaster: {{ row.item.cadastre_name }}</p>
              <p style="white-space: pre;">
                Settlement type: {{ row.item.stal_name }}</p>
              <p style="white-space: pre;">
                Settlement name: {{ row.item.is_name == null?'None': row.item.is_name }}</p>
            </b-col>
          </b-row>
        </b-card>
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

export default {
  components: {
  },
  data() {
    return {
      totalRows: null,
    }
  },
  computed: {
    referral: takeState('followUp', 'referral').commit('followUp/SET_REF').map(),
    governorate: takeState('followUp', 'governorate').commit('followUp/SET_GOV').map(),
    district: takeState('followUp', 'district').commit('followUp/SET_DIS').map(),
    cadaster: takeState('followUp', 'cadaster').commit('followUp/SET_CAD').map(),
    type: takeState('followUp', 'type').commit('followUp/SET_TYPE').map(),
    iss: takeState('followUp', 'iss').commit('followUp/SET_ISS').map(),
    rangeDate: takeState('followUp', 'rangedate').commit('followUp/SET_RANG_DAT').map(),
    show: takeState('followUp', 'show').commit('followUp/SET_SHOW').map(),
    // Table Data
    items: takeState('followUp', 'caseItem').commit('followUp/SET_ITEM').map(),
    fields: takeState('followUp', 'caseField').commit('followUp/SET_FIELD').map(),
    // Table Option
    perPage: takeState('followUp', 'perPage').commit('followUp/SET_PER_PAGE').map(),
    pageOptions: takeState('followUp', 'pageOptions').map(),
    currentPage: takeState('followUp', 'currentPage').commit('followUp/SET_CUR_PAGE').map(),
    sortBy: takeState('followUp', 'sortBy').commit('followUp/SET_SORT_BY').map(),
    sortDesc: takeState('followUp', 'sortDesc').commit('followUp/SET_SORT_DESC').map(),
    sortDirection: takeState('followUp', 'sortDirection').commit('followUp/SET_SORT_DIR').map(),
    filter: takeState('followUp', 'filter').commit('followUp/SET_FILTER').map(),
    filterOn: takeState('followUp', 'filterOn').commit('followUp/SET_FILTER_ON').map(),
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
    if (this.$store.getters['followUpWizClr/isInView'] === false) {
      // Set the initial number of items
      this.totalRows = this.itemTable.length
    } else {
      const items = this.$store.getters['followUpWizClr/items']
      this.RouteView(items)
    }
  },
  methods: {
    refresh() {
      this.$store.dispatch('followUp/REFRESH', {
        prefix: this.$route.params.prefixPrj,
        type: this.$route.params.assmnttype,
        prefixRole: this.$route.params.prefixRole,
      })
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
          text: this.$route.params.title,
        },
        {
          active: true,
          text: items.full_name,
        },
      )
      this.$router.replace({
        name: 'projectViewsCLR',
        params: {
          action: 'read',
          breadcrumb: nav,
          active: true,
          prefix: this.$route.params.prefixPrj,
          prefixRole: this.$route.params.prefixRole,
          assmnttype: this.$route.params.assmnttype,
          title: 'Follow Up View',
          resource: 'CMTN',
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
