<template>
  <b-nav-item @click="go">
    <feather-icon
      size="21"
      icon="BookOpenIcon"
    />
  </b-nav-item>
</template>

<script>
export default {
  methods: {
    go() {
      this.$router.replace({ name: 'phonedirectory' })
    },
  },
}
</script>
