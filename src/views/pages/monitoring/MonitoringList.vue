<template>
  <b-card ref="CAST" title="Case Row" no-body>
    <!-- context -->
    <vue-context ref="menu">
      <li>
        <b-link
          v-for="data in menuData"
          :key="data.text"
          class="d-flex align-items-center"
          @click="
            optionClicked(
              data.text,
              data.icon,
              data.item,
              data.variant,
              data.type
            )
          "
        >
          <feather-icon :icon="data.icon" size="16" />
          <span class="ml-75">{{ data.text }}</span>
        </b-link>
      </li>
    </vue-context>
    <b-card-body>
      <b-row>
        <b-col cols="4">
          <!-- sorting  -->
          <b-form-group
            label="Sort"
            label-size="sm"
            label-align-sm="left"
            label-cols-sm="2"
            label-for="sortBySelect"
            class="mr-1 mb-md-0 mt-2"
          >
            <b-input-group size="sm">
              <b-form-select
                id="sortBySelect"
                v-model="sortBy"
                :options="sortOptions"
              >
                <template #first>
                  <option value="">none</option>
                </template>
              </b-form-select>
              <b-form-select v-model="sortDesc" size="sm" :disabled="!sortBy">
                <option :value="false">Asc</option>
                <option :value="true">Desc</option>
              </b-form-select>
              <!-- Refresh
            <b-button
              variant="primary"
              size="sm"
              class="ml-2"
              @click="$parent.$parent.ResetData()"
            >
              <b-icon icon="arrow-repeat" />
            </b-button>-->
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col cols="2" />
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
            <b-input-group size="sm">
              <b-form-input
                id="filterInput"
                v-model="filter"
                type="search"
                placeholder="Type to Search"
              />
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''">
                  Clear
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col cols="1">
          <download-excel
            class="btn btn-default"
            :data="ExportTable"
            :fields="json_fields"
            worksheet="Sheet1"
            type="xls"
            name="Monitoring.xls"
            :meta="json_meta"
          >
            <b-button variant="success" block style="margin-top: 5px">
              Export
            </b-button>
          </download-excel>
        </b-col>
      </b-row>
    </b-card-body>
    <end-case v-if="showEnd" />

    <b-table
      ref="selectableTable"
      hover
      :busy="show"
      responsive
      bordered
      :per-page="perPage"
      :current-page="currentPage"
      :items="itemTable"
      :fields="fields"
      sticky-header
      style="max-height: 500px"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      :selected-variant="
        $store.state.appConfig.layout.skin === 'dark' ? 'active' : 'primary'
      "
      show-empty
      empty-text="No matching records found"
      primary-key="id"
      :filter="filter"
      :filter-included-fields="filterOn"
      @filtered="onFiltered"
      @row-contextmenu="RightClick"
      @row-dblclicked="gotToView"
    >
      <!--  -->
      <template #table-busy>
        <div class="text-center text-primary my-2">
          <b-spinner class="align-middle" />
          <strong>Loading...</strong>
        </div>
      </template>
      <template #cell(delivery_status)="data">
        <b-badge
          pill
          :variant="
            $store.getters['global/delivery_status'].filter(
              (it) => it.value === data.value
            )[0].variant
          "
        >
          {{
            $store.getters['global/delivery_status'].filter(
              (it) => it.value === data.value
            )[0].title
          }}
        </b-badge>
      </template>
      <template #cell(priority_level)="data">
        <b-badge pill :variant="data.item.variant">
          {{ data.item.priority }}
        </b-badge>
      </template>
      <template #cell(case_phone)="data">
        <p>+{{ data.value }}</p>
      </template>
      <template #cell(active)="data">
        <b-badge pill :variant="data.value === 1 ? 'success' : 'danger'">
          {{ data.value === 1 ? 'Active' : 'Not Active' }}
        </b-badge>
      </template>
      <template #cell(case_status)="data">
        <b-badge
          pill
          :variant="
            $store.getters['monitoring/CaseStatusOptions'].filter(
              (it) => it.title === data.value
            )[0].variant
          "
        >
          {{ data.value }}
        </b-badge>
      </template>
      <template #cell(awareness_status)="data">
        <b-badge
          pill
          :variant="
            data.value === 0 ? 'danger' : data.value === 2 ? 'success' : 'info'
          "
        >
          {{
            data.value === 0
              ? 'Not Awarened'
              : data.value === 2
              ? 'Awarened'
              : 'Pending'
          }}
        </b-badge>
      </template>
      <template #cell(monitoring_done)="data">
        <b-badge pill :variant="data.value === 1 ? 'success' : 'danger'">
          {{ data.value === 1 ? 'Done' : 'None' }}
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
      <template #cell(delivery_date)="data">
        <p>
          {{ data.value == null || data.value === '' ? 'None' : data.value }}
        </p>
      </template>
      <template #cell(com_user_name)="data">
        <p>
          {{ data.value == null || data.value === '' ? 'None' : data.value }}
        </p>
      </template>
      <template #cell(reason_comments)="data">
        <p>
          {{ data.value == null || data.value === '' ? 'None' : data.value }}
        </p>
      </template>
      <template #cell(case_feedback)="data">
        <p>
          {{ data.value == null || data.value === '' ? 'None' : data.value }}
        </p>
      </template>
      <template #cell(com_user_org)="data">
        <p>
          {{ data.value == null || data.value === '' ? 'None' : data.value }}
        </p>
      </template>
      <template #cell(dlvry_user_name)="data">
        <p>
          {{ data.value == null || data.value === '' ? 'None' : data.value }}
        </p>
      </template>
      <template #cell(dlvry_user_org)="data">
        <p>
          {{ data.value == null || data.value === '' ? 'None' : data.value }}
        </p>
      </template>
      <template #cell(com_status)="data">
        <p>
          {{ data.value == null || data.value === '' ? 'None' : data.value }}
        </p>
      </template>
      <template #cell(delivery_latitiude)="data">
        <p>
          {{ data.value == null || data.value === '' ? 'None' : data.value }}
        </p>
      </template>
      <template #cell(delivery_longtitude)="data">
        <p>
          {{ data.value == null || data.value === '' ? 'None' : data.value }}
        </p>
      </template>
      <template #cell(dlvry_comments)="data">
        <p>
          {{ data.value == null || data.value === '' ? 'None' : data.value }}
        </p>
      </template>
      <template #cell(ditrib_kits)="data">
        <p>
          {{ data.value == null || data.value === '' ? 'None' : data.value }}
        </p>
      </template>
      <template #row-details="row">
        <b-card>
           <b-row align-h="end">
            <b-col
              cols="2"
              class="text-sm-right"
            >
              <b>Indicators:</b>
            </b-col>
            <b-col
              cols="2"
            >
              <p
                v-for="item in JSON.parse(row.item.extra_fields) "
                v-show="item.value !=null"
                :key="item.id"
              >
                {{ item.name }}: {{ item.type === 4 ?(item.value ==null?'':JSON.parse(item.value).title ):item.value }}
              </p>
            </b-col>
          </b-row>
          <b-row align-h="end">
            <b-col cols="2" class="text-sm-right">
              <b>Current Full Info:</b>
            </b-col>
            <b-col cols="2">
              <p style="white-space: pre">
                {{ row.item.case_full_info }}
              </p>
            </b-col>
          </b-row>
        </b-card>
      </template>

      <!-- Column: Actions
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
          <b-dropdown-item @click="EditCase(data.item)">
            <feather-icon icon="EditIcon" />
            <span class="align-middle ml-50">Edit Basic Info</span>
          </b-dropdown-item>
          <b-dropdown-item @click="BeforeDeliver(data.item)">
            <feather-icon icon="ArrowLeftCircleIcon" />
            <span class="align-middle ml-50">To Geosplit</span>
          </b-dropdown-item>
        </b-dropdown>
      </template> -->
    </b-table>
    <div>
      <span class="text-muted ml-2 mr-4"> Total Cases: {{ totalRows }} </span>
    </div>
    <b-row class="m-1" align-h="between">
      <b-col cols="3">
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
        </b-form-group>
      </b-col>

      <b-col cols="auto" offset-md="4" align="right" style="margin-top: 16px">
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
            <feather-icon icon="ChevronLeftIcon" size="18" />
          </template>
          <template #next-text>
            <feather-icon icon="ChevronRightIcon" size="18" />
          </template>
        </b-pagination>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
