<template>
  <!-- Form: Personal Info Form -->
  <b-form
    ref="orgForm"
    name="personal"
    class="mt-1"
  >
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
    <!-- Header: Personal Info -->
    <div class="d-flex">
      <feather-icon
        icon="CropIcon"
        size="19"
      />
      <h4 class="mb-0 ml-50">
        Logo
      </h4>
    </div>
    <br>
    <!-- Media -->
    <b-media class="mb-2">
      <template
        #aside
      >

        <b-avatar
          ref="previewEl"
          :src="orgLogo"
          :text="avatarText(orgName)"
          :variant="`light-${resolveVariant(orgType)}`"
          size="90px"
          class="ml-1"
          rounded
        >
          <template
            v-if="showIcon"
          >
            <feather-icon
              class="d-flex align-items-center"
              icon="GlobeIcon"
              size="42"
            />
          </template>
        </b-avatar>
      </template>
      <validation-provider
        #default="{ errors }"
        name="Logo"
        rules="required"
      >
        <div class="d-flex flex-wrap">
          <b-button
            variant="primary"
            @click="toggleShow"
          >
            <input
              v-model="orgLogo"
              hidden
            >
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
        <small class="text-danger">{{ errors[0] }}</small>
      </validation-provider>
    </b-media>
    <!-- Header: Personal Info -->
    <div class="d-flex">
      <feather-icon
        icon="InfoIcon"
        size="19"
      />
      <h4 class="mb-0 ml-50">
        General Information
      </h4>
    </div>
    <!----- Info ----->
    <b-row>
      <!-- Field: org_name -->
      <b-col
        cols="12"
        md="6"
        lg="4"
      >
        <b-form-group
          label="Organization Name"
          label-for="name"
        >
          <validation-provider
            #default="{ errors }"
            name="Organization Name"
            rules="required"
          >
            <b-form-input
              id="name"
              v-model="orgName"
              :state="errors.length > 0 ? false : null"
              placeholder="Enter organization name"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
      </b-col>
      <!-- Field: Display Name -->
      <b-col
        cols="12"
        md="6"
        lg="4"
      >
        <b-form-group
          label="Organization Display Name"
          label-for="disname"
        >
          <validation-provider
            #default="{ errors }"
            name="Organization Display Name"
            rules="required"
          >
            <b-form-input
              id="disname"
              v-model="orgDisName"
              :state="errors.length > 0 ? false : null"
              placeholder="Enter organization display name"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
      </b-col>
      <!-- Field: Register -->
      <b-col
        cols="12"
        md="6"
        lg="4"
      >
        <b-form-group
          label="Register Number"
          label-for="regNumber"
        >
          <validation-provider
            #default="{ errors }"
            name="Register Number"
            rules="required"
          >
            <b-form-input
              id="regNumber"
              v-model="orgRegNumber"
              :state="errors.length > 0 ? false : null"
              placeholder="Enter Register Number"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
      </b-col>
      <!-- Field: Prefix -->
      <b-col
        cols="12"
        md="6"
        lg="4"
      >
        <b-form-group
          label="Organization Acronym"
          label-for="Prefix"
        >
          <validation-provider
            #default="{ errors }"
            name="Organization Acronym"
            rules="required|max:10|min:2|alpha"
          >
            <b-form-input
              id="Prefix"
              v-model="orgPrefix"
              :state="errors.length > 0 ? false : null"
              placeholder="Enter Organization Acronym (2 up to 10 character)"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
      </b-col>
      <!-- Field: Type
      <b-col
        cols="12"
        md="6"
        lg="4"
      >
        <b-form-group
          label="Type"
          label-for="type"
        >
          <validation-provider
            #default="{ errors }"
            name="Type"
            rules="required"
          >
            <v-select
              id="type"
              v-model="orgType"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :state="errors.length > 0 ? false : null"
              :options="typeOp"
              label="title"
              :clearable="false"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
      </b-col> -->
    </b-row>
    <!---- Header: Contact Info ---->
    <div class="d-flex mt-2">
      <feather-icon
        icon="PhoneCallIcon"
        size="19"
      />
      <h4 class="mb-0 ml-50">
        Contact
      </h4>
    </div>
    <!-- Form: Contact Info Form -->
    <b-row class="mt-1">

      <!-- Field: Contact Name-->
      <b-col
        cols="12"
        md="6"
        lg="3"
      >
        <b-form-group
          label="Contact Name"
          label-for="contact"
        >
          <validation-provider
            #default="{ errors }"
            name="Contact Name"
          >
            <b-form-input
              id="contact"
              v-model="orgContact"
              :state="errors.length > 0 ? false : null"
              placeholder="Enter Contact Name"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
      </b-col>

      <!-- Field: Phone-->
      <b-col
        cols="12"
        md="6"
        lg="3"
      >
        <b-form-group

          label="Phone"

          label-for="phone"
        >
          <validation-provider
            v-slot="{ errors }"
            name="Phone"
            :rules="'required|' +`${orgPhone.id === 1? 'phonelbed': 'min:8|max:11'}`"
            style="display: inline"
          >
            <b-input-group id="phone">
              <template #prepend>
                <b-dropdown
                  :text="orgPhone.text"
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
                v-model.number="orgPhone.number"
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
      <!-- Field: Email-->
      <b-col
        cols="12"
        md="6"
        lg="3"
      >
        <b-form-group
          label="Email"
          label-for="Email"
        >
          <validation-provider
            #default="{ errors }"
            name="Emailorg"
            rules="required|email"
          >
            <b-form-input
              id="Emailorg"
              v-model="orgEmail"
              type="email"
              :state="errors.length > 0 ? false : null"
              placeholder="Enter Organization Email"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
      </b-col>
      <!-- Field: Website-->
      <b-col
        cols="12"
        md="6"
        lg="3"
      >
        <b-form-group
          label="Website"
          label-for="Website"
        >
          <validation-provider
            #default="{ errors }"
            name="Website"
            rules="url|space"
          >
            <b-form-input
              id="Website"
              v-model="orgWebsite"
              :state="errors.length > 0 ? false : null"
              placeholder="Enter Organization Website"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
      </b-col>
    </b-row>
    <!---- Header: Address Info ---->
    <div class="d-flex mt-2">
      <feather-icon
        icon="MapPinIcon"
        size="19"
      />
      <h4 class="mb-0 ml-50">
        Address
      </h4>
    </div>
    <!-- Form: Address Info Form -->
    <b-row class="mt-1">
      <!-- Field: Governorate -->
      <b-col
        cols="4"
      >
        <b-form-group
          label="Governorate"
          label-for="Governorate"
        >
          <validation-provider
            #default="{ errors }"
            name="Governorate"
            rules="required"
          >
            <v-select
              id="Governorate"
              v-model="orgGov"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :clearable="false"
              :options="govOp"
              label="title"
              :state="errors.length > 0 ? false : null"
              placeholder="Enter your Organization Governorate"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
      </b-col>
      <!-- Field: District -->
      <b-col
        cols="4"
      >
        <b-form-group
          label="District"
          label-for="District"
        >
          <validation-provider
            #default="{ errors }"
            name="District"
            rules="required"
          >
            <v-select
              id="District"
              v-model="orgDis"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :clearable="false"
              :options="districtSelect"
              label="title"
              :state="errors.length > 0 ? false : null"
              placeholder="Enter your Organization District"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
      </b-col>
      <!-- Field: Cadaster -->
      <b-col
        cols="4"
      >
        <b-form-group
          label="Cadaster"
          label-for="Cadaster"
        >
          <validation-provider
            #default="{ errors }"
            name="Cadaster"
            rules="required"
          >
            <v-select
              id="Cadaster"
              v-model="orgCad"
              label="title"
              :options="municipalitySelect"
              :state="errors.length > 0 ? false : null"
              placeholder="Select Organization Cadaster"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :clearable="false"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
      </b-col>
      <!-- Field: Address -->
      <b-col
        cols="12"
      >
        <b-form-group
          label="Address"
          label-for="Address"
        >
          <validation-provider
            #default="{ errors }"
            name="Address"
            rules="required"
          >
            <b-form-input
              id="Address"
              v-model="orgAddress"
              :state="errors.length > 0 ? false : null"
              placeholder="Enter Organization Address"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
      </b-col>
    </b-row>

    <!---- Header: Other Info ---->
    <!--<div class="d-flex mt-2">
      <feather-icon
        icon="InfoIcon"
        size="19"
      />
      <h4 class="mb-0 ml-50">
        Other
      </h4>
    </div>
    Form: Other Info Form
    <b-row class="mt-1">
       Field: Description
      <b-col
        cols="12"
      >
        <b-form-group
          label="Description"
          label-for="Description"
        >

          <b-form-textarea
            id="Description"
            v-model="orgDescription"
            placeholder="Description"
            rows="4"
          />
        </b-form-group>
      </b-col>

    </b-row>-->
    <!-- Actions-->
    <b-row class="mt-2">
      <b-col>
        <b-button
          variant="primary"
          class="mb-1 mb-sm-0 mr-0 mr-sm-1"
          :block="$store.getters['app/currentBreakPoint'] === 'xs'"
          @click="$emit('next')"
        >
          Next
        </b-button>
        <b-button
          variant="outline-secondary"
          :block="$store.getters['app/currentBreakPoint'] === 'xs'"
          @click="Reset"
        >
          Reset
        </b-button>
      </b-col>
    </b-row>
  </b-form>
