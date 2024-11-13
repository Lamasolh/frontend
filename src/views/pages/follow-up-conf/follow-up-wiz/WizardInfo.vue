<template>
  <div>
    <!-- Case Basic Information -->
    <b-row>
      <b-col>
        <h5 class="mb-0">
          Case Basic Information test
        </h5>
        <small class="text-muted">
          Enter or Edit The Case Basic Information
        </small>
      </b-col>
    </b-row>
    <!-- Full Name / Phone -->
    <b-row>
      <!-- Full Name -->
      <b-col>
        <b-form-group
          label="Full Name"
          label-for="name"
        >
          <validation-provider
            v-slot="{ errors }"
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
                v-model="country.number"
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
    </b-row>
    <!-- Gender / Nationality / Referral -->
    <b-row>
      <!-- Gender -->
      <b-col>
        <validation-provider
          v-slot="{ errors }"
          rules="required"
          name="Gender"
        >
          <b-form-group label="Gender">
            <v-select
              v-model="gender"
              placeholder="Select Gender"
              label="title"
              :clearable="false"
              :state="errors.length > 0 ? false : null"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="genderOptions"
            />
            <small class="text-danger mb-1">{{ errors[0] }}</small>
          </b-form-group>
        </validation-provider>
      </b-col>
      <!-- Nationality-->
      <b-col>
        <validation-provider
          v-slot="{ errors }"
          rules="required"
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
      <!-- Referral -->
      <b-col>
        <validation-provider
          v-slot="{ errors }"
          rules="required"
          name="Referral"
        >
          <b-form-group label="Referred By">
            <v-select
              v-model="referral"
              placeholder="Select Referral"
              label="title"
              :clearable="false"
              disabled
              read-only
              :state="errors.length > 0 ? false : null"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="referralOptions"
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
          v-slot="{ errors }"
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
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </b-form-group>
        </validation-provider>

      </b-col>
      <!-- District -->
      <b-col cols="4">
        <validation-provider
          v-slot="{ errors }"
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
          v-slot="{ errors }"
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
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </b-form-group>
        </validation-provider>
      </b-col>
      <!-- Cadaster -->
      <b-col cols="4">
        <validation-provider
          v-slot="{ errors }"
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
            />
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
          v-slot="{ errors }"
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
              @input="munChange"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </b-form-group>
        </validation-provider>
      </b-col>
      <!-- Button -->
      <b-col
        v-if="(type ==null ? false : type.value >3)&& (iss!=null)"
        cols="4"
        class="mt-2"
      >
        <b-button
          variant="outline-primary"
          block

          @click="SameIss"
        >
          Paste Location ISs
        </b-button>
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
            v-slot="{ errors }"
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
            v-slot="{ errors }"
            rules="required|min_value:33|max_value:37"

            name="latitude"
          >
            <!-- rules="required" -->

            <b-form-input
              id="latitude"
              v-model="address_latitude"
              type="number"
              :state="errors.length > 0 ? false : null"
              placeholder="0.0"
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
            v-slot="{ errors }"
            rules="required|min_value:33|max_value:37"
            name="longitude"
          >
            <!--rules="required"-->

            <b-form-input
              id="longitude"
              v-model="address_longitude"
              type="number"
              :state="errors.length > 0 ? false : null"
              placeholder="0.0"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
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
            v-slot="{ errors }"
            name="Address"
            rules="required"
          >
            <b-form-input
              id="Address"
              v-model="adresstext"
              :state="errors.length > 0 ? false : null"
              placeholder="Address"
              dir="rtl"
              @focus="$event.target.select()"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <h5 class="mb-0">
          Extra Field
        </h5>
      </b-col>
    </b-row>
    <!-- Main: Project Indicators Info -->
    <div>
      <b-row
        v-for="item in multiField.filter(el=>!el.isInd)"
        ref="row"
        :key="item.id"
      >
        <b-col md="6">
          <validation-provider
            v-slot="{ errors }"
            :rules="item.require ===1? 'required':'' "
            :name="item.name"
          >
            <b-form-group :label="item.name">
              <b-form-input
                v-if="(item.type ===1)"
                v-model="item.value"
                :state="errors.length > 0 ? false : null"
                type="text"
                :placeholder="item.desc"
                min="0"
                oninput="validity.valid||(value='');"
                @input="updateExtrafield"
              />
              <b-form-input
                v-else-if="(item.type ===2)"
                v-model="item.value"
                :state="errors.length > 0 ? false : null"
                type="number"
                :placeholder="item.desc"
                @input="updateExtrafield"
              />

              <flat-pickr
                v-else-if="(item.type===3)"
                v-model="item.value"
                class="form-control"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :placeholder="item.desc"
                :state="errors.length > 0 ? false : null"
                @input="updateExtrafield"
              />
              <v-select
                v-else-if="(item.type ===4)"
                v-model="item.value"
                :placeholder="item.desc"
                label="title"
                :clearable="false"
                :state="errors.length > 0 ? false : null"
                :options="yesNo"
                @input="updateExtrafield"
              />

              <v-select
                v-else-if="(item.type ===5)"
                v-model="item.value"
                :placeholder="item.desc"
                label="title"
                :clearable="false"
                :state="errors.length > 0 ? false : null"
                :options="item.inPages.options"
                @input="updateExtrafield"
              />
              <small class="text-danger mb-1">{{ errors[0] }}</small>
            </b-form-group>
          </validation-provider>
        </b-col>
      </b-row>
    </div>
    <b-row>
      <b-col
        v-if="address_latitude != null || address_longitude != null"
        lg="12"
      >
        <b-card>
          <GmapMap
            ref="mapRef"
            :center=" { lat: parseFloat(address_latitude), lng: parseFloat(address_longitude), }"
            :zoom="8"
            map-type-id="terrain"
            style="width: inherit; height: 600px"
          >
            <GmapMarker
              :position=" {
                lat: parseFloat(address_latitude),
                lng: parseFloat(address_longitude),
              }"
              :clickable="true"
              @click="toggleInfoWindow(m,index)"
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
  </div>
