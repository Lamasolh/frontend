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
import projectslist from '@/views/pages/admin/project/projects.vue'
// import projectView from '@/views/pages/admin/project/project-wizard/projectwizards.vue'
import projectView from '@/views/pages/admin/project/project-manage/AddEditProject.vue'

import OrgList from '@/views/pages/organization/list/OrgList.vue'
import OrgAdd from '@/views/pages/organization/add/AddOrg.vue'
import ADUSR from '@/views/pages/usermanager/user-add/UserMangerAdd.vue'
import USRLST from '@/views/pages/usermanager/UserManager.vue'
import PRJKTS from '@/views/pages/project-manager/ProjectManager.vue'

export default {
  components: {
    projectslist,
    projectView,
    OrgList,
    OrgAdd,
    USRLST,
    ADUSR,
    PRJKTS,
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
          case 'PRVW':
            this.route = 'projectView'
            break
          case 'ADPRJ':
            this.route = 'projectView'
            this.$route.params.value = ''
            break
          case 'PRJLST':
            this.route = 'projectslist'
            break
          case 'ORLST':
            this.route = 'OrgList'
            break
          case 'ADORG':
            this.route = 'OrgAdd'
            break
          case 'USRLST':
            this.route = 'USRLST'
            break
          case 'ADUSR':
            this.route = 'ADUSR'
            break
          case 'PRJKTS':
            this.route = 'PRJKTS'
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
