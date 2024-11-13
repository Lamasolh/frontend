<template>
  <div v-if="route !== 'ERROR'">
    <component
      :is="route"
      :ref="route"
    />
  </div>
  <div v-else>
    <h1>Redirection .....</h1>
  </div>
</template>
<script>
/// Chlore
import createRefChlr from '@/views/pages/referral-max/ReferralEntryChlr.vue'
import createRefConf from '@/views/pages/referral-max-conf/ReferralEntryConf.vue'
import createRef from '@/views/pages/referral/ReferralEntryADV.vue'
import createRefRDMS from '@/views/pages/referral/ReferralEntryRDMS.vue'
import createRefWTRRDMS from '@/views/pages/referral/ReferralEntryWTRRDMS.vue'

///
import CAST from '@/views/pages/case-assignment/CaseAssignment.vue'
import followUp from '@/views/pages/follow-up/FollowUp.vue'
import followUpCLRA from '@/views/pages/follow-up-clr/FollowUp.vue'
import followUpConf from '@/views/pages/follow-up-conf/FollowUp.vue'

import GSPLT from '@/views/pages/geo-split/GeoSplit.vue'
import WTR from '@/views/pages/water-trucking/task_manager/TaskManager.vue'

import INVNT from '@/views/pages/inventory/Inventory.vue'
import MNTR from '@/views/pages/monitoring/Monitoring.vue'
import MNTRWTR from '@/views/pages/monitoring-wtr/Monitoring.vue'
import MNTRTOOLS from '@/views/pages/monitoring/edit/Monitoring.vue'
import SMNTRT from '@/views/pages/monitoring-tools/Monitoring.vue'
import RPTS from '@/views/pages/reports/Reports.vue'
import RPTSWTR from '@/views/pages/reports_wtr/ReportsWtr.vue'

import RPRTST from '@/views/pages/reports-tools/Reports.vue'
import AWRNS from '@/views/pages/awareness/Awareness.vue'
import IND from '@/views/pages/indicators/IndicatorsPage.vue'
import ACT from '@/views/pages/accounting/AccountingPage.vue'

import DSTRB from '@/views/pages/distributors/DistributorsPage.vue'
import LNKCMN from '@/views/pages/link/LinkFollow.vue'
import RASNCS from '@/views/pages/re-assign-cases/ReAssignCases.vue'

import DRMNTR from '@/views/pages/drm/monitoring/list/MonitoringDRM.vue'
import DRMRPT from '@/views/pages/drm/reports/ReportsDRM.vue'

import SPSMNT from '@/views/pages/drm/ngo/supplier_assign/TaskManager.vue'
import WTRMNT from '@/views/pages/drm/ngo/monitoring_ngo/MonitoringManage.vue'

export default {
  components: {
    createRefConf,
    createRefChlr,
    createRef,
    createRefWTRRDMS,
    createRefRDMS,
    CAST,
    followUp,
    followUpCLRA,
    followUpConf,
    GSPLT,
    WTR,
    INVNT,
    DSTRB,
    MNTR,
    MNTRWTR,
    MNTRTOOLS,
    SMNTRT,
    AWRNS,
    IND,
    RPTS,
    RPTSWTR,
    RPRTST,
    LNKCMN,
    RASNCS,
    ACT,
    DRMNTR,
    DRMRPT,
    SPSMNT,
    WTRMNT,
  },
  beforeRouteUpdate(to, from, next) {
    this.rtChange(next)
  },
  data() {
    return {
      route: null,
    }
  },
  watch: {
    route(NewValue) {
      if (NewValue === 'ERROR') {
        this.$router.replace({ path: '/dashboard' })
      }
    },
  },
  mounted() {
    this.rtChange(null)
  },
  methods: {
    rtChange(nxt) {
      this.reset().then(val => {
        if (val) {
          if (nxt != null) {
            nxt()
            try {
              this.$refs[this.$route.params.prefixRole].ResetData()
            } catch (ex) {
              console.log(ex)
            }
            // this.$refs[this.$route.params.prefixRole].saved = false
          }
        } else if (val === false) {
          if (nxt != null) {
            nxt(false)
          }
        }
        switch (this.$route.params.prefixRole) {
          case 'RFET':
            if (this.$route.params.prefixPrj === 'CLRA') {
              this.route = 'createRefChlr'
            } else if (this.$route.params.prefixPrj === 'CONF') {
              this.route = 'createRefConf'
            } else if (this.$route.params.assmnttype === '2') {
              this.route = 'createRefRDMS'
            } else if (this.$route.params.assmnttype === '3') {
              this.route = 'createRefWTRRDMS'
            } else {
              this.route = 'createRef'
            }
            break
          case 'CAST':
            this.route = 'CAST'
            break
          case 'CMTN':
            if (this.$route.params.prefixPrj === 'CLRA') {
              this.route = 'followUpCLRA'
            } else if (this.$route.params.prefixPrj === 'CONF') {
              this.route = 'followUpConf'
            } else {
              this.route = 'followUp'
            }
            break
          case 'GSPLT':
            if (this.$route.params.assmnttype === '3') {
              this.route = 'WTR'
            } else {
              this.route = 'GSPLT'
            }
            break
          case 'INVNT':
            this.route = 'INVNT'
            break
          case 'DSTRB':
            this.route = 'DSTRB'
            break
          case 'MNTR':
            if (this.$route.params.tools === true) {
              this.route = 'MNTRTOOLS'
            } else if (this.$route.params.assmnttype === '3') {
              this.route = 'MNTRWTR'
            } else {
              this.route = 'MNTR'
            }
            break
          case 'SMNTRT':
            this.route = 'SMNTRT'
            break
          case 'RPTS':
            if (this.$route.params.prefixPrj === 'WTR') {
              this.route = 'RPTSWTR'
            } else {
              this.route = 'RPTS'
            }
            break
          case 'RPRTST':
            this.route = 'RPRTST'
            break

          case 'LNKCMN':
            this.route = 'LNKCMN'
            break
          case 'AWRNS':
            this.route = 'AWRNS'
            break
          case 'INDCTR':
            this.route = 'IND'
            break
          case 'RASNCS':
            this.route = 'RASNCS'
            break
          case 'ACNTNG':
            this.route = 'ACT'
            break
            /// DRM
          case 'DRMNTR':
            this.route = 'DRMNTR'
            break
          case 'DRMRPT':
            this.route = 'DRMRPT'
            break

          case 'SPSMNT':
            this.route = 'SPSMNT'
            break
          case 'WTRMNT':
            this.route = 'WTRMNT'
            break

          default:
            this.route = 'ERROR'
        }
      })
    },
    // eslint-s-next-line consistent-return
    async reset() {
      if (this.route != null) {
        /* if (this.$refs[this.route].saved) {
          return new Promise(resolve => {
            this.$swal({
              title: 'Are you sure?',
              html:
                'There is data that has not yet been saved</br> Do you want to exit the page?',
              icon: 'info',
              showCancelButton: true,
              confirmButtonText: 'Yes, remove data!',
              customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-outline-danger ml-1',
              },
              buttonsStyling: false,
            }).then(result => {
              if (result.value) {
                resolve(true)
              }
              if (result.dismiss === 'cancel') {
                resolve(false)
              } else {
                resolve(false)
              }
            })
          })
        } */
        if (this.$refs[this.route] != null) {
          this.$refs[this.route].saved = false
        }
        return true
      }
      if (this.$refs[this.route] != null) {
        this.$refs[this.route].saved = false
      }
      return true
    },
  },
}
</script>
