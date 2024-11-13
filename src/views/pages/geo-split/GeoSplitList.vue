<template>
    <div>
        <div class="d-flex justify-content-between align-items-center content-sidebar-header">
            <h5 class="mb-1">
                Case List
            </h5>
        </div>
        <div class="d-flex justify-content-between  flex-wrap">
            <!-- sorting  -->
            <b-form-group label="Sort" label-for="sortBySelect">
                <b-input-group size="sm">
                    <b-form-select id="sortBySelect" v-model="sortBy" :options="sortOptions">
                        <template #first>
                            <option value="">
                                none
                            </option>
                        </template>
                    </b-form-select>
                    <b-form-select v-model="sortDesc" size="sm" :disabled="!sortBy">
                        <option :value="false">
                            Asc
                        </option>
                        <option :value="true">
                            Desc
                        </option>
                    </b-form-select>
                    <!-- Refresh -->
                    <b-button variant="primary" size="sm" class="ml-2" @click=" $parent.$parent.ResetData()">
                        <b-icon icon="arrow-repeat" />
                    </b-button>
                </b-input-group>
            </b-form-group>

            <!-- filter -->
            <b-form-group label="Filter" label-size="sm" label-for="filterInput">
                <b-input-group size="sm">
                    <b-form-input id="filterInput" v-model="filter" type="search" placeholder="Type to Search" />
                    <b-input-group-append>
                        <b-button :disabled="!filter" @click="filter = ''">
                            Clear
                        </b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-form-group>
        </div>

        <b-table ref="selectableTable" striped hover responsive :busy="show" selectable select-mode="multi" small
            bordered :selected-variant="$store.state.appConfig.layout.skin === 'dark' ? 'active' : 'primary'"
            :per-page="perPage" :current-page="currentPage" :items="itemTable" :fields="fields" :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc" :sort-direction="sortDirection" show-empty empty-text="No matching records found"
            primary-key="id" :filter="filter" :filter-included-fields="filterOn" @row-selected="onRowSelected"
            @filtered="onFiltered">
            <template #table-busy>
                <div class="text-center text-primary my-2">
                    <b-spinner class="align-middle" />
                    <strong>Loading...</strong>
                </div>
            </template>
            <template #table-caption>
                <div>
                    <span class="text-muted ml-2 mr-4">
                        Total Cases: {{ totalRows }}
                    </span>
                    <span class="text-muted">
                        Selected Rows:{{ selectedCase.length }}
                    </span>
                </div>
            </template>
            <template #cell(selected)="{ rowSelected }">
                <template v-if="rowSelected">
                    <span aria-hidden="true"><b>&check;</b></span>
                    <span class="sr-only">Selected</span>
                </template>
                <template v-else>
                    <span aria-hidden="true">&nbsp;</span>
                    <span class="sr-only">Not selected</span>
                </template>
            </template>

            <template #cell(pcr_duration)="data">
                {{ data.value }} {{ data.value > 1 ? 'Days' : 'Day' }}
            </template>
            <template #cell(priority_level)="data">
                <b-badge pill
                    :variant="$store.getters['global/priority'].filter(it => it.value === data.value)[0].variant">
                    {{ $store.getters['global/priority'].filter(it => it.value === data.value)[0].title }}
                </b-badge>
            </template>
            <template #cell(show_details)="row">
                <b-button size="sm" class="mr-2" variant="primary" @click="row.toggleDetails">
                    {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
                </b-button>
            </template>

            <template #row-details="row">
                <b-card>
                    <b-row class="mb-1">
                        <b-col>
                            <pre>

                Case Code: {{ row.item.case_code }}
                Full Name: {{ row.item.full_name }}
                Phone: +{{ row.item.case_phone }}
                Referral: {{ row.item.referral_name }}
                Governorate: {{ row.item.governorate_name }}
                District: {{ row.item.district_name_eng }}
                Cadaster: {{ row.item.cadastre_name }}
                Address: {{ row.item.adresstext }}
                Settlement: {{ row.item.stal_name }}
                ISS:{{ row.item.is_name }}
                Latitide & Lonigtude: {{ row.item.address_latitude }} , {{ row.item.address_longitude }}
              </pre>
                        </b-col>
                    </b-row>
                </b-card>
            </template>
            <template #cell(delete)="data">
                <b-dropdown variant="link" no-caret :right="$store.state.appConfig.isRTL">

                    <template #button-content>
                        <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
                    </template>
                    <!--<b-dropdown-item
            v-show="$route.params.assmnttype !== '2'"
            variant="info"
            @click="EditCase(data.item)"
          >
            <feather-icon icon="Edit2Icon" />
            <span class="align-middle ml-50"> Edit Case</span>
          </b-dropdown-item>-->
                    <b-dropdown-item v-show="$route.params.assmnttype !== '2'" variant="warning"
                        @click="SendToAssm(data.item)">
                        <feather-icon icon="ArrowLeftIcon" />
                        <span class="align-middle ml-50">Send Back To Assement</span>
                    </b-dropdown-item>
                    <b-dropdown-item variant="danger" @click="EndCase(data)">
                        <feather-icon icon="Trash2Icon" />
                        <span class="align-middle ml-50"> End Case</span>
                    </b-dropdown-item>
                </b-dropdown>
            </template>
        </b-table>
        <b-row align-h="between">
            <b-col cols="3">
                <!-- page length -->
                <b-form-group label="Per Page" label-align="left" class="text-nowrap">
                    <b-form-select id="perPageSelect" v-model="perPage" :options="pageOptions" />
                    <b-button variant="primary" @click="selectAllRows">
                        Select all
                    </b-button>
                    <b-button variant="primary" @click="clearSelected">
                        Unselect
                    </b-button>
                </b-form-group>

            </b-col>

            <b-col cols="auto" offset-md="3" align="right" style="margin-top: 24px;">
                <!-- pagination -->
                <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" first-number last-number
                    prev-class="prev-item" next-class="next-item">
                    <template #prev-text>
                        <feather-icon icon="ChevronLeftIcon" size="16" />
                    </template>
                    <template #next-text>
                        <feather-icon icon="ChevronRightIcon" size="16" />
                    </template>
                </b-pagination>
            </b-col>

        </b-row>
        <b-row align-h="end" class="m-1">
            <b-col cols="12" md="auto" />
        </b-row>
        <SendToAssment v-if="active" />
        <end-case />
        <EditCase v-if="showEdit" />
    </div>
</template>

<script>
import { takeState } from 'vuex-dot'
import moment from 'moment'
import { mapGetters } from 'vuex'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import EndCase from './EndCase.vue'
import EditCase from './EditCase.vue'

import SendToAssment from './SendToAssment.vue'

export default {
    components: {
        // eslint-disable-next-line vue/no-unused-components
        ToastificationContent,
        EndCase,
        EditCase,
        SendToAssment,
    },
    data() {
        return {
            totalRows: null,
        }
    },
    computed: {
        referral: takeState('geoSplit', 'referral').commit('geoSplit/SET_REF').map(),
        governorate: takeState('geoSplit', 'governorate').commit('geoSplit/SET_GOV').map(),
        district: takeState('geoSplit', 'district').commit('geoSplit/SET_DIS').map(),
        cadaster: takeState('geoSplit', 'cadaster').commit('geoSplit/SET_CAD').map(),
        type: takeState('geoSplit', 'type').commit('geoSplit/SET_TYPE').map(),
        iss: takeState('geoSplit', 'iss').commit('geoSplit/SET_ISS').map(),
        rangeDate: takeState('geoSplit', 'rangedate').commit('geoSplit/SET_RANG_DAT').map(),
        show: takeState('geoSplit', 'show').commit('geoSplit/SET_SHOW').map(),
        // Table Data
        items: takeState('geoSplit', 'caseItem').commit('geoSplit/SET_ITEM').map(),
        fields: takeState('geoSplit', 'caseField').commit('geoSplit/SET_FIELD').map(),
        // Table Option
        perPage: takeState('geoSplit', 'perPage').commit('geoSplit/SET_PER_PAGE').map(),
        pageOptions: takeState('geoSplit', 'pageOptions').map(),
        currentPage: takeState('geoSplit', 'currentPage').commit('geoSplit/SET_CUR_PAGE').map(),
        sortBy: takeState('geoSplit', 'sortBy').commit('geoSplit/SET_SORT_BY').map(),
        sortDesc: takeState('geoSplit', 'sortDesc').commit('geoSplit/SET_SORT_DESC').map(),
        sortDirection: takeState('geoSplit', 'sortDirection').commit('geoSplit/SET_SORT_DIR').map(),
        filter: takeState('geoSplit', 'filter').commit('geoSplit/SET_FILTER').map(),
        filterOn: takeState('geoSplit', 'filterOn').commit('geoSplit/SET_FILTER_ON').map(),
        selectedCase: takeState('geoSplit', 'selectedCase').commit('geoSplit/SET_SELECT_ITEM').map(),
        showModalRef: takeState('geoSplit', 'showModalRef').commit('geoSplit/SET_SHOW_REF').map(),
        userList: takeState('geoSplit', 'userList').commit('geoSplit/SET_USER_LIST').map(),

        ...takeState('geoSplit', 'showModalRef')
            .expose([
                'active',
            ])
            .commit('geoSplit/SET_SHOW_REF')
            .map(),
        // itemTable: takeState('geoSplit', 'itemTable').commit('geoSplit/SET_TABLE_FILTERED').map(),
        ...mapGetters({
            // Global Option
            itemTable: 'geoSplit/itemTable',
        }),
        sortOptions() {
            // Create an options list from our fields
            return this.fields
                .filter(f => f.sortable)
                .map(f => ({ text: f.label, value: f.key }))
        },
        showEnd: takeState('geoSplit', 'showEnd').commit('geoSplit/SET_SHOW_END').map(),
        endItem: takeState('geoSplit', 'endItem').commit('geoSplit/SET_END_ITEM').map(),
        showEdit: takeState('geoSplit', 'showEdit').commit('geoSplit/SET_SHOW_EDIT').map(),
        editItem: takeState('geoSplit', 'editItem').commit('geoSplit/SET_EDIT_ITEM').map(),

        itemTable() {
            const rf = this.items.filter(item => (this.referral == null ? item : item.referral_id === this.referral.value))
            const frm = moment(this.rangeDate == null ? null : this.rangeDate.split('to')[0])
            const to = moment(this.rangeDate == null ? null : this.rangeDate.split('to')[1])
            const rg = rf.filter(item => {
                if (!frm.isValid() || !to.isValid()) { return true }
                return moment(item.referral_date).isBetween(frm, to)
            })
            const gov = rg.filter(itemgov => (this.governorate == null ? itemgov : itemgov.governorate_id === this.governorate.value))
            const dis = gov.filter(itemdis => (this.district == null ? itemdis : itemdis.district_id === this.district.value))
            const st = dis.filter(itemtype => (this.type == null ? itemtype : itemtype.st_id === this.type.value))
            const cd = st.filter(itemcad => (this.cadaster == null ? itemcad : itemcad.cadastre_id === this.cadaster.value))
            const iss = cd.filter(itemiss => (this.iss == null ? itemiss : itemiss.is_id === this.iss.value))
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.totalRows = iss.length
            return iss
        },
    },
    mounted() {
        // Set the initial number of items
        this.totalRows = this.itemTable.length
    },
    methods: {
        onRowSelected(items) {
            this.selectedCase = items
            if (this.selectedCase.length > 0) {
                this.$store.commit('geoSplit/SET_MAP_CENTER',
                    {
                        lat: items[items.length - 1].address_latitude,
                        lng: items[items.length - 1].address_longitude,
                        zoom: 16,
                    })
            }
        },
        EndCase(items) {
            console.log(items)
            this.endItem = items
            this.showEnd = true
        },
        EditCase(items) {
            console.log(items)
            this.editItem = items
            this.showEdit = true
        },
        SendToAssm(items) {
            console.log(items)
            this.$swal({
                title: 'Send Back To Assessment',
                text: `Are you sure you want to Send Back to Assessment(${items.case_code}:${items.full_name})`,
                icon: 'info',
                showCancelButton: true,
                confirmButtonText: 'Yes!',
                customClass: {
                    confirmButton: 'btn btn-primary',
                    cancelButton: 'btn btn-outline-danger ml-1',
                },
                buttonsStyling: false,
            }).then(result => {
                if (result.value) {
                    this.$store.dispatch('geoSplit/SEND_TO_ASSM', {
                        prefix: this.$route.params.prefixPrj,
                        prefixRole: this.$route.params.prefixRole,
                        itm: items,
                        type: this.$route.params.assmnttype,
                    }).then(res => {
                        console.log('res', res)

                        if (res.res.result === 1) {
                            this.showEnd = false
                            this.$swal({
                                icon: 'success',
                                title: 'Done!',
                                text: 'The case hase been Back to Assessment!',
                                customClass: {
                                    confirmButton: 'btn btn-success',
                                },
                            })
                        } else if (res.res.result === 2) {
                            console.log('snd', res.snd)

                            this.showModalRef = {

                                active: true,
                                items,
                            }
                            console.log('snd', res.snd)
                            this.userList = res.snd
                            console.log('/////////////')
                        } else {
                            this.$swal({
                                icon: 'error',
                                title: 'Failed!',
                                text: 'Contact System administrator!',
                                customClass: {
                                    confirmButton: 'btn btn-success',
                                },
                            })
                        }
                    }).catch(error => {
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                                title: 'Operation Failed',
                                icon: 'EditIcon',
                                text: error.toString(),
                                variant: 'danger',
                            },
                        })
                    })
                }
            })
        },
        selectAllRows() {
            this.$refs.selectableTable.selectAllRows()
        },
        clearSelected() {
            this.$refs.selectableTable.clearSelected()
        },
        onFiltered(_, ind) {
            this.totalRows = ind
            this.currentPage = 1
        },
    },
}
</script>
