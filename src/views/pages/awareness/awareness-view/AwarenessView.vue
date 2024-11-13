<template>
  <b-card>
    <b-overlay
      :show="show"
      rounded="sm"
    >
      <div>
        <validation-observer ref="simpleRules">
          <b-form
            ref="form"
            class="repeater-form"
            @submit.prevent
          >
            <!-- Main: General Info -->
            <div>
              <!-- Header: General Info -->
              <div class="d-flex">
                <feather-icon
                  icon="InfoIcon"
                  size="19"
                />
                <h4 class="mb-0 ml-50">
                  General Information:
                </h4>
              </div>
              <br>
              <!--General Info -->
              <b-row ref="row">
                <!-- Name -->
                <b-col md="2">
                  Case Code :
                </b-col>
                <b-col md="3">
                  {{ $route.params.value.case_code }}
                </b-col>
                <b-col md="2">
                  Full Name :
                </b-col>
                <b-col md="3">
                  {{ $route.params.value.full_name }}
                </b-col>
              </b-row>
              <b-row ref="row">
                <!-- Name -->
                <b-col md="2">
                  Phone Number :
                </b-col>
                <b-col md="3">
                  {{ $route.params.value.case_phone }}
                </b-col>
                <b-col md="2">
                  referral :
                </b-col>
                <b-col md="3">
                  {{ $route.params.value.referral_name }}
                </b-col>
              </b-row>
              <b-row ref="row">
                <!-- Name -->
                <b-col md="2">
                  Cadaster :
                </b-col>
                <b-col md="3">
                  {{ $route.params.value.cadastre_name }}
                </b-col>
                <b-col md="2">
                  Delivery Date :
                </b-col>
                <b-col md="3">
                  {{ $route.params.value.referral_date }}
                </b-col>
              </b-row>
              <br>
            </div>
            <hr>
            <div>
              <!-- Header: Awareness Info -->
              <div class="d-flex">
                <feather-icon
                  icon="SettingsIcon"
                  size="19"
                />
                <h4 class="mb-0 ml-50">
                  Awareness Info
                </h4>
              </div>
              <br>

              <b-row ref="row">
                <b-col md="4">

                  <validation-provider
                    v-slot="{ errors }"
                    rules="required"
                    name="Feedback"
                  >
                    <b-form-group label="Feedback">
                      <v-select
                        v-model="feedback"
                        placeholder="Select Feedback"
                        label="title"
                        :clearable="false"
                        :state="errors.length > 0 ? false : null"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        :options="FeedbackOptions"
                        @input="FeedBackChange"
                      />
                      <small class="text-danger mb-1">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                </b-col>
              </b-row>
              <b-row ref="row">

                <b-col cols="4">

                  <validation-provider
                    v-slot="{ errors }"
                    :rules="'required'"
                    name="Male Count"
                  >
                    <b-form-group label="Male Count">
                      <b-form-input
                        v-model="malecount"
                        label="title"
                        type="number"
                        class="lg"
                        min="0"
                        oninput="validity.valid||(value='');"
                        placeholder="Enter the number of males"
                        :state="errors.length > 0 ? false : null"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      />
                      <small class="text-danger mb-1">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                </b-col>
                <b-col cols="4">

                  <validation-provider
                    v-slot="{ errors }"
                    :rules="'required'"
                    name="Female Count"
                  >
                    <b-form-group label="Female Count">
                      <b-form-input
                        v-model="femalecount"
                        label="title"
                        type="number"
                        class="lg"
                        min="0"
                        oninput="validity.valid||(value='');"
                        placeholder="Enter the number of males"
                        :state="errors.length > 0 ? false : null"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      />
                      <small class="text-danger mb-1">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <b-col cols="4">

                  <validation-provider
                    v-slot="{ errors }"
                    :rules="`required`"
                    name="HouseHold Count"
                  >
                    <b-form-group label="HouseHold Count">
                      <b-form-input
                        v-model="household"
                        label="title"
                        type="number"
                        class="lg"
                        min="1"
                        oninput="validity.valid||(value='');"
                        placeholder="Enter the number of males"
                        :state="errors.length > 0 ? false : null"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      />
                      <small class="text-danger mb-1">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                </b-col>
              </b-row>
              <b-row ref="row">
                <b-col cols="12">
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required"
                    name="Comments"
                  >
                    <b-form-group label="Comments">
                      <b-form-textarea
                        v-model="comments"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Enter your comment about your awareness session (note: this comment is for internal review)"
                        rows="6"
                        cols="100"
                      />
                      <br>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                </b-col>
              </b-row>

              <b-row
                align-h="between"
                class="justify-content"
              >
                <b-col
                  cols="auto"
                  class="mb-50"
                />
                <b-col cols="3">
                  <!--<b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    class="ml-1 mr-1"
                    variant="success"
                    type="submit"
                    @click="Later(true)"
                  >
                    <span>Contineu Later</span>
                  </b-button> -->
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    variant="warning"
                    block
                    @click="SaveData(false)"
                  >
                    <span>End Session</span>
                  </b-button>
                </b-col>
              </b-row>
            </div>
          </b-form>
        </validation-observer>
      </div>
    </b-overlay>
  </b-card>
