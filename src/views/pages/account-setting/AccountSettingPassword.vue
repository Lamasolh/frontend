<template>
  <div>
    <b-card>
      <validation-observer
        ref="PassRules"
        tag="form"
      >
        <!-- form -->
        <b-form>
          <b-row>
            <!-- old password -->
            <b-col md="6">
              <b-form-group
                label="Old Password"
                label-for="account-old-password"
              >
                <b-input-group class="input-group-merge">
                  <b-form-input
                    id="account-old-password"
                    v-model="passwordValueOld"
                    name="old-password"
                    :type="passwordFieldTypeOld"
                    placeholder="Old Password"
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      :icon="passwordToggleIconOld"
                      class="cursor-pointer"
                      @click="togglePasswordOld"
                    />
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
            <!--/ old password -->
          </b-row>
          <b-row>
            <!-- new password -->
            <b-col md="6">
              <validation-provider
                #default="{ errors }"
                rules="required|min:8|max:32"
                name="password"
              >
                <b-form-group
                  label-for="account-new-password"
                  label="New Password"
                >
                  <b-input-group class="input-group-merge">
                    <b-form-input
                      id="account-new-password"
                      ref="password"
                      v-model="newPasswordValue"
                      name="password"
                      :type="passwordFieldTypeNew"
                      placeholder="New Password"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        :icon="passwordToggleIconNew"
                        class="cursor-pointer"
                        @click="togglePasswordNew"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>
            <!--/ new password -->

            <!-- retype password -->
            <b-col md="6">
              <validation-provider
                #default="{ errors }"
                rules="required|min:8|max:32|confirmed:password"
                name="Retype Password"
              >
                <b-form-group
                  label-for="account-retype-new-password"
                  label="Retype New Password"
                >
                  <b-input-group class="input-group-merge">
                    <b-form-input
                      id="account-retype-new-password"
                      v-model="RetypePassword"
                      :type="passwordFieldTypeRetype"
                      name="retype-password"
                      placeholder="New Password"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        :icon="passwordToggleIconRetype"
                        class="cursor-pointer"
                        @click="togglePasswordRetype"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>
            <!--/ retype password -->

            <!-- buttons -->
            <b-col cols="12">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                class="mt-1 mr-1"
                @click="SaveForm"
              >
                Save changes
              </b-button>
              <b-button
                v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                type="reset"
                variant="outline-secondary"
                class="mt-1"
              >
                Reset
              </b-button>
            </b-col>
            <!--/ buttons -->
          </b-row>
        </b-form>
      </validation-observer>
    </b-card>
    <AccountSettingTwoFact />
    <AccountSettingLoginDetails />
  </div>
</template>

<script>
import Ripple from 'vue-ripple-directive'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import * as API from '@/services/API'
import { takeState } from 'vuex-dot'
import AccountSettingTwoFact from './AccountSettingTwoFact.vue'
import AccountSettingLoginDetails from './AccountSettingLoginDetails.vue'

export default {
  components: {
    ValidationProvider,
    AccountSettingTwoFact,
    AccountSettingLoginDetails,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      passwordValueOld: '',
      newPasswordValue: '',
      RetypePassword: '',
      passwordFieldTypeOld: 'password',
      passwordFieldTypeNew: 'password',
      passwordFieldTypeRetype: 'password',
    }
  },
  computed: {
    show: takeState('profile', 'show').commit('profile/SET_SHOW').map(),

    passwordToggleIconOld() {
      return this.passwordFieldTypeOld === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    passwordToggleIconNew() {
      return this.passwordFieldTypeNew === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    passwordToggleIconRetype() {
      return this.passwordFieldTypeRetype === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  methods: {
    togglePasswordOld() {
      this.passwordFieldTypeOld = this.passwordFieldTypeOld === 'password' ? 'text' : 'password'
    },
    togglePasswordNew() {
      this.passwordFieldTypeNew = this.passwordFieldTypeNew === 'password' ? 'text' : 'password'
    },
    togglePasswordRetype() {
      this.passwordFieldTypeRetype = this.passwordFieldTypeRetype === 'password' ? 'text' : 'password'
    },
    SaveForm() {
      this.$refs.PassRules.validate().then(success => {
        if (success) {
          const payload = {
            current_password: this.passwordValueOld,
            password: this.newPasswordValue,
            password_confirmation: this.RetypePassword,
          }
          this.show = true
          API.apiClient.put('/user/password', payload).then(res => {
            console.log(res)
            this.show = false
            this.$swal({
              icon: 'success',
              title: 'Success!',
              text: 'Password changed successfully',
              customClass: {
                confirmButton: 'btn btn-success',
              },
            })
          }).catch(error => {
            console.log('ERRRR:: ', error)
            this.show = false
            this.$swal({
              icon: 'error',
              title: 'Attention!',
              text: 'The Old Password is incorrect',
              customClass: {
                confirmButton: 'btn btn-success',
              },
            })
          })
        }
      })
    },
  },
}
</script>
