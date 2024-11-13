<template>
  <validation-provider
    #default="{ errors }"
    :rules="rule"
    :name="title"
    data-vv-delay="100"
  >
    <b-form-datepicker
      v-model="getvalue"
      :min="min"
      class="mb-2 dt"
      menu-class="w-100"
      calendar-width="100%"
      :max="max"
      :placeholder="placeholder"
      :state="errors.length > 0 ? false:null"
      :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
      locale="ar"
    />
    <small class="text-danger">{{ errors[0] }}</small>
  </validation-provider>
</template>
<script>
import { ValidationProvider } from 'vee-validate'

import {
  BFormDatepicker,
} from 'bootstrap-vue'

export default {
  components: {
    ValidationProvider,
    BFormDatepicker,
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
    value: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      required: false,
      default: null,
    },
    req: {
      type: Boolean,
      default: null,
    },
  },
  data() {
    return {
      getvalue: null,
    }
  },
  computed: {
    max() {
      return new Date(new Date().getTime())
    },
    min() {
      return new Date(new Date().getTime() - 9 * 24 * 60 * 60 * 1000)
    },
    rule() {
      if (this.req) {
        return 'required'
      }
      return null
    },
  },
}
</script>
<style scoped>
@media only screen and (max-width: 325px) {
.dt{
  width: 80%;
}
}
@media only screen and (max-width: 400px) {
.dt{
  width: 100%;
}
}
</style>
