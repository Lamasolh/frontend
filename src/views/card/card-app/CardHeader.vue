<template>
  <b-row
    align-h="between"
  >
    <b-col
      cols="2"
      class="m-1"
    >
      <rdms-logo class="logo" />
    </b-col>
    <b-col
      cols="2"
      class="m-1"
    >
      <b-button
        v-ripple.400="'rgba(0, 0, 240, 0.15)'"
        variant="flat-primary"
        class="btn-print"
        @click="print"
      > <feather-icon
        icon="PrinterIcon"
        size="50"
      /></b-button>
    </b-col>
  </b-row>
</template>
<script>
import {
  BRow, BCol, BButton,
} from 'bootstrap-vue'
import RdmsLogo from '@core/layouts/components/Logo.vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BRow, BCol, RdmsLogo, BButton,
  },
  directives: {
    Ripple,
  },
  methods: {
    print() {
      window.print()
    },
  },
}
</script>

<style scoped>
.logo{
    width: 4rem;

}
@media only screen and (max-width: 600px) {
.btn-print{
  display: none;
}
}
</style>
