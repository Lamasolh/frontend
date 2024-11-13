<template>
  <div>
    <!-- Case Basic Information -->
    <b-row>
      <b-col>
        <h4 class="mb-1 text-primary">
          Case Basic Information
        </h4>
      </b-col>
    </b-row>
    <!-- Full Name / Phone -->
    <b-row>
      <!-- Referral -->
      <b-col>
        <p><b class="text-primary">Referral:</b> {{ referral }}</p>
        <p><b class="text-primary">Referral Date:</b> {{ referral_date }}</p>
      </b-col>
      <!-- Full Name -->
      <b-col>
        <p><b class="text-primary">Full Name:</b> {{ fullname }}</p>
      </b-col>
      <!-- Phone -->
      <b-col>
        <p><b class="text-primary">Phone:</b> {{ phone }}</p>
      </b-col>
      <!-- Gender -->
      <b-col>
        <p><b class="text-primary">Gender:</b> {{ gender }}</p>
      </b-col>
      <!-- Nationality -->
      <b-col>
        <p><b class="text-primary">Nationality:</b> {{ nationality }}</p>
      </b-col>

    </b-row>
    <b-row>
      <b-col cols="8">
        <h3
          :class="info_status== null ? ' ':info_status == true? 'text-success' : 'text-danger' "
        >
          {{ info_status== null ? ' ':info_status == true? 'Verified' : 'Not Verified' }}
        </h3>
      </b-col>
    </b-row>
    <hr>
    <!-- Family Information -->
    <b-row>
      <b-col>
        <h4 class="mb-1 text-primary">
          Family Information
        </h4>
      </b-col>
    </b-row>
    <!-- Info-->
    <b-row>
      <!-- Male Count -->
      <b-col>
        <p><b class="text-primary">Male Count:</b> {{ male_count }}</p>
      </b-col>
      <!-- Female Count -->
      <b-col>
        <p><b class="text-primary">Female Count:</b> {{ female_count }}</p>
      </b-col>
      <!-- Family Member -->
      <b-col>
        <p><b class="text-primary">Family Member:</b> {{ family_count }}</p>
      </b-col>
      <!-- Baby -->
      <b-col>
        <p><b class="text-primary">Number of members between 0 and 5 years old:</b> {{ baby_count }}</p>
      </b-col>
      <!-- Children -->
      <b-col>
        <p><b class="text-primary">Number of members between 6 and 11 years old:</b> {{ children_count }}</p>
      </b-col>

    </b-row>
    <br>
    <!-- Count-->
    <b-row>
      <!-- Young -->
      <b-col>
        <p><b class="text-primary">Number of members between 12 and 17 years old:</b> {{ young_count }}</p>
      </b-col>
      <!-- Teaneager -->
      <b-col>
        <p><b class="text-primary">Number of members between 18 and 25 years old:</b> {{ tenager_count }}</p>
      </b-col>
      <!-- Adult -->
      <b-col>
        <p><b class="text-primary">Number of members between 26 and 64 years old:</b> {{ adult_count }}</p>
      </b-col>
      <!-- Eldrly -->
      <b-col>
        <p><b class="text-primary">Number of members above 65:</b> {{ eldrly_count }}</p>
      </b-col>
      <!-- household -->
      <b-col>
        <p><b class="text-primary">HouseHold:</b> {{ is_household }}</p>
      </b-col>
    </b-row>
    <br>
    <b-row>
      <!-- Pregnant -->
      <b-col>
        <p><b class="text-primary">Pregnant:</b> {{ is_pregnant }}</p>
      </b-col>
    </b-row>
    <br>
    <!-- Approved-->
    <b-row>
      <b-col cols="8">
        <h3
          :class="family_status == null ? '' :family_status == true? 'text-success' : 'text-danger' "
        >
          {{ family_status== null ? '' :family_status == true? 'Verified' : 'Not Verified' }}
        </h3>
      </b-col>
    </b-row>
    <br>
    <hr>
    <b-row>
      <b-col cols="3">
        <h4 class="mb-1 text-primary">
          PCR Photo/Date
        </h4>
        <vue-images
          v-show="pcr_photo !=null "
          :imgs="images"
          :modalclose="modalclose"
          :keyinput="keyinput"
          :mousescroll="mousescroll"
          :showclosebutton="showclosebutton"
          :showcaption="showcaption"
          :imagecountseparator="imagecountseparator"
          :showimagecount="showimagecount"
          :showthumbnails="showthumbnails"
          :deletebtn="deletebtn"
        />
        <!-- PCR Date -->
        <p><b class="text-primary">PCR Date:</b> {{ pcr_date }}</p>
        <!-- Approved-->
        <h3
          :class="pcr_photo_status == null ?' ':pcr_photo_status == true? 'text-success' : 'text-danger' "
        >
          {{ pcr_photo_status == null ?' ':pcr_photo_status == true? 'PCR Photo Verified ' : 'PCR Photo Not Verified' }}
        </h3>
        <h3
          :class="pcr_date_status== null ? ' ' :pcr_date_status == true? 'text-success' : 'text-danger' "
        >
          {{ pcr_date_status== null ? ' ' : pcr_date_status== true? 'PCR Date Verified' : 'PCR Date Not Verified' }}
        </h3>
      </b-col>
      <b-col
        cols="6"
      >
        <!-- Accodomation/Socio Information -->
        <h4 class="mb-1 text-primary">
          Accommodation / Socioeconomic Information
        </h4>

        <b-row>
          <!-- isolation_room -->
          <b-col>
            <p><b class="text-primary"> {{ is_isolated === 1?'Is isolated':'Is not isolated' }} </b></p>
            <p><b class="text-primary">Care giver:</b> {{ care_giver }}</p>
          </b-col>
          <!-- isolation_room -->
          <b-col>
            <p><b class="text-primary">Employment Type:</b> {{ employment }}</p>
            <p><b class="text-primary">Is there any payment due!?:</b> {{ is_paymentdue }}</p>
          </b-col>
        </b-row>
        <!-- Approved-->
        <b-row>
          <b-col cols="6">
            <h3
              :class="socio_status== null ? ' ' : socio_status== true? 'text-success' : 'text-danger' "
            >
              {{ socio_status== null ? ' ' : socio_status== true? 'Verified' : 'Not Verified' }}
            </h3>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <hr>
    <b-row>
      <b-col
        cols="6"
      >
        <h4 class="mb-1 text-primary">
          Indicators
        </h4>
        <div v-if="JSON.parse(this.$route.params.value.extra_fields).length>0">
          <p
            v-for="item in JSON.parse(this.$route.params.value.extra_fields) "
            v-show="item.value !=null"
            :key="item.id"
          >
            {{ item.name }}: {{ item.type === 4 ?(item.value ==null?'':JSON.parse(item.value).title ):item.value }}
          </p>
        </div>
        <p v-else>
          Nothing
        </p>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import Ripple from 'vue-ripple-directive'
