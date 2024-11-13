<template>
  <div>
    <div
      v-show="load"
      id="loading-bg"
    >
      <div class="loading-logo">
        <img
          src="@/assets/images/logo/logo.png"
          alt="Logo"
          width="85px"
        >
      </div>
      <div class="loading">
        <div class="effect-1 effects" />
        <div class="effect-2 effects" />
        <div class="effect-3 effects" />
      </div>
    </div>
    <slot />
  </div>

</template>
<script>
export default {
  props: {
    load: {
      required: true,
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
body {
    margin: 0;
}

#loading-bg {
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
}

.loading-logo {
    position: absolute;
    width: 50%;
    height: 50%;
    left: calc(50% - 56px);
    top: 40%;
}

.loading {
    position: absolute;
    left: calc(50% - 35px);
    top: 50%;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 3px solid transparent;
}

.loading .effect-1,
.loading .effect-2 {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 3px solid transparent;
    border-left: 3px solid rgba(75, 135, 199, 1);
    border-radius: 50%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.loading .effect-1 {
    animation: rotate 1s ease infinite;
}

.loading .effect-2 {
    animation: rotateOpacity 1s ease infinite 0.1s;
}

.loading .effect-3 {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 3px solid transparent;
    border-left: 3px solid rgba(75, 135, 199, 1);
    -webkit-animation: rotateOpacity 1s ease infinite 0.2s;
    animation: rotateOpacity 1s ease infinite 0.2s;
    border-radius: 50%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.loading .effects {
    transition: all 0.3s ease;
}

@keyframes rotate {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(1turn);
        transform: rotate(1turn);
    }
}

@keyframes rotateOpacity {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
        opacity: 0.1;
    }

    100% {
        -webkit-transform: rotate(1turn);
        transform: rotate(1turn);
        opacity: 1;
    }
}

</style>
