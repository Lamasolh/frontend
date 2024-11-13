<template>
  <b-card
    ref="list"
  >
    <GmapMap
      ref="mapRef"
      :center="center"
      :zoom="zoom"
      :options="{minZoom: 8}"
      map-type-id="terrain"
      style="width: inherit; height: 600px"
      @zoom_changed="zoomChanged"
    >
      <GmapMarker
        v-for="(m, index) in marker"
        v-show="marker.length>0"
        :key="index"
        :position="m.position"
        :clickable="true"
        :icon="m.icon"
        @click="toggleInfoWindow(m,index)"
      />
      <gmap-info-window
        v-show="marker.length>0"
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false"
      />
    </GmapMap>
    <br>
  </b-card>
</template>

<script>
import { takeState } from 'vuex-dot'
import { gmapApi } from 'vue2-google-maps'

export default {
  data() {
    return {
      colors: 'rgb(200, 200, 200)',
      center: { lat: 33.8547, lng: 35.8623 },
      zoom: 5,
      infoWindowPos: null,
      currentMidx: null,
      infoOptions: {
        content: '',
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
    }
  },
  computed: {
    show: takeState('searchPrj', 'show').commit('searchPrj/SET_SHOW').map(),
    marker: takeState('searchPrj', 'orgMarker').commit('searchPrj/SET_MARKER_ITEM').map(),
    infoWinOpen: takeState('searchPrj', 'infoWinOpen').commit('searchPrj/TOGGLE').map(),
    // Table Data
    google: gmapApi,
  },
  mounted() {
    this.$store.commit('searchPrj/CLEAR_MARKER_ITEM')
  },
  methods: {
    zoomChanged(value) {
      this.zoom = value
      this.marker.forEach((element, index) => {
        const newMarker = {
          infoText: element.infoText,
          id: element.id,
          icon: {
            url: element.icon.url, // url
            size: new window.google.maps.Size(40, 40),
            scaledSize: new window.google.maps.Size(40, 40),
          },
          position: {
            lat: parseFloat(element.position.lat),
            lng: parseFloat(element.position.lng),
          },
        }
        this.$store.commit('searchPrj/REM_ORG_ITEM', index)
        this.$store.commit('searchPrj/SET_ORG_ITEM', newMarker)
      })
    },
    toggleInfoWindow(marker, idx) {
      this.infoWindowPos = marker.position
      this.infoOptions.content = marker.infoText
      // check if its the same marker that was selected if yes toggle
      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen
      } else {
        this.infoWinOpen = true
        this.currentMidx = idx
      }
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
          value: this.$route.params.value,
        },
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
