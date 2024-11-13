<template>
  <b-modal
    id="refermodal"
    v-model="active"
    ok-only
    no-close-on-backdrop
    class="modal-dialog"
    title="Lookup Supplier"
    :header-bg-variant="headerBgVariant"
    :header-border-variant="bodyTextVariant"
    :footer-border-variant="bodyTextVariant"
    data-backdrop="static"
    @close="abortion"
  >

    <b-container fluid>
      <b-row>
        <b-col>
          <p v-if="showModalSupAcceptLook.res != null">
            Do You want add this Supplier "{{ showModalSupAcceptLook.res[0].sup_name }}"
          </p>
        </b-col>
      </b-row>
    </b-container>

    <template #modal-footer>

      <div class="w-100">
        <b-button
          variant="danger"
          size="sm"
          type="button"
          class="float-right ml-1"
          :disabled="show"
          @click="abortion"
        >
          No
        </b-button>

        <b-button
          variant="success"
          size="sm"
          type="button"
          class="float-right"
          :disabled="show"
          @click="accept"
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

export default {
  components: {
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
    ///
    ...takeState('listPMSetPrj', 'showModalSupAcceptLook')
      .expose([
        'active',
      ])
      .commit('listPMSetPrj/SET_MOD_SUP_ACPT_LOOK')
      .map(),
    showModalSupAcceptLook: takeState('listPMSetPrj', 'showModalSupAcceptLook').commit('listPMSetPrj/SET_MOD_SUP_ACPT_LOOK').map(),
    showModalSupLook: takeState('listPMSetPrj', 'showModalSupLook').commit('listPMSetPrj/SET_MOD_SUP_LOOK').map(),

    show: takeState('listPMSetPrj', 'show').commit('listPMSetPrj/SET_SHOW').map(),

  },
  methods: {
    accept() {
      this.$store
        .dispatch('listPMSetPrj/SAVE_LOOKUP_SUP_DON', {
          prefix: this.$route.params.value.proj_prefix,
          prefixRole: this.$route.params.prefixRole,
          id: this.showModalSupAcceptLook.res[0],
          orgType: 4,
        })
        .then(val => {
          console.log('val', val)
          if (val.res.length === 0) {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'No Supplier found',
                icon: 'EditIcon',
                variant: 'warning',
              },
            })
          } else if (val.res[0].result === 1) {
            this.$swal({
              title: 'Supplier Found',
              text: 'Supplier Success Saved',
              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
            this.abortionAll()
          } else if (val.res[0].result === 2) {
            this.$swal({
              title: 'Save Lookup Supplier',
              text: 'Supplier Al ready Exist',
              icon: 'info',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
            this.abortionAll()
          } else {
            this.$swal({
              title: 'Save Lookup Supplier',
              text: 'Contact Adminstrator',
              icon: 'danger',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
            this.abortionAll()
          }
        })
    },
    abortionAll() {
      console.log('s')
      this.showModalSupAcceptLook = {
        active: false,
      }
      this.showModalSupLook = {
        active: false,
      }
    },
    abortion() {
      console.log('s')
      this.showModalSupAcceptLook = {
        active: false,
      }
    },
  },
}
</script>
