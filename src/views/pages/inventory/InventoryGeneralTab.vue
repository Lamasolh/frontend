<template>
  <b-card>
    <b-row align-h="between">
      <b-col cols="3">
        General information
      </b-col>
      <b-col
        cols="6"
      />
      <b-col
        cols="3"
      >
        <b-button
          variant="link"
          class="ml-3"
          @click="Refresh"
        >
          Refresh
          <feather-icon
            icon="RefreshCcwIcon"
          />
        </b-button>
      </b-col>
    </b-row>
    <Card-General-Info
      v-for="it in stasticItem"
      :key="it.id"
      :item-name="it.itemName"
      :info-items="it.listStat"
    />
    <hr>
    <Card-General-Info
      item-name="Assignments"
      :info-items="assign"
    />

  </b-card>
</template>
<script>
import Ripple from 'vue-ripple-directive'
import { takeState } from 'vuex-dot'
import CardGeneralInfo from './CardGeneralInfo.vue'

export default {
  components: {
    CardGeneralInfo,
  },
  directives: {
    Ripple,
  },

  computed: {
    stasticItem: takeState('inventory', 'stasticItem').map(),
    total_assignment: takeState('inventory', 'total_assignment').map(),
    assign() {
      return [{
        icon: 'ClockIcon',
        color: 'light-warning',
        title: `${this.total_assignment} Case`,
        subtitle: 'Pending',
        customClass: '',
      }]
    },
  },
  methods: {
    Refresh() {
      this.$store.dispatch('inventory/GET_INVENTORY_LIST', {
        prefix: this.$route.params.prefixPrj,
        type: this.$route.params.assmnttype,
      }).then(val => {
        console.log(val)
      })
    },
  },
}
</script>
