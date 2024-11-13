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
import MRGSRI from '@/views/pages/data_collection/data_collection_list/DataCollect.vue'

export default {
  components: {

    MRGSRI,
  },
  beforeRouteUpdate(to, from, next) {
    this.rtChange(next)
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
      // this.$router.replace({ path: '/dashboard' })
    },
  },
  mounted() {
    this.rtChange(null)
  },
  methods: {
    rtChange(nxt) {
      this.reset().then(val => {
        if (val) {
          if (nxt != null) {
            nxt()
            //   this.$refs[this.route].ResetData()
            // this.$refs[this.route].saved = false
          }
        } else if (val === false) {
          if (nxt != null) {
            nxt(false)
          }
        }

        switch (this.$route.params.resource) {
          case 'MRGSRI':
            this.route = 'MRGSRI'
            break
          default:
            this.route = 'ERROR'
        }
      })
    },
    // eslint-disable-next-line consistent-return
    async reset() {
      if (this.route != null) {
        if (this.$refs[this.route].saved) {
          /* return new Promise((resolve => {
              this.$swal({
                title: 'Are you sure?',
                html: 'There is data that has not yet been saved</br> Do you want to exit the page?',
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
                } if (result.dismiss === 'cancel') {
                  resolve(false)
                } else {
                  resolve(false)
                }
              })
            })) */
        }
        if (this.$refs[this.route] != null) { this.$refs[this.route].saved = false }
        return true
      }
      if (this.$refs[this.route] != null) { this.$refs[this.route].saved = false }
      return true
    },
  },

}
</script>
