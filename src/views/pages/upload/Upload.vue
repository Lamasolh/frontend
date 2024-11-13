<template>
  <b-card class="mt-5">
    <b-form>
      <b-row>
        <b-col cols="12">
          <b-form-group
            label="Excel"
            label-for="bio-area"
          >
            <b-form-textarea
              id="bio-area"
              v-model="json"
              rows="10"
              placeholder="Your bio data here..."
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-button
            variant="primary"
            class="mt-1 mr-1"
            @click="upload"
          >
            Upload
          </b-button>

          <b-col
            cols="12"
            class="mt-2"
          >
            <b-form-group
              label="Result"
              label-for="bio-area"
            >
              <b-form-textarea
                id="bio-area"
                v-model="json2"
                rows="10"
                placeholder="Your bio data here..."
              />
            </b-form-group>
          </b-col>
        </b-col>
      </b-row>
    </b-form>
  </b-card>
</template>

<script>

export default {

  data() {
    return {
      json: '',
      json2: '',
    }
  },
  methods: {
    upload() {
      this.$store.dispatch('upload/UploadExcel', { json: this.json }).then(val => {
        this.json2 = JSON.stringify(val.res)
      })
    },
  },
}
</script>

<style lang="scss">
</style>
