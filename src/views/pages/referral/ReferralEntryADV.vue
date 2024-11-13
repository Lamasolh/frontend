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
                        <b-form-group label="Referral">
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
                        :rules="'required|minDate:' + priority_period"
                        name="PCR Date"
                      >
                        <b-form-group label="PCR Date">
                          <flat-pickr
                            v-model="pcr_date"
                            class="form-control"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            placeholder="Enter PCR Date"
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
                    <b-row align-h="between">
                      <!-- Settlement -->
                      <b-col cols="3">
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
                      <b-col cols="auto">
                        <!-- Add -->
                        <b-button
                          v-if="isEdit === false"
                          class="mr-2"
                          variant="primary"
                          :disabled="isSaved"
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
                  :selected-variant="
                    $store.state.appConfig.layout.skin === 'dark'
                      ? 'active'
                      : 'primary'
                  "
                  sticky-header
                  data-boundary="window"
                  style="max-height: 450px"
                  :fields="itemField"
                  @row-dblclicked="DoubleItem"
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
                    <div v-if="data.item.edit && data.item.enable">
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="Referral"
                      >
                        <b-form-group label="Referral">
                          <v-select
                            :id="'referral' + data.item.id"
                            v-model="data.item.referral"
                            class="referralSelect"
                            placeholder="Select Referral"
                            label="title"
                            :append-to-body="true"
                            :state="errors.length > 0 ? false : null"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :options="referralOptions"
                            @search:blur="Blur(data.item)"
                          />
                          <small class="text-danger mb-1">{{
                            errors[0]
                          }}</small>
                        </b-form-group>
                      </validation-provider>
                    </div>
                    <p v-else>
                      {{
                        data.item.referral != null
                          ? data.item.referral.title
                          : ''
                      }}
                    </p>
                  </template>
                  <template #cell(name)="data">
                    <div v-if="data.item.edit && data.item.enable">
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="Full Name"
                      >
                        <b-form-group label="Full Name">
                          <b-form-input
                            :id="'full-name' + data.item.id"
                            v-model="data.item.name"
                            :state="errors.length > 0 ? false : null"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            type="text"
                            placeholder="Enter Full Name"
                            @blur="Blur(data.item)"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                      </validation-provider>
                    </div>
                    <p v-else>
                      {{ data.item.name }}
                    </p>
                  </template>
                  <template #cell(phone)="data">
                    <div v-if="data.item.edit && data.item.enable">
                      <b-form-group label="Phone">
                        <validation-provider
                          v-slot="{ errors }"
                          :rules="
                            'required|' +
                              `${
                                data.item.countryid === 1
                                  ? 'phonelbed'
                                  : 'min:8|max:11'
                              }`
                          "
                          name="Phone Number"
                          style="display: inline"
                        >
                          <b-input-group>
                            <template #prepend>
                              <b-dropdown
                                :text="data.item.country"
                                variant="outline-primary"
                              >
                                <b-dropdown-item
                                  v-for="ct in phoneOp.options"
                                  :key="ct.id"
                                  :value="ct.value"
                                  @click="dropSelectItem(data.item, ct.value)"
                                >
                                  {{ ct.title }}
                                </b-dropdown-item>
                              </b-dropdown>
                            </template>
                            <b-form-input
                              :id="'phone' + data.item.id"
                              v-model="data.item.phone"
                              class="form-control"
                              type="tel"
                              :formatter="formatter"
                              :state="errors.length > 0 ? false : null"
                              :placeholder="phoneOp.placeholder"
                              @blur="BlurPhone(data.item)"
                            />
                          </b-input-group>
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-group>
                    </div>
                    <p v-else>
                      {{
                        (data.item.countryid === 1 ? '+961' : '+963') +
                          data.item.phone
                      }}
                    </p>
                  </template>
                  <template #cell(pcr_date)="data">
                    <div v-if="data.item.edit && data.item.enable">
                      <validation-provider
                        v-slot="{ errors }"
                        :rules="'required|minDate:' + priority_period"
                        name="PCR Date"
                      >
                        <b-form-group label="PCR Date">
                          <flat-pickr
                            :id="data.item.id"
                            v-model="data.item.pcr_date"
                            class="form-control"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            placeholder="Enter PCR Date"
                            :state="errors.length > 0 ? false : null"
                            @on-change="ChangePcrDate(data.item)"
                          />
                          <small class="text-danger">{{
                            errors[0] != null
                              ? `The date must be between today and ${priority_period} days
                                                    before`
                              : ''
                          }}</small>
                        </b-form-group>
                      </validation-provider>
                    </div>
                    <p v-else>
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
                          : ''
                      }}
                    </p>
                  </template>
                  <template #cell(governorate)="data">
                    <div v-if="data.item.edit && data.item.enable">
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="Governorate"
                      >
                        <b-form-group label="Governorate">
                          <v-select
                            v-model="data.item.governorate"
                            label="title"
                            :append-to-body="true"
                            placeholder="ALL"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :options="governorateOption"
                            :state="errors.length > 0 ? false : null"
                            @option:selected="ChangeGovItem(data.item)"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                      </validation-provider>
                    </div>
                    <p v-else>
                      {{
                        data.item.governorate == null
                          ? ''
                          : data.item.governorate.title
                      }}
                    </p>
                  </template>
                  <template #cell(district)="data">
                    <div v-if="data.item.edit && data.item.enable">
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="District"
                      >
                        <b-form-group label="District">
                          <v-select
                            v-model="data.item.district"
                            placeholder="ALL"
                            label="title"
                            :append-to-body="true"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :options="data.item.districtOptions"
                            :state="errors.length > 0 ? false : null"
                            @option:selected="ChangeDisItem(data.item)"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                      </validation-provider>
                    </div>
                    <p v-else>
                      {{
                        data.item.district == null
                          ? ''
                          : data.item.district.title
                      }}
                    </p>
                  </template>
                  <template #cell(type)="data">
                    <div v-if="data.item.edit && data.item.enable">
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="Type"
                      >
                        <b-form-group label="Residential Type">
                          <v-select
                            v-model="data.item.type"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            label="title"
                            :append-to-body="true"
                            placeholder="ALL"
                            :options="data.item.typeOptions"
                            :state="errors.length > 0 ? false : null"
                            @option:selected="ChangeTypeItem(data.item)"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                      </validation-provider>
                    </div>
                    <p v-else>
                      {{ data.item.type == null ? '' : data.item.type.title }}
                    </p>
                  </template>
                  <template #cell(cadaster)="data">
                    <div v-if="data.item.edit && data.item.enable">
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="Cadaster"
                      >
                        <b-form-group label="Cadaster">
                          <v-select
                            v-model="data.item.cadaster"
                            placeholder="ALL"
                            label="title"
                            :append-to-body="true"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :options="data.item.cadOptions"
                            :state="errors.length > 0 ? false : null"
                            @option:selected="ChangeCADItem(data.item)"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                      </validation-provider>
                    </div>
                    <p v-else>
                      {{
                        data.item.cadaster == null
                          ? ''
                          : data.item.cadaster.title
                      }}
                    </p>
                  </template>
                  <template #cell(iss)="data">
                    <div v-if="data.item.edit && data.item.enable">
                      <div
                        v-if="
                          data.item.type == null
                            ? false
                            : data.item.type.value > 3
                        "
                      >
                        <validation-provider
                          v-if="
                            data.item.type == null
                              ? false
                              : data.item.type.value > 3
                          "
                          v-slot="{ errors }"
                          rules="required"
                          name="Settlement"
                        >
                          <b-form-group label="Settlement">
                            <v-select
                              v-model="data.item.iss"
                              placeholder="ALL"
                              label="title"
                              :append-to-body="true"
                              :dir="
                                $store.state.appConfig.isRTL ? 'rtl' : 'ltr'
                              "
                              :state="errors.length > 0 ? false : null"
                              :options="data.item.issOptions"
                              @option:selected="Blur(data.item)"
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                          </b-form-group>
                        </validation-provider>
                      </div>
                    </div>
                    <p v-else>
                      {{ data.item.iss == null ? '' : data.item.iss.title }}
                    </p>
                  </template>
                  <!-- Column: Actions -->
                  <template #cell(action)="data">
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
                      <b-dropdown-item
                        :disabled="
                          isEdit || !data.item.enable || idEdit != null
                        "
                        @click="Edit(data.item.id)"
                      >
                        <feather-icon icon="EditIcon" />
                        <span class="align-middle ml-50">Edit</span>
                      </b-dropdown-item>
                      <b-dropdown-item
                        :disabled="
                          isEdit || !data.item.enable || idEdit != null
                        "
                        @click="Remove(data.item.id)"
                      >
                        <feather-icon icon="TrashIcon" />
                        <span class="align-middle ml-50">Remove</span>
                      </b-dropdown-item>
                    </b-dropdown>
                  </template>
                </b-table>
                <b-card-footer>
                  <!-- Row Option -->
                  <b-row
                    align-h="between"
                    class="justify-content"
                  >
                    <b-col cols="auto">
                      <b-dropdown
                        left
                        variant="warning"
                        text="Import"
                      >
                        <input
                          ref="import"
                          type="file"
                          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                          hidden
                          @change="ImportData"
                        >
                        <template #button-content>
                          <feather-icon
                            icon="FilePlusIcon"
                            class="mr-1"
                          />
                          <span>Import</span>
                        </template>
                        <b-dropdown-item @click="onPickFile(1)">
                          Normal Format English (Referral Municpality)
                        </b-dropdown-item>
                        <b-dropdown-item @click="onPickFile(2)">
                          Normal Format Arabic (Referral Municpality)
                        </b-dropdown-item>
                        <b-dropdown-divider />
                        <b-dropdown-item @click="onPickFile(3)">
                          Advanced Format English
                        </b-dropdown-item>
                        <b-dropdown-item @click="onPickFile(4)">
                          Advanced Format Arabic
                        </b-dropdown-item>
                      </b-dropdown>
                      <b-dropdown
                        left
                        variant="info"
                        text="Export"
                      >
                        <template #button-content>
                          <feather-icon
                            icon="FilePlusIcon"
                            class="mr-1"
                          />
                          <span>Export Template</span>
                        </template>
                        <b-dropdown-item @click="Export(1)">
                          Normal Format English (Referral Municpality)
                        </b-dropdown-item>
                        <b-dropdown-item @click="Export(2)">
                          Normal Format Arabic (Referral Municpality)
                        </b-dropdown-item>
                        <b-dropdown-divider />
                        <b-dropdown-item @click="Export(3)">
                          Advanced Format English
                        </b-dropdown-item>
                        <b-dropdown-item @click="Export(4)">
                          Advanced Format Arabic
                        </b-dropdown-item>
                      </b-dropdown>
                    </b-col>
                    <b-col cols="auto">
                      <b-button
                        class="ml-1 mr-1"
                        variant="success"
                        type="submit"
                        :disabled="isEdit"
                        @click="SaveData"
                      >
                        <feather-icon
                          icon="SaveIcon"
                          class="mr-1"
                        />
                        <span>Save</span>
                      </b-button>
                      <b-button
                        variant="warning"
                        :disabled="isEdit"
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
import vSelect from 'vue-select'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import store from '@/store'
import { takeState } from 'vuex-dot'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import flatPickr from 'vue-flatpickr-component'
import moment from 'moment'
import readXlsxFile from 'read-excel-file'
import axios from 'axios'

