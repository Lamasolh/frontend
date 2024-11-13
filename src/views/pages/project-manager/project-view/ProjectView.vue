<template>
  <b-overlay
    :show="show"
    rounded="sm"
  >
    <b-card>
      <div>
        <b-form
          ref="form"
          class="repeater-form"
        >
          <!-- Main: General Info -->
          <div>
            <!-- Header: General Info -->
            <div class="d-flex">
              <feather-icon
                icon="InfoIcon"
                size="19"
              />
              <h4 class="mb-0 ml-50">
                General Information
              </h4>
            </div>
            <br>
            <!--General Info -->
            <b-row ref="row">
              <!-- Name -->
              <b-col md="3">
                <b-form-group label="Name">
                  <b-form-input
                    :id="'name'"
                    v-model="projName"
                    type="text"
                    readonly
                    disabled
                    placeholder="Enter Name"
                  />
                </b-form-group>
              </b-col>
              <!-- Prefix -->
              <b-col md="3">
                <b-form-group label="Prefix">
                  <b-form-input
                    :id="'prefix'"
                    v-model="prefix"
                    type="text"
                    readonly
                    disabled
                  />
                </b-form-group>
              </b-col>
              <!--  Sector-->
              <b-col md="6">
                <b-form-group label="Sector">
                  <b-form-input
                    :id="'sector'"
                    v-model="sector"
                    readonly
                    disabled
                    :name="'sector'"
                  />
                </b-form-group>
              </b-col>
              <!-- Type -->
              <b-col md="3">
                <b-form-group label="Type">
                  <b-form-input
                    :id="'type'"
                    v-model="type"
                    type="text"
                    readonly
                    disabled
                  />
                </b-form-group>
              </b-col>
              <!-- status -->
              <b-col md="3">
                <b-form-group label="status">
                  <b-form-input
                    :id="'prefix'"
                    v-model="prefix"
                    type="text"
                    readonly
                    disabled
                  />
                </b-form-group>
              </b-col>
              <!-- createDate -->
              <b-col md="6">
                <b-form-group label="Created Date">
                  <b-form-input
                    :id="'createDate'"
                    v-model="createDate"
                    type="text"
                    readonly
                    disabled
                  />
                </b-form-group>
              </b-col>
              <!--  Description-->
              <b-col md="12">
                <b-form-group label="Description">
                  <b-form-input
                    :id="'description'"
                    v-model="description"
                    readonly
                    disabled
                    :name="'description1'"
                    placeholder="Enter Description"
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <br>
            <hr>
            <!-- Header: General Info -->
            <div class="d-flex">
              <feather-icon
                icon="InfoIcon"
                size="19"
              />
              <h4 class="mb-0 ml-50">
                Geo Map
              </h4>
            </div>
            <b-row>
              <b-col lg="12">
                <b-card>
                  <GmapMap
                    ref="mapRef"
                    :center="centerMap"
                    :zoom="centerMap.zoom"
                    map-type-id="terrain"
                    style="width: inherit; height: 600px"
                  >
                    <GmapMarker
                      v-for="(m, index) in marker"
                      v-show="marker.length > 0"
                      :key="m.id"
                      :position="m.position"
                      :clickable="true"
                      :icon="m.icon"
                      @mouseover="toggleInfoWindow(m, index)"
                      @mouseout="untoggleInfoWindow(m, index)"
                    />
                    <gmap-info-window
                      v-for="(pos, i) in infoWindowPos"
                      :key="pos.lat"
                      :position="{ lat: pos.lat, lng: pos.lng }"
                      :options="{
                        content: infoWindowText[i],
                        pixelOffset: {
                          width: 0,
                          height: -35
                        }
                      }"
                      :opened="infoWinOpen"
                      @closeclick="infoWinOpen = false"
                    />
                  </GmapMap>
                </b-card>
              </b-col>
            </b-row>
          </div>
          <b-row>
            <b-col cols="2">
              <b-button
                variant="warning"
                @click="RouteEdit"
              >
                Go To Role
              </b-button>
            </b-col>
            <b-col cols="2">
              <b-button
                variant="info"
                @click="RouteSearch"
              >
                Go To Search
              </b-button>
            </b-col>
          </b-row>
        </b-form>
      </div>
    </b-card>
  </b-overlay>
</template>
<script>
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

import { takeState } from 'vuex-dot'

export default {
  data() {
    return {
      mapOptions: {
        disableDefaultUI: true,
      },
      ItemTable: [],
      marker: [],
      infoWindowPos: [],
      infoWindowText: [],
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        content: '',
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
      centerMap: { lat: 33.8547, lng: 35.8623, zoom: 8 },
    }
  },
  computed: {
    show: takeState('listOrgPrj', 'show').commit('listOrgPrj/SET_SHOW').map(),
    projName() {
      return this.$route.params.value.proj_name
    },
    prefix() {
      return this.$route.params.value.proj_prefix
    },
    type() {
      return this.$route.params.value.proj_type_name
    },
    status() {
      return this.$route.params.value.proj_status_name
    },
    sector() {
      return this.$route.params.value.org_name
    },
    createDate() {
      return this.$route.params.value.proj_date
    },
    description() {
      return this.$route.params.value.description
    },
    markers() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties

      // eslint-disable-next-line vue/no-side-effects-in-computed-properties

      return this.marker
    },
  },
  mounted() {
    this.ResetData()
  },
  methods: {
    toggleInfoWindow(marker, idx) {
      this.infoWindowPos = []
      this.infoWindowText = []
      this.infoWindowPos.push(marker.position)
      this.infoWindowText.push(marker.infoText)
      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen
      } else {
        this.infoWinOpen = true
        this.currentMidx = idx
      }
      console.log(this.infoOptions.content)
    },
    untoggleInfoWindow(marker, idx) {
      this.infoWinOpen = false
      this.infoWindowPos.splice(this.infoWindowPos.indexOf(idx), 1)
      this.infoWindowText.splice(this.infoWindowText.indexOf(idx), 1)
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
    RouteEdit() {
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
        name: 'menuEdit',
        params: {
          action: 'read',
          breadcrumb: nav,
          active: true,
          prefix: this.$route.params.prefixPrj,
          prefixRole: this.$route.params.prefixRole,
          title: 'Project EDIT',
          resource: 'PRJKTS',
          entity: this.$route.params.value.referal_entity === 1,
          value: this.$route.params.value,
        },
      })
    },
    ResetData() {
      this.marker = []
      this.$store.dispatch('listOrgPrj/GET_GEO', {
        prefix: this.$route.params.value.proj_prefix,
      }).then(res => {
        res.forEach(el => {
          this.marker.push({
            infoText: `<b>${el.marker_name}</b><br>Residential Type: ${el.type_name}`,
            icon: {
              url: require(`@/assets/images/markers/marker_${el.type}_2.png`), // url
              scaledSize: this.google && new window.google.maps.Size(28, 28),
              labelOrigin: this.google && new window.google.maps.Point(16, -10),
            },
            id: el.marker_id,
            type: el.type,
            type_name: el.type_name,
            status: 'readonly',
            position: {
              lat: el.latitude,
              lng: el.longitude,
            },
          })
        })
      })
    },
  },
}
</script>
