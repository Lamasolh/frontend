<template>
  <div>
    <b-modal
      id="form"
      v-model="showModalLAT.active"
      ok-only
      size="xl"
      no-close-on-backdrop
      no-close-on-esc
      class="modal-dialog"
      title="Add Latrine"
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
            ref="formLAT"
            tag="form"
          >
            <b-row>
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
                          <label>System Code</label>
                          <b-form-input
                            v-model="item.code"
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
                          <label>Organization Code</label>
                          <b-form-input
                            v-model="item.reference"
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
                            v-model="item.un_code"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter UNHCR Code"
                          />
                          <small class="text-danger mb-1">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      v-if="item !=null"
                      sm="12"
                      md="12"
                      lg="4"
                      xl="4"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="item.altPit==null?'required':''"
                        name="Pit"
                      >

                        <b-form-group label="Connect to Pit">
                          <v-select
                            v-model="pit"
                            placeholder="Select Pit"
                            label="name"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :options="pits"
                            :disabled="item.altPit!=null"
                            :state="errors.length > 0 ? false : null"
                            @input="(value) => ChangePit(value)"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      v-if="item !=null"
                      sm="12"
                      md="12"
                      lg="4"
                      xl="4"
                    >
                      <b-button
                        variant="success"
                        class="mb-1 mb-sm-0"
                        style="margin-top: 25px;"
                        block
                        :disabled="item.altPit!=null"
                        @click="AddPit"
                      >
                        Add
                      </b-button>
                    </b-col>
                    <b-col
                      v-if="item !=null"
                      sm="12"
                      md="12"
                      lg="4"
                      xl="4"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="pit==null?'required':''"
                        name="Alternative modality of black water"
                      >
                        <b-form-group label="Alternative modality of black water">
                          <v-select
                            v-model="item.altPit"
                            placeholder="Select Alternative modality"
                            label="name"
                            :disabled="pit!=null"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :options="altPitList"
                            :state="errors.length > 0 ? false : null"
                            @input="(value) => ChangeAltPit(value)"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <!--<b-col cols="4">
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="Size"
                      >
                        <b-form-group>
                          <label>Size</label>
                          <b-form-input
                            v-model="item.size"
                            class="form-control"
                            type="number"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Size"
                          />
                          <small class="text-danger mb-1">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>-->
                    <b-col
                      sm="12"
                      md="12"
                      lg="4"
                      xl="4"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="Installed By"
                      >
                        <b-form-group label="Installed By">
                          <v-select
                            v-model="item.installed_by"
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
                      sm="12"
                      md="12"
                      lg="4"
                      xl="4"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="Installed Date"
                      >
                        <b-form-group label="Installed Date">
                          <flat-pickr
                            v-model="item.installed_date"
                            class="form-control"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :state="errors.length > 0 ? false : null"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
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
                        name="Type of latrine"
                      >
                        <b-form-group label="Type of latrine">
                          <v-select
                            v-model="item.type"
                            placeholder="Select Type of latrine"
                            label="name"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :options="latType"
                            :state="errors.length > 0 ? false : null"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
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
                        name="Status"
                      >
                        <b-form-group label="Status">
                          <v-select
                            v-model="item.status"
                            placeholder="Select Status"
                            label="name"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :options="latStatus"
                            :state="errors.length > 0 ? false : null"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
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
                        name="Location"
                      >
                        <b-form-group label="Location">
                          <v-select
                            v-model="item.location"
                            placeholder="Select Location"
                            label="name"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :options="latLocation"
                            :state="errors.length > 0 ? false : null"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                      </validation-provider>
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
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { takeState } from 'vuex-dot'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import generateUniqueId from '@/libs/unique_id'

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
    ...takeState('dtMAIN', 'showModalLAT')
      .expose([
        'active',
        'item',
        'pit',
      ])
      .commit('dtMAIN/SET_MOD_LAT_EXP')
      .map(),
    ///
    show: takeState('dtLAT', 'show').commit('dtLAT/SET_SHOW').map(),
    showModalLAT: takeState('dtMAIN', 'showModalLAT').commit('dtMAIN/SET_MOD_LAT').map(),
    showModalPIT: takeState('dtMAIN', 'showModalPIT').commit('dtMAIN/SET_MOD_PIT').map(),
    latType: takeState('dtMAIN', 'latType').map(),
    latLocation: takeState('dtMAIN', 'latLocation').map(),
    latStatus: takeState('dtMAIN', 'latStatus').map(),
    installedBy: takeState('dtMAIN', 'installedBy').map(),
    pits: takeState('dtPIT', 'items').map(),
    pitStatus: takeState('dtMAIN', 'pitStatus').map(),
    pitType: takeState('dtMAIN', 'pitType').map(),
    altPitList: takeState('dtMAIN', 'altPit').map(),
    latrines: takeState('dtLAT', 'items').map(),
    showModalTNT: takeState('dtMAIN', 'showModalTNT').commit('dtMAIN/SET_MOD_TNT').map(),

  },
  methods: {
    ChangePit(item) {
      if (item == null) {
        this.showModalLAT.item.altPit = null
      }
    },
    ChangeAltPit(item) {
      if (item == null) {
        this.pit = null
      }
    },
    submit() {
      this.$refs.formLAT.validate().then(success => {
        const it = JSON.parse(JSON.stringify(this.showModalLAT.item))
        it.pit = this.pit
        if (success) {
          this.$store.dispatch('dtLAT/SEND_DATA', {
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
              if (this.showModalTNT.active === true) {
                const { latrine } = this.showModalTNT
                latrine.push(this.latrines.filter(el => el.code === this.showModalLAT.item.code)[0])
                this.$store.commit('dtMAIN/SET_MOD_TNT_EXP', {
                  key: 'latrine',
                  value: latrine,
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
    AddPit() {
      this.showModalPIT = {
        active: true,
        item: {
          code: generateUniqueId('PIT_'),
          status: this.pitStatus.filter(el => el.id === 1)[0],
          type: this.pitType.filter(el => el.id === 1)[0],
        },
      }
    },
    abortion() {
      this.active = false
      this.item = {}
    },
  },
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';

</style>
