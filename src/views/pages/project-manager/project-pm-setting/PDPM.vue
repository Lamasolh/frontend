<template>
  <b-sidebar
    id="sidebar"
    ref="assign"
    :visible="isAssignSidebarActivePD"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @change="(val) => (isAssignSidebarActivePD = val)"
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
            PD's
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
            <!-- PD-->
            <b-row>
              <b-col>
                <span class="text-muted">
                  Total PD's: {{ pdList == null ? 0 : pdList.length }}
                </span>
                <b-table
                  ref="assignTable"
                  striped
                  hover
                  :items="pdList"
                  :fields="pdField"
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

                  <!--  <template #cell(Name)="row">
                      <p>{{ row.item.Name }}</p>
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
                  </template>-->

                </b-table>
              </b-col>
            </b-row>

            <br>
            <br>
            <b-row align-h="end">
              <b-col cols="4">
                <b-button
                  variant="success"
                  block
                  @click="isAssignSidebarActiveADDPD = true"
                >
                  <b-icon
                    icon="plus"
                    class="mr-1"
                  />
                  Add PD
                </b-button>
              </b-col>
            </b-row>
          </b-form>
        </validation-observer>
      </b-overlay>
    </template>
  </b-sidebar>
</template>
<script>
import { ValidationObserver } from 'vee-validate'
import { takeState } from 'vuex-dot'

export default {
  components: {
    ValidationObserver,
  },
  computed: {
    show: takeState('listPMSetPrj', 'show')
      .commit('listPMSetPrj/SET_SHOW')
      .map(),
    pdList: takeState('listPMSetPrj', 'itemsPD').map(),
    pdField: takeState('listPMSetPrj', 'itemFieldPD').map(),

    isAssignSidebarActivePD: takeState('listPMSetPrj', 'isAssignSidebarActivePD')
      .commit('listPMSetPrj/SET_ASS_TO_PD')
      .map(),
    isAssignSidebarActiveADDPD: takeState(
      'listPMSetPrj',
      'isAssignSidebarActiveADDPD',
    )
      .commit('listPMSetPrj/SET_ADD_SIDE_PD')
      .map(),

  },
  methods: {
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
