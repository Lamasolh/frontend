<template>

  <div>
    <b-modal
      v-if="row !=null"
      id="refermodal"
      v-model="active"
      ok-only
      size="xl"
      no-close-on-backdrop
      class="modal-dialog"
      title="Custom Task"
      :header-bg-variant="headerBgVariant"
      :header-border-variant="bodyTextVariant"
      :footer-border-variant="bodyTextVariant"
      data-backdrop="static"
      @close="abortion"
    >
      <b-overlay
        rounded="lg"
        :show="show"
      >
        <b-container fluid>
          <validation-observer
            ref="modalUrgent"
            tag="form"
          >

            <div v-if="row !=null">
              <b-row>
                <b-col cols="2">
                  <br>
                  <h4> Site:</h4>
                  <p> {{ row.item.is_name }}</p>
                  <br>
                  <h4>PCode:</h4>
                  <p> {{ row.item.p_code }}</p>
                </b-col>
                <b-col cols="2">
                  <b-card
                    bg-variant="primary"
                    text-variant="white"
                    header="Members"
                    class="text-center"
                  >
                    <b-card-text><h2 class="text-white">
                      {{ dataOut.members }}
                    </h2></b-card-text>
                  </b-card>
                </b-col>
                <b-col cols="2">
                  <b-card
                    bg-variant="success"
                    text-variant="white"
                    header="Cycle Duration"
                    class="text-center"
                  >
                    <b-card-text><h2 class="text-white">
                      {{ dataOut.cycl_dur }}
                    </h2></b-card-text>
                  </b-card>
                </b-col>
                <b-col cols="2">
                  <b-card
                    bg-variant="info"
                    text-variant="white"
                    header="Tents"
                    class="text-center"
                  >
                    <b-card-text><h2 class="text-white">
                      {{ dataOut.tents }}
                    </h2></b-card-text>
                  </b-card>
                </b-col>
                <b-col cols="2">
                  <b-card
                    bg-variant="warning"
                    text-variant="white"
                    header="Tanks"
                    class="text-center"
                  >
                    <b-card-text><h2 class="text-white">
                      {{ dataOut.tanks }}
                    </h2></b-card-text>
                  </b-card>
                </b-col>
                <b-col cols="2">
                  <b-card
                    bg-variant="danger"
                    text-variant="white"
                    header="Total Quota"
                    class="text-center"
                  >
                    <b-card-text>
                      <h2 class="text-white">

                        {{ quota }}
                      </h2></b-card-text>
                  </b-card>
                </b-col>
              </b-row>
            </div>
            <b-form @submit.prevent="submit()">
              <b-row>
                <b-col cols="2" />
                <b-col cols="3">
                  <b-card
                    bg-variant="dark"
                    text-variant="white"
                    header="PD"
                    class="text-center"
                  >
                    <b-card-text>
                      <h2 class="text-white">

                        {{ pd .title }}
                      </h2></b-card-text>
                  </b-card>
                </b-col>
                <b-col cols="3">
                  <b-card
                    bg-variant="dark"
                    text-variant="white"
                    header="Supplier"
                    class="text-center"
                  >
                    <b-card-text>
                      <h2 class="text-white">

                        {{ supplier.title }}
                      </h2></b-card-text>
                  </b-card>
                </b-col>
                <b-col cols="4">
                  <b-card
                    bg-variant="info"
                    text-variant="white"
                    header="Quantity"
                    class="text-center"
                  >
                    <b-card-text>
                      <h2 class="text-white">

                        {{ quantity }}
                      </h2></b-card-text>
                  </b-card>
                </b-col>
                <!--<b-col cols="4">
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required"
                    name="PD"
                  >
                    <b-form-group label="PD">
                      <v-select
                        id="PD"
                        v-model="pd"
                        label="title"
                        placeholder="Select PD"
                        :clearable="false"
                        :state="errors.length > 0 ? false : null"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        :options="pdList"
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
                    name="Cycle Type"
                  >
                    <b-form-group label="Cycle Type">
                      <v-select
                        id="Cycle Type"
                        v-model="cycleType"
                        label="title"
                        placeholder="Select Cycle Type"
                        :clearable="false"
                        :state="errors.length > 0 ? false : null"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        :options="cycleList"
                      />
                      <small class="text-danger mb-1">{{
                        errors[0]
                      }}</small>
                    </b-form-group>
                  </validation-provider>
                </b-col>
                <b-col>
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required"
                    name="Supplier"
                  >
                    <b-form-group label="Supplier">
                      <v-select
                        id="supplier"
                        v-model="supplier"
                        label="title"
                        placeholder="Select Supplier"
                        :clearable="false"
                        :state="errors.length > 0 ? false : null"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        :options="supL"
                      />
                      <small class="text-danger mb-1">{{
                        errors[0]
                      }}</small>
                    </b-form-group>
                  </validation-provider>
                </b-col>-->

              </b-row>
              <br>
              <b-row>
                <!-- <b-col cols="4">
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required"
                    name="Donor"
                  >
                    <b-form-group label="Donor">
                      <v-select
                        id="donor"
                        v-model="donor"
                        label="title"
                        placeholder="Select Donor"
                        :clearable="false"
                        :state="errors.length > 0 ? false : null"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        :options="donL"
                      />
                      <small class="text-danger mb-1">{{
                        errors[0]
                      }}</small>
                    </b-form-group>
                  </validation-provider>
                </b-col>
                <b-col cols="2">
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required|min_value:1"
                    name="Quantity"
                  >
                    <b-form-group label="Quantity (L)">
                      <b-form-input
                        id="Quantity"
                        v-model="quantity"
                        placeholder="Enter Quantity"
                        :state="errors.length > 0 ? false : null"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        type="number"
                      />
                      <small class="text-danger mb-1">{{
                        errors[0]
                      }}</small>
                    </b-form-group>
                  </validation-provider>
                </b-col>
                <b-col cols="2">
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required|min_value:1"
                    name="Amount"
                  >
                    <b-form-group label="Amount ($)">
                      <b-form-input
                        id="Amount"
                        v-model="amount"
                        placeholder="Enter Amount"
                        :state="errors.length > 0 ? false : null"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        type="number"
                      />
                      <small class="text-danger mb-1">{{
                        errors[0]
                      }}</small>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <b-col cols="8">
                  <b-form-group label="Note">
                    <b-form-input
                      id="Note"
                      v-model="note"
                      placeholder="Enter Note"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    />
                  </b-form-group>
                </b-col>-->
              </b-row>
              <br>
              <h3>Schedule</h3>
              <p>Quota Needed: {{ quota }}, Total Number: {{ sumSch }}, Remaining: {{ quota -sumSch }}</p>
              <b-row>
                <b-col cols="3">
                  <p>Date</p>
                </b-col>
                <b-col cols="3">
                  <p>Quantity</p>
                </b-col>
                <b-col cols="4">
                  <p>Note</p>
                </b-col>
              </b-row>
              <b-row
                v-for="(sch,index) in schedule"
                :key="index"
              >
                <b-col cols="3">
                  <validation-provider
                    v-if="minDate !=null ||maxDate!=null "
                    v-slot="{ errors }"
                    rules="required"
                    :name="'Date '+(index+1)"
                  >
                    <b-form-group>
                      <flat-pickr

                        :id="'date'+(index+1)"
                        v-model="sch['date']"
                        class="form-control"
                        placeholder="Select Date"
                        :config="{
                          minDate:minDate,
                          maxDate:maxDate
                        }"

                        label="title"
                        :state="errors.length > 0 ? false : null"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      />

                      <small class="text-danger mb-1">{{
                        errors[0]
                      }}</small>
                    </b-form-group>
                  </validation-provider>
                </b-col>
                <b-col cols="3">
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required|min_value:1"
                    :name="'Quantity '+(index+1)"
                  >
                    <b-form-group>
                      <b-form-input
                        :id="'Quantity '+(index+1)"
                        v-model="sch['amount']"
                        placeholder="Enter Quantity"
                        :state="errors.length > 0 ? false : null"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        type="number"
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
                    rules=""
                    :name="'Note '+(index+1)"
                  >
                    <b-form-group>
                      <b-form-input
                        :id="'Note '+(index+1)"
                        v-model="sch['notes']"
                        placeholder="Enter Note"
                        :state="errors.length > 0 ? false : null"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      />
                      <small class="text-danger mb-1">{{
                        errors[0]
                      }}</small>
                    </b-form-group>
                  </validation-provider>
                </b-col>
                <b-col
                  cols="2"
                >
                  <b-button
                    variant="danger"
                    block
                    :disabled="index==0"
                    type="button"
                    class="float-right "
                    @click="deleteSchdeule(index)"
                  >
                    delete
                  </b-button>
                </b-col>
              </b-row>
              <b-row align-h="end">
                <b-col cols="2">
                  <b-button
                    variant="success"
                    block
                    type="button"
                    style="margin-top: 25px;"
                    class="float-right"
                    @click="addSchdeule"
                  >
                    Add
                  </b-button>
                </b-col>
              </b-row>
              <br>

            </b-form>

          </validation-observer>
        </b-container>
      </b-overlay>
      <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="info"
            size="sm"
            type="button"
            class="float-right"
            :disabled="show"
            @click="submit"
          >
            Submit
          </b-button>
        </div>
      </template>
    </b-modal>

  </div>