export default {
  components: {
    vSelect,
    ValidationProvider,
    ValidationObserver,
    flatPickr,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  data() {
    return {
      isEdit: false,
      idEdit: null,
      editIndex: null,
      isSaved: false,
      importIndex: null,
    }
  },
  computed: {
    saved: takeState('referral', 'saved').commit('referral/SET_SAVED').map(),
    show: takeState('referral', 'show').commit('referral/SET_SHOW').map(),
    // Selected
    // referralOptions: takeState('global', 'referral').map(),
    priority_period: takeState('referral', 'priority_period').map(),
    priority_interval: takeState('referral', 'priority_interval').map(),
    governorateOption: takeState('global', 'governorate').map(),
    districtOptions: takeState('global', 'district').map(),
    cadOptions: takeState('referral', 'cadOptions')
      .commit('referral/SET_CAD_OPT')
      .map(),
    typeOptions: takeState('referral', 'typeOptions')
      .commit('referral/SET_TYPE_OPT')
      .map(),
    issOptions: takeState('referral', 'issOptions')
      .commit('referral/SET_ISS_OPT')
      .map(),
    phoneOp: takeState('referral', 'phoneOp').map(),
    itemField: takeState('referral', 'itemField').map(),
    // Data
    fullname: takeState('referral', 'fullname')
      .commit('referral/SET_NAME')
      .map(),
    phone: takeState('referral', 'phone').commit('referral/SET_PHONE').map(),
    country: takeState('referral', 'country').commit('referral/SET_CTR').map(),
    countryid: takeState('referral', 'countryid')
      .commit('referral/SET_CTR_ID')
      .map(),
    pcr_date: takeState('referral', 'pcr_date')
      .commit('referral/SET_PCR_DATE')
      .map(),
    referral: takeState('referral', 'referral')
      .commit('referral/SET_REF')
      .map(),
    governorate: takeState('referral', 'governorate')
      .commit('referral/SET_GOV')
      .map(),
    district: takeState('referral', 'district')
      .commit('referral/SET_DIS')
      .map(),
    cadaster: takeState('referral', 'cadaster')
      .commit('referral/SET_CAD')
      .map(),
    type: takeState('referral', 'type').commit('referral/SET_TYPE').map(),
    iss: takeState('referral', 'iss').commit('referral/SET_ISS').map(),
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
    items: takeState('referral', 'items').map(),
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
      this.$nextTick(() => {
        this.Blur(it)
      })
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
          this.$store.dispatch('referral/GET_CAD_ITEM', it).then(() => {
            console.log('blur')
            this.$nextTick(() => {
              this.Blur(it)
            })
          })
        } else {
          this.$store.dispatch('referral/GET_TYPE_ITEM', it).then(() => {
            console.log('blur')
            this.$nextTick(() => {
              this.Blur(it)
            })
          })
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
            this.$store.dispatch('referral/GET_CAD_ITEM', it).then(() => {
              this.Blur(it)
              this.$refs.selectableTable.refresh()
            })
          })
        } else {
          it.cadOptions = []
          this.$nextTick(() => {
            this.Blur(it)
          })
        }
      } else {
        this.$nextTick(() => {
          this.Blur(it)
        })
      }
    },
    ChangeCADItem(it) {
      it.iss = null
      it.issOptions = []
      if (it.cadaster != null) {
        if (it.type.value > 3) {
          this.$store.dispatch('referral/GET_ISS_ITEM', it)
        }
      }
      this.$nextTick(() => {
        this.$refs.selectableTable.refresh()
        this.Blur(it)
      })
    },
    ChangeDistrict(value) {
      if (value != null) {
        if (this.type != null) {
          this.$store.dispatch('referral/GET_CAD')
        } else {
          this.$store.dispatch('referral/GET_TYPE')
        }
      }
    },
    ChangeType(value) {
      if (value != null) {
        if (this.district != null) {
          this.$store.dispatch('referral/GET_CAD')
        } else {
          this.cadOptions = []
        }
      }
    },
    ChangeCAD(value) {
      if (value != null) {
        if (this.type.value > 3) {
          this.$store.dispatch('referral/GET_ISS')
        }
      }
    },
    Edit(id) {
      this.isEdit = true
      this.editIndex = id
      this.$store.commit('referral/EDIT_MODE', { id })
      this.$forceUpdate()
    },
    DoubleItem(it) {
      if (this.isEdit === false) {
        if (it.enable) {
          const bIt = this.items.filter(itm => itm.id === this.idEdit)
          if (bIt.length === 0) {
            if (it.edit === true && it.enable === true) {
              this.$nextTick(() => {
                this.$refs.bTable.validate().then(success => {
                  if (success) {
                    it.edit = false
                    this.idEdit = null
                  } else {
                    it._rowVariant = 'warning'
                  }
                })
              })
            } else {
              it.edit = true
              this.idEdit = it.id
              it._rowVariant = null
            }
          } else {
            bIt[0].edit = false
            this.idEdit = false
          }
        } else {
          it._rowVariant = 'success'
        }
      } else {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Please Update above',
            icon: 'EditIcon',
            variant: 'warning',
          },
        })
      }
    },
    Blur(itm) {
      this.$refs.bTable.validate().then(success => {
        if (success) {
          console.log('success')
          const fl = this.items
            .filter(it => it.id !== itm.id)
            .filter(
              it => it.phone === itm.phone && it.countryid === itm.countryid,
            )
          console.log(fl)
          if (fl.length === 0) {
            console.log('success')
            itm.edit = false
            this.idEdit = null
            itm._rowVariant = 'info'
            this.$refs.selectableTable.refresh()
          } else {
            itm._rowVariant = 'danger'
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Case is duplicated',
                icon: 'EditIcon',
                variant: 'warning',
              },
            })
            this.$refs.selectableTable.refresh()
          }
        } else {
          it._rowVariant = 'warning'
          this.$refs.selectableTable.refresh()
        }
      })
    },
    BlurPhone(itm) {
      this.$refs.bTable.validate().then(success => {
        if (success) {
          console.log('fl')
          console.log(itm)
          const fl = this.items
            .filter(it => it.id !== itm.id)
            .filter(
              it => it.phone === itm.phone && it.countryid === itm.countryid,
            )
          console.log(fl)
          if (fl.length === 0) {
            console.log('success')
            itm.edit = false
            this.idEdit = null
            itm._rowVariant = 'info'
            this.$refs.selectableTable.refresh()
          } else {
            itm._rowVariant = 'danger'
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Case is duplicated',
                icon: 'EditIcon',
                variant: 'warning',
              },
            })
            this.$refs.selectableTable.refresh()
          }
        }
      })
    },
    Update() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          const fl = this.items.filter(
            it => it.phone === this.phone
                            && it.countryid === this.countryid
                            && it.id !== this.editIndex,
          )
          if (fl.length === 0) {
            store.commit('referral/EDIT_ITEMS', {
              id: this.editIndex,
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
      this.editIndex = null
      this.ResetDataRow()
    },
    Remove(index) {
      this.$store.commit('referral/REM_ITEMS', { index })
    },
    removeAllItem() {
      store.commit('referral/RESET_ALL')
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
      this.items.forEach(el => {
        this.Blur(el)
      })
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
              .dispatch('referral/SAVE_DATA', {
                prefix: this.$route.params.prefixPrj,
                type: this.$route.params.assmnttype,
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
    ChangePcrDate(it) {
      console.log('it.id')
      console.log(it.id)
      let pri
      if (it.pcr_date !== null && it.pcr_date !== '') {
        const dff = moment(moment()).diff(it.pcr_date, 'days')
        if (dff >= this.priority_period) {
          pri = 5
        } else if (dff > 4 * this.priority_interval - 3) {
          pri = 1
        } else if (dff > 2 * this.priority_interval - 1) {
          pri = 2
        } else if (dff > this.priority_interval) {
          pri = 3
        } else {
          pri = 4
        }
      } else {
        pri = 5
      }
      it.priority = pri
    },
    AddItem() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          const fl = this.items.filter(
            it => it.phone === this.phone && it.countryid === this.countryid,
          )
          if (fl.length === 0) {
            const id = store.getters['referral/lastId'] != null
              ? store.getters['referral/lastId'].id
              : 0
            store.dispatch('referral/ADD_ITEMS', {
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
    Export(index) {
      switch (index) {
        case 1:
          this.download('/file/excel/Normal Data Entry Template _ English.xlsx', 'Normal Data Entry Template _ English.xlsx')
          break
        case 2:
          this.download('/file/excel/Normal Data Entry Template _ Arabic.xlsx', 'Normal Data Entry Template _ Arabic.xlsx')
          break
        case 3:
          this.download('/file/excel/Data Entry Template _ English.xlsx', 'Data Entry Template _ English.xlsx')
          break
        case 4:
          this.download('/file/excel/Data Entry Template _ Arabic.xlsx', 'Data Entry Template _ Arabic.xlsx')
          break
        default:
      }
    },

    download(fileUrl, fileName) {
      /* const a = document.createElement('a')
            a.href = fileUrl
            a.setAttribute('download', fileName)
            a.click() */
      axios.post(fileUrl, {
        file_name: fileName,
      }, {
        responseType: 'blob',
      }).then(response => {
        const url = URL.createObjectURL(new Blob([response.data], {
          type: 'application/vnd.ms-excel',
        }))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        link.click()
      })
    },
    ImportData(event) {
      const xlsxfile = event.target.files ? event.target.files[0] : null
      try {
        readXlsxFile(xlsxfile).then(rows => {
          const itm = []
          const lastId = store.getters['referral/lastId'] != null
            ? store.getters['referral/lastId'].id + 1
            : 1
          for (let i = 1; i < rows.length; i += 1) {
            if (rows[i][0] != null) {
              let isEdit = false
              let referralColumn
              let nameColumn
              let countryColumn
              let pcrDateColumn
              let phonColumn
              let typeColumn
              let cadColumn
              let stColumn

              let gov = null
              let isEnable = null
              let rowVariant = null
              let dis = null
              let type = null
              let cad = null
              let iss = null
              let ref = null
              switch (this.importIndex) {
                case 1: case 2:
                  nameColumn = rows[i][0]
                  countryColumn = rows[i][1]
                  phonColumn = rows[i][2]
                  pcrDateColumn = rows[i][3]
                  typeColumn = rows[i][4]
                  cadColumn = rows[i][5]
                  break
                case 3: case 4:
                  referralColumn = rows[i][0]
                  nameColumn = rows[i][1]
                  countryColumn = rows[i][2]
                  phonColumn = rows[i][3]
                  pcrDateColumn = rows[i][4]
                  typeColumn = rows[i][5]
                  cadColumn = rows[i][6]
                  stColumn = rows[i][7]
                  break
                default:
              }
              if (this.importIndex === 1 || this.importIndex === 2) {
                if (nameColumn == null
                                    || countryColumn == null
                                    || phonColumn == null
                                    || pcrDateColumn == null
                                    || typeColumn == null
                                    || cadColumn == null
                ) {
                  isEdit = true
                }
              } else if (
                referralColumn == null
                                || nameColumn == null
                                || countryColumn == null
                                || phonColumn == null
                                || pcrDateColumn == null
                                || typeColumn == null
                                || cadColumn == null
                                || stColumn == null
              ) {
                isEdit = true
              }
              // General

              console.log(cadColumn, stColumn, isEdit)
              // Referral
              // Type
              if (referralColumn != null) {
                console.log(referralColumn)

                if (this.importIndex === 1 || this.importIndex === 3) {
                  ref = this.$store.getters['global/referral'].filter(
                    op => op.title.trim() === referralColumn.trim(),
                  )[0]
                } else {
                  ref = this.$store.getters['global/referral'].filter(
                    op => op.title_ar.trim() === referralColumn.trim(),
                  )[0]
                }
              } else {
                ref = {
                  isEnable: 1,
                  title: 'Municipality',
                  title_ar: 'بلدية',
                  value: 4,
                }
              }
              // Phone
              const ph = countryColumn === 'SY(963)' ? 2 : 1
              const country = this.$store.getters['global/phoneOptions'].filter(
                op => op.value === ph,
              )[0]
              const regexph = new RegExp(
                '^((1|2|3|4|5|6|7|8|70|71|76|78|79|81)|(70|71|76|78|79|81))\\d{6}$',
              )
              const phd = parseInt(phonColumn, 10).toString()
              console.log(country, isEdit)
              if (country.value === 1) {
                if (regexph.test(phonColumn) === false) {
                  isEdit = true
                }
              } else if (
                (phd.toString().length >= 8 && phd.toString().length <= 11)
                                === false
              ) {
                isEdit = true
              }
              if (country != null && phonColumn != null) {
                const it = itm.filter(el => el.phone === phonColumn && el.country.value === country.value)
                console.log('it', it.length)
                if (it.length !== 0) {
                  isEdit = true
                  rowVariant = 'danger'
                  isEnable = true
                  this.$toast({
                    component: ToastificationContent,
                    props: {
                      title: 'Some Case is duplicated, CheckIt',
                      icon: 'EditIcon',
                      variant: 'warning',
                    },
                  })
                }
              }
              console.log(typeColumn, isEdit)
              // Type
              if (typeColumn != null) {
                if (this.importIndex === 1 || this.importIndex === 3) {
                  type = this.$store.getters['global/type'].filter(
                    op => op.title === typeColumn,
                  )[0]
                } else {
                  type = this.$store.getters['global/type'].filter(
                    op => op.title_ar === typeColumn,
                  )[0]
                }
                console.log(type, isEdit)
                if (type != null) {
                  if (type.value > 3 && stColumn == null && (this.importIndex === 1 && this.importIndex === 2)) {
                    isEdit = true
                  }
                }
              } else {
                isEdit = true
              }
              console.log(cadColumn)
              // Cad
              if (cadColumn != null) {
                if (this.importIndex === 1 || this.importIndex === 3) {
                  cad = this.$store.getters['global/municipality'].filter(
                    op => op.title === cadColumn.trim(),
                  )[0]
                } else {
                  cad = this.$store.getters['global/municipality'].filter(
                    op => op.title_ar === cadColumn.trim(),
                  )[0]
                }
                if (cad != null) {
                  dis = this.$store.getters['global/district'].filter(
                    op => op.value === cad.params,
                  )[0]
                }
                if (dis != null) {
                  gov = this.$store.getters['global/governorate'].filter(
                    op => op.value === dis.params,
                  )[0]
                }
              } else {
                isEdit = true
              }
              // St
              if (typeColumn != null && cadColumn != null && stColumn != null) {
                iss = stColumn
              }
              console.log(pcrDateColumn)
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
                if ((diff < 7 && diff >= 0) === false) {
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

              })
              const b = itm.filter(elm => elm.id === lastId)[0]
              b._rowVariant = rowVariant
              this.$refs.selectableTable.refresh()
            }
          }
          this.$store.dispatch('referral/ADD_ITEMS_IMPORT', {
            items: itm,
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
    },
    ResetDataRow() {
      this.pcr_date = null
      this.fullname = null
      this.phone = null
      this.referral = null
      this.country = 'LB(961)'
      this.countryid = 1
      this.pcr_date = null
      this.referral = null
      this.governorate = null
      this.district = null
      this.cadaster = null
      this.type = null
      this.iss = null
      this.typeOptions = []
      this.cadOptions = []
      this.issOptions = []
      this.$refs.simpleRules.reset()
    },
    ResetData() {
      this.$store.dispatch('referral/REFRESH', {
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
</style>
