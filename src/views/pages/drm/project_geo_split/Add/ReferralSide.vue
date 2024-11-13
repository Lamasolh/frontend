<template>
  <b-sidebar
    v-model="active"
    right
    sidebar-class="sidewidth"
  >
    <!-- Header -->
    <div
      class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1"
    >
      <h5 class="mb-0">
        Create Site
      </h5>
    </div>
    <validation-observer
      ref="form"
      tag="form"
    >
      <b-form ref="form">
        <b-row class="m-1">
          <b-col cols="12">
            <h3>Select Cadaster</h3>
          </b-col>
          <!-- Gov -->
          <b-col cols="6">
            <validation-provider
              v-slot="{ errors }"
              rules=""
              name="Governorate"
            >
              <b-form-group label="Governorate">
                <v-select
                  v-model="governorate"
                  label="title"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="governorateOption"
                />
                <small class="text-danger mb-1">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <!-- District -->
          <b-col cols="6">
            <validation-provider
              v-slot="{ errors }"
              rules=""
              name="District"
            >
              <b-form-group label="District">
                <v-select
                  v-model="district"
                  label="title"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="districtSelect"
                  @input="(value) => ChangeDistrict(value)"
                />
                <small class="text-danger mb-1">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <!-- Cadaster -->
          <b-col cols="12">
            <validation-provider
              v-slot="{ errors }"
              rules=""
              name="Cadaster"
            >
              <b-form-group label="Cadaster">
                <v-select
                  v-model="cadaster"
                  label="title"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="cadOptions"
                  @input="(value) => ChangeCAD(value)"
                />
                <small class="text-danger mb-1">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col cols="6">
            <b-form-group label="P-Code">
              <b-form-input
                v-model="pcode"
                name="P-Code"
                type="number"
                :disabled="status == 'Running'"
                @input="ChangeNI"
              />
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <validation-provider
              v-slot="{ errors }"
              rules="required|integer"
              name="ICAD number"
            >
              <b-form-group label="ICAD number:">
                <b-form-input
                  v-model="noidp"
                  name="ICAD number"
                  type="text"
                  :disabled="status == 'Running'"
                  @input="ChangeNI"
                />
                <small class="text-danger mb-1">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col cols="6">
            <validation-provider
              v-slot="{ errors }"
              rules="required|integer"
              name="Name"
            >
              <b-form-group label="Name:">
                <b-form-input
                  v-model="noidp"
                  name="Name"
                  type="text"
                  :disabled="status == 'Running'"
                  @input="ChangeNI"
                />
                <small class="text-danger mb-1">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col cols="6">
            <validation-provider
              v-slot="{ errors }"
              rules="required|integer"
              name="Name Arabic"
            >
              <b-form-group label="Name Arabic:">
                <b-form-input
                  v-model="noidp"
                  name="Name Arabic"
                  type="text"
                  :disabled="status == 'Running'"
                  @input="ChangeNI"
                />
                <small class="text-danger mb-1">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col cols="6">
            <validation-provider
              v-slot="{ errors }"
              rules="required|integer"
              name="Address"
            >
              <b-form-group label="Address:">
                <b-form-input
                  v-model="noidp"
                  name="Address"
                  type="text"
                  :disabled="status == 'Running'"
                  @input="ChangeNI"
                />
                <small class="text-danger mb-1">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col cols="6">
            <validation-provider
              v-slot="{ errors }"
              rules="required|integer"
              name="Latitude"
            >
              <b-form-group label="Latitude:">
                <b-form-input
                  v-model="noidp"
                  name="Latitude"
                  type="text"
                  :disabled="status == 'Running'"
                  @input="ChangeNI"
                />
                <small class="text-danger mb-1">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col cols="6">
            <validation-provider
              v-slot="{ errors }"
              rules="required|integer"
              name="Longitude"
            >
              <b-form-group label="Longitude:">
                <b-form-input
                  v-model="noidp"
                  name="Longitude"
                  type="text"
                  :disabled="status == 'Running'"
                  @input="ChangeNI"
                />
                <small class="text-danger mb-1">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col cols="12">
            <hr>
          </b-col>
          <b-col cols="6">
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
                  :disabled="status == 'Running'"
                  @input="ChangeNI"
                />
                <small class="text-danger mb-1">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col cols="6">
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
                  :disabled="status == 'Running'"
                  @input="ChangeCap"
                />
                <small class="text-danger mb-1">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col cols="6">
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
                  :disabled="status == 'Running'"
                  @input="ChangeQota"
                />
                <small class="text-danger mb-1">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col cols="6">
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
                  :disabled="status == 'Running'"
                  @input="ChangeDR"
                />
                <small class="text-danger mb-1">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col cols="6">
            <validation-provider
              v-slot="{ errors }"
              rules="required"
              name="Focal Point"
            >
              <b-form-group label="Focal Point:">
                <b-form-input
                  v-model="focal_point"
                  :disabled="status == 'Running'"
                  name="Focal Point"
                />
                <small class="text-danger mb-1">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col cols="6">
            <validation-provider
              v-slot="{ errors }"
              rules="required"
              name="Focal Point Phone"
            >
              <b-form-group label="Focal Point Phone:">
                <b-form-input
                  v-model="focal_point_ph"
                  :disabled="status == 'Running'"
                  name="Focal Point Phone"
                />
                <small class="text-danger mb-1">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col cols="12">
            <b-form-group label="Select an Option">
              <b-form-select
                v-model="selectNgo"
                :options="optionsngo"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="Select an Option">
              <b-form-select
                v-model="selectedDRM"
                :options="optionsdrm"
              />
            </b-form-group>
          </b-col>
          <b-col
            cols="12"
            class="mt-2"
          >
            <h3>Info</h3>
            <p>Qty/day: {{ qty_perDay }}L</p>
            <p>Quantity Needed: {{ qtyNeeded }}</p>
            <p>Deadline: {{ deadline }}</p>
          </b-col>
          <b-col cols="10" />
          <b-col cols="12">
            <b-button
              block
              variant="success"
              :disabled="status == 'Running'"
              @click="send"
            >
              Send
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>

  </b-sidebar>
