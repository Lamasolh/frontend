<template>
  <!-- modal   -->
  <b-modal
    id="terminationmodal"
    v-model="showEdit"
    ok-only
    size="xl"
    no-close-on-backdrop
    class="modal-dialog"
    title="Case Edit"
    :header-bg-variant="headerBgVariant"
    :header-border-variant="bodyTextVariant"
    :footer-border-variant="bodyTextVariant"
    data-backdrop="static"
    @close="showEdit=false"
  >
    <b-container fluid>
      <b-overlay
        rounded="lg"
        :show="show"
      >
        <validation-observer
          ref="InfoRules"
          tag="form"
        >
          <!-- Full Name / Phone -->
          <b-row>
            <!-- Full Name -->
            <b-col>
              <b-form-group
                label="Full Name"
                label-for="name"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Full Name"
                  rules="required"
                >
                  <b-form-input
                    id="name"
                    v-model="full_name"
                    :state="errors.length > 0 ? false : null"
                    placeholder="Enter a full name"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!-- Phone -->
            <b-col>
              <b-form-group
                label="Phone"
                label-for="Phone"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Phone Number"
                  :rules="'required|' +`${country.id === 1 ? 'phonelbed' : 'min:8|max:11'}`"
                  style="display: inline"
                >
                  <b-input-group>
                    <template #prepend>
                      <b-dropdown
                        :text="country.text"
                        variant="outline-primary"
                      >
                        <b-dropdown-item
                          v-for="ct in phoneOptions"
                          :key="ct.id"
                          :value="ct.value"
                          @click="dropSelect(ct.value)"
                        >
                          {{ ct.title }}
                        </b-dropdown-item>
                      </b-dropdown>
                    </template>
                    <b-form-input
                      v-model.number="country.number"
                      type="tel"
                      dir="ltr"
                      class="form-control"
                      :state="
                        errors.length > 0
                          ? false
                          : null
                      "
                      :placeholder="
                        phoneProps[0].placeholder
                      "
                      :formatter="formatter"
                      @blur="checkDuplicate"
                    />
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!-- Nationality-->
            <b-col>
              <validation-provider
                #default="{ errors }"
                name="Nationality"
              >
                <b-form-group label="Nationality">
                  <v-select
                    v-model="nationality"
                    placeholder="Select Nationality"
                    label="title"
                    :clearable="false"
                    :state="errors.length > 0 ? false : null"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    disabled
                    read_only
                  />
                  <small class="text-danger mb-1">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>
          </b-row>

          <b-row>
            <!-- Gov -->
            <b-col cols="4">
              <validation-provider
                #default="{ errors }"
                rules="required"
                name="Governorate"
              >
                <b-form-group label="Governorate">
                  <v-select
                    v-model="governorate"
                    label="title"
                    placeholder="Select Governorate"
                    :clearable="false"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="governorateOption"
                    :state="errors.length > 0 ? false : null"
                    @input="ChangeGov"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>

            </b-col>
            <!-- District -->
            <b-col cols="4">
              <validation-provider
                #default="{ errors }"
                rules="required"
                name="District"
              >
                <b-form-group label="District">
                  <v-select
                    v-model="district"
                    placeholder="Select District"
                    label="title"
                    :clearable="false"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="districtSelect"
                    :state="errors.length > 0 ? false : null"
                    @input="(value) => ChangeDistrict(value)"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>
            <!-- Type -->
            <b-col cols="4">
              <validation-provider
                #default="{ errors }"
                rules="required"
                name="Type"
              >
                <b-form-group label="Type">
                  <v-select
                    :value="type"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    label="title"
                    placeholder="Select Type"
                    :clearable="false"
                    :options="typeOptions"
                    :state="errors.length > 0 ? false : null"
                    @input="value=>ChangeType(value)"
                  >
                    <template #list-footer>
                      <b-button
                        variant="info"
                        block
                        @click="RefType"
                      >
                        Change Type
                      </b-button>
                    </template>
                  </v-select>
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>
            <!-- Cadaster -->
            <b-col cols="4">
              <validation-provider
                #default="{ errors }"
                rules="required"
                name="Cadaster"
              >
                <b-form-group label="Cadaster">
                  <v-select
                    v-model="cadaster"
                    placeholder="Select Cadaster"
                    label="title"
                    :clearable="false"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="cadOptions"
                    :state="errors.length > 0 ? false : null"
                    @input="value=>ChangeCAD(value)"
                  >
                    <template #list-footer>
                      <b-button
                        variant="info"
                        block
                        @click="RefCad"
                      >
                        Change Cadaster
                      </b-button>
                    </template>
                  </v-select>
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>
            <!-- Settlement -->
            <b-col
              v-if="type ==null ? false : type.value >3"
              cols="4"
            >
              <validation-provider
                v-if="type ==null ? false : type.value >3"
                #default="{ errors }"
                rules="required"
                name="ISs"
              >
                <b-form-group label="Settlement">
                  <v-select
                    v-if="type ==null ? false : type.value >3"
                    v-model="iss"
                    placeholder="Select ISs"
                    label="title"
                    :clearable="false"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :state="errors.length > 0 ? false : null"
                    :options="issOptions"
                  >
                    <template #list-footer>
                      <b-button
                        variant="info"
                        block
                        @click="RefISS"
                      >
                        Change Settlement
                      </b-button>
                    </template>
                  </v-select>
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>
          </b-row>
          <!-- Address -->
          <b-row>
            <!-- Address -->
            <b-col>
              <b-form-group
                label="Text Address"
                label-for="Address"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Address"
                  rules="required"
                >
                  <b-form-input
                    id="Address"
                    v-model="adresstext"
                    :state="errors.length > 0 ? false : null"
                    placeholder="Address"
                    dir="rtl"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>
          <!-- Whatsapp / Latitude / Longitude -->
          <b-row>
            <!-- Whatsapp -->
            <b-col md="6">
              <b-form-group
                label="Whatsapp shared location link"
                label-for="whatsapp"
              >
                <validation-provider
                  #default="{ errors }"
                  name="whatsapplink"
                >
                  <b-input-group>
                    <b-form-input
                      id="watsapplink"
                      ref="link"
                      v-model="wh_lnk"
                      :state="errors.length > 0 ? false : null"
                      placeholder="Paste The Shared location here"
                      readonly
                    />
                    <b-input-group-append>
                      <b-button
                        variant="outline-primary"
                        @click="Paste"
                      >
                        Paste
                      </b-button>
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!-- Latitude location -->
            <b-col>
              <b-form-group
                label="Latitude"
                label-for="latitude"
              >
                <validation-provider
                  #default="{ errors }"
                  name="latitude"
                >
                  <!-- rules="required" -->

                  <b-form-input
                    id="latitude"
                    v-model="address_latitude"
                    type="number"
                    :state="errors.length > 0 ? false : null"
                    placeholder="0.0"
                    readonly
                    disabled
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!-- Longitude location -->
            <b-col>
              <b-form-group
                label="Longitude"
                label-for="longitude"
              >
                <validation-provider
                  #default="{ errors }"
                  name="longitude"
                >
                  <!--rules="required"-->

                  <b-form-input
                    id="longitude"
                    v-model="address_longitude"
                    type="number"
                    :state="errors.length > 0 ? false : null"
                    placeholder="0.0"
                    readonly
                    disabled
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="12">
              <b-card>
                <GmapMap
                  ref="mapRef"
                  :center=" { lat: address_latitude, lng: address_longitude, }"
                  :zoom="16"
                  :options="mapOptions"
                  map-style-id="roadmap"
                  style="width: inherit; height: 600px"
                  @click="handleMapClick"
                >
                  <GmapMarker
                    :position=" {
                      lat: address_latitude,
                      lng: address_longitude,
                    }"
                    :clickable="true"
                    :draggable="true"
                    @drag="handleMarkerDrag"
                    @click="panToMarker"
                  />
                  <gmap-info-window
                    :options="infoOptions"
                    :position="infoWindowPos"
                    :opened="infoWinOpen"
                    @closeclick="infoWinOpen=false"
                  />
                </GmapMap>
              </b-card>
            </b-col>
          </b-row>
        </validation-observer>
      </b-overlay>
    </b-container>

    <template #modal-footer>
      <div class="w-100">
        <p class="float-left">
          Are you sure you want to Edit this case <br>({{ editItem.case_code }}:{{ editItem.full_name }})?
        </p>
        <b-button
          variant="warning"
          size="sm"
          :disabled="show"
          class="float-right"
          @click="Update"
        >
          Update
        </b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
