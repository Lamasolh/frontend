<template>
  <div>
    <!-- Search Filter -->
    <b-card
      ref="filter"
      no-body
    >
      <ProjectFilter />
    </b-card>
    <b-card>
      <!-- Table with pagination -->
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
        <!-- <template>

                        <TaskManagerProject :edit_id="row.item.is_id" />

                    </template> -->

        <!-- Scoped slot for 'is_id' column to include the button -->
        <template #cell(is_id)="row">
          <!-- <TaskManagerProjectEdit :edit_id="row.item.is_id" /> -->
          <div ref="GSPLTADV">
            <b-overlay
              rounded="lg"
              :show="show"
            >
              <!-- <wtr-list /> -->
              <b-row align-h="start">
                <b-col cols="12">
                  <b-button
                    block
                    variant="info"
                    @click="showFilter = true"
                  >
                    Edit
                  </b-button>
                </b-col>
              </b-row>
              <ReferralSideEdit
                :is-edit-user-sidebar-active.sync="showFilter"
              />
            </b-overlay>
          </div>

          <!-- <b-button @click="handleActionClick(row.item.is_id)" size="sm" variant="primary"> -->
          <!-- Edit -->
          <!-- </b-button> -->
        </template>
      </b-table>

      <!-- <wtr-list /> -->

      <!-- <b-button block variant="info" @click="handleButtonClick(row.item.is_id)" size="sm">
                    Edit
                </b-button> -->

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
      <!-- <b-button v-b-toggle.sidebar-right>Add Project</b-button> -->
      <div ref="GSPLTADV">
        <b-overlay
          rounded="lg"
          :show="show"
        >
          <!-- <wtr-list /> -->
          <b-row align-h="start">
            <b-col cols="2">
              <b-button
                block
                variant="info"
                @click="showFilter = true"
              >
                Create Project
              </b-button>
            </b-col>
          </b-row>
          <ReferralSide :is-add-new-user-sidebar-active.sync="showFilter" />
        </b-overlay>
      </div>
      <!-- <TaskManagerProject /> -->
    </b-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import { takeState } from 'vuex-dot'
import Ripple from 'vue-ripple-directive'
// eslint-disable-next-line no-unused-vars
import moment from 'moment'

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import TaskManagerProject from './Add/TaskManagerProject.vue'
import TaskManagerProjectEdit from './Add/TaskManagerProjectEdit.vue'

import ProjectFilter from './Filter/ProjectFilter.vue'
import ReferralSideEdit from './Add/ReferralSideEdit.vue'
import ReferralSide from './Add/ReferralSide.vue'

