<template>
  <validation-provider
    #default="{ errors }"
    rules="required"
    :name="title"
  >
    <b-form-radio-group
      :ref="id"
      v-model="selected"
    >
      <div
        v-for="o in options"
        :key="o.id"
        :ref="id"
        :for="o.value"
        class="option"
        @click="check($event,o.value)"
      >
        <b-form-radio
          :id="o.value"
          :ref="o.id"
          :value="o.value"
          name="radio-options"
          :state="errors[0] > 0 ? false:null"
          stacked
        >
          <p class="label">
            {{ o.text }}
          </p>
        </b-form-radio></div>
      <small class="text-danger">{{ errors[0] }}</small>
    </b-form-radio-group>
  </validation-provider>
</template>
<script>
import { ValidationProvider } from 'vee-validate'

import {
  BFormRadioGroup, BFormRadio,
} from 'bootstrap-vue'

export default {
  components: {
    ValidationProvider,
    BFormRadioGroup,
    BFormRadio,
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
  methods: {
    check(_, ol) {
      this.selected = ol
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
