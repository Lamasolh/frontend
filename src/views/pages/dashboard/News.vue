<template>
  <swiper
    v-show="reload"
    ref="mySwiper"
    class="swiper-autoplay"
    :options="swiperOptions"
    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
  >
    <swiper-slide
      v-for="data in swiperData"
      :key="data.title"
    >
      <b-alert
        :variant="data.variant"
        show
      >
        <div class="alert-body">
          <span><strong>{{ data.type }}:</strong> {{ data.title }} </span>
        </div>
      </b-alert>
    </swiper-slide>
    <!--<div
        slot="pagination"
        class="swiper-pagination"
      />
      <div
        slot="button-next"
        class="swiper-button-next"
      />
      <div
        slot="button-prev"
        class="swiper-button-prev"
      />-->
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

import { takeState } from 'vuex-dot'

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      reload: true,
      swiperOptions: {
        slidesPerView: 1,
        keyboard: {
          enabled: true,
        },
        loop: true,
        autoHeight: true,
        autoWidth: true,
        observer: true,
        observeParents: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        /* navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }, */
      },

      /* eslint-disable global-require */
      /* swiperData: [
        { title: 'Welcome To RDMS', type: 'Notification', variant: 'success' },
        { title: 'RDMS is the most powerful referral distribution management system', type: 'Notification', variant: 'danger' },
        // { title: 'New Project is added to apply please check your email', type: 'New Project', variant: 'warning' },
      ],
      eslint-disable global-require */
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    },
    swiperData: takeState('auth', 'news').map(),
    vert: takeState('verticalMenu', 'isVerticalMenuCollapsed').map(),
  },
  watch: {
    vert() {
      console.log('nav')
      this.updateSlider()
    },
  },
  methods: {
    updateSlider() {
      this.reload = false
      setTimeout(() => {
        this.reload = true
      }, 300)
    },
  },
}
</script>
