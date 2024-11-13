<template>
  <div>
    <b-modal
      id="form"
      v-model="showModalTNT.active"
      ok-only

      size="lg"
      no-close-on-backdrop
      class="modal-dialog"
      title="Add Tent"
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
            ref="formTNT"
            tag="form"
          >

            <b-row v-show="showModalTNT.item!=null">
              <b-col>
                <b-form>
                  <b-row>

                    <b-col
                      sm="12"
                      md="12"
                      lg="4"
                      xl="4"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="System Code"
                      >
                        <b-form-group>
                          <label>System Code <span class="text-danger"><strong>*</strong></span></label>
                          <b-form-input
                            v-model="showModalTNT.item.code"
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
                      sm="12"
                      md="12"
                      lg="4"
                      xl="4"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="Organization Code"
                      >
                        <b-form-group>
                          <label>Organization Code <span class="text-danger"><strong>*</strong></span></label>
                          <b-form-input
                            v-model="showModalTNT.item.reference"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Organization Code"
                          />
                          <small class="text-danger mb-1">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="4"
                      xl="4"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="UNHCR Code"
                      >
                        <b-form-group>
                          <label>UNHCR Code</label>
                          <b-form-input
                            v-model="showModalTNT.item.un_code"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter UNHCR Code"
                          />
                          <small class="text-danger mb-1">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <!--
                    <b-col cols="3">
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="Size"
                      >
                        <b-form-group>
                          <label>Size</label>
                          <b-form-input
                            v-model="showModalTNT.item.size"
                            class="form-control"
                            type="number"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Size"
                          />
                          <small class="text-danger mb-1">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col cols="3">
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="Max Capacity"
                      >
                        <b-form-group>
                          <label>Max Capacity</label>
                          <b-form-input
                            v-model="showModalTNT.item.max_cap"
                            class="form-control"
                            type="number"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Max Capacity"
                          />
                          <small class="text-danger mb-1">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>-->
                    <b-col
                      sm="12"
                      md="12"
                      lg="3"
                      xl="3"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="Latitude"
                      >
                        <b-form-group>
                          <label>Latitude</label>
                          <b-form-input
                            v-model="showModalTNT.item.lat"
                            class="form-control"
                            type="number"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Latitude"
                          />
                          <small class="text-danger mb-1">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="3"
                      xl="3"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="Longitude"
                      >
                        <b-form-group>
                          <label>Longitude</label>
                          <b-form-input
                            v-model="showModalTNT.item.long"
                            class="form-control"
                            type="number"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Longitude"
                          />
                          <small class="text-danger mb-1">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="3"
                      xl="3"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="Status"
                      >
                        <b-form-group label="Status">
                          <v-select
                            v-model="showModalTNT.item.status"
                            placeholder="Select Status"
                            label="name"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :options="tentStatus"
                            :state="errors.length > 0 ? false : null"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="3"
                      xl="3"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="Type of Shelter"
                      >
                        <b-form-group label="Type of Shelter">
                          <v-select
                            v-model="showModalTNT.item.type"
                            placeholder="Select Type of Shelter"
                            label="name"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :options="tentType"
                            :state="errors.length > 0 ? false : null"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="12"
                      xl="12"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="Address"
                      >
                        <b-form-group>
                          <label>Address</label>
                          <b-form-input
                            v-model="showModalTNT.item.address"
                            class="form-control"

                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Address"
                          />
                          <small class="text-danger mb-1">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>
                  </b-row>
                  <b-row
                    v-if="showModalTNT.isNew"
                    align-h="end"
                  >
                    <b-button
                      variant="info"
                      type="button"
                      class="float-right ml-2 mr-2"
                      :disabled=" show"
                      @click="submit"
                    >
                      Fix Tent
                    </b-button>
                  </b-row>
                  <hr>
                  <b-row
                    v-if="!showModalTNT.isNew"
                    :disabled="showModalTNT.isNew"
                  >
                    <b-col
                      :disabled="showModalTNT.isNew"
                      sm="12"
                      md="12"
                      lg="4"
                      xl="4"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="Family/Household"
                      >
                        <b-form-group>
                          <label>Family/Household <span class="text-danger"><strong>*</strong></span></label>

                          <v-select
                            v-model="showModalTNT.family"
                            placeholder="Select Family/Household"
                            label="name"
                            multiple
                            :disabled="showModalTNT.isNew"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :options="family"
                            :state="errors.length > 0 ? false : null"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="2"
                      xl="2"
                    >
                      <b-button
                        block
                        class="mt-0 mt-md-2"
                        variant="success"
                        :disabled="showModalTNT.isNew"
                        @click="addFamily"
                      >
                        Add
                      </b-button>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="4"
                      xl="4"
                      :disabled="showModalTNT.isNew"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="Pit used for Grey Water"
                      >
                        <b-form-group
                          label="Pit used for Grey Water"
                          class="mt-1 mt-md-0"
                        >
                          <v-select
                            v-model="showModalTNT.pits"
                            placeholder="Select Pits"
                            label="name"
                            multiple
                            :disabled="showModalTNT.isNew"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :options="pits"
                            :state="errors.length > 0 ? false : null"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="2"
                      xl="2"
                      :disabled="showModalTNT.isNew"
                    >
                      <b-button
                        block
                        class="mt-0 mt-md-2"
                        variant="success"
                        :disabled="showModalTNT.isNew"

                        @click="addPits"
                      >
                        Add
                      </b-button>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="4"
                      xl="4"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="Tank"
                      >

                        <b-form-group
                          label="Tank"
                          class="mt-1 mt-md-0"
                        >
                          <v-select
                            v-model="showModalTNT.tank"
                            placeholder="Select Tank"
                            label="tank_name"
                            multiple
                            :disabled="showModalTNT.isNew"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :options="tanks"
                            :state="errors.length > 0 ? false : null"
                            @input="changeTank"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="2"
                      xl="2"
                      :disabled="showModalTNT.isNew"
                    >
                      <b-button
                        block
                        :disabled="showModalTNT.isNew"
                        class="mt-0 mt-md-2"
                        variant="success"
                        @click="addTank"
                      >
                        Add
                      </b-button>
                    </b-col>
                    <b-col
                      :disabled="showModalTNT.isNew"
                      sm="12"
                      md="12"
                      lg="6"
                      xl="6"
                      class="mt-1 mt-md-0"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="Method of collecting water"
                      >
                        <b-form-group>
                          <label>Method of collecting water</label>
                          <b-form-input
                            v-if="showModalTNT.tank!=null"
                            v-model="showModalTNT.item.no_tank"
                            class="form-control"
                            :disabled="showModalTNT.tank.length !== 0|| showModalTNT.isNew"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Method of collecting water"
                          />
                          <small class="text-danger mb-1">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="4"
                      xl="4"
                      class="mt-0 mt-md-0"
                      :disabled="showModalTNT.isNew"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="Latrine"
                      >
                        <b-form-group label="Latrine">
                          <v-select
                            v-model="showModalTNT.latrine"
                            placeholder="Select Latrine"
                            label="lat_nam"
                            multiple
                            :disabled="showModalTNT.isNew"

                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :options="latrines"
                            :state="errors.length > 0 ? false : null"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="2"
                      xl="4"
                      :disabled="showModalTNT.isNew"
                    >
                      <b-button
                        block
                        class="mt-0 mt-md-2"
                        variant="success"
                        :disabled="showModalTNT.isNew"
                        @click="addLatrine"
                      >
                        Add
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
            v-if="!showModalTNT.isNew"
            variant="info"
            size="sm"
            type="button"
            class="float-right"
            :disabled=" show"
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
import vSelect from 'vue-select'
import generateUniqueId from '@/libs/unique_id'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
    vSelect,
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
    show: takeState('dtTNT', 'show').commit('dtTNT/SET_SHOW').map(),
    showModalTNT: takeState('dtMAIN', 'showModalTNT').commit('dtMAIN/SET_MOD_TNT').map(),
    tentStatus: takeState('dtMAIN', 'tentStatus').map(),
    tentType: takeState('dtMAIN', 'tentType').map(),
    tents: takeState('dtTNT', 'items').map(),
    tanks: takeState('dtTNK', 'items').map(),

    latrines: takeState('dtLAT', 'items').map(),
    pits: takeState('dtPIT', 'items').map(),

    family: takeState('dtFAM', 'items').map(),
    ///
    showModalPIT: takeState('dtMAIN', 'showModalPIT').commit('dtMAIN/SET_MOD_PIT').map(),
    pitType: takeState('dtMAIN', 'pitType').map(),
    pitStatus: takeState('dtMAIN', 'pitStatus').map(),
    ///
    showModalLAT: takeState('dtMAIN', 'showModalLAT').commit('dtMAIN/SET_MOD_LAT').map(),
    latType: takeState('dtMAIN', 'latType').map(),
    latLocation: takeState('dtMAIN', 'latLocation').map(),
    latStatus: takeState('dtMAIN', 'latStatus').map(),
    ///
    showModalFAM: takeState('dtMAIN', 'showModalFAM').commit('dtMAIN/SET_MOD_FAM').map(),
    disbality: takeState('dtMAIN', 'disability').map(),
    gender: takeState('dtMAIN', 'gender').map(),
    familyrelation: takeState('dtMAIN', 'famRelation').map(),
    maritalStatus: takeState('dtMAIN', 'maritalStatus').map(),
    nationality: takeState('dtMAIN', 'nationality').map(),
    exportField: takeState('dtFAM', 'exportField').map(),

    ///
    tankStatus: takeState('dtMAIN', 'tankStatus').map(),
    showModalTNK: takeState('dtMAIN', 'showModalTNK').commit('dtMAIN/SET_MOD_TNK').map(),

  },
  methods: {
    changeTank(item) {
      console.log(item)
      if (item.length !== 0) {
        this.showModalTNT.item.no_tank = ''
      }
    },
    addTank() {
      this.showModalTNK = {
        active: true,
        lstWtr: [],
        item: {
          code: generateUniqueId('TNK_'),
          status: this.tankStatus.filter(el => el.id === 1)[0],
          capacity: 1000,
          is_by_ben: false,
          is_waterTruking: true,
          for_cooking: true,
          for_drinking: true,
          for_domestic: true,
          for_hygiene: true,
          wtr_level: 100,
          wtr_period: 4,
          wtr_month: 12,
        },
      }
    },
    addLatrine() {
      this.showModalLAT = {
        active: true,
        item: {
          code: generateUniqueId('LAT_'),
          status: this.latStatus.filter(el => el.id === 1)[0],
          location: this.latLocation.filter(el => el.id === 1)[0],
          type: this.latType.filter(el => el.id === 1)[0],
        },
      }
    },
    addFamily() {
      const genId = generateUniqueId('MEM_')
      const tent = this.tents.filter(el => el.code === this.showModalTNT.item.code)[0]
      console.log(genId)

      this.showModalFAM = {
        active: true,
        item: {
          code: generateUniqueId('FAM_'),
          tent,
          head_code: genId,
          head_reference: genId,
          head_disbality: this.disbality.filter(el => el.id === 1)[0],
          head_gender: this.gender.filter(el => el.id === 2)[0],
          head_nationality: this.nationality.filter(el => el.id === 3)[0],
          head_maritalStatus: this.maritalStatus.filter(el => el.id === 3)[0],
          is_household: 1,
          head_familyrelation: {
            id: 1,
            name: 'Head Of HouseHold',
          },
        },
        listMember: [

        ],
      }
    },
    addPits() {
      this.showModalPIT = {
        active: true,
        item: {
          code: generateUniqueId('PIT_'),
          status: this.pitStatus.filter(el => el.id === 1)[0],
          type: this.pitType.filter(el => el.id === 1)[0],
        },
      }
    },
    submit() {
      const it = JSON.parse(JSON.stringify(this.showModalTNT.item))
      it.tank = this.showModalTNT.tank
      it.latrine = this.showModalTNT.latrine
      it.pits = this.showModalTNT.pits
      it.family = this.showModalTNT.family
      console.log(it)
      this.$refs.formTNT.validate().then(success => {
        if (success) {
          this.$store.dispatch('dtTNT/SEND_DATA', {
            item: it,
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

              this.showModalTNT.isNew = false

              if (this.showModalFAM.active === true) {
                const { item } = this.showModalFAM
                console.log('before', item)
                // eslint-disable-next-line prefer-destructuring
                item.tent = this.tents.filter(el => el.code === this.showModalTNT.item.code)[0]
                console.log('after', item)
                this.$store.commit('dtMAIN/SET_MOD_MEM_FAM_EXP', {
                  key: 'iem',
                  value: item,
                })

                console.log(this.$parent.$children[5].$refs.formFAM.validate())

                this.abortion()
              }
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
    abortion() {
      this.showModalTNT = {
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
