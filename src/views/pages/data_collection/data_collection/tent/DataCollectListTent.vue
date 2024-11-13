<template>
  <b-card no-body>

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
              v-if="tentStatus.length !=0 && tentType.length !=0"
              :data="ExportTable"
              :fields="exportField"
              worksheet="Sheet1"
              type="xls"
              name="Tent.xls"
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
          Add Tent
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
      :no-border-collapse="true"
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
      <template #cell(tent_status_id)="data">
        {{ tentStatus.filter(
          (it) => it.id === data.item.tent_status_id
        )[0].name }}
      </template>
      <template #cell(tent_type)="data">
        {{ tentType.filter(
          (it) => it.id === data.item.tent_type
        )[0].name }}
      </template>
      <template #cell(tank_code)="data">

        {{ itemsTank.filter(
          (it) => it.tent_id === data.item.id
        ).length===0 ?null:itemsTank.filter(
          (it) => it.tent_id === data.item.id
        ).map(el=>el.code).join(', ') }}
      </template>
      <template #cell(tank_ref)="data">

        {{ itemsTank.filter(
          (it) => it.tent_id === data.item.id
        ).length===0 ?null:itemsTank.filter(
          (it) => it.tent_id === data.item.id
        ).map(el=>el.reference).join(', ') }}
      </template>
      <template #cell(latrine_code)="data">
        {{ itemsLat.filter(
          (it) => it.tent_id === data.item.id
        ).length===0 ?null:itemsLat.filter(
          (it) => it.tent_id === data.item.id
        ).map(el=>el.code).join(', ') }}
      </template>
      <template #cell(latrine_ref)="data">
        {{ itemsLat.filter(
          (it) => it.tent_id === data.item.id
        ).length===0 ?null:itemsLat.filter(
          (it) => it.tent_id === data.item.id
        ).map(el=>el.reference).join(', ') }}
      </template>
      <template #cell(pit_code)="data">

        {{ itemsPit.filter(
          (it) => it.tent_id === data.item.id
        ).length===0 ?null:itemsPit.filter(
          (it) => it.tent_id === data.item.id
        ).map(el=>el.code).join(', ') }}
      </template>
      <template #cell(pit_ref)="data">
        {{ itemsPit.filter(
          (it) => it.tent_id === data.item.id
        ).length===0 ?null:itemsPit.filter(
          (it) => it.tent_id === data.item.id
        ).map(el=>el.reference).join(', ') }}
      </template>
      <template #cell(family_code)="data">
        {{ itemsFam.filter(
          (it) => it.tent_id === data.item.id
        ).length===0 ?null:itemsFam.filter(
          (it) => it.tent_id === data.item.id
        ).map(el=>el.code).join(', ') }}
      </template>
      <template #cell(family_ref)="data">
        {{ itemsFam.filter(
          (it) => it.tent_id === data.item.id
        ).length===0 ?null:itemsFam.filter(
          (it) => it.tent_id === data.item.id
        ).map(el=>el.reference).join(', ') }}
      </template>

      <template #cell(location)="data">
        <a
          v-if=" data.item.lat !=null"
          target="_blank"
          :href="'https://maps.google.com/?ll='+data.item.lat+','+data.item.long"
        >
          {{ data.item.lat }} , {{ data.item.long }}
        </a>

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
  </b-card>
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
    perPage: takeState('dtTNT', 'perPage').commit('dtTNT/SET_PER_PAGE').map(),
    pageOptions: takeState('dtTNT', 'pageOptions').map(),
    currentPage: takeState('dtTNT', 'currentPage').commit('dtTNT/SET_CUR_PAGE').map(),
    sortBy: takeState('dtTNT', 'sortBy').commit('dtTNT/SET_SORT_BY').map(),
    sortDesc: takeState('dtTNT', 'sortDesc').commit('dtTNT/SET_SORT_DESC').map(),
    sortDirection: takeState('dtTNT', 'sortDirection').commit('dtTNT/SET_SORT_DIR').map(),
    filter: takeState('dtTNT', 'filter').commit('dtTNT/SET_FILTER').map(),
    filterOn: takeState('dtTNT', 'filterOn').commit('dtTNT/SET_FILTER_ON').map(),
    itemField: takeState('dtTNT', 'itemsField').map(),
    items: takeState('dtTNT', 'items').map(),
    tentStatus: takeState('dtMAIN', 'tentStatus').map(),
    tentType: takeState('dtMAIN', 'tentType').map(),
    exportField: takeState('dtTNT', 'exportField').map(),

    tank: takeState('dtTNK', 'items').map(),
    latrines: takeState('dtLAT', 'items').map(),
    pits: takeState('dtPIT', 'items').map(),
    families: takeState('dtFAM', 'items').map(),

    itemsTank: takeState('dtTNT', 'itemsTank').map(),
    itemsFam: takeState('dtTNT', 'itemsFam').map(),
    itemsLat: takeState('dtTNT', 'itemsLat').map(),
    itemsPit: takeState('dtTNT', 'itemsPit').map(),
    showModalTNT: takeState('dtMAIN', 'showModalTNT').commit('dtMAIN/SET_MOD_TNT').map(),
    sortOptions() {
      // Create an options list from our fields
      return this.itemField
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
    ExportTable() {
      const it = this.items
      it.forEach(el => {
        el.status = this.tentStatus.filter(e => e.id === el.tent_status_id).length === 0
          ? null
          : this.tentStatus.filter(e => e.id === el.tent_status_id)[0].name
        el.type = this.tentType.filter(e => e.id === el.tent_type).length === 0
          ? null
          : this.tentType.filter(e => e.id === el.tent_type)[0].name

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
      console.log(item)
      const tanks = []
      const pit = []
      const fam = []
      const lat = []
      this.itemsTank.filter(el => el.tent_id === item.id).forEach(element => {
        tanks.push(this.tank.filter(el => el.id === element.tank_id)[0])
      })
      this.itemsLat.filter(el => el.tent_id === item.id).forEach(element => {
        lat.push(this.latrines.filter(el => el.id === element.latrine_id)[0])
      })
      this.itemsPit.filter(el => el.tent_id === item.id).forEach(element => {
        pit.push(this.pits.filter(el => el.id === element.pit_id)[0])
      })
      this.itemsFam.filter(el => el.tent_id === item.id).forEach(element => {
        console.log(element)
        fam.push(this.families.filter(el => el.id === element.family_id)[0])
      })
      this.showModalTNT = {
        active: true,
        isNew: false,
        item: {
          ...item,
          status: this.tentStatus.filter(el => el.id === item.tent_status_id)[0],
          type: this.tentType.filter(el => el.id === item.tent_type)[0],
        },
        tank: tanks,
        latrine: lat,
        pits: pit,
        family: fam,
      }
    },
    Add() {
      this.showModalTNT = {
        active: true,
        isNew: true,
        item: {
          code: generateUniqueId('TNT_'),
          status: this.tentStatus.filter(el => el.id === 1)[0],
          type: this.tentType.filter(el => el.id === 1)[0],
          size: '120',
          max_cap: 10,
          lat: 30.00,
          long: 30.00,
          address: '',
          no_tank: '',

        },
        tank: [],
        latrine: [],
        pits: [],
        family: [],
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
