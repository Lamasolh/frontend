<template>
  <b-card>

    <b-form>
      <validation-observer
        ref="AddItemRules"
        tag="form"
      >
        <b-row align-h="between">
          <b-col cols="3">
            Add Items
          </b-col>
        </b-row>
        <br>
        <!-- select item-->
        <b-row>
          <b-col cols="6">
            <validation-provider
              v-slot="{ errors }"
              rules="required"
              name="Items"
            >
              <b-form-group
                label="Items"
                label-for="items"
              >
                <v-select
                  v-model="item_select"
                  :value="item_select"
                  placeholder="Select an Item to add"
                  label="title"
                  :options="project_items"
                  :clearable="false"
                  :state="errors.length > 0 ? false : null"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                />
                <small class="text-danger mb-1">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col cols="3">
            <b-form-group
              label="Way Bill"
              label-for="waybill"
            >
              <validation-provider
                v-slot="{ errors }"
                rules="required"
                name="Way Bill"
              >
                <b-form-input
                  id="name"
                  v-model="waybill"
                  :state="errors.length > 0 ? false : null"
                  placeholder="Enter the way bill"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="3">
            <b-form-checkbox
              id="invent"
              v-model="isinv"
              class="mt-2"
              name="invent"
              :value="1"
              :unchecked-value="0"
            >
              Is Inventory!?
            </b-form-checkbox>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <validation-provider
              v-slot="{ errors }"
              rules="required"
              name="Donor"
            >
              <b-form-group
                label="Donor list"
                label-for="Donor"
              >
                <v-select
                  v-model="supplier_select"
                  :options="supplier_from"
                  placeholder="Select a donor"
                  label="title"
                  :clearable="false"
                  :state="errors.length > 0 ? false : null"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                />
                <small class="text-danger mb-1">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>

          <b-col>
            <validation-provider
              v-slot="{ errors }"
              rules="required"
              name="Warehouse"
            >
              <b-form-group
                label="To WareHouse"
                label-for="warehouse"
              >
                <v-select
                  v-model="warehouse_select"
                  :options="mainwarehouse"
                  placeholder="Select a warehouse"
                  label="title"
                  :clearable="false"
                  :state="errors.length > 0 ? false : null"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                />
                <small class="text-danger mb-1">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <validation-provider
              v-slot="{ errors }"
              rules="required|min_value:1"
              name="items"
            >
              <b-form-group>
                <label for="sb-default">Item - Quantity</label>
                <b-form-input
                  id="sb-default"
                  v-model.number="qntty_item"
                  type="number"
                  placeholder="Enter Quantity"
                  :state="errors.length > 0 ? false : null"
                  class="text-center"
                  number
                />
                <small class="text-danger mb-1">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col>
            <validation-provider
              v-slot="{ errors }"
              rules="required"
              name="Date"
            >
              <b-form-group>
                <label for="sb-default">Date</label>
                <flat-pickr
                  v-model="inv_date"
                  class="form-control"
                />
                <small class="text-danger mb-1">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group
              label="Comments"
              label-for="comments"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Comments"
              >
                <b-form-input
                  id="comments"
                  v-model="inv_comments"
                  :state="errors.length > 0 ? false : null"
                  placeholder="Comments"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>

        <b-col cols="12">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mt-1 mr-1"
            @click="additemsave"
          >
            Save changes
          </b-button>
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            type="reset"
            variant="outline-secondary"
            class="mt-1"
            @click="resetall"
          >
            Reset
          </b-button>
        </b-col>
        <b-row>
          <b-col
            v-for="it in stasticItem"
            :key="it.id"
            cols="3"
          >
            <statistic-card-vertical
              icon="BoxIcon"
              :itemname="it.itemName"
              :statistic="it.total_kits + ` Kits`"
              statistic-title="Total Kits"
              color="danger"
            />
          </b-col>

        </b-row>
      <!--/ buttons -->
      </validation-observer>
    </b-form>
  </b-card>
