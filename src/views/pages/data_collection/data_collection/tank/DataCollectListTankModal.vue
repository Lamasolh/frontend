<template>
  <div>
    <b-modal
      id="form"
      v-model="showModalTNK.active"
      ok-only
      size="lg"

      no-close-on-backdrop
      class="modal-dialog"
      title="Add Tank"
      no-close-on-esc
      :header-bg-variant="headerBgVariant"
      :header-border-variant="bodyTextVariant"
      :footer-border-variant="bodyTextVariant"
      data-backdrop="static"
      @close="abortion"
    >
      <b-overlay
        :show="show"
      >
        <b-container fluid>
          <validation-observer
            ref="formTNK"
            tag="form"
          >

            <b-row>
              <b-col>
                <b-form>
                  <b-row>
                    <b-col
                      xl="4"
                      lg="4"
                      md="6"
                      sm="12"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="System Code"
                      >
                        <b-form-group>
                          <label>System Code</label>
                          <b-form-input
                            v-model="showModalTNK.item.code"
                            class="form-control"
                            :disabled="true"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter System Code"
                          />
                          <small class="text-danger mb-1">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      xl="4"
                      lg="4"
                      md="6"
                      sm="12"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="Organization Code"
                      >
                        <b-form-group>
                          <label>Organization Code   <span class="text-danger"><strong>*</strong></span></label>
                          <b-form-input
                            v-model="showModalTNK.item.reference"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Organization Code"
                          />
                          <small class="text-danger mb-1">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      xl="4"
                      lg="4"
                      md="6"
                      sm="12"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="Status"
                      >
                        <b-form-group label="Status">
                          <v-select
                            v-model="showModalTNK.item.status"
                            placeholder="Select Status"
                            label="name"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :options="tankStatus"
                            :state="errors.length > 0 ? false : null"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>

                    <!--  <b-col cols="4">
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="Uncode"
                      >
                        <b-form-group>
                          <label>Uncode</label>
                          <b-form-input
                            v-model="showModalTNK.item.un_code"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter UNHCR Code"
                          />
                          <small class="text-danger mb-1">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>-->

                    <b-col
                      xl="4"
                      lg="4"
                      md="6"
                      sm="12"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="Capacity"
                      >
                        <b-form-group>
                          <label>Size</label>
                          <b-form-input
                            v-model="showModalTNK.item.capacity"
                            class="form-control"
                            type="number"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Capacity"
                          />
                          <small class="text-danger mb-1">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      xl="4"
                      lg="4"
                      md="6"
                      sm="12"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="Installed By"
                      >
                        <b-form-group label="Installed By">
                          <v-select
                            v-model="showModalTNK.item.installed_by"
                            placeholder="Select Installed By"
                            label="name"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :options="installedBy"
                            :state="errors.length > 0 ? false : null"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      xl="4"
                      lg="4"
                      md="6"
                      sm="12"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="Installed Date"
                      >
                        <b-form-group label="Installed Date">
                          <flat-pickr
                            v-model="showModalTNK.item.received_date"
                            class="form-control"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :state="errors.length > 0 ? false : null"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <br>
                    <b-col
                      xl="12"
                      lg="12"
                      md="12"
                      sm="12"
                    >
                      <h2>Tank used for</h2>
                    </b-col>
                    <b-col
                      xl="3"
                      lg="3"
                      md="3"
                      sm="6"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="Cooking"
                      >
                        <b-form-group label="Cooking">
                          <b-form-checkbox
                            v-model="showModalTNK.item.for_cooking"
                            name="is-menu-visible"
                            class="mr-0"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :state="errors.length > 0 ? false : null"
                            switch
                            inline
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      xl="3"
                      lg="3"
                      md="3"
                      sm="6"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="Drinking"
                      >
                        <b-form-group label="Drinking">
                          <b-form-checkbox
                            v-model="showModalTNK.item.for_drinking"
                            name="is-menu-visible"
                            class="mr-0"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :state="errors.length > 0 ? false : null"
                            switch
                            inline
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      xl="3"
                      lg="3"
                      md="3"
                      sm="6"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="Domestic Hygiene"
                      >
                        <b-form-group label="Domestic Hygiene">
                          <b-form-checkbox
                            v-model="showModalTNK.item.for_domestic"
                            name="is-menu-visible"
                            class="mr-0"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :state="errors.length > 0 ? false : null"
                            switch
                            inline
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      xl="3"
                      lg="3"
                      md="3"
                      sm="6"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="Personal Hygiene"
                      >
                        <b-form-group label="Personal Hygiene">
                          <b-form-checkbox
                            v-model="showModalTNK.item.for_hygiene"
                            name="is-menu-visible"
                            class="mr-0"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :state="errors.length > 0 ? false : null"
                            switch
                            inline
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      xl="12"
                      lg="12"
                      md="12"
                      sm="12"
                    >
                      <h2>Water Trucking</h2>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      xl="3"
                      lg="3"
                      md="6"
                      sm="6"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="By NGO"
                      >
                        <b-form-group label="By NGO">
                          <b-form-checkbox
                            v-model="showModalTNK.item.is_waterTruking"
                            name="is-menu-visible"
                            class="mr-0"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :state="errors.length > 0 ? false : null"
                            switch
                            inline
                            @input="item=>ChangeWtr(item)"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      xl="3"
                      lg="3"
                      md="6"
                      sm="6"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="min_value:1|max_value:12"
                        name="Month"
                      >
                        <b-form-group>
                          <label>Number of months available per year (min:1 ,max 12)</label>
                          <b-form-input
                            v-model="showModalTNK.item.wtr_month"
                            class="form-control"
                            type="number"
                            :disabled="!showModalTNK.item.is_waterTruking"
                            :state="errors.length > 0 ? false : null"
                          />
                          <small class="text-danger mb-1">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      xl="3"
                      lg="3"
                      md="6"
                      sm="6"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="min_value:1|max_value:31"
                        name="Period"
                      >
                        <b-form-group>
                          <label>Number of times pumped per month (min:1 ,max 31)</label>
                          <b-form-input
                            v-model="showModalTNK.item.wtr_period"
                            class="form-control"
                            type="number"
                            :disabled="!showModalTNK.item.is_waterTruking"
                            :state="errors.length > 0 ? false : null"
                          />
                          <small class="text-danger mb-1">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      xl="3"
                      lg="3"
                      md="6"
                      sm="6"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="min_value:1|max_value:100"
                        name="Level"
                      >
                        <b-form-group>
                          <label>Level of tank filled each time (min:1 ,max 100)</label>
                          <b-form-input
                            v-model="showModalTNK.item.wtr_level"
                            class="form-control"
                            type="number"
                            :disabled="!showModalTNK.item.is_waterTruking"

                            :state="errors.length > 0 ? false : null"
                          />
                          <small class="text-danger mb-1">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>

                  </b-row>
                  <b-row>
                    <b-col
                      xl="3"
                      lg="3"
                      md="6"
                      sm="6"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="By Benificary"
                      >
                        <b-form-group label="By Benificary">
                          <b-form-checkbox
                            v-model="showModalTNK.item.is_by_ben"
                            name="is-menu-visible"
                            class="mr-0"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :state="errors.length > 0 ? false : null"
                            switch
                            inline
                            @input="item=>ChangeBEN(item)"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      xl="3"
                      lg="3"
                      md="6"
                      sm="6"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="min_value:1|max_value:12"
                        name="Month"
                      >
                        <b-form-group>
                          <label>Number of months available per year (min:1 ,max 12)</label>
                          <b-form-input
                            v-model="showModalTNK.item.ben_month"
                            class="form-control"
                            type="number"
                            :disabled="!showModalTNK.item.is_by_ben"

                            :state="errors.length > 0 ? false : null"
                          />
                          <small class="text-danger mb-1">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      xl="3"
                      lg="3"
                      md="6"
                      sm="6"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="min_value:1|max_value:31"
                        name="Period"
                      >
                        <b-form-group>
                          <label>Number of times pumped per month (min:1 ,max 31)</label>
                          <b-form-input
                            v-model="showModalTNK.item.ben_period"
                            class="form-control"
                            type="number"
                            :disabled="!showModalTNK.item.is_by_ben"
                            :state="errors.length > 0 ? false : null"
                          />
                          <small class="text-danger mb-1">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      xl="3"
                      lg="3"
                      md="6"
                      sm="6"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="min_value:1|max_value:100"
                        name="Level"
                      >
                        <b-form-group>
                          <label>Level of tank filled each time (min:1 ,max 100)</label>
                          <b-form-input
                            v-model="showModalTNK.item.ben_level"
                            class="form-control"
                            type="number"
                            :disabled="!showModalTNK.item.is_by_ben"

                            :state="errors.length > 0 ? false : null"
                          />
                          <small class="text-danger mb-1">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>

                  </b-row>
                  <div v-if="lstWtr!=null">
                    <h3>Existing Water Sources</h3>
                    <br>

                    <b-row
                      v-if="lstWtr.length>0"
                      class="d-none d-lg-flex"
                    >
                      <b-col
                        xl="4"
                        lg="4"
                      >
                        Source
                      </b-col>
                      <b-col
                        xl="2"
                        lg="2"
                      >
                        Number of months available per year
                      </b-col>
                      <b-col
                        xl="2"
                        lg="2"
                      >
                        Number of times pumped per month
                      </b-col>
                      <b-col
                        xl="2"
                        lg="2"
                      >
                        Level of tank filled each time
                      </b-col>
                    </b-row>

                    <b-row
                      v-for="(item,index) in lstWtr"
                      :key="item.id"
                    >

                      <b-col
                        xl="4"
                        lg="4"
                        md="6"
                        sm="6"
                      >
                        <validation-provider
                          v-slot="{ errors }"
                          rules="required"
                          :name="'Water Source '+(index+1)"
                        >
                          <b-form-group>
                            <template
                              slot="label"
                            >
                              <div class="d-flex  d-lg-none">
                                Source
                              </div>
                            </template>
                            <v-select
                              v-model="item.source"
                              placeholder="Select WaterSource"
                              label="code"
                              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                              :options="listWtr"
                              :state="errors.length > 0 ? false : null"
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                          </b-form-group>
                        </validation-provider>
                      </b-col>
                      <b-col
                        xl="4"
                        lg="4"
                        md="6"
                        sm="6"
                      >
                        <validation-provider
                          v-slot="{ errors }"
                          rules="min_value:1|max_value:12"
                          :name="'Month'+(index+1)"
                        >
                          <b-form-group>
                            <template
                              slot="label"
                            >
                              <div class="d-flex d-lg-none">
                                Number of months available per year
                              </div>
                            </template>
                            <b-form-input
                              v-model="item.month"
                              class="form-control"
                              type="number"
                              :state="errors.length > 0 ? false : null"
                            />
                            <small class="text-danger mb-1">{{ errors[0] }}</small>

                          </b-form-group>
                        </validation-provider>
                      </b-col>
                      <b-col
                        xl="4"
                        lg="4"
                        md="6"
                        sm="6"
                      >
                        <validation-provider
                          v-slot="{ errors }"
                          rules="min_value:1|max_value:31"
                          :name="'Period'+(index+1)"
                        >
                          <b-form-group>
                            <template
                              slot="label"
                            >
                              <div class="d-flex d-lg-none">
                                Number of times pumped per month
                              </div>
                            </template>
                            <b-form-input
                              v-model="item.period"
                              class="form-control"
                              type="number"
                              :state="errors.length > 0 ? false : null"
                            />
                            <small class="text-danger mb-1">{{ errors[0] }}</small>

                          </b-form-group>
                        </validation-provider>
                      </b-col>
                      <b-col
                        xl="4"
                        lg="4"
                        md="6"
                        sm="6"
                      >
                        <validation-provider
                          v-slot="{ errors }"
                          rules="min_value:1|max_value:100"
                          :name="'Level'+(index+1)"
                        >
                          <b-form-group>
                            <template
                              slot="label"
                            >
                              <div class="d-flex d-lg-none">
                                Level of tank filled each time
                              </div>
                            </template>

                            <b-form-input
                              v-model="item.wtr_level"
                              class="form-control"
                              type="number"
                              :state="errors.length > 0 ? false : null"
                            />
                            <small class="text-danger mb-1">{{ errors[0] }}</small>

                          </b-form-group>
                        </validation-provider>
                      </b-col>

                      <b-col
                        xl="4"
                        lg="4"
                        md="12"
                        sm="12"
                      >
                        <b-button
                          class="mb-1"
                          style="margin-top: 10px;"
                          variant="danger"
                          block
                          @click="removeWtr(index)"
                        >
                          Delete
                        </b-button>
                      </b-col>
                      <hr>
                    </b-row>
                  </div>

                  <b-row
                    v-if="lstWtr !=null"
                    align-h="end"
                  >
                    <b-col
                      xl="4"
                      lg="4"
                      md="6"
                      sm="6"
                    >
                      <b-button
                        variant="success"
                        block
                        :disabled="listWtr.length<=lstWtr.length"
                        @click="AddWtr"
                      >
                        Add WaterSource
                      </b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-col>
            </b-row>
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
/* eslint-disable no-restricted-syntax */
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { takeState } from 'vuex-dot'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
    vSelect,
    flatPickr,

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
    ...takeState('dtMAIN', 'showModalTNK')
      .expose([
        'active',
        'item',
        'lstWtr',
      ])
      .commit('dtMAIN/SET_MOD_TNK_EXP')
      .map(),
    ///
    show: takeState('dtTNK', 'show').commit('dtTNK/SET_SHOW').map(),
    showModalTNK: takeState('dtMAIN', 'showModalTNK').commit('dtMAIN/SET_MOD_TNK').map(),
    tankStatus: takeState('dtMAIN', 'tankStatus').map(),
    installedBy: takeState('dtMAIN', 'installedBy').map(),
    tanks: takeState('dtTNK', 'items').map(),
    wtr: takeState('dtWTR', 'items').map(),
    itemsWtr: takeState('dtTNK', 'itemsTnkWtr').map(),
    showModalTNT: takeState('dtMAIN', 'showModalTNT').commit('dtMAIN/SET_MOD_TNT').map(),

    listWtr() {
      // Get all the options in the dropdown list
      const options = this.wtr

      // Create a new empty array to store the filtered items

      const filteredItems = []

      // Loop through each option in the dropdown
      for (const option of options) {
        let matchFound = false

        if (this.lstWtr != null) {
          // Loop through each item to remove and check for property match
          for (const itemToRemove of this.lstWtr) {
            if (itemToRemove.source != null) {
              console.log('sss', itemToRemove.source.id)
              // Customize the comparison logic based on your object properties
              if (option.id === itemToRemove.source.id) {
                matchFound = true
                break // Exit the inner loop if a match is found
              }
            }
          }
        }

        // If no match is found, add the option text to the filtered items
        if (!matchFound) {
          filteredItems.push(option)
        }
      }

      // Return the new array with the filtered items
      return filteredItems
      // return this.wtr.filter(el => el.id === this.showModalTNK.item.id)
    },

    tankWtr() {
      return this.itemsWtr.filter(el => el.tank_id === this.showModalTNK.item.id)
    },
  },
  mounted() {
    this.$root.$on('bv::modal::shown', bvEvent => {
      bvEvent.vueTarget.$refs.content.attributes.removeNamedItem('tabindex')
    })
  },
  methods: {
    submit() {
      console.log(this.$route.params.value)
      this.$refs.formTNK.validate().then(success => {
        if (success) {
          this.$store.dispatch('dtTNK/SEND_DATA', {
            item: this.showModalTNK.item,
            lstWtr: this.lstWtr,
            issId: this.$route.params.value.iss_id,
          }).then(res => {
            if (res.res === 0) {
              if (res.message != null) {
                this.$swal({
                  title: 'Error!',
                  text: `Operation failed, Because ${res.message}`,
                  icon: 'error',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                })
              } else {
                this.$swal({
                  title: 'Error!',
                  text: 'Operation failed, please check the information you entered',
                  icon: 'error',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                })
              }
            } else if (res.res === 1) {
              this.$swal({
                title: 'Success!',
                text: 'Success Operation',
                icon: 'success',
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              })
              if (this.showModalTNT.active === true) {
                const { tank } = this.showModalTNT
                tank.push(this.tanks.filter(el => el.code === this.showModalTNK.item.code)[0])
                this.$store.commit('dtMAIN/SET_MOD_TNT_EXP', {
                  key: 'tank',
                  value: tank,
                })
              }
              this.abortion()
            } else {
              this.$swal({
                title: 'Error!',
                text: 'Operation failed, please check the information you entered',
                icon: 'error',
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              })
            }
          }).catch(error => {
            console.log(error)
            this.$swal({
              title: 'Error!',
              text: 'Register failed',
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          })
        } else {
          this.$swal({
            title: 'Attention !',
            text: 'Check missing data',
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        }
      }).catch(() => {
        this.show = false
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
    },
    removeWtr(index) {
      this.lstWtr.splice(index, 1)
    },
    ChangeWtr(item) {
      if (!item) {
        this.showModalTNK.item.wtr_month = null
        this.showModalTNK.item.wtr_period = null
        this.showModalTNK.item.wtr_level = null
      } else {
        this.showModalTNK.item.wtr_month = 12
        this.showModalTNK.item.wtr_period = 4
        this.showModalTNK.item.wtr_level = 100
      }
    },
    ChangeBEN(item) {
      if (!item) {
        this.showModalTNK.item.ben_month = null
        this.showModalTNK.item.ben_period = null
        this.showModalTNK.item.ben_level = null
      } else {
        this.showModalTNK.item.ben_month = 12
        this.showModalTNK.item.ben_period = 4
        this.showModalTNK.item.ben_level = 100
      }
    },
    AddWtr() {
      console.log(this.showModalTNK)
      this.lstWtr.push({})
    },
    abortion() {
      this.showModalTNK = {
        active: false,
        item: {},
      }
    },
  },
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';

</style>
