<template>
  <div>
    <!-- success
    <b-alert
      variant="success"
      show
    >
      <div class="alert-body">
        <span v-html="check['data'][1]['value']" />
      </div>
    </b-alert>-->
    <b-row class="ml-1">
      <h1>Welcome to RDMS</h1>
    </b-row>
    <b-card>
      <b-row>
        <b-col cols="12">
          <div style="font-size: x-large; margin-left:5px">
            <strong> Breaking News:</strong>
          </div></b-col>
      </b-row>
      <b-row>
        <b-col
          cols="12"
          class="news"
        >
          <news />
        </b-col>
      </b-row>
    </b-card>
    <b-row>
      <!--  <b-col lg="4">
        <h2>New Project</h2>
        <analytics-timeline :data="ipc" />
      </b-col>
      <b-col v-show="$can('read','INVNT')">
        <h2>Analysis</h2>
        <b-overlay
          rounded="lg"
          :show="show"
        >
          <b-card>
            <Card-General-Info
              v-for="it in stasticItem"
              :key="it.id"
              :item-name="it.itemName"
              :info-items="it.listStat"
            />
          </b-card>
        </b-overlay>
      </b-col>-->
    </b-row>
    <!-- <analysis />-->
  </div>
</template>

<script>
/* eslint-disable vue/no-v-html */

import store from '@/store/index'
// import CardGeneralInfo from '@/views/pages/inventory/CardGeneralInfo.vue'
import { takeState } from 'vuex-dot'
import News from './News.vue'
// import Analysis from './Analysis/Analysis.vue'
// import AnalyticsTimeline from './NewProject/AnalyticsTimeline.vue'

export default {
  components: {
    News,
    // Analysis,
    // CardGeneralInfo,
    // AnalyticsTimeline,
  },
  data() {
    return {
      newnav: null,
      newsub: null,
      show: true,
      ipc: {
        step1: {
          title: '12 Invoices have been paid',
          subtitle: 'Invoices have been paid to the company.',
          duration: '2 day ago',
        },
        step4: {
          title: 'Create a new project for client',
          duration: '5 day ago',
          subtitle: 'Add files to new design folder',
        },
      },
      es1: {
        step1: {
          title: '12 Invoices have been paid',
          subtitle: 'Invoices have been paid to the company.',
          duration: '2 day ago',
        },
        step4: {
          title: 'Create a new project for client',
          duration: '5 day ago',
          subtitle: 'Add files to new design folder',
        },
      },
    }
  },
  computed: {
    stasticItem: takeState('inventory', 'stasticItem').map(),
    check: takeState('global', 'check').map(),

  },
  watch: {
    /* $route: {
      immediate: true,
      handler(to) {
        document.title = to.meta.title || store.getters('app/DEFAULT_TITLE')
      },
    }, */
  },
  mounted() {
    /* this.$store.dispatch('inventory/GET_INVENTORY_LIST', {
      prefix: 'IPC',
    }).then(() => {
      this.show = false
    }).catch(() => {
      this.show = false
    }) */
  },
  methods: {
    add_nav() {
      store.commit('nav/ADD_NAVLIST', {
        title: this.newnav,
        subtitle: this.newsub,
      })
    },
    set_tag(navItems) {
      // eslint-disable-next-line no-param-reassign
      navItems[0].tag = 'FollowUP'
    },
    update_sidebar_tag() {
      this.$emit('update_nav_menu', this.set_tag)
    },
  },
}
</script>

<style>
.news {
    width: 100%;
}
</style>
