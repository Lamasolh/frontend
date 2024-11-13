<template>
  <b-card-body>
    <div class="d-flex justify-content-between  flex-wrap">

      <!-- filter -->
      <b-form-group
        label="Filter"
        label-cols-sm="2"
        label-align-sm="left"
        label-size="sm"
        label-for="filterInput"
        class="mb-0"
      >
        <b-input-group size="sm">
          <b-form-input
            id="filterInput"
            v-model="filter"
            type="search"
            placeholder="Type to Search"
          />
          <b-input-group-append>
            <b-button
              :disabled="!filter"
              @click="filter = ''"
            >
              Clear
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
    </div>
  </b-card-body>
</template>

<script>
import { takeState } from 'vuex-dot'

export default {
  components: {
  },
  data() {
    return {
      totalRows: null,
    }
  },
  computed: {

    filter: takeState('listPrj', 'filter').commit('listPrj/SET_FILTER').map(),
    filterOn: takeState('listPrj', 'filterOn').commit('listPrj/SET_FILTER_ON').map(),
  },
  methods: {
    onFiltered(_, ind) {
      this.totalRows = ind
      this.currentPage = 1
    },
  },
}
</script>
