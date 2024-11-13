<template>
  <b-input-group>
    <b-input-group-prepend>
      <b-button
        variant="outline-dark"
        class="py-0"
        size="sm"
        @mousedown="start(1)"
        @mouseleave="stop"
        @mouseup="stop"
        @click="valueChange(val - 1)"
      >
        <b-icon
          icon="dash"
          font-scale="1.6"
        />
      </b-button>
    </b-input-group-prepend>

    <b-form-input
      :id="id"
      :value="val"
      :size="size"
      type="number"
      min="1"
      :max="max"
      placeholder="1"
      class="border-secondary text-center"
      number
      @update="valueChange"
    />

    <b-input-group-append>
      <b-button
        variant="outline-dark"
        class="py-0"
        size="sm"
        @mousedown="start(2)"
        @mouseleave="stop"
        @mouseup="stop"
        @click="valueChange(val + 1)"
      >
        <b-icon
          icon="plus"
          font-scale="1.6"
        />
      </b-button>
    </b-input-group-append>
  </b-input-group>
</template>

<script>
import { BIcon, BIconDash, BIconPlus } from 'bootstrap-vue'

export default {
  name: 'TheFormSpinbuttonWithInput',

  components: {
    BIcon,

    /* eslint-disable vue/no-unused-components */
    BIconDash,
    BIconPlus,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },

    size: {
      type: String,
      required: false,
      default: 'md',
      validator(value) {
        return ['sm', 'md', 'lg'].includes(value)
      },
    },

    val: {
      type: Number,
      default: 1,
      required: true,
    },
  },
  data() {
    return {
      interval: false,
      count: 0,
    }
  },
  methods: {
    start(ind) {
      if (!this.interval) {
        this.interval = setInterval(() => {
          if (ind === 1) {
            this.valueChange(this.val - 1)
          } else {
            this.valueChange(this.val + 1)
          }
        }, 200)
      }
      console.log(this.count)
    },
    stop() {
      clearInterval(this.interval)
      console.log('stop', this.val)
      this.interval = false
    },
    vl(newValue) {
      console.log(newValue)
    },
    valueChange(newValue) {
      console.log(newValue)
      if (newValue <= 0) {
        this.$emit('input', 0)
      } else {
        this.$emit('input', newValue)
      }
    },
  },
}
</script>

<style scoped>
/* Remove up and down arrows inside number input */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
