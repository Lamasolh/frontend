<template>
  <b-card
    ref="CAST"
    title="Case Row"
    no-body
  >
    <b-card-body>
      <div class="d-flex justify-content-between  flex-wrap">

        <!-- sorting  -->
        <b-form-group
          label="Sort"
          label-size="sm"
          label-align-sm="left"
          label-cols-sm="2"
          label-for="sortBySelect"
          class="mr-1 mb-md-0"
        >
          <b-input-group
            size="sm"
          >
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
              @click=" $parent.$parent.ResetData()"
            >
              <b-icon
                icon="arrow-repeat"
              />
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
      :busy="show"
      selectable
      select-mode="multi"
      small
      bordered
      :per-page="perPage"
      :current-page="currentPage"
      :items="itemTable"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      :selected-variant="$store.state.appConfig.layout.skin === 'dark'?'active':'primary'"
      show-empty
      empty-text="No matching records found"
      primary-key="id"
      :filter="filter"
      :filter-included-fields="filterOn"
      @row-selected="onRowSelected"
      @filtered="onFiltered"
    >
      <template #table-busy>
        <div class="text-center text-primary my-2">
          <b-spinner class="align-middle" />
          <strong>Loading...</strong>
        </div>
      </template>
      <template #table-caption>
        <div>
          <span class="text-muted ml-2 mr-4">
            Total Cases: {{ totalRows }}
          </span>
          <span class="text-muted">
            Selected Rows:{{ selectedCase.length }}
          </span>
        </div>
      </template>

      <template #cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <span aria-hidden="true"><b>&check;</b></span>
          <span class="sr-only">Selected</span>
        </template>
        <template v-else>
          <span aria-hidden="true">&nbsp;</span>
          <span class="sr-only">Not selected</span>
        </template>
      </template>
      <template #cell(priority_level)="data">
        <b-badge
          pill
          :variant="$store.getters['global/priority'].filter(it => it.value === data.value)[0].variant"
        >
          {{ $store.getters['global/priority'].filter(it => it.value === data.value)[0].title }}
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
          <b-row class="mb-2">
            <b-col
              sm="3"
              class="text-sm-right"
            >
              <b>Current Status:</b>
            </b-col>
            <b-col>
              <p
                style="white-space: pre;"
              >{{ row.item.current_status }}</p>
            </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col
              sm="3"
              class="text-sm-right"
            >
              <b>Address Details:</b>
            </b-col>
            <b-col>
              <p style="white-space: pre;">
                Cadaster: {{ row.item.cadastre_name }}</p>
              <p style="white-space: pre;">
                Settlement type: {{ row.item.stal_name }}</p>
              <p style="white-space: pre;">
                Settlement name: {{ row.item.is_name == null?'None': row.item.is_name }}</p>
            </b-col>
          </b-row>
        </b-card>
      </template>
    </b-table>
    <b-row
      class="m-1"
      align-h="between"
    >
      <b-col cols="2">
        <!-- page length -->
        <b-form-group
          label="Per Page"
          label-cols="8"
          label-align="left"
          class="text-nowrap"
        >
          <b-form-select
            id="perPageSelect"
            v-model="perPage"
            :options="pageOptions"
          />
          <b-button
            variant="primary"
            @click="selectAllRows"
          >
            Select all
          </b-button>
          <b-button
            variant="primary"
            @click="clearSelected"
          >
            Clear selected
          </b-button>
        </b-form-group>

      </b-col>

      <b-col
        cols="auto"
        offset-md="4"
        align="right"
        style="margin-top: 16px;"
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
      align-h="end"
      class="m-1"
    >
      <b-col
        cols="12"
        md="auto"
      >
        <!-- Assign to Org -->
        <b-button
          variant="info"
          @click="AssignToOrg"
        >
          <b-icon
            icon="arrow-up-right-circle"
            class="mr-1"
          />
          Refer To Organization
        </b-button>
        <!-- Assign to link -->
        <b-button
          v-show="$route.params.prefixPrj != 'CLRA'"
          variant="warning"
          @click="AssignToLink"
        >
          <b-icon
            icon="chat-right"
            class="mr-1"
          />
          Assign To Link
        </b-button>
        <!-- Assign -->
        <b-button
          variant="primary"
          @click="isAssignSidebarActive = true"
        >
          <b-icon
            icon="person"
            class="mr-1"
          />
          Assign To User
        </b-button>
      </b-col>
    </b-row>
    <ReferModal />
  </b-card>
</template>

<script>
import store from '@/store'
import { takeState } from 'vuex-dot'
import moment from 'moment'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import ReferModal from './CaseAssModalRefer.vue'

