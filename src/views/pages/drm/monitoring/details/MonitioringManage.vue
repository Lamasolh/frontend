<template>
  <div>
    <b-overlay
      rounded="lg"
      :show="show"
    >
      <b-row>
        <b-col cols="12">
          <b-overlay
            rounded="lg"
            :show="show"
          >

            <b-card>
              <b-row>
                <b-col cols="4">
                  <p>
                    <b>Status:</b> <b :class="status==null?'':(status=='Ready'?'text-success':'text-warning')">{{ status==null?'None':status }}</b>
                  </p>
                  <p>
                    <b>P-Code:</b> <b class="text-danger">{{ $route.params.value.p_code }}</b>
                  </p>
                  <p>
                    <b>Settlement Name:</b>  <b>{{ $route.params.value.is_name }}</b>
                  </p>
                  <p>
                    <b>Settlement Name (Arabic):</b>  <b>{{ $route.params.value.is_name_ar }}</b>
                  </p>

                </b-col>
                <b-col cols="4">
                  <p>
                    <b>Location:</b> <b class="text-warning"><a
                      target="_blank"
                      :href="'https://maps.google.com/?q='+$route.params.value.latitude +','+ $route.params.value.longitude"
                    > {{ $route.params.value.latitude }},{{ $route.params.value.longitude }}</a></b>
                  </p>

                  <p>
                    <b>Governorate Name:</b>  <b>{{ $route.params.value.governorate_name_ar }}</b>
                  </p>
                  <p>
                    <b>District Name:</b>  <b>{{ $route.params.value.district_name_ar }}</b>
                  </p>
                  <p>
                    <b>Cadastre Name:</b>  <b>{{ $route.params.value.cadastre_name_ar }}</b>
                  </p>
                </b-col>
                <b-col cols="4">
                  <p>

                    <validation-observer
                      ref="form"
                      tag="form"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="Org"
                      >
                        <b-form-group label="Organization:">
                          <v-select
                            v-model="org"
                            placeholder="Select Organization"
                            label="title"
                            :clearable="false"

                            name="Organization"
                            :state="errors.length > 0 ? false : null"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :options="orgList"
                          />
                          <small class="text-danger mb-1">{{
                            errors[0]
                          }}</small>
                        </b-form-group>
                      </validation-provider>

                    </validation-observer>

                  </p>
                </b-col>

              </b-row>

            </b-card>
            <b-card>
              <b-tabs
                pills
                nav-class="mb-3"
              >
                <b-tab
                  title="Referal"
                  active
                >
                  <MonitoringReferral />
                </b-tab>
                <b-tab title="View Info">
                  <MonitoringList />
                </b-tab>
              </b-tabs>
            </b-card>
          </b-overlay>
        </b-col>
      </b-row>
    </b-overlay>
  </div>
</template>

<script>
/* eslint-disable global-require */

import Ripple from 'vue-ripple-directive'
import { takeState } from 'vuex-dot'
// eslint-disable-next-line import/order
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import vSelect from 'vue-select'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import MonitoringList from './MonitoringList.vue'
import MonitoringReferral from './MonitoringReferral.vue'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
    MonitoringList,
    MonitoringReferral,
    vSelect,
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },

  computed: {
    show: takeState('monitoringDRMDtl', 'show').commit('monitoringDRMDtl/SET_SHOW').map(),
    orgPrefix: takeState('monitoringDRMDtl', 'org_prfx').map(),
    status: takeState('monitoringDRMDtl', 'status').commit('monitoringDRMDtl/SET_STATUS').map(),

    org: takeState('monitoringDRMDtl', 'org').commit('monitoringDRMDtl/SET_ORG').map(),
    orgList: takeState('monitoringDRMDtl', 'orgList').map(),
  },
  mounted() {
    this.ResetData()
  },
  methods: {
    ResetData() {
      this.$store.dispatch('monitoringDRMDtl/GET_DETAILS', {
        prefix: this.$route.params.prefixPrj,
        prefixRole: this.$route.params.prefixRole,
        issId: this.$route.params.value.is_id,
      })
    },

  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-wizard.scss';
@import '@core/scss/vue/libs/vue-select.scss';
.sticky-top { top: 0.8em; }
</style>
