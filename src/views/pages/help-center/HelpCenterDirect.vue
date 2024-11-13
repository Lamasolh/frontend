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
              <span>Send Email Succefully.</span>
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
            <!-- email -->
            <b-col cols="12">
              <b-form-group
                label="Your Email"
                label-for="b-email"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Email"
                  rules="required|email"
                >
                  <b-form-input
                    id="b-email"
                    v-model="email"
                    :state="errors.length > 0 ? false : null"
                    name="Email"
                    placeholder="name@example.com"
                  />
                  <small class="text-danger">{{
                    errors[0]
                  }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!-- subject -->
            <b-col cols="12">
              <b-form-group
                label="Subject"
                label-for="h-subject"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Subject"
                  rules="required"
                >
                  <b-form-input
                    id="h-subject"
                    v-model="subject"
                    :state="
                      errors.length > 0 ? false : null
                    "
                    name="subject"
                    placeholder="Enter a subject"
                  />
                  <small class="text-danger">{{
                    errors[0]
                  }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Message -->
            <b-col cols="12">
              <b-form-group
                label="Message"
                label-for="d-message"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Message"
                  rules="required"
                >
                  <b-form-textarea
                    id="d-message"
                    v-model="message"
                    placeholder="Enter a message"
                    :state="
                      errors.length > 0 ? false : null
                    "
                    name="message"
                    rows="3"
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
                Send
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
    email: takeState('helpCenter', 'email').commit('helpCenter/SET_EMAIL').map(),
    subject: takeState('helpCenter', 'subject').commit('helpCenter/SET_SUBJECT').map(),
    message: takeState('helpCenter', 'message').commit('helpCenter/SET_MESSAGE').map(),
  },
  watch: {
    email() {
      this.alert = null
    },
    subject() {
      this.alert = null
    },
    message() {
      this.alert = null
    },
  },
  methods: {
    Send() {
      this.$refs.directForm.validate().then(success => {
        if (success) {
          this.alert = null
          this.$store.dispatch('helpCenter/SendMessage').then(res => {
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
      this.alert = null
      this.email = null
      this.subject = null
      this.message = null
      this.$refs.Form.reset()
      this.$refs.directForm.reset()
    },
  },
}
</script>
