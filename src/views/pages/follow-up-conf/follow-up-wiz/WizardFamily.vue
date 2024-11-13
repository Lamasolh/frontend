<template>
  <div>
    <b-row>
      <!--  Family Information -->
      <b-col
        cols="12"
        class="mb-2"
      >
        <h5 class="mb-0">
          Family Information
        </h5>
        <small class="text-muted">Enter the family Info</small>
      </b-col>
      <!-- Family Member
      <b-col>
        <b-form-group
          label="Family Memebers"
        >
          <validation-provider
            #default="{ errors}"
            name="Family Memebers"
            rules="required"
          >
            <b-form-input
              id="fmlycnt"
              v-model="family_members"
              type="number"
              min="1"
              oninput="validity.valid||(value='');"
              placeholder="1"
              :state="errors.length > 0 ? false : null"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
      </b-col>-->
      <!-- Male count-->
      <b-col>
        <b-form-group
          label="Male Count"
        >
          <validation-provider
            v-slot="{ errors }"
            name="Male Count"
            :rules="'required|malefemale:'+male_count+','+female_count+','+family_members"
          >
            <b-form-input
              id="malecount"
              v-model="male_count"
              type="number"
              min="0"
              oninput="validity.valid||(value='');"
              placeholder="Enter The Male count"
              :state="errors.length > 0 ? false : null"
              @input="FamNumber"
              @focus="$event.target.select()"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
      </b-col>
      <!-- Female Count-->
      <b-col>
        <b-form-group
          label="Female Count"
        >
          <validation-provider
            v-slot="{ errors }"
            name="Female Count"
            :rules="'required|malefemale:'+male_count+','+female_count+','+family_members"
          >
            <b-form-input
              id="femalecount"
              v-model="female_count"
              type="number"
              min="0"
              oninput="validity.valid||(value='');"
              placeholder="Enter The Male count"
              :state="errors.length > 0 ? false : null"
              @input="FamNumber"
              @focus="$event.target.select()"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
      </b-col>
      <!-- infected count
      <b-col>
        <b-form-group
          label="Infected Count"
        >
          <validation-provider
            v-slot="{ errors }"
            name="infected count"
            :rules="`required|infected:${family_members}`"
          >
            <b-form-input
              id="infectedcount"
              v-model="infected_count"
              type="number"
              min="1"
              :max="family_members"
              oninput="validity.valid||(value='');"
              placeholder="Enter the number of infected individuals."
              :state="errors.length > 1 ? false : null"
              @focus="$event.target.select()"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
      </b-col>-->
    </b-row>
    <b-row>
      <!-- Babies count -->
      <b-col>
        <b-form-group
          label="Number of members between 0 and 5 years old"
        >
          <validation-provider
            v-slot="{ errors }"
            name="babies count"
            :rules="
              `required|childelder:${yng_child_count},${child_count},${young_count},${teenager_count},${adult_count},${elderly_count},${family_members}`
            "
          >
            <b-form-input
              id="yng_child_count"
              v-model="yng_child_count"
              type="number"
              min="0"
              oninput="validity.valid||(value='');"
              placeholder="Enter the number of individuals aged 0-5 years"
              :state="errors.length > 0 ? false : null"
              @focus="$event.target.select()"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
      </b-col>
      <!-- Children count -->
      <b-col>
        <b-form-group
          label="Number of members between 6 and 11 years old"
        >
          <validation-provider
            v-slot="{ errors }"
            name="children count"
            :rules="
              `required|childelder:${yng_child_count},${child_count},${young_count},${teenager_count},${adult_count},${elderly_count},${family_members}`
            "
          >
            <b-form-input
              id="child_count"
              v-model="child_count"
              type="number"
              min="0"
              oninput="validity.valid||(value='');"
              placeholder="Enter the number of individuals aged 6-11 years"
              :state="errors.length > 0 ? false : null"
              @focus="$event.target.select()"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
      </b-col>
      <!-- Young count -->
      <b-col>
        <b-form-group
          label="Number of members between 12 and 17 years old"
        >
          <validation-provider
            v-slot="{ errors }"
            name="Young count"
            :rules="
              `required|childelder:${yng_child_count},${child_count},${young_count},${teenager_count},${adult_count},${elderly_count},${family_members}`
            "
          >
            <b-form-input
              id="young_count"
              v-model="young_count"
              type="number"
              min="0"
              oninput="validity.valid||(value='');"
              placeholder="Enter the number of individuals aged 12-17 years"
              :state="errors.length > 0 ? false : null"
              @focus="$event.target.select()"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <!-- teenagers count -->
      <b-col>
        <b-form-group
          label="Number of members between 18 and 25 years old"
        >
          <validation-provider
            v-slot="{ errors }"
            name="teenager count"
            :rules="
              `required|childelder:${yng_child_count},${child_count},${young_count},${teenager_count},${adult_count},${elderly_count},${family_members}`
            "
          >
            <b-form-input
              id="teenager_count"
              v-model="teenager_count"
              type="number"
              min="0"
              oninput="validity.valid||(value='');"
              placeholder="Enter the number of individuals aged 18-25 years"
              :state="errors.length > 0 ? false : null"
              @focus="$event.target.select()"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
      </b-col>
      <!-- adult count -->
      <b-col>
        <b-form-group
          label="Number of members between 26 and 64 years old"
        >
          <validation-provider
            v-slot="{ errors }"
            name="adults count"
            :rules="
              `required|childelder:${yng_child_count},${child_count},${young_count},${teenager_count},${adult_count},${elderly_count},${family_members}`
            "
          >
            <b-form-input
              id="adult_count"
              v-model="adult_count"
              type="number"
              min="0"
              oninput="validity.valid||(value='');"
              placeholder="Enter the number of individuals aged 26-64 years"
              :state="errors.length > 0 ? false : null"
              @focus="$event.target.select()"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
      </b-col>
      <!-- old individuals count -->
      <b-col>
        <b-form-group
          label="Number of members above 65"
        >
          <validation-provider
            v-slot="{ errors }"
            name="elderly count"
            :rules="
              `required|childelder:${yng_child_count},${child_count},${young_count},${teenager_count},${adult_count},${elderly_count},${family_members}`
            "
          >
            <b-form-input
              id="eldercount"
              v-model="elderly_count"
              type="number"
              min="0"
              oninput="validity.valid||(value='');"
              placeholder="Enter the number of individuals that are over 65 years old"
              :state="errors.length > 0 ? false : null"
              @focus="$event.target.select()"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <br>
        <b-form-group label="Other family information " />
      </b-col>
    </b-row>
    <b-row>
      <!-- The household is the infected
      <br>
      <b-col>
        <b-col>
          <validation-provider
            v-slot="{ errors }"
            name="household"
          >
            <b-form-checkbox
              id="household"
              v-model="Head_hhold"
              name="household"
              :value="1"
              :unchecked-value="0"
            >
              The house-holder is the infected person or A Woman
            </b-form-checkbox>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-col>
      </b-col> -->
      <!-- pregnant woman  -->
      <b-col>
        <b-col>
          <validation-provider
            v-slot="{ errors }"
            name="Pregnant"
          >
            <b-form-checkbox
              id="Pregnant"
              v-model="pregnant"
              name="Pregnant"
              :value="1"
              :unchecked-value="0"
            >
              There is a pregnant woman in the family
            </b-form-checkbox>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-col>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { takeState } from 'vuex-dot'
