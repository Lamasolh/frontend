<template>
  <div>
    <vue-excel-editor
      ref="resd"
      v-model="residential"
      :readonly="true"
      width="100%"
      height="500px"
      :no-header-edit="true"
    >
      <vue-excel-column
        field="ACS_CODE"
        label="ACS_CODE"
        width="100px"
      />
      <vue-excel-column
        field="Cadaster Name in English"
        label="Cadaster Name in English"
        width="200px"
      />
      <vue-excel-column
        field="Cadaster in Arabic"
        label="Cadaster in Arabic"
        width="200px"
      />
      <vue-excel-column
        field="District قضاء"
        label="District قضاء"
        width="200px"
      />
      <vue-excel-column
        field="Governorate محافظة"
        label="Governorate محافظة"
        width="200px"
      />
      <vue-excel-column
        field="Partner for Residential Lebanese"
        label="Partner for Residential Lebanese"
      />
      <vue-excel-column
        field="Partner for Residential Syrians"
        label="Partner for Residential Syrians"
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
          Save Residential
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
    residential: takeState('importPrj', 'residential').commit('importPrj/SET_RESDENTIAL').map(),
    import: takeState('importPrj', 'import').commit('importPrj/SET_IMPORT').map(),

  },
  watch: {
    residential() {
      console.log(this.$refs.resd.refresh())
      this.$refs.resd.refresh()
    },
  },
  methods: {
    SaveData() {
      console.log(this.import)
      if (this.import === true) {
        this.$swal({
          title: 'Import Residential',
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
            this.$store.dispatch('importPrj/Save_DATA_RESD', {
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
