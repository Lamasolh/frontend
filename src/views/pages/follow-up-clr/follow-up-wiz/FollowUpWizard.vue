<template>
  <div>
    <b-row>
      <b-col cols="12">
        <b-overlay
          rounded="lg"
          :show="show"
        >
          <follow-up-header
            :governorate="governorateTitle"
            :district="districtTitle"
            :cadaster="cadasterTitle"
            :iss="issTitle"
            :type="typeTitle"
            class="sticky-top"
          />
          <FormWizardNumber />
          <b-card>
            <b-row
              align-h="end"
              class="m-1"
            >
              <!-- <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="success"
                class="call"
                pill
                @click="call"
              >
                <feather-icon
                  icon="PhoneCallIcon"
                  size="24"
                />
                <span class="align-middle">Voice Over IP</span>
              </b-button> -->
              <b-col
                cols="12"
                md="auto"
              >
                <b-button
                  variant="success"
                  @click="confirmfollowlater"
                >
                  Follow-up Later
                </b-button>
              </b-col>

              <b-button
                v-b-modal.modal-no-backdrop
                variant="danger"
                @click="show1 = true"
              >
                End Case
              </b-button>
            </b-row>
          </b-card>
        </b-overlay>
      </b-col>
      <Note />
    </b-row>
    <!-- modal   -->
    <b-modal
      id="terminationmodal"
      v-model="show1"
      ok-only
      no-close-on-backdrop
      class="modal-dialog"
      title="Case Termination"
      :header-bg-variant="headerBgVariant"
      :header-border-variant="bodyTextVariant"
      :footer-border-variant="bodyTextVariant"
      data-backdrop="static"
    >
      <b-container fluid>
        <b-row class="mb-1">
          <b-col cols="3">
            Reasons:
          </b-col>
          <b-col>
            <v-select
              v-model="phoneissue"
              placeholder="Select the reason of terminition."
              label="title"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="PhnissOption"
            />
          </b-col>
        </b-row>
      </b-container>

      <template #modal-footer>
        <div class="w-100">
          <p class="float-left">
            Are you sure you want to terminate the case?
          </p>
          <b-button
            variant="danger"
            size="sm"
            class="float-right"
            @click="endcasesubmit"
          >
            End Case
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import { takeState } from 'vuex-dot'
import { mapGetters } from 'vuex'
// eslint-disable-next-line import/order
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import FormWizardNumber from '@/views/pages/follow-up-clr/follow-up-wiz/FormWizardNumber.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
// eslint-disable-next-line import/order
import { BButton } from 'bootstrap-vue'
import FollowUpHeader from '@/views/pages/follow-up-clr/follow-up-wiz/FollowUpHeader.vue'
import Note from './Note.vue'

