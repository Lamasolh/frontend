<template>
  <b-card-body>
    <b-row align-h="end">
      <b-col
        sm="12"
        md="4"
        lg="2"
        xl="2"
      >
        <b-dropdown
          id="dropdown-1"
          text="Export"
          variant="info"
          block
        >
          <b-dropdown-item>
            <download-excel
              v-if="nationality.length !=0 && maritalStatus.length !=0 && gender.length !=0

                && disbality.length !=0 && pits.length !=0
              "
              :data="ExportTable"
              :fields="exportField"
              worksheet="Sheet1"
              type="xls"
              name="Family.xls"
              :meta="json_meta"
            >
              Excel
            </download-excel></b-dropdown-item>
          <b-dropdown-item>QR Code(System Code)</b-dropdown-item>
          <b-dropdown-item>QR Code(Organization Code)</b-dropdown-item>
        </b-dropdown>

      </b-col>
      <b-col
        sm="12"
        md="4"
        lg="2"
        xl="2"
      >
        <b-button
          class="mt-1 mt-md-0"
          variant="success"
          block
          @click="Add"
        >
          Add Family
        </b-button>
      </b-col>
    </b-row>
    <br>
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
            @click="$parent.$parent.$parent.$parent.ResetData()"
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
    <br>
    <b-table
      ref="selectableTable"
      striped
      hover
      responsive
      :busy="show"
      bordered
      small
      stacked="md"
      :selected-variant="$store.state.appConfig.layout.skin === 'dark'?'active':'primary'"
      :per-page="perPage"
      :current-page="currentPage"
      :items="itemTable"
      :fields="itemField"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      show-empty
      empty-text="No matching records found"
      primary-key="id"
      :filter="filter"
      :filter-included-fields="filterOn"
    >
      <template #table-busy>
        <div class="text-center text-primary my-2">
          <b-spinner class="align-middle" />
          <strong>Loading...</strong>
        </div>
      </template>
      <template #cell(active)="data">
        {{ data.item.active? 'Yes':'No' }}
      </template>
      <template #cell(dispatched)="data">
        {{ data.item.dispatched? 'Yes':'No' }}
      </template>
      <template #cell(tent)="data">

        {{ tent.filter(
          (it) => it.id === data.item.tent_id
        ).length ===0? "":tent.filter(
          (it) => it.id === data.item.tent_id
        ) [0].code }}
      </template>
      <template #cell(house_hold_id)="data">
        {{ members .filter(
          (it) => it.fam_id === data.item.id && it.family_relation_id===1
        ).length ===0? "": members .filter(
          (it) => it.fam_id === data.item.id && it.family_relation_id===1
        )[0].code }}

      </template>
      <!-- Column: Actions -->
      <template #cell(action)="data">
        <b-button
          variant="info"
          block
          @click="Edit(data.item)"
        >
          <feather-icon icon="EditIcon" />
          <span>Edit</span>
        </b-button>
      </template>
      <template #table-caption>
        <div>
          <span class="text-muted ml-2 mr-4">
            Total Cases: {{ totalRows }}
          </span>
        </div>
      </template>
    </b-table>
    <b-row
      class="m-1"
      align-h="between"
    >
      <b-col
        sm="12"
        md="6"
        lg="2"
        xl="2"
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
        sm="12"
        md="6"
        lg="2"
        xl="2"
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
  </b-card-body>
</template>
<script>
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
import { takeState } from 'vuex-dot'
import generateUniqueId from '@/libs/unique_id'

