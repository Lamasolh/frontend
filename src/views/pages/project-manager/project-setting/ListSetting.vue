<template>
  <b-card>
    <b-card-body>
      <div class="d-flex justify-content-between flex-wrap">
        <!-- sorting  -->
        <b-form-group
          label="Sort"
          label-size="sm"
          label-align-sm="left"
          label-cols-sm="2"
          label-for="sortBySelect"
          class="mr-1 mb-md-0"
        >
          <b-input-group size="sm">
            <b-form-select
              id="sortBySelect"
              v-model="sortBy"
              :options="sortOptions"
            >
              <template #first>
                <option value="">
                  none
                </option>
              </template>
            </b-form-select>
            <b-form-select
              v-model="sortDesc"
              size="sm"
              :disabled="!sortBy"
            >
              <option :value="false">
                Asc
              </option>
              <option :value="true">
                Desc
              </option>
            </b-form-select>
            <!-- Refresh -->
            <b-button
              variant="primary"
              size="sm"
              class="ml-2"
              @click="$parent.$parent.ResetData()"
            >
              <b-icon icon="arrow-repeat" />
            </b-button>
          </b-input-group>
        </b-form-group>

        <!-- filter -->
        <b-form-group
          label="Filter"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filterInput"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            />
            <b-input-group-append>
              <b-button
                :disabled="!filter"
                @click="filter = ''"
              >
                Clear
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </div>
    </b-card-body>
    <validation-observer ref="simpleRules">
      <b-table
        ref="selectableTable"
        bordered
        responsive
        show-empty
        empty-text="No matching records found"
        :items="itemTable"
        :selected-variant="$store.state.appConfig.layout.skin === 'dark' ? 'active' : 'primary'"
        sticky-header
        :per-page="perPage"
        :current-page="currentPage"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        data-boundary="window"
        style="max-height: 450px"
        :filter="filter"
        :filter-included-fields="filterOn"
        :fields="itemField"
      >
        <template #cell(id)="data">
          <p>{{ data.index + 1 }}</p>
        </template>

        <template #cell(quantity)="data">
          <validation-provider
            v-slot="{ errors }"
            rules="required|min_value:1"
            :name="'Quantity ' + (data.index + 1)"
          >
            <b-form-input
              :id="'Quantity ' + (data.index + 1)"
              v-model="data.item.quantity"
              :state="errors.length > 0 ? false : null"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              type="number"
              placeholder="Enter Quantity"
            />
            <small class="text-danger mb-1">{{ errors[0] }}</small>
          </validation-provider>
        </template>
        <template #cell(note)="data">
          <validation-provider
            v-slot="{ errors }"
            :name="'Note ' + (data.index + 1)"
          >
            <b-form-input
              :id="'Note ' + (data.index + 1)"
              v-model="data.item.note"
              :state="errors.length > 0 ? false : null"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              type="text"
              placeholder="Enter Note"
            />
            <small class="text-danger mb-1">{{ errors[0] }}</small>
          </validation-provider>
        </template>

        <template #cell(comMob)="data">
          <!--rules="required"-->

          <validation-provider
            v-slot="{ errors }"
            :name="'Comunity ' + (data.index + 1)"
          >
            <v-select
              :id="'Comunity ' + (data.index + 1)"
              v-model="data.item.comMob"
              placeholder="Select Comunity"
              label="title"
              multiple
              :append-to-body="true"
              :state="errors.length > 0 ? false : null"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="comOption"
            />
            <small class="text-danger mb-1">{{ errors[0] }}</small>
          </validation-provider>
        </template>
        <template #cell(stafMon)="data">
          <!--rules="required"-->
          <validation-provider
            v-slot="{ errors }"
            :name="'Staff ' + (data.index + 1)"
          >
            <v-select
              :id="'Staff ' + (data.index + 1)"
              v-model="data.item.stafMon"
              placeholder="Select Staff"
              label="title"
              multiple
              :append-to-body="true"
              :state="errors.length > 0 ? false : null"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="staffOption"
            />
            <small class="text-danger mb-1">{{ errors[0] }}</small>
          </validation-provider>
        </template>
        <template #cell(iss)="row">
          <h4>{{ row.item.iss_name }}</h4>
          <p>{{ row.item.p_code }}</p>
        </template>

        <template #cell(info)="row">
          <b-button
            size="sm"
            class="mr-1"
            :variant="row.item.result"
            @click="info(row.item, row.index, $event.target)"
          >
            Info modal
          </b-button>

        </template>
      </b-table>
      <p>
        <span class="text-muted ml-2 mr-4">Total Cadaster: {{ itemTable.length }}</span>
      </p>
    </validation-observer>
    <b-row
      class="m-1"
      align-h="between"
    >
      <b-col
        cols="3"
        class="mt-2"
      >
        <!-- page length -->
        <b-form-group
          label="Per Page"
          label-cols="4"
          label-align="left"
          class="text-nowrap"
        >
          <b-form-select
            id="perPageSelect"
            v-model="perPage"
            :options="pageOptions"
          />
        </b-form-group>
      </b-col>

      <b-col
        cols="auto"
        offset-md="4"
        align="right"
        style="margin-top: 16px"
      >
        <!-- pagination -->
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          first-number
          last-number
          prev-class="prev-item"
          next-class="next-item"
          class="mt-2"
        >
          <template #prev-text>
            <feather-icon
              icon="ChevronLeftIcon"
              size="18"
            />
          </template>
          <template #next-text>
            <feather-icon
              icon="ChevronRightIcon"
              size="18"
            />
          </template>
        </b-pagination>
      </b-col>
    </b-row>
    <b-row
      align-h="between"
      class="m-1"
    >

      <b-col
        cols="6"
        md="auto"
      />
      <b-col
        cols="2"
        md="auto"
      >
        <b-button
          variant="primary"
          block
          @click="Submit"
        >
          Submit
        </b-button>
      </b-col>
    </b-row>
    <!-- Info modal -->
    <b-modal
      :id="infoModal.id"
      :title="infoModal.title"
      ok-only
      size="xl"
      @hide="resetInfoModal"
    >
      <p
        v-if="infoModal.content !=''"
        :class=" JSON.parse(infoModal.content).result =='success'?'text-success':''"
      >
        <b-table
          ref="selectableTable"
          bordered
          responsive
          show-empty
          :fields="itemsIssField"
          empty-text="No matching records found"
          :items=" JSON.parse(infoModal.content).items"
          sticky-header
          data-boundary="window"
          style="max-height: 450px"
        >
          <template #cell(id)="data">
            <p>{{ data.index + 1 }}</p>
          </template>

          <template #cell(status)="data">
            <p
              :class="(data.item.status_id ==1 ? 'text-success': data.item.status_id ==2?
                'text-warning': 'text-danger ')+ ' h4' "
            >{{ data.item.status_id ==1 ? 'Successfully Operation':
              data.item.status_id ==2? 'Failed Operation because Cycle Runing':
              'Failed Operation'
            }}</p>
          </template>
        </b-table>
      </p>
    </b-modal>
  </b-card>
