<template>
  <b-card>

    <b-card-body>
      <b-row align-h="between">
        <b-col cols="10">
          <h1>Inventory:</h1>
        </b-col>
        <b-col cols="2">
          <b-button
            variant="info"
            @click="ResetData"
          >
            Refresh
          </b-button>
        </b-col>
      </b-row>

      <br>
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
      <b-row align-h="between">
        <b-col cols="10">
          <h2> Request Items:</h2>
        </b-col>
      </b-row>
      <div v-if="requestItem.length>0">
        <div
          v-for="(item) in requestItem"
          :key="item.id"
        >
          <br>
          <b-row>
            <b-col>
              <h5>{{ item.title }}</h5>
            </b-col>
            <b-col>
              Quantity: {{ item.qty }}
            </b-col>
            <b-col>
              From Warehouse: {{ item.wh_name }}
            </b-col>
            <b-col>
              <b-button
                variant="success"
                @click="confirm(item)"
              >
                Confirm
              </b-button>
              <!-- <b-button
                variant="danger"
                @click="reject(item)"
              >
                Reject
              </b-button>-->
            </b-col>
          </b-row>
        </div>

      </div>
      <div v-else>
        <h2 class="text-center">
          You not have any request
        </h2>
      </div>

    </b-card-body>

  </b-card>
</template>

<script>
import { takeState } from 'vuex-dot'

export default {
  computed: {
    requestItem: takeState('distributor', 'requestItem').map(),
    kits: takeState('distributor', 'kits').map(),

  },
  methods: {
    confirm(item) {
      console.log('confirm', item)
      this.$store.dispatch('distributor/ConfirmReject', {
        prefix: this.$route.params.prefixPrj,
        prefixRole: this.$route.params.prefixRole,
        type: this.$route.params.assmnttype,
        item,
        isConfirm: true,
      })
    },
    reject(item) {
      console.log('reject', item)
      this.$store.dispatch('distributor/ConfirmReject', {
        prefix: this.$route.params.prefixPrj,
        prefixRole: this.$route.params.prefixRole,
        type: this.$route.params.assmnttype,
        item,
        isConfirm: false,
      })
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
