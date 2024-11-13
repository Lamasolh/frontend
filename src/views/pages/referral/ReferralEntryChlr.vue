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
                              maxDate: maxDate,
                            }"
                            :state="errors.length > 0 ? false : null"
                          />
                          <small class="text-danger">{{
                            errors[0] != null
                              ? `The date must be between today and ${priority_period} days before`
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
                        <b-button
                          class="ml-1 mr-1"
                          variant="success"
                          type="submit"
                          :disabled="isEdit || isFullData "
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
                          class="mr-2"
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
            <ReferralImport v-show="isFullData" />
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
                            :id="'full-name'"
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
                          />
                          <small class="text-danger">{{
                            errors[0] != null
                              ? `The date must be between today and ${priority_period} days before`
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
                  <template #cell(pcr_result)="data">
                    <div v-if="data.item.edit && data.item.enable">
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="PCR Result"
                      >
                        <b-form-group label="PCR Result">
                          <v-select
                            v-model="data.item.pcres"
                            placeholder="ALL"
                            label="title"
                            :clearable="false"
                            :append-to-body="true"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :options="pcrResult"
                            :state="errors.length > 0 ? false : null"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                      </validation-provider>
                    </div>
                    <p v-else>
                      {{
                        data.item.pcres == null
                          ? ''
                          : data.item.pcres.title
                      }}
                    </p>
                  </template>
                  <template #cell(gender)="data">
                    <div v-if="data.item.edit && data.item.enable">
                      <b-form-group label="Gender">
                        <v-select
                          v-model="data.item.gender"
                          placeholder="ALL"
                          label="title"
                          :append-to-body="true"
                          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                          :options="genderOptions"
                        />
                      </b-form-group>
                    </div>
                    <p v-else>
                      {{
                        data.item.gender == null
                          ? ''
                          : data.item.gender.title
                      }}
                    </p>
                  </template>
                  <template #cell(employment)="data">
                    <div v-if="data.item.edit && data.item.enable">
                      <b-form-group label="Employment">
                        <v-select
                          v-model="data.item.employment"
                          placeholder="ALL"
                          label="title"
                          :append-to-body="true"
                          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                          :options="emplymntOptions"
                        />
                      </b-form-group>
                    </div>
                    <p v-else>
                      {{
                        data.item.employment == null
                          ? ''
                          : data.item.employment.title
                      }}
                    </p>
                  </template>
                  <template #cell(caregiver)="data">
                    <div v-if="data.item.edit && data.item.enable">

                      <b-form-group label="Caregiver">
                        <v-select
                          v-model="data.item.caregiver"
                          placeholder="ALL"
                          label="title"
                          :append-to-body="true"
                          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                          :options="giveroption"
                        />
                      </b-form-group>
                    </div>
                    <p v-else>
                      {{
                        data.item.caregiver == null
                          ? ''
                          : data.item.caregiver.title
                      }}
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
                  <template #cell(adresstext)="data">
                    <div v-if="data.item.edit && data.item.enable">
                      <b-form-group label="Address">
                        <b-form-input
                          :id="'address'"
                          v-model="data.item.adresstext"
                          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                          type="text"
                          placeholder="Enter Address"
                          @blur="Blur(data.item.adresstext)"
                        />
                      </b-form-group>
                    </div>
                    <p v-else>
                      {{ data.item.adresstext }}
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

                  <template #cell(infected_count)="data">
                    <div v-if="data.item.edit && data.item.enable">

                      <b-form-group label="Infected Count">
                        <b-form-spinbutton
                          id="infectedcount"
                          v-model="data.item.infected_count"
                          class="lg"
                          :disabled="data.item.family <= 0"

                          :min="1"
                          :max="data.item.family"
                          placeholder="Enter the number of infected individuals."
                        />
                      </b-form-group>
                    </div>
                    <p v-else>
                      {{
                        data.item.infected_count == null
                          ? ''
                          : data.item.infected_count
                      }}
                    </p>
                  </template>

                  <template #cell(male_count)="data">
                    <div v-if="data.item.edit && data.item.enable">

                      <b-form-group label="Male Count">
                        <b-form-spinbutton
                          id="malecount"
                          v-model="data.item.male_count"
                          class="lg"
                          :disabled="data.item.family <= 0"

                          :min="1"
                          :max="data.item.family"
                          placeholder="Enter the number of males"
                        />
                      </b-form-group>
                    </div>
                    <p v-else>
                      {{
                        data.item.male_count == null
                          ? ''
                          : data.item.male_count
                      }}
                    </p>
                  </template>

                  <template #cell(female_count)="data">
                    <div v-if="data.item.edit && data.item.enable">

                      <b-form-group label="Female Count">
                        <b-form-spinbutton
                          id="femalecount"
                          v-model="data.item.female_count"
                          class="lg"
                          :disabled="data.item.family <= 0"

                          :min="1"
                          :max="data.item.family"
                          placeholder="Enter the number of females"
                        />
                      </b-form-group>
                    </div>
                    <p v-else>
                      {{
                        data.item.female_count == null
                          ? ''
                          : data.item.female_count
                      }}
                    </p>
                  </template>

                  <template #cell(yng_child_count)="data">
                    <div v-if="data.item.edit && data.item.enable">

                      <b-form-group label="Babies Count">
                        <b-form-spinbutton
                          id="infectedcount"
                          v-model="data.item.yng_child_count"
                          class="lg"
                          :disabled="data.item.family <= 0"

                          :min="1"
                          :max="data.item.family"
                          placeholder="Enter the count of Babies"
                        />
                      </b-form-group>
                    </div>
                    <p v-else>
                      {{
                        data.item.yng_child_count == null
                          ? ''
                          : data.item.yng_child_count
                      }}
                    </p>
                  </template>

                  <template #cell(child_count)="data">
                    <div v-if="data.item.edit && data.item.enable">

                      <b-form-group label="Child Count">
                        <b-form-spinbutton
                          id="childcount"
                          v-model="data.item.child_count"
                          class="lg"
                          :disabled="data.item.family <= 0"

                          :min="1"
                          :max="data.item.family"
                          placeholder="Enter the number of children"
                        />
                      </b-form-group>
                    </div>
                    <p v-else>
                      {{
                        data.item.child_count == null
                          ? ''
                          : data.item.child_count
                      }}
                    </p>
                  </template>

                  <template #cell(young_count)="data">
                    <div v-if="data.item.edit && data.item.enable">

                      <b-form-group label="Young Count">
                        <b-form-spinbutton
                          id="young_count"
                          v-model="data.item.young_count"
                          class="lg"
                          :disabled="data.item.family <= 0"

                          :min="1"
                          :max="data.item.family"
                          placeholder="Enter the number of young people."
                        />
                      </b-form-group>
                    </div>
                    <p v-else>
                      {{
                        data.item.young_count == null
                          ? ''
                          : data.item.young_count
                      }}
                    </p>
                  </template>

                  <template #cell(teenager_count)="data">
                    <div v-if="data.item.edit && data.item.enable">

                      <b-form-group label="Teenager Count">
                        <b-form-spinbutton
                          id="teenager_count"
                          v-model="data.item.teenager_count"
                          class="lg"
                          :disabled="data.item.family <= 0"

                          :min="1"
                          :max="data.item.family"
                          placeholder="Enter the number of teenager people."
                        />
                      </b-form-group>
                    </div>
                    <p v-else>
                      {{
                        data.item.teenager_count == null
                          ? ''
                          : data.item.teenager_count
                      }}
                    </p>
                  </template>
                  <template #cell(adult_count)="data">
                    <div v-if="data.item.edit && data.item.enable">

                      <b-form-group label="Adult Count">
                        <b-form-spinbutton
                          id="adult_count"
                          v-model="data.item.adult_count"
                          class="lg"
                          :disabled="data.item.family <= 0"

                          :min="1"
                          :max="data.item.family"
                          placeholder="Enter the number of adults"
                        />
                      </b-form-group>
                    </div>
                    <p v-else>
                      {{
                        data.item.adult_count == null
                          ? ''
                          : data.item.adult_count
                      }}
                    </p>
                  </template>
                  <template #cell(elderly_count)="data">
                    <div v-if="data.item.edit && data.item.enable">

                      <b-form-group label="Elderly Count">
                        <b-form-spinbutton
                          id="elderlycount"
                          v-model="data.item.elderly_count"
                          class="lg"
                          :disabled="data.item.family <= 0"

                          :min="1"
                          :max="data.item.family"
                          placeholder="Enter the number of elderly people"
                        />
                      </b-form-group>
                    </div>
                    <p v-else>
                      {{
                        data.item.elderly_count == null
                          ? ''
                          : data.item.elderly_count
                      }}
                    </p>
                  </template>
                  <template #cell(house_hold)="data">
                    <div v-if="data.item.edit && data.item.enable">

                      <b-form-group>
                        <b-form-checkbox
                          id="household"
                          v-model="data.item.house_hold"
                          name="household"
                          :value="1"
                          :unchecked-value="0"
                        />
                      </b-form-group>
                    </div>
                    <p v-else>
                      {{
                        data.item.house_hold == null
                          ? ''
                          : data.item.house_hold
                      }}
                    </p>
                  </template>
                  <template #cell(pregnant)="data">
                    <div v-if="data.item.edit && data.item.enable">

                      <b-form-group>
                        <b-form-checkbox
                          id="pregnant"
                          v-model="data.item.pregnant"
                          name="pregnant"
                          :value="1"
                          :unchecked-value="0"
                        />
                      </b-form-group>
                    </div>
                    <p v-else>
                      {{
                        data.item.pregnant == null
                          ? ''
                          : data.item.pregnant
                      }}
                    </p>
                  </template>
                  <template #cell(isolation_room)="data">
                    <div v-if="data.item.edit && data.item.enable">

                      <b-form-group>
                        <b-form-checkbox
                          id="household"
                          v-model="data.item.isolation_room"
                          name="household"
                          :value="1"
                          :unchecked-value="0"
                        />
                      </b-form-group>
                    </div>
                    <p v-else>
                      {{
                        data.item.isolation_room == null
                          ? ''
                          : data.item.isolation_room
                      }}
                    </p>
                  </template>
                  <template #cell(monthly_payments)="data">
                    <div v-if="data.item.edit && data.item.enable">

                      <b-form-group>
                        <b-form-checkbox
                          id="household"
                          v-model="data.item.monthly_payments"
                          name="household"
                          :value="1"
                          :unchecked-value="0"
                        />
                      </b-form-group>
                    </div>
                    <p v-else>
                      {{
                        data.item.monthly_payments == null
                          ? ''
                          : data.item.monthly_payments
                      }}
                    </p>
                  </template>
                  <!-- Column: Actions -->
                  <template #cell(action)="data">
                    <b-button
                      variant="danger"
                      :disabled="
                        isEdit || !data.item.enable || idEdit != null
                      "
                      @click="Remove(data.item.id)"
                    >
                      <feather-icon
                        icon="TrashIcon"
                      />
                      <span>Remove</span>
                    </b-button>
                    <!--   <b-dropdown
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
                    </b-dropdown>-->
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
                      <b-button
                        variant="warning"
                        :disabled="isEdit || isFullData"
                        @click="onPickFile(3)"
                      >
                        <feather-icon
                          icon="FilePlusIcon"
                          class="mr-1"
                        />
                        <span>Import</span>
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
                      <!--<b-dropdown
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
                      </b-dropdown>-->
                      <!--  <b-dropdown
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
                      </b-dropdown>-->

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
import vSelect from 'vue-select'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import store from '@/store'
import { takeState } from 'vuex-dot'
import ReferralImport from '@/views/pages/referral/ReferralImport.vue'
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
    ReferralImport,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  data() {
    return {
      isEdit: false,
      isFullData: false,
      idEdit: null,
      idFullData: null,
      editIndex: null,
      isSaved: false,
      importIndex: null,
    }
  },
  computed: {
    saved: takeState('referralClr', 'saved').commit('referralClr/SET_SAVED').map(),
    show: takeState('referralClr', 'show').commit('referralClr/SET_SHOW').map(),
    pcrResultOption: takeState('global', 'pcr_result').map(),
    genderOptions: takeState('global', 'gender').map(),
    emplymntOptions: takeState('global', 'employment').map(),
    giveroption: takeState('global', 'caregiver').map(),
    // Selected
    // referralOptions: takeState('global', 'referral').map(),
    priority_period: takeState('referralClr', 'priority_period').map(),
    priority_interval: takeState('referralClr', 'priority_interval').map(),
    governorateOption: takeState('global', 'governorate').map(),
    districtOptions: takeState('global', 'district').map(),
    cadOptions: takeState('referralClr', 'cadOptions').commit('referralClr/SET_CAD_OPT').map(),
    typeOptions: takeState('referralClr', 'typeOptions').commit('referralClr/SET_TYPE_OPT').map(),
    issOptions: takeState('referralClr', 'issOptions').commit('referralClr/SET_ISS_OPT').map(),
    phoneOp: takeState('referralClr', 'phoneOp').map(),
    itemField: takeState('referralClr', 'itemField').map(),
    // Data
    fullname: takeState('referralClr', 'fullname').commit('referralClr/SET_NAME').map(),
    phone: takeState('referralClr', 'phone').commit('referralClr/SET_PHONE').map(),
    country: takeState('referralClr', 'country').commit('referralClr/SET_CTR').map(),
    countryid: takeState('referralClr', 'countryid').commit('referralClr/SET_CTR_ID').map(),
    pcr_date: takeState('referralClr', 'pcr_date').commit('referralClr/SET_PCR_DATE').map(),
    referral: takeState('referralClr', 'referral').commit('referralClr/SET_REF').map(),
    governorate: takeState('referralClr', 'governorate').commit('referralClr/SET_GOV').map(),
    district: takeState('referralClr', 'district').commit('referralClr/SET_DIS').map(),
    cadaster: takeState('referralClr', 'cadaster').commit('referralClr/SET_CAD').map(),
    type: takeState('referralClr', 'type').commit('referralClr/SET_TYPE').map(),
    iss: takeState('referralClr', 'iss').commit('referralClr/SET_ISS').map(),
    ///
    pcres: takeState('referralClr', 'pcres').commit('referralClr/SET_PCR_RES').map(),
    gender: takeState('referralClr', 'gender').commit('referralClr/SET_GEN').map(),

    //
    family_members: takeState('referralClr', 'family_members').commit('referralClr/SET_FALMILY').map(),
    male_count: takeState('referralClr', 'male_count').commit('referralClr/SET_MALE').map(),
    female_count: takeState('referralClr', 'female_count').commit('referralClr/SET_FEMALE').map(),
    infected_count: takeState('referralClr', 'infected_count').commit('referralClr/SET_INFECTED').map(),

    yng_child_count: takeState('referralClr', 'yng_child_count').commit('referralClr/SET_YNG_CHILD').map(),
    child_count: takeState('referralClr', 'child_count').commit('referralClr/SET_CHILD').map(),
    young_count: takeState('referralClr', 'young_count').commit('referralClr/SET_YOUNG').map(),
    teenager_count: takeState('referralClr', 'teenager_count').commit('referralClr/SET_TEENAGER').map(),
    adult_count: takeState('referralClr', 'adult_count').commit('referralClr/SET_ADULT').map(),
    elderly_count: takeState('referralClr', 'elderly_count').commit('referralClr/SET_ELDERLY').map(),

    ///
    employment: takeState('referralClr', 'employment').commit('referralClr/SET_EMPL').map(),
    caregiver: takeState('referralClr', 'caregiver').commit('referralClr/SET_GVR').map(),
    house_hold: takeState('referralClr', 'house_hold').commit('referralClr/SET_HOUSEHOLD').map(),
    pregnant: takeState('referralClr', 'pregnant').commit('referralClr/SET_PREGNANT').map(),
    monthly_payments: takeState('referralClr', 'monthly_payments').commit('referralClr/SET_DUEPAY').map(),
    isolation_room: takeState('referralClr', 'isolation_room').commit('referralClr/SET_ISOL').map(),
    adresstext: takeState('referralClr', 'adresstext').commit('referralClr/SET_ADDRESS').map(),

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
          this.$store.dispatch('referralClr/GET_CAD_ITEM', it).then(() => {
            console.log('blur')
            this.$nextTick(() => {
              this.Blur(it)
            })
          })
        } else {
          this.$store.dispatch('referralClr/GET_TYPE_ITEM', it).then(() => {
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
            this.$store.dispatch('referralClr/GET_CAD_ITEM', it).then(() => {
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
          this.$store.dispatch('referralClr/GET_ISS_ITEM', it)
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
    Edit(id) {
      this.isEdit = true
      this.editIndex = id
      this.$store.commit('referralClr/EDIT_MODE', { id })
      this.$forceUpdate()
    },
    AddFullData() {
      this.isFullData = true
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
      console.log(itm)
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
            store.commit('referralClr/EDIT_ITEMS', {
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
      this.isFullData = false
      this.editIndex = null
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
          if (fl.length === 0) {
            const id = store.getters['referralClr/lastId'] != null
              ? store.getters['referralClr/lastId'].id
              : 0
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
    Export() {
      this.download('/file/excel/Data_Entry_Template.xlsx', 'Data Entry Template.xlsx')
      /* switch (index) {
        case 1:
          this.download('/file/excel/Normal Data Entry Template _ English.xlsx', 'Normal Data Entry Template _ English.xlsx')
          break
        case 2:
          this.download('/file/excel/Normal Data Entry Template _ Arabic.xlsx', 'Normal Data Entry Template _ Arabic.xlsx')
          break
        case 3:
          this.download('/file/excel/Data Entry Template _ English.xlsx', 'Data Entry Template.xlsx')
          break
        case 4:
          this.download('/file/excel/Data Entry Template _ Arabic.xlsx', 'Data Entry Template _ Arabic.xlsx')
          break
        default:
      } */
    },
    download(fileUrl, fileName) {
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
          const lastId = store.getters['referralClr/lastId'] != null
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
              const maleColumn = rows[i][10] == null ? 0 : parseInt(rows[i][10], 10)
              const femaleColumn = rows[i][11] == null ? 0 : parseInt(rows[i][11], 10)
              const infectedColumn = rows[i][12] == null ? 0 : parseInt(rows[i][12], 10)
              const babiesColumn = rows[i][13] == null ? 0 : parseInt(rows[i][13], 10)
              const childColumn = rows[i][14] == null ? 0 : parseInt(rows[i][14], 10)
              const youngColumn = rows[i][15] == null ? 0 : parseInt(rows[i][15], 10)
              const teangerColumn = rows[i][16] == null ? 0 : parseInt(rows[i][16], 10)

              const adultColumn = rows[i][17] == null ? 0 : parseInt(rows[i][17], 10)
              const elderlyColumn = rows[i][18] == null ? 0 : parseInt(rows[i][18], 10)
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
                  op => op.title.trim() === pcrColumn.trim(),
                )[0]
              } else {
                isEdit = true
              }
              if (employeColumn != null) {
                employe = this.$store.getters['global/employment'].filter(
                  op => op.title.trim() === employeColumn.trim(),
                )[0]
              }
              if (genderColumn != null) {
                gender = this.$store.getters['global/gender'].filter(
                  op => op.title.trim() === genderColumn.trim(),
                )[0]
              }
              if (caregiverColumn != null) {
                caregiver = this.$store.getters['global/caregiver'].filter(
                  op => op.title.trim() === caregiverColumn.trim(),
                )[0]
              }
              if (referralColumn != null) {
                ref = this.$store.getters['global/referral'].filter(
                  op => op.title.trim() === referralColumn.trim(),
                )[0]
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
              // Type
              if (typeColumn != null) {
                console.log(this.$store.getters['global/type'])
                type = this.$store.getters['global/type'].filter(
                  op => op.title === typeColumn,
                )[0]

                if (type != null) {
                  if (type.value > 3 && stColumn == null && (this.importIndex === 1 && this.importIndex === 2)) {
                    isEdit = true
                  }
                }
              } else {
                isEdit = true
              }
              // Cad
              if (cadColumn != null) {
                cad = this.$store.getters['global/municipality'].filter(
                  op => op.title === cadColumn.trim(),
                )[0]
                console.log(cadColumn)
                console.log(cad)

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
                if ((diff >= 0) === false) {
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
                adresstext: addressColumn,
              })
              const b = itm.filter(elm => elm.id === lastId)[0]
              b._rowVariant = rowVariant
              this.$refs.selectableTable.refresh()
            }
          }
          this.$store.dispatch('referralClr/ADD_ITEMS_IMPORT', {
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
      this.$store.dispatch('referral/REFRESH', {
        prefix: this.$route.params.prefixPrj,
        prefixRole: this.$route.params.prefixRole,
      })
      this.removeAllItem()
      this.ResetDataRow()
      this.isSaved = false
    },
    RouteFull(items) {
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
          text: 'Full Data Entry',
        },
      )
      this.$router.replace({
        name: 'projectFullData',
        params: {
          action: 'read',
          breadcrumb: nav,
          active: true,
          prefix: this.$route.params.prefixPrj,
          prefixRole: this.$route.params.prefixRole,
          title: 'Full Data Entry',
          resource: 'RFET',
          value: items,
        },
      })
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
}.child_count {
  max-width: 600px;
  min-width: 200px;
}.young_count {
  max-width: 600px;
  min-width: 200px;
}.teenager_count {
  max-width: 600px;
  min-width: 200px;
}.elderly_count {
  max-width: 600px;
  min-width: 200px;
}.empl_type {
  max-width: 600px;
  min-width: 200px;
}.caregiver {
  max-width: 600px;
  min-width: 200px;
}

.adresstext {
  max-width: 600px;
  min-width: 200px;
}

</style>
