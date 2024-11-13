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
              v-if="items.length !=0"
              :data="ExportTable"
              :fields="exportField"
              worksheet="Sheet1"
              type="xls"
              name="Member.xls"
              :meta="json_meta"
            >
              Excel
            </download-excel></b-dropdown-item>
          <b-dropdown-item>QR Code(System Code)</b-dropdown-item>
          <b-dropdown-item>QR Code(Organization Code)</b-dropdown-item>
        </b-dropdown>

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
      <template #cell(active)="data">
        {{ data.item.active? 'Yes':'No' }}
      </template>
      <template #cell(dispatched)="data">
        {{ data.item.dispatched? 'Yes':'No' }}
      </template>

      <template #cell(disability_id)="data">
        {{ disbality .filter(
          (it) => it.id === data.item.disability_id
        ).length ===0? "": disbality .filter(
          (it) => it.id === data.item.disability_id
        )[0].name }}

      </template>
      <template #cell(family_realtion)="data">
        {{ familyrelation .filter(
          (it) => it.id === data.item.family_relation_id
        ).length ===0? "Head Of Household": familyrelation .filter(
          (it) => it.id === data.item.family_relation_id
        )[0].name }}

      </template>

      <template #cell(tent)="data">
        {{ tent .filter(
          (it) => it.id === data.item.tent_id
        ).length ===0? "": tent .filter(
          (it) => it.id === data.item.tent_id
        )[0].code }}

      </template>
      <template #cell(family)="data">
        {{ family .filter(
          (it) => it.id === data.item.family_id
        ).length ===0? "": family .filter(
          (it) => it.id === data.item.family_id
        )[0].code }}

      </template>

      <template #cell(gender_id)="data">
        {{ gender .filter(
          (it) => it.id === data.item.gender_id
        ).length ===0? "": gender .filter(
          (it) => it.id === data.item.gender_id
        )[0].name }}

      </template>
      <template #cell(nationality_id)="data">
        {{ nationality .filter(
          (it) => it.id === data.item.nationality_id
        ).length ===0? "": nationality .filter(
          (it) => it.id === data.item.nationality_id
        )[0].name }}

      </template>
      <template #cell(marital_status_id)="data">
        {{ maritalStatus .filter(
          (it) => it.id === data.item.marital_status_id
        ).length ===0? "": maritalStatus .filter(
          (it) => it.id === data.item.marital_status_id
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
    ...takeState('dtMAIN', 'showModalMEM')
      .expose([
        'active',
        'item',
      ])
      .commit('dtMAIN/SET_MOD_MEM_EXP')
      .map(),
    show: takeState('dtMAIN', 'show').commit('dtMAIN/SET_SHOW').map(),
    perPage: takeState('dtMEM', 'perPage').commit('dtMEM/SET_PER_PAGE').map(),
    pageOptions: takeState('dtMEM', 'pageOptions').map(),
    currentPage: takeState('dtMEM', 'currentPage').commit('dtMEM/SET_CUR_PAGE').map(),
    sortBy: takeState('dtMEM', 'sortBy').commit('dtMEM/SET_SORT_BY').map(),
    sortDesc: takeState('dtMEM', 'sortDesc').commit('dtMEM/SET_SORT_DESC').map(),
    sortDirection: takeState('dtMEM', 'sortDirection').commit('dtMEM/SET_SORT_DIR').map(),
    filter: takeState('dtMEM', 'filter').commit('dtMEM/SET_FILTER').map(),
    filterOn: takeState('dtMEM', 'filterOn').commit('dtMEM/SET_FILTER_ON').map(),
    itemField: takeState('dtMEM', 'itemsField').map(),
    items: takeState('dtMEM', 'items').map(),
    family: takeState('dtFAM', 'items').map(),
    tent: takeState('dtTNT', 'items').map(),
    exportField: takeState('dtMEM', 'exportField').map(),
    maritalStatus: takeState('dtMAIN', 'maritalStatus').map(),
    nationality: takeState('dtMAIN', 'nationality').map(),
    disbality: takeState('dtMAIN', 'disability').map(),
    gender: takeState('dtMAIN', 'gender').map(),
    familyrelation: takeState('dtMAIN', 'famRelation').map(),

    showModalMEM: takeState('dtMAIN', 'showModalMEM').commit('dtMAIN/SET_MOD_MEM').map(),
    ExportTable() {
      const it = this.items
      it.forEach(el => {
        el.dispatch = el.dispatched === 1 ? 'Yes' : 'No'
        el.actv = el.active === 1 ? 'Yes' : 'No'
      })
      return it
    },
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
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.itemTable.length
  },
  methods: {
    Edit(it) {
      const item = JSON.parse(JSON.stringify(it))
      item.gender = this.gender.filter(el => el.id === item.gender_id)[0]
      item.disbality = this.disbality.filter(el => el.id === item.disability_id)[0]
      item.nationality = this.nationality.filter(el => el.id === item.nationality_id)[0]
      item.maritalStatus = this.maritalStatus.filter(el => el.id === item.marital_status_id)[0]
      item.is_household = item.family_relation_id === 1
      if (item.family_relation_id === 1) {
        item.family_relation = {
          id: 1,
          name: 'Head Of HouseHold',
        }
      } else {
        item.family_relation = this.familyrelation.filter(el => el.id === item.family_relation_id)[0]
      }
      item.tentInfo = this.tent.filter(el => el.id === item.tent_id).length === 0 ? null : this.tent.filter(el => el.id === item.tent_id)[0]
      item.famInfo = this.family.filter(el => el.id === item.family_id).length === 0 ? null : this.family.filter(el => el.id === item.family_id)[0]
      console.log(this.family)
      console.log(item)

      this.showModalMEM = {
        active: true,
        item,
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