export default {
  components: {
    ReferModal,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  data() {
    return {
      totalRows: null,
    }
  },
  computed: {
    referral: takeState('caseAssignment', 'referral').commit('caseAssignment/SET_REF').map(),
    governorate: takeState('caseAssignment', 'governorate').commit('caseAssignment/SET_GOV').map(),
    district: takeState('caseAssignment', 'district').commit('caseAssignment/SET_DIS').map(),
    cadaster: takeState('caseAssignment', 'cadaster').commit('caseAssignment/SET_CAD').map(),
    type: takeState('caseAssignment', 'type').commit('caseAssignment/SET_TYPE').map(),
    iss: takeState('caseAssignment', 'iss').commit('caseAssignment/SET_ISS').map(),
    rangeDate: takeState('caseAssignment', 'rangedate').commit('caseAssignment/SET_RANG_DAT').map(),
    show: takeState('caseAssignment', 'show').commit('caseAssignment/SET_SHOW').map(),
    // Table Data
    items: takeState('caseAssignment', 'caseItem').commit('caseAssignment/SET_ITEM').map(),
    fields: takeState('caseAssignment', 'caseField').commit('caseAssignment/SET_FIELD').map(),
    // Table Option
    perPage: takeState('caseAssignment', 'perPage').commit('caseAssignment/SET_PER_PAGE').map(),
    pageOptions: takeState('caseAssignment', 'pageOptions').map(),
    currentPage: takeState('caseAssignment', 'currentPage').commit('caseAssignment/SET_CUR_PAGE').map(),
    sortBy: takeState('caseAssignment', 'sortBy').commit('caseAssignment/SET_SORT_BY').map(),
    sortDesc: takeState('caseAssignment', 'sortDesc').commit('caseAssignment/SET_SORT_DESC').map(),
    sortDirection: takeState('caseAssignment', 'sortDirection').commit('caseAssignment/SET_SORT_DIR').map(),
    filter: takeState('caseAssignment', 'filter').commit('caseAssignment/SET_FILTER').map(),
    filterOn: takeState('caseAssignment', 'filterOn').commit('caseAssignment/SET_FILTER_ON').map(),
    selectedCase: takeState('caseAssignment', 'selectedCase').commit('caseAssignment/SET_SELECT_ITEM').map(),
    showModalRef: takeState('caseAssignment', 'showModalRef').commit('caseAssignment/SET_SHOW_REF').map(),

    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
    isAssignSidebarActive: {
      get() {
        return store.getters['caseAssignment/isAssignSidebarActive']
      },
      set(value) {
        return this.$store.commit('caseAssignment/SET_ASS_TO', value)
      },
    },
    itemTable() {
      const rf = this.items.filter(item => (this.referral == null ? item : item.referral_id === this.referral.value))
      const frm = moment(this.rangeDate == null ? null : this.rangeDate.split('to')[0])
      const to = moment(this.rangeDate == null ? null : this.rangeDate.split('to')[1])
      const rg = rf.filter(item => {
        if (!frm.isValid() || !to.isValid()) { return true }
        return moment(item.referral_date).isBetween(frm, to)
      })
      const gov = rg.filter(itemgov => (this.governorate == null ? itemgov : itemgov.governorate_id === this.governorate.value))
      const dis = gov.filter(itemdis => (this.district == null ? itemdis : itemdis.district_id === this.district.value))
      const st = dis.filter(itemtype => (this.type == null ? itemtype : itemtype.st_id === this.type.value))
      const cd = st.filter(itemcad => (this.cadaster == null ? itemcad : itemcad.cadastre_id === this.cadaster.value))
      const iss = cd.filter(itemiss => (this.iss == null ? itemiss : itemiss.is_id === this.iss.value))
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.totalRows = iss.length
      return iss
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
    selectAllRows() {
      this.$refs.selectableTable.selectAllRows()
    },
    clearSelected() {
      this.$refs.selectableTable.clearSelected()
    },
    onFiltered(_, ind) {
      this.totalRows = ind
      this.currentPage = 1
    },
    AssignToLink() {
      /// /////////  send to link code ////////////////////////////

      if (this.selectedCase.length === 0) {
        this.$swal({
          title: 'Attention!',
          text: 'Please select cases!',
          icon: 'warning',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
      } else {
        /// ////////////////selcetion is done ////////////////////////////////
        this.$swal({
          title: 'Are you sure you want to send auto assessment-link to the selected cases!?',
          text: 'Action',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes!',
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ml-1',
          },
          buttonsStyling: false,
        }).then(result => {
          if (result.value) {
            /// ////////////////send link is confirmed ////////////////////////////////
            this.show = true
            store.dispatch('caseAssignment/SEND_TO_LINK', {
              prefix: this.$route.params.prefixPrj,
              prefixRole: this.$route.params.prefixRole,
              type: this.$route.params.assmnttype,
            }).then(resu => {
              const res = resu.result
              console.log('after dispatch', res[0][1].name)
              let resData = ''
              for (let i = 0; i < res.length; i += 1) {
                if (res[i][0].result === 1) {
                  resData += `<b>Case: ${res[i][1].name}, Code:${res[i][1].code}:</b></br> Link sent Successfully</br></br>`
                } else if (res[i][0].result === 2) {
                  resData += `<b>Case: ${res[i][1].name}, Code:${res[i][1].code}:</b></br> is duplicated </br></br>`
                } else {
                  resData += `<b>Case: ${res[i][1].name}, Code:${res[i][1].coode}:</b></br> Please call system administrator</br></br>`
                }
              }
              this.isAssignSidebarActive = false
              this.$swal({
                title: 'Result!',
                html: resData,
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              })
            }).catch(err => {
              console.log(err)
              this.show = false
              this.$swal({
                title: 'Attention!',
                text: 'Please check intenrnet and try again!',
                icon: 'warning',
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              })
            })
          /// ///////////// send link comfirm end code ////////////
          } else {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Sending auto assessment-link is cancelled!',
                icon: 'EditIcon',
                variant: 'info',
              },
            })
          }
        })
        /// /////////// selecyion is done end code //////////////
      }
      /// /////////////////////send to link end code///////////////////////////
    },
    AssignToOrg() {
      if (this.selectedCase.length === 0) {
        this.$swal({
          title: 'Attention!',
          text: 'Please select cases!',
          icon: 'warning',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
      } else {
        console.log(this.selectedCase)
        this.showModalRef = {
          active: true,
        }
      }
    },
  },
}
</script>
