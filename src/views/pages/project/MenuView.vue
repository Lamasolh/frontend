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
import addeditproject from '@/views/pages/admin/project/project-manage/AddEditProject.vue'
import manageproject from '@/views/pages/admin/project/project-manage/ManageProject.vue'
import OrgManage from '@/views/pages/organization/manage/OrgManage.vue'
import UserView from '@/views/pages/usermanager/user-add/UserMangerAdd.vue'
import PRJVIEW from '@/views/pages/project-manager/project-view/ProjectView.vue'

export default {
  components: {
    // projectView,
    addeditproject,
    manageproject,
    OrgManage,
    UserView,
    PRJVIEW,
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
    },
  },
  mounted() {
    this.rtChange(null)
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
          case 'PRVW':
            this.route = 'manageproject'
            break
          case 'PRJLST':
            this.route = 'addeditproject'
            break
          case 'ORLST':
            this.route = 'OrgManage'
            break
          case 'USRVIEW':
            this.route = 'UserView'
            break
          case 'USRLST':
            this.route = 'UserView'
            break
          case 'PRJKTS':
            this.route = 'PRJVIEW'
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
        if (this.$refs[this.route].saved) {
        /*  return new Promise((resolve => {
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
