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
        <div class="w-100 d-lg-flex align-items-center justify-content-center">
          <lottie-animation
            ref="anim"
            :animation-data="imgUrljson"
            :loop="true"
            :auto-play="true"
            :speed="50"
          />
          <!-- <b-img
            fluid
            :src="imgUrl"
            alt="Login V2"
          />-->
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col
        lg="4"
        class="d-flex align-items-center auth-bg px-2 p-lg-4"
      >
        <b-col
          sm="8"
          md="6"
          lg="12"
          class="px-xl-2 mx-auto"
        >
          <b-card-title
            title-tag="h2"
            class="font-weight-bold mb-1validation"
          >
            Welcome to RDMS! 👋
          </b-card-title>
          <b-card-text class="mb-2">
            Please sign-in to your account
          </b-card-text>

          <!-- form -->
          <validation-observer ref="loginForm">
            <b-form
              class="auth-login-form mt-2"
              @submit.prevent
            >
              <!-- Username -->
              <b-form-group
                label="Username or Email"
                label-for="login-Username"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Username"
                  rules="required"
                >
                  <b-form-input
                    id="login-Username"
                    v-model="userName"
                    :state="errors.length > 0 ? false : null"
                    name="login-Username"
                    placeholder="name@example.com"
                    @keydown.enter.tab.prevent="onTab"
                    @keydown.enter.prevent="onTab"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- forgot password -->
              <b-form-group>
                <div class="d-flex justify-content-between">
                  <label for="login-password">Password</label>
                  <b-link :to="{ name: 'forget' }">
                    <small>Forgot Password?</small>
                  </b-link>
                </div>
                <validation-provider
                  v-slot="{ errors }"
                  name="Password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <b-form-input
                      id="login-password"
                      ref="password"
                      v-model="password"
                      :state="errors.length > 0 ? false : null"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      name="login-password"
                      placeholder="············"
                      @keydown.enter.prevent="login"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- checkbox
              <b-form-group>
                <b-form-checkbox
                  id="remember-me"
                  v-model="status"
                  name="checkbox-1"
                >
                  Remember Me
                </b-form-checkbox>
              </b-form-group>-->

              <!-- submit buttons -->
              <b-button
                type="submit"
                variant="primary"
                block
                @click="login"
              >
                Sign in
              </b-button>
            </b-form>
          </validation-observer>

          <!--
          <b-card-text class="text-center mt-2">
            <span>New on our platform? </span>
            <b-link :to="{name:'page-auth-register-v2'}">
              <span>&nbsp;Create an account</span>
            </b-link>
          </b-card-text>-->

          <!-- divider
          <div class="divider my-2">
            <div class="divider-text">
              or
            </div>
          </div>-->

          <!-- social buttons
          <div class="auth-footer-btn d-flex justify-content-center">
            <b-button
              variant="facebook"
              href="javascript:void(0)"
            >
              <feather-icon icon="FacebookIcon" />
            </b-button>
            <b-button
              variant="twitter"
              href="javascript:void(0)"
            >
              <feather-icon icon="TwitterIcon" />
            </b-button>
            <b-button
              variant="google"
              href="javascript:void(0)"
            >
              <feather-icon icon="MailIcon" />
            </b-button>
            <b-button
              variant="github"
              href="javascript:void(0)"
            >
              <feather-icon icon="GithubIcon" />
            </b-button>
          </div> -->
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
      <!-- /Login-->
    </b-row>

    <help-center />
    <div class="float">
      <b-img
        v-b-tooltip.hover
        title="Help Center"
        :src="require('@/assets/images/pages/help_center.png')"
        class="w-75 my-float"
        @click="ShowHelp"
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import RdmsLogo from '@core/layouts/components/Logo.vue'
//  import { getHomeRouteForLoggedInUser } from '@/auth/utils'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import * as API from '@/services/API'
import { focus, mixin as focusMixin } from 'vue-focus'
import LottieAnimation from 'lottie-web-vue'
import HelpCenter from '../help-center/HelpCenter.vue'

