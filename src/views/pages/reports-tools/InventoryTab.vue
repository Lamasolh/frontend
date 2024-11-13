<template>
  <b-card>
    <b-row class="mb-1">
      <b-col>
        Inventory Report
      </b-col>
    </b-row>
    <b-row
      class="mb-1"
    >
      <b-col cols="4">
        <b-button
          variant="primary"
          @click="GetInvRep"
        >
          Get Inventory Report
        </b-button>
      </b-col>
      <b-col cols="3">
        <b-dropdown
          v-if="invItem.length>0"
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
              :fields="invExportField"
              worksheet="Sheet1"
              type="xls"
              name="Report Inventory.xls"
              :meta="json_meta"
            >
              Excel
            </download-excel>
          </b-dropdown-item>
          <!-- <b-dropdown-divider />
          <b-dropdown-item @click="Export(2)">
            Pdf
          </b-dropdown-item>-->
        </b-dropdown>
      </b-col>
    </b-row>
    <b-row style="padding-left:15px">
      <p>Total:{{ invItem.length }}</p>
      <b-table
        id="example"
        ref="selectableTable"
        striped
        hover
        small
        bordered
        :items="invItem"
        :fields="invField"
        show-empty
        empty-text="No matching records found"
      />
    </b-row>
  </b-card>
</template>
<script>
import Ripple from 'vue-ripple-directive'
import { takeState } from 'vuex-dot'

export default {
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
    show: takeState('reportsTools', 'show').commit('reportsTools/SET_SHOW').map(),
    invExportField: takeState('reportsTools', 'invExportField').map(),
    invField: takeState('reportsTools', 'invField').commit('reportsTools/SET_INV_FIELD').map(),
    invItem: takeState('reportsTools', 'invItem').commit('reportsTools/SET_INV_ITEM').map(),
    ExportTable() {
      console.log(this.invItem)
      console.log(JSON.stringify(this.invItem))
      const it = JSON.parse(JSON.stringify(this.invItem))
      return it
    },
  },

  mounted() {
    this.invItem = []
    this.invField = []
  },
  methods: {

    GetInvRep() {
      this.$store.dispatch('reportsTools/GET_REPORT_INV', {
        prefix: this.$route.params.prefixPrj,
      }).then(val => {
        console.log(val)
      })
    },
  },
}
</script>
<style scoped>
@import url(https://cdn.datatables.net/1.11.3/css/jquery.dataTables.min.css);
@import url(https://cdn.datatables.net/buttons/2.1.0/css/buttons.dataTables.min.css);
</style>
