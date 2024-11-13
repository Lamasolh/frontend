<template>
  <b-overlay
    :show="show"
    rounded="sm"
  >
    <b-card>
      <b-form
        ref="form"
        class="repeater-form"
      >
        <!-- Main: General Info -->
        <b-row align-h="between">
          <b-col
            cols="2"
            class="mt-1"
          >
            <div class="d-flex">
              <feather-icon
                icon="UserCheckIcon"
                size="19"
              />
              <h4 class="mb-0 ml-50">
                Project Role
              </h4>
            </div>
          </b-col>
          <b-col cols="1">
            <b-button
              ref="refreshbutton"
              variant="primary"
              class="btn-icon"
              @click="Refesh"
            >
              <feather-icon icon="RefreshCwIcon" />
            </b-button>
          </b-col>
        </b-row>
        <br>
        <!-- -->
        <b-table
          ref="selectableTable"
          responsive
          bordered
          :items="rolesItem"
          :fields="rolesField"
          show-empty
          sticky-header
          :selected-variant="$store.state.appConfig.layout.skin === 'dark'?'active':'primary'"
          style="max-height: 450px;"
          empty-text="No matching records found"
        >
          <template
            #cell(referral_entry)="data"
          >
            <b-row align-h="center">
              <b-col>
                <b-form-checkbox
                  :disabled="data.item.referral_entry ===2"
                  :checked="data.item.referral_entry > 0 ? true : false"
                  @change="item=> Input(item,data,'referral_entry')"
                />
              </b-col>
            </b-row>
          </template>
        </b-table>
        <br>
        <b-row align-h="between">
          <b-col cols="2">
            <b-button
              variant="success"
              @click="Save"
            >
              Save Changes
            </b-button>
          </b-col>
          <b-col cols="6" />
          <b-col cols="2">
            <b-button
              variant="primary"
              block
              @click="RouteView"
            >
              Go to View
            </b-button>
          </b-col>
          <b-col cols="2">
            <b-button
              variant="info"
              block
              @click="RouteSearch"
            >
              Go to Search
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
  </b-overlay>
</template>
<script>
import { takeState } from 'vuex-dot'

