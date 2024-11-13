<template>
  <div ref="RFET">
    <b-overlay
      :show="show"
      rounded="sm"
    >
      <div>
        <b-form
          ref="form"
          class="repeater-form"
          @submit.prevent
        >
          <validation-observer ref="simpleRules">
            <b-card
              id="bcard"
              no-body
            >
              <b-card-header class="pb-50">
                <h4>Basic Info</h4>
              </b-card-header>
              <b-card-body>
                <div>
                  <!-- Row Loop -->
                  <b-row>
                    <!-- Referral -->
                    <b-col cols="3">
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="Referral"
                      >
                        <b-form-group label="Case Referred by:">
                          <v-select
                            v-model="referral"
                            placeholder="Select Referral"
                            label="title"
                            :state="errors.length > 0 ? false : null"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :options="referralOptions"
                          />
                          <small class="text-danger mb-1">{{
                            errors[0]
                          }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <!-- Full Name -->
                    <b-col cols="3">
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="Full Name"
                      >
                        <b-form-group label="Full Name">
                          <b-form-input
                            id="full-name"
                            v-model="fullname"
                            :state="errors.length > 0 ? false : null"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            type="text"
                            placeholder="Enter Full Name"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <!-- Phone -->
                    <b-col cols="3">
                      <b-form-group label="Phone">
                        <validation-provider
                          v-slot="{ errors }"
                          :rules="
                            'required|' +
                              `${countryid === 1 ? 'phonelbed' : 'min:8|max:11'}`
                          "
                          name="Phone Number"
                          style="display: inline"
                        >
                          <b-input-group>
                            <template #prepend>
                              <b-dropdown
                                :text="country"
                                variant="outline-primary"
                              >
                                <b-dropdown-item
                                  v-for="ct in phoneOp.options"
                                  :key="ct.id"
                                  :value="ct.value"
                                  @click="dropSelect(ct.value)"
                                >
                                  {{ ct.title }}
                                </b-dropdown-item>
                              </b-dropdown>
                            </template>
                            <b-form-input
                              id="phone"
                              v-model="phone"
                              class="form-control"
                              type="tel"
                              :formatter="formatter"
                              :state="errors.length > 0 ? false : null"
                              :placeholder="phoneOp.placeholder"
                            />
                          </b-input-group>
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-group>
                    </b-col>
                    <!-- PCR Date -->
                    <b-col md="3">
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="PCR Date"
                      >
                        <b-form-group label="PCR Date">
                          <flat-pickr
                            v-model="pcr_date"
                            class="form-control"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            placeholder="Enter PCR Date"
                            :config="{
                              maxDate: maxDate
                            }"
                            :state="errors.length > 0 ? false : null"
                          />
                          <small class="text-danger">{{
                            errors[0] != null
                              ? `The date must be between today and ${priority_period} days
                                                                                                              before`
                              : ''
                          }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                  </b-row>
                  <!-- Adresses -->
                  <div>
                    <!-- Gov/ Dis/Type/Cadaster -->
                    <b-row>
                      <!-- Gov -->
                      <b-col cols="3">
                        <validation-provider
                          v-slot="{ errors }"
                          rules="required"
                          name="Governorate"
                        >
                          <b-form-group label="Governorate">
                            <v-select
                              v-model="governorate"
                              label="title"
                              placeholder="ALL"
                              :dir="
                                $store.state.appConfig.isRTL ? 'rtl' : 'ltr'
                              "
                              :options="governorateOption"
                              :state="errors.length > 0 ? false : null"
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                          </b-form-group>
                        </validation-provider>
                      </b-col>
                      <!-- District -->
                      <b-col cols="3">
                        <validation-provider
                          v-slot="{ errors }"
                          rules="required"
                          name="District"
                        >
                          <b-form-group label="District">
                            <v-select
                              v-model="district"
                              placeholder="ALL"
                              label="title"
                              :dir="
                                $store.state.appConfig.isRTL ? 'rtl' : 'ltr'
                              "
                              :options="districtSelect"
                              :state="errors.length > 0 ? false : null"
                              @input="(value) => ChangeDistrict(value)"
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                          </b-form-group>
                        </validation-provider>
                      </b-col>
                      <!-- Type -->
                      <b-col cols="3">
                        <validation-provider
                          v-slot="{ errors }"
                          rules="required"
                          name="Type"
                        >
                          <b-form-group label="Residential Type">
                            <v-select
                              v-model="type"
                              :dir="
                                $store.state.appConfig.isRTL ? 'rtl' : 'ltr'
                              "
                              label="title"
                              placeholder="ALL"
                              :options="typeOptions"
                              :state="errors.length > 0 ? false : null"
                              @input="(value) => ChangeType(value)"
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                          </b-form-group>
                        </validation-provider>
                      </b-col>
                      <!-- Cadaster -->
                      <b-col cols="3">
                        <validation-provider
                          v-slot="{ errors }"
                          rules="required"
                          name="Cadaster"
                        >
                          <b-form-group label="Cadaster">
                            <v-select
                              v-model="cadaster"
                              placeholder="ALL"
                              label="title"
                              :dir="
                                $store.state.appConfig.isRTL ? 'rtl' : 'ltr'
                              "
                              :options="cadOptions"
                              :state="errors.length > 0 ? false : null"
                              @input="(value) => ChangeCAD(value)"
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                          </b-form-group>
                        </validation-provider>
                      </b-col>
                    </b-row>

                    <!-- Settlement /Add/Update/Reset -->

                    <!-- sss /Add/Update/Reset -->
                    <b-row>
                      <!-- Settlement -->
                      <b-col
                        v-if="type == null ? false : type.value > 3"
                        cols="3"
                      >
                        <div v-if="type == null ? false : type.value > 3">
                          <validation-provider
                            v-if="type == null ? false : type.value > 3"
                            v-slot="{ errors }"
                            rules="required"
                            name="Settlement"
                          >
                            <b-form-group label="Settlement">
                              <v-select
                                v-if="type == null ? false : type.value > 3"
                                v-model="iss"
                                placeholder="ALL"
                                label="title"
                                :dir="
                                  $store.state.appConfig.isRTL ? 'rtl' : 'ltr'
                                "
                                :state="errors.length > 0 ? false : null"
                                :options="issOptions"
                              />
                              <small class="text-danger">{{ errors[0] }}</small>
                            </b-form-group>
                          </validation-provider>
                        </div>
                      </b-col>
                      <b-col cols="3">
                        <b-form-group
                          label="Gender"
                          label-for="Gender"
                        >
                          <v-select
                            v-model="gender"
                            placeholder="Select Gender"
                            label="title"
                            :clearable="false"
                            :options="genderOptions"
                          />
                        </b-form-group>
                      </b-col>
                      <!-- PCR Result -->
                      <b-col cols="3">
                        <validation-provider
                          v-slot="{ errors }"
                          rules="required"
                          name="PCR Result"
                        >
                          <b-form-group
                            label="PCR Result"
                            label-for="PCR Result"
                          >
                            <v-select
                              v-model="pcres"
                              placeholder="Select PCR Result"
                              label="title"
                              :clearable="false"
                              :dir="
                                $store.state.appConfig.isRTL ? 'rtl' : 'ltr'
                              "
                              :options="pcrResult"
                              :state="errors.length > 0 ? false : null"
                            />
                            <small class="text-danger mb-1">{{
                              errors[0]
                            }}</small>
                          </b-form-group>
                        </validation-provider>
                      </b-col>
                    </b-row>
                    <b-row align-h="between">
                      <b-col />
                      <b-col cols="auto">
                        <b-button
                          class="ml-1 mr-1 mt-2"
                          variant="success"
                          type="submit"
                          :disabled="isEdit || isFullData"
                          @click="AddFullData"
                        >
                          <feather-icon
                            icon="SaveIcon"
                            class="mr-1"
                          />
                          <span>Add Full Data</span>
                        </b-button>
                        <!-- Add -->
                        <b-button
                          v-if="isEdit === false"
                          class="mr-2 mt-2"
                          variant="primary"
                          :disabled="isSaved || isFullData"
                          @click="AddItem"
                        >
                          <feather-icon
                            icon="PlusIcon"
                            class="mr-1"
                          />
                          <span>Add New</span>
                        </b-button>
                        <!-- Update -->
                        <b-button
                          v-if="isEdit === true"
                          variant="info"
                          class="mr-2 mt-2"
                          @click="Update"
                        >
                          <feather-icon
                            icon="EditIcon"
                            class="mr-25"
                          />
                          <span>Update</span>
                        </b-button>
                        <!-- Cancel Update -->
                        <b-button
                          v-if="isEdit === true"
                          variant="danger"
                          class="mr-2 mt-2"
                          @click="Cancel_Edit"
                        >
                          <feather-icon
                            icon="XIcon"
                            class="mr-25"
                          />
                          <span>Cancel</span>
                        </b-button>
                        <!-- Reset -->
                        <b-button
                          variant="warning"
                          class="mt-2"
                          @click="ResetDataRow"
                        >
                          <feather-icon
                            icon="RefreshCwIcon"
                            class="mr-1"
                          />
                          <span>Reset</span>
                        </b-button>
                      </b-col>
                    </b-row>
                  </div>
                </div>
              </b-card-body>
            </b-card>
            <ReferralImport
              v-show="isFullData"
              :is-edit="isEdit"
            />
          </validation-observer>
          <b-card no-body>
            <b-card-header class="pb-50">
              <h4>Data</h4>
            </b-card-header>
            <validation-observer ref="bTable">
              <b-card-body>
                <b-table
                  ref="selectableTable"
                  bordered
                  responsive
                  show-empty
                  empty-text="No matching records found"
                  :items="items"
                  :busy="isFullData"
                  :selected-variant="
                    $store.state.appConfig.layout.skin === 'dark'
                      ? 'active'
                      : 'primary'
                  "
                  sticky-header
                  data-boundary="window"
                  style="max-height: 450px"
                  :fields="itemField"
                >
                  <template #table-caption>
                    <div>
                      <span class="text-muted ml-2 mr-4">
                        Total Cases: {{ items.length }}
                      </span>
                    </div>
                  </template>
                  <template #cell(id)="data">
                    <p>{{ data.index + 1 }}</p>
                  </template>
                  <template #cell(referral)="data">
                    <p>
                      {{
                        data.item.referral != null
                          ? data.item.referral.title
                          : ''
                      }}
                    </p>
                  </template>
                  <template #cell(name)="data">
                    <p>
                      {{ data.item.name }}
                    </p>
                  </template>
                  <template #cell(phone)="data">
                    <p>
                      {{
                        (data.item.countryid === 1 ? '+961' : '+963') +
                          data.item.phone
                      }}
                    </p>
                  </template>
                  <template #cell(pcr_date)="data">
                    <p>
                      {{ data.item.pcr_date }}
                    </p>
                  </template>
                  <template #cell(priority)="data">
                    <b-badge
                      pill
                      :variant="
                        $store.getters['global/priority'].filter(
                          (it) => it.value === data.item.priority
                        )[0].variant
                      "
                    >
                      {{
                        $store.getters['global/priority'].filter(
                          (it) => it.value === data.item.priority
                        )[0].title
                      }}
                    </b-badge>
                  </template>
                  <template #cell(nationality)="data">
                    <p>
                      {{
                        data.item.nationality != null
                          ? data.item.nationality.title
                          : 'None'
                      }}
                    </p>
                  </template>
                  <template #cell(governorate)="data">
                    <p>
                      {{
                        data.item.governorate == null
                          ? 'None'
                          : data.item.governorate.title
                      }}
                    </p>
                  </template>
                  <template #cell(district)="data">
                    <p>
                      {{
                        data.item.district == null
                          ? 'None'
                          : data.item.district.title
                      }}
                    </p>
                  </template>
                  <template #cell(type)="data">
                    <p>
                      {{ data.item.type == null ? '' : data.item.type.title }}
                    </p>
                  </template>
                  <template #cell(pcr_result)="data">
                    <p>
                      {{
                        data.item.pcres == null ? 'None' : data.item.pcres.title
                      }}
                    </p>
                  </template>
                  <template #cell(gender)="data">
                    <p>
                      {{
                        data.item.gender == null
                          ? 'None'
                          : data.item.gender.title
                      }}
                    </p>
                  </template>
                  <template #cell(employment)="data">
                    <p>
                      {{
                        data.item.employment == null
                          ? ''
                          : data.item.employment.title
                      }}
                    </p>
                  </template>
                  <template #cell(caregiver)="data">
                    <p>
                      {{
                        data.item.caregiver == null
                          ? ''
                          : data.item.caregiver.title
                      }}
                    </p>
                  </template>
                  <template #cell(cadaster)="data">
                    <p>
                      {{
                        data.item.cadaster == null
                          ? 'None'
                          : data.item.cadaster.title
                      }}
                    </p>
                  </template>
                  <template #cell(adresstext)="data">
                    <p>
                      {{ data.item.adresstext }}
                    </p>
                  </template>
                  <template #cell(iss)="data">
                    <p>
                      {{ data.item.iss == null ? 'None' : data.item.iss.title }}
                    </p>
                  </template>

                  <template #cell(infected_count)="data">
                    <p>
                      {{
                        data.item.infected_count == null
                          ? '0'
                          : data.item.infected_count
                      }}
                    </p>
                  </template>

                  <template #cell(male_count)="data">
                    <p>
                      {{
                        data.item.male_count == null
                          ? '0'
                          : data.item.male_count
                      }}
                    </p>
                  </template>

                  <template #cell(female_count)="data">
                    <p>
                      {{
                        data.item.female_count == null
                          ? '0'
                          : data.item.female_count
                      }}
                    </p>
                  </template>

                  <template #cell(yng_child_count)="data">
                    <p>
                      {{
                        data.item.yng_child_count == null
                          ? '0'
                          : data.item.yng_child_count
                      }}
                    </p>
                  </template>

                  <template #cell(child_count)="data">
                    <p>
                      {{
                        data.item.child_count == null
                          ? 'False'
                          : data.item.child_count
                      }}
                    </p>
                  </template>

                  <template #cell(young_count)="data">
                    <p>
                      {{
                        data.item.young_count == null
                          ? 'False'
                          : data.item.young_count
                      }}
                    </p>
                  </template>

                  <template #cell(teenager_count)="data">
                    <p>
                      {{
                        data.item.teenager_count == null
                          ? 'False'
                          : data.item.teenager_count
                      }}
                    </p>
                  </template>
                  <template #cell(adult_count)="data">
                    <p>
                      {{
                        data.item.adult_count == null
                          ? 'False'
                          : data.item.adult_count
                      }}
                    </p>
                  </template>
                  <template #cell(elderly_count)="data">
                    <p>
                      {{
                        data.item.elderly_count == null
                          ? 'False'
                          : data.item.elderly_count
                      }}
                    </p>
                  </template>
                  <template #cell(house_hold)="data">
                    <p>
                      {{ data.item.house_hold === true ? 'Yes' : 'No' }}
                    </p>
                  </template>
                  <template #cell(pregnant)="data">
                    <p>
                      {{ data.item.pregnant === true ? 'Yes' : 'No' }}
                    </p>
                  </template>
                  <template #cell(isolation_room)="data">
                    <p>
                      {{ data.item.isolation_room === true ? 'Yes' : 'No' }}
                    </p>
                  </template>
                  <template #cell(monthly_payments)="data">
                    <p>
                      {{ data.item.monthly_payments === true ? 'Yes' : 'No' }}
                    </p>
                  </template>
                  <template #cell(show_details)="row">
                    <b-button
                      size="sm"
                      class="mr-2"
                      block
                      variant="primary"
                      @click="row.toggleDetails"
                    >
                      {{ row.detailsShowing ? 'Hide' : 'Show' }}
                      Details
                    </b-button>
                  </template>
                  <template #row-details="row">
                    <b-card>
                      <b-row align-h="end">
                        <b-col
                          cols="1"
                          class="text-sm-right"
                        >
                          <b>More Field:</b>
                        </b-col>
                        <b-col cols="1">
                          <p
                            v-for="item in row.item.multiField"
                            :key="item.id"
                          >
                            {{ item.name }}({{ item.type.title }}):
                            {{
                              item.type.id === 4 ? item.value.title : item.value
                            }}
                          </p>
                        </b-col>
                      </b-row>
                    </b-card>
                  </template>

                  <!-- Column: Actions -->
                  <template #cell(action)="data">
                    <b-button
                      variant="danger"
                      :disabled="isEdit || !data.item.enable || idEdit != null"
                      block
                      @click="Remove(data.index)"
                    >
                      <feather-icon icon="TrashIcon" />
                      <span>Remove</span>
                    </b-button>
                    <b-button
                      variant="info"
                      :disabled="isEdit || !data.item.enable || idEdit != null"
                      block
                      @click="Edit(data.item.id, data.index)"
                    >
                      <feather-icon icon="EditIcon" />
                      <span>Edit</span>
                    </b-button>
                  </template>
                </b-table>
                <b-card-footer>
                  <!-- Row Option -->
                  <b-row
                    align-h="between"
                    class="justify-content"
                  >
                    <b-col cols="auto">
                      <input
                        ref="import"
                        type="file"
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        hidden
                        @change="ImportData"
                      >
                      <!--  :disabled="isEdit || isFullData"-->
                      <b-button
                        variant="warning"
                        :disabled="isEdit || isFullData"
                        @click="onPickFile(3)"
                      >
                        <feather-icon
                          icon="FilePlusIcon"
                          class="mr-1"
                        />
                        <span>Import(Beta Version)</span>
                      </b-button>
                      <b-button
                        variant="info"
                        :disabled="isEdit || isFullData"
                        @click="Export"
                      >
                        <feather-icon
                          icon="FilePlusIcon"
                          class="mr-1"
                        />
                        <span>Export Template</span>
                      </b-button>
                    </b-col>
                    <b-col cols="auto">
                      <b-button
                        class="ml-1 mr-1"
                        variant="success"
                        type="submit"
                        :disabled="isEdit || isFullData"
                        @click="SaveData"
                      >
                        <feather-icon
                          icon="SaveIcon"
                          class="mr-1"
                        />
                        <span>Submit</span>
                      </b-button>
                      <b-button
                        variant="warning"
                        :disabled="isEdit || isFullData"
                        @click="ResetData"
                      >
                        <feather-icon
                          icon="RefreshCwIcon"
                          class="mr-1"
                        />
                        <span>Reset</span>
                      </b-button>
                    </b-col>
                  </b-row>
                </b-card-footer>
              </b-card-body>
            </validation-observer>
          </b-card>
        </b-form>
      </div>
    </b-overlay>
  </div>
</template>

<script>
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-expressions */
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import vSelect from 'vue-select'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import store from '@/store'
import { takeState } from 'vuex-dot'
import ReferralImport from '@/views/pages/referral-max/ReferralImport.vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import readXlsxFile from 'read-excel-file'

import flatPickr from 'vue-flatpickr-component'
import axios from 'axios'

export default {
  components: {
    vSelect,
    ValidationProvider,
    ValidationObserver,
    flatPickr,
    ReferralImport,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  data() {
    return {
      isEdit: false,
      idEdit: null,

      ///
      isFullData: false,
      ///
      isSaved: false,
      importIndex: null,
    }
  },
  computed: {
    saved: takeState('referralClr', 'saved')
      .commit('referralClr/SET_SAVED')
      .map(),
    show: takeState('referralClr', 'show').commit('referralClr/SET_SHOW').map(),
    pcrResultOption: takeState('global', 'pcr_result').map(),
    genderOp: takeState('global', 'gender').map(),
    emplymntOptions: takeState('global', 'employment').map(),
    giveroption: takeState('global', 'caregiver').map(),
    settType: takeState('global', 'type').map(),

    // Selected
    // referralOptions: takeState('global', 'referral').map(),
    priority_period: takeState('referralClr', 'priority_period').map(),
    priority_interval: takeState('referralClr', 'priority_interval').map(),
    governorateOption: takeState('global', 'governorate').map(),
    districtOptions: takeState('global', 'district').map(),
    cadOptions: takeState('referralClr', 'cadOptions')
      .commit('referralClr/SET_CAD_OPT')
      .map(),
    typeOptions: takeState('referralClr', 'typeOptions')
      .commit('referralClr/SET_TYPE_OPT')
      .map(),
    issOptions: takeState('referralClr', 'issOptions')
      .commit('referralClr/SET_ISS_OPT')
      .map(),
    phoneOp: takeState('referralClr', 'phoneOp').map(),
    itemField: takeState('referralClr', 'itemField').map(),
    // Data
    fullname: takeState('referralClr', 'fullname')
      .commit('referralClr/SET_NAME')
      .map(),
    phone: takeState('referralClr', 'phone')
      .commit('referralClr/SET_PHONE')
      .map(),
    country: takeState('referralClr', 'country')
      .commit('referralClr/SET_CTR')
      .map(),
    countryid: takeState('referralClr', 'countryid')
      .commit('referralClr/SET_CTR_ID')
      .map(),
    pcr_date: takeState('referralClr', 'pcr_date')
      .commit('referralClr/SET_PCR_DATE')
      .map(),
    referral: takeState('referralClr', 'referral')
      .commit('referralClr/SET_REF')
      .map(),
    governorate: takeState('referralClr', 'governorate')
      .commit('referralClr/SET_GOV')
      .map(),
    district: takeState('referralClr', 'district')
      .commit('referralClr/SET_DIS')
      .map(),
    cadaster: takeState('referralClr', 'cadaster')
      .commit('referralClr/SET_CAD')
      .map(),
    type: takeState('referralClr', 'type').commit('referralClr/SET_TYPE').map(),
    iss: takeState('referralClr', 'iss').commit('referralClr/SET_ISS').map(),
    ///
    pcres: takeState('referralClr', 'pcres')
      .commit('referralClr/SET_PCR_RES')
      .map(),
    gender: takeState('referralClr', 'gender')
      .commit('referralClr/SET_GEN')
      .map(),

    //
    family_members: takeState('referralClr', 'family_members')
      .commit('referralClr/SET_FALMILY')
      .map(),
    male_count: takeState('referralClr', 'male_count')
      .commit('referralClr/SET_MALE')
      .map(),
    female_count: takeState('referralClr', 'female_count')
      .commit('referralClr/SET_FEMALE')
      .map(),
    infected_count: takeState('referralClr', 'infected_count')
      .commit('referralClr/SET_INFECTED')
      .map(),

    yng_child_count: takeState('referralClr', 'yng_child_count')
      .commit('referralClr/SET_YNG_CHILD')
      .map(),
    child_count: takeState('referralClr', 'child_count')
      .commit('referralClr/SET_CHILD')
      .map(),
    young_count: takeState('referralClr', 'young_count')
      .commit('referralClr/SET_YOUNG')
      .map(),
    teenager_count: takeState('referralClr', 'teenager_count')
      .commit('referralClr/SET_TEENAGER')
      .map(),
    adult_count: takeState('referralClr', 'adult_count')
      .commit('referralClr/SET_ADULT')
      .map(),
    elderly_count: takeState('referralClr', 'elderly_count')
      .commit('referralClr/SET_ELDERLY')
      .map(),

    ///
    employment: takeState('referralClr', 'employment')
      .commit('referralClr/SET_EMPL')
      .map(),
    caregiver: takeState('referralClr', 'caregiver')
      .commit('referralClr/SET_GVR')
      .map(),
    house_hold: takeState('referralClr', 'house_hold')
      .commit('referralClr/SET_HOUSEHOLD')
      .map(),
    pregnant: takeState('referralClr', 'pregnant')
      .commit('referralClr/SET_PREGNANT')
      .map(),
    monthly_payments: takeState('referralClr', 'monthly_payments')
      .commit('referralClr/SET_DUEPAY')
      .map(),
    isolation_room: takeState('referralClr', 'isolation_room')
      .commit('referralClr/SET_ISOL')
      .map(),
    adresstext: takeState('referralClr', 'adresstext')
      .commit('referralClr/SET_ADDRESS')
      .map(),
    multiField: takeState('referralClr', 'filedOptions').map(),

    districtSelect() {
      return this.districtOptions.filter(
        item => item.params
          === (this.governorate != null ? this.governorate.value : null),
      )
    },
    referralOptions() {
      return this.$store.getters['global/referral'].filter(
        el => el.isEnable === 1,
      )
    },

    ///
    items: takeState('referralClr', 'items').map(),
    maxDate() {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      // 15th in two months
      const maxDate = new Date(today)
      return maxDate
    },
    minDate() {
      const d = new Date()
      d.setDate(d.getDate() - 7)
      return d
    },
    pcrResult() {
      return this.pcrResultOption.slice(0, -1)
    },
    genderOptions() {
      const op = [...this.genderOp]
      op.shift()
      op.pop()
      return op
    },
  },
  mounted() {
    this.ResetData()
  },
  methods: {
    ChangeGovItem(it) {
      console.log('////')
      console.log(it)
      it.district = null
      it.cadaster = null
      it.iss = null
      it.type = null
      it.cadOptions = []
      it.issOptions = []
      it.typeOptions = []
      it.districtOptions = this.districtOptions.filter(
        item => item.params === (it.governorate != null ? it.governorate.value : null),
      )
      console.log('// End//')
    },
    ChangeDisItem(it) {
      it.cadaster = null
      it.iss = null
      it.type = null
      it.cadOptions = []
      it.issOptions = []
      it.typeOptions = []
      if (it.district != null) {
        if (it.type != null) {
          this.$store.dispatch('referralClr/GET_CAD_ITEM', it).then(() => {})
        } else {
          this.$store.dispatch('referralClr/GET_TYPE_ITEM', it).then(() => {})
        }
      }
    },
    ChangeTypeItem(it) {
      it.cadaster = null
      it.iss = null
      it.cadOptions = []
      it.issOptions = []
      let nat
      switch (it.type.value) {
        case 1:
          nat = 2
          break
        case 2:
          nat = 3
          break
        case 3:
          nat = 5
          break
        case 4:
          nat = 3
          break
        case 5:
          nat = 3
          break
        case 6:
          nat = 4
          break
        case 7:
          nat = 4
          break
        default:
          nat = 2
      }
      // eslint-disable-next-line prefer-destructuring
      it.nationality = this.$store.getters['global/nationality'].filter(
        itm => itm.value === nat,
      )[0]
      this.$refs.selectableTable.refresh()
      if (it.type != null) {
        if (it.district != null) {
          this.$nextTick(() => {
            this.$store.dispatch('referralClr/GET_CAD_ITEM', it).then(() => {
              this.$refs.selectableTable.refresh()
            })
          })
        } else {
          it.cadOptions = []
        }
      }
    },
    ChangeCADItem(it) {
      it.iss = null
      it.issOptions = []
      if (it.cadaster != null) {
        if (it.type.value > 3) {
          this.$store.dispatch('referralClr/GET_ISS_ITEM', it)
        }
      }
      this.$nextTick(() => {
        this.$refs.selectableTable.refresh()
      })
    },
    ChangeDistrict(value) {
      if (value != null) {
        if (this.type != null) {
          this.$store.dispatch('referralClr/GET_CAD')
        } else {
          this.$store.dispatch('referralClr/GET_TYPE')
        }
      }
    },
    ChangeType(value) {
      if (value != null) {
        if (this.district != null) {
          this.$store.dispatch('referralClr/GET_CAD')
        } else {
          this.cadOptions = []
        }
      }
    },
    ChangeCAD(value) {
      if (value != null) {
        if (this.type.value > 3) {
          this.$store.dispatch('referralClr/GET_ISS')
        }
      }
    },
    Edit(id, index) {
      this.isEdit = true
      this.isFullData = true
      this.idEdit = id
      window.scrollTo(0, 0)
      this.$store.commit('referralClr/EDIT_MODE', index)
      this.$forceUpdate()
    },
    AddFullData() {
      this.isFullData = true
      this.$forceUpdate()
    },
    Update() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          const fl = this.items.filter(
            it => it.phone === this.phone
              && it.countryid === this.countryid
              && it.id !== this.idEdit,
          )
          console.log(fl)
          console.log(this.idEdit)
          if (fl.length === 0) {
            store.commit('referralClr/EDIT_ITEMS', {
              id: this.idEdit,
            })
            this.Cancel_Edit()
          } else {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Case is duplicated',
                icon: 'EditIcon',
                variant: 'warning',
              },
            })
          }
        }
      })
    },
    Cancel_Edit() {
      this.isEdit = false
      this.isFullData = false
      this.idEdit = null
      this.ResetDataRow()
    },
    Remove(index) {
      this.$store.commit('referralClr/REM_ITEMS', { index })
    },
    removeAllItem() {
      store.commit('referralClr/RESET_ALL')
    },
    formatter(value) {
      const fr = this.fixNumbers(value)
      return fr.replace(/[^0-9]/g, '')
    },
    fixNumbers(str) {
      if (typeof str === 'string') {
        const persianNumbers = [
          /۰/g,
          /۱/g,
          /۲/g,
          /۳/g,
          /۴/g,
          /۵/g,
          /۶/g,
          /۷/g,
          /۸/g,
          /۹/g,
        ]
        const arabicNumbers = [
          /٠/g,
          /١/g,
          /٢/g,
          /٣/g,
          /٤/g,
          /٥/g,
          /٦/g,
          /٧/g,
          /٨/g,
          /٩/g,
        ]
        for (let i = 0; i < 10; i += 1) {
          // eslint-disable-next-line no-param-reassign
          str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i)
        }
      }
      return str
    },
    SaveData() {
      if (this.items.filter(it => it.enable === true).length > 0) {
        this.$refs.selectableTable.refresh()
        this.$refs.bTable.validate().then(success => {
          if (success) {
            this.items.forEach(element => {
              if (element.edit === true) {
                element.edit = false
              }
            })
            this.$store
              .dispatch('referralClr/SAVE_DATA', {
                prefix: this.$route.params.prefixPrj,
              })
              .then(() => {
                this.$forceUpdate()
                this.isSaved = true
                this.$refs.selectableTable.refresh()
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Operation Completed, Check result',
                    icon: 'EditIcon',
                    variant: 'success',
                  },
                })
                this.ResetDataRow()
                this.$refs.selectableTable.refresh()
              })
              .catch(error => {
                console.log(error)
                this.$swal({
                  title: 'Error!',
                  text: 'Please check internet connection and try again',
                  icon: 'error',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                })
                this.$refs.selectableTable.refresh()
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
            this.$refs.selectableTable.refresh()
          }
        })
      } else {
        this.$swal({
          title: 'Attention!',
          text: 'Is no record to save',
          icon: 'warning',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
      }
    },
    dropSelect(value) {
      console.log(value)
      this.countryid = value
      this.country = this.phoneOp.options.filter(
        ct => ct.value === value,
      )[0].text
    },
    dropSelectItem(it, value) {
      console.log(value)
      it.countryid = value
      it.country = this.phoneOp.options.filter(
        ct => ct.value === value,
      )[0].text
    },
    AddItem() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          const fl = this.items.filter(
            it => it.phone === this.phone && it.countryid === this.countryid,
          )
          console.log(fl.length === 0)
          if (fl.length === 0) {
            const id = store.getters['referralClr/lastId']
            store.dispatch('referralClr/ADD_ITEMS', {
              id: id + 1,
            })
            this.ResetDataRow()
          } else {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Case is duplicated',
                icon: 'EditIcon',
                variant: 'warning',
              },
            })
          }
        }
      })
    },
    onPickFile(index) {
      console.log(index)
      this.importIndex = index
      this.$refs.import.click()
    },
    /* async ExportAI() {
      this.$store
        .dispatch('referralClr/GetExcelData', {
          prefix: this.$route.params.prefixPrj,
        })
        .then(async res => {
          console.log('/////////////', res)
          console.log('Excel Data AI')
          const workbook = new ExcelJS.Workbook()
          workbook.creator = 'RDMS'
          workbook.lastModifiedBy = 'RDMS'
          workbook.created = new Date()
          workbook.modified = new Date()
          const worksheet = workbook.addWorksheet('Data')

          const pcr = workbook.addWorksheet('PCRResult')
          pcr.state = 'veryHidden'
          this.pcrResultOption.forEach(el => {
            pcr.addRows([[el.title]])
          })
          const cargiver = workbook.addWorksheet('Caregiver')
          cargiver.state = 'veryHidden'
          this.giveroption.forEach(el => {
            cargiver.addRows([[el.title]])
          })
          const emp = workbook.addWorksheet('Employment')
          emp.state = 'veryHidden'
          this.emplymntOptions.forEach(el => {
            emp.addRows([[el.title]])
          })
          const gen = workbook.addWorksheet('Gender')
          gen.state = 'veryHidden'
          const gnOp = [...this.genderOp]
          gnOp.shift()
          gnOp.pop()
          gnOp.forEach(el => {
            gen.addRows([[el.title]])
          })
          const op = workbook.addWorksheet('Operation')
          op.state = 'veryHidden'
          op.addRows([['Yes'], ['No']])

          const ref = workbook.addWorksheet('Referral')
          ref.state = 'veryHidden'
          this.referralOptions.forEach(el => {
            ref.addRows([[el.title]])
          })
          const tp = workbook.addWorksheet('Residential')
          tp.state = 'veryHidden'
          this.settType.forEach(el => {
            tp.addRows([[el.title]])
          })

          const cad = workbook.addWorksheet('Cadastre')
          cad.state = 'veryHidden'
          res.cad.forEach(el => {
            cad.addRows([[el.cadastre_name]])
          })
          const iss = workbook.addWorksheet('Settlement')
          iss.state = 'veryHidden'
          res.iss.forEach(el => {
            iss.addRows([[el.is_name]])
          })

          const columns = [
            { header: 'Referral', key: 'referral', width: 15 },
            { header: 'Name', key: 'name', width: 25 },
            { header: 'Country Phone', key: 'countryPhone', width: 15 },
            { header: 'Phone', key: 'phone', width: 15 },
            { header: 'PCR Date', key: 'PCRDate', width: 15 },
            { header: 'Residential Type', key: 'residentialType', width: 20 },
            { header: 'Cadaster', key: 'cadaster', width: 15 },
            { header: 'Settlement', key: 'settlement', width: 15 },
            { header: 'PCR Result', key: 'PCRResult', width: 15 },
            { header: 'Gender', key: 'gender', width: 10 },
            { header: 'Male Count', key: 'maleCount', width: 15 },
            { header: 'Female Count', key: 'femaleCount', width: 15 },
            { header: 'Infected Count', key: 'infectedCount', width: 15 },
            { header: 'Babies Count', key: 'babiesCount', width: 15 },
            { header: 'Child Count', key: 'childCount', width: 15 },
            { header: 'Young Count', key: 'youngCount', width: 15 },
            { header: 'Teenager Count', key: 'teenagerCount', width: 15 },
            { header: 'Adult Count', key: 'adultCount', width: 15 },
            { header: 'Elderly Count', key: 'elderlyCount', width: 15 },
            { header: 'Is HouseHold', key: 'isHouseHold', width: 15 },
            { header: 'Is Pregnant', key: 'isPregnant', width: 15 },
            { header: 'Is Isolation', key: 'isIsolation', width: 15 },
            { header: 'Monthly Payment', key: 'monthlyPayment', width: 15 },
            { header: 'Employment', key: 'employment', width: 15 },
            { header: 'Caregiver', key: 'caregiver', width: 15 },
            { header: 'Address', key: 'address', width: 50 },
          ]
          this.multiField
            .filter(el => !el.isInd)
            .forEach(el => {
              columns.push({
                name: el.name,
                key: el.name && el.name.match(
                  /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
                )
                  .map(s => s.toLowerCase())
                  .join('_'),
                width: 15,
              })
            })
          worksheet.columns = columns
          console.log('sss')

          console.log('sss')
          const referralColumn = worksheet.getColumn('referral')
          referralColumn.dataValidation = {
            type: 'list',
            allowBlank: false,
            formulae: ['=Referral!$A$1:$A$9999'],
          }
          const nameColumn = worksheet.getColumn('name')
          nameColumn.dataValidation = {
            type: 'custom',
            allowBlank: false,
            showErrorMessage: true,
            errorTitle: 'Invalid Name',
            error: 'Name should not contain numbers',
            formula1: '=NOT(ISNUMBER(SEARCH("0123456789",A2)))',
          }
          const countryPhoneColumn = worksheet.getColumn('countryPhone')
          countryPhoneColumn.dataValidation = {
            type: 'list',
            allowBlank: false,
            formulae: ['"LB(961),SY(963)"'],
          }
          const phoneColumn = worksheet.getColumn('phone')
          phoneColumn.dataValidation = {
            type: 'whole',
            allowBlank: false,
            operator: 'greaterThanOrEqual',
            formulae: 0,
          }
          const PCRDateColumn = worksheet.getColumn('PCRDate')
          PCRDateColumn.dataValidation = {
            type: 'date',
            operator: 'lessThan',
            allowBlank: false,
            showErrorMessage: true,
            errorTitle: 'Invalid Date',
            error: 'Date should be less than today',
            formula1: '=TODAY()',
          }
          const residentialTypeColumn = worksheet.getColumn('residentialType')
          residentialTypeColumn.dataValidation = {
            type: 'list',
            allowBlank: false,
            formulae: ['=Residential!$A$1:$A$9999'],
          }
          const cadasterColumn = worksheet.getColumn('cadaster')
          cadasterColumn.dataValidation = {
            type: 'list',
            allowBlank: false,
            formulae: ['=Cadastre!$A$1:$A$9999'],
          }
          const settlementColumn = worksheet.getColumn('settlement')
          settlementColumn.dataValidation = {
            type: 'list',
            allowBlank: false,
            formulae: ['=Settlement!$A$1:$A$9999'],
          }
          const PCRResultColumn = worksheet.getColumn('PCRResult')
          PCRResultColumn.dataValidation = {
            type: 'list',
            allowBlank: false,
            formulae: ['=PCRResult!$A$1:$A$9999'],
          }
          const genderColumn = worksheet.getColumn('gender')
          genderColumn.dataValidation = {
            type: 'list',
            allowBlank: false,
            formulae: ['=Gender!$A$1:$A$9999'],
          }
          const maleCountColumn = worksheet.getColumn('maleCount')
          maleCountColumn.dataValidation = {
            type: 'whole',
            allowBlank: false,
            operator: 'greaterThanOrEqual',
            formulae: 0,
          }
          const femaleCountColumn = worksheet.getColumn('femaleCount')
          femaleCountColumn.dataValidation = {
            type: 'whole',
            allowBlank: false,
            operator: 'greaterThanOrEqual',
            formulae: 0,
          }
          const infectedCountColumn = worksheet.getColumn('infectedCount')
          infectedCountColumn.dataValidation = {
            type: 'whole',
            allowBlank: false,
            operator: 'greaterThanOrEqual',
            formulae: 0,
          }
          const babiesCountColumn = worksheet.getColumn('babiesCount')
          babiesCountColumn.dataValidation = {
            type: 'whole',
            allowBlank: false,
            operator: 'greaterThanOrEqual',
            formulae: 0,
          }
          const childCountColumn = worksheet.getColumn('childCount')
          childCountColumn.dataValidation = {
            type: 'whole',
            allowBlank: false,
            operator: 'greaterThanOrEqual',
            formulae: 0,
          }
          const youngCountColumn = worksheet.getColumn('youngCount')
          youngCountColumn.dataValidation = {
            type: 'whole',
            allowBlank: false,
            operator: 'greaterThanOrEqual',
            formulae: 0,
          }
          const teenagerCountColumn = worksheet.getColumn('teenagerCount')
          teenagerCountColumn.dataValidation = {
            type: 'whole',
            allowBlank: false,
            operator: 'greaterThanOrEqual',
            formulae: 0,
          }
          const adultCountColumn = worksheet.getColumn('adultCount')
          adultCountColumn.dataValidation = {
            type: 'whole',
            allowBlank: false,
            operator: 'greaterThanOrEqual',
            formulae: 0,
          }
          const elderlyCountColumn = worksheet.getColumn('elderlyCount')
          elderlyCountColumn.dataValidation = {
            type: 'whole',
            allowBlank: false,
            operator: 'greaterThanOrEqual',
            formulae: 0,
          }
          const isHouseHoldColumn = worksheet.getColumn('isHouseHold')
          isHouseHoldColumn.dataValidation = {
            type: 'list',
            allowBlank: false,
            formulae: ['=Operation!$A$1:$A$9999'],
          }
          const isPregnantColumn = worksheet.getColumn('isPregnant')
          isPregnantColumn.dataValidation = {
            type: 'list',
            allowBlank: false,
            formulae: ['=Operation!$A$1:$A$9999'],
          }
          const isIsolationColumn = worksheet.getColumn('isIsolation')
          isIsolationColumn.dataValidation = {
            type: 'list',
            allowBlank: false,
            formulae: ['=Operation!$A$1:$A$9999'],
          }
          const monthlyPaymentColumn = worksheet.getColumn('monthlyPayment')
          monthlyPaymentColumn.dataValidation = {
            type: 'list',
            allowBlank: false,
            formulae: ['=Operation!$A$1:$A$9999'],
          }
          const employmentColumn = worksheet.getColumn('employment')
          employmentColumn.dataValidation = {
            type: 'list',
            allowBlank: false,
            formulae: ['=Employment!$A$1:$A$9999'],
          }
          const caregiverColumn = worksheet.getColumn('caregiver')
          caregiverColumn.dataValidation = {
            type: 'list',
            allowBlank: false,
            formulae: ['=Caregiver!$A$1:$A$9999'],
          }
          console.log('sssssssssbbbsssss')
          worksheet.addRows()
          // eslint-disable-next-line no-return-assign
          worksheet.getRow(1).eachCell(cell => cell.fill = {
            type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFF00' }, bgColor: { argb: 'FF0000FF' },
          })

          const dt = new Date()
          await workbook.xlsx
            .writeBuffer()
            .then(buffer => saveAs(
              new Blob([buffer]),
              `${dt.toLocaleDateString()}_DataEntry.xlsx`,
            ))
            .catch(err => console.log('Error writing excel export', err))
        })
        .catch(error => {
          this.$swal({
            title: 'Error!',
            text: error,
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        })
    }, */
    async Export() {
      this.$store
        .dispatch('referralClr/GetExcelData', {
          prefix: this.$route.params.prefixPrj,
        })
        .then(async res => {
          console.log('/////////////', res)
          const workbook = new ExcelJS.Workbook()
          workbook.creator = 'RDMS'
          workbook.lastModifiedBy = 'RDMS'
          workbook.created = new Date()
          workbook.modified = new Date()
          const data = workbook.addWorksheet('Data')

          const pcr = workbook.addWorksheet('PCRResult')
          pcr.state = 'veryHidden'
          this.pcrResultOption.forEach(el => {
            pcr.addRows([[el.title]])
          })
          const cargiver = workbook.addWorksheet('Caregiver')
          cargiver.state = 'veryHidden'
          this.giveroption.forEach(el => {
            cargiver.addRows([[el.title]])
          })
          const emp = workbook.addWorksheet('Employment')
          emp.state = 'veryHidden'
          this.emplymntOptions.forEach(el => {
            emp.addRows([[el.title]])
          })
          const gen = workbook.addWorksheet('Gender')
          gen.state = 'veryHidden'
          const gnOp = [...this.genderOp]
          gnOp.shift()
          gnOp.pop()
          gnOp.forEach(el => {
            gen.addRows([[el.title]])
          })
          const op = workbook.addWorksheet('Operation')
          op.state = 'veryHidden'
          op.addRows([['Yes'], ['No']])

          const ref = workbook.addWorksheet('Referral')
          ref.state = 'veryHidden'
          this.referralOptions.forEach(el => {
            ref.addRows([[el.title]])
          })
          const tp = workbook.addWorksheet('Residential')
          tp.state = 'veryHidden'
          this.settType.forEach(el => {
            tp.addRows([[el.title]])
          })

          const cad = workbook.addWorksheet('Cadastre')
          cad.state = 'veryHidden'
          res.cad.forEach(el => {
            cad.addRows([[el.cadastre_name]])
          })
          const iss = workbook.addWorksheet('Settlement')
          iss.state = 'veryHidden'
          res.iss.forEach(el => {
            iss.addRows([[el.is_name]])
          })

          const columns = [
            { name: 'Referral', key: 'referral', width: 20 },
            { name: 'Name', key: 'name', width: 20 },
            { name: 'CountryPhone', key: 'country-phone', width: 20 },
            { name: 'Phone', key: 'phone', width: 20 },
            { name: 'PCRDate', key: 'pcr-date', width: 20 },
            { name: 'ResidentialType', key: 'residential type', width: 20 },
            { name: 'Cadaster', key: 'cadaster', width: 20 },
            { name: 'Settlement', key: 'settlement', width: 20 },
            { name: 'PCRResult', key: 'pcr-result', width: 20 },
            { name: 'Gender', key: 'gender', width: 20 },
            { name: 'MaleCount', key: 'male-count', width: 20 },
            { name: 'FemaleCount', key: 'female-count', width: 20 },
            { name: 'InfectedCount', key: 'infected-count', width: 20 },
            { name: 'BabiesCount', key: 'babies-count', width: 20 },
            { name: 'ChildCount', key: 'child-count', width: 20 },
            { name: 'YoungCount', key: 'young-count', width: 20 },
            { name: 'TeeanagerCount ', key: 'teeanager-count', width: 20 },
            { name: 'AdultCount', key: 'adult-count', width: 20 },
            { name: 'ElderlyCount', key: 'elderly count', width: 20 },
            { name: 'IsHouseHold ', key: 'is-house-hold', width: 20 },
            { name: 'IsPregnant', key: 'date', width: 20 },
            { name: 'IsIsolation', key: 'date', width: 20 },
            { name: 'MonthlyPayment', key: 'date', width: 20 },
            { name: 'Emplyment', key: 'date', width: 20 },
            { name: 'Caregiver', key: 'date', width: 20 },
            { name: 'Address', key: 'date', width: 20 },
          ]
          console.log('ee', this.multiField)
          this.multiField
            .filter(el => !el.isInd)
            .forEach(el => {
              columns.push({ name: el.name })
            })
          data.addTable({
            name: 'Table1',
            ref: 'A1',
            headerRow: true,
            totalsRow: false,
            style: {
              theme: 'TableStyleMedium23',
              showRowStripes: true,
              showColumnStripes: true,
            },
            columns,
            rows: [[]],
          })
          let i = 65
          for (i = 65; i <= 90; i += 1) {
            data.getColumn(String.fromCharCode(i)).width = 15
          }
          for (i = 65; i <= 90; i += 1) {
            data.getColumn(`A${String.fromCharCode(i)}`).width = 20
          }

          data.dataValidations.add('A2:A9999', {
            type: 'list',
            allowBlank: false,
            showErrorMessage: true,
            formulae: ['=Referral!$A$1:$A$9999'],
          })
          data.dataValidations.add('C2:C9999', {
            type: 'list',
            allowBlank: false,
            showErrorMessage: true,
            formulae: ['"LB(961),SY(963)"'],
          })
          data.dataValidations.add('D2:D9999', {
            type: 'whole',
            allowBlank: false,
            showErrorMessage: true,
          })
          data.dataValidations.add('E2:E9999', {
            type: 'date',
            allowBlank: false,
            showErrorMessage: true,
            errorTitle: 'Invalid Date',
            error: 'Date should be less than today',
          })
          data.dataValidations.add('F2:F9999', {
            type: 'list',
            allowBlank: false,
            showErrorMessage: true,
            formulae: ['=Residential!$A$1:$A$9999'],
          })

          data.dataValidations.add('G2:G9999', {
            type: 'list',
            allowBlank: false,
            showErrorMessage: true,
            formulae: ['=Cadastre!$A$1:$A$9999'],
          })

          data.dataValidations.add('H2:H9999', {
            type: 'list',
            allowBlank: true,
            showErrorMessage: true,
            formulae: ['=Settlement!$A$1:$A$9999'],
          })

          data.dataValidations.add('I2:I9999', {
            type: 'list',
            allowBlank: false,
            showErrorMessage: true,
            formulae: ['=PCRResult!$A$1:$A$9999'],
          })

          data.dataValidations.add('J2:J9999', {
            type: 'list',
            allowBlank: false,
            showErrorMessage: true,
            formulae: ['=Gender!$A$1:$A$9999'],
          })
          data.dataValidations.add('K2:K9999', {
            type: 'whole',
            allowBlank: true,
            showErrorMessage: true,
          })
          data.dataValidations.add('L2:L9999', {
            type: 'whole',
            allowBlank: true,
            showErrorMessage: true,
          })
          data.dataValidations.add('M2:M9999', {
            type: 'whole',
            allowBlank: true,
            showErrorMessage: true,
          })
          data.dataValidations.add('N2:N9999', {
            type: 'whole',
            allowBlank: true,
            showErrorMessage: true,
          })
          data.dataValidations.add('O2:O9999', {
            type: 'whole',
            allowBlank: true,
            showErrorMessage: true,
          })
          data.dataValidations.add('P2:P9999', {
            type: 'whole',
            allowBlank: true,
            showErrorMessage: true,
          })
          data.dataValidations.add('Q2:Q9999', {
            type: 'whole',
            allowBlank: true,
            showErrorMessage: true,
          })
          data.dataValidations.add('R2:R9999', {
            type: 'whole',
            allowBlank: true,
            showErrorMessage: true,
          })
          data.dataValidations.add('S2:S9999', {
            type: 'whole',
            allowBlank: true,
            showErrorMessage: true,
          })
          data.dataValidations.add('T2:T9999', {
            type: 'list',
            allowBlank: true,
            showErrorMessage: true,
            formulae: ['=Operation!$A$1:$A$9999'],
          })
          data.dataValidations.add('U2:U9999', {
            type: 'list',
            allowBlank: true,
            showErrorMessage: true,
            formulae: ['=Operation!$A$1:$A$9999'],
          })
          data.dataValidations.add('V2:V9999', {
            type: 'list',
            allowBlank: true,
            showErrorMessage: true,
            formulae: ['=Operation!$A$1:$A$9999'],
          })
          data.dataValidations.add('W2:W9999', {
            type: 'list',
            allowBlank: true,
            showErrorMessage: true,
            formulae: ['=Operation!$A$1:$A$9999'],
          })

          data.dataValidations.add('X2:X9999', {
            type: 'list',
            allowBlank: true,
            showErrorMessage: true,
            formulae: ['=Employment!$A$1:$A$9999'],
          })

          data.dataValidations.add('Y2:Y9999', {
            type: 'list',
            allowBlank: true,
            showErrorMessage: true,
            formulae: ['=Caregiver!$A$1:$A$9999'],
          })
          const dt = new Date()
          await workbook.xlsx
            .writeBuffer()
            .then(buffer => saveAs(
              new Blob([buffer]),
              `${dt.toLocaleDateString()}_DataEntry.xlsx`,
            ))
            .catch(err => console.log('Error writing excel export', err))
        })
        .catch(error => {
          this.$swal({
            title: 'Error!',
            text: error,
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        })
    },
    download(fileUrl, fileName) {
      axios
        .post(
          fileUrl,
          {
            file_name: fileName,
          },
          {
            responseType: 'blob',
          },
        )
        .then(response => {
          const url = URL.createObjectURL(
            new Blob([response.data], {
              type: 'application/vnd.ms-excel',
            }),
          )
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', fileName)
          document.body.appendChild(link)
          link.click()
        })
    },
    async ImportData(event) {
      const xlsxfile = event.target.files ? event.target.files[0] : null
      try {
        readXlsxFile(xlsxfile).then(rows => {
          console.log(rows)
          this.$router.replace({
            name: 'EntryimportExcel',
            params: {
              action: 'read',
              active: true,
              prefix: this.$route.params.prefixPrj,
              prefixRole: this.$route.params.prefixRole,
              title: 'Import Excel',
              resource: 'RFET',
              view: true,
              value: rows,
            },
          })
        })
      } catch (e) {
        console.log('erro', e)
        this.$refs.import.value = null
        this.$nextTick(() => {
          this.$refs.selectableTable.refresh()
        })
      }
    },
    /* ImportData(event) {
      const xlsxfile = event.target.files ? event.target.files[0] : null
      try {
        readXlsxFile(xlsxfile).then((rows) => {
          const itm = []
          const lastId =
            store.getters['referralClr/lastId'] != null
              ? store.getters['referralClr/lastId'].id + 1
              : 1
          for (let i = 1; i < rows.length; i += 1) {
            if (rows[i][0] != null) {
              let isEdit = false
              const referralColumn = rows[i][0]
              const nameColumn = rows[i][1]
              const countryColumn = rows[i][2]
              const phonColumn = rows[i][3]
              const pcrDateColumn = rows[i][4]
              const typeColumn = rows[i][5]
              const cadColumn = rows[i][6]
              const stColumn = rows[i][7]
              const pcrColumn = rows[i][8]
              const genderColumn = rows[i][9]
              const maleColumn =
                rows[i][10] == null ? 0 : parseInt(rows[i][10], 10)
              const femaleColumn =
                rows[i][11] == null ? 0 : parseInt(rows[i][11], 10)
              const infectedColumn =
                rows[i][12] == null ? 0 : parseInt(rows[i][12], 10)
              const babiesColumn =
                rows[i][13] == null ? 0 : parseInt(rows[i][13], 10)
              const childColumn =
                rows[i][14] == null ? 0 : parseInt(rows[i][14], 10)
              const youngColumn =
                rows[i][15] == null ? 0 : parseInt(rows[i][15], 10)
              const teangerColumn =
                rows[i][16] == null ? 0 : parseInt(rows[i][16], 10)

              const adultColumn =
                rows[i][17] == null ? 0 : parseInt(rows[i][17], 10)
              const elderlyColumn =
                rows[i][18] == null ? 0 : parseInt(rows[i][18], 10)
              const householdColumn = rows[i][19]
              const pregrnantColumn = rows[i][20]
              const isolation = rows[i][21]
              const payColumn = rows[i][22]
              const employeColumn = rows[i][23]
              const caregiverColumn = rows[i][24]
              const addressColumn = rows[i][25]

              let gov = null
              let isEnable = null
              let rowVariant = null
              let dis = null
              let type = null
              let cad = null
              let iss = null
              let ref = null
              let pcr = null
              let gender = null
              let employe = null
              let caregiver = null
              if (pcrColumn != null) {
                pcr = this.$store.getters['global/pcr_result'].filter(
                  (op) => op.title.trim() === pcrColumn.trim()
                )[0]
              } else {
                isEdit = true
              }
              if (employeColumn != null) {
                employe = this.$store.getters['global/employment'].filter(
                  (op) => op.title.trim() === employeColumn.trim()
                )[0]
              }
              if (genderColumn != null) {
                gender = this.$store.getters['global/gender'].filter(
                  (op) => op.title.trim() === genderColumn.trim()
                )[0]
              }
              if (caregiverColumn != null) {
                caregiver = this.$store.getters['global/caregiver'].filter(
                  (op) => op.title.trim() === caregiverColumn.trim()
                )[0]
              }
              if (referralColumn != null) {
                ref = this.$store.getters['global/referral'].filter(
                  (op) => op.title.trim() === referralColumn.trim()
                )[0]
              } else {
                ref = {
                  isEnable: 1,
                  title: 'Municipality',
                  title_ar: 'بلدية',
                  value: 4
                }
              }
              // Phone
              const ph = countryColumn === 'SY(963)' ? 2 : 1
              const country = this.$store.getters['global/phoneOptions'].filter(
                (op) => op.value === ph
              )[0]
              const regexph = new RegExp(
                '^((1|2|3|4|5|6|7|8|70|71|76|78|79|81)|(70|71|76|78|79|81))\\d{6}$'
              )
              const phd = parseInt(phonColumn, 10).toString()
              if (country.value === 1) {
                if (regexph.test(phonColumn) === false) {
                  isEdit = true
                }
              } else if (
                (phd.toString().length >= 8 && phd.toString().length <= 11) ===
                false
              ) {
                isEdit = true
              }
              if (country != null && phonColumn != null) {
                const it = itm.filter(
                  (el) =>
                    el.phone === phonColumn &&
                    el.country.value === country.value
                )
                if (it.length !== 0) {
                  isEdit = true
                  rowVariant = 'danger'
                  isEnable = true
                  this.$toast({
                    component: ToastificationContent,
                    props: {
                      title: 'Some Case is duplicated, CheckIt',
                      icon: 'EditIcon',
                      variant: 'warning'
                    }
                  })
                }
              }
              // Type
              if (typeColumn != null) {
                console.log(this.$store.getters['global/type'])
                type = this.$store.getters['global/type'].filter(
                  (op) => op.title === typeColumn
                )[0]

                if (type != null) {
                  if (
                    type.value > 3 &&
                    stColumn == null &&
                    this.importIndex === 1 &&
                    this.importIndex === 2
                  ) {
                    isEdit = true
                  }
                }
              } else {
                isEdit = true
              }
              // Cad
              if (cadColumn != null) {
                cad = this.$store.getters['global/municipality'].filter(
                  (op) => op.title === cadColumn.trim()
                )[0]
                console.log(cadColumn)
                console.log(cad)

                if (cad != null) {
                  dis = this.$store.getters['global/district'].filter(
                    (op) => op.value === cad.params
                  )[0]
                }
                if (dis != null) {
                  gov = this.$store.getters['global/governorate'].filter(
                    (op) => op.value === dis.params
                  )[0]
                }
              } else {
                isEdit = true
              }
              // St
              if (typeColumn != null && cadColumn != null && stColumn != null) {
                iss = stColumn
              }
              console.log('/////////////////////////////////////')
              // PCrDate
              if (pcrDateColumn != null) {
                const now = new Date()
                now.setHours(0)
                now.setMinutes(0)
                now.setSeconds(0, 0)
                const date1 = moment(now)
                const dt = new Date(pcrDateColumn.toString())
                const check = moment(dt)
                const diff = date1.diff(check, 'days')
                if (diff >= 0 === false) {
                  isEdit = true
                }
              }

              itm.push({
                id: lastId,
                name: nameColumn,
                countryText: country.text,
                country,
                phone: phonColumn,
                pcr_date: moment(pcrDateColumn).format('YYYY-MM-DD'),
                type,
                gov,
                dis,
                edit: isEdit,
                enable: isEnable,
                cad,
                referral: ref,
                iss,
                pcr_result: pcr,
                gender,
                male_count: maleColumn,
                female_count: femaleColumn,
                family_members: 10,
                infected_count: infectedColumn,
                yng_child_count: babiesColumn,
                child_count: childColumn,
                young_count: youngColumn,
                teenager_count: teangerColumn,
                adult_count: adultColumn,
                elderly_count: elderlyColumn,
                pregnant: pregrnantColumn,
                house_hold: householdColumn,
                isolation_room: isolation,
                monthly_payments: payColumn,
                employment: employe,
                caregiver,
                adresstext: addressColumn
              })
              const b = itm.filter((elm) => elm.id === lastId)[0]
              b._rowVariant = rowVariant
              this.$refs.selectableTable.refresh()
            }
          }
          this.$store.dispatch('referralClr/ADD_ITEMS_IMPORT', {
            items: itm
          })
          this.$refs.import.value = null
          this.$nextTick(() => {
            this.$refs.selectableTable.refresh()
          })
        })
      } catch (e) {
        console.log('erro', e)
        this.$refs.import.value = null
        this.$nextTick(() => {
          this.$refs.selectableTable.refresh()
        })
      }
    }, */
    ResetDataRow() {
      const now = new Date()
      now.setHours(0)
      now.setMinutes(0)
      now.setSeconds(0, 0)
      this.pcr_date = now
      this.fullname = null
      this.phone = null
      this.referral = null
      this.country = 'LB(961)'
      this.countryid = 1
      this.referral = null
      this.governorate = null
      this.district = null
      this.cadaster = null
      this.type = null
      this.iss = null
      this.typeOptions = []
      this.cadOptions = []
      this.issOptions = []

      ///

      this.pcres = this.pcrResultOption.filter(e => e.value === 1)[0]
      this.gender = this.genderOptions.filter(e => e.value === 2)[0]
      console.log(this.pcres)
      //
      this.family_members = 0
      this.male_count = 0
      this.female_count = 0
      this.infected_count = 1

      this.yng_child_count = 0
      this.child_count = 0
      this.young_count = 0
      this.teenager_count = 0
      this.adult_count = 0
      this.elderly_count = 0

      ///
      this.employment = null
      this.caregiver = null
      this.house_hold = null
      this.pregnant = null
      this.monthly_payments = null
      this.isolation_room = null
      this.adresstext = null
      /// //
      this.isFullData = false
      this.isEdit = false
      this.idEdit = null
      this.$refs.simpleRules.reset()
    },
    ResetData() {
      this.$store.dispatch('referralClr/REFRESH', {
        prefix: this.$route.params.prefixPrj,
        prefixRole: this.$route.params.prefixRole,
      })
      this.removeAllItem()
      this.ResetDataRow()
      this.isSaved = false
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';

.code {
  min-width: 150px;
}

.referral {
  min-width: 250px;
}

.full_name {
  max-width: 600px;
  min-width: 200px;
}

.phone {
  min-width: 300px;
}

.governorate {
  min-width: 300px;
}

.cadaster {
  min-width: 250px;
}

.district {
  min-width: 250px;
}

.type {
  min-width: 300px;
}

.iss {
  min-width: 250px;
}

.pcr_date {
  min-width: 250px;
}

.pcr_result {
  max-width: 600px;
  min-width: 200px;
}

.infected_count {
  max-width: 600px;
  min-width: 200px;
}

.male_count {
  max-width: 600px;
  min-width: 200px;
}

.female_count {
  max-width: 600px;
  min-width: 200px;
}

.yng_child_count {
  max-width: 600px;
  min-width: 200px;
}

.child_count {
  max-width: 600px;
  min-width: 200px;
}

.young_count {
  max-width: 600px;
  min-width: 200px;
}

.teenager_count {
  max-width: 600px;
  min-width: 200px;
}

.elderly_count {
  max-width: 600px;
  min-width: 200px;
}

.empl_type {
  max-width: 600px;
  min-width: 200px;
}

.caregiver {
  max-width: 600px;
  min-width: 200px;
}

.adresstext {
  max-width: 600px;
  min-width: 200px;
}
</style>
