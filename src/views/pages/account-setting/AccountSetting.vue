<template>
  <b-overlay
    :show="show"
    rounded="sm"
  >
    <b-tabs
      vertical
      content-class="col-12 col-md-9 mt-1 mt-md-0"
      pills
      nav-wrapper-class="col-md-3 col-12"
      nav-class="nav-left"
    >

      <!-- general tab -->
      <b-tab active>
        <!-- title -->
        <template #title>
          <feather-icon
            icon="UserIcon"
            size="18"
            class="mr-50"
          />
          <span class="font-weight-bold">General</span>
        </template>
        <account-setting-general />
      </b-tab>
      <!--/ general tab -->
      <!-- change password tab -->
      <b-tab>
        <!-- title -->
        <template #title>
          <feather-icon
            icon="LockIcon"
            size="18"
            class="mr-50"
          />
          <span class="font-weight-bold">Security</span>
        </template>
        <account-setting-password />
      </b-tab>
      <!--/ change password tab -->
      <!-- Notification
      <b-tab>
        <template #title>
          <feather-icon
            icon="BellIcon"
            size="18"
            class="mr-50"
          />
          <span class="font-weight-bold">Notification</span>
        </template>
        <account-setting-notification />
      </b-tab>
      -->
      <!-- info -->
      <b-tab>
        <!-- title -->
        <template #title>
          <feather-icon
            icon="InfoIcon"
            size="18"
            class="mr-50"
          />
          <span class="font-weight-bold">Information</span>
        </template>
        <account-setting-information />
      </b-tab>
    </b-tabs>
  </b-overlay>
</template>

<script>
import { takeState } from 'vuex-dot'
import AccountSettingGeneral from './AccountSettingGeneral.vue'
import AccountSettingPassword from './AccountSettingPassword.vue'
import AccountSettingInformation from './AccountSettingInformation.vue'
// import AccountSettingNotification from './AccountSettingNotification.vue'

export default {
  components: {
    AccountSettingGeneral,
    AccountSettingPassword,
    AccountSettingInformation,
    // AccountSettingNotification,
  },
  computed: {
    show: takeState('profile', 'show').commit('assessment/SET_SHOW').map(),
  },
}
</script>
