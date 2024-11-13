<template>
  <!-- Error page-->
  <div class="misc-wrapper">
    <b-link class="brand-logo">
      <rdms-logo />
      <h2
        id="brand"
        class="brand-text text-primary ml-0 w-200"
      >
        RDMS
      </h2>
    </b-link>

    <div class="misc-inner p-5 p-sm-5 ">
      <div class="w-100 text-center">
        <h2
          class="mb-1 mobi"
          style=" padding-top: 30px;"
        >
          Page Not Found 🕵🏻‍♀️
        </h2>
        <p class="mb-2">
          Oops! 😖 The requested URL was not found on this server.
        </p>

        <b-button
          variant="primary"
          class="mb-2 btn-sm-block"
          :disabled="loading"
          @click="toHome"
        >
          <b-spinner
            v-show="loading"
            style="width: 1.2rem; height: 1.2rem;"
          />
          <span v-show="!loading">Back to home
          </span>
        </b-button>

        <!-- image -->
        <br>
        <b-img
          fluid
          style="width:350px"
          :src="imgUrl"
          alt="Error page"
        />
      </div>
    </div>
  </div>
<!-- / Error page-->
</template>

<script>
/* eslint-disable global-require */
import {
  BSpinner, BLink, BButton, BImg,
} from 'bootstrap-vue'
import RdmsLogo from '@core/layouts/components/Logo.vue'
import store from '@/store/index'

export default {
  components: {
    RdmsLogo,
    BLink,
    BButton,
    BImg,
    BSpinner,
  },
  data() {
    return {
      downImg: require('@/assets/images/pages/error.svg'),
      loading: false,
    }
  },
  computed: {
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.downImg = require('@/assets/images/pages/error-dark.svg')
        return this.downImg
      }
      return this.downImg
    },
  },
  methods: {
    toHome() {
      this.loading = true
      this.$router.push({ path: '/login' })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@core/scss/vue/pages/page-misc.scss';
#brand{
  font-weight: 800;
  font-style: bold;
}
</style>
