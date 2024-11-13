<template>
  <b-card>
    <b-row>
      <b-col>
        <p> Address Info</p>
      </b-col>
      <b-col>
        <p> Partner</p>
      </b-col>
      <b-col>
        <p> Select</p>
      </b-col>
      <b-col>
        <p> Supplier</p>
      </b-col>
      <b-col>
        <p> Monitor/Community Mobilizer</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <p>Soultan Yaacoub Faouqa 002 <br>
          52231-01-002</p>
      </b-col>
      <b-col>
        <p> Sawa</p>
      </b-col>
      <b-col>
        <b-checkbox checked="true" />
      </b-col>
      <b-col>
        <v-select
          v-model="supSelect1"
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          label="title"
          :options="SupplierList"

          :clearable="false"
        />
      </b-col>
      <b-col>
        <v-select
          v-model="monSelect1"
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          label="title"
          :options="MonitorList"
          :clearable="false"
        />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <p>Soultan Yaacoub Faouqa 002 <br>
          52231-01-002</p>
      </b-col>
      <b-col>
        <p>ACF</p>
      </b-col>
      <b-col>
        <b-checkbox />
      </b-col>
      <b-col>
        <v-select
          v-model="supSelect2"
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          label="title"
          :options="SupplierList"

          :clearable="false"
        />
      </b-col>
      <b-col>
        <v-select
          v-model="monSelect2"
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          label="title"
          :options="MonitorList"
          :clearable="false"
        />
      </b-col>
    </b-row>
    <b-row>
      <b-col
        cols="4"
        md="auto"
      >
        <b-button
          variant="primary"
          block
          @click="Save"
        >
          <feather-icon
            icon="SaveIcon"
            class="mr-1"
          />
          Save
        </b-button>
      </b-col>
    </b-row>
  </b-card>
</template>
<script lang="js">
import vSelect from 'vue-select'

export default {
  components: {
    vSelect,
  },
  data() {
    return {
      SupplierList: [
        { title: 'Supplier 1' },
        { title: 'Supplier 2' },
      ],
      MonitorList: [
        { title: 'Monitor 1' },
        { title: 'Monitor 2' },
        { title: 'Community 1' },
        { title: 'Community 2' },
      ],
      monSelect1: { title: 'Monitor 1' },
      supSelect1: { title: 'Supplier 1' },
      monSelect2: { title: 'Community 2' },
      supSelect2: { title: 'Supplier 2' },
    }
  },
  methods: {
    Save() {

    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
