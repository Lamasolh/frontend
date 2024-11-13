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
        <b-form>
          <h3>Basic Info</h3>
          <!-- PCR Result -->
          <b-row>
            <b-col cols="6">

              <b-form-group
                label="Gender"
                label-for="Gender"
              >
                <v-select
                  v-model="gender"
                  placeholder="Select Gender"
                  label="title"
                  :clearable="false"
                  :options="genderOptions"
                />

              </b-form-group>
            </b-col>
            <!-- PCR Result -->
            <b-col cols="6">
              <validation-provider
                #default="{ errors }"
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
          <br>
          <h3>Family Info</h3>
          <!-- Male Count -->
          <b-row>
            <b-col cols="4">
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
            </b-col>
            <b-col cols="4">
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
            </b-col>
            <!-- infected count -->
            <b-col cols="4">
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
            </b-col>
          </b-row>
          <!-- Babies 0-5 Count -->
          <b-row>
            <b-col>
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
            </b-col>
            <b-col>
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
            </b-col>
            <b-col>
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
            </b-col>
          </b-row>
          <!-- teenager 18- 25 Count -->
          <b-row>
            <b-col>
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
            </b-col>
            <b-col>
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

            </b-col>
            <b-col>
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
            </b-col>
          </b-row>

          <br>
          <h3>Other Info</h3>
          <!-- The household is the infected   -->
          <b-row>
            <b-col>
              <b-form-group>
                <b-form-checkbox
                  id="household"
                  v-model="house_hold"
                  name="household"
                  :value="1"
                  :unchecked-value="0"
                >
                  Is the head of the family the affected person?
                </b-form-checkbox>
              </b-form-group>
            </b-col>
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
            <!-- isolation -->

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
          <b-row>
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
            <!-- care giver -->

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
          <br>
          <!-- Container -->
          <b-container>
            <b-row
              align-h="between"
            >
              <b-col cols="8" />
              <b-col>
                <b-button
                  block
                  variant="primary"
                  @click="formSubmited"
                >
                  Add
                </b-button>
              </b-col>
            </b-row>
          </b-container>
        </b-form>
      </b-card-body>
    </b-overlay>
  </b-card>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import { takeState } from 'vuex-dot'
import vSelect from 'vue-select'
import store from '@/store'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    ValidationProvider,
    vSelect,
  },

  computed: {
    phone: takeState('referralClr', 'phone').commit('referralClr/SET_PHONE').map(),
    country: takeState('referralClr', 'country').commit('referralClr/SET_CTR').map(),
    countryid: takeState('referralClr', 'countryid').commit('referralClr/SET_CTR_ID').map(),
    items: takeState('referralClr', 'items').map(),
    ///
    genderOptions: takeState('global', 'gender').map(),
    emplymntOptions: takeState('global', 'employment').map(),
    giveroption: takeState('global', 'caregiver').map(),
    pcrResultOption: takeState('global', 'pcr_result').map(),

    ///
    pcres: takeState('referralClr', 'pcres').commit('referralClr/SET_PCR_RES').map(),
    gender: takeState('referralClr', 'gender').commit('referralClr/SET_GEN').map(),

    //
    family_members: takeState('referralClr', 'family_members').commit('referralClr/SET_FALMILY').map(),
    male_count: takeState('referralClr', 'male_count').commit('referralClr/SET_MALE').map(),
    female_count: takeState('referralClr', 'female_count').commit('referralClr/SET_FEMALE').map(),
    infected_count: takeState('referralClr', 'infected_count').commit('referralClr/SET_INFECTED').map(),

    yng_child_count: takeState('referralClr', 'yng_child_count').commit('referralClr/SET_YNG_CHILD').map(),
    child_count: takeState('referralClr', 'child_count').commit('referralClr/SET_CHILD').map(),
    young_count: takeState('referralClr', 'young_count').commit('referralClr/SET_YOUNG').map(),
    teenager_count: takeState('referralClr', 'teenager_count').commit('referralClr/SET_TEENAGER').map(),
    adult_count: takeState('referralClr', 'adult_count').commit('referralClr/SET_ADULT').map(),
    elderly_count: takeState('referralClr', 'elderly_count').commit('referralClr/SET_ELDERLY').map(),

    ///
    employment: takeState('referralClr', 'employment').commit('referralClr/SET_EMPL').map(),
    caregiver: takeState('referralClr', 'caregiver').commit('referralClr/SET_GVR').map(),
    house_hold: takeState('referralClr', 'house_hold').commit('referralClr/SET_HOUSEHOLD').map(),
    pregnant: takeState('referralClr', 'pregnant').commit('referralClr/SET_PREGNANT').map(),
    monthly_payments: takeState('referralClr', 'monthly_payments').commit('referralClr/SET_DUEPAY').map(),
    isolation_room: takeState('referralClr', 'isolation_room').commit('referralClr/SET_ISOL').map(),
    adresstext: takeState('referralClr', 'adresstext').commit('referralClr/SET_ADDRESS').map(),
    show: takeState('referralClr', 'show').map(),
    pcrResult() {
      return this.pcrResultOption.slice(0, -1)
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

  },
  mounted() {
    console.log(this.$route.params)
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
    formSubmited() {
      this.$parent.$parent.$parent.$refs.simpleRules.validate().then(success => {
        if (success) {
          console.log('sss')
          const fl = this.items.filter(
            it => it.phone === this.phone && it.countryid === this.countryid,
          )
          if (fl.length === 0) {
            const id = store.getters['referralClr/lastId'] != null
              ? store.getters['referralClr/lastId'].id
              : 0
            store.dispatch('referralClr/ADD_ITEMS', {
              id: id + 1,
            })
            this.$parent.$parent.$parent.ResetDataRow()
          } else {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Case is duplicated',
                icon: 'EditIcon',
                variant: 'warning',
              },
            })
          }
        }
      })
    },

  },
}
</script>
<style lang="scss">
    @import '@core/scss/vue/libs/vue-select.scss';
    @import '@core/scss/vue/libs/vue-flatpicker.scss';

</style>
