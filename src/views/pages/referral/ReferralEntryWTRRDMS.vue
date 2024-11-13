<template>

  <div ref="RFET">
    <b-overlay
      :show="show"
      rounded="sm"
    >
      <div>
        <b-form
          ref="form"
          class="repeater-form"
          @submit.prevent
        >
          <b-card no-body>
            <b-card-header class="pb-50">
              <h4>Data</h4>
            </b-card-header>
            <b-card-body>

              <b-table
                ref="selectableTable"
                bordered
                responsive
                show-empty
                empty-text="No matching records found"
                :items="items"
                :selected-variant="
                  $store.state.appConfig.layout.skin === 'dark'
                    ? 'active'
                    : 'primary'
                "
                sticky-header
                data-boundary="window"
                style="max-height: 450px"
                :fields="itemField"
              >
                <template #cell(id)="data">
                  <p>{{ data.index + 1 }}</p>
                </template>

              </b-table>
              <div>
                <span class="text-muted">
                  Total Cases: {{ items.length }}
                </span>
              </div>
              <b-card-footer>
                <!-- Row Option -->
                <b-row
                  align-h="between"
                  class="justify-content"
                >
                  <b-col cols="auto">
                    <b-dropdown
                      left
                      variant="warning"
                      text="Import"
                    >
                      <input
                        ref="import"
                        type="file"
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        hidden
                        @change="ImportData"
                      >
                      <template #button-content>
                        <feather-icon
                          icon="FilePlusIcon"
                          class="mr-1"
                        />
                        <span>Import</span>
                      </template>
                      <b-dropdown-item @click="onPickFile(1)">
                        Blanket Format
                      </b-dropdown-item>
                    </b-dropdown>
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
                        <span>Export Template</span>
                      </template>
                      <b-dropdown-item @click="Export(1)">
                        Blanket Format
                      </b-dropdown-item>
                    </b-dropdown>

                    <download-excel
                      v-show="items.filter(e=> e.enable === false).length>0"
                      class="btn btn-default"
                      :data="ExportTable"
                      :fields="json_fields"
                      worksheet="Sheet1"
                      type="xls"
                      name="Data Entry Error.xls"
                      :meta="json_meta"
                    >
                      <b-button
                        variant="danger"
                        block
                        style=" margin-top: 5px;"
                      >
                        Export Error
                      </b-button>
                    </download-excel>

                  </b-col>
                  <b-col cols="auto">
                    <b-button
                      class="ml-1 mr-1"
                      variant="success"
                      type="submit"
                      @click="SaveData"
                    >
                      <feather-icon
                        icon="SaveIcon"
                        class="mr-1"
                      />
                      <span>Save</span>
                    </b-button>
                    <b-button
                      variant="warning"
                      @click="ResetData"
                    >
                      <feather-icon
                        icon="RefreshCwIcon"
                        class="mr-1"
                      />
                      <span>Reset</span>
                    </b-button>
                  </b-col>

                </b-row>
              </b-card-footer>
            </b-card-body>
          </b-card>
        </b-form>
      </div>
    </b-overlay>
  </div>
</template>

<script>
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-expressions */
import { takeState } from 'vuex-dot'
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
// import moment from 'moment'
// import readXlsxFile from 'read-excel-file'
import axios from 'axios'

