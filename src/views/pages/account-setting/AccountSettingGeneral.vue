<template>
  <b-card>
    <validation-observer
      ref="GenRules"
      tag="form"
    >
      <my-upload
        v-model="showAvatar"
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
      <!-- media -->
      <b-media no-body>
        <b-media-aside>
          <b-link>
            <b-avatar
              ref="previewEl"
              rounded
              :text="ShortName"
              variant="light-primary"
              size="80px"
              :src="Image"
            />
          </b-link>
        <!--/ avatar -->
        </b-media-aside>
        <b-media-body class="mt-75 ml-75">
          <!-- upload button -->
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            size="sm"
            class="mb-75 mr-75"
            @click="toggleShow"
          >
            Upload
          </b-button>
          <b-form-file
            ref="refInputEl"
            v-model="profileFile"
            accept=".jpg, .png,"
            :hidden="true"
            plain
            @change="changePhoto"
          />
          <!--/ upload button -->

          <!-- reset -->
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="outline-secondary"
            size="sm"
            class="mb-75 mr-75"
            @click="resetPhoto"
          >
            Reset
          </b-button>
          <!--/ reset -->
          <b-card-text>Allowed JPG, GIF or PNG. Max size of 1MB</b-card-text>
        </b-media-body>
      </b-media>
      <!--/ media -->

      <!-- form -->
      <b-form class="mt-2">
        <b-row>
          <!-- username -->
          <b-col sm="6">
            <validation-provider
              #default="{ errors }"
              rules="required"
              name="Username"
            >
              <b-form-group
                label="Username"
                label-for="account-username"
              >
                <b-form-input
                  v-model="user_name"
                  placeholder="Username"
                  name="username"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <!-- Org -->
          <b-col sm="6">
            <b-form-group
              label="Organization"
            >
              <b-form-input
                v-model="org"
                name="name"
                disabled
              />
            </b-form-group>
          </b-col>
          <!-- First Name -->
          <b-col sm="6">
            <validation-provider
              #default="{ errors }"
              rules="required"
              name="First Name"
            >
              <b-form-group
                label="First Name"
                label-for="account-name"
              >
                <b-form-input
                  v-model="first_name"
                  name="name"
                  placeholder="Name"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <!-- Last Name -->
          <b-col sm="6">
            <validation-provider
              #default="{ errors }"
              rules="required"
              name="Last Name"
            >
              <b-form-group
                label="Last Name"
                label-for="account-name"
              >
                <b-form-input
                  v-model="last_name"
                  name="name"
                  placeholder="Name"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <!-- First Name ar
          <b-col sm="6">
            <validation-provider
              #default="{ errors }"
              rules="required"
              name="First Name Arabic"
            >
              <b-form-group
                label="First Name Arabic"
                label-for="account-name"
              >
                <b-form-input
                  v-model="first_name_ar"
                  name="name"
                  placeholder="Name"
                />
              </b-form-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-col>-->
          <!-- Last Name ar
          <b-col sm="6">
            <validation-provider
              #default="{ errors }"
              rules="required"
              name="Last Name Arabic"
            >
              <b-form-group
                label="Last Name Arabic"
                label-for="account-name"
              >
                <b-form-input
                  v-model="last_name_ar"
                  name="name"
                  placeholder="Name"
                />
              </b-form-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-col>-->
          <!-- Email -->
          <b-col sm="6">
            <validation-provider
              #default="{ errors }"
              rules="required|email"
              name="Email"
            >
              <b-form-group
                label="E-mail"
                label-for="account-e-mail"
              >
                <b-form-input
                  v-model="email"
                  name="email"
                  placeholder="Email"
                />
                <small class="text-danger">{{ errors[0] }}</small>

              </b-form-group>
            </validation-provider>
          </b-col>
          <!-- gender -->
          <b-col sm="6">
            <validation-provider
              #default="{ errors }"
              rules="required"
              name="Gender"
            >
              <b-form-group
                label="Gender"
                label-for="gender"
              >
                <v-select
                  v-model="gender"
                  placeholder="Select Gender"
                  label="title"
                  :clearable="false"
                  :state="errors.length > 0 ? false : null"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="genderOptions"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col cols="12">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="mt-2 mr-1"
              @click.prevent="SaveForm"
            >
              Save changes
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              variant="outline-secondary"
              type="reset"
              class="mt-2"
              @click.prevent="resetForm"
            >
              Reset
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
  </b-card>
