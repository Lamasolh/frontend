/* eslint-disable vue/no-unused-components */
<template>
  <div>
    <b-row>
      <b-col>
        <h5 class="mb-0">
          Socioeconomic/Accomodation Information
        </h5>
        <small class="text-muted">
          Enter the Socioeconomic/Accomodation Information
        </small>
      </b-col>
    </b-row>
    <b-row>
      <!-- if Employment
      <b-col>
        <b-form-checkbox
          id="emplyed"
          v-model="employed"
          name="emplyed"
          :value="1"
          :unchecked-value="0"
          :onchange="myFunction()"
        >
          Is anyone in the family employed!?
        </b-form-checkbox>
      </b-col> -->
      <!-- payments -->
      <b-col>
        <b-form-checkbox
          id="paymnts"
          v-model="monthly_payments"
          name="paymnts"
          :value="1"
          :unchecked-value="0"
        >
          Is there any payment due!?
        </b-form-checkbox>
      </b-col>
      <!-- isolation -->
      <b-col>
        <b-form-checkbox
          id="isolation"
          v-model="isolation_room"
          name="isolation"
          :value="1"
          :unchecked-value="0"
        >
          Are the infected cases isolated in seperate room!?
        </b-form-checkbox>
      </b-col>
    </b-row>
    <br>
    <br>
    <b-row>
      <!-- Employment Type -->
      <b-col>
        <validation-provider
          #default="{ errors }"
          rules="required"
          name="Employemnt Type"
        >
          <b-form-group label="Employment Type">
            <v-select
              v-model="employment"
              placeholder="Select Employemnt Type"
              label="title"
              :clearable="false"
              :state="errors.length > 0 ? false : null"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="emplymntOptions"
            />
            <small class="text-danger mb-1">{{ errors[0] }}</small>
          </b-form-group>
        </validation-provider>
      </b-col>
      <!-- care giver -->
      <b-col>
        <validation-provider
          #default="{ errors }"
          rules="required"
          name="Care Giver"
        >
          <b-form-group label="Who is taking care of the infected case?">
            <v-select
              v-model="caregiver"
              placeholder="Select who is taking care of the infected cases"
              label="title"
              :clearable="false"
              :state="errors.length > 0 ? false : null"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="giveroption"
            />
            <small class="text-danger mb-1">{{ errors[0] }}</small>
          </b-form-group>
        </validation-provider>
      </b-col>
    </b-row>
  </div>
</template>
<script>
// import Cleave from 'vue-cleave-component'
// eslint-disable-next-line import/no-unresolved
import 'cleave.js/dist/addons/cleave-phone.us'
import { takeState } from 'vuex-dot'
import { mapGetters } from 'vuex'
import vSelect from 'vue-select'
import { ValidationProvider } from 'vee-validate'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    // Cleave,
    vSelect,
    ValidationProvider,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  data() {
    return {
      vald: null,
    }
  },
  computed: {
    ...takeState('followUpWiz', 'items')
      .expose([
        'employed',
        'monthly_payments',
        'isolation_room',
      ])
      .commit('followUpWiz/SET_ITEM')
      .map(),

    // Options
    ...mapGetters({

      emplymntOptions: 'global/employment',
      giveroption: 'global/caregiver',

    }),

    employment: takeState('followUpWiz', 'employment').commit('followUpWiz/SET_EMPL').map(),
    caregiver: takeState('followUpWiz', 'caregiver').commit('followUpWiz/SET_GVR').map(),

  },
  mounted() {
    this.vald = null
  },
  methods: {
    myFunction() {
      if (this.employed === 0 || this.employed === '0') {
        this.vald = true
      } if (this.employed === 1 || this.employed === '1') {
        this.vald = false
      }
    },

  },

}
</script>

<style>
    .disabled {
      pointer-events:none;
      cursor: not-allowed;
    }
  </style>
