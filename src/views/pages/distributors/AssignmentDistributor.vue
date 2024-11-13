<template>
  <b-card>

    <b-card-body class="p-1">
      <b-row align-h="between">
        <b-col cols="10">
          <h1>Assignement:</h1>
        </b-col>
        <b-col cols="2">
          <b-button
            variant="info"
            @click="ResetData()"
          >
            Refresh
          </b-button>
        </b-col>
      </b-row>
      <b-row align-h="between">
        <b-col cols="10">
          <h2> Items:</h2>
        </b-col>
      </b-row>
      <br>
      <b-row>

        <b-col
          v-for="kit in kits"
          :key="kit.items_id"
          md="3"
          sm="6"
        >
          <b-media no-body>
            <b-media-aside
              class="mr-2"
            >
              <b-avatar
                size="48"
                variant="success"
              >
                <feather-icon
                  size="24"
                  icon="BoxIcon"
                />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h4 class="font-weight-bolder mb-0">
                {{ kit.items_name }}
              </h4>
              <b-card-text class="font-small-3 mb-0">
                Qty: {{ kit.quantity }}
              </b-card-text>
            </b-media-body>
          </b-media>
          <br>
        </b-col>
      </b-row>
      <div v-if="listAssgn.length>0">
        <div
          v-for="(item) in listAssgn"
          :key="item.id"
        >
          <br>
          <hr>
          <b-row>
            <b-col>
              <h5>{{ item.case_code }}</h5>
              <h5>{{ item.full_name }}({{ item.nationality_name }})</h5>
              <h4><a
                target="_blank"
                :href="'https://wa.me/' + item.case_phone"
              >{{ item.case_phone }}</a></h4>
            </b-col>
            <b-col>

              <p> Cadaster: {{ item.cadastre_name }}</p>
              <p>Address: {{ item.adresstext }}</p>
              <a
                target="_blank"
                :href="'https://www.google.com/maps/@'+ item.lat+','+ item.long+',15z'"
              >
                <span>Lat: {{ item.lat }}, Long: {{ item.long }} </span>
              </a>

            </b-col>
            <b-col v-if="!haskits">
              <h4 class="text-danger">
                You don't have items
              </h4>
            </b-col>
            <b-col v-else-if="requestItem.length ===0">
              <b-button
                block
                variant="success"
                @click="Delivery(item)"
              >
                Delivery
              </b-button>
              <b-button
                block
                variant="danger"
                @click="NoDelivery(item)"
              >
                Not Delivery
              </b-button>
            </b-col>
            <b-col v-else>
              <h4 class="text-danger">
                You have request
              </h4>
            </b-col>
          </b-row>
        </div>

      </div>
      <div v-else>
        <h2 class="text-center">
          You don't have any task
        </h2>
      </div>
    </b-card-body>
    <DeliveryModal />
    <NotDeliveryModal />
  </b-card>
</template>

<script>
import { takeState } from 'vuex-dot'
import DeliveryModal from './DeliveryModal.vue'
import NotDeliveryModal from './NotDeliveryModal.vue'

export default {
  components: {
    NotDeliveryModal,

    DeliveryModal,
  },
  computed: {
    listAssgn: takeState('distributor', 'listAssgn').map(),
    caseSelect: takeState('distributor', 'caseSelect').commit('distributor/SET_SELECT_CASE').map(),
    showDelivery: takeState('distributor', 'showDelivery').commit('distributor/SET_SHOW_DELIVERY').map(),
    showNotDelivery: takeState('distributor', 'showNotDelivery').commit('distributor/SET_SHOW_NOT_DELIVERY').map(),
    deliveryKit: takeState('distributor', 'deliveryKit').commit('distributor/SET_DELV_KIT').map(),
    kits: takeState('distributor', 'kits').map(),
    requestItem: takeState('distributor', 'requestItem').map(),
    haskits() {
      let haskits = 0
      this.kits.forEach(element => {
        haskits += element.quantity
      })
      return haskits > 0
    },
  },
  mounted() {

  },
  methods: {
    Delivery(item) {
      console.log('Delv', item)
      this.caseSelect = item
      this.deliveryKit = this.kits
      this.showDelivery = true
    },

    NoDelivery(item) {
      console.log('notDelv', item)
      this.caseSelect = item
      this.showNotDelivery = true
    },
    ResetData() {
      this.$store.dispatch('distributor/GET_DATA', {
        prefix: this.$route.params.prefixPrj,
        prefixRole: this.$route.params.prefixRole,
        type: this.$route.params.assmnttype,
      })
    },
  },
}
</script>
