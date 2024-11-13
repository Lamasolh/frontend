<template>
  <validation-provider
    #default="{ errors }"
    :rules="rule"
    :name="title"
  >
    <v-select
      :ref="id"
      v-model="selected"
      :dir="'rtl'"
      :state="errors[0] > 0 ? false:null"
      label="title"
      :options="options"
      :placeholder="placeholder"
    />
    <small class="text-danger">{{ errors[0] }}</small>
  </validation-provider>
</template>
<script>
import { ValidationProvider } from 'vee-validate'
import vSelect from 'vue-select'

export default {
  components: {
    ValidationProvider,
    vSelect,
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
    req: {
      type: Boolean,
      default: null,
    },
    options: {
      type: Array,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      selected: null,
    }
  },
  computed: {
    rule() {
      if (this.req) {
        return 'required'
      }
      return null
    },
  },
}
</script>
<style>
.option:hover .custom-control-label{
  color: white;
  border-radius: 5px;
}
.option:hover{
  background-color: #4B87C7A9;
  border-radius: 5px;
}
.option{
  padding-top: 14px;
  padding-left: 8px;
}
.label{
  -webkit-user-select: none;
-khtml-user-select: none;
-moz-user-select: none;
-o-user-select: none;
user-select: none;
}
</style>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