export default {
  data() {
    return {
      totalRows: null,
      json_meta: [
        [
          {
            key: 'charset',
            value: 'utf-8',
          },
        ],
      ],
    }
  },
  computed: {
    ...takeState('dtMAIN', 'showModalFAM')
      .expose([
        'active',
        'item',
        'listMember',
      ])
      .commit('dtMAIN/SET_MOD_FAM_EXP')
      .map(),
    show: takeState('dtMAIN', 'show').commit('dtMAIN/SET_SHOW').map(),
    perPage: takeState('dtFAM', 'perPage').commit('dtFAM/SET_PER_PAGE').map(),
    pageOptions: takeState('dtFAM', 'pageOptions').map(),
    currentPage: takeState('dtFAM', 'currentPage').commit('dtFAM/SET_CUR_PAGE').map(),
    sortBy: takeState('dtFAM', 'sortBy').commit('dtFAM/SET_SORT_BY').map(),
    sortDesc: takeState('dtFAM', 'sortDesc').commit('dtFAM/SET_SORT_DESC').map(),
    sortDirection: takeState('dtFAM', 'sortDirection').commit('dtFAM/SET_SORT_DIR').map(),
    filter: takeState('dtFAM', 'filter').commit('dtFAM/SET_FILTER').map(),
    filterOn: takeState('dtFAM', 'filterOn').commit('dtFAM/SET_FILTER_ON').map(),
    itemField: takeState('dtFAM', 'itemsField').map(),
    items: takeState('dtFAM', 'items').map(),
    famType: takeState('dtMAIN', 'famType').map(),
    famLocation: takeState('dtMAIN', 'famLocation').map(),
    famStatus: takeState('dtMAIN', 'famStatus').map(),
    installedBy: takeState('dtMAIN', 'installedBy').map(),
    pits: takeState('dtPIT', 'items').map(),
    altPit: takeState('dtMAIN', 'altPit').map(),
    showModalFAM: takeState('dtMAIN', 'showModalFAM').commit('dtMAIN/SET_MOD_FAM').map(),
    disbality: takeState('dtMAIN', 'disability').map(),
    gender: takeState('dtMAIN', 'gender').map(),
    familyrelation: takeState('dtMAIN', 'famRelation').map(),
    maritalStatus: takeState('dtMAIN', 'maritalStatus').map(),
    nationality: takeState('dtMAIN', 'nationality').map(),
    exportField: takeState('dtFAM', 'exportField').map(),
    famMem: takeState('dtFAM', 'famMem').map(),
    members: takeState('dtMEM', 'items').map(),
    tent: takeState('dtTNT', 'items').map(),
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
    ExportTable() {
      const it = this.items
      it.forEach(el => {
        el.status = this.disbality.filter(e => e.id === el.disbality).length === 0
          ? null
          : this.disbality.filter(e => e.id === el.disbality)[0].name
        el.gender = this.gender.filter(e => e.id === el.gender).length === 0
          ? null
          : this.gender.filter(e => e.id === el.gender)[0].name
        el.maritalStatus = this.maritalStatus.filter(e => e.id === el.maritalStatus).length === 0
          ? null
          : this.maritalStatus.filter(e => e.id === el.maritalStatus)[0].name
        el.nationality = this.nationality.filter(e => e.id === el.nationality).length === 0
          ? null
          : this.nationality.filter(e => e.id === el.nationality)[0].name
        el.dispatch = el.dispatched === 1 ? 'Yes' : 'No'
        el.actv = el.active === 1 ? 'Yes' : 'No'
      })
      return it
    },
  },
  mounted() {
    this.totalRows = this.itemTable.length
  },
  methods: {
    Edit(itemOrg) {
      const item = JSON.parse(JSON.stringify(itemOrg))
      console.log('item')
      console.log(item)
      const arr = this.members.filter(el => el.family_id === item.id)
      arr.forEach(element => {
        console.log(element)
        console.log(element.id === item.house_hold_id)
        if (element.id === item.house_hold_id) {
          item.head_is_household = true
          item.head_id = element.id
          item.head_code = element.code
          item.head_reference = element.reference
          item.head_dob = element.dob
          item.head_family_id = element.family_id
          item.head_father_name = element.father_name
          item.head_father_name_ar = element.father_name_ar
          item.head_finger_print = element.finger_print
          item.head_first_name = element.first_name
          item.head_first_name_ar = element.first_name_ar
          item.head_full_name = element.full_name
          item.head_last_name = element.last_name
          item.head_last_name_ar = element.last_name_ar
          item.head_mother_name = element.mother_name
          item.head_mother_name_ar = element.mother_name_ar
          item.head_nationality_id = element.nationality_id
          item.head_note = element.note
          item.head_national_code = element.national_number
          item.head_phone_number = element.phone_number
          item.head_pob = element.pob
          item.head_signature = element.signature
          item.head_tent_code = element.tent_code
          item.head_tent_id = element.tent_id
          item.head_unhcr_code = element.unhcr_code
          item.head_disbality = this.disbality.filter(el => el.id === element.disability_id)[0]
          item.head_gender = this.gender.filter(el => el.id === element.gender_id)[0]
          item.head_nationality = this.nationality.filter(el => el.id === element.nationality_id)[0]
          item.head_maritalStatus = this.maritalStatus.filter(el => el.id === element.marital_status_id)[0]
          item.head_familyrelation = this.familyrelation.filter(el => el.id === element.family_relation_id)[0]
        } else {
          element.is_household = false
          element.familyrelation = this.familyrelation.filter(el => el.id === element.family_relation_id)[0]
          element.disbality = this.disbality.filter(el => el.id === element.disability_id)[0]
          element.gender = this.gender.filter(el => el.id === element.gender_id)[0]
          element.nationality = this.nationality.filter(el => el.id === element.nationality_id)[0]
          element.maritalStatus = this.maritalStatus.filter(el => el.id === element.marital_status_id)[0]
        }
      })
      item.tent = this.tent.filter(el => el.id === item.tent_id)[0]
      item.un_code = item.unhcr_code
      console.log('////////////////////')
      console.log(arr)
      console.log(item)
      this.showModalFAM = {
        active: true,
        item,
        listMember: arr.filter(el => el.is_household === false),
      }
    },
    Add() {
      const genId = generateUniqueId('MEM_')
      this.showModalFAM = {
        active: true,
        item: {
          code: generateUniqueId('FAM_'),
          head_code: genId,
          head_reference: genId,
          head_disbality: this.disbality.filter(el => el.id === 1)[0],
          head_gender: this.gender.filter(el => el.id === 2)[0],
          head_nationality: this.nationality.filter(el => el.id === 3)[0],
          head_maritalStatus: this.maritalStatus.filter(el => el.id === 3)[0],
          is_household: 1,
          head_familyrelation: {
            id: 1,
            name: 'Head Of HouseHold',
          },
        },
        listMember: [
        ],
      }
    },
  },
}
</script>

<style lang="scss">
    @import '@core/scss/vue/libs/vue-select.scss';
    .xlarge {
        min-width: 250px;
    }
    .large {
        min-width: 200px;
    }
    .iss {
        min-width: 50px;
    }
    .action {
        min-width: 30px;
}
</style>
