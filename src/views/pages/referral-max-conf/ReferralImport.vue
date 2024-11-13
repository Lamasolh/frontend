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
          <h3>Extra Field</h3>
          <!-- Main: Project Extra Field Info -->
          <div>
            <b-row
              v-for="item in multiField.filter(el=>!el.isInd)"
              ref="row"
              :key="item.id"
            >

              <b-col md="6">
                <!--:rules="item.require ===1? 'required':'' "-->
                <validation-provider
                  v-slot="{ errors }"
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
                    />
                    <b-form-input
                      v-else-if="(item.type ===2)"
                      v-model="item.value"
                      :state="errors.length > 0 ? false : null"
                      type="number"
                      :placeholder="item.desc"
                    />

                    <flat-pickr
                      v-else-if="(item.type===3)"
                      v-model="item.value"
                      class="form-control"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :placeholder="item.desc"
                      :state="errors.length > 0 ? false : null"
                    />
                    <v-select
                      v-else-if="(item.type ===4)"
                      v-model="item.value"
                      :placeholder="item.desc"
                      label="title"
                      :clearable="false"
                      :state="errors.length > 0 ? false : null"
                      :options="yesNo"
                    />

                    <small class="text-danger mb-1">{{ errors[0] }}</small>
                  </b-form-group>
                </validation-provider>
              </b-col>
            </b-row>
          </div>
          <br>
          <!-- Container -->
          <b-container v-if="!isEdit">
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
          <!-- Container -->
          <b-container v-else>
            <b-row
              align-h="between"
            >
              <b-col cols="8" />
              <b-col>
                <b-button
                  block
                  variant="info"
                  @click="Update"
                >
                  Update
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
import { takeState } from 'vuex-dot'
import vSelect from 'vue-select'
import store from '@/store'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { ValidationProvider } from 'vee-validate'
import flatPickr from 'vue-flatpickr-component'

export default {
  components: {
    vSelect,
    ValidationProvider,
    flatPickr,
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },

  },
  computed: {
    // Basic
    show: takeState('referralConf', 'show').map(),
    phone: takeState('referralConf', 'phone').commit('referralConf/SET_PHONE').map(),
    country: takeState('referralConf', 'country').commit('referralConf/SET_CTR').map(),
    countryid: takeState('referralConf', 'countryid').commit('referralConf/SET_CTR_ID').map(),
    /// Items
    items: takeState('referralConf', 'items').map(),

    /// Options
    emplymntOptions: takeState('global', 'employment').map(),
    giveroption: takeState('global', 'caregiver').map(),
    dataTypeOptions: takeState('referralConf', 'dataTypeOptions').map(),
    yesNo: takeState('referralConf', 'yesNo').map(),
    // Family Info
    family_members: takeState('referralConf', 'family_members').commit('referralConf/SET_FALMILY').map(),
    male_count: takeState('referralConf', 'male_count').commit('referralConf/SET_MALE').map(),
    female_count: takeState('referralConf', 'female_count').commit('referralConf/SET_FEMALE').map(),
    infected_count: takeState('referralConf', 'infected_count').commit('referralConf/SET_INFECTED').map(),
    yng_child_count: takeState('referralConf', 'yng_child_count').commit('referralConf/SET_YNG_CHILD').map(),
    child_count: takeState('referralConf', 'child_count').commit('referralConf/SET_CHILD').map(),
    young_count: takeState('referralConf', 'young_count').commit('referralConf/SET_YOUNG').map(),
    teenager_count: takeState('referralConf', 'teenager_count').commit('referralConf/SET_TEENAGER').map(),
    adult_count: takeState('referralConf', 'adult_count').commit('referralConf/SET_ADULT').map(),
    elderly_count: takeState('referralConf', 'elderly_count').commit('referralConf/SET_ELDERLY').map(),

    /// Other
    employment: takeState('referralConf', 'employment').commit('referralConf/SET_EMPL').map(),
    caregiver: takeState('referralConf', 'caregiver').commit('referralConf/SET_GVR').map(),
    house_hold: takeState('referralConf', 'house_hold').commit('referralConf/SET_HOUSEHOLD').map(),
    pregnant: takeState('referralConf', 'pregnant').commit('referralConf/SET_PREGNANT').map(),
    monthly_payments: takeState('referralConf', 'monthly_payments').commit('referralConf/SET_DUEPAY').map(),
    isolation_room: takeState('referralConf', 'isolation_room').commit('referralConf/SET_ISOL').map(),
    adresstext: takeState('referralConf', 'adresstext').commit('referralConf/SET_ADDRESS').map(),

    /// MUltifield
    multiField: takeState('referralConf', 'filedOptions').commit('referralConf/ADD_ITEMS_FILED').map(),

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
    lastId() {
      if (this.multiField == null || this.multiField.length === 0) {
        return 1
      }

      const op = this.multiField
      op.slice(-1).pop()
      return op == null ? 1 : op[op.length - 1].id + 1
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

    formSubmited() {
      this.$parent.$parent.$parent.$refs.simpleRules.validate().then(success => {
        if (success) {
          const fl = this.items.filter(
            it => it.phone === this.phone && it.countryid === this.countryid,
          )
          if (fl.length === 0) {
            const id = store.getters['referralConf/lastId']
            store.dispatch('referralConf/ADD_ITEMS', {
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
        } else {
          this.$swal({
            title: 'Attention!',
            text: 'Missing Data',
            icon: 'warning',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        }
      })
    },
    Update() {
      this.$parent.$parent.$parent.$refs.simpleRules.validate().then(success => {
        if (success) {
          const fl = this.items.filter(
            it => it.phone === this.phone
                            && it.countryid === this.countryid
                            && it.id !== this.$parent.$parent.$parent.idEdit,
          )
          console.log(fl)
          console.log(this.$parent.$parent.$parent.idEdit)
          if (fl.length === 0) {
            store.commit('referralConf/EDIT_ITEMS', {
              id: this.$parent.$parent.$parent.idEdit,
            })
            this.$parent.$parent.$parent.Cancel_Edit()
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

    removeFiled(index) {
      this.$store.commit('referralConf/REM_ITEMS_IND', { index })
    },
    repeateAgain() {
      this.$store.commit('referralConf/ADD_ITEMS_FILED', {
        id: this.lastId,
        name: null,
        desc: null,
        type: { id: 1, title: 'Text', value: 1 },
        value: null,
      })
    },
    ChangeType(_, id) {
      this.multiField.filter(it => it.id === parseInt(id, 10))[0].value = null
    },
    /// /
    ChangeValue(value, id) {
      this.multiField.filter(it => it.id === parseInt(id, 10))[0].value = value
    },
    itemInput(value, id) {
      this.multiField.filter(it => it.id === parseInt(id, 10))[0].name = value
    },

  },
}
</script>
<style lang="scss">
    @import '@core/scss/vue/libs/vue-select.scss';
    @import '@core/scss/vue/libs/vue-flatpicker.scss';

</style>
