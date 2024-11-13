<template>
  <div class="navbar-container d-flex content align-items-center">
    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link
          class="nav-link"
          @click="toggleVerticalMenuActive"
        >
          <feather-icon
            icon="MenuIcon"
            size="21"
          />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <div
      class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex"
    >
      <dark-Toggler class="d-none d-lg-block" />
      <b-img
        v-b-tooltip.hover
        title="Help Center"
        :src="require('@/assets/images/pages/help_center_primary.png')"
        width="26"
        height="26"
        @click="ShowHelpCenter = !ShowHelpCenter"
      />
      <p class="mt-1 ml-1">
        Version 2.6
      </p>
      <!--  <bookmarks /> -->
    </div>
    <b-navbar-nav class="nav align-items-center ml-auto">
      <!-- <locale />
      <search-bar />-->
      <notification-dropdown />
      <b-nav-item-dropdown
        right
        toggle-class="d-flex align-items-center dropdown-user-link"
        class="dropdown-user"
      >
        <template #button-content>
          <div class="d-sm-flex d-none user-nav">
            <p class="user-name font-weight-bolder mb-0">
              {{ FullName }}
            </p>
            <span class="user-status">{{ Role }}</span>
          </div>
          <b-avatar
            size="40"
            variant="light-primary"
            :text="ShortName"
            :src="Image"
          />
        </template>

        <b-dropdown-item
          link-class="d-flex align-items-center"
          @click="GoToProfile"
        >
          <feather-icon
            size="16"
            icon="UserIcon"
            class="mr-50"
          />
          <span>Profile</span>
        </b-dropdown-item>
        <b-dropdown-item
          v-show="$can('read', 'EDTORG')"
          link-class="d-flex align-items-center"
          @click="GoToEDIT"
        >
          <feather-icon
            size="16"
            icon="GlobeIcon"
            class="mr-50"
          />
          <span>Edit Organization</span>
        </b-dropdown-item>
        <!-- <b-dropdown-item
          link-class="d-flex align-items-center"
          @click="GoToFaq"
        >
          <feather-icon
            size="16"
            icon="InfoIcon"
            class="mr-50"
          />
          <span>FAQ</span>
        </b-dropdown-item>
       <b-dropdown-item
          link-class="d-flex align-items-center"
          @click="GoToKnowledge"
        >
          <feather-icon
            size="16"
            icon="UserIcon"
            class="mr-50"
          />
          <span>Knowledge</span>
        </b-dropdown-item>
       <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon
            size="16"
            icon="MailIcon"
            class="mr-50"
          />
          <span>Inbox</span>
        </b-dropdown-item>

        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon
            size="16"
            icon="CheckSquareIcon"
            class="mr-50"
          />
          <span>Task</span>
        </b-dropdown-item>

        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon
            size="16"
            icon="MessageSquareIcon"
            class="mr-50"
          />
          <span>Chat</span>
        </b-dropdown-item> -->

        <b-dropdown-divider />

        <b-dropdown-item
          link-class="d-flex align-items-center"
          @click="logout"
        >
          <feather-icon
            size="16"
            icon="LogOutIcon"
            class="mr-50"
          />
          <span>Logout</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
    <div v-show="ShowHelpCenter">
      <help-center />
      <div class="float">
        <b-img
          v-b-tooltip.hover
          title="Help Center"
          :src="require('@/assets/images/pages/help_center.png')"
          class="w-75 my-float"
          @click="ShowHelp"
        />
      </div>
    </div>
  </div>
</template>

<script>
import DarkToggler from '@core/layouts/components/app-navbar/components/DarkToggler.vue'
// import Locale from '@core/layouts/components/app-navbar/components/Locale.vue'
// import PhoneDirectory from '@core/layouts/components/app-navbar/components/PhoneDirectory.vue'

// import Bookmarks from '@core/layouts/components/app-navbar/components/Bookmarks.vue'
import NotificationDropdown from '@core/layouts/components/app-navbar/components/NotificationDropdown.vue'

import store from '@/store/index'
import { initialAbility } from '@/libs/acl/config'
import HelpCenter from '@/views/pages/help-center/HelpCenter.vue'

const Userdata = store.getters['auth/authUser']

export default {
  components: {
    // PhoneDirectory,

    // Navbar Components
    DarkToggler,
    // Locale,
    //  Bookmarks,
    HelpCenter,
    NotificationDropdown,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      isShowHelp: false,
      ShowHelpCenter: false,
    }
  },
  computed: {
    FullName() {
      const firstName = Userdata.first_name
      const lastName = Userdata.last_name
      if (firstName == null || lastName == null) {
        return 'User'
      }
      return `${firstName} ${lastName} - ${Userdata.orgdis}`
    },
    ShortName() {
      const firstName = Userdata.first_name
      const lastName = Userdata.last_name
      if (firstName == null || lastName == null) {
        return 'US'
      }
      return `${firstName.charAt(0)}${lastName.charAt(0)}`
    },
    Image() {
      if (Userdata.avatar == null) {
        if (Userdata.gender_id === 2) {
          // eslint-disable-next-line global-require
          return require('@/assets/images/avatars/avatar-man-small.png')
        }
        if (Userdata.gender_id === 3) {
          // eslint-disable-next-line global-require
          return require('@/assets/images/avatars/avatar-woman-small.png')
        }
        return null
      }
      return Userdata.avatar
    },
    Role() {
      if (this.$route.name === 'project') {
        if (
          this.roleProject.filter(
            it => it.prefix === this.$route.params.prefixPrj,
          )[0] == null
        ) {
          return ''
        }
        return `${this.$route.params.prefixPrj} - ${
          this.roleProject.filter(
            it => it.prefix === this.$route.params.prefixPrj,
          )[0].prc_name
        }`
      }
      return ''
    },
    roleProject() {
      return this.$store.getters['global/rolesProject']
    },
  },
  methods: {
    async logout() {
      this.$store.commit('app/LOADING_SHOW')
      await store.dispatch('auth/logout')
      this.$ability.update(initialAbility)
      await this.$router.go({ name: 'login' })
    },
    GoToProfile() {
      this.$router.push('/profile')
    },
    GoToFaq() {
      this.$router.push('/faq')
    },
    GoToKnowledge() {
      this.$router.push('/Knowledge-base')
    },
    GoToEDIT() {
      const nav = []
      nav.push(
        {
          active: false,
          to: '/',
          text: 'Edit Organization',
        },
        {
          active: true,
          text: this.Role,
        },
      )
      this.$router.replace({
        name: 'EditOrg',
        params: {
          action: 'read',
          breadcrumb: nav,
          active: true,
          title: 'Edit Organization',
          resource: 'EDTORG',
        },
      })
    },
    ShowHelp() {
      if (this.isShowHelp === false) {
        this.$bvToast.show('help-center')
        this.isShowHelp = true
      } else {
        this.$bvToast.hide('help-center')
        this.isShowHelp = false
      }
    },
  },
}
</script>
<style lang="scss">
.float {
  position: fixed;
  width: 65px;
  height: 65px;
  bottom: 40px;
  right: 80px;
  background-color: #4b87c7;
  color: #fff;
  border-radius: 50px;
  text-align: center;
  box-shadow: 2px 2px 3px #999;
}
.float-help {
  position: fixed;
  width: 300 px !important;
  bottom: 120px;
  right: 80px;
  border-radius: 50px;
}
.my-float {
  margin-top: 9px;
}
</style>