import { mapGetters } from 'vuex'
// import vSelect from 'vue-select'
import { ValidationProvider } from 'vee-validate'

export default {
  components: {
    ValidationProvider,
    // vSelect,
  },
  computed: {
    ...takeState('followUpWizConf', 'items')
      .expose([
        'family_members', 'Head_hhold'])
      .commit('followUpWizConf/SET_ITEM')
      .map(),
    ...mapGetters({
      // Global Option
      family_relation: 'global/family_relation',
    }),
    ...takeState('followUpWizConf', 'itemsfamily')
      .expose([
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
        'comments'])
      .commit('followUpWizConf/SET_ITEM_FAM')
      .map(),
    validated() {
      // eslint-disable-next-line radix
      const fmcnt = parseInt(this.male_count) + parseInt(this.female_count)
      if (fmcnt !== this.female_count) {
        return true
      }
      return false
    },
  },
  methods: {
    FamNumber() {
      this.family_members = parseInt(this.male_count, 10) + parseInt(this.female_count, 10)
      console.log(this.family_members)
    },
    withFooter() {
      this.$swal({
        icon: 'error',
        title: 'Validation Error...',
        text: 'Something went wrong!',
        footer: '<a href="javascript:void(0)">Why do I have this issue?</a>',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
      })
    },
  },
}

</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
