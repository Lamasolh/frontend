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
              <!-- Header: indicators Info -->
              <div class="d-flex">
                <feather-icon
                  icon="SettingsIcon"
                  size="19"
                />
                <h4 class="mb-0 ml-50">
                  Indicators Info
                </h4>
              </div>
              <br>
              <b-row
                v-for="item in indicatorList.filter(el=>el.isInd)"
                ref="row"
                :key="item.id"
              >
                <b-col md="6">
                  <!--:rules="item.require ===1? 'required':'' "-->
                  <validation-provider
                    v-slot="{ errors }"
                    :rules="item.require? 'required':'' "
                    :name="item.name"
                  >
                    <b-form-group :label="item.name">
                      <b-form-input
                        v-if="(item.type ===1)"
                        v-model="item.value"
                        :state="errors.length > 0 ? false : null"
                        type="text"
                        :placeholder="item.desc"
                        min="0"
                        oninput="validity.valid||(value='');"
                      />
                      <b-form-input
                        v-else-if="(item.type ===2)"
                        v-model="item.value"
                        :state="errors.length > 0 ? false : null"
                        type="number"
                        :placeholder="item.desc"
                      />

                      <flat-pickr
                        v-else-if="(item.type===3)"
                        v-model="item.value"
                        class="form-control"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        :placeholder="item.desc"
                        :state="errors.length > 0 ? false : null"
                      />
                      <v-select
                        v-else-if="(item.type ===4)"
                        v-model="item.value"
                        :placeholder="item.desc"
                        label="title"
                        :clearable="false"
                        :state="errors.length > 0 ? false : null"
                        :options="yesNo"
                      />

                      <small class="text-danger mb-1">{{ errors[0] }}</small>
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
                <b-col cols="auto">
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    variant="warning"
                    @click="SaveData(true )"
                  >
                    <span>Save Later</span>
                  </b-button>
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    variant="success"
                    @click="SaveData(false)"
                  >
                    <span>Save</span>
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
// import vSelect from 'vue-select'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { heightTransition } from '@core/mixins/ui/transition'
import Ripple from 'vue-ripple-directive'
import { takeState } from 'vuex-dot'
import flatPickr from 'vue-flatpickr-component'
import vSelect from 'vue-select'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    flatPickr,
    vSelect,
  },
  directives: {
    Ripple,
  },
  mixins: [heightTransition],
  data() {
    return { indicatorList: [] }
  },
  computed: {
    indicators: takeState('indicators', 'indicators').map(),
    show: takeState('indicators', 'show').commit('indicators/SET_SHOW').map(),
    yesNo: takeState('indicators', 'yesNo').map(),

  },
  watch: {
    indicatorList: {
      deep: true,
      handler() {
        console.log('The list of colours has changed!')
      },
    },
  },
  mounted() {
    this.indicatorList = JSON.parse(this.$route.params.value.extra_fields == null ? [] : this.$route.params.value.extra_fields)

    this.indicatorList.forEach(element => {
      console.log('vvv', element)
      if (element.value != null) {
        if (element.type === 4) {
        // eslint-disable-next-line prefer-destructuring, no-param-reassign
          element.value = this.yesNo.filter(el => el.id === JSON.parse(element.value).id)[0]
        }
      }
    })
    console.log(this.indicatorList)
  },
  methods: {
    SaveData(later) {
      const inds = []
      this.indicatorList.forEach(element => {
        if (element.value != null) {
          inds.push([element.id, element.value])
        }
      })

      console.log(later)
      if (later) {
        this.show = true
        this.$store
          .dispatch('indicators/SAVE_DATA', {
            item: this.$route.params.value,
            later,
            extra: JSON.stringify(inds),
            prefix: this.$route.params.prefixPrj,
          })
          .then(res => {
            console.log('res', res)
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
              this.indicatorsList()
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
        this.$refs.simpleRules.validate().then(success => {
          if (success) {
            this.show = true
            this.$store
              .dispatch('indicators/SAVE_DATA', {
                item: this.$route.params.value,
                later,
                extra: JSON.stringify(inds),
                prefix: this.$route.params.prefixPrj,
              })
              .then(res => {
                console.log('res', res)
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
                  this.indicatorsList()
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
      }
    },
    indicatorsList() {
      const nav = []
      nav.push(
        {
          active: false,
          text: 'Indicators List',
        },
        {
          active: true,
        },

      )
      this.$router.replace({
        name: 'projectIndicatorsList',
        params: {
          action: 'read',
          breadcrumb: nav,
          active: true,
          prefix: this.$route.params.prefixPrj,
          prefixRole: this.$route.params.prefixRole,
          title: 'Indicators List',
          resource: 'AWRNS',
        },
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';

.repeater-form {
  transition: 0.3s height;
}
</style>
