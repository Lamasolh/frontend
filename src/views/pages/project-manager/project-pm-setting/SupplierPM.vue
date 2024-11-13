<template>
  <b-sidebar
    id="sidebar"
    ref="assign"
    :visible="isAssignSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @change="(val) => (isAssignSidebarActive = val)"
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
            Suppliers
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
            <!-- Supplier-->
            <b-row>
              <b-col>
                <span class="text-muted">
                  Total Supplier: {{ supList == null ? 0 : supList.length }}
                </span>
                <b-table
                  ref="assignTable"
                  striped
                  hover
                  :items="supList"
                  :fields="supField"
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
                  @click="lookupSuplier"
                >
                  <b-icon
                    icon="search"
                    class="mr-1"
                  />
                  Lookup
                </b-button>
              </b-col>
              <b-col cols="4">
                <b-button
                  variant="success"
                  block
                  @click="isAssignSidebarActiveADD = true"
                >
                  <b-icon
                    icon="plus"
                    class="mr-1"
                  />
                  Add Supplier
                </b-button>
              </b-col>
            </b-row>
          </b-form>
        </validation-observer>
      </b-overlay>
      <lookup-sup-modal />
      <lookup-sup-accept-modal />
    </template>
  </b-sidebar>
</template>
<script>
import { ValidationObserver } from 'vee-validate'
import { takeState } from 'vuex-dot'
import LookupSupModal from './LookupSupModal.vue'
import LookupSupAcceptModal from './LookupSupAcceptModal.vue'

export default {
  components: {
    ValidationObserver,
    LookupSupModal,
    LookupSupAcceptModal,
  },
  computed: {
    show: takeState('listPMSetPrj', 'show')
      .commit('listPMSetPrj/SET_SHOW')
      .map(),
    supList: takeState('listPMSetPrj', 'itemsSUP').map(),
    supField: takeState('listPMSetPrj', 'itemFieldSUP').map(),

    isAssignSidebarActive: takeState('listPMSetPrj', 'isAssignSidebarActive')
      .commit('listPMSetPrj/SET_ASS_TO')
      .map(),
    isAssignSidebarActiveADD: takeState(
      'listPMSetPrj',
      'isAssignSidebarActiveADD',
    )
      .commit('listPMSetPrj/SET_ADD_SIDE')
      .map(),
    showModalSupLook: takeState('listPMSetPrj', 'showModalSupLook').commit('listPMSetPrj/SET_MOD_SUP_LOOK').map(),
    lookupSupPhone: takeState('listPMSetPrj', 'lookupSupPhone').commit('listPMSetPrj/SET_PHONE_SUP_LOOK').map(),

  },
  methods: {
    lookupSuplier() {
      this.$store.commit('listPMSetPrj/RESET_SUP')

      this.lookupSupPhone = null
      this.showModalSupLook = {
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
    /* deActive(items) {
      console.log(items)
      console.log(items.item)
      this.$store
        .dispatch('listPMSetPrj/DEACTIVE_SUPPLIER', {
          prefix: this.$route.params.prefixPrj,
          sup: items.item.id,
          prefixRole: this.$route.params.prefixRole,
        })
        .then(val => {
          if (val.data.res[0].result === 1) {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Supplier added successfully',
                icon: 'EditIcon',
                variant: 'success',
              },
            })
          } else {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Supplier added Failed Check information',
                icon: 'EditIcon',
                variant: 'danger',
              },
            })
          }
        })
    },
    Active(items) {
      console.log(items)
      this.$store
        .dispatch('listPMSetPrj/ACTIVE_SUPPLIER', {
          prefix: this.$route.params.prefixPrj,
          prefixRole: this.$route.params.prefixRole,
          sup: items.item.id,
        })
        .then(val => {
          if (val.data.res[0].result === 1) {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Supplier added successfully',
                icon: 'EditIcon',
                variant: 'success',
              },
            })
          } else {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Supplier added Failed Check information',
                icon: 'EditIcon',
                variant: 'danger',
              },
            })
          }
        })
    }, */
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