</template>
<script>
import { takeState } from 'vuex-dot'
import vSelect from 'vue-select'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    vSelect,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      totalRows: null,
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
    }
  },
  computed: {
    show: takeState('settingPrj', 'show').commit('settingPrj/SET_SHOW').map(),
    perPage: takeState('settingPrj', 'perPage').commit('settingPrj/SET_PER_PAGE').map(),
    pageOptions: takeState('settingPrj', 'pageOptions').map(),
    currentPage: takeState('settingPrj', 'currentPage').commit('settingPrj/SET_CUR_PAGE').map(),
    sortBy: takeState('settingPrj', 'sortBy').commit('settingPrj/SET_SORT_BY').map(),
    sortDesc: takeState('settingPrj', 'sortDesc').commit('settingPrj/SET_SORT_DESC').map(),
    sortDirection: takeState('settingPrj', 'sortDirection').commit('settingPrj/SET_SORT_DIR').map(),
    filter: takeState('settingPrj', 'filter').commit('settingPrj/SET_FILTER').map(),
    filterOn: takeState('settingPrj', 'filterOn').commit('settingPrj/SET_FILTER_ON').map(),
    supL: takeState('settingPrj', 'itemsSUP').map(),
    itemField: takeState('settingPrj', 'itemField').map(),
    items: takeState('settingPrj', 'items').map(),
    itemsIssField: takeState('settingPrj', 'itemsIssField').map(),
    comOption: takeState('settingPrj', 'comOption').map(),
    staffOption: takeState('settingPrj', 'staffOption').map(),
    sortOptions() {
      return this.itemField
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
    itemTable() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.totalRows = this.items.length
      return this.items
    },
  },
  mounted() {
    this.totalRows = this.itemTable.length
  },
  methods: {
    info(item, index, button) {
      this.infoModal.title = `Info: ${item.iss_name} - ${item.p_code}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    onRowSelected(items) {
      this.selectedCase = items
    },
    Submit() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          console.log('success')
          this.$store
            .dispatch('settingPrj/SAVE_DATA', {
              prefix: this.$route.params.value.proj_prefix,
              prefixRole: this.$route.params.prefixRole,
            })
            .then(val => {
              console.log(val.data.res[0][0].result)
              this.$refs.simpleRules.validate()
              this.$refs.selectableTable.refresh()
              if (val.data.result === 1) {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Operation Done Check Status',
                    icon: 'EditIcon',
                    variant: 'success',
                  },
                })
              } else {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Operation Failed, Contact adminstrator',
                    icon: 'EditIcon',
                    variant: 'danger',
                  },
                })
              }
            })
        } else {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Missing Data',
              icon: 'EditIcon',
              variant: 'warning',
            },
          })
        }
      })
    },

    deleteItem(row) {
      console.log(row)
      this.$store.commit('settingPrj/REM_ITEM', row.index)
    },
  },
}
</script>

  <style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
.sup {
  min-width: 250px;
}
.iss {
  min-width: 50px;
}
.action {
  min-width: 30px;
}
</style>
