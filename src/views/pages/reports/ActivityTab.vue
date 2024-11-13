<template>
  <b-card>
    <b-row class="mb-1">
      <b-col>
        ActivityInfo Report
      </b-col>
    </b-row>
    <b-row
      class="mb-1"
    >
      <b-col cols="3">
        <b-form-group>
          <h5>Select Date Range</h5>
          <flat-pickr
            v-model="range_rep_case"
            class="form-control"
            :config="{ mode: 'range'}"
          />
        </b-form-group>
      </b-col>
      <!-- buttons -->
      <b-col
        cols="2"
        style="margin-top: 25px;"
      >
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
          class="mr-1"
          block
          @click="GetCaseRep"
        >
          Get Report
        </b-button>
      </b-col>
      <!--/ buttons -->
      <!-- Export -->
      <b-col
        cols="3"
        style="margin-top: 25px;"
      >
        <b-dropdown
          left
          variant="info"
          text="Export"
        >
          <template #button-content>
            <feather-icon
              icon="FilePlusIcon"
              class="mr-1"
            />
            <span>Export</span>
          </template>
          <b-dropdown-item>
            <download-excel
              :data="ExportTable"
              :fields="caseExportField"
              worksheet="Sheet1"
              type="xls"
              name="ActivityInfo Report.xls"
              :meta="json_meta"
            >
              Excel
            </download-excel>
          </b-dropdown-item>
        </b-dropdown>
      </b-col>
      <!--/ Export -->
    </b-row>

    <b-row style="padding-left:15px">
      <p>Total:{{ caseItem.length }}</p>
      <b-table
        ref="selectableTable"
        striped
        hover
        responsive
        small
        bordered
        :items="caseItem"
        :fields="caseField"
        show-empty
        empty-text="No matching records found"
      >
        <!-- A custom formatted data column cell -->
        <template #cell(name)="data">
          {{ data.value.first }} {{ data.value.last }}
        </template>

        <!-- A custom formatted header cell for field 'name' -->
        <template #head(name)="data">
          <span class="text-info">{{ data.label.toUpperCase() }}</span>
        </template>

        <!-- A custom formatted footer cell for field 'name' -->
        <template #foot(name)="data">
          <span class="text-danger">{{ data.label }}</span>
        </template>

        <!-- Default fall-back custom formatted footer cell -->
        <template #foot()="data">
          <i>{{ data.label }}</i>
        </template>
        <template #cell(delivery_date)="data">
          <p>{{ data.value ==null || data.value ==='' ?'None': data.value }}</p>
        </template>
        <template #cell(reason_for_not_deilvered)="data">
          <p>{{ data.value ==null || data.value ==='' ?'None': data.value }}</p>
        </template>
        <template #cell(com_status)="data">
          <p>{{ data.value ==null || data.value ==='' ?'None': data.value }}</p>
        </template>
      </b-table>
    </b-row>
  </b-card>
</template>
<script>
/* eslint-disable no-param-reassign */
import Ripple from 'vue-ripple-directive'
import { takeState } from 'vuex-dot'

import flatPickr from 'vue-flatpickr-component'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    flatPickr,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      json_meta: [
        [
          {
            key: 'charset',
            value: 'utf-8',
          },
        ],
      ],
    }
  },
  computed: {
    show: takeState('report', 'show').commit('report/SET_SHOW').map(),
    range_rep_case: takeState('report', 'range_rep_activity').commit('report/SET_RNG_ACTIVITY').map(),

    caseField: takeState('report', 'activityField').map(),
    caseItem: takeState('report', 'activityItem').map(),
    caseExportField: takeState('report', 'activityExportField').map(),

    ExportTable() {
      const it = JSON.parse(JSON.stringify(this.caseItem))
      it.forEach(el => {
        console.log(el)
        const st = el.delivery_date === null ? 'None' : el.delivery_date
        const st1 = el.reason_for_not_deilvered === null ? 'None' : el.reason_for_not_deilvered
        el.delivery_date = st
        el.reason_for_not_deilvered = st1
      })
      return it
    },
  },
  methods: {
    Export(id) {
      console.log(id)
    },
    GetCaseRep() {
      console.log(this.range_rep_case)
      const rg = this.range_rep_case
      if (this.range_rep_case != null) {
        this.$store.dispatch('report/GET_REPORT_ACTIVITY', {
          prefix: this.$route.params.prefixPrj,
          startDate: rg.split('to')[0],
          endDate: rg.split('to')[1] == null ? rg.split('to')[0] : rg.split('to')[1],
        }).then(val => {
          console.log('val')
          console.log(val)
        })
      } else {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Warning',
            icon: 'EditIcon',
            text: 'Please Select Range',
            variant: 'warning',
          },
        })
      }
    },

  },
}
</script>

  <style  lang="scss">
  @import '@core/scss/vue/libs/vue-context.scss';
  .smallWidth{
    min-width: 100px;
  }
  .mediumWidth{
    min-width: 200px;
  }
  .largeWidth{
    min-width: 300px;
  }
  .xLargeWidth{
    min-width: 400px;
  }
  </style>