</template>

<script>
import Ripple from 'vue-ripple-directive'
import { takeState } from 'vuex-dot'
import vSelect from 'vue-select'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { mapGetters } from 'vuex'
import * as API from '@/services/API'
import myUpload from 'vue-image-crop-upload/upload-2.vue'

export default {
  components: {
    vSelect,
    myUpload,
    ValidationProvider,
    ValidationObserver,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      showAvatar: false,

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
    ...takeState('profile', 'data')
      .expose([
        'first_name',
        'first_name_ar',
        'last_name',
        'last_name_ar',
        'user_name',
        'gender_id',
        'gender',
        'email',
        'avatar',
        'org',
        'profileFile',
      ])
      .commit('profile/SET_DATA')
      .map(),
    ...mapGetters({
      genderOptions: 'global/gender',
    }),
    show: takeState('profile', 'show').commit('profile/SET_SHOW').map(),
    ShortName() {
      if (this.first_name == null || this.last_name == null) { return 'US' }
      return `${this.first_name.charAt(0)}${this.last_name.charAt(0)}`
    },
    Image() {
      if (this.avatar == null) {
        if (this.gender_id === 2) {
          // eslint-disable-next-line global-require
          return require('@/assets/images/avatars/avatar-man-small.png')
        } if (this.gender_id === 3) {
          // eslint-disable-next-line global-require
          return require('@/assets/images/avatars/avatar-woman-small.png')
        }
        // eslint-disable-next-line global-require
        return null
      }
      return this.avatar
    },
  },
  mounted() {
    this.$store.dispatch('profile/getUserData').catch(() => {
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
    changePhoto(value) {
      const t = value.target.files[0].type
      if (value.target.files[0].size / 1024 / 1024 > 1) {
        this.$swal({
          icon: 'error',
          title: 'Attention!',
          text: 'Maximum image size is 1MB',
          customClass: {
            confirmButton: 'btn btn-success',
          },
        })
        this.$refs.fileinput.reset()
      } else if (t === 'image/jpeg' || t === 'image/png') {
        // eslint-disable-next-line no-unused-vars
        const promise = new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(value.target.files[0])
          reader.onload = () => {
            // eslint-disable-next-line prefer-destructuring
            this.avatar = reader.result
            resolve(reader.result)
          }
          reader.onerror = error => reject(error)
        })
      } else {
        this.$refs.refInputEl.reset()
        this.$swal({
          icon: 'error',
          title: 'Attention!',
          text: 'Please upload an image (Jpg or png)',
          customClass: {
            confirmButton: 'btn btn-success',
          },
        })
      }
    },
    resetPhoto() {
      this.$refs.refInputEl.reset()
      this.avatar = null
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
      this.avatar = imgDataUrl
      this.showAvatar = false
      console.log(`Image: ${imgDataUrl}`)
      console.log(`field: ${field}`)
    },
    toggleShow() {
      this.showAvatar = !this.showAvatar
    },
    resetForm() {
      this.$store.dispatch('profile/ResetGenData').catch(() => {
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
    SaveForm() {
      this.$refs.GenRules.validate().then(success => {
        if (success) {
          this.show = true
          const payload = {
            gen: true,
            user_name: this.user_name,
            first_name: this.first_name,
            first_name_ar: this.first_name_ar,
            last_name: this.last_name,
            last_name_ar: this.last_name_ar,
            avatar: this.avatar,
            email: this.email,
            gender: this.gender.value,
          }
          console.log(payload)
          API.apiClient.put('/user/profile-information', payload).then(res => {
            console.log(res)
            this.$router.go()
            this.show = false
            this.$swal({
              icon: 'success',
              title: 'Success!',
              text: 'Update Profile changed successfully',
              customClass: {
                confirmButton: 'btn btn-success',
              },
            })
          }).catch(error => {
            console.log('ERRRR:: ', error)
            this.show = false
            this.$swal({
              icon: 'error',
              title: 'Attention!',
              text: 'Validation Error',
              customClass: {
                confirmButton: 'btn btn-success',
              },
            })
          })
        }
      })
    },
  },

}
</script>