export default {
  components: {
  },
  data() {
    return {
      importIndex: null,
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
    saved: takeState('referralWtr', 'saved').commit('referralWtr/SET_SAVED').map(),
    show: takeState('referralWtr', 'show').commit('referralWtr/SET_SHOW').map(),
    items: takeState('referralWtr', 'items').commit('referralWtr/ADD_ITEM').map(),
    // Selected
    itemField: takeState('referralWtr', 'itemField').map(),
    json_fields: takeState('referralWtr', 'json_fields').map(),
    ExportTable() {
      console.log(this.items.filter(e => e.enable === false))
      const it = JSON.parse(JSON.stringify(this.items.filter(e => e.enable === false)))
      console.log(it)
      return it
    },
  },
  mounted() {
    this.ResetData()
  },
  methods: {
    SaveData() {
      /* if (this.items.length > 0) {
          if (this.items.filter(e => e.enable === false).length === 0) {
            this.$refs.selectableTable.refresh()
            this.$store
              .dispatch('referral/SAVE_DATA_RDMS', {
                prefix: this.$route.params.prefixPrj,
              })
              .then(() => {
                this.$forceUpdate()
                this.$refs.selectableTable.refresh()
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Operation Completed, Check result',
                    icon: 'EditIcon',
                    variant: 'success',
                  },
                })
                this.$refs.selectableTable.refresh()
              })
              .catch(error => {
                console.log(error)
                this.$swal({
                  title: 'Error!',
                  text: 'Please check internet connection and try again',
                  icon: 'error',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                })
                this.$refs.selectableTable.refresh()
              })
          } else {
            this.$swal({
              title: 'Attention!',
              text: 'Error Row Please Fix it and import again',
              icon: 'warning',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          }
        } else {
          this.$swal({
            title: 'Attention!',
            text: 'Is no record to save',
            icon: 'warning',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        } */
    },
    onPickFile(index) {
      this.importIndex = index
      this.$refs.import.click()
    },
    Export(index) {
      switch (index) {
        case 1:
          this.download('/file/excel/WaterTraking Template.xlsx', 'WaterTraking Template.xlsx')
          break
        default:
      }
    },

    download(fileUrl, fileName) {
      axios.post(fileUrl, {
        file_name: fileName,
      }, {
        responseType: 'blob',
      }).then(response => {
        const url = URL.createObjectURL(new Blob([response.data], {
          type: 'application/vnd.ms-excel',
        }))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        link.click()
      })
    },
    ImportData() {
      /* const xlsxfile = event.target.files ? event.target.files[0] : null
        try {
          this.ResetData()
          readXlsxFile(xlsxfile).then(rows => {
            console.log(rows)
            for (let i = 1; i < rows.length; i += 1) {
              let resdtype = null
              let cadaster = null
              let enable = true
              let error = null
              let latitude = null
              let longitude = null
              let address = null
              let pcode = null
              console.log(rows[i][0])
              if (rows[i][0] != null) {
                resdtype = this.$store.getters['global/type'].filter(
                  op => op.title === rows[i][0],
                )[0]
              }
              if (rows[i][0] != null) {
                cadaster = this.$store.getters['global/municipality'].filter(
                  op => op.title === rows[i][1],
                )[0]
              }

              const husband = rows[i][3]
              const wife = rows[i][4]
              const phone = rows[i][5]
              const nof = rows[i][6]
              const nor = rows[i][7]
              pcode = rows[i][2]
              latitude = rows[i][8]
              longitude = rows[i][9]
              address = rows[i][10]
              if (resdtype == null || cadaster == null || husband == null
               || wife == null || nof == null || nor == null) {
                enable = false
                error = 'Data Missing'
              } /* else if (resdtype.value === 3 || resdtype.value === 2 || resdtype.value === 1) {
                if (latitude == null || longitude == null || address == null) {
                  enable = false
                  error = 'Addresses Null'
                }
              } else if (pcode == null) {
                enable = false
                error = 'P-Code Null'
              } *//*

              console.log([resdtype, cadaster])
              this.items = {
                id: i,
                resdtype: resdtype == null ? null : resdtype.title,
                resdtypeID: resdtype == null ? null : resdtype.value,
                cadaster: cadaster == null ? null : cadaster.title,
                pcode,
                husband,
                wife,
                phone,
                nof,
                nor,
                latitude,
                longitude,
                address,
                enable,
                error,
              }
            }
            this.$refs.import.value = null
            this.$nextTick(() => {
              this.$refs.selectableTable.refresh()
            })
          })
        } catch (e) {
          console.log('erro', e)
          this.$refs.import.value = null
          this.$nextTick(() => {
            this.$refs.selectableTable.refresh()
          })
        } */
    },

    ResetData() {
      this.$store.commit('referralWtr/RESET_ITEM_BLC')
    },
  },
}
</script>

  <style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  @import '@core/scss/vue/libs/vue-flatpicker.scss';
  .code {
    min-width: 150px;
  }
  .referral {
    min-width: 250px;
  }
  .full_name {
    max-width: 600px;
    min-width: 200px;
  }
  .phone {
    min-width: 300px;
  }
  .governorate {
    min-width: 300px;
  }
  .cadaster {
    min-width: 250px;
  }
  .district {
    min-width: 250px;
  }
  .type {
    min-width: 300px;
  }
  .iss {
    min-width: 250px;
  }
  .pcr_date {
    min-width: 250px;
  }
  </style>
