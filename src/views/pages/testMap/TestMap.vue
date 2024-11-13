<template>
  <b-card>
    <b-row>
      <b-col cols="3">
        <h1>Select Color</h1>
        <swatches-picker v-model="colors" />
      </b-col>
      <b-col cols="2">
        <h1>Select Image</h1>
        <b-button
          variant="success"
          block
          @click="toggleShow"
        >
          Upload
        </b-button>
        <img :src="image">
        <my-upload
          v-model="show"
          field="img"
          :width="200"
          :height="200"
          :params="params"
          lang-type="en"
          :src-file-set="srcFileSet"
          :headers="headers"
          img-format="png"
          :no-rotate="false"
          @crop-success="cropSuccess"
          @crop-upload-success="cropUploadSuccess"
          @crop-upload-fail="cropUploadFail"
        />
      </b-col>
      <b-col cols="2">
        <h1>Data</h1>
        <p> {{ colors.hsl }}</p>
      </b-col>
      <b-col cols="2">
        <h5>Lat</h5>
        <b-input v-model="lat" />
        <h5>long</h5>
        <b-input v-model="long" />
      </b-col>
      <b-col
        cols="auto"
      >
        <b-button
          variant="primary"
          block
          @click="AddMarker(true)"
        >
          Add Marker With Color
        </b-button>
        <br>
        <br>
        <b-button
          variant="success"
          block
          @click="AddMarker(false)"
        >
          Add Marker With Image
        </b-button>
      </b-col>
    </b-row>
    <GmapMap
      ref="mapRef"
      :center="center"
      :zoom="zoom"
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
      />
    </GmapMap>
  </b-card>
</template>

<script>
import { takeState } from 'vuex-dot'
import { Swatches } from 'vue-color'
import myUpload from 'vue-image-crop-upload/upload-2.vue'
import { gmapApi } from 'vue2-google-maps'
import SvgIcon from './marker'
import SvgImage from './markerImage'

export default {
  components: {
    'swatches-picker': Swatches,
    myUpload,
  },
  data() {
    return {
      colors: 'rgb(200, 200, 200)',
      lat: 0.0,
      long: 0.0,
      center: { lat: 0, lng: 0 },
      zoom: 5,
      ItemTable: [],
      marker: [],
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,
      show: false,
      file: null,
      params: {
        token: '123456798',
        name: 'avatar',
      },
      headers: {
        smail: '*_~',
      },
      image: '',
      imgDataUrl: '',
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
    saved: takeState('geoSplit', 'saved').commit('geoSplit/SET_SAVED').map(),
    google: gmapApi,
  },
  mounted() {

  },
  methods: {
    async AddMarker(iscolor) {
      this.marker.push({
        icon: {
          url: iscolor ? await SvgIcon(this.colors) : await SvgImage(this.image), // url
          /* size: window.google.maps.Size(36, 50),
          scaledSize: window.google.maps.Size(36, 50), */
          size: new window.google.maps.Size(50, 50),
          scaledSize: new window.google.maps.Size(this.zoom * 10, this.zoom * 10),
          labelOrigin: this.google && new window.google.maps.Point(16, -10),
          anchor: new window.google.maps.Point(0, 50),
        },
        position: {
          lat: parseInt(this.lat, 10),
          lng: parseInt(this.long, 10),
        },
      })
    },
    changeColor(color) {
      const {
        r, g, b,
      } = color.rgba
      this.color = `rgb(${r}, ${g}, ${b})`
    },
    openSucker(isOpen) {
      if (isOpen) {
        // ... canvas be created
        // this.suckerCanvas = canvas
        // this.suckerArea = [x1, y1, x2, y2]
      } else {
        // this.suckerCanvas && this.suckerCanvas.remove
      }
    },
    zoomChanged(value) {
      console.log(value)
      this.zoom = value
      this.marker.forEach((element, index) => {
        const newMarker = {
          icon: {
            url: element.icon.url, // url
            scaledSize: new window.google.maps.Size(value * 10, value * 10),
            labelOrigin: new window.google.maps.Point(element.icon.labelOrigin.width, element.icon.labelOrigin.height),
          },
          position: {
            lat: parseInt(element.position.lat, 10),
            lng: parseInt(element.position.lng, 10),
          },
        }
        this.marker.splice(index, 1)
        this.marker.push(newMarker)
        console.log(element)
      })
    },
    srcFileSet(fileName, fileType, fileSize) {
      console.log('-------- upload fail --------')
      console.log(`fileName: ${fileName}`)
      console.log(`fileType: ${fileType}`)
      console.log(`fileSize: ${fileSize}`)
    },
    cropUploadFail(status, field) {
      console.log('-------- upload fail --------')
      console.log(status)
      console.log(`field: ${field}`)
    },
    cropUploadSuccess(jsonData, field) {
      console.log('-------- upload success --------')
      console.log(jsonData)
      console.log(`field: ${field}`)
    },
    cropSuccess(imgDataUrl) {
      console.log('-------- crop success --------')
      this.image = imgDataUrl
    },
    toggleShow() {
      this.show = !this.show
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
