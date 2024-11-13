<template>
  <div>
    <b-modal
      id="form"
      v-model="showModalFAM.active"
      ok-only
      size="xl"
      no-close-on-esc
      no-close-on-backdrop
      class="modal-dialog"
      title="Add Family"
      :header-bg-variant="headerBgVariant"
      :header-border-variant="bodyTextVariant"
      :footer-border-variant="bodyTextVariant"
      data-backdrop="static"
      @close="abortion"
    >
      <b-overlay :show="show">
        <b-container fluid>
          <validation-observer
            ref="formFAM"
            tag="form"
          >
            <b-row v-if="listMember != null">
              <b-col>
                <b-form>
                  <b-row>
                    <b-col
                      sm="12"
                      md="12"
                      lg="4"
                      xl="3"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="Tents/Shelters"
                      >
                        <b-form-group>
                          <label>Tents/Shelters
                            <span class="text-danger"><strong>*</strong></span></label>

                          <v-select
                            v-model="item.tent"
                            placeholder="Select Tents/Shelters"
                            label="code"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :options="tent"
                            :state="errors.length > 0 ? false : null"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      v-if="item !=null"
                      sm="12"
                      md="12"
                      lg="3"
                      xl="1"
                    >
                      <b-button
                        variant="success"
                        class="mb-1 mb-sm-0"
                        style="margin-top: 25px;"
                        block
                        @click="AddTent"
                      >
                        Add
                      </b-button>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="4"
                      xl="4"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="System Code"
                      >
                        <b-form-group>
                          <label>System Code<span class="text-danger"><strong>*</strong></span></label>
                          <b-form-input
                            v-model="item.code"
                            class="form-control"
                            :disabled="true"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter System Code"
                          />
                          <small class="text-danger mb-1">{{
                            errors[0]
                          }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="4"
                      xl="4"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="Organization Code"
                      >
                        <b-form-group>
                          <label>Organization Code
                            <span class="text-danger"><strong>*</strong></span></label>
                          <b-form-input
                            v-model="item.reference"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Organization Code"
                          />
                          <small class="text-danger mb-1">{{
                            errors[0]
                          }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="4"
                      xl="4"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="UNHCR Case Number"
                      >
                        <b-form-group>
                          <label>UNHCR Case Number</label>
                          <b-form-input
                            v-model="item.un_code"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter UNHCR Case Number"
                          />
                          <small class="text-danger mb-1">{{
                            errors[0]
                          }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="4"
                      xl="4"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="First Move"
                      >
                        <b-form-group>
                          <label>First Move</label>
                          <flat-pickr
                            v-model="item.first_move"
                            class="form-control"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            placeholder="Enter First Move"
                            :state="errors.length > 0 ? false : null"
                          />
                          <small class="text-danger mb-1">{{
                            errors[0]
                          }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="4"
                      xl="4"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="Previous Location"
                      >
                        <b-form-group>
                          <label>Previous Location</label>
                          <b-form-input
                            v-model="item.previous_location"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Previous Location"
                          />
                          <small class="text-danger mb-1">{{
                            errors[0]
                          }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <!--<b-col     md="3"
                      sm="1">
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="National ID"
                      >
                        <b-form-group>
                          <label>National ID</label>
                          <b-form-input
                            v-model="item.national_code"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter National ID"
                          />
                          <small class="text-danger mb-1">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>-->
                    <b-col
                      sm="12"
                      md="12"
                      lg="4"
                      xl="4"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="Phone number"
                      >
                        <b-form-group>
                          <label>Phone number</label>
                          <b-form-input
                            v-model="item.phone"
                            class="form-control"
                            type="number"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Phone number"
                          />
                          <small class="text-danger mb-1">{{
                            errors[0]
                          }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                  </b-row>
                  <h3>Head Of HouseHold</h3>
                  <b-row>
                    <b-col
                      sm="12"
                      md="12"
                      lg="3"
                      xl="3"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="System Code"
                      >
                        <b-form-group>
                          <label>System Code
                            <span class="text-danger"><strong>*</strong></span></label>
                          <b-form-input
                            v-model="item.head_code"
                            class="form-control"
                            :disabled="true"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter System Code"
                          />
                          <small class="text-danger mb-1">{{
                            errors[0]
                          }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="3"
                      xl="3"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="Organization Code"
                      >
                        <b-form-group>
                          <label>Organization Code
                            <span class="text-danger"><strong>*</strong></span></label>
                          <b-form-input
                            v-model="item.head_reference"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Organization Code"
                          />
                          <small class="text-danger mb-1">{{
                            errors[0]
                          }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="3"
                      xl="3"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="Gender"
                      >
                        <b-form-group>
                          <label>Gender
                            <span class="text-danger"><strong>*</strong></span></label>
                          <v-select
                            v-model="item.head_gender"
                            placeholder="Select Gender"
                            label="name"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :options="gender"
                            :state="errors.length > 0 ? false : null"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <!-- <b-col cols="4">
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="UNHCR Code"
                      >
                        <b-form-group>
                          <label>UNHCR Code </label>
                          <b-form-input
                            v-model="item.head_unhcr_code"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter UNHCR Code"
                          />
                          <small class="text-danger mb-1">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>-->
                    <b-col
                      sm="12"
                      md="12"
                      lg="3"
                      xl="3"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="National ID"
                      >
                        <b-form-group>
                          <label>National ID</label>
                          <b-form-input
                            v-model="item.head_national_code"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter National ID"
                          />
                          <small class="text-danger mb-1">{{
                            errors[0]
                          }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <!--
                    <b-col cols="4">
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="Phone"
                      >
                        <b-form-group>
                          <label>Phone </label>
                          <b-form-input
                            v-model="item.head_phone"
                            class="form-control"
                            type="number"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Phone"
                          />
                          <small class="text-danger mb-1">{{ errors[0] }}</small>

                        </b-form-group>
                      </validation-provider>
                    </b-col>-->
                    <b-col
                      sm="12"
                      md="12"
                      lg="3"
                      xl="3"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required|name"
                        name="First Name (Arabic)"
                      >
                        <b-form-group>
                          <label>First Name (Arabic)
                            <span class="text-danger"><strong>*</strong></span></label>
                          <b-form-input
                            v-model="item.head_first_name_ar"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter First Name (Arabic)"
                            @input="(input) => toFirst(input)"
                          />
                          <small class="text-danger mb-1">{{
                            errors[0]
                          }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="3"
                      xl="3"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required|name"
                        name="Father Name (Arabic)"
                      >
                        <b-form-group>
                          <label>Father Name (Arabic)
                            <span class="text-danger"><strong>*</strong></span></label>
                          <b-form-input
                            v-model="item.head_father_name_ar"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Father Name (Arabic)"
                            @input="(input) => toFather(input)"
                          />
                          <small class="text-danger mb-1">{{
                            errors[0]
                          }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="3"
                      xl="3"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required|name"
                        name="Last Name (Arabic)"
                      >
                        <b-form-group>
                          <label>Last Name (Arabic)
                            <span class="text-danger"><strong>*</strong></span></label>
                          <b-form-input
                            v-model="item.head_last_name_ar"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Last Name (Arabic)"
                            @input="(input) => toLast(input)"
                          />
                          <small class="text-danger mb-1">{{
                            errors[0]
                          }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="3"
                      xl="3"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="name"
                        name="Mother Name (Arabic)"
                      >
                        <b-form-group>
                          <label>Mother Name (Arabic)</label>
                          <b-form-input
                            v-model="item.head_mother_name_ar"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Mother Name (Arabic)"
                            @input="(input) => toMother(input)"
                          />
                          <small class="text-danger mb-1">{{
                            errors[0]
                          }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="3"
                      xl="3"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="First Name"
                      >
                        <b-form-group>
                          <label>First Name
                            <span class="text-danger"><strong>*</strong></span></label>
                          <b-form-input
                            v-model="item.head_first_name"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter First Name"
                          />
                          <small class="text-danger mb-1">{{
                            errors[0]
                          }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="3"
                      xl="3"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="Father Name"
                      >
                        <b-form-group>
                          <label>Father Name
                            <span class="text-danger"><strong>*</strong></span></label>
                          <b-form-input
                            v-model="item.head_father_name"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Father Name"
                          />
                          <small class="text-danger mb-1">{{
                            errors[0]
                          }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="3"
                      xl="3"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="Last Name"
                      >
                        <b-form-group>
                          <label>Last Name
                            <span class="text-danger"><strong>*</strong></span></label>
                          <b-form-input
                            v-model="item.head_last_name"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Last Name"
                          />
                          <small class="text-danger mb-1">{{
                            errors[0]
                          }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="3"
                      xl="3"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="Mother Name"
                      >
                        <b-form-group>
                          <label>Mother Name</label>
                          <b-form-input
                            v-model="item.head_mother_name"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Mother Name"
                          />
                          <small class="text-danger mb-1">{{
                            errors[0]
                          }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>

                    <b-col
                      sm="12"
                      md="12"
                      lg="3"
                      xl="3"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="Date Of Birth"
                      >
                        <b-form-group>
                          <label>Date Of Birth</label>
                          <flat-pickr
                            v-model="item.head_dob"
                            class="form-control"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            placeholder="Enter Date Of Birth"
                            :state="errors.length > 0 ? false : null"
                          />

                          <small class="text-danger mb-1">{{
                            errors[0]
                          }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="3"
                      xl="3"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules=""
                        name="Place of birth"
                      >
                        <b-form-group>
                          <label>Place of birth</label>
                          <b-form-input
                            v-model="item.head_pob"
                            class="form-control"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Place of birth"
                          />
                          <small class="text-danger mb-1">{{
                            errors[0]
                          }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="3"
                      xl="3"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="Disability"
                      >
                        <b-form-group>
                          <label>Disability
                            <span class="text-danger"><strong>*</strong></span></label>
                          <v-select
                            v-model="item.head_disbality"
                            placeholder="Select Disability"
                            label="name"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :options="disbality"
                            :state="errors.length > 0 ? false : null"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="3"
                      xl="3"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="Nationality"
                      >
                        <b-form-group>
                          <label>Nationality
                            <span class="text-danger"><strong>*</strong></span></label>
                          <v-select
                            v-model="item.head_nationality"
                            placeholder="Select Nationality"
                            label="name"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :options="nationality"
                            :state="errors.length > 0 ? false : null"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                    <b-col
                      sm="12"
                      md="12"
                      lg="3"
                      xl="3"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        rules="required"
                        name="Marital Status"
                      >
                        <b-form-group>
                          <label>
                            Marital Status
                            <span class="text-danger"><strong>*</strong></span></label>
                          <v-select
                            v-model="item.head_maritalStatus"
                            placeholder="Select Marital Status"
                            label="name"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :options="maritalStatus"
                            :state="errors.length > 0 ? false : null"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col>
                  </b-row>

                  <h2>Members</h2>
                  <b-row v-if="listMember.length > 0">
                    <b-col
                      xl="7"
                      lg="8"
                      md="12"
                      sm="12"
                    >
                      Member
                    </b-col>
                    <b-col
                      xl="5"
                      lg="4"
                      md="12"
                      sm="12"
                    >
                      Family Relation
                    </b-col>
                  </b-row>
                  <br>
                  <div
                    v-for="(it, index) in listMember"
                    :key="it.code"
                  >
                    <b-row>
                      <b-col
                        xl="1"
                        lg="1"
                        md="12"
                        sm="12"
                      >
                        {{ index+1 }}
                      </b-col>
                      <b-col
                        xl="3"
                        lg="3"
                        md="12"
                        sm="12"
                      >
                        <b class="text-danger"> Code:</b> {{ it.code }}
                        <p>
                          <b class="text-danger">Reference:</b>
                          {{ it.reference }}
                        </p>
                      </b-col>
                      <b-col
                        xl="3"
                        lg="4"
                        md="12"
                        sm="12"
                      >
                        <b class="text-danger">Full Name: </b>
                        {{ it.first_name }} {{ it.father_name }}
                        {{ it.last_name }}
                        <p>
                          <b class="text-danger">Full Name Arabic:</b>
                          {{ it.first_name_ar }} {{ it.father_name_ar }}
                          {{ it.last_name_ar }}
                        </p>
                      </b-col>
                      <b-col
                        v-if="item != null"
                        xl="3"
                        lg="4"
                        md="12"
                        sm="12"
                      >
                        <div>
                          <validation-provider
                            v-slot="{ errors }"
                            rules="required"
                            name="Family Relation"
                          >
                            <b-form-group>
                              <v-select
                                v-model="it.familyrelation"
                                placeholder="Select Family Relation"
                                label="name"
                                :dir="
                                  $store.state.appConfig.isRTL ? 'rtl' : 'ltr'
                                "
                                :options="familyRelation"
                                :state="errors.length > 0 ? false : null"
                              />
                              <small class="text-danger">{{ errors[0] }}</small>
                            </b-form-group>
                          </validation-provider>
                        </div>
                      </b-col>
                      <b-col
                        xl="1"
                        lg="6"
                        md="6"
                        sm="6"
                      >
                        <b-button
                          variant="info"
                          block
                          @click="edit(it)"
                        >
                          Edit
                        </b-button>
                      </b-col>
                      <b-col
                        xl="1"
                        lg="6"
                        md="6"
                        sm="6"
                      >
                        <b-button
                          variant="danger"
                          block

                          @click="delItem(index)"
                        >
                          Delete
                        </b-button>
                      </b-col>
                    </b-row>
                    <hr>
                  </div>
                  <br>
                  <b-row align-h="end">
                    <b-col
                      sm="12"
                      md="12"
                      lg="2"
                      xl="2"
                    >
                      <b-button
                        variant="success"
                        block
                        @click="AddMember"
                      >
                        Add Member
                      </b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-col>
            </b-row>
          </validation-observer>
        </b-container>
      </b-overlay>
      <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="info"
            size="sm"
            type="button"
            class="float-right"
            :disabled="show"
            @click="submit"
          >
            Submit
          </b-button>
        </div>
      </template>
    </b-modal>
    <DataCollectListFamMemModal />
    <DataCollectListFamMemGenModal />
  </div>
</template>

<script>
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { takeState } from 'vuex-dot'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import vSelect from 'vue-select'
import generateUniqueId from '@/libs/unique_id'
import flatPickr from 'vue-flatpickr-component'
import toEnName from 'arabic-name-to-en'
import DataCollectListFamMemModal from './DataCollectListFamMemModal.vue'
import DataCollectListFamMemGenModal from './DataCollectListFamModalGen.vue'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
    DataCollectListFamMemModal,
    vSelect,
    flatPickr,
    DataCollectListFamMemGenModal,
  },
  data() {
    return {
      headerBgVariant: 'light-info',
      headerTextVariant: 'light',
      bodyBgVariant: 'light',
      bodyTextVariant: 'light',
      footerBgVariant: 'info',
      footerTextVariant: 'light',
    }
  },
  computed: {
    ...takeState('dtMAIN', 'showModalFAM')
      .expose(['active', 'item', 'listMember'])
      .commit('dtMAIN/SET_MOD_FAM_EXP')
      .map(),
    ///
    show: takeState('dtFAM', 'show').commit('dtFAM/SET_SHOW').map(),
    showModalFAM: takeState('dtMAIN', 'showModalFAM')
      .commit('dtMAIN/SET_MOD_FAM')
      .map(),
    showModalFAMGEN: takeState('dtMAIN', 'showModalFAMGen')
      .commit('dtMAIN/SET_MOD_MEM_FAM_GEN')
      .map(),
    showModalMEM: takeState('dtMAIN', 'showModalFamMEM')
      .commit('dtMAIN/SET_MOD_MEM_FAM')
      .map(),
    familyRelation: takeState('dtMAIN', 'famRelation').map(),
    tent: takeState('dtTNT', 'items').map(),

    member: takeState('dtMEM', 'items').map(),

    showModalTNT: takeState('dtMAIN', 'showModalTNT')
      .commit('dtMAIN/SET_MOD_TNT')
      .map(),
    family: takeState('dtFAM', 'items').map(),

    gender: takeState('dtMAIN', 'gender').map(),
    maritalStatus: takeState('dtMAIN', 'maritalStatus').map(),
    disbality: takeState('dtMAIN', 'disability').map(),
    nationality: takeState('dtMAIN', 'nationality').map(),

    tentStatus: takeState('dtMAIN', 'tentStatus').map(),
    tentType: takeState('dtMAIN', 'tentType').map(),
  },
  methods: {
    submit() {
      this.$refs.formFAM
        .validate()
        .then(success => {
          if (success) {
            this.$store
              .dispatch('dtFAM/SEND_DATA', {
                item: this.showModalFAM.item,
                listMember: this.showModalFAM.listMember,
                issId: this.$route.params.value.iss_id,
              })
              .then(res => {
                if (res.res === 0) {
                  if (res.message != null) {
                    this.$swal({
                      title: 'Error!',
                      text: `Operation failed, Because ${res.message}`,
                      icon: 'error',
                      customClass: {
                        confirmButton: 'btn btn-primary',
                      },
                      buttonsStyling: false,
                    })
                  } else {
                    this.$swal({
                      title: 'Error!',
                      text: 'Operation failed, please check the information you entered',
                      icon: 'error',
                      customClass: {
                        confirmButton: 'btn btn-primary',
                      },
                      buttonsStyling: false,
                    })
                  }
                } else if (res.res === 1) {
                  this.$swal({
                    title: 'Success!',
                    text: 'Success Operation',
                    icon: 'success',
                    customClass: {
                      confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false,
                  })
                  if (this.showModalTNT.active === true) {
                    const { family } = this.showModalTNT
                    family.push(
                      this.family.filter(
                        el => el.code === this.showModalFAM.item.code,
                      )[0],
                    )
                    this.$store.commit('dtMAIN/SET_MOD_TNT_EXP', {
                      key: 'family',
                      value: family,
                    })
                  }
                  this.abortion()
                } else {
                  this.$swal({
                    title: 'Error!',
                    text: 'Operation failed, please check the information you entered',
                    icon: 'error',
                    customClass: {
                      confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false,
                  })
                }
              })
              .catch(error => {
                console.log(error)
                this.$swal({
                  title: 'Error!',
                  text: 'Register failed',
                  icon: 'error',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                })
              })
          } else {
            this.$swal({
              title: 'Attention !',
              text: 'Check missing data',
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          }
        })
        .catch(() => {
          this.show = false
          this.$swal({
            title: 'Error!',
            text: 'Please Check internet and try again',
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        })
    },
    toLast(e) {
      this.$nextTick(() => {
        this.item.head_last_name = toEnName(e)
        this.$refs.formFAM.validate()
      })
    },
    toFirst(e) {
      this.$nextTick(() => {
        this.item.head_first_name = toEnName(e)
        this.$refs.formFAM.validate()
      })
    },
    toFather(e) {
      this.$nextTick(() => {
        this.item.head_father_name = toEnName(e)
        this.$refs.formFAM.validate()
      })
    },
    toMother(e) {
      this.$nextTick(() => {
        this.item.head_mother_name = toEnName(e)
        this.$refs.formFAM.validate()
      })
    },
    edit(item) {
      console.log(item)
      this.showModalMEM = {
        active: true,
        item,
      }
    },
    delItem(index) {
      console.log(index)
      this.listMember.splice(index, 1)
    },
    AddMember() {
      this.showModalFAMGEN = {
        active: true,
        number: 1,
      }
    },
    AddTent() {
      this.showModalTNT = {
        active: true,
        isNew: true,
        item: {
          code: generateUniqueId('TNT_'),
          status: this.tentStatus.filter(el => el.id === 1)[0],
          type: this.tentType.filter(el => el.id === 1)[0],
          size: '120',
          max_cap: 10,
          lat: 30.00,
          long: 30.00,
          address: '',
          no_tank: '',

        },
        tank: [],
        latrine: [],
        pits: [],
        family: [],
      }
    },
    abortion() {
      this.active = false
      this.item = {}
    },
  },
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
