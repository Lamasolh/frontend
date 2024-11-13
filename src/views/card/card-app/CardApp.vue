<template>
  <b-row>
    <b-col
      :class="size"
    >
      <!--  This field is required-->
      <b-form-group>
        <h4>{{ title }}: <span
          v-show="req"
          class="req"
        >*</span></h4>
        <h5 v-show="sutitle">
          {{ sutitle }}
        </h5>
        <component
          :is="type"
          :id="id"
          :rule="inputRule"
          :title="title"
          :placeholder="placeholder"
          :value="value"
          :req="req"
          :options="options"
          :readonly="readonly"
        />
        <br>
      </b-form-group>
    </b-col>
  </b-row>
</template>
<script>
import {
  BFormGroup, BCol, BRow,
} from 'bootstrap-vue'
import {
  required, integer,
} from '@validations'
import CardInputText from './CardInputText.vue'
import CardInputPhone from './CardInputPhone.vue'
import CardInputRadio from './CardInputRadio.vue'
import CardInputNumber from './CardInputNumber.vue'
import CardInputDate from './CardInputDate.vue'
import CardInputSelect from './CardInputSelect.vue'
import CardInputFile from './CardInputFile.vue'
import CardInputMap from './CardInputMap.vue'
import CardInputCad from './CardInputCad.vue'

export default {
  components: {
    BFormGroup,
    CardInputText,
    CardInputPhone,
    CardInputRadio,
    CardInputNumber,
    CardInputDate,
    CardInputSelect,
    CardInputFile,
    CardInputMap,
    CardInputCad,
    BCol,
    BRow,
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
    sutitle: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    rule: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'CardInputText',
    },
    req: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      default: null,
    },
    value: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: 'col col-lg-5 col-md-8 col-sm-10',
    },
  },
  data() {
    return {
      required,
      integer,
    }
  },
  computed: {
    inputRule() {
      let rl = ''
      if (this.req) {
        rl += 'required|'
      }
      rl += this.rule
      return rl
    },
  },
}
</script>
<style scoped>
.req{
  color: red;
}
</style>
