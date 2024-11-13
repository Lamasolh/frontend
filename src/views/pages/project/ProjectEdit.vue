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
import MNTR from '@/views/pages/monitoring/edit/tools/MonitioringManage.vue'
import MNTRVIEW from '@/views/pages/monitoring/view/MonitioringManage.vue'

import MNTRVIEWWTR from '@/views/pages/monitoring-wtr/view/MonitioringManage.vue'

import SMNTR from '@/views/pages/monitoring-tools/edit/MonitioringManage.vue'
import SMNTRVIEW from '@/views/pages/monitoring-tools/view/MonitioringManage.vue'

export default {
  components: {
    MNTR,
    MNTRVIEW,
    MNTRVIEWWTR,
    SMNTR,
    SMNTRVIEW,
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
  methods: {
    rtChange(nxt) {
      this.reset().then(val => {
        if (val) {
          if (nxt != null) {
            nxt()
            // this.$refs[this.$route.params.prefixRole].ResetData()
            // this.$refs[this.$route.params.prefixRole].saved = false
          }
        } else if (val === false) {
          if (nxt != null) {
            nxt(false)
          }
        }
        console.log(this.$route.params)
        switch (this.$route.params.prefixRole) {
          case 'MNTR':
            if (this.$route.params.wtr === true) {
              this.route = 'MNTRVIEWWTR'
            } else if (this.$route.params.view === true) {
              this.route = 'MNTRVIEW'
            } else {
              this.route = 'MNTR'
            }

            break

          case 'SMNTRT':
            if (this.$route.params.view === true) {
              this.route = 'SMNTRVIEW'
            } else {
              this.route = 'SMNTR'
            }
            break
          default:
            this.route = 'ERROR'
        }
      })
    },
    // eslint-s-next-line consistent-return
    async reset() {
      if (this.route != null) {
        /* if (this.$refs[this.route].saved) {
          return new Promise(resolve => {
            this.$swal({
              title: 'Are you sure?',
              html:
                'There is data that has not yet been saved</br> Do you want to exit the page?',
              icon: 'info',
              showCancelButton: true,
              confirmButtonText: 'Yes, remove data!',
              customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-outline-danger ml-1',
              },
              buttonsStyling: false,
            }).then(result => {
              if (result.value) {
                resolve(true)
              }
              if (result.dismiss === 'cancel') {
                resolve(false)
              } else {
                resolve(false)
              }
            })
          })
        } */
        if (this.$refs[this.route] != null) {
          this.$refs[this.route].saved = false
        }
        return true
      }
      if (this.$refs[this.route] != null) {
        this.$refs[this.route].saved = false
      }
      return true
    },
  },
}
</script>