</template>
<script>
import vSelect from 'vue-select'
import { takeState } from 'vuex-dot'
import { ValidationProvider } from 'vee-validate'
import myUpload from 'vue-image-crop-upload/upload-2.vue'

export default {
  components: {
    vSelect,
    ValidationProvider,
    myUpload,
  },
  data() {
    return {
      showIcon: true,
      show: false,

      file: null,
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
    disabled: takeState('linkOrg', 'disabled').commit('linkOrg/SET_DISB').map(),
    tabIndex: takeState('linkOrg', 'tabIndex').commit('linkOrg/SET_TAB_INDEX').map(),
    // SElect Data
    disOp: takeState('linkOrg', 'disOp').commit('linkOrg/SET_DIS_OP').map(),
    cadOp: takeState('linkOrg', 'cadOp').commit('linkOrg/SET_CAD_OP').map(),
    govOp: takeState('linkOrg', 'orgOp').map(),

    typeOp: takeState('linkOrg', 'typeOp').commit('linkOrg/SET_TYPE_OP').map(),
    phoneOp: takeState('linkOrg', 'phoneOp').map(),
    phoneProps: takeState('linkOrg', 'phoneProps').map(),
    // Custom Data
    orgLogo: takeState('linkOrg', 'orgLogo').commit('linkOrg/SET_ORG_LOGO').map(),
    orgName: takeState('linkOrg', 'orgName').commit('linkOrg/SET_ORG_NAME').map(),
    orgDisName: takeState('linkOrg', 'orgDisName').commit('linkOrg/SET_ORG_DIS').map(),
    orgRegNumber: takeState('linkOrg', 'orgRegNumber').commit('linkOrg/SET_ORG_REG').map(),
    orgPrefix: takeState('linkOrg', 'orgPrefix').commit('linkOrg/SET_ORG_PREF').map(),
    orgType: takeState('linkOrg', 'orgType').commit('linkOrg/SET_ORG_TYPE').map(),
    // contact
    orgContact: takeState('linkOrg', 'orgContact').commit('linkOrg/SET_ORG_CONT').map(),
    orgPhone: takeState('linkOrg', 'orgPhone').commit('linkOrg/SET_ORG_PHO').map(),
    orgEmail: takeState('linkOrg', 'orgEmail').commit('linkOrg/SET_ORG_MAIL').map(),
    orgWebsite: takeState('linkOrg', 'orgWebsite').commit('linkOrg/SET_ORG_WEB').map(),
    // location
    orgGov: takeState('linkOrg', 'orgGov').commit('linkOrg/SET_GOV').map(),
    orgDis: takeState('linkOrg', 'orgDis').commit('linkOrg/SET_ORG_DIST').map(),
    orgCad: takeState('linkOrg', 'orgCad').commit('linkOrg/SET_ORG_CAD').map(),
    orgAddress: takeState('linkOrg', 'orgAddress').commit('linkOrg/SET_ORG_ADD').map(),
    // other:
    orgDescription: takeState('linkOrg', 'orgDescription').commit('linkOrg/SET_ORG_DESC').map(),
    districtSelect() {
      return this.disOp.filter(item => item.params
      === (this.orgGov != null ? this.orgGov.value : null))
    },
    municipalitySelect() {
      return this.cadOp.filter(
        item => item.params === (this.orgDis != null ? this.orgDis.value : null),
      )
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
    dropSelect(value) {
      // eslint-disable-next-line prefer-destructuring
      this.orgPhone.id = this.phoneOp.filter(
        ct => ct.value === value,
      )[0].value
      this.orgPhone.text = this.phoneOp.filter(
        ct => ct.value === value,
      )[0].text
    },
    Update(value) {
      console.log(value)
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
            this.orgLogo = reader.result
            console.log(this.orgLogo)
            this.showIcon = false
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
      this.orgLogo = null
      this.showIcon = true
      this.file = null
      console.log(this.showIcon)
    },
    Reset() {
      this.Remove()
      this.$refs.orgForm.reset()
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
    cropSuccess(imgDataUrl, field) {
      console.log('-------- crop success --------')
      this.orgLogo = imgDataUrl
      this.showIcon = false
      console.log(`Image: ${imgDataUrl}`)
      console.log(`field: ${field}`)
    },
    toggleShow() {
      this.show = !this.show
    },
  },
}
</script>
