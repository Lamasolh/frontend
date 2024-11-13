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
              v-if="latType.length !=0 && latLocation.length !=0 && latStatus.length !=0 && installedBy.length !=0"
              :data="ExportTable"
              :fields="exportField"
              worksheet="Sheet1"
              type="xls"
              name="Latrine.xls"
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
          Add Latrine
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
      :filter-included-fields="filterOn"
    >
      <template #table-busy>
        <div class="text-center text-primary my-2">
          <b-spinner class="align-middle" />
          <strong>Loading...</strong>
        </div>
      </template>
      <!-- Column: Actions -->
      <template #cell(latrine_status_id)="data">
        {{ latStatus.filter(
          (it) => it.id === data.item.latrine_status_id
        ).length ===0? "":latStatus.filter(
          (it) => it.id === data.item.latrine_status_id
        )[0].name }}
      </template>
      <template #cell(active)="data">
        {{ data.item.active? 'Yes':'No' }}
      </template>
      <template #cell(dispatched)="data">
        {{ data.item.dispatched? 'Yes':'No' }}
      </template>
      <template #cell(latrine_location_id)="data">
        {{ latLocation.filter(
          (it) => it.id === data.item.latrine_location_id
        ).length ===0? "":
          latLocation.filter(
            (it) => it.id === data.item.latrine_location_id
          )[0].name }}
      </template>
      <template #cell(installed_by_id)="data">
        {{ installedBy.filter(
          (it) => it.id === data.item.installed_by_id
        ).length ===0? "":installedBy.filter(
          (it) => it.id === data.item.installed_by_id
        ) [0].name }}
      </template>

      <template #cell(pit)="data">
        {{ data.item.pit_id ==null? "":
          pits.filter(
            (it) => it.id === data.item.pit_id
          )[0].name
        }}
      </template>
      <template #cell(alterantive_pit)="data">
        {{ data.item.alternative_pi }}
        {{ data.item.alternative_pi ==null? "": altPit.filter(
          (it) => it.id === data.item.alternative_pi
        )[0].name }}
      </template>

      <template #cell(latrine_kind_id)="data">
        {{ latType.filter(
          (it) => it.id === data.item.latrine_kind_id
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
    ...takeState('dtMAIN', 'showModalLAT')
      .expose([
        'active',
        'item',
        'pit',
      ])
      .commit('dtMAIN/SET_MOD_LAT_EXP')
      .map(),
    show: takeState('dtMAIN', 'show').commit('dtMAIN/SET_SHOW').map(),
    perPage: takeState('dtLAT', 'perPage').commit('dtLAT/SET_PER_PAGE').map(),
    pageOptions: takeState('dtLAT', 'pageOptions').map(),
    currentPage: takeState('dtLAT', 'currentPage').commit('dtLAT/SET_CUR_PAGE').map(),
    sortBy: takeState('dtLAT', 'sortBy').commit('dtLAT/SET_SORT_BY').map(),
    sortDesc: takeState('dtLAT', 'sortDesc').commit('dtLAT/SET_SORT_DESC').map(),
    sortDirection: takeState('dtLAT', 'sortDirection').commit('dtLAT/SET_SORT_DIR').map(),
    filter: takeState('dtLAT', 'filter').commit('dtLAT/SET_FILTER').map(),
    filterOn: takeState('dtLAT', 'filterOn').commit('dtLAT/SET_FILTER_ON').map(),
    itemField: takeState('dtLAT', 'itemsField').map(),
    items: takeState('dtLAT', 'items').map(),
    latType: takeState('dtMAIN', 'latType').map(),
    latLocation: takeState('dtMAIN', 'latLocation').map(),
    latStatus: takeState('dtMAIN', 'latStatus').map(),
    installedBy: takeState('dtMAIN', 'installedBy').map(),
    pits: takeState('dtPIT', 'items').map(),
    altPit: takeState('dtMAIN', 'altPit').map(),
    showModalLAT: takeState('dtMAIN', 'showModalLAT').commit('dtMAIN/SET_MOD_LAT').map(),
    exportField: takeState('dtLAT', 'exportField').map(),

    sortOptions() {
      // Create an options list from our fields
      return this.itemField
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },

    itemTable() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.totalRows = this.items.length
      return this.items
    },
    ExportTable() {
      const it = this.items
      /* it.forEach(el => {
        el.status = this.tentStatus.filter(e => e.id === el.tent_status_id).length === 0
          ? null
          : this.tentStatus.filter(e => e.id === el.tent_status_id)[0].name
        el.type = this.tentType.filter(e => e.id === el.tent_type).length === 0
          ? null
          : this.tentType.filter(e => e.id === el.tent_type)[0].name
        el.dispatched = el.dispatched === 1 ? 'Yes' : 'No'
        el.active = el.active === 1 ? 'Yes' : 'No'
      }) */
      return it
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.itemTable.length
  },
  methods: {
    Edit(item) {
      this.active = true
      this.item = {
        ...item,

        installed_by: this.installedBy.filter(el => el.id === item.installed_by_id)[0],
        altPit: this.altPit.filter(el => el.id === item.alternative_pi)[0],
        status: this.latStatus.filter(el => el.id === item.latrine_status_id)[0],
        location: this.latLocation.filter(el => el.id === item.latrine_location_id)[0],
        type: this.latType.filter(el => el.id === item.latrine_kind_id)[0],
      }
      this.pit = this.pits.filter(el => el.id === item.pit_id)[0]
    },
    Add() {
      this.active = true
      this.item = {
        code: generateUniqueId('LAT_'),
        status: this.latStatus.filter(el => el.id === 1)[0],
        // location: this.latLocation.filter(el => el.id === 1)[0],
        type: this.latType.filter(el => el.id === 3)[0],
      }
    },
  },
}
</script>

  <style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
.xlarge {
  min-width: 250px;
}
.large {
  min-width: 200px;
}
.iss {
  min-width: 50px;
}
.action {
  min-width: 30px;
}
</style>
