<template>
  <b-card id="cl">
    <b-overlay
      :show="show"
      rounded="sm"
    >
      <b-card-body
        id="bd"
        class="text-left"
      >
        <validation-observer ref="simpleRules">
          <b-form>
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <!-- Referral -->
              <b-col>
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
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :options="referralOptions"
                      :state="errors.length > 0 ? false : null"
                    />
                    <small class="text-danger mb-1">{{
                      errors[0]
                    }}</small>
                  </b-form-group>
                </validation-provider>
              </b-col>
            </b-row>
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <!-- PCR Result -->
              <b-col>
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="PCR Result"
                >
                  <b-form-group label="PCR Result">
                    <v-select
                      v-model="pcres"
                      placeholder="Select PCR Result"
                      label="title"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :options="pcrResult"
                      :state="errors.length > 0 ? false : null"
                    />
                    <small class="text-danger mb-1">{{
                      errors[0]
                    }}</small>
                  </b-form-group>
                </validation-provider>
              </b-col>
            </b-row>
            <!-- PCR Date -->
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col>
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="PCR Date"
                >
                  <b-form-group
                    label="PCR Date"
                    label-for="name"
                  >
                    <flat-pickr
                      v-model="pcr_date"
                      class="form-control"
                      placeholder="Enter PCR Date"
                      :config="{
                        maxDate: maxDate,
                      }"
                      :state="errors.length > 0 ? false : null"
                    />
                    <small class="text-danger">{{
                      errors[0] != null
                        ? `The date must be between today and ${priority_period} days before`
                        : ''
                    }}</small>
                  </b-form-group>
                </validation-provider>
              </b-col>
            </b-row>

            <!-- Full Name -->
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col>
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="Full Name"
                >
                  <b-form-group
                    label="Full Name"
                    label-for="name"
                  >
                    <b-form-input
                      id="name"
                      v-model="full_name"
                      :state="errors.length > 0 ? false : null"
                      placeholder="Enter the full name"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                </validation-provider>
              </b-col>
            </b-row>
            <!-- Phone -->
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col>
                <b-form-group label="Phone Number">
                  <validation-provider
                    v-slot="{ errors }"
                    name="phone"
                    :rules="
                      'required|' +
                        `${
                          id === 1
                            ? 'phonelbed'
                            : 'min:8|max:11'
                        }`
                    "
                    style="display: inline"
                  >
                    <b-input-group>
                      <template #prepend>
                        <b-dropdown
                          :text="text"
                          variant="outline-primary"
                        >
                          <b-dropdown-item
                            v-for="ct in phoneOptions"
                            :key="ct.id"
                            :value="ct.value"
                            @click="
                              dropSelect(ct.value)
                            "
                          >
                            {{ ct.title }}
                          </b-dropdown-item>
                        </b-dropdown>
                      </template>
                      <b-form-input
                        v-model.number="number"
                        type="tel"
                        class="form-control"
                        :state="errors.length > 0 ? false : null"
                        :placeholder="
                          phoneProps[0].placeholder
                        "
                        :formatter="formatter"
                      />
                    </b-input-group>
                    <small class="text-danger">{{
                      errors[0]
                    }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- Gender -->
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col>
                <validation-provider
                  #default="{ errors }"
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
                      :state="errors.length > 0 ? false : null"
                      :options="genderOptions"
                    />
                    <small class="text-danger mb-1">{{
                      errors[0]
                    }}</small>
                  </b-form-group>
                </validation-provider>
              </b-col>
            </b-row>
            <!-- Governorate -->
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col>
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="Governorate"
                >
                  <b-form-group label="Governorate">
                    <v-select
                      v-model="governorate"
                      :clearable="false"
                      placeholder="Select Governorate"
                      label="title"
                      :options="governorateOption"
                      :state="errors.length > 0 ? false : null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                </validation-provider>
              </b-col>
            </b-row>
            <!-- district -->
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col>
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="District"
                >
                  <b-form-group label="District">
                    <v-select
                      v-model="district"
                      :clearable="false"
                      placeholder="Select District"
                      label="title"
                      :state="errors.length > 0 ? false : null"
                      :options="districtSelect"
                      @input="(value) => ChangeDistrict(value)"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                </validation-provider>
              </b-col>
            </b-row>
            <!-- Type -->
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col>
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="Type"
                >
                  <b-form-group label="Settlement Type">
                    <v-select
                      v-model="type"
                      :clearable="false"
                      placeholder="Select Settlement Type"
                      label="title"
                      :state="errors.length > 0 ? false : null"
                      :options="typeOptions"
                      @input="value=>ChangeType(value)"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                </validation-provider>
              </b-col>
            </b-row>
            <!-- Cadatser -->
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col>
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="Cadaster"
                >
                  <b-form-group label="cadaster">
                    <v-select
                      v-model="cadaster"
                      placeholder="Select Cadaster"
                      label="title"
                      :clearable="false"
                      :options="cadOptions"
                      :state="errors.length > 0 ? false : null"
                      @input="value=>ChangeCAD(value)"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                </validation-provider>
              </b-col>
            </b-row>
            <!-- ISS -->
            <b-row
              v-if="type ==null ? false : type.value >3"
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col v-if="type ==null ? false : type.value >3">
                <validation-provider
                  v-if="type == null ? false : type.value > 3"
                  #default="{ errors }"
                  rules="required"
                  name="Settlement"
                >
                  <b-form-group
                    v-if="type ==null ? false : type.value >3"
                    label="ISs"
                  >
                    <v-select
                      v-if="type ==null ? false : type.value >3"
                      v-model="iss"
                      placeholder="Choose a place of ISs"
                      label="title"
                      :clearable="false"
                      :options="issOptions"
                      :state="errors.length > 0 ? false : null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                </validation-provider>
              </b-col>
            </b-row>
            <!-- Male Count -->
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col>
                <b-form-group label="Male Count">
                  <b-form-spinbutton
                    id="malecount"
                    v-model="male_count"
                    class="lg"

                    :min="minMale"
                    max="30"
                    placeholder="Enter the number of males"
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <!-- Female Count -->
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col>
                <b-form-group label="Female Count">
                  <b-form-spinbutton
                    id="femalecount"
                    v-model="female_count"
                    class="lg"

                    :min="minFemale"
                    max="30"
                    placeholder="Enter the number of females"
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <!-- infected count -->
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col>
                <b-form-group label="Infected Count">
                  <b-form-spinbutton
                    id="infectedcount"
                    v-model="infected_count"
                    class="lg"
                    :disabled="family <= 0"

                    :min="1"
                    :max="family"
                    placeholder="Enter the number of infected individuals."
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <!-- Babies 0-5 Count -->
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col>
                <b-form-group label="Babies Count">
                  <p>
                    Enter the number of people aged 0 - 5 years
                  </p>
                  <b-form-spinbutton
                    id="babiescount"
                    v-model="yng_child_count"
                    class="lg"

                    min="0"
                    max="30"
                    placeholder="Enter the count of Babies"
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <!-- Children 6- 11 Count -->
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col>
                <b-form-group label="Child Count">
                  <p>
                    Enter the number of people aged between 6 - 11 years
                  </p>
                  <b-form-spinbutton
                    id="childcount"
                    v-model="child_count"
                    class="lg"

                    min="0"
                    max="30"
                    placeholder="Enter the number of children"
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <!-- young 12- 17 Count -->
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col>
                <b-form-group label="Young Count">
                  <p>
                    Enter the number of people aged 12-17 years
                  </p>
                  <b-form-spinbutton
                    id="young_count"
                    v-model="young_count"
                    class="lg"

                    min="0"
                    max="30"
                    placeholder="Enter the number of young people."
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <!-- teenager 18- 25 Count -->
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col>
                <b-form-group label="Teenager Count">
                  <p>
                    Enter the number of people aged between 18 - 25 years
                  </p>
                  <b-form-spinbutton
                    id="teenager_count"
                    v-model="teenager_count"
                    class="lg"

                    min="0"
                    max="30"
                    placeholder="Enter the number of teenager people."
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <!-- adults 26- 64 Count -->
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col>
                <b-form-group label="Adult Count">
                  <p>
                    Enter the number of people aged between 26 - 64 years
                  </p>
                  <b-form-spinbutton
                    id="adult_count"
                    v-model="adult_count"
                    class="lg"

                    min="0"
                    max="30"
                    placeholder="Enter the number of adults"
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <!-- old individuals count  -->
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col>
                <b-form-group label="Elderly Count">
                  <p>
                    Enter the number of people over the age
                    over 65 years old
                  </p>
                  <b-form-spinbutton
                    id="elderly_count"
                    v-model="elderly_count"
                    class="lg"
                    min="0"
                    max="30"
                    placeholder="Enter the number of elderly people"
                  />
                </b-form-group>
              </b-col>
            </b-row>

            <!-- The household is the infected   -->
            <b-row>
              <b-col>
                <b-form-group>
                  <b-form-checkbox
                    id="household"
                    v-model="Head_hhold"
                    name="household"
                    :value="1"
                    :unchecked-value="0"
                  >
                    Is the head of the family the affected person?
                  </b-form-checkbox>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- pregnant woman  -->
            <b-row>
              <b-col>
                <b-form-group>
                  <b-form-checkbox
                    id="Pregnant"
                    v-model="pregnant"
                    name="Pregnant"
                    :value="1"
                    :unchecked-value="0"
                  >
                    There is a pregnant woman in the family
                  </b-form-checkbox>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- payments -->
            <b-row>
              <b-col>
                <b-form-group>
                  <b-form-checkbox
                    id="paymnts"
                    v-model="monthly_payments"
                    name="paymnts"
                    :value="1"
                    :unchecked-value="0"
                  >
                    Are there any payments due!?
                  </b-form-checkbox>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- isolation -->
            <b-row>
              <b-col>
                <b-form-group>
                  <b-form-checkbox
                    id="isolation"
                    v-model="isolation_room"
                    name="isolation"
                    :value="1"
                    :unchecked-value="0"
                  >
                    Are the infected cases isolated in a separate room!?
                  </b-form-checkbox>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- Employment Type -->
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col>
                <b-form-group label="Employement Type">
                  <v-select
                    v-model="employment"
                    placeholder="Select the type of employment"
                    label="title"
                    :clearable="false"
                    :options="emplymntOptions"
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <!-- care giver -->
            <b-row
              :cols-lg="lg"
              :cols-md="md"
              :cols-xl="xl"
              :cols-sm="sm"
            >
              <b-col>
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
              </b-col>
            </b-row>
            <!-- Address -->
            <b-row>
              <b-col>
                <b-form-group label="Address">
                  <b-form-input
                    id="Address"
                    v-model="adresstext"
                    placeholder="Type your full address"
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <!-- Container -->
            <b-container>
              <b-row
                class="text-center"
                align-v="center"
              >
                <b-col>
                  <b-button
                    v-ripple.400="
                      'rgba(255, 255, 255, 0.15)'
                    "
                    variant="primary"
                    @click="formSubmited"
                  >
                    Submit
                  </b-button>
                </b-col>
                <b-col>
                  <b-button
                    v-ripple.400="
                      'rgba(255, 255, 255, 0.15)'
                    "
                    variant="primary"
                    @click="reset"
                  >
                    Reset
                  </b-button>
                </b-col>

              </b-row>
            </b-container>
          </b-form>
        </validation-observer>
      </b-card-body>
    </b-overlay>
  </b-card>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Ripple from 'vue-ripple-directive'
import { takeState } from 'vuex-dot'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import moment from 'moment'
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
  data() {
    return {
      pageCount: 0,
      lg: 2,
      md: 2,
      xl: 2,
      sm: 2,
      marker: { position: { lat: 33.8547, lng: 35.8623 } },
      center: { lat: 33.8547, lng: 35.8623 },
      mapOptions: {
        disableDefaultUI: true,
        fullscreenControl: true,
      },
    }
  },
  computed: {
    ...takeState('fullData', 'items').expose([
      'full_name',
      'org_id',
      'case_code',
      'case_phone',
      'nationality_id',
      'referral_id',
      'cadastre_id',
      'address_latitude',
      'address_longitude',
      'adresstext',
      'district_id',
      'family_members',
      'Head_hhold',
      'employed',
      'monthly_payments',
      'isolation_room',
    ]).commit('fullData/SET_ITEM').map(),
    ...takeState('fullData', 'itemsrec').expose(['pcr_date', 'pcr_photo']).commit('fullData/SET_ITEM_REC').map(),
    ...takeState('fullData', 'itemsfamily').expose([
      'yng_child_count',
      'child_count',
      'young_count',
      'teenager_count',
      'adult_count',
      'elderly_count',
      'female_count',
      'infected_count',
      'male_count',
      'pregnant',
      'comments',
    ]).commit('fullData/SET_ITEM_FAM').map(),
    ...takeState('fullData', 'country').expose(['id', 'number', 'text']).commit('fullData/SET_CON').map(),
    nationalityOptions: takeState('global', 'nationality').map(),
    genderOptions: takeState('global', 'gender').map(),
    phoneOptions: takeState('global', 'phoneOptions').map(),
    phoneProps: takeState('global', 'phoneProps').map(),
    family_relation: takeState('global', 'family_relation').map(),
    emplymntOptions: takeState('global', 'employment').map(),
    giveroption: takeState('global', 'caregiver').map(),
    referralOptions: takeState('global', 'referral').map(),
    pcrResultOption: takeState('global', 'pcr_result').map(),

    ///
    priority_period: takeState('fullData', 'priority_period').map(),
    grace_period: takeState('fullData', 'grace_period').map(),
    priority_interval: takeState('fullData', 'priority_interval').map(),
    //
    governorateOption: takeState('global', 'governorate').map(),
    districtOptions: takeState('global', 'district').map(),
    cadOptions: takeState('fullData', 'cadOptions').commit('fullData/SET_CAD_OPT').map(),
    typeOptions: takeState('fullData', 'typeOptions').map(),
    issOptions: takeState('fullData', 'issOptions').map(),
    items: takeState('fullData', 'items').map(),
    ///
    governorate: takeState('fullData', 'governorate').commit('fullData/SET_GOV').map(),
    district: takeState('fullData', 'district').commit('fullData/SET_DIS').map(),
    cadaster: takeState('fullData', 'cadaster').commit('fullData/SET_CAD').map(),
    type: takeState('fullData', 'type').commit('fullData/SET_TYPE').map(),
    iss: takeState('fullData', 'iss').commit('fullData/SET_ISS').map(),
    referral: takeState('fullData', 'referral').commit('fullData/SET_REF').map(),
    pcres: takeState('fullData', 'pcres').commit('fullData/SET_PCR_RES').map(),

    //
    nationality: takeState('fullData', 'nationality').commit('fullData/SET_NAT').map(),
    gender: takeState('fullData', 'gender').commit('fullData/SET_GEN').map(),
    employment: takeState('fullData', 'employment').commit('fullData/SET_EMPL').map(),
    caregiver: takeState('fullData', 'caregiver').commit('fullData/SET_GVR').map(),
    photo: takeState('fullData', 'photo').commit('fullData/SET_PHOTO').map(),
    iscode: takeState('fullData', 'iscode').map(),
    des_code: takeState('fullData', 'des_code').map(),
    des_rep: takeState('fullData', 'des_rep').map(),
    show: takeState('fullData', 'show').map(),
    res: takeState('fullData', 'res').map(),
    caseDetail: takeState('fullData', 'case').map(),
    pcrResult() {
      return this.pcrResultOption.slice(0, -1)
    },
    districtSelect() {
      return this.districtOptions.filter(item => item.params
        === (this.governorate != null ? this.governorate.value : null))
    },
    minMale() {
      if (this.gender == null) {
        return 0
      }
      if (this.gender.value === 2) {
        return 1
      }
      return 0
    },
    minFemale() {
      if (this.gender == null) {
        return 0
      }
      if (this.gender.value === 3) {
        return 1
      }
      return 0
    },
    family() {
      return (this.male_count ?? 0) + (this.female_count ?? 0)
    },
    maxDate() {
      return moment().valueOf()
    },

  },
  watch: {
    male_count() {
      const fm = (this.male_count ?? 0) + (this.female_count ?? 0)
      if (this.infected_count !== fm && this.infected_count > fm) {
        this.infected_count = fm
      }
      this.family_members = fm
    },
    female_count() {
      const fm = (this.male_count ?? 0) + (this.female_count ?? 0)
      if (this.infected_count !== fm && this.infected_count > fm) {
        this.infected_count = fm
      }
      this.family_members = fm
    },
    res(newval) {
      if (newval === 4) {
        this.geolocate()
      }
    },
  },
  mounted() {
    console.log(this.$route.params)
    this.reset()
  },
  methods: {
    ChangeDistrict(value) {
      if (value != null) {
        this.$store.dispatch('fullData/GET_TYPE')
      }
    },
    ChangeType(value) {
      if (value != null) {
        this.$store.dispatch('fullData/GET_CAD')
      }
    },
    ChangeCAD(value) {
      if (value != null || this.type != null) {
        console.log(this.$store)
        if (this.type.value !== 1) {
          this.$store.dispatch('fullData/GET_ISS')
        }
      }
    },
    reset() {
      this.$store.dispatch('fullData/RESET_DATA', {
        prefix: this.$route.query.q,
        type: this.$route.params.assmnttype,
      })
    },
    dropSelect(value) {
      // eslint-disable-next-line prefer-destructuring
      this.id = this.phoneOptions.filter(
        ct => ct.value === value,
      )[0].value
      this.text = this.phoneOptions.filter(
        ct => ct.value === value,
      )[0].text
    },
    formSubmited() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          this.$swal({
            title: 'Are you sure you want to Save?',
            text: 'Postpone Action',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Yes!',
            customClass: {
              confirmButton: 'btn btn-primary',
              cancelButton: 'btn btn-outline-danger ml-1',
            },
            buttonsStyling: false,
          }).then(result => {
            console.log(result)
            if (result.value) {
              this.$store.dispatch('fullData/FOLLOWSAVE', {
                prefix: this.$route.params.prefixPrj,
                prefixRole: this.$route.params.prefixRole,
                link: this.$route.params.resource,
                type: this.$route.params.assmnttype,
              }).then(res => {
                if (res[0].result === 1) {
                  this.orglistselect = null
                  this.$swal({
                    icon: 'success',
                    title: 'Done!',
                    text: 'The case has been successfully!',
                    customClass: {
                      confirmButton: 'btn btn-success',
                    },
                  })
                  this.$store.dispatch('fullData/RESET_DATA', {
                    prefix: this.$route.query.q,
                  })
                  const nav = []
                  nav.push(
                    {
                      active: false,
                      text: this.$route.params.breadcrumb[0].text,
                    },
                    {
                      active: false,
                      text: this.$route.params.title,
                    },
                  )
                  this.$router.replace({
                    name: 'project',
                    params: {
                      action: 'read',
                      breadcrumb: nav,
                      active: true,
                      prefix: this.$route.params.prefixPrj,
                      prefixRole: this.$route.params.prefixRole,
                      title: this.$route.params.title,
                      resource: this.$route.params.resource,
                    },
                  })
                }
              }).catch(() => {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Contact System administrator',
                    icon: 'EditIcon',
                    text: 'Please check internet connection and try again',
                    variant: 'danger',
                  },
                })
              })
            }
          }).catch(error => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Operation Failed',
                icon: 'EditIcon',
                text: error.toString,
                variant: 'danger',
              },
            })
          })
        }
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

  },
}
</script>
  <style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  @import '@core/scss/vue/libs/vue-flatpicker.scss';

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 280px) {
    .gmap {
        width: 100%;
        height: 300px;
    }
}
@media only screen and (min-width: 280px) {
    .gmap {
        width: 200px;
        height: 300px;
    }
}
@media only screen and (min-width: 350px) {
    .gmap {
        width: 280px;
        height: 300px;
    }
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (min-width: 430px) {
    .gmap {
        width: 330px;
        height: 300px;
    }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 680px) {
    .gmap {
        width: 300px;
        height: 300px;
    }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
    .gmap {
        width: 300px;
        height: 300px;
    }
}
/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
    .gmap {
        width: 400px;
        height: 300px;
    }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
    .gmap {
        width: 500px;
        height: 400px;
    }
}
  </style>
