<template>
  <b-card>
    <b-overlay
      rounded="lg"
      :show="show"
    >
      <h2>Import</h2>
      <b-form-file
        ref="import"
        v-model="file1"
        class="mb-1"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        @change="ImportData"
      />
      <form-wizard
        color="#7367F0"
        :title="null"
        :subtitle="null"
        finish-button-text="Submit"
        back-button-text="Previous"
        @on-complete="SaveData"
      >
        <!-- basic information tab -->
        <tab-content
          title="Residential"
          :lazy="true"
        >

          <Residential />
        </tab-content>
        <!-- Family information tab-->
        <tab-content
          title="Informal Settlements"
          :lazy="true"
        >

          <InformalSettlemnt />
        </tab-content>
        <!-- Valid Criteria-->
        <tab-content
          title="Collective Shelters"
          :lazy="true"
        >

          <CSH />
        </tab-content>

        <!-- Result tab-->
        <tab-content
          title="Palestinian Gatherings"
          :lazy="true"
        >
          <PG />
        </tab-content>
        <!-- Socioeconomic/accomodation Info-->
        <tab-content
          title="Palestinian Camps"
          :lazy="true"
        >

          <PC />
        </tab-content>
        <!-- Result tab-->
        <tab-content
          title="Summary"
          :lazy="true"
        >

          <Summary />
        </tab-content>
      </form-wizard>
    </b-overlay>
  </b-card>
</template>
<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import readXlsxFile from 'read-excel-file'
import { takeState } from 'vuex-dot'
import Residential from './import_residential.vue'
import InformalSettlemnt from './import_iss.vue'
import CSH from './import_csh.vue'
import PG from './import_pg.vue'
import PC from './import_pc.vue'
import Summary from './import_summary.vue'

import 'vue-form-wizard/dist/vue-form-wizard.min.css'

