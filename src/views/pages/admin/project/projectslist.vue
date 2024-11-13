<template>
    <b-card ref="list" title="Projects List" no-body>
        <projectsfilter />

        <b-table ref="selectableTable" striped hover :busy="show" small bordered :per-page="perPage"
            :current-page="currentPage" :items="itemTable" :fields="fields" :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc" :sort-direction="sortDirection"
            :selected-variant="$store.state.appConfig.layout.skin === 'dark' ? 'active' : 'primary'" show-empty
            empty-text="No matching records found" primary-key="id" :filter="filter" :filter-included-fields="filterOn"
            @row-dblclicked="item => ViewProject(item)" @filtered="onFiltered">
            <!-- Column: Actions -->
            <template #cell(actions)="data">
                <b-dropdown variant="link" no-caret :right="$store.state.appConfig.isRTL">

                    <template #button-content>
                        <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
                    </template>
                    <!-- Button: Edit -->

                    <b-dropdown-item @click="ViewProject(data.item)">
                        <feather-icon icon="Edit2Icon" />
                        <span class="align-middle ml-50">Edit</span>
                    </b-dropdown-item>
                    <!-- Button: Role -->
                    <b-dropdown-item @click="RoleProject(data.item)">
                        <feather-icon icon="GitCommitIcon" />
                        <span class="align-middle ml-50"> Project Roles</span>
                    </b-dropdown-item>
                    <b-dropdown-item v-show="data.item.assmnt_type != 2" @click="RouteEntry(data.item)">
                        <feather-icon icon="FeatherIcon" />
                        <span class="align-middle ml-50">Entry Referral</span>
                    </b-dropdown-item>
                    <!-- Button: Geo Split -->
                    <b-dropdown-item @click="ProjectCadstres(data.item)">
                        <feather-icon icon="MapIcon" />
                        <span class="align-middle ml-50">GeoSplit</span>
                    </b-dropdown-item>
                    <!-- Button: Search -->
                    <b-dropdown-item @click="SearchView(data.item)">
                        <feather-icon icon="SearchIcon" />
                        <span class="align-middle ml-50">Search</span>
                    </b-dropdown-item>
                    <b-dropdown-item @click="ImportSplit(data.item)">
                        <feather-icon icon="FileTextIcon" />
                        <span class="align-middle ml-50">Project GeoSplit</span>
                    </b-dropdown-item>
                    <b-dropdown-item @click="ProjectCadstres(data.item)">
                        <feather-icon icon="FileTextIcon" />
                        <span class="align-middle ml-50">Import Excel</span>
                    </b-dropdown-item>
                </b-dropdown>
            </template>
            <!-- @row-selected="onRowSelected" this is for on select row-->
            <template #table-busy>
                <div class="text-center text-primary my-2">
                    <b-spinner class="align-middle" />
                    <strong>Loading...</strong>
                </div>
            </template>
            <template #table-caption>
                <div>
                    <span class="text-muted ml-2 mr-4">
                        Total Projects: {{ totalRows }}
                    </span>
                </div>
            </template>
            <!-- Column: User -->
            <template #cell(proj_name)="data">
                <b-media vertical-align="center">
                    <template #aside>
                        <b-avatar size="40" :variant="`light-${data.item.status_id === 2 ? 'success' : 'warning'}`">
                            <feather-icon class="d-flex align-items-center"
                                :icon="data.item.icon_text == null ? 'GlobeIcon' : data.item.icon_text" size="24" />
                        </b-avatar>
                    </template>
                    <b-link class="font-weight-bold d-block text-nowrap">
                        {{ data.item.proj_name }}
                    </b-link>
                    <small class="text-muted">{{ data.item.proj_prefix }}</small>
                </b-media>
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

        </b-table>

        <b-row class="m-1" align-h="between">
            <b-col cols="2">
                <!-- page length -->
                <b-form-group label="Per Page" label-cols="8" label-align="left" class="text-nowrap">
                    <b-form-select id="perPageSelect" v-model="perPage" :options="pageOptions" />
                </b-form-group>
            </b-col>

            <b-col cols="auto" offset-md="4" align="right" style="margin-top: 16px">
                <!-- pagination -->
                <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" first-number last-number
                    prev-class="prev-item" next-class="next-item" class="mt-2">
                    <template #prev-text>
                        <feather-icon icon="ChevronLeftIcon" size="18" />
                    </template>
                    <template #next-text>
                        <feather-icon icon="ChevronRightIcon" size="18" />
                    </template>
                </b-pagination>
            </b-col>
        </b-row>
        <b-row align-h="end" class="m-1" />
    </b-card>
