<template>
  <div>

    <!-- Media -->
    <b-media class="mb-2">
      <template #aside>
        <b-avatar
          ref="previewEl"
          :src="logo"
          :text="avatarText(userName)"
          :variant="`light-${resolveVariant(statusId)}`"
          size="90px"
          rounded
        />
      </template>
      <b-row>
        <b-col cols="4">
          <h4 class="mb-1">
            Name: {{ first }}  {{ last }}
          </h4>
          <!-- <h4 class="mb-1">
            Name Arabic: {{ firstar }}  {{ lastar }}
          </h4> -->
          <h4 class="mb-1">
            UserName: {{ userName }}
          </h4>
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
      </b-row>
    </b-media>
    <!-- User Info: Input Fields -->
    <b-form>
      <b-row>
        <!-- Field: Gender -->
        <b-col
          cols="12"
          md="6"
        >
          <b-form-group
            label="Gender"
          >
            <b-form-input
              v-model="gender"
              disabled
            />
          </b-form-group>
        </b-col>
        <!-- Field: Nationality -->
        <b-col
          cols="12"
          md="6"
        >
          <b-form-group
            label="Nationality"
          >
            <b-form-input
              v-model="nationality"
              disabled
            />
          </b-form-group>
        </b-col>
        <!-- Field: DOB -->
        <b-col
          cols="12"
          md="6"
        >
          <b-form-group
            label="Date of Birth"
          >
            <b-form-input
              v-model="dob"
              disabled
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
            label-for="email"
          >
            <b-form-input
              id="email"
              v-model="email"
              disabled
            />
          </b-form-group>
        </b-col>
        <!-- Field: Phone -->
        <b-col
          cols="12"
          md="6"
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
        <!-- Field: Job -->
        <b-col
          cols="12"
          md="6"
        >
          <b-form-group
            label="Job"
            label-for="job"
          >
            <b-form-input
              id="job"
              v-model="job"
              type="email"
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
        <!-- Field: Bio -->
        <b-col
          cols="12"
        >
          <b-form-group
            label="Bio"
          >
            <b-form-textarea
              id="Userbio"
              v-model="bio"
              placeholder="Bio"
              rows="3"
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
    address: {
      type: String,
      default: '',
      required: false,
    },
    bio: {
      type: String,
      default: '',
      required: false,
    },
    dob: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    first: {
      type: String,
      required: true,
    },
    last: {
      type: String,
      required: true,
    },
    /* firstar: {
      type: String,
      required: true,
    },
    lastar: {
      type: String,
      required: true,
    }, */
    gender: {
      type: String,
      required: true,
    },
    job: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    statusId: {
      type: Number,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
  },
  computed: {
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
      if (type === 3) return 'primary'
      if (type === 4) return 'danger'
      if (type === 5) return 'info'
      return 'primary'
    },
  },
}
</script>
