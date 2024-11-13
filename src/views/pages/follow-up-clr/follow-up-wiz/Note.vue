<template>
  <!-- modal   -->
  <b-modal
    id="terminationmodal"
    v-model="showNote"
    ok-only
    no-close-on-backdrop
    class="modal-dialog"
    title="Follow Up Later"
    size="lg"
    :header-text-variant="headerTextVariant"
    :header-bg-variant="headerBgVariant"
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
          Are you sure you want to followup later?
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
      headerTextVariant: 'light',
      bodyBgVariant: 'light',
      bodyTextVariant: 'success',
      footerBgVariant: 'warning',
      footerTextVariant: 'success',
      phoneissue: null,
    }
  },
  computed: {
    show: takeState('followUpWizClr', 'show').commit('followUpWizClr/SET_SHOW').map(),
    showNote: takeState('followUpWizClr', 'showNote').commit('followUpWizClr/SET_SHOW_NOTE').map(),
    ...takeState('followUpWizClr', 'itemsrec')
      .expose([
        'com_status'])
      .commit('followUpWizClr/SET_ITEM_REC')
      .map(),
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
  },
  methods: {
    FollowUp() {
      this.$swal({
        title: 'Are you sure you want to follow up later?',
        text: 'Postpone Action',
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
          this.showNote = false
          this.final_decision = 1
          this.delivery_status = 1
          this.$store.dispatch('followUpWizClr/FOLLOWSAVE', {
            prefix: this.$route.params.prefixPrj,
            prefixRole: this.$route.params.prefixRole,
            link: this.$route.params.resource,
            type: this.$route.params.assmnttype,
          }).then(res => {
            if (res[0].result === 1) {
              this.orglistselect = null
              this.$swal({
                icon: 'success',
                title: 'Done!',
                text: 'The case has been successfully!',
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
    },
  },
}
</script>
