<template>
  <b-card
    class="card-statistics"
  >
    <b-row align-h="between">
      <b-col cols="6">
        <h2>Distributors Information For:</h2>
        <v-select
          v-model="itmdis"
          placeholder="Select a Item"
          label="itemName"
          :options="stasticItem"
          :clearable="false"
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
        />
      </b-col>

      <b-col
        cols="3"
      >
        <b-button
          variant="link"
          @click="Refresh"
        >
          Refresh
          <feather-icon
            icon="RefreshCcwIcon"
          />
        </b-button>
      </b-col>
    </b-row>
    <br>
    <b-overlay
      :show="show"
      rounded="sm"
    >
      <div
        v-for="(item,index) in items"
        :key="item.id"
      >
        <b-row
          md="3"
          sm="6"
          class="mb-2 mb-md-0"
          :class="customClass"
        >
          <b-col cols="6">
            <b-media no-body>
              <b-media-aside
                class="mr-2"
              >
                <b-avatar
                  size="48"
                  :variant="color"
                  :badge="Number(item.return)===0 && Number(item.total_kits) > 0 && Number(item.total_assignment) ===0"
                >
                  <template
                    v-if="Number(item.return)===0 && Number(item.total_kits) > 0 && Number(item.total_assignment) ===0"
                    slot="badge"
                  >
                    <feather-icon
                      size="16"
                      icon="BellIcon"
                      @click="Notify(item)"
                    />
                  </template>
                  <feather-icon
                    size="24"
                    :icon="icon"
                  />
                </b-avatar>
              </b-media-aside>
              <br>
              <b-media-body class="my-auto">
                <h4 class="font-weight-bolder mb-0">
                  {{ item.title }}
                </h4>
                <b-card-text
                  class="font-weight-bolder mb-0"
                  style="color:#DD831C"
                >
                  {{ item.subtitle }}
                </b-card-text>
              </b-media-body>
            </b-media>

          </b-col>
          <b-col
            cols="2"
          >
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="success"
              class="mr-1 mt-1"
              block
              :disabled="Number(item.request) >0 || Number(item.return)>0 || Number(item.total_assignment) ===0 || Number(item.total_kits) >= Number(item.total_assignment)"
              @click="request(item, index)"
            >
              Request
            </b-button>
          </b-col>
          <b-col
            cols="2"
          >
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="danger"
              block
              :disabled="Number(item.request) === 0 && Number(item.return) === 0"
              class="mr-1 mt-1"
              @click="CancelRequest(item, index)"
            >
              Cancel Request
            </b-button>
          </b-col>
          <b-col
            cols="2"
          >
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="warning"
              class="mr-1 mt-1"
              :disabled="Number(item.return) === 0 || Number(item.request) >0|| Number(item.total_kits) ===0 "
              @click="returnS(item, index)"
            >
              Return Approve
            </b-button>
          </b-col>
        </b-row>
        <hr>

      </div>
      <!-- <b-row align-h="between">
        <b-col
          cols="4"
          xl="3"
          md="5"
          sm="7"
        >
          <statistic-card-vertical
            icon="BoxIcon"
            :statistic="`${total_kits} ${total_kits < 1 ? ' Kit': ' Kits'}`"
            statistic-title="Total Kits In Warehouse"
            color="danger"
          />
        </b-col>
        <b-col
          cols="3"
          xl="3"
          md="5"
          sm="7"
        >
          <statistic-card-vertical
            icon="TruckIcon"
            :statistic="`${dis_total_kits} ${dis_total_kits < 1 ? ' Kit': ' Kits'}`"
            statistic-title="Total Kits With Distributors"
            color="info"
          />
        </b-col>
        <b-col
          cols="5"
          xl="5"
          md="5"
          sm="7"
        >
          <statistic-card-vertical
            icon="ClockIcon"
            :statistic="`${total_assignment} ${total_assignment < 1 ? ' Assignments' : ' Assignment'}`"
            statistic-title="Pending Assignments"
            color="warning"
          />
        </b-col>
        <b-row>
          <b-col>
            <statistic-card-vertical
              icon="ShuffleIcon"
              :statistic="Number(total_request) + Number(total_return)"
              statistic-title="Handin/Return Requests"
              color="success"
            />
          </b-col>
        </b-row>
      </b-row>-->

      <div v-if="itmdis!=null">
        <Card-General-Info
          :item-name="itmdis.itemName"
          :info-items="itmdis.listStat"
        />
        <hr>
        <Card-General-Info
          item-name="Assignments"
          :info-items="assign"
        />
      </div>
    </b-overlay>
    <RequestModal />
    <ReturnModal />
  </b-card>
</template>

<script>

import Ripple from 'vue-ripple-directive'
// import StatisticCardVertical from '@core/components/statistics-cards/StatisticCardVertical.vue'
import { takeState } from 'vuex-dot'
import RequestModal from '@/views/pages/inventory/ModalRequest.vue'
import ReturnModal from '@/views/pages/inventory/ModalReturn.vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import vSelect from 'vue-select'
import CardGeneralInfo from './CardGeneralInfo.vue'

