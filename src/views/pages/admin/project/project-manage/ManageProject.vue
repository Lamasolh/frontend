<template>
  <b-card>
    <b-overlay
      :show="show"
      rounded="sm"
    >
      <validation-observer ref="simpleRules">
        <b-form
          ref="form"
          class="repeater-form"
          @submit.prevent
        >
          <!-- Top Filter -->
          <b-row>
            <b-col cols="4">
              <validation-provider
                v-slot="{ errors }"
                rules="required"
                name="orginizataion"
              >
                <b-form-group label="Orginizataion">
                  <v-select
                    v-model="orginizataion"
                    placeholder="Select Orginizataion"
                    label="title"
                    :state="errors.length > 0 ? false : null"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="orginizataionOptions"
                    @input="value=> ChangeORG(value)"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>
          </b-row>
          <b-row>
            <b-col
              class="mb-2"
            >
              <validation-provider
                v-slot="{ errors }"
                rules="required"
                name="Governorate"
              >
                <b-form-group label="Governorate">
                  <v-select
                    v-model="governorate"
                    placeholder="Select Governorate"
                    label="title"
                    :state="errors.length > 0 ? false : null"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="governorateOption"
                    @input="value=> ChangeGov(value)"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col>
              <validation-provider
                v-slot="{ errors }"
                rules="required"
                name="District"
              >
                <b-form-group label="District">
                  <v-select
                    v-model="district"
                    placeholder="Select District"
                    label="title"
                    :state="errors.length > 0 ? false : null"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="districtSelect"
                    @input="value => ChangeDistrict(value)"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col>
              <validation-provider
                v-slot="{ errors }"
                rules="required"
                name="Type"
              >
                <b-form-group label="Type">
                  <v-select
                    v-model="type"
                    placeholder="Select Type"
                    label="title"
                    :state="errors.length > 0 ? false : null"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="typeOptions"
                    @input="value=> ChangeType(value)"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col v-show="type==null? false: type.value > 3">
              <b-form-group
                label="Cadaster"
              >
                <v-select
                  v-model="cadaster"
                  placeholder="Select Cadaster"
                  label="title"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="cadOptions"
                  @input="value=> ChangeCad(value)"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <br>
          <!-- Row Filter -->
          <b-row>
            <b-col cols="4">
              <div class="d-flex justify-content-between flex-wrap">
                <!-- filter -->
                <b-form-group
                  label="Filter"
                  label-cols-sm="2"
                  label-for="filterInput"
                >
                  <b-input-group size="sm">
                    <b-form-input
                      id="filterInput"
                      v-model="searchTerm"
                      name="filterInput"
                      type="search"
                      placeholder="Type to Highlight"
                      @keyup="HighlightText"
                    />
                    <b-input-group-append>
                      <b-button
                        label="Filter"
                        type="search"
                        @click="ClearFilter"
                      >
                        Clear
                      </b-button>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
              </div>
            </b-col>
            <b-col cols="1">
              <!-- Refresh
              <b-button
                variant="primary"
                size="sm"
                class="ml-1"
                @click="Refresh()"
              >
                <b-icon
                  icon="arrow-repeat"
                />
              </b-button>-->
            </b-col>
            <b-col cols="2" />
            <b-col cols="3">
              <b-button
                variant="info"
                block
                @click="SelectAll"
              >
                <feather-icon
                  icon="XIcon"
                />
                <span>Select All Marker</span>
              </b-button>
            </b-col>
            <b-col cols="2">
              <b-button
                variant="success"
                type="submit"
                block
                :disabled="(orginizataion==null||(district == null && type == null))"
                @click="SaveData"
              >
                <feather-icon
                  icon="SaveIcon"
                  class="mr-1"
                />
                <span>Save</span>
              </b-button>
            </b-col>
          </b-row>
          <!-- Row Option -->
          <b-row>
            <b-col
              v-for="ic in icon"
              :key="ic.id"
              cols="2"
            >
              <div>
                <b-img
                  v-b-tooltip.hover
                  center
                  :title="ic.title"
                  :src="ic.icon"
                />
                <p class="text-center">
                  {{ ic.title }}
                </p>
              </div>
            </b-col>
          </b-row>
          <br>
          <b-row>
            <b-col
              cols="3"
            >
              <span class="text-muted text-center ml-2">
                Total Selected: {{ selectedCase.length }}
              </span>
            </b-col>
            <b-col
              cols="3"
            >
              <span class="text-primary text-center">
                Total Not assigned: {{ markerOriginal.filter(it=> it.color===1).length }}
              </span>
            </b-col>
            <b-col
              cols="3"
            >
              <span class="text-success text-center ">
                Total Assigned to current Orginizataion: {{ markerOriginal.filter(it=> it.color===2).length }}
              </span>
            </b-col>
            <b-col
              cols="3"
            >
              <span class="text-danger text-center">
                Total Assigned to another Orginizataion: {{ markerOriginal.filter(it=> it.color===3).length }}
              </span>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="12">
              <b-card>
                <GmapMap
                  ref="mapRef"
                  :center="center"
                  :zoom="center.zoom"
                  :options="{minZoom: 8}"
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
                    @click="clickMarker(m, index)"
                  />
                  <gmap-info-window
                    v-for="(pos, i) in infoWindowPos"
                    :key="pos.lat"
                    :position="{ lat: pos.lat, lng: pos.lng }"
                    :options="{
                      content: infoWindowText[i],
                      pixelOffset: {
                        width: -8,
                        height: -80
                      }
                    }"
                    :opened="infoWinOpen"
                    @closeclick="infoWinOpen = false"
                  />
                </GmapMap>
              </b-card>
            </b-col>
          </b-row>
        </b-form>

      </validation-observer>
    </b-overlay>
  </b-card>