export default {
  data() {
    return {
      diSelect: true,
    }
  },
  computed: {
    show: takeState('roleOrg', 'show').commit('roleOrg/SET_SHOW').map(),
    rolesItem: takeState('roleOrg', 'rolesItem').commit('roleOrg/SET_ITEM').map(),
    roleCategory: takeState('roleOrg', 'roleCategory').map(),
    rolesField: takeState('roleOrg', 'rolesField').map(),
    rolesItemOriginal: takeState('roleOrg', 'rolesItemOriginal').map(),

    selectItem: takeState('roleOrg', 'selectItem').commit('roleOrg/SET_SELECT').map(),
  },
  mounted() {
    this.ResetData()
  },
  methods: {
    ResetData() {
      this.rolesItem = []
      this.$store.dispatch('roleOrg/GET_ROLE', {
        prefix: this.$route.params.value.proj_prefix,
      })
    },
    RouteSearch() {
      const nav = []
      nav.push(
        {
          active: false,
          text: this.$route.params.breadcrumb[0].text,
        },
        {
          active: false,
          text: this.$route.params.title,
        },
        {
          active: true,
          text: `${this.$route.params.value.proj_name}`,
        },
      )
      this.$store.commit('listOrgPrj/CLEAR_MARKER_ITEM')
      this.$router.replace({
        name: 'menuSearch',
        params: {
          action: 'read',
          breadcrumb: nav,
          active: true,
          prefix: this.$route.params.prefixPrj,
          prefixRole: this.$route.params.prefixRole,
          title: 'Project Search',
          resource: 'PRJKTS',
          value: this.$route.params.value,
        },
      })
    },
    RouteView() {
      const nav = []
      nav.push(
        {
          active: false,
          text: this.$route.params.breadcrumb[0].text,
        },
        {
          active: false,
          text: this.$route.params.title,
        },
        {
          active: true,
          text: `${this.$route.params.value.proj_name}`,
        },
      )

      this.$router.replace({
        name: 'menuViews',
        params: {
          action: 'read',
          breadcrumb: nav,
          active: true,
          prefix: this.$route.params.prefixPrj,
          prefixRole: this.$route.params.prefixRole,
          title: 'Project View',
          resource: 'PRJKTS',
          value: this.$route.params.value,
        },
      })
    },
    Save() {
      if (this.selectItem.length > 0) {
        if (this.selectItem[0].id != null) {
          this.$store.dispatch('roleOrg/Save_ROLE', {
            prefix: this.$route.params.value.proj_prefix,
            re_entity: this.$route.params.value.referal_entity === 1,
          }).then(res => {
            if (res.result === 1) {
              this.$refs.selectableTable.refresh()
              this.$swal({
                title: 'Success!',
                text: 'Operation Successfully',
                icon: 'success',
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
          }).catch(() => {
            this.$swal({
              title: 'Error!',
              text: 'Please check internet connection',
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          })
        } else {
          this.$swal({
            title: 'Attention!',
            text: 'No data changed',
            icon: 'warning',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        }
      } else {
        this.$swal({
          title: 'Attention!',
          text: 'No data changed',
          icon: 'warning',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
      }
    },
    ChangeRole(value, item) {
      this.$swal({
        title: 'Are you sure?',
        text: 'Do you want to change Permissions!',
        icon: 'warning',
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonText: 'Yes, Change it!',
        denyButtonText: 'Don\'t Change',
        customClass: {
          confirmButton: 'btn btn-primary',
          denyButton: 'btn btn-warning ml-1 mr-1',
          cancelButton: 'btn btn-outline-danger',
        },
        buttonsStyling: false,
      }).then(result => {
        this.$refs.selectableTable.refresh()
        if (result.isConfirmed) {
          this.$nextTick(() => {
            document.querySelector(':root').style.setProperty('--myResp', 'auto')
          })
          this.diSelect = false
          this.$nextTick(() => {
            this.rolesItem[item.index].role_cat_id = value.value
            this.rolesItem[item.index].role_cat_name = value.title
          })
          console.log(value, item)
          console.log('Check', value.referral_entry)
          console.log('rolesItemOriginal', this.rolesItemOriginal[item.index])
          console.log('ref', this.rolesItemOriginal[item.index].referral_entry)
          if (this.rolesItemOriginal[item.index].referral_entry === 0) {
            if (value.referral_entry === 1) {
              this.rolesItem[item.index].referral_entry = value.referral_entry
            } else {
              this.rolesItem[item.index].referral_entry = 0
            }
          }
          if (this.rolesItemOriginal[item.index].case_assignment === 0) {
            if (value.case_assignment === 1) {
              this.rolesItem[item.index].case_assignment = value.case_assignment
            } else {
              this.rolesItem[item.index].case_assignment = 0
            }
          }
          if (this.rolesItemOriginal[item.index].assessment === 0) {
            if (value.assessment === 1) {
              this.rolesItem[item.index].assessment = value.assessment
            } else {
              this.rolesItem[item.index].assessment = 0
            }
          }
          if (this.rolesItemOriginal[item.index].link_assessment === 0) {
            if (value.link_assessment === 1) {
              this.rolesItem[item.index].link_assessment = value.link_assessment
            } else {
              this.rolesItem[item.index].link_assessment = 0
            }
          }
          if (this.rolesItemOriginal[item.index].indicators === 0) {
            if (value.indicators === 1) {
              this.rolesItem[item.index].indicators = value.indicators
            } else {
              this.rolesItem[item.index].indicators = 0
            }
          }
          if (this.rolesItemOriginal[item.index].geo_split === 0) {
            if (value.geo_split === 1) {
              this.rolesItem[item.index].geo_split = value.geo_split
            } else {
              this.rolesItem[item.index].geo_split = 0
            }
          }
          if (this.rolesItemOriginal[item.index].inventory === 0) {
            if (value.inventory === 1) {
              this.rolesItem[item.index].inventory = value.inventory
            } else {
              this.rolesItem[item.index].inventory = 0
            }
          }
          if (this.rolesItemOriginal[item.index].distributor === 0) {
            if (value.distributor === 1) {
              this.rolesItem[item.index].distributor = value.distributor
            } else {
              this.rolesItem[item.index].distributor = 0
            }
          }
          if (this.rolesItemOriginal[item.index].awareness === 0) {
            if (value.awareness === 1) {
              this.rolesItem[item.index].awareness = value.awareness
            } else {
              this.rolesItem[item.index].awareness = 0
            }
          }
          if (this.rolesItemOriginal[item.index].monitoring === 0) {
            if (value.monitoring === 1) {
              this.rolesItem[item.index].monitoring = value.monitoring
            } else {
              this.rolesItem[item.index].monitoring = 0
            }
          }
          if (this.rolesItemOriginal[item.index].reporting === 0) {
            if (value.reporting === 1) {
              this.rolesItem[item.index].reporting = value.reporting
            } else {
              this.rolesItem[item.index].reporting = 0
            }
          }
          if (this.selectItem.length === 0) {
            this.selectItem.push(this.rolesItem[item.index])
          } else if ((this.selectItem.filter(it => it.id === this.rolesItem[item.index].id).length) === 0) {
            this.selectItem.push(this.rolesItem[item.index])
          } else {
            this.selectItem.filter(it => it.id === this.rolesItem[item.index].id)[0].role_cat_id = value.value
            this.selectItem.filter(it => it.id === this.rolesItem[item.index].id)[0].role_cat_name = value.title
          }
          setTimeout(() => {
            this.$nextTick(() => {
              this.diSelect = true
            })
          }, 200)
        } else if (result.isDenied) {
          this.$nextTick(() => {
            document.querySelector(':root').style.setProperty('--myResp', 'auto')
          })
          this.diSelect = false

          this.$nextTick(() => {
            this.rolesItem[item.index].role_cat_id = value.value
            this.rolesItem[item.index].role_cat_name = value.title
          })
          if (this.selectItem.length === 0) {
            this.selectItem.push(this.rolesItem[item.index])
          } else if ((this.selectItem.filter(it => it.id === this.rolesItem[item.index].id).length) === 0) {
            this.selectItem.push(this.rolesItem[item.index])
          } else {
            this.selectItem.filter(it => it.id === this.rolesItem[item.index].id)[0].role_cat_id = value.value
            this.selectItem.filter(it => it.id === this.rolesItem[item.index].id)[0].role_cat_name = value.title
          }
          setTimeout(() => {
            this.$nextTick(() => {
              this.diSelect = true
            })
          }, 200)
        }
        this.$nextTick(() => {
          document.querySelector(':root').style.setProperty('--myResp', 'inherit')
        })
        console.log(this.$refs)
        console.log(this.$refs.Vueselect)
      })
    },
    Input(value, item, key) {
      try {
        console.log(value)
        this.rolesItem[item.index][key] = value === true ? 1 : 0
        if (this.selectItem.length === 0) {
          this.selectItem.push(this.rolesItem[item.index])
        } else if ((this.selectItem.filter(it => it.id === this.rolesItem[item.index].id).length) === 0) {
          this.selectItem.push(this.rolesItem[item.index])
        } else {
          this.selectItem.filter(it => it.id === this.rolesItem[item.index].id)[0][key] = value === true ? 1 : 0
        }
      } catch (e) {
        console.log('error', e)
      }
    },
    Refesh() {
      window.location.reload()
    },
  },
}
</script>
<style lang="scss" >
.role_category{
  min-width: 250px;
}
.full_name{
  max-width: 600px;
  min-width: 200px;
}
@media (max-width: 767px) {
  .table-responsive .vselect {
    position: relative; /* Sometimes needs !important */
  }
}
</style>
