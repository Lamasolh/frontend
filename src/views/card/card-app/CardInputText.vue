<template>
  <validation-provider
    #default="{ errors }"
    :rules="rule"
    :name="title"
    data-vv-delay="100"
  >
    <b-form-input
      :id="id"
      v-model="getvalue"
      class="lg"
      :name="id"
      :state="errors.length > 0 ? false:null"
      :placeholder="placeholder"
      :readonly="readonly"
      @change="sendValue"
    />
    <small class="text-danger">{{ errors[0] }}</small>
  </validation-provider>
</template>
<script>
import { ValidationProvider } from 'vee-validate'

import {
  BFormInput,
} from 'bootstrap-vue'

export default {
  components: {
    ValidationProvider,
    BFormInput,
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
    readonly: {
      type: Boolean,
      default: false,
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
  emit: ['val'],
  methods: {
    sendValue(val) {
      this.$emit('val', val)
    },
  },
}
</script>
