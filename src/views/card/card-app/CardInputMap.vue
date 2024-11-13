<template>
  <validation-provider
    #default="{ errors }"
    rules="required"
    :name="title"
    data-vv-delay="100"
  >
    <div class="d-flex flex-wrap align-content-between">
      <div class="order-1 p-2">
        <GmapMap
          ref="mapRef"
          :center="center"
          :zoom="8"
          map-style-id="roadmap"
          :options="mapOptions"
          class="gmap"
          @click="handleMapClick"
        >
          <GmapMarker
            :position="marker.position"
            :clickable="true"
            :draggable="true"
            @drag="handleMarkerDrag"
            @click="panToMarker"
          />
        </GmapMap>
        <small class="text-danger">{{ errors[0] }}</small>
        <br>
        <button
          type="button"
          class="btn btn-primary noprint"
          @click="geolocate"
        >
          Detect Location
        </button>
      </div>
      <div class="order-2 p-2">
        <b-form-group>
          <h4>خط الطول</h4>
          <card-input-text
            id="lat"
            title="خط الطول"
            rule="required"
          />
          <br>
          <h4>خط العرض</h4>
          <card-input-text
            id="long"
            title="خط العرض"
            rule="required"
          />
        </b-form-group>
      </div>
    </div>
  </validation-provider>
</template>
<script>
import { ValidationProvider } from 'vee-validate'
import {
  BFormGroup,
} from 'bootstrap-vue'
import CardInputText from './CardInputText.vue'

export default {
  components: {
    ValidationProvider,
    CardInputText,
    BFormGroup,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
      default: null,
    },
    value: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      marker: { position: { lat: 33.8547, lng: 35.8623 } },
      center: { lat: 33.8547, lng: 35.8623 },
      mapOptions: {
        disableDefaultUI: true,
      },
    }
  },
  computed: {
    getvalue: {
    // getter
      get() {
        return [{ lat: this.lat, long: this.long }]
      },
      // setter
      set() {
        return [{ lat: this.lat, long: this.long }]
      },
    },
  },
  mounted() {
    this.geolocate()
  },
  methods: {
    geolocate() {
      navigator.geolocation.getCurrentPosition(position => {
        this.marker.position = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        this.panToMarker()
      })
    },
    // sets the position of marker when dragged
    handleMarkerDrag(e) {
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() }
    },
    // Moves the map view port to marker
    panToMarker() {
      this.$refs.mapRef.panTo({ lat: this.marker.position.lat, lng: this.marker.position.lng })
    },
    // Moves the marker to click position on the map
    handleMapClick(e) {
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() }
    },
  },
}
</script>
<style scoped>
@media only screen and (max-width: 200px) {
.gmap{
display: none;}
}
@media only screen and (max-width: 320px) {
.gmap{
width: 12rem; height: 20rem
}
}
@media only screen and (max-width: 480px) {
.gmap{
width: 36rem; height: 25rem
}
}
.gmap{
width: 30rem; height: 20rem
}
</style>
