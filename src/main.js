import {
  ToastPlugin, ModalPlugin, BootstrapVue, IconsPlugin,
} from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'
import i18n from '@/libs/i18n'
import * as VueGoogleMaps from 'vue2-google-maps'
// import x5GMaps from 'x5-gmaps'
import moment from 'moment'
import vueTopprogress from 'vue-top-progress'
import Vue from 'vue'
import fullscreen from 'vue-fullscreen'
import JsonExcel from 'vue-json-excel'
// import Moment from 'moment'
// import { extendMoment } from 'moment-range'
import LottieAnimation from 'lottie-vuejs/src/LottieAnimation.vue' // add lottie-animation to your global scope
import VueExcelEditor from 'vue-excel-editor'

import ProductZoomer from 'vue-product-zoomer'
import router from './router'
import store from './store'
import App from './App.vue'

// Axios Mock Adapter
// import '@/@fake-db/db'

// Global Components
import './global-components'
// validate
import './validation'
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// 3rd party plugins
import '@axios'
import '@/libs/acl'
import '@/libs/portal-vue'
import '@/libs/clipboard'
import '@/libs/toastification'
import '@/libs/sweet-alerts'
import '@/libs/vue-select' // import lottie-vuejs

Vue.use(LottieAnimation)
Vue.use(VueExcelEditor)

Vue.component('DownloadExcel', JsonExcel)

Vue.use(vueTopprogress)

Vue.prototype.moment = moment

// const moment = extendMoment(Moment)
// Vue.use(moment)
Vue.use(require('vue-moment'))

// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)
Vue.use(fullscreen)
Vue.use(ProductZoomer)

// map
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDpslw3Ot-YH_MAFgZubP3JPigy0SZAvWM',
    libraries: 'places,drawing,visualization',
  },
})
// map
/* Vue.use(x5GMaps, {
  load: {
    key: 'AIzaSyAQSWbwVQ2d0OwDj7lEr3i8BP6wI_pw7rI',
    libraries: 'places,drawing,visualization',
  },
}) */
// Composition API
Vue.use(VueCompositionAPI)
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
require('@core/assets/fonts/feather/iconfont.css') // For form-wizard

// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

Vue.config.productionTip = false

// eslint-disable-next-line import/no-extraneous-dependencies

/* window.Pusher = require('pusher-js')

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: process.env.MIX_PUSHER_APP_KEY,
  wsHost: window.location.hostname,
  wsPort: 6001,
  forceTLS: false,
  disableStats: true,
})
 */
// eslint-disable-next-line func-names

const vm = new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')

export default { vm }
