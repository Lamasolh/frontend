<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">

      <!-- Brand logo-->
      <b-link class="brand-logo">
        <rdms-logo />

        <h2 class="brand-text text-primary ml-0">
          RDMS
        </h2>
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col
        lg="8"
        class="d-none d-lg-flex align-items-center p-5"
      >
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <b-img
            fluid
            :src="imgUrl"
            alt="Forgot password"
          />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Forgot password-->
      <b-col
        lg="4"
        class="d-flex align-items-center auth-bg px-2 p-lg-5"
      >
        <b-col
          sm="8"
          md="6"
          lg="12"
          class="px-xl-2 mx-auto"
        >
          <b-card-title
            title-tag="h2"
            class="font-weight-bold mb-1"
          >
            Change Organization email
          </b-card-title>
          <b-card-text class="mb-2">
            Enter new email to become the new email for your organization
          </b-card-text>
          <div v-if="alert===1">
            <!-- form -->
            <validation-observer ref="simpleRules">
              <b-form
                class="auth-forgot-password-form mt-2"
                @submit.prevent="validationForm"
              >
                <b-form-group
                  label="Email"
                  label-for="email"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Email"
                    rules="required|email"
                  >
                    <b-form-input
                      id="email"
                      v-model="email"
                      :state="errors.length > 0 ? false:null"
                      name="Email"
                      placeholder="name@example.com"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>

                <b-button
                  type="submit"
                  variant="primary"
                  block
                >
                  Change
                </b-button>
              </b-form>
            </validation-observer>
          </div>
          <b-alert
            v-else-if="alert===2"
            variant="danger"
            show
          >
            <div class="alert-body">
              <span>Link is expire.</span>
            </div>
          </b-alert>
          <b-alert
            v-else-if="alert===0"
            variant="danger"
            show
          >
            <div class="alert-body">
              <span>Link is not correct, contact the system admininstrator.</span>
            </div>
          </b-alert>
        </b-col>
        <b-overlay
          id="overlay-background"
          :show="show"
          variant="light"
          opacity="0.55"
          blur="3px"
          no-wrap
        />
      </b-col>
      <!-- /Forgot password-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import RdmsLogo from '@core/layouts/components/Logo.vue'
import { takeState } from 'vuex-dot'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    RdmsLogo,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      sideImg: require('@/assets/images/pages/under-maintenance.svg'),
      alert: null,
      // validation
    }
  },
  computed: {
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/under-maintenance.svg')
        return this.sideImg
      }
      return this.sideImg
    },
    show: takeState('helpCenter', 'show').commit('helpCenter/SET_SHOW').map(),
    email: takeState('helpCenter', 'changeOrgEmail').commit('helpCenter/SET_CHANGE_ORG_EMAIL_LINK').map(),
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.$route.query.email == null && vm.$route.query.token == null) {
        next({ name: 'not-authorized' })
      } else {
        next()
      }
    })
  },
  mounted() {
    this.$store.dispatch('helpCenter/GET_ChangeOrgEmail', {
      email: this.$route.query.email,
      token: this.$route.query.token,
    }).then(res => {
      if (res === 1) {
        this.alert = 1
      } else if (res === 2) {
        this.alert = 2
      } else {
        this.alert = 0
      }
    }).catch(() => {
      this.alert = 0
    })
  },
  methods: {
    validationForm() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          this.$store.dispatch('helpCenter/ChangeOrgEmailLink').then(res => {
            if (res === 1) {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'The email is updated, Please check it',
                  icon: 'EditIcon',
                  variant: 'success',
                },
              })
              this.$router.push({ name: 'login' })
            } else {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Admin email changed failed, contact system administrator',
                  icon: 'EditIcon',
                  variant: 'danger',
                },
              })
            }
          }).catch(() => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'This email is invalid please check it',
                icon: 'EditIcon',
                variant: 'danger',
              },
            })
          })
        } else {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Please enter valid email',
              icon: 'EditIcon',
              variant: 'warning',
            },
          })
        }
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
