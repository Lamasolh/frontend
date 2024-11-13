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
          title="Iss"
          :lazy="true"
        >
          <Iss />
        </tab-content>
        <!-- Result tab-->
        <tab-content
          title="Summary"
          :lazy="true"
        >

          <Result />
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
import Iss from './import_iss.vue'
import Result from './import_summary.vue'

import 'vue-form-wizard/dist/vue-form-wizard.min.css'

export default {
  components: {
    FormWizard,
    TabContent,
    // Pages
    Iss,
    Result,
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
    iss: takeState('importPrjWtr', 'iss').commit('importPrjWtr/SET_ISS').map(),
    show: takeState('importPrjWtr', 'show').map(),
    import: takeState('importPrjWtr', 'import').commit('importPrjWtr/SET_IMPORT').map(),

  },
  mounted() {
    this.iss = []
  },
  methods: {
    ImportData(event) {
      const xlsxfile = event.target.files ? event.target.files[0] : null
      try {
        readXlsxFile(xlsxfile, { getSheets: true }).then(sheet => {
          for (let i = 1; i < sheet.length; i += 1) {
            this.iss = []
            readXlsxFile(xlsxfile, { sheet: sheet[i].name }).then(rows => {
              for (let ss = 1; ss < rows.length; ss += 1) {
                // console.log(rows[j])
                this.iss.push({
                  'P-CODE': rows[ss][0],
                  Partner: rows[ss][1],
                })
              }
            })
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
            this.$store.dispatch('importPrjWtr/Save_DATA_ISS', {
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
