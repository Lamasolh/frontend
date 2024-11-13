<template>
  <div ref="RFET">

    <b-overlay
      :show="show"
      rounded="sm"
    >
      <div>
        <validation-observer ref="simpleRules">
          <b-form
            ref="form"
            class="repeater-form"
            @submit.prevent
          >
            <b-card
              id="bcard"
              no-body
            >
              <b-card-header class="pb-50">
                <h4>
                  Basic Info
                </h4>
              </b-card-header>
              <b-card-body>
                <!-- Referral -->
                <b-row>
                  <b-col md="3">
                    <validation-provider
                      #default="{ errors }"
                      rules="required"
                      name="Referral"
                    >
                      <b-form-group label="Referral">
                        <v-select
                          v-model="referral"
                          placeholder="Select Referral"
                          label="title"
                          :state="errors.length > 0 ? false : null"
                          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                          :options="referralOptions"
                        />
                        <small class="text-danger mb-1">{{ errors[0] }}</small>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <!-- Priority -->
                  <b-col md="3">
                    <validation-provider
                      #default="{ errors }"
                      rules="required"
                      name="Priority"
                    >
                      <b-form-group label="Priority">
                        <v-select
                          v-model="priority"
                          placeholder="Select Priority"
                          label="title"
                          :state="errors.length > 0 ? false : null"
                          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                          :options="priorityOptions"
                        />
                        <small class="text-danger">{{ errors[0] }}</small>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <!-- Gov -->
                  <b-col cols="3">
                    <validation-provider
                      #default="{ errors }"
                      rules="required"
                      name="Governorate"
                    >
                      <b-form-group label="Governorate">
                        <v-select
                          v-model="governorate"
                          label="title"
                          placeholder="ALL"
                          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                          :options="governorateOption"
                          :state="errors.length > 0 ? false : null"
                        />
                        <small class="text-danger">{{ errors[0] }}</small>
                      </b-form-group>
                    </validation-provider>

                  </b-col>
                  <!-- District -->
                  <b-col cols="3">
                    <validation-provider
                      #default="{ errors }"
                      rules="required"
                      name="District"
                    >
                      <b-form-group label="District">
                        <v-select
                          v-model="district"
                          placeholder="ALL"
                          label="title"
                          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                          :options="districtSelect"
                          :state="errors.length > 0 ? false : null"
                          @input="(value) => ChangeDistrict(value)"
                        />
                        <small class="text-danger">{{ errors[0] }}</small>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                </b-row>
                <!-- District / Cad -->
                <b-row>
                  <!-- Type -->
                  <b-col cols="3">
                    <validation-provider
                      #default="{ errors }"
                      rules="required"
                      name="Type"
                    >
                      <b-form-group label="Residential Type">
                        <v-select
                          v-model="type"
                          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                          label="title"
                          placeholder="ALL"
                          :options="typeOptions"
                          :state="errors.length > 0 ? false : null"
                          @input="value=>ChangeType(value)"
                        />
                        <small class="text-danger">{{ errors[0] }}</small>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <!-- Cadaster -->
                  <b-col cols="3">
                    <validation-provider
                      #default="{ errors }"
                      rules="required"
                      name="Cadaster"
                    >
                      <b-form-group label="Cadaster">
                        <v-select
                          v-model="cadaster"
                          placeholder="ALL"
                          label="title"
                          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                          :options="cadOptions"
                          :state="errors.length > 0 ? false : null"
                          @input="value=>ChangeCAD(value)"
                        />
                        <small class="text-danger">{{ errors[0] }}</small>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <!-- Settlement -->
                  <b-col
                    v-if="type ==null ? false : type.value >3"
                    cols="3"
                  >
                    <validation-provider
                      v-if="type ==null ? false : type.value >3"
                      #default="{ errors }"
                      rules="required"
                      name="Settlement"
                    >
                      <b-form-group label="Settlement">
                        <v-select
                          v-if="type ==null ? false : type.value >3"
                          v-model="iss"
                          placeholder="ALL"
                          label="title"
                          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                          :state="errors.length > 0 ? false : null"
                          :options="issOptions"
                        />
                        <small class="text-danger">{{ errors[0] }}</small>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                </b-row>
                <br>
              </b-card-body>
            </b-card>
            <b-card no-body>
              <b-card-header class="pb-50">
                <h4>
                  Referral Cases
                </h4>
              </b-card-header>
              <b-card-body>
                <!-- Label-->
                <b-row>
                  <b-col md="3">
                    <b-form-group label="Full Name" />
                  </b-col>
                  <b-col md="4">
                    <b-form-group label="Phone Number" />
                  </b-col>
                  <b-col md="4">
                    <b-form-group label="PCR Date" />
                  </b-col>
                </b-row>
                <!-- Row Loop -->
                <b-row
                  v-for="(item, index) in items"
                  :id="item.id"
                  :key="item.id"
                  ref="row"
                >
                  <!-- Full Name -->
                  <b-col md="3">
                    <validation-provider
                      #default="{ errors }"
                      rules="required|xname"
                      :name="'Full Name ' + item.id"
                    >
                      <b-form-group label-for="full-name">
                        <b-form-input
                          :id="'full-name' + item.id"
                          :ref="'nm'+item.id"
                          :state="errors.length > 0 ? false : null"
                          type="text"
                          data-vv-validate-on="change"
                          placeholder="Enter Full Name"
                          :value="item.name"
                          @keyup.up.prevent="onArrowKey(true,'nm',item.id)"
                          @keyup.down.prevent="onArrowKey(false,'nm',item.id)"
                          @input="(value) => itemNameInput({ value, index: item.id })"
                        />
                        <small class="text-danger">{{ errors[0] }}</small>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <!-- Phone -->
                  <b-col
                    md="4"
                    xl="4"
                  >
                    <b-form-group>
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="'required|' + `phoneInArray:${JSON.stringify(items)},${item.countryid.toString()}
                    ${item.countryid === 1 ? '|' + `phonelbed:${item.id}`: null }` "
                        :name="'Phone Number' + item.id"
                        style="display: inline"
                      >
                        <b-input-group>
                          <template #prepend>
                            <b-dropdown
                              :text="item.country"
                              variant="outline-primary"
                            >
                              <b-dropdown-item
                                v-for="ct in phone.options"
                                :key="ct.id"
                                :value="ct.value"
                                @click="dropSelect(index, ct.value)"
                              >
                                {{ ct.title }}
                              </b-dropdown-item>
                            </b-dropdown>
                          </template>
                          <b-form-input
                            :id="'phone' + item.id"
                            :ref="'ph'+item.id"
                            class="form-control"
                            type="tel"
                            :formatter="formatter"
                            :state="errors.length > 0 ? false : null"
                            :placeholder="phone.placeholder"
                            :value="item.phone"
                            @keyup.up.prevent="onArrowKey(true,'ph',item.id)"
                            @keyup.down.prevent="onArrowKey(false,'ph',item.id)"

                            @input="
                              (value) => itemPhoneInput({ value, index: item.id })
                            "
                          />
                        </b-input-group>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  <!-- PCR Date -->
                  <b-col md="3">
                    <validation-provider
                      #default="{ errors }"
                      rules="required"
                      :name="'PCR Date' + +item.id"
                    >
                      <b-form-group>
                        <flat-pickr
                          :ref="'nat'+item.id"
                          :value="item.pcr_date"
                          class="form-control"
                          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                          placeholder="Enter PCR Date"
                          :state="errors.length > 0 ? false : null"
                          @input="(value) => itemDateInput({ value, index: item.id })"
                        />
                        <small class="text-danger">{{ errors[0] }}</small>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <!-- Remove Button -->
                  <b-col
                    v-show="index > 0"
                    lg="2"
                    md="2"
                    class="mb-50"
                  >
                    <b-button
                      variant="outline-danger"
                      class="mt-0 mt-md-0"
                      @click="removeItem(index)"
                    >
                      <feather-icon
                        icon="XIcon"
                        class="mr-25"
                      />
                      <span>Delete</span>
                    </b-button>
                  </b-col>
                </b-row>
                <b-card-footer>
                  <!-- Row Option -->
                  <b-row
                    align-h="between"
                    class="justify-content"
                  >
                    <b-col
                      cols="auto"
                      class="mb-50"
                    >
                      <b-button
                        variant="primary"
                        @click="repeateAgain"
                      >
                        <feather-icon
                          icon="PlusIcon"
                          class="mr-25"
                        />
                        <span>Add New</span>
                      </b-button>

                      <b-button
                        variant="warning"
                        @click="onPickFile"
                      >
                        <input
                          ref="import"
                          type="file"
                          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          hidden
                          @change="ImportData"
                        >
                        <feather-icon
                          icon="FilePlusIcon"
                          class="mr-1"
                        />
                        <span>Import</span>
                      </b-button>

                      <b-button
                        variant="info"
                        class="mr-1"
                        @click="Export"
                      >
                        <feather-icon
                          icon="FilePlusIcon"
                          class="mr-1"
                        />
                        <span>Export Template</span>
                      </b-button>
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
        </validation-observer>
      </div>
    </b-overlay>
  </div>
</template>

<script>

import vSelect from 'vue-select'
import readXlsxFile from 'read-excel-file'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { heightTransition } from '@core/mixins/ui/transition'
import store from '@/store'
import { mapMutations } from 'vuex'
import { takeState } from 'vuex-dot'
import flatPickr from 'vue-flatpickr-component'

export default {
  components: {
    vSelect,
    ValidationProvider,
    ValidationObserver,
    flatPickr,
  },
  mixins: [heightTransition],
  data() {
    return {
      nextTodoId: 2,
    }
  },
  computed: {
    saved: takeState('createRef', 'saved').commit('createRef/SET_SAVED').map(),
    show: takeState('createRef', 'show').commit('createRef/SET_SHOW').map(),
    // Selected
    phone: takeState('createRef', 'phone').map(),
    referralOptions: takeState('global', 'referral').map(),
    governorateOption: takeState('global', 'governorate').map(),
    districtOptions: takeState('global', 'district').map(),
    cadOptions: takeState('createRef', 'cadOptions').commit('createRef/SET_CAD_OPT').map(),
    typeOptions: takeState('createRef', 'typeOptions').map(),
    issOptions: takeState('createRef', 'issOptions').map(),
    priorityOptions: takeState('global', 'priority').map(),
    municipalityOptions: takeState('createRef', 'cadOptions').map(),
    //
    referral: takeState('createRef', 'referral').commit('createRef/SET_REF').map(),
    governorate: takeState('createRef', 'governorate').commit('createRef/SET_GOV').map(),
    district: takeState('createRef', 'district').commit('createRef/SET_DIS').map(),
    cadaster: takeState('createRef', 'cadaster').commit('createRef/SET_CAD').map(),
    type: takeState('createRef', 'type').commit('createRef/SET_TYPE').map(),
    iss: takeState('createRef', 'iss').commit('createRef/SET_ISS').map(),
    priority: takeState('createRef', 'priority').commit('createRef/SET_PRI').map(),
    districtSelect() {
      return this.districtOptions.filter(item => item.params
      === (this.governorate != null ? this.governorate.value : null))
    },
    ///
    items: takeState('createRef', 'items').map(),

  },
  mounted() {
    this.ResetData()
  },
  methods: {
    ...mapMutations({
      itemNameInput: 'createRef/SET_NAME_ITEM',
      itemPhoneInput: 'createRef/SET_PHONE_ITEM',
      itemCountryInput: 'createRef/SET_CON_ITEM',
      itemDateInput: 'createRef/SET_DATE_ITEM',
    }),
    ChangeDistrict(value) {
      if (value != null) {
        if (this.type != null) {
          this.$store.dispatch('createRef/GET_CAD')
        } else {
          this.$store.dispatch('createRef/GET_TYPE')
        }
      }
    },
    ChangeType(value) {
      if (value != null) {
        if (this.district != null) {
          this.$store.dispatch('createRef/GET_CAD')
        } else {
          this.cadOptions = []
        }
      }
    },
    ChangeCAD(value) {
      if (value != null) {
        this.$store.dispatch('createRef/GET_ISS')
      }
    },
    dropSelect(index, value) {
      this.items[index].countryid = value
      this.items[index].country = this.phone.options.filter(ct => ct.value === value)[0].text
    },
    repeateAgain() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          this.$store.commit('createRef/ADD_ITEMS', {
            id: store.getters['createRef/lastId'].id + 1,
            name: null,
            country: 1,
            phone: null,
            pcr_date: null,
          })
        }
      })
      console.log('Fin')
    },
    removeItem(index) {
      this.$store.commit('createRef/REM_ITEMS', { index })
      this.saved = false
    },
    removeAllItem(all = false) {
      if (all === false) {
        store.commit('createRef/REM_ALL_ITEMS', {
          id: 1, name: null, phone: null, pcr_date: null,
        })
        this.nextTodoId = 2
      } else {
        store.commit('createRef/REM_ALL_ITEMS', {
          all: true,
        })
        this.nextTodoId = 1
      }
      this.saved = false
    },
    initTrHeight() {
      this.trSetHeight(null)
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form.scrollHeight)
      })
    },
    onSelect(newRef) {
      this.repeateAgain()
      setTimeout(() => {
        this.$nextTick(() => {
          this.detailsEditable = true
          this.$refs[newRef][0].focus()
        })
      }, 500)
    },
    onArrowKey(isUp, curRef, index) {
      setTimeout(() => {
        this.$nextTick(() => {
          let nextRef = 'nm1'
          console.log(nextRef)
          if (isUp) {
            nextRef = curRef + (index - 1)
          } else {
            nextRef = curRef + (index + 1)
          }
          console.log(nextRef)
          console.log(this.$refs[nextRef])
          if (this.$refs[nextRef] != null) {
            this.detailsEditable = true
            this.$refs[nextRef][0].focus()
          }
        })
      }, 500)
    },
    formatter(value) {
      const fr = this.fixNumbers(value)
      return fr.replace(/[^0-9]/g, '')
    },
    fixNumbers(str) {
      if (typeof str === 'string') {
        const persianNumbers = [
          /۰/g,
          /۱/g,
          /۲/g,
          /۳/g,
          /۴/g,
          /۵/g,
          /۶/g,
          /۷/g,
          /۸/g,
          /۹/g,
        ]
        const arabicNumbers = [
          /٠/g,
          /١/g,
          /٢/g,
          /٣/g,
          /٤/g,
          /٥/g,
          /٦/g,
          /٧/g,
          /٨/g,
          /٩/g,
        ]
        for (let i = 0; i < 10; i += 1) {
          // eslint-disable-next-line no-param-reassign
          str = str
            .replace(persianNumbers[i], i)
            .replace(arabicNumbers[i], i)
        }
      }
      return str
    },
    ImportData(event) {
      this.removeAllItem(true)
      const xlsxfile = event.target.files ? event.target.files[0] : null
      this.trSetHeight(null)
      readXlsxFile(xlsxfile).then(rows => {
        for (let i = 1; i < rows.length; i += 1) {
          if (rows[i][0] != null) {
            let phco
            if (rows[i][2].toString().toUpperCase() === 'LB') {
              phco = 1
            } else if (rows[i][1].toString().toUpperCase() === 'SY') {
              phco = 2
            } else {
              phco = 1
            }
            this.AddItem(rows[i][0], rows[i][2], phco, 0)
          }
        }
        if (this.items.length === 0) {
          this.ResetData()
        }
      })
      /* this.$swal({
        icon: 'success',
        title: 'Import',
        text: 'You now import file excel please check erro before save.',
        customClass: {
          confirmButton: 'btn btn-success',
        },
      }) */
      this.$forceUpdate()
      // const w = window.innerWidth
      // const h = window.innerHeight
      // window.resizeTo(w, h)
    },
    SaveData() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          this.$store.dispatch('createRef/SAVE_DATA', {
            prefix: this.$route.params.prefixPrj,
          }).then(res => {
            let resData = ''
            for (let i = 0; i < res.length; i += 1) {
              if (res[i][0].result === 1) {
                resData += `<b>Case ${res[i][1].name}, +${res[i][1].phone}:</b></br><p class="text-success"> Success <b>CaseCode: ${res[i][0].ccd}</b></p></br>`
              } else if (res[i][0].result === 2) {
                resData += `<b>Case ${res[i][1].name}, +${res[i][1].phone}:</b></br> is <p class="text-danger">duplicated <b>CaseCode: ${res[i][0].ccd}</b></p></br>`
              } else {
                resData += `<b>Case ${res[i][1].name}, +${res[i][1].phone}:</b></br>  <p class="text-danger">Please call system administrator</p></br>`
              }
            }
            this.$swal({
              title: 'Result!',
              html: `${resData}`,
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
            this.ResetData()
          }).catch(error => {
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
          })
        } else {
          this.$swal({
            title: 'Attention!',
            text: 'Please fill the needed information',
            icon: 'warning',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        }
      })
    },
    AddItem(fullName, phone, country, pcrDate) {
      const id = store.getters['createRef/lastId'] != null ? store.getters['createRef/lastId'].id : 0
      store.commit('createRef/ADD_ITEMS', {
        id: (id + 1), name: fullName, country, phone, pcrDate,
      })
    },
    ResetData() {
      setTimeout(() => { this.saved = false }, 1000)
      this.removeAllItem()
      this.type = null
      this.governorate = null
      this.priority = this.priorityOptions.filter(item => item.value === 4)
      this.$refs.import.value = ''
      this.$refs.form.reset()
      this.$refs.simpleRules.reset()
    },
    download(fileUrl, fileName) {
      const a = document.createElement('a')
      a.href = fileUrl
      a.setAttribute('download', fileName)
      a.click()
    },

    Export() {
      this.download('https://rdms.sawagroup.org/file/Data%20Entry%20Template.xlsx', 'DataEntry.xlsx')
    },
    onPickFile() {
      const result = ((this.items[0].name === null || this.items[0].name === '')
      && (this.items[0].phone === null || this.items[0].phone === '')
      && (this.items[0].pcr_date === null || this.items[0].pcr_date === '')
      && (this.items.length <= 1))
      if (result) {
        this.$refs.import.click()
      } else {
        this.$swal({
          title: 'Save your data!',
          text: 'Please save the entered information before importing.',
          allowOutsideClick: true,
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
      }
    },
  },
}
</script>

<style lang="scss" >
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';

.repeater-form {
  transition: 0.30s height;
}
</style>