export default {
  components: {
    FormWizardNumber,
    FollowUpHeader,
    BButton,
    vSelect,
    Note,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      headerBgVariant: 'danger',
      headerTextVariant: 'light',
      bodyBgVariant: 'light',
      bodyTextVariant: 'dark',
      footerBgVariant: 'warning',
      footerTextVariant: 'dark',
      show1: false,
      selected: null,
      selctdval: '',
      governorateTitle: 'Nothing',
      districtTitle: 'Nothing',
      cadasterTitle: 'Nothing',
      issTitle: null,
      typeTitle: 'Nothing',
    }
  },
  computed: {
    ...mapGetters({
      PhnissOption: 'global/phn_issues',
    }),
    ...takeState('followUpWizClr', 'items')
      .expose([
        'final_decision',
        'delivery_status',
        'current_status',
      ])
      .commit('followUpWizClr/SET_ITEM')
      .map(),
    ...takeState('followUpWizClr', 'munChange')
      .expose([
        'orglistselect'])
      .commit('followUpWizClr/SET_SELECTD_VAL_ORG')
      .map(),

    validated: takeState('followUpWizClr', 'validated').map(),
    show: takeState('followUpWizClr', 'show').map(),
    showNote: takeState('followUpWizClr', 'showNote').commit('followUpWizClr/SET_SHOW_NOTE').map(),
    pcrResultOption: takeState('global', 'pcr_result').map(),
    pcres: takeState('fullData', 'pcres').commit('fullData/SET_PCR_RES').map(),
    pcrResult() {
      return this.pcrResultOption.slice(0, -1)
    },
    phoneissue: takeState('followUpWizClr', 'phoneissue').commit('followUpWizClr/SET_PHN_ISS').map(),
    referral: takeState('followUpWizClr', 'referral').map(),
    governorate: takeState('followUpWizClr', 'governorate').map(),
    district: takeState('followUpWizClr', 'district').map(),
    cadaster: takeState('followUpWizClr', 'cadaster').map(),
    type: takeState('followUpWizClr', 'type').map(),
    iss: takeState('followUpWizClr', 'iss').map(),
  },
  mounted() {
    this.show1 = false
    this.selected = null
    this.selctdval = ''
    this.governorateTitle = 'Nothing'
    this.districtTitle = 'Nothing'
    this.cadasterTitle = 'Nothing'
    this.issTitle = null
    this.typeTitle = 'Nothing'
    this.$store.dispatch('followUpWizClr/GET_CASE_FOLL',
      {
        items: this.$route.params.value,
        prefix: this.$route.params.prefixPrj,
        prefixRole: this.$route.params.prefixRole,
        type: this.$route.params.assmnttype,
      }).then(value => {
      this.governorateTitle = this.$store.getters['global/governorate'].filter(
        it => it.value === value[0][0].governorate_id,
      )[0].title
      this.districtTitle = this.$store.getters['global/district'].filter(
        it => it.value === value[0][0].district_id,
      )[0].title
      this.typeTitle = this.$store.getters['followUpWizClr/typeOptions'].filter(
        it => it.value === value[0][0].satl_type,
      )[0].title
      this.cadasterTitle = this.$store.getters['followUpWizClr/cadOptions'].filter(
        it => it.value === value[0][0].cadastre_id,
      )[0].title
      if (value[0][0].is_id != null) {
        this.issTitle = this.$store.getters['followUpWizClr/issOptions'].filter(
          it => it.value === value[0][0].is_id,
        )[0].title
      }
    })
  },
  methods: {
    confirmfollowlater() {
      const b = this.type != null ? (this.type.value < 3 && this.iss == null) || (this.type.value > 3 && this.iss != null) : false
      console.log(b)
      if (this.referral != null && this.governorate != null
     && this.district != null && this.cadaster != null && b) {
        this.showNote = true
      } else {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Please select address',
            icon: 'EditIcon',
            variant: 'warning',
          },
        })
      }
    },

    endcasesubmit() {
      if (this.phoneissue === null) {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Select a value before submition',
            icon: 'EditIcon',
            variant: 'warning',
          },
        })
      } else {
        this.$swal({
          title: 'Are you sure you want to terminate The case?',
          text: `For the following reason: ${this.phoneissue}`,
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'Yes!',
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ml-1',
          },
          buttonsStyling: false,
        }).then(result => {
          if (result.value) {
            this.show1 = false
            this.final_decision = 3
            this.delivery_status = 5
            this.current_status = `the Case is terminated due to the following reason: ${this.phoneissue}`
            this.$store.dispatch('followUpWizClr/FOLLOWSAVE', {
              prefix: this.$route.params.prefixPrj,
              prefixRole: this.$route.params.prefixRole,
              link: this.$route.params.resource,
              type: this.$route.params.assmnttype,
            }).then(res => {
              if (res[0].result === 1) {
                this.$swal({
                  icon: 'success',
                  title: 'Done!',
                  text: 'The case hase been terminated!',
                  customClass: {
                    confirmButton: 'btn btn-success',
                  },
                })
                this.$store.commit('followUpWizClr/RESET')
                const nav = []
                nav.push(
                  {
                    active: false,
                    text: this.$route.params.breadcrumb[0].text,
                  },
                  {
                    active: false,
                    text: this.$route.params.title,
                  },
                )
                this.$router.replace({
                  name: 'project',
                  params: {
                    action: 'read',
                    breadcrumb: nav,
                    active: true,
                    prefix: this.$route.params.prefixPrj,
                    prefixRole: this.$route.params.prefixRole,
                    title: this.$route.params.title,
                    assmnttype: this.$route.params.assmnttype,
                    resource: this.$route.params.resource,
                  },
                })
              }
            }).catch(() => {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Contact System administrator',
                  icon: 'EditIcon',
                  text: 'Please check internet connection and try again',
                  variant: 'danger',
                },
              })
            })
          }
        })
      }
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-wizard.scss';
@import '@core/scss/vue/libs/vue-select.scss';
.sticky-top { top: 0.8em; }
</style>
