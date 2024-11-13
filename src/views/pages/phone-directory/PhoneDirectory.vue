<template>
  <div :ref="$route.params.resource">
    <b-overlay
      rounded="lg"
      :show="show"
    >
      <b-card
        ref="filter"
        no-body
      >
        <PhoneFilter />
      </b-card>
      <!-- Table Container Card -->
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
          :selected-variant="$store.state.appConfig.layout.skin === 'dark'?'active':'primary'"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          show-empty
          empty-text="No matching records found"
          primary-key="id"
          :filter="filter"
          :filter-included-fields="filterOn"
          @filtered="onFiltered"
        >
          <template #table-caption>
            <div>
              <span class="text-muted ml-2 mr-4">
                Total Cases: {{ totalRows }}
              </span>
            </div>
          </template>
          <!-- Column: User -->
          <template #cell(org)="data">
            <b-media vertical-align="center">
              <template #aside>
                <b-avatar
                  size="32"
                  :src="data.item.org_logo"
                  :text="avatarText(data.item.org_name)"
                  :variant="`light-${resolveVariant(data.item.org_type)}`"
                />
              </template>
              <b-link
                class="font-weight-bold d-block text-nowrap"
              >
                {{ data.item.org_name }}
              </b-link>
              <small class="text-muted">@{{ data.item.org_prefix }}</small>
            </b-media>
          </template>

          <template #cell(org_type)="data">
            {{ getType(data.item.org_type) }}
          </template>
          <template #cell(cad_id)="data">
            {{ getCad(data.item.cad_id) }}
          </template>
          <template #cell(show_details)="row">
            <b-button
              size="sm"
              class="mr-2"
              block
              variant="primary"
              @click="row.toggleDetails"
            >
              {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
            </b-button>
          </template>
          <!-- Column: Actions -->
          <template #cell(actions)="data">
            <b-dropdown
              variant="link"
              no-caret
              :right="$store.state.appConfig.isRTL"
            >

              <template #button-content>
                <feather-icon
                  icon="MoreVerticalIcon"
                  size="16"
                  class="align-middle text-body"
                />
              </template>
              <b-dropdown-item :to="{ name: 'menuViews', params: { id: data ,is: 'view'} }">
                <feather-icon icon="FileTextIcon" />
                <span class="align-middle ml-50">Details</span>
              </b-dropdown-item>

              <b-dropdown-item :to="{ name: 'menuEdit', params: { id: data,is: 'edit'} }">
                <feather-icon icon="EditIcon" />
                <span class="align-middle ml-50">Edit</span>
              </b-dropdown-item>

              <b-dropdown-item>
                <feather-icon icon="TrashIcon" />
                <span class="align-middle ml-50">Delete</span>
              </b-dropdown-item>
            </b-dropdown>
          </template>
          <!-- Column: Status -->
          <template #cell(org_status)="data">
            <b-badge
              pill
              :variant="`light-${resolveStatusVariant(data.item.org_status)}`"
              class="text-capitalize"
            >
              {{ getStatus(data.item.org_status) }}
            </b-badge>
          </template>

          <template #row-details="row">
            <b-card>
              <b-row>
                <b-col
                  sm="3"
                  class="text-sm-right"
                >
                  <b>Contact Details:</b>
                </b-col>
                <b-col>
                  <p style="white-space: pre">
                    Contact name: {{ row.item.org_contact_name }}
                    Phone: {{ row.item.org_phone }}
                    Website: {{ row.item.org_webiste != null ?row.item.org_webiste: 'Nothing' }}
                  </p>
                </b-col>
              </b-row>
              <b-row>
                <b-col
                  sm="3"
                  class="text-sm-right"
                >
                  <b>More Details:</b>
                </b-col>
                <b-col>
                  <p style="white-space: pre">
                    Display Name: {{ row.item.org_disp_name }}
                    Address: {{ row.item.address }}
                    Comment: {{ row.item.org_commen != null ?row.item.org_commen: 'Nothing' }}
                    Description: {{ row.item.org_descr != null ?row.item.org_descr: 'Nothing' }}
                  </p>
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
    </b-overlay>
  </div>
</template>

<script>
import { takeState } from 'vuex-dot'
import PhoneFilter from './PhoneDirectoryFilter.vue'
/* eslint-disable no-nested-ternary */
/* eslint-disable vue/no-unused-vars */

export default {
  components: {
    PhoneFilter,
    // eslint-disable-next-line vue/no-unused-components
  },
  data() {
    return {
      totalRows: null,
    }
  },
  computed: {
    show: takeState('directory', 'show').commit('followUp/SET_SHOW').map(),
    // Filter
    orgStatusOptions: takeState('global', 'org_status').map(),
    orgTypeOptions: takeState('global', 'org_type').map(),
    municipalityOptions: takeState('global', 'municipality').map(),
    orgstatus: takeState('directory', 'orgStatus').map(),
    district: takeState('directory', 'district').commit('directory/SET_DIS').map(),
    municipality: takeState('directory', 'municipality').commit('directory/SET_MUN').map(),
    // Table Data
    items: takeState('directory', 'orgList').commit('directory/SET_ITEM').map(),
    fields: takeState('directory', 'orgField').commit('directory/SET_FIELD').map(),
    // Table Option
    perPage: takeState('directory', 'perPage').commit('directory/SET_PER_PAGE').map(),
    pageOptions: takeState('directory', 'pageOptions').map(),
    currentPage: takeState('directory', 'currentPage').commit('directory/SET_CUR_PAGE').map(),
    sortBy: takeState('directory', 'sortBy').commit('directory/SET_SORT_BY').map(),
    sortDesc: takeState('directory', 'sortDesc').commit('directory/SET_SORT_DESC').map(),
    sortDirection: takeState('directory', 'sortDirection').commit('directory/SET_SORT_DIR').map(),
    filter: takeState('directory', 'filter').commit('directory/SET_FILTER').map(),
    filterOn: takeState('directory', 'filterOn').commit('directory/SET_FILTER_ON').map(),
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
    itemTable() {
      const st = this.items.filter(item => (this.orgstatus == null
        ? true
        : (this.orgstatus.value === item.org_status)))
      this.items.filter(item => console.log(item.org_status))
      const cd = st.filter(itemcad => (this.municipality == null
        ? itemcad
        : itemcad.cad_id === this.municipality.value))
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.totalRows = cd.length
      return cd
    },

  },
  mounted() {
    this.refresh()
  },
  methods: {
    getStatus(st) {
      return this.orgStatusOptions.filter(item => item.value === st)[0].title
    },
    getType(ty) {
      return this.orgTypeOptions.filter(item => item.value === ty)[0].title
    },
    getCad(cad) {
      return this.municipalityOptions.filter(item => item.value === cad)[0].title
    },
    avatarText(value) {
      if (!value) return ''
      const nameArray = value.split(' ')
      return nameArray.map(word => word.charAt(0).toUpperCase()).join('')
    },
    resolveVariant(type) {
      if (type === 1) return 'primary'
      if (type === 2) return 'warning'
      if (type === 3) return 'success'
      if (type === 4) return 'info'
      if (type === 5) return 'danger'
      return 'primary'
    },
    resolveStatusVariant(type) {
      if (type === 1) return 'warning'
      if (type === 2) return 'success'
      if (type === 3) return 'primary'
      if (type === 4) return 'danger'
      if (type === 5) return 'info'
      return 'primary'
    },
    refresh() {
    // Set the initial number of items
      this.$store.dispatch('directory/GET_DATA', {
        prefix: this.$route.params.prefixPrj,
        prefixRole: this.$route.params.prefixRole,
      })
      this.totalRows = this.itemTable.length
    },
    onFiltered(_, ind) {
      this.totalRows = ind
      this.currentPage = 1
    },
  },
}
</script>