</template>

<script>
import { takeState } from 'vuex-dot'
import projectsfilter from './projectsfilter.vue'

export default {
    components: {
        projectsfilter,
    },
    data() {
        return {
            totalRows: null,
        }
    },
    computed: {
        show: takeState('listPrj', 'show').commit('listPrj/SET_SHOW').map(),
        saved: takeState('listPrj', 'saved').commit('listPrj/SET_SAVED').map(),

        filter: takeState('listPrj', 'filter').commit('listPrj/SET_FILTER').map(),
        filterOn: takeState('listPrj', 'filterOn')
            .commit('listPrj/SET_FILTER_ON')
            .map(),

        // Table Data
        items: takeState('listPrj', 'caseProject').commit('listPrj/SET_ITEM').map(),
        fields: takeState('listPrj', 'caseField').commit('listPrj/SET_FIELD').map(),

        // Table Option
        perPage: takeState('listPrj', 'perPage')
            .commit('listPrj/SET_PER_PAGE')
            .map(),
        pageOptions: takeState('listPrj', 'pageOptions').map(),
        currentPage: takeState('listPrj', 'currentPage')
            .commit('listPrj/SET_CUR_PAGE')
            .map(),
        sortBy: takeState('listPrj', 'sortBy').commit('listPrj/SET_SORT_BY').map(),
        sortDesc: takeState('listPrj', 'sortDesc')
            .commit('listPrj/SET_SORT_DESC')
            .map(),
        sortDirection: takeState('listPrj', 'sortDirection')
            .commit('listPrj/SET_SORT_DIR')
            .map(),
        sortOptions() {
            // Create an options list from our fields
            return this.fields
                .filter(f => f.sortable)
                .map(f => ({ text: f.label, value: f.key }))
        },
        itemTable() {
            const rf = this.items
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.totalRows = rf.length
            return rf
        },
    },
    methods: {
        ViewProject(items) {
            console.log(items)
            const nav = []
            nav.push({
                active: true,
                text: 'Edit Project',
            })
            this.$router.replace({
                name: 'menuViews',
                params: {
                    action: 'read',
                    breadcrumb: nav,
                    active: true,
                    prefixMng: 'PRJMU',
                    resource: 'PRJLST',
                    title: 'Project Edit',
                    value: items,
                },
            })
        },
        RoleProject(items) {
            const nav = []
            console.log(this.$route.params)
            console.log(items)
            nav.push(
                {
                    active: false,
                    text: this.$route.params.breadcrumb[0].text,
                },
                {
                    active: false,
                    text: 'Project Role',
                },
                {
                    active: true,
                    text: `${items.proj_name}`,
                },
            )
            this.$router.replace({
                name: 'menuEdit',
                params: {
                    action: 'read',
                    breadcrumb: nav,
                    active: true,
                    prefix: 'PRJMU',
                    prefixMng: 'PRJMU',
                    resource: 'PRJLST',
                    title: 'Project Role',
                    value: items,
                },
            })
        },
        SearchView(items) {
            const nav = []
            nav.push(
                {
                    active: false,
                    text: this.$route.params.breadcrumb[0].text,
                },
                {
                    active: false,
                    text: this.$route.params.title,
                },
                {
                    active: true,
                    text: `${items.proj_name}`,
                },
            )
            this.$router.replace({
                name: 'menuSearch',
                params: {
                    action: 'read',
                    breadcrumb: nav,
                    active: true,
                    prefix: this.$route.params.prefixPrj,
                    prefixRole: this.$route.params.prefixRole,
                    title: 'Project Search',
                    resource: 'PRJLST',
                    value: items,
                },
            })
        },
        ImportView(items) {
            console.log(items)
            const nav = []
            nav.push(
                {
                    active: false,
                    text: this.$route.params.breadcrumb[0].text,
                },
                {
                    active: false,
                    text: this.$route.params.title,
                },
                {
                    active: true,
                    text: `${items.proj_name}`,
                },
            )
            if (items.proj_prefix === 'WTR') {
                this.$router.replace({
                    name: 'importGeosplitWtr',
                    params: {
                        action: 'read',
                        breadcrumb: nav,
                        active: true,
                        prefix: this.$route.params.prefixPrj,
                        prefixRole: this.$route.params.prefixRole,
                        title: 'Project Import Excel WTR',
                        resource: 'PRJLST',
                        value: items,
                    },
                })
            } else {
                this.$router.replace({
                    name: 'importGeosplit',
                    params: {
                        action: 'read',
                        breadcrumb: nav,
                        active: true,
                        prefix: this.$route.params.prefixPrj,
                        prefixRole: this.$route.params.prefixRole,
                        title: 'Project Import Excel',
                        resource: 'PRJLST',
                        value: items,
                    },
                })
            }
        },
        ImportSplit(items) {
            console.log(items)
            const nav = []
            nav.push(
                {
                    active: false,
                    text: this.$route.params.breadcrumb[0].text,
                },
                {
                    active: false,
                    text: this.$route.params.title,
                },
                {
                    active: true,
                    text: `${items.proj_name}`,
                },
            )
            this.$router.replace({
                name: 'projectGeoSPlit',
                params: {
                    action: 'read',
                    breadcrumb: nav,
                    active: true,
                    prefix: this.$route.params.prefixPrj,
                    prefixRole: this.$route.params.prefixRole,
                    title: 'Project Split',
                    resource: 'PRJLST',
                    value: items,
                },
            })
        },
        RouteEntry(items) {
            const nav = []
            nav.push(
                {
                    active: false,
                    text: this.$route.params.breadcrumb[0].text,
                },
                {
                    active: false,
                    text: this.$route.params.title,
                },
                {
                    active: true,
                    text: `${items.proj_name}`,
                },
            )
            this.$router.replace({
                name: 'menuEntry',
                params: {
                    action: 'read',
                    breadcrumb: nav,
                    active: true,
                    prefix: this.$route.params.prefixPrj,
                    prefixRole: this.$route.params.prefixRole,
                    title: 'Project Entry',
                    resource: 'PRJLST',
                    value: items,
                },
            })
        },
        // eslint-disable-next-line camelcase
        ProjectCadstres(item) {
            const nav = []
            nav.push(
                {
                    active: false,
                    text: this.$route.params.breadcrumb[0].text,
                },
                {
                    active: false,
                    text: this.$route.params.title,
                },
                {
                    active: true,
                    text: item.proj_name,
                },
            )
            this.$router.replace({
                name: 'menuCad',
                params: {
                    action: 'read',
                    breadcrumb: nav,
                    active: true,
                    prefixMng: 'PRJLST',
                    resource: 'PRJLST',
                    title: 'Project Geosplit',
                    value: item,
                },
            })
        },
        selectAllRows() {
            this.$refs.assignTable.selectAllRows()
        },
        onFiltered(_, ind) {
            this.totalRows = ind
            this.currentPage = 1
        },
        unselectAllRows() {
            this.$refs.assignTable.clearSelected()
        },
    },
}
</script>
