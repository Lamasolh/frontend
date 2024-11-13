<template>
  <div>
    <b-modal
      id="form"
      v-model="showModalPIT.active"
      ok-only
      size="lg"
      no-close-on-esc
      no-close-on-backdrop
      class="modal-dialog"
      title="Add Pit"
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
            ref="formPIT"
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
                            v-model="showModalPIT.item.code"
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
                            v-model="showModalPIT.item.reference"
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
                            v-model="showModalPIT.item.un_code"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter UNHCR Code"
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
                        name="Size"
                      >
                        <b-form-group>
                          <label>Size (cubic meter)</label>
                          <b-form-input
                            v-model="showModalPIT.item.size"
                            class="form-control"
                            type="number"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Size"
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
                        name="Installed By"
                      >
                        <b-form-group label="Installed By">
                          <v-select
                            v-model="showModalPIT.item.installed_by"
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
                            v-model="showModalPIT.item.installed_date"
                            class="form-control"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :state="errors.length > 0 ? false : null"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>

                    <b-col
                      sm="6"
                      md="6"
                      lg="4"
                      xl="4"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="Status"
                      >
                        <b-form-group>
                          <label>Status   <span class="text-danger"><strong>*</strong></span></label>

                          <v-select
                            v-model="showModalPIT.item.status"
                            placeholder="Select Status"
                            label="name"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :options="pitStatus"
                            :state="errors.length > 0 ? false : null"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="6"
                      md="6"
                      lg="4"
                      xl="4"
                    >

                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="Type"
                      >
                        <b-form-group>
                          <label>Type   <span class="text-danger"><strong>*</strong></span></label>

                          <v-select
                            v-model="showModalPIT.item.type"
                            placeholder="Select Type"
                            label="name"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :options="pitType"
                            :state="errors.length > 0 ? false : null"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="6"
                      md="6"
                      lg="3"
                      xl="3"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="Desludged by NGO"
                      >
                        <b-form-group label="Desludged by NGO">
                          <b-form-checkbox
                            v-model="showModalPIT.item.is_desludged"
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
        'item',
        'active',
      ])
      .commit('dtMAIN/SET_MOD_LAT_EXP')
      .map(),

    ...takeState('dtMAIN', 'showModalTNT')
      .expose([
        'pit',
      ])
      .commit('dtMAIN/SET_MOD_TNT_EXP')
      .map(),
    ///
    show: takeState('dtPIT', 'show').commit('dtPIT/SET_SHOW').map(),
    showModalPIT: takeState('dtMAIN', 'showModalPIT').commit('dtMAIN/SET_MOD_PIT').map(),
    pitStatus: takeState('dtMAIN', 'pitStatus').map(),
    pitType: takeState('dtMAIN', 'pitType').map(),
    installedBy: takeState('dtMAIN', 'installedBy').map(),
    showModalLAT: takeState('dtMAIN', 'showModalLAT').commit('dtMAIN/SET_MOD_LAT').map(),
    pits: takeState('dtPIT', 'items').map(),

    showModalTNT: takeState('dtMAIN', 'showModalTNT').commit('dtMAIN/SET_MOD_TNT').map(),

  },
  methods: {
    submit() {
      this.$refs.formPIT.validate().then(success => {
        if (success) {
          this.$store.dispatch('dtPIT/SEND_DATA', {
            item: this.showModalPIT.item,
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

              if (this.active === true) {
                console.log(this.pits.filter(el => el.code === this.showModalPIT.item.code)[0])
                this.$store.commit('dtMAIN/SET_MOD_LAT_EXP', {
                  key: 'pit',
                  value: this.pits.filter(el => el.code === this.showModalPIT.item.code)[0],
                })
              }
              if (this.showModalTNT.active === true) {
                const { pits } = this.showModalTNT
                pits.push(this.pits.filter(el => el.code === this.showModalPIT.item.code)[0])
                this.$store.commit('dtMAIN/SET_MOD_TNT_EXP', {
                  key: 'pit',
                  value: pits,
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
    abortion() {
      this.showModalPIT = {
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
