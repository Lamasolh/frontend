<template>
  <div>
    <form-wizard
      color="#7367F0"
      :title="null"
      :subtitle="null"
      shape="square"
      finish-button-text="Submit"
      back-button-text="Previous"
      class="mb-3"
      @on-complete="confirmsave"
    >
      <!-- basic information tab -->
      <tab-content
        title="Basic Information"
        :before-change="validationFormInfo"
      >
        <validation-observer
          ref="InfoRules"
          tag="form"
        >
          <WizardInfo />
        </validation-observer>
      </tab-content>
      <!-- Family information tab-->
      <tab-content
        title="Family Information"
        :before-change="validationFormFamily"
      >
        <validation-observer
          ref="familyRules"
          tag="form"
        >
          <WizardFamily />
        </validation-observer>
      </tab-content>
      <!-- Valid Criteria-->
      <tab-content
        title="Valid. Criteria"
        :before-change="validationFormCriteria"
      >
        <validation-observer
          ref="criteriaRules"
          tag="form"
        >
          <WizardCriteria />
        </validation-observer>
      </tab-content>
      <!-- Socioeconomic/accomodation Info-->
      <tab-content
        title="Socio/accomod Info"
        :before-change="validationFormSocial"
      >
        <validation-observer
          ref="socialRules"
          tag="form"
        >
          <WizardSocio />
        </validation-observer>
      </tab-content>
      <!-- Result tab-->
      <tab-content
        title="Case Summary"
        :before-change="validationFormSummary"
      >
        <validation-observer
          ref="summaryRules"
          tag="form"
        >
          <WizardSummary />
        </validation-observer>
      </tab-content>
    </form-wizard>
    <NoteSubmit />
  </div>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import { ValidationObserver } from 'vee-validate'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
// Pages
import { takeState } from 'vuex-dot'
import WizardInfo from './WizardInfo.vue'
import WizardFamily from './WizardFamily.vue'
import WizardCriteria from './WizardCriteria.vue'
// import WizardSocial from './WizardSocial.vue'
import WizardSocio from './WizardSocio.vue'
import WizardSummary from './WizardSummary.vue'
import NoteSubmit from './NoteSubmit.vue'
// eslint-disable-next-line import/order

export default {
  components: {
    ValidationObserver,
    FormWizard,
    TabContent,
    // Pages
    WizardInfo,
    WizardFamily,
    WizardCriteria,
    NoteSubmit,
    // WizardSocial,
    WizardSocio,
    WizardSummary,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  data() {
    return {
      dic: '',
    }
  },
  computed: {
    ...takeState('followUpWiz', 'itemsrec')
      .expose([
        'pcr_date',
        'pcr_photo_aprv',
        'pcr_photo'])
      .commit('followUpWiz/SET_ITEM_REC')
      .map(),
    ...takeState('followUpWiz', 'items')
      .expose([
        'employed',
        'final_decision',
        'progress_scoring',
        'delivery_status',
        'current_status',
      ])
      .commit('followUpWiz/SET_ITEM')
      .map(),
    validated: takeState('followUpWiz', 'validated').map(),
    priority_period: takeState('followUpWiz', 'priority_period').map(),
    showNoteSubmit: takeState('followUpWiz', 'showNoteSubmit').commit('followUpWiz/SET_SHOW_NOTE_SUB').map(),

  },
  mounted() {
    console.log('res', this.$route.params.resource)
    this.$store.commit('followUpWiz/RESET')
  },
  methods: {
    /* formSubmitted() {
      if (this.validated === true) {
        this.delivery_status = 2
        const dff = moment(moment()).diff(this.pcr_date, 'days')

        if (this.progress_scoring >= 60 && dff < this.priority_period && dff >= 0 && this.pcr_photo != null
         && this.pcr_photo_aprv != null) {
          this.final_decision = 2
        } else {
          this.final_decision = 3
        }
        this.$store.dispatch('followUpWiz/FOLLOWSAVE', {
          prefix: this.$route.params.prefixPrj,
          prefixRole: this.$route.params.prefixRole,
          link: this.$route.params.resource,

        }).then(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Form Submitted',
              icon: 'EditIcon',
              variant: 'success',
            },
          })
        }).catch(error => {
          console.log(error)
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
      } else {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: "Case can't be Submitted, due to incomplete information",
            icon: 'EditIcon',
            variant: 'warning',
          },
        })
      }
    }, */
    confirmsave() {
      console.log('this.showNoteSubmit', this.validated)
      if (this.validated === true) {
        this.showNoteSubmit = true
        console.log('this.showNoteSubmit', this.showNoteSubmit)
      } else {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: "Case can't be Submitted, due to incomplete information",
            icon: 'EditIcon',
            variant: 'warning',
          },
        })
      }
    },
    validationFormInfo() {
      return new Promise((resolve, reject) => {
        this.$refs.InfoRules.validate().then(success => {
          if (success) {
            resolve(true)
          } else {
            reject()
          }
        })
      })
    },
    validationFormFamily() {
      return new Promise((resolve, reject) => {
        this.$refs.familyRules.validate().then(success => {
          if (success) {
            resolve(true)
          } else {
            reject()
          }
        })
      })
    },
    validationFormCriteria() {
      return new Promise((resolve, reject) => {
        this.$refs.criteriaRules.validate().then(success => {
          if (success) {
            resolve(true)
          } else {
            reject()
          }
        })
      })
    },
    validationFormSocial() {
      return new Promise((resolve, reject) => {
        this.$refs.socialRules.validate().then(success => {
          if (success) {
            console.log('hi')
            this.final_decision = 1
            this.delivery_status = 1
            this.$store.dispatch('followUpWiz/FOLLOWCHECK', {
              prefix: this.$route.params.prefixPrj,
              prefixRole: this.$route.params.prefixRole,
              link: this.$route.params.resource,
              type: this.$route.params.assmnttype,
            }).then(res => {
              if (res[0].result === 1) {
                resolve(true)
              }
            }).catch(error => {
              reject(error)
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Operation Failed',
                  icon: 'EditIcon',
                  text: error,
                  variant: 'danger',
                },
              })
            })
          } else {
            reject()
          }
        })
      })
    },
    validationFormSummary() {
      return new Promise((resolve, reject) => {
        this.$refs.summaryRules.validate().then(success => {
          if (success) {
            resolve(true)
          } else {
            reject()
          }
        })
      })
    },
    call() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Voice Over IP Feature Soon',
          icon: 'PhoneCallIcon',
          variant: 'warning',
        },
      })
    },
  },
}
</script>
<style lang="scss" >
@import '@core/scss/vue/libs/vue-select.scss';
</style>
