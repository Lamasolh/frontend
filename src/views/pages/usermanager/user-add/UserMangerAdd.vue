<template>
  <b-card>
    <b-overlay
      rounded="lg"
      :show="showd"
    >
      <ValidationObserver ref="useradd">
        <!-- User Info: Input Fields -->
        <b-form ref="userForm">
          <!-- Media -->
          <b-media class="mb-2">
            <template #aside>
              <b-avatar
                ref="previewEl"
                :src="Image"
                :text="avatarText(fullName)"
                :variant="`light-primary`"
                size="90px"
                rounded
              />
            </template>
            <h4 class="mb-1">
              {{ fullName }}
            </h4>
            <div class="d-flex flex-wrap">
              <b-button
                variant="primary"
                :disabled="isEdit"
                @click="toggleShow"
              >
                <b-form-file
                  ref="refInputEl"
                  accept="image/jpeg, image/png"
                  type="file"
                  class="d-none"
                  plain
                  hidden
                  @change="Update"
                />
                <span class="d-none d-sm-inline">Update</span>
                <feather-icon
                  icon="EditIcon"
                  class="d-inline d-sm-none"
                />
              </b-button>
              <b-button
                variant="outline-secondary"
                class="ml-1"
                :disabled="isEdit"
                @click="Remove"
              >
                <span class="d-none d-sm-inline">Remove</span>
                <feather-icon
                  icon="TrashIcon"
                  class="d-inline d-sm-none"
                />
              </b-button>
            </div>
          </b-media>

          <b-row>
            <!-- Field: Username -->
            <b-col
              cols="12"
              md="6"
            >
              <b-form-group
                label="Username"
                label-for="Username"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Username"
                  rules="required|alpha_dash|min:4"
                >
                  <b-form-input
                    id="Username"
                    v-model="userName"
                    :disabled="isEdit"
                    :state="
                      errors.length > 0 ? false : null
                    "
                    placeholder="Enter Username"
                  />
                  <small class="text-danger">{{
                    errors[0]
                  }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!-- Field: Gender -->
            <b-col
              cols="12"
              md="6"
            >
              <b-form-group
                label="Gender"
                label-for="Gender"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Gender"
                  rules="required"
                >
                  <v-select
                    id="Gender"
                    v-model="userGender"
                    :disabled="isEdit"
                    :dir="
                      $store.state.appConfig.isRTL
                        ? 'rtl'
                        : 'ltr'
                    "
                    :state="
                      errors.length > 0 ? false : null
                    "
                    :options="genderOp"
                    :clearable="false"
                    label="title"
                  />
                  <small class="text-danger">{{
                    errors[0]
                  }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Field: First Name -->
            <b-col
              cols="12"
              md="6"
            >
              <b-form-group
                label="First Name"
                label-for="First Name"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="First Name"
                  rules="required"
                >
                  <b-form-input
                    id="First Name"
                    v-model="userFN"
                    :disabled="isEdit"
                    :state="
                      errors.length > 0 ? false : null
                    "
                    placeholder="Enter First Name"
                  />
                  <small class="text-danger">{{
                    errors[0]
                  }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Field: Last Name -->
            <b-col
              cols="12"
              md="6"
            >
              <b-form-group
                label="Last Name"
                label-for="Last Name"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Last Name"
                  rules="required"
                >
                  <b-form-input
                    id="Last Name"
                    v-model="userLN"
                    :disabled="isEdit"
                    :state="
                      errors.length > 0 ? false : null
                    "
                    placeholder="Enter Last Name"
                  />
                  <small class="text-danger">{{
                    errors[0]
                  }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Field: First Name Ar
            <b-col
              cols="12"
              md="6"
            >
              <b-form-group
                label="First Name Arabic"
                label-for="First Name Arabic"
              >
                <validation-provider
                  #default="{ errors }"
                  name="First Name Arabic"
                  rules="required|name"
                >
                  <b-form-input
                    id="First Name Arabic"
                    v-model="userFNAR"
                    :disabled="isEdit"
                    dir="rtl"
                    :state="
                      errors.length > 0 ? false : null
                    "
                    placeholder="ادخل الاسم "
                  />
                  <small class="text-danger">{{
                    errors[0]
                  }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>-->

            <!-- Field: Last Name Ar
            <b-col
              cols="12"
              md="6"
            >
              <b-form-group
                label="Last Name Arabic"
                label-for="Last Name Arabic"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Last Name Arabic"
                  rules="required|name"
                >
                  <b-form-input
                    id="Last Name Arabic"
                    v-model="userLNAR"
                    :disabled="isEdit"
                    dir="rtl"
                    :state="
                      errors.length > 0 ? false : null
                    "
                    placeholder="ادخل الشهرة"
                  />
                  <small class="text-danger">{{
                    errors[0]
                  }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>-->

            <!-- Field: Nationality -->
            <b-col
              cols="12"
              md="6"
            >
              <b-form-group
                label="Nationality"
                label-for="Nationality"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Nationality"
                  rules="required"
                >
                  <v-select
                    id="Nationality"
                    v-model="userNat"
                    :disabled="isEdit"
                    :dir="
                      $store.state.appConfig.isRTL
                        ? 'rtl'
                        : 'ltr'
                    "
                    :options="nationalityOp"
                    :state="
                      errors.length > 0 ? false : null
                    "
                    placeholder="Enter Nationality"
                    :clearable="false"
                    label="title"
                  />
                  <small class="text-danger">{{
                    errors[0]
                  }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Field: Job -->
            <b-col
              cols="12"
              md="6"
            >
              <b-form-group
                label="Job"
                label-for="Job"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Job"
                  rules="required"
                >
                  <v-select
                    id="Job"
                    v-model="userJob"
                    :dir="
                      $store.state.appConfig.isRTL
                        ? 'rtl'
                        : 'ltr'
                    "
                    :options="jobOp"
                    :state="errors.length > 0 ? false : null"
                    placeholder="Enter Job"
                    :clearable="false"
                    label="title"
                  />
                  <small class="text-danger">{{
                    errors[0]
                  }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Field: DOB -->
            <b-col
              cols="12"
              md="6"
            >
              <b-form-group
                label="Date of Birth"
                label-for="Date of Birth"
              >
                <flat-pickr
                  id="Date of Birth"
                  v-model="userDOB"
                  :disabled="isEdit"
                  :style="
                    isEdit
                      ? 'background-color: #efefef'
                      : ''
                  "
                  class="form-control"
                  placeholder="Date of Birth"
                />
              </b-form-group>
            </b-col>

            <!-- Field: Email -->
            <b-col
              cols="12"
              md="6"
            >
              <b-form-group
                label="Email"
                label-for="UserEmail"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Email"
                  rules="required|email"
                >
                  <b-form-input
                    id="UserEmail"
                    v-model="userEmail"
                    :disabled="isEdit"
                    type="email"
                    :state="
                      errors.length > 0 ? false : null
                    "
                    placeholder="Enter Email"
                  />
                  <small class="text-danger">{{
                    errors[0]
                  }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Field: Phone -->
            <b-col
              cols="12"
              md="6"
            >
              <b-form-group label="Phone">
                <validation-provider
                  v-slot="{ errors }"
                  name="Phone"
                  :rules="
                    'required|' +
                      `${
                        userPhone.id === 1
                          ? 'phonelbed'
                          : 'min:8|max:11'
                      }`
                  "
                  style="display: inline"
                >
                  <b-input-group>
                    <template #prepend>
                      <b-dropdown
                        :text="userPhone.text"
                        variant="outline-primary"
                      >
                        <b-dropdown-item
                          v-for="ct in phoneOp"
                          :key="ct.id"
                          :disabled="isEdit"
                          :value="ct.value"
                          @click="
                            dropSelect(ct.value)
                          "
                        >
                          {{ ct.title }}
                        </b-dropdown-item>
                      </b-dropdown>
                    </template>
                    <b-form-input
                      v-model.number="userPhone.number"
                      :disabled="isEdit"
                      type="tel"
                      class="form-control"
                      :state="
                        errors.length > 0 ? false : null
                      "
                      :placeholder="
                        phoneProps.placeholder
                      "
                      :formatter="formatter"
                    />
                  </b-input-group>
                  <small class="text-danger">{{
                    errors[0]
                  }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!-- Field: Password -->
            <b-col
              cols="12"
              md="4"
            >
              <b-form-group label="Password">
                <validation-provider
                  v-slot="{ errors }"
                  name="Password"
                  style="display: inline"
                >
                  <b-input-group>

                    <b-form-input
                      v-model="userPassword"
                      class="form-control"
                      :state="
                        errors.length > 0 ? false : null
                      "
                      placeholder="Enter New Password"
                    />
                  </b-input-group>
                  <small class="text-danger">{{
                    errors[0]
                  }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="2">
              <b-button
                style="margin-top: 25px;"
                variant="success"
                block
                @click="restPassword"
              >

                Reset Password
              </b-button>
            </b-col>
            <!-- Field: Bio -->
            <b-col cols="12">
              <b-form-group label="Bio">
                <b-form-textarea
                  id="textarea-default"
                  v-model="userBio"
                  :disabled="isEdit"
                  placeholder="Bio"
                  rows="3"
                />
              </b-form-group>
            </b-col>

            <!-- Field: Address -->
            <b-col cols="12">
              <b-form-group label="Address">
                <b-form-input
                  v-model="userAddress"
                  :disabled="isEdit"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <h2
            v-show="
              rolesField.length > 0 &&
                rolesItem.length > 0 &&
                showTable
            "
          >
            Permissions
          </h2>
          <b-table
            v-show="
              rolesField.length > 0 &&
                rolesItem.length > 0 &&
                showTable
            "
            ref="selectableTable"
            responsive
            bordered
            :selected-variant="$store.state.appConfig.layout.skin === 'dark'?'active':'primary'"
            :items="rolesItem"
            :fields="rolesField"
            show-empty
            empty-text="No matching records found"
          >
            <template #cell(USRLST)>
              <b-row
                key="USRLST"
                :disabled="userStatus === 5"
                align-h="center"
              >
                <b-col>
                  <b-form-checkbox
                    v-model="rolesItem[0].USRLST"
                    :disabled="userStatus === 5"
                  />
                </b-col>
              </b-row>
            </template>
            <template #cell(ADUSR)>
              <b-row
                key="ADUSR"
                :disabled="userStatus === 5"
                align-h="center"
              >
                <b-col>
                  <b-form-checkbox
                    v-model="rolesItem[0].ADUSR"
                    :disabled="userStatus === 5"
                  />
                </b-col>
              </b-row>
            </template>

            <template #cell(MRGSRI)>
              <b-row
                key="MRGSRI"
                :disabled="userStatus === 5"
                align-h="center"
              >
                <b-col>
                  <b-form-checkbox
                    v-model="rolesItem[0].MRGSRI"
                    :disabled="userStatus === 5"
                  />
                </b-col>
              </b-row>
            </template>
            <template #cell(PRJKTS)>
              <b-row
                key="PRJKTS"
                :disabled="userStatus === 5"
                align-h="center"
              >
                <b-col>
                  <b-form-checkbox
                    v-model="rolesItem[0].PRJKTS"
                    :disabled="userStatus === 5"
                  />
                </b-col>
              </b-row>
            </template>
          </b-table>
          <br>
          <!-- Action Buttons -->
          <b-row align-h="between">
            <b-col>
              <!--  Add user-->
              <b-button
                v-show="!isEdit"
                variant="success"
                class="mb-1 mb-sm-0 mr-0 mr-sm-1"
                :block="
                  $store.getters['app/currentBreakPoint'] === 'xs'
                "
                @click="Save"
              >
                Save Changes
              </b-button>
              <!-- Update -->
              <b-button
                v-show="isEdit && userStatus !== 5 "
                variant="primary"
                class="mb-1 mb-sm-0 mr-0 mr-sm-1"
                :block="
                  $store.getters['app/currentBreakPoint'] === 'xs'
                "
                @click="Edit(false)"
              >
                Update
              </b-button>
              <!-- Resend Password
              <b-button
                v-show="isEdit && userStatus !== 5"
                variant="warning"
                class="mb-1 mb-sm-0 mr-0 mr-sm-1"
                :block="
                  $store.getters['app/currentBreakPoint'] === 'xs'
                "
                @click="Edit(true)"
              >
                Resend Password
              </b-button>-->

              <!--   Deactive User -->
              <b-button
                v-if="userStatus ==2 && isEdit && userStatus !== 5"
                variant="danger"
                class="mb-1 mb-sm-0 mr-0 mr-sm-1"
                :block="
                  $store.getters['app/currentBreakPoint'] === 'xs'
                "
                @click="de_active(false)"
              >
                Deactive User
              </b-button>
              <!-- Active User -->
              <b-button
                v-else-if="userStatus ==3 && isEdit"
                variant="success"
                class="mb-1 mb-sm-0 mr-0 mr-sm-1"
                :block="
                  $store.getters['app/currentBreakPoint'] === 'xs'
                "
                @click="de_active(true)"
              >
                Active User
              </b-button>
              <!--Reset -->
              <b-button
                v-show="!isEdit && userStatus !== 5"
                variant="outline-secondary"
                type="reset"
                :disabled="isEdit"
                :block="
                  $store.getters['app/currentBreakPoint'] === 'xs'
                "
                @click="Reset"
              >
                Reset
              </b-button>
            </b-col>
            <b-col cols="2">
              <!-- Delete User-->
              <b-button
                v-if="isEdit && isAdmin.isAdmin.length>0 && userStatus !== 5"
                variant="danger"
                class="mb-1 mb-sm-0 mr-0 mr-sm-1"
                :block="
                  $store.getters['app/currentBreakPoint'] === 'xs'
                "
                @click="Delete"
              >
                Delete User
              </b-button>
            </b-col>
          </b-row>

        </b-form>
        <my-upload
          v-model="show"
          field="img"
          :width="200"
          :height="200"
          :params="params"
          lang-type="en"
          :headers="headers"
          img-format="png"
          :no-rotate="false"
          @crop-success="cropSuccess"
        />
      </ValidationObserver>
    </b-overlay>
  </b-card>
</template>
<script>
import myUpload from 'vue-image-crop-upload/upload-2.vue'
import vSelect from 'vue-select'
import { takeState } from 'vuex-dot'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import Ripple from 'vue-ripple-directive'
import flatPickr from 'vue-flatpickr-component'
/* eslint-disable no-tabs */

export default {
  components: {
    vSelect,
    ValidationProvider,
    flatPickr,
    ValidationObserver,
    myUpload,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      showTable: false,
      isEdit: false,
      show: false,
      params: {
        token: '123456798',
        name: 'avatar',
      },
      headers: {
        smail: '*_~',
      },
      imgDataUrl: '',
    }
  },
  computed: {
    // Select
    genderOp: takeState('global', 'gender').map(),
    nationalityOp: takeState('global', 'nationality').map(),
    jobOption: takeState('global', 'job_title').map(),
    statusOptions: takeState('global', 'user_status').map(),
    jobOp() {
      const job = this.jobOption.filter(it => it.value !== 1)
      return job
    },
    phoneOp: takeState('global', 'phoneOptions').map(),
    phoneProps: takeState('global', 'phoneProps').map(),
    // Custom Data
    userLogo: takeState('useradd', 'userLogo').commit('useradd/SET_USER_LOGO').map(),
    userStatus: takeState('useradd', 'userStatus').commit('useradd/SET_USER_Status').map(),
    userName: takeState('useradd', 'userName').commit('useradd/SET_USER_NAME').map(),
    userFN: takeState('useradd', 'userFN').commit('useradd/SET_USER_FN').map(),
    userLN: takeState('useradd', 'userLN').commit('useradd/SET_USER_LN').map(),
    userFNAR: takeState('useradd', 'userFNAR').commit('useradd/SET_USER_FNAR').map(),
    userLNAR: takeState('useradd', 'userLNAR').commit('useradd/SET_USER_LNAR').map(),
    userGender: takeState('useradd', 'userGender').commit('useradd/SET_USER_GEN').map(),
    userNat: takeState('useradd', 'userNat').commit('useradd/SET_USER_NAT').map(),
    userDOB: takeState('useradd', 'userDOB').commit('useradd/SET_USER_DOB').map(),
    userEmail: takeState('useradd', 'userEmail').commit('useradd/SET_USER_MAIL').map(),
    userPhone: takeState('useradd', 'userPhone').commit('useradd/SET_USER_PHO').map(),

    userPassword: takeState('useradd', 'userPassword').commit('useradd/SET_USER_PASS').map(),

    userJob: takeState('useradd', 'userJob').commit('useradd/SET_USER_JOB').map(),
    userBio: takeState('useradd', 'userBio').commit('useradd/SET_USER_BIO').map(),
    userAddress: takeState('useradd', 'userAddress').commit('useradd/SET_USER_ADD').map(),
    rolesItem: takeState('useradd', 'rolesItem').commit('useradd/SET_ITEM').map(),
    rolesField: takeState('useradd', 'rolesField').map(),
    rolesItemLoop: takeState('useradd', 'rolesItemLoop').map(),
    showd: takeState('useradd', 'show').commit('useradd/SET_SHOW').map(),
    isAdmin: takeState('auth', 'userData').map(),
    fullName() {
      return `${this.userFN == null ? ' ' : this.userFN} ${
        this.userLN == null ? ' ' : this.userLN
      }`
    },
    check() {
      return this.orgLogo != null
    },
    Image() {
      if (this.userLogo == null) {
        if (this.userGender.value === 2) {
          // eslint-disable-next-line global-require
          return require('@/assets/images/avatars/avatar-man-small.png')
        } if (this.userGender.value === 3) {
          // eslint-disable-next-line global-require
          return require('@/assets/images/avatars/avatar-woman-small.png')
        }
        // eslint-disable-next-line global-require
        return null
      }
      return this.userLogo
    },
  },
  mounted() {
    if (this.$route.params.value != null) {
      this.isEdit = true
      this.ResetData(this.$route.params.value.id)
      const items = this.$route.params.value
      this.userName = items.user_name
      this.userLogo = items.avatar
      this.userFN = items.first_name
      this.userLN = items.last_name
      this.userFNAR = items.first_name_ar
      this.userLNAR = items.last_name_ar
      this.userStatus = items.user_status
      // eslint-disable-next-line prefer-destructuring
      this.userGender = this.$store.getters['global/gender'].filter(
        it => it.value === items.gender,
      )[0]
      // eslint-disable-next-line prefer-destructuring
      this.userNat = this.$store.getters['global/nationality'].filter(
        it => it.value === items.nationality,
      )[0]
      this.userEmail = items.email
      // phone
      const str = items.phone == null ? null : items.phone.toString()
      let cnt = 1
      if (str == null) {
        cnt = 1
      } else if (str.substring(0, 3) === '961') {
        cnt = 1
      } else if (str.substring(0, 3) === '963') {
        cnt = 2
      }
      this.userPhone.id = cnt
      this.userPhone.text = this.$store.getters[
        'global/phoneOptions'
      ].filter(it => it.value === cnt)[0].text
      this.userPhone.number = str == null ? null : str.substring(3, str.length)
      // eslint-disable-next-line prefer-destructuring
      this.userJob = this.$store.getters['global/job_title'].filter(
        it => it.value === items.job_title,
      )[0]
      this.userBio = items.bio
      this.userAddress = items.address
      this.userDOB = items.date_of_birth
    } else {
      this.ResetData(null)
      this.isEdit = false
      this.userName = null
      this.userLogo = null
      this.userFN = null
      this.userLN = null
      this.userFNAR = null
      this.userLNAR = null
      this.userGender = {
        title: 'Male',
        title_ar: 'ذكر',
        value: 2,
      }
      this.userNat = {
        title: 'Lebanese',
        title_ar: 'لبناني',
        value: 2,
      }
      this.userDOB = null
      this.userEmail = null
      this.userAddress = null
      this.userPhone = {
        id: 1,
        text: 'LB(961)',
        number: null,
      }
      this.userJob = {
        title: 'Admin',
        title_ar: 'مسؤول',
        value: 2,
      }
      this.userBio = null
    }
  },
  methods: {
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
    /* inputImageRenderer() {
      // eslint-disable-next-line no-undef
      useInputImageRenderer(refInputEl, base64 => {
      // eslint-disable-next-line no-param-reassign
        this.userData.avatar = base64
      })
    }, */
    Delete() {
      this.$swal({
        title: 'Case Confirmation!',
        text: 'Are you sure you want to The case?',
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
        if (result.value === true) {
          this.$store
            .dispatch('useradd/DELETE_USER', { id: this.$route.params.value.id })
            .then(res => {
              if (res.result === 1) {
                this.$swal({
                  title: 'Success!',
                  text: 'Operation Successfully',
                  icon: 'success',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                })
                this.userStatus = 5
              } else if (res.result === 0) {
                this.$swal({
                  title: 'Error!',
                  text: 'Operation failed',
                  icon: 'error',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                })
              } else {
                this.$swal({
                  title: 'Error!',
                  text: 'Operation failed,contact administrator',
                  icon: 'error',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                })
              }
            }).catch(() => {
              this.$swal({
                title: 'Attention!',
                text: 'Please check intenrnet and try again!',
                icon: 'warning',
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              })
            })
        }
      })
    },
    dropSelect(value) {
      this.userPhone.id = value
      this.userPhone.text = this.$store.getters[
        'global/phoneOptions'
      ].filter(it => it.value === value)[0].text
      /* this.items[index].countryid = value
      this.items[index].country = this.phone.options.filter(ct => ct.value === value)[0].text */
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
          str = str
            .replace(persianNumbers[i], i)
            .replace(arabicNumbers[i], i)
        }
      }
      return str
    },
    Update(value) {
      const t = value.target.files[0].type
      if (value.target.files[0].size / 1024 / 1024 > 2) {
        // this.$refs.refInputEl.reset()
        this.$swal({
          icon: 'error',
          title: 'Attention!',
          text: 'Maximum image size is 2MB',
          customClass: {
            confirmButton: 'btn btn-success',
          },
        })
      } else if (t === 'image/jpeg' || t === 'image/png') {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(value.target.files[0])
          reader.onload = () => {
            // eslint-disable-next-line prefer-destructuring
            this.userLogo = reader.result
            resolve(reader.result)
          }
          reader.onerror = error => reject(error)
        })
      } else {
        // this.$refs.refInputEl.reset()
        this.$swal({
          icon: 'error',
          title: 'Atttention!',
          text: 'Please upload an image of type (Jpeg or png)',
          customClass: {
            confirmButton: 'btn btn-success',
          },
        })
      }
      return null
    },
    Remove() {
      this.userLogo = null
    },
    Reset() {
      console.log(this.rolesItem)
      console.log(this.rolesItem[0].PRJLST)
      const arr = []
      this.rolesField.forEach(element => {
        arr[element.key] = false
      })
      this.userName = null
      this.userLogo = null
      this.userFN = null
      this.userLN = null
      this.userFNAR = null
      this.userLNAR = null
      this.userGender = {
        title: 'Male',
        title_ar: 'ذكر',
        value: 2,
      }
      this.userNat = {
        title: 'Lebanese',
        title_ar: 'لبناني',
        value: 2,
      }
      this.userDOB = null
      this.userEmail = null
      this.userAddress = null
      this.userPhone = {
        id: 1,
        text: 'LB(961)',
        number: null,
      }
      this.userJob = {
        title: 'Admin',
        title_ar: 'مسؤول',
        value: 2,
      }
      this.userBio = null
      this.$store.commit('useradd/PUSH_ITEM', arr)
      this.$emit('res')
      this.$refs.userForm.reset()
      this.$refs.useradd.reset()
    },
    restPassword() {
      if (this.userPassword === '' || this.userPassword == null) {
        this.$swal({
          title: 'Attention!',
          text: 'Please Enter Password',
          icon: 'warning',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
      } else {
        this.$store
          .dispatch('useradd/RESET_PASS', {
            id: this.$route.params.value.id,
          })
          .then(res => {
            if (res.result[0].result === 1) {
              this.$swal({
                title: 'Success!',
                text: 'Operation Successfully',
                icon: 'success',
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
          }).catch(() => {
            this.$swal({
              title: 'Attention!',
              text: 'Please check intenrnet and try again!',
              icon: 'warning',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          })
      }
    },
    Edit(send) {
      this.$store
        .dispatch('useradd/EDIT_DATA', {
          id: this.$route.params.value.id,
          send,
        })
        .then(res => {
          console.log('res', res.result)
          console.log('re1s', res.stat)
          if (res.result === 1) {
            this.$swal({
              title: 'Success!',
              text: 'Operation Successfully',
              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          } else if (res.result === 0) {
            console.log(res.stat)
            if (res.stat != null) {
              this.$swal({
                title: 'Error!',
                text: `Registration failed, Because ${res.stat}`,
                icon: 'error',
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              })
            }
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
        }).catch(() => {
          this.$swal({
            title: 'Attention!',
            text: 'Please check intenrnet and try again!',
            icon: 'warning',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        })
    },
    Save() {
      this.$refs.useradd.validate().then(success => {
        if (success) {
          this.$store
            .dispatch('useradd/Save_DATA')
            .then(res => {
              if (res.result === 1) {
                this.$swal({
                  title: 'Success!',
                  text: 'Operation Successfully',
                  icon: 'success',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                })
                this.Reset()
              } else if (res.result === 4) {
                this.$swal({
                  title: 'Attention!',
                  text: 'This user is duplicating, please check your username and email',
                  icon: 'warning',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                })
              } else if (res.result === 0) {
                if (res.stat != null) {
                  this.$swal({
                    title: 'Error!',
                    text: `Registration failed, Because ${res.stat}`,
                    icon: 'error',
                    customClass: {
                      confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false,
                  })
                }
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
            .catch(() => {
              this.$swal({
                title: 'Attention!',
                text: 'Please check intenrnet and try again!',
                icon: 'warning',
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
          this.showd = true
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
    cropSuccess(imgDataUrl) {
      this.userLogo = imgDataUrl
    },
    toggleShow() {
      this.show = !this.show
    },
    ResetData(id) {
      this.$store.dispatch('useradd/GET_DATA', id).then(() => {
        this.showTable = true
      })
    },
    de_active(deact) {
      this.$store.dispatch('useradd/DE_ACTIVE', { id: this.$route.params.value.id, deact }).then(res => {
        if (res.result === 1) {
          this.userStatus = deact ? 2 : 3
          this.$swal({
            title: 'Success!',
            text: 'Operation Successfully',
            icon: 'success',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        } else {
          this.$swal({
            title: 'Error!',
            text: 'Operation failed',
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        }
      }).catch(() => {
        this.$swal({
          title: 'Attention!',
          text: 'Please check intenrnet and try again!',
          icon: 'warning',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
      })
    },
  },
}
</script>
