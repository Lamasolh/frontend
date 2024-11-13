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
            <b-button
              v-show="$can('read','ADUSR')"
              variant="success"
              size="sm"
              class="ml-1"
              @click="RouteAdd()"
            >
              Create User
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
      :selected-variant="$store.state.appConfig.layout.skin === 'dark'?'active':'primary'"
      :per-page="perPage"
      :current-page="currentPage"
      :items="itemTable"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      show-empty
      :filter-ignored-fields="['userLogo','avatar']"
      empty-text="No matching records found"
      primary-key="id"
      :filter="filter"
      :filter-included-fields="filterOn"
      @row-dblclicked="onRowSelected"
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
      <template #cell(name)="data">
        <b-media vertical-align="center">
          <template #aside>
            <b-avatar
              size="32"
              :text="ShortName"
              :variant="`light-${data.item.variant}`"
              :src="Image(data.item.avatar,data.item.gender)"
            />
          </template>
          <b-link
            class="font-weight-bold d-block text-nowrap"
          >
            {{ data.item.first_name }} {{ data.item.last_name }}
          </b-link>
          <small class="text-muted">@{{ data.item.user_name }}</small>
        </b-media>
      </template>

      <template #cell(usr_stat_name)="data">
        <b-badge
          pill
          :variant="data.item.variant"
        >
          {{
            data.item.usr_stat_name
          }}
        </b-badge>
      </template>
      <template #cell(show_details)="row">
        <b-button
          size="sm"
          class="mr-2"
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
              <b>Gender:</b>
            </b-col>
            <b-col>
              <p style="white-space: pre">
                {{ row.item.gender_name }}
              </p>
            </b-col>
          </b-row>
          <b-row>
            <b-col
              sm="3"
              class="text-sm-right"
            >
              <b>Address:</b>
            </b-col>
            <b-col>
              <p style="white-space: pre">
                {{ row.item.address }}
              </p>
            </b-col>
          </b-row>
          <b-row>
            <b-col
              sm="3"
              class="text-sm-right"
            >
              <b>Bio:</b>
            </b-col>
            <b-col>
              <p style="white-space: pre">
                {{ row.item.bio==null ?'Nothing':row.item.bio }}
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
    job: takeState('listUser', 'job').commit('listUser/SET_JOB').map(),
    status: takeState('listUser', 'status').map(),
    show: takeState('listUser', 'show').commit('listUser/SET_SHOW').map(),
    // Table Data
    items: takeState('listUser', 'userItem').commit('listUser/SET_ITEM').map(),
    fields: takeState('listUser', 'userField').commit('listUser/SET_FIELD').map(),
    // Table Option
    perPage: takeState('listUser', 'perPage').commit('listUser/SET_PER_PAGE').map(),
    pageOptions: takeState('listUser', 'pageOptions').map(),
    currentPage: takeState('listUser', 'currentPage').commit('listUser/SET_CUR_PAGE').map(),
    sortBy: takeState('listUser', 'sortBy').commit('listUser/SET_SORT_BY').map(),
    sortDesc: takeState('listUser', 'sortDesc').commit('listUser/SET_SORT_DESC').map(),
    sortDirection: takeState('listUser', 'sortDirection').commit('listUser/SET_SORT_DIR').map(),
    filter: takeState('listUser', 'filter').commit('listUser/SET_FILTER').map(),
    filterOn: takeState('listUser', 'filterOn').commit('listUser/SET_FILTER_ON').map(),

    sortOptions() {
      return this.fields.filter(f => f.sortable).map(f => ({ text: f.label, value: f.key }))
    },
    itemTable() {
      const jb = this.items.filter(item => (this.job == null ? item : item.job_title === this.job.value))
      const st = jb.filter(item => (this.status == null ? item : item.user_status === this.status.value))
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.totalRows = st.length
      return st
    },
    ShortName(firstName, lastName) {
      if (firstName == null || lastName == null) { return 'US' }
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
        } if (genderId === 3) {
          // eslint-disable-next-line global-require
          return require('@/assets/images/avatars/avatar-woman-small.png')
        }
        // eslint-disable-next-line global-require
        return null
      }
      return avatar
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
          text: `${items.first_name} ${items.last_name}`,
        },
      )
      if (this.$can('read', 'USRLST')) {
        this.$router.replace({
          name: 'menuViews',
          params: {
            action: 'read',
            breadcrumb: nav,
            active: true,
            prefix: this.$route.params.prefixPrj,
            prefixRole: this.$route.params.prefixRole,
            title: 'User Edit',
            resource: 'USRLST',
            value: items,
          },
        })
      } else {
        this.$swal({
          title: 'Error!',
          text: 'You dont have a permission',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
      }
    },
    RouteAdd(items) {
      console.log(this.$store.getters['nav/navList'])
      const nav = []
      nav.push(
        {
          active: false,
          to: 'https://w3schools.com/',
          href: 'https://w3schools.com/',
          text: 'User Manager',
        },
        {
          active: true,
          text: 'Add User',
        },
      )
      if (this.$can('read', 'ADUSR')) {
        this.$router.replace({
          name: 'menu',
          params: {
            action: 'read',
            breadcrumb: nav,
            active: true,
            prefix: 'USRMG',
            prefixRole: 'ADUSR',
            title: 'Add User',
            resource: 'ADUSR',
            value: items,
          },
        })
      } else {
        this.$swal({
          title: 'Error!',
          text: 'You dont have a permission',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
      }
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
