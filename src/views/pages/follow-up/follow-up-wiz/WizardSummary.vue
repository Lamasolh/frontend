<template>
  <div>
    <b-row>
      <b-col
        cols="12"
        class="mb-2"
      >
        <h5 class="mb-0">
          Case Summary Info
        </h5>
      </b-col>
    </b-row>
    <b-row align-v="stretch">
      <b-col cols="4">
        <p />
      </b-col>
      <b-col cols="4">
        <p>Case Score:  {{ progress_scoring ==null ? "0": progress_scoring }}</p>
        <p>Case Decision:  {{ final_decision ==null ? "1": decision.filter(it=> it.value ===final_decision)[0].title }}</p>
      </b-col>
    </b-row>
    <hr style="width:100%">
    <b-row align-v="stretch">
      <b-col cols="4">
        <p> Case Code: <a
          :href="link"
          target="_blank"
        > {{ case_code ==null ? "Case Code": case_code }}</a></p>
        <p> Case Name:  {{ full_name ==null ? "Case Name": full_name }}</p>
        <p> Case Phone:  {{ case_phone ==null ? "Case Phone": case_phone }}</p>
        <p> Case Nationality:  {{ nationality_id ==null ? "1": nationality.filter(it=> it.value ===nationality_id)[0].title }}</p>
        <p> Address:  {{ adresstext ==null ? "Address": adresstext }}</p>
      </b-col>
      <b-col cols="4">
        <p> Referred Date:  {{ created_date ==null ? "Referred Date": created_date }}</p>
        <p> Referred By:   {{ referral_id ==null ? "1": referral.filter(it=> it.value ===referral_id)[0].title }}</p>
        <p> District:   {{ district_id ==null ? "1": district.filter(it=> it.value ===district_id)[0].title }}</p>
        <p> Cadaster/Municipality:   {{ cadastre_id ==null ? "1": cadaster.filter(it=> it.value ===cadastre_id)[0].title }}</p>
        <p> Geo-Location: <a
          :href="link2"
          target="_blank"
        > {{ address_longitude ==null && address_latitude == null? "Geo-Location": ' ' + address_longitude + ', ' + address_latitude }}</a></p>
      </b-col>
      <b-col cols="4">
        <p> Current Status:  </p>
        <p
          style="white-space:pre"
          align="left"
        >
          {{ current_status ==null ? "Current Status:":current_status }}
        </p>
        <p> The Case considered: {{ finaldec }}</p>
      </b-col>
    </b-row>
    <b-row align-h="end">
      <b-col cols="4">
        <b-button
          variant="warning"
          :disabled="caseItem.length === 0"
          @click="isSidebarActive = true"
        >
          {{ caseItem.length === 0?'No Duplication' : caseItem.length +' Duplication' }}
        </b-button>
      </b-col>
    </b-row>
    <CaseDup
      :is-add-new-user-sidebar-active.sync="isSidebarActive"
    />
  </div>
</template>

<script>
/* eslint-disable global-require */
import { takeState } from 'vuex-dot'
import { mapGetters } from 'vuex'
import moment from 'moment'
import CaseDup from './SideBarDuplication.vue'

export default {
  components: {
    CaseDup,
  },
  computed: {
    link() {
      return `https://wa.me/${this.case_phone}?text=لمن يعنيه الامر، الرجاء الإحتفاظ بهذا الرمز ${this.case_code} إلى حين إستلام معدات التعقيم والتنظيف.\n
يتمنى لك فريق RDMS الشفاء العاجل`
    },
    link2() {
      return `https://maps.google.com/maps?q=${this.address_latitude},${this.address_longitude}&hl=es&z=14&amp;output=embed`
    },
    priority_period: takeState('followUpWiz', 'priority_period').map(),
    caseItem: takeState('followUpWiz', 'caseItem').map(),
    isSidebarActive: takeState('followUpWiz', 'isSidebarActive').commit('followUpWiz/ACTIVE_SIDEBAR').map(),

    ...takeState('followUpWiz', 'items')
      .expose([
        'address_latitude',
        'address_longitude'])
      .commit('followUpWiz/SET_ITEM')
      .map(),
    ...takeState('followUpWiz', 'itemsrec')
      .expose([
        'pcr_date',
        'pcr_photo',
        'pcr_photo_aprv'])
      .commit('followUpWiz/SET_ITEM_REC')
      .map(),

    ...mapGetters({
      // Global Option
      decision: 'global/decision',
      nationality: 'global/nationality',
      referral: 'global/referral',
      cadaster: 'global/municipality',
      district: 'global/district',
    }),
    ...takeState('followUpWiz', 'items')
      .expose([
        // Global
        'case_code',
        'case_id',
        'full_name',
        'case_phone',
        'created_date',
        'progress_scoring',
        'final_decision',
        'nationality_id',
        'adresstext',
        'referral_id',
        'cadastre_id',
        'district_id',
        'address_latitude',
        'address_longitude',
        'current_status',
      ])
      .commit('followUpWiz/SET_ITEM')
      .map(),
    finaldec() {
      const dff = moment(moment()).diff(this.pcr_date, 'days')
      if (this.progress_scoring >= 60 && dff < this.priority_period && dff >= 0 && this.pcr_photo != null
         && this.pcr_photo_aprv != null) {
        return 'Approved'
      }
      return 'Rejected'
    },

  },
}
</script>

<style>
.status[data-status = "Approved"]:after {

 color : green
}
.status[data-status = "Rejected"]:after {

 color : red
}

  </style>
