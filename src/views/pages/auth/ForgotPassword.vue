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
            Forgot Password? 🔒
          </b-card-title>
          <b-card-text class="mb-2">
            Enter your email and we'll send you instructions to reset your password
          </b-card-text>

          <!-- form -->
          <validation-observer ref="simpleRules">
            <b-form
              class="auth-forgot-password-form mt-2"
              @submit.prevent="validationForm"
            >
              <b-form-group
                label="Email"
                label-for="forgot-password-email"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Email"
                  rules="required|email"
                >
                  <b-form-input
                    id="forgot-password-email"
                    v-model="userEmail"
                    :state="errors.length > 0 ? false:null"
                    name="forgot-password-email"
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
                Send reset link
              </b-button>
            </b-form>
          </validation-observer>

          <p class="text-center mt-2">
            <b-link :to="{name:'login'}">
              <feather-icon icon="ChevronLeftIcon" /> Back to login
            </b-link>
          </p>
        </b-col>
        <b-overlay
          id="overlay-background"
          :show="showLoading"
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
import { required, email } from '@validations'
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
      userEmail: '',
      sideImg: require('@/assets/images/pages/forgot-password-v2.svg'),
      // validation
      required,
      email,
    }
  },
  computed: {
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/forgot-password-v2-dark.svg')
        return this.sideImg
      }
      return this.sideImg
    },
    showLoading: takeState('auth', 'showloading').map(),
  },
  methods: {
    validationForm() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          const payload = {
            email: this.userEmail,
          }
          this.$store.dispatch('auth/forgotpassword', payload).then(g => {
            console.log(g)
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'The new password is in your email Please check it',
                icon: 'EditIcon',
                variant: 'success',
              },
            })
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
