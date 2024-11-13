<template>
    <div ref="GSPLT">
        <b-overlay rounded="lg" :show="show">
            <GeoSplitFilter />
            <b-card>
                <b-row>
                    <b-col lg="7">
                        <GeoSplitList @changeItem="ItemChange" />
                    </b-col>
                    <b-col lg="5">
                        <GeoAssTo />
                    </b-col>
                </b-row>
                <b-row align-h="between">
                    <b-col cols="2">
                        <b-button v-show="$route.params.assmnttype !== '2'" pill block variant="info"
                            @click="AssignToOrg">
                            Assign To Sector
                        </b-button>
                    </b-col>
                    <b-col cols="2">
                        <b-button pill block variant="primary" @click="AssignToUser">
                            Assign Selected
                        </b-button>
                    </b-col>
                </b-row>
            </b-card>
            <b-row>
                <b-col lg="12">
                    <b-card>
                        <GmapMap ref="mapRef" :center="center" :zoom="center.zoom" map-type-id="terrain"
                            style="width: inherit; height: 600px">
                            <GmapMarker v-for="(m, index) in markers" v-show="markers.length > 0" :key="index"
                                :label="m.full_name" :position="m.position" :clickable="true" :icon="m.icon"
                                @click="toggleInfoWindow(m, index)" />
                            <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen"
                                @closeclick="infoWinOpen = false" />
                        </GmapMap>
                    </b-card>
                </b-col>
            </b-row>
        </b-overlay>
    </div>
</template>

<script>
import { takeState } from 'vuex-dot'
import store from '@/store'
import GeoSplitFilter from './GeoSplitFilter.vue'
import GeoSplitList from './GeoSplitList.vue'
import GeoAssTo from './GeoSplitAsignTo.vue'

