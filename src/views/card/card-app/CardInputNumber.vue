<template>
  <validation-provider
    #default="{ errors }"
    rules="required"
    :name="title"
    data-vv-delay="100"
  >
    <b-form-spinbutton
      :id="id"
      v-model="getvalue"
      :name="id"
      class="lg"
      :state="errors.length > 0 ? false:null"
      min="1"
      max="30"
      :placeholder="placeholder"
    />
    <small class="text-danger">{{ errors[0] }}</small>
  </validation-provider>
</template>
<script>
import { ValidationProvider } from 'vee-validate'

import {
  BFormSpinbutton,
} from 'bootstrap-vue'

export default {
  components: {
    ValidationProvider,
    BFormSpinbutton,
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
      required: true,
      default: null,
    },
    value: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      getvalue: this.value,
    }
  },
}
</script>
