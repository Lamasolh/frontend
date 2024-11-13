<template>
  <div>
    <b-card-body>
      <b-row>
        <!-- PCR Info -->
        <b-col
          cols="12"
          class="mb-2"
        >
          <h5 class="mb-0">
            Family Information
          </h5>
          <small class="text-muted">Enter the family Info</small>
        </b-col>
      </b-row>
      <!-- PCR Date -->
      <b-form-group
        label="PCR Date"
        label-for="name"
      >
        <validation-provider
          #default="{ errors }"
          name="PCR Date"
          :rules="`required|minDate:${priority_period}`"
        >
          <flat-pickr
            v-model="pcr_date"
            class="form-control"
            placeholder="Enter PCR Date"
            :state="errors.length > 0 ? false : null"
          />
          <small class="text-danger">{{ errors[0] !=null?`The date must be between today and ${priority_period} days before`:'' }}</small>
        </validation-provider>
      </b-form-group>
      <b-form-group
        label="PCR Test"
        label-for="name"
      >
        <b-form-file
          ref="file_input"
          accept=".jpg, .png, .pdf"
          @change="dooo"
        />
      </b-form-group>
      <b-row>
        <fullscreen :fullscreen.sync="fullscreen">
          <b-col class="center">
            <b-button
              v-show="fullscreen"
              variant="info"
              class="r-3 text-center"
              @click="toggle"
            >
              Back
            </b-button>
            <br>
            <div :style="fullscreen? 'overflow:scroll; height:100vh;':''">
              <b-img-lazy
                :src="pcr"
                class="w-50"
                :center="true"
              />
            </div>

          </b-col>
        </fullscreen>
      </b-row>
      <b-row>
        <b-button
          variant="info"
          class="mr-3"
          @click="toggle"
        >
          Full Screen
        </b-button>
        <div />
        <b-button
          v-show="pcr !=='/images/_/_/_/_/SPA RDMS/frontend/src/assets/images/resources/empty.jpg'"
          variant="success"
          class="r-3"
          @click="approve"
        >
          Approve
        </b-button>
        <!-- <b-button
                variant="primary"
                @click="refreshImage"
              >
                Refresh
              </b-button>-->
      </b-row>
    </b-card-body>
  </div>

</template>
<script>
import { takeState } from 'vuex-dot'
// import { mapGetters } from 'vuex'
// import vSelect from 'vue-select'
import { ValidationProvider } from 'vee-validate'
import flatPickr from 'vue-flatpickr-component'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import moment from 'moment'

export default {
  components: {
    ValidationProvider,
    flatPickr,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,

  },
  data() {
    return {
      pc: null,
      pc2: null,
      fullscreen: false,
      isFirst: false,
      // ruleDate: 'required',
    }
  },
  computed: {
    ...takeState('followUpWiz', 'itemsrec')
      .expose([
        'pcr_date',
        'pcr_photo',
        'pcr_photo_aprv',
      ])
      .commit('followUpWiz/SET_ITEM_REC')
      .map(),
    priority_period: takeState('followUpWiz', 'priority_period').map(),

    itemsrec: takeState('followUpWiz', 'itemsrec').commit('followUpWiz/SET_ITEM_REC').map(),

    pcr() {
      if (this.pc != null) {
        return this.pc
      }
      // eslint-disable-next-line global-require
      // eslint-disable-next-line global-require
      return require('@/assets/images/resources/empty.jpg')
    },
    maxDate() {
      return moment()
    },
    minDate() {
      return moment().subtract(7, 'days').format('DD-MM-YYYY')
    },
  },
  watch: {
    pcr_photo() {
      console.log('watch pcr_photo', this.itemsrec.pcr_photo)
      console.log('watch pc', this.pc)
      if (this.itemsrec.pcr_photo != null) {
        this.pc = `data:image/png;base64, ${this.itemsrec.pcr_photo}`
      }
    },
  },
  mounted() {
    this.pc = null
    this.pc2 = null
    this.fullscreen = false
    this.isFirst = false
    if (this.itemsrec.pcr_photo != null) {
      this.pc = `data:image/png;base64, ${this.itemsrec.pcr_photo}`
    }
    this.isFirst = false
  },
  methods: {
    /* ChangeDate() {
      console.log('Changed')
      console.log('first', this.isFirst)
      if (this.isFirst === true) {
        console.log('change rule')
        this.$nextTick(() => {
          this.ruleDate = `required|minDate:${this.priority_period}`
        })
        this.$forceUpdate()
      } else {
        this.isFirst = true
      }
    }, */
    toggle() {
      this.fullscreen = !this.fullscreen
    },
    approve() {
      if (this.pc != null) {
        // eslint-disable-next-line prefer-destructuring
        this.pcr_photo = this.pc.split(',')[1]
        this.pcr_photo_aprv = 1
      } else {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'PCR Test',
            text: 'Please upload PCR Test',
            icon: 'AlertCircleIcon',
            variant: 'warning',
          },
        })
      }
    },
    refreshImage() {
      console.log('refresh')
      this.pc = null
      this.pc2 = null
      this.$store.dispatch('followUpWiz/REFRESH_IMAGE')
    },
    dooo(value) {
      this.pcr_photo = null
      this.pcr_photo_aprv = null
      this.pc = null
      if (value.target.files[0].size / 1024 / 1024 > 2) {
        this.$refs.file_input.reset()
        // this.$refs.refInputEl.reset()
        this.$swal({
          icon: 'error',
          title: 'Attention!',
          text: 'Maximum image size is 2MB',
          customClass: {
            confirmButton: 'btn btn-success',
          },
        })
        return null
      }
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(value.target.files[0])
        reader.onload = () => {
          this.pc = reader.result
          resolve(reader.result)
        }
        reader.onerror = error => reject(error)
      })
    },
  },

}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
