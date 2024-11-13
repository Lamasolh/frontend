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
          Are you sure you want to terminate this case <br>({{ endItem.item.case_code }}:{{ endItem.item.full_name }})?
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
    showEnd: takeState('geoSplit', 'showEnd').commit('geoSplit/SET_SHOW_END').map(),
    show: takeState('geoSplit', 'show').commit('geoSplit/SET_SHOW').map(),
    endItem: takeState('geoSplit', 'endItem').commit('geoSplit/SET_END_ITEM').map(),

  },
  methods: {
    EndCase() {
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
          title: `Are you sure you want to terminate This case (${this.endItem.item.case_code}:${this.endItem.item.full_name})`,
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
            this.show1 = false
            this.$store.dispatch('geoSplit/EndCase', {
              prefix: this.$route.params.prefixPrj,
              prefixRole: this.$route.params.prefixRole,
              ph: this.phoneissue,
              type: this.$route.params.assmnttype,
            }).then(res => {
              if (res[0].result === 1) {
                this.showEnd = false
                this.$swal({
                  icon: 'success',
                  title: 'Done!',
                  text: 'The case hase been terminated!',
                  customClass: {
                    confirmButton: 'btn btn-success',
                  },
                })
              } else {
                this.$swal({
                  icon: 'danger',
                  title: 'Failed!',
                  text: 'Contact System administrator!',
                  customClass: {
                    confirmButton: 'btn btn-success',
                  },
                })
              }
            }).catch(error => {
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
          }
        })
      }
    },
  },
}
</script>
