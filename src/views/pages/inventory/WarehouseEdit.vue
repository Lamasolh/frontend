<template>
  <!-- add new warehouse modal   -->
  <b-modal
    id="addwarehousemodal"
    v-model="isOpen"
    ok-only
    no-close-on-backdrop
    class="modal-dialog"
    title="Edit Warehouse"
    :header-bg-variant="headerBgVariant"
    :header-border-variant="bodyTextVariant"
    :footer-border-variant="bodyTextVariant"
    data-backdrop="static"
    @close="abortionadd"
  >
    <b-container fluid>
      <validation-observer
        ref="addWhRules"
        tag="form"
      >
        <b-row>
          <b-col>
            <label for="sb-default">English warehouse Name</label>
            <validation-provider
              #default="{ errors }"
              name="English warehouse Name"
              rules="required"
            >
              <b-form-input
                id="nameeng"
                v-model="whNameEng"
                :state="errors.length > 0 ? false : null"
                placeholder="Enter a warehouse name in English"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <label for="sb-default">Arabic warehouse Name</label>
            <validation-provider
              #default="{ errors }"
              name="Arabic warehouse Name"
              rules="required"
            >
              <b-form-input
                id="nameara"
                v-model="whNameAr"
                dir="rtl"
                :state="errors.length > 0 ? false : null"
                placeholder="أدخل اسم المستودع باللغة العربية"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <validation-provider
              #default="{ errors }"
              name="Warehouse Type"
              rules="required"
            >
              <label for="sb-default">Warehouse Type</label>
              <v-select
                v-model="whType"
                placeholder="Select a Warehouse."
                label="title"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :state="errors.length > 0 ? false : null"
                :options="inv_warehouse"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <validation-provider
              #default="{ errors }"
              name="Cadaster"
              rules="required"
            >
              <label for="sb-default">Cadaster</label>
              <v-select
                v-model="whMunicipality"
                placeholder="Select Cadaster."
                :state="errors.length > 0 ? false : null"
                label="title"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="municipalityOptions"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <label for="sb-default">Warehouse Address</label>
            <validation-provider
              #default="{ errors }"
              name="Warehouse Address"
              rules="required"
            >
              <b-form-input
                id="whaddress"
                v-model="wh_addrss"
                dir="rtl"
                :state="errors.length > 0 ? false : null"
                placeholder="أدخل عنوان المستودع"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <label for="sb-default">Other Commnets</label>
            <b-form-input
              id="whcmnts"
              v-model="whCmnts"
              dir="rtl"
              placeholder="أي تعليقات أخرى"
            />
          </b-col>
        </b-row>
      </validation-observer>
    </b-container>

    <template #modal-footer>
      <div class="w-100">
        <p class="float-left">
          Edit warehouse.
        </p>
        <b-overlay
          :show="showOver"
          rounded="sm"
        >
          <b-button
            variant="warning"
            size="sm"
            :disabled="showOver"
            class="float-right"
            @click="confirmsave"
          >
            Update
          </b-button>
        </b-overlay>
      </div>
    </template>
  </b-modal>
</template>

<script>
/* eslint-disable prefer-destructuring */
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { takeState } from 'vuex-dot'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import vSelect from 'vue-select'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    vSelect,
  },
  props: {
    items: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      totalRows: null,
      whNameEng: null,
      whNameAr: null,
      whType: [],
      whMunicipality: [],
      wh_addrss: null,
      whCmnts: null,
      headerBgVariant: 'light-info',
      headerTextVariant: 'light',
      bodyBgVariant: 'dark',
      bodyTextVariant: 'dark',
      footerBgVariant: 'info',
      footerTextVariant: 'dark',
    }
  },
  computed: {
    showOver: takeState('inventory', 'show').commit('inventory/SET_SHOW').map(),
    isOpen: takeState('inventory', 'showEdit').commit('inventory/SET_SHOW_EDIT').map(),
    inv_warehouse: takeState('global', 'inv_warehouse').map(),
    municipalityOptions: takeState('global', 'municipality').map(),
  },
  watch: {
    isOpen() {
      this.whType = this.inv_warehouse.filter(el => el.title === this.items.type_name)[0]
      this.whMunicipality = this.municipalityOptions.filter(el => el.title === this.items.cadastre_name)[0]
      this.wh_addrss = this.items.wh_address
      this.whNameEng = this.items.wh_name
      this.whNameAr = this.items.wh_name_ar
      this.whCmnts = this.items.comments
    },
  },
  mounted() {
    this.whType = this.inv_warehouse.filter(el => el.title === this.items.type_name)[0]
    this.whMunicipality = this.municipalityOptions.filter(el => el.title === this.items.cadastre_name)[0]
    this.wh_addrss = this.items.wh_address
    this.whNameEng = this.items.wh_name
    this.whNameAr = this.items.wh_name_ar
    this.whCmnts = this.items.comments
  },
  methods: {
    confirmsave() {
      return new Promise((resolve, reject) => {
        this.$refs.addWhRules.validate().then(success => {
          if (success) {
            this.show2 = false
            this.$swal({
              title: 'Edit Warehouse',
              text: 'Are you sure you want to edit this warehouse?',
              icon: 'info',
              showCancelButton: true,
              confirmButtonText: 'Yes!',
              customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-outline-danger ml-1',
              },
              buttonsStyling: false,
            }).then(() => {
              this.$store.dispatch('inventory/EDIT_WAREHOUSE', {
                prefix: this.$route.params.prefixPrj,
                type: this.$route.params.assmnttype,
                items: this.items,
                whNameEng: this.whNameEng,
                whNameAr: this.whNameAr,
                whCmnts: this.whCmnts,
                wh_addrss: this.wh_addrss,
                whType: this.whType,
                whMunicipality: this.whMunicipality,
              }).then(res => {
                if (res === 1) {
                  this.$swal({
                    icon: 'success',
                    title: 'Done!',
                    text: 'Warehouse edited successsfully.',
                    customClass: {
                      confirmButton: 'btn btn-success',
                    },
                  })
                  this.isOpen = false
                  this.$emit('close')
                } else {
                  this.$toast({
                    component: ToastificationContent,
                    props: {
                      title: 'Contact System administrator',
                      icon: 'EditIcon',
                      text: 'Error',
                      variant: 'danger',
                    },
                  })
                }
              }).catch(error => {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Contact System administrator',
                    icon: 'EditIcon',
                    text: error,
                    variant: 'danger',
                  },
                })
              })
            })
            resolve(true)
          } else {
            reject()
          }
        })
      })
    },
    abortionadd() {
      this.isOpen = false
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Adding a warehouse is aborted.',
          icon: 'ClipboardIcon',
          variant: 'warning',
        },
      })
    },
  },
}
</script>
