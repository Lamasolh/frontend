<template>
  <!-- User Info: Input Fields -->
  <b-form ref="userForm">
    <!-- Media -->
    <b-media class="mb-2">
      <template #aside>
        <b-avatar
          ref="previewEl"
          :src="userLogo"
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
            #default="{ errors }"
            name="Username"
            rules="required|alpha_dash|min:4"
          >
            <b-form-input
              id="Username"
              v-model="userName"
              :state="errors.length > 0 ? false : null"
              placeholder="Enter Username"
            />
            <small class="text-danger">{{ errors[0] }}</small>
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
            #default="{ errors }"
            name="Gender"
            rules="required"
          >
            <v-select
              id="Gender"
              v-model="userGender"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :state="errors.length > 0 ? false : null"
              :options="genderOp"
              :clearable="false"
              label="title"
            />
            <small class="text-danger">{{ errors[0] }}</small>
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
            #default="{ errors }"
            name="First Name"
            rules="required"
          >
            <b-form-input
              id="First Name"
              v-model="userFN"
              :state="errors.length > 0 ? false : null"
              placeholder="Enter First Name"
            />
            <small class="text-danger">{{ errors[0] }}</small>
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
            #default="{ errors }"
            name="Last Name"
            rules="required"
          >
            <b-form-input
              id="Last Name"
              v-model="userLN"
              :state="errors.length > 0 ? false : null"
              placeholder="Enter Last Name"
            />
            <small class="text-danger">{{ errors[0] }}</small>
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
              dir="rtl"
              :state="errors.length > 0 ? false : null"
              placeholder="ادخل الاسم "
            />
            <small class="text-danger">{{ errors[0] }}</small>
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
              dir="rtl"
              :state="errors.length > 0 ? false : null"
              placeholder="ادخل الشهرة"
            />
            <small class="text-danger">{{ errors[0] }}</small>
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
            #default="{ errors }"
            name="Nationality"
            rules="required"
          >
            <v-select
              id="Nationality"
              v-model="userNat"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="nationalityOp"
              :state="errors.length > 0 ? false : null"
              placeholder="Enter Nationality"
              :clearable="false"
              label="title"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
      </b-col>
      <!-- Field: Job
      <b-col
        cols="12"
        md="6"
      >
        <b-form-group
          label="Job"
          label-for="Job"
        >
          <validation-provider
            #default="{ errors }"
            name="Job"
            rules="required"
          >
            <v-select
              id="Job"
              v-model="userJob"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="jobOp"
              :state="errors.length > 0 ? false : null"
              placeholder="Enter Job"
              :clearable="false"
              label="title"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
      </b-col>-->
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
            #default="{ errors }"
            name="Email"
            rules="required|email"
          >
            <b-form-input
              id="UserEmail"
              v-model="userEmail"
              type="email"
              :state="errors.length > 0 ? false : null"
              placeholder="Enter Email"
            />
            <small class="text-danger">{{ errors[0] }}</small>
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
            :rules="`${userPhone.id === 1? 'phonelbed': 'min:8|max:11'}`"
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
                    :value="ct.value"
                    @click="dropSelect(ct.value)"
                  >
                    {{ ct.title }}
                  </b-dropdown-item>
                </b-dropdown>
              </template>
              <b-form-input
                v-model.number="userPhone.number"
                type="tel"
                class="form-control"
                :state="errors.length > 0? false: null"
                :placeholder="phoneProps.placeholder"
                :formatter="formatter"
              />
            </b-input-group>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
      </b-col>

      <!-- Field: Bio -->
      <b-col
        cols="12"
      >
        <b-form-group
          label="Bio"
        >
          <b-form-textarea
            id="textarea-default"
            v-model="userBio"
            placeholder="Bio"
            rows="3"
          />
        </b-form-group>
      </b-col>

      <!-- Field: Address -->
      <b-col
        cols="12"
      >
        <b-form-group
          label="Address"
        >
          <b-form-input
            v-model="userAddress"
          />
        </b-form-group>
      </b-col>
    </b-row>
    <!-- Action Buttons -->
    <b-button
      variant="primary"
      class="mb-1 mb-sm-0 mr-0 mr-sm-1"
      :block="$store.getters['app/currentBreakPoint'] === 'xs'"
      @click="$emit('send')"
    >
      Save Changes
    </b-button>
    <b-button
      variant="outline-secondary"
      type="reset"
      :block="$store.getters['app/currentBreakPoint'] === 'xs'"
    >
      Reset
    </b-button>
    <my-upload
      v-model="show"
      field="img"
      :width="200"
      :height="200"
      :params="params"
      lang-type="en"
      :src-file-set="srcFileSet"
      :headers="headers"
      img-format="png"
      :no-rotate="false"
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail"
    />
  </b-form>
