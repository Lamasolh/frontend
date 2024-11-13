<template>
  <div>
    <b-overlay
      rounded="lg"
      :show="show"
    >
      <validation-observer ref="simpleRules">
        <b-card>
          <b-row class="mb-1">
            <b-col>
              GRN Report (Good Received Note)
            </b-col>
          </b-row>
          <b-row
            class="mb-1"
          >
            <b-col cols="3">
              <validation-provider
                v-slot="{ errors }"
                rules="required"
                name="Date Range"
              >
                <b-form-group label="Select Month">
                  <flat-pickr
                    v-model="range"
                    class="form-control"
                    :config="config"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>

            </b-col>
            <!-- Gov -->
            <b-col cols="3">
              <validation-provider
                v-slot="{ errors }"
                rules="required"
                name="Governorate"
              >
                <b-form-group label="Governorate">
                  <v-select
                    v-model="governorate"
                    label="title"
                    placeholder="ALL"
                    :state="errors.length > 0 ? false : null"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="governorateOption"
                    @input="(value) => ChangeGovItem(value)"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>

                </b-form-group>
              </validation-provider>
            </b-col>
            <!-- District -->
            <b-col cols="3">
              <validation-provider
                v-slot="{ errors }"
                rules="required"
                name="District"
              >
                <b-form-group label="District">
                  <v-select
                    v-model="district"
                    placeholder="ALL"
                    label="title"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="districtSelect"
                    :state="errors.length > 0 ? false : null"
                    @input="(value) => ChangeDistrict(value)"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>

                </b-form-group>
              </validation-provider>
            </b-col>
            <!-- Cadaster -->
            <b-col cols="3">
              <b-form-group label="Cadaster">
                <v-select
                  v-model="cadaster"
                  placeholder="ALL"
                  multiple
                  :close-on-select="false"
                  :append-to-body="true"
                  label="title"

                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="cadOptions"
                />
              </b-form-group>
            </b-col>
            <b-col cols="3">
              <validation-provider
                v-slot="{ errors }"
                rules="required"
                name="Supplier"
              >
                <b-form-group label="Supplier">
                  <v-select
                    id="supplier"
                    v-model="supplier"
                    label="title"
                    placeholder="Select Supplier"
                    :clearable="false"
                    :state="errors.length > 0 ? false : null"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="supL"
                  />
                  <small class="text-danger mb-1">{{
                    errors[0]
                  }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col cols="3">
              <validation-provider
                v-slot="{ errors }"
                rules="required"
                name="PD"
              >
                <b-form-group label="PD">
                  <v-select
                    id="PD"
                    v-model="pd"
                    label="title"
                    placeholder="Select PD"
                    :clearable="false"
                    :state="errors.length > 0 ? false : null"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="pdList"
                  />
                  <small class="text-danger mb-1">{{
                    errors[0]
                  }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col
              cols="3"
              class="mt-2"
            >
              <b-button
                variant="primary"
                block
                @click="GetGRN"
              >
                Get GRN
              </b-button>
            </b-col>
            <b-col
              cols="3"
              class="mt-2"
            >
              <b-button
                variant="success"
                block
                @click="ExportToPDF"
              >
                Export PDF
              </b-button>
            </b-col>
          </b-row>

        </b-card>
        <b-card>
          <div id="element-to-convert">
            <b-container>
              <b-row>
                <b-col cols="4">
                  <div class="d-flex align-items-center">
                    <img
                      src="@/assets/images/logo/logo.png"
                      alt="Logo"
                    >
                    <span>
                      <h2 class="brand-text text-primary">
                        RDMS
                      </h2>
                    </span>
                  </div>
                </b-col>

                <b-col
                  cols="8"
                  class="text-center d-flex flex-column align-items-center justify-content-center bg_color_card"
                  style="border: 2px solid; color: #000;"
                >
                  <h3 style="color: #000;">
                    GOODS RECEIVED NOTE (GRN)
                  </h3>
                </b-col>
              </b-row>
            </b-container>
            <br>
            <!--<div
          class="d-flex align-items-center justify-content-between"
          style="border: 2px solid; height: 50px; color: #000;"
        >
          <div
            class="col-2 d-flex align-items-center justify-content-center"
            style="border: 1px solid; height: 50px; color: #000;"
          >
            <strong>Line Code:</strong> ......
          </div>
          <div class="col-10">
            <strong>Line Name:</strong> ....
          </div>
        </div>
        <br>-->

            <b-row>
              <b-col
                cols="5"
                class="text-left"
              >
                <div style="border: 2px solid; color: #000;">
                  <div style="border: 1px solid; color: #000;">
                    <span style="margin-left: 2px">GRN Number:</span>
                    <span>{{ itemGRN.length ===0? '': JSON.stringify(itemGRN[0]) ==null?'':JSON.parse(JSON.stringify(itemGRN[0])).GRN_code }}</span>
                  </div>

                  <div style="border: 1px solid; color: #000;">
                    <span style="margin-left: 2px">Supplier:</span>
                    <span>{{ itemGRN.length ===0? '': JSON.stringify(itemGRN[0]) ==null?'':JSON.parse(JSON.stringify(itemGRN[0])).supl_name }}</span>
                  </div>
                </div>
              </b-col>
              <b-col cols="1" />
              <b-col
                cols="6"
                class="text-left"
              >
                <div style="border: 2px solid; color: #000;">
                  <div style="border: 1px solid; color: #000;">
                    <strong style="margin-left: 2px">Project Id:</strong>
                    <span>{{ itemGRN.length ===0? '': JSON.stringify(itemGRN[0]) ==null?'':JSON.parse(JSON.stringify(itemGRN[0])).project }}</span>
                  </div>
                  <div style="border: 1px solid; color: #000;">
                    <span style="margin-left: 2px">Contract:</span>
                    <span>{{ itemGRN.length ===0? '': JSON.stringify(itemGRN[0]) ==null?'':JSON.parse(JSON.stringify(itemGRN[0])).pd_code }}</span>
                  </div>
                </div>
              </b-col>
            </b-row>
            <br>
            <table style="width: 100%; border: 2px solid black; color: #000;">
              <thead>
                <tr
                  style=" border-bottom: 1px solid black;"
                  class="bg_color_card"
                >
                  <th style="border: 1px solid black; text-align: center; color: #000;">
                    #
                  </th>
                  <th style="border: 1px solid black; text-align: center; color: #000;">
                    Cadaster
                  </th>
                  <th style="border: 1px solid black; text-align: center; color: #000;">
                    Donor
                  </th>
                  <th style="border: 1px solid black; text-align: center; color: #000;">
                    Unit
                  </th>
                  <th style="border: 1px solid black; text-align: center; color: #000;">
                    Quantity Requested
                  </th>
                  <th style="border: 1px solid black; text-align: center; color: #000;">
                    Quantity Received
                  </th>
                  <th style="border: 1px solid black; text-align: center; color: #000;">
                    Unit Price
                  </th>
                  <th style="border: 1px solid black; text-align: center; color: #000;">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="n in 25"
                  :key="n"
                >
                  <td style="border: 1px solid black; text-align: center;">
                    {{ n }}
                  </td>
                  <td style="border: 1px solid black;">
                    <!---->
                    {{ itemGRN.length ===0? '': JSON.stringify(itemGRN[n-1]) ==null?'':JSON.parse(JSON.stringify(itemGRN[n-1])).cadastre_name }}
                  </td>
                  <td style="border: 1px solid black; text-align: center;">
                    {{ itemGRN.length ===0? '': JSON.stringify(itemGRN[n-1]) ==null?'':JSON.parse(JSON.stringify(itemGRN[n-1])).donor_name }}

                  </td>
                  <td style="border: 1px solid black; text-align: center;">
                    {{ itemGRN.length ===0? '': JSON.stringify(itemGRN[n-1]) ==null?'':JSON.parse(JSON.stringify(itemGRN[n-1])).unit }}

                  </td>
                  <td style="border: 1px solid black;text-align: center;">
                    {{ itemGRN.length ===0? '': JSON.stringify(itemGRN[n-1]) ==null?'':JSON.parse(JSON.stringify(itemGRN[n-1])).qnty_filed }}

                  </td>
                  <td style="border: 1px solid black;text-align: center;">
                    {{ itemGRN.length ===0? '': JSON.stringify(itemGRN[n-1]) ==null?'':JSON.parse(JSON.stringify(itemGRN[n-1])).qnty_recvd }}
                  </td>
                  <td style="border: 1px solid black;text-align: center;">
                    {{ itemGRN.length ===0? '': JSON.stringify(itemGRN[n-1]) ==null?'':JSON.parse(JSON.stringify(itemGRN[n-1])).amount_per_cbm }}

                  </td>
                  <td style="border: 1px solid black;text-align: center;">
                    {{ itemGRN.length ===0? '': JSON.stringify(itemGRN[n-1]) ==null?'':JSON.parse(JSON.stringify(itemGRN[n-1])).total_amout + '\$' }}

                  </td>

                </tr>

              </tbody>
            </table>
            <br>
            <div style="width: 100%; border: 2px solid black; color: #000; padding-left: 4px;">
              <h3 style="color: #000;">
                Remarks
              </h3>
              <p> Quantity delivered to Iss during</p>
            </div>
            <br>
            <b-row>
              <b-col
                cols="6"
                class="text-left"
              >
                <div style="border: 2px solid; color: #000;">
                  <div
                    style="border: 1px solid; color: #000;   text-align: center;"
                    class="bg_color_card"
                  >
                    Goods Delivered by
                  </div>
                  <div style="padding-left: 2px;">
                    <span>Name:</span>
                    <span>{{ itemGRN.length ===0? '': JSON.stringify(itemGRN[0]) ==null?'':JSON.parse(JSON.stringify(itemGRN[0])).supp_admin_name }}</span>

                  </div>
                  <div style="padding-left: 2px;">
                    <span>Position: Supplier</span>
                  </div>
                  <div style="padding-left: 2px;">
                    <span>Date:</span>
                    <span>{{ new Date().toISOString().slice(0, 10) }}</span>
                  </div>
                  <div style="padding-left: 2px;">
                    <span>Signatutre:</span>
                  </div>
                </div>
              </b-col>
              <b-col
                cols="6"
                class="text-left"
              >
                <div style="border: 2px solid; color: #000; ">
                  <div
                    style="border: 1px solid; color: #000;  text-align: center;"
                    class="bg_color_card"
                  >
                    Confirmed by
                  </div>
                  <div style="padding-left: 2px;">
                    <span>Name:</span>
                    <span>{{ itemGRN.length ===0? '': JSON.stringify(itemGRN[0]) ==null?'':JSON.parse(JSON.stringify(itemGRN[0])).full_name }}</span>

                  </div>
                  <div style="padding-left: 2px;">
                    <span>Position: Accounting</span>
                  </div>
                  <div style="padding-left: 2px;">
                    <span>Date:</span>
                    <span>{{ new Date().toISOString().slice(0, 10) }}</span>

                  </div>
                  <div style="padding-left: 2px;">
                    <span>Signatutre:</span>
                  </div>
                </div>
              </b-col>

            </b-row>
          </div>

        </b-card>
      </validation-observer>
    </b-overlay>
  </div>
</template>
<script>
import Ripple from 'vue-ripple-directive'
import { takeState } from 'vuex-dot'
import flatPickr from 'vue-flatpickr-component'
import html2pdf from 'html2pdf.js'
import 'flatpickr/dist/flatpickr.css'
import vSelect from 'vue-select'
import { ValidationProvider, ValidationObserver } from 'vee-validate'

// eslint-disable-next-line import/extensions
import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect/index.js'
import 'flatpickr/dist/plugins/monthSelect/style.css'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    flatPickr,
    vSelect,
    ValidationProvider,
    ValidationObserver,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      json_meta: [
        [
          {
            key: 'charset',
            value: 'utf-8',
          },
        ],
      ],
      config: {
        altInput: true,
        plugins: [
          monthSelectPlugin({
            shorthand: true,
            dateFormat: 'm-d-Y',
            altFormat: 'F Y',
          }),
        ],
      },
    }
  },
  computed: {
    show: takeState('accounting', 'show').commit('accounting/SET_SHOW').map(),
    supL: takeState('accounting', 'supL').map(),
    pdList: takeState('accounting', 'pdList').map(),

    itemGRN: takeState('accounting', 'itemGRN').map(),

    supplier: takeState('accounting', 'supplier').commit('accounting/SET_MOD_SUP').map(),

    pd: takeState('accounting', 'pd').commit('accounting/SET_MOD_PD').map(),

    range: takeState('accounting', 'range').commit('accounting/SET_RANGE').map(),
    governorateOption: takeState('accounting', 'govOptions').map(),
    districtOptions: takeState('accounting', 'disOptions').map(),
    cadOptions: takeState('accounting', 'cadOptions').commit('accounting/SET_CAD_OPT').map(),

    governorate: takeState('accounting', 'governorate').commit('accounting/SET_GOV').map(),
    district: takeState('accounting', 'district').commit('accounting/SET_DIS').map(),
    cadaster: takeState('accounting', 'cadaster').commit('accounting/SET_CAD').map(),
    districtSelect() {
      return this.districtOptions.filter(item => item.params
      === (this.governorate != null ? this.governorate.value : null))
    },

  },
  mounted() {
    this.ResetData()
  },
  methods: {
    ResetData() {
      this.$store.commit('accounting/Clear')
      this.$store.dispatch('accounting/GET_GRN_DATA', {
        prefix: this.$route.params.prefixPrj,
        prefixRole: this.$route.params.prefixRole,
      })
    },

    async ExportToPDF() {
      const element = document.getElementById('element-to-convert')

      const opt = {
        margin: 3,
        filename: 'GRN.pdf',
        image: {
          type: 'png',
          quality: 0.98,
        },
        html2canvas: {
          scale: 2,
          logging: true,
          dpi: 192,
          letterRendering: true,
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'p',
        },
      }
      html2pdf().from(element).set(opt).toPdf()
        .get('pdf')
        .then(pdf => {
          const totalPages = pdf.internal.getNumberOfPages()
          for (let i = 1; i <= totalPages; i += 1) {
            pdf.setPage(i)
            pdf.setFontSize(10)
            pdf.setTextColor(100)
            pdf.text(`Page ${i} of ${totalPages}`, (pdf.internal.pageSize.getWidth() / 2.3), (pdf.internal.pageSize.getHeight() - 10))
          }
        })
        .save()
    },
    ChangeGovItem(value) {
      this.district = null
      this.cadaster = null
      console.log(value)
      if (value != null) {
        this.$store.dispatch('accounting/GET_DIS', {
          prefix: this.$route.params.prefixPrj,
          prefixRole: this.$route.params.prefixRole,
        }).catch(() => {
          this.show = false

          this.$swal({
            title: 'Error!',
            text: 'Please Check internet and try again',
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        })
      } else {
        this.districtOptions = []
        this.cadOptions = []
      }
    },
    ChangeDistrict(value) {
      console.log(value)
      if (value != null) {
        this.$store.dispatch('accounting/GET_CAD', {
          prefix: this.$route.params.prefixPrj,
          prefixRole: this.$route.params.prefixRole,
        }).catch(() => {
          this.show = false
          this.$swal({
            title: 'Error!',
            text: 'Please Check internet and try again',
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        })
      } else {
        this.cadOptions = []
      }
    },
    GetGRN() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          console.log(this.$route.params.prefixPrj)
          this.$store
            .dispatch('accounting/GET_GRN', {
              proj_id: this.$route.params.prefixPrj,
            })
            .then(val => {
              console.log(val.res)
              if (val.res !== 1) {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Check Data',
                    icon: 'EditIcon',
                    variant: 'danger',
                  },
                })
              }
            })
        } else {
          this.$swal({
            title: 'Attention!',
            text: 'Missing Data',
            icon: 'warning',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        }
      })
    },
  },

}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';

.smallheight{
  min-height: 300px;
}
.card_r{
 background-color: #9ec5f0;
 border-style: solid;
 border-color: black;
 border-width: medium;
}
.bg_color_card{
 background-color: #9ec5f0;

}
.color_card{
color: #9ec5f0;

}
</style>
