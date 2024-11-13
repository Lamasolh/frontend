<template>
  <b-overlay
    :show="show"
    rounded="sm"
  >
    <b-card>
      <div>
        <validation-observer ref="simpleRules">
          <b-form
            ref="form"
            class="repeater-form"
            @submit.prevent
          >
            <!-- Main: General Info -->
            <b-row align-h="between">
              <!-- Header: General Info -->
              <b-col
                cols="4"
                class="mt-1"
              >
                <div class="d-flex">
                  <feather-icon
                    icon="InfoIcon"
                    size="19"
                  />
                  <h4 class="mb-0 ml-50">
                    General Information
                  </h4>
                </div>
              </b-col>
              <b-col cols="1">
                <b-button
                  variant="primary"
                  class="btn-icon"
                  @click="Refesh"
                >
                  <feather-icon icon="RefreshCwIcon" />
                </b-button>
              </b-col>
            </b-row>
            <br>
            <!--General Info -->
            <b-row ref="row">
              <!-- Name -->
              <b-col md="3">
                <validation-provider
                  v-slot="{ errors }"
                  rules="required"
                  name="name"
                >
                  <b-form-group label="Name">
                    <b-form-input
                      :id="'name'"
                      v-model="name"
                      :state="errors.length > 0 ? false : null"
                      type="text"
                      placeholder="Enter Name"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                </validation-provider>
              </b-col>
              <!-- Prefix -->
              <b-col md="3">
                <validation-provider
                  v-slot="{ errors }"
                  rules="required|alpha|min:3|max:4"
                  :name="'prefix'"
                >
                  <b-form-group label="Prefix">
                    <b-form-input
                      :id="'prefix'"
                      v-model="prefix"
                      :state="errors.length > 0 ? false : null"
                      type="text"
                      :disabled="isReadOnly"
                      placeholder="Enter Prefix"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                </validation-provider>
              </b-col>
              <!--  Description-->
              <b-col md="3">
                <b-form-group label="Description">
                  <b-form-input
                    :id="'description'"
                    v-model="description"
                    :name="'description'"
                    placeholder="Enter Description"
                  />
                </b-form-group>
              </b-col>
              <b-col md="3">
                <validation-provider
                  v-slot="{ errors }"
                  rules="required"
                  name="Icon"
                >
                  <b-form-group label="Project Icon">
                    <v-select
                      v-model="iconValue"
                      placeholder="Select Icon"
                      label="title"
                      :clearable="false"
                      :state="errors.length > 0 ? false : null"
                      :options="iconOptions"
                    >
                      <template #option="{display_name, title}">
                        <div class="flex items-center">
                          <feather-icon
                            :icon="title"
                            size="18"
                            class="mr-50"
                          />
                          {{ display_name }}
                        </div>
                      </template>
                      <template #selected-option="{display_name, title}">
                        <div class="flex items-center">
                          <feather-icon
                            :icon="title"
                            size="18"
                            class="mr-50"
                          />
                          {{ display_name }}
                        </div>
                      </template>
                    </v-select>
                    <small class="text-danger mb-1">{{ errors[0] }}</small>
                  </b-form-group>
                </validation-provider>
              </b-col>
            </b-row>
            <br>
            <hr>
            <!-- Main: Project Setting Info -->
            <div>
              <!-- Header: Project Setting Info -->
              <div class="d-flex">
                <feather-icon
                  icon="SettingsIcon"
                  size="19"
                />
                <h4 class="mb-0 ml-50">
                  Project Setting
                </h4>
              </div>
              <br>
              <b-row ref="row">
                <!-- Validation Name
                    <b-col md="3">
                      <validation-provider
                        #default="{ errors }"
                        rules="required"
                        :name="'Validation Name'"
                      >
                        <b-form-group label="Validation Name">
                          <b-form-input
                            id="name"
                            v-model="validationName"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Validation Name"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-col> -->
                <!-- Period -->
                <b-col md="3">
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required"
                    :name="'Period'"
                  >
                    <b-form-group
                      label="Period of allowed duplicated Cases (Days)"
                    >
                      <b-form-spinbutton
                        :id="'dup_period'"
                        v-model="periodDuplicate"
                        min="0"
                        max="100"
                        :state="errors.length > 0 ? false : null"
                        type="text"
                        placeholder="Enter the Period"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                      <small class="text-warning">"0" Allow Duplication</small>
                    </b-form-group>
                  </validation-provider>
                </b-col>
                <!-- Duration-->
                <b-col md="3">
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required"
                    name="Priority Duration"
                  >
                    <b-form-group label="Priority Duration (Days)">
                      <b-form-spinbutton
                        :id="'priority_dur'"
                        v-model.number="periodDuration"
                        type="number"
                        min="0"
                        max="100"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Enter Priority Duration"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                      <small class="text-warning">"0" No Priority </small>
                    </b-form-group>
                  </validation-provider>
                </b-col>
                <!-- Grace Duration-->
                <b-col md="3">
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required"
                    name="Grace Duration"
                  >
                    <b-form-group label="Grace Duration (Days)">
                      <b-form-spinbutton
                        id="priority_grace"
                        v-model.number="graceDuration"
                        type="number"
                        min="0"
                        max="100"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Enter Priority Duration"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                      <small class="text-warning">"0" No Grace Duration</small>
                    </b-form-group>
                  </validation-provider>
                </b-col>
                <b-col md="3">
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required"
                    name="assmnt"
                  >
                    <b-form-group label="Project Type">
                      <v-select
                        v-model="assmntValue"
                        placeholder="Select Type"
                        label="title"
                        :disabled="isReadOnly"
                        :clearable="false"
                        :state="errors.length > 0 ? false : null"
                        :options="assmntOptions"
                      />
                      <small class="text-danger mb-1">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                </b-col>
              </b-row>
            </div>
            <hr>
            <!-- Main: Project Extra Field -->
            <div>
              <!-- Header: Project Item Info -->
              <div class="d-flex">
                <feather-icon
                  icon="BoxIcon"
                  size="19"
                />
                <h4 class="mb-0 ml-50">
                  Project Extra Field
                </h4>
              </div>
              <br>

              <!-- Label-->
              <b-row v-if="itemsIndicators.filter(el=>!el.isInd).length>0">
                <b-col md="3">
                  <b-form-group label="Field Name" />
                </b-col>

                <b-col md="3">
                  <b-form-group label="Field Description" />
                </b-col>
                <b-col md="3">
                  <b-form-group label="Type" />
                </b-col>
                <b-col md="1">
                  <b-form-group label="Require" />
                </b-col>
              </b-row>
              <!-- Row  -->
              <b-row
                v-for="(item) in itemsIndicators.filter(el=>!el.isInd)"
                :id="item.id"
                :key="item.id"
                ref="row"
              >
                <!-- Item Name -->
                <b-col md="3">
                  <validation-provider
                    v-slot="{ errors }"
                    :rules="`required|itemArray:${JSON.stringify(itemsIndicators)};,${JSON.stringify(item)}`"
                    :name="'Indicator Name ' + item.id"
                  >
                    <b-form-group>
                      <b-form-input
                        :state="errors.length > 0 ? false : null"
                        type="text"
                        placeholder="Enter Item Name"
                        :value="item.name"
                        :disabled="item.active!=null"
                        @input="
                          (value) => itemNameInputIND(value, item.id)
                        "
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <b-col
                  md="3"
                >
                  <b-form-group>
                    <b-form-input
                      placeholder="Enter Item Description"
                      :value="item.desc"
                      :disabled="item.active!=null"
                      @input="
                        (value) => itemDescInputIND( value, item.id)
                      "
                    />
                  </b-form-group>
                </b-col>
                <b-col md="3">
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required"
                    name="Icon"
                  >
                    <v-select
                      v-model="item.type"
                      placeholder="Select Type"
                      label="title"
                      :disabled="item.active!=null"
                      :clearable="false"
                      :state="errors.length > 0 ? false : null"
                      :options="typeIndOptions"
                    />
                    <small class="text-danger mb-1">{{ errors[0] }}</small>
                  </validation-provider>
                </b-col>
                <b-col md="1">
                  <b-form-checkbox
                    :v-model="item.require"
                    :checked="item.require"
                    :disabled="item.active!=null"
                    @input="
                      (value) => itemReqInputIND( value, item.id)
                    "
                  />

                </b-col>
                <!-- Remove Button -->
                <b-col
                  v-if="item.active==null "
                  lg="2"
                  md="2"
                  class="mb-50"
                >
                  <b-button
                    variant="outline-danger"
                    class="mt-0 mt-md-0"
                    @click="removeItemIND(item.id)"
                  >
                    <feather-icon
                      icon="XIcon"
                      class="mr-25"
                    />
                    <span>Delete</span>
                  </b-button>
                </b-col>
                <!-- Deactive Button -->
                <b-col
                  v-else-if="showitem && item.active==1"
                  lg="2"
                  md="2"
                  class="mb-50"
                >
                  <b-button
                    variant="outline-warning"
                    class="mt-0 mt-md-0"
                    @click="De_Active(item)"
                  >
                    <feather-icon
                      icon="XIcon"
                      class="mr-25"
                    />
                    <span>Deactive</span>
                  </b-button>
                </b-col>
                <!-- Deactive Button -->
                <b-col
                  v-else-if=" item.active==0"
                  lg="2"
                  md="2"
                  class="mb-50"
                >
                  <b-button
                    variant="outline-success"
                    class="mt-0 mt-md-0"
                    @click="De_Active(item)"
                  >
                    <feather-icon
                      icon="XIcon"
                      class="mr-25"
                    />
                    <span>Active</span>
                  </b-button>
                </b-col>
              </b-row>
              <!-- Row Option -->
              <b-row
                align-h="between"
                class="justify-content"
              >
                <b-col
                  cols="auto"
                  class="mb-50"
                />
                <b-col cols="auto">
                  <b-button
                    variant="primary"
                    @click="repeateAgainExtra"
                  >
                    <feather-icon
                      icon="PlusIcon"
                      class="mr-25"
                    />
                    <span>Add New Extra Field</span>
                  </b-button>

                </b-col>
              </b-row>

            </div>
            <!-- Main: Project Indicators Info -->
            <div>
              <!-- Header: Project Item Info -->
              <div class="d-flex">
                <feather-icon
                  icon="BoxIcon"
                  size="19"
                />
                <h4 class="mb-0 ml-50">
                  Project Indicators
                </h4>
              </div>
              <br>

              <!-- Label-->
              <b-row v-if="itemsIndicators.length>0">
                <b-col md="3">
                  <b-form-group label="Indicators Name" />
                </b-col>

                <b-col md="3">
                  <b-form-group label="Indicators Description" />
                </b-col>
                <b-col md="3">
                  <b-form-group label="Type" />
                </b-col>
                <b-col md="1">
                  <b-form-group label="Require" />
                </b-col>
              </b-row>
              <!-- Row  -->
              <b-row
                v-for="(item) in itemsIndicators.filter(el=>el.isInd)"
                :id="item.id"
                :key="item.id"
                ref="row"
              >
                <!-- Item Name -->
                <b-col md="3">
                  <validation-provider
                    v-slot="{ errors }"
                    :rules="`required|itemArray:${JSON.stringify(itemsIndicators)};,${JSON.stringify(item)}`"
                    :name="'Indicator Name ' + item.id"
                  >
                    <b-form-group>
                      <b-form-input
                        :state="errors.length > 0 ? false : null"
                        type="text"
                        placeholder="Enter Item Name"
                        :value="item.name"
                        :disabled="item.active!=null"
                        @input="
                          (value) => itemNameInputIND(value, item.id)
                        "
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <b-col
                  md="3"
                >
                  <b-form-group>
                    <b-form-input
                      placeholder="Enter Item Description"
                      :value="item.desc"
                      :disabled="item.active!=null"
                      @input="
                        (value) => itemDescInputIND( value, item.id)
                      "
                    />
                  </b-form-group>
                </b-col>
                <b-col md="3">
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required"
                    name="Icon"
                  >
                    <v-select
                      v-model="item.type"
                      placeholder="Select Type"
                      label="title"
                      :disabled="item.active!=null"
                      :clearable="false"
                      :state="errors.length > 0 ? false : null"
                      :options="typeIndOptions"
                    />
                    <small class="text-danger mb-1">{{ errors[0] }}</small>
                  </validation-provider>
                </b-col>
                <b-col md="1">
                  <b-form-checkbox
                    :v-model="item.require"
                    :checked="item.require"
                    :disabled="item.active!=null"
                    @input="
                      (value) => itemReqInputIND( value, item.id)
                    "
                  />

                </b-col>
                <!-- Remove Button -->
                <b-col
                  v-if="item.active==null "
                  lg="2"
                  md="2"
                  class="mb-50"
                >
                  <b-button
                    variant="outline-danger"
                    class="mt-0 mt-md-0"
                    @click="removeItemIND(item.id)"
                  >
                    <feather-icon
                      icon="XIcon"
                      class="mr-25"
                    />
                    <span>Delete</span>
                  </b-button>
                </b-col>
                <!-- Deactive Button -->
                <b-col
                  v-else-if="showitem && item.active==1"
                  lg="2"
                  md="2"
                  class="mb-50"
                >
                  <b-button
                    variant="outline-warning"
                    class="mt-0 mt-md-0"
                    @click="De_Active(item)"
                  >
                    <feather-icon
                      icon="XIcon"
                      class="mr-25"
                    />
                    <span>Deactive</span>
                  </b-button>
                </b-col>
                <!-- Deactive Button -->
                <b-col
                  v-else-if=" item.active==0"
                  lg="2"
                  md="2"
                  class="mb-50"
                >
                  <b-button
                    variant="outline-success"
                    class="mt-0 mt-md-0"
                    @click="De_Active(item)"
                  >
                    <feather-icon
                      icon="XIcon"
                      class="mr-25"
                    />
                    <span>Active</span>
                  </b-button>
                </b-col>
              </b-row>
              <!-- Row Option -->
              <b-row
                align-h="between"
                class="justify-content"
              >
                <b-col
                  cols="auto"
                  class="mb-50"
                />
                <b-col cols="auto">
                  <b-button
                    variant="primary"
                    @click="repeateAgainIND"
                  >
                    <feather-icon
                      icon="PlusIcon"
                      class="mr-25"
                    />
                    <span>Add New Indicators</span>
                  </b-button>

                </b-col>
              </b-row>

            </div>
            <hr>
            <!-- Main: Project Item Info -->
            <div>
              <!-- Header: Project Item Info -->
              <div class="d-flex">
                <feather-icon
                  icon="BoxIcon"
                  size="19"
                />
                <h4 class="mb-0 ml-50">
                  Project Item
                </h4>
              </div>
              <br>
              <!-- Project Type -->
              <b-row ref="row">
                <b-col md="3">
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required"
                    name="Type"
                  >
                    <b-form-group label="Project Type">
                      <v-select
                        v-model="projecttype"
                        placeholder="Select ProjType"
                        label="title"
                        :clearable="false"
                        :disabled="isReadOnly"
                        :state="errors.length > 0 ? false : null"
                        :options="typeOptions"
                        @input="ChangeProjType"
                      />
                      <small class="text-danger mb-1">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                </b-col>
              </b-row>
              <br>
              <!-- Label-->
              <b-row v-if="showitem">
                <b-col md="3">
                  <b-form-group label="Item Name" />
                </b-col>

                <b-col md="3">
                  <b-form-group label="Item Description" />
                </b-col>
                <b-col md="2">
                  <b-form-group label="Minimum Quantity" />
                </b-col>
                <b-col md="2">
                  <b-form-group label="Maximum Quantity" />
                </b-col>
              </b-row>
              <!-- Row  -->
              <b-row
                v-for="(item, index) in items"
                :id="item.id"
                :key="item.id"
                ref="row"
              >
                <!-- Item Name -->
                <b-col md="3">
                  <validation-provider
                    v-if="showitem"
                    v-slot="{ errors }"
                    :rules="`required|itemArray:${JSON.stringify(items)};,${JSON.stringify(item)}`"
                    :name="'Item Name ' + item.id"
                  >
                    <b-form-group>
                      <b-form-input
                        :state="errors.length > 0 ? false : null"
                        type="text"
                        placeholder="Enter Item Name"
                        :value="item.name"
                        :disabled="item.active!=null"
                        @input="
                          (value) => itemNameInput(value, item.id)
                        "
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <b-col
                  v-if="showitem"
                  md="3"
                >
                  <b-form-group>
                    <b-form-input
                      placeholder="Enter Item Description"
                      :value="item.desc"
                      :disabled="item.active!=null"
                      @input="
                        (value) => itemDescInput( value, item.id)
                      "
                    />
                  </b-form-group>
                </b-col>
                <b-col
                  v-if="showitem"
                  md="2"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required"
                    name="item min"
                  >
                    <b-form-spinbutton
                      id="item_min"
                      v-model.number="item.minim_dist"
                      type="number"
                      min="0"
                      max="100"
                      :state="errors.length > 0 ? false : null"
                      placeholder="Enter Minimum Quantity"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-col>
                <b-col
                  v-if="showitem"
                  md="2"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required"
                    name="item max"
                  >
                    <b-form-spinbutton
                      id="item_max"
                      v-model.number="item.max_dist"
                      type="number"
                      min="0"
                      max="1000"
                      :state="errors.length > 0 ? false : null"
                      placeholder="Enter Maximum Quantity"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-col>
                <!-- Remove Button -->
                <b-col
                  v-show="index > 0 "
                  v-if="showitem && item.active==null "
                  lg="2"
                  md="2"
                  class="mb-50"
                >
                  <b-button
                    variant="outline-danger"
                    class="mt-0 mt-md-0"
                    @click="removeItem(index)"
                  >
                    <feather-icon
                      icon="XIcon"
                      class="mr-25"
                    />
                    <span>Delete</span>
                  </b-button>
                </b-col>
                <!-- Deactive Button -->
                <b-col
                  v-show="index > 0 "
                  v-else-if="showitem && item.active==1"
                  lg="2"
                  md="2"
                  class="mb-50"
                >
                  <b-button
                    variant="outline-warning"
                    class="mt-0 mt-md-0"
                    @click="De_Active(item)"
                  >
                    <feather-icon
                      icon="XIcon"
                      class="mr-25"
                    />
                    <span>Deactive</span>
                  </b-button>
                </b-col>
                <!-- Deactive Button -->
                <b-col
                  v-show="index > 0 "
                  v-else-if="showitem && item.active==0"
                  lg="2"
                  md="2"
                  class="mb-50"
                >
                  <b-button
                    variant="outline-success"
                    class="mt-0 mt-md-0"
                    @click="De_Active(item)"
                  >
                    <feather-icon
                      icon="XIcon"
                      class="mr-25"
                    />
                    <span>Active</span>
                  </b-button>
                </b-col>
              </b-row>
              <!-- Out Sourcing -->
              <!-- Label-->
              <div v-if="projecttype !=null && projecttype.value !=null">

                <b-row v-if="projecttype.value===3">
                  <b-col md="3">
                    <b-form-group label="Type" />
                  </b-col>

                  <b-col md="3">
                    <b-form-group label="Unit" />
                  </b-col>
                  <b-col md="2">
                    <b-form-group label="Minimum Quantity" />
                  </b-col>
                  <b-col md="2">
                    <b-form-group label="Maximum Quantity" />
                  </b-col>
                </b-row>
                <b-row v-if="projecttype.value===3">
                  <b-col md="3">
                    <validation-provider
                      v-slot="{ errors }"
                      rules="required"
                      name="Item Name"
                    >
                      <b-form-group>
                        <b-form-input
                          v-model="srcType"
                          :state="errors.length > 0 ? false : null"
                          type="text"
                          placeholder="Enter Type"
                        />
                        <small class="text-danger">{{ errors[0] }}</small>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col md="3">
                    <validation-provider
                      v-slot="{ errors }"
                      rules="required"
                      name="Unit"
                    >
                      <b-form-group>
                        <v-select
                          v-model="srcUnit"
                          placeholder="Select Unit"
                          label="title"
                          :clearable="false"
                          :state="errors.length > 0 ? false : null"
                          :options="unitOptions"
                        />
                        <small class="text-danger">{{ errors[0] }}</small>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col md="2">
                    <validation-provider
                      v-slot="{ errors }"
                      rules="required"
                      name="min"
                    >
                      <b-form-group>
                        <b-form-input
                          v-model="srcMin"
                          :state="errors.length > 0 ? false : null"
                          type="number"
                          placeholder="Enter Min"
                        />
                        <small class="text-danger">{{ errors[0] }}</small>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col md="2">
                    <validation-provider
                      v-slot="{ errors }"
                      rules="required"
                      name="max"
                    >
                      <b-form-group>
                        <b-form-input
                          v-model="srcMax"
                          :state="errors.length > 0 ? false : null"
                          type="number"
                          placeholder="Enter Max"
                        />
                        <small class="text-danger">{{ errors[0] }}</small>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                </b-row>
              </div>

              <!-- Row Option -->
              <b-row
                align-h="between"
                class="justify-content"
              >
                <b-col
                  cols="auto"
                  class="mb-50"
                />
                <b-col cols="auto">
                  <b-button
                    v-show="showitem"
                    variant="primary"
                    @click="repeateAgain"
                  >
                    <feather-icon
                      icon="PlusIcon"
                      class="mr-25"
                    />
                    <span>Add New Item</span>
                  </b-button>
                  <b-button
                    class="ml-1 mr-1"
                    variant="success"
                    type="submit"
                    @click="SaveData"
                  >
                    <feather-icon
                      icon="SaveIcon"
                      class="mr-1"
                    />
                    <span>Save</span>
                  </b-button>
                  <!--<b-button
                      variant="warning"
                      @click="ResetData"
                    >
                      <feather-icon icon="RefreshCwIcon" class="mr-1" />
                      <span>Reset</span>
                    </b-button>-->
                </b-col>
              </b-row>
            </div>
          </b-form>
        </validation-observer>
      </div>
    </b-card>
  </b-overlay>
