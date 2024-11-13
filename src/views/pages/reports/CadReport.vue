<template>
  <b-card>
    <b-row class="mb-1">
      <b-col>
        Cadaster Report
      </b-col>
    </b-row>
    <b-row
      class="mb-1"
    >
      <b-col cols="2">
        <label>Years</label>
        <v-select
          v-model="year"
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          label="title"
          placeholder="ALL"
          :options="yearOptions"
        />
      </b-col>
      <b-col
        cols="2"
        class="mt-2"
      >
        <b-button
          variant="primary"
          block
          @click="GetInvRep"
        >
          Get Cadaster Report
        </b-button>
      </b-col>
      <b-col
        cols="3"
        class="mt-2"
      >
        <b-dropdown
          v-if="cadItem.length>0"
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
              :fields="cadExportField"
              worksheet="Sheet1"
              type="xls"
              name="Report Cadaster.xls"
              :meta="json_meta"
            >
              Excel
            </download-excel>
          </b-dropdown-item>
          <!--<b-dropdown-divider />
          <b-dropdown-item @click="Export(2)">
            Pdf
          </b-dropdown-item>-->
        </b-dropdown>
      </b-col>
    </b-row>
    <b-row style="padding-left:15px">
      <p>Total:{{ cadItem.length }}</p>
      <b-table
        id="example"
        ref="selectableTable"
        striped
        hover
        responsive
        small
        bordered
        :items="cadItem"
        :fields="cadField"
        show-empty
        empty-text="No matching records found"
      >
        <template #cell(jan_kits)="data">
          <pre style=" background: transparent;">{{ data.value }}</pre>
        </template>
        <template #cell(feb_kits)="data">
          <pre style=" background: transparent;">{{ data.value }}</pre>
        </template>
        <template #cell(mar_kits)="data">
          <pre style=" background: transparent;">{{ data.value }}</pre>
        </template>
        <template #cell(aprl_kits)="data">
          <pre style=" background: transparent;">{{ data.value }}</pre>
        </template>
        <template #cell(may_kits)="data">
          <pre style=" background: transparent;">{{ data.value }}</pre>
        </template>
        <template #cell(jun_kits)="data">
          <pre style=" background: transparent;">{{ data.value }}</pre>
        </template>
        <template #cell(jul_kits)="data">
          <pre style=" background: transparent;">{{ data.value }}</pre>
        </template>
        <template #cell(aug_kits)="data">
          <pre style=" background: transparent;">{{ data.value }}</pre>
        </template>
        <template #cell(sep_kits)="data">
          <pre style=" background: transparent;">{{ data.value }}</pre>
        </template>
        <template #cell(oct_kits)="data">
          <pre style=" background: transparent;">{{ data.value }}</pre>
        </template>
        <template #cell(nov_kits)="data">
          <pre style=" background: transparent;">{{ data.value }}</pre>
        </template>
        <template #cell(dec_kits)="data">
          <pre style=" background: transparent;">{{ data.value }}</pre>
        </template>
      </b-table>
    </b-row>
  </b-card>
</template>
<script>
import Ripple from 'vue-ripple-directive'
import { takeState } from 'vuex-dot'
import vSelect from 'vue-select'

export default {
  components: {
    vSelect,
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
    cadExportField: takeState('report', 'cadExportField').map(),
    cadField: takeState('report', 'cadField').map(),
    cadItem: takeState('report', 'cadItem').commit('report/SET_CAD_ITEM').map(),

    year: takeState('report', 'year').commit('report/SET_YEAR').map(),
    yearOptions: takeState('report', 'yearOptions').map(),

    ExportTable() {
      console.log(this.cadItem)
      console.log(JSON.stringify(this.cadItem))
      const it = JSON.parse(JSON.stringify(this.cadItem))
      return it
    },
  },

  mounted() {
    this.cadItem = []
  },
  methods: {

    GetInvRep() {
      this.$store.dispatch('report/GET_REPORT_CAD', {
        prefix: this.$route.params.prefixPrj,
      }).then(val => {
        console.log(val)
      })
    },
  },
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
.smallheight{
  min-height: 300px;
}
</style>