export default {
  components: {
    FormWizard,
    TabContent,
    // Pages
    Residential,
    InformalSettlemnt,
    CSH,
    PG,
    PC,
    Summary,
    // WizardSocial,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  data() {
    return {
      jsondata: [],
      file1: null,
    }
  },
  computed: {
    residential: takeState('importPrj', 'residential').commit('importPrj/SET_RESDENTIAL').map(),
    iss: takeState('importPrj', 'iss').commit('importPrj/SET_ISS').map(),
    csh: takeState('importPrj', 'csh').commit('importPrj/SET_CSH').map(),
    pg: takeState('importPrj', 'pg').commit('importPrj/SET_PG').map(),
    pc: takeState('importPrj', 'pc').commit('importPrj/SET_PC').map(),
    show: takeState('importPrj', 'show').map(),
    import: takeState('importPrj', 'import').commit('importPrj/SET_IMPORT').map(),

  },
  mounted() {
    this.residential = []
    this.iss = []
    this.csh = []
    this.pg = []
    this.pc = []
  },
  methods: {
    ImportData(event) {
      const xlsxfile = event.target.files ? event.target.files[0] : null
      try {
        readXlsxFile(xlsxfile, { getSheets: true }).then(sheet => {
          for (let i = 1; i < sheet.length; i += 1) {
            console.log(sheet[i].name)
            this.residential = []
            this.iss = []
            this.csh = []
            this.pg = []
            this.pc = []
            switch (sheet[i].name) {
              case 'Resedential':
              case 'Residential':
                readXlsxFile(xlsxfile, { sheet: sheet[i].name }).then(rows1 => {
                  for (let j = 1; j < rows1.length; j += 1) {
                    this.residential.push({
                      ACS_CODE: rows1[j][0],
                      'Cadaster Name in English': rows1[j][1],
                      'Cadaster in Arabic': rows1[j][2],
                      'District قضاء': rows1[j][3],
                      'Governorate محافظة': rows1[j][4],
                      'Partner for Residential Lebanese': rows1[j][5],
                      'Partner for Residential Syrians': rows1[j][6],
                    })
                  }
                })
                break
              case 'Informal Settlements':
                readXlsxFile(xlsxfile, { sheet: sheet[i].name }).then(rows2 => {
                  for (let ss = 1; ss < rows2.length; ss += 1) {
                    // console.log(rows[j])
                    this.iss.push({
                      'P-CODE': rows2[ss][0],
                      'PCode Name': rows2[ss][1],
                      'Governorate محافظة': rows2[ss][2],
                      'District قضاء': rows2[ss][3],
                      'Cadaster Name in English': rows2[ss][4],
                      'Cadaster in Arabic': rows2[ss][5],
                      'ACS Code': rows2[ss][6],
                      Latitude: rows2[ss][7],
                      Longitude: rows2[ss][8],
                      'Partner for Informal Settlements': rows2[ss][9],
                      action: rows2[ss][10],
                    })
                  }
                })
                break
              case 'Collective Shelters':
                readXlsxFile(xlsxfile, { sheet: sheet[i].name }).then(rows => {
                  for (let ss1 = 1; ss1 < rows.length; ss1 += 1) {
                    // console.log(rows[j])
                    this.csh.push({
                      'P-CODE': rows[ss1][0],
                      'PCode Name': rows[ss1][1],
                      'Collective Name': rows[ss1][2],
                      'Governorate محافظة': rows[ss1][3],
                      'District قضاء': rows[ss1][4],
                      'Cadaster Name in English': rows[ss1][5],
                      'Cadaster in Arabic': rows[ss1][6],
                      'ACS Code': rows[ss1][7],
                      Latitude: rows[ss1][8],
                      Longitude: rows[ss1][9],
                      'Partner for Collective Shelters': rows[ss1][10],
                    })
                  }
                })
                break
              case 'Palestinian Gatherings':
                readXlsxFile(xlsxfile, { sheet: sheet[i].name }).then(rows => {
                  for (let ss1 = 1; ss1 < rows.length; ss1 += 1) {
                    // console.log(rows[j])
                    this.pg.push({
                      'P-CODE': rows[ss1][0],
                      'PCode Name': rows[ss1][1],
                      'Governorate محافظة': rows[ss1][2],
                      'District قضاء': rows[ss1][3],
                      'Cadaster Name in English': rows[ss1][4],
                      'Cadaster in Arabic': rows[ss1][5],
                      'ACS Code': rows[ss1][6],
                      Latitude: rows[ss1][7],
                      Longitude: rows[ss1][8],
                      'Partner for Palestinian Gatherings': rows[ss1][9],
                    })
                  }
                })
                break
              case 'Palestinian Camps':
                readXlsxFile(xlsxfile, { sheet: sheet[i].name }).then(rows => {
                  for (let ss1 = 1; ss1 < rows.length; ss1 += 1) {
                    this.pc.push({
                      P_CODE: rows[ss1][0],
                      'Camp Name': rows[ss1][1],
                      'Cadaster Name in English': rows[ss1][2],
                      'Cadaster in Arabic': rows[ss1][3],
                      'ACS Code': rows[ss1][4],
                      'District قضاء': rows[ss1][5],
                      'Governorate محافظة': rows[ss1][6],
                      Latitude: rows[ss1][7],
                      Longitude: rows[ss1][8],
                      'Partner for Palestinian Camps': rows[ss1][9],
                    })
                  }
                })
                break
              default:
            }
            this.import = true
          }
        })
      } catch (e) {
        console.log('erro', e)
        this.$refs.import.value = null
        this.import = false
        this.$nextTick(() => {
          this.$refs.selectableTable.refresh()
        })
      }
    },
    SaveData() {
      console.log(this.$route.params.value.proj_id)
      if (this.file1 != null) {
        this.$swal({
          title: 'Import GeoSplit',
          text: 'Are you sure you want to import this data?',
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'Yes!',
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ml-1',
          },
          buttonsStyling: false,
        }).then(result => {
          if (result.value) {
            this.$store.dispatch('importPrj/GET_DATA', {
              prefix: this.$route.params.value.proj_id,
              prefixRole: this.$route.params.prefixRole,
            }).then(() => {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Operation Complete',
                  icon: 'EditIcon',
                  text: 'Check the summary if there are any errors',
                  variant: 'success',
                },
              })
            }).catch(() => {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Error',
                  icon: 'EditIcon',
                  text: 'Please check internet connection and try again',
                  variant: 'error',
                },
              })
            })
          }
        })
      } else {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Attention',
            icon: 'EditIcon',
            text: 'Please import Excel file',
            variant: 'warning',
          },
        })
      }
    },
  },
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-wizard.scss';
@import '@core/scss/vue/libs/vue-select.scss';
.sticky-top { top: 0.8em; }
</style>