// eslint-disable-next-line import/no-unresolved
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { takeState } from 'vuex-dot'
import vueImages from 'vue-images'

export default {
  components: {
    vueImages,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      modalclose: false,
      keyinput: false,
      mousescroll: false,
      showclosebutton: true,
      showcaption: true,
      imagecountseparator: 'of',
      showimagecount: false,
      showthumbnails: false,
      deletebtn: 'x',
      // images: [],
    }
  },
  computed: {
    ///
    case_status: takeState('monitoringView', 'case_status').map(),
    case_info: takeState('monitoringView', 'case_info').map(),
    created_date: takeState('monitoringView', 'created_date').map(),
    progress_date: takeState('monitoringView', 'progress_date').map(),
    awareness: takeState('monitoringView', 'awareness').map(),
    feedback: takeState('monitoringView', 'feedback').map(),
    monitored: takeState('monitoringView', 'monitored').map(),
    monitoring: takeState('monitoringView', 'monitoring').map(),
    case_full_info: takeState('monitoringView', 'case_full_info').map(),
    info_status: takeState('monitoringView', 'info_status').map(),
    images() {
      return [{
        id: 1,
        imageUrl: `data:image/png;base64, ${this.pcr_photo}`,
        caption: `${this.fullname}: ${this.pcr_date}`,
      }]
    },

    //
    case_code: takeState('monitoringView', 'case_code').map(),
    fullname: takeState('monitoringView', 'fullname').map(),
    phone: takeState('monitoringView', 'phone').map(),
    referral: takeState('monitoringView', 'referral').map(),
    referral_date: takeState('monitoringView', 'referral_date').map(),
    nationality: takeState('monitoringView', 'nationality').map(),

    gender: takeState('monitoringView', 'gender').map(),

    /// Family
    male_count: takeState('monitoringView', 'male_count').map(),
    female_count: takeState('monitoringView', 'female_count').map(),
    family_count: takeState('monitoringView', 'family_count').map(),
    baby_count: takeState('monitoringView', 'baby_count').map(),
    children_count: takeState('monitoringView', 'children_count').map(),
    young_count: takeState('monitoringView', 'young_count').map(),
    tenager_count: takeState('monitoringView', 'tenager_count').map(),
    adult_count: takeState('monitoringView', 'adult_count').map(),
    eldrly_count: takeState('monitoringView', 'eldrly_count').map(),

    is_household: takeState('monitoringView', 'is_household').map(),
    is_pregnant: takeState('monitoringView', 'is_pregnant').map(),
    family_status: takeState('monitoringView', 'family_status').map(),

    // Criteria
    priority: takeState('monitoringView', 'priority').map(),
    pcr_date: takeState('monitoringView', 'pcr_date').map(),
    pcr_date_status: takeState('monitoringView', 'pcr_date_status').map(),
    pcr_photo_status: takeState('monitoringView', 'pcr_photo_status').map(),
    pcr_photo: takeState('monitoringView', 'pcr_photo').map(),
    criteria_status: takeState('monitoringView', 'criteria_status').map(),

    // Socioeconomic
    is_paymentdue: takeState('monitoringView', 'is_paymentdue').map(),
    is_isolated: takeState('monitoringView', 'is_isolated').map(),
    employment: takeState('monitoringView', 'employment').map(),
    care_giver: takeState('monitoringView', 'care_giver').map(),
    socio_status: takeState('monitoringView', 'socio_status').map(),

    // Other Info

    reason_comment: takeState('monitoringView', 'reason_comment').map(),
    followup_comment: takeState('monitoringView', 'followup_comment').map(),
    delivery_comment: takeState('monitoringView', 'delivery_comment').map(),

    comunication: takeState('monitoringView', 'comunication').map(),
    comunication_org: takeState('monitoringView', 'comunication_org').map(),

    other_status: takeState('monitoringView', 'other_status').map(),

  },

}
</script>
<style scoped>
.vl {
  border-left: 6px solid black;
  height: 500px;
  position: absolute;
  left: 50%;
  margin-left: -3px;
  top: 0;
}
</style>
