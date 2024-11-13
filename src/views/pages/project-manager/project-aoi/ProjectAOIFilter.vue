<template>
  <b-card
    ref="filter"
    no-body
  >
    <b-card-header class="pb-50">
      <h5>
        Filters
      </h5>
    </b-card-header>
    <b-card-body>
      <b-row>
        <!-- Gov -->
        <b-col
          cols="3"
          class="mb-2"
        >
          <label>Governorate</label>
          <v-select
            v-model="governorate"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="title"
            placeholder="Select Governorate"
            :options="governorateOption"
          />
        </b-col>
        <!-- District -->
        <b-col
          cols="3"
          class="mb-2"
        >
          <label>District</label>
          <v-select
            v-model="district"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="title"
            placeholder="Select District"

            :options="districtSelect"
            @input="value=>ChangeType(value)"
          />
        </b-col>
        <!-- Type -->
        <b-col
          cols="3"
          class="mb-2"
        >
          <label>Type</label>
          <v-select
            v-model="type"
            placeholder="Select Type"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="title"
            :clearable="false"
            :options="typeOptions"
            @input="value=>ChangeType(value)"
          />
        </b-col>
        <!-- cadaster -->
        <b-col
          cols="3"
          class="mb-2"
        >
          <label>cadaster</label>
          <v-select
            v-model="municipality"
            placeholder="Select cadaster"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="title"
            :options="municipalityOptions"
          />
        </b-col>

        <!-- Search -->
        <b-col>
          <b-button
            variant="success"
            @click="Search"
          >
            <feather-icon
              icon="SearchIcon"
              class="mr-50"
            />
            <span class="align-middle">Search</span>
          </b-button>
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
import vSelect from 'vue-select'
import { takeState } from 'vuex-dot'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    vSelect,
  },
  directives: {
    Ripple,
  },
  computed: {
    governorateOption: takeState('global', 'governorate').map(),
    districtOptions: takeState('global', 'district').map(),
    municipalityOptions: takeState('listOrgPrj', 'cadOptions').map(),
    typeOptions: takeState('global', 'type').map(),

    // Filter Values
    governorate: takeState('listOrgPrj', 'governorate').commit('listOrgPrj/SET_GOV').map(),
    district: takeState('listOrgPrj', 'district').commit('listOrgPrj/SET_DIS').map(),
    municipality: takeState('listOrgPrj', 'municipality').commit('listOrgPrj/SET_MUN').map(),
    type: takeState('listOrgPrj', 'type').commit('listOrgPrj/SET_TYPE').map(),
    infoWinOpen: takeState('listOrgPrj', 'infoWinOpen').commit('listOrgPrj/TOGGLE').map(),
    districtSelect() {
      return this.districtOptions.filter(item => item.params
      === (this.governorate != null ? this.governorate.value : null))
    },
  },
  mounted() {
    this.governorate = null
    this.district = null
    this.municipality = null
    this.infoWinOpen = false
    this.type = {
      prefix: 'RSDNTL',
      title: 'Residential Lebanese',
      title_ar: 'سكني لبناني',
      value: 1,
    }
  },
  methods: {
    clear() {
      this.rangeDate = null
    },
    ChangeType() {
      if (this.district != null && this.type != null) {
        this.$store.dispatch('listOrgPrj/GET_CAD')
      }
    },
    Search() {
      this.infoWinOpen = false
      if (this.type != null) {
        this.$store.dispatch('listOrgPrj/GET_GEO_SEARCH', {
          prefix: this.$route.params.value.proj_prefix,
        }).then(res => {
          if (res.length === 0) {
            this.$swal({
              title: 'Attention!',
              text: 'No organization assign in this Area',
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          }
        }).catch(() => {
          this.$swal({
            title: 'Attention!',
            text: 'Please check internet connection and try again',
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
          text: 'Please select Residential Type minimum',
          icon: 'warning',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
      }
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
