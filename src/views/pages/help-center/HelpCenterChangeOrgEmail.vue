<template>
  <div>
    <validation-observer ref="directForm">

      <b-form
        ref="Form"
        @submit.prevent
      >
        <b-overlay
          :show="show"
          variant="light"
          opacity="0.55"
          blur="3px"
        >

          <b-alert
            v-if="alert===1"
            variant="success"
            show
          >
            <div class="alert-body">
              <span>Operation Succefully.</span>
            </div>
          </b-alert>
          <b-alert
            v-else-if="alert===0"
            variant="danger"
            show
          >
            <div class="alert-body">
              <span>Operation Falied, Please check your information.</span>
            </div>
          </b-alert>
          <b-alert
            v-else-if="alert===2"
            variant="danger"
            show
          >
            <div class="alert-body">
              <span>Please Check internet connection and try again.</span>
            </div>
          </b-alert>
          <b-row>
            <p class="ml-2">
              To change organization email enter organization admin email and we send a email with link to verify your organization
            </p>
          </b-row>

          <b-row>
            <!-- email -->
            <b-col cols="12">
              <b-form-group
                label="Email Admin"
                label-for="b-email"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Email"
                  rules="required|email|min:4"
                >
                  <b-form-input
                    id="b-email"
                    v-model="email"
                    :state="
                      errors.length > 0 ? false : null
                    "
                    name="email"
                    placeholder="name@example.com"
                  />
                  <small class="text-danger">{{
                    errors[0]
                  }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!-- submit and reset -->
            <b-col>
              <b-button
                type="submit"
                variant="primary"
                class="mr-1"
                @click="Send"
              >
                Submit
              </b-button>
              <b-button
                type="reset"
                variant="outline-secondary"
                @click="Reset"
              >
                Reset
              </b-button>
            </b-col>
          </b-row>
        </b-overlay>
      </b-form>
    </validation-observer>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { takeState } from 'vuex-dot'

export default {
  components: {
    ValidationProvider, ValidationObserver,
  },
  data() {
    return {
      alert: null,
    }
  },
  computed: {
    show: takeState('helpCenter', 'show').commit('helpCenter/SET_SHOW').map(),
    email: takeState('helpCenter', 'emaiLadmin').commit('helpCenter/SET_CHANGE_ORG_EMAIL').map(),
  },
  watch: {
    email() {
      this.alert = null
    },
  },
  methods: {
    Send() {
      this.$refs.directForm.validate().then(success => {
        if (success) {
          this.alert = null
          this.$store.dispatch('helpCenter/ChangeOrgEmail').then(res => {
            console.log(res)
            if (res === 1) {
              this.alert = 1
            } else {
              this.alert = 0
            }
          }).catch(() => {
            this.alert = 2
          })
        }
      })
    },
    Reset() {
      this.email = null
      this.$refs.Form.reset()
      this.$refs.directForm.reset()
    },
  },
}
</script>
