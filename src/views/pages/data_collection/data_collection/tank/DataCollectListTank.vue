<template>

  <b-card-body>
    <b-row align-h="end">
      <b-col
        sm="12"
        md="4"
        lg="2"
        xl="2"
      >
        <b-dropdown
          id="dropdown-1"
          text="Export"
          variant="info"
          block
        >
          <b-dropdown-item>
            <download-excel
              v-if="tankStatus.length !=0 && installedBy.length !=0"
              :data="ExportTable"
              :fields="exportField"
              worksheet="Sheet1"
              type="xls"
              name="Tank.xls"
              :meta="json_meta"
            >
              Excel
            </download-excel></b-dropdown-item>
          <b-dropdown-item>QR Code(System Code)</b-dropdown-item>
          <b-dropdown-item>QR Code(Organization Code)</b-dropdown-item>
        </b-dropdown>

      </b-col>
      <b-col
        sm="12"
        md="4"
        lg="2"
        xl="2"
      >
        <b-button
          class="mt-1 mt-md-0"
          variant="success"
          block
          @click="Add"
        >
          Add Tank
        </b-button>
      </b-col>
    </b-row>
    <br>
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
            @click="$parent.$parent.$parent.$parent.ResetData()"
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
    <br>
    <b-table
      ref="selectableTable"
      striped
      hover
      :busy="show"
      bordered
      small
      stacked="md"
      responsive
      :selected-variant="$store.state.appConfig.layout.skin === 'dark'?'active':'primary'"
      :per-page="perPage"
      :current-page="currentPage"
      :items="itemTable"
      :fields="itemField"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      show-empty
      empty-text="No matching records found"
      primary-key="id"
      :filter="filter"
      :filter-included-fields="filterOn"
    >
      <template #table-busy>
        <div class="text-center text-primary my-2">
          <b-spinner class="align-middle" />
          <strong>Loading...</strong>
        </div>
      </template>
      <!-- Column: Actions -->
      <template #cell(tank_status_id)="data">
        {{ tankStatus.filter(
          (it) => it.id === data.item.tank_status_id
        )[0].name }}
      </template>
      <template #cell(installed_by_id)="data">
        {{ installedBy.filter(
          (it) => it.id === data.item.installed_by_id
        ).length ===0? "":installedBy.filter(
          (it) => it.id === data.item.installed_by_id
        ) [0].name }}
      </template>
      <template #cell(capacity)="data">
        {{ data.item.capacity }} L
      </template>

      <template #cell(for_cooking)="data">
        {{ data.item.for_cooking ?'Yes':'No' }}
      </template>

      <template #cell(for_drinking)="data">
        {{ data.item.for_drinking ?'Yes':'No' }}
      </template>
      <template #cell(for_domestic)="data">
        {{ data.item.for_domestic ?'Yes':'No' }}
      </template>
      <template #cell(for_hygiene)="data">
        {{ data.item.for_hygiene ?'Yes':'No' }}
      </template>
      <template #cell(active)="data">
        {{ data.item.active? 'Yes':'No' }}
      </template>
      <template #cell(dispatched)="data">
        {{ data.item.dispatched? 'Yes':'No' }}
      </template>
      <!-- Column: Actions -->
      <template #cell(action)="data">
        <b-button
          variant="info"
          block
          @click="Edit(data.item)"
        >
          <feather-icon icon="EditIcon" />
          <span>Edit</span>
        </b-button>
      </template>
      <template #table-caption>
        <div>
          <span class="text-muted ml-2 mr-4">
            Total Cases: {{ totalRows }}
          </span>
        </div>
      </template>
    </b-table>
    <b-row
      class="m-1"
      align-h="between"
    >
      <b-col
        sm="12"
        md="6"
        lg="2"
        xl="2"
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
        sm="12"
        md="6"
        lg="2"
        xl="2"
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
  </b-card-body>
</template>
<script>
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-expressions */

import { takeState } from 'vuex-dot'
import generateUniqueId from '@/libs/unique_id'

