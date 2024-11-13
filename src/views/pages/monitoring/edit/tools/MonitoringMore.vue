<template>
  <div>
    <!-- Addressing Information -->
    <b-row>
      <b-col>
        <h5 class="mb-1 text-primary">
          Addressing Information
        </h5>
      </b-col>
    </b-row>
    <!-- Address-->
    <b-row>
      <!-- Gov -->
      <b-col>
        <p><b class="text-primary">Governorate:</b> {{ governorate }}</p>
      </b-col>
      <!-- District -->
      <b-col>
        <p><b class="text-primary">District:</b> {{ district }}</p>
      </b-col>
      <!-- Type -->
      <b-col>
        <p><b class="text-primary">Settlement Type:</b> {{ type }}</p>
      </b-col>
      <!-- Cadaster -->
      <b-col>
        <p><b class="text-primary">Cadaster:</b> {{ cadaster }}</p>
      </b-col>
      <!-- Settlement -->
      <b-col>
        <p><b class="text-primary">Settlement:</b> {{ iss }}</p>
      </b-col>
    </b-row>
    <!--  Latitude / Longitude -->
    <b-row>
      <!-- Latitude location -->
      <b-col>
        <p><b class="text-primary">Latitude:</b> <b class="text-danger">{{ lat }}</b></p>
      </b-col>
      <!-- Longitude location -->
      <b-col>
        <p><b class="text-primary">Longitude:</b> <b class="text-danger"> {{ lng }}</b></p>
      </b-col>
      <!-- Address -->
      <b-col>
        <p><b class="text-primary">Address:</b> {{ address }}</p>
      </b-col>
      <b-col />
      <b-col />
    </b-row>
    <!-- Address -->
    <!-- Approved-->
    <b-row>
      <b-col cols="8">
        <h3
          :class="address_status == true? 'text-success' : 'text-danger' "
        >
          {{ address_status == true? 'Verified' : 'Not Verified' }}
        </h3>
      </b-col>
      <b-col
        v-show="monitored"
        cols="2"
        @click="address_status= true"
      >
        <b-button
          variant="success"
          block
        >
          Verified
        </b-button>
      </b-col>
      <b-col
        v-show="monitored"
        cols="2"
        @click="address_status= false"
      >
        <b-button
          variant="danger"
          block
        >
          Not Verified
        </b-button>
      </b-col>
    </b-row>
    <hr>
    <b-row>
      <b-col>
        <h5 class="mb-1 text-primary">
          Delivery Information
        </h5>
      </b-col>
    </b-row>
    <b-row>
      <!-- Delivery Status-->
      <b-col>
        <p><b class="text-primary">Delivery Status:</b> <b class="text-danger">{{ delivery_status }}</b></p>
      </b-col>

      <!-- Latitude location -->
      <b-col>
        <p v-if="delivery_status_id !==1">
          <b class="text-primary">Delivery Latitude:</b> <b class="text-danger">{{ lat_dlv }}</b>
        </p>
      </b-col>
      <!-- Longitude location -->
      <b-col>
        <p v-if="delivery_status_id !==1">
          <b class="text-primary">Delivery Longitude:</b> <b class="text-danger">{{ lng_dlv }}</b>
        </p>
      </b-col>
      <!-- Longitude location -->
      <b-col v-if="delivery_status_id ===1">
        <p> <b>Delivery User:</b> </p><p class="text-danger">
          Not assign yet
        </p>
      </b-col>
      <b-col v-else>
        <p>
          <b class="text-primary">Delivery User:</b> {{ delivery }}:({{ delivery_org }})
        </p>
      </b-col>
    </b-row>
    <b-row>
      <!-- Delivery Comment -->
      <b-col v-if="delivery_status_id !==1">
        <p><b class="text-primary">Delivery Comment:</b> {{ delivery_comment }}</p>
      </b-col>
    </b-row>
    <br>
    <b-row>
      <b-col>
        <h3>
          Marker Details
        </h3>
        <p class="text-info">
          Blue Marker for case address
        </p>
        <p
          v-show="delivery_status_id !==1"
          class="text-success"
        >
          Green Marker for deliver address
        </p>
        <p
          v-show="delivery_status_id !==1"
          class="text-danger"
        >
          Red Marker for not deliver address
        </p>
        <p v-show="delivery_status_id !==1">
          <b class="text-info">Blue</b> /<b class="text-danger">Red</b>Marker if case address equal not deliver address
        </p>
        <p v-show="delivery_status_id !==1">
          <b class="text-info">Blue</b> /<b class="text-success">Green</b>Marker if case address equal deliver address
        </p>
      </b-col>
    </b-row>
    <b-row>
      <b-col
        lg="12"
      >
        <b-card>
          <GmapMap
            ref="mapRef"
            :center=" { lat: lat, lng: lng, }"
            :zoom="16"
            map-type-id="terrain"
            style="width: inherit; height: 600px"
          >
            <GmapMarker
              :position=" {
                lat: lat,
                lng: lng,
              }"
              :icon="icon"
              :clickable="true"
            />
            <GmapMarker
              v-show="delivery_status_id !==1"
              :position=" {
                lat: lat_dlv,
                lng: lng_dlv,
              }"
              :icon="icon_dlv"
              :clickable="true"
            />
          </GmapMap>
        </b-card>
      </b-col>
    </b-row>
    <br>
    <!-- Approved-->
    <b-row>
      <b-col cols="8">
        <h3
          :class="delivery_verify == true? 'text-success' : 'text-danger' "
        >
          {{ delivery_verify == true? 'Verified' : 'Not Verified' }}
        </h3>
      </b-col>
      <b-col
        v-show="monitored"
        cols="2"
        @click="delivery_verify= true"
      >
        <b-button
          variant="success"
          block
        >
          Verified
        </b-button>
      </b-col>
      <b-col
        v-show="monitored"
        cols="2"
        @click="delivery_verify= false"
      >
        <b-button
          variant="danger"
          block
        >
          Not Verified
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import Ripple from 'vue-ripple-directive'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { takeState } from 'vuex-dot'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      blueicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAACXBIWXMAAk6NAAJOjQFAepa8AAAGymlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIxLTA4LTEyVDAxOjAyOjI4KzAzOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIxLTA4LTEyVDE1OjA1OjAxKzAzOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMS0wOC0xMlQxNTowNTowMSswMzowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDplMTJiZWY3Zi05YmQ3LTlhNDktYWFhNS05YTliODExNWI2MmQiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDowYjk1YzFjNC1hZWQ5LTRiNDYtYTY2ZS04M2VjMTkwMDliZWIiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5NWRmMjFjOC02ZGFkLWIwNDAtYTUyMC0wNGI3ZTRlMWY3YmIiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjk1ZGYyMWM4LTZkYWQtYjA0MC1hNTIwLTA0YjdlNGUxZjdiYiIgc3RFdnQ6d2hlbj0iMjAyMS0wOC0xMlQwMTowMjoyOCswMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDphY2RmYTY1Yy1iZDVhLWUwNDktODgxZi03MWM3YTllOTI1MGEiIHN0RXZ0OndoZW49IjIwMjEtMDgtMTJUMDE6MDI6MjgrMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZTEyYmVmN2YtOWJkNy05YTQ5LWFhYTUtOWE5YjgxMTViNjJkIiBzdEV2dDp3aGVuPSIyMDIxLTA4LTEyVDE1OjA1OjAxKzAzOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+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',
      greenicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAACXBIWXMAAk6NAAJOjQFAepa8AAAGymlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIxLTA4LTEyVDAxOjAyOjI4KzAzOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIxLTA4LTEyVDE1OjA0OjI1KzAzOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMS0wOC0xMlQxNTowNDoyNSswMzowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpjNGExMTFjMC05MDk1LTlkNGQtYjZiYy02NjJmODFiYjY5NDkiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDowZjNlODQxNS1kNDc4LTFkNGQtOWU2MC02ZmVkMjA4YTZlNjQiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5NWRmMjFjOC02ZGFkLWIwNDAtYTUyMC0wNGI3ZTRlMWY3YmIiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjk1ZGYyMWM4LTZkYWQtYjA0MC1hNTIwLTA0YjdlNGUxZjdiYiIgc3RFdnQ6d2hlbj0iMjAyMS0wOC0xMlQwMTowMjoyOCswMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDphY2RmYTY1Yy1iZDVhLWUwNDktODgxZi03MWM3YTllOTI1MGEiIHN0RXZ0OndoZW49IjIwMjEtMDgtMTJUMDE6MDI6MjgrMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YzRhMTExYzAtOTA5NS05ZDRkLWI2YmMtNjYyZjgxYmI2OTQ5IiBzdEV2dDp3aGVuPSIyMDIxLTA4LTEyVDE1OjA0OjI1KzAzOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+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',
      redicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAACXBIWXMAAk6NAAJOjQFAepa8AAAGymlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIxLTA4LTEyVDAxOjAyOjI4KzAzOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIxLTA4LTEyVDE1OjA0OjEyKzAzOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMS0wOC0xMlQxNTowNDoxMiswMzowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxYjEzNGYwYy1kYmUwLTkyNGQtYjFlNy01YTAyYjQ1OTNkNzciIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoyN2I4YWViYy04YjcxLTkzNGEtYWZkZC0yOWNlYTAyY2U4N2IiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5NWRmMjFjOC02ZGFkLWIwNDAtYTUyMC0wNGI3ZTRlMWY3YmIiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjk1ZGYyMWM4LTZkYWQtYjA0MC1hNTIwLTA0YjdlNGUxZjdiYiIgc3RFdnQ6d2hlbj0iMjAyMS0wOC0xMlQwMTowMjoyOCswMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDphY2RmYTY1Yy1iZDVhLWUwNDktODgxZi03MWM3YTllOTI1MGEiIHN0RXZ0OndoZW49IjIwMjEtMDgtMTJUMDE6MDI6MjgrMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MWIxMzRmMGMtZGJlMC05MjRkLWIxZTctNWEwMmI0NTkzZDc3IiBzdEV2dDp3aGVuPSIyMDIxLTA4LTEyVDE1OjA0OjEyKzAzOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+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',
      blueRedicon: 'iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAACXBIWXMAAk6NAAJOjQFAepa8AAAHZmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDYgNzkuZGFiYWNiYiwgMjAyMS8wNC8xNC0wMDozOTo0NCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMS0wOC0xMlQwMTowMjoyOCswMzowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0xMi0yNVQxNDoxODo0MCswMjowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjEtMTItMjVUMTQ6MTg6NDArMDI6MDAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDEwMGY3MzUtNTNlNy03ZDQ3LWIxMWEtMjFmNDA3M2EzMWFhIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YTM2MjExN2ItMGYxYS03NDQ4LWJhY2UtNjVkNGNmMTQzNDRmIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6OTVkZjIxYzgtNmRhZC1iMDQwLWE1MjAtMDRiN2U0ZTFmN2JiIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo5NWRmMjFjOC02ZGFkLWIwNDAtYTUyMC0wNGI3ZTRlMWY3YmIiIHN0RXZ0OndoZW49IjIwMjEtMDgtMTJUMDE6MDI6MjgrMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YWNkZmE2NWMtYmQ1YS1lMDQ5LTg4MWYtNzFjN2E5ZTkyNTBhIiBzdEV2dDp3aGVuPSIyMDIxLTA4LTEyVDAxOjAyOjI4KzAzOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjQxMDBmNzM1LTUzZTctN2Q0Ny1iMTFhLTIxZjQwNzNhMzFhYSIgc3RFdnQ6d2hlbj0iMjAyMS0xMi0yNVQxNDoxODo0MCswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjQgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8cGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPiA8cmRmOkJhZz4gPHJkZjpsaT5hZG9iZTpkb2NpZDpwaG90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',
      blueGreenicon: 'iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAACXBIWXMAAk6NAAJOjQFAepa8AAAHZmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDYgNzkuZGFiYWNiYiwgMjAyMS8wNC8xNC0wMDozOTo0NCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMS0wOC0xMlQwMTowMjoyOCswMzowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0xMi0yNVQxNDozNjo1NiswMjowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjEtMTItMjVUMTQ6MzY6NTYrMDI6MDAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjE3NzQ4NjEtODFkMy1iOTQzLTljMzItZjkwNDE2YTM5YmU4IiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NjNmMDkzYjgtNzA0ZC1iYjRiLTg0MjAtOTI5MjRlNjdkMDAyIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6OTVkZjIxYzgtNmRhZC1iMDQwLWE1MjAtMDRiN2U0ZTFmN2JiIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo5NWRmMjFjOC02ZGFkLWIwNDAtYTUyMC0wNGI3ZTRlMWY3YmIiIHN0RXZ0OndoZW49IjIwMjEtMDgtMTJUMDE6MDI6MjgrMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YWNkZmE2NWMtYmQ1YS1lMDQ5LTg4MWYtNzFjN2E5ZTkyNTBhIiBzdEV2dDp3aGVuPSIyMDIxLTA4LTEyVDAxOjAyOjI4KzAzOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjYxNzc0ODYxLTgxZDMtYjk0My05YzMyLWY5MDQxNmEzOWJlOCIgc3RFdnQ6d2hlbj0iMjAyMS0xMi0yNVQxNDozNjo1NiswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjQgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8cGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPiA8cmRmOkJhZz4gPHJkZjpsaT5hZG9iZTpkb2NpZDpwaG90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',
    }
  },
  computed: {
    ///
    monitored: takeState('monitoringView', 'monitored').map(),

    governorate: takeState('monitoringView', 'governorate').map(),
    district: takeState('monitoringView', 'district').map(),
    type: takeState('monitoringView', 'type').map(),
    cadaster: takeState('monitoringView', 'cadaster').map(),
    iss: takeState('monitoringView', 'iss').map(),
    lat: takeState('monitoringView', 'lat').map(),
    lng: takeState('monitoringView', 'lng').map(),
    lat_dlv: takeState('monitoringView', 'lat_dlv').map(),
    lng_dlv: takeState('monitoringView', 'lng_dlv').map(),
    address: takeState('monitoringView', 'address').map(),
    delivery: takeState('monitoringView', 'delivery').map(),
    delivery_org: takeState('monitoringView', 'delivery_org').map(),
    delivery_comment: takeState('monitoringView', 'delivery_comment').map(),
    delivery_status: takeState('monitoringView', 'delivery_status').map(),
    delivery_verify: takeState('monitoringView', 'delivery_verify').commit('monitoringView/SET_DELIVERY_STATUS').map(),
    delivery_status_id: takeState('monitoringView', 'delivery_status_id').map(),
    address_status: takeState('monitoringView', 'address_status').commit('monitoringView/SET_ADDRESS_STATUS').map(),
    icon() {
      return {
        url: (this.lat === this.lat_dlv && this.lng === this.lng_dlv) ? this.blueRedicon : this.blueicon, // url
        /* scaledSize: this.google && new window.google.maps.Size(28, 28),
        labelOrigin: this.google && new window.google.maps.Point(16, -10), */
        scaledSize: { width: 45, height: 45 },
        labelOrigin: { x: 16, y: -10 },
      }
    },
    icon_dlv() {
      return {
        url: (this.lat === this.lat_dlv && this.lng === this.lng_dlv) ? this.redicon : this.greenicon, // url
        /* scaledSize: this.google && new window.google.maps.Size(28, 28),
        labelOrigin: this.google && new window.google.maps.Point(16, -10), */
        scaledSize: { width: 45, height: 45 },
        labelOrigin: { x: 16, y: -10 },
      }
    },
  },
  methods: {

  },

}
</script>