export default {
  components: {
    TaskManagerProject,
    TaskManagerProjectEdit,
    ReferralSideEdit,
    ProjectFilter,
    ReferralSide,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      show: false, // Control for b-overlay visibility if needed
      currentPage: 1, // Local data for pagination
      perPage: 10, // Default items per page
      totalRows: 0, // Total number of rows for pagination
      searchQuery: '', // Search query for filtering
    }
  },

  computed: {
    //
    districtSelect() {
      return this.districtOptions.filter(
        item => item.params
          === (this.governorate != null ? this.governorate.value : null),
      )
    },
    pcode: takeState('drmNGOSup', 'pcode').commit('drmNGOSup/SET_PCODE').map(),

    noidp: takeState('drmNGOSup', 'noidp').commit('drmNGOSup/SET_NOIDP').map(),
    capacity: takeState('drmNGOSup', 'capacity')
      .commit('drmNGOSup/SET_CAP')
      .map(),
    unit: takeState('drmNGOSup', 'unit').commit('drmNGOSup/SET_UNIT').map(),
    units: takeState('drmNGOSup', 'units').map(),
    deadline: takeState('drmNGOSup', 'deadline')
      .commit('drmNGOSup/SET_DEADLINE')
      .map(),
    duration: takeState('drmNGOSup', 'duration')
      .commit('drmNGOSup/SET_DUR')
      .map(),
    amount: takeState('drmNGOSup', 'amount')
      .commit('drmNGOSup/SET_AMOUNT')
      .map(),
    focal_point: takeState('drmNGOSup', 'focal_point')
      .commit('drmNGOSup/SET_FC')
      .map(),
    focal_point_ph: takeState('drmNGOSup', 'focal_point_ph')
      .commit('drmNGOSup/SET_FC_PH')
      .map(),
    quota: takeState('drmNGOSup', 'quota').commit('drmNGOSup/SET_QOTA').map(),
    status: takeState('drmNGOSup', 'status')
      .commit('drmNGOSup/SET_STATUS')
      .map(),

    qtyNeeded: takeState('drmNGOSup', 'qtyNeeded')
      .commit('drmNGOSup/SET_QTY_ND')
      .map(),

    qty_perDay: takeState('drmNGOSup', 'qty_perDay')
      .commit('drmNGOSup/SET_PER_DAY')
      .map(),

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

    fields() {
      return [
        { key: 'p_code', label: 'Code', sortable: true },
        { key: 'is_name_ar', label: 'Arabic Name', sortable: true },
        { key: 'is_name', label: 'Settlement', sortable: true },
        { key: 'is_id', label: 'Actions', sortable: true },
      ]
    },

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

    items() {
      return this.filteredItems // Use filtered items directly
    },
  },

  methods: {
    handleButtonClick(id) {
      // First, handle showing the filter
      this.showEditProject = true

      // Then, handle the action with the ID
      this.handleActionClick(id)
    },
    handleActionClick(id) {
      // This is the method that will be called when the button is clicked.
      console.log('Button clicked for id:', id)
      // You can perform any action here, such as calling an API, redirecting, etc.
      // Example: this.sendIdToServer(id);
    },
    clearAll() {
      this.referral = null
      this.governorate = null
      this.district = null
      this.type = null
      this.cadaster = null
      this.iss = null
      this.awareness = null
      this.monitoring = null
      this.feedback = null
      this.dlv_status = null
      //
      this.perPage = 10
      this.sortBy = ''
      this.sortDesc = false
      this.sortDirection = 'asc'
      this.filter = null
      this.filterOn = []
    },
    ChangeNI() {
      this.qty_perDay = this.noidp == null || this.quota == null ? 0 : this.quota * this.noidp
      // this.duration = Math.ceil(this.qty_perDay === 0 || this.capacity == null ? 0 : (this.capacity / this.qty_perDay))
      this.qtyNeeded = this.duration * this.qty_perDay
      this.deadline = moment().add(this.duration, 'days').format('YYYY-MM-DD')
      console.log(this.duration)
    },
    ChangeDR() {
      this.qty_perDay = this.noidp == null || this.quota == null ? 0 : this.quota * this.noidp
      // this.duration = Math.ceil(this.qty_perDay === 0 || this.capacity == null ? 0 : (this.capacity / this.qty_perDay))
      this.qtyNeeded = this.duration * this.qty_perDay
      this.deadline = moment().add(this.duration, 'days').format('YYYY-MM-DD')
      console.log(this.duration)
    },
    ChangeCap() {
      this.qty_perDay = this.noidp == null || this.quota == null ? 0 : this.quota * this.noidp
      // this.duration = Math.ceil(this.qty_perDay === 0 || this.capacity == null ? 0 : (this.capacity / this.qty_perDay))
      this.deadline = moment().add(this.duration, 'days').format('YYYY-MM-DD')
      this.qtyNeeded = this.duration * this.qty_perDay
      console.log(this.capacity, this.qty_perDay)
      console.log(this.capacity / this.qty_perDay)
    },
    ChangeQota() {
      this.qty_perDay = this.noidp == null || this.quota == null ? 0 : this.quota * this.noidp
      // this.duration = Math.ceil(this.qty_perDay === 0 || this.capacity == null ? 0 : (this.capacity / this.qty_perDay))
      this.deadline = moment().add(this.duration, 'days').format('YYYY-MM-DD')
      this.qtyNeeded = this.duration * this.qty_perDay
      console.log(moment())
      console.log(this.qty_perDay)
      console.log(this.deadline)
    },
    SearchPCode() {
      if (this.pcode != null) {
        this.$store
          .dispatch('drmNGOSup/SRCH_PCODE', {
            prefix: this.$route.params.prefixPrj,
            prefixRole: this.$route.params.prefixRole,
          })
          .then(res => {
            console.log(res)
            if (res === 1) {
              this.status = 'Running'
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Operation Completed',
                  icon: 'EditIcon',
                  variant: 'success',
                },
              })
            } else {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Operation Failed',
                  icon: 'EditIcon',
                  variant: 'warning',
                },
              })
            }
          })
          .catch(e => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: e.toString(),
                icon: 'EditIcon',
                variant: 'danger',
              },
            })
          })
      } else {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Please Enter The P-Code',
            icon: 'EditIcon',
            variant: 'danger',
          },
        })
      }
    },
    ...mapActions('drmSecGeo', ['GET_DATA']),

    loadData() {
      this.GET_DATA({ prefix: 'DRM', type: 'school' })
        .then(() => {
          if (this.caseItem && Array.isArray(this.caseItem)) {
            this.totalRows = this.caseItem.length // Update totalRows based on caseItem length
          } else {
            console.error('No data found in caseItem', this.caseItem)
          }
        })
        .catch(error => {
          console.error('Failed to load data:', error)
        })
    },
    ResetData() {
      this.$store.dispatch('drmNGOSup/GET_DATA', {
        prefix: this.$route.params.prefixPrj,
        prefixRole: this.$route.params.prefixRole,
      })
    },
    onPageChange(page) {
      this.currentPage = page // Update current page
    },

    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length // Update totalRows when filtered
      this.currentPage = 1 // Reset to first page after filtering
    },

    onFilterChange() {
      this.currentPage = 1 // Reset page to 1 when filter changes
    },

    selectAllRows() {
      // Logic to select all rows
    },

    clearSelected() {
      // Logic to unselect rows
    },
    ChangeDistrict(value) {
      if (value != null) {
        this.$store.dispatch('drmNGOSup/GET_CAD')
      } else {
        this.cadOptions = []
      }
    },
    ChangeType(value) {
      if (value != null) {
        if (this.district != null) {
          this.$store.dispatch('drmNGOSup/GET_CAD')
        }
      } else {
        this.cadOptions = []
      }
    },
    ChangeCAD(value) {
      if (value != null) {
        this.$store.dispatch('drmNGOSup/GET_ISS')
      }
    },
  },

  mounted() {
    this.loadData()
  },
}
</script>
