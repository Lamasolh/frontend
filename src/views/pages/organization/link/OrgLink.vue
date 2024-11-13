<template>
  <b-overlay
    rounded="lg"
    :show="show"
  >
    <b-card class="m-lg-3 m-md-2 m-sm-1">
      <b-card-header>
        <h1 class="text-center">
          Organization Application
        </h1>
      </b-card-header>
      <div v-if="res">
        <b-tabs
          v-model="tabIndex"
          pills
        >
          <!-- Tab: Information -->
          <b-tab active>
            <template #title>
              <feather-icon
                icon="GlobeIcon"
                size="16"
                class="mr-0 mr-sm-50"
              />
              <span class="d-none d-sm-inline">Information</span>
            </template>
            <validation-observer
              ref="OrgRules"
              tag="form"
            >
              <OrgInfo
                class="mt-2 pt-75"
                @next="goTo"
                @res="reset"
              />
            </validation-observer>
          </b-tab>
          <!-- Tab: Account -->
          <b-tab :disabled="disabled">
            <template #title>
              <feather-icon
                icon="UserIcon"
                size="16"
                class="mr-0 mr-sm-50"
              />
              <span class="d-none d-sm-inline">Admin Account</span>
            </template>
            <validation-observer
              ref="adminRules"
              tag="form"
            >
              <OrgAdmin
                class="mt-2 pt-75"
                @send="save"
                @res="reset"
              />
            </validation-observer>
          </b-tab>

        </b-tabs>
      </div>
      <div v-else>
        <br>
        <br>
        <br>
        <br>
        <h3 class="text-center text-success"> You have been registered successfully, we will contact you soon after verifying your information
        </h3>
        <br>
        <br>
        <br>
        <br>
      </div>
    </b-card>
  </b-overlay>
</template>
<script>
import { takeState } from 'vuex-dot'
import { ValidationObserver } from 'vee-validate'

import OrgInfo from './OrgInfo.vue'
import OrgAdmin from './OrgAdmin.vue'

export default {
  components: {
    OrgInfo,
    OrgAdmin,
    ValidationObserver,
  },
  data() {
    return {
      res: true,
    }
  },
  computed: {
    tabIndex: takeState('linkOrg', 'tabIndex').commit('linkOrg/SET_TAB_INDEX').map(),
    show: takeState('linkOrg', 'show').commit('linkOrg/SET_SHOW').map(),
    disabled: takeState('linkOrg', 'disabled').commit('linkOrg/SET_DISB').map(),
  },
  mounted() {
    this.$store.dispatch('linkOrg/GET_DATA')
  },
  methods: {
    save() {
      this.$refs.OrgRules.validate().then(success => {
        if (success) {
          this.$refs.adminRules.validate().then(succ => {
            if (succ) {
              this.$store.dispatch('linkOrg/SEND_TO_SEC').then(res => {
                console.log(res.result)
                console.log(res.stats)
                console.log(res.stats != null)
                if (res.result == null) {
                  this.$swal({
                    title: 'Error!',
                    text: 'Registration failed, please check the information you entered',
                    icon: 'error',
                    customClass: {
                      confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false,
                  })
                } else if (res.result === 0) {
                  if (res.stats != null) {
                    this.$swal({
                      title: 'Error!',
                      text: `Registration failed, Because ${res.stats}`,
                      icon: 'error',
                      customClass: {
                        confirmButton: 'btn btn-primary',
                      },
                      buttonsStyling: false,
                    })
                  } else {
                    this.$swal({
                      title: 'Error!',
                      text: 'Registration failed, please check the information you entered',
                      icon: 'error',
                      customClass: {
                        confirmButton: 'btn btn-primary',
                      },
                      buttonsStyling: false,
                    })
                  }
                } else {
                  this.res = false
                }
              }).catch(error => {
                console.log(error)
                this.$swal({
                  title: 'Error!',
                  text: 'Register failed',
                  icon: 'error',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                })
              })
            } else {
              this.$swal({
                title: 'Attention !',
                text: 'Check missing data',
                icon: 'error',
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              })
            }
          })
        } else {
          this.$swal({
            title: 'Attention !',
            text: 'Check missing data',
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        }
      }).catch(() => {
        this.show = false
        this.$swal({
          title: 'Error!',
          text: 'Please Check internet and try again',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
      })
    },
    goTo() {
      this.$refs.OrgRules.validate().then(success => {
        if (success) {
          this.disabled = false
          setTimeout(() => { this.tabIndex += 1 }, 100)
          window.scrollTo(0, 0)
        } else {
          this.$swal({
            title: 'Attention !',
            text: 'Check missing data',
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        }
      })
    },
    reset() {
      this.$refs.OrgRules.reset()
      this.$refs.adminRules.reset()
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
@import '@core/scss/vue/libs/vue-select.scss';

</style>