</template>

<script>
import Ripple from 'vue-ripple-directive'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import moment from 'moment'
import StatisticCardVertical from '@core/components/statistics-cards/StatisticCardVerticalADV.vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { takeState } from 'vuex-dot'

export default {
  components: {
    StatisticCardVertical,
    flatPickr,
    vSelect,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      currentDate: moment(),
    }
  },
  computed: {
    // Items
    stasticItem: takeState('inventory', 'stasticItem').map(),
    total_kits: takeState('inventory', 'total_kits').map(),
    project_items: takeState('inventory', 'project_items').map(),
    item_select: takeState('inventory', 'item_select').commit('inventory/SET_ITEM_SEL').map(),
    // Supplier
    supplier_from: takeState('inventory', 'supplier_from').map(),
    supplier_select: takeState('inventory', 'supplier_select').commit('inventory/SET_SUP_SEL').map(),
    // Warehouse
    warehouse_to: takeState('inventory', 'warehouse_to').map(),
    items: takeState('inventory', 'itemWar').commit('inventory/SET_ITEM_WAR').map(),
    mainwarehouse: takeState('inventory', 'mainwarehouse').commit('inventory/SET_ITEM_MAINWAR').map(),
    warehouse_select: takeState('inventory', 'warehouse_select').commit('inventory/SET_WAR_SEL').map(),
    waybill: takeState('inventory', 'waybill').commit('inventory/SET_WAY_BILL').map(),
    qntty_item: takeState('inventory', 'qntty_item').commit('inventory/SET_QNTTY_ITEM').map(),
    inv_date: takeState('inventory', 'inv_date').commit('inventory/SET_INV_DATE').map(),
    inv_comments: takeState('inventory', 'inv_comments').commit('inventory/SET_INV_CMMNTS').map(),
    isinv: takeState('inventory', 'isinv').commit('inventory/SET_ISINV').map(),
  },
  methods: {
    additemsave() {
      return new Promise((resolve, reject) => {
        this.$refs.AddItemRules.validate().then(success => {
          if (success) {
            this.$swal({
              title: 'Add Items',
              text: `Are you sure you want to transfer ${this.qntty_item} Kits to ${this.warehouse_select.title} warehouse?`,
              icon: 'info',
              showCancelButton: true,
              confirmButtonText: 'Yes!',
              customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-outline-warning ml-1',
              },
              buttonsStyling: false,
            }).then(result => {
              if (result.value) {
                this.$store.dispatch('inventory/ADD_WAREHOUSE_ITEMS', {
                  type: this.$route.params.assmnttype,
                  prefix: this.$route.params.prefixPrj,
                  prefixRole: this.$route.params.prefixRole,
                }).then(res => {
                  if (res === 1) {
                    this.$swal({
                      icon: 'success',
                      title: 'Done!',
                      text: `${this.qntty_item} kits were Added successfully to ${this.warehouse_select.org_name} ${this.warehouse_select.wh_name} warehouse`,
                      customClass: {
                        confirmButton: 'btn btn-success',
                      },
                    })
                    this.Refresh()
                    this.resetall()
                  } else {
                    this.$toast({
                      component: ToastificationContent,
                      props: {
                        title: 'Contact System administrator',
                        icon: 'EditIcon',
                        text: 'Enernal Error',
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
              }
            })
            resolve(true)
          } else {
            reject()
          }
        })
      })
    },
    resetall() {
      this.item_select = []
      this.supplier_select = []
      this.waybill = ''
      this.warehouse_select = []
      this.qntty_item = 1
      this.inv_date = ''
      this.inv_comments = ''
      this.isinv = false
    },
    Refresh() {
      this.$store.dispatch('inventory/GET_INVENTORY_LIST', {
        type: this.$route.params.assmnttype,
        prefix: this.$route.params.prefixPrj,
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
