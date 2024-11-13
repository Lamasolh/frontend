<template>
  <div>
    <vue-excel-editor
      ref="resd"
      v-model="csh"
      :readonly="true"
      width="100%"
      height="500px"
      :no-header-edit="true"
    >
      <vue-excel-column
        field="P-CODE"
        label="P-CODE"
      />
      <vue-excel-column
        field="PCode Name"
        label="PCode Name"
        width="150px"
      />
      <vue-excel-column
        field="Collective Name"
        label="Collective Name"
        width="150px"
      />

      <vue-excel-column
        field="Governorate محافظة"
        label="Governorate محافظة"
      />
      <vue-excel-column
        field="District قضاء"
        label="District قضاء"
      />
      <vue-excel-column
        field="Cadaster Name in English"
        label="Cadaster Name in English"
      />
      <vue-excel-column
        field="Cadaster in Arabic"
        label="Cadaster in Arabic"
      />
      <vue-excel-column
        field="ACS Code"
        label="ACS Code"
      />
      <vue-excel-column
        field="Latitude"
        label="Latitude"
      />
      <vue-excel-column
        field="Longitude"
        label="Longitude"
      />
      <vue-excel-column
        field="Partner for Collective Shelters"
        label="Partner for Collective Shelters"
      />
    </vue-excel-editor>
    <br>
    <br>
    <b-row align-h="end">

      <b-col cols="3">
        <b-button
          variant="success"
          block
          @click="SaveData"
        >
          Save Collective Shelters
        </b-button>
      </b-col>

    </b-row>
  </div>
</template>

<script>
import { takeState } from 'vuex-dot'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  data() {
    return {
      jsondata: [],
    }
  },
  computed: {
    csh: takeState('importPrj', 'csh').commit('importPrj/SET_CSH').map(),
    import: takeState('importPrj', 'import').commit('importPrj/SET_IMPORT').map(),

  },
  watch: {
    csh() {
      console.log(this.$refs.resd.refresh())
      this.$refs.resd.refresh()
    },
  },
  methods: {
    SaveData() {
      console.log(this.$route.params.value.proj_id)
      if (this.import === true) {
        this.$swal({
          title: 'Import Collective Shelters',
          text: 'Are you sure you want to import this data?',
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
            this.$store.dispatch('importPrj/Save_DATA_CSH', {
              prefix: this.$route.params.value.proj_id,
              prefixRole: this.$route.params.prefixRole,
            }).then(() => {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Operation Complete Check Error Table',
                  icon: 'EditIcon',
                  text: 'Check the summary if there are any errors',
                  variant: 'success',
                },
              })
            }).catch(() => {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Error',
                  icon: 'EditIcon',
                  text: 'Please check internet connection and try again',
                  variant: 'error',
                },
              })
            })
          }
        })
      } else {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Attention',
            icon: 'EditIcon',
            text: 'Please import Excel file',
            variant: 'warning',
          },
        })
      }
    },
  },
}
</script>
