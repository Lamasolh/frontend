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
                    :options="OrgOptions"
                    label="title"
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
          Are you sure you want to refer cases to <strong class="text-danger">{{ selectedOrgRef.title }}</strong> ?
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
    ...takeState('caseAssignment', 'showModalRef')
      .expose([
        'active',
      ])
      .commit('caseAssignment/SET_SHOW_REF')
      .map(),
    selectedCase: takeState('caseAssignment', 'selectedCase').commit('caseAssignment/SET_SELECT_ITEM').map(),
    showModalRef: takeState('caseAssignment', 'showModalRef').commit('caseAssignment/SET_SHOW_REF').map(),
    selectedOrgRef: takeState('caseAssignment', 'selectedOrgRef').commit('caseAssignment/SET_REF_ORG').map(),
    OrgOptions: takeState('caseAssignment', 'orgList').commit('caseAssignment/SET_ORG_LIST').map(),
    show: takeState('caseAssignment', 'show').commit('caseAssignment/SET_SHOW').map(),

  },
  methods: {
    AssignToOrg() {
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
          this.show = true
          store.dispatch('caseAssignment/SEND_TO_ORG', {
            prefix: this.$route.params.prefixPrj,
            prefixRole: this.$route.params.prefixRole,
            type: this.$route.params.assmnttype,
          }).then(resu => {
            const res = resu.result
            console.log('after dispatch', res[0][1].name)
            let resData = ''
            for (let i = 0; i < res.length; i += 1) {
              if (res[i][0].result === 1) {
                resData += `<b>Case: ${res[i][1].name}, Code:${res[i][1].code}:</b></br> Refer to ${this.selectedOrgRef.title} Successfully </br></br>`
              } else {
                resData += `<b>Case: ${res[i][1].name}, Code:${res[i][1].coode}:</b></br> Please call system administrator</br></br>`
              }
            }
            this.showModalRef = {
              active: false,
            }
            this.isAssignSidebarActive = false
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
      /// /////////// selecyion is done end code //////////////
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
    },
  },
}
</script>
