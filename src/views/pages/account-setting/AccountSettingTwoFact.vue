<template>
  <div>
    <b-overlay
      :show="show"
      rounded="sm"
    >
      <b-card>
        <!-- form -->
        <b-form>
          <b-row>
            <!-- Enable -->
            <b-col md="6">
              <b-form-group
                label="Two Factor Authentication"
              >
                <b-form-checkbox
                  v-model="check"
                >
                  {{ Checked }}
                </b-form-checkbox>
              </b-form-group>
            </b-col>

            <!-- buttons -->
            <b-col cols="12">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                class="mt-1 mr-1"
              >
                Save changes
              </b-button>
              <b-button
                v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                type="reset"
                variant="outline-secondary"
                class="mt-1"
              >
                Reset
              </b-button>
            </b-col>
            <!--/ buttons -->
          </b-row>
        </b-form>
      </b-card>
      <template #overlay>
        <div class="text-center">
          <b-icon
            icon="stopwatch"
            font-scale="3"
            animation="cylon"
          />
          <p>
            <b>Comming Soon</b>
          </p>
        </div>
      </template>
    </b-overlay>
  </div>
</template>

<script>
import Ripple from 'vue-ripple-directive'

export default {
  directives: {
    Ripple,
  },
  data() {
    return {
      check: false,
      show: true,
    }
  },
  computed: {
    Checked() {
      return this.check === false ? 'disable' : 'enable'
    },
  },
}
</script>
