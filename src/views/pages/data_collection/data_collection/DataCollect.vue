<template>
  <div>
    <b-overlay
      rounded="lg"
      :show="show"
    >
      <b-card>
        <b-row>
          <b-col
            md="6"
            sm="12"
            lg="10"
            xl="10"
          >
            <h1>Informal Settlement Name: {{ $route.params.value.is_name }}</h1>
            <h2>P-Code: {{ $route.params.value.p_code }}</h2>
            <br>
          </b-col>
          <b-col
            md="3"
            sm="6"
            lg="2"
            xl="2"
          >
            <b-card
              bg-variant="primary"
              text-variant="white"
              header="Tent"
              class="text-center"
            >
              <b-card-text><h2 class="text-white">
                {{ tentList.length }}
              </h2></b-card-text>
            </b-card>
          </b-col>

          <b-col
            md="3"
            sm="6"
            lg="2"
            xl="2"
          >
            <b-card
              bg-variant="warning"
              text-variant="white"
              header="Family"
              class="text-center"
            >
              <b-card-text><h2 class="text-white">
                {{ famList.length }}
              </h2></b-card-text>
            </b-card>

          </b-col>
          <b-col

            md="3"
            sm="6"
            lg="2"
            xl="2"
          >
            <b-card
              bg-variant="danger"
              text-variant="white"
              header="Member"
              class="text-center"
            >
              <b-card-text><h2 class="text-white">
                {{ memList.length }}
              </h2></b-card-text>
            </b-card>

          </b-col>
          <b-col
            md="3"
            sm="6"
            lg="2"
            xl="2"
          >
            <b-card
              bg-variant="info"
              text-variant="white"
              header="WaterSource"
              class="text-center"
            >
              <b-card-text><h2 class="text-white">
                {{ wtrList.length }}
              </h2></b-card-text>
            </b-card>

          </b-col>
          <b-col
            md="3"
            sm="6"
            lg="2"
            xl="2"
          >
            <b-card
              bg-variant="light"
              header="Tank"
              class="text-center"
            >
              <b-card-text><h2>
                {{ tankList.length }}
              </h2></b-card-text>
            </b-card>
          </b-col>

          <b-col
            md="3"
            sm="6"
            lg="2"
            xl="2"
          >
            <b-card
              bg-variant="secondary"
              text-variant="white"
              header="Pit"
              class="text-center"
            >
              <b-card-text><h2 class="text-white">
                {{ pitList.length }}
              </h2></b-card-text>
            </b-card>

          </b-col>
          <b-col
            md="3"
            sm="6"
            lg="2"
            xl="2"
          >
            <b-card
              bg-variant="dark"
              text-variant="white"
              header="Latrine"
              class="text-center"
            >
              <b-card-text><h2 class="text-white">
                {{ latList.length }}
              </h2></b-card-text>
            </b-card>

          </b-col>

        </b-row>
      </b-card>
      <b-card>
        <b-tabs
          pills
        >
          <b-tab
            active
            title="Family"
          >
            <DataCollectListFAM @refresh="ResetData" />
          </b-tab>
          <b-tab
            title="Members"
          >
            <DataCollectListMEM @refresh="ResetData" />

          </b-tab>
          <b-tab

            title="Tents"
          >
            <DataCollectListTent @refresh="ResetData" />
          </b-tab>

          <b-tab

            title="WaterSource"
          >
            <DataCollectListWaterSource @refresh="ResetData" />
          </b-tab>

          <b-tab
            title="Tanks"
          >
            <DataCollectListTNK @refresh="ResetData" />
          </b-tab>

          <b-tab
            title="Pits"
          >
            <DataCollectListPit @refresh="ResetData" />
          </b-tab>
          <b-tab
            title="Latrines"
          >
            <DataCollectListLAT @refresh="ResetData" />
          </b-tab>

        </b-tabs>

      </b-card>

    </b-overlay>
    <DataCollectListTentModal />
    <DataCollectListWTRModal />
    <DataCollectListPITModal />
    <DataCollectListLATModal />
    <DataCollectListTNKModal />
    <DataCollectListFAMModal />
    <DataCollectListMEMModal />
  </div>
</template>

<script>
import { takeState } from 'vuex-dot'
import DataCollectListTent from './tent/DataCollectListTent.vue'
import DataCollectListTentModal from './tent/DataCollectListTentModal.vue'

import DataCollectListWaterSource from './water_source/DataCollectListWaterSource.vue'
import DataCollectListWTRModal from './water_source/DataCollectListWTRModal.vue'

import DataCollectListPit from './pit/DataCollectListPit.vue'
import DataCollectListPITModal from './pit/DataCollectListPitModal.vue'

import DataCollectListLAT from './latrine/DataCollectListLat.vue'
import DataCollectListLATModal from './latrine/DataCollectListLatModal.vue'

import DataCollectListTNK from './tank/DataCollectListTank.vue'
import DataCollectListTNKModal from './tank/DataCollectListTankModal.vue'

import DataCollectListFAM from './family/DataCollectListFam.vue'
import DataCollectListFAMModal from './family/DataCollectListFamModal.vue'

import DataCollectListMEM from './members/DataCollectListMem.vue'
import DataCollectListMEMModal from './members/DataCollectListMemModal.vue'

export default {
  components: {
    DataCollectListTent,
    DataCollectListTentModal,
    DataCollectListWaterSource,
    DataCollectListWTRModal,
    DataCollectListPit,
    DataCollectListPITModal,
    DataCollectListLAT,
    DataCollectListLATModal,
    DataCollectListTNK,
    DataCollectListTNKModal,
    DataCollectListFAM,
    DataCollectListFAMModal,
    DataCollectListMEM,
    DataCollectListMEMModal,
  },
  computed: {
    show: takeState('dtMAIN', 'show').commit('dtMAIN/SET_SHOW').map(),
    saved: takeState('dtMAIN', 'saved').commit('dtMAIN/SET_SAVED').map(),
    wtrList: takeState('dtWTR', 'items').map(),
    pitList: takeState('dtPIT', 'items').map(),
    latList: takeState('dtLAT', 'items').map(),
    tentList: takeState('dtTNT', 'items').map(),
    tankList: takeState('dtTNK', 'items').map(),
    famList: takeState('dtFAM', 'items').map(),
    memList: takeState('dtMEM', 'items').map(),

  },
  mounted() {
    this.ResetData()
  },
  methods: {
    ResetData() {
      this.$store.dispatch('dtMAIN/REFRESH', {
        iss: this.$route.params.value.iss_id,
      })
    },
  },
}
</script>

  <style>
th > span {
  display: none
}
  </style>
