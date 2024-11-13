<template>
  <div>
    <b-row>
      <b-col
        cols="12"
        class="mb-2"
      >
        <h5 class="mb-0">
          Socioeconomic/Accomodation Information
        </h5>
        <small class="text-muted">Enter the Socioeconomic/Accomodation Information</small>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form-checkbox
          id="emplyed"
          v-model="employed"
          name="emplyed"
          value="1"
          unchecked-value="0"
        >
          Is anyone in the family employed!?
        </b-form-checkbox>
      </b-col>
      <b-col>
        <b-dropdown
          v-model="employed"
          placeholder="Employment Type"
          label="title"
          :clearable="false"
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          name="ali"
        />
      </b-col>
    </b-row>
  <!--  <b-row>
      <b-col>
        <v-select>
          ali
        </v-select>
      </b-col>
    </b-row>-->
  </div>
</template>

<script>

import Cleave from 'vue-cleave-component'
// eslint-disable-next-line import/no-unresolved
import 'cleave.js/dist/addons/cleave-phone.us'
import { takeState } from 'vuex-dot'
// import { mapGetters } from 'vuex'
import vSelect from 'vue-select'
import { ValidationProvider } from 'vee-validate'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  component: {
    Cleave,
    vSelect,
    ValidationProvider,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  computed: {
    ...takeState('followUpWizConf', 'items')
      .expose([
        'employed',
      ])
      .commit('followUpWizConf/SET_ITEM')
      .map(),
  //  ...mapGetters({
    // emplymntOptions: 'global/employment',
    // }),
    // employment: takeState('followUpWizConf', 'employment').commit('followUpWizConf/SET_EMPL').map(),
  },
}
</script>
