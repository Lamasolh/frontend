<template>
  <b-sidebar
    id="sidebar"
    ref="assign"
    :visible="showColumn"
    bg-variant="white"
    sidebar-class="sidebar-sm"
    width="250px"
    shadow
    backdrop
    no-header
    right
    @change="(val) => (showColumn = val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div
        class="
            d-flex
            justify-content-between
            align-items-center
            content-sidebar-header
            px-2
            py-1
          "
      >
        <h5 class="mb-0">
          <feather-icon
            icon="ColumnsIcon"
            size="1.5x"
          />
          Columns
        </h5>

        <feather-icon
          class="ml-1 cursor-pointer"
          icon="XIcon"
          size="16"
          @click="hide"
        />
      </div>

      <b-row class="m-1">
        <b-form-checkbox-group
          v-model="fieldsSelect"
          :options="fields"
          name="buttons-1"
          value-field="value"
          text-field="label"
          stacked
          switches
          @input="change"
        />
      </b-row>
    </template>
  </b-sidebar>
</template>

<script>
/* eslint-disable prefer-destructuring */
import { takeState } from 'vuex-dot'
import Ripple from 'vue-ripple-directive'

export default {
  directives: {
    Ripple,
  },
  computed: {
    showColumn: takeState('monitoringwtr', 'showColumn').commit('monitoringwtr/SET_SHOW_COLUMN').map(),
    fields: takeState('monitoringwtr', 'caseFieldOp').map(),
    fieldsjson: takeState('monitoringwtr', 'json_fields').commit('monitoringwtr/SET_JSON').map(),

    fieldsSelect: takeState('monitoringwtr', 'caseField').commit('monitoringwtr/SET_FIELD').map(),
    fieldsOp: takeState('monitoringwtr', 'caseField').commit('monitoringwtr/SET_FIELD_ADD').map(),

  },
  mounted() {
    const obj = Object()
    this.fields.forEach(element => {
      obj[Object.keys(element.value.json)[0]] = Object.values(element.value.json)[0]
    })
    this.fieldsjson = obj
    console.log('f', this.fieldsjson)
  },
  methods: {
    change(rs) {
      console.log(rs)
      const obj = Object()
      rs.forEach(element => {
        console.log('el', Object.keys(element.json)[0])
        obj[Object.keys(element.json)[0]] = Object.values(element.json)[0]
      })
      this.fieldsjson = obj
      console.log('obj', obj)
      console.log('jsodn', this.fieldsjson)
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
