<template>

  <b-modal
    id="refermodal"
    v-model="active"
    ok-only
    no-close-on-backdrop
    class="modal-dialog"
    title="Refer to Organization"
    :header-bg-variant="headerBgVariant"
    :header-border-variant="bodyTextVariant"
    :footer-border-variant="bodyTextVariant"
    data-backdrop="static"
    @close="abortion"
  >

    <b-container fluid>
      <validation-observer
        ref="ReferRules"
        tag="form"
      >
        <b-row>
          <b-col>
            <validation-provider
              #default="{ errors }"
              rules="required"
              name="Organization"
            >
              <b-form-group>
                <label for="sb-default">Organization</label>
                <b-overlay
                  :show="show"
                >
                  <v-select
                    v-model="selectedOrgRef"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="OrgOp"
                    label="title"
                    placeholder="Select Organization"
                    :clearable="false"
                  />
                  <small class="text-danger mb-1">{{ errors[0] }}</small>
                </b-overlay>
              </b-form-group>
            </validation-provider>
          </b-col>
        </b-row>
      </validation-observer>
    </b-container>

    <template #modal-footer>

      <div class="w-100">
        <p class="float-left">
          Are you sure you want to refer cases <strong class="text-info">{{ caseCode }}</strong> to <strong class="text-danger">{{ selectedOrgRef ==null?"" :selectedOrgRef.title }}</strong> ?
        </p>

        <b-button
          variant="info"
          size="sm"
          class="float-right"
          :disabled="show"
          @click="AssignToOrg"
        >
          Confirm
        </b-button>
      </div>

    </template>
  </b-modal>
</template>

<script>
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { takeState } from 'vuex-dot'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import vSelect from 'vue-select'
import store from '@/store'

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
    ...takeState('monitoringTools', 'showModalRef')
      .expose([
        'active',
        'caseCode',
        'caseName',
        'orgId',
      ])
      .commit('monitoringTools/SET_SHOW_REF')
      .map(),
    showModalRef: takeState('monitoringTools', 'showModalRef').commit('monitoringTools/SET_SHOW_REF').map(),
    selectedOrgRef: takeState('monitoringTools', 'selectedOrgRef').commit('monitoringTools/SET_REF_ORG').map(),
    OrgOptions: takeState('global', 'organization_data').map(),
    show: takeState('monitoringTools', 'show').commit('monitoringTools/SET_SHOW').map(),
    rangeDate: takeState('monitoringTools', 'rangedate').commit('monitoringTools/SET_RANG_DAT').map(),
    OrgOp() {
      console.log(this.orgId)
      const b = this.OrgOptions.filter(el => el.value !== this.orgId)
      const c = b.filter(el => el.value !== 3)
      return c
    },
  },
  methods: {
    AssignToOrg() {
      console.log('ref', this.selectedOrgRef)
      if (this.selectedOrgRef != null) {
        this.$swal({
          title: 'Refer to Organization',
          text: `Are you sure you want to refer the selected cases to ${this.selectedOrgRef.title}!?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes!',
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ml-1',
          },
          buttonsStyling: false,
        }).then(result => {
          if (result.value) {
          /// ////////////////send link is confirmed ////////////////////////////////
            const rg = this.rangeDate
            this.show = true
            store.dispatch('monitoringTools/SEND_TO_ORG', {
              prefix: this.$route.params.prefixPrj,
              prefixRole: this.$route.params.prefixRole,
              startDate: rg.split('to')[0],
              endDate: rg.split('to')[1] == null ? rg.split('to')[0] : rg.split('to')[1],
            }).then(resu => {
              const res = resu
              let resData = ''
              if (res[0].result === 1) {
                resData += `<b>Case: ${this.caseName}, Code:${this.caseCode}:</b></br> <b class="text-success">Refer to ${this.selectedOrgRef.title} Successfully</b> </br></br>`
              } else {
                resData += `<b>Case: ${this.caseName}, Code:${this.caseCode}:</b></br> <b class="text-danger">Please call system administrator</b></br></br>`
              }

              this.showModalRef = {
                active: false,
              }
              this.selectedOrgRef = null
              this.$swal({
                title: 'Result!',
                html: resData,
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              })
            }).catch(err => {
              console.log(err)
              this.show = false
              this.showModalRef = {
                active: false,
              }
              this.selectedOrgRef = null
              this.$swal({
                title: 'Attention!',
                text: 'Please check intenrnet and try again!',
                icon: 'warning',
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              })
            })
          /// ///////////// send link comfirm end code ////////////
          } else {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Refer to Organization is cancelled!',
                icon: 'EditIcon',
                variant: 'info',
              },
            })
          }
        })
      } else {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Please select organization',
            icon: 'EditIcon',
            variant: 'info',
          },
        })
      }
      /// /////////////////////send to link end code///////////////////////////
    },
    abortion() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Request is aborted.',
          icon: 'ClipboardIcon',
          variant: 'warning',
        },
      })
      this.showModalRef = {
        active: false,
      }
      this.selectedOrgRef = null
    },
  },
}
</script>
