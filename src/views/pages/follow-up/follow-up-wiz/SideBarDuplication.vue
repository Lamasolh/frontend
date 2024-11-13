<template>
  <b-sidebar
    id="sidebar"
    ref="assign"
    :visible="isSidebarActive"
    bg-variant="white"
    width="75em"
    shadow
    backdrop
    no-header
    right
    @change="(val) => (isSidebarActive = val)"
  >
    <template #default="{ hide }">
      <b-overlay
        rounded="lg"
        :show="show"
        style="height: 100%"
      >
        <!-- Header -->
        <div
          class="
            d-flex
            justify-content-between
            align-items-center
            content-sidebar-header
            px-2
            py-1
          "
        >
          <h5 class="mb-0">
            Check Duplication
          </h5>

          <feather-icon
            class="ml-1 cursor-pointer"
            icon="XIcon"
            size="16"
            @click="hide"
          />
        </div>
        <b-row class="m-2">
          <b-col>
            <b-table
              ref="assignTable"
              striped
              hover
              :busy="show"
              bordered
              small
              :selected-variant="$store.state.appConfig.layout.skin === 'dark'?'active':'primary'"
              :items="caseItem"
              :fields="caseField"
              empty-text="No matching records found"
              show-empty
              responsive="lg"
            >
              <template #cell(dup_percentage)="row">
                {{ row.item.dup_percentage }}%
              </template>
              <template #cell(show_details)="row">
                <b-button
                  size="sm"
                  class="mr-2"
                  variant="primary"
                  @click="row.toggleDetails"
                >
                  {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
                </b-button>
              </template>
              <template #row-details="row">
                <b-card>
                  <!-- Details-->
                  <b-row class="mb-2">
                    <b-col cols="12">
                      <b-row>
                        <b-col
                          cols="2"
                        >
                          <b>Details:</b>
                        </b-col>
                        <b-col
                          cols="5"
                        >
                          <b class="text-danger">Selected Case:</b>
                        </b-col>
                        <b-col
                          cols="5"
                        >
                          <b class="text-danger">Current Case:</b>
                        </b-col>
                      </b-row>
                    </b-col>
                    <b-col cols="12">
                      <b-row>
                        <b-col
                          cols="1"
                        />
                        <b-col
                          cols="5"
                        >
                          <p style="white-space: pre;">
                            Case Code: {{ row.item.case_code }}</p>
                          <p style="white-space: pre;">
                            Full Name: {{ row.item.full_name }}</p>
                          <p style="white-space: pre;">
                            Phone Number: +{{ row.item.case_phone }}</p>
                          <p style="white-space: pre;">
                            PCR_Date: {{ DateWithFormat(row.item.pcr_date) }}</p>
                          <p style="white-space: pre;">
                            Nationality: {{ nationalityOptions.filter(el=>el.value ===row.item.nationality_id)[0].title }}</p>
                        </b-col>
                        <b-col
                          cols="5"
                        >
                          <p style="white-space: pre;">
                            Case Code: {{ case_code }}</p>
                          <p style="white-space: pre;">
                            Full Name: {{ full_name }}</p>
                          <p style="white-space: pre;">
                            Phone Number: +{{ case_phone }}</p>
                          <p style="white-space: pre;">
                            PCR_Date: {{ DateWithFormat(pcr_date) }}</p>
                          <p style="white-space: pre;">
                            Nationality: {{ nationalityOptions.filter(el=>el.value === nationality_id)[0].title }}</p>
                        </b-col>
                      </b-row>
                    </b-col>
                  </b-row>
                  <br>
                  <!--Current Satus-->
                  <b-row class="mb-2">
                    <b-col cols="12">
                      <b-row>
                        <b-col
                          cols="2"
                        >
                          <b>Current Status:</b>
                        </b-col>
                        <b-col
                          cols="5"
                        >
                          <b class="text-danger">Selected Case:</b>
                        </b-col>
                        <b-col
                          cols="5"
                        >
                          <b class="text-danger">Current Case:</b>
                        </b-col>
                      </b-row>
                    </b-col>
                    <b-col cols="12">
                      <b-row>
                        <b-col
                          cols="2"
                        />
                        <b-col
                          cols="5"
                        >
                          <p
                            style="white-space: pre;"
                          >{{ row.item.current_status }}</p>
                        </b-col>
                        <b-col
                          cols="5"
                        >
                          <p
                            style="white-space: pre;"
                          >{{ current_status }}</p>
                        </b-col>
                      </b-row>
                    </b-col>
                  </b-row>
                  <br>
                  <!-- Address -->
                  <b-row class="mb-2">
                    <b-col cols="12">
                      <b-row>
                        <b-col
                          cols="2"
                        >
                          <b>Address Details:</b>
                        </b-col>
                        <b-col
                          cols="5"
                        >
                          <b class="text-danger">Selected Case:</b>
                        </b-col>
                        <b-col
                          cols="5"
                        >
                          <b class="text-danger">Current Case:</b>
                        </b-col>
                      </b-row>
                    </b-col>
                    <b-col cols="12">
                      <b-row>
                        <b-col
                          cols="2"
                        />
                        <b-col
                          cols="5"
                        >
                          <p>
                            Address: {{ row.item.adresstext }}</p>
                          <p>
                            Governorate: {{ governorateOption.filter(el=> el.value === districtOptions.filter(el=>el.value ===cadOptions.filter(el=>el.value ===row.item.cadastre_id )[0].params )[0].params)[0].title }}</p>
                          <p>
                            district: {{ districtOptions.filter(el=>el.value ===cadOptions.filter(el=>el.value ===row.item.cadastre_id )[0].params )[0].title }}</p>
                          <p>
                            Cadaster: {{ cadOptions.filter(el=>el.value ===row.item.cadastre_id )[0].title }}</p>
                        </b-col>
                        <b-col
                          cols="5"
                        >
                          <p>
                            Address: {{ adresstext }}</p>
                          <p>
                            Governorate: {{ governorateOption.filter(el=> el.value === districtOptions.filter(el=>el.value ===cadOptions.filter(el=>el.value ===row.item.cadastre_id )[0].params )[0].params)[0].title }}</p>
                          <p>
                            district: {{ districtOptions.filter(el=>el.value ===district_id )[0].title }}</p>
                          <p>
                            Cadaster: {{ cadOptions.filter(el=>el.value ===cadastre_id )[0].title }}</p>
                        </b-col>
                      </b-row>
                    </b-col>
                  </b-row>
                  <br>
                  <!-- Delivery -->
                  <b-row class="mb-2">
                    <b-col cols="12">
                      <b-row>
                        <b-col
                          cols="2"
                        >
                          <b>Delivery Details:</b>
                        </b-col>
                        <b-col
                          cols="5"
                        >
                          <b class="text-danger">Selected Case:</b>
                        </b-col>
                        <b-col
                          cols="5"
                        >
                          <b class="text-danger">Current Case:</b>
                        </b-col>
                      </b-row>
                    </b-col>
                    <b-col cols="12">
                      <b-row>
                        <b-col
                          cols="1"
                        />
                        <b-col
                          cols="5"
                        >
                          <p style="white-space: pre;">
                            Delivery Status: {{ dlvOptions.filter(el=>el.value === row.item.delivery_status)[0].title }}</p>
                          <p style="white-space: pre;">
                            Delivery Date: {{ row.item.delivery_date==null ? "None" :DateWithFormat(row.item.delivery_date) }}</p>
                        </b-col>
                        <b-col
                          cols="5"
                        >
                          <p style="white-space: pre;">
                            Delivery Status: {{ "None" }}</p>
                          <p style="white-space: pre;">
                            Delivery Date: {{ "None" }}</p>
                        </b-col>
                      </b-row>
                    </b-col>
                  </b-row>
                  <br>
                  <!-- Family -->
                  <b-row class="mb-2">
                    <b-col cols="12">
                      <b-row>
                        <b-col
                          cols="2"
                        >
                          <b>Family Member:</b>
                        </b-col>
                        <b-col
                          cols="5"
                        >
                          <b class="text-danger">Selected Case:</b>
                        </b-col>
                        <b-col
                          cols="5"
                        >
                          <b class="text-danger">Current Case:</b>
                        </b-col>
                      </b-row>
                    </b-col>
                    <b-col cols="12">
                      <b-row>
                        <b-col
                          cols="1"
                        />
                        <b-col
                          cols="5"
                        >
                          <p style="white-space: pre;">
                            Male Count: {{ row.item.male_count }}</p>
                          <p style="white-space: pre;">
                            female_count: {{ row.item.female_count }}</p>
                          <p style="white-space: pre;">
                            Family Member: {{ row.item.family_members }}</p>
                          <hr>
                          <p style="white-space: pre;">
                            Babies Count: {{ row.item.yng_child_count }}</p>
                          <p style="white-space: pre;">
                            Child Count: {{ row.item.child_count }}</p>
                          <p style="white-space: pre;">
                            Young Count: {{ row.item.young_count }}</p>
                          <p style="white-space: pre;">
                            Tenager Count: {{ row.item.teenager_count }}</p>
                          <p style="white-space: pre;">
                            Adult Count: {{ row.item.adult_count }}</p>
                          <p style="white-space: pre;">
                            Elderly count: {{ row.item.elderly_count }}</p>
                        </b-col>
                        <b-col
                          cols="5"
                        >
                          <p style="white-space: pre;">
                            Male Count: {{ male_count }}</p>
                          <p style="white-space: pre;">
                            female_count: {{ female_count }}</p>
                          <p style="white-space: pre;">
                            Family Member:{{ parseInt(male_count,10) + parseInt(female_count,10) }}</p>
                          <hr>
                          <p style="white-space: pre;">
                            Babies Count: {{ yng_child_count }}</p>
                          <p style="white-space: pre;">
                            Child Count: {{ child_count }}</p>
                          <p style="white-space: pre;">
                            Young Count: {{ young_count }}</p>
                          <p style="white-space: pre;">
                            Tenager Count: {{ teenager_count }}</p>
                          <p style="white-space: pre;">
                            Adult Count: {{ adult_count }}</p>
                          <p style="white-space: pre;">
                            Elderly count:  {{ elderly_count }}</p>
                        </b-col>
                      </b-row>
                    </b-col>
                  </b-row>
                  <br>

                </b-card>
              </template>
            </b-table>
          </b-col>
        </b-row>
      </b-overlay>
    </template>
  </b-sidebar>
</template>

<script>
import Ripple from 'vue-ripple-directive'
import { takeState } from 'vuex-dot'
import moment from 'moment'

export default {
  components: {
  },
  directives: {
    Ripple,
  },
  computed: {
    isSidebarActive: takeState('followUpWiz', 'isSidebarActive').commit('followUpWiz/ACTIVE_SIDEBAR').map(),
    caseItem: takeState('followUpWiz', 'caseItem').map(),
    caseField: takeState('followUpWiz', 'caseField').map(),
    show: takeState('followUpWiz', 'show').map(),
    ...takeState('followUpWiz', 'itemsfamily')
      .expose([
        'yng_child_count',
        'child_count',
        'young_count',
        'teenager_count',
        'adult_count',
        'elderly_count',
        'female_count',
        'infected_count',
        'male_count',
        'pregnant',
        'comments'])
      .commit('followUpWiz/SET_ITEM_FAM')
      .map(),
    ...takeState('followUpWiz', 'items')
      .expose([
        'full_name',
        'org_id',
        'case_phone',
        'nationality_id',
        'referral_id',
        'cadastre_id',
        'address_latitude',
        'address_longitude',
        'adresstext',
        'district_id'])
      .commit('followUpWiz/SET_ITEM')
      .map(),
    ...takeState('followUpWiz', 'items')
      .expose([
        // Global
        'case_code',
        'case_id',
        'full_name',
        'case_phone',
        'created_date',
        'progress_scoring',
        'final_decision',
        'nationality_id',
        'adresstext',
        'referral_id',
        'cadastre_id',
        'district_id',
        'address_latitude',
        'address_longitude',
        'current_status',
      ])
      .commit('followUpWiz/SET_ITEM')
      .map(),
    ...takeState('followUpWiz', 'itemsrec')
      .expose([
        'pcr_date',
        'pcr_photo',
        'pcr_photo_aprv',
      ])
      .commit('followUpWiz/SET_ITEM_REC')
      .map(),
    governorateOption: takeState('global', 'governorate').map(),
    districtOptions: takeState('global', 'district').map(),
    cadOptions: takeState('global', 'municipality').map(),
    typeOptions: takeState('global', 'type').map(),
    dlvOptions: takeState('global', 'delivery_status').map(),

    issOptions: takeState('global', 'issOptions').map(),
    nationalityOptions: takeState('global', 'nationality').map(),

    referral: takeState('followUpWiz', 'referral').commit('followUpWiz/SET_REF').map(),
    governorate: takeState('followUpWiz', 'governorate').commit('followUpWiz/SET_GOV').map(),
    district: takeState('followUpWiz', 'district').commit('followUpWiz/SET_DIS').map(),
    cadaster: takeState('followUpWiz', 'cadaster').commit('followUpWiz/SET_CAD').map(),
    type: takeState('followUpWiz', 'type').commit('followUpWiz/SET_TYPE').map(),
    iss: takeState('followUpWiz', 'iss').commit('followUpWiz/SET_ISS').map(),
    nationality: takeState('followUpWiz', 'nationality').commit('followUpWiz/SET_NAT').map(),
  },
  methods: {
    DateWithFormat(dt) {
      const dat = moment(new Date(dt)).format('MM/DD/YYYY')
      return dat
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
