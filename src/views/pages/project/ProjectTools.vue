<template>
  <div v-if="route !=='ERROR' ">
    <component
      :is="route"
      :ref="route"
    />
  </div>
  <div v-else>
    <h1> Redirection .....</h1>
  </div>
</template>
<script>
// import projectView from '@/views/pages/admin/project/project-wizard/projectwizards.vue'
import MNTR from '@/views/pages/monitoring/Monitoring.vue'
import MNTRTOOLS from '@/views/pages/monitoring/edit/Monitoring.vue'

import SMNTRT from '@/views/pages/monitoring-tools/Monitoring.vue'

export default {
  components: {
    // projectView,
    MNTR,
    MNTRTOOLS,
    SMNTRT,
  },
  data() {
    return {
      route: null,
    }
  },
  watch: {
    route(NewValue) {
      if (NewValue === 'ERROR') {
        this.$router.replace({ path: '/dashboard' })
      }
    },
  },
  mounted() {
    this.rtChange(null)
  },
  beforeRouteUpdate(to, from, next) {
    this.rtChange(next)
  },
  /*  beforeRouteLeave(to, form, next) {
    this.rtChange(next)
  },  */
  methods: {
    rtChange(nxt) {
      this.reset().then(val => {
        if (val) {
          if (nxt != null) {
            nxt()
            // this.$refs[this.route].ResetData()
            // this.$refs[this.route].saved = false
          }
        } else if (val === false) {
          if (nxt != null) {
            nxt(false)
          }
        }
        switch (this.$route.params.resource) {
          case 'MNTR':
            console.log('this.$route.params.tools', this.$route.params.tools)
            if (this.$route.params.tools === true) {
              this.route = 'MNTRTOOLS'
            } else {
              this.route = 'MNTR'
            }
            break
          case 'SMNTRT':
            this.route = 'SMNTRT'
            break
          default:
            this.route = 'ERROR'
            // this.$router.replace({ path: '/dashboard' })
        }
      })
    },
    // eslint-disable-next-line consistent-return
    async reset() {
      if (this.route != null) {
        if (this.$refs[this.route] != null) { this.$refs[this.route].saved = false }
        return true
      }
      if (this.$refs[this.route] != null) { this.$refs[this.route].saved = false }
      return true
    },
  },

}
</script>
