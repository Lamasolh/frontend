<template>
  <div>
    <b-button
      variant="primary"
      @click="show1=true"
    >
      Show Modal
    </b-button>

    <b-modal
      v-model="show1"
      title="Modal Variants"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      :body-bg-variant="bodyBgVariant"
      :body-text-variant="bodyTextVariant"
      :footer-bg-variant="footerBgVariant"
      :footer-text-variant="footerTextVariant"
    >
      <b-container fluid>
        <b-row class="mb-1 text-center">
          <b-col cols="3" />
          <b-col>Background</b-col>
          <b-col>Text</b-col>
        </b-row>

        <b-row class="mb-1">
          <b-col cols="3">
            Header
          </b-col>
          <b-col>
            <b-form-select
              v-model="headerBgVariant"
              :options="variants"
            />
          </b-col>
          <b-col>
            <b-form-select
              v-model="headerTextVariant"
              :options="variants"
            />
          </b-col>
        </b-row>

        <b-row class="mb-1">
          <b-col cols="3">
            Body
          </b-col>
          <b-col>
            <b-form-select
              v-model="bodyBgVariant"
              :options="variants"
            />
          </b-col>
          <b-col>
            <b-form-select
              v-model="bodyTextVariant"
              :options="variants"
            />
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="3">
            Footer
          </b-col>
          <b-col>
            <b-form-select
              v-model="footerBgVariant"
              :options="variants"
            />
          </b-col>
          <b-col>
            <b-form-select
              v-model="footerTextVariant"
              :options="variants"
            />
          </b-col>
        </b-row>
      </b-container>

      <template #modal-footer>
        <div class="w-100">
          <p class="float-left">
            Modal Footer Content
          </p>
          <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="show1=false"
          >
            Close
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show1: false,
      variants: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'],
      headerBgVariant: 'dark',
      headerTextVariant: 'light',
      bodyBgVariant: 'light',
      bodyTextVariant: 'dark',
      footerBgVariant: 'warning',
      footerTextVariant: 'dark',
    }
  },
}
</script>
