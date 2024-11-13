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
            <b-col>
              <b-form-group
                label="Login Security"
              >
                <b-list-group>
                  <b-list-group-item>
                    <b-row>
                      <b-col cols="8">
                        <p>
                          <b>Device Name:</b> PC,<br>
                          <b>Browser:</b> Chrome,<br>
                          <b>OS:</b> windows,<br>
                          <b>Ip:</b> 192.168.37.9
                        </p>
                      </b-col>
                      <b-col>
                        <b-button
                          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                          variant="danger"
                          class="mt-1 mr-1"
                          block
                        >
                          Logout
                        </b-button>
                      </b-col>
                    </b-row>
                  </b-list-group-item>
                  <b-list-group-item>
                    <b-row>
                      <b-col cols="8">
                        <p>
                          <b>Device Name:</b> PC-1,<br>
                          <b>Browser:</b> FireFox,<br>
                          <b>OS:</b> windows,<br>
                          <b>Ip:</b> 192.168.38.48
                        </p>
                      </b-col>
                      <b-col>
                        <b-button
                          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                          variant="danger"
                          class="mt-1 mr-1"
                          block
                        >
                          Logout
                        </b-button>
                      </b-col>
                    </b-row>
                  </b-list-group-item>
                  <b-list-group-item>
                    <b-row>
                      <b-col cols="8">
                        <p>
                          <b>Device Name:</b> PC-2,<br>
                          <b>Browser:</b> FireFox,<br>
                          <b>OS:</b> Android,<br>
                          <b>Ip:</b> 192.168.138.48
                        </p>
                      </b-col>
                      <b-col>
                        <b-button
                          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                          variant="danger"
                          class="mt-1 mr-1"
                          block
                        >
                          Logout
                        </b-button>
                      </b-col>
                    </b-row>
                  </b-list-group-item>
                </b-list-group>
              </b-form-group>
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                class="mt-1 mr-1"
              >
                Logout From All Devices
              </b-button>
            </b-col>
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
