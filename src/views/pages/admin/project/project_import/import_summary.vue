<template>
  <div>
    <h1>Error Tables</h1>

    <vue-excel-editor
      ref="resd"
      v-model="error"

      width="100%"
      height="500px"
      :no-header-edit="true"
    >
      <vue-excel-column
        field="TYPE"
        label="TYPE"
      />
      <vue-excel-column
        field="Name"
        label="Name"
        width="150px"
      />
      <vue-excel-column
        field="Reason"
        label="Reason"
        width="350px"
      />
    </vue-excel-editor>

  </div>
</template>

<script>
import { takeState } from 'vuex-dot'

export default {
  data() {
    return {
      jsondata: [],
    }
  },
  computed: {
    error: takeState('importPrj', 'error').commit('importPrj/SET_ERROR').map(),

  },
  watch: {
    error() {
      console.log(this.$refs.resd.refresh())
      this.$refs.resd.refresh()
    },
  },
}
</script>