</template>
<script>
import vSelect from 'vue-select'
import { takeState } from 'vuex-dot'
import { ValidationProvider } from 'vee-validate'
import Ripple from 'vue-ripple-directive'
import flatPickr from 'vue-flatpickr-component'
import moment from 'moment'
import myUpload from 'vue-image-crop-upload/upload-2.vue'

export default {
  components: {
    vSelect,
    ValidationProvider,
    flatPickr,
    myUpload,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
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
    genderOp: takeState('linkOrg', 'genderOp').commit('linkOrg/SET_JOB_OP').map(),
    nationalityOp: takeState('linkOrg', 'nationalityOp').commit('linkOrg/SET_GEN_OP').map(),
    jobOp: takeState('linkOrg', 'jobOp').commit('linkOrg/SET_NAT_OP').map(),
    phoneOp: takeState('linkOrg', 'phoneOp').map(),
    phoneProps: takeState('linkOrg', 'phoneProps').map(),
    // Custom Data
    userLogo: takeState('linkOrg', 'userLogo').commit('linkOrg/SET_USER_LOGO').map(),
    userName: takeState('linkOrg', 'userName').commit('linkOrg/SET_USER_NAME').map(),
    userFN: takeState('linkOrg', 'userFN').commit('linkOrg/SET_USER_FN').map(),
    userLN: takeState('linkOrg', 'userLN').commit('linkOrg/SET_USER_LN').map(),
    userFNAR: takeState('linkOrg', 'userFNAR').commit('linkOrg/SET_USER_FNAR').map(),
    userLNAR: takeState('linkOrg', 'userLNAR').commit('linkOrg/SET_USER_LNAR').map(),
    userGender: takeState('linkOrg', 'userGender').commit('linkOrg/SET_USER_GEN').map(),
    userNat: takeState('linkOrg', 'userNat').commit('linkOrg/SET_USER_NAT').map(),
    userDOB: takeState('linkOrg', 'userDOB').commit('linkOrg/SET_USER_DOB').map(),
    userEmail: takeState('linkOrg', 'userEmail').commit('linkOrg/SET_USER_MAIL').map(),
    userPhone: takeState('linkOrg', 'userPhone').commit('linkOrg/SET_USER_PHO').map(),
    userJob: takeState('linkOrg', 'userJob').commit('linkOrg/SET_USER_JOB').map(),
    userBio: takeState('linkOrg', 'userBio').commit('linkOrg/SET_USER_BIO').map(),
    userAddress: takeState('linkOrg', 'userAddress').commit('linkOrg/SET_USER_ADD').map(),
    maxDate() {
      return moment().subtract(18, 'year').valueOf()
    },
    fullName() {
      return `${this.userFN == null ? ' ' : this.userFN} ${this.userLN == null ? ' ' : this.userLN}`
    },
    check() {
      return this.orgLogo != null
    },
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
    dropSelect(index, value) {
      console.log(index, value)
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
      this.$refs.userForm.reset()
      this.Remove()
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
      this.$emit('res')
    },
    srcFileSet(fileName, fileType, fileSize) {
      console.log('-------- upload fail --------')
      console.log(`fileName: ${fileName}`)
      console.log(`fileType: ${fileType}`)
      console.log(`fileSize: ${fileSize}`)
    },
    cropUploadFail(status, field) {
      console.log('-------- upload fail --------')
      console.log(status)
      console.log(`field: ${field}`)
    },
    cropUploadSuccess(jsonData, field) {
      console.log('-------- upload success --------')
      console.log(jsonData)
      console.log(`field: ${field}`)
    },
    cropSuccess(imgDataUrl) {
      console.log('-------- crop success --------')
      this.userLogo = imgDataUrl
      console.log(`Image: ${imgDataUrl}`)
    },
    toggleShow() {
      this.show = !this.show
    },
  },
}
</script>
