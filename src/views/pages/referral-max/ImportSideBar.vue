<template>
  <b-sidebar
    id="sidebar"
    ref="assign"
    :visible="editToggle"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @change="(val) => (editToggle = val)"
  >
    <template #default="{ hide }">
      <b-overlay
        rounded="lg"
        :show="show"
        style="height: 100%"
      >
        <!-- Header -->
        <div
          class="
            d-flex
            justify-content-between
            align-items-center
            content-sidebar-header
            px-2
            py-1
          "
        >
          <h5 class="mb-0">
            Update
          </h5>

          <feather-icon
            class="ml-1 cursor-pointer"
            icon="XIcon"
            size="16"
            @click="hide"
          />
        </div>
        <!-- BODY -->
        <validation-observer
          v-slot="{ handleSubmit }"
          ref="refFormObserver"
        >
          <!-- Form -->
          <b-form
            class="p-2"
            @submit.prevent="handleSubmit(onSubmit)"
          >
            <!--
            <p>{{ item }}</p>
            <p>{{ indOp }}</p> -->
            <validation-observer ref="simpleRules">
              <!-- Referral -->
              <validation-provider
                v-slot="{ errors }"
                rules="required"
                name="Referral"
              >
                <b-form-group label="Case Referred by:">
                  <v-select
                    v-model="referral"
                    placeholder="Select Referral"
                    label="title"
                    :state="errors.length > 0 ? false : null"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="referralOptions"
                  />
                  <small class="text-danger mb-1">{{
                    errors[0]
                  }}</small>
                </b-form-group>
              </validation-provider>
              <!-- Full Name-->
              <validation-provider
                v-slot="{ errors }"
                rules="required"
                name="FullName"
              >
                <b-form-group label="Full Name">
                  <b-form-input
                    id="full-name"
                    v-model="fullname"
                    :state="errors.length > 0 ? false : null"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    type="text"
                    placeholder="Enter Full Name"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
              <!-- Phone -->
              <b-form-group label="Phone">
                <validation-provider
                  v-slot="{ errors }"
                  :rules="
                    'required|' +
                      `${countryid === 1 ? 'phonelbed' : 'min:8|max:11'}`
                  "
                  name="Phone Number"
                  style="display: inline"
                >
                  <b-input-group>
                    <template #prepend>
                      <b-dropdown
                        :text="country"
                        variant="outline-primary"
                      >
                        <b-dropdown-item
                          v-for="ct in phoneOp.options"
                          :key="ct.id"
                          :value="ct.value"
                          @click="dropSelect(ct.value)"
                        >
                          {{ ct.title }}
                        </b-dropdown-item>
                      </b-dropdown>
                    </template>
                    <b-form-input
                      id="phone"
                      v-model="phone"
                      class="form-control"
                      type="tel"
                      :formatter="formatter"
                      :state="errors.length > 0 ? false : null"
                      :placeholder="phoneOp.placeholder"
                    />
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <!-- PCR Date -->
              <validation-provider
                v-slot="{ errors }"
                rules="required"
                name="PCR Date"
              >
                <b-form-group label="PCR Date">
                  <flat-pickr
                    v-model="pcr_date"
                    class="form-control"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    placeholder="Enter PCR Date"
                    :config="{
                      maxDate: maxDate
                    }"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{
                    errors[0] != null
                      ? 'The date must be previously until today'
                      : ''
                  }}</small>
                </b-form-group>
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                rules="required"
                name="Governorate"
              >
                <b-form-group label="Governorate">
                  <v-select
                    v-model="governorate"
                    label="title"
                    placeholder="ALL"
                    :dir="
                      $store.state.appConfig.isRTL ? 'rtl' : 'ltr'
                    "
                    :options="governorateOption"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
              <!-- District -->
              <validation-provider
                v-slot="{ errors }"
                rules="required"
                name="District"
              >
                <b-form-group label="District">
                  <v-select
                    v-model="district"
                    placeholder="ALL"
                    label="title"
                    :dir="
                      $store.state.appConfig.isRTL ? 'rtl' : 'ltr'
                    "
                    :options="districtSelect"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
              <!-- Type -->
              <validation-provider
                v-slot="{ errors }"
                rules="required"
                name="Type"
              >
                <b-form-group label="Residential Type">
                  <v-select
                    v-model="type"
                    :dir=" $store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    label="title"
                    placeholder="ALL"
                    :options="typeOptions"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
              <!-- Cadaster -->
              <validation-provider
                v-slot="{ errors }"
                rules="required"
                name="Cadaster"
              >
                <b-form-group label="Cadaster">
                  <v-select
                    v-model="cadaster"
                    placeholder="ALL"
                    label="title"
                    :dir="
                      $store.state.appConfig.isRTL ? 'rtl' : 'ltr'
                    "
                    :options="cadasterSelect"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>

              <!-- Settlement -->

              <div v-if="type == null ? false : type.value > 3">
                <validation-provider
                  v-if="type == null ? false : type.value > 3"
                  v-slot="{ errors }"
                  rules="required"
                  name="Settlement"
                >
                  <b-form-group label="Settlement">
                    <v-select
                      v-if="type == null ? false : type.value > 3"
                      v-model="iss"
                      placeholder="ALL"
                      label="title"
                      :dir="
                        $store.state.appConfig.isRTL ? 'rtl' : 'ltr'
                      "
                      :state="errors.length > 0 ? false : null"
                      :options="issSelect"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                </validation-provider>
              </div>
              <validation-provider
                v-slot="{ errors }"
                rules="required"
                name="Gender"
              >
                <b-form-group
                  label="Gender"
                  label-for="Gender"
                >
                  <v-select
                    v-model="gender"
                    placeholder="Select Gender"
                    label="title"
                    :clearable="false"
                    :dir="
                      $store.state.appConfig.isRTL ? 'rtl' : 'ltr'
                    "
                    :options="genderOptions"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger mb-1">{{
                    errors[0]
                  }}</small>
                </b-form-group>
              </validation-provider>

              <!-- PCR Result -->
              <validation-provider
                v-slot="{ errors }"
                rules="required"
                name="PCR Result"
              >
                <b-form-group
                  label="PCR Result"
                  label-for="PCR Result"
                >
                  <v-select
                    v-model="pcres"
                    placeholder="Select PCR Result"
                    label="title"
                    :clearable="false"
                    :dir="
                      $store.state.appConfig.isRTL ? 'rtl' : 'ltr'
                    "
                    :options="pcrResultOption"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger mb-1">{{
                    errors[0]
                  }}</small>
                </b-form-group>
              </validation-provider>
              <h3>Family Info</h3>
              <!-- Male Count -->

              <b-form-group label="Male Count">
                <b-form-input
                  id="malecount"
                  v-model="male_count"
                  type="number"
                  class="lg"
                  min="0"
                  oninput="validity.valid||(value='');"
                  placeholder="Enter the number of males"
                />

              </b-form-group>

              <b-form-group label="Female Count">
                <b-form-input
                  id="femalecount"
                  v-model="female_count"
                  type="number"
                  class="lg"
                  min="0"
                  oninput="validity.valid||(value='');"
                  placeholder="Enter the number of females"
                />

              </b-form-group>
              <!-- infected count -->

              <b-form-group label="Infected Count">
                <b-form-input
                  id="infectedcount"
                  v-model="infected_count"
                  type="number"
                  :disabled="family <= 0"
                  class="lg"
                  :min="1"
                  oninput="validity.valid||(value='');"
                  placeholder="Enter the number of infected individuals."
                />
              </b-form-group>

              <!-- Babies 0-5 Count -->

              <b-form-group label="Babies Count">
                <p>
                  Enter the number of people aged 0 - 5 years
                </p>
                <b-form-input
                  id="babiescount"
                  v-model="yng_child_count"
                  type="number"
                  class="lg"
                  min="0"
                  oninput="validity.valid||(value='');"
                  placeholder="Enter the count of Babies"
                />
              </b-form-group>

              <b-form-group label="Child Count">
                <p>
                  Enter the number of people aged between 6 - 11 years
                </p>
                <b-form-input
                  id="childcount"
                  v-model="child_count"
                  type="number"
                  class="lg"
                  min="0"
                  oninput="validity.valid||(value='');"
                  placeholder="Enter the number of children"
                />
              </b-form-group>

              <b-form-group label="Young Count">
                <p>
                  Enter the number of people aged 12-17 years
                </p>
                <b-form-input
                  id="young_count"
                  v-model="young_count"
                  type="number"
                  class="lg"
                  min="0"
                  oninput="validity.valid||(value='');"
                  placeholder="Enter the number of young people."
                />
              </b-form-group>

              <!-- teenager 18- 25 Count -->

              <b-form-group label="Teenager Count">
                <p>
                  Enter the number of people aged between 18 - 25 years
                </p>
                <b-form-input
                  id="teenager_count"
                  v-model="teenager_count"
                  type="number"
                  class="lg"
                  min="0"
                  oninput="validity.valid||(value='');"
                  placeholder="Enter the number of teenager people."
                />
              </b-form-group>

              <b-form-group label="Adult Count">
                <p>
                  Enter the number of people aged between 26 - 64 years
                </p>
                <b-form-input
                  id="adult_count"
                  v-model="adult_count"
                  type="number"
                  class="lg"
                  min="0"
                  oninput="validity.valid||(value='');"
                  placeholder="Enter the number of adults"
                />
              </b-form-group>

              <b-form-group label="Elderly Count">
                <p>
                  Enter the number of people over the age
                  over 65 years old
                </p>
                <b-form-input
                  id="elderly_count"
                  v-model="elderly_count"
                  type="number"
                  class="lg"
                  min="0"
                  oninput="validity.valid||(value='');"
                  placeholder="Enter the number of elderly people"
                />
              </b-form-group>

              <br>
              <h3>Other Info</h3>
              <!-- The household is the infected   -->
              <b-form-group>
                <b-form-checkbox
                  id="household"
                  v-model="house_hold"
                  name="household"
                >
                  Is the head of the family the affected person?
                </b-form-checkbox>
              </b-form-group>
              <b-form-group>
                <b-form-checkbox
                  id="Pregnant"
                  v-model="pregnant"
                  name="Pregnant"
                >
                  There is a pregnant woman in the family
                </b-form-checkbox>
              </b-form-group>
              <!-- payments -->
              <b-form-group>
                <b-form-checkbox
                  id="paymnts"
                  v-model="monthly_payments"
                  name="paymnts"
                >
                  Are there any payments due!?
                </b-form-checkbox>
              </b-form-group>
              <!-- isolation -->

              <b-form-group>
                <b-form-checkbox
                  id="isolation"
                  v-model="isolation_room"
                  name="isolation"
                >
                  Are the infected cases isolated in a separate room!?
                </b-form-checkbox>
              </b-form-group>
              <!-- Employment Type -->
              <b-form-group label="Employement Type">
                <v-select
                  v-model="employment"
                  placeholder="Select the type of employment"
                  label="title"
                  :clearable="false"
                  :options="emplymntOptions"
                />
              </b-form-group>
              <!-- care giver -->

              <b-form-group
                label="Who takes care of the affected case?"
              >
                <v-select
                  v-model="caregiver"
                  placeholder="Determine who takes care of infected cases"
                  label="title"
                  :clearable="false"
                  :options="giveroption"
                />
              </b-form-group>
              <!-- Address -->
              <b-form-group label="Address">
                <b-form-input
                  id="Address"
                  v-model="adresstext"
                  placeholder="Type your full address"
                />
              </b-form-group>
              <br>
              <h3>Extra Field</h3>
              <!-- Main: Project Extra Field Info-->

              <div
                v-for="mmm in multiField.filter(el=>!el.isInd)"
                ref="row"
                :key="mmm.id"
              >
                <validation-provider
                  v-slot="{ errors }"
                  :name="mmm.name"
                >
                  <b-form-group :label="mmm.name">
                    <b-form-input
                      v-if="(mmm.type ===1)"
                      v-model="mmm.value"
                      :state="errors.length > 0 ? false : null"
                      type="text"
                      :placeholder="mmm.desc"
                      min="0"
                      oninput="validity.valid||(value='');"
                    />
                    <b-form-input
                      v-else-if="(mmm.type ===2)"
                      v-model="mmm.value"
                      :state="errors.length > 0 ? false : null"
                      type="number"
                      :placeholder="mmm.desc"
                    />

                    <flat-pickr
                      v-else-if="(mmm.type===3)"
                      v-model="mmm.value"
                      class="form-control"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :placeholder="mmm.desc"
                      :state="errors.length > 0 ? false : null"
                    />
                    <v-select
                      v-else-if="(mmm.type ===4)"
                      v-model="mmm.value"
                      :placeholder="mmm.desc"
                      label="title"
                      :clearable="false"
                      :state="errors.length > 0 ? false : null"
                      :options="yesNo"
                    />

                    <small class="text-danger mb-1">{{ errors[0] }}</small>
                  </b-form-group>
                </validation-provider>
              </div>
            </validation-observer>
            <b-row class="justify-content-md-center">
              <b-button
                block
                variant="primary"
                @click="Update"
              >
                Update
              </b-button>
            </b-row>
          </b-form>
        </validation-observer>
      </b-overlay>
    </template>
  </b-sidebar>
