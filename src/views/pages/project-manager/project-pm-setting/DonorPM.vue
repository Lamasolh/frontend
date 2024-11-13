<template>
  <b-sidebar
    id="sidebar"
    ref="assign"
    :visible="isAssignSidebarActiveDon"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @change="(val) => (isAssignSidebarActiveDon = val)"
  >
    <template #default="{ hide }">
      <b-overlay
        rounded="lg"
        :show="show"
        style="height: 100%"
      >
        <!-- Header -->
        <div
          class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1"
        >
          <h5 class="mb-0">
            Donors
          </h5>

          <feather-icon
            class="ml-1 cursor-pointer"
            icon="XIcon"
            size="16"
            @click="hide"
          />
        </div>
        <!-- BODY -->
        <validation-observer
          v-slot="{ handleSubmit }"
          ref="refFormObserver"
        >
          <!-- Form -->
          <b-form
            class="p-2"
            @submit.prevent="handleSubmit(onSubmit)"
          >
            <!-- Donor-->
            <b-row>
              <b-col>
                <span class="text-muted">
                  Total Donors: {{ donList == null ? 0 : donList.length }}
                </span>
                <b-table
                  ref="assignTable"
                  striped
                  hover
                  :items="donList"
                  :fields="donField"
                  :busy="show"
                  bordered
                  small
                  :selected-variant="
                    $store.state.appConfig.layout.skin === 'dark'
                      ? 'active'
                      : 'primary'
                  "
                  empty-text="No matching records found"
                  show-empty
                  responsive="lg"
                >
                  <template #table-busy>
                    <div class="text-center text-primary my-2">
                      <b-spinner class="align-middle" />
                      <strong>Loading...</strong>
                    </div>
                  </template>
                  <template #cell(deactive)="row">
                    <b-button
                      v-if="row.item.active === 1"
                      size="sm"
                      class="mr-2"
                      block
                      variant="danger"
                      @click="deActive(row)"
                    >
                      Deactive
                    </b-button>
                    <b-button
                      v-else
                      size="sm"
                      class="mr-2"
                      block
                      variant="success"
                      @click="Active(row)"
                    >
                      Active
                    </b-button>
                  </template>
                  <!--  <template #cell(Name)="row">
                      <p>{{ row.item.Name }}</p>
                    </template>-->
                </b-table>
              </b-col>
            </b-row>

            <br>
            <br>
            <b-row align-h="end">
              <b-col cols="4">
                <b-button
                  variant="warning"
                  block
                  @click="lookupDonnor"
                >
                  <b-icon
                    icon="search"
                    class="mr-1"
                  />
                  Lookup
                </b-button>
              </b-col>
              <!--
              <b-col cols="4">
                <b-button
                  variant="success"
                  block
                  @click="isAssignSidebarActiveADDDon = true"
                >
                  <b-icon
                    icon="plus"
                    class="mr-1"
                  />
                  Add Donor
                </b-button>
              </b-col>
              -->
            </b-row>
          </b-form>
        </validation-observer>
      </b-overlay>
      <lookup-don-modal />
      <lookup-don-accept-modal />

    </template>
  </b-sidebar>
</template>
<script>
import { ValidationObserver } from 'vee-validate'
import { takeState } from 'vuex-dot'
import LookupDonModal from './LookupDonModal.vue'
import LookupDonAcceptModal from './LookupDonAcceptModal.vue'

export default {
  components: {
    ValidationObserver,
    LookupDonModal,
    LookupDonAcceptModal,
  },
  computed: {
    show: takeState('listPMSetPrj', 'show')
      .commit('listPMSetPrj/SET_SHOW')
      .map(),
    donList: takeState('listPMSetPrj', 'itemsDON').map(),
    donField: takeState('listPMSetPrj', 'itemFieldDON').map(),

    isAssignSidebarActiveDon: takeState('listPMSetPrj', 'isAssignSidebarActiveDon')
      .commit('listPMSetPrj/SET_ASS_TO_DON')
      .map(),
    isAssignSidebarActiveADDDon: takeState(
      'listPMSetPrj',
      'isAssignSidebarActiveADDDon',
    )
      .commit('listPMSetPrj/SET_ADD_SIDE_DON')
      .map(),
    showModalDonorLook: takeState('listPMSetPrj', 'showModalDonorLook').commit('listPMSetPrj/SET_MOD_DONOR_LOOK').map(),
    lookupDonorPhone: takeState('listPMSetPrj', 'lookupDonorPhone').commit('listPMSetPrj/SET_PHONE_DON_LOOK').map(),

  },
  methods: {
    lookupDonnor() {
      this.$store.commit('listPMSetPrj/RESET_DON')

      this.lookupDonorPhone = null
      this.showModalDonorLook = {
        active: true,
      }
    },
    onRowSelected(items) {
      this.selectedUserCase = items
    },
    selectAllRows() {
      this.$refs.assignTable.selectAllRows()
    },
    unselectAllRows() {
      this.$refs.assignTable.clearSelected()
    },

  },
}
</script>

  <style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

#sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
  width: 45em;
}
</style>
