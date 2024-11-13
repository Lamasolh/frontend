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
              v-if="waterSourceStatus.length !=0 && waterSourceType.length !=0"
              :data="ExportTable"
              :fields="exportField"
              worksheet="Sheet1"
              type="xls"
              name="Water Source.xls"
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
          Add WaterSource
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
      responsive
      :busy="show"
      bordered
      small
      stacked="md"
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
      sticky="100%"
      :filter-included-fields="filterOn"
    >
      <template #table-busy>
        <div class="text-center text-primary my-2">
          <b-spinner class="align-middle" />
          <strong>Loading...</strong>
        </div>
      </template>
      <!-- Column: Actions -->
      <template #cell(status_id)="data">
        {{ waterSourceStatus.filter(
          (it) => it.id === data.item.status_id
        ).length === 0?'': waterSourceStatus.filter(
          (it) => it.id === data.item.status_id
        )[0].name }}
      </template>

      <template #cell(active)="data">
        {{ data.item.active? 'Yes':'No' }}
      </template>
      <template #cell(dispatched)="data">
        {{ data.item.dispatched? 'Yes':'No' }}
      </template>
      <template #cell(water_source_type_id)="data">
        {{ waterSourceType.filter(
          (it) => it.id === data.item.water_source_type_id
        ).length === 0?'': waterSourceType.filter(
          (it) => it.id === data.item.water_source_type_id
        )[0].name }}
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
        sm="12"
        md="6"
        lg="2"
        xl="2"
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
  </b-card-body>

</template>
<script>
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
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
    perPage: takeState('dtWTR', 'perPage').commit('dtWTR/SET_PER_PAGE').map(),
    pageOptions: takeState('dtWTR', 'pageOptions').map(),
    currentPage: takeState('dtWTR', 'currentPage').commit('dtWTR/SET_CUR_PAGE').map(),
    sortBy: takeState('dtWTR', 'sortBy').commit('dtWTR/SET_SORT_BY').map(),
    sortDesc: takeState('dtWTR', 'sortDesc').commit('dtWTR/SET_SORT_DESC').map(),
    sortDirection: takeState('dtWTR', 'sortDirection').commit('dtWTR/SET_SORT_DIR').map(),
    filter: takeState('dtWTR', 'filter').commit('dtWTR/SET_FILTER').map(),
    filterOn: takeState('dtWTR', 'filterOn').commit('dtWTR/SET_FILTER_ON').map(),
    itemField: takeState('dtWTR', 'itemsField').map(),
    items: takeState('dtWTR', 'items').map(),
    waterSourceType: takeState('dtMAIN', 'waterSourceType').map(),
    waterSourceStatus: takeState('dtMAIN', 'waterSourceStatus').map(),
    showModalWTR: takeState('dtMAIN', 'showModalWTR').commit('dtMAIN/SET_MOD_WTR').map(),

    exportField: takeState('dtWTR', 'exportField').map(),

    sortOptions() {
      // Create an options list from our fields
      return this.itemField
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
    ExportTable() {
      const it = this.items
      it.forEach(el => {
        el.status = this.waterSourceStatus.filter(e => e.id === el.status_id).length === 0
          ? null
          : this.waterSourceStatus.filter(e => e.id === el.status_id)[0].name
        el.type = this.waterSourceType.filter(e => e.id === el.water_source_type_id).length === 0
          ? null
          : this.waterSourceType.filter(e => e.id === el.water_source_type_id)[0].name
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
    // Set the initial number of items
    this.totalRows = this.itemTable.length
  },
  methods: {
    Edit(item) {
      console.log(item, this.waterSourceStatus)
      this.showModalWTR = {
        active: true,
        item: {
          ...item,
          status: this.waterSourceStatus.filter(el => el.id === item.status_id)[0],
          type: this.waterSourceType.filter(el => el.id === item.water_source_type_id)[0],
        },
      }
    },
    Add() {
      this.showModalWTR = {
        active: true,
        item: {
          code: generateUniqueId('WTR_'),
          status: this.waterSourceStatus.filter(el => el.id === 1)[0],
          type: this.waterSourceType.filter(el => el.id === 2)[0],
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