export default {
  components: {
    RdmsLogo,
    ValidationProvider,
    ValidationObserver,
    HelpCenter,
    LottieAnimation,
  },
  directives: { focus },
  mixins: [togglePasswordVisibility, focusMixin],
  data() {
    return {
      status: false,
      showLoading: false,
      isShowHelp: false,
      password: '',
      focused: {
        0: true,
        1: false,
      },
      userName: '',
      sideImgJson: require('@/assets/images/pages/rdmssvg/datadark.json'),
      sideImg: require('@/assets/images/pages/login-v2.svg'),
      // validation rulesimport store from '@/store/index'
      required,
      email,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password'
        ? 'EyeIcon'
        : 'EyeOffIcon'
    },
    imgUrljson() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImgJson = require('@/assets/images/pages/rdmssvg/data.json')
        return this.sideImgJson
      }
      return this.sideImgJson
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/login-v2-dark.svg')
        return this.sideImg
      }
      return this.sideImg
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        document.title = to.meta.title || store.getters('app/DEFAULT_TITLE')
      },
    },
  },
  afterEach(to, from, next) {
    store.commit('app/LOADING_DISABLE')
    next()
  },
  methods: {
    login() {
      try {
        this.showLoading = true
        this.$refs.loginForm.validate().then(success => {
          if (success) {
            API.apiClient.get('/sanctum/csrf-cookie').then(() => {
              let parms
              if (
                /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(
                  this.userName,
                )
              ) {
                parms = {
                  email: this.userName,
                  username: this.userName,
                  password: this.password,
                  remember_token: this.status,
                }
              } else {
                parms = {
                  username: this.userName,
                  email: this.userName,
                  password: this.password,
                  remember_token: this.status,
                }
              }
              console.log('odfcx')
              API.apiClient
                .post('/login', parms, {
                  validateStatus: false,
                })
                .then(async result => {
                  console.log('error')
                  console.log(result)
                  if (result.status === 200) {
                    this.$store.commit('app/LOADING_SHOW')
                    await store
                      .dispatch('auth/getAuthUser')
                      .then(() => {
                        const firstName = store.getters[
                          'auth/authUser'
                        ].first_name
                        const lastName = store.getters[
                          'auth/authUser'
                        ].last_name
                        const fullName = `${firstName} ${lastName}`
                        this.showToast(
                          `Welcome ${fullName}`,
                          `You have successfully logged in as ${fullName}. Now you can start to explore!`,
                          'success',
                          'CoffeeIcon',
                        )
                        this.$router.go({
                          path: '/dashboard',
                        })
                      })
                      .catch(() => store.commit(
                        'app/LOADING_DISABLE',
                      ))
                  } else if (result.status === 422) {
                    console.log(result.data)
                    this.showToast(
                      'Sorry',
                      result.data.errors.username[0],
                      'warning',
                      'AlertCircleIcon',
                    )
                    store.commit('app/LOADING_DISABLE')
                  } else if (result.status === 201) {
                    this.showToast(
                      'Sorry',
                      'The username or password is incorrect',
                      'warning',
                      'AlertCircleIcon',
                    )
                    store.commit('app/LOADING_DISABLE')
                  } else {
                    this.showToast(
                      'Sorry',
                      'Error!',
                      'warning',
                      'AlertCircleIcon',
                    )
                    store.commit('app/LOADING_DISABLE')
                  }
                  //
                })
                .catch(error => {
                  console.log('error')
                  console.log(error)
                  if (error.response) {
                    // Request made and server responded
                  } else if (error.request) {
                    // The request was made but no response was received
                  } else {
                    // Something happened in setting up the request that triggered an Error
                  }
                  this.showToast(
                    'Sorry',
                    error.message,
                    'danger',
                    'AlertCircleIcon',
                  )
                })
                .finally(() => {
                  this.showLoading = false
                })
            })
          } else {
            this.showLoading = false
            this.showToast(
              'Sorry',
              'Please put username and password!',
              'warning',
              'AlertCircleIcon',
            )
            store.commit('app/LOADING_DISABLE')
          }
        })
      } catch (e) {
        store.commit('app/LOADING_DISABLE')
      }
    },
    changeFocus(bringInFocus, removeFocus) {
      if (bringInFocus) this.focused[bringInFocus] = true
      this.focused[removeFocus] = false
    },
    onTab() {
      const vm = this
      vm.detailsEditable = true
      vm.$nextTick(() => {
        vm.$refs.password.focus()
      })
    },
    showToast(title, text, variant, icon, timeout = 4000) {
      this.$toast(
        {
          component: ToastificationContent,
          props: {
            title,
            icon,
            text,
            variant,
          },
        },
        {
          timeout,
        },
      )
    },
    ShowHelp() {
      if (this.isShowHelp === false) {
        this.$bvToast.show('help-center')
        this.isShowHelp = true
      } else {
        this.$bvToast.hide('help-center')
        this.isShowHelp = false
      }
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';

.float {
  position: fixed;
  width: 65px;
  height: 65px;
  bottom: 40px;
  right: 80px;
  background-color: #4b87c7;
  color: #fff;
  border-radius: 50px;
  text-align: center;
  box-shadow: 2px 2px 3px #999;
}

.float-help {
  position: fixed;
  width: 300 px !important;
  bottom: 120px;
  right: 80px;
  border-radius: 50px;
}

.my-float {
  margin-top: 9px;
}
</style>