</template>

<script>
import vSelect from 'vue-select'
import { takeState } from 'vuex-dot'
import Ripple from 'vue-ripple-directive'
// eslint-disable-next-line no-unused-vars
import moment from 'moment'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    vSelect,
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  computed: {
    ...takeState('drmNGOSup', 'showModalRef')
      .expose([
        'active',
        'item',
        'index',
      ])
      .commit('drmNGOSup/SET_MOD_SIDE')
      .map(),
    show: takeState('drmNGOSup', 'show').commit('drmNGOSup/SET_SHOW').map(),

    governorateOption: takeState('global', 'governorate').map(),
    districtOptions: takeState('global', 'district').map(),
    cadOptions: takeState('drmNGOSup', 'cadOptions')
      .commit('drmNGOSup/SET_CAD_OPT')
      .map(),
    issOptions: takeState('drmNGOSup', 'issOptions').map(),
    CaseStatusOptions: takeState('drmNGOSup', 'CaseStatusOptions').map(),

    // Filter Values
    governorate: takeState('drmNGOSup', 'governorate')
      .commit('drmNGOSup/SET_GOV')
      .map(),
    district: takeState('drmNGOSup', 'district')
      .commit('drmNGOSup/SET_DIS')
      .map(),
    cadaster: takeState('drmNGOSup', 'cadaster')
      .commit('drmNGOSup/SET_CAD')
      .map(),
    dlv_status: takeState('drmNGOSup', 'dlv_status')
      .commit('drmNGOSup/SET_DLV_STATUS')
      .map(),
    case_status: takeState('drmNGOSup', 'case_status')
      .commit('drmNGOSup/SET_CASE_STATUS')
      .map(),
    iss: takeState('drmNGOSup', 'iss').commit('drmNGOSup/SET_ISS').map(),
    current_status: takeState('drmNGOSup', 'current_status')
      .commit('drmNGOSup/SET_CUR_STATUS')
      .map(),

    //
    districtSelect() {
      return this.districtOptions.filter(
        item => item.params
          === (this.governorate != null ? this.governorate.value : null),
      )
    },
    pcode: takeState('drmNGOSup', 'pcode').commit('drmNGOSup/SET_PCODE').map(),

    noidp: takeState('drmNGOSup', 'noidp').commit('drmNGOSup/SET_NOIDP').map(),
    capacity: takeState('drmNGOSup', 'capacity')
      .commit('drmNGOSup/SET_CAP')
      .map(),
    unit: takeState('drmNGOSup', 'unit').commit('drmNGOSup/SET_UNIT').map(),
    units: takeState('drmNGOSup', 'units').map(),
    deadline: takeState('drmNGOSup', 'deadline')
      .commit('drmNGOSup/SET_DEADLINE')
      .map(),
    duration: takeState('drmNGOSup', 'duration')
      .commit('drmNGOSup/SET_DUR')
      .map(),
    amount: takeState('drmNGOSup', 'amount')
      .commit('drmNGOSup/SET_AMOUNT')
      .map(),
    focal_point: takeState('drmNGOSup', 'focal_point')
      .commit('drmNGOSup/SET_FC')
      .map(),
    focal_point_ph: takeState('drmNGOSup', 'focal_point_ph')
      .commit('drmNGOSup/SET_FC_PH')
      .map(),
    quota: takeState('drmNGOSup', 'quota').commit('drmNGOSup/SET_QOTA').map(),
    status: takeState('drmNGOSup', 'status')
      .commit('drmNGOSup/SET_STATUS')
      .map(),

    qtyNeeded: takeState('drmNGOSup', 'qtyNeeded')
      .commit('drmNGOSup/SET_QTY_ND')
      .map(),

    qty_perDay: takeState('drmNGOSup', 'qty_perDay')
      .commit('drmNGOSup/SET_PER_DAY')
      .map(),
    /// Select fro Ngo Drm
    selectNgo: takeState('drmNGOSup', 'selectNgo').commit('drmNGOSup/SET_SEL_NGO').map(),

    selectedDRM: takeState('drmNGOSup', 'selectedDRM').commit('drmNGOSup/SET_SEL_DRM').map(),

    optionsngo: takeState('drmNGOSup', 'optionsngo').map(),
    optionsdrm: takeState('drmNGOSup', 'optionsdrm').map(),

  },
  mounted() {},
  methods: {
    clearAll() {
      this.referral = null
      this.governorate = null
      this.district = null
      this.type = null
      this.cadaster = null
      this.iss = null
      this.awareness = null
      this.monitoring = null
      this.feedback = null
      this.dlv_status = null
      //
      this.perPage = 10
      this.sortBy = ''
      this.sortDesc = false
      this.sortDirection = 'asc'
      this.filter = null
      this.filterOn = []
    },
    Search() {
      /* const rg = this.rangeDate
            if (this.rangeDate != null) {
              this.$store.dispatch('drmNGOSup/GET_DATA', {
                prefix: this.$route.params.prefixPrj,
                prefixRole: this.$route.params.prefixRole,
                startDate: rg.split('to')[0],
                endDate: rg.split('to')[1] == null ? rg.split('to')[0] : rg.split('to')[1],
              }).catch(() => {
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
                text: 'Please select range date!',
                icon: 'warning',
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              })
            } */
    },
    ChangeNI() {
      this.qty_perDay = this.noidp == null || this.quota == null ? 0 : this.quota * this.noidp
      // this.duration = Math.ceil(this.qty_perDay === 0 || this.capacity == null ? 0 : (this.capacity / this.qty_perDay))
      this.qtyNeeded = this.duration * this.qty_perDay
      this.deadline = moment().add(this.duration, 'days').format('YYYY-MM-DD')
      console.log(this.duration)
    },
    ChangeDR() {
      this.qty_perDay = this.noidp == null || this.quota == null ? 0 : this.quota * this.noidp
      // this.duration = Math.ceil(this.qty_perDay === 0 || this.capacity == null ? 0 : (this.capacity / this.qty_perDay))
      this.qtyNeeded = this.duration * this.qty_perDay
      this.deadline = moment().add(this.duration, 'days').format('YYYY-MM-DD')
      console.log(this.duration)
    },
    ChangeCap() {
      this.qty_perDay = this.noidp == null || this.quota == null ? 0 : this.quota * this.noidp
      // this.duration = Math.ceil(this.qty_perDay === 0 || this.capacity == null ? 0 : (this.capacity / this.qty_perDay))
      this.deadline = moment().add(this.duration, 'days').format('YYYY-MM-DD')
      this.qtyNeeded = this.duration * this.qty_perDay
      console.log(this.capacity, this.qty_perDay)
      console.log(this.capacity / this.qty_perDay)
    },
    ChangeQota() {
      this.qty_perDay = this.noidp == null || this.quota == null ? 0 : this.quota * this.noidp
      // this.duration = Math.ceil(this.qty_perDay === 0 || this.capacity == null ? 0 : (this.capacity / this.qty_perDay))
      this.deadline = moment().add(this.duration, 'days').format('YYYY-MM-DD')
      this.qtyNeeded = this.duration * this.qty_perDay
      console.log(moment())
      console.log(this.qty_perDay)
      console.log(this.deadline)
    },
    SearchPCode() {
      if (this.pcode != null) {
        this.$store
          .dispatch('drmNGOSup/SRCH_PCODE', {
            prefix: this.$route.params.prefixPrj,
            prefixRole: this.$route.params.prefixRole,
          })
          .then(res => {
            console.log(res)
            if (res === 1) {
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
          })
          .catch(e => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: e.toString(),
                icon: 'EditIcon',
                variant: 'danger',
              },
            })
          })
      } else {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Please Enter The P-Code',
            icon: 'EditIcon',
            variant: 'danger',
          },
        })
      }
    },
    send() {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.$store
            .dispatch('drmNGOSup/SUBMIT_REF', {
              prefix: this.$route.params.prefixPrj,
              prefixRole: this.$route.params.prefixRole,
            })
            .then(res => {
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
            })
            .catch(e => {
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
    ChangeDistrict(value) {
      if (value != null) {
        this.$store.dispatch('drmNGOSup/GET_CAD')
      } else {
        this.cadOptions = []
      }
    },
    ChangeType(value) {
      if (value != null) {
        if (this.district != null) {
          this.$store.dispatch('drmNGOSup/GET_CAD')
        }
      } else {
        this.cadOptions = []
      }
    },
    ChangeCAD(value) {
      if (value != null) {
        this.$store.dispatch('drmNGOSup/GET_ISS')
      }
    },
  },
}
</script>

<style lang="scss">
.custom-sidebar-width {
  width: 600px !important;
}

@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