</template>

<script>
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { takeState } from 'vuex-dot'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
// import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import moment from 'moment'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    // vSelect,
    flatPickr,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  data() {
    return {
      headerBgVariant: 'light-info',
      headerTextVariant: 'light',
      bodyBgVariant: 'light',
      bodyTextVariant: 'light',
      footerBgVariant: 'info',
      footerTextVariant: 'light',
    }
  },
  computed: {
    ///
    ...takeState('truckingTaskmanager', 'showModalUrgent')
      .expose([
        'active',
        'row',
        'schedule',
        'dataOut',
      ])
      .commit('truckingTaskmanager/SET_MOD_URG')
      .map(),
    showModalUrgent: takeState('truckingTaskmanager', 'showModalUrgent').commit('truckingTaskmanager/SET_MOD_URG').map(),

    supplier: takeState('truckingTaskmanager', 'supplier').commit('truckingTaskmanager/SET_MOD_SUP').map(),
    donor: takeState('truckingTaskmanager', 'donor').commit('truckingTaskmanager/SET_MOD_DON').map(),
    amount: takeState('truckingTaskmanager', 'amount').commit('truckingTaskmanager/SET_MOD_AMNT').map(),
    quantity: takeState('truckingTaskmanager', 'quantity').commit('truckingTaskmanager/SET_MOD_QTY').map(),
    note: takeState('truckingTaskmanager', 'note').commit('truckingTaskmanager/SET_MOD_NOTE').map(),
    pd: takeState('truckingTaskmanager', 'pd').commit('truckingTaskmanager/SET_MOD_PD').map(),
    pdList: takeState('truckingTaskmanager', 'pdList').map(),

    cycleType: takeState('truckingTaskmanager', 'cycleType').commit('truckingTaskmanager/SET_MOD_CYCLE_TYPE').map(),
    cycleList: takeState('truckingTaskmanager', 'listCycle').map(),

    show: takeState('truckingTaskmanager', 'show').commit('truckingTaskmanager/SET_SHOW').map(),

    supL: takeState('truckingTaskmanager', 'listSupplier').map(),
    donL: takeState('truckingTaskmanager', 'listDonors').map(),

    maxDate() {
      return moment()
        .add(this.dataOut.cycl_dur, 'days')
        .valueOf()
    },
    minDate() {
      return moment().valueOf()
    },
    sumSch() {
      return this.schedule.reduce((prev, cur) => prev + parseInt(cur.amount ?? 0, 10), 0)
    },
    quota() {
      return (this.dataOut.members * this.dataOut.cycl_dur * (this.quantity == null ? 0 : this.quantity))
    },
  },
  methods: {
    deleteSchdeule(index) {
      this.schedule.splice(index, 1)
    },
    addSchdeule() {
      console.log(this.schedule)
      this.schedule.push({})
    },
    submit() {
      // { { dataOut.members * dataOut.cycl_dur * (quantity == null ? 0 : quantity) } }
      this.$refs.modalUrgent.validate().then(success => {
        const sum = this.schedule.reduce((prev, cur) => prev + parseInt(cur.amount, 10), 0)

        if (sum === (this.dataOut.members * this.dataOut.cycl_dur * (this.quantity == null ? 0 : this.quantity))) {
          const uniqueDates = new Set(this.schedule.map(item => item.date))
          if (uniqueDates.size !== this.schedule.length) {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Schedule Date Duplicate',
                icon: 'EditIcon',
                variant: 'warning',
              },
            })
          } else if (success) {
            console.log('success')
            this.$store
              .dispatch('truckingTaskmanager/SEND_DATA_URG', {
                prefix: this.$route.params.prefixPrj,
                prefixRole: this.$route.params.prefixRole,
                orgType: 4,
                item: this.showModalUrgent,
              })
              .then(val => {
                if (val.data.res[0][0].result === 1) {
                  this.abortion()
                  this.$toast({
                    component: ToastificationContent,
                    props: {
                      title: 'Task Submited Success',
                      icon: 'EditIcon',
                      variant: 'success',
                    },
                  })
                } else {
                  this.$toast({
                    component: ToastificationContent,
                    props: {
                      title: 'Task Submited Failed',
                      icon: 'EditIcon',
                      variant: 'dander',
                    },
                  })
                }
              })
          } else {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Missing Data',
                icon: 'EditIcon',
                variant: 'warning',
              },
            })
          }
        } else {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Schedule Quantity must be equal Total Quota',
              icon: 'EditIcon',
              variant: 'warning',
            },
          })
        }
      })
    },
    abortion() {
      this.showModalUrgent = {
        active: false,
        schedule: [],
      }
    },
  },
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
