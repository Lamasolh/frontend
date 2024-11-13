<template>
  <div>
    <vue-excel-editor
      ref="resd"
      v-model="iss"
      :readonly="true"
      width="100%"
      height="500px"
      :no-header-edit="true"
    >
      <vue-excel-column
        field="P-CODE"
        label="P-CODE"
      />
      <vue-excel-column
        field="Partner"
        label="Partner"
      />
    </vue-excel-editor>
    <br>
    <br>
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
    iss: takeState('importPrjWtr', 'iss').commit('importPrjWtr/SET_ISS').map(),
  },
  watch: {
    error() {
      console.log(this.$refs.resd.refresh())
      this.$refs.resd.refresh()
    },
  },
}
</script>
