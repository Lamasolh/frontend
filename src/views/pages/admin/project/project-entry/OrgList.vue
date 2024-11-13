<template>
  <div :ref="$route.params.resource">
    <b-overlay
      rounded="lg"
      :show="show"
    >
      <b-card
        ref="filter"
        no-body
      >
        <OrgFilter />
      </b-card>
      <!-- Table Container Card -->
      <b-card
        ref="list"
        title="Case Row"
        no-body
      >
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
                  @click="ResetData"
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

        <b-table
          ref="selectableTable"
          striped
          hover
          small
          bordered
          :per-page="perPage"
          :current-page="currentPage"
          :items="itemTable"
          :fields="fields"
          :selected-variant="$store.state.appConfig.layout.skin === 'dark'?'active':'primary'"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          show-empty
          empty-text="No matching records found"
          :filter="filter"
          :filter-ignored-fields="['orgLogo','orgID','orgAdmin','userLogo',]"
          primary-key="orgID"
          @filtered="onFiltered"
        >
          <template #table-caption>
            <div>
              <span class="text-muted ml-2 mr-4">
                Total Cases: {{ totalRows }}
              </span>
            </div>
          </template>
          <!-- Column: User -->
          <template #cell(org)="data">
            <b-media vertical-align="center">
              <template #aside>
                <b-avatar
                  size="32"
                  :src="data.item.orgLogo"
                  :text="avatarText(data.item.orgName)"
                  :variant="`light-${resolveVariant(data.item.orgTypeId)}`"
                />
              </template>
              <b-link
                class="font-weight-bold d-block text-nowrap"
              >
                {{ data.item.orgName }}
              </b-link>
              <small class="text-muted">@{{ data.item.orgPrefix }}</small>
            </b-media>
          </template>

          <template #cell(show_details)="row">
            <b-button
              size="sm"
              class="mr-2"
              block
              variant="primary"
              @click="row.toggleDetails"
            >
              {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
            </b-button>
          </template>
          <!-- Column: Actions -->
          <template #cell(actions)="data">
            <b-dropdown
              variant="link"
              no-caret
              :right="$store.state.appConfig.isRTL"
            >

              <template #button-content>
                <feather-icon
                  icon="MoreVerticalIcon"
                  size="16"
                  class="align-middle text-body"
                />
              </template>
              <b-dropdown-item @click="RouteView(data.item)">
                <feather-icon icon="FileTextIcon" />
                <span class="align-middle ml-50">View</span>
              </b-dropdown-item>
            </b-dropdown>
          </template>
          <!-- Column: Status -->
          <template #cell(orgStatus)="data">
            <b-badge
              pill
              :variant="`light-${resolveStatusVariant(data.item.orgStatusID)}`"
              class="text-capitalize"
            >
              {{ data.item.orgStatus }}
            </b-badge>
          </template>
          <!-- Column: isdonor -->
          <template #cell(is_donor)="data">
            <b-badge
              pill
              :variant="`light-${data.item.is_donor === 1? 'success' : 'primary'}`"
              class="text-capitalize"
            >
              {{ data.item.is_donor === 1? 'Yes' : 'No' }}
            </b-badge>
          </template>
          <template #cell(data_entry)="data">
            <b-form-checkbox
              :disabled="data.item.read_only ===1"
              :checked="data.item.data_entry > 0 ? true : false"
              @change="item=> Input(item,data,'data_entry')"
            />
          </template>
          <template #row-details="row">
            <b-card>
              <b-row>
                <b-col
                  sm="3"
                  class="text-sm-right"
                >
                  <b>Contact Details:</b>
                </b-col>
                <b-col>
                  <p style="white-space: pre">
                    Contact name: {{ row.item.orgContact }}
                    Phone: {{ row.item.orgPhone != null ?row.item.orgPhone: 'Nothing' }}
                    Email: {{ row.item.orgEmail }}
                    Website: {{ row.item.orgWeb != null ?row.item.orgWeb: 'Nothing' }}
                  </p>
                </b-col>
              </b-row>
              <b-row>
                <b-col
                  sm="3"
                  class="text-sm-right"
                >
                  <b>Admin Details:</b>
                </b-col>
                <b-col>
                  <p style="white-space: pre">
                    UserName: {{ row.item.userName }}
                    Full Name: {{ row.item.userFN +' ' + row.item.userLN }}
                    Full Name Arabic: {{ row.item.userFNAR +' ' + row.item.userLNAR }}
                    Date of Birth: {{ row.item.userDOB }}
                    Nationality: {{ row.item.userNat }}
                    Phone: {{ row.item.userPhone }}
                    Job: {{ row.item.userJob }}
                    Address: {{ row.item.userAdd != null ?row.item.userAdd: 'Nothing' }}
                    Bio: {{ row.item.userBio != null ?row.item.userBio: 'Nothing' }}
                  </p>
                </b-col>
              </b-row>
              <b-row>
                <b-col
                  sm="3"
                  class="text-sm-right"
                >
                  <b>More Details:</b>
                </b-col>
                <b-col>
                  <p style="white-space: pre">
                    Display Name: {{ row.item.orgDis }}
                    Address: {{ row.item.orgAdress != null ?row.item.orgAdress: 'Nothing' }}
                    Comment: {{ row.item.orgCom != null ?row.item.orgCom: 'Nothing' }}
                    Description: {{ row.item.orgDescription != null ?row.item.orgDescription: 'Nothing' }}
                  </p>
                </b-col>
              </b-row>
            </b-card>
          </template>
        </b-table>
        <b-row
          class="m-1"
          align-h="between"
        >
          <b-col cols="3">
            <!-- page length -->
            <b-form-group
              label="Per Page"
              label-cols="5"
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
          align-h="end"
          class="m-2"
        >
          <b-col cols="1">
            <b-button
              variant="success"
              :disabled="selectItem.length === 0"
              @click="Save"
            >
              Save
            </b-button>
          </b-col>
        </b-row>
        <br>
        <br>

      </b-card>
    </b-overlay>
  </div>
</template>

<script>
import { takeState } from 'vuex-dot'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import OrgFilter from './OrgFilter.vue'
/* eslint-disable no-nested-ternary */
/* eslint-disable vue/no-unused-vars */

export default {
  components: {
    OrgFilter,
    // eslint-disable-next-line vue/no-unused-components
  },
  data() {
    return {
      totalRows: null,
      val: true,
    }
  },
  computed: {
    show: takeState('entryOrg', 'show').commit('entryOrg/SET_SHOW').map(),
    saved: takeState('entryOrg', 'saved').commit('entryOrg/SET_SAVED').map(),
    selectItem: takeState('entryOrg', 'selectItem').commit('entryOrg/SET_SELECT').map(),

    // Filter
    orgStatusOptions: takeState('global', 'org_status').map(),
    orgTypeOptions: takeState('global', 'org_type').map(),
    governorate: takeState('entryOrg', 'governorate').commit('entryOrg/SET_GOV').map(),

    municipalityOptions: takeState('global', 'municipality').map(),
    orgstatus: takeState('entryOrg', 'orgStatus').map(),
    district: takeState('entryOrg', 'district').commit('entryOrg/SET_DIS').map(),
    municipality: takeState('entryOrg', 'municipality').commit('entryOrg/SET_MUN').map(),
    // Table Data
    items: takeState('entryOrg', 'orgList').commit('entryOrg/SET_ITEM').map(),
    fields: takeState('entryOrg', 'orgField').commit('entryOrg/SET_FIELD').map(),
    // Table Option
    perPage: takeState('entryOrg', 'perPage').commit('entryOrg/SET_PER_PAGE').map(),
    pageOptions: takeState('entryOrg', 'pageOptions').map(),
    currentPage: takeState('entryOrg', 'currentPage').commit('entryOrg/SET_CUR_PAGE').map(),
    sortBy: takeState('entryOrg', 'sortBy').commit('entryOrg/SET_SORT_BY').map(),
    sortDesc: takeState('entryOrg', 'sortDesc').commit('entryOrg/SET_SORT_DESC').map(),
    sortDirection: takeState('entryOrg', 'sortDirection').commit('entryOrg/SET_SORT_DIR').map(),
    filter: takeState('entryOrg', 'filter').commit('entryOrg/SET_FILTER').map(),
    filterOn: takeState('entryOrg', 'filterOn').commit('entryOrg/SET_FILTER_ON').map(),
    orgID: takeState('entryOrg', 'orgID').commit('entryOrg/SET_ORG_ID').map(),

    sortOptions() {
      return this.fields.filter(f => f.sortable).map(f => ({ text: f.label, value: f.key }))
    },
    itemTable() {
      const gov = this.items.filter(itemgov => (this.governorate == null ? itemgov : itemgov.governorate_id === this.governorate.value))
      const dis = gov.filter(itemdis => (this.district == null ? itemdis : itemdis.orgDistrictID === this.district.value))
      const st = dis.filter(item => (this.orgstatus == null ? item : item.orgStatusID === this.orgstatus.value))
      const cd = st.filter(itemcad => (this.municipality == null ? itemcad : itemcad.orgCadID === this.municipality.value))
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.totalRows = cd.length
      return cd
    },

  },
  mounted() {
    this.ResetData()
  },
  methods: {
    Save() {
      console.log(this.$route.params.value.proj_id)
      console.log(this.selectItem)
      this.$swal({
        title: 'Are you sure you want to Save Operation?',
        text: 'Postpone Action',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Yes!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        console.log(result)
        if (result.value) {
          this.$store.dispatch('entryOrg/Save', {
            prefix: this.$route.params.prefixPrj,
            prefixRole: this.$route.params.prefixRole,
            proj_id: this.$route.params.value.proj_id,
          }).then(res => {
            if (res[0].result === 1) {
              this.$swal({
                icon: 'success',
                title: 'Done!',
                text: 'The Operation has been successfully!',
                customClass: {
                  confirmButton: 'btn btn-success',
                },
              })
            } else {
              this.$swal({
                icon: 'danger',
                title: 'Failed!',
                text: 'The Operation has been Failed!',
                customClass: {
                  confirmButton: 'btn btn-danger',
                },
              })
            }
          }).catch(() => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Contact System administrator',
                icon: 'EditIcon',
                text: 'Please check internet connection and try again',
                variant: 'danger',
              },
            })
          })
        }
      })
    },
    Input(value, item, key) {
      try {
        console.log(value, item, key)
        this.items.filter(it => it.orgID === item.item.orgID)[0][key] = value === true ? 1 : 0
        if (this.selectItem.length === 0) {
          this.selectItem.push(item.item)
        } else if ((this.selectItem.filter(it => it.orgID === item.item.orgID).length) === 0) {
          this.selectItem.push(item.item)
        } else {
          const index = this.selectItem.findIndex(it => it.orgID === item.item.orgID)
          console.log(index, 'index')
          if (index > -1) {
            this.selectItem.splice(index, 1)
          }
        }
        console.log(this.selectItem)
      } catch (e) {
        console.log('error', e)
      }
    },
    avatarText(value) {
      if (!value) return ''
      const nameArray = value.split(' ')
      return nameArray.map(word => word.charAt(0).toUpperCase()).join('')
    },
    resolveVariant(type) {
      if (type === 1) return 'primary'
      if (type === 2) return 'warning'
      if (type === 3) return 'success'
      if (type === 4) return 'info'
      if (type === 5) return 'danger'
      return 'primary'
    },
    resolveStatusVariant(type) {
      if (type === 1) return 'warning'
      if (type === 2) return 'success'
      if (type === 3) return 'danger'
      if (type === 4) return 'danger'
      if (type === 5) return 'danger'
      return 'primary'
    },

    RouteView(items) {
      const nav = []
      console.log(items)
      nav.push(
        {
          active: false,
          text: this.$route.params.breadcrumb[0].text,
        },
        {
          active: false,
          text: 'Organization View',
        },
        {
          active: true,
          text: items.org_name,
        },
      )
      this.orgID = items.orgID
      this.$router.replace({
        name: 'menuViews',
        params: {
          action: 'read',
          is: items.is,
          breadcrumb: nav,
          active: true,
          prefix: this.$route.params.prefixPrj,
          prefixRole: this.$route.params.prefixRole,
          title: 'Organization View',
          resource: 'ORLST',
          value: items,
        },
      })
    },
    ResetData() {
      // Set the initial number of items
      console.log('this.$route.params')
      console.log(this.$route.params)
      this.$store.dispatch('entryOrg/GET_DATA', {
        prefix: this.$route.params.prefixPrj,
        prefixRole: this.$route.params.prefixRole,
        proj_id: this.$route.params.value.proj_id,
      })
      this.totalRows = this.itemTable.length
    },
    onRowSelected(items) {
      this.RouteView(items)
    },
    onFiltered(_, ind) {
      console.log('fl')
      this.totalRows = ind
      this.currentPage = 1
      console.log('bl')
    },
  },
}
</script>
