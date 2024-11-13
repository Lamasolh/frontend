<template>
  <div>
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
    <!-- Form: Personal Info Form -->
    <b-form class="mt-1">
      <!--- Info -->
      <b-row>
        <b-col cols="2">
          <b-avatar
            ref="previewEl"
            :src="orgLogo"
            :text="avatarText(name)"
            :variant="`light-${resolveVariant(orgType)}`"
            size="90px"
            class="ml-1"
            rounded
          />
        </b-col>
        <b-col cols="2">
          <h5> <b>Organization Name</b> </h5>

          <h5 class="mb-1">
            {{ name }}
          </h5>
        </b-col>
        <b-col cols="2">
          <h5> <b>Status</b> </h5>
          <b-badge
            pill
            :variant="`light-${resolveStatusVariant(statusId)}`"
            class="text-capitalize"
          >
            {{ status }}
          </b-badge>
        </b-col>
        <b-col cols="2">
          <h5> <b> Donor</b> </h5>
          <b-badge
            pill
            :variant="`light-${isDonor === 1? 'success' : 'primary'}`"
            class="text-capitalize"
          >
            {{ isDonor === 1? 'Yes' : 'No' }}
          </b-badge>
        </b-col>
        <!-- Field: Display Number -->
        <b-col
          cols="12"
          md="4"
          lg="4"
        >
          <b-form-group
            label="Organization Display Name"
          >
            <b-form-input
              v-model="dis"
              disabled
            />
          </b-form-group>
        </b-col>
        <!-- Field: Registe -->
        <b-col
          cols="12"
          md="4"
          lg="4"
        >
          <b-form-group
            label="Register Number"
          >
            <b-form-input
              v-model="regNumber"
              disabled
            />
          </b-form-group>
        </b-col>
        <!-- Field: Prfix -->
        <b-col
          cols="12"
          md="4"
          lg="4"
        >
          <b-form-group
            label="Prefix"
          >
            <b-form-input
              v-model="prefix"
              disabled
            />
          </b-form-group>
        </b-col>

        <!-- Field: Type -->
        <b-col
          cols="12"
          md="4"
          lg="4"
        >
          <b-form-group
            label="Type"
          >
            <b-form-input
              v-model="orgType"
              disabled
            />
          </b-form-group>
        </b-col>
      </b-row>

      <!-- Header: Contact Info -->
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
          >
            <b-form-input
              v-model="contact"
              disabled
            />
          </b-form-group>
        </b-col>

        <!-- Field: Phone-->
        <b-col
          cols="12"
          md="6"
          lg="3"
        >
          <b-form-group label="Phone">
            <b-input-group>
              <b-input-group-prepend is-text>
                {{ PhoneCount }}
              </b-input-group-prepend>
              <b-form-input
                v-model="PhoneNumber"
                disabled
              />
            </b-input-group>
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
          >
            <b-form-input
              :value="email != null ? email: 'Nothing' "
              disabled
            />
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
          >
            <b-form-input
              :value="website != null ? website: 'Nothing' "
              disabled
            />
          </b-form-group>
        </b-col>
      </b-row>
      <!-- Header: Address Info -->
      <div class="d-flex mt-2">
        <feather-icon
          icon="MapPinIcon"
          size="19"
        />
        <h4 class="mb-0 ml-50">
          Address
        </h4>
      </div>

      <!-- Field: Language -->

      <b-row class="mt-1">
        <b-col
          cols="4"
        >
          <b-form-group
            label="Governorate"
          >
            <b-form-input
              :value="gov != null ? gov: 'Nothing' "
              disabled
            />
          </b-form-group>
        </b-col>
        <!-- Field: Language -->
        <b-col
          cols="4"
        >
          <b-form-group
            label="District"
          >
            <b-form-input
              :value="district != null ? district: 'Nothing' "
              disabled
            />
          </b-form-group>
        </b-col>

        <!-- Field: Cadaster -->
        <b-col
          cols="4"
        >
          <b-form-group
            label="Cadaster"
          >
            <b-form-input
              v-model="cadaster"
              disabled
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
              v-model="address"
              disabled
            />
          </b-form-group>
        </b-col>

      </b-row>

      <b-row>
        <!-- Header: Other -->
        <div class="d-flex mt-2">
          <feather-icon
            icon="InfoIcon"
            size="19"
          />
          <h4 class="mb-0 ml-50">
            Other Info
          </h4>
        </div>
      </b-row>
      <!-- Form: Other Info Form -->
      <b-row class="mt-1">
        <!-- Field: Description -->
        <b-col
          cols="6"
        >
          <b-form-group
            label="Description"
          >
            <b-form-textarea
              id="desc"
              v-model="description"
              placeholder="Description"
              rows="4"
              disabled
            />
          </b-form-group>
        </b-col>
        <!-- Field: Comment -->
        <b-col
          cols="6"
        >
          <b-form-group
            label="Current Status"
          >
            <b-form-textarea
              id="status"
              v-model="comment"
              placeholder="Current Status"
              rows="4"
              disabled
            />
          </b-form-group>
        </b-col>
      </b-row>

    </b-form>
  </div>
</template>
<script>

export default {
  props: {
    // TOp
    id: {
      type: String,
      required: true,
    },
    isDonor: {
      type: Number,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    dis: {
      type: String,
      required: true,
    },
    regNumber: {
      type: String,
      required: true,
    },
    prefix: {
      type: String,
      required: true,
    },
    orgType: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    statusId: {
      type: String,
      required: true,
    },
    // contact
    contact: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    // Address
    gov: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    cadaster: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    // Other
    comment: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  computed: {
    orgLogo() {
      return (this.logo === '' || this.logo) == null ? null : this.logo
    },
    PhoneCount() {
      let cnt = null
      if (this.phone.substring(0, 3) === '961') {
        cnt = 'LB (+961)'
      } else if (this.phone.substring(0, 3) === '963') {
        cnt = 'SY (+963)'
      } else {
        cnt = 'LB (+961)'
      }
      return cnt
    },
    PhoneNumber() {
      return this.phone.substring(3, this.phone.length)
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
    resolveStatusVariant(type) {
      if (type === 1) return 'warning'
      if (type === 2) return 'success'
      if (type === 3) return 'danger'
      if (type === 4) return 'danger'
      if (type === 5) return 'danger'
      return 'primary'
    },
  },
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
