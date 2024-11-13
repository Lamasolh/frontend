<template>
  <b-form-group>
    <validation-provider
      #default="{ errors }"
      :rules="rule"
      name="المحافظة"
    >
      <v-select
        :ref="id"
        v-model="selectedgov"
        :dir="'rtl'"
        :state="errors[0] > 0 ? false:null"
        label="title"
        :options="optiongov"
        placeholder="اختار المحافظة التي تنتمي إليها"
      />
      <small class="text-danger">{{ errors[0] }}</small>
    </validation-provider>
    <div v-show="showCad">
      <br>

      <h4>البلدية: <span
        v-show="req"
        class="req"
      >*</span></h4>
      <validation-provider
        #default="{ errors }"
        :rules="rule"
        name="البلدية"
      >
        <v-select
          :ref="id"
          v-model="selectedcad"
          :dir="'rtl'"
          :state="errors[0] > 0 ? false:null"
          label="title"
          :options="optioncad"
          placeholder="اختار البلدية التي تنتمي إليها"
        />
        <small class="text-danger">{{ errors[0] }}</small>
      </validation-provider>
    </div>
  </b-form-group>

</template>
<script>
import { ValidationProvider } from 'vee-validate'
import vSelect from 'vue-select'
import {
  BFormGroup,
} from 'bootstrap-vue'

export default {
  components: {
    ValidationProvider,
    vSelect,
    BFormGroup,
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
    req: {
      type: Boolean,
      default: null,
    },
  },
  data() {
    return {
      selectedgov: null,
      selectedcad: null,
      optiongov: [
        { title: 'Square', value: 'hi' },
        { title: 'Rectangle', value: 'hi' },
        { title: 'Rombo', value: 'hi' },
        { title: 'Romboid', value: 'hi' },
      ],
      optioncad: [],
    }
  },
  computed: {
    rule() {
      if (this.req) {
        return 'required'
      }
      return null
    },
    showCad() {
      if (this.optioncad.length === 0) {
        return false
      }
      return true
    },
  },
  mounted() {
    // this Function to get governorate
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
.req{
  color: red;
}
</style>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
