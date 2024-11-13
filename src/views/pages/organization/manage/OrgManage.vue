<template>
  <b-card>
    <b-overlay
      rounded="lg"
      :show="show"
    >
      <b-tabs
        pills
      >
        <!-- Tab: Information -->
        <b-tab active>
          <template #title>
            <feather-icon
              icon="GlobeIcon"
              size="16"
              class="mr-0 mr-sm-50"
            />
            <span class="d-none d-sm-inline">Information</span>
          </template>
          <OrgInfo
            :id="String(value.orgId)"
            class="mt-2 pt-75"
            :logo="value.orgLogo!= null ?value.orgLogo: 'Nothing'"
            :name="value.orgName"
            :dis="value.orgDis"
            :prefix="value.orgPrefix"
            :org-type="value.orgType"
            :reg-number="value.orgRegNum != null ?value.orgRegNum: 'Nothing'"
            :contact="value.orgContact == null? '':value.orgContact "
            :phone="String(value.orgPhone)"
            :email="value.orgEmail"
            :website="value.orgWeb != null ?value.orgWeb: 'Nothing'"
            :district="value.orgDistrict"
            :gov="value.governorate_name"
            :is-donor="value.is_donor"
            :cadaster="value.orgCad"
            :address="value.orgAdress != null ?value.orgAdress: 'Nothing'"
            :description="value.orgDescription != null ?value.orgDescription: 'Nothing'"
            :comment="value.orgCom != null ?value.orgCom: 'Nothing'"
            :status="value.orgStatus"
            :status-id="String(value.orgStatusID)"
          />
        </b-tab>
        <!-- Tab: Account -->
        <b-tab>
          <template #title>
            <feather-icon
              icon="UserIcon"
              size="16"
              class="mr-0 mr-sm-50"
            />
            <span class="d-none d-sm-inline">Admin Account</span>
          </template>
          <OrgAdmin
            class="mt-2 pt-75"
            :address="value.userAdd != null ?value.userAdd: 'Nothing'"
            :bio="value.userBio"
            :dob="value.userDOB"
            :email="value.userEmail"
            :first="value.userFN"
            :last="value.userLN"
            :gender="value.userGen"
            :job="value.userJob"
            :user-name="value.userName"
            :nationality="value.userNat"
            :phone="String(value.userPhone)"
            :status="value.userStatus"
            :logo="value.userLogo!= null ?value.userLogo: 'Nothing'"
            :status-id="value.userStatusID"
          />
          <!-- /*:firstar="value.userFNAR"
            :lastar="value.userLNAR"*/-->
        </b-tab>
        <!-- Approve -->
        <b-row
          v-if="value.orgStatusID ===1"
          class="mt-2"
        >
          <b-col cols="2">
            <b-button
              variant="success"
              class="mb-1 mb-sm-0 mr-0 mr-sm-1"
              :block="$store.getters['app/currentBreakPoint'] === 'xs'"
              @click="Approve"
            >
              Approve
            </b-button>
          </b-col>
          <b-col cols="2">
            <b-button
              variant="warning"
              class="mb-1 mb-sm-0 mr-0 mr-sm-1"
              :block="$store.getters['app/currentBreakPoint'] === 'xs'"
              @click="NotActive"
            >
              Decline
            </b-button>
          </b-col>
        </b-row>
        <b-row
          v-if="value.is_donor !==1 && value.orgStatusID ===2"
          class="mt-2"
        >
          <b-col cols="2">
            <b-button
              variant="success"
              class="mb-1 mb-sm-0 mr-0 mr-sm-1"
              :block="$store.getters['app/currentBreakPoint'] === 'xs'"
              @click="Donor"
            >
              Donor
            </b-button>
          </b-col>
        </b-row>
        <!-- Active
        <b-row
          v-if="value.orgStatusID ===2"
          class="mt-2"
        >
          <b-col>
            <b-button
              variant="danger"
              class="mb-1 mb-sm-0 mr-0 mr-sm-1"
              :block="$store.getters['app/currentBreakPoint'] === 'xs'"
              @click="NotActive"
            >
              Not Active
            </b-button>
          </b-col>
        </b-row> -->
        <!-- Not Active
        <b-row
          v-if="value.orgStatusID ===3"
          class="mt-2"
        >
          <b-col>
            <b-button
              variant="primary"
              class="mb-1 mb-sm-0 mr-0 mr-sm-1"
              :block="$store.getters['app/currentBreakPoint'] === 'xs'"
              @click="Active"
            >
              Active
            </b-button>
          </b-col>
        </b-row>-->
      </b-tabs>
      <ReasonModal />
      <ApproveModal />
    </b-overlay>
  </b-card>
