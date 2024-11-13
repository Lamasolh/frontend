<template>
  <div>
    <b-modal
      id="modalIss"
      v-model="active"
      size="xl"
      no-close-on-backdrop
      class="modal-dialog"
      title="Edit"
      :header-bg-variant="headerBgVariant"
      :header-border-variant="bodyTextVariant"
      :footer-border-variant="bodyTextVariant"
      data-backdrop="static"
      @close="abortion"
    >
      <b-overlay
        rounded="lg"
        :show="show"
      >
        <b-container
          v-if="row !=null"
          fluid
        >
          <validation-observer
            ref="modalIss"
            tag="form"
          >
            <b-form @submit.prevent="submit()">
              <h2>
                Cadaster: {{ row.item.cadastre_name }}
              </h2>
              <!--
              <b-row>
                <b-col cols="4">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Staff"
                  >
                    <h3>Staff</h3>
                    <v-select
                      id="Staff"
                      v-model="stafMon"
                      placeholder="Select Staff"
                      label="title"
                      multiple
                      :append-to-body="true"
                      :state="errors.length > 0 ? false : null"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :options="staffOption"
                    />
                    <small class="text-danger mb-1">{{ errors[0] }}</small>
                  </validation-provider>
                </b-col>
                <b-col cols="4">
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required"
                    name="Modularity"
                  >
                    <b-form-group label="Modularity">
                      <b-input
                        v-model="modularity"
                        type="number"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        :state="errors.length > 0 ? false : null"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                </b-col>
              </b-row>-->
              <b-row>
                <b-col cols="1">
                  Index
                </b-col>
                <b-col cols="5">
                  Supplier
                </b-col>
                <b-col cols="4">
                  Amount ($)
                </b-col>
                <b-col cols="2">
                  Action
                </b-col>
              </b-row>
              <div
                v-for="(dt,index) in row.item.supplier"
                :key="dt.id"
              >
                <b-row>
                  <b-col cols="1">
                    <h2>#{{ index +1 }}</h2>
                  </b-col>
                  <b-col cols="5">
                    <validation-provider
                      v-slot="{ errors }"
                      rules="required"
                      :name="`Supplier${index +1}`"
                    >
                      <v-select
                        :id="`Supplier${index +1}`"
                        v-model="dt.sup"
                        label="name"
                        placeholder="Select Supplier"
                        :clearable="false"
                        :state="errors.length > 0 ? false : null"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        :options="supList"
                        @input="(value) => changeSup(value,index)"
                      />
                      <small class="text-danger mb-1">{{
                        errors[0]
                      }}</small>

                    </validation-provider>
                  </b-col>
                  <b-col cols="4">
                    <validation-provider
                      v-slot="{ errors }"
                      :name="`Amount ${index +1}`"

                      rules="required|min_value:1"
                    >
                      <b-form-input
                        :id="`Amount ${index +1}`"
                        v-model="dt.ammount"
                        placeholder="Enter Amount"
                        :state="errors.length > 0 ? false : null"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        type="number"
                      />
                      <small class="text-danger mb-1">{{
                        errors[0]
                      }}</small>

                    </validation-provider>
                  </b-col>
                  <b-col>
                    <b-button
                      block
                      variant="danger"
                      @click="clearSup(index)"
                    >
                      Clear
                    </b-button>
                  </b-col>
                </b-row>
                <br>
              </div>

              <b-row
                v-if="row.item.supplier.length !=supL.length"
                align-h="end"
              >
                <b-col cols="2">
                  <b-button
                    block
                    variant="success"
                    @click="addSup"
                  >
                    Add Supplier
                  </b-button>
                </b-col>
              </b-row>
              <b-row v-else-if="row.item.supplier.length ===0">
                <h1 class="text-danger">
                  Please Add Supplier
                </h1>
              </b-row>

              <br>
            </b-form>
          </validation-observer>
        </b-container>
      </b-overlay>
      <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="info"
            size="sm"
            type="button"
            class="float-right"
            :disabled="show"
            @click="submit"
          >
            Submit
          </b-button>
        </div>
      </template>
    </b-modal>

  </div>

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
    vSelect,
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
    ...takeState('listPMSetPrj', 'showModalIss')
      .expose([
        'active',
        'row',
      ])
      .commit('listPMSetPrj/SET_MOD_SUP_ISS')
      .map(),
    showModalIss: takeState('listPMSetPrj', 'showModalIss').commit('listPMSetPrj/SET_MOD_SUP_ISS').map(),
    show: takeState('listPMSetPrj', 'show').commit('listPMSetPrj/SET_SHOW').map(),
    supL: takeState('listPMSetPrj', 'itemsSUP').map(),
    staffOption: takeState('settingPrj', 'staffOption').map(),

    supList() {
      if (this.row == null) {
        return []
      }
      const ls = this.row.item.supplier.map(el => el.id)
      console.log(ls, this.supL)
      return this.supL.filter(el => !ls.includes(el.id))
    },
  },
  methods: {
    submit() {
      this.$refs.modalIss.validate().then(success => {
        if (success) {
          console.log('success')
          this.$store
            .dispatch('listPMSetPrj/SEND_DATA', {
              prefix: this.$route.params.value.proj_prefix,
              prefixRole: this.$route.params.prefixRole,
              orgType: 4,
              data: this.row.item,
            })
            .then(val => {
              console.log('val', val.data.res[0].result)
              if (val.data.res[0].result === 1) {
                this.abortion()

                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Task Submited Success',
                    icon: 'EditIcon',
                    variant: 'success',
                  },
                })
              } else {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Task Submited Failed',
                    icon: 'EditIcon',
                    variant: 'dander',
                  },
                })
              }
            })
        } else {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Missing Data',
              icon: 'EditIcon',
              variant: 'warning',
            },
          })
        }
      })
    },
    clearSup(index) {
      this.row.item.supplier.splice(index, 1)
    },
    changeSup(item, index) {
      this.row.item.supplier[index].id = item.id
    },
    changeAmount(item, index) {
      this.row.item.supplier[index].id = item.id
    },
    addSup() {
      this.row.item.supplier.push({
        id: null,
        amount: null,
      })
    },
    abortion() {
      this.showModalIss = {
        active: false,
        row: null,
      }
    },
  },
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

</style>
