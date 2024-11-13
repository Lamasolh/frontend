<template>
  <b-card>
    <b-overlay
      :show="show"
      rounded="sm"
    >
      <b-card-body>
        <validation-observer ref="addRule">
          <!-- Name -->
          <b-row>
            <b-col>
              <b-form-group
                label="Organization Name"
                label-for="name"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Organization Name"
                  rules="required"
                >
                  <b-form-input
                    id="name"
                    v-model="name"
                    :state="errors.length > 0 ? false : null"
                    placeholder="Enter Organization Name"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>
          <!-- Email -->
          <b-row>
            <b-col>
              <b-form-group
                label="Email"
                label-for="email"
              >
                <validation-provider
                  #default="{ errors }"
                  name="email"
                  rules="required|email"
                >
                  <b-form-input
                    id="email"
                    v-model="email"
                    type="email"
                    :state="errors.length > 0 ? false : null"
                    placeholder="Enter Organization Email"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>
          <!-- Button Send -->
          <b-row>
            <b-button
              variant="primary"
              @click="sendTo"
            >
              Send
            </b-button>
          </b-row>
        </validation-observer>
      </b-card-body>
    </b-overlay>
  </b-card>
</template>
<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { takeState } from 'vuex-dot'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  computed: {
    show: takeState('addOrg', 'show').commit('addOrg/SET_SHOW').map(),
    phoneProps: takeState('addOrg', 'phone').map(),
    phoneOptions: takeState('global', 'phoneOptions').map(),
    ...takeState('addOrg', 'item')
      .expose([
        'name',
        'email',
      ]).commit('addOrg/SET_ITEM').map(),
  },
  methods: {
    sendTo() {
      this.$refs.addRule.validate().then(success => {
        if (success) {
          this.$store.dispatch('addOrg/SEND_TO').then(res => {
            console.log(res)
            this.name = null
            this.email = null
            this.$refs.addRule.reset()
            this.$swal({
              title: 'Success!',
              text: 'Email sent sucessfully',
              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          }).catch(error => {
            console.log(error)
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
        } else {
          this.$swal({
            title: 'Attention!',
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
  },
}
</script>
