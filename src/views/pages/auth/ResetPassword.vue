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
            :src="imgUrl"
            fluid
            alt="Register"
          />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Reset password-->
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
            Reset Password 🔒
          </b-card-title>
          <b-card-text class="mb-2">
            Your new password must be different from previously used passwords
          </b-card-text>

          <!-- form -->
          <validation-observer ref="simpleRules">
            <b-form
              class="auth-reset-password-form mt-2"
              method="POST"
              @submit.prevent="validationForm"
            >

              <!-- password -->
              <b-form-group
                label="New Password"
                label-for="reset-password-new"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Password"
                  vid="Password"
                  rules="required|min:8|max:32"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid':null"
                  >
                    <b-form-input
                      id="reset-password-new"
                      v-model="password"
                      :type="password1FieldType"
                      :state="errors.length > 0 ? false:null"
                      class="form-control-merge"
                      name="reset-password-new"
                      placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="password1ToggleIcon"
                        @click="togglePassword1Visibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- confirm password -->
              <b-form-group
                label-for="reset-password-confirm"
                label="Confirm Password"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Confirm Password"
                  rules="required|confirmed:Password"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid':null"
                  >
                    <b-form-input
                      id="reset-password-confirm"
                      v-model="cPassword"
                      :type="password2FieldType"
                      class="form-control-merge"
                      :state="errors.length > 0 ? false:null"
                      name="reset-password-confirm"
                      placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="password2ToggleIcon"
                        @click="togglePassword2Visibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- submit button -->
              <b-button
                block
                type="submit"
                variant="primary"
              >
                Set New Password
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
      <!-- /Reset password-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import RdmsLogo from '@core/layouts/components/Logo.vue'
import { required } from '@validations'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { takeState } from 'vuex-dot'

export default {
  components: {
    RdmsLogo,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      userEmail: '',
      cPassword: '',
      password: '',
      sideImg: require('@/assets/images/pages/reset-password-v2.svg'),
      // validation
      required,

      // Toggle Password
      password1FieldType: 'password',
      password2FieldType: 'password',
    }
  },
  computed: {
    showLoading: takeState('auth', 'showloading').map(),

    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/reset-password-v2-dark.svg')
        return this.sideImg
      }
      return this.sideImg
    },
    password1ToggleIcon() {
      return this.password1FieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    password2ToggleIcon() {
      return this.password2FieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.$route.query.email == null || vm.$route.query.token == null) {
        next({ name: 'not-authorized' })
      } else {
        next()
      }
    })
  },
  methods: {
    togglePassword1Visibility() {
      this.password1FieldType = this.password1FieldType === 'password' ? 'text' : 'password'
    },
    togglePassword2Visibility() {
      this.password2FieldType = this.password2FieldType === 'password' ? 'text' : 'password'
    },
    validationForm() {
      console.log(this.$route.query)
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          const payload = {
            email: this.$route.query.email,
            password: this.password,
            password_confirmation: this.cPassword,
            token: this.$route.query.token,
          }
          this.$store.dispatch('auth/resetpassword', payload).then(g => {
            console.log(g)
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Password is Changed',
                icon: 'EditIcon',
                variant: 'success',
              },
            })
            this.$router.replace('/')
          }).catch(() => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Please re-check the information entered',
                icon: 'EditIcon',
                variant: 'danger',
              },
            })
          })
        } else {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Please enter the required information correctly',
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