</template>

<script>
// eslint-disable-next-line import/no-unresolved
import vSelect from 'vue-select'
// import vSelect from 'vue-select'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { heightTransition } from '@core/mixins/ui/transition'
import Ripple from 'vue-ripple-directive'
import { mapGetters } from 'vuex'
import { takeState } from 'vuex-dot'

export default {
  components: {
    vSelect,
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  mixins: [heightTransition],
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({
      FeedbackOptions: 'global/feedback',
    }),
    comments: takeState('awareness', 'comments').commit('awareness/SET_COMMENTS').map(),
    feedback: takeState('awareness', 'feedback').commit('awareness/SET_FEEDBACK').map(),

    malecount: takeState('awareness', 'malecount').commit('awareness/SET_MALE_COUNT').map(),
    femalecount: takeState('awareness', 'femalecount').commit('awareness/SET_FEMALE_COUNT').map(),
    household: takeState('awareness', 'household').commit('awareness/SET_HOUSEHOLD_COUNT').map(),

    show: takeState('awareness', 'show').commit('awareness/SET_SHOW').map(),

    family_members() {
      return (this.malecount == null ? 0 : parseInt(this.malecount, 10)) + (this.femalecount == null ? 0 : parseInt(this.femalecount, 10))
    },
  },
  mounted() {
    this.comments = null
    this.feedback = null
    this.malecount = null
    this.femalecount = null
    this.household = null
  },
  methods: {
    FeedBackChange(vl) {
      console.log(vl)
      this.comments = vl.title
    },
    SaveData(later) {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          this.show = true
          this.$store
            .dispatch('awareness/SAVE_DATA', {
              item: this.$route.params.value,
              later,
              prefix: this.$route.params.prefixPrj,
            })
            .then(res => {
              if (res.result === 1) {
                this.$swal({
                  title: 'Success!',
                  text: 'Operation successfuly',
                  icon: 'success',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                })
                this.AwarenessList()
              } else {
                this.show = false
                this.$swal({
                  title: 'Failed!',
                  text: 'Operation Failed',
                  icon: 'error',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                })
              }
            })
            .catch(() => {
              this.show = false
              this.$swal({
                title: 'Failed!',
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
            text: 'Missing Data',
            icon: 'warning',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        }
      })
    },
    Later(later) {
      this.show = true
      this.$store
        .dispatch('awareness/SAVE_DATA', {
          item: this.$route.params.value,
          later,
          prefix: this.$route.params.prefixPrj,
        })
        .then(res => {
          if (res.result === 1) {
            this.$swal({
              title: 'Success!',
              text: 'Operation successfuly',
              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
            this.AwarenessList()
          } else {
            this.show = false
            this.$swal({
              title: 'Failed!',
              text: 'Operation Failed',
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          }
        })
        .catch(() => {
          this.show = false
          this.$swal({
            title: 'Failed!',
            text: 'Please Check internet and try again',
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        })
    },

    AwarenessList() {
      const nav = []
      nav.push({
        active: false,
        text: this.$route.params.breadcrumb[0].text,
      },
      {
        active: true,
        text: 'Awareness',
      })
      this.$router.replace({
        name: 'project',
        params: {
          action: 'read',
          breadcrumb: nav,
          active: true,
          prefix: this.$route.params.prefixPrj,
          prefixRole: this.$route.params.prefixRole,
          title: 'Awareness',
          resource: 'AWRNS',
        },
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

.repeater-form {
  transition: 0.3s height;
}
</style>
