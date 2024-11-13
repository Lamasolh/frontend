<template>
  <div>
    <b-modal
      id="form"
      v-model="active"
      ok-only
      no-close-on-esc
      no-close-on-backdrop
      class="modal-dialog"
      title="Add Family"
      :header-bg-variant="headerBgVariant"
      :header-border-variant="bodyTextVariant"
      :footer-border-variant="bodyTextVariant"
      data-backdrop="static"
      @close="abortion"
    >
      <b-overlay :show="show">
        <b-container fluid>
          <validation-observer
            ref="formFAMGen"
            tag="form"
          >
            <b-row>
              <b-col>
                <b-form>
                  <h3>Enter number of member you need to add</h3>
                  <b-row>
                    <b-col
                      sm="12"
                      md="12"
                      lg="12"
                      xl="12"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="Number"
                      >
                        <b-form-group>
                          <label>Number<span class="text-danger"><strong>*</strong></span></label>
                          <b-form-input
                            v-model="number"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Number"
                          />
                          <small class="text-danger mb-1">{{
                            errors[0]
                          }}</small>
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
import generateUniqueId from '@/libs/unique_id'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
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
    ...takeState('dtMAIN', 'showModalFAMGen')
      .expose(['active', 'number'])
      .commit('dtMAIN/SET_MOD_MEM_FAM_GEN_EXP')
      .map(),

    ...takeState('dtMAIN', 'showModalFAM')
      .expose(['listMember'])
      .commit('dtMAIN/SET_MOD_FAM_EXP')
      .map(),
    ///
    show: takeState('dtFAM', 'show').commit('dtFAM/SET_SHOW').map(),

    gender: takeState('dtMAIN', 'gender').map(),
    maritalStatus: takeState('dtMAIN', 'maritalStatus').map(),
    disbality: takeState('dtMAIN', 'disability').map(),
    nationality: takeState('dtMAIN', 'nationality').map(),
  },
  methods: {
    submit() {
      this.$refs.formFAMGen
        .validate()
        .then(success => {
          if (success) {
            console.log(this.number)
            for (let i = 0; i < this.number; i += 1) {
              const cd = generateUniqueId('MEM_')
              this.listMember.push({
                code: cd,
                reference: cd,
                disbality: this.disbality.filter(el => el.id === 1)[0],
                gender: this.gender.filter(el => el.id === 2)[0],
                nationality: this.nationality.filter(el => el.id === 3)[0],
              })
            }

            this.abortion()
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
        })
        .catch(() => {
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