</template>
<script>
import Ripple from 'vue-ripple-directive'
import { BButton } from 'bootstrap-vue'
// eslint-disable-next-line import/no-unresolved
import { takeState } from 'vuex-dot'
import vSelect from 'vue-select'
import { ValidationProvider } from 'vee-validate'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import flatPickr from 'vue-flatpickr-component'

export default {
  components: {
    BButton,
    vSelect,
    ValidationProvider,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
    flatPickr,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      wh_lnk: null,
      show1: false,
      headerBgVariant: 'light-warning',
      headerTextVariant: 'light',
      bodyBgVariant: 'dark',
      bodyTextVariant: 'dark',
      footerBgVariant: 'warning',
      footerTextVariant: 'dark',
      infoOptions: {
        content: '',
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
      infoWindowPos: null,
      infoWinOpen: false,
    }
  },
  computed: {
    yesNo: takeState('followUpWizConf', 'yesNo').map(),

    phoneissue: takeState('followUpWizConf', 'phoneissue').commit('followUpWizConf/SET_PHN_ISS').map(),
    orglistselect: takeState('followUpWizConf', 'orglistselect').commit('followUpWizConf/SET_SELECTD_VAL_ORG').map(),
    ...takeState('followUpWizConf', 'items')
      .expose([
        'case_id',
        'full_name',
        'org_id',
        'case_phone',
        'nationality_id',
        'referral_id',
        'cadastre_id',
        'address_latitude',
        'address_longitude',
        'adresstext',
        'district_id'])
      .commit('followUpWizConf/SET_ITEM')
      .map(),
    items: takeState('followUpWizConf', 'items').map(),
    // Options
    genderOptions: takeState('global', 'gender').map(),
    phoneOptions: takeState('global', 'phoneOptions').map(),
    phoneProps: takeState('global', 'phoneProps').map(),
    orgOption: takeState('followUpWizConf', 'orglist').map(),
    priorityOptions: takeState('global', 'priority').map(),
    nationalityOptions: takeState('global', 'nationality').map(),
    //
    show: takeState('followUpWizConf', 'show').commit('followUpWizConf/SET_SHOW').map(),
    referralOptions: takeState('followUpWizConf', 'referralOptions').map(),
    governorateOption: takeState('global', 'governorate').map(),
    districtOptions: takeState('global', 'district').map(),
    cadOptions: takeState('followUpWizConf', 'cadOptions').map(),
    typeOptions: takeState('followUpWizConf', 'typeOptions').map(),
    issOptions: takeState('followUpWizConf', 'issOptions').map(),
    // Select Value
    referral: takeState('followUpWizConf', 'referral').commit('followUpWizConf/SET_REF').map(),
    governorate: takeState('followUpWizConf', 'governorate').commit('followUpWizConf/SET_GOV').map(),
    district: takeState('followUpWizConf', 'district').commit('followUpWizConf/SET_DIS').map(),
    cadaster: takeState('followUpWizConf', 'cadaster').commit('followUpWizConf/SET_CAD').map(),
    type: takeState('followUpWizConf', 'type').commit('followUpWizConf/SET_TYPE').map(),
    iss: takeState('followUpWizConf', 'iss').commit('followUpWizConf/SET_ISS').map(),
    nationality: takeState('followUpWizConf', 'nationality').commit('followUpWizConf/SET_NAT').map(),
    gender: takeState('followUpWizConf', 'gender').commit('followUpWizConf/SET_GEN').map(),
    country: takeState('followUpWizConf', 'country').commit('followUpWizConf/SET_CON').map(),
    multiField: takeState('followUpWizConf', 'filedOptions').commit('followUpWizConf/ADD_ITEMS_FILED').map(),

    districtSelect() {
      return this.districtOptions.filter(item => item.params
      === (this.governorate != null ? this.governorate.value : null))
    },
  },
  mounted() {
    this.wh_lnk = null
    this.show1 = false
    this.infoOptions = {
      content: '',
      pixelOffset: {
        width: 0,
        height: -35,
      },
    }
    this.infoWindowPos = null
    this.infoWinOpen = false
  },
  methods: {
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
    updateExtrafield() {
      this.$store.commit('followUpWizConf/CALC_SCORE')
    },
    munChange() {
      this.$store.dispatch('followUpWizConf/GetOrglist', {
        prefix: this.$route.params.prefixPrj,
        type: this.$route.params.assmnttype,
      }).then(reslt => {
        /// ////// try and catch //////////////////
        const res = reslt.result
        console.log(res)
        if (res === 1) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'This cadatstre still belongs to your Org AoI.',
              icon: 'EditIcon',
              variant: 'info',
            },
          })
        } else if (res === 2 || res === 3) {
          let str
          if (res === 2) {
            str = `Do you want to change the current organization to ${reslt.orgName}?`
          } else {
            str = `There is no organization assigned to this settlement, Do you want to change to the nearst organization (${reslt.orgName}) assigned for the same kind of satelments?`
          }
          this.$swal({
            title: 'Attention',
            text: str,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes!',
            customClass: {
              confirmButton: 'btn btn-primary',
              cancelButton: 'btn btn-outline-danger ml-1',
            },
            buttonsStyling: false,
          }).then(result => {
            if (result.value) {
              this.org_id = reslt.orgid
              console.log(this.items)
              /// ///////////
            } else {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Will keep the case for the same organization.',
                  icon: 'EditIcon',
                  variant: 'info',
                },
              })
            }
          })
        } else if (res === 4) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'There is no geosplit for this type of satlment!',
              icon: 'AlertCircleIcon',
              variant: 'warning',
            },
          })
        } else {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Error Contact Administrator!',
              icon: 'AlertCircleIcon',
              variant: 'danger',
            },
          })
        }
      }).catch(error => {
        console.log('catch', error)
      })
      /// /////end try and catch ////////////
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
    ChangeDistrict(value) {
      if (value != null) {
        this.$store.dispatch('followUpWizConf/GET_TYPE')
      }
    },
    ChangeType(value) {
      if (value != null) {
        console.log('Type == value')
        this.type = value
        if (value.value <= 3) {
          if (this.cadaster != null) {
            this.munChange()
          } else {
            this.cadaster = null
            this.$store.dispatch('followUpWizConf/GET_CAD')
          }
        } else {
          console.log('Is s')
          this.cadaster = null
          this.$store.dispatch('followUpWizConf/GET_CAD')
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
      if (value != null) {
        if (this.type.value !== 1 && this.type.value !== 2 && this.type.value !== 3) {
          this.$store.dispatch('followUpWizConf/GET_ISS')
        } else {
          this.munChange()
        }
      }
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
    SameIss() {
      this.$store.dispatch('followUpWizConf/GET_LAT_LNG').then(resp => {
        console.log(resp)
        this.address_latitude = resp.data.latitude
        this.address_longitude = resp.data.longitude
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Paste sucessfully',
            text: 'Get Iss Latitude & Longitude',
            icon: 'ClipboardIcon',
            variant: 'success',
          },
        })
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
            const regex2 = new RegExp('^(-?\\d+(\\.\\d+)?),\\s*(-?\\d+(\\.\\d+)?)$')
            // const regex1 = new RegExp('q=(.*)%2C(.*),')
            const LonLatMatch = text.match(regex)
            const LonLatMatch1 = text.match(regex1)
            const LonLatMatch2 = text.match(regex2)
            this.wh_lnk = text
            console.log(pat.test(text), LonLatMatch1, LonLatMatch, LonLatMatch2)
            if (!pat.test(text) && LonLatMatch2 != null) {
              const Lat = LonLatMatch2[1]
              const Lon = LonLatMatch2[3]
              console.log(Lat, Lon)
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
            } else if (pat.test(text) && LonLatMatch != null) {
              // do stuff
              const Lat = LonLatMatch[1]
              const Lon = LonLatMatch[2]
              console.log(Lat, Lon)
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
              /// const pat1 = /^https?:\/\//i

              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'This is text not Google Map Url',
                  icon: 'ClipboardIcon',
                  variant: 'warning',
                },
              })
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
    SubmitOrgChange() {
      if (this.orglistselect === null) {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Select an Org before submition',
            icon: 'ClipboardIcon',
            variant: 'warning',
          },
        })
      } else {
        this.org_id = this.orgOption[0].value
        this.show1 = false
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'The case is referred successfully.',
            icon: 'CoffeeIcon',
            variant: 'success',
          },
        })
        this.orglistselect = []
      }
    },
    orgmodalcls() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Changing process is aborted.',
          icon: 'ClipboardIcon',
          variant: 'warning',
        },
      })
      this.orglistselect = []
    },
    checkDuplicate() {
      this.$store.dispatch('followUpWizConf/CHECK_DUPL', {
        prefix: this.$route.params.prefixPrj,
        prefixRole: this.$route.params.prefixRole,
        type: this.$route.params.assmnttype,
        caseId: this.case_id,
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
  },

}
</script>
<style lang="scss">
    @import '@core/scss/vue/libs/vue-select.scss';
    @import '@core/scss/vue/libs/vue-flatpicker.scss';

</style>