</template>

<script>
import Ripple from 'vue-ripple-directive'
import { takeState } from 'vuex-dot'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    vSelect,
    flatPickr,
  },
  directives: {
    Ripple,
  },
  computed: {
    show: takeState('referralEXlS', 'show').map(),
    item: takeState('referralEXlS', 'itemEdit').commit('referralEXlS/ITEM_EDIT_CHNG').map(),
    editToggle: takeState('referralEXlS', 'editToggle').commit('referralEXlS/TOGGLE_EDIT_CHNG').map(),
    /// Options
    phoneOp: takeState('referralEXlS', 'phoneOp').map(),
    governorateOption: takeState('referralEXlS', 'govOp').map(),
    districtOptions: takeState('referralEXlS', 'disOp').map(),
    referralOptions: takeState('referralEXlS', 'referralOp').map(),
    typeOptions: takeState('referralEXlS', 'typeOp').map(),
    cadOptions: takeState('referralEXlS', 'cadOp').map(),
    issOptions: takeState('referralEXlS', 'issOp').map(),
    pcrResultOption: takeState('referralEXlS', 'pcrOp').map(),
    genderOptions: takeState('referralEXlS', 'genderOp').map(),
    emplymntOptions: takeState('referralEXlS', 'empOp').map(),
    giveroption: takeState('referralEXlS', 'carOp').map(),
    indOp: takeState('referralEXlS', 'indOp').map(),
    dataTypeOptions: takeState('referralEXlS', 'dataTypeOp').map(),
    yesNo: takeState('referralEXlS', 'yesNo').map(),
    /// Data Basic
    fullname: takeState('referralEXlS', 'fullname').commit('referralEXlS/SET_NAME').map(),
    phone: takeState('referralEXlS', 'phone').commit('referralEXlS/SET_PHONE').map(),
    country: takeState('referralEXlS', 'country').commit('referralEXlS/SET_CTR').map(),
    countryid: takeState('referralEXlS', 'countryid').commit('referralEXlS/SET_CTR_ID').map(),
    pcr_date: takeState('referralEXlS', 'pcr_date').commit('referralEXlS/SET_PCR_DATE').map(),
    referral: takeState('referralEXlS', 'referral').commit('referralEXlS/SET_REF').map(),
    governorate: takeState('referralEXlS', 'governorate').commit('referralEXlS/SET_GOV').map(),
    district: takeState('referralEXlS', 'district').commit('referralEXlS/SET_DIS').map(),
    cadaster: takeState('referralEXlS', 'cadaster').commit('referralEXlS/SET_CAD').map(),
    type: takeState('referralEXlS', 'type').commit('referralEXlS/SET_TYPE').map(),
    iss: takeState('referralEXlS', 'iss').commit('referralEXlS/SET_ISS').map(),
    pcres: takeState('referralEXlS', 'pcres').commit('referralEXlS/SET_PCR_RES').map(),
    gender: takeState('referralEXlS', 'gender').commit('referralEXlS/SET_GEN').map(),
    // Family Info
    family_members: takeState('referralEXlS', 'family_members').commit('referralEXlS/SET_FALMILY').map(),
    male_count: takeState('referralEXlS', 'male_count').commit('referralEXlS/SET_MALE').map(),
    female_count: takeState('referralEXlS', 'female_count').commit('referralEXlS/SET_FEMALE').map(),
    infected_count: takeState('referralEXlS', 'infected_count').commit('referralEXlS/SET_INFECTED').map(),
    yng_child_count: takeState('referralEXlS', 'yng_child_count').commit('referralEXlS/SET_YNG_CHILD').map(),
    child_count: takeState('referralEXlS', 'child_count').commit('referralEXlS/SET_CHILD').map(),
    young_count: takeState('referralEXlS', 'young_count').commit('referralEXlS/SET_YOUNG').map(),
    teenager_count: takeState('referralEXlS', 'teenager_count').commit('referralEXlS/SET_TEENAGER').map(),
    adult_count: takeState('referralEXlS', 'adult_count').commit('referralEXlS/SET_ADULT').map(),
    elderly_count: takeState('referralEXlS', 'elderly_count').commit('referralEXlS/SET_ELDERLY').map(),

    /// Other
    employment: takeState('referralEXlS', 'employment').commit('referralEXlS/SET_EMPL').map(),
    caregiver: takeState('referralEXlS', 'caregiver').commit('referralEXlS/SET_GVR').map(),
    house_hold: takeState('referralEXlS', 'house_hold').commit('referralEXlS/SET_HOUSEHOLD').map(),
    pregnant: takeState('referralEXlS', 'pregnant').commit('referralEXlS/SET_PREGNANT').map(),
    monthly_payments: takeState('referralEXlS', 'monthly_payments').commit('referralEXlS/SET_DUEPAY').map(),
    isolation_room: takeState('referralEXlS', 'isolation_room').commit('referralEXlS/SET_ISOL').map(),
    adresstext: takeState('referralEXlS', 'adresstext').commit('referralEXlS/SET_ADDRESS').map(),

    /// MUltifield
    multiField: takeState('referralEXlS', 'indOp').commit('referralEXlS/ADD_ITEMS_FILED').map(),
    ///
    family() {
      return (this.male_count ?? 0) + (this.female_count ?? 0)
    },
    maxDate() {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      // 15th in two months
      const maxDate = new Date(today)
      return maxDate
    },
    minDate() {
      const d = new Date()
      d.setDate(d.getDate() - 7)
      return d
    },
    /// Select
    districtSelect() {
      return this.districtOptions.filter(
        item => item.govId
          === (this.governorate != null ? this.governorate.value : null),
      )
    },
    cadasterSelect() {
      return this.cadOptions.filter(
        item => item.disId
          === (this.district != null ? this.district.value : null),
      )
    },
    issSelect() {
      return this.issOptions.filter(
        item => item.cadId
          === (this.cadaster != null ? this.cadaster.value : null),
      )
    },
  },
  methods: {
    dropSelect(value) {
      console.log(value)
      this.countryid = value
      this.country = this.phoneOp.options.filter(
        ct => ct.value === value,
      )[0].text
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
          str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i)
        }
      }
      return str
    },
    Update() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          console.log(this.$store)
          this.$store.dispatch('referralEXlS/UPDATE').then(() => {
            console.log(this.$parent.$parent.$refs.selectableTable)
            this.$parent.$parent.$refs.selectableTable.refresh()
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'EditIcon',
                variant: 'success',
              },
            })
          })
        } else {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Missing Data',
              icon: 'EditIcon',
              variant: 'warning',
            },
          })
        }
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
#sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
  width: 45em;
}
</style>
