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
          cols="4"
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
          cols="4"
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
        <!-- Type
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
        </b-col>-->
        <!-- cadaster -->
        <b-col
          cols="4"
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

      </b-row>
      <b-row align-h="end">
        <!-- Search -->
        <b-col cols="2">
          <b-button
            variant="success"
            block
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
    municipalityOptions: takeState('dataCollectGeo', 'cadOptions').map(),
    typeOptions: takeState('global', 'type').map(),

    // Filter Values
    governorate: takeState('dataCollectGeo', 'governorate').commit('dataCollectGeo/SET_GOV').map(),
    district: takeState('dataCollectGeo', 'district').commit('dataCollectGeo/SET_DIS').map(),
    municipality: takeState('dataCollectGeo', 'cadaster').commit('dataCollectGeo/SET_CAD').map(),
    type: takeState('dataCollectGeo', 'type').commit('dataCollectGeo/SET_TYPE').map(),
    districtSelect() {
      return this.districtOptions.filter(item => item.params
      === (this.governorate != null ? this.governorate.value : null))
    },
  },
  mounted() {
    this.governorate = null
    this.district = null
    this.municipality = null
    this.type = 4
  },
  methods: {
    clear() {
      this.rangeDate = null
    },
    ChangeType() {
      if (this.district != null) {
        this.$store.dispatch('dataCollectGeo/GET_CAD')
      }
    },
    Search() {
      if (this.municipality != null) {
        this.$store.dispatch('dataCollectGeo/GET_DATA').then(res => {
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
          text: 'Please select Cadaster minimum',
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
