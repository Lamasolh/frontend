<template>
  <div ref="GSPLTADV">
    <b-overlay
      rounded="lg"
      :show="show"
    >
      <iss-modalm />
      <Supplier :is-add-new-user-sidebar-active.sync="isAssignSidebarActive" />
      <SupplierAdd
        :is-add-new-user-sidebar-active.sync="isAssignSidebarActiveADD"
      />

      <Donor :is-add-new-user-sidebar-active.sync="isAssignSidebarActiveDon" />
      <DonorAdd
        :is-add-new-user-sidebar-active.sync="isAssignSidebarActiveADDDon"
      />

      <PD :is-add-new-user-sidebar-active.sync="isAssignSidebarActivePD" />
      <PDAdd
        :is-add-new-user-sidebar-active.sync="isAssignSidebarActiveADDPD"
      />

      <WtrSetting />
      <wtr-list />

    </b-overlay>
  </div>
</template>
<script>
import { takeState } from 'vuex-dot'
import WtrSetting from './SettingPM.vue'
import WtrList from './ListPM.vue'
import Supplier from './SupplierPM.vue'
import SupplierAdd from './AddSupplier.vue'
import Donor from './DonorPM.vue'
import DonorAdd from './AddDonor.vue'
import IssModalm from './IssModal.vue'
import PD from './PDPM.vue'
import PDAdd from './AddPD.vue'

export default {
  components: {
    WtrSetting,
    WtrList,
    Supplier,
    SupplierAdd,
    Donor,
    DonorAdd,
    PD,
    PDAdd,
    IssModalm,
  },
  computed: {
    saved: takeState('listPMSetPrj', 'saved')
      .commit('listPMSetPrj/SET_SAVED')
      .map(),
    show: takeState('listPMSetPrj', 'show')
      .commit('listPMSetPrj/SET_SHOW')
      .map(),
    isAssignSidebarActive: takeState('listPMSetPrj', 'isAssignSidebarActive')
      .commit('listPMSetPrj/SET_ASS_TO')
      .map(),
    isAssignSidebarActiveADD: takeState(
      'listPMSetPrj',
      'isAssignSidebarActiveADD',
    )
      .commit('listPMSetPrj/SET_ADD_SIDE')
      .map(),

    isAssignSidebarActiveDon: takeState('listPMSetPrj', 'isAssignSidebarActiveDon')
      .commit('listPMSetPrj/SET_ASS_TO_DON')
      .map(),
    isAssignSidebarActiveADDDon: takeState(
      'listPMSetPrj',
      'isAssignSidebarActiveADDDon',
    )
      .commit('listPMSetPrj/SET_ADD_SIDE_DON')
      .map(),

    isAssignSidebarActivePD: takeState('listPMSetPrj', 'isAssignSidebarActivePD')
      .commit('listPMSetPrj/SET_ASS_TO_PD')
      .map(),
    isAssignSidebarActiveADDPD: takeState('listPMSetPrj', 'isAssignSidebarActiveADDPD')
      .commit('listPMSetPrj/SET_ADD_SIDE_PD')
      .map(),

    showModalIss: takeState('listPMSetPrj', 'showModalIss').commit('listPMSetPrj/SET_MOD_SUP_ISS').map(),

  },
  mounted() {
    this.ResetData()
  },
  methods: {
    ResetData() {
      this.$store.commit('listPMSetPrj/Clear')
      this.$store
        .dispatch('listPMSetPrj/GET_DATA', {
          prefix: this.$route.params.value.proj_prefix,
          prefixRole: this.$route.params.prefixRole,
        })
    },
  },
}
</script>
