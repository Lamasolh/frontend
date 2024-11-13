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
            #cell(indicators)="data"
          >
            <b-row align-h="center">
              <b-col>
                <b-form-checkbox
                  :disabled="data.item.indicators ===2"
                  :checked="data.item.indicators > 0 ? true : false"
                  @change="item=> Input(item,data,'indicators')"
                />
              </b-col>
            </b-row>
          </template>
          <template
            #cell(monitoring_tools)="data"
          >
            <b-row align-h="center">
              <b-col>
                <b-form-checkbox
                  :disabled="data.item.monitoring_tools ===2"
                  :checked="data.item.monitoring_tools > 0 ? true : false"
                  @change="item=> Input(item,data,'monitoring_tools')"
                />
              </b-col>
            </b-row>
          </template>
          <template
            #cell(reporting_tools)="data"
          >
            <b-row align-h="center">
              <b-col>
                <b-form-checkbox
                  :disabled="data.item.reporting_tools ===2"
                  :checked="data.item.reporting_tools > 0 ? true : false"
                  @change="item=> Input(item,data,'reporting_tools')"
                />
              </b-col>
            </b-row>

          </template>
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
          <template
            #cell(re_assign)="data"
          >
            <b-row align-h="center">
              <b-col>
                <b-form-checkbox
                  :disabled="data.item.re_assign ===2"
                  :checked="data.item.re_assign > 0 ? true : false"
                  @change="item=> Input(item,data,'re_assign')"
                />
              </b-col>
            </b-row>

          </template>
        </b-table>
        <br>
        <b-row>
          <b-col cols="2">
            <b-button
              variant="success"
              class="mb-1 mb-sm-0 mr-0 mr-sm-1"
              :block="$store.getters['app/currentBreakPoint'] === 'xs'"
              @click="Save"
            >
              Save Changes
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
  computed: {
    show: takeState('rolePrj', 'show').commit('rolePrj/SET_SHOW').map(),
    rolesItem: takeState('rolePrj', 'rolesItem').commit('rolePrj/SET_ITEM').map(),
    rolesField: takeState('rolePrj', 'rolesField').map(),
    selectItem: takeState('rolePrj', 'selectItem').commit('rolePrj/SET_SELECT').map(),
  },
  watch: {
    selectItem(newValue) {
      console.log('selectItem', newValue)
    },
  },
  mounted() {
    this.ResetData()
  },
  methods: {
    ResetData() {
      this.rolesItem = []
      this.$store.dispatch('rolePrj/GET_ROLE', {
        prefix: this.$route.params.value.proj_prefix,
        proj: this.$route.params.value,
      }).catch(() => {
        this.$swal({
          title: 'Error!',
          text: 'Please Check internet and try again',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
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
        this.$store.dispatch('rolePrj/Save_ROLE', {
          prefix: this.$route.params.value.proj_prefix,
          re_entity: this.$route.params.value.referal_entity === 1,
        })
          .then(res => {
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
    },
    Input(value, item, key) {
      try {
        this.rolesItem[item.index][key] = value
        if (this.selectItem.length === 0) {
          this.selectItem.push(this.rolesItem[item.index])
        } else if ((this.selectItem.filter(it => it.id === this.rolesItem[item.index].id).length) === 0) {
          this.selectItem.push(this.rolesItem[item.index])
        } else {
          this.selectItem.filter(it => it.id === this.rolesItem[item.index].id)[0][key] = value
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