export default {
  components: {
    // StatisticCardVertical,
    CardGeneralInfo,
    RequestModal,
    ReturnModal,
    vSelect,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      icon: 'TruckIcon',
      color: 'light-info',
      customClass: 'mb-4 mb-xl-1',
    }
  },

  computed: {
    itemss: takeState('inventory', 'items').map(),
    show: takeState('inventory', 'show').map(),
    total_assignment: takeState('inventory', 'total_assignment').map(),
    stasticItem: takeState('inventory', 'stasticItem').map(),

    dis_total_kits: takeState('inventory', 'dis_total_kits').map(),
    total_request: takeState('inventory', 'total_request').map(),
    total_return: takeState('inventory', 'total_return').map(),
    total_kits: takeState('inventory', 'total_kits').map(),
    currentorg: takeState('inventory', 'currentOrg').map(),

    itmdis: takeState('inventory', 'itmdis').commit('inventory/SET_ITEM_DIS').map(),
    items() {
      console.log('itemdis', this.itmdis)
      if (this.itmdis == null) {
        return []
      }
      if (this.itemss.length === 0) {
        return []
      }
      const ss = this.stasticItem.filter(ee => ee.itemId === this.itmdis.itemId)[0]
      const ssss = this.itemss.filter(ee => ee[1] === ss.itemId)[0][0]
      console.log('ssss', ssss)
      return ssss
    },
    assign() {
      return [{
        icon: 'ClockIcon',
        color: 'light-warning',
        title: `${this.total_assignment} Case`,
        subtitle: 'Pending',
        customClass: '',
      }]
    },
    ///
    showModalReq: takeState('inventory', 'showModalReq').commit('inventory/SET_SHOW_REQ').map(),
    showModalReturn: takeState('inventory', 'showModalReturn').commit('inventory/SET_SHOW_RET').map(),
    showModalCancelReq: takeState('inventory', 'showModalCancelReq').commit('inventory/SET_SHOW_REQ_CANCEL').map(),
    selecteduser: takeState('inventory', 'selecteduser').commit('inventory/SET_REQ_USR').map(),

  },

  methods: {
    Refresh() {
      this.$store.dispatch('inventory/GET_INVENTORY_LIST', {
        prefix: this.$route.params.prefixPrj,
        type: this.$route.params.assmnttype,
      })
    },
    returnS(item) {
      console.log('returnS', item)
      this.$swal({
        text: `Are you sure you want to approve the return of ${item.return} kits to warehouse?`,
        title: 'Return Request',
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
          this.$store.dispatch('inventory/REQUEST_RETURN_APPROVE', {
            prefix: this.$route.params.prefixPrj,
            prefixRole: this.$route.params.prefixRole,
            type: this.$route.params.assmnttype,
            item,
            req_id: item.rqst_id,
          }).then(res => {
            console.log('res', res)
            if (res === 1) {
              this.showModalReturn = {
                active: false,
              }
              this.$swal({
                icon: 'success',
                title: 'Done!',
                text: `${item.return} Kits were returned successfully to ${this.currentorg.title} warehouse from distributor (${item.subtitle == null ? '' : item.subtitle}).`,
                customClass: {
                  confirmButton: 'btn btn-success',
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
      /* this.showModalReturn = {
        active: true,
        index,
        item,
      } */
    },
    request(item, index) {
      console.log('request', item)

      this.showModalReq = {
        active: true,
        index,
        item,
      }
    },
    Notify(item) {
      console.log(item)
      this.$swal({
        title: `Are you sure you want to send notification to ${item.subtitle} to return kits to warehouse(${this.itmdis.itemName})?`,
        text: 'Return Notification',
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
          this.$store.dispatch('inventory/SEND_NOTIFICATION', {
            prefix: this.$route.params.prefixPrj,
            type: this.$route.params.assmnttype,
            id: item.id,
          }).then(() => {
            this.$swal({
              icon: 'success',
              title: 'Done!',
              text: `${item.return} Notification sent successfully.`,
              customClass: {
                confirmButton: 'btn btn-success',
              },
            })
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
    },
    CancelRequest(item) {
      console.log('item', item, 'total request', this.total_request, 'total return', this.total_return)
      let rqtsType = ''
      if (item.request > item.return) {
        rqtsType = 'HANDIN'
      } else if (item.request < item.return) {
        rqtsType = 'RETURN'
      } else {
        rqtsType = ''
      }
      this.$swal({
        text: `Are you sure you want to Cancel the ${rqtsType}(${this.itmdis.itemName}) request?`,
        title: 'Request Cancellation',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-warning ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.selecteduser = item.id
          this.$store.dispatch('inventory/REQUEST_CANCELLATION', {
            prefix: this.$route.params.prefixPrj,
            prefixRole: this.$route.params.prefixRole,
            type: this.$route.params.assmnttype,
            req_id: item.rqst_id,
          }).then(res => {
            if (res === 1) {
              this.showModalReq = {
                active: false,
              }
              this.$swal({
                icon: 'success',
                title: 'Done!',
                text: `${rqtsType} request cancelled successfully`,
                customClass: {
                  confirmButton: 'btn btn-success',
                },
              })
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
    },
  },
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
