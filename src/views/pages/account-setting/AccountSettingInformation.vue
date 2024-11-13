<template>
  <b-card>
    <validation-observer
      ref="InfoRules"
      tag="form"
    >
      <!-- form -->
      <b-form>
        <b-row>
          <!-- bio-->
          <b-col cols="12">
            <b-form-group
              label="Bio"
              label-for="bio-area"
            >
              <b-form-textarea
                id="bio-area"
                v-model="bio"
                rows="4"
                placeholder="Your bio data here..."
              />
            </b-form-group>
          </b-col>
          <!--/ bio -->

          <!-- birth date-->
          <b-col md="6">
            <validation-provider
              #default="{ errors }"
              rules="required"
              name="Birth date"
            >
              <b-form-group
                label-for="example-datepicker"
                label="Birth date"
              >
                <flat-pickr
                  v-model="date_of_birth"
                  class="form-control"
                  name="date"
                  placeholder="Birth date"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <!--/ birth date -->

          <!-- Nationality -->
          <b-col md="6">
            <validation-provider
              #default="{ errors }"
              rules="required"
              name="Gender"
            >
              <b-form-group
                label="Nationality"
              >
                <v-select
                  v-model="nationality"
                  placeholder="Select Nationality"
                  label="title"
                  :clearable="false"
                  :state="errors.length > 0 ? false : null"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="natOptions"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <!--/ Nationality -->
          <!-- Phone-->
          <b-col md="6">
            <b-form-group label="Phone">
              <validation-provider
                v-slot="{ errors }"
                name="Phone"
                :rules="'required|' +`${id === 1? 'phonelbed': 'min:8|max:11'}`"
                style="display: inline"
              >
                <b-input-group>
                  <template #prepend>
                    <b-dropdown
                      :text="text"
                      variant="outline-primary"
                    >
                      <b-dropdown-item
                        v-for="ct in phoneOptions"
                        :key="ct.id"
                        :value="ct.value"
                        @click="dropSelect(ct.value)"
                      >
                        {{ ct.title }}
                      </b-dropdown-item>
                    </b-dropdown>
                  </template>
                  <b-form-input
                    v-model.number="number"
                    type="tel"
                    class="form-control"
                    :state="errors.length > 0 ? false: null"
                    :placeholder="phoneProps[0].placeholder"
                    :formatter="formatter"
                  />
                </b-input-group>
                <small class="text-danger">{{
                  errors[0]
                }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <!--/ Phone-->
          <!-- Job Title-->
          <b-col sm="6">
            <b-form-group
              label="Job Title"
            >
              <b-form-input
                v-model="job_title"
                name="job"
                disabled
              />
            </b-form-group>
          </b-col>
          <!--/ Job Title-->
          <!-- Address-->
          <b-col cols="12">
            <validation-provider
              #default="{ errors }"
              rules="required"
              name="Address"
            >
              <b-form-group
                label="Address"
              >
                <b-form-input
                  v-model="address"
                  dir="rtl"
                  placeholder="Address"
                  name="address"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <!--/ Address-->

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
              class="mt-1"
              variant="outline-secondary"
              @click="resetForm"
            >
              Reset
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
  </b-card>
</template>

<script>
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
// import Cleave from 'vue-cleave-component'
import { mapGetters } from 'vuex'
import Ripple from 'vue-ripple-directive'
import { takeState } from 'vuex-dot'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'cleave.js/dist/addons/cleave-phone.us'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import * as API from '@/services/API'

export default {
  components: {
    vSelect,
    // Cleave,
    flatPickr,
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  computed: {
    ...takeState('profile', 'data')
      .expose([
        'bio',
        'date_of_birth',
        'nationality',
        'address',
        'phone',
        'job_title',
      ])
      .commit('profile/SET_DATA')
      .map(),
    ...takeState('profile', 'country')
      .expose(['id', 'number', 'text'])
      .commit('profile/SET_CON')
      .map(),
    ...mapGetters({
      natOptions: 'global/nationality',
      phoneOptions: 'global/phoneOptions',
      phoneProps: 'global/phoneProps',
    }),
    show: takeState('profile', 'show').commit('profile/SET_SHOW').map(),

  },
  methods: {
    resetForm() {
      this.$store.dispatch('profile/ResetInfoData')
    },
    SaveForm() {
      this.$refs.InfoRules.validate().then(success => {
        if (success) {
          const payload = {
            gen: false,
            bio: String(this.bio),
            nat: this.nationality.value,
            dob: this.date_of_birth,
            add: this.address,
            pho: String(this.phone),
          }
          console.log(payload)
          this.show = true
          API.apiClient.put('/user/profile-information', payload).then(res => {
            console.log(res)
            this.$store.commit('nav/RESET_NAVLIST')
            this.$store.dispatch('auth/getAuthUser')
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
              text: error,
              customClass: {
                confirmButton: 'btn btn-success',
              },
            })
          })
        }
      })
    },
    dropSelect(value) {
      this.id = this.phoneOptions.filter(
        ct => ct.value === value,
      )[0].value
      this.text = this.phoneOptions.filter(
        ct => ct.value === value,
      )[0].text
    },
    formatter(value) {
      const fr = this.fixNumbers(value)
      return fr.replace(/[^0-9]/g, '')
    },
    fixNumbers(str) {
      if (typeof str === 'string') {
        const persianNumbers = [
          /۰/g,
          /۱/g,
          /۲/g,
          /۳/g,
          /۴/g,
          /۵/g,
          /۶/g,
          /۷/g,
          /۸/g,
          /۹/g,
        ]
        const arabicNumbers = [
          /٠/g,
          /١/g,
          /٢/g,
          /٣/g,
          /٤/g,
          /٥/g,
          /٦/g,
          /٧/g,
          /٨/g,
          /٩/g,
        ]
        for (let i = 0; i < 10; i += 1) {
          // eslint-disable-next-line no-param-reassign
          str = str
            .replace(persianNumbers[i], i)
            .replace(arabicNumbers[i], i)
        }
      }
      return str
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
