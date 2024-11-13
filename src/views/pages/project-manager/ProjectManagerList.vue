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
              @click="$emit('refresh')"
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
      :selected-variant="
        $store.state.appConfig.layout.skin === 'dark' ? 'active' : 'primary'
      "
      :per-page="perPage"
      :current-page="currentPage"
      :items="itemTable"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      show-empty
      empty-text="No matching records found"
      primary-key="id"
      :filter="filter"
      :filter-included-fields="filterOn"
      @row-dblclicked="onRowSelected"
      @filtered="onFiltered"
    >
      <template #cell(proj_name)="data">
        <b-media vertical-align="center">
          <template #aside>
            <b-avatar
              size="40"
              :variant="`light-${data.item.variant}`"
            >
              <feather-icon
                class="d-flex align-items-center"
                :icon="data.item.icon == null ? 'GlobeIcon' : data.item.icon"
                size="24"
              />
            </b-avatar>
          </template>
          <b-link class="font-weight-bold d-block text-nowrap">
            {{ data.item.proj_name }}
          </b-link>
          <small class="text-muted">{{ data.item.proj_prefix }}</small>
        </b-media>
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
          <b-dropdown-item @click="RouteAOI(data.item)">
            <feather-icon icon="MapIcon" />
            <span class="align-middle ml-50">AOI</span>
          </b-dropdown-item>

          <b-dropdown-item
            v-if="data.item.pm_settings == 1"
            @click="RoutePM(data.item)"
          >
            <feather-icon icon="BookIcon" />
            <span class="align-middle ml-50">PM Setting</span>
          </b-dropdown-item>
          <b-dropdown-item @click="RouteSetting(data.item)">
            <feather-icon icon="SettingsIcon" />
            <span class="align-middle ml-50">Setting</span>
          </b-dropdown-item>
          <b-dropdown-item @click="RouteView(data.item)">
            <feather-icon icon="FileTextIcon" />
            <span class="align-middle ml-50">View</span>
          </b-dropdown-item>
          <b-dropdown-item @click="RouteEdit(data.item)">
            <feather-icon icon="EditIcon" />
            <span class="align-middle ml-50">Roles</span>
          </b-dropdown-item>

          <b-dropdown-item @click="RouteSearch(data.item)">
            <feather-icon icon="SearchIcon" />
            <span class="align-middle ml-50">Search</span>
          </b-dropdown-item>
        </b-dropdown>
      </template>
      <template #table-caption>
        <div>
          <span class="text-muted ml-2 mr-4">
            Total Cases: {{ totalRows }}
          </span>
        </div>
      </template>
      <!-- Column: User -->
      <template #cell(proj_status_name)="data">
        <b-badge
          pill
          :variant="data.item.variant"
        >
          {{ data.item.proj_status_name }}
        </b-badge>
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
      <template #row-details="row">
        <b-card>
          <b-row>
            <b-col
              sm="3"
              class="text-sm-right"
            >
              <b>Description:</b>
            </b-col>
            <b-col>
              <p style="white-space: pre">
                {{ row.item.description }}
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
    show: takeState('listOrgPrj', 'show').commit('listOrgPrj/SET_SHOW').map(),
    // Table Data
    items: takeState('listOrgPrj', 'projectItem')
      .commit('listOrgPrj/SET_ITEM')
      .map(),
    fields: takeState('listOrgPrj', 'projectField')
      .commit('listOrgPrj/SET_FIELD')
      .map(),
    // Table Option
    perPage: takeState('listOrgPrj', 'perPage')
      .commit('listOrgPrj/SET_PER_PAGE')
      .map(),
    pageOptions: takeState('listOrgPrj', 'pageOptions').map(),
    currentPage: takeState('listOrgPrj', 'currentPage')
      .commit('listOrgPrj/SET_CUR_PAGE')
      .map(),
    sortBy: takeState('listOrgPrj', 'sortBy')
      .commit('listOrgPrj/SET_SORT_BY')
      .map(),
    sortDesc: takeState('listOrgPrj', 'sortDesc')
      .commit('listOrgPrj/SET_SORT_DESC')
      .map(),
    sortDirection: takeState('listOrgPrj', 'sortDirection')
      .commit('listOrgPrj/SET_SORT_DIR')
      .map(),
    filter: takeState('listOrgPrj', 'filter')
      .commit('listOrgPrj/SET_FILTER')
      .map(),
    filterOn: takeState('listOrgPrj', 'filterOn')
      .commit('listOrgPrj/SET_FILTER_ON')
      .map(),

    sortOptions() {
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
    itemTable() {
      const jb = this
        .items /* .filter(item => (this.job == null ? item : item.job_title === this.job.value))
      const st = jb.filter(item => (this.status == null ? item : item.user_status === this.status.value))
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.totalRows = st.length */
      return jb
    },
    ShortName(firstName, lastName) {
      if (firstName == null || lastName == null) {
        return 'US'
      }
      return `${firstName.charAt(0)}${lastName.charAt(0)}`
    },
  },
  mounted() {
    this.totalRows = this.itemTable.length
  },
  methods: {
    Image(avatar, genderId) {
      if (avatar == null) {
        if (genderId === 2) {
          // eslint-disable-next-line global-require
          return require('@/assets/images/avatars/avatar-man-small.png')
        }
        if (genderId === 3) {
          // eslint-disable-next-line global-require
          return require('@/assets/images/avatars/avatar-woman-small.png')
        }
        // eslint-disable-next-line global-require
        return null
      }
      return avatar
    },
    RouteSearch(items) {
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
          text: `${items.proj_name}`,
        },
      )
      this.$store.commit('listOrgPrj/CLEAR_MARKER_ITEM')
      this.$router.replace({
        name: 'menuSearch',
        params: {
          action: 'read',
          breadcrumb: nav,
          active: true,
          prefix: this.$route.params.prefixPrj,
          prefixRole: this.$route.params.prefixRole,
          title: 'Project Search',
          resource: 'PRJKTS',
          value: items,
        },
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
          text: `${items.proj_name}`,
        },
      )
      this.$router.replace({
        name: 'menuViews',
        params: {
          action: 'read',
          breadcrumb: nav,
          active: true,
          prefix: this.$route.params.prefixPrj,
          prefixRole: this.$route.params.prefixRole,
          title: 'Project View',
          resource: 'PRJKTS',
          value: items,
        },
      })
    },
    RouteSetting(items) {
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
          text: `${items.proj_name}`,
        },
      )
      this.$router.replace({
        name: 'menuSetting',
        params: {
          action: 'read',
          breadcrumb: nav,
          active: true,
          prefix: this.$route.params.prefixPrj,
          prefixRole: this.$route.params.prefixRole,
          title: 'Project Setting',
          resource: 'PRJKTS',
          value: items,
        },
      })
    },
    RouteAOI(items) {
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
          text: `${items.proj_name}`,
        },
      )
      this.$router.replace({
        name: 'menuAOI',
        params: {
          action: 'read',
          breadcrumb: nav,
          active: true,
          prefix: this.$route.params.prefixPrj,
          prefixRole: this.$route.params.prefixRole,
          title: 'Project Area of Interventio',
          resource: 'PRJKTS',
          value: items,
        },
      })
    },
    RoutePM(items) {
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
          text: `${items.proj_name}`,
        },
      )
      this.$router.replace({
        name: 'menuPM',
        params: {
          action: 'read',
          breadcrumb: nav,
          active: true,
          prefix: this.$route.params.prefixPrj,
          prefixRole: this.$route.params.prefixRole,
          title: 'Project PM Setting',
          resource: 'PRJKTS',
          value: items,
        },
      })
    },
    RouteEdit(items) {
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
          text: `${items.proj_name}`,
        },
      )
      console.log(items.referal_entity === 1)
      this.$router.replace({
        name: 'menuEdit',
        params: {
          action: 'read',
          breadcrumb: nav,
          active: true,
          prefix: this.$route.params.prefixPrj,
          prefixRole: this.$route.params.prefixRole,
          title: 'Project EDIT',
          resource: 'PRJKTS',
          entity: items.referal_entity === 1,
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
