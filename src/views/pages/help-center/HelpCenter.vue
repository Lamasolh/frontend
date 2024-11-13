<template>
  <div>
    <b-toast
      id="help-center"
      class="float-help"
      static
      no-auto-hide
      solid
      variant="primary"
    >
      <template slot="toast-title">
        <b-button
          v-show="page!==0"
          variant="flat-info"
          class="btn-icon"
          style="margin-top:1px;"
          @click="ToHelpCenter"
        >
          <feather-icon
            icon="ChevronLeftIcon"
            style="color:white"
          />
        </b-button>
        <b-row
          class="mt-1 ml-1"
          style="margin-bottom:5px;"
        >
          <feather-icon
            style="margin-right:5px;margin-top:1px;"
            :icon="iconTitle"
          />
          <h5 style="color:white;">
            {{ title }}
          </h5>
        </b-row>
      </template>
      <!--Direct Message-->
      <div
        v-if="page ==1"
        style="width:300px; height:350px"
      >
        <HelpCenterDirect />
      </div>
      <!--Change organization email -->
      <div
        v-else-if="page ==2"
        style="width:300px; height:350px"
      >
        <HelpCenterChangeOrgEmail />
      </div>
      <!--Change Admin -->
      <div
        v-else-if="page ==3"
        style="width:300px; height:350px"
      >
        <HelpCenterChangeAdmin />
      </div>
      <!--Change admin email-->
      <div
        v-else-if="page ==4"
        style="width:300px; height:350px"
      >
        <HelpCenterChangeAdminEmail />
      </div>
      <!--Main Page -->
      <div
        v-else
        style="width:300px; height:350px"
      >
        <div style="text-align: center;">
          <b-img
            :src="require('@/assets/images/pages/help_center_primary.png')"
            style="width:50px; height:50px"
          />
          <h4>Welcome to Help Center</h4>
        </div>
        <b-list-group>
          <b-list-group-item
            button
            @click="toDirectMessage"
          >
            <b-row>
              <b-col cols="8">
                <b-row>
                  <feather-icon
                    class="m-1"
                    icon="MessageSquareIcon"
                  />
                  <p style="margin-top:10px">
                    Send Email
                  </p>
                </b-row>

              </b-col>
              <b-col cols="2" />
              <b-col cols="1">
                <feather-icon
                  class="m-1"
                  icon="ChevronRightIcon"
                />
              </b-col>
            </b-row>
          </b-list-group-item>
          <b-list-group-item
            target="_blank"
            href="https://wa.me/+96170319729"
          >
            <b-row>
              <b-col cols="8">
                <b-row>
                  <feather-icon
                    class="m-1"
                    icon="MessageSquareIcon"
                  />
                  <p style="margin-top:10px">
                    Whatsapp With Sector IM
                  </p>
                </b-row>

              </b-col>
              <b-col cols="2" />
              <b-col cols="1">
                <feather-icon
                  class="m-1"
                  icon="ChevronRightIcon"
                />
              </b-col>
            </b-row>
          </b-list-group-item>
          <!--<b-list-group-item
            button
            @click="toChangeOrgEmail"
          >
            <b-row>
              <b-col cols="8">
                <b-row>
                  <feather-icon
                    class="m-1"
                    icon="MailIcon"
                  />
                  <p style="margin-top:10px">
                    Change organization email
                  </p>
                </b-row>

              </b-col>
              <b-col cols="2" />
              <b-col cols="1">
                <feather-icon
                  class="m-1"
                  icon="ChevronRightIcon"
                />
              </b-col>
            </b-row>
          </b-list-group-item>
          <b-list-group-item
            button
            @click="toChangeAdmin"
          >
            <b-row>
              <b-col cols="10">
                <b-row>
                  <feather-icon
                    class="m-1"
                    icon="UserIcon"
                  />
                  <p style="margin-top:10px">
                    Change organization admin
                  </p>
                </b-row>

              </b-col>
              <b-col cols="1">
                <feather-icon
                  class="m-1"
                  icon="ChevronRightIcon"
                />
              </b-col>
            </b-row>
          </b-list-group-item>
          <b-list-group-item
            button
            @click="toChangeAdminEmail"
          >
            <b-row>
              <b-col cols="10">
                <b-row>
                  <feather-icon
                    class="m-1"
                    icon="ToolIcon"
                  />
                  <p style="margin-top:10px">
                    Change organization admin email
                  </p>
                </b-row>

              </b-col>
              <b-col cols="1">
                <feather-icon
                  class="m-1"
                  icon="ChevronRightIcon"
                />
              </b-col>
            </b-row>
          </b-list-group-item>-->
        </b-list-group>
      </div>
    </b-toast>
  </div>
</template>

<script>
import HelpCenterDirect from './HelpCenterDirect.vue'
import HelpCenterChangeAdmin from './HelpCenterChangeAdmin.vue'
import HelpCenterChangeAdminEmail from './HelpCenterChangeAdminEmail.vue'
import HelpCenterChangeOrgEmail from './HelpCenterChangeOrgEmail.vue'

export default {
  components: {
    HelpCenterDirect,
    HelpCenterChangeAdmin,
    HelpCenterChangeOrgEmail,
    HelpCenterChangeAdminEmail,
  },
  data() {
    return {
      page: 0,
      title: 'Help Center',
    }
  },
  computed: {
    iconTitle() {
      switch (this.page) {
        case 1:
          return 'MessageSquareIcon'
        case 2:
          return 'MailIcon'
        case 3:
          return 'UserIcon'
        case 4:
          return 'ToolIcon'
        default:
          return 'LinkIcon'
      }
    },
  },
  methods: {
    toSector() {

    },
    ToHelpCenter() {
      this.page = 0
      this.title = 'Help Center'
    },
    toDirectMessage() {
      this.page = 1
      this.title = 'Send Email'
    },
    toChangeOrgEmail() {
      this.page = 2
      this.title = 'Change organization email'
    },
    toChangeAdmin() {
      this.page = 3
      this.title = 'Change organization admin'
    },
    toChangeAdminEmail() {
      this.page = 4
      this.title = 'Change organization admin email'
    },
  },
}
</script>
