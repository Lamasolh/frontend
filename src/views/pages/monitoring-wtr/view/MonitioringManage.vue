<template>
  <div>
    <b-row>
      <!-- context -->
      <vue-context ref="menu">
        <li>
          <b-link
            v-for="data in menuData"
            :key="data.text"
            class="d-flex align-items-center"
            @click="optionClicked(data.text,data.icon,data.item,data.variant,data.type)"
          >
            <feather-icon
              :icon="data.icon"
              size="16"
            />
            <span class="ml-75">{{ data.text }}</span>
          </b-link>
        </li>
      </vue-context>
      <edit-case v-if="showEdit" />

      <b-col cols="12">
        <b-overlay
          rounded="lg"
          :show="show"
        >
          <b-card>
            <b-row>
              <b-col cols="4">
                <p>
                  <b>P-Code:</b> <b class="text-danger">{{ $route.params.value.p_code }}</b>
                </p>

                <p>
                  <b>Iss Name:</b>  <b>{{ $route.params.value.is_name }}</b>
                </p>
                <p>
                  <b>Donor:</b><b class="text-primary">{{ $route.params.value.org_prefix }}</b>
                </p>
                <p>
                  <b>Quota C/D:</b><b>{{ $route.params.value.qouta_cd }}</b>
                </p>

              </b-col>
              <b-col cols="4">
                <p>
                  <b>Cycle Staus:</b>
                  <b-badge
                    pill
                    :variant="$store.getters['monitoringViewWtr/CaseStatusOptions'].filter(
                      (it) => it.value === $route.params.value.cycle_status
                    )[0].variant"
                  >
                    {{
                      $store.getters['monitoringViewWtr/CaseStatusOptions'].filter(
                        (it) => it.value ===$route.params.value.cycle_status
                      )[0].title
                    }}
                  </b-badge>
                </p>
                <p>
                  <b>CycleType:</b>
                  <b-badge
                    pill
                    :variant="$store.getters['monitoringwtr/CycleTypeOptions'].filter(
                      (it) => it.value === $route.params.value.cycle_type
                    )[0].variant"
                  >
                    {{
                      $store.getters['monitoringwtr/CycleTypeOptions'].filter(
                        (it) => it.value ===$route.params.value.cycle_type
                      )[0].title
                    }}
                  </b-badge>
                </p>
                <p>
                  <b>Created Date:</b> <b class="text-primary">{{ $route.params.value.created_date }}</b>
                </p>
                <p>
                  <b>Assign By:</b><b>{{ $route.params.value.assigned_by_name }}</b>
                </p>
              </b-col>
              <b-col cols="4">
                <p>
                  <b>Monitoring Status:</b>
                  <b-badge
                    pill
                    :variant="$store.getters['monitoringViewWtr/MonitoringStatusOptions'].filter(
                      (it) => it.value === $route.params.value.monitoring_status
                    )[0].variant"
                  >
                    {{
                      $store.getters['monitoringViewWtr/MonitoringStatusOptions'].filter(
                        (it) => it.value ===$route.params.value.monitoring_status
                      )[0].title
                    }}
                  </b-badge>
                </p>
                <p>
                  <b>Supplier:</b> <b>{{ $route.params.value.supp_name }}</b>
                </p>
                <p>
                  <b>Deadline:</b> <b>{{ $route.params.value.cycle_deadline }}</b>
                </p>
                <p>
                  <b>PD Number:</b> <b>{{ $route.params.value.pd }}</b>
                </p>
              </b-col>
            </b-row>
            <b-row v-if="$route.params.value.monitoring_status ===2 || ($route.params.value.approved ==1 && $route.params.value.monitoring_status ===4)">
              <b-col cols="4">
                <p>
                  <b>Approved By:</b><b>{{ $route.params.value.approved_by_name }}</b>
                </p>

              </b-col>
              <b-col cols="4">

                <p>
                  <b>Approved Date:</b><b>{{ $route.params.value.approve_date }}</b>
                </p>
              </b-col>

              <b-col cols="4">
                <p>
                  <b> Approved Note:</b> <b>{{ $route.params.value.approval_notes }}</b>
                </p>
              </b-col>

            </b-row>
            <b-row v-else-if="$route.params.value.monitoring_status ===3|| ($route.params.value.approved ==0 && $route.params.value.monitoring_status ===4)">
              <b-col cols="4">
                <p>
                  <b>Terminated By:</b><b>{{ $route.params.value.approved_by_name }}</b>
                </p>

              </b-col>
              <b-col cols="4">

                <p>
                  <b>Terminated Date:</b><b>{{ $route.params.value.approve_date }}</b>
                </p>
              </b-col>

              <b-col cols="4">
                <p>
                  <b>Terminated Note:</b> <b>{{ $route.params.value.approval_notes }}</b>
                </p>
              </b-col>

            </b-row>
            <b-row v-if="$route.params.value.monitoring_status ===4">
              <b-col cols="4">
                <p>
                  <b>Publish By:</b><b>{{ $route.params.value.published_by_name }}</b>
                </p>

              </b-col>
              <b-col cols="4">

                <p>
                  <b>Publish Date:</b><b>{{ $route.params.value.published_date }}</b>
                </p>
              </b-col>

              <b-col cols="4">
                <p>
                  <b> Publish Note:</b> <b>{{ $route.params.value.published_notes }}</b>
                </p>
              </b-col>

            </b-row>
            <b-row v-if="$route.params.value.downloaded_by_name !=null">
              <b-col cols="4">
                <p>
                  <b>Downloaded Date:</b><b>{{ $route.params.value.downloaded_by_name }}</b>
                </p>
              </b-col>
              <b-col cols="4">
                <p>
                  <b>Downloaded Date:</b><b>{{ $route.params.value.downloaded_date }}</b>
                </p>
              </b-col>
              <b-col cols="4">
                <b-button
                  block
                  variant="danger"
                  @click="Unlock"
                >
                  Unlock Download
                </b-button>
              </b-col>
            </b-row>

          </b-card>
          <b-card>
            <div>
              <b-tabs
                content-class="mt-3"
                pills
                @activate-tab="ChangeTab"
              >

                <b-tab
                  title="Tents"
                  :active="tab ===0"
                >
                  <b-row>
                    <b-col cols="4">
                      <p>
                        <b>Quantity Needed:</b><b>{{ $route.params.value.quantity_needed }}</b>
                      </p>
                    </b-col>
                    <b-col cols="4">
                      <p>
                        <b>Quantity Filled:</b><b>{{ $route.params.value.quantity_filled }}</b>
                      </p>
                    </b-col>
                    <b-col cols="4">
                      <p>
                        <b>Quantity Verified:</b><b>{{ $route.params.value.quantity_varified }}</b>
                      </p>
                    </b-col>
                    <b-col cols="4">
                      <p>
                        <b>Quantity Deffrence:</b><b>{{ $route.params.value.deffrnc }}</b>
                      </p>
                    </b-col>
                    <b-col cols="4">
                      <p>
                        <b>  Total Tents:</b><b>{{ totalTentRows }}</b>
                      </p>
                    </b-col>
                    <b-col cols="4">
                      <!-- filter -->
                      <b-form-group
                        label="Filter"
                        label-cols-sm="2"
                        label-align-sm="left"
                        label-size="sm"
                        label-for="filterInput"
                        class="mt-2"
                      >
                        <b-input-group
                          size="sm"
                        >
                          <b-form-input
                            id="filterInput"
                            v-model="filterTent"
                            type="search"
                            placeholder="Type to Search"
                          />
                          <b-input-group-append>
                            <b-button
                              :disabled="!filterTent"
                              @click="filterTent = ''"
                            >
                              Clear
                            </b-button>

                          </b-input-group-append>
                        </b-input-group>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-table
                    ref="selectableTableTent"
                    hover
                    :busy="show"
                    responsive
                    bordered
                    :items="tentItem"
                    :fields="tentField"
                    sticky-header
                    style="max-height: 500px;"
                    :selected-variant="$store.state.appConfig.layout.skin === 'dark'? 'active': 'primary'"
                    show-empty
                    empty-text="No matching records found"
                    primary-key="id"
                    :filter="filterTent"
                    :filter-included-fields="filterOnTent"
                    @filtered="onFilteredTent"
                    @row-dblclicked=" RowClickedTent"
                  >
                    <template #table-busy>
                      <div class="text-center text-primary my-2">
                        <b-spinner class="align-middle" />
                        <strong>Loading...</strong>
                      </div>
                    </template>
                    <template #cell(index)="data">
                      {{ data.index +1 }}
                    </template>
                    <template #cell(manual)="data">

                      <b-badge
                        v-if="(data.item.line_status==='Done' && (data.value ==='' || data.value==null ))?true:
                          data.value ===''? false: data.value===1?true:true"
                        pill
                        :variant=" (data.item.line_status==='Done' && (data.value ==='' || data.value==null ))?'success':
                          data.value ===''? '': data.value===1?'success':'danger'"
                      >
                        {{
                          (data.item.line_status==='Done' && (data.value ==='' || data.value==null ))?'Yes':
                          data.value ===''? '': data.value===1?'Yes':'No'
                        }}

                      </b-badge>

                    </template>

                    <template #cell(round_status)="data">
                      <b-badge
                        pill
                        :variant=" $store.getters['monitoringViewWtr/CycleStatusOptions'].filter(
                          it => it.value === data.value
                        )[0].variant"
                      >
                        {{
                          $store.getters['monitoringViewWtr/CycleStatusOptions'].filter(
                            it => it.value === data.value
                          )[0].title
                        }}
                      </b-badge>

                    </template>
                    <template #cell(line_status)="data">
                      <b-badge
                        pill
                        :variant=" $store.getters['monitoringViewWtr/CaseStatusOptions'].filter(
                          it => it.title === data.value
                        )[0].variant"
                      >
                        {{
                          data.value
                        }}

                      </b-badge>
                    </template>
                    <template #cell(notes)="row">
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
                        <b-row align-h="end">
                          <b-col
                            cols="4"
                            class="text-sm-right"
                          >
                            <b>Note:</b>
                          </b-col>
                          <b-col cols="4">
                            <p style="white-space: pre;">
                              {{ row.item.notes }}
                            </p>
                          </b-col>
                        </b-row>
                      </b-card>
                    </template>
                  </b-table>
                </b-tab>
                <b-tab
                  title="Rounds"
                  :active="tab ===1"
                >
                  <b-row>
                    <b-col
                      cols="8"
                    >
                      Total Rounds:  {{ totalRows }}
                      <br>
                      Total Quantity Filled:  {{ totalQuantityFilled.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} L
                    </b-col>
                    <b-col cols="4">
                      <!-- filter -->
                      <b-form-group
                        label="Filter"
                        label-cols-sm="2"
                        label-align-sm="left"
                        label-size="sm"
                        label-for="filterInput"
                        class="mt-2"
                      >
                        <b-input-group
                          size="sm"
                        >
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
                    </b-col>
                  </b-row>
                  <b-table
                    ref="selectableTable"
                    hover
                    :busy="show"
                    responsive
                    bordered
                    :items="caseItem"
                    :fields="caseField"
                    sticky-header
                    style="max-height: 500px;"
                    :selected-variant="$store.state.appConfig.layout.skin === 'dark'? 'active': 'primary'"
                    show-empty
                    empty-text="No matching records found"
                    primary-key="id"
                    :filter="filter"
                    :filter-included-fields="filterOn"
                    @filtered="onFiltered"
                    @row-dblclicked=" RowClicked"
                  >
                    <template #table-busy>
                      <div class="text-center text-primary my-2">
                        <b-spinner class="align-middle" />
                        <strong>Loading...</strong>
                      </div>
                    </template>
                    <template #cell(index)="data">
                      {{ data.index +1 }}
                    </template>
                    <template #cell(manual)="data">

                      <b-badge
                        v-if="(data.item.line_status==='Done' && (data.value ==='' || data.value==null ))?true:
                          data.value ===''? false: data.value===1?true:true"
                        pill
                        :variant=" (data.item.line_status==='Done' && (data.value ==='' || data.value==null ))?'success':
                          data.value ===''? '': data.value===1?'success':'danger'"
                      >
                        {{
                          (data.item.line_status==='Done' && (data.value ==='' || data.value==null ))?'Yes':
                          data.value ===''? '': data.value===1?'Yes':'No'
                        }}

                      </b-badge>

                    </template>

                    <template #cell(round_status)="data">
                      <b-badge
                        pill
                        :variant=" $store.getters['monitoringViewWtr/CycleStatusOptions'].filter(
                          it => it.value === data.value
                        )[0].variant"
                      >
                        {{
                          $store.getters['monitoringViewWtr/CycleStatusOptions'].filter(
                            it => it.value === data.value
                          )[0].title
                        }}
                      </b-badge>

                    </template>
                    <template #cell(line_status)="data">
                      <b-badge
                        pill
                        :variant=" $store.getters['monitoringViewWtr/CaseStatusOptions'].filter(
                          it => it.title === data.value
                        )[0].variant"
                      >
                        {{
                          data.value
                        }}

                      </b-badge>
                    </template>
                    <template #cell(notes)="row">
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
                        <b-row align-h="end">
                          <b-col
                            cols="4"
                            class="text-sm-right"
                          >
                            <b>Note:</b>
                          </b-col>
                          <b-col cols="4">
                            <p style="white-space: pre;">
                              {{ row.item.notes }}
                            </p>
                          </b-col>
                        </b-row>
                      </b-card>
                    </template>
                  </b-table>
                </b-tab>
              </b-tabs>
            </div>

          </b-card>
          <b-card>
            <b
              v-if="$route.params.value.monitoring_status ===1"
              class="text-danger"
            > Note:</b>

            <b
              v-else
              class="text-danger"
            > Publish Note :</b>
            <b-textarea
              v-model="note"
              rows="3"
              :readonly="$route.params.value.monitoring_status ===4? true :false"
              max-rows="6"
            />
            <br>
            <b-row>
              <b-col cols="2">
                <b-button
                  variant="info"
                  block
                  :disabled="$route.params.value.cycle_status === 2 ||
                    ($route.params.value.monitoring_status === 1 &&
                      caseItem.length >0 ?false :true)"
                  @click="approve"
                >
                  <feather-icon
                    icon="CheckIcon"
                  />
                  Approve
                </b-button>
              </b-col>
              <b-col cols="2">
                <b-button
                  variant="danger"
                  block
                  :disabled=" caseItem.length>0|| $route.params.value.monitoring_status !==1?true :false"
                  @click="terminate"
                >
                  <feather-icon
                    icon="XIcon"
                  />
                  Terminate
                </b-button>
              </b-col>
              <b-col cols="2">
                <b-button
                  variant="success"
                  block
                  :disabled="$route.params.value.monitoring_status ===2
                    ||
                    $route.params.value.monitoring_status ===3? false:true"
                  @click="publish"
                >
                  <feather-icon
                    icon="ShareIcon"
                  />
                  Publish
                </b-button>

              </b-col>
            </b-row>
          </b-card>
        </b-overlay>
      </b-col>
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import Ripple from 'vue-ripple-directive'
import { takeState } from 'vuex-dot'
// eslint-disable-next-line import/order
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
// eslint-disable-next-line import/order
import VueContext from 'vue-context'
import EditCase from './EditCase.vue'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    VueContext,
    EditCase,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      menuData: [],
      totalRows: 0,
      totalQuantityFilled: 0,

      totalTentRows: 0,
    }
  },
  computed: {
    show: takeState('monitoringViewWtr', 'show').map(),
    note: takeState('monitoringViewWtr', 'note').commit('monitoringViewWtr/SET_NOTE').map(),
    caseItem: takeState('monitoringViewWtr', 'caseItem').map(),
    caseField: takeState('monitoringViewWtr', 'caseField').map(),

    tentItem: takeState('monitoringViewWtr', 'tentItem').map(),
    tentField: takeState('monitoringViewWtr', 'tentField').map(),

    tab: takeState('monitoringViewWtr', 'tab').commit('monitoringViewWtr/SET_TAB').map(),

    showEdit: takeState('monitoringViewWtr', 'showEdit').commit('monitoringViewWtr/SET_SHOW_EDIT').map(),
    editItem: takeState('monitoringViewWtr', 'editItem').commit('monitoringViewWtr/SET_EDIT_ITEM').map(),
    currentPage: takeState('monitoringViewWtr', 'currentPage').commit('monitoringViewWtr/SET_CUR_PAGE').map(),

    filter: takeState('monitoringViewWtr', 'filter').commit('monitoringViewWtr/SET_FILTER').map(),
    filterOn: takeState('monitoringViewWtr', 'filterOn').commit('monitoringViewWtr/SET_FILTER_ON').map(),

    filterTent: takeState('monitoringViewWtr', 'filterTent').commit('monitoringViewWtr/SET_FILTER_TNT').map(),
    filterOnTent: takeState('monitoringViewWtr', 'filterOnTent').commit('monitoringViewWtr/SET_FILTER_ON_TNT').map(),
  },
  mounted() {
    this.totalRows = this.caseItem.length
    this.totalTentRows = this.tentItem.length

    this.totalQuantityFilled = this.caseItem.map(e => e.quantity_filled).reduce((a, b) => a + b, 0)
    this.Refresh()
  },
  methods: {
    RowClicked(row) {
      console.log(row)
      this.filter = row.code
    },
    RowClickedTent(row) {
      this.filter = row.code
      this.tab = 1
    },
    optionClicked(text, icon, item, variant, type) {
      console.log(item, type)
      if (type === 1) {
        console.log('11')
        this.editItem = item
        this.showEdit = true
      }
    },
    onFiltered(item, ind) {
      this.totalRows = ind
      this.totalQuantityFilled = item.map(e => e.quantity_filled).reduce((a, b) => a + b, 0)
      this.currentPage = 1
    },
    onFilteredTent(item, ind) {
      this.totalTentRows = ind
    },
    /* RightClick(item, index, event) {
      console.log(item, index, event)
      const str = item.line_status.toString()
      switch (str) {
        case 'Done':
          if (this.$route.params.value.status_info === 'Verified') {
            event.preventDefault()
          } else {
            this.menuData = [
              {
                icon: 'EditIcon', text: `Edit (${item.tnt_code})`, variant: 'primary', item, type: 1,
              },
            ]
            event.preventDefault()
            this.$refs.menu.open(event, { index, item })
          }

          break
        default:

          event.preventDefault()
      }
    }, */
    ChangeTab(val) {
      console.log(val)
      this.tab = val
    },
    Refresh() {
      this.$store.dispatch('monitoringViewWtr/GET_DATA_VIEW', {
        wtt_id: this.$route.params.value.cycle_id,
        issId: this.$route.params.value.iss_id,
        prefix: this.$route.params.prefixPrj,
        prefixRole: this.$route.params.prefixRole,
      })
    },
    approve() {
      this.$store.dispatch('monitoringViewWtr/APP_TER_PUB', {
        cycleId: this.$route.params.value.cycle_id,
        type: 2,
        prefix: this.$route.params.prefixPrj,
        prefixRole: this.$route.params.prefixRole,
      }).then(res => {
        console.log('res', res.res)
        console.log('res', res.data)
        console.log('res', res.res[0])
        console.log('res', res.res[0].result)
        if (res.res[0].result === 1) {
          this.$route.params.value.monitoring_status = 2
          this.$route.params.value.approved = 1
          this.$route.params.value.approved_by_name = res.data.name
          this.$route.params.value.approve_date = res.data.date
          this.$route.params.value.approval_notes = res.data.note
          this.$swal({
            icon: 'success',
            title: 'Done!',
            text: 'The Cycle hase been Approved!',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          })
        } else {
          this.$swal({
            icon: 'error',
            title: 'Failed!',
            text: 'Contact System administrator!',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          })
        }
      }).catch(error => {
        console.log(error)
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Operation Failed ',
            icon: 'EditIcon',
            variant: 'danger',
          },
        })
      })
    },
    Unlock() {
      this.$store.dispatch('monitoringViewWtr/UNLOCK', {
        cycleId: this.$route.params.value.cycle_id,
        type: 1,
        prefix: this.$route.params.prefixPrj,
        prefixRole: this.$route.params.prefixRole,
      }).then(res => {
        console.log('res', res)
        if (res.res[0].result === 1) {
          this.$route.params.value.downloaded_by_name = null
          this.$route.params.value.downloaded_date = null
          this.$swal({
            icon: 'success',
            title: 'Done!',
            text: 'The Cycle hase been unlocked!',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          })
        } else {
          this.$swal({
            icon: 'error',
            title: 'Failed!',
            text: 'Contact System administrator!',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          })
        }
      }).catch(error => {
        console.log(error)
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Operation Failed ',
            icon: 'EditIcon',
            variant: 'danger',
          },
        })
      })
    },
    terminate() {
      this.$store.dispatch('monitoringViewWtr/APP_TER_PUB', {
        cycleId: this.$route.params.value.cycle_id,
        type: 1,
        prefix: this.$route.params.prefixPrj,
        prefixRole: this.$route.params.prefixRole,
      }).then(res => {
        console.log('res', res)
        if (res.res[0].result === 1) {
          this.$route.params.value.monitoring_status = 3
          this.$route.params.value.approved = 0
          this.$route.params.value.approved_by_name = res.data.name
          this.$route.params.value.approve_date = res.data.date
          this.$route.params.value.approval_notes = res.data.note
          this.$swal({
            icon: 'success',
            title: 'Done!',
            text: 'The Cycle hase been Terminated!',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          })
        } else {
          this.$swal({
            icon: 'error',
            title: 'Failed!',
            text: 'Contact System administrator!',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          })
        }
      }).catch(error => {
        console.log(error)
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Operation Failed ',
            icon: 'EditIcon',
            variant: 'danger',
          },
        })
      })
    },
    publish() {
      this.$store.dispatch('monitoringViewWtr/APP_TER_PUB', {
        cycleId: this.$route.params.value.cycle_id,
        type: 3,
        prefix: this.$route.params.prefixPrj,
        prefixRole: this.$route.params.prefixRole,
      }).then(res => {
        console.log('res', res)
        if (res.res[0].result === 1) {
          this.$route.params.value.monitoring_status = 4

          this.$route.params.value.published_by_name = res.data.name
          this.$route.params.value.published_date = res.data.date
          this.$route.params.value.published_notes = res.data.note

          this.$swal({
            icon: 'success',
            title: 'Done!',
            text: 'The Cycle hase been Published!',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          })
        } else {
          this.$swal({
            icon: 'error',
            title: 'Failed!',
            text: 'Contact System administrator!',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          })
        }
      }).catch(error => {
        console.log(error)
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Operation Failed ',
            icon: 'EditIcon',
            variant: 'danger',
          },
        })
      })
    },
    Finish() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Attention',
          icon: 'EditIcon',
          text: 'This Page is for view Only',
          variant: 'warning',
        },
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-wizard.scss';
@import '@core/scss/vue/libs/vue-select.scss';
.sticky-top { top: 0.8em; }
</style>