</template>

<script>
/* eslint-disable import/no-dynamic-require */
/* eslint-disable vue/no-async-in-computed-properties */
/* eslint-disable global-require */
/* eslint-disable no-param-reassign */
/* eslint-disable vue/no-side-effects-in-computed-properties */
/* eslint-disable no-restricted-syntax */
import vSelect from 'vue-select'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { takeState } from 'vuex-dot'

export default {
  components: {
    vSelect,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      ItemTable: [],
      marker: [],
      infoWindowPos: [],
      infoWindowText: [],
      infoWinOpen: false,
      currentMidx: null,
      ///
      icon: [],
      nextTodoId: 2,
      center: { lat: 33.8547, lng: 35.8623, zoom: 8 },
      ///
      searchTerm: '',
    }
  },
  computed: {
    show: takeState('managePrj', 'show').map(),
    selectedCase: takeState('managePrj', 'selectedCase').commit('managePrj/SET_SELECT_ITEM').map(),
    ///
    markerRow: takeState('managePrj', 'markers').commit('managePrj/SET_MARKER').map(),
    markerOriginal: takeState('managePrj', 'markersOrigin').commit('managePrj/SET_MARKER_ORIGIN').map(),
    /// Options
    districtOptions: takeState('global', 'district').map(),
    orginizataionOptions: takeState('managePrj', 'orgOptions').map(),
    typeOptions: takeState('managePrj', 'typeOptions').map(),
    cadOptions: takeState('managePrj', 'cadOptions').map(),
    governorateOption() {
      return this.$store.getters['global/governorate']
    },
    districtSelect() {
      return this.districtOptions.filter(
        item => item.params
        === (this.governorate != null ? this.governorate.value : null),
      )
    },
    /// Values
    orginizataion: takeState('managePrj', 'orginizataion').commit('managePrj/SET_ORG').map(),
    governorate: takeState('managePrj', 'governorate').commit('managePrj/SET_GOV').map(),
    district: takeState('managePrj', 'district').commit('managePrj/SET_DIS').map(),
    cadaster: takeState('managePrj', 'cadaster').commit('managePrj/SET_CAD').map(),
    type: takeState('managePrj', 'type').commit('managePrj/SET_TYPE').map(),
  },
  mounted() {
    this.district = null
    this.governorate = null
    this.orginizataion = null
    this.district = null
    this.cadaster = null
    this.type = null
    this.selectedCase = []
    this.markerRow = []
    this.markerOriginal = []
  },
  methods: {
    RefreshMarker() {
      this.marker = []
      this.$nextTick(() => {
        this.markerRow.forEach(payload => {
          this.marker.push({
            id: payload.id,
            type: payload.type,
            name: payload.name,
            color: payload.color,
            infoText: payload.infoText,
            org_id: payload.org_id,
            org_name: payload.org_name,
            icon: payload.icon,
            position: payload.position,
          })
        })
      })
    },
    ReactiveMarker(marker) {
      for (let i = 0; i < this.marker.length; i += 1) {
        if (this.marker[i].id === marker.id) {
          this.marker.splice(i, 1)
        }
      }
      this.$nextTick(() => {
        this.markerRow.filter(it => it.id === marker.id).forEach(payload => {
          this.marker.push({
            id: payload.id,
            type: payload.type,
            color: payload.color,
            infoText: payload.infoText,
            org_name: payload.org_name,
            org_id: payload.org_id,
            icon: payload.icon,
            position: payload.position,
          })
        })
      })
    },
    HighlightText() {
      if (this.$refs.form.filterInput.value.length > 1) {
        this.infoWindowPos = []
        this.infoWindowText = []
        this.infoWinOpen = true
        this.markerRow.forEach(marker => {
          // console.log(this.$refs.form.filterInput.value.toLowerCase())
          if (
            marker.infoText
              .toLowerCase()
              .split(this.$refs.form.filterInput.value.toLowerCase()).length > 1
          ) {
            this.infoWindowPos.push(marker.position)
            this.infoWindowText.push(marker.infoText)
            // this.currentMidx = index
          }
        })
      }
      setTimeout(() => {
        this.$nextTick(() => this.$refs.form.filterInput.focus()) // this works great, just watch out with going to fast !!!
      }, 500)
    },
    SaveData() {
      console.log(this.selectedCase)
      if (this.selectedCase.length !== 0) {
        this.$refs.simpleRules.validate().then(success => {
          console.log('success')
          console.log(success)
          if (success) {
            this.$store
              .dispatch('managePrj/SAVE_DATA', {
                prj: this.$route.params.value.proj_id,
              })
              .then(res => {
                console.log('res', res)
                if (res.valid) {
                  this.$swal({
                    title: 'Success!',
                    text: 'Success Operation!',
                    icon: 'success',
                    customClass: {
                      confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false,
                  })
                } else {
                  const resu = res.result
                  let resData = ''
                  for (let i = 0; i < resu.length; i += 1) {
                    if (resu[i][0].result === 0) {
                      resData += `<b> <p class="text-danger">${resu[i][1].name}</p></b></br></br>`
                    }
                  }
                  this.$swal({
                    title: 'There are failed operations!',
                    html: `${resData}`,
                    icon: 'error',
                    customClass: {
                      confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false,
                  })
                }
              }).catch(() => {
                this.$swal({
                  title: 'Error!',
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
              text: 'Missing Data',
              icon: 'warning',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          }
        })
      } else {
        this.$swal({
          title: 'Attention!',
          text: 'Please select aria',
          icon: 'warning',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
      }
    },
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
    },
    untoggleInfoWindow(marker, idx) {
      this.infoWinOpen = false
      this.infoWindowPos.splice(this.infoWindowPos.indexOf(idx), 1)
      this.infoWindowText.splice(this.infoWindowText.indexOf(idx), 1)
    },
    clickMarker(marker, idx) {
      this.infoWindowPos = []
      this.infoWindowText = []
      this.infoWindowPos.push(marker.position)
      this.infoWindowText.push(marker.infoText)
      if (this.currentMidx === idx) {
        this.infoWinOpen = false
      } else {
        this.infoWinOpen = false
        this.currentMidx = idx
      }
      if (marker.color !== 3) {
        this.$store.commit('managePrj/EDIT_MARKER', marker)
        this.ReactiveMarker(marker)
      } else {
        this.$swal({
          title: 'Are you sure?',
          html: `Are you sure you want to un-reserve it from ${marker.org_name}`,
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'Yes, un-reserve!',
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ml-1',
          },
          buttonsStyling: false,
        }).then(result => {
          if (result.isConfirmed) {
            this.$store.dispatch('managePrj/DEL_MARKER', { marker, prj: this.$route.params.value.proj_id })
              .then(val => {
                console.log('val')
                console.log(val)
                if (val === 1) {
                  this.$swal({
                    title: 'Success!',
                    text: 'Success Operation!',
                    icon: 'success',
                    customClass: {
                      confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false,
                  })
                  this.ReactiveMarker(marker)
                } else {
                  this.$swal({
                    title: 'Error!',
                    text: 'Operation Failed',
                    icon: 'error',
                    customClass: {
                      confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false,
                  })
                }
              }).catch(error => {
                console.log('error')
                console.log(error)
                this.$swal({
                  title: 'Error!',
                  text: 'Please check internet connection and try again',
                  icon: 'error',
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
    ClearFilter() {
      this.searchTerm = ''
      this.$refs.form.filterInput.value = ''
    },
    ResetLocation() {
      setTimeout(() => {
        this.center = { lat: 33.8547, lng: 35.8623, zoom: 8 }
      }, 500)
    },
    SelectAll() {
      this.marker.forEach(elm => {
        if (elm.color === 1) {
          this.$store.commit('managePrj/EDIT_MARKER', elm)
          this.$nextTick(() => {
            this.ReactiveMarker(elm)
          })
        }
        console.log(elm)
      })
    },
    ChangeGov() {
      this.marker = []
    },
    ChangeDistrict(value) {
      this.marker = []
      if (value != null) {
        this.$store.dispatch('managePrj/GET_TYPE')
        this.RefreshMarker()
      }
    },
    ChangeCad(value) {
      this.marker = []
      if (value != null) {
        this.$refs.simpleRules.validate().then(success => {
          if (success) {
            if (value != null) {
              this.$store.dispatch('managePrj/GET_MARKER', this.$route.params.value.proj_id).then(val => {
                if (val.length <= 0) {
                  this.$swal({
                    title: 'Attention!',
                    text: 'In this cadaster there is no such type of housing',
                    icon: 'warning',
                    customClass: {
                      confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false,
                  })
                } else {
                  this.RefreshMarker()
                }
              }).catch(() => {
                this.$swal({
                  title: 'Error!',
                  text: 'Please check internet connection and try again',
                  icon: 'error',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                })
              })
            }
          } else {
            this.markerRow = []
            this.marker = []
            this.markerOriginal = []
            this.selectedCase = []
          }
        })
      }
    },
    DeleteAll() {
      if (this.orginizataion == null) {
        this.$swal({
          title: 'Attention!',
          text: 'Please select orginizataion.',
          icon: 'warning',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
      } else {
        this.$store.dispatch('managePrj/CHECK_DELETE', this.$route.params.value.proj_id).then(value => {
          console.log(value)
          const val = value.result
          const count = value.fnd
          if (val === 2 || val === 1) {
            let str = `Are you sure do you want to delete all geosplit for ${this.orginizataion.title}`
            str += val === 2 ? ` you have ${count} cases active` : ''
            this.$swal({
              title: 'Are you sure?',
              html: str,
              icon: 'info',
              showCancelButton: true,
              confirmButtonText: 'Yes, delete all!',
              customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-outline-danger ml-1',
              },
              buttonsStyling: false,
            }).then(result => {
              console.log(result)
              if (result.isConfirmed) {
                this.$store.dispatch('managePrj/DEL_ALL', this.$route.params.value.proj_id)
                  .then(res => {
                    const valu = res.result
                    this.RefreshMarker()
                    if (valu === 1 || valu === 2 || valu === 3 || valu === 4) {
                      this.$swal({
                        title: valu === 4 ? 'Attention' : 'Success!',
                        text: res.stat,
                        icon: valu === 4 ? 'warning' : 'success',
                        customClass: {
                          confirmButton: 'btn btn-primary',
                        },
                        buttonsStyling: false,
                      })
                    } else {
                      this.$swal({
                        title: 'Failed!',
                        text: 'Operation Failed',
                        icon: 'error',
                        customClass: {
                          confirmButton: 'btn btn-primary',
                        },
                        buttonsStyling: false,
                      })
                    }
                  }).catch(error => {
                    console.log('error')
                    console.log(error)
                    this.$swal({
                      title: 'Error!',
                      text: 'Please check internet connection and try again',
                      icon: 'error',
                      customClass: {
                        confirmButton: 'btn btn-primary',
                      },
                      buttonsStyling: false,
                    })
                  })
              }
            })
          } else {
            this.$swal({
              title: 'Attention!',
              text: 'Error Please contact administrator',
              icon: 'warning',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          }
        }).catch(() => {
          this.$swal({
            title: 'Error!',
            text: 'Please check internet connection and try again',
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        })
      }
    },
    ChangeORG(value) {
      this.marker = []
      if (value != null) {
        if (this.orginizataion != null && this.governorate != null && this.district != null && this.type != null) {
          this.$store.dispatch('managePrj/GET_MARKER', this.$route.params.value.proj_id).then(val => {
            if (val.length <= 0) {
              this.$swal({
                title: 'Attention!',
                text: `In this ${this.type === 1 ? 'district' : 'cadaster'} there is no such type of housing`,
                icon: 'warning',
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              })
            } else {
              this.RefreshMarker()
            }
          }).catch(() => {
            this.$swal({
              title: 'Error!',
              text: 'Please check internet connection and try again',
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          })
        }
      }
    },
    ChangeType(data) {
      console.log('data')
      console.log(data)
      if (data != null) {
        this.icon = [
          { id: 1, icon: require(`@/assets/images/markers/marker_${data.value}_1.png`), title: 'Not assigned' },
          { id: 2, icon: require(`@/assets/images/markers/marker_${data.value}_2.png`), title: 'Assigned to current Orginizataion' },
          { id: 3, icon: require(`@/assets/images/markers/marker_${data.value}_3.png`), title: ' Assigned to another Orginizataion' },
        ]
        this.marker = []
        if (this.orginizataion != null && this.governorate != null && this.district != null && this.type != null) {
          if (data.value === 3 || data.value === 2 || data.value === 1) {
            this.$store.dispatch('managePrj/GET_MARKER', this.$route.params.value.proj_id).then(val => {
              if (val.length <= 0) {
                this.$swal({
                  title: 'Attention!',
                  text: 'In this district there is no such type of housing',
                  icon: 'warning',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                })
              } else {
                this.RefreshMarker()
              }
            }).catch(() => {
              this.$swal({
                title: 'Error!',
                text: 'Please check internet connection and try again',
                icon: 'error',
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              })
            })
          } else {
            this.$store.dispatch('managePrj/GET_CAD')
            this.RefreshMarker()
          }
        }
      } else {
        this.marker = []
      }
    },
    Refresh() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          this.$store.dispatch('managePrj/GET_MARKER', this.$route.params.value.proj_id).catch(() => {
            this.$swal({
              title: 'Error!',
              text: 'Please Check internet and try again',
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
            text: 'Missing',
            icon: 'warning',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        }
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
