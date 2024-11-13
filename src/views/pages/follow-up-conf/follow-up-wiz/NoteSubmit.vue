<template>
  <!-- modal   -->
  <b-modal
    id="terminationmodal"
    v-model="showNoteSubmit"
    ok-only
    no-close-on-backdrop
    class="modal-dialog"
    title="Submit"
    size="lg"
    :header-bg-variant="headerBgVariant"
    :header-text-variant="headerTextVariant"
    :footer-border-variant="bodyTextVariant"
    data-backdrop="static"
    @close="showNote=false"
  >
    <b-container fluid>
      <b-row class="mb-1">
        <b-col cols="3">
          Note:
        </b-col>
        <b-col>
          <b-form-textarea
            v-model="com_status"
            placeholder="Please Enter Note to remember this Case"
            rows="6"
            cols="100"
            @focus="$event.target.select()"
          />
        </b-col>
      </b-row>
    </b-container>

    <template #modal-footer>
      <div class="w-100">
        <p class="float-left">
          Are you sure you want to Submit?
        </p>
        <b-button
          variant="success"
          size="sm"
          :disabled="show"
          class="float-right"
          @click="FollowUp"
        >
          Confirm
        </b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
import { takeState } from 'vuex-dot'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,

  },
  data() {
    return {
      headerBgVariant: 'success',
      headerTextVariant: 'dark',
      bodyBgVariant: 'light',
      bodyTextVariant: 'success',
      footerBgVariant: 'warning',
      footerTextVariant: 'dark',
      phoneissue: null,
    }
  },
  computed: {
    show: takeState('followUpWizConf', 'show').commit('followUpWizConf/SET_SHOW').map(),
    showNoteSubmit: takeState('followUpWizConf', 'showNoteSubmit').commit('followUpWizConf/SET_SHOW_NOTE_SUB').map(),
    priority_period: takeState('followUpWizConf', 'priority_period').map(),
    ...takeState('followUpWizConf', 'itemsrec')
      .expose([
        'pcr_date',
        'com_status',
        'pcr_photo_aprv',
        'pcr_photo'])
      .commit('followUpWizConf/SET_ITEM_REC')
      .map(),
    ...takeState('followUpWizConf', 'items')
      .expose([
        'employed',
        'final_decision',
        'progress_scoring',
        'delivery_status',
        'current_status',
      ])
      .commit('followUpWizConf/SET_ITEM')
      .map(),
    ...takeState('followUpWizConf', 'itemsrec')
      .expose([
        'com_status'])
      .commit('followUpWizConf/SET_ITEM_REC')
      .map(),
    ...takeState('followUpWizConf', 'items')
      .expose([
        'final_decision',
        'delivery_status',
        'current_status',
      ])
      .commit('followUpWizConf/SET_ITEM')
      .map(),
    ...takeState('followUpWizConf', 'munChange')
      .expose([
        'orglistselect'])
      .commit('followUpWizConf/SET_SELECTD_VAL_ORG')
      .map(),
  },
  methods: {
    FollowUp() {
      console.log(this.pcr_photo)
      let dec = ''
      if (this.progress_scoring >= 20) {
        dec = 'Approve'
      } else {
        dec = 'reject'
      }
      this.$swal({
        title: 'Case Confirmation!',
        text: `Are you sure you want to ${dec} The case?`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Yes!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        console.log('hi')
        console.log(result)
        if (result.value) {
          console.log('enter')
          this.showNoteSubmit = false
          if (this.progress_scoring >= 20) {
            console.log('ddd')
            this.final_decision = 2
            this.delivery_status = 2
          } else {
            console.log('ccc')
            this.final_decision = 3
            this.delivery_status = 5
            let str = ''
            let stt = ''
            /* if (this.progress_scoring < 60) {
                str += `The case was rejected due to low score of ${this.progress_scoring} points\n\n`
              } */
            if (this.pcr_date == null) {
              str += 'The case is considered Rejected\nBecause PCR date out of range\n\n'
            }
            if (str === '') {
              stt = `The case is considered Rejected\n with score of (${this.progress_scoring})`
            } else {
              stt = `${str}\nwith score of (${this.progress_scoring})`
            }
            this.current_status = stt
          }
          console.log('hi')
          this.$store.dispatch('followUpWizConf/FOLLOWSAVE', {
            prefix: this.$route.params.prefixPrj,
            prefixRole: this.$route.params.prefixRole,
            link: this.$route.params.resource,
            type: this.$route.params.assmnttype,
          }).then(res => {
            if (res[0].result === 1) {
              this.$swal({
                icon: 'success',
                title: 'Done!',
                text: 'The case was saved successfully!.',
                customClass: {
                  confirmButton: 'btn btn-success',
                },
              })
              this.$store.commit('followUpWizConf/RESET')
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
            } else {
              this.$swal({
                icon: 'warning',
                title: 'Attention!',
                text: 'Check dupilcated entred information!',
                customClass: {
                  confirmButton: 'btn btn-success',
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
    },
  },
}
</script>
