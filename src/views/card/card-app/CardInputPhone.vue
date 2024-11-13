<template>
  <validation-provider
    #default="{ errors }"
    :rules="rule"
    :name="title"
    data-vv-delay="100"
  >
    <b-input-group>
      <b-input-group-prepend
        id="ct"
        is-text
      >
        LBP (+961)
      </b-input-group-prepend>

      <cleave
        :id="id"
        v-model="getValue"
        :name="id"
        class="form-control"
        :raw="false"
        :options="options"
        delimiter="-"
        prefix="+961"
        :state="errors.length > 0 ? false:null"
        :placeholder="placeholder"
      />
    </b-input-group>
    <small class="text-danger">{{ errors[0] }}</small>
  </validation-provider>
</template>
<script>
import { ValidationProvider } from 'vee-validate'
import Cleave from 'vue-cleave-component'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'cleave.js/dist/addons/cleave-phone.us'

import { BInputGroup, BInputGroupPrepend } from 'bootstrap-vue'

export default {
  components: {
    ValidationProvider,
    BInputGroup,
    BInputGroupPrepend,
    Cleave,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: null,
    },
    rule: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      getValue: this.value,
      options: {
        phone: true,
        phoneRegionCode: 'LBP',
      },
    }
  },
}
</script>
<style scoped>
@media only screen and (max-width: 300px) {
  #ct{
  display: none;
  }
}
</style>