export default {
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
    }
  },
  computed: {
    show: takeState('dtMAIN', 'show').commit('dtMAIN/SET_SHOW').map(),
    perPage: takeState('dtTNK', 'perPage').commit('dtTNK/SET_PER_PAGE').map(),
    pageOptions: takeState('dtTNK', 'pageOptions').map(),
    currentPage: takeState('dtTNK', 'currentPage').commit('dtTNK/SET_CUR_PAGE').map(),
    sortBy: takeState('dtTNK', 'sortBy').commit('dtTNK/SET_SORT_BY').map(),
    sortDesc: takeState('dtTNK', 'sortDesc').commit('dtTNK/SET_SORT_DESC').map(),
    sortDirection: takeState('dtTNK', 'sortDirection').commit('dtTNK/SET_SORT_DIR').map(),
    filter: takeState('dtTNK', 'filter').commit('dtTNK/SET_FILTER').map(),
    filterOn: takeState('dtTNK', 'filterOn').commit('dtTNK/SET_FILTER_ON').map(),
    itemField: takeState('dtTNK', 'itemsField').map(),
    items: takeState('dtTNK', 'items').map(),
    listWtr: takeState('dtWTR', 'items').map(),

    tankStatus: takeState('dtMAIN', 'tankStatus').map(),
    showModalTNK: takeState('dtMAIN', 'showModalTNK').commit('dtMAIN/SET_MOD_TNK').map(),
    installedBy: takeState('dtMAIN', 'installedBy').map(),
    itemsWtr: takeState('dtTNK', 'itemsTnkWtr').map(),
    exportField: takeState('dtTNK', 'exportField').map(),

    sortOptions() {
      return this.itemField
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
    ExportTable() {
      const it = this.items
      it.forEach(el => {
        el.status = this.tankStatus.filter(e => e.id === el.tank_status_id).length === 0
          ? null
          : this.tankStatus.filter(e => e.id === el.tank_status_id)[0].name
        el.installed_by = this.installedBy.filter(e => e.id === el.installed_by_id).length === 0
          ? null
          : this.installedBy.filter(e => e.id === el.installed_by_id)[0].name
        el.forcooking = el.for_cooking ? 'Yes' : 'No'
        el.fordrinking = el.for_drinking ? 'Yes' : 'No'
        el.fordomestic = el.for_domestic ? 'Yes' : 'No'
        el.forhygiene = el.for_hygiene ? 'Yes' : 'No'

        el.dispatch = el.dispatched ? 'Yes' : 'No'
        el.actv = el.active ? 'Yes' : 'No'
      })
      return it
    },
    itemTable() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.totalRows = this.items.length
      return this.items
    },
  },
  mounted() {
    this.totalRows = this.itemTable.length
  },
  methods: {
    Edit(item) {
      const ls = this.itemsWtr.filter(el => el.tank_id === item.id)
      const lstWr = []
      ls.forEach(el => {
        if (el.water_source_id === 1) {
          console.log(el)
          const lsBen = ls.filter(e => e.water_source_id === 1)[0]
          console.log(lsBen)
          item.is_by_ben = 1
          item.ben_month = lsBen.monthes
          item.ben_period = lsBen.time_p_month
          item.ben_level = lsBen.level
        } else if (el.water_source_id === 2) {
          const lsWtr = ls.filter(e => e.water_source_id === 2)[0]
          item.is_waterTruking = 1
          item.wtr_month = lsWtr.monthes
          item.wtr_period = lsWtr.time_p_month
          item.wtr_level = lsWtr.level
        } else {
          console.log(el, this.listWtr)
          lstWr.push({
            wtr_level: el.level,
            period: el.time_p_month,
            month: el.monthes,
            source: this.listWtr.filter(e => e.id === el.water_source_id)[0],
          })
        }
      })

      const it = {
        ...item,
        for_cooking: item.for_cooking === 1,
        for_drinking: item.for_drinking === 1,
        for_domestic: item.for_domestic === 1,
        for_hygiene: item.for_hygiene === 1,
        is_by_ben: item.is_by_ben === 1,
        is_waterTruking: item.is_waterTruking === 1,
        status: this.tankStatus.filter(el => el.id === item.tank_status_id)[0],
        installed_by: this.installedBy.filter(el => el.id === item.installed_by_id)[0],

      }
      this.showModalTNK = {
        active: true,
        item: it,
        lstWtr: lstWr,
      }
    },
    Add() {
      this.showModalTNK = {
        active: true,
        lstWtr: [],
        item: {
          code: generateUniqueId('TNK_'),
          status: this.tankStatus.filter(el => el.id === 1)[0],
          capacity: 1000,
          is_by_ben: false,
          is_waterTruking: true,
          for_cooking: true,
          for_drinking: true,
          for_domestic: true,
          for_hygiene: true,
          wtr_level: 100,
          wtr_period: 4,
          wtr_month: 12,
        },
      }
    },
  },
}
</script>

  <style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
.sup {
  min-width: 250px;
}
.iss {
  min-width: 50px;
}
.action {
  min-width: 30px;
}
</style>
