<template>
  <!-- modal   -->
  <b-modal
    id="terminationmodal"
    v-model="showEnd"
    ok-only
    no-close-on-backdrop
    class="modal-dialog"
    title="Case Termination"
    :header-bg-variant="headerBgVariant"
    :header-border-variant="bodyTextVariant"
    :footer-border-variant="bodyTextVariant"
    data-backdrop="static"
    @close="showEnd=false"
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
            :disabled="show"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="PhnissOption"
          />
        </b-col>
      </b-row>
    </b-container>

    <template #modal-footer>
      <div class="w-100">
        <p class="float-left">
          Are you sure you want to terminate Selected Cases?
        </p>
        <b-button
          variant="danger"
          size="sm"
          :disabled="show"
          class="float-right"
          @click="EndCase"
        >
          End Case
        </b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
import { takeState } from 'vuex-dot'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import vSelect from 'vue-select'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

export default {
  components: {
    vSelect,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,

  },
  data() {
    return {
      headerBgVariant: 'danger',
      headerTextVariant: 'light',
      bodyBgVariant: 'light',
      bodyTextVariant: 'dark',
      footerBgVariant: 'warning',
      footerTextVariant: 'dark',
      phoneissue: null,
    }
  },
  computed: {
    PhnissOption: takeState('global', 'phn_issues').map(),
    show: takeState('monitoringTools', 'show').commit('monitoringTools/SET_SHOW').map(),
    showEnd: takeState('monitoringTools', 'showEndADV').commit('monitoringTools/SET_SHOW_END_ADV').map(),
    // endItem: takeState('monitoringTools', 'endItem').commit('monitoringTools/SET_END_ITEM').map(),
    rangeDate: takeState('monitoringTools', 'rangedate').commit('monitoringTools/SET_RANG_DAT').map(),

  },
  methods: {
    EndCase() {
      const rg = this.rangeDate
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
          title: 'Are you sure you want to terminate This Selected Cases',
          text: `For the following reason: ${this.phoneissue.title}`,
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
            this.$store.dispatch('monitoringTools/DELETE_CASE', {
              prefix: this.$route.params.prefixPrj,
              prefixRole: this.$route.params.prefixRole,
              startDate: rg.split('to')[0],
              endDate: rg.split('to')[1] == null ? rg.split('to')[0] : rg.split('to')[1],
              ph: this.phoneissue,
            }).then(res => {
              let resData = ''
              for (let i = 0; i < res.length; i += 1) {
                if (res[i][0].result === 1) {
                  resData += `<b>Case ${res[i][1].name},${res[i][1].ccd}, +${res[i][1].phone}:</b></br><p class="text-success"> Success </p></br>`
                } else if (res[i][0].result === 2) {
                  resData += `<b>Case ${res[i][1].name},${res[i][1].ccd}, +${res[i][1].phone}:</b></br><p class="text-danger">${res[i][0].stat}</p></br>`
                } else {
                  resData += `<b>Case ${res[i][1].name},${res[i][1].ccd}, +${res[i][1].phone}:</b></br><p class="text-danger">Please call system administrator</p></br>`
                }
              }
              this.$swal({
                title: 'Result!',
                html: `${resData}`,
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              })
              this.showEnd = false
            }).catch(error => {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Operation Failed',
                  icon: 'EditIcon',
                  text: error.toString,
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
