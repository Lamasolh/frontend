<template>
  <b-card>
    <b-table
      v-if="filteredItems && filteredItems.length > 0"
      ref="selectableTable"
      striped
      hover
      small
      bordered
      :items="filteredItems"
      :fields="fields"
      show-empty
      empty-text="No matching records found"
      primary-key="drm_org_id"
      :current-page="currentPage"
      :per-page="perPage"
      :total-rows="totalRows"
      @filtered="onFiltered"
    >

      <template #cell(is_id)="row">
        <div ref="GSPLTADV">
          <!-- <b-overlay rounded="lg" :show="show"> -->
          <b-row align-h="start">
            <b-col cols="12">
              <!-- Button to toggle sidebar visibility -->
              <b-button
                block
                variant="info"
                @click="toggleSidebar(row)"
              >
                Editt
              </b-button>
            </b-col>
          </b-row>

          <!-- </b-overlay> -->
        </div>
      </template>
    </b-table>
    <div>
      <span class="text-muted ml-2 mr-4"> Total Cases: {{ totalRows }} </span>
    </div>

    <!-- Pagination Controls -->
    <b-row align-h="between">
      <b-col cols="3">
        <!-- Page length selector -->
        <b-form-group
          label="Per Page"
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
        offset-md="3"
        align="right"
        style="margin-top: 24px"
      >
        <!-- Pagination navigation -->
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          @change="onPageChange"
        >
          <template #prev-text>
            <feather-icon
              icon="ChevronLeftIcon"
              size="16"
            />
          </template>
          <template #next-text>
            <feather-icon
              icon="ChevronRightIcon"
              size="16"
            />
          </template>
        </b-pagination>
      </b-col>
    </b-row>
    <div ref="GSPLTADV">
      <!-- <b-overlay rounded="lg" :show="show"> -->
      <b-row align-h="start">
        <b-col cols="2">
          <!-- Button to toggle sidebar visibility -->
          <b-button
            block
            variant="info"
            @click="showFilterCreate"
          >
            Create Site
          </b-button>
        </b-col>
      </b-row>
      <ReferralSide :is-add-new-user-sidebar-create-active.sync="showFilterCreate" />
      <!-- </b-overlay> -->
    </div>
  </b-card>
</template>

<script>
import { takeState } from 'vuex-dot'
import { mapState } from 'vuex'
import ReferralSide from './Add/ReferralSide.vue'

export default {
  components: {
    ReferralSide,
  },

  data() {
    return {
      showFilter: false,
      searchQuery: '',
      fields: [
        { key: 'p_code', label: 'Code', sortable: true },
        { key: 'is_name_ar', label: 'Arabic Name', sortable: true },
        { key: 'is_name', label: 'Settlement', sortable: true },
        { key: 'is_id', label: 'Actions', sortable: true },
      ],
    }
  },
  computed: {
    showFilterCreate: takeState('drmSecGeo', 'showFilterCreate').map(),
    show: takeState('drmSecGeo', 'show').commit('drmSecGeo/SET_SHOW').map(),
    itemTable() {
      console.log(`la${this.caseItem}`)
      return this.caseItem
    },
    cadaster: takeState('drmSecGeo', 'cadaster').map(),
    district: takeState('drmSecGeo', 'district').map(),
    governorate: takeState('drmSecGeo', 'governorate').map(),
    filteredItems() {
      if (!this.searchQuery) return this.caseItem
      return this.caseItem.filter(
        item => item.p_code.toLowerCase().includes(this.searchQuery.toLowerCase())
                    || item.is_name_ar
                      .toLowerCase()
                      .includes(this.searchQuery.toLowerCase())
                    || item.is_name.toLowerCase().includes(this.searchQuery.toLowerCase()),
      )
    },
    ...mapState('drmSecGeo', {
      caseItem: state => (state.caseItem ? state.caseItem.data : []),
      perPage: state => state.perPage,
      currentPage: state => state.currentPage,
      totalRows: state => state.totalRows,
      pageOptions: state => state.pageOptions,
      caseField: state => state.caseField,
      sortBy: state => state.sortBy,
      sortDesc: state => state.sortDesc,
      filter: state => state.filter,
    }),
  },

  methods: {
    toggleSidebar() {
      // this.showFilter = !this.showFilter // Ensures sidebar toggles only once
    },

    onPageChange(page) {
      this.currentPage = page
    },
    onFilterChange() {
      this.currentPage = 1
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },

    ResetData() {
      this.$store.dispatch('drmSecGeo/SET_ITEM', {
        prefix: this.$route.params.prefixPrj,
        prefixRole: this.$route.params.prefixRole,
      })
    },

  },
}

</script>
