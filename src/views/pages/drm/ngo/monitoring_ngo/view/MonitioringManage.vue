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
                  <b>Cycle Staus:</b> <b class="text-primary">{{ $route.params.value.stats }}</b>
                </p>
                <p>
                  <b>Created Date:</b> <b class="text-primary">{{ $route.params.value.cycle_date }}</b>
                </p>
                <p>
                  <b>Assign By:</b><b>{{ $route.params.value.assigned_by_name }}</b>
                </p>
              </b-col>
              <b-col cols="4">
                <p>
                  <b>Supplier:</b> <b>{{ $route.params.value.supp_nm }}</b>
                </p>
                <p>
                  <b>Deadline:</b> <b>{{ $route.params.value.cycle_deadline }}</b>
                </p>
                <p>
                  <b>PD Number:</b> <b>{{ $route.params.value.pd_code }}</b>
                </p>
              </b-col>
            </b-row>
            <b-row v-if="$route.params.value.monitoring_status ===2 || ($route.params.value.approved ==1 && $route.params.value.monitoring_status ===4)">
              <b-col cols="4">
                <p>
                  <b>Approved By:</b><b>{{ $route.params.value.aprvd__nm }}</b>
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
              <b-row>
                <b-col
                  cols="8"
                >
                  Total Rounds:  {{ totalRows }}
                  <br>
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
                show-empty
                empty-text="No matching records found"
                primary-key="id"
                :filter="filter"
                :filter-included-fields="filterOn"
                @filtered="onFiltered"
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

                <template #cell(location)="data">
                  <b class="text-warning"><a
                    target="_blank"
                    :href="'https://maps.google.com/?q='+data.item.tsk_lat +','+data.item. tsk_lng"
                  > {{ data.item.tsk_lat }},{{ data.item. tsk_lng }}</a></b>
                </template>

                <template #cell(signature)="data">
                  <img
                    :src="'data:image/png;base64,'+data.item.verification_signiture"
                    height="100px"
                    width="100px"
                  >
                </template>
              </b-table>
            </div>
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

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    VueContext,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      menuData: [],
      totalRows: 0,
    }
  },
  computed: {
    show: takeState('drmNGOMnDtl', 'show').map(),
    caseItem: takeState('drmNGOMnDtl', 'caseItem').map(),
    caseField: takeState('drmNGOMnDtl', 'caseField').map(),

    showEdit: takeState('drmNGOMnDtl', 'showEdit').commit('drmNGOMnDtl/SET_SHOW_EDIT').map(),
    editItem: takeState('drmNGOMnDtl', 'editItem').commit('drmNGOMnDtl/SET_EDIT_ITEM').map(),
    currentPage: takeState('drmNGOMnDtl', 'currentPage').commit('drmNGOMnDtl/SET_CUR_PAGE').map(),

    filter: takeState('drmNGOMnDtl', 'filter').commit('drmNGOMnDtl/SET_FILTER').map(),
    filterOn: takeState('drmNGOMnDtl', 'filterOn').commit('drmNGOMnDtl/SET_FILTER_ON').map(),
  },
  mounted() {
    this.totalRows = this.caseItem.length
    this.Refresh()
  },
  methods: {
    onFiltered(item, ind) {
      this.totalRows = ind
      this.currentPage = 1
    },
    onFilteredTent(item, ind) {
      this.totalTentRows = ind
    },
    Refresh() {
      this.$store.dispatch('drmNGOMnDtl/GET_DATA_VIEW', {
        cycleId: this.$route.params.value.cycle_id,
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
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-wizard.scss';
@import '@core/scss/vue/libs/vue-select.scss';
.sticky-top { top: 0.8em; }
</style>
