<template>
  <b-card no-body>
    <b-card-body>
      <div class="d-flex justify-content-between flex-wrap">
        <!-- sorting  -->
        <b-form-group
          label="Sort"
          label-size="sm"
          label-align-sm="left"
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
            <!-- Refresh
            <b-button
              variant="primary"
              size="sm"
              class="ml-2"
              @click="$parent.$parent.ResetData()"
            >
              <b-icon icon="arrow-repeat" />
            </b-button> -->
          </b-input-group>
        </b-form-group>

        <!-- filter -->
        <b-form-group
          label="Filter"
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
        sticky-header
        responsive
        :no-border-collapse="false"
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
        primary-key="p_code"
        :filter="filter"
        :filter-included-fields="filterOn"
        @row-dblclicked="Edit"
      >
        <template #table-busy>
          <div class="text-center text-primary my-2">
            <b-spinner class="align-middle" />
            <strong>Loading...</strong>
          </div>
        </template>
        <!-- Column: Actions -->
        <template #cell(edit)="data">
          <b-button
            variant="info"
            block
            @click="Edit(data.item)"
          >
            <feather-icon icon="EditIcon" />
            <span>Edit</span>
          </b-button>

        </template>
        <!-- Column: Actions -->
        <template #cell(rdms)="data">

          <b-button
            variant="warning"
            block
            :disabled="data.item.needs_updt !==1"
            @click="ToRDMS(data.item)"
          >

            <span>Dispatch To RDMS</span>
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
    </b-card-body>
    <b-row
      class="m-1"
      align-h="between"
    >
      <b-col
        sm="12"
        md="6"
        lg="3"
        xl="3"
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
        sm="12"
        md="6"
        lg="3"
        xl="3"
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

export default {
  data() {
    return {
      totalRows: null,
    }
  },
  computed: {
    show: takeState('dataCollectList', 'show').commit('dataCollectList/SET_SHOW').map(),
    perPage: takeState('dataCollectList', 'perPage').commit('dataCollectList/SET_PER_PAGE').map(),
    pageOptions: takeState('dataCollectList', 'pageOptions').map(),
    currentPage: takeState('dataCollectList', 'currentPage').commit('dataCollectList/SET_CUR_PAGE').map(),
    sortBy: takeState('dataCollectList', 'sortBy').commit('dataCollectList/SET_SORT_BY').map(),
    sortDesc: takeState('dataCollectList', 'sortDesc').commit('dataCollectList/SET_SORT_DESC').map(),
    sortDirection: takeState('dataCollectList', 'sortDirection').commit('dataCollectList/SET_SORT_DIR').map(),
    filter: takeState('dataCollectList', 'filter').commit('dataCollectList/SET_FILTER').map(),
    filterOn: takeState('dataCollectList', 'filterOn').commit('dataCollectList/SET_FILTER_ON').map(),
    itemField: takeState('dataCollectList', 'itemsField').map(),
    items: takeState('dataCollectList', 'items').map(),

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
    ToRDMS(items) {
      console.log('items')
      console.log(items)
      this.$store.dispatch('dataCollectList/ToRDMS', {
        items,
      })
    },
    Edit(items) {
      console.log('items')
      console.log(items)
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
          text: items.is_name,
        },
      )
      this.$router.replace({
        name: 'DataCollection',
        params: {
          action: 'read',
          breadcrumb: nav,
          active: true,
          prefix: this.$route.params.prefixPrj,
          prefixRole: this.$route.params.prefixRole,
          assmnttype: this.$route.params.assmnttype,
          edit: true,
          title: 'Data Collection',
          resource: 'MRGSRI',
          value: items,
        },
      })
    },

  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
.medium {
  min-width: 150px;
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
