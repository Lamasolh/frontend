<template>
  <b-card>
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
              @click="$parent.$parent.ResetData()"
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
    <b-table
      ref="selectableTable"
      bordered
      responsive
      show-empty
      empty-text="No matching records found"
      :items="itemTable"
      :selected-variant="$store.state.appConfig.layout.skin === 'dark' ? 'active' : 'primary'"
      sticky-header
      :per-page="perPage"
      :current-page="currentPage"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      data-boundary="window"
      style="max-height: 450px"
      :filter="filter"
      :filter-included-fields="filterOn"
      :fields="itemField"
    >
      <template #cell(id)="data">
        <p>{{ data.index + 1 }}</p>
      </template>

      <template #cell(info)="data">
        <ol>
          <li
            v-for="sup in data.item.supplier "
            :key="sup.id"
          >
            Name: {{ sup.sup.name }} , Amount:  {{ sup.ammount }}$
          </li>
        </ol>
      </template>

      <template #cell(cad)="data">
        <h4>{{ data }}</h4>
      </template>

      <template #cell(edit)="row">
        <b-button
          size="sm"
          class="mr-2"
          block
          variant="success"
          @click="editItem(row)"
        >
          Edit
        </b-button>
      </template>
    </b-table>
    <p>
      <span class="text-muted ml-2 mr-4">Total Cadaster: {{ itemTable.length }}</span>
    </p>

    <b-row
      class="m-1"
      align-h="between"
    >
      <b-col
        cols="3"
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
    <b-row
      align-h="between"
      class="m-1"
    >

      <b-col
        cols="6"
        md="auto"
      >
        <b-row>
          <b-col
            cols="2"
            md="auto"
          >
            <b-button
              variant="success"
              block
              @click="sideSup"
            >
              <b-icon
                icon="truck"
                class="mr-1"
              />
              Suppliers
            </b-button>
          </b-col>
          <!--<b-col
            cols="2"
            md="auto"
          >

            <b-button
              variant="warning"
              block
              @click="sideDon"
            >
              <b-icon
                icon="truck"
                class="mr-1"
              />
              Donors
            </b-button>
          </b-col>-->
        </b-row>
      </b-col>
    </b-row>
  </b-card>
</template>
<script>
import { takeState } from 'vuex-dot'

export default {
  data() {
    return {
      totalRows: null,
    }
  },
  computed: {
    show: takeState('listPMSetPrj', 'show').commit('listPMSetPrj/SET_SHOW').map(),
    perPage: takeState('listPMSetPrj', 'perPage').commit('listPMSetPrj/SET_PER_PAGE').map(),
    pageOptions: takeState('listPMSetPrj', 'pageOptions').map(),
    currentPage: takeState('listPMSetPrj', 'currentPage').commit('listPMSetPrj/SET_CUR_PAGE').map(),
    sortBy: takeState('listPMSetPrj', 'sortBy').commit('listPMSetPrj/SET_SORT_BY').map(),
    sortDesc: takeState('listPMSetPrj', 'sortDesc').commit('listPMSetPrj/SET_SORT_DESC').map(),
    sortDirection: takeState('listPMSetPrj', 'sortDirection').commit('listPMSetPrj/SET_SORT_DIR').map(),
    filter: takeState('listPMSetPrj', 'filter').commit('listPMSetPrj/SET_FILTER').map(),
    filterOn: takeState('listPMSetPrj', 'filterOn').commit('listPMSetPrj/SET_FILTER_ON').map(),
    supL: takeState('listPMSetPrj', 'itemsSUP').map(),
    itemField: takeState('listPMSetPrj', 'itemField').map(),
    items: takeState('listPMSetPrj', 'items').map(),

    sortOptions() {
      // Create an options list from our fields
      return this.itemField
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
    supList() {
      const ls = this.supL.filter(e => e.active === 1)
      return ls
    },
    isAssignSidebarActive: takeState('listPMSetPrj', 'isAssignSidebarActive').commit('listPMSetPrj/SET_ASS_TO').map(),
    isAssignSidebarActiveDon: takeState('listPMSetPrj', 'isAssignSidebarActiveDon').commit('listPMSetPrj/SET_ASS_TO_DON').map(),

    showModalIss: takeState('listPMSetPrj', 'showModalIss').commit('listPMSetPrj/SET_MOD_SUP_ISS').map(),

    itemTable() {
      /* const gov = this.items.filter(itemgov => (this.governorate == null ? itemgov : itemgov.governorate_id === this.governorate.value))
        const dis = gov.filter(itemdis => (this.district == null ? itemdis : itemdis.district_id === this.district.value))
        const st = dis.filter(itemtype => (this.type == null ? itemtype : itemtype.st_id === this.type.value))
        const cd = st.filter(itemcad => (this.cadaster == null ? itemcad : itemcad.cadastre_id === this.cadaster.value))
        const iss = cd.filter(itemiss => (this.iss == null ? itemiss : itemiss.is_id === this.iss.value)) */
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
    onRowSelected(items) {
      this.selectedCase = items
    },
    sideSup() {
      this.isAssignSidebarActive = true
    },
    sideDon() {
      this.isAssignSidebarActiveDon = true
    },
    editItem(row) {
      const rw = JSON.parse(JSON.stringify(row))
      this.showModalIss = {
        active: true,
        row: { ...rw },
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