</template>
<script>
import { takeState } from 'vuex-dot'
import ReasonModal from './OrgReasonModal.vue'
import ApproveModal from './OrgApproveModal.vue'

import OrgInfo from './OrgInfo.vue'
import OrgAdmin from './OrgAdmin.vue'

export default {
  components: {
    OrgInfo,
    ReasonModal,
    OrgAdmin,
    ApproveModal,
  },
  computed: {
    value() {
      console.log(this.$route.params.value)
      return this.$route.params.value
    },
    ...takeState('manageOrg', 'showModalReas')
      .expose([
        'active',
        'item',
        'index',
      ])
      .commit('manageOrg/SET_SHOW_REAS_ADV')
      .map(),
    show: takeState('manageOrg', 'show').commit('manageOrg/SET_SHOW').map(),

    showModalReas: takeState('manageOrg', 'showModalReas').commit('manageOrg/SET_SHOW_REAS').map(),
    showModalApr: takeState('manageOrg', 'showModalApr').commit('manageOrg/SET_SHOW_APR').map(),
  },
  methods: {
    ResetData() {

    },
    RouteView() {
      this.$router.replace({
        name: 'menu',
        params: {
          action: 'read',
          breadcrumb: [
            {
              text: 'Organizations Mng.',
              active: false,
            },
            {
              text: 'Organization List',
              active: true,
            },
          ],
          active: true,
          prefixPrj: 'ORGMNG',
          prefixRole: 'ORLST',
          title: 'Organization List',
          resource: 'ORLST',
        },
      })
    },
    Approve() {
      this.showModalApr = {
        active: true,
      }
      console.log(this.showModalApr)
      /* this.$store.dispatch('manageOrg/orgApprove').then(res => {
        console.log('red', res)
        if (res != null) {
          if (res.result === 0) {
            this.$swal({
              title: 'Error!',
              text: 'Approved failed',
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          } else {
            this.RouteView()
            this.$swal({
              title: 'Success!',
              text: 'Organization is Approve',
              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          }
        } else {
          this.$swal({
            title: 'Error!',
            text: 'Approved failed',
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        }
      }) */
    },
    Active() {
      this.$store.dispatch('manageOrg/orgActive').then(res => {
        if (res != null) {
          if (res === 0) {
            console.log(res)
            this.$swal({
              title: 'Success!',
              text: 'Organization is active',
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          } else {
            this.$swal({
              title: 'Error!',
              text: 'Operation failed',
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          }
        } else {
          this.$swal({
            title: 'Error!',
            text: 'Operation failed',
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        }
      })
    },
    NotActive() {
      this.showModalReas = {
        active: true,
      }
      console.log(this.showModalReas)
    },
    Donor() {
      this.$swal({
        title: 'Attention!',
        text: 'Are you sure you want to add this organization to the Donor list!?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Yes!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        console.log(result)
        if (result.value) {
          this.$store.dispatch('manageOrg/orgDonor', {}).then(res => {
            console.log('red', res)
            if (res != null) {
              if (res.result === 0) {
                this.$swal({
                  title: 'Error!',
                  text: 'Operation failed',
                  icon: 'error',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                })
              } else {
                this.value.is_donor = 1
                this.$swal({
                  title: 'Success!',
                  text: 'Organization is donor',
                  icon: 'success',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                })
              }
            } else {
              this.$swal({
                title: 'Error!',
                text: 'Operation failed',
                icon: 'error',
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              })
            }
          })
        }
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
@import '@core/scss/vue/libs/vue-select.scss';

</style>
