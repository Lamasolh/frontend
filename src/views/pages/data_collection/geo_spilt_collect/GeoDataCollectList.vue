<template>
  <b-card>
    <b-card-body>
      <h1>Data Collection</h1>
      <br>
      <b-row>
        <b-col cols="4">
          <h3>ISs</h3>
        </b-col>
        <b-col cols="4">
          <h3>Organisation</h3>
        </b-col>
        <b-col cols="2">
          <h3>Access</h3>
        </b-col>
      </b-row>
      <br>

      <div
        v-for="item in items"
        :key="item.is_id"
      >
        <b-row>
          <b-col cols="4">
            <h3>{{ item.is_name }}</h3>
            <p>{{ item.p_code }}</p>
          </b-col>
          <b-col cols="4">
            <p>{{ item.org_name }}</p>
          </b-col>
          <b-col cols="2">
            <b-form-checkbox
              v-model="item.active"
              class="mr-0 mt-50"
              name="is-rtl"
              switch
              inline
            />
          </b-col>
        </b-row>
        <hr>
      </div>
      <br>
      <b-row align-h="end">
        <b-col
          cols="2"
          md="auto"
        >

          <b-button
            variant="info"
            block
            @click="save"
          >
            <feather-icon
              icon="SaveIcon"
              class="mr-1"
            />
            Save
          </b-button>
        </b-col>
      </b-row>

    </b-card-body>

  </b-card>
</template>
<script>
import { takeState } from 'vuex-dot'

export default {

  computed: {
    show: takeState('dataCollectGeo', 'show').commit('dataCollectGeo/SET_SHOW').map(),
    items: takeState('dataCollectGeo', 'items').map(),

  },
  mounted() {
    // Set the initial number of items
  },
  methods: {
    save() {
      console.log('1')
      this.$store.dispatch('dataCollectGeo/SEND_DATA').then(res => {
        console.log(res.res)
        if (res.res === 0) {
          if (res.message != null) {
            this.$swal({
              title: 'Error!',
              text: `Operation failed, Because ${res.message}`,
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          } else {
            this.$swal({
              title: 'Error!',
              text: 'Operation failed, please check the information you entered',
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          }
        } else if (res.res === 1) {
          this.$swal({
            title: 'Success!',
            text: 'Success Operation',
            icon: 'success',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        } else {
          this.$swal({
            title: 'Error!',
            text: 'Operation failed, please check the information you entered',
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        }
      }).catch(error => {
        console.log(error)
        this.$swal({
          title: 'Error!',
          text: 'Register failed',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
      })
    },
  },
}
</script>

  <style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
.sup {
  min-width: 250px;
}
.iss {
  min-width: 50px;
}
.action {
  min-width: 30px;
}
</style>
