<template>
  <div>

    <validation-observer
      ref="form"
      tag="form"
    >
      <b-form ref="form">
        <b-row>
          <!-- Organization
        <b-col cols="3">
          <validation-provider
            v-slot="{ errors }"
            rules="required"
            name="Service"
          >
            <b-form-group label="Service:">
              <v-select
                v-model="service"
                placeholder="Select Service"
                label="title"
                :clearable="false"
                :state="errors.length > 0 ? false : null"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="services"
              />
              <small class="text-danger mb-1">{{
                errors[0]
              }}</small>
            </b-form-group>
          </validation-provider>
        </b-col> -->
          <!-- Referral -->
          <b-col cols="4">
            <validation-provider
              v-slot="{ errors }"
              rules="required|integer"
              name="Number of Individual"
            >
              <b-form-group label="Number of Individual:">
                <b-form-input
                  v-model="noidp"
                  name="Number of Individual"
                  type="number"
                  :disabled="status=='Running'"
                  @input="ChangeNI"
                />
                <small class="text-danger mb-1">{{
                  errors[0]
                }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col cols="4">
            <validation-provider
              v-slot="{ errors }"
              rules="required|integer"
              name="Capacity"
            >

              <b-form-group label="Capacity:">
                <b-form-input
                  v-model="capacity"
                  name="Capacity"
                  type="number"
                  :disabled="status=='Running'"
                  @input="ChangeCap"
                />
                <small class="text-danger mb-1">{{
                  errors[0]
                }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col cols="4">
            <validation-provider
              v-slot="{ errors }"
              rules="required|integer"
              name="Quota"
            >
              <b-form-group label="Quota:">
                <b-form-input
                  v-model="quota"
                  type="number"
                  name="Quota"
                  :disabled="status=='Running'"
                  @input="ChangeQota"
                />
                <small class="text-danger mb-1">{{
                  errors[0]
                }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>

          <b-col cols="4">
            <validation-provider
              v-slot="{ errors }"
              rules="required"
              name="Focal Point"
            >
              <b-form-group label="Focal Point:">
                <b-form-input
                  v-model="focal_point"
                  :disabled="status=='Running'"
                  name="Focal Point"
                />
                <small class="text-danger mb-1">{{
                  errors[0]
                }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col cols="4">
            <validation-provider
              v-slot="{ errors }"
              rules="required"
              name="Focal Point Phone"
            >
              <b-form-group label="Focal Point Phone:">
                <b-form-input
                  v-model="focal_point_ph"
                  :disabled="status=='Running'"
                  name="Focal Point Phone"
                />
                <small class="text-danger mb-1">{{
                  errors[0]
                }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col cols="4">
            <validation-provider
              v-slot="{ errors }"
              rules="required|integer"
              name="Duration"
            >

              <b-form-group label="Duration (Days):">
                <b-form-input
                  v-model="duration"
                  name="Duration"
                  type="number"
                  :disabled="status=='Running'"
                  @input="ChangeDR"
                />
                <small class="text-danger mb-1">{{
                  errors[0]
                }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
        </b-row>
        <h3>Info</h3>
        <b-row>
          <b-col>
            <p>Qty/day: {{ qty_perDay }}L</p>
          </b-col>
          <b-col>
            <p>Quantity Needed: {{ qtyNeeded }} </p>
          </b-col>
          <b-col>

            <p>Deadline: {{ deadline }}</p>
          </b-col>
        </b-row>
        <b-row align-h="end">

          <b-col cols="2">

            <b-button
              block
              variant="success"
              :disabled="status=='Running'"
              @click="send"
            >
              Send
            </b-button>
          </b-col>

        </b-row>
      </b-form>
    </validation-observer>
  </div>
</template>

<script>
/* eslint-disable global-require */
import Ripple from 'vue-ripple-directive'
import { takeState } from 'vuex-dot'
// eslint-disable-next-line import/order
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
// import vSelect from 'vue-select'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import moment from 'moment'

export default {
  components: {
    // vSelect,
    ValidationProvider,
    ValidationObserver,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,

  },
  directives: {
    Ripple,
  },
  data() {
    return {
      service: {
        value: 1,
        title: 'Water Trucking',
      },
      services: [{
        value: 1,
        title: 'Water Trucking',
      }],

    }
  },

  computed: {
    noidp: takeState('monitoringDRMDtl', 'noidp').commit('monitoringDRMDtl/SET_NOIDP').map(),
    capacity: takeState('monitoringDRMDtl', 'capacity').commit('monitoringDRMDtl/SET_CAP').map(),
    unit: takeState('monitoringDRMDtl', 'unit').commit('monitoringDRMDtl/SET_UNIT').map(),
    units: takeState('monitoringDRMDtl', 'units').map(),
    deadline: takeState('monitoringDRMDtl', 'deadline').commit('monitoringDRMDtl/SET_DEADLINE').map(),
    duration: takeState('monitoringDRMDtl', 'duration').commit('monitoringDRMDtl/SET_DUR').map(),
    amount: takeState('monitoringDRMDtl', 'amount').commit('monitoringDRMDtl/SET_AMOUNT').map(),
    focal_point: takeState('monitoringDRMDtl', 'focal_point').commit('monitoringDRMDtl/SET_FC').map(),
    focal_point_ph: takeState('monitoringDRMDtl', 'focal_point_ph').commit('monitoringDRMDtl/SET_FC_PH').map(),
    quota: takeState('monitoringDRMDtl', 'quota').commit('monitoringDRMDtl/SET_QOTA').map(),
    status: takeState('monitoringDRMDtl', 'status').commit('monitoringDRMDtl/SET_STATUS').map(),

    qtyNeeded: takeState('monitoringDRMDtl', 'qtyNeeded').commit('monitoringDRMDtl/SET_QTY_ND').map(),

    qty_perDay: takeState('monitoringDRMDtl', 'qty_perDay').commit('monitoringDRMDtl/SET_PER_DAY').map(),

  },

  methods: {
    ChangeNI() {
      this.qty_perDay = (this.noidp == null || this.quota == null ? 0 : this.quota * this.noidp)
      // this.duration = Math.ceil(this.qty_perDay === 0 || this.capacity == null ? 0 : (this.capacity / this.qty_perDay))
      this.qtyNeeded = this.duration * this.qty_perDay
      this.deadline = moment().add(this.duration, 'days').format('YYYY-MM-DD')
      console.log(this.duration)
    },
    ChangeDR() {
      this.qty_perDay = (this.noidp == null || this.quota == null ? 0 : this.quota * this.noidp)
      // this.duration = Math.ceil(this.qty_perDay === 0 || this.capacity == null ? 0 : (this.capacity / this.qty_perDay))
      this.qtyNeeded = this.duration * this.qty_perDay
      this.deadline = moment().add(this.duration, 'days').format('YYYY-MM-DD')
      console.log(this.duration)
    },
    ChangeCap() {
      this.qty_perDay = (this.noidp == null || this.quota == null ? 0 : this.quota * this.noidp)
      // this.duration = Math.ceil(this.qty_perDay === 0 || this.capacity == null ? 0 : (this.capacity / this.qty_perDay))
      this.deadline = moment().add(this.duration, 'days').format('YYYY-MM-DD')
      this.qtyNeeded = this.duration * this.qty_perDay
      console.log(this.capacity, this.qty_perDay)
      console.log((this.capacity / this.qty_perDay))
    },
    ChangeQota() {
      this.qty_perDay = (this.noidp == null || this.quota == null ? 0 : this.quota * this.noidp)
      // this.duration = Math.ceil(this.qty_perDay === 0 || this.capacity == null ? 0 : (this.capacity / this.qty_perDay))
      this.deadline = moment().add(this.duration, 'days').format('YYYY-MM-DD')
      this.qtyNeeded = this.duration * this.qty_perDay
      console.log(moment())
      console.log(this.qty_perDay)
      console.log(this.deadline)
    },
    send() {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.$store.dispatch('monitoringDRMDtl/SUBMIT', {
            prefix: this.$route.params.prefixPrj,
            prefixRole: this.$route.params.prefixRole,
            issId: this.$route.params.value.is_id,
          }).then(res => {
            console.log(res)
            if (res.data[0].result === 1) {
              this.status = 'Running'
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Operation Completed',
                  icon: 'EditIcon',
                  variant: 'success',
                },
              })
            } else {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Operation Failed',
                  icon: 'EditIcon',
                  variant: 'warning',
                },
              })
            }
          }).catch(e => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: e.toString(),
                icon: 'EditIcon',
                variant: 'danger',
              },
            })
          })
        }
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
