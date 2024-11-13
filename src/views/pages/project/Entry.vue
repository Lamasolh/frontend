<template>
  <div v-if="route !=='ERROR' ">
    <component
      :is="route"
    />
  </div>
  <div v-else>
    <h1> Redirection .....</h1>
  </div>
</template>
<script>
import IPC from '@/views/pages/assessment/Assmnt.vue'
import CLRA from '@/views/pages/assessment-clr/Assmnt.vue'

export default {
  components: {
    IPC,
    CLRA,
  },
  data() {
    return {
      route: null,
    }
  },
  watch: {
    route(NewValue) {
      if (NewValue === 'ERROR') {
        this.$router.replace({ name: 'error-404' })
      }
      //
    },
  },
  mounted() {
    this.rtChange()
  },
  methods: {
    rtChange() {
      switch (this.$route.params.prefixPrj) {
        case 'IPC':
          this.route = 'IPC'
          break
          /*  case 'CLRA':
          this.route = 'CLRA'
          break */
        default:
          this.route = 'ERROR'
      }
    },
  },
}
</script>