/* eslint-disable prefer-destructuring */
import { takeState } from 'vuex-dot'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import vSelect from 'vue-select'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    vSelect,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,

  },
  data() {
    return {
      headerBgVariant: 'warning',
      headerTextVariant: 'light',
      bodyBgVariant: 'light',
      bodyTextVariant: 'dark',
      footerBgVariant: 'warning',
      footerTextVariant: 'dark',
      mapOptions: {
        disableDefaultUI: true,
        fullscreenControl: true,
      },
      Name: null,
      infoOptions: {
        content: '',
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
      country: {
        id: null,
        text: null,
        number: 0,
      },
      infoWindowPos: null,
      infoWinOpen: false,
      ///
      full_name: null,
      wh_lnk: null,
      phone: null,
      nationality: null,
      governorate: [],
      district: [],
      cadaster: [],
      iss: [],
      type: [],
      typeOptions: [],
      cadOptions: [],
      issOptions: [],
      adresstext: null,
      address_latitude: null,
      address_longitude: null,
      marker: { position: { lat: 0, lng: 0 } },
    }
  },
  computed: {
    show: takeState('geoSplit', 'show').commit('geoSplit/SET_SHOW').map(),
    showEdit: takeState('geoSplit', 'showEdit').commit('geoSplit/SET_SHOW_EDIT').map(),
    editItem: takeState('geoSplit', 'editItem').commit('geoSplit/SET_EDIT_ITEM').map(),
    phoneProps: takeState('global', 'phoneProps').map(),
    phoneOptions: takeState('global', 'phoneOptions').map(),
    nationalityOptions: takeState('global', 'nationality').map(),
    governorateOption: takeState('global', 'governorate').map(),
    districtOptions: takeState('global', 'district').map(),
    districtSelect() {
      return this.districtOptions.filter(item => item.params
      === (this.governorate != null ? this.governorate.value : null))
    },
  },
  watch: {
    showEdit() {

    },
  },
  mounted() {
    const str = this.editItem.case_phone.toString()
    let cnt = null
    if (str.substring(0, 3) === '961') {
      cnt = 1
    } else if (str.substring(0, 3) === '963') {
      cnt = 2
    }
    this.country.id = cnt
    this.country.text = this.phoneOptions.filter(
      it => it.value === cnt,
    )[0].text
    this.country.number = str.substring(3, str.length)

    this.typeOptions = this.editItem.type
    this.cadOptions = this.editItem.cad
    this.issOptions = this.editItem.iss

    this.full_name = this.editItem.full_name
    this.governorate = this.governorateOption.filter(el => el.value === this.editItem.governorate_id)[0]
    this.district = this.districtOptions.filter(el => el.value === this.editItem.district_id)[0]
    this.nationality = this.nationalityOptions.filter(el => el.value === this.editItem.nationality_id)[0]
    this.cadaster = this.cadOptions.filter(el => el.value === this.editItem.cadastre_id)[0]
    this.iss = this.issOptions.filter(el => el.value === this.editItem.is_id)[0]
    this.type = this.typeOptions.filter(el => el.value === this.editItem.st_id)[0]

    this.adresstext = this.editItem.adresstext
    this.address_latitude = this.editItem.address_latitude
    this.address_longitude = this.editItem.address_longitude
    this.marker = { position: { lat: this.address_latitude, lng: this.address_longitude } }
  },
  methods: {
    ChangeGov() {
      this.district = null
      this.cadaster = null
      this.iss = null
      this.typeOptions = []
      this.cadOptions = []
      this.issOptions = []
    },
    ChangeDistrict(value) {
      this.cadaster = null
      this.iss = null
      this.typeOptions = []
      this.cadOptions = []
      this.issOptions = []
      if (value != null) {
        this.$store.dispatch('geoSplit/GET_TYPE_EDIT', { district: this.district }).then(res => {
          this.typeOptions = []
          res.forEach(el => {
            this.typeOptions.push({
              title: el.name,
              title_ar: el.name_ar,
              value: el.st_id,
            })
          })
        })
      }
    },
    ChangeType(value) {
      this.cadaster = null
      this.iss = null
      this.saved = true
      this.cadOptions = []
      this.issOptions = []
      if (value != null) {
        console.log('Type == value')
        this.type = value
        if (value.value <= 3) {
          if (this.cadaster == null) {
            this.cadaster = null
            this.$store.dispatch('geoSplit/GET_CAD_EDIT', { district: this.district, type: this.type }).then(res => {
              this.cadOptions = []
              res.forEach(el => {
                this.cadOptions.push({
                  title: el.cadastre_name,
                  title_ar: el.cadastre_name_ar,
                  value: el.cadastre_id,
                })
              })
            })
          }
        } else {
          console.log('Is s')
          this.cadaster = null
          this.$store.dispatch('geoSplit/GET_CAD_EDIT', { district: this.district, type: this.type }).then(res => {
            this.cadOptions = []
            res.forEach(el => {
              this.cadOptions.push({
                title: el.cadastre_name,
                title_ar: el.cadastre_name_ar,
                value: el.cadastre_id,
              })
            })
          })
        }
        /// //////////////////////
        let nat
        switch (value.value) {
          case 1:
            nat = 2
            break
          case 2:
            nat = 3
            break
          case 3:
            nat = 5
            break
          case 4:
            nat = 3
            break
          case 5:
            nat = 3
            break
          case 6:
            nat = 4
            break
          case 7:
            nat = 4
            break
          default:
            nat = 2
        }
        // eslint-disable-next-line prefer-destructuring
        this.nationality = this.nationalityOptions.filter(
          it => it.value === nat,
        )[0]
      } else {
        this.nationality = null
      }
    },
    ChangeCAD(value) {
      this.iss = null
      this.issOptions = []
      if (value != null) {
        if (this.type.value !== 1 && this.type.value !== 2 && this.type.value !== 3) {
          this.$store.dispatch('geoSplit/GET_ISS_EDIT', { cadaster: this.cadaster, type: this.type }).then(res => {
            this.issOptions = []
            res.forEach(el => {
              this.issOptions.push({
                title: el.is_name,
                title_ar: el.is_name_ar,
                value: el.is_id,
                parms: el.cad_id,
              })
            })
          })
        }
      }
    },
    RefType() {
      this.$store.dispatch('geoSplit/GET_TYPE_EDIT', { district: this.district }).then(res => {
        this.typeOptions = []
        res.forEach(el => {
          this.typeOptions.push({
            title: el.name,
            title_ar: el.name_ar,
            value: el.st_id,
          })
        })
      })
    },
    RefCad() {
      this.$store.dispatch('geoSplit/GET_CAD_EDIT', { district: this.district, type: this.type }).then(res => {
        this.cadOptions = []
        res.forEach(el => {
          this.cadOptions.push({
            title: el.cadastre_name,
            title_ar: el.cadastre_name_ar,
            value: el.cadastre_id,
          })
        })
      })
    },
    RefISS() {
      this.$store.dispatch('geoSplit/GET_ISS_EDIT', { cadaster: this.cadaster, type: this.type }).then(res => {
        this.issOptions = []
        res.forEach(el => {
          this.issOptions.push({
            title: el.is_name,
            title_ar: el.is_name_ar,
            value: el.is_id,
            parms: el.cad_id,
          })
        })
      })
    },
    dropSelect(value) {
      // eslint-disable-next-line prefer-destructuring
      this.country.id = this.phoneOptions.filter(
        ct => ct.value === value,
      )[0].value
      this.country.text = this.phoneOptions.filter(
        ct => ct.value === value,
      )[0].text
    },
    Paste() {
      navigator.clipboard.readText()
        .then(text => {
          if (text === '' || text == null) {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Clipboard is empty',
                icon: 'ClipboardIcon',
                variant: 'warning',
              },
            })
          } else {
            const pat = /^https?:\/\//i
            const regex = new RegExp('q=(.*)%2C(.*)&z')
            const regex1 = new RegExp('@(.*),(.*),')
            const LonLatMatch1 = text.match(regex1)
            // const regex1 = new RegExp('q=(.*)%2C(.*),')
            const LonLatMatch = text.match(regex)
            this.wh_lnk = text
            if (pat.test(text) && LonLatMatch != null) {
              // do stuff
              const Lat = LonLatMatch[1]
              const Lon = LonLatMatch[2]
              this.address_latitude = Lat
              this.address_longitude = Lon
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Paste sucessfully',
                  text,
                  icon: 'ClipboardIcon',
                  variant: 'success',
                },
              })
            } else if (pat.test(text) && LonLatMatch1 != null) {
              const Lat1 = LonLatMatch1[1]
              const Lon1 = LonLatMatch1[2]
              this.address_latitude = Lat1
              this.address_longitude = Lon1
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Paste sucessfully',
                  text,
                  icon: 'ClipboardIcon',
                  variant: 'success',
                },
              })
            } else {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'The pasted link address Url format is not valid!',
                  icon: 'ClipboardIcon',
                  variant: 'warning',
                },
              })
            }
          }
        })
        .catch(err => {
          console.error('Failed to read clipboard contents: ', err)
        })
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
    toggleInfoWindow(marker, idx) {
      this.infoWindowPos = marker.position
      this.infoOptions.content = marker.infoText
      // check if its the same marker that was selected if yes toggle
      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen
      } else {
        this.infoWinOpen = true
        this.currentMidx = idx
      }
    },
    checkDuplicate() {
      this.$store.dispatch('geoSplit/CHECK_DUPL', {
        prefix: this.$route.params.prefixPrj,
        prefixRole: this.$route.params.prefixRole,
        country: this.country,
        caseId: this.editItem.case_id,
        type: this.$route.params.assmnttype,

      }).then(resp => {
        if (resp === 1) {
          this.$swal({
            icon: 'warning',
            title: 'Duplicate',
            text: 'This phone is duplicated',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        }
      }).catch(() => {
        this.$swal({
          title: 'Error!',
          text: 'Please Check internet and try again',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
      })
    },
    Update() {
      this.$refs.InfoRules.validate().then(success => {
        if (success) {
          this.$swal({
            text: `Are you sure you want to update This case (${this.editItem.case_code}:${this.editItem.full_name})`,
            title: 'Update',
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
              this.show1 = false
              this.$store.dispatch('geoSplit/Update', {
                prefix: this.$route.params.prefixPrj,
                prefixRole: this.$route.params.prefixRole,
                case_id: this.editItem.case_id,
                country: this.country,
                full_name: this.full_name,
                nationality: this.nationality,
                cad: this.cadaster,
                iss: this.iss,
                type: this.type,
                projType: this.$route.params.assmnttype,
                adresstext: this.adresstext,
                address_latitude: this.address_latitude,
                address_longitude: this.address_longitude,
              }).then(resl => {
                if (resl[0].result === 1) {
                  this.showEdit = false
                  this.$swal({
                    icon: 'success',
                    title: 'Done!',
                    text: 'The case hase been updated!',
                    customClass: {
                      confirmButton: 'btn btn-success',
                    },
                  })
                } else if (resl[0].result === 2) {
                  this.$swal({
                    icon: 'warning',
                    title: 'Failed!',
                    text: 'The phone number is duplicated!',
                    customClass: {
                      confirmButton: 'btn btn-success',
                    },
                  })
                } else {
                  this.$swal({
                    icon: 'danger',
                    title: 'Failed!',
                    text: 'Contact System administrator!',
                    customClass: {
                      confirmButton: 'btn btn-success',
                    },
                  })
                }
              }).catch(error => {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Operation Failed',
                    icon: 'EditIcon',
                    text: error.toString(),
                    variant: 'danger',
                  },
                })
              })
            }
          })
        }
      })
    },
    // sets the position of marker when dragged
    handleMarkerDrag(e) {
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() }
      this.address_latitude = this.marker.position.lat
      this.address_longitude = this.marker.position.lng
    },
    // Moves the map view port to marker
    panToMarker() {
      this.$refs.mapRef.panTo({
        lat: this.marker.position.lat,
        lng: this.marker.position.lng,
      })
      this.address_latitude = this.marker.position.lat
      this.address_longitude = this.marker.position.lng
    },
    // Moves the marker to click position on the map
    handleMapClick(e) {
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() }
      this.address_latitude = this.marker.position.lat
      this.address_longitude = this.marker.position.lng
    },
  },
}
</script>