</template>

<script>
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
import vSelect from 'vue-select'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { takeState } from 'vuex-dot'

export default {
  components: {
    vSelect,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      nextTodoId: 2,
      showitem: false,
      isReadOnly: false,
    }
  },
  computed: {
    show: takeState('createPrj', 'show').commit('createPrj/SET_SHOW').map(),
    // Select
    iconOptions: takeState('createPrj', 'iconOptions').map(),
    typeIndOptions: takeState('createPrj', 'typeIndOptions').map(),

    typeOptions: takeState('createPrj', 'typeOptions').map(),
    assmntOptions: takeState('createPrj', 'assmntOptions').map(),
    unitOptions: takeState('createPrj', 'unitOptions').map(),

    // General
    name: takeState('createPrj', 'name').commit('createPrj/SET_NAME').map(),
    prefix: takeState('createPrj', 'prefix').commit('createPrj/SET_PREF').map(),
    description: takeState('createPrj', 'description').commit('createPrj/SET_DESC').map(),
    iconValue: takeState('createPrj', 'iconValue').commit('createPrj/SET_ICON').map(),

    /// OutSourcing
    srcMin: takeState('createPrj', 'srcMin').commit('createPrj/SET_SRC_MIN').map(),
    srcMax: takeState('createPrj', 'srcMax').commit('createPrj/SET_SRC_MAX').map(),
    srcUnit: takeState('createPrj', 'srcUnit').commit('createPrj/SET_SRC_UNIT').map(),
    srcType: takeState('createPrj', 'srcType').commit('createPrj/SET_SRC_TYPE').map(),
    /// Project Setting
    validationName: takeState('createPrj', 'validationName').commit('createPrj/SET_SETTING_VALID_NAME').map(),
    periodDuplicate: takeState('createPrj', 'periodDuplicate').commit('createPrj/SET_SETTING_PERI_DUP').map(),
    periodDuration: takeState('createPrj', 'periodDuration').commit('createPrj/SET_SETTING_PERI_DUR').map(),
    graceDuration: takeState('createPrj', 'graceDuration').commit('createPrj/SET_SETTING_GRC_DUR').map(),
    assmntValue: takeState('createPrj', 'assmntType').commit('createPrj/SET_SETTING_ASSM_TYPE').map(),
    /// Type
    projecttype: takeState('createPrj', 'projecttype').commit('createPrj/SET_TYPE').map(),
    /// Tangible
    items: takeState('createPrj', 'items').commit('createPrj/ADD_ITEMS').map(),
    /// indicators
    itemsIndicators: takeState('createPrj', 'itemsIndicators').commit('createPrj/ADD_ITEMS_IND').map(),

  },
  mounted() {
    if (this.$route.params.value === '') {
      this.isReadOnly = false
      this.clean()
    } else {
      this.isReadOnly = true
    }
    this.assmntValue = null
    this.$store.dispatch('createPrj/GET_DATA', {
      isValue: this.$route.params.value,
    }).then(() => {
      const val = this.$route.params.value
      this.name = val.proj_name
      this.prefix = val.proj_prefix
      this.description = val.description
      this.iconValue = this.iconOptions.filter(
        it => it.title === val.icon_text,
      )[0]
      this.projecttype = this.typeOptions.filter(
        it => (it.value === (val.proj_type_id == null ? 1 : val.proj_type_id)),
      )[0]
      if (this.projecttype.value === 1) {
        this.showitem = true
      } else {
        this.showitem = false
      }
    }).catch(() => {
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
  methods: {
    clean() {
      this.name = null
      this.prefix = null
      this.description = null
      this.iconValue = null
      this.projecttype = null
      this.$refs.form.reset()
      this.$refs.simpleRules.reset()
      this.projecttype = this.typeOptions.filter(
        it => it.value === 1,
      )[0]
      this.iconValue = this.iconOptions.filter(
        it => it.id === 1,
      )[0]
    },
    De_Active(it) {
      it.active = !it.active
      try {
        this.$refs.simpleRules.validate().then(success => {
          if (success) {
            this.show = true
            this.$store
              .dispatch('createPrj/SAVE_DATA', {
                proj_id: this.$route.params.value === '' ? null : this.$route.params.value.proj_id,
              })
              .then(res => {
                if (res.result === 1) {
                  this.$swal({
                    title: 'Success!',
                    text: 'Operation successfuly',
                    icon: 'success',
                    customClass: {
                      confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false,
                  })
                } else if (res.result === 2) {
                  this.show = false
                  this.$swal({
                    title: 'Failed!',
                    text: res.reason,
                    icon: 'error',
                    customClass: {
                      confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false,
                  })
                  it.active = !it.active
                } else {
                  this.show = false
                  this.$swal({
                    title: 'Failed!',
                    text: 'Operation Failed',
                    icon: 'error',
                    customClass: {
                      confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false,
                  })
                  it.active = !it.active
                }
              })
              .catch(e => {
                console.log(e)
                this.show = false
                this.$swal({
                  title: 'Failed!',
                  text: 'Please Check internet and try again',
                  icon: 'error',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                })
                it.active = !it.active
              })
          } else {
            this.$swal({
              title: 'Attention!',
              text: 'Missing Data',
              icon: 'warning',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
            it.active = !it.active
          }
        })
      } catch (e) {
        console.log(e)
        it.active = !it.active
      }
    },
    repeateAgainExtra() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          this.$store.commit('createPrj/ADD_ITEMS_IND', {
            id: this.$store.getters['createPrj/lastIdIND'] == null ? 0 + 1
              : this.$store.getters['createPrj/lastIdIND'].id + 1,
            active: null,
            inId: null,
            name: null,
            desc: null,
            isInd: false,
          })
        }
      })
    },
    repeateAgainIND() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          this.$store.commit('createPrj/ADD_ITEMS_IND', {
            id: this.$store.getters['createPrj/lastIdIND'] == null ? 0 + 1
              : this.$store.getters['createPrj/lastIdIND'].id + 1,
            active: null,
            inId: null,
            name: null,
            desc: null,
            isInd: true,
          })
        }
      })
    },
    repeateAgain() {
      console.log('dddd')
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          console.log('bef', this.$store.getters['createPrj/lastId'])
          this.$store.commit('createPrj/ADD_ITEMS', {
            id: this.$store.getters['createPrj/lastId'] == null ? 0 + 1
              : this.$store.getters['createPrj/lastId'].id + 1,
            active: null,
            main: null,
            inId: null,
            name: null,
            name_ar: null,
            desc: null,
          })
        }
      })
    },
    removeItem(index) {
      this.$store.commit('createPrj/REM_ITEMS', { index })
    },
    removeItemIND(index) {
      this.$store.commit('createPrj/REM_ITEMS_IND', { index })
    },
    SaveData() {
      try {
        this.$refs.simpleRules.validate().then(success => {
          if (success) {
            this.show = true
            this.$store
              .dispatch('createPrj/SAVE_DATA', {
                proj_id: this.$route.params.value === '' ? null : this.$route.params.value.proj_id,
              })
              .then(res => {
                if (res.result === 1) {
                  this.ProjectsList()
                  this.$swal({
                    title: 'Success!',
                    text: 'Operation successfuly',
                    icon: 'success',
                    customClass: {
                      confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false,
                  })
                } else if (res.result === 2) {
                  this.show = false
                  this.$swal({
                    title: 'Failed!',
                    text: res.reason,
                    icon: 'error',
                    customClass: {
                      confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false,
                  })
                } else {
                  this.show = false
                  this.$swal({
                    title: 'Failed!',
                    text: 'Operation Failed',
                    icon: 'error',
                    customClass: {
                      confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false,
                  })
                }
              })
              .catch(e => {
                console.log(e)
                this.show = false
                this.$swal({
                  title: 'Failed!',
                  text: 'Please Check internet and try again',
                  icon: 'error',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                })
              })
          } else {
            this.$swal({
              title: 'Attention!',
              text: 'Missing Data',
              icon: 'warning',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    ProjectsList() {
      const nav = []
      nav.push({
        active: false,
        text: this.$route.params.breadcrumb[0].text,
      },
      {
        active: true,
        text: 'Project List',
      })
      this.$router.replace({
        name: 'menu',
        params: {
          action: 'read',
          breadcrumb: nav,
          active: true,
          resource: 'PRJLST',
          prefixRole: 'PRJLST',
          prefixPrj: 'PRJMU',
          title: 'Project List',
        },
      })
    },
    ResetData() {
      this.$refs.form.reset()
      this.$refs.simpleRules.reset()
      this.projecttype = this.typeOptions.filter(
        it => it.value === 1,
      )[0]
      this.iconValue = this.iconOptions.filter(
        it => it.id === 1,
      )[0]
    },
    Refesh() {
      window.location.reload()
    },
    ChangeProjType() {
      if (this.projecttype.value === 1) {
        this.showitem = true
        // this.$store.commit('createPrj/REM_ALL_ITEMS')

        // this.repeateAgain()
      } else {
        this.showitem = false
        // this.$store.commit('createPrj/REM_ALL_ITEMS')
      }
    },
    itemNameInput(value, index) {
      this.items.filter(it => it.id === parseInt(index, 10))[0].name = value
    },
    itemNameInputIND(value, index) {
      this.itemsIndicators.filter(it => it.id === parseInt(index, 10))[0].name = value
    },
    itemDescInputIND(value, index) {
      this.itemsIndicators.filter(it => it.id === parseInt(index, 10))[0].desc = value
    },
    itemReqInputIND(value, index) {
      this.itemsIndicators.filter(it => it.id === parseInt(index, 10))[0].require = value
    },
    itemNameArInput(value, index) {
      this.items.filter(it => it.id === parseInt(index, 10))[0].name_ar = value
    },
    itemDescInput(value, index) {
      this.items.filter(it => it.id === parseInt(index, 10))[0].desc = value
    },
  },
}
</script>

    <style lang="scss">
    @import '@core/scss/vue/libs/vue-select.scss';

    </style>