export default {
    components: {
        GeoSplitFilter,
        GeoSplitList,
        GeoAssTo,
    },
    data() {
        return {
            mapOptions: {
                disableDefaultUI: true,
            },
            ItemTable: [],
            marker: [],
            infoWindowPos: null,
            infoWinOpen: false,
            currentMidx: null,
            blueicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAACXBIWXMAAk6NAAJOjQFAepa8AAAGymlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIxLTA4LTEyVDAxOjAyOjI4KzAzOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIxLTA4LTEyVDE1OjA1OjAxKzAzOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMS0wOC0xMlQxNTowNTowMSswMzowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDplMTJiZWY3Zi05YmQ3LTlhNDktYWFhNS05YTliODExNWI2MmQiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDowYjk1YzFjNC1hZWQ5LTRiNDYtYTY2ZS04M2VjMTkwMDliZWIiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5NWRmMjFjOC02ZGFkLWIwNDAtYTUyMC0wNGI3ZTRlMWY3YmIiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjk1ZGYyMWM4LTZkYWQtYjA0MC1hNTIwLTA0YjdlNGUxZjdiYiIgc3RFdnQ6d2hlbj0iMjAyMS0wOC0xMlQwMTowMjoyOCswMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDphY2RmYTY1Yy1iZDVhLWUwNDktODgxZi03MWM3YTllOTI1MGEiIHN0RXZ0OndoZW49IjIwMjEtMDgtMTJUMDE6MDI6MjgrMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZTEyYmVmN2YtOWJkNy05YTQ5LWFhYTUtOWE5YjgxMTViNjJkIiBzdEV2dDp3aGVuPSIyMDIxLTA4LTEyVDE1OjA1OjAxKzAzOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+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',
            greenicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAACXBIWXMAAk6NAAJOjQFAepa8AAAGymlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIxLTA4LTEyVDAxOjAyOjI4KzAzOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIxLTA4LTEyVDE1OjA0OjI1KzAzOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMS0wOC0xMlQxNTowNDoyNSswMzowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpjNGExMTFjMC05MDk1LTlkNGQtYjZiYy02NjJmODFiYjY5NDkiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDowZjNlODQxNS1kNDc4LTFkNGQtOWU2MC02ZmVkMjA4YTZlNjQiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5NWRmMjFjOC02ZGFkLWIwNDAtYTUyMC0wNGI3ZTRlMWY3YmIiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjk1ZGYyMWM4LTZkYWQtYjA0MC1hNTIwLTA0YjdlNGUxZjdiYiIgc3RFdnQ6d2hlbj0iMjAyMS0wOC0xMlQwMTowMjoyOCswMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDphY2RmYTY1Yy1iZDVhLWUwNDktODgxZi03MWM3YTllOTI1MGEiIHN0RXZ0OndoZW49IjIwMjEtMDgtMTJUMDE6MDI6MjgrMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YzRhMTExYzAtOTA5NS05ZDRkLWI2YmMtNjYyZjgxYmI2OTQ5IiBzdEV2dDp3aGVuPSIyMDIxLTA4LTEyVDE1OjA0OjI1KzAzOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+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',
            redicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAACXBIWXMAAk6NAAJOjQFAepa8AAAGymlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIxLTA4LTEyVDAxOjAyOjI4KzAzOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIxLTA4LTEyVDE1OjA0OjEyKzAzOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMS0wOC0xMlQxNTowNDoxMiswMzowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxYjEzNGYwYy1kYmUwLTkyNGQtYjFlNy01YTAyYjQ1OTNkNzciIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoyN2I4YWViYy04YjcxLTkzNGEtYWZkZC0yOWNlYTAyY2U4N2IiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5NWRmMjFjOC02ZGFkLWIwNDAtYTUyMC0wNGI3ZTRlMWY3YmIiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjk1ZGYyMWM4LTZkYWQtYjA0MC1hNTIwLTA0YjdlNGUxZjdiYiIgc3RFdnQ6d2hlbj0iMjAyMS0wOC0xMlQwMTowMjoyOCswMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDphY2RmYTY1Yy1iZDVhLWUwNDktODgxZi03MWM3YTllOTI1MGEiIHN0RXZ0OndoZW49IjIwMjEtMDgtMTJUMDE6MDI6MjgrMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MWIxMzRmMGMtZGJlMC05MjRkLWIxZTctNWEwMmI0NTkzZDc3IiBzdEV2dDp3aGVuPSIyMDIxLTA4LTEyVDE1OjA0OjEyKzAzOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+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',
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
        show: takeState('geoSplit', 'show').commit('geoSplit/SET_SHOW').map(),
        saved: takeState('geoSplit', 'saved').commit('geoSplit/SET_SAVED').map(),
        items: takeState('geoSplit', 'caseItem').commit('geoSplit/SET_ITEM').map(),
        selectedCase: takeState('geoSplit', 'selectedCase').commit('geoSplit/SET_SELECT_ITEM').map(),
        center: takeState('geoSplit', 'centerMap').commit('geoSplit/SET_MAP_CENTER').map(),
        caseItem: takeState('geoSplit', 'caseItem').map(),
        UsersItem: takeState('geoSplit', 'userItem').map(),
        markers() {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.marker = []
            this.ItemTable.forEach(el => {
                if (this.selectedCase.filter(it => it.case_id === el.case_id).length === 0) {
                    this.marker.push({
                        type: 'case',
                        infoText: `<b>Case Name:</b>${el.full_name}<br><b>Address:</b>${el.adresstext}`,
                        icon: {
                            url: this.redicon, // url
                            scaledSize: this.google && new window.google.maps.Size(28, 28),
                            labelOrigin: this.google && new window.google.maps.Point(16, -10),
                        },
                        case_id: el.case_id,
                        position: {
                            lat: el.address_latitude,
                            lng: el.address_longitude,
                        },
                    })
                }
            })
            this.selectedCase.forEach(el => {
                this.marker.push({
                    type: 'selected',
                    infoText: `<b>Case Name:</b>${el.full_name}<br><b>Address:</b>${el.adresstext}`,
                    icon: {
                        url: this.blueicon, // url
                        scaledSize: this.google && new window.google.maps.Size(28, 28),
                        labelOrigin: this.google && new window.google.maps.Point(16, -10),
                        // scaledSize: { width: 28, height: 28 },
                        // labelOrigin: { x: 16, y: -10 },
                    },
                    case_id: el.case_id,
                    position: {
                        lat: el.address_latitude,
                        lng: el.address_longitude,
                    },
                })
            })
            this.UsersItem.forEach(el => {
                this.marker.push({
                    type: 'users',
                    infoText: `<b>Case Name:</b>${el.full_name}<br><b>Address:</b>${el.adresstext}<br>`,
                    icon: {
                        url: this.greenicon,
                        scaledSize: this.google && new window.google.maps.Size(28, 28),
                        labelOrigin: this.google && new window.google.maps.Point(16, -10),
                        // scaledSize: { width: 28, height: 28 },
                        // labelOrigin: { x: 16, y: -10 },
                    },
                    case_id: el.case_id,
                    position: {
                        lat: el.address_latitude,
                        lng: el.address_longitude,
                    },
                })
            })
            return this.marker
        },
        UserValue: {
            get() {
                return store.getters['geoSplit/usersValue']
            },
            set(value) {
                console.log(this.$route)
                console.log(this.$route)
                store
                    .dispatch('geoSplit/GET_USER', {
                        prefix: this.$route.params.prefixPrj,
                        value,
                        type: this.$route.params.assmnttype,

                    })
            },
        },
    },
    mounted() {
        this.ResetData()
    },
    methods: {
        ItemChange(value) {
            this.ItemTable = value
        },
        AssignToOrg() {
            if (this.selectedCase.length === 0) {
                this.$swal({
                    title: 'Attention!',
                    text: 'Please select cases!',
                    icon: 'warning',
                    customClass: {
                        confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false,
                })
            } else {
                this.$swal({
                    title: 'Case Confirmation!',
                    text: 'Are you sure you want to send The case to sector?',
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonText: 'Yes!',
                    customClass: {
                        confirmButton: 'btn btn-primary',
                        cancelButton: 'btn btn-outline-danger ml-1',
                    },
                    buttonsStyling: false,
                }).then(result => {
                    if (result.value) {
                        store
                            .dispatch('geoSplit/SEND_TO_SECTOR', {
                                prefix: this.$route.params.prefixPrj,
                                prefixRole: this.$route.params.prefixRole,
                                type: this.$route.params.assmnttype,

                            })
                            .then(resu => {
                                console.log(resu)
                                this.$swal({
                                    title: 'Result!',
                                    html: 'Operation Successfully',
                                    customClass: {
                                        confirmButton: 'btn btn-primary',
                                    },
                                    buttonsStyling: false,
                                })
                            })
                            .catch(() => {
                                this.$swal({
                                    title: 'Attention!',
                                    text: 'Please check internet connection and try again!',
                                    icon: 'warning',
                                    customClass: {
                                        confirmButton: 'btn btn-primary',
                                    },
                                    buttonsStyling: false,
                                })
                            })
                    }
                })
            }
        },
        AssignToUser() {
            if (this.UserValue === null) {
                this.$swal({
                    title: 'Attention!',
                    text: 'Please select user!',
                    icon: 'warning',
                    customClass: {
                        confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false,
                })
            } else if (this.selectedCase.length === 0) {
                this.$swal({
                    title: 'Attention!',
                    text: 'Please select cases!',
                    icon: 'warning',
                    customClass: {
                        confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false,
                })
            } else {
                store
                    .dispatch('geoSplit/SEND_TO_USER', {
                        prefix: this.$route.params.prefixPrj,
                        prefixRole: this.$route.params.prefixRole,
                        type: this.$route.params.assmnttype,

                    })
                    .then(resu => {
                        console.log(resu)
                        const res = resu
                        let resData = ''
                        for (let i = 0; i < res.length; i += 1) {
                            if (res[i][0].result === 1) {
                                resData += `<b>Case ${res[i][1].name}:</b></br><span class="text-success"> Success </span><b>CaseCode: ${res[i][1].code}</b></br></br>`
                            } else if (res[i][0].result === 2) {
                                resData += `<b>Case ${res[i][1].name}:</b></br><span class="text-danger"> is duplicated </span><b>CaseCode: ${res[i][1].code}</b></br></br>`
                            } else {
                                resData += `<b>Case ${res[i][1].name}:</b></br> Please call system administrator</br></br>`
                            }
                        }
                        this.$swal({
                            title: 'Result!',
                            html: resData,
                            customClass: {
                                confirmButton: 'btn btn-primary',
                            },
                            buttonsStyling: false,
                        })
                    })
                    .catch(() => {
                        this.$swal({
                            title: 'Attention!',
                            text: 'Please check internet connection and try again!',
                            icon: 'warning',
                            customClass: {
                                confirmButton: 'btn btn-primary',
                            },
                            buttonsStyling: false,
                        })
                    })
            }
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
        ResetData() {
            this.$store.dispatch('geoSplit/REFRESH', {
                prefix: this.$route.params.prefixPrj,
                prefixRole: this.$route.params.prefixRole,
                type: this.$route.params.assmnttype,
            }).then(() => {
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
