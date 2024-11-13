<template>

  <b-modal
    id="refermodal"
    v-model="active"
    ok-only
    no-close-on-backdrop
    class="modal-dialog"
    title="Send to assessment"
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
              name="users"
            >
              <b-form-group>
                <label for="sb-default">Users</label>
                <b-overlay
                  :show="show"
                >
                  <v-select
                    v-model="selecteduser"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="userList"
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
          Are you sure you want to send cases to <strong class="text-danger">{{ selecteduser.title }}</strong> ?
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
    ...takeState('geoSplit', 'showModalRef')
      .expose([
        'active',
        'items',
      ])
      .commit('geoSplit/SET_SHOW_REF')
      .map(),
    showModalRef: takeState('geoSplit', 'showModalRef').commit('geoSplit/SET_SHOW_REF').map(),
    selecteduser: takeState('geoSplit', 'selecteduser').commit('geoSplit/SET_SEL_USER').map(),
    userList: takeState('geoSplit', 'userList').commit('geoSplit/SET_USER_LIST').map(),
    show: takeState('geoSplit', 'show').commit('geoSplit/SET_SHOW').map(),
    showEnd: takeState('geoSplit', 'showEnd').commit('geoSplit/SET_SHOW_END').map(),

  },
  methods: {
    AssignToOrg() {
      this.$refs.ReferRules.validate().then(success => {
        if (success) {
          this.$swal({
            title: 'Send To Assessment',
            text: 'Are you sure you want to send the selected cases to Assessment!?',
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
              this.$store.dispatch('geoSplit/SEND_TO_ASSM_USER', {
                prefix: this.$route.params.prefixPrj,
                prefixRole: this.$route.params.prefixRole,
                type: this.$route.params.assmnttype,
                itm: this.items,
              }).then(res => {
                console.log('rp', res)
                console.log('rap', res[0].result)
                this.showModalRef = {
                  active: false,
                  items: null,
                }
                if (res[0].result === 1) {
                  this.selecteduser = {}
                  this.showEnd = false
                  this.$swal({
                    icon: 'success',
                    title: 'Done!',
                    text: 'The case hase been Back to Assessment!',
                    customClass: {
                      confirmButton: 'btn btn-success',
                    },
                  })
                } else {
                  this.show = false
                  this.showModalRef = {
                    active: false,
                  }
                  this.$swal({
                    icon: 'danger',
                    title: 'Failed!',
                    text: 'Contact System administrator!',
                    customClass: {
                      confirmButton: 'btn btn-success',
                    },
                  })
                }
              })
              /// ///////////// send link comfirm end code ////////////
            } else {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Send to assessment is cancelled!',
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
              title: 'Voice Over IP Feature Soon',
              icon: 'PhoneCallIcon',
              variant: 'warning',
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
      this.selecteduser = {}
      this.showModalRef = {
        active: false,
      }
    },
  },
}
</script>
