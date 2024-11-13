<template>
  <div>
    <!-- Case Basic Information -->
    <b-row>
      <b-col>
        <h5 class="mb-0">
          Case Basic Information
        </h5>
        <small class="text-muted">
          Enter or Edit The Case Basic Information
        </small>
      </b-col>
    </b-row>
    <!-- Full Name / Phone -->
    <b-row>
      <!-- Full Name -->
      <b-col>
        <b-form-group
          label="Full Name"
          label-for="name"
          disabled
        >
          <b-form-input
            id="name"
            v-model="full_name"
            disabled
            placeholder="Enter a full name"
          />
        </b-form-group>
      </b-col>
      <!-- Phone -->
      <b-col>
        <b-form-group
          label="Phone"
          label-for="Phone"
          disabled
        >
          <b-input-group :prepend="phone.text">
            <cleave
              v-model="phone.number"
              class="form-control"
            />
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <!-- Gender / Nationality / Referral -->
    <b-row>
      <!-- Gender -->
      <b-col>
        <b-form-group label="Gender">
          <v-select
            v-model="gender"
            placeholder="Select Gender"
            label="title"
            :clearable="false"
            disabled
            read-only
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          />
        </b-form-group>
      </b-col>
      <!-- Nationality -->
      <b-col>
        <b-form-group label="Nationality">
          <v-select
            v-model="nationality"
            placeholder="Select Nationality"
            label="title"
            :clearable="false"
            disabled
            read-only
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          />
        </b-form-group>
      </b-col>
      <!-- Referral -->
      <b-col>
        <b-form-group label="Referred By">
          <v-select
            v-model="referral"
            placeholder="Select Referral"
            label="title"
            :clearable="false"
            disabled
            read-only
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          />
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <!-- Gov -->
      <b-col cols="4">
        <b-form-group label="Governorate">
          <v-select
            v-model="governorate"
            label="title"
            placeholder="ALL"
            :clearable="false"
            disabled
            read-only
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          />
        </b-form-group>
      </b-col>
      <!-- District -->
      <b-col cols="4">
        <b-form-group label="District">
          <v-select
            v-model="district"
            placeholder="ALL"
            label="title"
            :clearable="false"
            disabled
            read-only
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          />
        </b-form-group>
      </b-col>
      <!-- Type -->
      <b-col cols="4">
        <b-form-group label="Type">
          <v-select
            v-model="type"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="title"
            placeholder="ALL"
            disabled
            read-only
            :clearable="false"
          />
        </b-form-group>
      </b-col>
      <!-- Cadaster -->
      <b-col cols="4">
        <b-form-group label="Cadaster">
          <v-select
            v-model="cadaster"
            placeholder="ALL"
            label="title"
            :clearable="false"
            disabled
            read-only
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          />
        </b-form-group>
      </b-col>
      <!-- Settlement -->
      <b-col
        v-if="type ==null ? false : type.value !==1"
        cols="4"
      >
        <b-form-group label="Settlement">
          <v-select
            v-if="type ==null ? false : type.value !==1"
            v-model="iss"
            placeholder="ALL"
            label="title"
            disabled
            read-only
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          />
        </b-form-group>
      </b-col>
    </b-row>
    <!--  Latitude / Longitude -->
    <b-row>
      <!-- Latitude location -->
      <b-col>
        <b-form-group
          label="Latitude"
          label-for="latitude"
        >
          <b-form-input
            id="latitude"
            v-model="address_latitude"
            type="number"
            placeholder="0.0"
            readonly
            disabled
          />
        </b-form-group>
      </b-col>
      <!-- Longitude location -->
      <b-col>
        <b-form-group
          label="Longitude"
          label-for="longitude"
        >
          <b-form-input
            id="longitude"
            v-model="address_longitude"
            type="number"
            placeholder="0.0"
            readonly
            disabled
          />
        </b-form-group>
      </b-col>
    </b-row>
    <!-- Address -->
    <b-row>
      <!-- Address -->
      <b-col>
        <b-form-group
          label="Text Address"
          label-for="Address"
          disabled
          read-only
        >
          <b-form-input
            id="Address"
            v-model="adresstext"
            placeholder="Address"
            dir="rtl"
            disabled
            read-only
          />
        </b-form-group>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import Ripple from 'vue-ripple-directive'
import Cleave from 'vue-cleave-component'
// eslint-disable-next-line import/no-unresolved
import 'cleave.js/dist/addons/cleave-phone.us'
import vSelect from 'vue-select'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    Cleave,
    vSelect,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      full_name: null,
      phone: {
        text: null,
        number: null,
      },
      gender: null,
      referral: null,
      nationality: null,
      governorate: null,
      district: null,
      type: null,
      cadaster: null,
      iss: null,
      address_latitude: null,
      address_longitude: null,
      adresstext: null,
    }
  },
  mounted() {
    const it = this.$route.params.value
    this.full_name = it.full_name
    this.gender = it.gender_name
    this.referral = it.referral_name
    this.nationality = it.full_name
    this.governorate = it.full_name
    this.nationality = it.nationality_name
    this.district = it.full_name
    this.type = it.full_name
    this.cadaster = it.cadastre_name
    this.iss = it.full_name
    this.address_latitude = it.address_latitude
    this.address_longitude = it.address_longitude
    this.adresstext = it.adresstext
  },
  methods: {

  },

}
</script>