/* eslint-disable no-param-reassign */

import { takeState } from 'vuex-dot'
import moment from 'moment'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import VueContext from 'vue-context'
import Ripple from 'vue-ripple-directive'
import EndCase from './EndCase.vue'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
    VueContext,
    EndCase
  },
  directives: {
    Ripple
  },
  data() {
    return {
      totalRows: null,
      json_meta: [
        [
          {
            key: 'charset',
            value: 'utf-8'
          }
        ]
      ],
      menuData: []
    }
  },
  computed: {
    ///
    deliveryOptions: takeState('global', 'delivery_status').map(),
    json_fields: takeState('monitoring', 'json_fields').map(),
    header() {
      return moment().toString
    },
    ///
    priority: takeState('global', 'priority').map(),
    referral: takeState('monitoring', 'referral')
      .commit('monitoring/SET_REF')
      .map(),
    governorate: takeState('monitoring', 'governorate')
      .commit('monitoring/SET_GOV')
      .map(),
    district: takeState('monitoring', 'district')
      .commit('monitoring/SET_DIS')
      .map(),
    cadaster: takeState('monitoring', 'cadaster')
      .commit('monitoring/SET_CAD')
      .map(),
    type: takeState('monitoring', 'type').commit('monitoring/SET_TYPE').map(),
    iss: takeState('monitoring', 'iss').commit('monitoring/SET_ISS').map(),
    rangeDate: takeState('monitoring', 'rangedate')
      .commit('monitoring/SET_RANG_DAT')
      .map(),
    show: takeState('monitoring', 'show').commit('monitoring/SET_SHOW').map(),
    dlv_status: takeState('monitoring', 'dlv_status')
      .commit('monitoring/SET_DLV_STATUS')
      .map(),
    case_status: takeState('monitoring', 'case_status')
      .commit('monitoring/SET_CASE_STATUS')
      .map(),
    awareness: takeState('monitoring', 'awareness')
      .commit('monitoring/SET_AWRN')
      .map(),
    monitoring: takeState('monitoring', 'monitoring')
      .commit('monitoring/SET_MONI')
      .map(),
    feedback: takeState('monitoring', 'feedback')
      .commit('monitoring/SET_FEED')
      .map(),
    // Table Data
    items: takeState('monitoring', 'caseItem')
      .commit('monitoring/SET_ITEM')
      .map(),
    fields: takeState('monitoring', 'caseField')
      .commit('monitoring/SET_FIELD')
      .map(),
    // Table Option
    perPage: takeState('monitoring', 'perPage')
      .commit('monitoring/SET_PER_PAGE')
      .map(),
    pageOptions: takeState('monitoring', 'pageOptions').map(),
    currentPage: takeState('monitoring', 'currentPage')
      .commit('monitoring/SET_CUR_PAGE')
      .map(),
    sortBy: takeState('monitoring', 'sortBy')
      .commit('monitoring/SET_SORT_BY')
      .map(),
    sortDesc: takeState('monitoring', 'sortDesc')
      .commit('monitoring/SET_SORT_DESC')
      .map(),
    sortDirection: takeState('monitoring', 'sortDirection')
      .commit('monitoring/SET_SORT_DIR')
      .map(),
    filter: takeState('monitoring', 'filter')
      .commit('monitoring/SET_FILTER')
      .map(),
    filterOn: takeState('monitoring', 'filterOn')
      .commit('monitoring/SET_FILTER_ON')
      .map(),
    showEnd: takeState('monitoring', 'showEnd')
      .commit('monitoring/SET_SHOW_END')
      .map(),
    endItem: takeState('monitoring', 'endItem')
      .commit('monitoring/SET_END_ITEM')
      .map(),
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => ({ text: f.label, value: f.key }))
    },
    itemTable() {
      const rf = this.items.filter((item) =>
        this.referral == null ? item : item.referral_id === this.referral.value
      )
    /*  console.log('rf', rf)
      const frm = moment(
        this.rangeDate == null ? null : this.rangeDate.split('to')[0]
      )
     console.log('frm', frm,this.rangeDate.split('to')[0])
      const to = moment(
        this.rangeDate == null ? null : this.rangeDate.split('to')[1]
      )
      console.log('to', to,this.rangeDate.split('to')[1])
      const rg = rf.filter((item) => {
        if (!frm.isValid() || !to.isValid()) {
          return true
        }
        return moment(item.created_date).isBetween(
          frm.add(-2, 'days'),
          to.add(2, 'days')
        )
      })
      console.log('rg', rg)*/
      const gov = rf.filter((itemgov) =>
        this.governorate == null
          ? itemgov
          : itemgov.governorate_id === this.governorate.value
      )
      const dis = gov.filter((itemdis) =>
        this.district == null
          ? itemdis
          : itemdis.district_id === this.district.value
      )
      const st = dis.filter((itemtype) =>
        this.type == null ? itemtype : itemtype.satl_type === this.type.value
      )
      const cd = st.filter((itemcad) =>
        this.cadaster == null
          ? itemcad
          : itemcad.cadastre_id === this.cadaster.value
      )
      const iss = cd.filter((itemiss) =>
        this.iss == null ? itemiss : itemiss.is_id === this.iss.value
      )
      console.log('iss', iss)
      const dlv = iss.filter((itemdlv) =>
        this.case_status == null
          ? itemdlv
          : itemdlv.case_status === this.case_status.title
      )
      const feed = dlv.filter((itemfeek) =>
        this.feedback == null
          ? itemfeek
          : itemfeek.case_feedback === this.feedback.title
      )
      const awrs = feed.filter((itemawrs) =>
        this.awareness == null
          ? itemawrs
          : itemawrs.awareness_status === this.awareness.value
      )
      const mnt = awrs.filter((itemmnt) =>
        this.monitoring == null
          ? itemmnt
          : itemmnt.monitoring_done === this.monitoring.value
      )
      console.log('mnt', mnt)
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.totalRows = mnt.length
      return mnt
    },
    ExportTable() {
      const it = JSON.parse(JSON.stringify(this.itemTable))
      it.forEach((el) => {
        const st = el.active === 1 ? 'Active' : 'Not Active'
        const st1 = el.awareness_status === 1 ? 'Awarened' : 'Not Awarened'
        const st2 = el.monitoring_done === 1 ? 'Done' : 'None'
        const st3 = el.com_user_name === null ? 'None' : el.com_user_name
        const st4 = el.com_user_org === null ? 'None' : el.com_user_org
        const st5 = el.dlvry_user_name === null ? 'None' : el.dlvry_user_name
        const st6 = el.dlvry_user_org === null ? 'None' : el.dlvry_user_org
        const st7 = el.case_feedback === null ? 'None' : el.case_feedback
        const st8 =
          el.reason_comments === '' || el.reason_comments === null
            ? 'None'
            : el.reason_comments
        const st9 =
          el.dlvry_comments === '' || el.dlvry_comments === null
            ? 'None'
            : el.dlvry_comments

        el.active = st
        el.awareness_status = st1
        el.monitoring_done = st2
        el.com_user_name = st3
        el.com_user_org = st4
        el.dlvry_user_name = st5
        el.dlvry_user_org = st6
        el.case_feedback = st7
        el.reason_comments = st8
        el.dlvry_comments = st9
      })
      return it
    }
  },
  mounted() {
    this.perPage = 10
    this.totalRows = this.itemTable.length
    this.items = []
  },
  methods: {
    optionClicked(text, icon, item, variant, type) {
      const rg = this.rangeDate
      console.log(item, type)
      if (type === 0) {
        this.endItem = item
        this.showEnd = true
      } else {
        this.$swal({
          title: 'Revive Case',
          text: `Are you sure you want to revive This case (${item.case_code}:${item.full_name})`,
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'Yes!',
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ml-1'
          },
          buttonsStyling: false
        }).then((result) => {
          if (result.value) {
            this.show1 = false
            this.$store
              .dispatch('monitoring/ReviveCase', {
                prefix: this.$route.params.prefixPrj,
                prefixRole: this.$route.params.prefixRole,
                items: item,
                type: this.$route.params.assmnttype,
                startDate: rg.split('to')[0],
                endDate:
                  rg.split('to')[1] == null
                    ? rg.split('to')[0]
                    : rg.split('to')[1],
                ph: this.phoneissue
              })
              .then((res) => {
                console.log('//////')
                console.log(res)
                if (res[0].result === 1) {
                  this.showEnd = false
                  this.$swal({
                    icon: 'success',
                    title: 'Done!',
                    text: 'The case hase been terminated!',
                    customClass: {
                      confirmButton: 'btn btn-success'
                    }
                  })
                } else {
                  this.$swal({
                    icon: 'danger',
                    title: 'Failed!',
                    text: 'Contact System administrator!',
                    customClass: {
                      confirmButton: 'btn btn-success'
                    }
                  })
                }
              })
              .catch((error) => {
                console.log('//////')
                console.log(error)
                console.log(typeof error)
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Operation Failed',
                    icon: 'EditIcon',
                    text: error.toString,
                    variant: 'danger'
                  }
                })
              })
          }
        })
      }
    },
    RightClick(item, index, event) {
      console.log(item, index, event)
      console.log(item.case_status)
      const str = item.case_status.toString()
      switch (str) {
        case 'Not Deliverd':
        case 'Terminated':
          this.menuData = [
            {
              icon: 'TrendingUpIcon',
              text: `Revive (${item.case_code})`,
              variant: 'primary',
              item,
              type: 1
            }
          ]
          event.preventDefault()
          this.$refs.menu.open(event, { index, item })
          break
        case 'New Enrty':
        case 'New Link':
        case 'Assessment':
        case 'Link Assessment':
        case 'Task Manager':
          this.menuData = [
            {
              icon: 'XIcon',
              text: `End Case (${item.case_code})`,
              variant: 'danger',
              item,
              type: 0
            }
          ]
          event.preventDefault()
          this.$refs.menu.open(event, { index, item })
          break
        case 'Uknown':
          this.menuData = [
            {
              icon: 'TrendingUpIcon',
              text: `Revive (${item.case_code})`,
              variant: 'primary',
              item,
              type: 1
            },
            {
              icon: 'XIcon',
              text: `End Case (${item.case_code})`,
              variant: 'danger',
              item,
              type: 0
            }
          ]
          event.preventDefault()
          this.$refs.menu.open(event, { index, item })
          break
        default:
          this.menuData = []
          event.preventDefault()
      }
    },
    onFiltered(_, ind) {
      this.totalRows = ind
      this.currentPage = 1
    },
    EditCase(item) {
      console.log(item)
    },
    BeforeDeliver(item) {
      console.log(item)
    },
    gotToView(item) {
      const nav = []
      nav.push(
        {
          active: false,
          text: this.$route.params.breadcrumb[0].text
        },
        {
          active: false,
          text: this.$route.params.title
        },
        {
          active: true,
          text: `${item.full_name}`
        }
      )
      this.$router.replace({
        name: 'projectEdit',
        params: {
          action: 'read',
          breadcrumb: nav,
          active: true,
          prefix: this.$route.params.prefixPrj,
          prefixRole: this.$route.params.prefixRole,
          view: true,
          assmnttype: this.$route.params.assmnttype,
          title: 'Monitoring',
          resource: 'MNTR',
          value: item
        }
      })
    }
  }
}
</script>

<style  lang="scss" >
@import '@core/scss/vue/libs/vue-context.scss';
.code_column {
  min-width: 200px;
}
.current_status {
  min-width: 300px;
}
</style>
