<template>
  <validation-provider
    #default="{ errors }"
    rules="required"
    :name="title"
    data-vv-delay="100"
  >
    <b-form-file
      :id="id"
      ref="file-input"
      v-model="getvalue"
      :name="id"
      :placeholder="placeholder"
      :state="errors.length > 0 ? false:null"
      accept=".jpg, .png, .pdf"
    />

    <small class="text-danger">{{ errors[0] }}</small>
  </validation-provider>
</template>
<script>
import { ValidationProvider } from 'vee-validate'

import {
  BFormFile,
} from 'bootstrap-vue'

export default {
  components: {
    ValidationProvider,
    BFormFile,
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
      required: false,
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
