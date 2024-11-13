<template>
  <b-card-body class="p-1">
    <b-row>
      <p>{{ itemName }}</p>
    </b-row>
    <b-row>
      <b-col
        v-for="item in infoItems"
        :key="item.icon"
        md="3"
        sm="6"
        :class="item.customClass"
      >
        <b-media no-body>
          <b-media-aside
            class="mr-2"
          >
            <b-avatar
              size="48"
              :variant="item.color"
            >
              <feather-icon
                size="24"
                :icon="item.icon"
              />
            </b-avatar>
          </b-media-aside>
          <b-media-body class="my-auto">
            <h4 class="font-weight-bolder mb-0">
              {{ item.title }}
            </h4>
            <b-card-text class="font-small-3 mb-0">
              {{ item.subtitle }}
            </b-card-text>
          </b-media-body>
        </b-media>
        <br>
      </b-col>
    </b-row>
  </b-card-body>
</template>

<script>
// import { takeState } from 'vuex-dot'

export default {
  props: {
    itemName: {
      type: String,
      required: true,
    },
    infoItems: {
      type: Array,
      required: true,
    },
  },
  computed: {
    // infoItems: takeState('inventory', 'infoItems').map(),
  },
  mounted() {
    /* setTimeout(() => {
      console.log('this.infoItems')
      console.log(this.infoItems)
    }, 3000) */
  },
}
</script>
