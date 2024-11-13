/* eslint-disable import/no-cycle */
import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'

// Modules
import app from './app'
import appConfig from './app-config'
import nav from './navigation'
import verticalMenu from './vertical-menu'

// global
import global from './global/glob'
import helpCenter from './global/help_center'
import profile from './global/profile'
import auth from './global/auth'
import notify from './global/notification'
import directory from './pages/directory/index'
// Systme Admin
import createSec from './pages/system-admin/sector/create'
import listSec from './pages/system-admin/sector/list'
/// Sector
/// ReAssing
import reAssign from './pages/admin-sector/re-assign'
/// Organization
import manageOrg from './pages/admin-sector/organization/manage'
import listOrg from './pages/admin-sector/organization/list'
import linkOrg from './pages/admin-sector/organization/link'
import editOrg from './pages/admin-sector/organization/edit'
import addOrg from './pages/admin-sector/organization/add'
import entryOrg from './pages/admin-sector/organization/entry'
import roleOrg from './pages/admin-org/role'

/// Project
import createPrj from './pages/admin-sector/projects/create'
import listPrj from './pages/admin-sector/projects/list'
import rolePrj from './pages/admin-sector/projects/role'
import searchPrj from './pages/admin-sector/projects/search'
import managePrj from './pages/admin-sector/projects/manage'
import importPrj from './pages/admin-sector/projects/import'
import importPrjWtr from './pages/admin-sector/projects/import_wtr'

// User Manager
import usermanager from './pages/admin-sector/usermanager'

/// /////////////////////
/// Admin Org
// User Manager
import useradd from './pages/admin-org/users/create'
import listUser from './pages/admin-org/users/list'

/// ////////////////////////////
/// /// User Org
/// Project
import listPMSetPrj from './pages/admin-org/project_pm_setting'
import listOrgPrj from './pages/admin-org/project'
import settingPrj from './pages/admin-org/project_setting'
import aoiPrj from './pages/admin-org/project_aoi'

// Referral
import createRef from './pages/user-org/project/referral'
import referral from './pages/user-org/project/referral-adv'
import referralClr from './pages/user-org/project/referral-clr'
import referralConf from './pages/user-org/project/referral-conf'

import referralWtr from './pages/user-org/project/referral-wtr'

import fullData from './pages/user-org/project/full_data'
import referralEXlS from './pages/user-org/project/referral-import'

///
import report from './pages/user-org/project/reports'
import reportWtr from './pages/user-org/project/reports-wtr'
import reportsTools from './pages/user-org/project/reports-tools'
import accounting from './pages/user-org/project/accounting'

// Case Assignment
import caseAssignment from './pages/user-org/project/case-assignment'
// FollowUp
import followUp from './pages/user-org/project/follow-up'
import followUpWiz from './pages/user-org/project/follow-up/followup-wizard'
import followUpWizClr from './pages/user-org/project/follow-up/followup-wizard-clr'
import followUpWizConf from './pages/user-org/project/follow-up/followup-wizard-conf'

// awareness
import awareness from './pages/user-org/project/awareness'
// indicators
import indicators from './pages/user-org/project/indicators'
// Inventory
import inventory from './pages/user-org/project/inventory'
// Assement link
import link from './pages/user-org/project/link'
// Geo split
import geoSplit from './pages/user-org/project/geo-split'
// distributor
import distributor from './pages/user-org/project/distributors'
// monitoring
import monitoringView from './pages/user-org/project/monitoring-view'
import monitoring from './pages/user-org/project/monitoring'
import monitoringwtr from './pages/user-org/project/monitoring-wtr'
import monitoringViewWtr from './pages/user-org/project/monitoring-view-wtr'

import monitoringTools from './pages/user-org/project/monitoring-tools'

import truckingTaskmanager from './pages/user-org/project/water-trucking/taskmanager'

///
import dataCollectGeo from './pages/user-org/data_collection/geo-split'
import dtWTR from './pages/user-org/data_collection/data_collect/dt_water_source'
import dtLAT from './pages/user-org/data_collection/data_collect/dt_latrine'
import dtTNT from './pages/user-org/data_collection/data_collect/dt_tent'
import dtPIT from './pages/user-org/data_collection/data_collect/dt_pit'
import dtTNK from './pages/user-org/data_collection/data_collect/dt_tank'
import dtFAM from './pages/user-org/data_collection/data_collect/dt_family'
import dtMEM from './pages/user-org/data_collection/data_collect/dt_members'
import dtMAIN from './pages/user-org/data_collection/data_collect/dt_main'

import dataCollectList from './pages/user-org/data_collection/data_collect_list'

/// Survey
import assessment from './global/assessment'
import assessmentClr from './global/assessment-clr'

import feedback from './pages/feedback'
import upload from './global/upload'
/// DRM
import monitoringDRM from './pages/user-org/project/drm/sector/monitoring'
import monitoringDRMDtl from './pages/user-org/project/drm/sector/monitoring_details'
import reportDRM from './pages/user-org/project/drm/sector/reports'

import drmNGOAcc from './pages/user-org/project/drm/ngo/accounting'
import drmNGOMn from './pages/user-org/project/drm/ngo/monitoring'
import drmNGOMnDtl from './pages/user-org/project/drm/ngo/monitoring_details'
import drmNGORpt from './pages/user-org/project/drm/ngo/reports'
import drmNGOSup from './pages/user-org/project/drm/ngo/supplier_assign'

import drmSecGeo from './pages/user-org/project/drm/ngo/idp_geosplit_sector'

Vue.use(Vuex)

const store = new Vuex.Store({
  // plugins: [createPersistedState()],
  modules: {
    // App
    app,
    appConfig,
    verticalMenu,
    nav,
    // GLobal
    global,
    upload,
    helpCenter,
    auth,
    notify,
    directory,
    profile,

    /// System Admin
    createSec,
    listSec,

    /// Sector
    // Organization
    reAssign,
    manageOrg,
    addOrg,
    listPMSetPrj,
    listOrg,
    entryOrg,
    roleOrg,
    linkOrg,
    editOrg,
    // Usermanager
    usermanager,
    // Project
    createPrj,
    listPrj,
    managePrj,
    rolePrj,
    searchPrj,
    importPrj,
    importPrjWtr,
    /// Admin Org
    // User Manager
    useradd,
    listUser,
    // Project
    listOrgPrj,
    settingPrj,
    aoiPrj,
    truckingTaskmanager,
    accounting,
    /// User Org
    dataCollectGeo,
    dtWTR,
    dtLAT,
    dtTNT,
    dtPIT,
    dtTNK,
    dtFAM,
    dtMEM,
    dtMAIN,
    dataCollectList,
    // Project
    createRef,
    referralClr,
    referralConf,
    referralWtr,
    referralEXlS,
    fullData,
    referral,
    caseAssignment,
    followUp,
    followUpWiz,
    followUpWizClr,
    followUpWizConf,
    awareness,
    indicators,
    geoSplit,
    link,
    distributor,
    inventory,
    monitoring,
    monitoringwtr,
    monitoringTools,
    monitoringView,
    monitoringViewWtr,
    report,
    reportWtr,
    reportsTools,
    assessment,
    assessmentClr,
    feedback,

    /// DWRM
    monitoringDRM,
    monitoringDRMDtl,
    reportDRM,
    drmNGOAcc,
    drmNGOMn,
    drmNGOMnDtl,
    drmNGORpt,
    drmNGOSup,
    drmSecGeo,

  },
  strict: process.env.DEV,
})
export default store
